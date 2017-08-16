webpackJsonp([1,4],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__broadcast_service__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationDataServiceService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ApplicationDataServiceService = (function () {
    function ApplicationDataServiceService(http, broadcaster) {
        var _this = this;
        this.http = http;
        this.broadcaster = broadcaster;
        this.objectTypeData = [];
        this.deviceList = [];
        this.zoom = 0.2;
        var self = this;
        electron.ipcRenderer.on('parse-psd-result', function (event, arg) {
            _this.parsePsdPromise(arg);
        });
    }
    ApplicationDataServiceService.prototype.parsePsdFile = function (psdFilePath, applicationFolderPath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.parsePsdPromise = resolve;
            electron.ipcRenderer.sendSync('parse-psd', psdFilePath, applicationFolderPath);
        });
    };
    ApplicationDataServiceService.prototype.initApplicationPath = function (applicationFolderPath) {
        this.applicationFolderPath = applicationFolderPath;
    };
    ApplicationDataServiceService.prototype.initActivityId = function (activityId) {
        this.activityId = activityId;
    };
    ApplicationDataServiceService.prototype.getApplicationPath = function () {
        return this.applicationFolderPath;
    };
    ApplicationDataServiceService.prototype.openUrl = function (url) {
        electron.ipcRenderer.sendSync('open-url', url);
    };
    ApplicationDataServiceService.prototype.openMainWindowUrl = function (path) {
        console.log("path = " + path);
        return electron.ipcRenderer.sendSync('go-main-window', path);
    };
    ApplicationDataServiceService.prototype.closeMainWindowUrl = function () {
        console.log("close main window");
        return electron.ipcRenderer.sendSync('close-main-window');
    };
    ApplicationDataServiceService.prototype.changeWindowSize = function (width, height, resizeable) {
        electron.ipcRenderer.sendSync('change-window', width, height, resizeable);
    };
    ApplicationDataServiceService.prototype.removeRecentProjectList = function () {
        var temp = {
            'applicationFolderPath': this.applicationFolderPath
        };
        electron.ipcRenderer.sendSync('remove-recent-project-list', temp);
    };
    ApplicationDataServiceService.prototype.addRecentProjectList = function (applicationName) {
        var historyData = {
            applicationFolderPath: this.applicationFolderPath,
            applicationName: applicationName,
        };
        electron.ipcRenderer.send('add-recent-project', historyData);
    };
    ApplicationDataServiceService.prototype.getRecentProjectList = function () {
        return JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('get-recent-project-list')));
    };
    ApplicationDataServiceService.prototype.saveApplicationData = function (applicationData) {
        electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + '/app.json', applicationData);
    };
    ApplicationDataServiceService.prototype.saveActivityData = function (activityId, activityData) {
        electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + '/activity/' + activityId + '.json', activityData);
    };
    ApplicationDataServiceService.prototype.deleteActivity = function (activityId) {
        electron.ipcRenderer.sendSync('delete-file', this.applicationFolderPath + '/activity/' + activityId + '.json');
    };
    ApplicationDataServiceService.prototype.selectPsdFile = function () {
        return electron.ipcRenderer.sendSync('select-psd-file');
    };
    ApplicationDataServiceService.prototype.selectImageFile = function () {
        return electron.ipcRenderer.sendSync('select-image-file');
    };
    ApplicationDataServiceService.prototype.selectImageFiles = function () {
        return electron.ipcRenderer.sendSync('select-image-files');
    };
    ApplicationDataServiceService.prototype.selectFile = function () {
        return electron.ipcRenderer.sendSync('select-file');
    };
    ApplicationDataServiceService.prototype.selectFiles = function () {
        return electron.ipcRenderer.sendSync('select-files');
    };
    ApplicationDataServiceService.prototype.selectWorkspaceFolderPath = function () {
        return electron.ipcRenderer.sendSync('select-workspace-folder-path');
    };
    ApplicationDataServiceService.prototype.readFileData = function (path) {
        return JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', path)));
    };
    ApplicationDataServiceService.prototype.deleteFile = function (path) {
        electron.ipcRenderer.sendSync('delete-file', path);
    };
    ApplicationDataServiceService.prototype.copyFile = function (src, dst) {
        electron.ipcRenderer.sendSync('copy-file', src, dst);
        return true;
    };
    ApplicationDataServiceService.prototype.makeSmallEnglish = function (origin) {
        var result = this.makeEnglish(origin.toLowerCase());
        if (!isNaN(parseInt(result[0], 10)) || result.length == 0 || result.startsWith('_')) {
            // Is a number
            result = 'image' + result;
        }
        return result;
    };
    ApplicationDataServiceService.prototype.makeEnglish = function (origin) {
        return origin.trim().replace(/\s/gi, '_').replace(/[^a-zA-Z0-9]/g, '_').replace('-', '_');
    };
    ApplicationDataServiceService.prototype.getUniuqeId = function (targetList, prefix) {
        if (prefix) {
            return this.getUniqueName(targetList, this.makeSmallEnglish(prefix));
        }
        else {
            return this.getUniqueName(targetList, 'id_');
        }
    };
    ApplicationDataServiceService.prototype.getUniqueName = function (targetList, origin) {
        var result = origin;
        var indexId = 0;
        while (this.contains(targetList, result)) {
            result = origin + '_' + indexId;
            indexId++;
        }
        targetList.push(result);
        return result;
    };
    ApplicationDataServiceService.prototype.getUniqueImageName = function (path) {
        var name = this.getFileName(path);
        var ext = this.getFileExt(path);
        name = this.getUniuqeId(this.imageResourceList, name);
        return name + ext;
    };
    ApplicationDataServiceService.prototype.getUniqueFileName = function (path) {
        var name = this.getFileName(path);
        var ext = this.getFileExt(path);
        name = this.getUniuqeId(this.fileResourceList, name);
        return name + ext;
    };
    ApplicationDataServiceService.prototype.contains = function (list, obj) {
        var i = list.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    };
    ApplicationDataServiceService.prototype.getFileName = function (path) {
        return electron.ipcRenderer.sendSync('get-file-name', path);
    };
    ApplicationDataServiceService.prototype.getFileNameBase = function (path) {
        return electron.ipcRenderer.sendSync('get-file-name-base', path);
    };
    ApplicationDataServiceService.prototype.getFileExt = function (path) {
        return electron.ipcRenderer.sendSync('get-file-ext', path);
    };
    ApplicationDataServiceService.prototype.getHttpToJson = function (targetUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(targetUrl).subscribe(function (res) {
                var data = res.json();
                resolve(data);
            });
        });
    };
    ApplicationDataServiceService.prototype.loadInitDataFromFile = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //오브젝트 타입 정보 불러오기
            _this.getHttpToJson('assets/object/object.json').then(function (data) {
                var reqeustList = [];
                for (var i = 0; i < data.objectType.length; i++) {
                    reqeustList.push(_this.getHttpToJson('assets/object/' + data.objectType[i]));
                }
                _this.defaultStateData = data.defaultState;
                return Promise.all(reqeustList);
            }).then(function (results) {
                // console.log('results =' + JSON.stringify(results));
                _this.objectTypeData = results;
                resolve(true);
            }).catch(function (err) {
                console.log('catch = ' + JSON.stringify(err));
                reject(err);
            });
        });
    };
    ApplicationDataServiceService.prototype.refreshDeviceList = function () {
        this.deviceList = electron.ipcRenderer.sendSync('get-device-list');
    };
    ApplicationDataServiceService.prototype.getDeviceList = function () {
        return this.deviceList;
    };
    ApplicationDataServiceService.prototype.getObjectTypeData = function () {
        return this.objectTypeData;
    };
    ApplicationDataServiceService.prototype.getDefaultStateData = function () {
        return this.defaultStateData;
    };
    ApplicationDataServiceService.prototype.getApplicationData = function () {
        return this.applicationData;
    };
    ApplicationDataServiceService.prototype.getActivityMetaData = function () {
        return this.activityMetaData;
    };
    ApplicationDataServiceService.prototype.getActivityData = function () {
        return this.activityData;
    };
    ApplicationDataServiceService.prototype.getObjectList = function () {
        return this.getAllObjectList(this.activityData.objectList);
    };
    ApplicationDataServiceService.prototype.getAllObjectList = function (targetList) {
        var result = [];
        for (var i = 0; i < targetList.length; i++) {
            var aObject = targetList[i];
            result.push(aObject);
            if (aObject.children && aObject.children.length > 0) {
                var childResult = this.getAllObjectList(aObject.children);
                for (var j = 0; j < childResult.length; j++) {
                    result.push(childResult[j]);
                }
            }
        }
        return result;
    };
    ApplicationDataServiceService.prototype.saveRawFile = function (filePath, data) {
        electron.ipcRenderer.sendSync('save-raw-data', filePath, data);
    };
    ApplicationDataServiceService.prototype.loadApplicationData = function () {
        var _this = this;
        console.log('loadApplicationData -' + this.applicationFolderPath);
        return new Promise(function (resolve, reject) {
            _this.applicationData = electron.ipcRenderer.sendSync('read-file-data', _this.applicationFolderPath + '/app.json');
            console.log('loadApplicationData done -' + JSON.stringify(_this.applicationData));
            for (var i = 0; i < _this.applicationData.activityList.length; i++) {
                var activity = _this.applicationData.activityList[i];
                if (activity.activityId === _this.activityId) {
                    _this.activityMetaData = activity;
                    break;
                }
            }
            console.log('will read = this.activityId =' + _this.activityId);
            _this.activityData = electron.ipcRenderer.sendSync('read-file-data', _this.applicationFolderPath + '/activity/' + _this.activityId + '.json');
            resolve(true);
        });
    };
    ApplicationDataServiceService.prototype.readFileSync = function (filePath) {
        return electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + '/' + filePath);
    };
    ApplicationDataServiceService.prototype.readFile = function (filePath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var result = electron.ipcRenderer.sendSync('read-file-data', _this.applicationFolderPath + '/' + filePath);
            resolve(result);
        });
    };
    ApplicationDataServiceService.prototype.readFileAbsolutePath = function (filePath) {
        return new Promise(function (resolve, reject) {
            var result = electron.ipcRenderer.sendSync('read-file-data', filePath);
            resolve(result);
        });
    };
    ApplicationDataServiceService.prototype.setSelectedStage = function (value) {
        this.selectedStage = value;
        if (this.selectedObject) {
            this.selectedState = this.findStateByObjectId(this.selectedObject.id);
        }
    };
    ApplicationDataServiceService.prototype.setSelectedObject = function (value) {
        this.selectedObject = value;
        this.selectedState = this.findStateByObjectId(this.selectedObject.id);
    };
    ApplicationDataServiceService.prototype.setSelectedTriggerEvent = function (event) {
        this.selectedTriggerEvent = event;
    };
    ApplicationDataServiceService.prototype.setSelectedImplementEvent = function (event) {
        this.selectedImplementEvent = event;
    };
    ApplicationDataServiceService.prototype.getSelectedImplementEvent = function () {
        return this.selectedImplementEvent;
    };
    ApplicationDataServiceService.prototype.getSelectedTriggerEvent = function () {
        return this.selectedTriggerEvent;
    };
    ApplicationDataServiceService.prototype.getSelectedStage = function () {
        return this.selectedStage;
    };
    ApplicationDataServiceService.prototype.getSelectedObject = function () {
        return this.selectedObject;
    };
    ApplicationDataServiceService.prototype.getSelectedState = function () {
        return this.selectedState;
    };
    ApplicationDataServiceService.prototype.getAllSelectedState = function () {
        return this.findAllStateByStageId(this.selectedStage.id);
    };
    ApplicationDataServiceService.prototype.getImageSize = function (path) {
        return electron.ipcRenderer.sendSync('get-image-size', path);
    };
    ApplicationDataServiceService.prototype.createNewState = function (objectId, stageId, type) {
        var newState = {
            id: 'state_' + __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__["UUID"].UUID(),
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
        var defaultObject = this.findObjectBasicDataByType(type);
        for (var i = 0; i < defaultObject.stateProperties.length; i++) {
            var aProperty = defaultObject.stateProperties[i];
            newState[aProperty.name] = aProperty.default;
        }
        return newState;
    };
    ApplicationDataServiceService.prototype.findObjectBasicDataByType = function (type) {
        for (var i = 0; i < this.objectTypeData.length; i++) {
            var aData = this.objectTypeData[i];
            if (type === aData.type) {
                return aData;
            }
        }
        return null;
    };
    ApplicationDataServiceService.prototype.findImplentEventByTriggerEventId = function (triggerEventId) {
        for (var i = 0; i < this.activityData.implementEventList.length; i++) {
            var aEvent = this.activityData.implementEventList[i];
            if (aEvent.triggerEventId === triggerEventId) {
                return aEvent;
            }
        }
        return null;
    };
    ApplicationDataServiceService.prototype.deleteTriggerEventByTriggerEventId = function (triggerEventid) {
        var index = -1;
        for (var i = 0; i < this.activityData.triggerEventList.length; i++) {
            var aEvent = this.activityData.triggerEventList[i];
            if (aEvent.id === triggerEventid) {
                index = i;
                break;
            }
        }
        console.log("will delete = " + index);
        if (index !== -1) {
            var removed = this.activityData.triggerEventList[index];
            this.activityData.triggerEventList.splice(index, 1);
            this.deleteImplementEventByTriggerEventId(removed.id);
        }
    };
    ApplicationDataServiceService.prototype.deleteTriggerEvent = function (triggerEvent) {
        this.deleteTriggerEventByTriggerEventId(triggerEvent.id);
    };
    ApplicationDataServiceService.prototype.deleteImplementEventByTriggerEventId = function (triggerEventId) {
        var index = -1;
        for (var i = 0; i < this.activityData.implementEventList.length; i++) {
            var aEvent = this.activityData.implementEventList[i];
            if (aEvent.triggerEventId === triggerEventId) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            var removed = this.activityData.implementEventList[index];
            this.activityData.implementEventList.splice(index, 1);
            if (removed.type === 'stageChange') {
                this.deleteStageChangeEventByImplementEventId(removed.id);
                this.deleteAfterAnimationEventByImplentEventId(removed.id);
            }
        }
    };
    ApplicationDataServiceService.prototype.deleteAfterAnimationEventByImplentEventId = function (implementEventId) {
        for (var i = 0; i < this.activityData.triggerEventList.length; i++) {
            var aEvent = this.activityData.triggerEventList[i];
            if (aEvent.afterTriggerEventId === implementEventId) {
                this.deleteTriggerEvent(aEvent);
            }
        }
    };
    ApplicationDataServiceService.prototype.deleteStageChangeEventByImplementEventId = function (implementEventId) {
        var afterArray = [];
        for (var i = 0; i < this.activityData.stateEventList.length; i++) {
            var aEvent = this.activityData.stateEventList[i];
            if (aEvent.implementEventId === implementEventId) {
                continue;
            }
            afterArray.push(aEvent);
        }
        this.activityData.stateEventList = afterArray;
    };
    ApplicationDataServiceService.prototype.findStateChangeEventByImplementEventId = function (implementEventId) {
        var result = [];
        for (var i = 0; i < this.activityData.stateEventList.length; i++) {
            var aEvent = this.activityData.stateEventList[i];
            if (aEvent.implementEventId === implementEventId) {
                result.push(aEvent);
            }
        }
        return result;
    };
    ApplicationDataServiceService.prototype.findObjectById = function (objectId) {
        return this.findObjectByIdWithList(this.activityData.objectList, objectId);
    };
    ApplicationDataServiceService.prototype.findObjectByIdWithList = function (targetList, objectId) {
        for (var i = 0; i < targetList.length; i++) {
            var aObject = targetList[i];
            if (aObject.id === objectId) {
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
    };
    ApplicationDataServiceService.prototype.findStateByObjectId = function (objectId) {
        return this.findStateByObjectIdWithStageId(objectId, this.selectedStage.id);
    };
    ApplicationDataServiceService.prototype.findAllStateByObjectId = function (objectId) {
        var result = [];
        for (var i = 0; i < this.activityData.stateList.length; i++) {
            var aState = this.activityData.stateList[i];
            if (aState.objectId === objectId) {
                result.push(aState);
            }
        }
        return result;
    };
    ApplicationDataServiceService.prototype.findAllStateByStageId = function (stageId) {
        var result = [];
        for (var i = 0; i < this.activityData.stateList.length; i++) {
            var aState = this.activityData.stateList[i];
            if (aState.stageId === stageId) {
                result.push(aState);
            }
        }
        return result;
    };
    ApplicationDataServiceService.prototype.findStateByObjectIdWithStageId = function (objectId, stageId) {
        return this.findStateByObjectIdWithList(this.activityData.stateList, objectId, stageId);
    };
    ApplicationDataServiceService.prototype.findStateByObjectIdWithList = function (targetList, objectId, stageId) {
        for (var i = 0; i < targetList.length; i++) {
            var aState = targetList[i];
            if (aState.objectId === objectId && aState.stageId === stageId) {
                return aState;
            }
        }
        return null;
    };
    ApplicationDataServiceService.prototype.createNewObject = function (type) {
        var defaultObject = this.findObjectBasicDataByType(type);
        var newObject = {
            id: 'object_' + __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__["UUID"].UUID(),
            canHaveChildren: false,
            isExpanded: true
        };
        for (var i = 0; i < defaultObject.objectProperties.length; i++) {
            var aProperty = defaultObject.objectProperties[i];
            newObject[aProperty.name] = aProperty.default;
        }
        if (newObject.canHaveChildren) {
            newObject['children'] = [];
        }
        return newObject;
    };
    ApplicationDataServiceService.prototype.setZoom = function (value) {
        this.zoom = value;
    };
    ApplicationDataServiceService.prototype.getZoom = function () {
        return this.zoom;
    };
    ApplicationDataServiceService.prototype.getObjectStyle = function (state) {
        var tempObjectData = this.findObjectById(state.objectId);
        var objectStyle = {
            'position': 'absolute',
            'width': state.width * this.zoom + 'px',
            'height': state.height * this.zoom + 'px',
            'background-color': tempObjectData.backgroundColor,
            'opacity': state.alpha * 0.8,
            'margin-left': this.getMarginLeft(state, tempObjectData) * this.zoom + 'px',
            'margin-top': this.getMarginTop(state, tempObjectData) * this.zoom + 'px',
        };
        return objectStyle;
    };
    ApplicationDataServiceService.prototype.getSelectedObjectStyle = function (state) {
        var tempObjectData = this.findObjectById(state.objectId);
        if (tempObjectData === null) {
            return {};
        }
        if (tempObjectData.id === 'root') {
            var objectStyle = {
                'position': 'absolute',
                'width': state.width * this.zoom + 'px',
                'height': state.height * this.zoom + 'px',
                'border': '0px solid grey',
                'margin-left': this.getMarginLeft(state, tempObjectData) * this.zoom + 'px',
                'margin-top': this.getMarginTop(state, tempObjectData) * this.zoom + 'px',
            };
            return objectStyle;
        }
        else {
            var objectStyle = {
                'position': 'absolute',
                'width': state.width * this.zoom + 'px',
                'height': state.height * this.zoom + 'px',
                'border': '1px solid gold',
                'margin-left': this.getMarginLeft(state, tempObjectData) * this.zoom + 'px',
                'margin-top': this.getMarginTop(state, tempObjectData) * this.zoom + 'px',
            };
            return objectStyle;
        }
    };
    ApplicationDataServiceService.prototype.deleteObjectChild = function (object, objectId) {
        var result = [];
        if (object.children && object.children.length > 0) {
            for (var i = 0; i < object.children.length; i++) {
                var aObject = object.children[i];
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
    };
    ApplicationDataServiceService.prototype.deleteObjectWithStateEvent = function (object) {
        this.deleteObjectState(object.id);
        this.deleteObjectEvent(object.id);
        if (object.children && object.children.length > 0) {
            for (var i = 0; i < object.children.length; i++) {
                this.deleteObjectWithStateEvent(object.children[i]);
            }
        }
    };
    ApplicationDataServiceService.prototype.deleteObjectState = function (objectId) {
        //remove state
        var stateresult = [];
        console.log("will remove state = " + objectId);
        var targetStateList = this.activityData.stateList;
        for (var i = 0; i < targetStateList.length; i++) {
            var aState = targetStateList[i];
            if (aState.objectId === objectId) {
                continue;
            }
            stateresult.push(aState);
        }
        this.activityData.stateList = stateresult;
    };
    ApplicationDataServiceService.prototype.deleteObjectEvent = function (objectId) {
        //remove trigger event
        var triggerEventList = this.activityData.triggerEventList;
        for (var i = 0; i < triggerEventList.length; i++) {
            var aTrigger = triggerEventList[i];
            if (aTrigger.objectId === objectId) {
                this.deleteTriggerEvent(aTrigger);
                continue;
            }
        }
    };
    ApplicationDataServiceService.prototype.deleteObject = function (objectId) {
        var targetObject = this.findObjectById(objectId);
        var parentObject = this.findObjectById(targetObject.parentId);
        // const targetList = this.activityData.objectList;
        this.deleteObjectChild(this.activityData.objectList[0], objectId);
        this.setSelectedObject(parentObject);
    };
    ApplicationDataServiceService.prototype.getParentMarginLeft = function (targetObjectId) {
        var targetObject = this.findObjectById(targetObjectId);
        var tempState = this.findStateByObjectId(targetObjectId);
        if (targetObjectId === 'root') {
            return Number(tempState.marginLeft);
        }
        else {
            return Number(tempState.marginLeft) + this.getParentMarginLeft(targetObject.parentId);
        }
    };
    ApplicationDataServiceService.prototype.getParentMarginTop = function (targetObjectId) {
        var targetObject = this.findObjectById(targetObjectId);
        var tempState = this.findStateByObjectId(targetObject.id);
        if (targetObjectId == 'root') {
            return Number(tempState.marginTop);
        }
        else {
            return Number(tempState.marginTop) + this.getParentMarginTop(targetObject.parentId);
        }
    };
    ApplicationDataServiceService.prototype.getMarginLeft = function (state, objectData) {
        var totalMargin = state.marginLeft;
        if (objectData.id !== 'root') {
            totalMargin = Number(state.marginLeft) + this.getParentMarginLeft(objectData.parentId);
        }
        return totalMargin;
    };
    ApplicationDataServiceService.prototype.getMarginTop = function (state, objectData) {
        var totalMargin = state.marginTop;
        if (objectData.id !== 'root') {
            totalMargin = Number(state.marginTop) + this.getParentMarginTop(objectData.parentId);
        }
        return totalMargin;
    };
    ApplicationDataServiceService.prototype.getFileResourceList = function () {
        return this.fileResourceList;
    };
    ApplicationDataServiceService.prototype.loadFileResourceList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fileResourceList = electron.ipcRenderer.sendSync('get-file-list', _this.applicationFolderPath + '/file');
            for (var i = 0; i < _this.fileResourceList.length; i++) {
                _this.fileResourceList[i] = 'file/' + _this.fileResourceList[i];
            }
            resolve(_this.fileResourceList);
        });
    };
    ApplicationDataServiceService.prototype.getImageResourceList = function () {
        return this.imageResourceList;
    };
    ApplicationDataServiceService.prototype.loadImageResourceList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.imageResourceList = electron.ipcRenderer.sendSync('get-file-list', _this.applicationFolderPath + '/image');
            console.log('from electron = ' + JSON.stringify(_this.imageResourceList));
            if (!_this.imageResourceList) {
                _this.imageResourceList = [];
            }
            for (var i = 0; i < _this.imageResourceList.length; i++) {
                _this.imageResourceList[i] = 'image/' + _this.imageResourceList[i];
            }
            resolve(_this.imageResourceList);
        });
    };
    ApplicationDataServiceService.prototype.sendFileToDevice = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var tarFilePath = electron.ipcRenderer.sendSync('tar-folder', _this.applicationFolderPath);
            var sendResult = electron.ipcRenderer.sendSync('send-file-to-device', tarFilePath, _this.deviceList[0], '/sdcard/vxmaker/vxmfiles/' + _this.getFileName(_this.applicationFolderPath) + '.tar');
            if (sendResult) {
                resolve(true);
            }
            else {
                reject(false);
            }
        });
    };
    return ApplicationDataServiceService;
}());
ApplicationDataServiceService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__broadcast_service__["a" /* BroadcastService */]) === "function" && _b || Object])
], ApplicationDataServiceService);

var _a, _b;
//# sourceMappingURL=application-data-service.service.js.map

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BroadcastService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BroadcastService = (function () {
    function BroadcastService() {
        this._eventBus = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    BroadcastService.prototype.broadcast = function (key, data) {
        this._eventBus.next({ key: key, data: data });
    };
    BroadcastService.prototype.on = function (key) {
        return this._eventBus.asObservable()
            .filter(function (event) { return event.key === key; })
            .map(function (event) { return event.data; });
    };
    return BroadcastService;
}());
BroadcastService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], BroadcastService);

//# sourceMappingURL=broadcast.service.js.map

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return imgPrefix; });
var imgPrefix = "http://localhost:8080";
// export var imgPrefix:string = "file://"; 
//# sourceMappingURL=globals.js.map

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__globals__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResourceComponent = (function () {
    function ResourceComponent(appDataService) {
        this.appDataService = appDataService;
        this.prefix = __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* imgPrefix */];
        this.visibility = false;
        this.tab = "image";
        this.onSelectFile = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    ResourceComponent.prototype.ngOnInit = function () {
    };
    ResourceComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.applicationFolderPath = this.appDataService.getApplicationPath();
        this.appDataService.loadImageResourceList().then(function (result) {
            _this.imageList = result.reverse();
            return _this.appDataService.loadFileResourceList();
        }).then(function (result) {
            _this.fileList = result.reverse();
        });
    };
    ResourceComponent.prototype.showDialog = function (defaultTarget) {
        console.log("showDialog");
        if (defaultTarget) {
            this.tab = defaultTarget;
        }
        this.visibility = true;
    };
    ResourceComponent.prototype.hideDialog = function () {
        this.visibility = false;
    };
    ResourceComponent.prototype.clickTab = function (event, target) {
        this.tab = target;
    };
    ResourceComponent.prototype.clickFile = function (target) {
        this.onSelectFile.emit(target);
        this.hideDialog();
    };
    ResourceComponent.prototype.nothing = function (event) {
        event.stopPropagation();
    };
    ResourceComponent.prototype.clickNewFile = function (event, target) {
        var files = [];
        if (target === 'image') {
            files = this.appDataService.selectImageFiles();
        }
        else {
            files = this.appDataService.selectFiles();
        }
        if (files) {
            for (var i = 0; i < files.length; i++) {
                var newImagePath = files[i];
                var fileName = this.appDataService.getUniqueImageName(newImagePath);
                var targetPath = this.applicationFolderPath + '/' + target + '/' + fileName;
                var result = this.appDataService.copyFile(newImagePath, targetPath);
                if (result) {
                }
            }
            this.refreshImageList();
            this.refreshFileList();
        }
    };
    ResourceComponent.prototype.refreshImageList = function () {
        var _this = this;
        this.appDataService.loadImageResourceList().then(function (result) {
            _this.imageList = _this.appDataService.getImageResourceList().reverse();
        });
    };
    ResourceComponent.prototype.refreshFileList = function () {
        var _this = this;
        this.appDataService.loadFileResourceList().then(function (result) {
            _this.fileList = _this.appDataService.getFileResourceList().reverse();
        });
    };
    return ResourceComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], ResourceComponent.prototype, "applicationData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ResourceComponent.prototype, "onSelectFile", void 0);
ResourceComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-resource',
        template: __webpack_require__(273),
        styles: [__webpack_require__(238)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object])
], ResourceComponent);

var _a;
//# sourceMappingURL=resource.component.js.map

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__broadcast_service__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageEventService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessageEventService = MessageEventService_1 = (function () {
    function MessageEventService(broadcaster) {
        this.broadcaster = broadcaster;
    }
    MessageEventService.prototype.fire = function (data) {
        this.broadcaster.broadcast(MessageEventService_1, data);
    };
    MessageEventService.prototype.on = function () {
        return this.broadcaster.on(MessageEventService_1);
    };
    return MessageEventService;
}());
MessageEventService = MessageEventService_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__broadcast_service__["a" /* BroadcastService */]) === "function" && _a || Object])
], MessageEventService);

var MessageEventService_1, _a;
//# sourceMappingURL=message-event.service.js.map

/***/ }),
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailFinishActivityComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventDetailFinishActivityComponent = (function () {
    function EventDetailFinishActivityComponent(appDataService) {
        this.appDataService = appDataService;
    }
    EventDetailFinishActivityComponent.prototype.ngOnInit = function () {
    };
    EventDetailFinishActivityComponent.prototype.onChangeData = function () {
        this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
        this.selectedImplementEvent = this.appDataService.getSelectedImplementEvent();
    };
    return EventDetailFinishActivityComponent;
}());
EventDetailFinishActivityComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-event-detail-finish-activity',
        template: __webpack_require__(251),
        styles: [__webpack_require__(216)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object])
], EventDetailFinishActivityComponent);

var _a;
//# sourceMappingURL=event-detail-finish-activity.component.js.map

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailStageChangeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventDetailStageChangeComponent = (function () {
    function EventDetailStageChangeComponent(appDataService) {
        this.appDataService = appDataService;
        this.onNewAfterAnimationEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onCloseEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.initTotalTime = 0;
        this.presetInterpolatorList = [
            {
                'name': 'linear',
                'value': [0, 0, 1, 1]
            },
            {
                'name': 'ease',
                'value': [0.25, 0.1, 0.25, 1]
            },
            //ease-in
            {
                'name': 'easeIn',
                'value': [0.42, 0, 1, 1]
            },
            {
                'name': 'easeInQuad',
                'value': [0.55, 0.085, 0.68, 0.53]
            },
            {
                'name': 'easeInCubic',
                'value': [0.55, 0.055, 0.675, 0.19]
            },
            {
                'name': 'easeInQuart',
                'value': [0.895, 0.03, 0.685, 0.22]
            },
            {
                'name': 'easeInQuint',
                'value': [0.755, 0.05, 0.855, 0.06]
            },
            {
                'name': 'easeInSine',
                'value': [0.47, 0, 0.745, 0.715]
            },
            {
                'name': 'easeInExpo',
                'value': [0.95, 0.05, 0.795, 0.035]
            },
            {
                'name': 'easeInCirc',
                'value': [0.6, 0.04, 0.98, 0.335]
            },
            {
                'name': 'easeInBack',
                'value': [0.6, -0.28, 0.735, 0.045]
            },
            //ease-out
            {
                'name': 'easeOut',
                'value': [0, 0, 0.58, 1]
            },
            {
                'name': 'easeOutQuad',
                'value': [0.25, 0.46, 0.45, 0.94]
            },
            {
                'name': 'easeOutCubic',
                'value': [0.215, 0.61, 0.355, 1]
            },
            {
                'name': 'easeOutQuart',
                'value': [0.165, 0.84, 0.44, 1]
            },
            {
                'name': 'easeOutQuint',
                'value': [0.23, 1, 0.32, 1]
            },
            {
                'name': 'easeOutSine',
                'value': [0.39, 0.575, 0.565, 1]
            },
            {
                'name': 'easeOutExpo',
                'value': [0.19, 1, 0.22, 1]
            },
            {
                'name': 'easeOutCirc',
                'value': [0.075, 0.82, 0.165, 1]
            },
            {
                'name': 'easeOutBack',
                'value': [0.175, 0.885, 0.32, 1.275]
            },
            //ease-in-out
            {
                'name': 'easeInOut',
                'value': [0.42, 0, 0.58, 1]
            },
            {
                'name': 'easeInOutQuad',
                'value': [0.455, 0.03, 0.515, 0.955]
            },
            {
                'name': 'easeInOutCubic',
                'value': [0.645, 0.045, 0.355, 1]
            },
            {
                'name': 'easeInOutQuart',
                'value': [0.77, 0, 0.175, 1]
            },
            {
                'name': 'easeInOutQuint',
                'value': [0.86, 0, 0.07, 1]
            },
            {
                'name': 'easeInOutSine',
                'value': [0.445, 0.05, 0.55, 0.95]
            },
            {
                'name': 'easeInOutExpo',
                'value': [1, 0, 0, 1]
            },
            {
                'name': 'easeInOutCirc',
                'value': [0.785, 0.135, 0.15, 0.86]
            },
            {
                'name': 'easeInOutBack',
                'value': [0.68, -0.55, 0.265, 1.55]
            }
        ];
    }
    EventDetailStageChangeComponent.prototype.ngOnInit = function () {
    };
    EventDetailStageChangeComponent.prototype.ngAfterViewInit = function () {
    };
    EventDetailStageChangeComponent.prototype.getMaxTotalTime = function () {
        var tempTotalTime = 0;
        for (var i = 0; i < this.stateEventList.length; i++) {
            var time = Number(this.stateEventList[i].startDelay) + Number(this.stateEventList[i].duration);
            if (time > tempTotalTime) {
                tempTotalTime = time;
            }
        }
        return tempTotalTime + 500;
    };
    EventDetailStageChangeComponent.prototype.calculateMaxTotalTime = function () {
        var tempTotalTime = this.getMaxTotalTime();
        if (this.initTotalTime === 0) {
            this.initTotalTime = tempTotalTime + 1000;
        }
        if (this.initTotalTime > tempTotalTime) {
            this.maxTotalTime = this.initTotalTime;
        }
        else {
            this.maxTotalTime = tempTotalTime;
        }
        this.initTotalTime = this.maxTotalTime;
    };
    EventDetailStageChangeComponent.prototype.clickAddAfterAnimation = function () {
        this.onNewAfterAnimationEvent.emit(this.selectedImplementEvent.id);
    };
    EventDetailStageChangeComponent.prototype.clickCancel = function () {
        this.onCloseEvent.emit();
    };
    EventDetailStageChangeComponent.prototype.getAfterAnimation = function () {
    };
    EventDetailStageChangeComponent.prototype.getObjectName = function (objectId) {
        return this.appDataService.findObjectById(objectId);
    };
    EventDetailStageChangeComponent.prototype.onChangeInterpolator = function (interpolator, target) {
        target.cubicValue = interpolator.split(',').map(Number);
    };
    EventDetailStageChangeComponent.prototype.onChangeTimeLineFromStateCell = function (value) {
        console.log("ok here will update all");
        this.calculateMaxTotalTime();
    };
    EventDetailStageChangeComponent.prototype.onChangeData = function () {
        // this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
        this.selectedImplementEvent = this.appDataService.getSelectedImplementEvent();
        if (this.selectedImplementEvent) {
            this.stateEventList = this.appDataService.findStateChangeEventByImplementEventId(this.selectedImplementEvent.id);
            this.calculateMaxTotalTime();
        }
    };
    return EventDetailStageChangeComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], EventDetailStageChangeComponent.prototype, "onNewAfterAnimationEvent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], EventDetailStageChangeComponent.prototype, "onCloseEvent", void 0);
EventDetailStageChangeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-event-detail-stage-change',
        template: __webpack_require__(252),
        styles: [__webpack_require__(217)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object])
], EventDetailStageChangeComponent);

var _a;
//# sourceMappingURL=event-detail-stage-change.component.js.map

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailStartActivityComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventDetailStartActivityComponent = (function () {
    function EventDetailStartActivityComponent(appDataService) {
        this.appDataService = appDataService;
    }
    EventDetailStartActivityComponent.prototype.ngOnInit = function () {
    };
    EventDetailStartActivityComponent.prototype.onChangeData = function () {
        this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
        this.selectedImplementEvent = this.appDataService.getSelectedImplementEvent();
    };
    return EventDetailStartActivityComponent;
}());
EventDetailStartActivityComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-event-detail-start-activity',
        template: __webpack_require__(253),
        styles: [__webpack_require__(218)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object])
], EventDetailStartActivityComponent);

var _a;
//# sourceMappingURL=event-detail-start-activity.component.js.map

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_uuid__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventGeneratorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventGeneratorComponent = (function () {
    function EventGeneratorComponent(appDataService) {
        this.appDataService = appDataService;
        this.onCompleteEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.readyEvent = false;
        this.visibility = false;
    }
    EventGeneratorComponent.prototype.ngOnInit = function () {
    };
    EventGeneratorComponent.prototype.resetData = function () {
        this.afterTriggerEventId = null;
        this.triggerEvent = null;
        this.implementEvent = null;
        this.currentSelectedStageId = this.appDataService.getSelectedStage().id;
        this.objectList = this.appDataService.getObjectList();
    };
    EventGeneratorComponent.prototype.onChangeStage = function (event) {
        this.readyEvent = true;
    };
    EventGeneratorComponent.prototype.onChangeActivity = function (event) {
        this.readyEvent = true;
    };
    EventGeneratorComponent.prototype.onChangeLottiView = function (event) {
        this.readyEvent = true;
    };
    EventGeneratorComponent.prototype.onChangeVideoView = function (event) {
        this.readyEvent = true;
    };
    EventGeneratorComponent.prototype.onChangeCameraPictureView = function (event) {
        this.readyEvent = true;
    };
    EventGeneratorComponent.prototype.getLottieViewList = function () {
        return this.filterObjectView('LottieView');
    };
    EventGeneratorComponent.prototype.getImageViewList = function () {
        return this.filterObjectView('ImageView');
    };
    EventGeneratorComponent.prototype.getVideoViewList = function () {
        return this.filterObjectView('VideoView');
    };
    EventGeneratorComponent.prototype.filterObjectView = function (targetType) {
        var result = [];
        for (var i = 0; i < this.objectList.length; i++) {
            var aObject = this.objectList[i];
            if (aObject.type === targetType) {
                result.push(aObject);
            }
        }
        return result;
    };
    // make after animation
    EventGeneratorComponent.prototype.makeAfterTrigger = function (targetTriggerEventId) {
        this.clickTrigger('afterAnimation');
        this.afterTriggerEventId = targetTriggerEventId;
        this.triggerEvent.afterTriggerEventId = this.afterTriggerEventId;
    };
    EventGeneratorComponent.prototype.clickTrigger = function (target) {
        var id = 'trigger_' + __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__["UUID"].UUID();
        this.triggerEvent = {
            id: id,
            stageId: this.currentSelectedStageId,
            type: target,
            name: target,
            objectId: this.appDataService.getSelectedObject().id
        };
    };
    EventGeneratorComponent.prototype.clickImplement = function (target) {
        var id = 'implement_' + __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__["UUID"].UUID();
        this.implementEvent = {
            id: id,
            triggerEventId: this.triggerEvent.id,
            type: target,
            name: target
        };
        if (target === 'finishActivity') {
            this.readyEvent = true;
        }
        else {
            this.selectedStageId = null;
            this.selectedActivityId = null;
            this.readyEvent = false;
            this.selectedLottieViewId = null;
            this.selectedVideoViewId = null;
            this.selectedTakePictureObjectViewId = null;
        }
    };
    EventGeneratorComponent.prototype.completeEvent = function () {
        this.appDataService.getActivityData().triggerEventList.push(this.triggerEvent);
        if (this.implementEvent.type === 'stageChange') {
            this.implementEvent.toStageId = this.selectedStageId;
            this.implementEvent.fromStageId = this.currentSelectedStageId;
            for (var i = 0; i < this.objectList.length; i++) {
                var aObject = this.objectList[i];
                var fromState = this.appDataService.findStateByObjectIdWithStageId(aObject.id, this.currentSelectedStageId);
                var toState = this.appDataService.findStateByObjectIdWithStageId(aObject.id, this.selectedStageId);
                var duration = 300;
                var startDelay = 0;
                var cubicValue = [];
                var now = __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__["UUID"].UUID();
                var stateEvent = {
                    id: 'state_event_' + now,
                    implementEventId: this.implementEvent.id,
                    objectId: aObject.id,
                    name: 'state_event_' + now,
                    toStateId: toState.id,
                    fromStateId: fromState.id,
                    duration: 300,
                    startDelay: 0,
                    interpolatorType: 'cubic',
                    cubicValue: [0, 0.5, 0.5, 1],
                    isEnabled: true
                };
                this.appDataService.getActivityData().stateEventList.push(stateEvent);
            }
        }
        else if (this.implementEvent.type === 'startActivity') {
            this.implementEvent.toActivityId = this.selectedActivityId;
        }
        else if (this.implementEvent.type === 'finishActivity') {
        }
        else if (this.implementEvent.type === 'startLottie') {
            this.implementEvent.lottieViewId = this.selectedLottieViewId;
        }
        else if (this.implementEvent.type === 'stopLottie') {
            this.implementEvent.lottieViewId = this.selectedLottieViewId;
        }
        else if (this.implementEvent.type === 'startVideo') {
            this.implementEvent.videoViewId = this.selectedVideoViewId;
        }
        else if (this.implementEvent.type === 'stopVideo') {
            this.implementEvent.videoViewId = this.selectedVideoViewId;
        }
        else if (this.implementEvent.type === 'takePicture') {
            this.implementEvent.takePictureImageView = this.selectedTakePictureObjectViewId;
        }
        // add implements
        this.appDataService.getActivityData().implementEventList.push(this.implementEvent);
        this.onCompleteEvent.emit();
        this.hideDialog();
    };
    EventGeneratorComponent.prototype.hideDialog = function () {
        this.visibility = false;
    };
    EventGeneratorComponent.prototype.showDialog = function () {
        this.visibility = true;
    };
    EventGeneratorComponent.prototype.onChangeData = function () {
        this.stageList = this.appDataService.getActivityData().stageList;
        this.activityList = this.appDataService.getApplicationData().activityList;
    };
    EventGeneratorComponent.prototype.nothing = function (event) {
        event.stopPropagation();
    };
    return EventGeneratorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], EventGeneratorComponent.prototype, "onCompleteEvent", void 0);
EventGeneratorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-event-generator',
        template: __webpack_require__(254),
        styles: [__webpack_require__(219)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object])
], EventGeneratorComponent);

var _a;
//# sourceMappingURL=event-generator.component.js.map

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventListComponent = (function () {
    function EventListComponent(appDataService, broadcaster) {
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
        this.onNewEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onClickDetailEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    EventListComponent.prototype.ngOnInit = function () {
    };
    EventListComponent.prototype.onChangeData = function () {
        this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
        this.triggerEventList = this.appDataService.getActivityData().triggerEventList;
    };
    EventListComponent.prototype.getImplement = function (triggerEventId) {
        var result = this.appDataService.findImplentEventByTriggerEventId(triggerEventId);
        return result;
    };
    EventListComponent.prototype.clickNewEvent = function () {
        this.onNewEvent.emit();
    };
    EventListComponent.prototype.clickNewAfterAnimationEvent = function () {
        this.onNewEvent.emit('afterAnimation');
    };
    EventListComponent.prototype.clickDetailEvent = function (event) {
        console.log("clickDetailEvent = " + JSON.stringify(event));
        this.onClickDetailEvent.emit(event);
    };
    EventListComponent.prototype.clickDeleteEvent = function (event, triggerEvent) {
        event.stopPropagation();
        var result = confirm('will you delete ' + triggerEvent.name + '?');
        if (result) {
            var message = {
                kind: 'delete-event',
                triggerEventId: triggerEvent.id
            };
            this.broadcaster.broadcast('activity', message);
        }
    };
    return EventListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], EventListComponent.prototype, "onNewEvent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], EventListComponent.prototype, "onClickDetailEvent", void 0);
EventListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-event-list',
        template: __webpack_require__(255),
        styles: [__webpack_require__(220)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _b || Object])
], EventListComponent);

var _a, _b;
//# sourceMappingURL=event-list.component.js.map

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LottieAnimationViewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var bodymovin = __webpack_require__(161);

var LottieAnimationViewComponent = (function () {
    function LottieAnimationViewComponent(appDataService) {
        this.appDataService = appDataService;
    }
    LottieAnimationViewComponent.prototype.ngOnInit = function () {
    };
    LottieAnimationViewComponent.prototype.setDataUrl = function (url) {
        if (this.url !== url) {
            this.url = url;
            if (this.url) {
                if (this.anim) {
                    this.anim.stop();
                }
                // bodymovin.destroy();
                this.resetAnimator();
            }
        }
    };
    LottieAnimationViewComponent.prototype.resetAnimator = function () {
        var temp = JSON.stringify(this.appDataService.readFileSync(this.url));
        // const temp2 = JSON.stringify(temp);
        var start = temp.indexOf(',animationData={');
        console.log("start postion =" + start);
        if (start === -1) {
            this.animationData = JSON.parse(temp);
        }
        else {
            var end = temp.indexOf('},renderer=');
            this.animationData = JSON.parse(temp.substr(start - 1, end));
        }
        // if (start > 0) {
        //   this.animationData = JSON.parse(JSON.stringify(temp.sub));
        // }
        // else {
        //   this.animationData = JSON.parse(JSON.stringify(temp));
        // }
        if (!this._options) {
            this._options = {
                container: this.lavContainer.nativeElement,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: this.animationData
            };
            this.anim = bodymovin.loadAnimation(this._options);
        }
        // this.anim.setData(this.lavContainer.nativeElement,this.animationData);
        this.anim.play();
    };
    return LottieAnimationViewComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Number)
], LottieAnimationViewComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Number)
], LottieAnimationViewComponent.prototype, "height", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('lavContainer'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object)
], LottieAnimationViewComponent.prototype, "lavContainer", void 0);
LottieAnimationViewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-lottie-animation-view',
        template: __webpack_require__(260),
        styles: [__webpack_require__(225)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _b || Object])
], LottieAnimationViewComponent);

var _a, _b;
//# sourceMappingURL=lottie-animation-view.component.js.map

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_broadcast_service__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectNewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ObjectNewComponent = (function () {
    function ObjectNewComponent(broadcaster) {
        this.broadcaster = broadcaster;
        this.onClickNewObject = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onChangeTreeData = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onShowResourceDialog = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.objectTypeData = [];
    }
    ObjectNewComponent.prototype.ngOnInit = function () {
    };
    ObjectNewComponent.prototype.setObjectTypeData = function (objectTypeData) {
        this.objectTypeData = objectTypeData;
        for (var i = 0; i < this.objectTypeData.length; i++) {
            console.log("type = " + JSON.stringify(this.objectTypeData[i]));
        }
    };
    ObjectNewComponent.prototype.clickResource = function () {
        this.onShowResourceDialog.emit("image");
    };
    ObjectNewComponent.prototype.clickNewObject = function (type) {
        console.log("clickNewObject -" + type);
        this.onClickNewObject.emit(type);
    };
    ObjectNewComponent.prototype.clickPSD = function () {
        var message = {
            kind: 'select-psd',
        };
        this.broadcaster.broadcast('activity', message);
    };
    return ObjectNewComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ObjectNewComponent.prototype, "onClickNewObject", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ObjectNewComponent.prototype, "onChangeTreeData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ObjectNewComponent.prototype, "onShowResourceDialog", void 0);
ObjectNewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-object-new',
        template: __webpack_require__(261),
        styles: [__webpack_require__(226)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _a || Object])
], ObjectNewComponent);

var _a;
//# sourceMappingURL=object-new.component.js.map

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__globals__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectPropertyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ObjectPropertyComponent = (function () {
    function ObjectPropertyComponent(appDataService) {
        this.appDataService = appDataService;
        this.onShowResourceDialog = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.prefix = __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* imgPrefix */];
        this.showPropertyKeys = [
            'name',
            'type',
            'backgroundColor'
        ];
        this.detailKeys = [
            'alpha',
            'width',
            'height',
            'marginBottom',
            'marginLeft',
            'marginRight',
            'marginTop',
            'paddingBottom',
            'paddingLeft',
            'paddingRight',
            'paddingTop',
            'rotate',
            'scaleX',
            'scaleY',
            'translationX',
            'translationY'
        ];
        this.needShowState = false;
    }
    ObjectPropertyComponent.prototype.ngOnInit = function () {
        this.applicationFolderPath = this.appDataService.getApplicationPath();
    };
    ObjectPropertyComponent.prototype.ngAfterViewInit = function () {
        // this.imageComponent.setFileResourceVisible(false);
        // this.fileComponent.setImageResourceVisible(false);
    };
    ObjectPropertyComponent.prototype.getAllKeys = function (target) {
        var keys = Object.keys(target);
        return MediaKeyStatusMap;
    };
    ObjectPropertyComponent.prototype.toggleDetail = function () {
        this.needShowState = !this.needShowState;
    };
    ObjectPropertyComponent.prototype.toJson = function (target) {
        return JSON.stringify(target);
    };
    ObjectPropertyComponent.prototype.clickSelectImage = function () {
        this.clickNewFile('image');
    };
    ObjectPropertyComponent.prototype.clickSelectFile = function () {
        this.clickNewFile('file');
    };
    ObjectPropertyComponent.prototype.clickNewFile = function (target) {
        // console.log("target=" + target);
        this.onShowResourceDialog.emit(target);
    };
    ObjectPropertyComponent.prototype.onChangeData = function () {
        this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
        this.selectedObject = this.appDataService.getSelectedObject();
        this.selectedState = this.appDataService.getSelectedState();
    };
    return ObjectPropertyComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ObjectPropertyComponent.prototype, "onShowResourceDialog", void 0);
ObjectPropertyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-object-property',
        template: __webpack_require__(262),
        styles: [__webpack_require__(227)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object])
], ObjectPropertyComponent);

var _a;
//# sourceMappingURL=object-property.component.js.map

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_tree_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectTreeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ObjectTreeComponent = (function () {
    function ObjectTreeComponent(appDataService) {
        this.appDataService = appDataService;
        this.options = {
            allowDrag: true,
            allowDrop: function (element, to) {
                return to.parent.hasChildren;
            }
        };
        this.nodes = [];
        this.onSelectNode = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onChangeNode = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    ObjectTreeComponent.prototype.selectNode = function ($event) {
        // console.log("select data = " + JSON.stringify(Object.keys(event.node.data)));
        this.selectedNode = $event.node.data;
        this.onSelectNode.emit(this.selectedNode.id);
    };
    ObjectTreeComponent.prototype.changeNode = function ($event) {
        // console.log(
        //   "Moved",
        //   $event.node.name,
        //   "to",
        //   $event.to.parent.name,
        //   "at index",
        //   $event.to.index);
        $event.node.parentId = $event.to.parent.id;
        // console.log("select data = " + $event);
        this.onChangeNode.emit();
    };
    ObjectTreeComponent.prototype.ngOnInit = function () {
    };
    ObjectTreeComponent.prototype.focusDrillDown = function () {
        this.tree.treeModel.focusDrillDown();
    };
    ObjectTreeComponent.prototype.expandAll = function () {
        this.tree.treeModel.expandAll();
    };
    ObjectTreeComponent.prototype.updateTreeModel = function () {
        this.tree.treeModel.update();
    };
    ObjectTreeComponent.prototype.selectObjectNode = function (target) {
        this.tree.treeModel._setActiveNodeSingle(target, true);
        this.selectedNode = target;
        this.onSelectNode.emit(this.selectedNode.id);
    };
    ObjectTreeComponent.prototype.initObjectData = function () {
        this.nodes = this.appDataService.getActivityData().objectList;
        this.tree.treeModel.update();
        //  this.tree.
        if (!this.selectedNode) {
            var target = this.nodes[0];
            this.tree.treeModel._setActiveNodeSingle(target, true);
            this.selectedNode = target;
            this.onSelectNode.emit(this.selectedNode.id);
        }
        var self = this;
        setTimeout(function () {
            console.log('will expand all');
            self.expandAll();
        }, 10);
    };
    return ObjectTreeComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_angular2_tree_component__["b" /* TreeComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_tree_component__["b" /* TreeComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_tree_component__["b" /* TreeComponent */]) === "function" && _a || Object)
], ObjectTreeComponent.prototype, "tree", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ObjectTreeComponent.prototype, "onSelectNode", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ObjectTreeComponent.prototype, "onChangeNode", void 0);
ObjectTreeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-object-tree',
        template: __webpack_require__(263),
        styles: [__webpack_require__(228)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _b || Object])
], ObjectTreeComponent);

var _a, _b;
//# sourceMappingURL=object-tree.component.js.map

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewSizeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PreviewSizeComponent = (function () {
    function PreviewSizeComponent(appDataService, broadcaster) {
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
        this.showZoom = false;
        this.showRootSize = false;
    }
    PreviewSizeComponent.prototype.ngOnInit = function () {
        this.zoomLevel = this.appDataService.getZoom() * 100;
    };
    PreviewSizeComponent.prototype.onChangeData = function () {
        this.zoomLevel = this.appDataService.getZoom() * 100;
        var rootState = this.appDataService.findStateByObjectId('root');
        this.rootWidth = rootState.width;
        this.rootHeight = rootState.height;
    };
    PreviewSizeComponent.prototype.changeZoom = function (value) {
        this.zoomLevel = value;
        this.appDataService.setZoom(this.zoomLevel / 100);
        this.showZoom = false;
    };
    PreviewSizeComponent.prototype.clickZoomToggle = function () {
        this.showZoom = !this.showZoom;
        if (this.showRootSize) {
            this.showRootSize = false;
        }
    };
    PreviewSizeComponent.prototype.changeW = function (event) {
        console.log("changeW = " + this.rootWidth);
        this.changeRootSizeData();
    };
    PreviewSizeComponent.prototype.changeH = function (event) {
        console.log("changeH = " + this.rootHeight);
        this.changeRootSizeData();
    };
    PreviewSizeComponent.prototype.changeRootSize = function (width, height) {
        this.rootWidth = width;
        this.rootHeight = height;
        this.showRootSize = false;
        this.changeRootSizeData();
    };
    PreviewSizeComponent.prototype.changeRootSizeData = function () {
        var rootStateList = this.appDataService.findAllStateByObjectId('root');
        for (var i = 0; i < rootStateList.length; i++) {
            var aState = rootStateList[i];
            aState['width'] = this.rootWidth;
            aState['height'] = this.rootHeight;
        }
        var test = {
            kind: 'save-refresh-activity'
        };
        this.broadcaster.broadcast('activity', test);
    };
    PreviewSizeComponent.prototype.clickRootSizeToggle = function () {
        this.showRootSize = !this.showRootSize;
        if (this.showZoom) {
            this.showZoom = false;
        }
    };
    return PreviewSizeComponent;
}());
PreviewSizeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-preview-size',
        template: __webpack_require__(264),
        styles: [__webpack_require__(229)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _b || Object])
], PreviewSizeComponent);

var _a, _b;
//# sourceMappingURL=preview-size.component.js.map

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PreviewComponent = (function () {
    function PreviewComponent(appDataService, broadcaster) {
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
        this.onSelectNodeFromOther = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.previewWidth = 0;
        this.previewHeight = 0;
        this.topMargin = 80;
        this.leftMargin = 288;
        this.rightMargin = 320;
        this.isMouseDown = false;
        this.isResizeDown = false;
        this.isKeyCTRL = false;
    }
    PreviewComponent.prototype.ngOnInit = function () {
        // console.log(' this.viewHeight = ' + this.elementView.nativeElement.offsetHeight);
        this.invalidatePreviewSize();
    };
    PreviewComponent.prototype.keyDown = function ($event) {
        console.log("keyDown-" + $event.keyCode);
        if ($event.keyCode === 17) {
            this.isKeyCTRL = true;
        }
    };
    PreviewComponent.prototype.keyUp = function ($event) {
        console.log("keyUp-" + $event.keyCode);
        if ($event.keyCode === 17) {
            this.isKeyCTRL = false;
        }
        else if ($event.keyCode === 46) {
            var message = {
                kind: 'delete-current-object',
            };
            this.broadcaster.broadcast('activity', message);
        }
    };
    PreviewComponent.prototype.mouseDown = function (event) {
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.beforeX = event.clientX;
        this.beforeY = event.clientY;
        if (this.isKeyCTRL) {
            var x = (event.clientX - this.elementView.nativeElement.offsetLeft) / this.zoom;
            var y = (event.clientY - this.elementView.nativeElement.offsetTop) / this.zoom;
            var targetList = this.appDataService.getAllSelectedState();
            for (var i = targetList.length - 1; i >= 0; i--) {
                var state = targetList[i];
                var left = state.translationX + state.marginLeft;
                var top = state.translationY + state.marginTop;
                var right = left + state.width;
                var bottom = top + state.height;
                if (x > left && x < right && y > top && y < bottom) {
                    this.onSelectNodeFromOther.emit(state.objectId);
                    break;
                }
            }
        }
        if (this.selectedObject.id !== 'root') {
            this.isMouseDown = true;
        }
    };
    PreviewComponent.prototype.mouseOver = function (event) {
        var currentX = event.clientX;
        var currentY = event.clientY;
        var differX = (this.beforeX - currentX) / this.zoom;
        var differY = (this.beforeY - currentY) / this.zoom;
        var fixDiffer = differX;
        if (Math.abs(differX) < Math.abs(differY)) {
            fixDiffer = differY;
        }
        if (this.isResizeDown) {
            if (this.resizeIndex === 0) {
                this.appDataService.getSelectedState().marginTop -= differY;
                this.appDataService.getSelectedState().marginLeft -= differX;
                this.appDataService.getSelectedState().width += differX;
                this.appDataService.getSelectedState().height += differY;
            }
            else if (this.resizeIndex === 1) {
                // this.appDataService.getSelectedState().marginLeft -= differX;
                this.appDataService.getSelectedState().marginTop -= differY;
                this.appDataService.getSelectedState().width -= differX;
                this.appDataService.getSelectedState().height += differY;
            }
            else if (this.resizeIndex === 2) {
                this.appDataService.getSelectedState().marginLeft -= differX;
                this.appDataService.getSelectedState().width += differX;
                this.appDataService.getSelectedState().height -= differY;
            }
            else if (this.resizeIndex === 3) {
                this.appDataService.getSelectedState().width -= differX;
                this.appDataService.getSelectedState().height -= differY;
            }
        }
        else if (this.isMouseDown) {
            this.appDataService.getSelectedState().marginLeft -= differX;
            this.appDataService.getSelectedState().marginTop -= differY;
        }
        this.beforeX = currentX;
        this.beforeY = currentY;
    };
    PreviewComponent.prototype.isRoot = function () {
        return this.appDataService.getSelectedState().objectId === 'root';
    };
    PreviewComponent.prototype.mouseUp = function (event) {
        console.log('up');
        this.isMouseDown = false;
        this.isResizeDown = false;
    };
    PreviewComponent.prototype.resizeDown = function (event, index) {
        console.log('resizeDown =' + index);
        if (this.selectedObject.id !== 'root') {
            this.isResizeDown = true;
            this.resizeIndex = index;
        }
    };
    PreviewComponent.prototype.onResize = function (event) {
        this.invalidatePreviewSize();
    };
    PreviewComponent.prototype.invalidatePreviewSize = function () {
        this.previewWidth = window.innerWidth - (this.leftMargin + this.rightMargin);
        this.previewHeight = window.innerHeight - this.topMargin;
    };
    PreviewComponent.prototype.onChangeData = function () {
        this.activityData = this.appDataService.getActivityData();
        this.selectedStage = this.appDataService.getSelectedStage();
        this.selectedObject = this.appDataService.getSelectedObject();
        this.selectedState = this.appDataService.getSelectedState();
        this.zoom = this.appDataService.getZoom();
    };
    PreviewComponent.prototype.recreateObjectList = function () {
        this.activityData = null;
        var self = this;
        setTimeout(function () {
            self.activityData = self.appDataService.getActivityData();
        }, 100);
    };
    PreviewComponent.prototype.emptyObject = function () {
    };
    PreviewComponent.prototype.getCenterStyle = function () {
        var rootState = this.appDataService.findStateByObjectId('root');
        var zoom = this.appDataService.getZoom();
        var marginLeft = (this.previewWidth - rootState.width * zoom) / 2;
        var marginTop = (this.previewHeight - rootState.height * zoom) / 2;
        var cursor = 'move';
        if (this.isKeyCTRL) {
            cursor = 'context-menu';
        }
        return {
            'margin-left': marginLeft + 'px',
            'margin-top': marginTop + 'px',
            'position': 'relative',
            'cursor': cursor
        };
    };
    PreviewComponent.prototype.getSelectedObjectStyle = function () {
        return this.appDataService.getSelectedObjectStyle(this.appDataService.getSelectedState());
    };
    PreviewComponent.prototype.getRootWidth = function () {
        var zoom = this.appDataService.getZoom();
        var rootState = this.appDataService.findStateByObjectId('root');
        return rootState.width * zoom;
    };
    PreviewComponent.prototype.getRootHeight = function () {
        var zoom = this.appDataService.getZoom();
        var rootState = this.appDataService.findStateByObjectId('root');
        return rootState.height * zoom;
    };
    PreviewComponent.prototype.onSelectNodeFromPreview = function (objectId) {
        console.log("onSelectNodeFromPreview event-" + objectId);
        this.onSelectNodeFromOther.emit(objectId);
    };
    PreviewComponent.prototype.captureScreen = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var node = _this.elementView.nativeElement.innerHTML;
            var canvas = document.createElement('canvas');
            canvas.width = _this.getRootWidth();
            canvas.height = _this.getRootHeight();
            rasterizeHTML.drawHTML(node, canvas)
                .then(function (renderResult) {
                if (navigator.msSaveBlob) {
                    window.navigator.msSaveBlob(canvas.msToBlob(), name);
                }
                else {
                    var data = canvas.toDataURL();
                    resolve(data);
                }
            });
        });
    };
    return PreviewComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('previewScreen'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object)
], PreviewComponent.prototype, "elementView", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], PreviewComponent.prototype, "onSelectNodeFromOther", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('myPreview'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _b || Object)
], PreviewComponent.prototype, "myPreview", void 0);
PreviewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-preview',
        template: __webpack_require__(266),
        styles: [__webpack_require__(231)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _d || Object])
], PreviewComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=preview.component.js.map

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StageListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StageListComponent = (function () {
    function StageListComponent(appDataService) {
        this.appDataService = appDataService;
        this.onNewStage = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onSelectStage = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    StageListComponent.prototype.ngOnInit = function () {
    };
    StageListComponent.prototype.initData = function () {
        console.log("initData");
        this.stageList = this.appDataService.getActivityData().stageList;
        console.log("this.stageList =" + JSON.stringify(this.stageList));
        this.currentSelectedStage = this.appDataService.getSelectedStage();
    };
    StageListComponent.prototype.clickNewStage = function () {
        console.log("clickNewStage");
        this.onNewStage.emit();
    };
    StageListComponent.prototype.clickSelectStage = function (stage) {
        console.log("clickSelectStage");
        this.onSelectStage.emit(stage);
    };
    StageListComponent.prototype.onChangeData = function () {
        this.currentSelectedStage = this.appDataService.getSelectedStage();
    };
    return StageListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], StageListComponent.prototype, "onNewStage", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], StageListComponent.prototype, "onSelectStage", void 0);
StageListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-stage-list',
        template: __webpack_require__(267),
        styles: [__webpack_require__(232)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object])
], StageListComponent);

var _a;
//# sourceMappingURL=stage-list.component.js.map

/***/ }),
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 121 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 121;


/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(147);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__activity_object_tree_object_tree_component__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__activity_object_new_object_new_component__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__activity_object_property_object_property_component__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__activity_preview_preview_component__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__activity_preview_size_preview_size_component__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__activity_stage_list_stage_list_component__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_resource_resource_component__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__activity_event_list_event_list_component__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__activity_event_detail_stage_change_event_detail_stage_change_component__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__activity_event_detail_start_activity_event_detail_start_activity_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__activity_event_detail_finish_activity_event_detail_finish_activity_component__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__activity_event_generator_event_generator_component__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__service_application_data_service_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular2_uuid__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__service_broadcast_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__service_message_event_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_rxjs_add_operator_switchMap__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_rxjs_add_operator_switchMap__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var ActivityComponent = (function () {
    function ActivityComponent(route, router, location, zone, appDataService, broadcaster, messageEvent) {
        this.route = route;
        this.router = router;
        this.location = location;
        this.zone = zone;
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
        this.messageEvent = messageEvent;
        this.saveStatus = false;
        this.sendStatus = false;
        this.isReadyToRender = false;
        this.imageList = [];
        this.fileList = [];
        this.previewCss = {};
        this.isReadyToRender = false;
        // console.log("construct application =" + window.screen.height + ", test");
        // console.log("construct event.target.innerWidth ="+this.window.innerWidth+", event.target.innerHeight="+this.window.innerHeight);
    }
    ActivityComponent.prototype.ngOnInit = function () {
        this.applicationFolderPath = this.route.snapshot.params['applicationFolderPath'];
        this.activityId = this.route.snapshot.params['activityId'];
        this.appDataService.initApplicationPath(this.applicationFolderPath);
        this.appDataService.initActivityId(this.activityId);
        this.registerStringBroadcast();
    };
    ActivityComponent.prototype.registerStringBroadcast = function () {
        var _this = this;
        this.broadcaster.on('activity')
            .subscribe(function (message) {
            var kind = message.kind;
            console.log("message received!! = " + kind);
            if (kind === 'save') {
                _this.onClickSave();
            }
            else if (kind === 'save-refresh-activity') {
                _this.notifySelectedObjectChanged();
                _this.onClickSendDevice(null);
            }
            else if (kind === 'send-device') {
                _this.onClickSendDevice(null);
            }
            else if (kind === 'delete-object') {
                var objectId = message.objectId;
                if (objectId !== 'root') {
                    _this.appDataService.deleteObject(objectId);
                    _this.onClickSendDevice(null);
                }
            }
            else if (kind === 'delete-current-object') {
                var selectedObject = _this.appDataService.getSelectedObject();
                if (selectedObject) {
                    var objectId = selectedObject.id;
                    if (objectId !== 'root') {
                        _this.appDataService.deleteObject(objectId);
                        _this.notifySelectedObjectChanged();
                        _this.objectTreeComponent.initObjectData();
                        _this.onClickSendDevice(null);
                    }
                }
            }
            else if (kind === 'delete-event') {
                _this.appDataService.deleteTriggerEventByTriggerEventId(message.triggerEventId);
                _this.notifySelectedObjectChanged();
                _this.onClickSendDevice(null);
            }
            else if (kind === 'select-psd') {
                var selectedPSD = _this.appDataService.selectPsdFile();
                if (selectedPSD) {
                    _this.parsePsd(selectedPSD);
                }
            }
        });
    };
    ActivityComponent.prototype.parsePsd = function (selectedPSD) {
        var self = this;
        this.appDataService.parsePsdFile(selectedPSD, this.applicationFolderPath).then(function (result) {
            console.log("parse result = " + result);
            self.insertParsedPsdData(result);
        });
    };
    ActivityComponent.prototype.insertParsedPsdData = function (psdDataString) {
        var psdData = JSON.parse(psdDataString);
        this.insertPsdObject(psdData);
    };
    ActivityComponent.prototype.insertPsdObject = function (aObject) {
        var parentObject = this.appDataService.getSelectedObject();
        if (!parentObject.children) {
            parentObject = this.appDataService.findObjectById(this.appDataService.getSelectedObject().parentId);
        }
        var newObject = this.appDataService.createNewObject(aObject.type);
        newObject['parentId'] = parentObject.id;
        newObject['name'] = aObject.text;
        if (aObject.dataUrl) {
            newObject['dataUrl'] = aObject.dataUrl;
        }
        for (var i = 0; i < this.activityData.stageList.length; i++) {
            var aStage = this.activityData.stageList[i];
            var aState = this.appDataService.createNewState(newObject.id, aStage.id, aObject.type);
            aState['width'] = aObject.width;
            aState['height'] = aObject.height;
            aState['marginLeft'] = aObject.marginLeft;
            aState['marginTop'] = aObject.marginTop;
            this.activityData.stateList.push(aState);
        }
        parentObject.children.push(newObject);
        this.objectTreeComponent.updateTreeModel();
        this.objectTreeComponent.selectObjectNode(newObject);
        this.objectTreeComponent.expandAll();
        for (var i = 0; i < aObject.children.length; i++) {
            var aChild = aObject.children[i];
            this.insertPsdObject(aChild);
        }
    };
    // public onParseResult
    ActivityComponent.prototype.getPreviewWidth = function () {
        return (window.innerWidth - 608) + 'px';
    };
    ActivityComponent.prototype.getPreviewHeight = function () {
        return (window.innerHeight - 50) + 'px';
    };
    ActivityComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.appDataService.loadInitDataFromFile().then(function (data) {
            _this.defaultStateData = _this.appDataService.getDefaultStateData();
            _this.objectTypeData = _this.appDataService.getObjectTypeData();
            return _this.appDataService.loadApplicationData();
        })
            .then(function (result) {
            return _this.appDataService.loadImageResourceList();
        })
            .then(function (result) {
            return _this.appDataService.loadFileResourceList();
        })
            .then(function (result) {
            _this.fileList = _this.appDataService.getFileResourceList();
            _this.imageList = _this.appDataService.getImageResourceList();
            _this.applicationData = _this.appDataService.getApplicationData();
            _this.activityMetaData = _this.appDataService.getActivityMetaData();
            _this.activityData = _this.appDataService.getActivityData();
            _this.selectedTriggerEvent = _this.appDataService.getSelectedTriggerEvent();
            return _this.checkEmptyActivityData();
        }).then(function (result) {
            return _this.initDataToView();
        }).then(function (result) {
            _this.notifySelectedObjectChanged();
        });
    };
    ActivityComponent.prototype.refreshList = function () {
        this.applicationFolderPath = this.appDataService.getApplicationPath();
        this.imageList = this.appDataService.getImageResourceList();
    };
    ActivityComponent.prototype.ngOnDestroy = function () {
    };
    ActivityComponent.prototype.checkEmptyActivityData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // 데이터가 하나도 없으므로 초기화 시켜야함
            if (!_this.activityData.objectList) {
                //1. stage 
                //2. object
                //3. state
                //1. stage
                var stage = {
                    id: 'rootStage',
                    name: 'rootStage'
                };
                _this.activityData.stageList = [stage];
                //2. object
                var newObject = _this.appDataService.createNewObject('FrameLayout');
                newObject.id = 'root';
                newObject['name'] = 'root';
                newObject['backgroundColor'] = '#ffffff';
                _this.activityData.objectList = [newObject];
                //3. state
                var newState = _this.appDataService.createNewState(newObject.id, stage.id, 'FrameLayout');
                _this.activityData.stateList = [newState];
                //4. triggerEventList;
                _this.activityData.triggerEventList = [];
                //5. implementEventList;
                _this.activityData.implementEventList = [];
                //6. stateEventList;
                _this.activityData.stateEventList = [];
            }
            resolve(true);
        });
    };
    ActivityComponent.prototype.clickText = function () {
        console.log("clickText");
        this.objectTreeComponent.expandAll();
    };
    ActivityComponent.prototype.initDataToView = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.isReadyToRender = true;
            _this.appDataService.setSelectedStage(_this.activityData.stageList[0]);
            _this.appDataService.setSelectedObject(_this.activityData.objectList[0]);
            _this.objectNewComponent.setObjectTypeData(_this.objectTypeData);
            _this.objectTreeComponent.initObjectData();
            _this.stageList.initData();
            resolve(true);
        });
    };
    ActivityComponent.prototype.onCompleteEvent = function (event) {
        // console.log("onCompleteEvent");
    };
    ActivityComponent.prototype.clickBack = function () {
        //capture and go back
        this.captureScreen();
    };
    ActivityComponent.prototype.clickSave = function () {
        this.saveActivityData();
    };
    ActivityComponent.prototype.changeActivityName = function () {
        this.saveApplicationData();
    };
    ActivityComponent.prototype.saveApplicationData = function () {
        this.appDataService.saveApplicationData(this.applicationData);
    };
    ActivityComponent.prototype.saveActivityData = function () {
        this.appDataService.saveActivityData(this.activityId, this.activityData);
    };
    ActivityComponent.prototype.captureScreen = function () {
        var self = this;
        this.previewComponent.captureScreen().then(function (data) {
            var fileName = 'preview/' + self.activityId + '.jpg';
            var filePath = self.applicationFolderPath + '/' + fileName;
            self.appDataService.saveRawFile(filePath, data);
            self.activityMetaData.previewPath = fileName;
            self.saveApplicationData();
            self.saveActivityData();
            self.zone.run(function () {
                // console.log("will go back");
                self.location.back();
            });
        });
    };
    ActivityComponent.prototype.onClickSave = function () {
        var _this = this;
        console.log("onClickSave");
        this.saveStatus = true;
        var self = this;
        this.saveProcessAsync().then(function (result) {
            console.log("done save");
            self.zone.run(function () {
                console.log("done save data");
                _this.saveStatus = false;
            });
        });
    };
    ActivityComponent.prototype.saveProcessAsync = function () {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
            _this.saveApplicationData();
            _this.saveActivityData();
            _this.previewComponent.captureScreen().then(function (data) {
                var fileName = 'preview/' + self.activityId + '.jpg';
                var filePath = self.applicationFolderPath + '/' + fileName;
                self.appDataService.saveRawFile(filePath, data);
                self.activityMetaData.previewPath = fileName;
                self.saveApplicationData();
                self.saveActivityData();
                resolve(true);
            });
        });
    };
    ActivityComponent.prototype.sendDeviceProcessAsync = function () {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
            _this.saveApplicationData();
            _this.saveActivityData();
            _this.previewComponent.captureScreen().then(function (data) {
                var fileName = 'preview/' + self.activityId + '.jpg';
                var filePath = self.applicationFolderPath + '/' + fileName;
                self.appDataService.saveRawFile(filePath, data);
                self.activityMetaData.previewPath = fileName;
                self.saveApplicationData();
                self.saveActivityData();
                self.appDataService.sendFileToDevice();
                resolve(true);
            });
        });
    };
    ActivityComponent.prototype.onClickSendDevice = function (value) {
        console.log("onClickSendDevice");
        this.sendStatus = true;
        var self = this;
        this.sendDeviceProcessAsync().then(function (result) {
            console.log("done send data");
            self.sendStatus = false;
        });
        // this.saveApplicationData();
        // this.saveActivityData();
        // const self = this;
        // this.previewComponent.captureScreen().then((data) => {
        //   const fileName = 'preview/' + self.activityId + '.jpg';
        //   const filePath = self.applicationFolderPath + '/' + fileName;
        //   self.appDataService.saveRawFile(filePath, data);
        //   self.activityMetaData.previewPath = fileName;
        //   self.saveApplicationData();
        //   self.saveActivityData();
        //   self.zone.run(() => {
        //     console.log("will send data");
        //     self.appDataService.sendFileToDevice();
        //     // self.location.back();
        //     console.log("done send data");
        //     this.sendStatus = false;
        //   });
        // });
    };
    ActivityComponent.prototype.clickNewObject = function (type) {
        var parentObject = this.appDataService.getSelectedObject();
        if (!parentObject.children) {
            parentObject = this.appDataService.findObjectById(this.appDataService.getSelectedObject().parentId);
        }
        var newObject = this.appDataService.createNewObject(type);
        newObject['parentId'] = parentObject.id;
        for (var i = 0; i < this.activityData.stageList.length; i++) {
            var aStage = this.activityData.stageList[i];
            var aState = this.appDataService.createNewState(newObject.id, aStage.id, type);
            this.activityData.stateList.push(aState);
        }
        parentObject.children.push(newObject);
        this.objectTreeComponent.updateTreeModel();
        this.objectTreeComponent.selectObjectNode(newObject);
        this.objectTreeComponent.expandAll();
    };
    ActivityComponent.prototype.onNewStage = function () {
        console.log("onNewStage");
        //make new stage
        //1. stage
        var stage = this.onMakeNewStage();
        this.onSelectStage(stage);
    };
    ActivityComponent.prototype.onMakeNewStage = function () {
        var stage = {
            id: 'stage_' + __WEBPACK_IMPORTED_MODULE_16_angular2_uuid__["UUID"].UUID(),
            name: 'stage-' + this.activityData.stageList.length
        };
        this.activityData.stageList.push(stage);
        var allStateList = this.appDataService.getAllSelectedState();
        for (var i = 0; i < allStateList.length; i++) {
            var aState = Object.assign({}, allStateList[i]);
            aState.stageId = stage.id;
            aState.id = 'state_' + __WEBPACK_IMPORTED_MODULE_16_angular2_uuid__["UUID"].UUID();
            this.activityData.stateList.push(aState);
        }
        return stage;
    };
    ActivityComponent.prototype.onSelectStage = function (target) {
        console.log("onSelectStage = " + target);
        this.appDataService.setSelectedStage(target);
        this.notifySelectedObjectChanged();
    };
    ActivityComponent.prototype.onSelectFile = function (target) {
        console.log("onSelectFile = " + target);
        var selectedObject = this.appDataService.getSelectedObject();
        console.log("selectedObject.objectType  = " + JSON.stringify(selectedObject));
        if (selectedObject) {
            var tempUrl = selectedObject.dataUrl;
            selectedObject.dataUrl = target;
            this.saveActivityData();
            this.saveApplicationData();
            if (selectedObject.type === 'LottieView') {
                if (tempUrl && tempUrl !== target) {
                    this.previewComponent.recreateObjectList();
                }
            }
        }
    };
    ActivityComponent.prototype.onShowResourceDialog = function (target) {
        this.resourceDialog.showDialog(target);
    };
    ActivityComponent.prototype.changeTreeData = function (data) {
    };
    ActivityComponent.prototype.onSelectNodeFromOther = function (objectId) {
        console.log("onSelectNodeFromOther-" + objectId);
        this.objectTreeComponent.selectObjectNode(this.appDataService.findObjectById(objectId));
    };
    ActivityComponent.prototype.onSelectNodeFromTree = function (objectId) {
        var selectedObject = this.appDataService.findObjectById(objectId);
        // console.log("onSelectNodeFromTree = " + selectedObject.id);
        this.appDataService.setSelectedObject(selectedObject);
        this.notifySelectedObjectChanged();
    };
    ActivityComponent.prototype.onChangeNodeFromTree = function () {
        console.log("onChangeNodeFromTree");
        this.saveActivityData();
    };
    ActivityComponent.prototype.notifySelectedObjectChanged = function () {
        this.previewComponent.onChangeData();
        this.previewSize.onChangeData();
        this.objectPropertyComponent.onChangeData();
        this.stageList.onChangeData();
        this.eventList.onChangeData();
        this.eventGenerator.onChangeData();
        this.eventList.onChangeData();
        this.eventDetailStageChange.onChangeData();
        this.eventDetailStartActivity.onChangeData();
        this.eventDetailFinishActivity.onChangeData();
    };
    ActivityComponent.prototype.onNewAfterAnimationEvent = function (target) {
        console.log("onNewEvent target =" + target);
        //check stage count
        if (this.activityData.stageList.length == 1) {
            this.onMakeNewStage();
        }
        this.eventGenerator.resetData();
        this.eventGenerator.makeAfterTrigger(target);
        this.eventGenerator.showDialog();
    };
    ActivityComponent.prototype.onNewEvent = function () {
        // check stage count
        if (this.activityData.stageList.length === 1) {
            this.onMakeNewStage();
        }
        this.eventGenerator.resetData();
        this.eventGenerator.showDialog();
    };
    ActivityComponent.prototype.onClickDetailEvent = function (triggerEvent) {
        console.log("onClickDetailEvent = " + JSON.stringify(triggerEvent));
        this.appDataService.setSelectedTriggerEvent(triggerEvent);
        var impEvent = this.appDataService.findImplentEventByTriggerEventId(triggerEvent.id);
        this.appDataService.setSelectedImplementEvent(impEvent);
        // notify data set changed
        this.notifySelectedObjectChanged();
    };
    ActivityComponent.prototype.onCloseEvent = function () {
        this.appDataService.setSelectedTriggerEvent(null);
        this.appDataService.setSelectedImplementEvent(null);
        // notify data set changed
        this.notifySelectedObjectChanged();
    };
    ActivityComponent.prototype.onResize = function (event) {
    };
    return ActivityComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('objectTree'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__activity_object_tree_object_tree_component__["a" /* ObjectTreeComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__activity_object_tree_object_tree_component__["a" /* ObjectTreeComponent */]) === "function" && _a || Object)
], ActivityComponent.prototype, "objectTreeComponent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('objectNew'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__activity_object_new_object_new_component__["a" /* ObjectNewComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__activity_object_new_object_new_component__["a" /* ObjectNewComponent */]) === "function" && _b || Object)
], ActivityComponent.prototype, "objectNewComponent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('objectProperty'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__activity_object_property_object_property_component__["a" /* ObjectPropertyComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__activity_object_property_object_property_component__["a" /* ObjectPropertyComponent */]) === "function" && _c || Object)
], ActivityComponent.prototype, "objectPropertyComponent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('previewCanvas'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__activity_preview_preview_component__["a" /* PreviewComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__activity_preview_preview_component__["a" /* PreviewComponent */]) === "function" && _d || Object)
], ActivityComponent.prototype, "previewComponent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('resourceDialog'),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_9__common_resource_resource_component__["a" /* ResourceComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__common_resource_resource_component__["a" /* ResourceComponent */]) === "function" && _e || Object)
], ActivityComponent.prototype, "resourceDialog", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('stageList'),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__activity_stage_list_stage_list_component__["a" /* StageListComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__activity_stage_list_stage_list_component__["a" /* StageListComponent */]) === "function" && _f || Object)
], ActivityComponent.prototype, "stageList", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('eventGenerator'),
    __metadata("design:type", typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_14__activity_event_generator_event_generator_component__["a" /* EventGeneratorComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_14__activity_event_generator_event_generator_component__["a" /* EventGeneratorComponent */]) === "function" && _g || Object)
], ActivityComponent.prototype, "eventGenerator", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('eventList'),
    __metadata("design:type", typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_10__activity_event_list_event_list_component__["a" /* EventListComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__activity_event_list_event_list_component__["a" /* EventListComponent */]) === "function" && _h || Object)
], ActivityComponent.prototype, "eventList", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('eventDetailStageChange'),
    __metadata("design:type", typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_11__activity_event_detail_stage_change_event_detail_stage_change_component__["a" /* EventDetailStageChangeComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__activity_event_detail_stage_change_event_detail_stage_change_component__["a" /* EventDetailStageChangeComponent */]) === "function" && _j || Object)
], ActivityComponent.prototype, "eventDetailStageChange", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('eventDetailStartActivity'),
    __metadata("design:type", typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_12__activity_event_detail_start_activity_event_detail_start_activity_component__["a" /* EventDetailStartActivityComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__activity_event_detail_start_activity_event_detail_start_activity_component__["a" /* EventDetailStartActivityComponent */]) === "function" && _k || Object)
], ActivityComponent.prototype, "eventDetailStartActivity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('eventDetailFinishActivity'),
    __metadata("design:type", typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_13__activity_event_detail_finish_activity_event_detail_finish_activity_component__["a" /* EventDetailFinishActivityComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__activity_event_detail_finish_activity_event_detail_finish_activity_component__["a" /* EventDetailFinishActivityComponent */]) === "function" && _l || Object)
], ActivityComponent.prototype, "eventDetailFinishActivity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('previewSize'),
    __metadata("design:type", typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_7__activity_preview_size_preview_size_component__["a" /* PreviewSizeComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__activity_preview_size_preview_size_component__["a" /* PreviewSizeComponent */]) === "function" && _m || Object)
], ActivityComponent.prototype, "previewSize", void 0);
ActivityComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-activity',
        template: __webpack_require__(250),
        styles: [__webpack_require__(215)],
        providers: [__WEBPACK_IMPORTED_MODULE_17__service_broadcast_service__["a" /* BroadcastService */], __WEBPACK_IMPORTED_MODULE_18__service_message_event_service__["a" /* MessageEventService */]]
    }),
    __metadata("design:paramtypes", [typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["e" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["e" /* Location */]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* NgZone */]) === "function" && _r || Object, typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_15__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _s || Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_17__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_17__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _t || Object, typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_18__service_message_event_service__["a" /* MessageEventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_18__service_message_event_service__["a" /* MessageEventService */]) === "function" && _u || Object])
], ActivityComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
//# sourceMappingURL=activity.component.js.map

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventStageChangeCellComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventStageChangeCellComponent = (function () {
    function EventStageChangeCellComponent(elementRef, appDataService) {
        this.elementRef = elementRef;
        this.appDataService = appDataService;
        this.w = 200;
        this.h = 200;
        this.handlerRadius = 10;
        this.leftPoint = { 'x': 0.2, 'y': 0.8 };
        this.rightPoint = { 'x': 0.64, 'y': 0.21 };
    }
    EventStageChangeCellComponent.prototype.ngOnInit = function () {
        console.log('state event data = ' + JSON.stringify(this.stateEventData));
    };
    EventStageChangeCellComponent.prototype.getObjectName = function (objectId) {
        return this.appDataService.findObjectById(objectId);
    };
    EventStageChangeCellComponent.prototype.toggleDetail = function () {
        this.isExpanded = !this.isExpanded;
        console.log("isExpanded = " + this.isExpanded);
        if (this.isExpanded) {
        }
    };
    EventStageChangeCellComponent.prototype.makeGraphe = function () {
        var canvas = this.myCanvas.nativeElement;
        this.context = canvas.getContext('2d');
        this.w = this.myCanvas.nativeElement.getAttribute('canvasW');
        this.h = this.myCanvas.nativeElement.getAttribute('canvasH');
        this.updateGraph();
    };
    EventStageChangeCellComponent.prototype.ngAfterViewInit = function () {
        this.makeGraphe();
    };
    EventStageChangeCellComponent.prototype.updateGraph = function () {
        var ctx = this.context;
        var left = this.leftPoint;
        var right = this.rightPoint;
        ctx.clearRect(0, 0, this.w, this.h);
        ctx.beginPath();
        ctx.moveTo(0, this.h);
        ctx.bezierCurveTo(left.x * this.w, (1 - left.y) * this.h, right.x * this.w, (1 - right.y) * this.h, this.w, 0);
        ctx.stroke();
        ctx.closePath();
        var needHandler = true;
        if (this.w < 110) {
            needHandler = false;
        }
        if (needHandler) {
            ctx.beginPath();
            ctx.moveTo(0, this.h);
            ctx.lineTo(this.w, 0);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(0, this.h);
            ctx.lineTo(left.x * this.w, (1 - left.y) * this.h);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(left.x * this.w, (1 - left.y) * this.h, this.handlerRadius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(this.w, 0);
            ctx.lineTo(right.x * this.w, (1 - right.y) * this.h);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(right.x * this.w, (1 - right.y) * this.h, this.handlerRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    };
    EventStageChangeCellComponent.prototype.mouseDown = function (event) {
        this.startX = event.offsetX;
        this.startY = event.offsetY;
        this.beforeX = event.offsetX;
        this.beforeY = event.offsetY;
        var distancLeft = Math.sqrt(Math.pow(this.startX - this.leftPoint.x * this.w, 2) + Math.pow(this.startY - (1 - this.leftPoint.y) * this.h, 2));
        var distancRight = Math.sqrt(Math.pow(this.startX - this.rightPoint.x * this.w, 2) + Math.pow(this.startY - (1 - this.rightPoint.y) * this.h, 2));
        this.isSelectedLeftPoint = false;
        this.isSelectedRightPoint = false;
        if (distancLeft < this.handlerRadius * 3) {
            this.isSelectedLeftPoint = true;
        }
        else if (distancRight < this.handlerRadius * 3) {
            this.isSelectedRightPoint = true;
        }
    };
    EventStageChangeCellComponent.prototype.mouseMove = function (event) {
        if (!this.isSelectedLeftPoint && !this.isSelectedRightPoint) {
            return;
        }
        var currentX = event.offsetX;
        var currentY = event.offsetY;
        var differX = (this.beforeX - currentX);
        var differY = (this.beforeY - currentY);
        if (this.isSelectedLeftPoint) {
            this.leftPoint.x = this.leftPoint.x - differX / this.w;
            this.leftPoint.y = this.leftPoint.y + differY / this.h;
        }
        else if (this.isSelectedRightPoint) {
            this.rightPoint.x = this.rightPoint.x - differX / this.w;
            this.rightPoint.y = this.rightPoint.y + differY / this.h;
        }
        this.updateGraph();
        this.beforeX = currentX;
        this.beforeY = currentY;
    };
    EventStageChangeCellComponent.prototype.mouseUp = function (event) {
        this.isSelectedLeftPoint = false;
        this.isSelectedRightPoint = false;
    };
    return EventStageChangeCellComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('myCanvasS'),
    __metadata("design:type", Object)
], EventStageChangeCellComponent.prototype, "myCanvasS", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('myCanvas'),
    __metadata("design:type", Object)
], EventStageChangeCellComponent.prototype, "myCanvas", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])('stateEventData'),
    __metadata("design:type", Object)
], EventStageChangeCellComponent.prototype, "stateEventData", void 0);
EventStageChangeCellComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-event-stage-change-cell',
        template: __webpack_require__(256),
        styles: [__webpack_require__(221)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _b || Object])
], EventStageChangeCellComponent);

var _a, _b;
//# sourceMappingURL=event-stage-change-cell.component.js.map

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventStateChangeCellComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventStateChangeCellComponent = (function () {
    function EventStateChangeCellComponent(appDataService) {
        this.appDataService = appDataService;
        this.onChangeTimeLineFromStateCell = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.presetInterpolatorList = [
            {
                'name': 'linear',
                'value': [0, 0, 1, 1]
            },
            {
                'name': 'ease',
                'value': [0.25, 0.1, 0.25, 1]
            },
            //ease-in
            {
                'name': 'easeIn',
                'value': [0.42, 0, 1, 1]
            },
            {
                'name': 'easeInQuad',
                'value': [0.55, 0.085, 0.68, 0.53]
            },
            {
                'name': 'easeInCubic',
                'value': [0.55, 0.055, 0.675, 0.19]
            },
            {
                'name': 'easeInQuart',
                'value': [0.895, 0.03, 0.685, 0.22]
            },
            {
                'name': 'easeInQuint',
                'value': [0.755, 0.05, 0.855, 0.06]
            },
            {
                'name': 'easeInSine',
                'value': [0.47, 0, 0.745, 0.715]
            },
            {
                'name': 'easeInExpo',
                'value': [0.95, 0.05, 0.795, 0.035]
            },
            {
                'name': 'easeInCirc',
                'value': [0.6, 0.04, 0.98, 0.335]
            },
            {
                'name': 'easeInBack',
                'value': [0.6, -0.28, 0.735, 0.045]
            },
            //ease-out
            {
                'name': 'easeOut',
                'value': [0, 0, 0.58, 1]
            },
            {
                'name': 'easeOutQuad',
                'value': [0.25, 0.46, 0.45, 0.94]
            },
            {
                'name': 'easeOutCubic',
                'value': [0.215, 0.61, 0.355, 1]
            },
            {
                'name': 'easeOutQuart',
                'value': [0.165, 0.84, 0.44, 1]
            },
            {
                'name': 'easeOutQuint',
                'value': [0.23, 1, 0.32, 1]
            },
            {
                'name': 'easeOutSine',
                'value': [0.39, 0.575, 0.565, 1]
            },
            {
                'name': 'easeOutExpo',
                'value': [0.19, 1, 0.22, 1]
            },
            {
                'name': 'easeOutCirc',
                'value': [0.075, 0.82, 0.165, 1]
            },
            {
                'name': 'easeOutBack',
                'value': [0.175, 0.885, 0.32, 1.275]
            },
            //ease-in-out
            {
                'name': 'easeInOut',
                'value': [0.42, 0, 0.58, 1]
            },
            {
                'name': 'easeInOutQuad',
                'value': [0.455, 0.03, 0.515, 0.955]
            },
            {
                'name': 'easeInOutCubic',
                'value': [0.645, 0.045, 0.355, 1]
            },
            {
                'name': 'easeInOutQuart',
                'value': [0.77, 0, 0.175, 1]
            },
            {
                'name': 'easeInOutQuint',
                'value': [0.86, 0, 0.07, 1]
            },
            {
                'name': 'easeInOutSine',
                'value': [0.445, 0.05, 0.55, 0.95]
            },
            {
                'name': 'easeInOutExpo',
                'value': [1, 0, 0, 1]
            },
            {
                'name': 'easeInOutCirc',
                'value': [0.785, 0.135, 0.15, 0.86]
            },
            {
                'name': 'easeInOutBack',
                'value': [0.68, -0.55, 0.265, 1.55]
            }
        ];
    }
    EventStateChangeCellComponent.prototype.ngOnInit = function () {
        console.log("maxtime =" + this.maxTotalTime);
    };
    EventStateChangeCellComponent.prototype.getObjectName = function (objectId) {
        return this.appDataService.findObjectById(objectId);
    };
    EventStateChangeCellComponent.prototype.onChangeGraph = function (value) {
        this.graphSmall.updateGraph();
    };
    EventStateChangeCellComponent.prototype.onChangeTimeLineFromTimeLine = function (value) {
        console.log("call onChangeTimeLineFromTimeLine 1");
        this.onChangeTimeLineFromStateCell.emit('change');
    };
    EventStateChangeCellComponent.prototype.onChangeInterpolator = function (interpolator, target) {
        target.cubicValue = interpolator.split(',').map(Number);
        this.graphSmall.updateGraph();
        this.graphBig.updateGraph();
    };
    EventStateChangeCellComponent.prototype.toggleDetail = function () {
        this.isExpaned = !this.isExpaned;
    };
    return EventStateChangeCellComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])('stateEventData'),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "stateEventData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])('maxTotalTime'),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "maxTotalTime", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('graphSmall'),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "graphSmall", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('graphBig'),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "graphBig", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('timeLineBig'),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "timeLineBig", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('timeLineSmall'),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "timeLineSmall", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "onChangeTimeLineFromStateCell", void 0);
EventStateChangeCellComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-event-state-change-cell',
        template: __webpack_require__(257),
        styles: [__webpack_require__(222)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object])
], EventStateChangeCellComponent);

var _a;
//# sourceMappingURL=event-state-change-cell.component.js.map

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventStateChangeGraphComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EventStateChangeGraphComponent = (function () {
    function EventStateChangeGraphComponent(elementRef) {
        this.elementRef = elementRef;
        this.onChangeGraph = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.w = 200;
        this.h = 200;
        this.p = 0;
        this.handlerRadius = 8;
    }
    EventStateChangeGraphComponent.prototype.ngOnInit = function () {
    };
    EventStateChangeGraphComponent.prototype.ngAfterViewInit = function () {
        this.w = this.graphSize;
        this.h = this.graphSize;
        if (this.paddingSize) {
            this.p = this.paddingSize;
        }
        this.makeGraphe();
    };
    EventStateChangeGraphComponent.prototype.makeGraphe = function () {
        var canvas = this.myCanvas.nativeElement;
        this.context = canvas.getContext('2d');
        this.updateGraph();
    };
    EventStateChangeGraphComponent.prototype.updateGraph = function () {
        var ctx = this.context;
        ctx.clearRect(0, 0, this.w, this.h);
        // ctx.rect(this.p, this.p, this.w - this.p * 2, this.h - this.p * 2);
        // ctx.stroke();
        if (this.needHandler) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, this.w, this.h);
            ctx.fill();
            //가운데 기준선
            ctx.beginPath();
            ctx.strokeStyle = "#ececec";
            ctx.moveTo(this.p, this.h - this.p);
            ctx.lineTo(this.w - this.p, this.p);
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();
        }
        //그래프 곡선
        ctx.beginPath();
        ctx.strokeStyle = "#454545";
        ctx.moveTo(this.p, this.h - this.p);
        ctx.bezierCurveTo(this.p + this.stateEventData.cubicValue[0] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[1]) * (this.h - this.p * 2), this.p + this.stateEventData.cubicValue[2] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[3]) * (this.h - this.p * 2), this.w - this.p, this.p);
        if (this.needHandler) {
            ctx.lineWidth = 4;
        }
        else {
            ctx.lineWidth = 2;
        }
        ctx.stroke();
        ctx.closePath();
        if (this.needHandler) {
            //왼쪽 핸들러 직선
            ctx.beginPath();
            ctx.strokeStyle = "#898989";
            ctx.moveTo(this.p, this.h - this.p);
            ctx.lineTo(this.p + this.stateEventData.cubicValue[0] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[1]) * (this.h - this.p * 2));
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
            //왼쪽 중심 원
            ctx.beginPath();
            ctx.strokeStyle = "#898989";
            ctx.fillStyle = "#fff";
            ctx.arc(this.p, this.h - this.p, this.handlerRadius * 0.6, 0, 2 * Math.PI);
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
            ctx.fill();
            //왼쪽 핸들러 원
            ctx.beginPath();
            ctx.fillStyle = "#f08";
            ctx.arc(this.p + this.stateEventData.cubicValue[0] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[1]) * (this.h - this.p * 2), this.handlerRadius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.closePath();
            ctx.fill();
            //오른쪽 핸들러 직선
            ctx.beginPath();
            ctx.moveTo(this.w - this.p, this.p);
            ctx.lineTo(this.p + this.stateEventData.cubicValue[2] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[3]) * (this.h - this.p * 2));
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.stroke();
            //오른쪽 중심 원
            ctx.beginPath();
            ctx.fillStyle = "#fff";
            ctx.arc(this.w - this.p, this.p, this.handlerRadius * 0.6, 0, 2 * Math.PI);
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
            ctx.fill();
            //오른쪽 핸들러 원
            ctx.beginPath();
            ctx.fillStyle = "#0ab";
            ctx.arc(this.p + this.stateEventData.cubicValue[2] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[3]) * (this.h - this.p * 2), this.handlerRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fill();
        }
    };
    EventStateChangeGraphComponent.prototype.mouseDown = function (event) {
        this.startX = event.offsetX - this.p;
        this.startY = event.offsetY - this.p;
        this.beforeX = event.offsetX - this.p;
        this.beforeY = event.offsetY - this.p;
        var distancLeft = Math.sqrt(Math.pow(this.startX - this.stateEventData.cubicValue[0] * (this.w - this.p * 2), 2) + Math.pow(this.startY - (1 - this.stateEventData.cubicValue[1]) * (this.h - this.p * 2), 2));
        var distancRight = Math.sqrt(Math.pow(this.startX - this.stateEventData.cubicValue[2] * (this.w - this.p * 2), 2) + Math.pow(this.startY - (1 - this.stateEventData.cubicValue[3]) * (this.h - this.p * 2), 2));
        this.isSelectedLeftPoint = false;
        this.isSelectedRightPoint = false;
        if (distancLeft < this.handlerRadius * 5) {
            this.isSelectedLeftPoint = true;
        }
        else if (distancRight < this.handlerRadius * 5) {
            this.isSelectedRightPoint = true;
        }
    };
    EventStateChangeGraphComponent.prototype.mouseMove = function (event) {
        if (!this.isSelectedLeftPoint && !this.isSelectedRightPoint) {
            return;
        }
        var currentX = event.offsetX - this.p;
        var currentY = event.offsetY - this.p;
        var differX = (this.beforeX - currentX);
        var differY = (this.beforeY - currentY);
        if (this.isSelectedLeftPoint) {
            this.stateEventData.cubicValue[0] = Math.round((Number(this.stateEventData.cubicValue[0]) - (differX / (this.w - this.p * 2))) * 1000) / 1000;
            this.stateEventData.cubicValue[1] = Math.round((Number(this.stateEventData.cubicValue[1]) + (differY / (this.h - this.p * 2))) * 1000) / 1000;
        }
        else if (this.isSelectedRightPoint) {
            this.stateEventData.cubicValue[2] = Math.round((Number(this.stateEventData.cubicValue[2]) - (differX / (this.w - this.p * 2))) * 1000) / 1000;
            this.stateEventData.cubicValue[3] = Math.round((Number(this.stateEventData.cubicValue[3]) + (differY / (this.h - this.p * 2))) * 1000) / 1000;
        }
        this.updateGraph();
        this.beforeX = currentX;
        this.beforeY = currentY;
        this.onChangeGraph.emit('update');
    };
    EventStateChangeGraphComponent.prototype.mouseUp = function (event) {
        this.isSelectedLeftPoint = false;
        this.isSelectedRightPoint = false;
    };
    return EventStateChangeGraphComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])('stateEventData'),
    __metadata("design:type", Object)
], EventStateChangeGraphComponent.prototype, "stateEventData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])('graphSize'),
    __metadata("design:type", Object)
], EventStateChangeGraphComponent.prototype, "graphSize", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])('paddingSize'),
    __metadata("design:type", Object)
], EventStateChangeGraphComponent.prototype, "paddingSize", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])('needHandler'),
    __metadata("design:type", Object)
], EventStateChangeGraphComponent.prototype, "needHandler", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('myCanvas'),
    __metadata("design:type", Object)
], EventStateChangeGraphComponent.prototype, "myCanvas", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], EventStateChangeGraphComponent.prototype, "onChangeGraph", void 0);
EventStateChangeGraphComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-event-state-change-graph',
        template: __webpack_require__(258),
        styles: [__webpack_require__(223)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object])
], EventStateChangeGraphComponent);

var _a;
//# sourceMappingURL=event-state-change-graph.component.js.map

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventStateChangeTimelineComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EventStateChangeTimelineComponent = (function () {
    function EventStateChangeTimelineComponent() {
        this.onChangeTimeLine = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.p = 10;
        this.handlerRadius = 5;
    }
    EventStateChangeTimelineComponent.prototype.ngOnInit = function () {
    };
    EventStateChangeTimelineComponent.prototype.ngAfterViewInit = function () {
        this.makeGraphe();
    };
    EventStateChangeTimelineComponent.prototype.makeGraphe = function () {
        var canvas = this.myCanvas.nativeElement;
        this.context = canvas.getContext('2d');
        this.p = Number(this.timeLinePadding);
        this.updateGraph();
    };
    EventStateChangeTimelineComponent.prototype.updateGraph = function () {
        var ctx = this.context;
        ctx.clearRect(0, 0, this.timeLineSizeW, this.timeLineSizeH);
        // 눈금
        for (var i = 0; i < 30; i++) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.p + 10 * i, 1);
            ctx.lineTo(this.p + 10 * i, (this.timeLineSizeH - this.p * 2) - 2);
            ctx.strokeStyle = "#ececec";
            ctx.stroke();
        }
        ctx.lineWidth = 1;
        ctx.rect(this.p, this.p, this.timeLineSizeW - this.p * 2, this.timeLineSizeH - this.p * 2);
        ctx.strokeStyle = "#898989";
        ctx.stroke();
        //draw duration
        var contentW = this.timeLineSizeW - this.p * 2;
        var contentH = this.timeLineSizeH - this.p * 2;
        var left = this.stateEventData.startDelay / this.maxTime * contentW;
        var duration = this.stateEventData.duration / this.maxTime * contentW;
        //타임라인 왼쪽 핸들러
        ctx.fillStyle = '#288097';
        ctx.fillRect(this.p + left, this.p, this.handlerRadius, contentH);
        //타임라인
        ctx.fillStyle = '#46a2ba';
        ctx.fillRect(this.p + left + this.handlerRadius, this.p, duration - this.handlerRadius * 2, contentH);
        //타임라인 오른쪽 핸들러
        ctx.fillStyle = '#288097';
        ctx.fillRect(this.p + left + duration - this.handlerRadius, this.p, this.handlerRadius, contentH);
    };
    EventStateChangeTimelineComponent.prototype.mouseDown = function (event) {
        this.isDown = true;
        this.isSelectedLeftPoint = false;
        this.isSelectedRightPoint = false;
        this.isSelectedCenter = false;
        this.startX = event.offsetX - this.p;
        this.startY = event.offsetY - this.p;
        this.beforeX = event.offsetX - this.p;
        this.beforeY = event.offsetY - this.p;
        //draw duration
        var contentW = this.timeLineSizeW - this.p * 2;
        var contentH = this.timeLineSizeH - this.p * 2;
        var left = this.stateEventData.startDelay / this.maxTime * contentW;
        var duration = this.stateEventData.duration / this.maxTime * contentW;
        var distancLeft = Math.sqrt(Math.pow(this.startX - left, 2));
        var distancRight = Math.sqrt(Math.pow(this.startX - (left + duration), 2));
        this.isSelectedLeftPoint = false;
        this.isSelectedRightPoint = false;
        if (distancLeft < this.handlerRadius) {
            this.isSelectedLeftPoint = true;
        }
        else if (distancRight < this.handlerRadius) {
            this.isSelectedRightPoint = true;
        }
        else {
            this.isSelectedCenter = true;
        }
    };
    EventStateChangeTimelineComponent.prototype.mouseMove = function (event) {
        if (!this.isSelectedLeftPoint && !this.isSelectedRightPoint && !this.isSelectedCenter) {
            return;
        }
        var currentX = event.offsetX - this.p;
        var currentY = event.offsetY - this.p;
        var differX = (this.beforeX - currentX);
        var differY = (this.beforeY - currentY);
        //draw duration
        var contentW = this.timeLineSizeW - this.p * 2;
        var contentH = this.timeLineSizeH - this.p * 2;
        if (this.isSelectedLeftPoint) {
            var exStart = Math.round((Number(this.stateEventData.startDelay) - (differX / contentW * this.maxTime)));
            if (exStart < 0) {
                this.stateEventData.startDelay = 0;
            }
            else {
                this.stateEventData.startDelay = exStart;
                this.stateEventData.duration = Math.round((Number(this.stateEventData.duration) + (differX / contentW * this.maxTime)));
            }
        }
        else if (this.isSelectedRightPoint) {
            this.stateEventData.duration = Math.round((Number(this.stateEventData.duration) - (differX / contentW * this.maxTime)));
        }
        else {
            var exStart = Math.round((Number(this.stateEventData.startDelay) - (differX / contentW * this.maxTime)));
            if (exStart < 0) {
                this.stateEventData.startDelay = 0;
            }
            else {
                this.stateEventData.startDelay = exStart;
            }
        }
        this.updateGraph();
        this.beforeX = currentX;
        this.beforeY = currentY;
    };
    EventStateChangeTimelineComponent.prototype.mouseUp = function (event) {
        if (!this.isDown) {
            return;
        }
        this.isSelectedLeftPoint = false;
        this.isSelectedRightPoint = false;
        this.isSelectedCenter = false;
        this.isDown = false;
        console.log("call onChangeTimeLine");
        this.onChangeTimeLine.emit('change');
    };
    return EventStateChangeTimelineComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])('stateEventData'),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "stateEventData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])('timeLineSizeW'),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "timeLineSizeW", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])('timeLineSizeH'),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "timeLineSizeH", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])('maxTime'),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "maxTime", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])('timeLinePadding'),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "timeLinePadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('myCanvas'),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "myCanvas", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "onChangeTimeLine", void 0);
EventStateChangeTimelineComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-event-state-change-timeline',
        template: __webpack_require__(259),
        styles: [__webpack_require__(224)]
    }),
    __metadata("design:paramtypes", [])
], EventStateChangeTimelineComponent);

//# sourceMappingURL=event-state-change-timeline.component.js.map

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lottie_animation_view_lottie_animation_view_component__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__globals__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewObjectComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PreviewObjectComponent = (function () {
    // lottieUrl = 'assets/sample/processing.json';
    function PreviewObjectComponent(appDataService, elementRef, resolver) {
        this.appDataService = appDataService;
        this.elementRef = elementRef;
        this.resolver = resolver;
        this.prefix = __WEBPACK_IMPORTED_MODULE_3__globals__["a" /* imgPrefix */];
        this.currentComponent = null;
        this.onShowResourceDialog = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    PreviewObjectComponent.prototype.ngOnInit = function () {
        this.state = this.appDataService.findStateByObjectId(this.objectData.id);
        this.applicationFolderPath = this.appDataService.getApplicationPath();
    };
    PreviewObjectComponent.prototype.getObjectStyle = function () {
        if (this.objectData.type === 'LottieView') {
            if (this.objectData.dataUrl) {
                // const url = this.prefix + this.applicationFolderPath + '/' + this.objectData.dataUrl;
                var url = this.objectData.dataUrl;
                if (this.lottieView) {
                    this.lottieView.setDataUrl(url);
                }
            }
        }
        this.state = this.appDataService.findStateByObjectId(this.objectData.id);
        if (this.state) {
            return this.appDataService.getObjectStyle(this.state);
        }
        else {
            return null;
        }
    };
    return PreviewObjectComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('videoView'),
    __metadata("design:type", Object)
], PreviewObjectComponent.prototype, "videoView", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('lottieView'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__lottie_animation_view_lottie_animation_view_component__["a" /* LottieAnimationViewComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__lottie_animation_view_lottie_animation_view_component__["a" /* LottieAnimationViewComponent */]) === "function" && _a || Object)
], PreviewObjectComponent.prototype, "lottieView", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], PreviewObjectComponent.prototype, "objectData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], PreviewObjectComponent.prototype, "onShowResourceDialog", void 0);
PreviewObjectComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-preview-object',
        template: __webpack_require__(265),
        entryComponents: [__WEBPACK_IMPORTED_MODULE_2__lottie_animation_view_lottie_animation_view_component__["a" /* LottieAnimationViewComponent */]],
        styles: [__webpack_require__(230)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* ComponentFactoryResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* ComponentFactoryResolver */]) === "function" && _d || Object])
], PreviewObjectComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=preview-object.component.js.map

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works! cool';
        this.test = 'this is test value';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(268),
        styles: [__webpack_require__(233)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__init_init_component__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__setting_setting_component__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__new_application_new_application_component__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__application_application_component__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__activity_activity_component__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__init_recent_project_recent_project_component__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__init_init_menu_init_menu_component__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__common_device_status_device_status_component__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__application_application_info_application_info_component__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__application_activity_list_activity_list_component__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__activity_object_tree_object_tree_component__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__activity_object_new_object_new_component__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__activity_object_property_object_property_component__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__activity_event_list_event_list_component__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__activity_preview_preview_component__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__activity_stage_list_stage_list_component__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__activity_preview_size_preview_size_component__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__activity_event_generator_event_generator_component__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_angular2_tree_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__activity_preview_preview_object_preview_object_component__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__service_application_data_service_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__service_broadcast_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__common_resource_resource_component__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__activity_event_detail_stage_change_event_detail_stage_change_component__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__activity_event_detail_start_activity_event_detail_start_activity_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__activity_event_detail_finish_activity_event_detail_finish_activity_component__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__activity_event_stage_change_cell_event_stage_change_cell_component__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__activity_event_state_change_cell_event_state_change_cell_component__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__activity_event_state_change_graph_event_state_change_graph_component__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__activity_event_state_change_timeline_event_state_change_timeline_component__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__activity_lottie_animation_view_lottie_animation_view_component__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__guide_guide_component__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__window_proxy_window_proxy_component__ = __webpack_require__(146);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







































var appRoutes = [
    { path: 'init/:workspaceFolder', component: __WEBPACK_IMPORTED_MODULE_6__init_init_component__["a" /* InitComponent */] },
    { path: 'init', component: __WEBPACK_IMPORTED_MODULE_6__init_init_component__["a" /* InitComponent */] },
    { path: 'guide', component: __WEBPACK_IMPORTED_MODULE_37__guide_guide_component__["a" /* GuideComponent */] },
    { path: 'setting', component: __WEBPACK_IMPORTED_MODULE_7__setting_setting_component__["a" /* SettingComponent */] },
    { path: 'new-application', component: __WEBPACK_IMPORTED_MODULE_8__new_application_new_application_component__["a" /* NewApplicationComponent */] },
    { path: 'application/:applicationFolderPath', component: __WEBPACK_IMPORTED_MODULE_9__application_application_component__["a" /* ApplicationComponent */] },
    { path: 'activity/:applicationFolderPath/:activityId', component: __WEBPACK_IMPORTED_MODULE_10__activity_activity_component__["a" /* ActivityComponent */] },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_6__init_init_component__["a" /* InitComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_6__init_init_component__["a" /* InitComponent */] }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__init_init_component__["a" /* InitComponent */],
            __WEBPACK_IMPORTED_MODULE_7__setting_setting_component__["a" /* SettingComponent */],
            __WEBPACK_IMPORTED_MODULE_8__new_application_new_application_component__["a" /* NewApplicationComponent */],
            __WEBPACK_IMPORTED_MODULE_9__application_application_component__["a" /* ApplicationComponent */],
            __WEBPACK_IMPORTED_MODULE_10__activity_activity_component__["a" /* ActivityComponent */],
            __WEBPACK_IMPORTED_MODULE_11__init_recent_project_recent_project_component__["a" /* RecentProjectComponent */],
            __WEBPACK_IMPORTED_MODULE_12__init_init_menu_init_menu_component__["a" /* InitMenuComponent */],
            __WEBPACK_IMPORTED_MODULE_13__common_device_status_device_status_component__["a" /* DeviceStatusComponent */],
            __WEBPACK_IMPORTED_MODULE_14__application_application_info_application_info_component__["a" /* ApplicationInfoComponent */],
            __WEBPACK_IMPORTED_MODULE_15__application_activity_list_activity_list_component__["a" /* ActivityListComponent */],
            __WEBPACK_IMPORTED_MODULE_16__activity_object_tree_object_tree_component__["a" /* ObjectTreeComponent */],
            __WEBPACK_IMPORTED_MODULE_17__activity_object_new_object_new_component__["a" /* ObjectNewComponent */],
            __WEBPACK_IMPORTED_MODULE_18__activity_object_property_object_property_component__["a" /* ObjectPropertyComponent */],
            __WEBPACK_IMPORTED_MODULE_19__activity_event_list_event_list_component__["a" /* EventListComponent */],
            __WEBPACK_IMPORTED_MODULE_20__activity_preview_preview_component__["a" /* PreviewComponent */],
            __WEBPACK_IMPORTED_MODULE_21__activity_stage_list_stage_list_component__["a" /* StageListComponent */],
            __WEBPACK_IMPORTED_MODULE_22__activity_preview_size_preview_size_component__["a" /* PreviewSizeComponent */],
            __WEBPACK_IMPORTED_MODULE_25__activity_preview_preview_object_preview_object_component__["a" /* PreviewObjectComponent */],
            __WEBPACK_IMPORTED_MODULE_28__common_resource_resource_component__["a" /* ResourceComponent */],
            __WEBPACK_IMPORTED_MODULE_23__activity_event_generator_event_generator_component__["a" /* EventGeneratorComponent */],
            __WEBPACK_IMPORTED_MODULE_29__activity_event_detail_stage_change_event_detail_stage_change_component__["a" /* EventDetailStageChangeComponent */],
            __WEBPACK_IMPORTED_MODULE_30__activity_event_detail_start_activity_event_detail_start_activity_component__["a" /* EventDetailStartActivityComponent */],
            __WEBPACK_IMPORTED_MODULE_31__activity_event_detail_finish_activity_event_detail_finish_activity_component__["a" /* EventDetailFinishActivityComponent */],
            __WEBPACK_IMPORTED_MODULE_32__activity_event_stage_change_cell_event_stage_change_cell_component__["a" /* EventStageChangeCellComponent */],
            __WEBPACK_IMPORTED_MODULE_33__activity_event_state_change_cell_event_state_change_cell_component__["a" /* EventStateChangeCellComponent */],
            __WEBPACK_IMPORTED_MODULE_34__activity_event_state_change_graph_event_state_change_graph_component__["a" /* EventStateChangeGraphComponent */],
            __WEBPACK_IMPORTED_MODULE_35__activity_event_state_change_timeline_event_state_change_timeline_component__["a" /* EventStateChangeTimelineComponent */],
            __WEBPACK_IMPORTED_MODULE_36__activity_lottie_animation_view_lottie_animation_view_component__["a" /* LottieAnimationViewComponent */],
            __WEBPACK_IMPORTED_MODULE_37__guide_guide_component__["a" /* GuideComponent */],
            __WEBPACK_IMPORTED_MODULE_38__window_proxy_window_proxy_component__["a" /* WindowProxyComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_24_angular2_tree_component__["a" /* TreeModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes)
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_26__service_application_data_service_service__["a" /* ApplicationDataServiceService */], __WEBPACK_IMPORTED_MODULE_27__service_broadcast_service__["a" /* BroadcastService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globals__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ActivityListComponent = (function () {
    function ActivityListComponent() {
        this.prefix = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* imgPrefix */];
        this.onChangeActivityData = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onClickActivity = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onClickNewActivity = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onClickDeleteActivity = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onClickDuplicatewActivity = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onClickLauncherActivity = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    ActivityListComponent.prototype.ngOnInit = function () {
    };
    ActivityListComponent.prototype.onChangeActivityListData = function () {
        this.onChangeActivityData.emit();
    };
    ActivityListComponent.prototype.clickActivity = function (activityId) {
        this.onClickActivity.emit(activityId);
    };
    ActivityListComponent.prototype.clickDeleteActivity = function (activityId) {
        this.onClickDeleteActivity.emit(activityId);
    };
    ActivityListComponent.prototype.clickDuplicateActivity = function (activityId) {
        this.onClickDuplicatewActivity.emit(activityId);
    };
    ActivityListComponent.prototype.clickNewActivity = function () {
        this.onClickNewActivity.emit();
    };
    ActivityListComponent.prototype.clickLauncherActivity = function (activityId) {
        this.onClickLauncherActivity.emit(activityId);
    };
    return ActivityListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], ActivityListComponent.prototype, "applicationData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", String)
], ActivityListComponent.prototype, "applicationFolderPath", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ActivityListComponent.prototype, "onChangeActivityData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ActivityListComponent.prototype, "onClickActivity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ActivityListComponent.prototype, "onClickNewActivity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ActivityListComponent.prototype, "onClickDeleteActivity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ActivityListComponent.prototype, "onClickDuplicatewActivity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ActivityListComponent.prototype, "onClickLauncherActivity", void 0);
ActivityListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-activity-list',
        template: __webpack_require__(269),
        styles: [__webpack_require__(234)]
    }),
    __metadata("design:paramtypes", [])
], ActivityListComponent);

//# sourceMappingURL=activity-list.component.js.map

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globals__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationInfoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ApplicationInfoComponent = (function () {
    function ApplicationInfoComponent() {
        this.prefix = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* imgPrefix */];
        this.onChangeData = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onClickChangeIcon = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.showImageDialog = false;
    }
    ApplicationInfoComponent.prototype.ngOnInit = function () {
    };
    ApplicationInfoComponent.prototype.onChange = function () {
        this.onChangeData.emit();
    };
    ApplicationInfoComponent.prototype.clickIcon = function () {
        this.onClickChangeIcon.emit();
    };
    ApplicationInfoComponent.prototype.clickToggleDialog = function () {
        console.log("clickToggleDialog");
        this.showImageDialog = !this.showImageDialog;
    };
    return ApplicationInfoComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], ApplicationInfoComponent.prototype, "applicationData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", String)
], ApplicationInfoComponent.prototype, "applicationFolderPath", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ApplicationInfoComponent.prototype, "onChangeData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ApplicationInfoComponent.prototype, "onClickChangeIcon", void 0);
ApplicationInfoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-application-info',
        template: __webpack_require__(270),
        styles: [__webpack_require__(235)]
    }),
    __metadata("design:paramtypes", [])
], ApplicationInfoComponent);

//# sourceMappingURL=application-info.component.js.map

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_resource_resource_component__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_application_data_service_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_uuid__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_broadcast_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// declare var electron: any;
var ApplicationComponent = (function () {
    function ApplicationComponent(route, router, location, appDataService, broadcaster) {
        this.route = route;
        this.router = router;
        this.location = location;
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
        this.sendStatus = false;
    }
    ApplicationComponent.prototype.onClickChangeIcon = function () {
        var newIconImagePath = this.appDataService.selectImageFile();
        if (newIconImagePath) {
            var iconFileName = 'image/ic_launcher_' + new Date().getTime() + '.png';
            var targetPath = this.applicationFolderPath + '/' + iconFileName;
            this.appDataService.deleteFile(this.applicationFolderPath + '/' + this.applicationData.iconPath);
            var result = this.appDataService.copyFile(newIconImagePath, targetPath);
            if (result) {
                this.applicationData.iconPath = iconFileName;
                this.appDataService.saveApplicationData(this.applicationData);
            }
        }
    };
    ApplicationComponent.prototype.onChangeData = function (value) {
        this.applicationData.updatedAt = new Date().getTime();
        this.appDataService.saveApplicationData(this.applicationData);
    };
    ApplicationComponent.prototype.onClickSendDevice = function (value) {
        this.sendStatus = true;
        var self = this;
        setTimeout(function () {
            self.applicationData.updatedAt = new Date().getTime();
            self.appDataService.saveApplicationData(self.applicationData);
            self.appDataService.sendFileToDevice();
            self.sendStatus = false;
        }, 100);
    };
    ;
    ApplicationComponent.prototype.ngAfterViewInit = function () {
    };
    ApplicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('application compononent ng on init');
        this.applicationFolderPath = this.route.snapshot.params['applicationFolderPath'];
        console.log('this.applicationFolderPath =' + this.applicationFolderPath);
        this.appDataService.initApplicationPath(this.applicationFolderPath);
        this.appDataService.loadApplicationData().then(function (result) {
            _this.applicationData = _this.appDataService.getApplicationData();
            console.log('applicationData-' + JSON.stringify(_this.applicationData));
            _this.checkInitProcess();
        }).catch(function (err) {
            console.log('err-' + JSON.stringify(err));
            _this.noProject();
        });
        this.registerStringBroadcast();
    };
    ApplicationComponent.prototype.registerStringBroadcast = function () {
        var _this = this;
        this.broadcaster.on('application')
            .subscribe(function (message) {
            var kind = message.kind;
            console.log("application message received!! = " + kind);
            if (kind === 'send-device') {
                _this.onClickSendDevice(null);
            }
        });
    };
    ApplicationComponent.prototype.checkInitProcess = function () {
        if (!this.applicationData) {
            this.noProject();
        }
        else {
            this.appDataService.addRecentProjectList(this.applicationData.applicationName);
        }
    };
    ApplicationComponent.prototype.noProject = function () {
        alert('No app data');
        this.appDataService.removeRecentProjectList();
        this.router.navigate(['/init']);
    };
    ApplicationComponent.prototype.clickNewActivity = function () {
        var now = new Date().getTime();
        var activityId = 'activity_' + __WEBPACK_IMPORTED_MODULE_5_angular2_uuid__["UUID"].UUID();
        var newActivityMetaData = {
            activityId: activityId,
            activityName: 'UntitledActivityName',
            createdAt: now,
            updatedAt: now
        };
        var newActivityData = {
            activityId: activityId
        };
        if (this.applicationData.activityList.length === 0) {
            this.applicationData.launcherActivityId = activityId;
        }
        this.applicationData.activityList.push(newActivityMetaData);
        this.appDataService.saveApplicationData(this.applicationData);
        this.appDataService.saveActivityData(activityId, newActivityData);
        this.router.navigate(['/activity', this.applicationFolderPath, activityId]);
    };
    ApplicationComponent.prototype.clickActivity = function (activityId) {
        this.router.navigate(['/activity', this.applicationFolderPath, activityId]);
    };
    ApplicationComponent.prototype.clickDeleteActivity = function (activityId) {
        var result = confirm('will you delete? =' + activityId);
        if (result) {
            var index = this.findActivityPosition(activityId);
            this.applicationData.activityList.splice(index, 1);
            this.appDataService.deleteActivity(activityId);
            this.clickSave();
        }
    };
    ApplicationComponent.prototype.findActivityPosition = function (activityId) {
        for (var i = 0; i < this.applicationData.activityList.length; i++) {
            if (this.applicationData.activityList[i].activityId === activityId) {
                return i;
            }
        }
    };
    ApplicationComponent.prototype.clickDuplicateActivity = function (activityId) {
        var index = this.findActivityPosition(activityId);
        var now = new Date().getTime();
        var newActivityId = 'activity_' + __WEBPACK_IMPORTED_MODULE_5_angular2_uuid__["UUID"].UUID();
        var newObject = JSON.parse(JSON.stringify(this.applicationData.activityList[index]));
        newObject.activityId = newActivityId;
        newObject.activityName = 'Copy_' + newObject.activityName;
        newObject.createdAt = now;
        newObject.updatedAt = now;
        this.applicationData.activityList.splice(index + 1, 0, newObject);
        this.appDataService.saveApplicationData(this.applicationData);
        this.appDataService.saveActivityData(newActivityId, newObject);
        this.clickActivity(newActivityId);
    };
    ApplicationComponent.prototype.onClickLauncherActivity = function (activityId) {
        this.applicationData.launcherActivityId = activityId;
        this.appDataService.saveApplicationData(this.applicationData);
    };
    ApplicationComponent.prototype.clickSave = function () {
        this.appDataService.saveApplicationData(this.applicationData);
    };
    ApplicationComponent.prototype.clickBack = function () {
        // this.appDataService.closeMainWindowUrl();
        this.router.navigate(['/init']);
    };
    ApplicationComponent.prototype.clickResource = function () {
        console.log('clickResource');
        this.resourceDialog.showDialog('image');
    };
    ApplicationComponent.prototype.onSelectFile = function (target) {
    };
    return ApplicationComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('resourceAppDialog'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__common_resource_resource_component__["a" /* ResourceComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_resource_resource_component__["a" /* ResourceComponent */]) === "function" && _a || Object)
], ApplicationComponent.prototype, "resourceDialog", void 0);
ApplicationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-application',
        template: __webpack_require__(271),
        styles: [__webpack_require__(236)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["e" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["e" /* Location */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _f || Object])
], ApplicationComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=application.component.js.map

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceStatusComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DeviceStatusComponent = (function () {
    function DeviceStatusComponent(zone, appDataService, broadcaster) {
        this.zone = zone;
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
        this.deviceList = [];
        this.onClickSendDevice = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    DeviceStatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        electron.ipcRenderer.sendSync('regist-device-connect-status');
        electron.ipcRenderer.on('device-status', function (event, arg) {
            _this.zone.run(function () {
                _this.refreshDeviceStatus();
            });
        });
        this.refreshDeviceStatus();
    };
    DeviceStatusComponent.prototype.ngOnDestroy = function () {
        electron.ipcRenderer.sendSync('unregist-device-connect-status');
    };
    DeviceStatusComponent.prototype.refreshDeviceStatus = function () {
        this.appDataService.refreshDeviceList();
        this.deviceList = this.appDataService.getDeviceList();
    };
    DeviceStatusComponent.prototype.clickSaveFile = function () {
        var message = {
            kind: 'save'
        };
        this.broadcaster.broadcast('activity', message);
        this.broadcaster.broadcast('application', message);
    };
    DeviceStatusComponent.prototype.clickSendFile = function () {
        var message = {
            kind: 'send-device'
        };
        this.broadcaster.broadcast('activity', message);
        this.broadcaster.broadcast('application', message);
    };
    DeviceStatusComponent.prototype.clickExportCode = function () {
        var message = {
            kind: 'export-code'
        };
        this.broadcaster.broadcast('activity', message);
        this.broadcaster.broadcast('application', message);
    };
    DeviceStatusComponent.prototype.clickExportGuide = function () {
        var message = {
            kind: 'export-guide'
        };
        this.broadcaster.broadcast('activity', message);
        this.broadcaster.broadcast('application', message);
        // this.onClickSendDevice.emit('send');
    };
    DeviceStatusComponent.prototype.clickHowToConnect = function (url) {
        this.appDataService.openUrl(url);
    };
    return DeviceStatusComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], DeviceStatusComponent.prototype, "onClickSendDevice", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], DeviceStatusComponent.prototype, "sendStatus", void 0);
DeviceStatusComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-device-status',
        template: __webpack_require__(272),
        styles: [__webpack_require__(237)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* NgZone */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _c || Object])
], DeviceStatusComponent);

var _a, _b, _c;
//# sourceMappingURL=device-status.component.js.map

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuideComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GuideComponent = (function () {
    function GuideComponent() {
    }
    GuideComponent.prototype.ngOnInit = function () {
    };
    return GuideComponent;
}());
GuideComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-guide',
        template: __webpack_require__(274),
        styles: [__webpack_require__(239)]
    }),
    __metadata("design:paramtypes", [])
], GuideComponent);

//# sourceMappingURL=guide.component.js.map

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_broadcast_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_message_event_service__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitMenuComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InitMenuComponent = (function () {
    function InitMenuComponent(route, router, appDataService, broadcaster, messageEvent) {
        this.route = route;
        this.router = router;
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
        this.messageEvent = messageEvent;
    }
    InitMenuComponent.prototype.ngOnInit = function () {
        // this.registerStringBroadcast();
    };
    // registerStringBroadcast() {
    //   this.broadcaster.on<string>('message')
    //     .subscribe(message => {
    //       console.log("message received!! = " + message);
    //     });
    // }
    InitMenuComponent.prototype.clickNewApplication = function () {
        console.log("clickNewApplication");
        this.router.navigate(['/new-application']);
        // const test = {
        //   kind:'test',
        //   detail:'detail'
        // }
        // this.broadcaster.broadcast('message', test);
    };
    InitMenuComponent.prototype.clickOpenApplication = function () {
        console.log("clickOpenApplication");
        var folder = this.appDataService.selectWorkspaceFolderPath();
        if (folder) {
            var applicationData = this.appDataService.readFileData(folder + "/app.json"); // JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', folder + "/app.json")));
            if (applicationData) {
                this.router.navigate(['/application', folder]);
                // const path = '/application/' + encodeURIComponent(folder);
                // this.appDataService.openMainWindowUrl(path);
            }
            else {
                alert("no data");
            }
        }
    };
    InitMenuComponent.prototype.clickHelp = function () {
    };
    InitMenuComponent.prototype.clickSettingApplication = function () {
        console.log("clickSettingApplication");
    };
    return InitMenuComponent;
}());
InitMenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-init-menu',
        template: __webpack_require__(275),
        styles: [__webpack_require__(240)],
        providers: [__WEBPACK_IMPORTED_MODULE_4__service_message_event_service__["a" /* MessageEventService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__service_message_event_service__["a" /* MessageEventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_message_event_service__["a" /* MessageEventService */]) === "function" && _e || Object])
], InitMenuComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=init-menu.component.js.map

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_application_data_service_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_broadcast_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_message_event_service__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var InitComponent = (function () {
    function InitComponent(route, router, appDataService, broadcaster, messageEvent) {
        this.route = route;
        this.router = router;
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
        this.messageEvent = messageEvent;
    }
    InitComponent.prototype.ngOnInit = function () {
        // this.appDataService.changeWindowSize(800, 502, true);
        this.registerStringBroadcast();
    };
    InitComponent.prototype.registerStringBroadcast = function () {
        this.broadcaster.on('init')
            .subscribe(function (message) {
            var kind = message.kind;
            console.log("message received!! = " + kind);
            // if (kind === 'go-application') {
            //     const path = '/application/' + encodeURIComponent(message.folderPath);
            //     this.appDataService.openMainWindowUrl(path);
            // }
        });
    };
    InitComponent.prototype.clickDownloadApp = function (url) {
        this.appDataService.openUrl(url);
    };
    return InitComponent;
}());
InitComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-init',
        template: __webpack_require__(276),
        styles: [__webpack_require__(241)],
        providers: [__WEBPACK_IMPORTED_MODULE_4__service_broadcast_service__["a" /* BroadcastService */], __WEBPACK_IMPORTED_MODULE_5__service_message_event_service__["a" /* MessageEventService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__service_message_event_service__["a" /* MessageEventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_message_event_service__["a" /* MessageEventService */]) === "function" && _e || Object])
], InitComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=init.component.js.map

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecentProjectComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RecentProjectComponent = (function () {
    function RecentProjectComponent(router, appDataService) {
        this.router = router;
        this.appDataService = appDataService;
    }
    RecentProjectComponent.prototype.ngOnInit = function () {
        this.recentProjects = this.appDataService.getRecentProjectList();
    };
    RecentProjectComponent.prototype.clickApplication = function (folderPath) {
        this.router.navigate(['/application', folderPath]);
        // const path = '/application/' + encodeURIComponent(folderPath);
        // this.appDataService.openMainWindowUrl(path);
    };
    return RecentProjectComponent;
}());
RecentProjectComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-recent-project',
        template: __webpack_require__(277),
        styles: [__webpack_require__(242)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _b || Object])
], RecentProjectComponent);

var _a, _b;
//# sourceMappingURL=recent-project.component.js.map

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewApplicationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NewApplicationComponent = (function () {
    function NewApplicationComponent(route, router, appDataService) {
        this.route = route;
        this.router = router;
        this.appDataService = appDataService;
    }
    NewApplicationComponent.prototype.ngOnInit = function () {
        this.applicationName = 'UntitledApplication';
        this.workspaceFolderPath = electron.ipcRenderer.sendSync('get-workspace-folder-path');
    };
    //change project folder
    NewApplicationComponent.prototype.clickChangeFolder = function () {
        var folder = electron.ipcRenderer.sendSync('select-workspace-folder-path', this.workspaceFolderPath);
        if (folder) {
            this.workspaceFolderPath = folder;
        }
    };
    NewApplicationComponent.prototype.clickBack = function () {
        this.router.navigate(['/init']);
    };
    //make project folder and go application page
    NewApplicationComponent.prototype.clickNext = function () {
        if (!this.applicationName) {
            alert('enter application name');
            return;
        }
        var applicationFolder = this.workspaceFolderPath + '/' + this.applicationName;
        electron.ipcRenderer.sendSync('make-folder', applicationFolder);
        electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/activity');
        electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/image');
        electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/file');
        electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/export');
        electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/preview');
        electron.ipcRenderer.sendSync('copy-from-root-file', 'template/source_template/ic_launcher.png', applicationFolder + '/image/ic_launcher.png');
        var now = new Date().getTime();
        var data = {
            createdAt: now,
            updatedAt: now,
            applicationName: this.applicationName,
            applicationId: 'com.altamirasoft.' + this.applicationName,
            iconPath: 'image/ic_launcher.png',
            activityList: [],
            imageList: [],
            fileList: []
        };
        var filePath = applicationFolder + '/app.json';
        electron.ipcRenderer.sendSync('save-file-data', filePath, data);
        this.router.navigate(['/application', applicationFolder]);
        // //new window
        // const path = '/application/' + encodeURIComponent(applicationFolder);
        // this.appDataService.openMainWindowUrl(path);
    };
    return NewApplicationComponent;
}());
NewApplicationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-new-application',
        template: __webpack_require__(278),
        styles: [__webpack_require__(243)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _c || Object])
], NewApplicationComponent);

var _a, _b, _c;
//# sourceMappingURL=new-application.component.js.map

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettingComponent = (function () {
    function SettingComponent() {
    }
    SettingComponent.prototype.ngOnInit = function () {
    };
    return SettingComponent;
}());
SettingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-setting',
        template: __webpack_require__(279),
        styles: [__webpack_require__(244)]
    }),
    __metadata("design:paramtypes", [])
], SettingComponent);

//# sourceMappingURL=setting.component.js.map

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowProxyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WindowProxyComponent = (function () {
    function WindowProxyComponent() {
    }
    WindowProxyComponent.prototype.ngOnInit = function () {
    };
    return WindowProxyComponent;
}());
WindowProxyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-window-proxy',
        template: __webpack_require__(280),
        styles: [__webpack_require__(245)]
    }),
    __metadata("design:paramtypes", [])
], WindowProxyComponent);

//# sourceMappingURL=window-proxy.component.js.map

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".activity-wrap {\n    background: #ff0000;\n    width:100%;\n    height:100%;\n    position: absolute;\n}\n\n.activity-root {\n    position: absolute;\n    background: #dde3eb;\n    width:100%;\n    height: 100%;\n    top:0;\n    left: 0;\n    right: 0;\n    bottom:0;\n    z-index: 998;\n    padding-top: 50px;\n}\n\n.activity-left {\n    float: left;\n    width:288px;\n    height:100%;\n    background: #ebebeb;\n    overflow-y: scroll;\n}\n\n.activity-canvas {\n    float: left;\n    overflow-x: scroll;\n    overflow-y: scroll;\n}\n\n.activity-right {\n    float: right;\n    width:320px;\n    height:100%;\n     background: #f4f4f4;\n    overflow-y: scroll;\n}\n\n.activity-nav {\n    z-index: 999;\n    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);\n    background-color: #fff;\n    position: relative;\n}\n\n.activity-nav .navbar-right {\n    float: right;\n   }\n\n.nav-page input {\n    width: 100%;\n    text-align: left;\n    height: 49px;\n    padding-left: 20px;\n    background-color: transparent;\n    font-weight: 600;\n    font-size: 16px;\n    border: none;\n    padding-right: 10px;\n    color: #454545;\n}\n.nav-page input:focus {\n    background: #f9f9f9;\n}\n\n.nav-page {\n    min-width: 300px;\n}\n\n.nav-project button {\n    height: 49px;\n    background-color: transparent;\n    border: none;\n    font-weight: 600;\n    font-size: 16px;\n    width: 288px;\n    border-right: 1px solid #ececec;\n}\n\n.nav-project button:hover {\n    cursor: pointer;\n    color:#46abca;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "/* The switch - the box around the slider */\n\n.switch {\n    position: relative;\n    display: inline-block;\n    width: 40px;\n    height: 24px;\n}\n\n\n/* Hide default HTML checkbox */\n\n.switch input {\n    display: none;\n}\n\n\n/* The slider */\n\n.slider {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: #ccc;\n    transition: .4s;\n}\n\n.slider:before {\n    position: absolute;\n    content: \"\";\n    height: 16px;\n    width: 16px;\n    left: 4px;\n    bottom: 4px;\n    background-color: white;\n    transition: .4s;\n}\n\ninput:checked+.slider {\n    background-color: #2196F3;\n}\n\ninput:focus+.slider {\n    box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked+.slider:before {\n    -webkit-transform: translateX(26px);\n    transform: translateX(26px);\n}\n\n\n/* Rounded sliders */\n\n.slider.round {\n    border-radius: 34px;\n}\n\n.slider.round:before {\n    border-radius: 50%;\n}\n\n.object-list-wrap {\n   \n    border-bottom: 1px solid #ececec;\n}\n\n.object-list-wrap P {\n    font-size: 12px;\n}\n\n.object-list {\n    overflow: hidden;\n    font-size: 12px;\n}\n\n.object-list-main {\n    float: left;\n}\n\n.object-name {\n    font-size: 12px;\n    width: 75px;\n    overflow: scroll;\n}\n\n.object-preview {\n    background: #fff;\n    border: 1px solid #ececec;\n    margin-left: 5px;\n}\n\n.object-preview:hover {\n    cursor: pointer;\n}\n\n.object-dropdown {\n    margin-top: 15px;\n    padding: 10px;\n    padding-top: 20px;\n    padding-bottom: 10px;\n    border-radius: 3px;\n    background: #fff;\n    position: relative;\n}\n\n.tri {\n    width: 0px;\n    height: 0px;\n    border-top: 10px solid none;\n    border-bottom: 10px solid white;\n    border-right: 15px solid transparent;\n    border-left: 15px solid transparent;\n    position: absolute;\n    top: 0;\n    margin-top: -10px;\n    left: 0;\n    margin-left: 66px;\n}\n\n.object-switch {\n    display: none;\n}\n\n.event-time {\n    overflow: hidden;\n}\n\n.event-time div {\n    width: 50%;\n    float: left;\n}\n\n.event-time input {\n    width: 73px;\n    margin-left: 10px;\n}\n\n.interpolator-select {\n    width: 100%;\n    margin-top: 15px;\n    margin-bottom: 20px;\n}\n\n\n/* 토글버튼 */\n\n\n/*.toggle_button {\n    cursor:pointer;\n    display:block;\n    background:#eee;\n    text-align:center;\n    border:1px solid #ccc;\n}\n#toggle_button,\n#toggle_contents {\n    height:0;\n    overflow:hidden;\n    position:absolute;\n}\n#toggle_button:checked + #toggle_contents {\n    height:auto;\n    position:relative;\n    border:1px solid #ccc;\n    border-top:0;\n    padding:10px;\n}*/\n\n\n/* 토글버튼 @ */\n\n#nav,\n#toggle {\n    display: none;\n}\n\n#toggle:checked+#nav {\n    display: inline-block;\n}\n\n.event-stageChange {\n    overflow: hidden;\n    position: relative;\n    height: 100%;\n    padding-bottom: 108px;\n}\n\n.event-detail {\n    overflow: hidden;\n    background: #f9fafb;\n    padding: 15px;\n}\n\n.event-detail img {\n    width: 28px;\n    float: left;\n}\n\n.event-detail h4 {\n    float: left;\n    margin: 0;\n    font-size: 13px;\n    color: #454545;\n    margin-top: 4px;\n    padding-left: 10px;\n}\n\n.event-detail-footer {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    width: 320px;\n    background: #ebebeb;\n    padding: 15px;\n}\n\n.event-detail-footer .btn-afterAni {\n    width: 100%;\n    border-radius: 50px;\n    border: 2px solid #46a2ba;\n    background: transparent;\n    margin-bottom: 10px;\n    color: #46abca;\n    padding: 8px;\n}\n\n.event-detail-footer button {\n    background: #46a2ba;\n    color: #fff;\n    width: 142px;\n    padding: 8px;\n    border-radius: 50px;\n    border: none;\n}\n\n.event-detail-footer button:hover {\n    cursor: pointer;\n    background: #3a97af;\n}\n\n.event-detail-footer .btn-afterAni:hover {\n    background: rgba(255, 255, 255, 0.5);\n}\n\n\n/* 인터폴레이터 막대그래프 */\n\n.graph {\n    height: 6px;\n    width: 180px;\n    margin-bottom: 0.5em;\n    margin-left: 10px;\n    overflow: hidden;\n    background-color: #fff;\n    border-radius: 0.0725em;\n    text-align: center;\n    margin-top: 5px;\n}\n\n.graph-bar {\n    float: left;\n    width: 0;\n    height: 100%;\n    color: #ffffff;\n    background-color: #46abca;\n    box-sizing: border-box;\n}\n\n\n/* 인터폴레이터 막대그래프 @*/\n\n\n/* 인터폴레이터 커브 그래프 */\n\n.curve-graph {\n    position: relative;\n    height: 300px;\n    text-align: center;\n}\n\n.coordinate-plane {\n    position: absolute;\n    margin-left: 6px;\n    left: 0;\n    line-height: 0;\n}\n\n.control-point {\n    position: absolute;\n    z-index: 1;\n    height: 16px;\n    width: 16px;\n    border: 1px solid rgba(0, 0, 0, .3);\n    margin: -8px 0 0 -8px;\n    outline: none;\n    box-sizing: border-box;\n    border-radius: 20px;\n}\n\n#P0,\n#P3 {\n    background: white;\n}\n\n#P0 {\n    left: 0;\n    top: 100%;\n}\n\n#P1 {\n    background: #f08;\n}\n\n#P2 {\n    background: #0ab;\n}\n\n#P3 {\n    left: 100%;\n    top: 0;\n}\n\n#P1,\n#P2 {\n    cursor: pointer;\n}\n\ncanvas#curve {\n    background: #f0f0f0;\n    background: linear-gradient(-45deg, transparent 50%, rgba(0, 0, 0, .1) 49%, rgba(0, 0, 0, .1) 51%, transparent 51%) center no-repeat, repeating-linear-gradient(white, white 20px, transparent 20px, transparent 40px) no-repeat, linear-gradient(rgba(0, 0, 0, .06) 25%, rgba(0, 0, 0, .06) 75%);\n    background-size: 100% 100%, 100% 100%, auto;\n    background-position: 25%, 0, 0;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n        user-select: none;\n}\n\n.coordinate-plane:before {\n    content: 'Progression';\n    border-bottom: 1px solid;\n    -moz-transform: rotate(-90deg);\n    -moz-transform-origin: bottom left;\n    -ms-transform: rotate(-90deg);\n    -ms-transform-origin: bottom left;\n    -o-transform: rotate(-90deg);\n    -o-transform-origin: bottom left;\n    -webkit-transform: rotate(-90deg);\n    -webkit-transform-origin: bottom left;\n    transform: rotate(-90deg);\n    transform-origin: bottom left;\n}\n\n.coordinate-plane:after {\n    content: 'Time';\n    border-top: 1px solid;\n    margin-bottom: -1.5em;\n}\n\n.coordinate-plane:before,\n.coordinate-plane:after {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    padding: .3em .5em;\n    box-sizing: border-box;\n    color: rgba(0, 0, 0, .6);\n    text-transform: uppercase;\n    font-size: 75%;\n    line-height: 1;\n}\n\n\n/* 인터폴레이터 커브그래프 @*/\n\n.curve-input input {\n    width: 131px;\n    margin-bottom: 6px;\n}\n\n.curve-input .input-left {\n    margin-right: 4px;\n}\n\n.curve-input .input-right {\n    margin-left: 4px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.event-detail {\n    overflow: hidden;\n    background: #f9fafb;\n    padding: 15px;\n}\n\n.event-detail img {\n    width: 28px;\n    float: left;\n}\n\n.event-detail h4 {\n    float: left;\n    margin: 0;\n    font-size: 13px;\n    color: #454545;\n    margin-top: 4px;\n    padding-left: 10px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "/* popup test */\n\n.box {\n    width: 40%;\n    margin: 0 auto;\n    background: rgba(255, 255, 255, 0.2);\n    padding: 35px;\n    border: 2px solid #fff;\n    border-radius: 20px/50px;\n    background-clip: padding-box;\n    text-align: center;\n}\n\n.button {\n    font-size: 1em;\n    margin-top: 50px;\n    color: #fff;\n    border: 2px solid #46a2ba;\n    color: #46a2ba;\n    text-decoration: none;\n    cursor: pointer;\n    transition: all 0.3s ease-out;\n}\n\n.button:hover {\n    background: #46a2ba;\n    color: #fff;\n}\n\n.overlay {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0, 0, 0, 0.7);\n    transition: opacity 500ms;\n    opacity: 1;\n    z-index: 9999;\n}\n\n.overlay:target {\n    visibility: visible;\n    opacity: 1;\n}\n\n.popup {\n    margin: 70px auto;\n \n    background: #fff;\n    border-radius: 5px;\n    width: 800px;\n    height: 500px;\n    position: relative;\n    transition: all 5s ease-in-out;\n    overflow-x: hidden;\n    overflow-y: auto;\n}\n\n.popup .active {\n    color: #46a2ba;\n}\n\n.popup h2 {\n    margin-top: 0;\n    color: #333;\n    font-family: Tahoma, Arial, sans-serif;\n    font-size: 21px;\n}\n\n.popup .close {\n    position: absolute;\n    top: 10px;\n    right: 20px;\n    transition: all 200ms;\n    font-size: 30px;\n    font-weight: bold;\n    text-decoration: none;\n    color: #333;\n    z-index: 9999;\n}\n\n.popup .close:hover {\n    color: #06D85F;\n}\n\n.popup .content {\n    max-height: 30%;\n    overflow: auto;\n}\n\n.popup-list .col-sm-3 {\n    width: 20%;\n    padding: 10px;\n}\n\n.popup-new {\n    border: 2px solid #ececec;\n    border-radius: 4px;\n    height: 460px;\n    text-align: center;\n    padding-top: 100px;\n    color: #898989;\n}\n\n.popup-new:hover {\n    color: #46a2ba;\n}\n\n.popup-new img {\n    margin-left: auto;\n    margin-right: auto;\n    opacity: 0.3;\n}\n\n.popup-category {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    position: relative;\n}\n\n.popup-category label {\n    font-size: 12px;\n    padding-right: 30px;\n}\n\n.popup-category input {\n    position: absolute;\n    right: 0;\n    top: 0;\n}\n\n.popup-nav label {\n    padding-right: 20px;\n}\n\n\n/*popup test finish */\n\n\n.col-4 {\n    width:33.3333%;\n    float:left;\n    height: 100%;\n}\n\n.generator-wrap {\n    overflow: hidden;\n    height: 100%;\n    padding-top: 50px;\n    padding-bottom: 50px;\n  \n}\n\n.popup .generator-footer {\n    position: absolute;\n    bottom:0;\n    left:0;\n    right:0;\n    height: 50px;\n    border-top: 1px solid #ececec;\n    background: #fff;\n    padding:12px;\n    text-align: right;\nbox-shadow: 0px -1px 6px 0px rgba(0,0,0,0.2);\n}\n\n.popup .generator-footer button {\n    background: transparent;\n    border: none;\n    font-size: 15px;\n    font-weight: 600;\n    color:#454545;\n}\n\n.popup .generator-footer button:hover {\n\n cursor: pointer;\n \n    color:#46a2ba;\n}\n\n.popup .generator-nav {\n    position: absolute;\n   top:0;\n    left:0;\n    right:0;\n    height: 50px;\n    border-bottom: 1px solid #ececec;\n    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);\n    padding:12px;\n    font-weight: bold;\n      font-family: Tahoma, Arial, sans-serif;\n\n}\n\n.trigger-select {\n    border-right:1px solid #ececec;\n    height: 100%;\n    background: #fff;\n    overflow-y: auto;\n}\n\n.event-select {\n    border-right: 1px solid #ececec;\n    height: 100%;\n       background: #fff;\n           overflow-y: auto;\n}\n\n.trigger-select img{\n    width:40px;\n\n}\n\n.trigger-select p {\n    margin:2px;\n}\n\n.event-select img{\n    width:40px;\n\n}\n\n.event-select p {\n    margin:2px;\n}\n\n.generator-title {\n    font-size: 14px;\n    padding:6px;\n    text-align: center;\n    border-bottom: 1px solid #ececec;\n        font-family: Tahoma, Arial, sans-serif;\nfont-weight: bold;\ncolor:#454545;\n   background: #fff;\n}\n\n.trigger-intro {\n   height: 100%;\n    background: #dde3eb;\n    padding:15px;\n    padding-left: 36%;\n}\n\n.trigger-intro p {\n    font-size: 13px;\n    color:#454545;\n}\n\n.event-intro {\n      height: 100%;\n    background: #dde3eb;\n    padding: 20px;\n    overflow-y: auto;\n    float: right;\n    width: 33.3333%;\n}\n\n.event-intro h4 {\n    font-size: 14px;\n}\n\n.event-intro p {\n    font-size: 13px;\n    color:#454545;\n}\n\n\n\n.btn-trigger {\n    height:80px;\n    border-bottom: 1px solid #ececec;\n    text-align: center;\n    font-size: 13px;\n    color:#454545;\n    padding: 10px;\n}\n\n.btn-trigger:hover {\n    cursor:pointer;\n    background: #46a2ba;\n    color:#fff;\n}\n\n\n.btn-trigger:hover p{\n  margin-top: -20px;\n}\n\n\n.event-detail {\n    font-size: 13px;\n    color:#454545;\n    \n}\n\n.detail-content {\n    padding:15px;\n    text-align: center;\n}\n\n.detail-content p {\n    font-size: 12px;\n    margin:0;\n}\n\n.detail-content select {\n    width:100%;\n    margin-top: 10px;\n        height: 30px;\n    border: #ccc 1px solid;\n}\n\n.detail-content select:hover {\n    cursor: pointer;\n}\n\n.event-kind {\n    text-align: center;\n    background: #f9fafb;\n    padding:3px;\n    font-size: 12px;\n    border-bottom: 1px solid #ececec;\n    font-family: Tahoma, Arial, sans-serif;\nfont-weight: bold;\n}\n\n.after-animation {\n    margin-top: 130px;\n}\n\n.after-animation h3 {\n    color:#898989;\n    font-weight: bolder;\n    font-size: 16px;\n}\n\n.after-animation p {\n    color:#454545;\n    font-size: 14px;\n    font-size: 13px;\n}\n\n.trigger-hover {\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    margin-top: 70px;\n    margin-left: 285px;\n    text-align: left;\n    width: 800px;\n    height: 400px;\n    background: #dde3eb;\n    display: none;\n}\n\n.trigger-hover p {\n    margin-top: 15px!important;\n    color:#454545;\n}\n\n.btn-click:hover .click-info {\n    display: block;\n}\n\n.btn-oncreate:hover .oncreate-info {\n    display: block;\n}\n\n.btn-backkey:hover .backkey-info {\n    display: block;\n}\n\n\n.event-hover {\n    position: absolute;\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    margin-top: 70px;\n    margin-left: 550px;\n    text-align: left;\n    padding: 1px;\n    width: 240px;\n    height: 400px;\n    background: #dde3eb;\n   display: none;\n}\n\n.event-hover p {\n    margin-top: 15px!important;\n    color:#454545;\n}\n\n.btn-stagechange:hover .stage-info {\n    display: block;\n}\n\n.btn-startactivity:hover .startactivity-info {\n    display: block;\n}\n\n.btn-finishactivity:hover .finishactivity-info {\n    display: block;\n}\n\n.btn-startlottie:hover .startlottie-info {\n    display: block;\n}\n\n.btn-stoplottie:hover .stoplottie-info {\n    display: block;\n}\n\n.btn-takepicture:hover .takepicture-info {\n    display: block;\n}\n\n.btn-startvideo:hover .startvideo-info {\n    display: block;\n}\n\n.btn-stopvideo:hover .stopvideo-info {\n    display: block;\n}\n\n\n.trigger-sub h4 {\n    margin-bottom: 5px;\n}\n.trigger-sub p {\n    margin-top: 7px;\n\n}\n\n.event-intro h4 {\n    margin-bottom: 5px;\n}\n.event-intro p {\n    margin-top: 7px;\n\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".label-properties {\n    font-size: 14px;\n    font-weight: 600;\n    padding: 6px 10px;\n    background-color: #fff;\n    color: #454545;\n    position: relative;\n    overflow: hidden;\n}\n\n.col-8 {\n    width:66%;\n    float: left;\n\n}\n\n.col-4 {\n    width:33%;\n    float: right;\n}\n\n.label-properties img {\n    width: 18px;\n    cursor: pointer;\n    opacity: 0.7;\n}\n\n.label-properties img:hover {\n    cursor: pointer;\n    opacity:1;\n}\n\n.noti-addmotions {\n    text-align: center;\n    padding: 20px;\n    margin-top: 30px;\n}\n\n.noti-addmotions img {\n    width: 80px;\n    opacity: 0.7;\n}\n\n.noti-addmotions a {\n  color: #46a2ba;\n}\n\n.noti-addmotions a:hover {\n    color:#2d88a0;\n    cursor: pointer;\n}\n\n.noti-addmotions p {\ncolor:#898989;\nfont-size: 14px;\nmargin-top: 5px;\n}\n\n.noti-addmotions h3 {\nmargin-bottom: 0;\n}\n\n\n.go-event-detail {\n    background: #f9fafb;\n    border-bottom: 1px solid #ececec;\n  \n    font-size: 13px;\n    color:#454545;\n    position: relative;\n\n}\n\n.go-event-detail:hover {\n    cursor: pointer;\n}\n\n.go-event-detail .btn-trash {\n    background: transparent;\n    border:none;\n    position: absolute;\n    right:0;\n    top:0;\npadding:12px 15px;\n    margin-top: 5px;\n}\n\n.go-event-detail .btn-trash i {\n    font-size: 16px;\n    opacity: 0.3;\n}\n\n.go-event-detail .btn-trash:hover i {\n    opacity: 0.5;\n    cursor: pointer;\n}\n\n/* event-detail */\n\n.event-detail{\n    overflow: hidden;\n      background: #f9fafb;\n  \n}\n\n.event-detail img {\nwidth:28px;\nfloat:left;\n}\n\n.event-detail h4 {\n    float: left;\n    margin:0;\n    font-size: 13px;\n    color:#454545;\n    margin-top: 4px;\n    padding-left: 10px;\n}\n\n.event-detail-wrap {\n    position: relative;\n      padding:12px 15px;\n      border-bottom: 1px solid #ececec;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "/* The switch - the box around the slider */\n\n.switch {\n    position: relative;\n    display: inline-block;\n    width: 60px;\n    height: 34px;\n}\n\n\n/* Hide default HTML checkbox */\n\n.switch input {\n    display: none;\n}\n\n\n/* The slider */\n\n.slider {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: #ccc;\n    transition: .4s;\n}\n\n.slider:before {\n    position: absolute;\n    content: \"\";\n    height: 26px;\n    width: 26px;\n    left: 4px;\n    bottom: 4px;\n    background-color: white;\n    transition: .4s;\n}\n\ninput:checked+.slider {\n    background-color: #2196F3;\n}\n\ninput:focus+.slider {\n    box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked+.slider:before {\n    -webkit-transform: translateX(26px);\n    transform: translateX(26px);\n}\n\n\n/* Rounded sliders */\n\n.slider.round {\n    border-radius: 34px;\n}\n\n.slider.round:before {\n    border-radius: 50%;\n}\n\n.object-list-wrap {\n    padding: 15px;\n    border-bottom: 1px solid #ececec;\n}\n\n.object-list-wrap P {\n    font-size: 12px;\n}\n\n.object-list {\n    overflow: hidden;\n    font-size: 12px;\n}\n\n.object-list-main {\n    float: left;\n}\n\n.object-name {\n    font-size: 12px;\n    width: 75px;\n    overflow: scroll;\n}\n\n.object-preview {\n    background: #fff;\n    border: 1px solid #ececec;\n    margin-left: 5px;\n}\n\n.object-preview:hover {\n    cursor: pointer;\n}\n\n.object-dropdown {\n    margin-top: 15px;\n    padding: 10px;\n    padding-top: 20px;\n    padding-bottom: 10px;\n    border-radius: 3px;\n    background: #fff;\n    position: relative;\n}\n\n.tri {\n    width: 0px;\n    height: 0px;\n    border-top: 10px solid none;\n    border-bottom: 10px solid white;\n    border-right: 15px solid transparent;\n    border-left: 15px solid transparent;\n    position: absolute;\n    top: 0;\n    margin-top: -10px;\n    left: 0;\n    margin-left: 66px;\n}\n\n.object-switch {\n    display: none;\n}\n\n.event-time {\n    overflow: hidden;\n}\n\n.event-time div {\n    width: 50%;\n    float: left;\n}\n\n.event-time input {\n    width: 73px;\n    margin-left: 10px;\n}\n\n.interpolator-select {\n    width: 100%;\n    margin-top: 15px;\n    margin-bottom: 20px;\n}\n\n\n/* 토글버튼 */\n\n\n/*.toggle_button {\n    cursor:pointer;\n    display:block;\n    background:#eee;\n    text-align:center;\n    border:1px solid #ccc;\n}\n#toggle_button,\n#toggle_contents {\n    height:0;\n    overflow:hidden;\n    position:absolute;\n}\n#toggle_button:checked + #toggle_contents {\n    height:auto;\n    position:relative;\n    border:1px solid #ccc;\n    border-top:0;\n    padding:10px;\n}*/\n\n\n/* 토글버튼 @ */\n\n#nav,\n#toggle {\n    display: none;\n}\n\n#toggle:checked+#nav {\n    display: inline-block;\n}\n\n.event-stageChange {\n    overflow: hidden;\n    position: relative;\n    height: 100%;\n    background: #f9fafb;\n}\n\n.event-detail-footer {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    width: 320px;\n    background: #ebebeb;\n    padding: 15px;\n}\n\n.event-detail-footer .btn-afterAni {\n    width: 100%;\n    border-radius: 50px;\n    border: 2px solid #46abca;\n    background: transparent;\n    margin-bottom: 10px;\n    color: #46abca;\n    padding: 8px;\n}\n\n.event-detail-footer button {\n    background: #46abca;\n    color: #fff;\n    width: 142px;\n    padding: 8px;\n    border-radius: 50px;\n    border: none;\n}\n\n.event-detail-footer button:hover {\n    cursor: pointer;\n    background: #3a97af;\n}\n\n.event-detail-footer .btn-afterAni:hover {\n    background: rgba(255, 255, 255, 0.5);\n}\n\n\n/* 인터폴레이터 막대그래프 */\n\n.graph {\n    height: 6px;\n    width: 180px;\n    margin-bottom: 0.5em;\n    margin-left: 10px;\n    overflow: hidden;\n    background-color: #fff;\n    border-radius: 0.0725em;\n    text-align: center;\n    margin-top: 5px;\n}\n\n.graph-bar {\n    float: left;\n    width: 0;\n    height: 100%;\n    color: #ffffff;\n    background-color: #46abca;\n    box-sizing: border-box;\n}\n\n\n/* 인터폴레이터 막대그래프 @*/\n\n\n/* 인터폴레이터 커브 그래프 */\n\n.curve-graph {\n    position: relative;\n    height: 300px;\n    text-align: center;\n}\n\n.coordinate-plane {\n    position: absolute;\n    margin-left: 6px;\n    left: 0;\n    line-height: 0;\n}\n\n.control-point {\n    position: absolute;\n    z-index: 1;\n    height: 16px;\n    width: 16px;\n    border: 1px solid rgba(0, 0, 0, .3);\n    margin: -8px 0 0 -8px;\n    outline: none;\n    box-sizing: border-box;\n    border-radius: 20px;\n}\n\n#P0,\n#P3 {\n    background: white;\n}\n\n#P0 {\n    left: 0;\n    top: 100%;\n}\n\n#P1 {\n    background: #f08;\n}\n\n#P2 {\n    background: #0ab;\n}\n\n#P3 {\n    left: 100%;\n    top: 0;\n}\n\n#P1,\n#P2 {\n    cursor: pointer;\n}\n\ncanvas#curve {\n    background: #f0f0f0;\n    background: linear-gradient(-45deg, transparent 50%, rgba(0, 0, 0, .1) 49%, rgba(0, 0, 0, .1) 51%, transparent 51%) center no-repeat, repeating-linear-gradient(white, white 20px, transparent 20px, transparent 40px) no-repeat, linear-gradient(rgba(0, 0, 0, .06) 25%, rgba(0, 0, 0, .06) 75%);\n    background-size: 100% 100%, 100% 100%, auto;\n    background-position: 25%, 0, 0;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n        user-select: none;\n}\n\n.coordinate-plane:before {\n    content: 'Progression';\n    border-bottom: 1px solid;\n    -moz-transform: rotate(-90deg);\n    -moz-transform-origin: bottom left;\n    -ms-transform: rotate(-90deg);\n    -ms-transform-origin: bottom left;\n    -o-transform: rotate(-90deg);\n    -o-transform-origin: bottom left;\n    -webkit-transform: rotate(-90deg);\n    -webkit-transform-origin: bottom left;\n    transform: rotate(-90deg);\n    transform-origin: bottom left;\n}\n\n.coordinate-plane:after {\n    content: 'Time';\n    border-top: 1px solid;\n    margin-bottom: -1.5em;\n}\n\n.coordinate-plane:before,\n.coordinate-plane:after {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    padding: .3em .5em;\n    box-sizing: border-box;\n    color: rgba(0, 0, 0, .6);\n    text-transform: uppercase;\n    font-size: 75%;\n    line-height: 1;\n}\n\n\n/* 인터폴레이터 커브그래프 @*/\n\n.curve-input input {\n    width: 131px;\n    margin-bottom: 6px;\n}\n\n.curve-input .input-left {\n    margin-right: 4px;\n}\n\n.curve-input .input-right {\n    margin-left: 4px;\n}\n\n.event-detail {\n    padding: 15px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "/* The switch - the box around the slider */\n\n.switch {\n    position: relative;\n    display: inline-block;\n    width: 20px;\n    height: 14px;\n    margin-top: 7px;\n}\n\n\n/* Hide default HTML checkbox */\n\n.switch input {\n    display: none;\n}\n\n\n/* The slider */\n\n.slider {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: #ccc;\n    transition: .4s;\n}\n\n.slider:before {\n    position: absolute;\n    content: \"\";\n    height: 6px;\n    width: 6px;\n    left: 4px;\n    bottom: 4px;\n    background-color: white;\n    transition: .4s;\n}\n\ninput:checked+.slider {\n    background-color: #46abca;\n}\n\ninput:focus+.slider {\n    box-shadow: 0 0 1px #46abca;\n}\n\ninput:checked+.slider:before {\n    -webkit-transform: translateX(6px);\n    transform: translateX(6px);\n}\n\n\n/* Rounded sliders */\n\n.slider.round {\n    border-radius: 34px;\n}\n\n.slider.round:before {\n    border-radius: 50%;\n}\n\n\n.event-time {\n    overflow: hidden;\n    margin-bottom: 10px;\n    margin-top: 10px;\n}\n\n.event-time div {\n    width: 50%;\n    float: left;\n}\n\n.event-time input {\n    width: 83px;\n    margin-left: 10px;\n    background: #f1f1f1;\n    border-radius: 3px;\n    border: none;\n    padding: 3px;\n        padding-left: 10px;\n    padding-right: 10px;\n}\n\n.interpolator-select {\n    width: 100%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n       height: 30px;\n       font-size: 13px;\n}\n\n\n/* 인터폴레이터 커브그래프 @*/\n\n.curve-input input {\n      width: 141px;\n    margin-bottom: 6px;\n    background: #f1f1f1;\n    border-radius: 3px;\n    border: none;\n    padding: 3px;\n    padding-left: 10px;\n    padding-right: 10px;\n\n}\n\n.curve-input .input-left {\n    margin-right: 4px;\n}\n\n.curve-input .input-right {\n    margin-left: 4px;\n}\n\n.object-detail {\n    background: #fff;\n    padding:15px;\n    position: relative;\n    margin-top: -1px;\n \n}\n\n/*오브젝트 디테일 말풍선 삼각형 */\n\n.tri {\n    width: 0px;\n    height: 0px;\n    border-top: 10px solid none;\n    border-bottom: 10px solid white;\n    border-right: 15px solid transparent;\n    border-left: 15px solid transparent;\n    position: absolute;\n    top: 0;\n    margin-top: -10px;\n    left: 0;\n    margin-left:105px;\n}\n\n.object-list-main {\n    vertical-align: middle;\n    padding-bottom: 10px;\n    padding-top: 10px;\n    padding-left: 15px;\n    padding-right: 15px;\n    border-bottom: 1px solid #ccc;\n    overflow: hidden;\n}\n\n.object-list {\n    float: left;\n}\n\n/*.object-id {\n    width:90px;\n    padding-left: 5px;\n    padding-right: 5px;\n    padding-top: 6px;\n    padding-bottom: 5px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}*/\n\n\n\n.timeline-preview {\n    margin-top: 7px;\n    margin-left: 8px;\n}\n\n.go-graph {\n    margin-top: 5px;\n}\n\n.go-graph canvas {\nbackground: #fff !important;\n}\n\n.go-graph:hover {\n    cursor: pointer;\n\n}\n\n.graph-wrap p, .timeline-wrap p {\n    padding-top: 10px;\n    font-size: 10px;\n    color:#898989;\n    margin:0;\n}\n\n\n/* 체크박스 */\n\n\n\n.control {\n  display: block;\n  position: relative;\n  padding-left: 30px;\npadding-top: 6px;\n  cursor: pointer;\n  font-size: 12px;\n  width:140px;\n}\n.control input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0;\n}\n.control__indicator {\n  position: absolute;\n  top: 5px;\n  left: 0;\n  height: 20px;\n  width: 20px;\n  background: #e6e6e6;\n  border-radius: 20px;\n}\n\n.control:hover input ~ .control__indicator,\n.control input:focus ~ .control__indicator {\n  background: #ccc;\n}\n.control input:checked ~ .control__indicator {\n  background: #2aa1c0;\n}\n.control:hover input:not([disabled]):checked ~ .control__indicator,\n.control input:checked:focus ~ .control__indicator {\n  background: #0e647d;\n}\n.control input:disabled ~ .control__indicator {\n  background: #e6e6e6;\n  opacity: 0.6;\n  pointer-events: none;\n}\n.control__indicator:after {\n  content: '';\n  position: absolute;\n  display: none;\n}\n.control input:checked ~ .control__indicator:after {\n  display: block;\n}\n.control--checkbox .control__indicator:after {\n  left: 8px;\n  top: 4px;\n  width: 3px;\n  height: 8px;\n  border: solid #fff;\n  border-width: 0 2px 2px 0;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n.control--checkbox input:disabled ~ .control__indicator:after {\n  border-color: #7b7b7b;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".object-new .btn-object-new {\n         width: 32.5%;\n    height: 84px;\n    border: none;\n    background-color: #fff;\n    position: relative;\n    margin:1px;\n \n}\n\n\n.layers-btn {\n    padding: 15px;\n    background-color: #ebebeb;\n}\n\n.layers-btn::after\n{content:””; display:block; clear:both;}\n\n\n.object-new .btn-object-new:hover {\n    -webkit-transform: scale(1.02);\n            transform: scale(1.02);\n    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.23);\n    z-index: 7999;\n    transition: 0.1s all ease;\n    -webkit-transition: 0.1s all ease;\n    -moz-transition: 0.1s all ease;\n    -o-transition: 0.1s all ease;\n    -ms-transition: 0.1s all ease;\n    cursor: pointer;\n}\n\n.layers-btn .motion-btn {\n    float: left;\n}\n\n\n\n.motion-btn-wrap {\n    overflow: hidden;\n}\n\n.layers-btn .motion-btn img {\n    max-width: 45px;\n    max-height: 53px;\n    margin-left: auto;\n    margin-right: auto;\n    padding-top: 13px;\n}\n\n.layers-btn .motion-btn p {\n    text-align: center;\n    width: 100%;\n    font-size: 11px;\n    color: #454545;\n    position: absolute;\n    bottom: 1px;\n    margin-bottom: 6px;\n}\n\n.img-responsive {\n        display: block;\n    max-width: 100%;\n    height: auto;\n}\n\n\n.object-new {\n    position: relative;\n\n    overflow: hidden;\n}\n\n.label-properties img {\n    width: 18px;\n    cursor: pointer;\n    opacity: 0.7;\n    padding-top: 3px;\n}\n\n.label-properties img:hover {\n   \n    opacity: 1;\n}\n\n.col-8{\n    width: 66%;\n    float: left;\n}\n\n.col-4 {\n    width: 33%;\n    float: right;\n}\n\n.label-properties{\n    font-size: 14px;\n    font-weight: 600;\n    padding: 6px 10px;\n    background-color: #fff;\n    color: #454545;\n    position: relative;\n    overflow: hidden;\n}\n\n.object-new .btn-resource{\n    width: 22.5%;\n    height: 56px;\n    border: 1px solid #ccc;\n    background: url(" + __webpack_require__(120) + ");   \n    position: relative;\n    margin: 3px;\n    float: left;\n}\n\n\n\n.select-file {\nmargin: 0;\nfont-size: 12px;\ncolor:#898989;\ntext-align: center;\nmargin-top: 10px;\n}\n\n.select-file a {\n    text-decoration: none;\n    color:#898989;\npadding: 5px 10px;\n}\n\n.select-file a:hover {\n    color:#454545;\n}\n\n.select-file .active {\n    color:#46a2ba;\n}\n\n.select-file .active:hover {\n    color:#1e839d;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".label-properties {\n    font-size: 14px;\n    font-weight: 600;\n    padding: 6px 10px;\n    background-color: #fff;\n    color: #454545;\n    position: relative;\n}\n\n.object-property {\n    background:#f9fafb;\n    padding-top: 15px;\n    padding-bottom: 15px;\n}\n\n.object-property input {\n        height: 28px;\n    width: 100%;\n    padding: 4px 8px;\n    font-size: 13px;\n    border-radius: 4px;\n    border: none;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n}\n\n.object-property .property-input {\n    width:65%;\n    float: right;\n     padding-left: 15px;\n    padding-right: 15px;\n}\n\n.object-property .property-input-wrap {\n    overflow: hidden;\n}\n\n.object-property label {\n    width:30%;\n    font-size: 11px;\n    font-weight: 400;\n    color:#898989;\n    padding-top: 7px;\n    float: left;\n    padding-left: 15px;\n    padding-right: 15px;\n}\n\n.btn-img button{\n    width:290px;height: 28px;\n    margin:15px;\n   background: #fff;\n   border:1px solid #ccc;\n   border-radius: 2px;\n   color:#454545;\n}\n\n.btn-img button:hover {\n    background: #f9f9f9;\n    cursor: pointer;\n}\n\n.go-event-detail .btn-trash {\n    background: transparent;\n    border:none;\n}\n\n.btn-more button {\n        width: 290px;\n    height: 28px;\n    margin: 15px;\n    background: #f1f1f1;\n    border: none;\n    border-radius: 2px;\n    color: #454545;\n    border: 1px solid #ececec;\n}\n\n.btn-more button:hover {\n    background: #e9e9e9;\n    cursor: pointer;\n}\n\n.object-property .img-selected {\n    padding-left: 15px;\n    padding-right: 15px;\n    overflow: hidden;\n}\n\n.object-property .img-selected img {\n    width:60px;\n    border:1px solid #ececec;\n    padding:6px;\n    float: left;\nmargin-right: 15px;\n}\n\n.object-property .img-selected .img-sub {\n    float: left;\n    padding-top: 8px;\n}\n\n.object-property .img-selected .img-sub p {\n    margin-bottom: 0px;\nfont-size: 12px;\ncolor:#898989;\nmargin-top: 3px;\n}\n\n.object-property .img-selected .img-sub .img-sub-size {\n    font-size: 11px;\n    color:#ccc;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".preview-size {\n    background-color: #efeff0;\n    padding:10px;\n    padding-bottom: 6px;\n}\n\n\n\n.preview-size input {\n\n        height: 23px;\n    width: 100%;\n    padding: 4px 8px;\n    font-size: 13px;\n    border-radius: 4px;\n    border: 1px solid rgba(0, 0, 0, 0.07);\n    border-top: none;\n    border-bottom: none;\n\n}\n\n.preview-size .row {\n    margin: 0;\n}\n\n.preview-size .row .col-xs-7 {\n    padding-right: 2px;\n    padding-left: 2px;\n}\n\n.preview-size .dropdown {\n    width: 100%;\n    text-align: center;\n}\n\n.dropdown {\n    display: inline-block;\n}\n\n.mobile-size {\n    position: relative;\n}\n\n.preview-size .properties-wrap {\n    z-index: 9999;\n}\n\n.properties-wrap {\n    position: relative;\n    width: 50%;\n    float: left;\n}\n\n.preview-size .dropdown button {\n    width: 100%;\n    border: none;\n    background-color: rgba(255, 255, 255, 0.8);\n    border-radius: 4px;\n    color: #898989;\n    font-size: 13px;\n}\n\n.preview-size .dropdown button:hover {\n    cursor: pointer;\n}\n\n.preview-size .mobile-size button {\n    border: none;\n    background-color: rgba(255,255,255,0.8);\n    border-radius: 4px;\n    color: #898989;\n    font-size: 13px;\n    padding-left:4px;\n    width: 15% !important;\n    margin-left: 1px;\n}\n\n.dropdown-menu {\n       min-width: 60px;\n    font-size: 13px;\n    text-align: left;\n    position: absolute;\n    z-index: 999;\n    background: #fff;\n  box-shadow: 0px 3px 10px 1px rgba(0,0,0,0.29);\n    margin-top: 10px;\n}\n\n.dropdown-menu div:hover {\n    background: #f9f9f9;\n}\n\n.dropdown-menu-padding {\n\n    min-width: 120px;\n    text-align: center;\n}\n\n.dropdown-menu-padding div {\n    padding-top: 6px;\n    padding-bottom: 6px;\n    border-bottom: 1px solid #ececec;\n}\n\n\n.preview-size .properties-wrap .properties-text {\n    top: 5px;\n}\n\n.properties-wrap .properties-text {\n    position: absolute;\n    top: 9px;\n    font-size: 10px;\n    left: 6px;\n    color: #ccc;\n}\n\n.preview-size .properties-wrap .properties-padding {\n    padding-left: 20px;\n    padding-right: 0px;\n}\n\n.dropdown input {\n    height: 23px;\n    width: 100%;\n    padding: 4px 8px;\n    font-size: 13px;\n    border-radius: 4px;\n    border: 1px solid rgba(0, 0, 0, 0.07);\n    border-top: none;\n    border-bottom: none;\n}\n\n.preview-size .row .col-xs-2 {\n    padding-right: 2px;\n    padding-left: 2px;\n}\n\n.preview-size .row .col-xs-4 {\n    padding-right: 2px;\n    padding-left: 2px;\n}\n\n.mobile-size .ic-mobile {\n    width: 12px;\n    opacity: 0.6;\n}\n\n.dropdown-menu-padding div:hover {\n    cursor: pointer;\n}\n\n.root-size {\n    padding: 3px 10px;\n    padding-left: 40px;\n    font-size: 12px;\n    border-bottom: 1px solid #ececec;\n    position: relative;\n}\n\n.root-size:hover {\n    cursor: pointer;\n}\n\n.root-size img {\n    position: absolute;\n    left: 0;\n    margin-left: 13px;\n    opacity: 0.8;\n}\n\n\n\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".disable-text-selection {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n\n.img-data {\n    font-size: 12px;\n    text-align: center;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".noselect {\n    -webkit-touch-callout: none;\n    /* iOS Safari */\n    -webkit-user-select: none;\n    /* Safari */\n    /* Konqueror HTML */\n    -moz-user-select: none;\n    /* Firefox */\n    -ms-user-select: none;\n    /* Internet Explorer/Edge */\n    user-select: none;\n    /* Non-prefixed version, currently\n                                  supported by Chrome and Opera */\n}\n\n\n.preview-dot {\n    width:10px;\n    height: 10px;\n    background-color: #46a2ba;\n    position: absolute;\n    border-radius: 30px;\n}\n\n.dot-1 {\n    left:0;top:0; margin-left: -5px;margin-top: -5px; cursor:nw-resize;\n}\n\n.dot-2 {\nright:0;top:0; margin-right: -5px;margin-top: -5px; cursor:ne-resize;\n}\n\n\n.dot-3 {\nleft:0;bottom:0; margin-left: -5px;margin-bottom: -5px; cursor:sw-resize;\n}\n\n.dot-4 {\nright:0;bottom:0; margin-right: -5px;margin-bottom: -5px; cursor:se-resize;\n}\n\napp-preview-object div:hover {\nborder:1px solid #000000;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".stage-list {\n        padding-top: 10px;\n    width: 100%;\n    z-index: 66;\n    background-color: #b1b6bc;\n    min-width:600px !important;\n}\n\n.stage-line {\n    height: 3px;\n    width: 100%;\n    background: radial-gradient(ellipse farthest-side at 100% 130%, #8a94d9 10%, #5aadb1 110%);\n    margin-top: 5px;\n    z-index: 899;\n}\n\n.stage-list p {\n    margin:0;\n}\n\n.tab-class {\n    border-radius: 3px;\n    padding: 4px 13px 3px 14px;\n    margin: 2px;\n        \n    color: #fff;\n    font-size: 12px;\n\n}\n\n.tab-class:hover {\n    cursor: pointer;\n\n}\n\n\n.stage-current {\nbackground: #46a2ba;\n\n}\n\n.stage-notcurrent {\n    background: #aaa;\n\n}\n\n\n\n.btn-new-stage {\n    border-bottom-width: 0;\n    padding: 8px 15px 7px 15px;\n    background-color: transparent;\n    font-size: 12px;\n    color: #ececec;\n    border: none;\n    z-index: 22;\n}\n\n.btn-new-stage:hover {\n    color:#fff;\n    cursor: pointer;\n}\n\n.stage-list-wrap {\n    position: relative;\n    margin-bottom: 3px;\n}\n\n.btn-delete {\n  position: absolute;\n  display: none;\n    right: 0;\n    top: 0;\n    font-size: 12px;\n    color: #fff;\n    opacity: 0.4;\n    padding: 8px;\n    padding-right: 10px;\n}\n\n.stage-list-wrap:hover .tab-class {\n        padding: 4px 25px 3px 14px;\n}\n\n.stage-list-wrap:hover .btn-delete {\n    display: block;\n   \n}\n\n.stage-list-wrap:hover .btn-delete:hover {\n    opacity: 1;\n}\n\n.stage-list-wrap:hover {\n    cursor: pointer;\n}\n\n.stage-list-wrap:hover .stage-notcurrent {\n background: #898989;\n}\n\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".label-properties {\n    font-size: 14px;\n    font-weight: 600;\n    padding: 6px 10px;\n    background-color: #fff;\n    color: #454545;\n    position: relative;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".activities-top {\n    height: 40px;\n    background: #f5f6f7;\n    font-size: 15px;\n    color: #898989;\n    padding: 9px 15px;\n    margin-bottom: 0px;\n    padding-top: 11px;\n}\n\n.activities-top p {\n    margin: 0;\n}\n\n.col-3 {\n    width: 25%;\n    float: left;\n    position: relative;\n    min-height: 1px;\n    padding-right: 15px;\n    padding-left: 15px;\n    transition: -webkit-transform 8s;\n    transition: transform 8s;\n    transition: transform 8s, -webkit-transform 8s;\n}\n\n.col-wrap {\n    overflow: hidden;\n}\n\n.list-box {\n    border: 2px solid #f5f6f7;\n    margin-top: 30px;\n    margin-bottom: 30px;\n    max-width: 210px;\n    margin-left: auto;\n    margin-right: auto;\n    position: relative;\n}\n\n.list-box .list-img {\n    background: #f5f6f7;\n    padding: 15px 52px;\n    position: relative;\n}\n\n.list-box .list-text {\n    padding: 15px 5px;\n    text-align: center;\n}\n\n.list-text .list-text-title h4 {\n    margin: 0;\n    font-size: 15px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-weight: 500;\n}\n\n.list-text .list-text-title .activity-name {\n    width: 100%;\n    font-size: 15px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-weight: 500;\n    border: none;\n    text-align: center;\n}\n\n.list-text .list-text-title .activity-name:focus {\n    background: #f5f6f7;\n}\n\n.list-text .list-text-updated {\n    font-size: 12px;\n    color: #898989;\n    padding-top: 5px;\n}\n\n.list-new-wrap .list-new {\n    border: 2px dotted #dbdbdb;\n    margin-top: 30px;\n    margin-bottom: 30px;\n    background: #fff;\n    margin-left: auto;\n    margin-right: auto;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    width: 88%;\n    max-width: 210px;\n    font-size: 60px;\n    font-weight: 400;\n    color: #dbdbdb;\n}\n\n.list-new-wrap .list-new:hover {\n    border-color: #46a2ba;\n    cursor: pointer;\n    color: #46a2ba;\n}\n\n.list-box .list-img .list-hover {\n    position: absolute;\n    z-index: 999;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    display: none;\n    background: #46a2ba;\n}\n\n.list-box .list-img .list-hover button {\n    background: transparent;\n    text-align: center;\n    color: #fff;\n    border-radius: 50px;\n    display: block;\n    border: 2px solid #fff;\n    width: 110px;\n    margin-left: auto;\n    margin-right: auto;\n    padding: 6px;\n    margin-top: 6px;\n    margin-bottom: 10px;\n}\n\n.list-box .list-img .list-hover button a {\n    color: #898989;\n    text-decoration: none;\n}\n\n.list-box .list-img .list-hover button a:hover {\n    color: #46a2ba;\n    font-weight: bold;\n}\n\n.list-box .list-img .list-hover button:hover {\n    color: #46a2ba;\n    font-weight: bold;\n    background: #fff;\n    cursor: pointer;\n}\n\n.list-box .list-img:hover .list-hover {\n    display: block;\n    padding-top: 26px;\n}\n\n.list-box .list-img img {\n    background: transparent;\n    border: none;\n    outline: none;\n}\n\n.list-box .list-img .preview-img {\n    width:100px;\n    height: 150px;\n}\n\n.list-img .btn-home-on {\n     position: absolute;\n    top: 0;\n    left: 0;\n    background: #46a2ba;\n    /*background-image: url(../../../assets/images/homebutton_on.png);*/\n    background-size: cover;\n margin-left: 8px;\n  margin-top: -5px;\n    width:25px;\n    height: 25px;\n    padding:10px;\n\n}\n\n.list-img .btn-home-on p {\n      margin: 0px;\n    margin-top: -28px;\n    font-size: 12px;\n    margin-left: -14px;\n    color: #46a2ba;\n}\n\n.list-img .btn-home-on:after {\n        content: \"\";\n    width: 0;\n    height: 0;\n    position: absolute;\n    bottom: -9px;\n    left: 0;\n    border-left: 12px solid transparent;\n    border-right: 13px solid transparent;\n    border-top: 9px solid #46a2ba;\n}\n\n.list-hover .btn-home {\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: #fff;\n    /*background-image: url(../../../assets/images/homebutton_on.png);*/\n    background-size: cover;\n margin-left: 8px;\n  margin-top: -5px;\n    width:25px;\n    height: 25px;\n    padding:10px;\nbox-shadow: -1px -2px 5px -1px rgba(0,0,0,0.17);\n}\n\n.list-img .btn-home:after {\n         content: \"\";\n    width: 0;\n    height: 0;\n    position: absolute;\n    bottom: -9px;\n    left: 0;\n    border-left: 12px solid transparent;\n    border-right: 13px solid transparent;\n    border-top: 9px solid #fff;\n}\n\n.list-hover .btn-home:hover {\n    background-image: url(" + __webpack_require__(312) + ");\n width:26px;\n    height: 26px;\n    cursor: pointer;\n}\n\n\n/*.list-box .btn-home img {\n    background: none!important;\n    margin: 8px;\n}*/\n\n.list-scroll {\n    overflow-x: auto;\n    overflow-y: scroll;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    margin-left: 280px;\n    margin-top: 110px;\n    min-width:800px;\n}\n\n.home-tag-wrap {\n    margin-left: 15px;\n    color:#46a2ba;\n    overflow: hidden;\n}\n\n\n.home-tag-wrap .home-tag {\n    width:30px;\n    height: 30px;\n    background: #46a2ba;\n      position: relative;\n      float: left;\n}\n\n.home-tag-wrap .home-tag img {\n    width:20px;\n        margin-left: 5px;\n    margin-top: 7px;\n}\n\n.home-tag-wrap p {\n        float: left;\n    margin-top: 9px;\n    font-size: 13px;\n    margin-left: 5px;\n}\n\n.home-tag:after {\n        content: \"\";\n    width: 0;\n    height: 0;\n    position: absolute;\n    bottom: -10px;\n    left: 0;\n    border-left: 15px solid transparent;\n    border-right: 15px solid transparent;\n    border-top: 10px solid #46a2ba;\n}\n\n\n@media (min-width: 1850px) {\n    .col-3 {\n        width: 20%;\n    }\n}\n\n@media (max-width: 1080px) {\n    .col-3 {\n        width: 33.33333%;\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".btn-icon {\n    position:relative;\n    margin-top: 20px;\n}\n\n.btn-icon-edit {\nposition: absolute;\nbottom:-8px;\nright:65px;\nbackground: rgba(255,255,255,0.7);\nborder:1px solid #ececec;\nborder-radius: 4px;\ncolor:#898989;\npadding:0px;\npadding:2px 6px;\nfont-size: 16px;\n}\n\n.btn-icon-edit:hover {\n    cursor: pointer;\n    background: rgba(255,255,255,0.9);\n}\n\n.project-edit {\n    background: none;\n    border:none;\n    text-align: center;\n    font-size: 20px;\n    width:100%;\n    \n}\n\n.project-edit:focus {\noutline: 0;\nbackground: rgba(255, 255, 255, 0.7);\n}\n\n\n.project-path-edit {\n    background: none;\n    border:none;\n    text-align: center;\n    font-size: 12px;\n    color:#898989;\n    margin-top: 10px;\n    width:100%;\n}\n\n.project-path-edit:focus {\noutline: 0;\nbackground: rgba(255, 255, 255, 0.7);\n}\n\n\n\n\n\n/* popup test */\n\n\n\n.box {\n  width: 40%;\n  margin: 0 auto;\n  background: rgba(255,255,255,0.2);\n  padding: 35px;\n  border: 2px solid #fff;\n  border-radius: 20px/50px;\n  background-clip: padding-box;\n  text-align: center;\n}\n\n.button {\n  font-size: 1em;\n\nmargin-top: 50px;\n  color: #fff;\n  border: 2px solid #46a2ba;\n color:#46a2ba;\n  text-decoration: none;\n  cursor: pointer;\n  transition: all 0.3s ease-out;\n}\n.button:hover {\n  background: #46a2ba;\n  color:#fff;\n}\n\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.7);\n  transition: opacity 500ms;\n\n  opacity: 1;\n}\n.overlay:target {\n  visibility: visible;\n  opacity: 1;\n}\n\n.popup {\n  margin: 70px auto;\n  padding: 20px;\n  background: #fff;\n  border-radius: 5px;\n  width: 800px;\n  height:500px;\n  position: relative;\n  transition: all 5s ease-in-out;\n     overflow-x: hidden;\n    overflow-y: auto;\n}\n\n.popup .active {\n    color:#46a2ba;\n}\n\n.popup h2 {\n  margin-top: 0;\n  color: #333;\n  font-family: Tahoma, Arial, sans-serif;\n}\n.popup .close {\n  position: absolute;\n  top: 10px;\n  right: 20px;\n  transition: all 200ms;\n  font-size: 30px;\n  font-weight: bold;\n  text-decoration: none;\n  color: #333;\n  z-index: 9999;\n}\n.popup .close:hover {\n  color: #06D85F;\n}\n.popup .content {\n  max-height: 30%;\n  overflow: auto;\n}\n\n.popup-list .col-sm-3 {\n    width:20%;\n    padding:10px;\n}\n\n.popup-new {\n    border:2px solid #ececec;\n    border-radius: 4px;\n    height:460px;\n    text-align: center;\n    padding-top: 100px;\n    color:#898989;\n}\n\n.popup-new:hover {\n    color:#46a2ba;\n}\n\n.popup-new img {\nmargin-left: auto;\nmargin-right: auto;\nopacity: 0.3;\n}\n\n\n.popup-category {\n    margin-top: 15px;\n   margin-bottom: 15px;\n   position: relative;\n}\n\n.popup-category label{\n     font-size: 12px;\n    padding-right: 30px;\n}\n\n.popup-category input {\n    position:absolute;\n    right:0;\n    top:0;\n}\n\n.popup-nav label {\n    padding-right: 20px;\n}\n\n/*popup test finish */\n\n\n.btn-resource {\n    position: absolute;\n    bottom:0;\n    left:0;\n    right:0;\n    width:200px;\n    margin-left: auto;\n    margin-right: auto;\n    margin-bottom: 20px;\n    padding:8px;\n    background: transparent;\n    border:2px solid #46a2ba;    \n    border-radius: 5px;\n    color:#46a2ba;\n    font-weight: bold;\n    font-size: 14px;\n}\n\n.btn-resource:hover {\n    cursor: pointer;\n    background: #46a2ba;\n    color:#fff;\n  \n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.navbar {\n    position:relative;\n    min-height: 50px;\n    margin-bottom: 20px;\n    background-color: #fff;\n    border: 1px solid #e7e7e7;\nborder-top: none;\n    box-shadow: 1px 1px 6px rgba(0,0,0,0.2);\n    z-index: 9999;\n    margin-bottom: 0;\n}\n\n.connect-wrap {\n z-index: 9998;\n    position: absolute;\n    right:0;\nmargin-right: 186px;\nwidth:134px;\n}\n\n.howtoconnect {\n   width:100%;\nbackground: #fff;\nfont-size: 12px;\n\ntext-align: center;\npadding:8px;\nborder-bottom-left-radius: 8px;\nborder-bottom-right-radius: 8px;\n   box-shadow: 1px 1px 6px rgba(0,0,0,0.2);\n   color:#898989;\n}\n\n.connect-wrap .fa-close {\n    position:absolute;\n    right:0;\n    top:0;\n    color:#898989;\n    padding:5px;\n    margin:6px 3px;\n    margin-right: 5px;\n    font-size: 12px;\n\n}\n\n.connect-wrap .fa-close:hover {\ncolor:#454545;\ncursor: pointer;\n}\n\n.connect-delete {\n       position:absolute;\n    right:0;\n    top:0;\n    color:#898989;\n    padding:5px;\n    margin:6px 3px;\n    margin-right: 5px;\n    font-size: 12px;\n}\n\n#how:target{\ndisplay: none;\n}\n\n\n\n/*\n.howtoconnect a {\n    color:#898989;\n \n    text-decoration: none;\n}\n\n.howtoconnect a:hover {\n    color:#454545;\n}*/\n\n.howtoconnect span a {\n    color:#46a2ba;\n    padding-right: 12px;\n    text-decoration: none;\n}\n\n.howtoconnect span a:hover {\n    color:#2b778b;\n}\n\n/*.connect-wrap .fa-close:active{\n    display: none;\n}*/\n\n\n.list-wrap {\n    width:100%;\n    height:100%;\n    background: #fff;\n    padding-top: 50px;\n    position:absolute;\n    top:0;\n    left:0;\n    right:0;\n    bottom:0;\n    z-index: 99;\n}\n\n.list-wrap .list-left {\n    margin: auto;\n    width: 280px;\n    height: 100%;\n    background: #edf0f4;\n    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n    float: left;\n    position: relative;\n}\n\n.list-wrap .list-right {\n    width: 100%;\n    height: 100%;\n    padding-left: 280px;\n  \n}\n\n.nav-right {\n    float:right;\n}\n\n.navbar .btn-back {\n    height:50px;\n    border:none;\n    color:rgba(0,0,0,0.5);\n    background: none;\n    padding-left: 20px;\n    font-size: 13px;\n    font-weight: 600;\n}\n\n.navbar .btn-back:hover {\n    color:rgba(0,0,0,0.7);\n    cursor: pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".device-status {\n    font-size: 13px;\n    \n    padding-left: 20px;\n}\n\n.device-unconnected {\n    color:rgba(0,0,0,0.5);\n    font-weight: 600;\n    padding-top: 3px;\n       padding-left: 15px;\n    padding-right: 15px;\n}\n\n.device-unconnected span {\n    color:#46a2ba;\n}\n\n.device-unconnected span i {\n    font-size: 16px;\n    margin-left: 3px;\n    vertical-align: bottom;\n}\n\n.device-unconnected span:hover {\n    cursor: pointer;\n    color: #1a809b;\n}\n\n.device-connected {\n    color:#46a2ba;\n    font-weight: 600;\n    padding-top: 3px;\n       padding-left: 15px;\n    padding-right: 15px;\n}\n\n.device-status p {\n    float:left;\n}\n\n\n.device-status .nav-btn {\n color:#46a2ba;\n    font-weight: 600;\n    padding-top: 16px;\n    height:51px;\n    padding-left: 15px;\n    padding-right: 15px;\n    border-left: 1px solid #ececec;\n      margin: 0;\n}\n\n.device-status .nav-btn-sending {\n    background: #46a2ba;\n    width:80.55px;\n}\n\n.device-status .btn-source .nav-btn-img{\nwidth:20px;\n}\n\n\n.device-status .nav-btn:hover {\n    color:#fff;\n    background: #46a2ba;\n    cursor: pointer;\n}\n\n.nav-btn-img {\n    padding-right: 5px;\n  \n    width:18px;\n    margin-top: -2px;\n}\n\n.nav-btn i {\n    font-size: 20px;\n    margin-right: 10px;\n    vertical-align: bottom;\n    margin-bottom: -1px;\n}\n\n\n.nav-btn-img-2 {\n    padding-right: 5px;\n    opacity: 0.5;\n    width:29px;\n    margin-top: -2px;\n}\n\n.device-status .nav-btn:hover .nav-btn-img-2{\n   -webkit-filter: invert(100%);\n   filter: invert(100%);\n   opacity: 1;\n   margin-top: -2px;\n}\n\n.device-status .nav-btn:hover .nav-btn-img{\n   -webkit-filter: invert(100%);\n   filter: hue-rotate(100%);\n   opacity: 1;\n   margin-top: -2px;\n}\n\n\n\n/* -------------- loader10 -------------- */\n\n.loader10:before{\n\tcontent: \"\";\n\tposition: absolute;\n\ttop: 0px;\n\tleft: -18px;\n\theight: 8px;\n\twidth: 8px;\n\tborder-radius: 12px;\n\t-webkit-animation: loader10g 1s ease-in-out infinite;\n\t\t\tanimation: loader10g 1s ease-in-out infinite;\n}\n\n.loader10{\n\tposition: relative;\n\twidth: 8px;\n\theight: 8px;\n\tleft: 46%;\n    top:6px;\n\tborder-radius: 12px;\n\t-webkit-animation: loader10m 1s ease-in-out infinite;\n\t\t\tanimation: loader10m 1s ease-in-out infinite;\n}\n\n\n.loader10:after{\n\tcontent: \"\";\n\tposition: absolute;\n\ttop: 0px;\n\tleft: 18px;\n\theight: 8px;\n\twidth: 8px;\n\tborder-radius: 10px;\n\t-webkit-animation: loader10d 1s ease-in-out infinite;\n\t\t\tanimation: loader10d 1s ease-in-out infinite;\n}\n\n@-webkit-keyframes loader10g{\n\t0%{background-color: rgba(255, 255, 255, .2);}\n\t25%{background-color: rgba(255, 255, 255, 1);}\n\t50%{background-color: rgba(255, 255, 255, .2);}\n\t75%{background-color: rgba(255, 255, 255, .2);}\n\t100%{background-color: rgba(255, 255, 255, .2);}\n}\n@keyframes loader10g{\n\t0%{background-color: rgba(255, 255, 255, .2);}\n\t25%{background-color: rgba(255, 255, 255, 1);}\n\t50%{background-color: rgba(255, 255, 255, .2);}\n\t75%{background-color: rgba(255, 255, 255, .2);}\n\t100%{background-color: rgba(255, 255, 255, .2);}\n}\n\n@-webkit-keyframes loader10m{\n\t0%{background-color: rgba(255, 255, 255, .2);}\n\t25%{background-color: rgba(255, 255, 255, .2);}\n\t50%{background-color: rgba(255, 255, 255, 1);}\n\t75%{background-color: rgba(255, 255, 255, .2);}\n\t100%{background-color: rgba(255, 255, 255, .2);}\n}\n@keyframes loader10m{\n\t0%{background-color: rgba(255, 255, 255, .2);}\n\t25%{background-color: rgba(255, 255, 255, .2);}\n\t50%{background-color: rgba(255, 255, 255, 1);}\n\t75%{background-color: rgba(255, 255, 255, .2);}\n\t100%{background-color: rgba(255, 255, 255, .2);}\n}\n\n@-webkit-keyframes loader10d{\n\t0%{background-color: rgba(255, 255, 255, .2);}\n\t25%{background-color: rgba(255, 255, 255, .2);}\n\t50%{background-color: rgba(255, 255, 255, .2);}\n\t75%{background-color: rgba(255, 255, 255, 1);}\n\t100%{background-color: rgba(255, 255, 255, .2);}\n}\n@keyframes loader10d{\n\t0%{background-color: rgba(255, 255, 255, .2);}\n\t25%{background-color: rgba(255, 255, 255, .2);}\n\t50%{background-color: rgba(255, 255, 255, .2);}\n\t75%{background-color: rgba(255, 255, 255, 1);}\n\t100%{background-color: rgba(255, 255, 255, .2);}\n}\n\n\n@media screen and (max-width: 917px) {\n.device-status{\n\tdisplay: none;\n}\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "/* popup test */\n\n.box {\n    width: 40%;\n    margin: 0 auto;\n    background: rgba(255, 255, 255, 0.2);\n    padding: 35px;\n    border: 2px solid #fff;\n    border-radius: 20px/50px;\n    background-clip: padding-box;\n    text-align: center;\n}\n\n.button {\n    font-size: 1em;\n    margin-top: 50px;\n    color: #fff;\n    border: 2px solid #46a2ba;\n    color: #46a2ba;\n    text-decoration: none;\n    cursor: pointer;\n    transition: all 0.3s ease-out;\n}\n\n.button:hover {\n    background: #46a2ba;\n    color: #fff;\n}\n\n.overlay {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0, 0, 0, 0.7);\n    transition: opacity 500ms;\n    opacity: 1;\n    z-index: 9999;\n}\n\n.overlay:target {\n    visibility: visible;\n    opacity: 1;\n}\n\n.popup {\n    margin: 90px auto;\n    padding: 20px;\n    padding-top: 50px;\n    padding-bottom: 50px;\n    background: #fff;\n    border-radius: 5px;\n    width: 800px;\n    height: 500px;\n    position: relative;\n    transition: all 5s ease-in-out;\n    overflow-x: hidden;\n    overflow-y: auto;\n}\n\n.popup .active {\n    color: #46a2ba;\n}\n\n.popup h2 {\n    margin-top: 0;\n    color: #333;\n    font-family: Tahoma, Arial, sans-serif;\n}\n\n.popup .close {\n    position: absolute;\n    top: 10px;\n    right: 20px;\n    transition: all 200ms;\n    font-size: 30px;\n    font-weight: bold;\n    text-decoration: none;\n    color: #333;\n    z-index: 9999;\n}\n\n.popup .close:hover {\n    color: #06D85F;\n}\n\n.popup .content {\n    max-height: 30%;\n    overflow: auto;\n}\n\n.popup-list .col-sm-3 {\n    width: 20%;\n    padding: 10px;\n}\n\n.popup-new {\n    border: 2px solid #ececec;\n    border-radius: 4px;\n    height: 460px;\n    text-align: center;\n    padding-top: 100px;\n    color: #898989;\n}\n\n.popup-new:hover {\n    color: #46a2ba;\n}\n\n.popup-new img {\n    margin-left: auto;\n    margin-right: auto;\n    opacity: 0.3;\n}\n\n.popup-category {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    position: relative;\n}\n\n.popup-category label {\n    font-size: 12px;\n    padding-right: 30px;\n}\n\n.popup-category input {\n    position: absolute;\n    right: 0;\n    top: 0;\n}\n\n.popup-nav label {\n    padding-right: 20px;\n}\n\n\n/*popup test finish */\n\n\n.popup .resource-footer {\n    position: absolute;\n    bottom:0;\n    left:0;\n    right:0;\n    height: 50px;\n    border-top: 1px solid #ececec;\n    background: #fff;\n    padding:12px;\n    \nbox-shadow: 0px -1px 6px 0px rgba(0,0,0,0.2);\n}\n\n.popup .resource-footer button {\n    background: transparent;\n    border: none;\n    font-size: 15px;\n    font-weight: 600;\n    color:#454545;\n}\n\n.popup .resource-footer button:hover {\n\n cursor: pointer;\n \n    color:#46a2ba;\n}\n\n.resource-apply {\n    position: absolute;\n    bottom:0;\n    right:0;\n    padding:12px;\n}\n\n.popup .resource-nav {\n    position: absolute;\n   top:0;\n    left:0;\n    right:0;\n    height: 50px;\n    border-bottom: 1px solid #ececec;\n    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);\n  \n}\n\n.resource-nav .btn-tab {\npadding:16px;\nwidth: 100px;\n}\n\n.resource-nav .btn-select {\n    border-bottom: 3px solid #46a2ba!important;\n}\n\n.popup .resource-nav .resource-add {\n    position: absolute;\n    right:0;\n    top:0;\n    padding:12px;\n}\n\n.popup .resource-nav .resource-add button {\n    font-weight: normal;\n    font-family: inherit;    \n}\n\n.popup .resource-nav button {\n      background: transparent;\n    border: none;\n    font-size: 13px;\n    font-weight: 600;\n    color:#898989;\n    font-weight: bold;\n     font-family: Tahoma, Arial, sans-serif;\n}\n\n.popup .resource-nav button:hover {\n    cursor: pointer;\n    color: #46a2ba;\n}\n\n.resource-wrap {\n    overflow: hidden;\n    height: 100%;\n    padding-top: 15px;\n    padding-bottom: 15px;\n  overflow-y: auto;\n}\n\n.resource-wrap h3 {\n    margin-top: 0;\n}\n\n.image-list {\n    overflow: hidden;\n}\n\n.image-list .bg-img img {\n    width: 96px;\n    height: 96px;\n}\n\n.image-list .bg-img {\n    float: left;\n    margin:5px;\n   background: url(" + __webpack_require__(120) + ");\n   border:1px solid #ececec;\n}\n\n.image-list .bg-img:hover {\n    border-color: #ccc;\n}\n\n.image-list:hover {\n    cursor: pointer;\n}\n\n.file-list {\n    padding:8px;\n    font-size: 15px;\n    color:#454545;\n    border-bottom: 1px solid #ececec;\n}\n\n.file-list:hover {\n    color:#46a2ba;\n    cursor: pointer;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".menu-main-list button {\nbackground: transparent;\nfont-size: 15px;\nfont-weight: 400;\ncolor:#fff;\ntext-shadow: 0px 0px 11px rgba(0,0,0,0.45);\nborder:none;\n}\n\n.menu-main-list button:hover {\n    cursor: pointer;\n    color:#ececec;\n}\n\n.menu-main-list {\n\n    margin-top: 25px;\nmax-width:270px;\nmargin-left: auto;\nmargin-right: auto;\n\n\n}\n\n.menu-main-list .main-img {\n    width:140px;\n}\n\n/*.hc {\n    max-width: 280px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n\n}\n\n.vc {\n    max-height: 330px;\n    top: 0;\n    bottom: 0;\n    margin-top: auto;\n    margin-bottom: auto;\n}\n\n#center {\n    position: absolute;\n    z-index: 9999!important;\n}*/\n\n.menu-list  div img {\n    width:35px;\n    padding:6px;\n}\n\n\n\n.menu-list {\n    vertical-align: middle;\n}\n\n.menu-list {\n    margin-top: 55px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n.bg-menu {\n    background: linear-gradient(to bottom, #46a2ba 0%,#8096cc 100%);\n   min-height:480px;\n   \n}\n\n.menu-list {\n   height:480px;\n    background: #edf0f4;\n   max-width:280px;\n \n   overflow-y:auto;\n   overflow-x:hidden;\n    float:left;\n    padding-top: 46px;\n}\n\n.menu-main {\n    height:100%;\npadding:30px;\n   overflow: hidden;\n \n}\n\n/*.menu-list + .menu-main {\n    width:70%;\n    float:left;\n    }*/\n\n.version-info {\n    position: absolute;\n    right:0;\n    top:0;\n    margin-top: 20px;\n    margin-right: 20px;\n    font-size: 13px;\n    color:rgba(255,255,255,0.5);\n}\n\n.go-download {\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    padding-right: 20px;\n    margin-bottom: 10px;\n    overflow: hidden;\n    margin-left: 250px;\n    padding-left: 140px;\n    border-top: 1px solid rgba(255,255,255, 0.3);\n    padding-top: 10px;\n}\n\n.go-download p {\n font-size: 11px;\n color:rgba(255,255,255, 0.8);\n font-weight: lighter;\n float: left;\n margin: 6px;\n margin-top: 10px;\n}\n\n.go-download img {\n    float: left;\n    width:128px;\n}\n\n.go-download img:hover {\n    cursor: pointer;\n}\n\n@media screen and (max-height: 460px) {\n    .go-download {\n        display: none;\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".recent-project {\n    padding:15px;\n    font-size: 13px;\n    color:#a3a3a3;\n    border-bottom: 1px solid #ccc;\n    margin:0;\n    position: fixed;\n    top:0;\n    width:250px;\nbackground: #edf0f4;\n}\n\n.recent-project-list {\n    padding:15px;\n    border-bottom: 1px solid #ccc;\nwidth:250px;\n}\n\n.recent-project-list h5 {\n    font-weight: 600;\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n\n.recent-project-list p {\n    color:#a3a3a3;\n    margin:0;\n    font-size: 12px;\n    text-overflow: ellipsis;\n    overflow: hidden;\n}\n\n.recent-project-list:hover {\n cursor: pointer;\n background: rgba(227,232,239,1);\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".btn-back {\n    background: none;\n    border:none;\n    color:#898989;\n    font-weight: 700;\n    font-size: 14px;\n}\n\n.btn-back:hover {\ncursor: pointer;\ncolor:#454545;\n}\n\n.btn-new-save {\n    position: absolute;\n    bottom:0;\n    right:0;\n   \n    margin-bottom: 30px;\n    margin-right: 20px;\n}\n\n.btn-new-save button:hover {\n    cursor:  pointer;\n}\n\n.btn-new-save  button {\n    font-weight: 700;\n    font-size: 14px;\n    border:none;\n     color:#46a2ba;\n    background: transparent;\n}\n\n.btn-new-save button:hover {\n    color:#2c869d;\n}\n\n.ic-newproject {\n    text-align: center;\n    margin-top: 35px;\n    margin-bottom: 30px;\n}\n\n.application-name {\n    max-width: 390px;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.application-name .form-control {\n    width:100%;\n}\n\n.project-folder input {\n  \n   padding-right: 25px;\n\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.application-name input:focus {\n    border-color: #46a2ba!important;\n}\n\n.project-folder {\n    position: relative;\n}\n\n.project-folder button {\n    border:none;\n    border-radius: 4px;\n    font-size: 10px;\n    background: #fff;\n    position: absolute;\n    right:5px;\n    top:0;\n    color:#46a2ba;\n    font-weight: 800;\n    margin-top: 7px;\n}\n\n.project-folder button:hover {\n    cursor: pointer;\n    background: #f1f1f1;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */
/***/ (function(module, exports) {

module.exports = "<div class=\"activity-wrap\" (window:resize)=\"onResize($event)\">\n\n\n    <!-- activity navbar -->\n\n    <nav id=\"topSide\" class=\"navbar navbar-default activity-nav\" *ngIf=\"activityMetaData\" style=\"height:50px;\">\n        <div class=\"container-fluid\" style=\"padding-left: 0;\">\n            <div style=\"float:left;\" class=\"nav-project\">\n                <button class=\"btn-back\" (click)=\"clickBack()\">{{applicationData.applicationName}}</button>\n            </div>\n\n            <div class=\"dropdown nav-page\" role=\"menu\" style=\"float:left;\">\n                <input type=\"text\" [(ngModel)]=\"activityMetaData.activityName\" (blur)=\"changeActivityName()\" />\n            </div>\n\n            <div class=\"nav navbar-nav navbar-right\">\n                <app-device-status [sendStatus]=\"sendStatus\"></app-device-status>\n            </div>\n        </div>\n    </nav>\n\n    <!-- activity navbar @ -->\n\n\n    <!-- activity content -->\n\n    <div class=\"activity-root\">\n\n\n        <!-- activity left-->\n\n        <div class=\"activity-left\">\n            <app-object-tree #objectTree (onChangeNode)=\"onChangeNodeFromTree($event)\" (onClickNewFile)=\"clickNewFile($event)\" (onSelectNode)=\"onSelectNodeFromTree($event)\"></app-object-tree>\n            <app-object-new #objectNew (onShowResourceDialog)=\"onShowResourceDialog($event)\" (onClickNewObject)=\"clickNewObject($event)\" (onChangeTreeData)=\"changeTreeData($event)\"></app-object-new>\n        </div>\n\n        <!-- activity left@-->\n\n        <!-- activity canvas-->\n\n        <div class=\"activity-canvas\" [style.width]=\"getPreviewWidth()\" [style.height]=\"getPreviewHeight()\">\n            <app-stage-list #stageList (onSelectStage)=\"onSelectStage($event)\" (onNewStage)=\"onNewStage()\"></app-stage-list>\n            <app-preview #previewCanvas (onSelectNodeFromOther)=\"onSelectNodeFromOther($event)\" (onShowResourceDialog)=\"onShowResourceDialog($event)\"></app-preview>\n\n        </div>\n\n        <!-- activity canvas@-->\n\n\n        <!-- activity right-->\n\n        <div class=\"activity-right\" id=\"rightSide\">\n\n            <app-preview-size #previewSize></app-preview-size>\n            <app-object-property #objectProperty (onShowResourceDialog)=\"onShowResourceDialog($event)\" (onChangeTreeData)=\"changePropertyData($event)\"></app-object-property>\n            <app-event-list #eventList (onNewEvent)=\"onNewEvent($event)\" (onClickDetailEvent)=\"onClickDetailEvent($event)\"></app-event-list>\n            <app-event-detail-stage-change #eventDetailStageChange (onNewAfterAnimationEvent)=\"onNewAfterAnimationEvent($event)\" (onCloseEvent)=\"onCloseEvent($event)\"></app-event-detail-stage-change>\n            <app-event-detail-start-activity #eventDetailStartActivity></app-event-detail-start-activity>\n            <app-event-detail-finish-activity #eventDetailFinishActivity></app-event-detail-finish-activity>\n\n        </div>\n\n        <!-- activity right@-->\n\n    </div>\n\n    <!-- activity content @ -->\n\n</div>\n\n<app-resource #resourceDialog (onSelectFile)=\"onSelectFile($event)\"></app-resource>\n<app-event-generator #eventGenerator (onCompleteEvent)=\"onCompleteEvent($event)\"></app-event-generator>"

/***/ }),
/* 251 */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"selectedTriggerEvent\">\n    <div *ngIf=\"selectedImplementEvent.type=='finishActivity'\">\n        event-detail-finish-activity works!\n\n    </div>\n</div>"

/***/ }),
/* 252 */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"selectedImplementEvent&&stateEventList\">\n    <div *ngIf=\"selectedImplementEvent.type=='stageChange'\" class=\"event-stageChange\">\n\n        <div class=\"event-detail\">\n            <!--{{selectedImplementEvent.type}}-->\n\n            <!-- 이벤트에 대한 상세 정보 -->\n\n            <img src=\"assets/images/btn_stagechange.png\" />\n            <h4>rootStage > Stage 03</h4>\n\n\n        </div>\n\n\n\n        <!-- 각 오브젝트별 이벤트 인터폴레이터 -->\n\n\n        <div *ngFor=\"let aStateEvent of stateEventList\" class=\"object-list-wrap\">\n\n            <!-- 오브젝트 리스트 -->\n            <div class=\"object-list\">\n                <app-event-state-change-cell [maxTotalTime]=\"maxTotalTime\" (onChangeTimeLineFromStateCell)=\"onChangeTimeLineFromStateCell($event)\"\n                    [stateEventData]=\"aStateEvent\"></app-event-state-change-cell>\n            </div>\n            <!-- 오브젝트 리스트@ -->\n        </div>\n\n        <!-- 각 오브젝트별 이벤트 인터폴레이터 @-->\n\n\n\n    </div>\n\n    <!-- 이벤트 디테일 하단 : 애프터애니메이션 클릭시 이벤트생성 팝업-->\n    <div class=\"event-detail-footer\">\n        <button class=\"btn-afterAni\" (click)=\"clickAddAfterAnimation()\">AfterAnimation</button>\n        <button (click)=\"clickCancel()\">Cancel</button>\n        <button>Done</button>\n    </div>\n\n\n</div>"

/***/ }),
/* 253 */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"selectedTriggerEvent\">\n    <div *ngIf=\"selectedImplementEvent.type=='startActivity'\">\n         <div class=\"event-detail\">\n            <!--{{selectedImplementEvent.type}}-->\n\n            <!-- 이벤트에 대한 상세 정보 -->\n\n            <img src=\"assets/images/btn_startactivity.png\" />\n            <h4>Activity1 > Activity2</h4>\n\n\n        </div>\n\n    </div>\n</div>"

/***/ }),
/* 254 */
/***/ (function(module, exports) {

module.exports = "<div class=\"popup-wrap\" *ngIf=\"visibility\">\n    <div id=\"popup1\" class=\"overlay\" (click)=\"hideDialog()\">\n        <div class=\"popup\" (click)=\"nothing($event)\">\n\n            <div class=\"generator-nav\">\n                Detail Event Generator\n                <!--<button (click)=\"hideDialog()\">Hide</button>-->\n            </div>\n\n\n            <div class=\"generator-wrap\">\n                <!-- 트리거 버튼 -->\n\n\n                <div class=\"trigger-select col-4\">\n\n                    <!-- 트리거 선택하기 -->\n                    <div *ngIf=\"!afterTriggerEventId\">\n                        <div class=\"generator-title\">Trigger</div>\n\n                        <div class=\"btn-scroll\">\n\n                            <div class=\"btn-trigger btn-click\" (click)=\"clickTrigger('click')\">\n                                <img src=\"assets/images/btn_click.png\" />\n                                <p>Tap</p>\n                                <div *ngIf=\"!triggerEvent\" class=\"click-info trigger-hover\">\n                                    <h2>Tap</h2>\n                                    <p>Press once with one finger and lift immediately.</p>\n                                </div>\n                            </div>\n                            <div class=\"btn-trigger btn-oncreate\" (click)=\"clickTrigger('onCreate')\">\n                                <img src=\"assets/images/btn_oncreate.png\" />\n                                <p>onCreate</p>\n                                <div *ngIf=\"!triggerEvent\" class=\"oncreate-info trigger-hover\">\n                                    <h2>OnCreate</h2>\n                                    <p>Executing an event at the same time that the Activity starts.</p>\n                                </div>\n                            </div>\n                            <div class=\"btn-trigger btn-backkey\" (click)=\"clickTrigger('backKey')\">\n                                <img src=\"assets/images/btn_backkey.png\" />\n                                <p>backKey</p>\n                                <div *ngIf=\"!triggerEvent\" class=\"backkey-info trigger-hover\">\n                                    <h2>BackKey</h2>\n                                    <p>Tap the backkey once on the android navigation bar.</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <!-- 애프터 애니메이션 -->\n                    <div *ngIf=\"afterTriggerEventId\" align=\"center\">\n                        <div class=\"generator-title\">After Animation</div>\n                        <div class=\"after-animation\">\n                            <h3>rootStage > Stage 03</h3>\n                            <p>후 일어날 이벤트를 설정해 주세요.</p>\n                        </div>\n                    </div>\n\n                </div>\n\n                <!--트리거 관련 설명 -->\n\n                <div class=\"trigger-intro\" *ngIf=\"!triggerEvent\">\n                    <div class=\"trigger-sub\">\n                        <h2>Trigger</h2>\n                        <p>A user action to trigger an event, such as changing the state of objects or switching between Activities.\n                            Select the trigger you want on the left.\n                        </p>\n\n                        <h4>Tap</h4>\n                        <p>Press once with one finger and lift immediately.</p>\n                        <h4>OnCreate</h4>\n                        <p>Executing an event at the same time that the Activity starts.</p>\n                        <h4>BackKey</h4>\n                        <p>Tap the backkey once on the android navigation bar.</p>\n                    </div>\n\n\n                </div>\n\n                <!--트리거 관련 설명@ -->\n\n                <!-- 트리거 버튼 @-->\n\n\n                <!-- 이벤트 종류 정하기 -->\n                <div *ngIf=\"triggerEvent \" class=\"col-4\">\n                    <div class=\"generator-title\">Event</div>\n                    <div class=\"event-select \">\n\n\n\n                        <div class=\"btn-scroll\" style=\"padding-bottom:50px;\">\n                            <div class=\"btn-trigger btn-stagechange\" (click)=\"clickImplement('stageChange')\">\n                                <img src=\"assets/images/btn_stagechange.png\" />\n                                <p>stageChange</p>\n                                <div *ngIf=\"!implementEvent\" class=\"stage-info event-hover\">\n                                    <h2>stageChange</h2>\n                                    <p>All states such as object position, size, shape and color can be changed through 'StageChange'.</p>\n                                </div>\n                            </div>\n                            <div class=\"btn-trigger btn-startactivity\" (click)=\"clickImplement('startActivity')\">\n                                <img src=\"assets/images/btn_startactivity.png\" />\n                                <p>startActivity</p>\n                                <div *ngIf=\"!implementEvent\" class=\"startactivity-info event-hover\">\n                                    <h2>startActivity</h2>\n                                    <p>This event starts another new Activity. It is used to move from the current Activity\n                                        to another Activity.</p>\n                                </div>\n                            </div>\n                            <div class=\"btn-trigger btn-finishactivity\" (click)=\"clickImplement('finishActivity')\">\n                                <img src=\"assets/images/btn_finishactivity.png\" />\n                                <p>finishActivity</p>\n                                <div *ngIf=\"!implementEvent\" class=\"finishactivity-info event-hover\">\n                                    <h2>finishActivity</h2>\n                                    <p>This event closes the current Activity and returns it to the previous Activity. We often\n                                        use backkeys inside apps.</p>\n                                </div>\n                            </div>\n\n                            <div class=\"event-kind\">Lottie</div>\n                            <div class=\"btn-trigger btn-startlottie\" (click)=\"clickImplement('startLottie')\">\n                                <img src=\"assets/images/btn_startlottie.png\" />\n                                <p>startLottie</p>\n                                <div *ngIf=\"!implementEvent\" class=\"startlottie-info event-hover\">\n                                    <h2>startLottie</h2>\n                                    <p>Play the motion graphics of LottieView with JSON file applied</p>\n                                </div>\n                            </div>\n                            <div class=\"btn-trigger btn-stoplottie\" (click)=\"clickImplement('stopLottie')\">\n                                <img src=\"assets/images/btn_stoplottie.png\" />\n                                <p>stopLottie</p>\n                                <div *ngIf=\"!implementEvent\" class=\"stoplottie-info event-hover\">\n                                    <h2>stopLottie</h2>\n                                    <p>Stop motion graphics of LottieView.</p>\n                                </div>\n                            </div>\n\n                            <div class=\"event-kind\">Camera</div>\n                            <div class=\"btn-trigger btn-takepicture\" (click)=\"clickImplement('takePicture')\">\n                                <img src=\"assets/images/btn_takepicture.png\" />\n                                <p>takePicture</p>\n                                <div *ngIf=\"!implementEvent\" class=\"takepicture-info event-hover\">\n                                    <h2>takePicture</h2>\n                                    <p>It acts as a camera shutter when shooting with 'CameraView'. You can also select a layer\n                                        to show the captured image.</p>\n                                </div>\n                            </div>\n\n\n                            <div class=\"event-kind\">VideoView</div>\n                            <div class=\"btn-trigger btn-startvideo\" (click)=\"clickImplement('startVideo')\">\n                                <img src=\"assets/images/btn_startvideo.png\" />\n                                <p> startVideo</p>\n                                <div *ngIf=\"!implementEvent\" class=\"startvideo-info event-hover\">\n                                    <h2>startVideo</h2>\n                                    <p>Play video from VideoView.</p>\n                                </div>\n                            </div>\n                            <div class=\"btn-trigger btn-stopvideo\" (click)=\"clickImplement('stopVideo')\">\n                                <img src=\"assets/images/btn_stopvideo.png\" />\n                                <p> stopVideo</p>\n                                <div *ngIf=\"!implementEvent\" class=\"stopvideo-info event-hover\">\n                                    <h2>stopVideo</h2>\n                                    <p>Stop video playing in VideoView.</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <!--이벤트 관련 설명 -->\n\n                <div class=\"event-intro\" *ngIf=\"!implementEvent\">\n\n                    <h2>Event</h2>\n                    <p>The movement within the app that works to interact with the user. Select the event you want to activate.</p>\n\n                    <h4>StageChange</h4>\n                    <p>All states such as object position, size, shape and color can be changed through 'StageChange'.</p>\n                    <h4>StartActivity</h4>\n                    <p>This event starts another new Activity. It is used to move from the current Activity to another Activity.</p>\n                    <h4>FinishActivity</h4>\n                    <p>This event closes the current Activity and returns it to the previous Activity. We often use backkeys\n                        inside apps.</p>\n                    <h4>startLottie</h4>\n                    <p>Play the motion graphics of LottieView with JSON file applied</p>\n                    <h4>stopLottie</h4>\n                    <p>Stop motion graphics of LottieView.</p>\n                    <h4>takePicture</h4>\n                    <p>It acts as a camera shutter when shooting with 'CameraView'. You can also select a layer to show the\n                        captured image.</p>\n                    <h4>startVideo</h4>\n                    <p>Play video from VideoView.</p>\n                    <h4>stopVideo</h4>\n                    <p>Stop video playing in VideoView.</p>\n                </div>\n\n                <!--이벤트 관련 설명@ -->\n\n                <!-- 이벤트 종류 정하기 @ -->\n\n                <!-- 이벤트 상세설정 -->\n\n                <div *ngIf=\"implementEvent\">\n\n                    <div class=\"event-detail col-4\">\n\n                        <div class=\"generator-title\">Event Detail</div>\n                        <div *ngIf=\"implementEvent.type=='stageChange'\" class=\"detail-content\">\n\n\n                            <p>From <b>{{currentSelectedStageId}}</b> select target stage</p>\n                            <select [(ngModel)]=\"selectedStageId\" (change)=\"onChangeStage($event.target.value)\"> \n                        <option *ngFor=\"let aStage of stageList\" [value]=\"aStage.id\">{{aStage.name}}</option>\n                    </select>\n                        </div>\n                        <div *ngIf=\"implementEvent.type=='startActivity'\" class=\"detail-content\">\n                            <p> Select target activity</p>\n                            <select [(ngModel)]=\"selectedActivityId\" (change)=\"onChangeActivity($event.target.value)\"> \n                        <option  *ngFor=\"let aActivity of activityList\" [value]=\"aActivity.activityId\">{{aActivity.activityName}}</option>\n                    </select>\n                        </div>\n                        <div *ngIf=\"implementEvent.type=='finishActivity'\" class=\"detail-content\">\n                            <p> Will finish activity</p>\n                        </div>\n\n\n                        <div *ngIf=\"implementEvent.type=='startLottie'\" class=\"detail-content\">\n                            <p>Select Lottie to start</p>\n                            <select [(ngModel)]=\"selectedLottieViewId\" (change)=\"onChangeActivity($event.target.value)\"> \n                        <option  *ngFor=\"let aObject of getLottieViewList()\" [value]=\"aObject.id\">{{aObject.name}}</option>\n                    </select>\n                        </div>\n\n                        <div *ngIf=\"implementEvent.type=='stopLottie'\" class=\"detail-content\">\n                            <p>Select Lottie to start</p>\n                            <select [(ngModel)]=\"selectedLottieViewId\" (change)=\"onChangeLottiView($event.target.value)\"> \n                        <option *ngFor=\"let aObject of getLottieViewList()\" [value]=\"aObject.id\">{{aObject.name}}</option>\n                    </select>\n                        </div>\n\n\n                        <div *ngIf=\"implementEvent.type=='startVideo'\" class=\"detail-content\">\n                            <p>Select Lottie to start</p>\n                            <select [(ngModel)]=\"selectedVideoViewId\" (change)=\"onChangeVideoView($event.target.value)\"> \n                        <option  *ngFor=\"let aObject of getVideoViewList()\" [value]=\"aObject.id\">{{aObject.name}}</option>\n                    </select>\n                        </div>\n\n                        <div *ngIf=\"implementEvent.type=='stopVideo'\" class=\"detail-content\">\n                            <p>Select Lottie to start</p>\n                            <select [(ngModel)]=\"selectedVideoViewId\" (change)=\"onChangeVideoView($event.target.value)\"> \n                        <option *ngFor=\"let aObject of getVideoViewList()\" [value]=\"aObject.id\">{{aObject.name}}</option>\n                    </select>\n                        </div>\n\n\n\n\n                        <div *ngIf=\"implementEvent.type=='takePicture'\" class=\"detail-content\">\n                            <p>Select view to picture</p>\n                            <select [(ngModel)]=\"selectedTakePictureObjectViewId\" (change)=\"onChangeCameraPictureView($event.target.value)\"> \n                        <option  *ngFor=\"let aObject of getImageViewList()\" [value]=\"aObject.id\">{{aObject.name}}</option>\n                    </select>\n                        </div>\n\n                    </div>\n                </div>\n\n\n                <!-- 이벤트 상세설정 @ -->\n\n            </div>\n\n            <div class=\"generator-footer\">\n\n                <button (click)=\"hideDialog()\">Cancel</button>\n                <button *ngIf=\"readyEvent\" (click)=\"completeEvent()\">Done</button>\n\n            </div>\n\n\n\n        </div>\n    </div>\n</div>"

/***/ }),
/* 255 */
/***/ (function(module, exports) {

module.exports = "<div class=\"event-list\">\n\n\n    <div class=\"label-properties\">\n\n\n        <div class=\"col-8\" style=\"padding-left: 0;\">\n            Event\n        </div>\n        <div class=\"col-4\" align=\"right\" style=\"padding:0;\">\n            <div>\n                <img (click)=\"clickNewEvent()\" src=\"assets/images/btn_motion_add.png\" class=\"img-responsive\">\n            </div>\n        </div>\n\n\n    </div>\n\n    <div *ngIf=\"!selectedTriggerEvent\">\n\n\n        <!-- 이벤트리스트 -->\n        <div *ngIf=\"triggerEventList\" class=\"go-event-detail\">\n            <div *ngFor=\"let aEvent of triggerEventList\" class=\"event-detail-wrap\" (click)=\"clickDetailEvent(aEvent)\">\n\n                <div class=\"event-detail\">\n\n                    <!-- 이벤트에 대한 상세 정보 -->\n                    <img src=\"assets/images/btn_stagechange.png\" />\n                    <h4> {{aEvent.name}} -{{getImplement(aEvent.id).name}}</h4>\n\n                </div>\n\n\n                <button class=\"btn-trash\" (click)=\"clickDeleteEvent($event,aEvent)\"><i class=\"fa fa-trash-o\"></i></button>\n            </div>\n        </div>\n        <!-- 이벤트리스트 @ -->\n\n\n\n    </div>\n\n    <div *ngIf=\"!selectedTriggerEvent\" class=\"noti-addmotions\">\n        <img src=\"assets/images/ic_motion.png\" alt=\"add-motions\">\n\n        <a (click)=\"clickNewEvent()\">\n            <h3>Add motions</h3>\n        </a>\n        <p>Add the motion blah blah</p>\n    </div>\n\n</div>"

/***/ }),
/* 256 */
/***/ (function(module, exports) {

module.exports = "<div #cellRoot>\n    <!-- 오브젝트 이름-->\n    <div class=\"object-name object-list-main\">\n        {{getObjectName(stateEventData.objectId).name}}\n    </div>\n\n\n    <canvas canvasW=\"80\" canvasH=\"80\" width=\"80\" height=\"80\" #myCanvas style=\"border:1px solid #c3c3c3;\"></canvas>\n\n\n    <!-- 활성화 버튼-->\n    <div class=\"object-switch\">\n        <label class=\"switch\">\n                        <input type=\"checkbox\" [checked]=\"stateEventData.isEnabled\" (change)=\"stateEventData.isEnabled = !stateEventData.isEnabled\" >\n                        <div class=\"slider round\"></div>\n                    </label>\n    </div>\n\n\n\n    <br>\n\n    <button (click)=\"toggleDetail()\">toggle</button>\n    <div [hidden]=\"!isExpanded\">\n        <!-- 인터폴레이터 수치 그래프 -->\n        <canvas canvasW=\"200\" canvasH=\"200\" width=\"200\" height=\"200\" (mousemove)=\"mouseMove($event)\" (mousedown)=\"mouseDown($event)\" (mouseup)=\"mouseUp($event)\" #myCanvas style=\"border:1px solid #c3c3c3;\"></canvas>\n\n        <div class=\"tri\"></div>\n\n        <!-- 시작 시간 및 동작 시간-->\n        <div class=\"event-time\">\n            <div class=\"event-delay\">\n                Delay <input [(ngModel)]=\"stateEventData.startDelay\">\n            </div>\n            <div class=\"event-duration\">\n                Duration<input [(ngModel)]=\"stateEventData.duration\">\n            </div>\n        </div>\n\n        <!-- 인터폴레이터 종류 선택-->\n        <select class=\"interpolator-select\" (change)=\"onChangeInterpolator($event.target.value, stateEventData)\"> \n                        <option  *ngFor=\"let aSet of presetInterpolatorList\" [value]=\"aSet.value\">{{aSet.name}}</option>\n                    </select>\n\n\n\n        <!-- 인터폴레이터 수치 조절-->\n        <div class=\"curve-input\">\n            <input class=\"input-left\" [(ngModel)]=\"stateEventData.cubicValue[0]\"><input class=\"input-right\" [(ngModel)]=\"stateEventData.cubicValue[1]\">\n            <input class=\"input-left\" [(ngModel)]=\"stateEventData.cubicValue[2]\"><input class=\"input-right\" [(ngModel)]=\"stateEventData.cubicValue[3]\">\n        </div>\n\n    </div>\n</div>"

/***/ }),
/* 257 */
/***/ (function(module, exports) {

module.exports = "<div #cellRoot>\n\n\n    <!-- 오브젝트 이름-->\n    <div class=\"object-name object-list-main\">\n\n        <!--<input type=\"checkbox\" [(ngModel)]=\"stateEventData.isEnabled\">-->\n\n        <!-- 오브젝트 이벤트 활성화 온오프 버튼 -->\n  \n        <label class=\"control control--checkbox object-id object-list\">\n            {{getObjectName(stateEventData.objectId).name}}\n            <input type=\"checkbox\" checked=\"checked\"  [(ngModel)]=\"stateEventData.isEnabled\"/>\n            <div class=\"control__indicator\"></div>\n        </label>\n\n\n\n        <!-- 오브젝트 이름 -->\n        <!--<div class=\"object-id object-list\">\n            {{getObjectName(stateEventData.objectId).name}}\n        </div>-->\n\n        <!-- 그래프 미리보기 -->\n        <app-event-state-change-graph class=\"go-graph object-list\" (click)=\"toggleDetail()\" #graphSmall [stateEventData]=\"stateEventData\"\n            [graphSize]=\"18\"></app-event-state-change-graph>\n\n        <!-- 타임라인 미리보기 -->\n        <app-event-state-change-timeline class=\"timeline-preview object-list\" #timeLineSmall (onChangeTimeLine)=\"onChangeTimeLineFromTimeLine($event)\"\n            [stateEventData]=\"stateEventData\" [timeLinePadding]=\"1\" [timeLineSizeW]=\"120\" [timeLineSizeH]=\"8\" [maxTime]=\"maxTotalTime\"></app-event-state-change-timeline>\n\n        <!--<button (click)=\"toggleDetail()\">상세</button>-->\n    </div>\n    <!-- 오브젝트 이름@-->\n\n    <!-- 오브젝트 상세-->\n    <div [hidden]=\"!isExpaned\">\n\n        <div class=\"object-detail\">\n\n            <!-- 오브젝트 디테일 말풍선 삼각형 -->\n            <!--<div class=\"tri\"></div>-->\n\n\n            <!-- 그래프 전체-->\n\n            <div class=\"graph-wrap\">\n\n                <p style=\"padding-top:0;\">Graph</p>\n\n                <!-- 인터폴레이터 종류 선택-->\n                <select class=\"interpolator-select\" (change)=\"onChangeInterpolator($event.target.value, stateEventData)\"> \n                    <option *ngFor=\"let aSet of presetInterpolatorList\" [value]=\"aSet.value\">{{aSet.name}}</option>\n                </select>\n\n                <!-- 인터폴레이터 그래프 -->\n                <app-event-state-change-graph #graphBig (onChangeGraph)=\"onChangeGraph($event)\" [needHandler]=\"true\" [stateEventData]=\"stateEventData\"\n                    [graphSize]=\"288\" [paddingSize]=\"20\"></app-event-state-change-graph>\n\n                <!-- 인터폴레이터 수치 입력-->\n                <div class=\"curve-input\">\n                    <input class=\"input-left\" [(ngModel)]=\"stateEventData.cubicValue[0]\"><input class=\"input-right\" [(ngModel)]=\"stateEventData.cubicValue[1]\">\n                    <input class=\"input-left\" [(ngModel)]=\"stateEventData.cubicValue[2]\"><input class=\"input-right\" [(ngModel)]=\"stateEventData.cubicValue[3]\">\n                </div>\n\n            </div>\n\n            <!-- 그래프 전체@-->\n\n            <!--타임라인 전체 -->\n\n            <div class=\"timeline-wrap\">\n\n                <p style=\"margin-bottom:10px;\">Timeline</p>\n\n                <!-- 타임라인 에디트 -->\n                <app-event-state-change-timeline #timeLineBig (onChangeTimeLine)=\"onChangeTimeLineFromTimeLine($event)\" [stateEventData]=\"stateEventData\"\n                    [timeLinePadding]=\"0\" [timeLineSizeW]=\"288\" [timeLineSizeH]=\"20\" [maxTime]=\"maxTotalTime\"></app-event-state-change-timeline>\n\n\n                <!-- 시작 시간 및 동작 시간-->\n                <div class=\"event-time\">\n                    <div class=\"event-delay\">\n                        Delay <input [(ngModel)]=\"stateEventData.startDelay\">\n                    </div>\n                    <div class=\"event-duration\">\n                        Duration<input [(ngModel)]=\"stateEventData.duration\">\n                    </div>\n                </div>\n\n            </div>\n\n            <!--타임라인 전체 @ -->\n\n        </div>\n\n    </div>\n    <!-- 오브젝트 상세@-->\n\n</div>"

/***/ }),
/* 258 */
/***/ (function(module, exports) {

module.exports = "<canvas width=\"{{graphSize}}\" height=\"{{graphSize}}\" (mousemove)=\"mouseMove($event)\" (mousedown)=\"mouseDown($event)\" (mouseleave)=\"mouseUp($event)\" (mouseup)=\"mouseUp($event)\" #myCanvas style=\"border:1px solid #c3c3c3;\"></canvas>"

/***/ }),
/* 259 */
/***/ (function(module, exports) {

module.exports = "<canvas width=\"{{timeLineSizeW}}\" height=\"{{timeLineSizeH}}\" (mousemove)=\"mouseMove($event)\" (mousedown)=\"mouseDown($event)\" (mouseleave)=\"mouseUp($event)\" (mouseup)=\"mouseUp($event)\" #myCanvas ></canvas>"

/***/ }),
/* 260 */
/***/ (function(module, exports) {

module.exports = "<div #lavContainer [ngStyle]=\"{'width': '100%', 'height': '100%', 'overflow':'hidden', 'margin': '0 auto'}\">\n</div>"

/***/ }),
/* 261 */
/***/ (function(module, exports) {

module.exports = "<div class=\"object-new\">\n\n    <div class=\"label-properties\">New Layers</div>\n\n\n    <div class=\"layers-btn\" style=\"width: 100%;height:100px;\">\n\n        <!-- 이미지 들어있는 버튼 예시 -->\n        <!--\n        <div class=\"motion-btn-wrap\">\n\n            <div class=\"motion-btn btn-object-new\">\n                <img src=\"../assets/images/btn_frame.png\" class=\"img-responsive\">\n                <p> FrameLayout</p>\n            </div>\n\n            <div class=\"motion-btn btn-object-new\">\n                <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n                <p> ImageView</p>\n            </div>\n\n            <div class=\"motion-btn btn-object-new\">\n                <img src=\"../assets/images/btn_text.png\" class=\"img-responsive\">\n                <p> TextView</p>\n            </div>\n\n        </div>-->\n\n        <!-- 이미지 들어있는 버튼 예시 @-->\n\n        <button class=\"btn-object-new motion-btn\" *ngFor=\"let aType of objectTypeData\" (click)=\"clickNewObject(aType.type)\">\n             <img [src]=\"aType.icon\" class=\"img-responsive\">\n            {{aType.name}}\n        </button>\n\n\n        <button class=\"btn-object-new motion-btn\" (click)=\"clickPSD()\">\n             <img src=\"./assets/images/btn_importpsd.png\"  class=\"img-responsive\">\n            PSD\n        </button>\n\n\n\n    </div>\n\n</div>\n\n<div class=\"object-new\" style=\"margin-top:15px; display:none;\">\n\n\n    <div class=\"label-properties\">\n\n        <div class=\"col-8\" style=\"padding-left: 0;\">\n            Resource\n        </div>\n        <div align=\"right\" class=\"col-4\" style=\"padding:0;\">\n            <div>\n                <img (click)=\"clickResource()\" class=\"img-responsive\" src=\"assets/images/btn_motion_add.png\">\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"select-file\">\n        <a href=\"#\" class=\"active\">Image</a> <a href=\"#\">JSON</a><a href=\"#\">Video</a><a href=\"#\">Font</a>\n    </div>\n\n    <div class=\"layers-btn \" style=\"width: 100%;height:100px; padding-top:5px;\">\n\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n    </div>\n</div>"

/***/ }),
/* 262 */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!selectedTriggerEvent\">\n    <div class=\"object-property\" style=\"padding-top:0;\">\n        <div class=\"label-properties\" style=\"margin-bottom:15px;\">Properties</div>\n        <div *ngIf=\"selectedObject\" class=\"btn-img\">\n\n            <!-- 이미지, 파일 선택버튼 -->\n            <div *ngIf=\"selectedObject.type=='ImageView'\">\n\n                <div *ngIf=\"selectedObject.dataUrl\" class=\"img-selected\">\n                    <img [src]=\"prefix+applicationFolderPath+'/'+selectedObject.dataUrl\" />\n                    <div class=\"img-sub\">\n                        <p>ImageTitle</p>\n                        <p class=\"img-sub-size\">ImageSize</p>\n                    </div>\n                </div>\n                <button (click)=\"clickSelectImage()\"> ImageSelect</button>\n            </div>\n\n            <div *ngIf=\"selectedObject.type=='LottieView'||selectedObject.type=='VideoView'\">\n                <button (click)=\"clickSelectFile()\"> FileSelect</button>\n            </div>\n            <!-- 이미지, 파일 선택버튼@ -->\n\n\n            <div class=\"property-input-wrap\">\n                <div *ngFor=\"let key of showPropertyKeys\">\n                    <div *ngIf=\"selectedObject[key]\">\n                    </div>\n\n\n                    <label> {{ key }}:</label>\n                    <div class=\"property-input\">\n                        <input [(ngModel)]=\"selectedObject[key]\">\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"btn-more\">\n            <button (click)='toggleDetail()'>View more Properties <i class=\"fa fa-sort-desc\"></i></button>\n        </div>\n\n        <div *ngIf=\"selectedState&&needShowState\">\n            <div class=\"property-input-wrap\" *ngFor=\"let key of detailKeys\">\n                <label> {{ key }}: </label>\n                <div class=\"property-input\">\n                    <input [(ngModel)]=\"selectedState[key]\">\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>"

/***/ }),
/* 263 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"object-tree\">\n\n    <div class=\"label-properties\">Layers</div>\n\n<div style=\"width: 100%; height:300px;\">\n    <tree-root #tree [nodes]=\"nodes\" [options]=\"options\" (onMoveNode)=\"changeNode($event)\" (onActivate)=\"selectNode($event)\"></tree-root>\n</div>\n\n</div>"

/***/ }),
/* 264 */
/***/ (function(module, exports) {

module.exports = "<div class=\"preview-size\">\n\n    <!--<input [(ngModel)]=\"zoom\" (blur)=\"changeZoom()\">-->\n\n\n    <div class=\"row\">\n        <div class=\"col-xs-7\">\n            <div class=\"dropdown mobile-size\" role=\"menu\">\n                <!--{{getStateById('root').width}}*{{getStateById('root').height}}-->\n                <div style=\"padding:3px; padding-left: 0px; padding-top: 0;\" class=\"canvas-size\">\n                    <div class=\"properties-wrap\" style=\"width:42%;\">\n                        <span class=\"properties-text\">W:</span>\n                        <input class=\"properties-padding \" type=\"number\" [(ngModel)]=\"rootWidth\" (change)=\"changeW(event)\">\n                    </div>\n                    <div class=\"properties-wrap\" style=\"width:42%;\">\n                        <span class=\"properties-text\">H:</span>\n                        <input class=\"properties-padding \" type=\"number\" [(ngModel)]=\"rootHeight\" (change)=\"changeH(event)\">\n                    </div>\n\n                    <button type=\"button\" (click)=\"clickRootSizeToggle()\">\n                                        <img class=\"ic-mobile\" src=\"assets/images/ic_size.png\">\n                                    </button>\n                    <div class=\"dropdown-menu\" style=\"margin-left:20px;\" [hidden]=\"!showRootSize\">\n\n                        <div class=\"root-size \" (click)=\"changeRootSize(1440,2960)\">\n                            <img style=\" max-width:15px;\" class=\"img-responsive\" src=\"assets/images/ic_galaxy_s7.png\"> Galaxy S8\n                            <br><b>1440*2960</b></div>\n\n                        <div class=\"root-size \" (click)=\"changeRootSize(1440,2560)\">\n                            <img style=\" max-width:15px;\" class=\"img-responsive\" src=\"assets/images/ic_galaxy_s7.png\"> Galaxy S7\n                            <br><b>1440*2560</b></div>\n\n                        <div class=\"root-size \" (click)=\"changeRootSize(1080,1920)\">\n                            <img style=\" max-width:15px;\" class=\"img-responsive\" src=\"assets/images/ic_galaxy_s5.png\"> Galaxy S5\n                            <br><b>1080*1920</b></div>\n\n                        <div class=\"root-size \" (click)=\"changeRootSize(1600,2560)\">\n                            <img style=\" max-width:18px; margin-left:12px; margin-top:2px;\" class=\"img-responsive\" src=\"assets/images/ic_galaxy_note.png\"> Galaxy Note 10.1\n                            <br><b>1600*2560</b></div>\n\n                        <div class=\"root-size \" (click)=\"changeRootSize(720,1280)\">\n                            <img style=\" max-width:15px;\" class=\"img-responsive\" src=\"assets/images/ic_galaxy_s3.png\"> Galaxy S3\n                            <br><b>720*1280</b></div>\n                    </div>\n\n                </div>\n            </div>\n        </div>\n        <div class=\"col-xs-5\" style=\"width:40%; padding:0;\">\n            <div class=\"dropdown\" role=\"menu\">\n                <button type=\"button\" (click)=\"clickZoomToggle()\">{{zoomLevel}}%</button>\n                <div class=\"dropdown-menu dropdown-menu-padding\" [hidden]=\"!showZoom\">\n                    <div (click)=\"changeZoom(10)\">10%</div>\n                    <div (click)=\"changeZoom(15)\">15%</div>\n                    <div (click)=\"changeZoom(20)\">20%</div>\n                    <div (click)=\"changeZoom(25)\">25%</div>\n                    <div (click)=\"changeZoom(50)\">50%</div>\n                    <div (click)=\"changeZoom(75)\">75%</div>\n                    <div (click)=\"changeZoom(100)\">100%</div>\n                </div>\n            </div>\n        </div>\n        <!--<div class=\"col-xs-4\">\n            <div class=\"dropdown\" role=\"menu\">\n                <button type=\"button\" data-toggle=\"dropdown\">FullScreen</button>\n                <div class=\"dropdown-menu dropdown-menu-padding\" style=\"margin-left: -20px;\">\n                    <div>FullScreen</div>\n                    <div>ShowStatusBar</div>\n                </div>\n            </div>\n        </div>-->\n    </div>\n\n\n</div>"

/***/ }),
/* 265 */
/***/ (function(module, exports) {

module.exports = "<div [ngStyle]=\"getObjectStyle()\">\n    <img *ngIf=\"objectData.type=='ImageView' \" [src]=\"prefix+applicationFolderPath+ '/'+objectData.dataUrl\" onError=\"this.src='assets/images/ic_preview.png' \" style=\"width:100%;height:100%;\">\n    <p class=\"img-data\" *ngIf=\"objectData.type=='TextView' ||objectData.type=='Button' ||objectData.type=='EditText' \">{{objectData.text}}</p>\n\n\n    <app-lottie-animation-view #lottieView *ngIf=\"objectData.type==='LottieView'\" style=\"width:100%;height:100%;\">\n    </app-lottie-animation-view>\n\n    <video #videoView *ngIf=\"objectData.type==='VideoView'\" [src]=\"prefix+applicationFolderPath+ '/'+objectData.dataUrl\" onError=\"this.src='assets/images/ic_video.png' \" autoplay loop style=\"width:100%;height:100%;\">\n    </video>\n\n</div>\n<app-preview-object [objectData]=\"aObject \" *ngFor=\"let aObject of objectData.children \"></app-preview-object>"

/***/ }),
/* 266 */
/***/ (function(module, exports) {

module.exports = "<div #myPreview (mousemove)=\"mouseOver($event)\" (mousedown)=\"mouseDown($event)\" (mouseup)=\"mouseUp($event)\" class=\"noselect\" (window:keydown)=\"keyDown($event)\" (window:keyup)=\"keyUp($event)\">\n    <div (window:resize)=\"onResize($event)\" *ngIf=\"activityData\">\n        <div #previewScreen *ngFor=\"let aObject of activityData.objectList\" [ngStyle]=\"getCenterStyle()\">\n            <app-preview-object [objectData]=\"aObject\"></app-preview-object>\n            <div [ngStyle]=\"getSelectedObjectStyle()\">\n                <div class=\"preview-dot dot-1\" (mousedown)=\"resizeDown($event,0)\" *ngIf=\"!isRoot()\"></div>\n                <div class=\"preview-dot dot-2\" (mousedown)=\"resizeDown($event,1)\" *ngIf=\"!isRoot()\"></div>\n                <div class=\"preview-dot dot-3\" (mousedown)=\"resizeDown($event,2)\" *ngIf=\"!isRoot()\"></div>\n                <div class=\"preview-dot dot-4\" (mousedown)=\"resizeDown($event,3)\" *ngIf=\"!isRoot()\"></div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),
/* 267 */
/***/ (function(module, exports) {

module.exports = "<div class=\"stage-list\">\n\n    <div *ngIf=\"stageList\">\n        <div style=\"overflow: hidden;overflow: auto; max-height: 60px; padding-left:10px;\">\n            <div class=\"stage-list-wrap\" style=\"float: left\" *ngFor=\"let aStage of stageList\" (click)=\"clickSelectStage(aStage)\">\n                <div class=\"stage-current tab-class\" *ngIf=\"currentSelectedStage.id==aStage.id\">{{aStage.name}}</div>\n                <div class=\"stage-notcurrent tab-class\" *ngIf=\"currentSelectedStage.id!=aStage.id\">{{aStage.name}}</div>\n                <div class=\"btn-delete\"><i class=\"fa fa-trash-o\"></i></div>\n            </div>\n            <button class=\"btn-new-stage\" (click)=\"clickNewStage()\"><i class=\"fa fa-plus\"></i></button>\n        </div>\n    </div>\n\n    <div class=\"stage-line\"></div>\n\n</div>"

/***/ }),
/* 268 */
/***/ (function(module, exports) {

module.exports = "<!--<nav>\n    <a routerLink=\"/init\" routerLinkActive=\"active\">Init</a>\n    <a routerLink=\"/setting\" routerLinkActive=\"active\">Setting</a>\n    <a routerLink=\"/new-application\" routerLinkActive=\"active\">New Application</a>\n    <a routerLink=\"/application/folderPath\" routerLinkActive=\"active\">Application</a>\n    <a routerLink=\"/activity/folderPath/activityId\" routerLinkActive=\"active\">Activity</a>\n</nav>-->\n<router-outlet></router-outlet>"

/***/ }),
/* 269 */
/***/ (function(module, exports) {

module.exports = "<div class=\"activities-top\">\n    <p>{{applicationData.activityList.length}} Activities </p>\n</div>\n\n<!--<div class=\"home-tag-wrap\">\n    <div class=\"home-tag\">\n        <img src=\"assets/images/homebutton.png\" />\n    </div>\n    <p>Home</p>\n</div>-->\n\n<div class=\"list-scroll\">\n    <div class=\"col-wrap \">\n        <div *ngFor=\"let activity of applicationData.activityList\" class=\"col-3\">\n\n            <div class=\"list-box\">\n                <div class=\"list-img\">\n                    <div class=\"btn-home-on\" *ngIf=\"activity.activityId===applicationData.launcherActivityId\">\n                        <p>Home</p>\n                    </div>\n                    <img class=\"preview-img\" [src]=\"prefix+applicationFolderPath+'/'+activity.previewPath\">\n                    <div class=\"list-hover\">\n                        <button (click)=\"clickActivity(activity.activityId)\">Edit</button>\n                        <button (click)=\"clickDuplicateActivity(activity.activityId)\">Duplicate</button>\n                        <button (click)=\"clickDeleteActivity(activity.activityId)\">Delete</button>\n                        <div class=\"btn-home\" (click)=\"clickLauncherActivity(activity.activityId)\"></div>\n                    </div>\n\n                </div>\n\n                <div class=\"list-text\">\n                    <div class=\"list-text-title\">\n                        <input type=\"text\" class=\"activity-name\" [(ngModel)]=\"activity.activityName\" (blur)=\"onChange()\" />\n                    </div>\n                    <div class=\"list-text-updated\">\n                        {{activity.updatedAt | date:'medium'}}\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n        <div class=\"col-3 list-new-wrap\">\n\n            <div class=\"list-box\">\n\n                <div class=\"list-img\">\n                    <img width=\"100px\" height=\"150px\">\n\n                </div>\n\n                <div class=\"list-text\">\n                    <div class=\"list-text-title\">\n                        <h4>list text title</h4>\n                    </div>\n                    <div class=\"list-text-updated\">\n                        list text updated\n                    </div>\n                </div>\n\n            </div>\n\n\n\n\n            <button class=\"list-new\" (click)=\"clickNewActivity()\">+</button>\n\n\n        </div>\n\n    </div>\n</div>"

/***/ }),
/* 270 */
/***/ (function(module, exports) {

module.exports = "<div style=\"padding:15px;\">\n\n    <div class=\"btn-icon\" align=\"center\">\n\n        <img [src]=\"prefix+applicationFolderPath+'/'+applicationData.iconPath\" width=\"100px\" height=\"100px\">\n        <button class=\"btn-icon-edit\" (click)=\"clickIcon()\"><i class=\"fa fa-edit\"></i></button>\n    </div>\n\n    <div style=\"margin-top: 20px;\" align=\"center\">\n\n        <input type=\"text\" class=\"project-edit\" [(ngModel)]=\"applicationData.applicationName\" (blur)=\"onChange()\" />\n        <input type=\"text\" class=\"project-path-edit\" [(ngModel)]=\"applicationData.applicationId\" (blur)=\"onChange()\" />\n    </div>\n\n\n       <!--<button class=\"btn-resource\" (click)=\"clickResource()\">Add Resource</button>-->\n\n</div>"

/***/ }),
/* 271 */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"applicationData\">\n\n    <!-- nav bar top -->\n    <div class=\"navbar\">\n        <button class=\"btn-back\" (click)=\"clickBack()\">◄ Back</button>\n\n\n\n        <div class=\"nav-right\">\n            <app-device-status [sendStatus]=\"sendStatus\"></app-device-status>\n        </div>\n    </div>\n\n\n\n    <div *ngIf=\"!resourceAppDialog\" class=\"connect-wrap\">\n\n        <div class=\"howtoconnect\" id=\"#how\">\n            <span><b><a target=\"_blank\" href=\"http://www.vxmaker.com\">How to connect</a></b></span>\n        </div>\n\n        <a href=\"#how\"><i class=\"fa fa-close\" ></i></a>\n\n    </div>\n\n    <!-- navbar top finish -->\n\n    <!-- list-wrap -->\n\n    <div class=\"list-wrap\">\n\n        <div class=\"list-left\">\n            <app-application-info [applicationData]=\"applicationData\" [applicationFolderPath]=\"applicationFolderPath\" (onChangeData)=\"onChangeData($event)\" (onClickChangeIcon)=\"onClickChangeIcon($event)\"></app-application-info>\n        </div>\n        <div class=\"list-right\">\n            <div>\n                <app-activity-list *ngIf=\"applicationData\" [applicationData]=\"applicationData\" [applicationFolderPath]=\"applicationFolderPath\" (onChangeActivityData)=\"onChangeData($event)\" (onClickActivity)=\"clickActivity($event)\" (onClickNewActivity)=\"clickNewActivity($event)\"\n                    (onClickDuplicatewActivity)=\"clickDuplicateActivity($event)\" (onClickDeleteActivity)=\"clickDeleteActivity($event)\" (onClickLauncherActivity)=\"onClickLauncherActivity($event)\"></app-activity-list>\n            </div>\n        </div>\n\n        <app-resource #resourceAppDialog (onSelectFile)=\"onSelectFile($event)\"></app-resource>\n\n    </div>\n    <!-- list-wrap finish -->\n</div>"

/***/ }),
/* 272 */
/***/ (function(module, exports) {

module.exports = "<div class=\"device-status\">\n\n    <!--<p class=\"device-connected\" *ngIf=\"deviceList.length > 0\">\n        Device Connected\n    </p>-->\n\n    deviceList.length: {{deviceList.length}}\n    <p class=\"device-unconnected\" *ngIf=\"deviceList.length == 0\">\n        Please connect the device. <span (click)=\"clickHowToConnect('http://vxmaker.com')\">How to connect <i class=\"fa fa-question-circle-o\"></i></span>\n    </p>\n\n    <p [hidden]=\"sendStatus\" class=\"btn-preview nav-btn\" (click)='clickSendFile()'>\n        <i class=\"fa fa-mobile\"></i>Send\n    </p>\n\n    <p [hidden]=\"sendStatus\" class=\"btn-preview nav-btn\" (click)='clickSaveFile()'>\n        <i class=\"fa fa-mobile\"></i>Save\n    </p>\n\n    <p class=\"btn-preview nav-btn\" (click)='clickExportCode()'>\n        <i class=\"fa fa-mobile\"></i>Code\n    </p>\n    <p class=\"btn-preview nav-btn\" (click)='clickExportGuide()'>\n        <i class=\"fa fa-mobile\"></i>Guide\n    </p>\n\n\n    <!--<div *ngIf=\"deviceList.length > 0\">\n      \n        <div class=\"btn-preview nav-btn nav-btn-sending\" >\n            <div class=\"loader10\"></div>\n        </div>\n    </div>-->\n\n\n    <!--<p class=\"btn-preview nav-btn\">\n        <span><img src=\"assets/images/ic_preview_2.png\"  class=\"nav-btn-img-2\"/></span>Preview\n    </p>-->\n\n    <!--<p class=\"btn-source nav-btn\">\n        <span><img src=\"assets/images/ic_source.png\" class=\"nav-btn-img\"/></span>Source\n    </p>-->\n\n</div>"

/***/ }),
/* 273 */
/***/ (function(module, exports) {

module.exports = "<div class=\"popup-wrap\" *ngIf=\"visibility\">\n    <div id=\"popup1\" class=\"overlay\" (click)=\"hideDialog()\">\n        <div class=\"popup\" (click)=\"nothing($event)\">\n\n\n            <div class=\"resource-nav\">\n                <button class=\"btn-image btn-select btn-tab\" style=\"color:#46a2ba;\" *ngIf=\"tab=='image'\" (click)=\"clickTab($event,'image')\">Image</button>\n                <button class=\"btn-image  btn-tab\" *ngIf=\"tab=='file'\" (click)=\"clickTab($event,'image')\">Image</button>\n                \n                \n                <button class=\"btn-file btn-select btn-tab\" style=\"color:#46a2ba;\" *ngIf=\"tab=='file'\" (click)=\"clickTab($event,'file')\">File</button>\n                <button class=\"btn-file btn-tab\" *ngIf=\"tab=='image'\" (click)=\"clickTab($event,'file')\">File</button>\n            \n\n                <div class=\"resource-add\">\n                    <button *ngIf=\"tab=='image'\" (click)=\"clickNewFile($event,'image')\">+ New Image</button>\n                    <button *ngIf=\"tab=='file'\" align=\"left\" (click)=\"clickNewFile($event,'file')\">+ New File</button>\n                </div>\n            </div>\n\n\n\n            <div class=\"resource-wrap\">\n                <div *ngIf=\"tab=='image'\">\n                    <h3>Uploaded Image</h3>\n                    <div class=\"image-list\">\n                        <div *ngFor=\"let imageUrl of imageList\" class=\"bg-img\">\n                            <img [src]=\"prefix+applicationFolderPath+'/'+imageUrl\" (click)=\"clickFile(imageUrl)\">\n                        </div>\n                    </div>\n                </div>\n\n                <div *ngIf=\"tab=='file'\">\n                    <h3>Uploaded File</h3>\n                    <div class=\"file-list\" *ngFor=\"let fileUrl of fileList\" (click)=\"clickFile(fileUrl)\">\n                        {{fileUrl}}\n                    </div>\n\n                </div>\n            </div>\n\n            <div class=\"resource-footer\">\n                <button>Delete</button>\n                <div class=\"resource-apply\">\n                    <button (click)=\"hideDialog()\">Cancel</button>\n                    <button>Apply</button>\n                </div>\n\n            </div>\n\n\n\n        </div>\n    </div>\n</div>"

/***/ }),
/* 274 */
/***/ (function(module, exports) {

module.exports = "<p>\n  guide works!\n</p>\n"

/***/ }),
/* 275 */
/***/ (function(module, exports) {

module.exports = "<div id=\"center\" class=\"menu-main-list hc vc\">\n    <div align=\"center\"><img class=\"main-img\" src=\"assets/images/ic_logo_main.png\" /></div>\n    <!--menu list -->\n    <div class=\"menu-list\">\n        <div><img src=\"assets/images/ic_new.png\"> <button (click)=\"clickNewApplication()\">Start a new VXM project</button></div>\n        <div><img src=\"assets/images/ic_open.png\"> <button (click)=\"clickOpenApplication()\">Open an exisiting VXM project</button></div>\n        <div><img src=\"assets/images/ic_howtouse.png\"> <button (click)=\"clickHelp()\">How to use</button></div>\n        <div><img src=\"assets/images/ic_setting_white.png\"> <button (click)=\"clickSettingApplication()\">Settings</button></div>\n    </div>\n    <!-- menu list finish -->\n</div>"

/***/ }),
/* 276 */
/***/ (function(module, exports) {

module.exports = "<div id=\"container\" class=\"bg-menu\">\n    <div class=\"menu-list\">\n\n        <app-recent-project></app-recent-project>\n    </div>\n    <div class=\"menu-main\">\n        <app-init-menu></app-init-menu>\n    </div>\n    <div class=\"version-info\">Version 1.0</div>\n    <div class=\"go-download\">\n        <p>Download the app to see your work immediately ! ▸▸</p>\n        <img src=\"assets/images/btn_download.png\" (click)=\"clickDownloadApp('https://play.google.com/store/apps/details?id=com.altamirasoft.baby_hub_android')\" />\n    </div>\n</div>"

/***/ }),
/* 277 */
/***/ (function(module, exports) {

module.exports = "<div  [hidden]=\"!(recentProjects!=null && recentProjects.length>0)\">\n    <p class=\"recent-project\">Recent projects</p>\n    <div class=\"recent-project-list\" *ngFor=\"let application of recentProjects\" (click)=\"clickApplication(application.applicationFolderPath)\">\n        <h5>{{application.applicationName}}</h5>\n        <p>{{application.applicationFolderPath}}</p>\n\n    </div>\n</div>"

/***/ }),
/* 278 */
/***/ (function(module, exports) {

module.exports = "<div class=\"new-project-top\" style=\"padding:25px;\">\n    <button class=\"btn-back\" (click)=\"clickBack()\">◄ back</button></div>\n<div>\n    <div class=\"ic-newproject\">\n        <img src=\"assets/images/ic_newproject.png\">\n    </div>\n    <div class=\"application-name\">\n        <h5>Application Name</h5>\n        <input class=\"form-control\" type=\"text\" [(ngModel)]=\"applicationName\" />\n        <h5 style=\"margin-top: 15px; margin-bottom: 5px;\">Project Folder </h5>\n        <div class=\"project-folder\">\n            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"workspaceFolderPath\" />\n            <button class=\"btn-change\" (click)=\"clickChangeFolder()\">···</button>\n        </div>\n    </div>\n\n</div>\n<div class=\"btn-new-save\">\n    <button (click)=\"clickNext()\">next ►</button>\n</div>"

/***/ }),
/* 279 */
/***/ (function(module, exports) {

module.exports = "<p>\n  setting works!\n</p>\n"

/***/ }),
/* 280 */
/***/ (function(module, exports) {

module.exports = "<p>\n  window-proxy works!\n</p>\n"

/***/ }),
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 313 */,
/* 314 */,
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(122);


/***/ })
],[315]);
//# sourceMappingURL=main.bundle.js.map