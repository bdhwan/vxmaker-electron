import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
declare var electron: any;


@Injectable()
export class ApplicationDataServiceService {


  activityId: String;
  applicationFolderPath: string;
  applicationData;
  activityMetaData;
  activityData;

  selectedObject;
  selectedStage;
  selectedState;

  objectTypeData = [];
  defaultStateData;


  zoom = 0.2;

  constructor(private http: Http) {


  }





  initApplicationPath(applicationFolderPath) {
    this.applicationFolderPath = applicationFolderPath;
  }
  initActivityId(activityId) {
    this.activityId = activityId;
  }

  changeWindowSize(width, height, resizeable) {
    electron.ipcRenderer.sendSync('change-window', width, height, resizeable);
  }

  removeRecentProjectList() {
    var temp = {
      'applicationFolderPath': this.applicationFolderPath
    }
    electron.ipcRenderer.sendSync('remove-recent-project-list', temp);
  }

  addRecentProjectList(applicationName) {
    var historyData = {
      applicationFolderPath: this.applicationFolderPath,
      applicationName: applicationName,
    }
    electron.ipcRenderer.send('add-recent-project', historyData);
  }

  getRecentProjectList() {
    return JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('get-recent-project-list')));
  }

  saveApplicationData(applicationData) {
    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + "/app.json", applicationData);
  }

  saveActivityData(activityId, activityData) {
    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + "/activity/" + activityId + ".json", activityData);
  }

  deleteActivity(activityId) {
    electron.ipcRenderer.sendSync('delete-file', this.applicationFolderPath + "/activity/" + activityId + ".json");
  }

  selectImageFile() {
    return electron.ipcRenderer.sendSync('select-image-file');
  }

  selectWorkspaceFolderPath() {
    return electron.ipcRenderer.sendSync('select-workspace-folder-path');
  }

  readFileData(path) {
    return JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', path)));
  }

  deleteFile(path) {
    electron.ipcRenderer.sendSync('delete-file', path);
  }

  copyFile(src, dst) {
    electron.ipcRenderer.sendSync('copy-file', src, dst);
    return true;
  }

  





  getHttpToJson(targetUrl) {
    return new Promise((resolve, reject) => {
      this.http.get(targetUrl).subscribe(res => {
        var data = res.json();
        resolve(data);
      });
    });
  }

  loadInitDataFromFile() {
    return new Promise((resolve, reject) => {
      //오브젝트 타입 정보 불러오기
      this.getHttpToJson('assets/object/object.json').then((data: any) => {
        var reqeustList = [];
        for (var i = 0; i < data.objectType.length; i++) {
          reqeustList.push(this.getHttpToJson('assets/object/' + data.objectType[i]));
        }
        this.defaultStateData = data.defaultState;
        return Promise.all(reqeustList);
      }).then((results: any) => {
        // console.log("results =" + JSON.stringify(results));
        this.objectTypeData = results;
        resolve(true);
      }).catch(function (err) {
        console.log("catch = " + JSON.stringify(err));
        reject(err);
      });;
    });
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

  saveRawFile(filePath, data) {
    electron.ipcRenderer.sendSync('save-raw-data', filePath, data);
  }

  loadApplicationData() {
    return new Promise((resolve, reject) => {
      this.applicationData = JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + "/app.json")));
      for (var i = 0; i < this.applicationData.activityList.length; i++) {
        var activity = this.applicationData.activityList[i];
        if (activity.activityId === this.activityId) {
          this.activityMetaData = activity;
          break;
        }
      }
      this.activityData = JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + "/activity/" + this.activityId + ".json")));
      resolve(true);
    });
  }


  setSelectedStage(value) {
    this.selectedStage = value;
    if (this.selectedObject) {
      this.selectedState = this.findStateByObjectId(this.selectedObject.id);
    }
  }

  setSelectedObject(value) {
    this.selectedObject = value;
    this.selectedState = this.findStateByObjectId(this.selectedObject.id);
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





  createNewState(objectId: string, stageId: string, type: string) {
    var now = new Date().getTime();
    var newState = {
      id: "state_" + now,
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
    }


    //fetch default state value
    var defaultObject = this.findObjectBasicDataByType(type);
    for (var i = 0; i < defaultObject.stateProperties.length; i++) {
      var aProperty = defaultObject.stateProperties[i];
      newState[aProperty.name] = aProperty.default;
    }

    return newState;
  }

  findObjectBasicDataByType(type: string) {
    for (var i = 0; i < this.objectTypeData.length; i++) {
      var aData = this.objectTypeData[i];
      if (type == aData.type) {
        return aData;
      }
    }
    return null;
  }


  findObjectById(objectId: string) {
    return this.findObjectByIdWithList(this.activityData.objectList, objectId);
  }

  findObjectByIdWithList(targetList: any, objectId: string) {
    for (var i = 0; i < targetList.length; i++) {
      var aObject = targetList[i];
      if (aObject.id == objectId) {
        return aObject;
      }
      if (aObject.children && aObject.children.length > 0) {
        var childResult = this.findObjectByIdWithList(aObject.children, objectId);
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

  findStateByObjectIdWithStageId(objectId: string, stageId: string) {
    return this.findStateByObjectIdWithList(this.activityData.stateList, objectId, stageId);
  }

  findStateByObjectIdWithList(targetList: any, objectId: string, stageId: string) {
    for (var i = 0; i < targetList.length; i++) {
      var aState = targetList[i];
      if (aState.objectId == objectId && aState.stageId == stageId) {
        return aState;
      }
    }
    return null;
  }



  createNewObject(type) {

    var defaultObject = this.findObjectBasicDataByType(type);
    var now = new Date().getTime();
    var newObject = {
      id: "object_" + now,
      canHaveChildren: false
    };

    for (var i = 0; i < defaultObject.objectProperties.length; i++) {
      var aProperty = defaultObject.objectProperties[i];
      newObject[aProperty.name] = aProperty.default;
    }

    if (newObject.canHaveChildren) {
      newObject['children'] = [];
    }
    return newObject;
  }



  setZoom(value) {
    this.zoom = value;
  }

  getZoom() {
    return this.zoom;
  }



  getObjectStyle(state) {
    var tempObjectData = this.findObjectById(state.objectId);
    var objectStyle = {
      "position": "absolute",
      'width': state.width * this.zoom + "px",
      'height': state.height * this.zoom + "px",
      'background-color': tempObjectData.backgroundColor,
      'opacity': state.alpha * 0.8,
      'cursor': 'move',
      'margin-left': this.getMarginLeft(state, tempObjectData) * this.zoom + "px",
      'margin-top': this.getMarginTop(state, tempObjectData) * this.zoom + "px",
    }
    return objectStyle;
  }


  getSelectedObjectStyle(state) {
    var tempObjectData = this.findObjectById(state.objectId);
    var objectStyle = {
      "position": "absolute",
      'width': state.width * this.zoom + "px",
      'height': state.height * this.zoom + "px",
      'border': "1px solid gold",
      'margin-left': this.getMarginLeft(state, tempObjectData) * this.zoom + "px",
      'margin-top': this.getMarginTop(state, tempObjectData) * this.zoom + "px",
    }
    return objectStyle;
  }



  getParentMarginLeft(targetObjectId) {

    var targetObject = this.findObjectById(targetObjectId);
    var tempState = this.findStateByObjectId(targetObjectId);
    if (targetObjectId == 'root') {
      return Number(tempState.marginLeft);
    }
    else {
      return Number(tempState.marginLeft) + this.getParentMarginLeft(targetObject.parentId);
    }
  }

  getParentMarginTop(targetObjectId) {
    var targetObject = this.findObjectById(targetObjectId);
    var tempState = this.findStateByObjectId(targetObject.id);
    if (targetObjectId == 'root') {
      return Number(tempState.marginTop);
    }
    else {
      return Number(tempState.marginTop) +this.getParentMarginTop(targetObject.parentId);
    }
  }

  getMarginLeft(state, objectData) {
    var totalMargin = state.marginLeft;
    if (objectData.id != 'root') {
      totalMargin = Number(state.marginLeft) + this.getParentMarginLeft(objectData.parentId);
    }
    return totalMargin;
  }


  getMarginTop(state, objectData) {
    var totalMargin = state.marginTop;
    if (objectData.id != 'root') {
      totalMargin = Number(state.marginTop) + this.getParentMarginTop(objectData.parentId);
    }
    return totalMargin;
  }



}
