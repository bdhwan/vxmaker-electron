import { Injectable } from '@angular/core';
import { ApplicationDataServiceService } from '../service/application-data-service.service';


@Injectable()
export class CodeGeneratorService {

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


  public makeActivitySourceCode(applicationData, activityData) {

    return new Promise((resolve, reject) => {

      this.applicationData = applicationData;
      this.activityData = activityData;
      this.selectedStage = activityData.stageList[0];

      // this.lastId = 0;


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

  makeActivityLayout() {
    return new Promise((resolve, reject) => {
      const self = this;

      this.appDataService.loadTemplateString('/source_template/activity_main.xml').then(result => {
        let temp = result + '';
        const xmlString = this.insertChild('root');

        this.objectList = this.appDataService.getAllObjectList(this.activityData.objectList);
        for (let i = 0; i < this.objectList.length; i++) {
          const object = this.objectList[i];
          console.log(i + "-" + object.name);
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
        let finder = '';
        let eventString = '';

        for (let i = 0; i < this.objectList.length; i++) {
          //make resource name
          const object = this.objectList[i];
          const tempVariableString = object.type + ' ' + object.resourceId + ';\n';
          const tempFinderString = object.resourceId + " = (" + object.type + ")findViewById(R.id." + object.resourceId + ");\n";
          variables += tempVariableString;
          finder += tempFinderString;
        }






        // for (let i = 0; i < this.activityData.objectList.length; i++) {
        //   //make resource name
        //   const object = this.activityData.objectList[i];
        //   let eventList = [];



        // }



        // for (var i = 0; i < data.animObjects.length; i++) {
        //   var objectData = data.animObjects[i];
        //   //click event
        //   var eventList = [];
        //   for (var j = 0; j < data.animEvents.length; j++) {
        //     var checkEvent = data.animEvents[j];
        //     if (checkEvent.kind == 'click' && objectData.id == checkEvent.triggerObjectId) {
        //       eventList.push(checkEvent);
        //     }
        //   }
        //   if (eventList.length > 0) {
        //     var tempEventString =
        //       objectData.resourceId + ".setOnClickListener(new View.OnClickListener() {" +
        //       "\n@Override" +
        //       "\npublic void onClick(final View v) {";

        //     for (var j = 0; j < eventList.length; j++) {
        //       var event = eventList[j];

        //       var conditionString = null;
        //       if (event.conditions) {
        //         conditionString = this.getConditionString(event, data);
        //       }

        //       console.log("event = " + JSON.stringify(event));

        //       var triggerEvent = this.getEventById(event.triggerEventId, data);
        //       if (!triggerEvent) {
        //         continue;
        //       }


        //       var fireEventString = this.getEventFireString(triggerEvent, data);
        //       if (!fireEventString) {
        //         continue;
        //       }


        //       if (conditionString) {
        //         fireEventString = conditionString.replace('!!!eventString!!!', fireEventString)
        //       }
        //       tempEventString += "\n" + fireEventString + "\n";
        //     }

        //     tempEventString += "\n" +
        //       "\n}});";
        //     eventString += "\n" + tempEventString + "\n";
        //   }

        //   eventList = [];
        //   for (var j = 0; j < data.animEvents.length; j++) {
        //     var checkEvent = data.animEvents[j];
        //     if (checkEvent.kind == 'longClick' && objectData.id == checkEvent.triggerObjectId) {
        //       eventList.push(checkEvent);
        //     }
        //   }
        //   if (eventList.length > 0) {
        //     var tempEventString =
        //       objectData.resourceId + ".setOnLongClickListener(new View.OnLongClickListener() {" +
        //       "\n@Override" +
        //       "\npublic boolean onLongClick(final View v) {";

        //     for (var j = 0; j < eventList.length; j++) {
        //       var event = eventList[j];

        //       var conditionString = null;
        //       if (event.conditions) {
        //         conditionString = this.getConditionString(event, data);
        //       }

        //       var fireEventString = this.getEventFireString(this.getEventById(event.triggerEventId, data), data);

        //       if (conditionString) {
        //         fireEventString = conditionString.replace('!!!eventString!!!', fireEventString)
        //       }
        //       tempEventString += "\n" + fireEventString + "\n";
        //     }

        //     tempEventString += "\nreturn true;" +
        //       "\n}});";
        //     eventString += "\n" + tempEventString + "\n";
        //   }
        // }




        //onCreate
        var onCreateEventList = [];
        // for (var i = 0; i < data.animEvents.length; i++) {
        //   var checkEvent = data.animEvents[i];
        //   if (checkEvent.kind == 'onCreate') {
        //     onCreateEventList.push(checkEvent);
        //   }
        // }

        console.log("onCreateEventList = " + onCreateEventList.length);
        var onCreateEventString = "";
        // if (onCreateEventList.length > 0) {
        //   console.log("onCreateEventList2");
        //   for (var i = 0; i < onCreateEventList.length; i++) {
        //     var event = onCreateEventList[i];
        //     var fireEventString = this.getEventFireString(this.getEventById(event.triggerEventId, data), data);
        //     onCreateEventString += "\n" + fireEventString;
        //     console.log("onCreateEventList3");;
        //   }

        // }

        console.log("onCreateEventList4");

        var stageTemplateData = "";
        // if (this.needStageAnimationTemplate) {
        //   var stageTemplatePath = __dirname + "/template/source_template/StageAnimationFormat.java";
        //   stageTemplateData = fs.readFileSync(stageTemplatePath, 'utf-8');
        // }


        // var activityTemplatePath = __dirname + "/template/source_template/MainActivity.java";
        let templateData = temp;
        templateData = templateData.replace("!!!packageName!!!", this.applicationData.applicationId);
        templateData = templateData.replace("!!!activityName!!!", this.activityData.codeActivityName);
        templateData = templateData.replace("!!!layoutName!!!", this.activityData.codeLayoutName);
        templateData = templateData.replace("!!!variableList!!!", variables);
        templateData = templateData.replace("!!!variableFindList!!!", finder);
        templateData = templateData.replace("!!!eventList!!!", eventString);
        templateData = templateData.replace("!!!onCreateEvent!!!", onCreateEventString);
        templateData = templateData.replace("!!!stageAnimationFormat!!!", stageTemplateData);


        this.codeResult['java'] = templateData;//this.appDataService.makeBeautifyWithCount(templateData, 40);

        resolve('');

      });


    });


  }






  insertChild(objectId) {
    // console.log('insertChild = ' + objectId);
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
    return px * (160 / 640);
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

      result = '\nandroid:id=\"@+id/' + object.resourceId + '\"\nandroid:tag=\"' + state.id + '\"\nandroid:layout_width=\"' + this.pxToDp(state.width) + 'dp\"\nandroid:layout_height=\"' + this.pxToDp(state.height) + 'dp\"\n';

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
      if (object.dataUrl) {
        result += 'android:scaleType=\"fitXY\"\n';
        result += 'android:src=\"@mipmap/' + object.dataUrl.replace('image/', '').split('.')[0] + '\"\n';
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
