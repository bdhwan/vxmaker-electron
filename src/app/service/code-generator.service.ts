import { Injectable } from '@angular/core';
import { ApplicationDataServiceService } from '../service/application-data-service.service';


@Injectable()
export class CodeGeneratorService {


  //template data hash
  templateDataHash = {};
  templateNameList = [
    'activity_main.xml',
    'MainActivity.java',
  ];
  templateFileList = [
    '/source_template/activity_main.xml',
    '/source_template/MainActivity.java',
  ];


  applicationData;
  activityData;
  selectedStage;

  // lastId = 0;
  idHash = {};
  activityIdHash = {};
  activityLayoutIdHash = {};

  objectList;
  codeResult = {};

  constructor(private appDataService: ApplicationDataServiceService) { }

  public loadTemplete() {
    return new Promise((resolve, reject) => {
      const promiseList = [];
      for (let i = 0; i < this.templateNameList.length; i++) {
        const name = this.templateNameList[i];
        const path = this.templateFileList[i];
        promiseList.push(this.loadTemplateString(name, path));
      }
      Promise.all(promiseList).then(result => {
        resolve(result);
      });
    });
  }



  loadTemplateString(name, path) {
    return new Promise((resolve, reject) => {
      this.appDataService.loadTemplateString(path).then(result => {
        this.templateDataHash[name] = result;
        resolve(result);
      });
    });
  }


  public makeApplicationSourceCode(applicationData) {

    this.applicationData = applicationData;
    this.makeActivityName();

  }
  public makeActivitySourceCodeByActivity(activityData) {
    return new Promise((resolve, reject) => {
      this.activityData = activityData;
      this.selectedStage = activityData.stageList[0];
      this.makeActivityLayout().then(result => {
        resolve(this.codeResult);
      });
    });

  }


  public makeActivitySourceCode(applicationData, activityData) {

    return new Promise((resolve, reject) => {

      this.applicationData = applicationData;
      this.activityData = activityData;
      this.selectedStage = activityData.stageList[0];

      this.makeActivityName();
      this.makeActivityLayout().then(result => {
        resolve(this.codeResult);
      });
    });
  }


  makeActivityName() {

    this.idHash = {};
    this.activityIdHash = {};
    this.activityLayoutIdHash = {};

    console.log("makeActivityName-" + this.applicationData.activityList.length);
    for (let i = 0; i < this.applicationData.activityList.length; i++) {
      const activity = this.applicationData.activityList[i];
      activity.codeActivityName = this.getUniqueActivityName(activity.activityName);
      activity.codeLayoutName = this.getUniqueLayoutName(activity.activityName);
      console.log("activity = " + JSON.stringify(activity));
      if (activity.activityId === this.activityData.activityId) {
        this.activityData.codeActivityName = activity.codeActivityName;
        this.activityData.codeLayoutName = activity.codeLayoutName;
      }
    }
    console.log("makeActivityName finish");
  }


  getActivityNameByActivityId(activityId) {
    for (let i = 0; i < this.applicationData.activityList.length; i++) {
      const activity = this.applicationData.activityList[i];
      if (activity.activityId === this.activityData.activityId) {
        return activity;
      }
    }
    return null;
  }


  makeActivityLayout() {
    return new Promise((resolve, reject) => {
      const self = this;

      this.appDataService.loadTemplateString('/source_template/activity_main.xml').then(result => {
        let temp = result + '';
        const xmlString = this.insertChild('root');

        this.objectList = this.appDataService.getAllObjectList(this.activityData.objectList);
        for (let i = 0; i < this.objectList.length; i++) {
          const object = this.objectList[i];
          object.resourceId = this.getUniqueResourceName(object.name);
        }

        temp = temp.replace('!!!layoutList!!!', xmlString);
        temp = temp.replace('!!!packageName!!!', this.applicationData.applicationId);
        temp = temp.replace('!!!activityName!!!', this.activityData.codeActivityName);
        this.codeResult['layout'] = this.appDataService.makeBeautify(temp);
        return this.appDataService.loadTemplateString('/source_template/MainActivity.java');
      }).then(result => {

        let temp = result + '';
        let variables = this.activityData.codeActivityName + " context;\n";
        let finder = 'currentStage = ' + '\"' + this.activityData.stageList[0].id + '\";\n';
        let eventString = '';
        let onCreateEventString = '';
        let backPressedEventData = '';

        for (let i = 0; i < this.objectList.length; i++) {
          //make resource name
          const object = this.objectList[i];
          const tempVariableString = object.type + ' ' + object.resourceId + ';\n';
          let tempFinderString = object.resourceId + " = (" + object.type + ")findViewById(R.id." + object.resourceId + ");\n";
          variables += tempVariableString;

          if (object.type === 'VideoView' && object.dataUrl) {
            tempFinderString += object.resourceId + '.setVideoPath(Uri.parse("' + object.dataUrl + '"));\n';
          }
          finder += tempFinderString;
        }


        for (let i = 0; i < this.activityData.triggerEventList.length; i++) {
          const aTrigger = this.activityData.triggerEventList[i];
          if (aTrigger.type === 'click') {
            const object = this.appDataService.findObjectById(aTrigger.objectId);
            const clickEventString = object.resourceId + '.setOnClickListener(new View.OnClickListener() {' +
              '\n@Override' +
              '\npublic void onClick(final View v) {\n' +
              'if(currentStage.equals("' + aTrigger.stageId + '")) {\n' +
              this.insertImplEvent(aTrigger) +
              '\n}\n' +
              '\n}});';
            eventString += '\n' + clickEventString + '\n';
          } else if (aTrigger.type === 'onCreate') {
            onCreateEventString += '\n' + this.insertImplEvent(aTrigger);
          } else if (aTrigger.type === 'backKey') {
            const backEventString = 'if(currentStage.equals("' + aTrigger.stageId + '")) {\n' + this.insertImplEvent(aTrigger) + '\n return;}\n';
            backPressedEventData += backEventString;
          }
        }

        if (backPressedEventData.length === 0) {
          backPressedEventData += '\nsuper.onBackPressed();';
        }

        let templateData = temp;
        templateData = templateData.replace("!!!packageName!!!", this.applicationData.applicationId);
        templateData = templateData.replace("!!!activityName!!!", this.activityData.codeActivityName);
        templateData = templateData.replace("!!!layoutName!!!", this.activityData.codeLayoutName);
        templateData = templateData.replace("!!!variableList!!!", variables);
        templateData = templateData.replace("!!!variableFindList!!!", finder);
        templateData = templateData.replace("!!!eventList!!!", eventString);
        templateData = templateData.replace("!!!onCreateEvent!!!", onCreateEventString);
        templateData = templateData.replace("!!!onBackPressedEvent!!!", backPressedEventData);

        this.codeResult['java'] = templateData;

        resolve('');

      });


    });


  }

  insertImplEvent(triggerEvent) {

    let result = '\n';
    const implEvent = this.appDataService.findImplentEventByTriggerEventId(triggerEvent.id);
    if (implEvent.type === 'stageChange') {
      result += this.insertStageChangeEvent(implEvent);
    }
    if (implEvent.type === 'finishActivity') {
      result += 'context.finish();';
    }
    if (implEvent.type === 'startActivity') {
      result += 'context.startActivity(new Intent(context, ' + this.getActivityNameByActivityId(implEvent.toActivityId).codeActivityName + '.class));';
    }
    return result;
  }

  insertStageChangeEvent(implEvent) {

    let result = '';
    const stateEventList = this.appDataService.findStateChangeEventByImplementEventId(implEvent.id);
    const fromStage = this.appDataService.findStageByStageId(implEvent.fromStageId);
    const toStage = this.appDataService.findStageByStageId(implEvent.toStageId);
    const eventVar = this.appDataService.getUniqueResourceName(fromStage.name + '_' + toStage.name);
    let stateEventCount = 0;
    for (let i = 0; i < stateEventList.length; i++) {
      const stateEvent = stateEventList[i];
      if (stateEvent.isEnabled) {
        if (stateEventCount == 0) {
          result += "\nAnimatorSet " + eventVar + " = getStageChangeAnimation(";
          result += ('\n' + this.getStateAnimationString(stateEventList[i]));
        } else {
          result += (',\n' + this.getStateAnimationString(stateEventList[i]));
        }
        stateEventCount++;
      }
    }

    const afterAnmiation = this.appDataService.findTriggerEventByAfterTriggerEventId(implEvent.id);
    let afterAnimationString = '';
    if (afterAnmiation) {
      afterAnimationString = this.insertImplEvent(afterAnmiation);
    }
    if (stateEventCount > 0) {
      result += '); \n';
      result += (
        eventVar + '.addListener(new Animator.AnimatorListener() {\n'
        + '@Override\n'
        + 'public void onAnimationStart(Animator animator) {currentStage = "' + implEvent.fromStageId + '";}\n'
        + '@Override\n'
        + 'public void onAnimationEnd(Animator animator) {currentStage = "' + implEvent.toStageId + '";\n ' + afterAnimationString + '\n}\n'
        + '@Override\n'
        + 'public void onAnimationCancel(Animator animator) {}\n'
        + '@Override\n'
        + 'public void onAnimationRepeat(Animator animator) {}\n'
        + '});\n'
      );
      result += (eventVar + '.start();\n');
    }

    return result;
  }






  getStateAnimationString(event) {
    const fromState = this.appDataService.findStateByStateId(this.activityData, event.fromStateId);
    const toState = this.appDataService.findStateByStateId(this.activityData, event.toStateId);
    const object = this.appDataService.findObjectById(toState.objectId);
    let result = "";
    if (object && toState && fromState) {
      result += "getStateAnimation(" + object.resourceId + "," + event.duration + "," + (event.delay | 0).toFixed(0) + "," + (toState.translationX | 0).toFixed(0) + "," + (toState.translationY | 0).toFixed(0) + "," + (toState.scaleX | 0).toFixed(1) + ", " + (toState.scaleY | 0).toFixed(1) + ", " + (toState.alpha | 0).toFixed(1) + ", " + (toState.rotation | 0).toFixed(0) + ", " + (toState.rotationX | 0).toFixed(0) + ", " + (toState.rotationY | 0).toFixed(0) + ")";
    }
    return result;
  }


  insertChild(objectId) {
    console.log('insertChild = ' + objectId);
    let xmlString = '';
    const object = this.findObjectById(objectId);
    if (object) {
      const state = this.findStateByObjectId(objectId);
      if (state) {
        xmlString += this.getObjectString(object, state);
        if (object.children) {
          for (let i = 0; i < object.children.length; i++) {
            xmlString += this.insertChild(object.children[i].id);
          }
        }
        xmlString += '\n';
        xmlString += this.getCloseString(object);
      }
    }
    return xmlString;
  }







  pxToDp(px) {
    return (px * (160 / 640)).toFixed(0);
  }


  getObjectString(object, state) {

    if (object.type === '#') {
      return '<FrameLayout\n' + this.getStateStringById(object, state) + '>\n';
    } else if (object.type === 'FrameLayout') {
      return '\n<FrameLayout\n' + this.getStateStringById(object, state) + '>\n';
    } else if (object.type === 'RelativeLayout') {
      return '\n<RelativeLayout\n' + this.getStateStringById(object, state) + '>\n';
    } else if (object.type === 'LinearLayout') {
      return '\n<LinearLayout\n' + this.getStateStringById(object, state) + '>\n';
    } else if (object.type === 'ScrollView') {
      return '\n<ScrollView\n' + this.getStateStringById(object, state) + '>\n';
    } else if (object.type === 'HorizontalScrollView') {
      return '\n<HorizontalScrollView\n' + this.getStateStringById(object, state) + '>\n';
    } else if (object.type === 'ImageView') {
      return '\n<ImageView\n' + this.getStateStringById(object, state) + ' />';
    } else if (object.type === 'Button') {
      return '\n<Button\n' + this.getStateStringById(object, state) + ' />';
    } else if (object.type === 'TextView') {
      return '\n<TextView\n' + this.getStateStringById(object, state) + ' />';
    } else if (object.type === 'EditText') {
      return '\n<EditText\n' + this.getStateStringById(object, state) + ' />';
    } else if (object.type === 'LottieAnimationView') {
      return '\n<com.airbnb.lottie.LottieAnimationView\n' + this.getStateStringById(object, state) + ' />';
    } else if (object.type === 'VideoView') {
      return '\n<VideoView\n' + this.getStateStringById(object, state) + ' />';
    }
    console.log('getObjectString finish');
    return '';
  }


  getCloseString(object) {

    if (object.type === '#') {
      return '</FrameLayout >';
    } else if (object.type === 'FrameLayout') {

      return '</FrameLayout >';
    } else if (object.type === 'RelativeLayout') {

      return '</RelativeLayout >';
    } else if (object.type === 'LinearLayout') {

      return '</LinearLayout >';

    } else if (object.type === 'HorizontalScrollView') {

      return '</HorizontalScrollView >';

    } else if (object.type === 'ScrollView') {

      return '</ScrollView>';
    } else if (object.type === 'ImageView') {
      return '';
    }

    return '';
  }

  getStateStringById(object, state) {

    var result = '\n';
    if (state === null) {
      console.log('null state!!!');
    } else {

      result = '\nandroid:id=\"@+id/' + object.resourceId + '\"\nandroid:layout_width=\"' + this.pxToDp(state.width) + 'dp\"\nandroid:layout_height=\"' + this.pxToDp(state.height) + 'dp\"\n';

      if (state.marginLeft) {
        result += 'android:layout_marginLeft=\"' + this.pxToDp(state.marginLeft) + 'dp\"\n';
      }
      if (state.marginTop) {
        result += 'android:layout_marginTop=\"' + this.pxToDp(state.marginTop) + 'dp\"\n';
      }


      if (state.translationX) {
        result += 'android:translationX=\"' + this.pxToDp(state.translationX) + 'dp\"\n';
      }
      if (state.translationY) {
        result += 'android:translationY=\"' + this.pxToDp(state.translationY) + 'dp\"\n';
      }

      if (state.alpha !== 1) {
        result += 'android:alpha=\"' + state.alpha + '\"\n';
      }


      if (state.scaleX !== 1) {
        result += 'android:scaleX=\"' + state.scaleX + '\"\n';
      }
      if (state.scaleY !== 1) {
        result += 'android:scaleY=\"' + state.scaleY + '\"\n';
      }

      //object data
      if (object.background) {

        result += 'android:background=\"' + object.background + '\"\n';
      }


      //TextView
      if (object.contentText) {
        result += 'android:text=\"' + object.contentText + '\"\n';
      }

      if (object.textColor) {

        result += 'android:textColor=\"' + object.textColor + '\"\n';
      }

      if (object.textSize) {
        result += 'android:textSize=\"' + object.textSize + 'sp\"\n';
      }

      //ImageView
      if (object.type === 'ImageView') {
        if (object.dataUrl) {
          result += 'android:scaleType=\"fitXY\"\n';
          result += 'android:src=\"@mipmap/' + object.dataUrl.replace('image/', '').split('.')[0] + '\"\n';
        }
      }

      //LottieAnimationView      
      if (object.type === 'LottieAnimationView') {
        if (object.dataUrl) {
          result += ' app:lottie_fileName="' + object.dataUrl + '\"\n';
        }
      }
    }
    console.log('getStateStringById done');
    return result;

  }








  makeSmallEnglish(origin) {
    let result = this.makeEnglish(origin.toLowerCase());
    if (!isNaN(parseInt(result[0], 10)) || result.length === 0 || result.startsWith('_')) {
      // Is a number
      result = 'image' + result;
    }
    return result;
  }

  makeEnglish(origin) {
    return origin.trim().replace(/\s/gi, '_').replace(/[^a-zA-Z0-9]/g, '_').replace('-', '_');
  }

  getUniqueActivityName(origin) {
    var result = this.makeEnglish(origin);
    if (!isNaN(parseInt(result[0], 10)) || result.length == 0 || result.startsWith('_')) {
      // Is a number
      result = "Activity" + result;
    }
    return this.getUniqueActivitySourceName(result);
  }

  getUniqueResourceName(origin) {

    var result = this.makeSmallEnglish(origin);
    if (!isNaN(parseInt(result[0], 10)) || result.length == 0 || result.startsWith('_')) {
      // Is a number
      result = "resource" + result;
    }
    return this.getUniqueSourceName(result);
  }

  getUniqueLayoutName(origin) {

    var result = this.makeSmallEnglish(origin);
    if (!isNaN(parseInt(result[0], 10)) || result.length == 0 || result.startsWith('_')) {
      // Is a number
      result = "activity_" + result;
    }
    return this.getUniqueActivitySourceName(result);
  }

  getUniqueActivitySourceName(origin) {
    let result = origin;
    let lastId = 0;
    console.log("getUniqueActivitySourceName origin =" + origin);

    while (this.activityIdHash[result]) {
      result = origin + "_" + lastId;
      lastId++;
    }
    this.activityIdHash[result] = true;
    console.log("getUniqueActivitySourceName result =" + result);

    return result;
  }

  getUniqueActivityLayoutName(origin) {
    let result = origin;
    let lastId = 0;
    console.log("getUniqueActivityLayoutName origin =" + origin);

    while (this.activityLayoutIdHash[result]) {
      result = origin + "_" + lastId;
      lastId++;
    }
    this.activityLayoutIdHash[result] = true;
    console.log("getUniqueActivityLayoutName result =" + result);

    return result;
  }



  getUniqueSourceName(origin) {
    let result = origin;
    let lastId = 0;
    console.log("origin =" + origin);

    while (this.idHash[result]) {
      result = origin + "_" + lastId;
      lastId++;
    }
    this.idHash[result] = true;
    console.log("result =" + result);

    return result;
  }



  getUniuqeId(targetList, prefix) {
    if (prefix) {
      return this.getUniqueName(targetList, this.makeSmallEnglish(prefix));
    } else {
      return this.getUniqueName(targetList, 'id_');
    }
  }


  getUniqueName(targetList, origin) {
    let result = origin;
    let indexId = 0;
    while (this.contains(targetList, result)) {
      result = origin + '_' + indexId;
      indexId++;
    }
    targetList.push(result);
    return result;
  }




  contains(list, obj) {
    let i = list.length;
    while (i--) {
      if (this[i] === obj) {
        return true;
      }
    }
    return false;
  }






  findStateByObjectId(objectId: string) {
    return this.findStateByObjectIdWithStageId(objectId, this.selectedStage.id);
  }

  findAllStateByObjectId(objectId: string) {
    const result = [];
    for (let i = 0; i < this.activityData.stateList.length; i++) {
      const aState = this.activityData.stateList[i];
      if (aState.objectId === objectId) {
        result.push(aState);
      }
    }
    return result;
  }

  findAllStateByStageId(stageId: string) {
    const result = [];
    for (let i = 0; i < this.activityData.stateList.length; i++) {
      const aState = this.activityData.stateList[i];
      if (aState.stageId === stageId) {
        result.push(aState);
      }
    }
    return result;
  }


  findStateByObjectIdWithStageId(objectId: string, stageId: string) {
    return this.findStateByObjectIdWithList(this.activityData.stateList, objectId, stageId);
  }

  findStateByObjectIdWithList(targetList: any, objectId: string, stageId: string) {
    for (let i = 0; i < targetList.length; i++) {
      const aState = targetList[i];
      if (aState.objectId === objectId && aState.stageId === stageId) {
        return aState;
      }
    }
    return null;
  }




  findObjectById(objectId: string) {
    return this.findObjectByIdWithList(this.activityData.objectList, objectId);
  }

  findObjectByIdWithList(targetList: any, objectId: string) {
    for (let i = 0; i < targetList.length; i++) {
      const aObject = targetList[i];
      if (aObject.id === objectId) {
        return aObject;
      }
      if (aObject.children && aObject.children.length > 0) {
        const childResult = this.findObjectByIdWithList(aObject.children, objectId);
        if (childResult) {
          return childResult;
        }
      }
    }
    return null;
  }




}
