import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UUID } from 'angular2-uuid';
import { BroadcastService } from './broadcast.service';
import { ColorPickerService, Rgba } from 'ngx-color-picker';
import * as Parse from 'parse';



declare var electron: any;
declare var html_beautify: any;
declare var js_beautify: any;
declare var css_beautify: any;






@Injectable()
export class ApplicationDataServiceService {

  History = Parse.Object.extend('History');



  activityId: String;
  applicationFolderPath: string;
  applicationData;
  activityMetaData;
  activityData;

  selectedObject;
  hoverObject;

  selectedStage;
  selectedState;

  selectedTriggerEvent;
  selectedImplementEvent;


  objectTypeData = [];
  defaultStateData;

  imageResourceList;
  fileResourceList;

  deviceList = [];


  dpi = 'xxxhdpi';
  zoom = 0.18;

  templeteFolderPath = './assets/template';
  templateHash = {};

  parsePsdPromise: any;
  capturePromise: any;
  isInstallPromise: any;
  installPromise: any;
  heartBeatPromise: any;
  getMacPromise: any;



  idHash = {};
  activityIdHash = {};
  activityLayoutIdHash = {};

  objectList;
  codeResult = {};
  fontData;

  //template data hash
  templateDataHash = {};
  templateNameList = [
    'activity_main.xml',
    'MainActivity.java',
    'AndroidManifest.xml',
    'build.gradle',
    'strings.xml',
  ];
  templateFileList = [
    '/source_template/activity_main.xml',
    '/source_template/MainActivity.java',
    '/source_template/AndroidManifest.xml',
    '/source_template/build.gradle',
    '/source_template/strings.xml',
  ];


  triggerEventIconHash = {
    click: 'assets/images/btn_click_s.png',
    onCreate: 'assets/images/btn_oncreate_s.png',
    backKey: 'assets/images/btn_backkey_s.png',
    afterAnimation: 'assets/images/btn_afteranimation_ss.png'
  };

  implEventIconHash = {
    stageChange: 'assets/images/btn_stagechange_s.png',
    startActivity: 'assets/images/btn_startactivity_s.png',
    finishActivity: 'assets/images/btn_finishactivity_s.png',
    takePicture: 'assets/images/btn_takepicture_s.png',
    startLottie: 'assets/images/btn_startlottie_s.png',
    stopLottie: 'assets/images/btn_stoplottie_s.png',
    startVideo: 'assets/images/btn_startvideo_s.png',
    stopVideo: 'assets/images/btn_stopvideo_s.png'
  };


  constructor(private http: Http, private cpService: ColorPickerService, private broadcaster: BroadcastService) {
    const self = this;


    if (electron) {

      electron.ipcRenderer.on('parse-psd-result', (event, arg) => {
        this.parsePsdPromise(arg);
      });

      electron.ipcRenderer.on('capture-screen-result', (event, arg) => {
        this.capturePromise(arg);
      });

      electron.ipcRenderer.on('is-installed-result', (event, arg) => {
        this.isInstallPromise(arg);
      });

      electron.ipcRenderer.on('installed-result', (event, arg) => {
        this.installPromise(arg);
      });

      electron.ipcRenderer.on('heart-beat-result', (event, arg) => {
        this.heartBeatPromise(arg);
      });

      electron.ipcRenderer.on('get-mac-address-result', (event, arg) => {
        this.getMacPromise(arg);
      });
    }
  }


  insertHistory(page, etc) {
    console.log("page = " + page);
    const mac = electron.ipcRenderer.sendSync('get-mac-address');
    const aNew = new this.History();
    aNew.set('page', page);
    aNew.set('mac', mac);
    if (etc) {
      aNew.set('etc', etc);
    }
    aNew.save();
  }

  getMacAddress() {
    return new Promise((resolve, reject) => {
      this.getMacPromise = resolve;

    });
  }


  createNewActivity(applicationFolderPath, activityId) {

    const now = new Date().getTime();
    const newActivityMetaData = {
      activityId: activityId,
      activityName: 'UntitledActivityName_' + (this.applicationData.activityList.length),
      createdAt: now,
      updatedAt: now,
      previewPath: 'preview/' + activityId + '.jpg'
    };
    const newActivityData = {
      activityId: activityId
    };

    if (this.applicationData.activityList.length === 0) {
      this.applicationData.launcherActivityId = activityId;
    }

    this.applicationData.activityList.push(newActivityMetaData);

    this.saveApplicationData(this.applicationData);
    this.saveActivityData(activityId, newActivityData);
    this.copyFileFromRoot('/template/sample/temp/white.png', this.applicationFolderPath + '/' + newActivityMetaData.previewPath);

  }


  createNewApplication(applicationFolder, applicationName) {




    electron.ipcRenderer.sendSync('make-folder', applicationFolder);
    electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/activity');
    electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/image');
    electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/file');

    this.copyFolderFromRoot('/template/sample/file', applicationFolder + '/file');
    this.copyFolderFromRoot('/template/sample/image', applicationFolder + '/image');

    electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/export');
    electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/preview');

    const now = new Date().getTime();
    const data = {
      createdAt: now,
      updatedAt: now,
      applicationName: applicationName,
      applicationId: 'com.altamirasoft.' + applicationName,
      iconPath: 'image/ic_launcher.png',
      activityList: [],
      imageList: [],
      fileList: []
    };
    const filePath = applicationFolder + '/app.json';
    electron.ipcRenderer.sendSync('save-file-data', filePath, data);
  }


  parsePsdFile(psdFilePath, applicationFolderPath) {
    return new Promise((resolve, reject) => {
      this.parsePsdPromise = resolve;
      electron.ipcRenderer.send('parse-psd', psdFilePath, applicationFolderPath);
    });
  }




  initApplicationPath(applicationFolderPath) {
    this.applicationFolderPath = applicationFolderPath;
  }


  initActivityId(activityId) {
    this.activityId = activityId;
  }


  getCurrentActivityId() {
    return this.activityId;
  }


  getApplicationPath() {
    return this.applicationFolderPath;
  }


  openUrl(url) {
    console.log("will open url = " + url);
    electron.ipcRenderer.sendSync('open-url', url);
  }

  openFinder(path) {
    electron.ipcRenderer.sendSync('open-finder', path);
  }


  openMainWindowUrl(path) {
    console.log('path = ' + path);
    return electron.ipcRenderer.sendSync('go-main-window', path);
  }

  closeMainWindowUrl() {
    console.log('close main window');
    return electron.ipcRenderer.sendSync('close-main-window');
  }



  changeWindowSize(width, height, resizeable) {
    electron.ipcRenderer.sendSync('change-window', width, height, resizeable);
  }

  removeRecentProjectList() {
    const temp = {
      'applicationFolderPath': this.applicationFolderPath
    };
    electron.ipcRenderer.sendSync('remove-recent-project-list', temp);
  }

  removeRecentProjectListWithPath(path) {
    const temp = {
      'applicationFolderPath': path
    };
    electron.ipcRenderer.sendSync('remove-recent-project-list', temp);
  }


  addRecentProjectList(applicationName) {
    const historyData = {
      applicationFolderPath: this.applicationFolderPath,
      applicationName: applicationName,
    }
    electron.ipcRenderer.send('add-recent-project', historyData);
  }

  getRecentProjectList() {
    if (electron) {
      return JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('get-recent-project-list')));
    } else {
      return [];
    }
  }

  saveApplicationData(applicationData) {

    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + '/app.json', applicationData);
  }

  saveActivityData(activityId, activityData) {
    activityData.dpi = this.dpi;
    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + '/activity/' + activityId + '.json', activityData);
  }


  duplicateActivityData(srcAtivityId, dstActivityId) {

    const tempActivityData = this.loadActivityDataSync(srcAtivityId);
    tempActivityData['activityId'] = dstActivityId;
    this.saveActivityData(dstActivityId, tempActivityData);
  }


  deleteActivity(activityId) {
    electron.ipcRenderer.sendSync('delete-file', this.applicationFolderPath + '/activity/' + activityId + '.json');
    electron.ipcRenderer.sendSync('delete-file', this.applicationFolderPath + '/preview/' + activityId + '.jpg');
  }

  captureScreen(x, y, w, h, filePath) {
    return new Promise((resolve, reject) => {
      this.capturePromise = resolve;
      electron.ipcRenderer.send('capture-screen', x, y, w, h, filePath);
    });
  }




  selectPsdFile() {
    return electron.ipcRenderer.sendSync('select-psd-file');
  }

  selectImageFile() {
    return electron.ipcRenderer.sendSync('select-image-file');
  }

  selectImageFiles() {
    return electron.ipcRenderer.sendSync('select-image-files');
  }

  selectFile() {
    return electron.ipcRenderer.sendSync('select-file');
  }

  selectFiles() {
    return electron.ipcRenderer.sendSync('select-files');
  }

  selectFilesWithType(fileType) {
    return electron.ipcRenderer.sendSync('select-files-with-type', fileType);
  }


  getWorkspaceFolderPath() {
    return electron.ipcRenderer.sendSync('get-workspace-folder-path');
  }
  getExportFolderPath() {
    return electron.ipcRenderer.sendSync('get-export-folder-path');
  }

  selectWorkspaceFolderPath() {
    return electron.ipcRenderer.sendSync('select-workspace-folder-path');
  }



  selectWorkspaceFolderPathFrom(beforePath) {
    return electron.ipcRenderer.sendSync('select-workspace-folder-path', beforePath);
  }


  readFileData(path) {
    return JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', path)));
  }

  deleteFile(path) {
    electron.ipcRenderer.sendSync('delete-file', path);
  }

  writeFile(path, data) {
    electron.ipcRenderer.sendSync('write-file-data', path, data);
  }

  copyFile(src, dst) {
    electron.ipcRenderer.sendSync('copy-file', src, dst);
    return true;
  }

  copyFolder(src, dst) {
    electron.ipcRenderer.sendSync('copy-folder', src, dst);
    return true;
  }

  haveFile(path) {
    return electron.ipcRenderer.sendSync('have-file', path);
  }

  copyFolderFromRoot(src, dst) {
    electron.ipcRenderer.sendSync('copy-folder-from-root', src, dst);
    return true;
  }
  copyFileFromRoot(src, dst) {
    electron.ipcRenderer.sendSync('copy-file-from-root', src, dst);
    return true;
  }
  makeFolder(path) {
    electron.ipcRenderer.sendSync('make-folder', path);
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
    return this.getUniqueSourceName(result);
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
    return this.getUniqueSourceName(result);
  }


  getUniqueSourceName(origin) {
    var result = origin;
    let lastId = 0;
    while (this.idHash[result]) {
      result = origin + '_' + lastId;
      lastId++;
    }
    this.idHash[result] = true;
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


  getUniqueImageName(path) {
    let name = this.getFileName(path);
    const ext = this.getFileExt(path);
    name = this.getUniuqeId(this.imageResourceList, name);
    return name + ext;
  }

  getUniqueFileName(path) {
    let name = this.getFileName(path);
    const ext = this.getFileExt(path);
    name = this.getUniuqeId(this.fileResourceList, name);
    return name + ext;
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





  getFileName(path) {
    return electron.ipcRenderer.sendSync('get-file-name', path);
  }

  getFileNameBase(path) {
    return electron.ipcRenderer.sendSync('get-file-name-base', path);
  }

  getFileExt(path) {
    return electron.ipcRenderer.sendSync('get-file-ext', path);
  }







  getHttpToJson(targetUrl) {
    return new Promise((resolve, reject) => {
      this.http.get(targetUrl).subscribe(res => {
        const data = res.json();
        resolve(data);
      });
    });
  }


  public loadTemplete() {
    return new Promise((resolve, reject) => {
      const promiseList = [];
      for (let i = 0; i < this.templateNameList.length; i++) {
        const name = this.templateNameList[i];
        const path = this.templateFileList[i];
        promiseList.push(this.loadTemplateStringByNamePath(name, path));
      }
      Promise.all(promiseList).then(result => {
        resolve(result);
      });
    });
  }



  loadTemplateStringByNamePath(name, path) {
    return new Promise((resolve, reject) => {
      this.loadTemplateString(path).then(result => {
        this.templateDataHash[name] = result;
        resolve(result);
      });
    });
  }



  loadFontData() {
    return new Promise((resolve, reject) => {
      const self = this;
      if (this.fontData) {
        resolve(this.fontData);
      } else {
        this.getHttpToJson('assets/fonts/webfonts.json').then(result => {
          self.fontData = result;
          resolve(self.fontData);
        });
      }
    });
  }


  loadInitDataFromFile() {
    return new Promise((resolve, reject) => {
      //오브젝트 타입 정보 불러오기
      this.loadTemplete().then(result => {
        return this.getHttpToJson('assets/object/object.json');
      }).then((data: any) => {
        const reqeustList = [];
        for (let i = 0; i < data.objectType.length; i++) {
          reqeustList.push(this.getHttpToJson('assets/object/' + data.objectType[i]));
        }
        this.defaultStateData = data.defaultState;

        return Promise.all(reqeustList);
      }).then((results: any) => {
        console.log('results =' + JSON.stringify(results));
        this.objectTypeData = results;
        resolve(true);
      }).catch(function (err) {
        console.log('catch = ' + JSON.stringify(err));
        reject(err);
      });
    });
  }


  refreshDeviceList() {
    this.deviceList = electron.ipcRenderer.sendSync('get-device-list');
  }

  getDeviceList() {
    return this.deviceList;
  }


  getObjectTypeData() {
    return this.objectTypeData;
  }

  getDefaultStateData() {
    return this.defaultStateData;
  }



  getApplicationData() {
    return this.applicationData;
  }

  getActivityMetaData() {
    return this.activityMetaData;
  }

  getActivityData() {
    return this.activityData;
  }

  getObjectList() {
    return this.getAllObjectList(this.activityData.objectList);
  }

  getAllObjectList(targetList) {
    const result = [];
    for (let i = 0; i < targetList.length; i++) {
      const aObject = targetList[i];
      result.push(aObject);
      if (aObject.children && aObject.children.length > 0) {
        const childResult = this.getAllObjectList(aObject.children);
        for (let j = 0; j < childResult.length; j++) {
          result.push(childResult[j]);
        }
      }
    }
    return result;

  }

  saveRawFile(filePath, data) {
    electron.ipcRenderer.sendSync('save-raw-data', filePath, data);
  }

  loadApplicationData() {
    console.log('loadApplicationData -' + this.applicationFolderPath);
    return new Promise((resolve, reject) => {
      this.applicationData = electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + '/app.json');
      console.log('loadApplicationData done -' + JSON.stringify(this.applicationData));
      for (let i = 0; i < this.applicationData.activityList.length; i++) {
        const activity = this.applicationData.activityList[i];
        if (activity.activityId === this.activityId) {
          this.activityMetaData = activity;
          break;
        }
      }
      console.log('will read = this.activityId =' + this.activityId);
      this.activityData = electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + '/activity/' + this.activityId + '.json');
      resolve(true);
    });
  }


  loadApplicationDataSync() {
    this.applicationData = electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + '/app.json');
    return this.applicationData;
  }

  setApplicationData(data) {
    this.applicationData = data;
  }


  setActivityData(data) {
    this.activityData = data;
    for (let i = 0; i < this.applicationData.activityList.length; i++) {
      const activity = this.applicationData.activityList[i];
      if (activity.activityId === this.activityId) {
        this.activityMetaData = activity;
        break;
      }
    }
  }


  loadActivityDataSync(activityId) {
    return electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + '/activity/' + activityId + '.json');
  }


  loadTemplateString(file) {
    return new Promise((resolve, reject) => {
      if (this.templateHash[file]) {
        resolve(this.templateHash[file]);
      } else {
        this.http.get(this.templeteFolderPath + '/' + file)
          .subscribe(res => {
            this.templateHash[file] = res['_body'];
            resolve(this.templateHash[file]);
          });
      }
    });
  }


  loadDataFromUrl(file) {
    return new Promise((resolve, reject) => {
      if (this.templateHash[file]) {
        resolve(this.templateHash[file]);
      } else {
        this.http.get(file)
          .subscribe(res => {
            this.templateHash[file] = res['_body'];
            resolve(this.templateHash[file]);
          });
      }
    });
  }
















  readFileSync(filePath) {
    return electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + '/' + filePath);
  }


  readFile(filePath) {
    return new Promise((resolve, reject) => {
      const result = electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + '/' + filePath);
      resolve(result);
    });
  }

  readFileAbsolutePath(filePath) {
    return new Promise((resolve, reject) => {
      const result = electron.ipcRenderer.sendSync('read-file-data', filePath);
      resolve(result);
    });
  }


  setSelectedStage(value) {
    this.selectedStage = value;
    if (this.selectedObject) {
      this.selectedState = this.findStateByObjectId(this.selectedObject.id);
    }
  }
  setSelectedStageByStageId(stageId) {

    let value = null;
    for (let i = 0; i < this.activityData.stageList.length; i++) {
      const aStage = this.activityData.stageList[i];
      if (stageId === aStage.id) {
        value = aStage;
        break;
      }
    }

    console.log("value = " + JSON.stringify(value));
    this.setSelectedStage(value);


    // this.selectedStage = value;
    // if (this.selectedObject) {
    //   this.selectedState = this.findStateByObjectId(this.selectedObject.id);
    // }
  }
  setSelectedObject(value) {
    this.selectedObject = value;
    this.selectedState = this.findStateByObjectId(this.selectedObject.id);
  }


  setSelectedTriggerEvent(event) {
    this.selectedTriggerEvent = event;
  }

  setSelectedImplementEvent(event) {
    this.selectedImplementEvent = event;
  }


  getSelectedImplementEvent() {
    return this.selectedImplementEvent;
  }

  getSelectedTriggerEvent() {
    return this.selectedTriggerEvent;
  }

  getSelectedStage() {
    return this.selectedStage;
  }

  getSelectedObject() {
    return this.selectedObject;
  }

  getSelectedState() {
    return this.selectedState;
  }

  getAllSelectedState() {
    return this.findAllStateByStageId(this.selectedStage.id);
  }

  getImageSize(path) {
    return electron.ipcRenderer.sendSync('get-image-size', path);
  }







  createNewState(objectId: string, stageId: string, type: string) {
    const newState = {
      id: 'state_' + UUID.UUID(),
      objectId: objectId,
      stageId: stageId,
      width: 1440,
      height: 2560,
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      translationX: 0,
      translationY: 0,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      alpha: 1,
    };


    // fetch default state value
    const defaultObject = this.findObjectBasicDataByType(type);
    for (let i = 0; i < defaultObject.stateProperties.length; i++) {
      const aProperty = defaultObject.stateProperties[i];
      newState[aProperty.name] = aProperty.default;
    }
    return newState;
  }

  findObjectBasicDataByType(type: string) {
    for (let i = 0; i < this.objectTypeData.length; i++) {
      const aData = this.objectTypeData[i];
      if (type === aData.type) {
        return aData;
      }
    }
    return null;
  }

  findImplentEventByImplEventId(implEventId: string) {
    for (let i = 0; i < this.activityData.implementEventList.length; i++) {
      const aEvent = this.activityData.implementEventList[i];
      if (aEvent.id === implEventId) {
        return aEvent;
      }
    }
    return null;
  }

  findImplentEventByTriggerEventId(triggerEventId: string) {
    for (let i = 0; i < this.activityData.implementEventList.length; i++) {
      const aEvent = this.activityData.implementEventList[i];
      if (aEvent.triggerEventId === triggerEventId) {
        return aEvent;
      }
    }
    return null;
  }

  findTriggerEventByAfterTriggerEventId(implEventId: string) {
    for (let i = 0; i < this.activityData.triggerEventList.length; i++) {
      const aEvent = this.activityData.triggerEventList[i];
      if (aEvent.afterTriggerEventId && aEvent.afterTriggerEventId === implEventId) {
        return aEvent;
      }
    }
    return null;
  }



  deleteTriggerEventByTriggerEventId(triggerEventid: any) {
    let index = -1;
    for (let i = 0; i < this.activityData.triggerEventList.length; i++) {
      const aEvent = this.activityData.triggerEventList[i];
      if (aEvent.id === triggerEventid) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      const removed = this.activityData.triggerEventList[index];
      this.activityData.triggerEventList.splice(index, 1);
      this.deleteImplementEventByTriggerEventId(removed.id);
    }
  }

  deleteTriggerEvent(triggerEvent: any) {
    this.deleteTriggerEventByTriggerEventId(triggerEvent.id);
  }

  deleteImplementEventByTriggerEventId(triggerEventId: string) {

    let index = -1;
    for (let i = 0; i < this.activityData.implementEventList.length; i++) {
      const aEvent = this.activityData.implementEventList[i];
      if (aEvent.triggerEventId === triggerEventId) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      const removed = this.activityData.implementEventList[index];
      this.activityData.implementEventList.splice(index, 1);
      if (removed.type === 'stageChange') {
        this.deleteStageChangeEventByImplementEventId(removed.id);
        this.deleteAfterAnimationEventByImplentEventId(removed.id);
      }
    }
  }



  deleteImplementEventByImplEventId(implEventId: string) {

    let index = -1;
    for (let i = 0; i < this.activityData.implementEventList.length; i++) {
      const aEvent = this.activityData.implementEventList[i];
      if (aEvent.id === implEventId) {
        index = i;
        break;
      }
    }


    if (index !== -1) {
      const removed = this.activityData.implementEventList[index];
      this.activityData.implementEventList.splice(index, 1);
      if (removed.type === 'stageChange') {
        this.deleteStageChangeEventByImplementEventId(removed.id);
        this.deleteAfterAnimationEventByImplentEventId(removed.id);
      }
    }
  }



  deleteAfterAnimationEventByImplentEventId(implementEventId) {
    for (let i = 0; i < this.activityData.triggerEventList.length; i++) {
      const aEvent = this.activityData.triggerEventList[i];
      if (aEvent.afterTriggerEventId === implementEventId) {
        this.deleteTriggerEvent(aEvent);
      }
    }
  }

  deleteStageChangeEventByImplementEventId(implementEventId: string) {
    const afterArray = [];
    for (let i = 0; i < this.activityData.stateEventList.length; i++) {
      const aEvent = this.activityData.stateEventList[i];
      if (aEvent.implementEventId === implementEventId) {
        continue;
      }
      afterArray.push(aEvent);
    }
    this.activityData.stateEventList = afterArray;
  }


  findStateChangeEventByImplementEventId(implementEventId: string) {

    const result = [];
    for (let i = 0; i < this.activityData.stateEventList.length; i++) {
      const aEvent = this.activityData.stateEventList[i];
      if (aEvent.implementEventId === implementEventId) {
        result.push(aEvent);
      }
    }
    return result;
  }

  findStageByStageId(stageId) {
    for (let i = 0; i < this.activityData.stageList.length; i++) {
      if (stageId === this.activityData.stageList[i].id) {
        return this.activityData.stageList[i];
      }
    }
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

  deleteStage(stageId) {
    console.log("will delete stage = " + stageId);


    //delete event
    let removeTriggerEventList = [];
    for (let i = 0; i < this.activityData.triggerEventList.length; i++) {
      const aEvent = this.activityData.triggerEventList[i];

      if (aEvent.stageId === stageId) {
        removeTriggerEventList.push(aEvent);
      }
    }


    for (let i = 0; i < removeTriggerEventList.length; i++) {
      this.deleteTriggerEvent(removeTriggerEventList[i]);
    }



    removeTriggerEventList = [];
    for (let i = 0; i < this.activityData.implementEventList.length; i++) {
      const aEvent = this.activityData.implementEventList[i];
      if (aEvent.fromStageId === stageId || aEvent.toStageId === stageId) {
        removeTriggerEventList.push(aEvent);
      }
    }


    for (let i = 0; i < removeTriggerEventList.length; i++) {
      this.deleteTriggerEventByTriggerEventId(removeTriggerEventList[i].triggerEventId);
      this.deleteImplementEventByTriggerEventId(removeTriggerEventList[i].triggerEventId);
      this.deleteImplementEventByImplEventId(removeTriggerEventList[i].id);
    }

    // //delete state
    this.deleteStateByStageId(stageId);


    //delete stage
    const stageResult = [];
    const targetStageList = this.activityData.stageList;
    for (let i = 0; i < targetStageList.length; i++) {
      const aStage = targetStageList[i];
      if (aStage.id === stageId) {
        continue;
      }
      stageResult.push(aStage);
    }
    this.activityData.stageList = stageResult;



  }


  deleteStateByStageId(stageId) {
    //remove state
    const stateresult = [];
    const targetStateList = this.activityData.stateList;
    for (let i = 0; i < targetStateList.length; i++) {
      const aState = targetStateList[i];
      if (aState.stageId === stageId) {
        continue;
      }
      stateresult.push(aState);
    }
    this.activityData.stateList = stateresult;
  }


  findStateByStateId(activityData, stateId: string) {
    for (let i = 0; i < activityData.stateList.length; i++) {
      const aState = activityData.stateList[i];
      if (aState.id === stateId) {
        return aState;
      }
    }
    return null;
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



  createNewObject(type) {

    const defaultObject = this.findObjectBasicDataByType(type);
    const newObject = {
      id: 'object_' + UUID.UUID(),
      canHaveChildren: false,
      isExpanded: true
    };

    for (let i = 0; i < defaultObject.objectProperties.length; i++) {
      const aProperty = defaultObject.objectProperties[i];
      newObject[aProperty.name] = aProperty.default;
      console.log("aProperty.name =" + aProperty.default);
    }

    if (newObject.canHaveChildren) {
      newObject['children'] = [];
    }
    return newObject;
  }


  setDpi(value) {
    this.dpi = value;
  }

  getDpi() {
    return this.dpi;
  }
  setZoom(value) {
    this.zoom = value;
  }

  getZoom() {
    return this.zoom;
  }



  getObjectStyle(state) {
    const tempObjectData = this.findObjectById(state.objectId);
    const objectStyle = {
      'position': 'absolute',
      'width': state.width * this.zoom + 'px',
      'height': state.height * this.zoom + 'px',
      'background-color': this.hexToRgbA(tempObjectData.backgroundColor),
      'opacity': state.alpha,
      'margin-left': this.getMarginLeft(state, tempObjectData) * this.zoom + 'px',
      'margin-top': this.getMarginTop(state, tempObjectData) * this.zoom + 'px',
      'transform': 'rotate(' + state.rotate + 'deg) scale(' + state.scaleX + ',' + state.scaleY + ')'
    };
    return objectStyle;
  }

  hexToRgbA(hex) {

    // // Split to four channels
    // var c = hex.match(/.{1,2}/g);

    // // Function: to decimals (for RGB)
    // var d = function (v) {
    //   return parseInt(v, 16);
    // };
    // // Function: to percentage (for alpha), to 3 decimals
    // var p = function (v) {
    //   return parseFloat(parseInt((parseInt(v, 16) / 255) * 1000) / 1000);
    // };

    // // Check format: if it's argb, pop the alpha value from the end and move it to front
    // var a, rgb = [];
    // if ($('#format').val() == 'argb') {
    //   c.unshift(c.pop());
    // }

    // // Convert array into rgba values
    // a = p(c[3]);
    // $.each(c.slice(0, 3), function (i, v) {
    //   rgb.push(d(v));
    // });
    return hex;
  }



  getSelectedObjectStyle(state) {
    if (!state) {
      return {};
    }
    const tempObjectData = this.findObjectById(state.objectId);
    if (tempObjectData === null) {
      return {};
    }

    if (tempObjectData.id === 'root') {
      const objectStyle = {
        'position': 'absolute',
        'width': state.width * this.zoom + 'px',
        'height': state.height * this.zoom + 'px',
        'border': '0px solid grey',
        'vertical-align': 'text-top',
        'margin-left': this.getMarginLeft(state, tempObjectData) * this.zoom + 'px',
        'margin-top': this.getMarginTop(state, tempObjectData) * this.zoom + 'px',
      };
      return objectStyle;
    } else {
      const objectStyle = {
        'position': 'absolute',
        'width': state.width * this.zoom + 'px',
        'height': state.height * this.zoom + 'px',
        'border': '1px solid #46a2ba',
        'vertical-align': 'text-top',
        'margin-left': this.getMarginLeft(state, tempObjectData) * this.zoom + 'px',
        'margin-top': this.getMarginTop(state, tempObjectData) * this.zoom + 'px',
      };
      return objectStyle;
    }
  }


  getCenterPoint(state) {
    const tempObjectData = this.findObjectById(state.objectId);
    if (tempObjectData === null) {
      return { cx: 0, cy: 0 };
    }

    return {
      cx: state.width * this.zoom / 2,
      cy: state.height * this.zoom / 2
    };


    // if (tempObjectData.id === 'root') {
    //   const objectStyle = {
    //     'position': 'absolute',
    //     'width': state.width * this.zoom + 'px',
    //     'height': state.height * this.zoom + 'px',
    //     'border': '0px solid grey',
    //     'vertical-align': 'text-top',
    //     'margin-left': this.getMarginLeft(state, tempObjectData) * this.zoom + 'px',
    //     'margin-top': this.getMarginTop(state, tempObjectData) * this.zoom + 'px',
    //   };
    //   return objectStyle;
    // } else {
    //   const objectStyle = {
    //     'position': 'absolute',
    //     'width': state.width * this.zoom + 'px',
    //     'height': state.height * this.zoom + 'px',
    //     'border': '1px solid gold',
    //     'vertical-align': 'text-top',
    //     'margin-left': this.getMarginLeft(state, tempObjectData) * this.zoom + 'px',
    //     'margin-top': this.getMarginTop(state, tempObjectData) * this.zoom + 'px',
    //   };
    //   return objectStyle;
    // }
  }




  deleteObjectChild(object, objectId) {
    const result = [];
    if (object.children && object.children.length > 0) {
      for (let i = 0; i < object.children.length; i++) {
        const aObject = object.children[i];
        if (objectId !== aObject.id) {
          result.push(aObject);
        }
        else {
          this.deleteObjectWithStateEvent(aObject);
        }
        if (aObject.children && aObject.children.length > 0) {
          this.deleteObjectChild(aObject, objectId);
        }
      }
    }
    object.children = result;
  }

  deleteObjectWithStateEvent(object) {

    this.deleteObjectState(object.id);
    this.deleteObjectEvent(object.id);
    if (object.children && object.children.length > 0) {
      for (let i = 0; i < object.children.length; i++) {
        this.deleteObjectWithStateEvent(object.children[i]);
      }
    }
  }


  deleteObjectState(objectId) {
    //remove state
    const stateresult = [];
    console.log('will remove state = ' + objectId);
    const targetStateList = this.activityData.stateList;
    for (let i = 0; i < targetStateList.length; i++) {
      const aState = targetStateList[i];
      if (aState.objectId === objectId) {
        continue;
      }
      stateresult.push(aState);
    }
    this.activityData.stateList = stateresult;
  }

  deleteObjectEvent(objectId) {
    //remove trigger event

    const triggerEventList = this.activityData.triggerEventList;
    for (let i = 0; i < triggerEventList.length; i++) {
      const aTrigger = triggerEventList[i];
      if (aTrigger.objectId === objectId) {
        this.deleteTriggerEvent(aTrigger);
        continue;
      }
    }
  }


  getAppPlatform() {
    return electron.ipcRenderer.sendSync('get-app-platform');
  }


  getAppVersion() {
    return electron.ipcRenderer.sendSync('get-app-version');
  }




  deleteObject(objectId) {

    const targetObject = this.findObjectById(objectId);
    const parentObject = this.findObjectById(targetObject.parentId);

    // const targetList = this.activityData.objectList;
    this.deleteObjectChild(this.activityData.objectList[0], objectId);
    this.setSelectedObject(parentObject);


  }




  getParentMarginLeft(targetObjectId) {

    const targetObject = this.findObjectById(targetObjectId);
    const tempState = this.findStateByObjectId(targetObjectId);
    if (targetObjectId === 'root') {
      return Number(tempState.marginLeft) + Number(tempState.translationX);
    } else {
      return Number(tempState.marginLeft) + Number(tempState.translationX) + this.getParentMarginLeft(targetObject.parentId);
    }
  }

  getParentMarginTop(targetObjectId) {
    const targetObject = this.findObjectById(targetObjectId);
    const tempState = this.findStateByObjectId(targetObject.id);
    if (targetObjectId === 'root') {
      return Number(tempState.marginTop) + Number(tempState.translationY);
    } else {
      return Number(tempState.marginTop) + Number(tempState.translationY) + this.getParentMarginTop(targetObject.parentId);
    }
  }

  getMarginLeft(state, objectData) {
    let totalMargin = state.marginLeft;
    if (objectData.id !== 'root') {
      totalMargin = Number(state.marginLeft) + Number(state.translationX) + this.getParentMarginLeft(objectData.parentId);
    }
    return totalMargin;
  }


  getMarginTop(state, objectData) {
    let totalMargin = state.marginTop;
    if (objectData.id !== 'root') {
      totalMargin = Number(state.marginTop) + Number(state.translationY) + this.getParentMarginTop(objectData.parentId);
    }
    return totalMargin;
  }


  getFileResourceList() {
    return this.fileResourceList;
  }

  loadFileResourceList() {
    return new Promise((resolve, reject) => {
      this.fileResourceList = [];

      const tempList = electron.ipcRenderer.sendSync('get-file-list', this.applicationFolderPath + '/file');
      console.log('tempList = ' + tempList.length);
      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i].startsWith('.')) {
          continue;
        }
        this.fileResourceList.push('file/' + tempList[i]);
      }

      console.log('fileResourceList = ' + this.fileResourceList.length);
      resolve(this.fileResourceList);
    });
  }


  getImageResourceList() {
    return this.imageResourceList;
  }



  loadImageResourceList() {
    return new Promise((resolve, reject) => {

      const tempImageResource = electron.ipcRenderer.sendSync('get-file-list', this.applicationFolderPath + '/image');
      this.imageResourceList = [];


      for (let i = 0; i < tempImageResource.length; i++) {
        if (tempImageResource[i].startsWith('.')) {
          continue;
        }
        this.imageResourceList.push('image/' + tempImageResource[i]);
      }
      resolve(this.imageResourceList);
    });
  }

  sendFileToDevice() {
    return new Promise((resolve, reject) => {
      const tarFilePath = electron.ipcRenderer.sendSync('tar-folder', this.applicationFolderPath);
      const sendResult = electron.ipcRenderer.sendSync('send-file-to-device', tarFilePath, this.deviceList[0], '/sdcard/vxmaker/vxmfiles/' + this.getFileName(this.applicationFolderPath) + '.tar');
      if (sendResult) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  readFileFromDevice(targetFilePath) {
    return new Promise((resolve, reject) => {
      const data = electron.ipcRenderer.sendSync('read-file-from-device', targetFilePath, this.deviceList[0]);
      if (data) {
        resolve(data);
      } else {
        reject('no data');
      }
    });
  }

  emptyPromise(result) {
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  }

  isInstalled(packageName) {
    return new Promise((resolve, reject) => {
      this.isInstallPromise = resolve;
      electron.ipcRenderer.send('is-installed-apk', packageName, this.deviceList[0]);
    });
  }

  installApk(targetFilePath) {
    return new Promise((resolve, reject) => {
      this.installPromise = resolve;
      electron.ipcRenderer.send('install-apk', targetFilePath, this.deviceList[0]);
    });
  }

  startActivity(option) {
    return new Promise((resolve, reject) => {
      const data = electron.ipcRenderer.sendSync('start-activity', option, this.deviceList[0]);
      if (data) {
        resolve(data);
      } else {
        reject('fail');
      }
    });
  }


  readHeartBeat(filePath) {
    return new Promise((resolve, reject) => {
      this.heartBeatPromise = resolve;
      electron.ipcRenderer.send('read-heart-beat', filePath, this.deviceList[0]);
    });
  }





  getViewClass(origin) {
    if ("#" == origin) {
      return "FrameLayout";
    } else {
      return origin;
    }
  }

  makeBeautifyWithCount(source, line_length) {
    return html_beautify(source, { indent_size: 4, wrap_line_length: line_length });
  }

  makeBeautify(source) {
    return html_beautify(source, { indent_size: 4, wrap_line_length: 70 });
  }

  getActivityName(activityId) {

    for (let i = 0; i < this.applicationData.activityList.length; i++) {
      const aActivity = this.applicationData.activityList[i];
      if (activityId === aActivity.activityId) {
        return aActivity.activityName;
      }
    }
    return null;

  }

  getActivityPreviewImage(activityId) {

    for (let i = 0; i < this.applicationData.activityList.length; i++) {
      const aActivity = this.applicationData.activityList[i];
      if (activityId === aActivity.activityId) {
        return aActivity.previewPath;
      }
    }
    return null;
  }


  insertChild(objectId) {
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

    let density = 1;
    if (this.dpi === 'ldpi') {
      density = 0.75;
    } else if (this.dpi === 'mdpi') {
      density = 1;
    } else if (this.dpi === 'hdpi') {
      density = 1.5;
    } else if (this.dpi === 'xhdpi') {
      density = 2;
    } else if (this.dpi === 'xxhdpi') {
      density = 3;
    } else if (this.dpi === 'xxxhdpi') {
      density = 4;
    }

    const result = Number(px / density);
    return result.toFixed(0);

  }

  ptToSp(pt) {
    return pt * 20 / 9;
  }

  getObjectString(object, state) {

    if (object.type === '#') {
      return '<FrameLayout\n' + this.getStateStringById(object, state) + '>\n';
    } else if (object.type === 'FrameLayout') {
      return '<FrameLayout\n' + this.getStateStringById(object, state) + '>\n';
    } else if (object.type === 'RelativeLayout') {
      return '<RelativeLayout\n' + this.getStateStringById(object, state) + '>\n';
    } else if (object.type === 'LinearLayout') {
      return '<LinearLayout\n' + this.getStateStringById(object, state) + '>\n';
    } else if (object.type === 'ScrollView') {
      return '<ScrollView\n' + this.getStateStringById(object, state) + '>\n';
    } else if (object.type === 'HorizontalScrollView') {
      return '<HorizontalScrollView\n' + this.getStateStringById(object, state) + '>\n';
    } else if (object.type === 'ImageView') {
      return '<ImageView\n' + this.getStateStringById(object, state) + ' />';
    } else if (object.type === 'Button') {
      return '<Button\n' + this.getStateStringById(object, state) + ' />';
    } else if (object.type === 'TextView') {
      return '<TextView\n' + this.getStateStringById(object, state) + ' />';
    } else if (object.type === 'EditText') {
      return '<EditText\n' + this.getStateStringById(object, state) + ' />';
    } else if (object.type === 'LottieAnimationView') {
      return '<com.airbnb.lottie.LottieAnimationView\n' + this.getStateStringById(object, state) + ' />';
    } else if (object.type === 'VideoView') {
      return '<VideoView\n' + this.getStateStringById(object, state) + ' />';
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

    const temp = 'dp';
    let result = '';
    if (state === null) {
      console.log('null state!!!');
    } else {
      let resourceId = object.resourceId;
      if (!resourceId) {
        resourceId = 'objectId';
      }
      result = 'android:id=\"@+id/' + resourceId + '\"\nandroid:layout_width=\"' + this.pxToDp(state.width) + temp + '\"\nandroid:layout_height=\"' + this.pxToDp(state.height) + temp + '\"\n';
      if (state.marginLeft) {
        result += 'android:layout_marginLeft=\"' + this.pxToDp(state.marginLeft) + temp + '\"\n';
      }
      if (state.marginTop) {
        result += 'android:layout_marginTop=\"' + this.pxToDp(state.marginTop) + temp + '\"\n';
      }
      if (state.translationX) {
        result += 'android:translationX=\"' + this.pxToDp(state.translationX) + temp + '\"\n';
      }
      if (state.translationY) {
        result += 'android:translationY=\"' + this.pxToDp(state.translationY) + temp + '\"\n';
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
        result += 'android:background=\"' + this.getColorValue(object.background) + '\"\n';
      }

      //TextView
      if (object.contentText) {
        const text = object.contentText.replace(/\n/gi, '\\n');
        result += 'android:text=\"' + text + '\"\n';
      }

      if (object.textColor) {
        result += 'android:textColor=\"' + this.getColorValue(object.textColor) + '\"\n';
      }

      if (object.textSize) {
        result += 'android:textSize=\"' + this.ptToSp(object.textSize).toFixed(0) + 'sp\"\n';
      }


      // const imageFolder = '@mipmap/';
      const imageFolder = '@mipmap/';

      //ImageView
      if (object.type === 'ImageView') {
        if (object.dataUrl) {
          result += 'android:scaleType=\"fitXY\"\n';
          result += 'android:src=\"' + imageFolder + object.dataUrl.replace('image/', '').split('.')[0] + '\"\n';
        }
      }

      //LottieAnimationView      
      if (object.type === 'LottieAnimationView') {
        if (object.dataUrl) {
          result += ' app:lottie_fileName="' + (object.dataUrl).replace('/file/', '') + '\"\napp:lottie_loop=\"true\"\napp:lottie_autoPlay=\"true\"\n';
        }
      }
    }
    console.log('getStateStringById done');
    return result;

  }

  getColorValue(rgba) {
    if (rgba.startsWith('#')) {
      return rgba;
    } else {

      if (rgba.startsWith('rgb(')) {
        const parts = rgba.replace('rgb(', '').replace(')', '').split(',');
        const r = parseInt(this.trim(parts[0]), 10);
        const g = parseInt(this.trim(parts[1]), 10);
        const b = parseInt(this.trim(parts[2]), 10);
        const temp = new Rgba(r, g, b, 0);
        return this.cpService.hexText(temp, false);
      } else {
        const parts = rgba.replace('rgba(', '').replace(')', '').split(',');
        const r = parseInt(this.trim(parts[0]), 10);
        const g = parseInt(this.trim(parts[1]), 10);
        const b = parseInt(this.trim(parts[2]), 10);
        const alpha = parseFloat(this.trim(parts[3]));
        const temp = new Rgba(r, g, b, alpha);
        const result = this.cpService.hexText(temp, true);
        const fixResult = '#' + result[7] + result[8] + result[1] + result[2] + result[3] + result[4] + result[5] + result[6];
        return fixResult;
      }
    }
  }




  trim(str) {
    return str.replace(/^\s+|\s+$/gm, '');
  }





  // getStateStringById(object, state) {

  //   var result = '\n';
  //   if (state === null) {
  //     console.log('null state!!!');
  //   } else {
  //     result = '\nandroid:id=\"@+id/' + object.resourceId + '\"\nandroid:layout_width=\"' + this.pxToDp(state.width) + 'dp\"\nandroid:layout_height=\"' + this.pxToDp(state.height) + 'dp\"\n';
  //     if (state.marginLeft) {
  //       result += 'android:layout_marginLeft=\"' + this.pxToDp(state.marginLeft) + 'dp\"\n';
  //     }
  //     if (state.marginTop) {
  //       result += 'android:layout_marginTop=\"' + this.pxToDp(state.marginTop) + 'dp\"\n';
  //     }
  //     if (state.translationX) {
  //       result += 'android:translationX=\"' + this.pxToDp(state.translationX) + 'dp\"\n';
  //     }
  //     if (state.translationY) {
  //       result += 'android:translationY=\"' + this.pxToDp(state.translationY) + 'dp\"\n';
  //     }
  //     if (state.alpha !== 1) {
  //       result += 'android:alpha=\"' + state.alpha + '\"\n';
  //     }
  //     if (state.scaleX !== 1) {
  //       result += 'android:scaleX=\"' + state.scaleX + '\"\n';
  //     }
  //     if (state.scaleY !== 1) {
  //       result += 'android:scaleY=\"' + state.scaleY + '\"\n';
  //     }
  //     //object data
  //     if (object.background) {
  //       result += 'android:background=\"' + object.background + '\"\n';
  //     }

  //     //TextView
  //     if (object.contentText) {
  //       result += 'android:text=\"' + object.contentText + '\"\n';
  //     }

  //     if (object.textColor) {
  //       result += 'android:textColor=\"' + object.textColor + '\"\n';
  //     }

  //     if (object.textSize) {
  //       result += 'android:textSize=\"' + object.textSize + 'sp\"\n';
  //     }

  //     //ImageView
  //     if (object.type === 'ImageView') {
  //       if (object.dataUrl) {
  //         result += 'android:scaleType=\"fitXY\"\n';
  //         result += 'android:src=\"@mipmap/' + object.dataUrl.replace('image/', '').split('.')[0] + '\"\n';
  //       }
  //     }

  //     //LottieAnimationView      
  //     if (object.type === 'LottieAnimationView') {
  //       if (object.dataUrl) {
  //         result += ' app:lottie_fileName="' + object.dataUrl + '\"\n';
  //       }
  //     }
  //   }
  //   console.log('getStateStringById done');
  //   return result;

  // }



  public makeApplicationSourceCode() {

    const sourceResult = {};
    const activityDataList = [];
    this.makeActivityName();

    let manifestXml = '';

    for (let i = 0; i < this.applicationData.activityList.length; i++) {
      const activity = this.applicationData.activityList[i];
      console.log(i + ",activity = " + activity.activityId);
      this.activityMetaData = activity;
      this.activityData = this.loadActivityDataSync(activity.activityId);
      console.log(i + ",this.activityData = " + JSON.stringify(this.activityData));
      this.selectedStage = this.activityData.stageList[0];
      this.activityData.codeActivityName = activity.codeActivityName;
      this.activityData.codeLayoutName = activity.codeLayoutName;
      const layout = this.makeActivityLayout();
      const java = this.makeActivityJava();
      console.log(i + ",layout = " + layout);
      console.log(i + ",java = " + java);
      const aData = {};
      aData['layout'] = layout;
      aData['java'] = java;
      aData['activityId'] = activity.activityId;
      aData['codeActivityName'] = activity.codeActivityName;
      aData['codeLayoutName'] = activity.codeLayoutName;

      activityDataList.push(aData);

      //manifest activity data
      let tempString = '\n<activity android:name=\".' + activity.codeActivityName + '\"/>';
      if (activity.activityId === this.applicationData.launcherActivityId) {
        tempString = '\n<activity android:name=\".' + activity.codeActivityName + '\">';
        tempString += '<intent-filter>\n<action android:name=\"android.intent.action.MAIN\"/>\n<category android:name=\"android.intent.category.LAUNCHER\"/>\n</intent-filter>';
        tempString += '\n</activity>\n\n';
      }
      manifestXml += tempString;
    }


    //make manifest.xml
    let androidManifest = this.templateDataHash['AndroidManifest.xml'];
    androidManifest = androidManifest.replace('!!!packageName!!!', this.applicationData.applicationId);
    androidManifest = androidManifest.replace('!!!activityList!!!', manifestXml);



    //make build.xml
    let buildGradle = this.templateDataHash['build.gradle'];
    buildGradle = buildGradle.replace('!!!packageName!!!', this.applicationData.applicationId);

    //make string.xml
    let stringXml = this.templateDataHash['strings.xml'];
    stringXml = stringXml.replace('!!!appName!!!', this.applicationData.applicationName);

    sourceResult['stringXml'] = this.makeBeautify(stringXml);
    sourceResult['buildGradle'] = buildGradle;
    sourceResult['manifestXml'] = this.makeBeautify(androidManifest);
    sourceResult['activityDataList'] = activityDataList;
    return sourceResult;
  }


  public writeSourceCode(folderPath, data) {


    const activityDataList = data['activityDataList'];
    const manifestXml = data['manifestXml'];
    const stringXml = data['stringXml'];
    const buildGradle = data['buildGradle'];
    const sourceCodeData = data;

    const exportRoot = folderPath + '/' + this.applicationData.applicationName + '_export';

    const projectRoot = exportRoot + '/android';
    const projectFolder = projectRoot + '/app/src/main';
    const assetsFolder = projectFolder + '/assets';
    const javaFolder = projectFolder + '/java/' + this.replaceAll(this.applicationData.applicationId, '.', '/');
    const resourceFolder = projectFolder + '/res';
    const drawFolder = resourceFolder + '/mipmap-nodpi';
    const layoutFolder = resourceFolder + '/layout';
    const valuesFolder = resourceFolder + '/values';

    const manifestPath = projectFolder + '/AndroidManifest.xml';
    const buildGradlePath = projectRoot + '/app/build.gradle';
    const stringXmlPath = valuesFolder + '/strings.xml';


    this.deleteFile(projectRoot);
    this.makeFolder(projectRoot);

    this.makeFolder(projectFolder);
    this.makeFolder(javaFolder);
    this.makeFolder(resourceFolder);
    this.makeFolder(drawFolder);
    this.makeFolder(layoutFolder);
    this.makeFolder(valuesFolder);


    //copy project level
    const projectTemplatePath = '/template/project_template';
    const appTemplatePath = '/template/app_template';
    const resourceTemplatePath = '/template/resource_template';

    this.copyFolderFromRoot(projectTemplatePath, projectRoot);
    this.copyFolderFromRoot(appTemplatePath, projectRoot + '/app');
    this.copyFolderFromRoot(resourceTemplatePath, resourceFolder);
    this.copyFolder(this.applicationFolderPath + '/image', drawFolder);
    this.copyFolder(this.applicationFolderPath + '/file', assetsFolder);


    this.writeFile(buildGradlePath, buildGradle);
    this.writeFile(manifestPath, manifestXml);
    this.writeFile(stringXmlPath, stringXml);

    for (let i = 0; i < this.applicationData.activityList.length; i++) {
      const activity = this.applicationData.activityList[i];
      this.writeFile(javaFolder + '/' + activity.codeActivityName + '.java', activityDataList[i].java);
      this.writeFile(layoutFolder + '/' + activity.codeLayoutName + '.xml', activityDataList[i].layout);
    }








  }

  writeGuidDoc(folderPath, data) {

    const exportRoot = folderPath + '/' + this.applicationData.applicationName + '_export';
    const guideRoot = exportRoot + '/guide';

    this.deleteFile(guideRoot);
    this.makeFolder(guideRoot);


    const guideTemplatePath = '/template/guide_template';

    this.copyFolderFromRoot(guideTemplatePath, guideRoot);
    this.copyFolder(this.applicationFolderPath, guideRoot + '/assets/data');

  }


  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

  escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }


  public makeActivitySourceCode() {

    this.makeActivityName();

    this.makeActivityLayout();

    this.makeActivityJava();

    return this.codeResult;
  }


  makeActivityName() {
    this.idHash = {};
    this.activityIdHash = {};
    this.activityLayoutIdHash = {};
    for (let i = 0; i < this.applicationData.activityList.length; i++) {
      const activity = this.applicationData.activityList[i];
      activity.codeActivityName = this.getUniqueActivityName(activity.activityName);
      activity.codeLayoutName = this.getUniqueLayoutName(activity.activityName);
      // if (activity.activityId === this.activityData.activityId) {
      //   this.activityData.codeActivityName = activity.codeActivityName;
      //   this.activityData.codeLayoutName = activity.codeLayoutName;
      // }
    }
  }

  makeActivityLayout() {
    let temp = this.templateDataHash['activity_main.xml'];
    this.objectList = this.getAllObjectList(this.activityData.objectList);
    for (let i = 0; i < this.objectList.length; i++) {
      const object = this.objectList[i];
      object.resourceId = this.getUniqueResourceName(object.name);
    }

    const xmlString = this.insertChild('root');

    temp = temp.replace('!!!layoutList!!!', xmlString);
    temp = temp.replace('!!!packageName!!!', this.applicationData.applicationId);
    temp = temp.replace('!!!activityName!!!', this.activityData.codeActivityName);
    const result = this.makeBeautify(temp);
    this.codeResult['layout'] = result;
    return result;
  }



  makeActivityJava() {
    const temp = this.templateDataHash['MainActivity.java'];
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


    const clickEventHash = {};

    for (let i = 0; i < this.activityData.triggerEventList.length; i++) {
      const aTrigger = this.activityData.triggerEventList[i];
      if (aTrigger.type === 'click') {
        const object = this.findObjectById(aTrigger.objectId);

        let tempEventHash = clickEventHash[aTrigger.objectId];
        if (!tempEventHash) {
          tempEventHash = '';
        }
        tempEventHash += ('\n' + 'if(currentStage.equals("' + aTrigger.stageId + '")) {\n' +
          this.insertImplEvent(aTrigger) +
          '\n}\n');

        clickEventHash[aTrigger.objectId] = tempEventHash;
      } else if (aTrigger.type === 'onCreate') {
        onCreateEventString += '\n' + this.insertImplEvent(aTrigger);
      } else if (aTrigger.type === 'backKey') {
        const backEventString = 'if(currentStage.equals("' + aTrigger.stageId + '")) {\n' + this.insertImplEvent(aTrigger) + '\n return;}\nelse{super.onBackPressed();}\n';
        backPressedEventData += backEventString;
      }
    }


    for (let i = 0; i < this.objectList.length; i++) {
      //make resource name
      const object = this.objectList[i];
      let aClickEventString = clickEventHash[object.id];
      if (aClickEventString) {
        const clickEventString = object.resourceId + '.setOnClickListener(new View.OnClickListener() {' +
          '\n@Override' +
          '\npublic void onClick(final View v) {\n' +
          aClickEventString +
          '\n}});';
        eventString += '\n' + clickEventString + '\n';
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

    const result = templateData;
    this.codeResult['java'] = result;
    return result;


  }

  insertImplEvent(triggerEvent) {
    let result = '\n';
    const implEvent = this.findImplentEventByTriggerEventId(triggerEvent.id);
    if (implEvent.type === 'stageChange') {
      result += this.insertStageChangeEvent(implEvent);
    }
    if (implEvent.type === 'finishActivity') {
      result += 'context.finish();';
    }
    if (implEvent.type === 'startActivity') {
      result += 'context.startActivity(new Intent(context, ' + this.getActivityByActivityId(implEvent.toActivityId).codeActivityName + '.class));';
    }
    return result;
  }




  getActivityByActivityId(activityId) {
    for (let i = 0; i < this.applicationData.activityList.length; i++) {
      const activity = this.applicationData.activityList[i];
      if (activity.activityId === activityId) {
        return activity;
      }
    }
    return null;
  }



  insertStageChangeEvent(implEvent) {

    let result = '';
    const stateEventList = this.findStateChangeEventByImplementEventId(implEvent.id);
    const fromStage = this.findStageByStageId(implEvent.fromStageId);
    const toStage = this.findStageByStageId(implEvent.toStageId);
    const eventVar = this.getUniqueResourceName(fromStage.name + '_' + toStage.name);
    let stateEventCount = 0;
    result += "\nAnimatorSet " + eventVar + " = new AnimatorSet();\n";
    const stateEventCodeList = [];

    for (let i = 0; i < stateEventList.length; i++) {
      const stateEvent = stateEventList[i];
      if (stateEvent.isEnabled) {
        const temp = this.getStateAnimationString(stateEventList[i]);
        if (temp) {
          stateEventCodeList.push(temp);
          stateEventCount++;
        }
      }
    }

    for (let i = 0; i < stateEventCodeList.length; i++) {
      const temp = stateEventCodeList[i];
      if (i === 0) {
        result += '\n' + eventVar + '.playTogether(';
        result += ('\n' + stateEventCodeList[i]);
      } else {
        result += (',\n' + stateEventCodeList[i]);
      }

      if (i === stateEventCodeList.length - 1) {
        result += '); \n';
      }
    }


    const afterAnmiation = this.findTriggerEventByAfterTriggerEventId(implEvent.id);
    let afterAnimationString = '';
    if (afterAnmiation) {
      afterAnimationString = this.insertImplEvent(afterAnmiation);
    }


    result += (

      eventVar + '.addListener(new Animator.AnimatorListener() {\n'
      + '@Override\n'
      + 'public void onAnimationStart(Animator animator) {}\n'
      + '@Override\n'
      + 'public void onAnimationEnd(Animator animator) {currentStage = "' + implEvent.toStageId + '";\n ' + afterAnimationString + '\n}\n'
      + '@Override\n'
      + 'public void onAnimationCancel(Animator animator) {}\n'
      + '@Override\n'
      + 'public void onAnimationRepeat(Animator animator) {}\n'
      + '});\n'
    );
    result += ('\n' + eventVar + '.start();\n');

    return result;
  }






  getStateAnimationString(event) {
    const fromState = this.findStateByStateId(this.activityData, event.fromStateId);
    const toState = this.findStateByStateId(this.activityData, event.toStateId);

    let result = '';
    if (toState && fromState) {
      const object = this.findObjectById(toState.objectId);

      if (object && toState && fromState) {
        console.log("have state");
        result = this.getStateAnimationCode(object.resourceId, fromState, toState, event);
      }
      else {
        console.log("null state");
      }
    }

    return result;
  }

  getStateAnimationCode(view, fromState, toState, event) {

    const haveAnimation = false;
    let result = '';

    //translation
    if (fromState.translationX !== toState.translationX) {
      result += '.translationX(' + (toState.translationX | 0).toFixed(0) + ')';
    }
    if (fromState.translationY !== toState.translationY) {
      result += '.translationY(' + (toState.translationY | 0).toFixed(0) + ')';
    }

    //scale
    if (fromState.scaleX !== toState.scaleX) {
      result += '.scaleX(' + (toState.scaleX | 1).toFixed(2) + 'f)';
    }
    if (fromState.scaleY !== toState.scaleY) {
      result += '.scaleY(' + (toState.scaleY | 1).toFixed(2) + 'f)';
    }

    //rotate
    if (fromState.rotate !== toState.rotate) {
      result += '.rotation(' + (toState.rotate | 0).toFixed(2) + 'f)';
    }
    if (fromState.rotateX !== toState.rotateX) {
      result += '.rotationX(' + (toState.rotateX | 0).toFixed(2) + 'f)';
    }
    if (fromState.rotateY !== toState.rotateY) {
      result += '.rotationY(' + (toState.rotateY | 0).toFixed(2) + 'f)';
    }

    //width
    if (fromState.width !== toState.width) {
      result += '.width(' + (toState.width | 0).toFixed(0) + ')';
    }
    //height
    if (fromState.height !== toState.height) {
      result += '.height(' + (toState.height | 0).toFixed(0) + ')';
    }


    //alpha
    if (fromState.alpha !== toState.alpha) {
      result += '.alpha(' + (toState.alpha | 0).toFixed(2) + 'f)';
    }


    //margin left
    if (fromState.marginLeft !== toState.marginLeft) {
      result += '.leftMargin(' + (toState.marginLeft | 0).toFixed(0) + ')';
    }

    //margin top
    if (fromState.marginTop !== toState.marginTop) {
      result += '.topMargin(' + (toState.marginTop | 0).toFixed(0) + ')';
      console.log("from top margin = " + fromState.marginTop + ", to = " + toState.marginTop);
    }

    if (result.length === 0) {
      return null;
    } else {
      result += '.setInterpolator(PathInterpolatorCompat.create(' + event.cubicValue[0] + 'f,' + event.cubicValue[1] + 'f,' + event.cubicValue[2] + 'f,' + event.cubicValue[3] + 'f))';
      result += '.setDuration(' + event.duration + ')';
      if (event.startDelay && event.startDelay !== 0) {
        result += '.setStartDelay(' + (Number(event.startDelay)).toFixed(0) + ')';
      }
      result += '.get()';
      return 'ViewPropertyObjectAnimator.animate(' + view + ')' + result;
    }


  }



  getIcon(type) {
    return this.findObjectBasicDataByType(type).icon;
  }

  getTriggerEventIcon(type) {
    return this.triggerEventIconHash[type];
  }

  getImplEventIcon(type) {
    return this.implEventIconHash[type];
  }
  getIconSmall(type) {
    if (this.findObjectBasicDataByType(type)) {
      return this.findObjectBasicDataByType(type).icon.replace('.png', '_s.png');
    } else {
      return '';
    }
  }





}
