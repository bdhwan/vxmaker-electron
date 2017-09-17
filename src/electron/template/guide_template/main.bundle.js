webpackJsonp(["main"],{

/***/ "../../../../../src lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src lazy recursive";

/***/ }),

/***/ "../../../../../src/app/activity/activity.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".activity-wrap {\n    background: #ff0000;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n}\n\n.activity-root {\n    position: absolute;\n    background: #dde3eb;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 998;\n    padding-top: 50px;\n}\n\n.activity-left {\n    float: left;\n    width: 288px;\n    height: 100%;\n    background: #ebebeb;\n    overflow-y: scroll;\n}\n\n.activity-canvas {\n    float: left;\n    overflow-x: scroll;\n    overflow-y: scroll;\n}\n\n.activity-right {\n    float: right;\n    width: 320px;\n    height: 100%;\n    background: #f4f4f4;\n    overflow-y: scroll;\n}\n\n.activity-nav {\n    z-index: 999;\n    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);\n    background-color: #fff;\n    position: relative;\n}\n\n.activity-nav .navbar-right {\n    float: right;\n}\n\n.nav-page input {\n    width: 100%;\n    text-align: left;\n    height: 49px;\n    padding-left: 20px;\n    background-color: transparent;\n    font-weight: 600;\n    font-size: 16px;\n    border: none;\n    padding-right: 10px;\n    color: #454545;\n}\n\n.nav-page input:focus {\n    background: #f9f9f9;\n}\n\n.nav-page {\n    min-width: 300px;\n}\n\n.nav-project button {\n    height: 49px;\n    background-color: transparent;\n    border: none;\n    font-weight: 600;\n    font-size: 16px;\n    width: 288px;\n    border-right: 1px solid #ececec;\n}\n\n.nav-project button:hover {\n    cursor: pointer;\n    color: #46abca;\n}\n\n.nav-project .open-activity {\n    width: 50px;\n    height: 50px;\n    position: absolute;\n    left: 0;\n    border: none;\n    color: #454545;\n}\n\n.selected-tab {\n    background: #46a2ba;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/activity.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"activity-wrap\" (window:resize)=\"onResize($event)\">\n\n\n    <!-- activity navbar -->\n\n    <nav id=\"topSide\" class=\"navbar navbar-default activity-nav\" *ngIf=\"activityMetaData\" style=\"height:50px;\">\n        <div class=\"container-fluid\" style=\"padding-left: 0;\">\n            <div style=\"float:left;\" class=\"nav-project\">\n                <button class=\"open-activity\" (click)=\"toggleActivityList()\">\n                  <i class=\"fa fa-navicon\" style=\"font-size:24px\"></i>\n                </button>\n\n                <button (click)=\"clickRoot()\">{{applicationData.applicationName}}</button>\n\n            </div>\n\n            <div class=\"dropdown nav-page\" role=\"menu\" style=\"float:left;\">\n                <input type=\"text\" [(ngModel)]=\"activityMetaData.activityName\" (blur)=\"changeActivityName()\" />\n            </div>\n\n            <div class=\"nav navbar-nav navbar-right\">\n                <app-device-status [sendStatus]=\"sendStatus\"></app-device-status>\n            </div>\n        </div>\n    </nav>\n\n    <!-- activity navbar @ -->\n\n\n    <!-- activity content -->\n\n    <div class=\"activity-root\">\n\n\n        <!-- activity left-->\n\n        <div class=\"activity-left\">\n\n            <div>\n                <button [ngClass]=\"isOpenActivityList?'selected-tab':''\" (click)=\"setActivityListTab(true)\">Application</button>\n                <button [ngClass]=\"!isOpenActivityList?'selected-tab':''\" (click)=\"setActivityListTab(false)\">Layer</button>\n            </div>\n\n\n            <div *ngIf=\"applicationData\" [hidden]=\"!isOpenActivityList\">\n                <app-application-info [prefix]=\"prefix\" [viewMode]=\"'activity'\" [applicationData]=\"applicationData\" [applicationFolderPath]=\"applicationFolderPath\"></app-application-info>\n                <app-activity-list #activityList [prefix]=\"prefix\" [viewMode]=\"'activity'\" [applicationData]=\"applicationData\" [applicationFolderPath]=\"applicationFolderPath\" [currentActivityId]=\"activityId\"></app-activity-list>\n            </div>\n\n            <div [hidden]=\"isOpenActivityList\">\n                <app-object-tree #objectTree [prefix]=\"prefix\" (onChangeNode)=\"onChangeNodeFromTree($event)\" (onClickNewFile)=\"clickNewFile($event)\" (onSelectNode)=\"onSelectNodeFromTree($event)\"></app-object-tree>\n                <app-object-new #objectNew [prefix]=\"prefix\" (onShowResourceDialog)=\"onShowResourceDialog($event)\" (onClickNewObject)=\"clickNewObject($event)\" (onChangeTreeData)=\"changeTreeData($event)\"></app-object-new>\n            </div>\n        </div>\n\n        <!-- activity left@-->\n\n        <!-- activity canvas-->\n\n        <div class=\"activity-canvas\" [style.width]=\"getPreviewWidth()\" [style.height]=\"getPreviewHeight()\">\n            <app-stage-list #stageList [viewMode]=\"'activity'\"></app-stage-list>\n            <app-preview #previewCanvas [prefix]=\"prefix\" [viewMode]=\"'activity'\" (onSelectNodeFromOther)=\"onSelectNodeFromOther($event)\" (onShowResourceDialog)=\"onShowResourceDialog($event)\"></app-preview>\n\n        </div>\n\n        <!-- activity canvas@-->\n\n\n        <!-- activity right-->\n\n        <div class=\"activity-right\" id=\"rightSide\">\n\n            <app-preview-size [viewMode]=\"'activity'\" #previewSize></app-preview-size>\n            <app-object-property [viewMode]=\"'activity'\" [applicationFolderPath]=\"applicationFolderPath\" [prefix]=\"prefix\" #objectProperty (onShowResourceDialog)=\"onShowResourceDialog($event)\" (onChangeTreeData)=\"changePropertyData($event)\"></app-object-property>\n            <app-event-list [viewMode]=\"'activity'\" #eventList></app-event-list>\n            <app-event-detail-stage-change [viewMode]=\"'activity'\" #eventDetailStageChange></app-event-detail-stage-change>\n            <app-event-detail-start-activity [viewMode]=\"'activity'\" #eventDetailStartActivity></app-event-detail-start-activity>\n            <app-event-detail-finish-activity [viewMode]=\"'activity'\" #eventDetailFinishActivity></app-event-detail-finish-activity>\n\n        </div>\n\n        <!-- activity right@-->\n\n    </div>\n\n\n\n</div>\n\n<app-resource #resourceDialog (onSelectFile)=\"onSelectFile($event)\" [viewMode]=\"'activity'\"></app-resource>\n<app-event-generator #eventGenerator></app-event-generator>"

/***/ }),

/***/ "../../../../../src/app/activity/activity.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__activity_object_tree_object_tree_component__ = __webpack_require__("../../../../../src/app/activity/object-tree/object-tree.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__activity_object_new_object_new_component__ = __webpack_require__("../../../../../src/app/activity/object-new/object-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__activity_object_property_object_property_component__ = __webpack_require__("../../../../../src/app/activity/object-property/object-property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__activity_preview_preview_component__ = __webpack_require__("../../../../../src/app/activity/preview/preview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__activity_preview_size_preview_size_component__ = __webpack_require__("../../../../../src/app/activity/preview-size/preview-size.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__activity_stage_list_stage_list_component__ = __webpack_require__("../../../../../src/app/activity/stage-list/stage-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_resource_resource_component__ = __webpack_require__("../../../../../src/app/common/resource/resource.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__activity_event_list_event_list_component__ = __webpack_require__("../../../../../src/app/activity/event-list/event-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__activity_event_detail_stage_change_event_detail_stage_change_component__ = __webpack_require__("../../../../../src/app/activity/event-detail-stage-change/event-detail-stage-change.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__activity_event_detail_start_activity_event_detail_start_activity_component__ = __webpack_require__("../../../../../src/app/activity/event-detail-start-activity/event-detail-start-activity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__activity_event_detail_finish_activity_event_detail_finish_activity_component__ = __webpack_require__("../../../../../src/app/activity/event-detail-finish-activity/event-detail-finish-activity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__application_activity_list_activity_list_component__ = __webpack_require__("../../../../../src/app/application/activity-list/activity-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__activity_event_generator_event_generator_component__ = __webpack_require__("../../../../../src/app/activity/event-generator/event-generator.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angular2_uuid__ = __webpack_require__("../../../../angular2-uuid/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__service_message_event_service__ = __webpack_require__("../../../../../src/app/service/message-event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_rxjs_add_operator_switchMap__);
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
        this.isOpenActivityList = false;
        this.isReadyToRender = false;
        this.imageList = [];
        this.fileList = [];
        this.previewCss = {};
        this.isReadyToRender = false;
        this.prefix = __WEBPACK_IMPORTED_MODULE_20__environments_environment__["a" /* environment */].imgPrefix;
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
    ActivityComponent.prototype.ngOnDestroy = function () {
        if (this.messageListener) {
            this.messageListener.unsubscribe();
        }
    };
    ActivityComponent.prototype.registerStringBroadcast = function () {
        var _this = this;
        this.messageListener = this.broadcaster.on('activity')
            .subscribe(function (message) {
            var kind = message.kind;
            console.log("message received!! = " + kind);
            var activityId = message.activityId;
            if (kind === 'save') {
                _this.onClickSave();
            }
            else if (kind === 'save-refresh-activity') {
                _this.notifySelectedObjectChanged();
                _this.onClickSave();
            }
            else if (kind === 'send-device') {
                _this.onClickSendDevice(null);
            }
            else if (kind === 'delete-object') {
                var objectId = message.objectId;
                if (objectId !== 'root') {
                    _this.appDataService.deleteObject(objectId);
                    _this.onClickSave();
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
                        _this.onClickSave();
                    }
                }
            }
            else if (kind === 'delete-event') {
                _this.appDataService.deleteTriggerEventByTriggerEventId(message.triggerEventId);
                _this.notifySelectedObjectChanged();
                _this.onClickSave();
            }
            else if (kind === 'select-psd') {
                var selectedPSD = _this.appDataService.selectPsdFile();
                if (selectedPSD) {
                    _this.parsePsd(selectedPSD);
                }
            }
            else if (kind === 'open-url') {
                var targetUrl = message.url;
                _this.appDataService.openUrl(targetUrl);
            }
            else if (kind === 'select-object') {
                var selectedObject = _this.appDataService.findObjectById(message.objectId);
                _this.onSelectNodeFromOther(message.objectId);
                _this.appDataService.setSelectedObject(selectedObject);
                _this.notifySelectedObjectChanged();
            }
            else if (kind === 'code-export') {
                _this.saveProcessAsync().then(function (result) {
                    _this.router.navigate(['/code-export', _this.applicationFolderPath]);
                });
            }
            else if (kind === 'go-detail-activity') {
                _this.clickActivity(activityId);
            }
            else if (kind === 'delete-activity') {
                _this.clickDeleteActivity(activityId);
            }
            else if (kind === 'duplicate-activity') {
                _this.clickDuplicateActivity(activityId);
            }
            else if (kind === 'new-activity') {
                _this.clickNewActivity();
            }
            else if (kind === 'set-launcher-activity') {
                _this.onClickLauncherActivity(activityId);
            }
            else if (kind === 'on-change-data') {
            }
            else if (kind === 'change-icon') {
                _this.onClickChangeIcon();
            }
            else if (kind === 'complete-event') {
                _this.onCompleteEvent(null);
            }
            else if (kind === 'close-event') {
                _this.onCloseEvent();
            }
            else if (kind === 'new-event') {
                _this.onNewEvent();
            }
            else if (kind === 'detail-event') {
                var detailEvent = message.event;
                _this.onClickDetailEvent(detailEvent);
            }
            else if (kind === 'new-after-animation') {
                var implEventId = message.implEventId;
                _this.onNewAfterAnimationEvent(implEventId);
            }
            else if (kind === 'select-file') {
                var dataUrl = message.dataUrl;
                var target = message.target;
                _this.resourceDialog.setSelectedFileUrl(dataUrl);
                _this.resourceDialog.showDialog(target);
            }
            else if (kind === 'select-stage') {
                var stage = message.stage;
                _this.onSelectStage(stage);
            }
            else if (kind === 'delete-stage') {
                var stage = message.stage;
                _this.onDeleteStage(stage);
            }
            else if (kind === 'new-stage') {
                _this.onNewStage();
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
            this.objectTreeComponent.selectObjectNode(newObject);
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
        this.reloadActivityData();
    };
    ActivityComponent.prototype.reloadActivityData = function () {
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
    ActivityComponent.prototype.checkEmptyActivityData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("check empty");
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
            console.log("check stage list = " + JSON.stringify(_this.activityData.stageList));
            resolve(true);
        });
    };
    ActivityComponent.prototype.clickText = function () {
        console.log("clickText");
        this.objectTreeComponent.expandAll();
    };
    ActivityComponent.prototype.toggleActivityList = function () {
        console.log("toggleActivityList");
        this.isOpenActivityList = !this.isOpenActivityList;
    };
    ActivityComponent.prototype.setActivityListTab = function (value) {
        this.isOpenActivityList = value;
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
        console.log("onCompleteEvent");
        this.eventList.onChangeData();
        this.onCloseEvent();
    };
    ActivityComponent.prototype.clickRoot = function () {
        var _this = this;
        this.saveProcessAsync().then(function (result) {
            _this.router.navigate(['/application', _this.applicationFolderPath]);
        });
    };
    ActivityComponent.prototype.clickBack = function () {
        var _this = this;
        //capture and go back
        this.saveProcessAsync().then(function (result) {
            _this.zone.run(function () {
                _this.location.back();
            });
        });
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
        var _this = this;
        return new Promise(function (resolve, reject) {
            var self = _this;
            var fileName = 'preview/' + self.activityId + '.jpg';
            var filePath = self.applicationFolderPath + '/' + fileName;
            _this.appDataService.captureScreen(288, 120, window.innerWidth - 288 - 320, window.innerHeight - 80 * 2, filePath).then(function (result) {
                // this.savePreviewImagePath(fileName);
                resolve(fileName);
            });
        });
    };
    ActivityComponent.prototype.savePreviewImagePath = function (filePath) {
        for (var i = 0; i < this.applicationData.activityList.length; i++) {
            var activity = this.applicationData.activityList[i];
            if (activity.activityId === this.activityId) {
                activity.previewPath = filePath;
            }
        }
    };
    ActivityComponent.prototype.onClickSave = function () {
        this.saveProcessAsync();
    };
    ActivityComponent.prototype.saveProcessAsync = function () {
        var self = this;
        this.saveStatus = true;
        return new Promise(function (resolve, reject) {
            self.captureScreen().then(function (result) {
                self.activityMetaData.previewPath = result;
                self.saveApplicationData();
                self.saveActivityData();
                self.saveStatus = false;
                resolve(true);
            });
        });
    };
    ActivityComponent.prototype.onClickSendDevice = function (value) {
        this.sendStatus = true;
        var self = this;
        this.saveProcessAsync().then(function (result) {
            self.appDataService.sendFileToDevice();
            self.sendStatus = false;
        });
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
            id: 'stage_' + __WEBPACK_IMPORTED_MODULE_17_angular2_uuid__["UUID"].UUID(),
            name: 'stage-' + this.activityData.stageList.length
        };
        this.activityData.stageList.push(stage);
        var allStateList = this.appDataService.getAllSelectedState();
        for (var i = 0; i < allStateList.length; i++) {
            var aState = Object.assign({}, allStateList[i]);
            aState.stageId = stage.id;
            aState.id = 'state_' + __WEBPACK_IMPORTED_MODULE_17_angular2_uuid__["UUID"].UUID();
            this.activityData.stateList.push(aState);
        }
        return stage;
    };
    ActivityComponent.prototype.onSelectStage = function (target) {
        console.log("onSelectStage = " + JSON.stringify(target));
        this.appDataService.setSelectedStage(target);
        this.notifySelectedObjectChanged();
    };
    ActivityComponent.prototype.onDeleteStage = function (target) {
        console.log("onDeleteStage = " + target);
        this.appDataService.setSelectedStageByStageId('rootStage');
        this.appDataService.deleteStage(target.id);
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
            if (selectedObject.type === 'LottieAnimationView') {
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
    ActivityComponent.prototype.clickNewActivity = function () {
        console.log("click new Activity");
        var now = new Date().getTime();
        var activityId = 'activity_' + __WEBPACK_IMPORTED_MODULE_17_angular2_uuid__["UUID"].UUID();
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
    ActivityComponent.prototype.clickActivity = function (activityId) {
        var _this = this;
        console.log("will go = " + activityId);
        this.saveProcessAsync().then(function (result) {
            _this.activityList.refreshTimeStamp();
            _this.router.navigate(['/activity', _this.applicationFolderPath, activityId]);
            _this.activityId = activityId;
            _this.appDataService.initActivityId(_this.activityId);
            _this.reloadActivityData();
        });
    };
    ActivityComponent.prototype.clickDeleteActivity = function (activityId) {
        var result = confirm('will you delete? =' + activityId);
        if (result) {
            var index = this.findActivityPosition(activityId);
            this.applicationData.activityList.splice(index, 1);
            this.appDataService.deleteActivity(activityId);
            this.clickSave();
            if (this.activityId === activityId) {
                this.clickRoot();
            }
        }
    };
    ActivityComponent.prototype.findActivityPosition = function (activityId) {
        for (var i = 0; i < this.applicationData.activityList.length; i++) {
            if (this.applicationData.activityList[i].activityId === activityId) {
                return i;
            }
        }
    };
    ActivityComponent.prototype.clickDuplicateActivity = function (activityId) {
        var index = this.findActivityPosition(activityId);
        var now = new Date().getTime();
        var newActivityId = 'activity_' + __WEBPACK_IMPORTED_MODULE_17_angular2_uuid__["UUID"].UUID();
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
    ActivityComponent.prototype.onClickLauncherActivity = function (activityId) {
        this.applicationData.launcherActivityId = activityId;
        this.appDataService.saveApplicationData(this.applicationData);
    };
    ActivityComponent.prototype.onClickChangeIcon = function () {
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
    return ActivityComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('objectTree'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__activity_object_tree_object_tree_component__["a" /* ObjectTreeComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__activity_object_tree_object_tree_component__["a" /* ObjectTreeComponent */]) === "function" && _a || Object)
], ActivityComponent.prototype, "objectTreeComponent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('objectNew'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__activity_object_new_object_new_component__["a" /* ObjectNewComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__activity_object_new_object_new_component__["a" /* ObjectNewComponent */]) === "function" && _b || Object)
], ActivityComponent.prototype, "objectNewComponent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('objectProperty'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__activity_object_property_object_property_component__["a" /* ObjectPropertyComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__activity_object_property_object_property_component__["a" /* ObjectPropertyComponent */]) === "function" && _c || Object)
], ActivityComponent.prototype, "objectPropertyComponent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('previewCanvas'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__activity_preview_preview_component__["a" /* PreviewComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__activity_preview_preview_component__["a" /* PreviewComponent */]) === "function" && _d || Object)
], ActivityComponent.prototype, "previewComponent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('resourceDialog'),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_9__common_resource_resource_component__["a" /* ResourceComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__common_resource_resource_component__["a" /* ResourceComponent */]) === "function" && _e || Object)
], ActivityComponent.prototype, "resourceDialog", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('stageList'),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__activity_stage_list_stage_list_component__["a" /* StageListComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__activity_stage_list_stage_list_component__["a" /* StageListComponent */]) === "function" && _f || Object)
], ActivityComponent.prototype, "stageList", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('eventGenerator'),
    __metadata("design:type", typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_15__activity_event_generator_event_generator_component__["a" /* EventGeneratorComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__activity_event_generator_event_generator_component__["a" /* EventGeneratorComponent */]) === "function" && _g || Object)
], ActivityComponent.prototype, "eventGenerator", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('eventList'),
    __metadata("design:type", typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_10__activity_event_list_event_list_component__["a" /* EventListComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__activity_event_list_event_list_component__["a" /* EventListComponent */]) === "function" && _h || Object)
], ActivityComponent.prototype, "eventList", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('eventDetailStageChange'),
    __metadata("design:type", typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_11__activity_event_detail_stage_change_event_detail_stage_change_component__["a" /* EventDetailStageChangeComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__activity_event_detail_stage_change_event_detail_stage_change_component__["a" /* EventDetailStageChangeComponent */]) === "function" && _j || Object)
], ActivityComponent.prototype, "eventDetailStageChange", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('eventDetailStartActivity'),
    __metadata("design:type", typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_12__activity_event_detail_start_activity_event_detail_start_activity_component__["a" /* EventDetailStartActivityComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__activity_event_detail_start_activity_event_detail_start_activity_component__["a" /* EventDetailStartActivityComponent */]) === "function" && _k || Object)
], ActivityComponent.prototype, "eventDetailStartActivity", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('eventDetailFinishActivity'),
    __metadata("design:type", typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_13__activity_event_detail_finish_activity_event_detail_finish_activity_component__["a" /* EventDetailFinishActivityComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__activity_event_detail_finish_activity_event_detail_finish_activity_component__["a" /* EventDetailFinishActivityComponent */]) === "function" && _l || Object)
], ActivityComponent.prototype, "eventDetailFinishActivity", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('previewSize'),
    __metadata("design:type", typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_7__activity_preview_size_preview_size_component__["a" /* PreviewSizeComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__activity_preview_size_preview_size_component__["a" /* PreviewSizeComponent */]) === "function" && _m || Object)
], ActivityComponent.prototype, "previewSize", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('activityList'),
    __metadata("design:type", typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_14__application_activity_list_activity_list_component__["a" /* ActivityListComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_14__application_activity_list_activity_list_component__["a" /* ActivityListComponent */]) === "function" && _o || Object)
], ActivityComponent.prototype, "activityList", void 0);
ActivityComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-activity',
        template: __webpack_require__("../../../../../src/app/activity/activity.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/activity.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_18__service_broadcast_service__["a" /* BroadcastService */], __WEBPACK_IMPORTED_MODULE_19__service_message_event_service__["a" /* MessageEventService */]]
    }),
    __metadata("design:paramtypes", [typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _r || Object, typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _s || Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_16__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_16__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _t || Object, typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_18__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_18__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _u || Object, typeof (_v = typeof __WEBPACK_IMPORTED_MODULE_19__service_message_event_service__["a" /* MessageEventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_19__service_message_event_service__["a" /* MessageEventService */]) === "function" && _v || Object])
], ActivityComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
//# sourceMappingURL=activity.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/event-detail-finish-activity/event-detail-finish-activity.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/event-detail-finish-activity/event-detail-finish-activity.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"selectedTriggerEvent\">\n    <div *ngIf=\"selectedImplementEvent.type=='finishActivity'\">\n        event-detail-finish-activity works!\n\n        <button (click)=\"clickClose()\">back</button>\n    </div>\n\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/activity/event-detail-finish-activity/event-detail-finish-activity.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailFinishActivityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
    function EventDetailFinishActivityComponent(appDataService, broadcaster) {
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
    }
    EventDetailFinishActivityComponent.prototype.ngOnInit = function () {
    };
    EventDetailFinishActivityComponent.prototype.onChangeData = function () {
        this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
        this.selectedImplementEvent = this.appDataService.getSelectedImplementEvent();
    };
    EventDetailFinishActivityComponent.prototype.clickCancel = function () {
        var message = {
            kind: 'close-event'
        };
        this.broadcaster.broadcast(this.viewMode, message);
    };
    return EventDetailFinishActivityComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], EventDetailFinishActivityComponent.prototype, "viewMode", void 0);
EventDetailFinishActivityComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-event-detail-finish-activity',
        template: __webpack_require__("../../../../../src/app/activity/event-detail-finish-activity/event-detail-finish-activity.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/event-detail-finish-activity/event-detail-finish-activity.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _b || Object])
], EventDetailFinishActivityComponent);

var _a, _b;
//# sourceMappingURL=event-detail-finish-activity.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/event-detail-stage-change/event-detail-stage-change.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* The switch - the box around the slider */\n\n.switch {\n    position: relative;\n    display: inline-block;\n    width: 40px;\n    height: 24px;\n}\n\n\n/* Hide default HTML checkbox */\n\n.switch input {\n    display: none;\n}\n\n\n/* The slider */\n\n.slider {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: #ccc;\n    transition: .4s;\n}\n\n.slider:before {\n    position: absolute;\n    content: \"\";\n    height: 16px;\n    width: 16px;\n    left: 4px;\n    bottom: 4px;\n    background-color: white;\n    transition: .4s;\n}\n\ninput:checked+.slider {\n    background-color: #2196F3;\n}\n\ninput:focus+.slider {\n    box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked+.slider:before {\n    -webkit-transform: translateX(26px);\n    transform: translateX(26px);\n}\n\n\n/* Rounded sliders */\n\n.slider.round {\n    border-radius: 34px;\n}\n\n.slider.round:before {\n    border-radius: 50%;\n}\n\n.object-list-wrap {\n   \n    border-bottom: 1px solid #ececec;\n}\n\n.object-list-wrap P {\n    font-size: 12px;\n}\n\n.object-list {\n    overflow: hidden;\n    font-size: 12px;\n}\n\n.object-list-main {\n    float: left;\n}\n\n.object-name {\n    font-size: 12px;\n    width: 75px;\n    overflow: scroll;\n}\n\n.object-preview {\n    background: #fff;\n    border: 1px solid #ececec;\n    margin-left: 5px;\n}\n\n.object-preview:hover {\n    cursor: pointer;\n}\n\n.object-dropdown {\n    margin-top: 15px;\n    padding: 10px;\n    padding-top: 20px;\n    padding-bottom: 10px;\n    border-radius: 3px;\n    background: #fff;\n    position: relative;\n}\n\n.tri {\n    width: 0px;\n    height: 0px;\n    border-top: 10px solid none;\n    border-bottom: 10px solid white;\n    border-right: 15px solid transparent;\n    border-left: 15px solid transparent;\n    position: absolute;\n    top: 0;\n    margin-top: -10px;\n    left: 0;\n    margin-left: 66px;\n}\n\n.object-switch {\n    display: none;\n}\n\n.event-time {\n    overflow: hidden;\n}\n\n.event-time div {\n    width: 50%;\n    float: left;\n}\n\n.event-time input {\n    width: 73px;\n    margin-left: 10px;\n}\n\n.interpolator-select {\n    width: 100%;\n    margin-top: 15px;\n    margin-bottom: 20px;\n}\n\n\n/* 토글버튼 */\n\n\n/*.toggle_button {\n    cursor:pointer;\n    display:block;\n    background:#eee;\n    text-align:center;\n    border:1px solid #ccc;\n}\n#toggle_button,\n#toggle_contents {\n    height:0;\n    overflow:hidden;\n    position:absolute;\n}\n#toggle_button:checked + #toggle_contents {\n    height:auto;\n    position:relative;\n    border:1px solid #ccc;\n    border-top:0;\n    padding:10px;\n}*/\n\n\n/* 토글버튼 @ */\n\n#nav,\n#toggle {\n    display: none;\n}\n\n#toggle:checked+#nav {\n    display: inline-block;\n}\n\n.event-stageChange {\n    overflow: hidden;\n    position: relative;\n    height: 100%;\n    padding-bottom: 108px;\n}\n\n.event-detail {\n    overflow: hidden;\n    background: #f9fafb;\n    padding: 15px;\n}\n\n.event-detail img {\n    width: 28px;\n    float: left;\n}\n\n.event-detail h4 {\n    float: left;\n    margin: 0;\n    font-size: 13px;\n    color: #454545;\n    margin-top: 4px;\n    padding-left: 10px;\n}\n\n.event-detail-footer {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    width: 320px;\n    background: #ebebeb;\n    padding: 15px;\n}\n\n.event-detail-footer .btn-afterAni {\n    width: 100%;\n    border-radius: 50px;\n    border: 2px solid #46a2ba;\n    background: transparent;\n    margin-bottom: 10px;\n    color: #46abca;\n    padding: 8px;\n}\n\n.event-detail-footer button {\n    background: #46a2ba;\n    color: #fff;\n    width: 142px;\n    padding: 8px;\n    border-radius: 50px;\n    border: none;\n}\n\n.event-detail-footer button:hover {\n    cursor: pointer;\n    background: #3a97af;\n}\n\n.event-detail-footer .btn-afterAni:hover {\n    background: rgba(255, 255, 255, 0.5);\n}\n\n\n/* 인터폴레이터 막대그래프 */\n\n.graph {\n    height: 6px;\n    width: 180px;\n    margin-bottom: 0.5em;\n    margin-left: 10px;\n    overflow: hidden;\n    background-color: #fff;\n    border-radius: 0.0725em;\n    text-align: center;\n    margin-top: 5px;\n}\n\n.graph-bar {\n    float: left;\n    width: 0;\n    height: 100%;\n    color: #ffffff;\n    background-color: #46abca;\n    box-sizing: border-box;\n}\n\n\n/* 인터폴레이터 막대그래프 @*/\n\n\n/* 인터폴레이터 커브 그래프 */\n\n.curve-graph {\n    position: relative;\n    height: 300px;\n    text-align: center;\n}\n\n.coordinate-plane {\n    position: absolute;\n    margin-left: 6px;\n    left: 0;\n    line-height: 0;\n}\n\n.control-point {\n    position: absolute;\n    z-index: 1;\n    height: 16px;\n    width: 16px;\n    border: 1px solid rgba(0, 0, 0, .3);\n    margin: -8px 0 0 -8px;\n    outline: none;\n    box-sizing: border-box;\n    border-radius: 20px;\n}\n\n#P0,\n#P3 {\n    background: white;\n}\n\n#P0 {\n    left: 0;\n    top: 100%;\n}\n\n#P1 {\n    background: #f08;\n}\n\n#P2 {\n    background: #0ab;\n}\n\n#P3 {\n    left: 100%;\n    top: 0;\n}\n\n#P1,\n#P2 {\n    cursor: pointer;\n}\n\ncanvas#curve {\n    background: #f0f0f0;\n    background: linear-gradient(-45deg, transparent 50%, rgba(0, 0, 0, .1) 49%, rgba(0, 0, 0, .1) 51%, transparent 51%) center no-repeat, repeating-linear-gradient(white, white 20px, transparent 20px, transparent 40px) no-repeat, linear-gradient(rgba(0, 0, 0, .06) 25%, rgba(0, 0, 0, .06) 75%);\n    background-size: 100% 100%, 100% 100%, auto;\n    background-position: 25%, 0, 0;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n        user-select: none;\n}\n\n.coordinate-plane:before {\n    content: 'Progression';\n    border-bottom: 1px solid;\n    -moz-transform: rotate(-90deg);\n    -moz-transform-origin: bottom left;\n    -ms-transform: rotate(-90deg);\n    -ms-transform-origin: bottom left;\n    -o-transform: rotate(-90deg);\n    -o-transform-origin: bottom left;\n    -webkit-transform: rotate(-90deg);\n    -webkit-transform-origin: bottom left;\n    transform: rotate(-90deg);\n    transform-origin: bottom left;\n}\n\n.coordinate-plane:after {\n    content: 'Time';\n    border-top: 1px solid;\n    margin-bottom: -1.5em;\n}\n\n.coordinate-plane:before,\n.coordinate-plane:after {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    padding: .3em .5em;\n    box-sizing: border-box;\n    color: rgba(0, 0, 0, .6);\n    text-transform: uppercase;\n    font-size: 75%;\n    line-height: 1;\n}\n\n\n/* 인터폴레이터 커브그래프 @*/\n\n.curve-input input {\n    width: 131px;\n    margin-bottom: 6px;\n}\n\n.curve-input .input-left {\n    margin-right: 4px;\n}\n\n.curve-input .input-right {\n    margin-left: 4px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/event-detail-stage-change/event-detail-stage-change.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"selectedImplementEvent&&stateEventList\">\n    <div *ngIf=\"selectedImplementEvent.type=='stageChange'\" class=\"event-stageChange\">\n\n        <div class=\"event-detail\">\n            <!--{{selectedImplementEvent.type}}-->\n\n            <!-- 이벤트에 대한 상세 정보 -->\n            {{selectedTriggerEvent.name}},{{selectedImplementEvent.type}}\n\n            <img src=\"assets/images/btn_stagechange.png\" />\n            <h4>{{selectedImplementEvent.fromStageName}} > {{selectedImplementEvent.toStageName}}</h4>\n\n\n        </div>\n\n\n\n        <!-- 각 오브젝트별 이벤트 인터폴레이터 -->\n\n\n        <div *ngFor=\"let aStateEvent of stateEventList\" class=\"object-list-wrap\">\n\n            <!-- 오브젝트 리스트 -->\n            <div class=\"object-list\">\n                <app-event-state-change-cell [maxTotalTime]=\"maxTotalTime\" (onChangeTimeLineFromStateCell)=\"onChangeTimeLineFromStateCell($event)\" [stateEventData]=\"aStateEvent\"></app-event-state-change-cell>\n            </div>\n            <!-- 오브젝트 리스트@ -->\n        </div>\n\n        <!-- 각 오브젝트별 이벤트 인터폴레이터 @-->\n    </div>\n\n    <!-- 이벤트 디테일 하단 : 애프터애니메이션 클릭시 이벤트생성 팝업-->\n    <div class=\"event-detail-footer\">\n        <div *ngIf=\"viewMode==='activity'\">\n            <button class=\"btn-afterAni\" (click)=\"clickAddAfterAnimation()\">AfterAnimation</button>\n            <button (click)=\"clickCancel()\">Cancel</button>\n            <button (click)=\"clickDone()\">Done</button>\n        </div>\n        <div *ngIf=\"viewMode!=='activity'\">\n            <button (click)=\"clickDone()\">Done</button>\n        </div>\n    </div>\n\n\n\n\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/activity/event-detail-stage-change/event-detail-stage-change.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailStageChangeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
    function EventDetailStageChangeComponent(appDataService, broadcaster) {
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
        this.onNewAfterAnimationEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onCloseEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
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
    // clickNewAfterAnimationEvent() {
    //   const message = {
    //     kind: 'new-after-animation'
    //   };
    //   this.broadcaster.broadcast(this.viewMode, message);
    // }
    EventDetailStageChangeComponent.prototype.clickAddAfterAnimation = function () {
        var message = {
            kind: 'new-after-animation',
            implEventId: this.selectedImplementEvent.id
        };
        this.broadcaster.broadcast(this.viewMode, message);
        // this.onNewAfterAnimationEvent.emit(this.selectedImplementEvent.id);
    };
    EventDetailStageChangeComponent.prototype.clickCancel = function () {
        var message = {
            kind: 'close-event',
        };
        this.broadcaster.broadcast(this.viewMode, message);
        // this.onCloseEvent.emit();
    };
    EventDetailStageChangeComponent.prototype.clickDone = function () {
        console.log("done");
        // this.onCloseEvent.emit();
        var message = {
            kind: 'close-event',
        };
        this.broadcaster.broadcast(this.viewMode, message);
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
        this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
        this.selectedImplementEvent = this.appDataService.getSelectedImplementEvent();
        if (this.selectedImplementEvent && this.selectedImplementEvent.type === 'stageChange') {
            this.selectedImplementEvent.fromStageName = this.appDataService.findStageByStageId(this.selectedImplementEvent.fromStageId).name;
            this.selectedImplementEvent.toStageName = this.appDataService.findStageByStageId(this.selectedImplementEvent.toStageId).name;
            this.stateEventList = this.appDataService.findStateChangeEventByImplementEventId(this.selectedImplementEvent.id);
            this.calculateMaxTotalTime();
        }
    };
    return EventDetailStageChangeComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], EventDetailStageChangeComponent.prototype, "viewMode", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], EventDetailStageChangeComponent.prototype, "onNewAfterAnimationEvent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], EventDetailStageChangeComponent.prototype, "onCloseEvent", void 0);
EventDetailStageChangeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-event-detail-stage-change',
        template: __webpack_require__("../../../../../src/app/activity/event-detail-stage-change/event-detail-stage-change.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/event-detail-stage-change/event-detail-stage-change.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _b || Object])
], EventDetailStageChangeComponent);

var _a, _b;
//# sourceMappingURL=event-detail-stage-change.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/event-detail-start-activity/event-detail-start-activity.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.event-detail {\n    overflow: hidden;\n    background: #f9fafb;\n    padding: 15px;\n}\n\n.event-detail img {\n    width: 28px;\n    float: left;\n}\n\n.event-detail h4 {\n    float: left;\n    margin: 0;\n    font-size: 13px;\n    color: #454545;\n    margin-top: 4px;\n    padding-left: 10px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/event-detail-start-activity/event-detail-start-activity.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"selectedTriggerEvent\">\n    <div *ngIf=\"selectedImplementEvent.type=='startActivity'\" class=\"event-stageChange\">\n\n\n        <div class=\"event-detail\">\n            <!--{{selectedImplementEvent.type}}-->\n\n            <!-- 이벤트에 대한 상세 정보 -->\n\n            <img src=\"assets/images/btn_startactivity.png\" />\n            <h4>Activity1 > Activity2</h4>\n\n\n        </div>\n\n        <!-- 이벤트 디테일 하단 : 애프터애니메이션 클릭시 이벤트생성 팝업-->\n        <div class=\"event-detail-footer\">\n            <button (click)=\"clickCancel()\">Back</button>\n        </div>\n\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/activity/event-detail-start-activity/event-detail-start-activity.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailStartActivityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
    function EventDetailStartActivityComponent(appDataService, broadcaster) {
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
    }
    EventDetailStartActivityComponent.prototype.ngOnInit = function () {
    };
    EventDetailStartActivityComponent.prototype.onChangeData = function () {
        this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
        this.selectedImplementEvent = this.appDataService.getSelectedImplementEvent();
    };
    EventDetailStartActivityComponent.prototype.clickCancel = function () {
        var message = {
            kind: 'close-event'
        };
        this.broadcaster.broadcast(this.viewMode, message);
    };
    return EventDetailStartActivityComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], EventDetailStartActivityComponent.prototype, "viewMode", void 0);
EventDetailStartActivityComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-event-detail-start-activity',
        template: __webpack_require__("../../../../../src/app/activity/event-detail-start-activity/event-detail-start-activity.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/event-detail-start-activity/event-detail-start-activity.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _b || Object])
], EventDetailStartActivityComponent);

var _a, _b;
//# sourceMappingURL=event-detail-start-activity.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/event-generator/event-generator.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* popup test */\n\n.box {\n    width: 40%;\n    margin: 0 auto;\n    background: rgba(255, 255, 255, 0.2);\n    padding: 35px;\n    border: 2px solid #fff;\n    border-radius: 20px/50px;\n    background-clip: padding-box;\n    text-align: center;\n}\n\n.button {\n    font-size: 1em;\n    margin-top: 50px;\n    color: #fff;\n    border: 2px solid #46a2ba;\n    color: #46a2ba;\n    text-decoration: none;\n    cursor: pointer;\n    transition: all 0.3s ease-out;\n}\n\n.button:hover {\n    background: #46a2ba;\n    color: #fff;\n}\n\n.overlay {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0, 0, 0, 0.7);\n    transition: opacity 500ms;\n    opacity: 1;\n    z-index: 9999;\n}\n\n.overlay:target {\n    visibility: visible;\n    opacity: 1;\n}\n\n.popup {\n    margin: 70px auto;\n \n    background: #fff;\n    border-radius: 5px;\n    width: 800px;\n    height: 500px;\n    position: relative;\n    transition: all 5s ease-in-out;\n    overflow-x: hidden;\n    overflow-y: auto;\n}\n\n.popup .active {\n    color: #46a2ba;\n}\n\n.popup h2 {\n    margin-top: 0;\n    color: #333;\n    font-family: Tahoma, Arial, sans-serif;\n    font-size: 21px;\n}\n\n.popup .close {\n    position: absolute;\n    top: 10px;\n    right: 20px;\n    transition: all 200ms;\n    font-size: 30px;\n    font-weight: bold;\n    text-decoration: none;\n    color: #333;\n    z-index: 9999;\n}\n\n.popup .close:hover {\n    color: #06D85F;\n}\n\n.popup .content {\n    max-height: 30%;\n    overflow: auto;\n}\n\n.popup-list .col-sm-3 {\n    width: 20%;\n    padding: 10px;\n}\n\n.popup-new {\n    border: 2px solid #ececec;\n    border-radius: 4px;\n    height: 460px;\n    text-align: center;\n    padding-top: 100px;\n    color: #898989;\n}\n\n.popup-new:hover {\n    color: #46a2ba;\n}\n\n.popup-new img {\n    margin-left: auto;\n    margin-right: auto;\n    opacity: 0.3;\n}\n\n.popup-category {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    position: relative;\n}\n\n.popup-category label {\n    font-size: 12px;\n    padding-right: 30px;\n}\n\n.popup-category input {\n    position: absolute;\n    right: 0;\n    top: 0;\n}\n\n.popup-nav label {\n    padding-right: 20px;\n}\n\n\n/*popup test finish */\n\n\n.col-4 {\n    width:33.3333%;\n    float:left;\n    height: 100%;\n}\n\n.generator-wrap {\n    overflow: hidden;\n    height: 100%;\n    padding-top: 50px;\n    padding-bottom: 50px;\n  \n}\n\n.popup .generator-footer {\n    position: absolute;\n    bottom:0;\n    left:0;\n    right:0;\n    height: 50px;\n    border-top: 1px solid #ececec;\n    background: #fff;\n    padding:12px;\n    text-align: right;\nbox-shadow: 0px -1px 6px 0px rgba(0,0,0,0.2);\n}\n\n.popup .generator-footer button {\n    background: transparent;\n    border: none;\n    font-size: 15px;\n    font-weight: 600;\n    color:#454545;\n}\n\n.popup .generator-footer button:hover {\n\n cursor: pointer;\n \n    color:#46a2ba;\n}\n\n.popup .generator-nav {\n    position: absolute;\n   top:0;\n    left:0;\n    right:0;\n    height: 50px;\n    border-bottom: 1px solid #ececec;\n    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);\n    padding:12px;\n    font-weight: bold;\n      font-family: Tahoma, Arial, sans-serif;\n\n}\n\n.trigger-select {\n    border-right:1px solid #ececec;\n    height: 100%;\n    background: #fff;\n    overflow-y: auto;\n}\n\n.event-select {\n    border-right: 1px solid #ececec;\n    height: 100%;\n       background: #fff;\n           overflow-y: auto;\n}\n\n.trigger-select img{\n    width:40px;\n\n}\n\n.trigger-select p {\n    margin:2px;\n}\n\n.event-select img{\n    width:40px;\n\n}\n\n.event-select p {\n    margin:2px;\n}\n\n.generator-title {\n    font-size: 14px;\n    padding:6px;\n    text-align: center;\n    border-bottom: 1px solid #ececec;\n        font-family: Tahoma, Arial, sans-serif;\nfont-weight: bold;\ncolor:#454545;\n   background: #fff;\n}\n\n.trigger-intro {\n   height: 100%;\n    background: #dde3eb;\n    padding:15px;\n    padding-left: 36%;\n}\n\n.trigger-intro p {\n    font-size: 13px;\n    color:#454545;\n}\n\n.event-intro {\n      height: 100%;\n    background: #dde3eb;\n    padding: 20px;\n    overflow-y: auto;\n    float: right;\n    width: 33.3333%;\n}\n\n.event-intro h4 {\n    font-size: 14px;\n}\n\n.event-intro p {\n    font-size: 13px;\n    color:#454545;\n}\n\n\n\n.btn-trigger {\n    height:80px;\n    border-bottom: 1px solid #ececec;\n    text-align: center;\n    font-size: 13px;\n    color:#454545;\n    padding: 10px;\n}\n\n.btn-trigger:hover {\n    cursor:pointer;\n    background: #46a2ba;\n    color:#fff;\n}\n\n\n.btn-trigger:hover p{\n  margin-top: -20px;\n}\n\n\n.event-detail {\n    font-size: 13px;\n    color:#454545;\n    \n}\n\n.detail-content {\n    padding:15px;\n    text-align: center;\n}\n\n.detail-content p {\n    font-size: 12px;\n    margin:0;\n}\n\n.detail-content select {\n    width:100%;\n    margin-top: 10px;\n        height: 30px;\n    border: #ccc 1px solid;\n}\n\n.detail-content select:hover {\n    cursor: pointer;\n}\n\n.event-kind {\n    text-align: center;\n    background: #f9fafb;\n    padding:3px;\n    font-size: 12px;\n    border-bottom: 1px solid #ececec;\n    font-family: Tahoma, Arial, sans-serif;\nfont-weight: bold;\n}\n\n.after-animation {\n    margin-top: 130px;\n}\n\n.after-animation h3 {\n    color:#898989;\n    font-weight: bolder;\n    font-size: 16px;\n}\n\n.after-animation p {\n    color:#454545;\n    font-size: 14px;\n    font-size: 13px;\n}\n\n.trigger-hover {\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    margin-top: 70px;\n    margin-left: 285px;\n    text-align: left;\n    width: 800px;\n    height: 400px;\n    background: #dde3eb;\n    display: none;\n}\n\n.trigger-hover p {\n    margin-top: 15px!important;\n    color:#454545;\n}\n\n.btn-click:hover .click-info {\n    display: block;\n}\n\n.btn-oncreate:hover .oncreate-info {\n    display: block;\n}\n\n.btn-backkey:hover .backkey-info {\n    display: block;\n}\n\n\n.event-hover {\n    position: absolute;\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    margin-top: 70px;\n    margin-left: 550px;\n    text-align: left;\n    padding: 1px;\n    width: 240px;\n    height: 400px;\n    background: #dde3eb;\n   display: none;\n}\n\n.event-hover p {\n    margin-top: 15px!important;\n    color:#454545;\n}\n\n.btn-stagechange:hover .stage-info {\n    display: block;\n}\n\n.btn-startactivity:hover .startactivity-info {\n    display: block;\n}\n\n.btn-finishactivity:hover .finishactivity-info {\n    display: block;\n}\n\n.btn-startlottie:hover .startlottie-info {\n    display: block;\n}\n\n.btn-stoplottie:hover .stoplottie-info {\n    display: block;\n}\n\n.btn-takepicture:hover .takepicture-info {\n    display: block;\n}\n\n.btn-startvideo:hover .startvideo-info {\n    display: block;\n}\n\n.btn-stopvideo:hover .stopvideo-info {\n    display: block;\n}\n\n\n.trigger-sub h4 {\n    margin-bottom: 5px;\n}\n.trigger-sub p {\n    margin-top: 7px;\n\n}\n\n.event-intro h4 {\n    margin-bottom: 5px;\n}\n.event-intro p {\n    margin-top: 7px;\n\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/event-generator/event-generator.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"popup-wrap\" *ngIf=\"visibility\">\n    <div id=\"popup1\" class=\"overlay\" (click)=\"hideDialog()\">\n        <div class=\"popup\" (click)=\"nothing($event)\">\n\n            <div class=\"generator-nav\">\n                Detail Event Generator\n                <!--<button (click)=\"hideDialog()\">Hide</button>-->\n            </div>\n\n\n            <div class=\"generator-wrap\">\n                <!-- 트리거 버튼 -->\n\n\n                <div class=\"trigger-select col-4\">\n\n                    <!-- 트리거 선택하기 -->\n                    <div *ngIf=\"!afterTriggerEventId\">\n                        <div class=\"generator-title\">Trigger</div>\n\n                        <div class=\"btn-scroll\">\n\n                            <div class=\"btn-trigger btn-click\" (click)=\"clickTrigger('click')\">\n                                <img src=\"assets/images/btn_click.png\" />\n                                <p>Tap</p>\n                                <div *ngIf=\"!triggerEvent\" class=\"click-info trigger-hover\">\n                                    <h2>Tap</h2>\n                                    <p>Press once with one finger and lift immediately.</p>\n                                </div>\n                            </div>\n                            <div class=\"btn-trigger btn-oncreate\" (click)=\"clickTrigger('onCreate')\">\n                                <img src=\"assets/images/btn_oncreate.png\" />\n                                <p>onCreate</p>\n                                <div *ngIf=\"!triggerEvent\" class=\"oncreate-info trigger-hover\">\n                                    <h2>OnCreate</h2>\n                                    <p>Executing an event at the same time that the Activity starts.</p>\n                                </div>\n                            </div>\n                            <div class=\"btn-trigger btn-backkey\" (click)=\"clickTrigger('backKey')\">\n                                <img src=\"assets/images/btn_backkey.png\" />\n                                <p>backKey</p>\n                                <div *ngIf=\"!triggerEvent\" class=\"backkey-info trigger-hover\">\n                                    <h2>BackKey</h2>\n                                    <p>Tap the backkey once on the android navigation bar.</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <!-- 애프터 애니메이션 -->\n                    <div *ngIf=\"afterTriggerEventId\" align=\"center\">\n                        <div class=\"generator-title\">After Animation</div>\n                        <div class=\"after-animation\">\n                            <h3>rootStage > Stage 03</h3>\n                            <p>후 일어날 이벤트를 설정해 주세요.</p>\n                        </div>\n                    </div>\n\n                </div>\n\n                <!--트리거 관련 설명 -->\n\n                <div class=\"trigger-intro\" *ngIf=\"!triggerEvent\">\n                    <div class=\"trigger-sub\">\n                        <h2>Trigger</h2>\n                        <p>A user action to trigger an event, such as changing the state of objects or switching between Activities. Select the trigger you want on the left.\n                        </p>\n\n                        <h4>Tap</h4>\n                        <p>Press once with one finger and lift immediately.</p>\n                        <h4>OnCreate</h4>\n                        <p>Executing an event at the same time that the Activity starts.</p>\n                        <h4>BackKey</h4>\n                        <p>Tap the backkey once on the android navigation bar.</p>\n                    </div>\n\n\n                </div>\n\n                <!--트리거 관련 설명@ -->\n\n                <!-- 트리거 버튼 @-->\n\n\n                <!-- 이벤트 종류 정하기 -->\n                <div *ngIf=\"triggerEvent \" class=\"col-4\">\n                    <div class=\"generator-title\">Event</div>\n                    <div class=\"event-select \">\n\n\n\n                        <div class=\"btn-scroll\" style=\"padding-bottom:50px;\">\n                            <div class=\"btn-trigger btn-stagechange\" (click)=\"clickImplement('stageChange')\">\n                                <img src=\"assets/images/btn_stagechange.png\" />\n                                <p>stageChange</p>\n                                <div *ngIf=\"!implementEvent\" class=\"stage-info event-hover\">\n                                    <h2>stageChange</h2>\n                                    <p>All states such as object position, size, shape and color can be changed through 'StageChange'.</p>\n                                </div>\n                            </div>\n                            <div class=\"btn-trigger btn-startactivity\" (click)=\"clickImplement('startActivity')\">\n                                <img src=\"assets/images/btn_startactivity.png\" />\n                                <p>startActivity</p>\n                                <div *ngIf=\"!implementEvent\" class=\"startactivity-info event-hover\">\n                                    <h2>startActivity</h2>\n                                    <p>This event starts another new Activity. It is used to move from the current Activity to another Activity.</p>\n                                </div>\n                            </div>\n                            <div class=\"btn-trigger btn-finishactivity\" (click)=\"clickImplement('finishActivity')\">\n                                <img src=\"assets/images/btn_finishactivity.png\" />\n                                <p>finishActivity</p>\n                                <div *ngIf=\"!implementEvent\" class=\"finishactivity-info event-hover\">\n                                    <h2>finishActivity</h2>\n                                    <p>This event closes the current Activity and returns it to the previous Activity. We often use backkeys inside apps.</p>\n                                </div>\n                            </div>\n\n                            <div class=\"event-kind\">Lottie</div>\n                            <div class=\"btn-trigger btn-startlottie\" (click)=\"clickImplement('startLottie')\">\n                                <img src=\"assets/images/btn_startlottie.png\" />\n                                <p>startLottie</p>\n                                <div *ngIf=\"!implementEvent\" class=\"startlottie-info event-hover\">\n                                    <h2>startLottie</h2>\n                                    <p>Play the motion graphics of LottieAnimationView with JSON file applied</p>\n                                </div>\n                            </div>\n                            <div class=\"btn-trigger btn-stoplottie\" (click)=\"clickImplement('stopLottie')\">\n                                <img src=\"assets/images/btn_stoplottie.png\" />\n                                <p>stopLottie</p>\n                                <div *ngIf=\"!implementEvent\" class=\"stoplottie-info event-hover\">\n                                    <h2>stopLottie</h2>\n                                    <p>Stop motion graphics of LottieAnimationView.</p>\n                                </div>\n                            </div>\n\n                            <div class=\"event-kind\">Camera</div>\n                            <div class=\"btn-trigger btn-takepicture\" (click)=\"clickImplement('takePicture')\">\n                                <img src=\"assets/images/btn_takepicture.png\" />\n                                <p>takePicture</p>\n                                <div *ngIf=\"!implementEvent\" class=\"takepicture-info event-hover\">\n                                    <h2>takePicture</h2>\n                                    <p>It acts as a camera shutter when shooting with 'CameraView'. You can also select a layer to show the captured image.</p>\n                                </div>\n                            </div>\n\n\n                            <div class=\"event-kind\">VideoView</div>\n                            <div class=\"btn-trigger btn-startvideo\" (click)=\"clickImplement('startVideo')\">\n                                <img src=\"assets/images/btn_startvideo.png\" />\n                                <p> startVideo</p>\n                                <div *ngIf=\"!implementEvent\" class=\"startvideo-info event-hover\">\n                                    <h2>startVideo</h2>\n                                    <p>Play video from VideoView.</p>\n                                </div>\n                            </div>\n                            <div class=\"btn-trigger btn-stopvideo\" (click)=\"clickImplement('stopVideo')\">\n                                <img src=\"assets/images/btn_stopvideo.png\" />\n                                <p> stopVideo</p>\n                                <div *ngIf=\"!implementEvent\" class=\"stopvideo-info event-hover\">\n                                    <h2>stopVideo</h2>\n                                    <p>Stop video playing in VideoView.</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <!--이벤트 관련 설명 -->\n\n                <div class=\"event-intro\" *ngIf=\"!implementEvent\">\n\n                    <h2>Event</h2>\n                    <p>The movement within the app that works to interact with the user. Select the event you want to activate.</p>\n\n                    <h4>StageChange</h4>\n                    <p>All states such as object position, size, shape and color can be changed through 'StageChange'.</p>\n                    <h4>StartActivity</h4>\n                    <p>This event starts another new Activity. It is used to move from the current Activity to another Activity.</p>\n                    <h4>FinishActivity</h4>\n                    <p>This event closes the current Activity and returns it to the previous Activity. We often use backkeys inside apps.</p>\n                    <h4>startLottie</h4>\n                    <p>Play the motion graphics of LottieAnimationView with JSON file applied</p>\n                    <h4>stopLottie</h4>\n                    <p>Stop motion graphics of LottieAnimationView.</p>\n                    <h4>takePicture</h4>\n                    <p>It acts as a camera shutter when shooting with 'CameraView'. You can also select a layer to show the captured image.</p>\n                    <h4>startVideo</h4>\n                    <p>Play video from VideoView.</p>\n                    <h4>stopVideo</h4>\n                    <p>Stop video playing in VideoView.</p>\n                </div>\n\n                <!--이벤트 관련 설명@ -->\n\n                <!-- 이벤트 종류 정하기 @ -->\n\n                <!-- 이벤트 상세설정 -->\n\n                <div *ngIf=\"implementEvent\">\n\n                    <div class=\"event-detail col-4\">\n\n                        <div class=\"generator-title\">Event Detail</div>\n                        <div *ngIf=\"implementEvent.type=='stageChange'\" class=\"detail-content\">\n\n\n                            <p>From <b>{{currentSelectedStageId}}</b> select target stage</p>\n                            <select (change)=\"onChangeStage($event.target.value)\"> \n                        <option *ngFor=\"let aStage of stageList\" [value]=\"aStage.id\">{{aStage.name}}</option>\n                    </select>\n                        </div>\n                        <div *ngIf=\"implementEvent.type=='startActivity'\" class=\"detail-content\">\n                            <p> Select target activity</p>\n                            <select [(ngModel)]=\"selectedActivityId\" (change)=\"onChangeActivity($event.target.value)\"> \n                        <option  *ngFor=\"let aActivity of activityList\" [value]=\"aActivity.activityId\">{{aActivity.activityName}}</option>\n                    </select>\n                        </div>\n                        <div *ngIf=\"implementEvent.type=='finishActivity'\" class=\"detail-content\">\n                            <p> Will finish activity</p>\n                        </div>\n\n\n                        <div *ngIf=\"implementEvent.type=='startLottie'\" class=\"detail-content\">\n                            <p>Select Lottie to start</p>\n                            <select [(ngModel)]=\"selectedLottieViewId\" (change)=\"onChangeActivity($event.target.value)\"> \n                        <option  *ngFor=\"let aObject of getLottieViewList()\" [value]=\"aObject.id\">{{aObject.name}}</option>\n                    </select>\n                        </div>\n\n                        <div *ngIf=\"implementEvent.type=='stopLottie'\" class=\"detail-content\">\n                            <p>Select Lottie to start</p>\n                            <select [(ngModel)]=\"selectedLottieViewId\" (change)=\"onChangeLottiView($event.target.value)\"> \n                        <option *ngFor=\"let aObject of getLottieViewList()\" [value]=\"aObject.id\">{{aObject.name}}</option>\n                    </select>\n                        </div>\n\n\n                        <div *ngIf=\"implementEvent.type=='startVideo'\" class=\"detail-content\">\n                            <p>Select Lottie to start</p>\n                            <select [(ngModel)]=\"selectedVideoViewId\" (change)=\"onChangeVideoView($event.target.value)\"> \n                        <option  *ngFor=\"let aObject of getVideoViewList()\" [value]=\"aObject.id\">{{aObject.name}}</option>\n                    </select>\n                        </div>\n\n                        <div *ngIf=\"implementEvent.type=='stopVideo'\" class=\"detail-content\">\n                            <p>Select Lottie to start</p>\n                            <select [(ngModel)]=\"selectedVideoViewId\" (change)=\"onChangeVideoView($event.target.value)\"> \n                        <option *ngFor=\"let aObject of getVideoViewList()\" [value]=\"aObject.id\">{{aObject.name}}</option>\n                    </select>\n                        </div>\n\n\n\n\n                        <div *ngIf=\"implementEvent.type=='takePicture'\" class=\"detail-content\">\n                            <p>Select view to picture</p>\n                            <select [(ngModel)]=\"selectedTakePictureObjectViewId\" (change)=\"onChangeCameraPictureView($event.target.value)\"> \n                        <option  *ngFor=\"let aObject of getImageViewList()\" [value]=\"aObject.id\">{{aObject.name}}</option>\n                    </select>\n                        </div>\n\n                    </div>\n                </div>\n\n\n                <!-- 이벤트 상세설정 @ -->\n\n            </div>\n\n            <div class=\"generator-footer\">\n\n                <button (click)=\"hideDialog()\">Cancel</button>\n                <button *ngIf=\"readyEvent\" (click)=\"completeEvent()\">Done</button>\n\n            </div>\n\n\n\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/activity/event-generator/event-generator.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventGeneratorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__ = __webpack_require__("../../../../angular2-uuid/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
    function EventGeneratorComponent(appDataService, broadcaster) {
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
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
    EventGeneratorComponent.prototype.onChangeStage = function (stageId) {
        this.selectedStageId = stageId;
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
        return this.filterObjectView('LottieAnimationView');
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
        // this.onCompleteEvent.emit();
        var message = {
            kind: 'complete-event'
        };
        this.broadcaster.broadcast('activity', message);
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
EventGeneratorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-event-generator',
        template: __webpack_require__("../../../../../src/app/activity/event-generator/event-generator.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/event-generator/event-generator.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _b || Object])
], EventGeneratorComponent);

var _a, _b;
//# sourceMappingURL=event-generator.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/event-list/event-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".label-properties {\n    font-size: 14px;\n    font-weight: 600;\n    padding: 6px 10px;\n    background-color: #fff;\n    color: #454545;\n    position: relative;\n    overflow: hidden;\n}\n\n.col-8 {\n    width:66%;\n    float: left;\n\n}\n\n.col-4 {\n    width:33%;\n    float: right;\n}\n\n.label-properties img {\n    width: 18px;\n    cursor: pointer;\n    opacity: 0.7;\n}\n\n.label-properties img:hover {\n    cursor: pointer;\n    opacity:1;\n}\n\n.noti-addmotions {\n    text-align: center;\n    padding: 20px;\n    margin-top: 30px;\n}\n\n.noti-addmotions img {\n    width: 80px;\n    opacity: 0.7;\n}\n\n.noti-addmotions a {\n  color: #46a2ba;\n}\n\n.noti-addmotions a:hover {\n    color:#2d88a0;\n    cursor: pointer;\n}\n\n.noti-addmotions p {\ncolor:#898989;\nfont-size: 14px;\nmargin-top: 5px;\n}\n\n.noti-addmotions h3 {\nmargin-bottom: 0;\n}\n\n\n.go-event-detail {\n    background: #f9fafb;\n    border-bottom: 1px solid #ececec;\n  \n    font-size: 13px;\n    color:#454545;\n    position: relative;\n\n}\n\n.go-event-detail:hover {\n    cursor: pointer;\n}\n\n.go-event-detail .btn-trash {\n    background: transparent;\n    border:none;\n    position: absolute;\n    right:0;\n    top:0;\npadding:12px 15px;\n    margin-top: 5px;\n}\n\n.go-event-detail .btn-trash i {\n    font-size: 16px;\n    opacity: 0.3;\n}\n\n.go-event-detail .btn-trash:hover i {\n    opacity: 0.5;\n    cursor: pointer;\n}\n\n/* event-detail */\n\n.event-detail{\n    overflow: hidden;\n      background: #f9fafb;\n  \n}\n\n.event-detail img {\nwidth:28px;\nfloat:left;\n}\n\n.event-detail h4 {\n    float: left;\n    margin:0;\n    font-size: 13px;\n    color:#454545;\n    margin-top: 4px;\n    padding-left: 10px;\n}\n\n.event-detail-wrap {\n    position: relative;\n      padding:12px 15px;\n      border-bottom: 1px solid #ececec;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/event-list/event-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"event-list\">\n\n\n    <div class=\"label-properties\">\n\n\n        <div class=\"col-8\" style=\"padding-left: 0;\">\n            Event\n        </div>\n        <div class=\"col-4\" align=\"right\" style=\"padding:0;\">\n            <div>\n                <img (click)=\"clickNewEvent()\" src=\"assets/images/btn_motion_add.png\" class=\"img-responsive\">\n            </div>\n        </div>\n    </div>\n\n    <div *ngIf=\"!selectedTriggerEvent\">\n        <!-- 이벤트리스트 -->\n        <div *ngIf=\"triggerEventList\" class=\"go-event-detail\">\n            <div *ngFor=\"let aEvent of triggerEventList\" class=\"event-detail-wrap\" (click)=\"clickDetailEvent(aEvent)\">\n\n                <div class=\"event-detail\" *ngIf=\"aEvent.implEvent\">\n                    {{aEvent.name}}\n                    <div *ngIf=\"aEvent.type==='click'\">\n                        <img src=\"assets/images/btn_click.png\" />\n                    </div>\n                    <div *ngIf=\"aEvent.type==='onCreate'\">\n                        <img src=\"assets/images/btn_oncreate.png\" />\n                    </div>\n                    <div *ngIf=\"aEvent.type==='backKey'\">\n                        <img src=\"assets/images/btn_backkey.png\" />\n                    </div>\n                    <div *ngIf=\"aEvent.type==='afterAnimation'\">\n                        <img src=\"assets/images/btn_afteranimation.png\" />\n                    </div>\n\n\n\n\n                    <!-- impl -->\n                    {{aEvent.implEvent.name}}\n                    <div *ngIf=\"aEvent.implEvent.type==='stageChange'\">\n                        <img src=\"assets/images/btn_stagechange.png\" />\n                    </div>\n                    <div *ngIf=\"aEvent.implEvent.type==='startActivity'\">\n                        <img src=\"assets/images/btn_startactivity.png\" />\n                    </div>\n                    <div *ngIf=\"aEvent.implEvent.type==='finishActivity'\">\n                        <img src=\"assets/images/btn_finishactivity.png\" />\n                    </div>\n                    <div *ngIf=\"aEvent.implEvent.type==='stageChange'\">\n                        {{aEvent.implEvent.fromStageName}} -> {{aEvent.implEvent.toStageName}}\n                    </div>\n\n                    <div *ngIf=\"aEvent.implEvent.type==='startActivity'\">\n                        {{aEvent.implEvent.toActivityName}}\n                    </div>\n\n                    <button class=\"btn-trash\" (click)=\"clickDeleteEvent($event,aEvent)\"><i class=\"fa fa-trash-o\"></i></button>\n                </div>\n            </div>\n            <!-- 이벤트리스트 @ -->\n        </div>\n\n\n\n        <div *ngIf=\"!selectedTriggerEvent&&viewMode=='activity'\" class=\"noti-addmotions\">\n            <img src=\"assets/images/ic_motion.png\" alt=\"add-motions\">\n            <a (click)=\"clickNewEvent()\">\n                <h3>Add motions</h3>\n            </a>\n            <p>Add the motion blah blah</p>\n        </div>\n\n    </div>"

/***/ }),

/***/ "../../../../../src/app/activity/event-list/event-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
    }
    EventListComponent.prototype.ngOnInit = function () {
    };
    EventListComponent.prototype.onChangeData = function () {
        this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
        this.triggerEventList = this.appDataService.getActivityData().triggerEventList;
        for (var i = 0; i < this.triggerEventList.length; i++) {
            var aEvent = this.triggerEventList[i];
            var implEvent = this.appDataService.findImplentEventByTriggerEventId(aEvent.id);
            if (implEvent) {
                if (implEvent.type === 'stageChange') {
                    implEvent.fromStageName = this.appDataService.findStageByStageId(implEvent.fromStageId).name;
                    implEvent.toStageName = this.appDataService.findStageByStageId(implEvent.toStageId).name;
                }
                else if (implEvent.type === 'startActivity') {
                    implEvent.toActivityName = this.appDataService.getActivityName(implEvent.toActivityId);
                }
                aEvent.implEvent = implEvent;
            }
        }
    };
    EventListComponent.prototype.showList = function () {
    };
    EventListComponent.prototype.clickNewEvent = function () {
        var message = {
            kind: 'new-event'
        };
        this.broadcaster.broadcast(this.viewMode, message);
    };
    EventListComponent.prototype.clickDetailEvent = function (event) {
        console.log("clickDetailEvent = " + JSON.stringify(event));
        var message = {
            kind: 'detail-event',
            event: event
        };
        this.broadcaster.broadcast(this.viewMode, message);
    };
    EventListComponent.prototype.clickDeleteEvent = function (event, triggerEvent) {
        event.stopPropagation();
        var result = confirm('will you delete ' + triggerEvent.name + '?');
        if (result) {
            var message = {
                kind: 'delete-event',
                triggerEventId: triggerEvent.id
            };
            this.broadcaster.broadcast(this.viewMode, message);
        }
    };
    return EventListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], EventListComponent.prototype, "viewMode", void 0);
EventListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-event-list',
        template: __webpack_require__("../../../../../src/app/activity/event-list/event-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/event-list/event-list.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _b || Object])
], EventListComponent);

var _a, _b;
//# sourceMappingURL=event-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/event-state-change-cell/event-state-change-cell.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* The switch - the box around the slider */\n\n.switch {\n    position: relative;\n    display: inline-block;\n    width: 20px;\n    height: 14px;\n    margin-top: 7px;\n}\n\n\n/* Hide default HTML checkbox */\n\n.switch input {\n    display: none;\n}\n\n\n/* The slider */\n\n.slider {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: #ccc;\n    transition: .4s;\n}\n\n.slider:before {\n    position: absolute;\n    content: \"\";\n    height: 6px;\n    width: 6px;\n    left: 4px;\n    bottom: 4px;\n    background-color: white;\n    transition: .4s;\n}\n\ninput:checked+.slider {\n    background-color: #46abca;\n}\n\ninput:focus+.slider {\n    box-shadow: 0 0 1px #46abca;\n}\n\ninput:checked+.slider:before {\n    -webkit-transform: translateX(6px);\n    transform: translateX(6px);\n}\n\n\n/* Rounded sliders */\n\n.slider.round {\n    border-radius: 34px;\n}\n\n.slider.round:before {\n    border-radius: 50%;\n}\n\n\n.event-time {\n    overflow: hidden;\n    margin-bottom: 10px;\n    margin-top: 10px;\n}\n\n.event-time div {\n    width: 50%;\n    float: left;\n}\n\n.event-time input {\n    width: 83px;\n    margin-left: 10px;\n    background: #f1f1f1;\n    border-radius: 3px;\n    border: none;\n    padding: 3px;\n        padding-left: 10px;\n    padding-right: 10px;\n}\n\n.interpolator-select {\n    width: 100%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n       height: 30px;\n       font-size: 13px;\n}\n\n\n/* 인터폴레이터 커브그래프 @*/\n\n.curve-input input {\n      width: 141px;\n    margin-bottom: 6px;\n    background: #f1f1f1;\n    border-radius: 3px;\n    border: none;\n    padding: 3px;\n    padding-left: 10px;\n    padding-right: 10px;\n\n}\n\n.curve-input .input-left {\n    margin-right: 4px;\n}\n\n.curve-input .input-right {\n    margin-left: 4px;\n}\n\n.object-detail {\n    background: #fff;\n    padding:15px;\n    position: relative;\n    margin-top: -1px;\n \n}\n\n/*오브젝트 디테일 말풍선 삼각형 */\n\n.tri {\n    width: 0px;\n    height: 0px;\n    border-top: 10px solid none;\n    border-bottom: 10px solid white;\n    border-right: 15px solid transparent;\n    border-left: 15px solid transparent;\n    position: absolute;\n    top: 0;\n    margin-top: -10px;\n    left: 0;\n    margin-left:105px;\n}\n\n.object-list-main {\n    vertical-align: middle;\n    padding-bottom: 10px;\n    padding-top: 10px;\n    padding-left: 15px;\n    padding-right: 15px;\n    border-bottom: 1px solid #ccc;\n    overflow: hidden;\n}\n\n.object-list {\n    float: left;\n}\n\n/*.object-id {\n    width:90px;\n    padding-left: 5px;\n    padding-right: 5px;\n    padding-top: 6px;\n    padding-bottom: 5px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}*/\n\n\n\n.timeline-preview {\n    margin-top: 7px;\n    margin-left: 8px;\n}\n\n.go-graph {\n    margin-top: 5px;\n}\n\n.go-graph canvas {\nbackground: #fff !important;\n}\n\n.go-graph:hover {\n    cursor: pointer;\n\n}\n\n.graph-wrap p, .timeline-wrap p {\n    padding-top: 10px;\n    font-size: 10px;\n    color:#898989;\n    margin:0;\n}\n\n\n/* 체크박스 */\n\n\n\n.control {\n  display: block;\n  position: relative;\n  padding-left: 30px;\npadding-top: 6px;\n  cursor: pointer;\n  font-size: 12px;\n  width:140px;\n}\n.control input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0;\n}\n.control__indicator {\n  position: absolute;\n  top: 5px;\n  left: 0;\n  height: 20px;\n  width: 20px;\n  background: #e6e6e6;\n  border-radius: 20px;\n}\n\n.control:hover input ~ .control__indicator,\n.control input:focus ~ .control__indicator {\n  background: #ccc;\n}\n.control input:checked ~ .control__indicator {\n  background: #2aa1c0;\n}\n.control:hover input:not([disabled]):checked ~ .control__indicator,\n.control input:checked:focus ~ .control__indicator {\n  background: #0e647d;\n}\n.control input:disabled ~ .control__indicator {\n  background: #e6e6e6;\n  opacity: 0.6;\n  pointer-events: none;\n}\n.control__indicator:after {\n  content: '';\n  position: absolute;\n  display: none;\n}\n.control input:checked ~ .control__indicator:after {\n  display: block;\n}\n.control--checkbox .control__indicator:after {\n  left: 8px;\n  top: 4px;\n  width: 3px;\n  height: 8px;\n  border: solid #fff;\n  border-width: 0 2px 2px 0;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n.control--checkbox input:disabled ~ .control__indicator:after {\n  border-color: #7b7b7b;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/event-state-change-cell/event-state-change-cell.component.html":
/***/ (function(module, exports) {

module.exports = "<div #cellRoot>\n\n\n    <!-- 오브젝트 이름-->\n    <div class=\"object-name object-list-main\">\n\n        <!--<input type=\"checkbox\" [(ngModel)]=\"stateEventData.isEnabled\">-->\n\n        <!-- 오브젝트 이벤트 활성화 온오프 버튼 -->\n\n        <label class=\"control control--checkbox object-id object-list\">\n            {{getObjectName(stateEventData.objectId).name}}\n            <input type=\"checkbox\" checked=\"checked\"  [(ngModel)]=\"stateEventData.isEnabled\"/>\n            <div class=\"control__indicator\"></div>\n        </label>\n\n\n\n        <!-- 오브젝트 이름 -->\n        <!--<div class=\"object-id object-list\">\n            {{getObjectName(stateEventData.objectId).name}}\n        </div>-->\n\n        <!-- 그래프 미리보기 -->\n        <app-event-state-change-graph class=\"go-graph object-list\" (click)=\"toggleDetail()\" #graphSmall [stateEventData]=\"stateEventData\" [graphSize]=\"18\"></app-event-state-change-graph>\n\n        <!-- 타임라인 미리보기 -->\n        <app-event-state-change-timeline class=\"timeline-preview object-list\" #timeLineSmall (onChangeTimeLine)=\"onChangeTimeLineFromTimeLine($event)\" [stateEventData]=\"stateEventData\" [timeLinePadding]=\"1\" [timeLineSizeW]=\"120\" [timeLineSizeH]=\"8\" [maxTime]=\"maxTotalTime\"></app-event-state-change-timeline>\n\n        <!--<button (click)=\"toggleDetail()\">상세</button>-->\n\n\n\n\n\n    </div>\n    <!-- 오브젝트 이름@-->\n\n    <!-- 오브젝트 상세-->\n    <div [hidden]=\"!isExpaned\">\n\n        <div class=\"object-detail\">\n\n            <!-- 오브젝트 디테일 말풍선 삼각형 -->\n            <!--<div class=\"tri\"></div>-->\n\n\n            <!-- 그래프 전체-->\n\n            <div class=\"graph-wrap\">\n\n                <p style=\"padding-top:0;\">Graph</p>\n\n                <!-- 인터폴레이터 종류 선택-->\n                <select class=\"interpolator-select\" (change)=\"onChangeInterpolator($event.target.value, stateEventData)\"> \n                    <option *ngFor=\"let aSet of presetInterpolatorList\" [value]=\"aSet.value\">{{aSet.name}}</option>\n                </select>\n\n                <!-- 인터폴레이터 그래프 -->\n                <app-event-state-change-graph #graphBig (onChangeGraph)=\"onChangeGraph($event)\" [needHandler]=\"true\" [stateEventData]=\"stateEventData\" [graphSize]=\"288\" [paddingSize]=\"20\"></app-event-state-change-graph>\n\n                <!-- 인터폴레이터 수치 입력-->\n                <div class=\"curve-input\">\n                    <input class=\"input-left\" [(ngModel)]=\"stateEventData.cubicValue[0]\"><input class=\"input-right\" [(ngModel)]=\"stateEventData.cubicValue[1]\">\n                    <input class=\"input-left\" [(ngModel)]=\"stateEventData.cubicValue[2]\"><input class=\"input-right\" [(ngModel)]=\"stateEventData.cubicValue[3]\">\n                </div>\n\n            </div>\n\n            <!-- 그래프 전체@-->\n\n            <!--타임라인 전체 -->\n\n            <div class=\"timeline-wrap\">\n\n                <p style=\"margin-bottom:10px;\">Timeline</p>\n\n                <!-- 타임라인 에디트 -->\n                <app-event-state-change-timeline #timeLineBig (onChangeTimeLine)=\"onChangeTimeLineFromTimeLine($event)\" [stateEventData]=\"stateEventData\" [timeLinePadding]=\"0\" [timeLineSizeW]=\"288\" [timeLineSizeH]=\"20\" [maxTime]=\"maxTotalTime\"></app-event-state-change-timeline>\n\n\n                <!-- 시작 시간 및 동작 시간-->\n                <div class=\"event-time\">\n                    <div class=\"event-delay\">\n                        Delay <input [(ngModel)]=\"stateEventData.startDelay\">\n                    </div>\n                    <div class=\"event-duration\">\n                        Duration<input [(ngModel)]=\"stateEventData.duration\">\n                    </div>\n                </div>\n\n            </div>\n\n            <!--타임라인 전체 @ -->\n\n\n\n        </div>\n\n        <!-- source code -->\n        <div>\n            <button (click)=\"toggleShowCode()\">code</button>\n            <div *ngIf=\"needShowCode&&stateChangeAnimationCode\">\n                <button [clip]=\"stateChangeAnimationCode\" (onClip)=\"callback($event)\">copy</button>\n                <handy-syntax-highlighter *ngIf=\"stateChangeAnimationCode\" [language]=\"'java'\" [content]=\"stateChangeAnimationCode\"></handy-syntax-highlighter>\n\n                powered by viewpropertyobjectanimator from blipinsk\n\n            </div>\n        </div>\n\n\n    </div>\n    <!-- 오브젝트 상세@-->\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/activity/event-state-change-cell/event-state-change-cell.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventStateChangeCellComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
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
        this.onChangeTimeLineFromStateCell = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.needShowCode = false;
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
    EventStateChangeCellComponent.prototype.toggleShowCode = function () {
        this.needShowCode = !this.needShowCode;
        this.updateCode();
        console.log("needShowCode =" + this.needShowCode);
    };
    EventStateChangeCellComponent.prototype.callback = function ($event) {
    };
    EventStateChangeCellComponent.prototype.updateCode = function () {
        this.stateChangeAnimationCode = null;
        var self = this;
        setTimeout(function () {
            self.stateChangeAnimationCode = self.appDataService.getStateAnimationString(self.stateEventData);
            console.log("stateChangeAnimationCode =" + self.stateChangeAnimationCode);
        }, 10);
    };
    return EventStateChangeCellComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('stateEventData'),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "stateEventData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('maxTotalTime'),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "maxTotalTime", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('graphSmall'),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "graphSmall", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('graphBig'),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "graphBig", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('timeLineBig'),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "timeLineBig", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('timeLineSmall'),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "timeLineSmall", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], EventStateChangeCellComponent.prototype, "onChangeTimeLineFromStateCell", void 0);
EventStateChangeCellComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-event-state-change-cell',
        template: __webpack_require__("../../../../../src/app/activity/event-state-change-cell/event-state-change-cell.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/event-state-change-cell/event-state-change-cell.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object])
], EventStateChangeCellComponent);

var _a;
//# sourceMappingURL=event-state-change-cell.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/event-state-change-graph/event-state-change-graph.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/event-state-change-graph/event-state-change-graph.component.html":
/***/ (function(module, exports) {

module.exports = "<canvas width=\"{{graphSize}}\" height=\"{{graphSize}}\" (mousemove)=\"mouseMove($event)\" (mousedown)=\"mouseDown($event)\" (mouseleave)=\"mouseUp($event)\" (mouseup)=\"mouseUp($event)\" #myCanvas style=\"border:1px solid #c3c3c3;\"></canvas>"

/***/ }),

/***/ "../../../../../src/app/activity/event-state-change-graph/event-state-change-graph.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventStateChangeGraphComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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
        this.onChangeGraph = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
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
        if (this.stateEventData.cubicValue[0] < 0) {
            this.stateEventData.cubicValue[0] = 0;
        }
        if (this.stateEventData.cubicValue[0] > 1) {
            this.stateEventData.cubicValue[0] = 1;
        }
        if (this.stateEventData.cubicValue[2] < 0) {
            this.stateEventData.cubicValue[2] = 0;
        }
        if (this.stateEventData.cubicValue[2] > 1) {
            this.stateEventData.cubicValue[2] = 1;
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('stateEventData'),
    __metadata("design:type", Object)
], EventStateChangeGraphComponent.prototype, "stateEventData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('graphSize'),
    __metadata("design:type", Object)
], EventStateChangeGraphComponent.prototype, "graphSize", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('paddingSize'),
    __metadata("design:type", Object)
], EventStateChangeGraphComponent.prototype, "paddingSize", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('needHandler'),
    __metadata("design:type", Object)
], EventStateChangeGraphComponent.prototype, "needHandler", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myCanvas'),
    __metadata("design:type", Object)
], EventStateChangeGraphComponent.prototype, "myCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], EventStateChangeGraphComponent.prototype, "onChangeGraph", void 0);
EventStateChangeGraphComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-event-state-change-graph',
        template: __webpack_require__("../../../../../src/app/activity/event-state-change-graph/event-state-change-graph.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/event-state-change-graph/event-state-change-graph.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], EventStateChangeGraphComponent);

var _a;
//# sourceMappingURL=event-state-change-graph.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/event-state-change-timeline/event-state-change-timeline.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/event-state-change-timeline/event-state-change-timeline.component.html":
/***/ (function(module, exports) {

module.exports = "<canvas width=\"{{timeLineSizeW}}\" height=\"{{timeLineSizeH}}\" (mousemove)=\"mouseMove($event)\" (mousedown)=\"mouseDown($event)\" (mouseleave)=\"mouseUp($event)\" (mouseup)=\"mouseUp($event)\" #myCanvas ></canvas>"

/***/ }),

/***/ "../../../../../src/app/activity/event-state-change-timeline/event-state-change-timeline.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventStateChangeTimelineComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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
        this.onChangeTimeLine = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('stateEventData'),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "stateEventData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('timeLineSizeW'),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "timeLineSizeW", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('timeLineSizeH'),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "timeLineSizeH", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('maxTime'),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "maxTime", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('timeLinePadding'),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "timeLinePadding", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myCanvas'),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "myCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], EventStateChangeTimelineComponent.prototype, "onChangeTimeLine", void 0);
EventStateChangeTimelineComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-event-state-change-timeline',
        template: __webpack_require__("../../../../../src/app/activity/event-state-change-timeline/event-state-change-timeline.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/event-state-change-timeline/event-state-change-timeline.component.css")]
    }),
    __metadata("design:paramtypes", [])
], EventStateChangeTimelineComponent);

//# sourceMappingURL=event-state-change-timeline.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/lottie-animation-view/lottie-animation-view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/lottie-animation-view/lottie-animation-view.component.html":
/***/ (function(module, exports) {

module.exports = "<div #lavContainer [ngStyle]=\"{'width': '100%', 'height': '100%', 'overflow':'hidden', 'margin': '0 auto'}\">\n</div>"

/***/ }),

/***/ "../../../../../src/app/activity/lottie-animation-view/lottie-animation-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LottieAnimationViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var bodymovin = __webpack_require__("../../../../bodymovin/build/player/bodymovin.js");

var LottieAnimationViewComponent = (function () {
    function LottieAnimationViewComponent(appDataService) {
        this.appDataService = appDataService;
    }
    LottieAnimationViewComponent.prototype.ngOnInit = function () {
        console.log("set lottie = " + this.initUrl);
        if (this.initUrl) {
            this.setDataUrl(this.initUrl);
        }
    };
    LottieAnimationViewComponent.prototype.setDataUrl = function (url) {
        if (this.url !== url) {
            this.url = url;
            if (this.url) {
                if (this.anim) {
                    this.anim.stop();
                }
                this.resetAnimator();
            }
        }
    };
    LottieAnimationViewComponent.prototype.resetAnimator = function () {
        var temp = JSON.stringify(this.appDataService.readFileSync(this.url));
        // const temp2 = JSON.stringify(temp);
        var start = temp.indexOf(',animationData={');
        console.log("start postion =" + start);
        console.log("this.url = " + this.url);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LottieAnimationViewComponent.prototype, "initUrl", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], LottieAnimationViewComponent.prototype, "width", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], LottieAnimationViewComponent.prototype, "height", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('lavContainer'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], LottieAnimationViewComponent.prototype, "lavContainer", void 0);
LottieAnimationViewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-lottie-animation-view',
        template: __webpack_require__("../../../../../src/app/activity/lottie-animation-view/lottie-animation-view.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/lottie-animation-view/lottie-animation-view.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _b || Object])
], LottieAnimationViewComponent);

var _a, _b;
//# sourceMappingURL=lottie-animation-view.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/object-new/object-new.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".object-new .btn-object-new {\n         width: 32.5%;\n    height: 84px;\n    border: none;\n    background-color: #fff;\n    position: relative;\n    margin:1px;\n \n}\n\n\n.layers-btn {\n    padding: 15px;\n    background-color: #ebebeb;\n}\n\n.layers-btn::after\n{content:””; display:block; clear:both;}\n\n\n.object-new .btn-object-new:hover {\n    -webkit-transform: scale(1.02);\n            transform: scale(1.02);\n    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.23);\n    z-index: 7999;\n    transition: 0.1s all ease;\n    -webkit-transition: 0.1s all ease;\n    -moz-transition: 0.1s all ease;\n    -o-transition: 0.1s all ease;\n    -ms-transition: 0.1s all ease;\n    cursor: pointer;\n}\n\n.layers-btn .motion-btn {\n    float: left;\n}\n\n\n\n.motion-btn-wrap {\n    overflow: hidden;\n}\n\n.layers-btn .motion-btn img {\n    max-width: 45px;\n    max-height: 53px;\n    margin-left: auto;\n    margin-right: auto;\n    padding-top: 13px;\n}\n\n.layers-btn .motion-btn p {\n    text-align: center;\n    width: 100%;\n    font-size: 11px;\n    color: #454545;\n    position: absolute;\n    bottom: 1px;\n    margin-bottom: 6px;\n}\n\n.img-responsive {\n        display: block;\n    max-width: 100%;\n    height: auto;\n}\n\n\n.object-new {\n    position: relative;\n\n    overflow: hidden;\n}\n\n.label-properties img {\n    width: 18px;\n    cursor: pointer;\n    opacity: 0.7;\n    padding-top: 3px;\n}\n\n.label-properties img:hover {\n   \n    opacity: 1;\n}\n\n.col-8{\n    width: 66%;\n    float: left;\n}\n\n.col-4 {\n    width: 33%;\n    float: right;\n}\n\n.label-properties{\n    font-size: 14px;\n    font-weight: 600;\n    padding: 6px 10px;\n    background-color: #fff;\n    color: #454545;\n    position: relative;\n    overflow: hidden;\n}\n\n.object-new .btn-resource{\n    width: 22.5%;\n    height: 56px;\n    border: 1px solid #ccc;\n    background: url(" + __webpack_require__("../../../../../src/assets/images/bg_transparent.png") + ");   \n    position: relative;\n    margin: 3px;\n    float: left;\n}\n\n\n\n.select-file {\nmargin: 0;\nfont-size: 12px;\ncolor:#898989;\ntext-align: center;\nmargin-top: 10px;\n}\n\n.select-file a {\n    text-decoration: none;\n    color:#898989;\npadding: 5px 10px;\n}\n\n.select-file a:hover {\n    color:#454545;\n}\n\n.select-file .active {\n    color:#46a2ba;\n}\n\n.select-file .active:hover {\n    color:#1e839d;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/object-new/object-new.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"object-new\">\n\n    <div class=\"label-properties\">New Layers</div>\n\n\n    <div class=\"layers-btn\" style=\"width: 100%;height:100px;\">\n\n        <!-- 이미지 들어있는 버튼 예시 -->\n        <!--\n        <div class=\"motion-btn-wrap\">\n\n            <div class=\"motion-btn btn-object-new\">\n                <img src=\"../assets/images/btn_frame.png\" class=\"img-responsive\">\n                <p> FrameLayout</p>\n            </div>\n\n            <div class=\"motion-btn btn-object-new\">\n                <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n                <p> ImageView</p>\n            </div>\n\n            <div class=\"motion-btn btn-object-new\">\n                <img src=\"../assets/images/btn_text.png\" class=\"img-responsive\">\n                <p> TextView</p>\n            </div>\n\n        </div>-->\n\n        <!-- 이미지 들어있는 버튼 예시 @-->\n        <button class=\"btn-object-new motion-btn\" (click)=\"clickPSD()\">\n             <img src=\"./assets/images/btn_importpsd.png\"  class=\"img-responsive\">\n            PSD\n        </button>\n\n\n        <button class=\"btn-object-new motion-btn\" *ngFor=\"let aType of objectTypeData\" (click)=\"clickNewObject(aType.type)\">\n             <img [src]=\"aType.icon\" class=\"img-responsive\">\n            {{aType.name}}\n        </button>\n\n\n\n\n\n\n    </div>\n\n</div>\n\n<div class=\"object-new\" style=\"margin-top:15px; display:none;\">\n\n\n    <div class=\"label-properties\">\n\n        <div class=\"col-8\" style=\"padding-left: 0;\">\n            Resource\n        </div>\n        <div align=\"right\" class=\"col-4\" style=\"padding:0;\">\n            <div>\n                <img (click)=\"clickResource()\" class=\"img-responsive\" src=\"assets/images/btn_motion_add.png\">\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"select-file\">\n        <a href=\"#\" class=\"active\">Image</a> <a href=\"#\">JSON</a><a href=\"#\">Video</a><a href=\"#\">Font</a>\n    </div>\n\n    <div class=\"layers-btn \" style=\"width: 100%;height:100px; padding-top:5px;\">\n\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n        <div class=\"btn-resource\">\n            <img src=\"../assets/images/btn_imageview.png\" class=\"img-responsive\">\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/activity/object-new/object-new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
        this.onClickNewObject = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onChangeTreeData = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onShowResourceDialog = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.objectTypeData = [];
    }
    ObjectNewComponent.prototype.ngOnInit = function () {
    };
    ObjectNewComponent.prototype.setObjectTypeData = function (objectTypeData) {
        this.objectTypeData = objectTypeData;
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ObjectNewComponent.prototype, "onClickNewObject", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ObjectNewComponent.prototype, "onChangeTreeData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ObjectNewComponent.prototype, "onShowResourceDialog", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ObjectNewComponent.prototype, "prefix", void 0);
ObjectNewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-object-new',
        template: __webpack_require__("../../../../../src/app/activity/object-new/object-new.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/object-new/object-new.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _a || Object])
], ObjectNewComponent);

var _a;
//# sourceMappingURL=object-new.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/object-property/object-property.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".label-properties {\n    font-size: 14px;\n    font-weight: 600;\n    padding: 6px 10px;\n    background-color: #fff;\n    color: #454545;\n    position: relative;\n}\n\n.label-properties-2 {\n    font-size: 12px;\n    font-weight: 600;\n    padding: 6px 10px;\n    background-color: #efeff0;\n    border-top: #dfdfe0 1px solid;\n    border-bottom: #dfdfe0 1px solid;\n    color: #454545;\n    position: relative;\n    margin-bottom: 0px !important;\n}\n\n.label-properties-2:hover {\n    cursor: pointer;\n    background-color: #dededf;\n}\n\n.label-properties-2 i {\n    position: absolute;\n    right: 0;\n    margin-right: 10px;\n}\n\n.object-property {\n    background: #f9fafb;\n    padding-top: 15px;\n    padding-bottom: 15px;\n}\n\n.object-property input {\n    height: 28px;\n    width: 100%;\n    padding: 4px 8px;\n    font-size: 13px;\n    border-radius: 4px;\n    border: none;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n}\n\n.object-property .property-input {\n    width: 65%;\n    float: right;\n    padding-left: 15px;\n    padding-right: 15px;\n}\n\n.object-property .property-input-wrap {\n    overflow: hidden;\n}\n\n.object-property label {\n    width: 30%;\n    font-size: 11px;\n    font-weight: 400;\n    color: #898989;\n    padding-top: 7px;\n    float: left;\n    padding-left: 15px;\n    padding-right: 15px;\n}\n\n.btn-img button {\n    width: 290px;\n    height: 28px;\n    margin: 15px;\n    background: #fff;\n    border: 1px solid #ccc;\n    border-radius: 2px;\n    color: #454545;\n}\n\n.btn-img button:hover {\n    background: #f9f9f9;\n    cursor: pointer;\n}\n\n.go-event-detail .btn-trash {\n    background: transparent;\n    border: none;\n}\n\n.btn-more button {\n    width: 290px;\n    height: 28px;\n    margin: 15px;\n    background: #f1f1f1;\n    border: none;\n    border-radius: 2px;\n    color: #454545;\n    border: 1px solid #ececec;\n}\n\n.btn-more button:hover {\n    background: #e9e9e9;\n    cursor: pointer;\n}\n\n.object-property .img-selected {\n    padding-left: 15px;\n    padding-right: 15px;\n    overflow: hidden;\n}\n\n.object-property .img-selected img {\n    width: 60px;\n    border: 1px solid #ececec;\n    padding: 6px;\n    float: left;\n    margin-right: 15px;\n}\n\n.object-property .img-selected .img-sub {\n    float: left;\n    padding-top: 8px;\n}\n\n.object-property .img-selected .img-sub p {\n    margin-bottom: 0px;\n    font-size: 12px;\n    color: #898989;\n    margin-top: 3px;\n}\n\n.object-property .img-selected .img-sub .img-sub-size {\n    font-size: 11px;\n    color: #ccc;\n}\n\n.property-detail {\n    overflow: hidden;\n}\n\n.property-detail-wrap {\n    padding-top: 10px;\n    padding-bottom: 10px;\n}\n\n.opensource-info {\n    background: rgba(255, 255, 255, 0.7);\n    padding: 25px;\n    font-size: 10px;\n    color: #898989;\n}\n\n.opensource-info .info-title {\n    color: #454545;\n}\n\n.opensource-info .info-link {\n    color: #6262c5;\n}\n\n.opensource-info .info-link:hover {\n    text-decoration: underline;\n    color: #3b3baa;\n    cursor: pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/object-property/object-property.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!selectedTriggerEvent||viewMode=='guide'\">\n  <div class=\"object-property\" style=\"padding-top:0;\">\n    <div class=\"label-properties\" style=\"margin-bottom:15px;\">Properties</div>\n    <div *ngIf=\"selectedObject\" class=\"btn-img\">\n\n      <!-- 이미지, 파일 선택버튼 -->\n      <div *ngIf=\"selectedObject.type=='ImageView'\">\n        <div *ngIf=\"selectedObject.dataUrl\" class=\"img-selected\">\n          <img [src]=\"prefix+applicationFolderPath+'/'+selectedObject.dataUrl\" />\n          <div class=\"img-sub\">\n            <p>{{selectedObject.dataUrl}}</p>\n            <p class=\"img-sub-size\" (click)=\"clickDownload(prefix+applicationFolderPath+'/'+selectedObject.dataUrl)\">Donwload</p>\n          </div>\n        </div>\n        <button [hidden]=\"viewMode=='guide'\" (click)=\"clickSelectImage()\"> ImageSelect</button>\n      </div>\n\n      <div *ngIf=\"selectedObject.type=='LottieAnimationView'||selectedObject.type=='VideoView'\">\n\n        <p>{{selectedObject.dataUrl}}</p>\n        <button [hidden]=\"viewMode=='guide'\" (click)=\"clickSelectFile()\"> FileSelect</button>\n      </div>\n\n      <div *ngIf=\"selectedObject.type=='TextView'\">\n        text <input [(ngModel)]=\"selectedObject.contentText\" />\n      </div>\n\n      <!-- 이미지, 파일 선택버튼@ -->\n\n      <div class=\"label-properties-2\" style=\"margin-bottom:15px;\">Info</div>\n      <div class=\"property-detail\" style=\"margin-bottom:8px;\">\n        <label>type:</label>\n        <div class=\"property-input\">\n          <label>{{selectedObject.type}}</label>\n        </div>\n      </div>\n      <div class=\"property-detail\">\n        <label>name:</label>\n        <div class=\"property-input\">\n          <input [(ngModel)]=\"selectedObject.name\">\n        </div>\n      </div>\n      <div class=\"property-detail\">\n        <label>background:</label>\n        <div class=\"property-input\">\n          <input [(ngModel)]=\"selectedObject.backgroundColor\">\n        </div>\n      </div>\n\n\n    </div>\n\n    <!-- <div class=\"btn-more\">\n            <button style=\"margin-bottom:8px;\">Open source(이미지출처) <i class=\"fa fa-sort-desc\"></i></button>\n        </div> -->\n\n\n    <div *ngIf=\"openSource\">\n      <div class=\"label-properties-2\" style=\"margin-top:15px;margin-bottom:15px;\">\n        Open Source\n      </div>\n      <div class=\"opensource-info\">\n        <div class=\"info-title\">{{openSource.title}}</div>\n        <div class=\"info-author\">Author:{{openSource.author}}</div>\n        <div class=\"info-description\">Description: {{openSource.description}}</div>\n        <div class=\"info-link\"><a (click)=\"clickLink(openSource.url)\">{{openSource.url}}</a></div>\n      </div>\n    </div>\n\n\n    <div *ngIf=\"selectedState\">\n      <!-- 타이포그래피 -->\n\n      <div [hidden]=\"true\">\n        <div (click)=\"toggleShowText()\" class=\"label-properties-2\" style=\"margin-bottom:15px;\">\n          Typography\n          <i class=\"fa fa-sort-desc\"></i>\n        </div>\n\n        <div class=\"property-detail-wrap\" [hidden]=\"!needShowText\">\n          <div class=\"property-detail\">\n            <label>fontFamily:</label>\n            <div class=\"property-input\">\n              <input />\n            </div>\n          </div>\n          <div class=\"property-detail\">\n            <label>style/size:</label>\n            <div class=\"property-input\">\n              <input />\n            </div>\n          </div>\n          <div class=\"property-detail\">\n            <label>lineHeight:</label>\n            <div class=\"property-input\">\n              <input />\n            </div>\n          </div>\n          <div class=\"property-detail\">\n            <label>fontColor:</label>\n            <div class=\"property-input\">\n              <input />\n            </div>\n          </div>\n        </div>\n      </div>\n      <!-- 타이포그래피@ -->\n\n      <!-- 사이즈 -->\n\n\n      <div (click)=\"toggleShowSize()\" class=\"label-properties-2\" style=\"margin-bottom:15px;\">\n        Size\n        <i class=\"fa fa-sort-desc\"></i>\n      </div>\n\n      <div class=\"property-detail-wrap\" [hidden]=\"!needShowSize\">\n        <div class=\"property-detail\">\n          <label>width:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.width\">\n          </div>\n        </div>\n        <div class=\"property-detail\">\n          <label>height:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.height\">\n          </div>\n        </div>\n        <div class=\"property-detail\">\n          <label>scaleX:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.scaleX\">\n          </div>\n        </div>\n        <div class=\"property-detail\">\n          <label>scaleY:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.scaleY\">\n          </div>\n        </div>\n\n      </div>\n\n      <!-- 사이즈@ -->\n\n      <!--마진 -->\n      <div (click)=\"toggleShowMargin()\" class=\"label-properties-2\" style=\"margin-bottom:15px;\">\n        Margin\n        <i class=\"fa fa-sort-desc\"></i>\n      </div>\n\n      <div class=\"property-detail-wrap\" [hidden]=\"!needShowMargin\">\n\n        <div class=\"property-detail\">\n          <label>marginTop:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.marginTop\">\n          </div>\n        </div>\n        <div class=\"property-detail\">\n          <label>marginLeft:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.marginLeft\">\n          </div>\n        </div>\n        <div class=\"property-detail\">\n          <label>marginRight:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.marginRight\">\n          </div>\n        </div>\n        <div class=\"property-detail\">\n          <label>marginBottom:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.marginBottom\">\n          </div>\n        </div>\n\n      </div>\n      <!--마진@ -->\n\n      <!--padding -->\n\n      <div (click)=\"toggleShowPadding()\" class=\"label-properties-2\" style=\"margin-bottom:15px;\">\n        Padding\n        <i class=\"fa fa-sort-desc\"></i>\n      </div>\n\n      <div class=\"property-detail-wrap\" [hidden]=\"!needShowPadding\">\n        <div class=\"property-detail\">\n          <label>paddingLeft:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.paddingLeft\">\n          </div>\n        </div>\n        <div class=\"property-detail\">\n          <label>paddingRight:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.paddingRight\">\n          </div>\n        </div>\n        <div class=\"property-detail\">\n          <label>paddingTop:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.paddingTop\">\n          </div>\n        </div>\n        <div class=\"property-detail\">\n          <label>paddingBottom:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.paddingBottom\">\n          </div>\n        </div>\n      </div>\n      <!--padding @-->\n\n      <!-- transform -->\n\n      <div (click)=\"toggleShowTranslation()\" class=\"label-properties-2\" style=\"margin-bottom:15px;\">\n        Transform\n        <i class=\"fa fa-sort-desc\"></i>\n      </div>\n\n      <div class=\"property-detail-wrap\" [hidden]=\"!needShowTranslation\">\n\n        <div class=\"property-detail\">\n          <label>translationX:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.translationX\">\n          </div>\n        </div>\n        <div class=\"property-detail\">\n          <label>translationY:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.translationY\">\n          </div>\n        </div>\n\n        <div class=\"property-detail\">\n          <label>rotate:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.rotate\">\n          </div>\n        </div>\n        <div class=\"property-detail\">\n          <label>alpha:</label>\n          <div class=\"property-input\">\n            <input [(ngModel)]=\"selectedState.alpha\">\n          </div>\n        </div>\n\n      </div>\n\n      <!-- transform@ -->\n\n      <!--code -->\n      <div (click)=\"toggleShowCode()\" class=\"label-properties-2\" style=\"margin-bottom:15px;\">\n        Code\n        <i class=\"fa fa-sort-desc\"></i>\n      </div>\n      <div *ngIf=\"selectedState&&needShowCode&&objectLayoutData\">\n        <button [clip]=\"objectLayoutData\" (onClip)=\"callback($event)\">copy</button>\n        <handy-syntax-highlighter *ngIf=\"objectLayoutData\" [language]=\"'java'\" [content]=\"objectLayoutData\"></handy-syntax-highlighter>\n      </div>\n      <!--code@ -->\n    </div>\n\n  </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/activity/object-property/object-property.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectPropertyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
    function ObjectPropertyComponent(appDataService, zone, broadcaster) {
        this.appDataService = appDataService;
        this.zone = zone;
        this.broadcaster = broadcaster;
        this.onShowResourceDialog = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
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
        this.needShowText = false;
        this.needShowSize = false;
        this.needShowMargin = false;
        this.needShowPadding = false;
        this.needShowTranslation = false;
        this.needShowCode = false;
    }
    ObjectPropertyComponent.prototype.toggleShowText = function () {
        this.needShowText = !this.needShowText;
    };
    ObjectPropertyComponent.prototype.toggleShowSize = function () {
        this.needShowSize = !this.needShowSize;
    };
    ObjectPropertyComponent.prototype.toggleShowMargin = function () {
        this.needShowMargin = !this.needShowMargin;
    };
    ObjectPropertyComponent.prototype.toggleShowPadding = function () {
        this.needShowPadding = !this.needShowPadding;
    };
    ObjectPropertyComponent.prototype.toggleShowTranslation = function () {
        this.needShowTranslation = !this.needShowTranslation;
    };
    ObjectPropertyComponent.prototype.toggleShowCode = function () {
        this.needShowCode = !this.needShowCode;
    };
    ObjectPropertyComponent.prototype.ngOnInit = function () {
        if (this.viewMode === 'guide') {
            this.needShowText = true;
            this.needShowSize = true;
            this.needShowMargin = true;
            this.needShowPadding = true;
            this.needShowTranslation = true;
            this.needShowCode = true;
        }
    };
    ObjectPropertyComponent.prototype.ngAfterViewInit = function () {
        // this.imageComponent.setFileResourceVisible(false);
        // this.fileComponent.setImageResourceVisible(false);
    };
    ObjectPropertyComponent.prototype.getAllKeys = function (target) {
        var keys = Object.keys(target);
        return MediaKeyStatusMap;
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
        var message = {
            kind: 'select-file',
            target: target,
            dataUrl: this.selectedObject.dataUrl
        };
        this.broadcaster.broadcast('activity', message);
        // this.onShowResourceDialog.emit(target);
    };
    ObjectPropertyComponent.prototype.clickDownload = function (url) {
        this.appDataService.openUrl(url);
    };
    ObjectPropertyComponent.prototype.onChangeData = function () {
        this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
        this.selectedObject = this.appDataService.getSelectedObject();
        this.selectedState = this.appDataService.getSelectedState();
        this.objectBasicData = this.appDataService.findObjectBasicDataByType(this.selectedObject.type);
        if (this.objectBasicData) {
            this.openSource = this.objectBasicData.openSource;
        }
        else {
            this.openSource = null;
        }
        this.objectLayoutData = null;
        var self = this;
        setTimeout(function () {
            self.objectLayoutData = self.appDataService.makeBeautify(self.appDataService.insertChild(self.selectedObject.id));
        }, 10);
    };
    ObjectPropertyComponent.prototype.callback = function ($event) {
        console.log("done clip");
    };
    ObjectPropertyComponent.prototype.clickLink = function (targetUrl) {
        var message = {
            kind: 'open-url',
            url: targetUrl
        };
        this.broadcaster.broadcast('activity', message);
    };
    return ObjectPropertyComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ObjectPropertyComponent.prototype, "onShowResourceDialog", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ObjectPropertyComponent.prototype, "viewMode", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ObjectPropertyComponent.prototype, "prefix", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ObjectPropertyComponent.prototype, "applicationFolderPath", void 0);
ObjectPropertyComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-object-property',
        template: __webpack_require__("../../../../../src/app/activity/object-property/object-property.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/object-property/object-property.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _c || Object])
], ObjectPropertyComponent);

var _a, _b, _c;
//# sourceMappingURL=object-property.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/object-tree/object-tree.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/object-tree/object-tree.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"object-tree\">\n\n    <div class=\"label-properties\">Layers</div>\n\n<div style=\"width: 100%; height:300px;\">\n    <tree-root #tree [nodes]=\"nodes\" [options]=\"options\" (onMoveNode)=\"changeNode($event)\" (onActivate)=\"selectNode($event)\"></tree-root>\n</div>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/activity/object-tree/object-tree.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectTreeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_tree_component__ = __webpack_require__("../../../../angular2-tree-component/dist/angular2-tree-component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
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
        this.onSelectNode = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onChangeNode = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ObjectTreeComponent.prototype.selectNode = function ($event) {
        // console.log("select data = " + JSON.stringify(Object.keys(event.node.data)));
        this.selectedNode = $event.node.data;
        this.onSelectNode.emit(this.selectedNode.id);
    };
    ObjectTreeComponent.prototype.changeNode = function ($event) {
        $event.node.parentId = $event.to.parent.id;
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_angular2_tree_component__["a" /* TreeComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_tree_component__["a" /* TreeComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_tree_component__["a" /* TreeComponent */]) === "function" && _a || Object)
], ObjectTreeComponent.prototype, "tree", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ObjectTreeComponent.prototype, "prefix", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ObjectTreeComponent.prototype, "viewMode", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ObjectTreeComponent.prototype, "onSelectNode", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ObjectTreeComponent.prototype, "onChangeNode", void 0);
ObjectTreeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-object-tree',
        template: __webpack_require__("../../../../../src/app/activity/object-tree/object-tree.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/object-tree/object-tree.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _b || Object])
], ObjectTreeComponent);

var _a, _b;
//# sourceMappingURL=object-tree.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/preview-size/preview-size.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".preview-size {\n    background-color: #efeff0;\n    padding:10px;\n    padding-bottom: 6px;\n}\n\n\n\n.preview-size input {\n\n        height: 23px;\n    width: 100%;\n    padding: 4px 8px;\n    font-size: 13px;\n    border-radius: 4px;\n    border: 1px solid rgba(0, 0, 0, 0.07);\n    border-top: none;\n    border-bottom: none;\n\n}\n\n.preview-size .row {\n    margin: 0;\n}\n\n.preview-size .row .col-xs-7 {\n    padding-right: 2px;\n    padding-left: 2px;\n}\n\n.preview-size .dropdown {\n    width: 100%;\n    text-align: center;\n}\n\n.dropdown {\n    display: inline-block;\n}\n\n.mobile-size {\n    position: relative;\n}\n\n.preview-size .properties-wrap {\n    z-index: 9999;\n}\n\n.properties-wrap {\n    position: relative;\n    width: 50%;\n    float: left;\n}\n\n.preview-size .dropdown button {\n    width: 100%;\n    border: none;\n    background-color: rgba(255, 255, 255, 0.8);\n    border-radius: 4px;\n    color: #898989;\n    font-size: 13px;\n}\n\n.preview-size .dropdown button:hover {\n    cursor: pointer;\n}\n\n.preview-size .mobile-size button {\n    border: none;\n    background-color: rgba(255,255,255,0.8);\n    border-radius: 4px;\n    color: #898989;\n    font-size: 13px;\n    padding-left:4px;\n    width: 15% !important;\n    margin-left: 1px;\n}\n\n.dropdown-menu {\n       min-width: 60px;\n    font-size: 13px;\n    text-align: left;\n    position: absolute;\n    z-index: 999;\n    background: #fff;\n  box-shadow: 0px 3px 10px 1px rgba(0,0,0,0.29);\n    margin-top: 10px;\n}\n\n.dropdown-menu div:hover {\n    background: #f9f9f9;\n}\n\n.dropdown-menu-padding {\n\n    min-width: 120px;\n    text-align: center;\n}\n\n.dropdown-menu-padding div {\n    padding-top: 6px;\n    padding-bottom: 6px;\n    border-bottom: 1px solid #ececec;\n}\n\n\n.preview-size .properties-wrap .properties-text {\n    top: 5px;\n}\n\n.properties-wrap .properties-text {\n    position: absolute;\n    top: 9px;\n    font-size: 10px;\n    left: 6px;\n    color: #ccc;\n}\n\n.preview-size .properties-wrap .properties-padding {\n    padding-left: 20px;\n    padding-right: 0px;\n}\n\n.dropdown input {\n    height: 23px;\n    width: 100%;\n    padding: 4px 8px;\n    font-size: 13px;\n    border-radius: 4px;\n    border: 1px solid rgba(0, 0, 0, 0.07);\n    border-top: none;\n    border-bottom: none;\n}\n\n.preview-size .row .col-xs-2 {\n    padding-right: 2px;\n    padding-left: 2px;\n}\n\n.preview-size .row .col-xs-4 {\n    padding-right: 2px;\n    padding-left: 2px;\n}\n\n.mobile-size .ic-mobile {\n    width: 12px;\n    opacity: 0.6;\n}\n\n.dropdown-menu-padding div:hover {\n    cursor: pointer;\n}\n\n.root-size {\n    padding: 3px 10px;\n    padding-left: 40px;\n    font-size: 12px;\n    border-bottom: 1px solid #ececec;\n    position: relative;\n}\n\n.root-size:hover {\n    cursor: pointer;\n}\n\n.root-size img {\n    position: absolute;\n    left: 0;\n    margin-left: 13px;\n    opacity: 0.8;\n}\n\n\n\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/preview-size/preview-size.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"preview-size\">\n\n    <!--<input [(ngModel)]=\"zoom\" (blur)=\"changeZoom()\">-->\n\n\n    <div class=\"row\">\n        <div class=\"col-xs-7\">\n            <div class=\"dropdown mobile-size\" role=\"menu\">\n                <!--{{getStateById('root').width}}*{{getStateById('root').height}}-->\n                <div style=\"padding:3px; padding-left: 0px; padding-top: 0;\" class=\"canvas-size\">\n                    <div class=\"properties-wrap\" style=\"width:42%;\">\n                        <span class=\"properties-text\">W:</span>\n                        <input class=\"properties-padding \" type=\"number\" [(ngModel)]=\"rootWidth\" (change)=\"changeW(event)\">\n                    </div>\n                    <div class=\"properties-wrap\" style=\"width:42%;\">\n                        <span class=\"properties-text\">H:</span>\n                        <input class=\"properties-padding \" type=\"number\" [(ngModel)]=\"rootHeight\" (change)=\"changeH(event)\">\n                    </div>\n\n                    <button type=\"button\" (click)=\"clickRootSizeToggle()\">\n                                        <img class=\"ic-mobile\" src=\"assets/images/ic_size.png\">\n                                    </button>\n                    <div class=\"dropdown-menu\" style=\"margin-left:20px;\" [hidden]=\"!showRootSize\">\n\n                        <div class=\"root-size \" (click)=\"changeRootSize(1440,2960)\">\n                            <img style=\" max-width:15px;\" class=\"img-responsive\" src=\"assets/images/ic_galaxy_s7.png\"> Galaxy S8\n                            <br><b>1440*2960</b></div>\n\n                        <div class=\"root-size \" (click)=\"changeRootSize(1440,2560)\">\n                            <img style=\" max-width:15px;\" class=\"img-responsive\" src=\"assets/images/ic_galaxy_s7.png\"> Galaxy S7\n                            <br><b>1440*2560</b></div>\n\n                        <div class=\"root-size \" (click)=\"changeRootSize(1080,1920)\">\n                            <img style=\" max-width:15px;\" class=\"img-responsive\" src=\"assets/images/ic_galaxy_s5.png\"> Galaxy S5\n                            <br><b>1080*1920</b></div>\n\n                        <div class=\"root-size \" (click)=\"changeRootSize(1600,2560)\">\n                            <img style=\" max-width:18px; margin-left:12px; margin-top:2px;\" class=\"img-responsive\" src=\"assets/images/ic_galaxy_note.png\"> Galaxy Note 10.1\n                            <br><b>1600*2560</b></div>\n\n                        <div class=\"root-size \" (click)=\"changeRootSize(720,1280)\">\n                            <img style=\" max-width:15px;\" class=\"img-responsive\" src=\"assets/images/ic_galaxy_s3.png\"> Galaxy S3\n                            <br><b>720*1280</b></div>\n                    </div>\n\n                </div>\n            </div>\n        </div>\n        <div class=\"col-xs-5\" style=\"width:40%; padding:0;\">\n            <div class=\"dropdown\" role=\"menu\">\n                <button type=\"button\" (click)=\"clickZoomToggle()\">{{zoomLevel}}%</button>\n                <div class=\"dropdown-menu dropdown-menu-padding\" [hidden]=\"!showZoom\">\n                    <div (click)=\"changeZoom(10)\">10%</div>\n                    <div (click)=\"changeZoom(15)\">15%</div>\n                    <div (click)=\"changeZoom(20)\">20%</div>\n                    <div (click)=\"changeZoom(25)\">25%</div>\n                    <div (click)=\"changeZoom(50)\">50%</div>\n                    <div (click)=\"changeZoom(75)\">75%</div>\n                    <div (click)=\"changeZoom(100)\">100%</div>\n                </div>\n            </div>\n        </div>\n        <!--<div class=\"col-xs-4\">\n            <div class=\"dropdown\" role=\"menu\">\n                <button type=\"button\" data-toggle=\"dropdown\">FullScreen</button>\n                <div class=\"dropdown-menu dropdown-menu-padding\" style=\"margin-left: -20px;\">\n                    <div>FullScreen</div>\n                    <div>ShowStatusBar</div>\n                </div>\n            </div>\n        </div>-->\n    </div>\n\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/activity/preview-size/preview-size.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewSizeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PreviewSizeComponent.prototype, "viewMode", void 0);
PreviewSizeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-preview-size',
        template: __webpack_require__("../../../../../src/app/activity/preview-size/preview-size.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/preview-size/preview-size.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _b || Object])
], PreviewSizeComponent);

var _a, _b;
//# sourceMappingURL=preview-size.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/preview/preview-object/preview-object.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".disable-text-selection {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n\n.img-data {\n    font-size: 12px;\n    text-align: center;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/preview/preview-object/preview-object.component.html":
/***/ (function(module, exports) {

module.exports = "<div [ngStyle]=\"getObjectStyle()\">\n    <img *ngIf=\"objectData.type=='ImageView' \" [src]=\"prefix+applicationFolderPath+ '/'+objectData.dataUrl\" onError=\"this.src='assets/images/ic_preview.png' \" style=\"width:100%;height:100%;\">\n    <p class=\"img-data\" *ngIf=\"objectData.type=='TextView' ||objectData.type=='Button' ||objectData.type=='EditText' \">{{objectData.text}}</p>\n\n\n    <app-lottie-animation-view #lottieView *ngIf=\"objectData.type==='LottieAnimationView'\" style=\"width:100%;height:100%;\">\n    </app-lottie-animation-view>\n\n    <video #videoView *ngIf=\"objectData.type==='VideoView'\" [src]=\"prefix+applicationFolderPath+ '/'+objectData.dataUrl\" onError=\"this.src='assets/images/ic_video.png' \" autoplay loop style=\"width:100%;height:100%;\">\n    </video>\n</div>\n<app-preview-object [prefix]=\"prefix\" [objectData]=\"aObject \" *ngFor=\"let aObject of objectData.children \"></app-preview-object>"

/***/ }),

/***/ "../../../../../src/app/activity/preview/preview-object/preview-object.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewObjectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lottie_animation_view_lottie_animation_view_component__ = __webpack_require__("../../../../../src/app/activity/lottie-animation-view/lottie-animation-view.component.ts");
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
    function PreviewObjectComponent(appDataService, elementRef, resolver) {
        this.appDataService = appDataService;
        this.elementRef = elementRef;
        this.resolver = resolver;
        this.onShowResourceDialog = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.currentComponent = null;
    }
    PreviewObjectComponent.prototype.ngOnInit = function () {
        this.state = this.appDataService.findStateByObjectId(this.objectData.id);
        this.applicationFolderPath = this.appDataService.getApplicationPath();
    };
    PreviewObjectComponent.prototype.getObjectStyle = function () {
        if (this.objectData.type === 'LottieAnimationView') {
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PreviewObjectComponent.prototype, "prefix", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PreviewObjectComponent.prototype, "objectData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PreviewObjectComponent.prototype, "onShowResourceDialog", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('videoView'),
    __metadata("design:type", Object)
], PreviewObjectComponent.prototype, "videoView", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('lottieView'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__lottie_animation_view_lottie_animation_view_component__["a" /* LottieAnimationViewComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__lottie_animation_view_lottie_animation_view_component__["a" /* LottieAnimationViewComponent */]) === "function" && _a || Object)
], PreviewObjectComponent.prototype, "lottieView", void 0);
PreviewObjectComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-preview-object',
        template: __webpack_require__("../../../../../src/app/activity/preview/preview-object/preview-object.component.html"),
        entryComponents: [__WEBPACK_IMPORTED_MODULE_2__lottie_animation_view_lottie_animation_view_component__["a" /* LottieAnimationViewComponent */]],
        styles: [__webpack_require__("../../../../../src/app/activity/preview/preview-object/preview-object.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"]) === "function" && _d || Object])
], PreviewObjectComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=preview-object.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/preview/preview.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".noselect {\n    -webkit-touch-callout: none;\n    /* iOS Safari */\n    -webkit-user-select: none;\n    /* Safari */\n    /* Konqueror HTML */\n    -moz-user-select: none;\n    /* Firefox */\n    -ms-user-select: none;\n    /* Internet Explorer/Edge */\n    user-select: none;\n    /* Non-prefixed version, currently\n                                  supported by Chrome and Opera */\n}\n\n\n.preview-dot {\n    width:10px;\n    height: 10px;\n    background-color: #46a2ba;\n    position: absolute;\n    border-radius: 30px;\n}\n\n.dot-1 {\n    left:0;top:0; margin-left: -5px;margin-top: -5px; cursor:nw-resize;\n}\n\n.dot-2 {\nright:0;top:0; margin-right: -5px;margin-top: -5px; cursor:ne-resize;\n}\n\n\n.dot-3 {\nleft:0;bottom:0; margin-left: -5px;margin-bottom: -5px; cursor:sw-resize;\n}\n\n.dot-4 {\nright:0;bottom:0; margin-right: -5px;margin-bottom: -5px; cursor:se-resize;\n}\n\napp-preview-object div:hover {\nborder:1px solid #000000;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/preview/preview.component.html":
/***/ (function(module, exports) {

module.exports = "<div #myPreview (mousemove)=\"mouseOver($event)\" (mouseleave)=\"mouseLeave($event)\" (mousedown)=\"mouseDown($event)\" (mouseup)=\"mouseUp($event)\" class=\"noselect\" (window:keydown)=\"keyDown($event)\" (window:keyup)=\"keyUp($event)\">\n    <div (window:resize)=\"onResize($event)\" *ngIf=\"activityData\">\n        <div #previewScreen *ngFor=\"let aObject of activityData.objectList\" [ngStyle]=\"getCenterStyle()\">\n            <app-preview-object [objectData]=\"aObject\" [prefix]=\"prefix\"></app-preview-object>\n            <div [ngStyle]=\"getSelectedObjectStyle()\">\n                <div class=\"preview-dot dot-1\" (mousedown)=\"resizeDown($event,0)\" *ngIf=\"!isRoot()\"></div>\n                <div class=\"preview-dot dot-2\" (mousedown)=\"resizeDown($event,1)\" *ngIf=\"!isRoot()\"></div>\n                <div class=\"preview-dot dot-3\" (mousedown)=\"resizeDown($event,2)\" *ngIf=\"!isRoot()\"></div>\n                <div class=\"preview-dot dot-4\" (mousedown)=\"resizeDown($event,3)\" *ngIf=\"!isRoot()\"></div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/activity/preview/preview.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
        this.onSelectNodeFromOther = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
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
        if ('guide' === this.viewMode) {
            this.isKeyCTRL = true;
        }
        if (this.isKeyCTRL) {
            var x = (event.clientX - this.elementView.nativeElement.offsetLeft) / this.zoom;
            var y = (event.clientY - this.elementView.nativeElement.offsetTop) / this.zoom;
            this.checkSelectedObject(x, y, true);
        }
        if (this.selectedObject.id !== 'root') {
            this.isMouseDown = true;
        }
    };
    PreviewComponent.prototype.checkSelectedObject = function (x, y, needSelectObject) {
        var targetList = this.appDataService.getAllSelectedState();
        for (var i = targetList.length - 1; i >= 0; i--) {
            var state = targetList[i];
            var left = state.translationX + state.marginLeft;
            var top = state.translationY + state.marginTop;
            var right = left + state.width;
            var bottom = top + state.height;
            if (x > left && x < right && y > top && y < bottom) {
                this.selectedOverState = state;
                var message = {
                    kind: 'select-object',
                    objectId: state.objectId
                };
                console.log("click object");
                this.broadcaster.broadcast(this.viewMode, message);
                break;
            }
        }
    };
    PreviewComponent.prototype.mouseLeave = function (event) {
        console.log("leave");
        this.mouseUp(null);
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
        if ('guide' === this.viewMode) {
            return;
        }
        if (this.appDataService.getSelectedStage().id === 'rootStage') {
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
        }
        else {
            if (this.isResizeDown) {
                if (this.resizeIndex === 0) {
                    this.appDataService.getSelectedState().translationY -= differY;
                    this.appDataService.getSelectedState().translationX -= differX;
                    this.appDataService.getSelectedState().width += differX;
                    this.appDataService.getSelectedState().height += differY;
                }
                else if (this.resizeIndex === 1) {
                    this.appDataService.getSelectedState().translationY -= differY;
                    this.appDataService.getSelectedState().width -= differX;
                    this.appDataService.getSelectedState().height += differY;
                }
                else if (this.resizeIndex === 2) {
                    this.appDataService.getSelectedState().translationX -= differX;
                    this.appDataService.getSelectedState().width += differX;
                    this.appDataService.getSelectedState().height -= differY;
                }
                else if (this.resizeIndex === 3) {
                    this.appDataService.getSelectedState().width -= differX;
                    this.appDataService.getSelectedState().height -= differY;
                }
            }
            else if (this.isMouseDown) {
                this.appDataService.getSelectedState().translationX -= differX;
                this.appDataService.getSelectedState().translationY -= differY;
            }
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
        if ('guide' === this.viewMode) {
            this.previewWidth = window.innerWidth * 0.3;
        }
    };
    PreviewComponent.prototype.getPreviewPosition = function () {
        // return 
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
    PreviewComponent.prototype.getSelectedOverObjectStyle = function () {
        return this.appDataService.getSelectedObjectStyle(this.selectedOverState);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PreviewComponent.prototype, "prefix", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PreviewComponent.prototype, "viewMode", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PreviewComponent.prototype, "onSelectNodeFromOther", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('previewScreen'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], PreviewComponent.prototype, "elementView", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myPreview'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
], PreviewComponent.prototype, "myPreview", void 0);
PreviewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-preview',
        template: __webpack_require__("../../../../../src/app/activity/preview/preview.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/preview/preview.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _d || Object])
], PreviewComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=preview.component.js.map

/***/ }),

/***/ "../../../../../src/app/activity/stage-list/stage-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".stage-list {\n        padding-top: 10px;\n    width: 100%;\n    z-index: 66;\n    background-color: #b1b6bc;\n    min-width:600px !important;\n}\n\n.stage-line {\n    height: 3px;\n    width: 100%;\n    background: radial-gradient(ellipse farthest-side at 100% 130%, #8a94d9 10%, #5aadb1 110%);\n    margin-top: 5px;\n    z-index: 899;\n}\n\n.stage-list p {\n    margin:0;\n}\n\n.tab-class {\n    border-radius: 3px;\n    padding: 4px 13px 3px 14px;\n    margin: 2px;\n        \n    color: #fff;\n    font-size: 12px;\n\n}\n\n.tab-class:hover {\n    cursor: pointer;\n\n}\n\n\n.stage-current {\nbackground: #46a2ba;\n\n}\n\n.stage-notcurrent {\n    background: #aaa;\n\n}\n\n\n\n.btn-new-stage {\n    border-bottom-width: 0;\n    padding: 8px 15px 7px 15px;\n    background-color: transparent;\n    font-size: 12px;\n    color: #ececec;\n    border: none;\n    z-index: 22;\n}\n\n.btn-new-stage:hover {\n    color:#fff;\n    cursor: pointer;\n}\n\n.stage-list-wrap {\n    position: relative;\n    margin-bottom: 3px;\n}\n\n.btn-delete {\n  position: absolute;\n  display: none;\n    right: 0;\n    top: 0;\n    font-size: 12px;\n    color: #fff;\n    opacity: 0.4;\n    padding: 8px;\n    padding-right: 10px;\n}\n\n.stage-list-wrap:hover .tab-class {\n        padding: 4px 25px 3px 14px;\n}\n\n.stage-list-wrap:hover .btn-delete {\n    display: block;\n   \n}\n\n.stage-list-wrap:hover .btn-delete:hover {\n    opacity: 1;\n}\n\n.stage-list-wrap:hover {\n    cursor: pointer;\n}\n\n.stage-list-wrap:hover .stage-notcurrent {\n background: #898989;\n}\n\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/activity/stage-list/stage-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"stage-list\">\n\n    <div *ngIf=\"stageList\">\n        <div style=\"overflow: hidden;overflow: auto; max-height: 60px; padding-left:10px;\">\n            <div class=\"stage-list-wrap\" style=\"float: left\" *ngFor=\"let aStage of stageList\" (click)=\"clickSelectStage($event,aStage)\">\n                <div *ngIf=\"aStage\">\n                    <div [ngClass]=\"currentSelectedStage.id==aStage.id?'stage-current tab-class':'stage-notcurrent tab-class'\">{{aStage.name}}</div>\n                    <div class=\"btn-delete\" *ngIf=\"aStage.id!=='rootStage'&&viewMode=='activity'\" (click)=\"clickDeleteStage($event,aStage)\"><i class=\"fa fa-trash-o\"></i></div>\n                </div>\n\n            </div>\n            <button class=\"btn-new-stage\" (click)=\"clickNewStage()\"><i class=\"fa fa-plus\"></i></button>\n        </div>\n    </div>\n\n    <div class=\"stage-line\"></div>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/activity/stage-list/stage-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StageListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
    function StageListComponent(appDataService, broadcaster) {
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
    }
    StageListComponent.prototype.ngOnInit = function () {
    };
    StageListComponent.prototype.initData = function () {
        console.log("initData");
    };
    StageListComponent.prototype.clickNewStage = function () {
        console.log("clickNewStage");
        this.sendMessage('new-stage', null);
    };
    StageListComponent.prototype.clickSelectStage = function (event, stage) {
        event.stopPropagation();
        this.sendMessage('select-stage', stage);
    };
    StageListComponent.prototype.clickDeleteStage = function (event, stage) {
        console.log("clickDeleteStage");
        event.stopPropagation();
        var result = confirm('will you delete?');
        if (result) {
            this.sendMessage('delete-stage', stage);
        }
    };
    StageListComponent.prototype.onChangeData = function () {
        this.stageList = this.appDataService.getActivityData().stageList;
        this.currentSelectedStage = this.appDataService.getSelectedStage();
    };
    StageListComponent.prototype.sendMessage = function (kind, stage) {
        var message = {
            kind: kind,
            stage: stage
        };
        this.broadcaster.broadcast(this.viewMode, message);
    };
    return StageListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], StageListComponent.prototype, "viewMode", void 0);
StageListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-stage-list',
        template: __webpack_require__("../../../../../src/app/activity/stage-list/stage-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/activity/stage-list/stage-list.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _b || Object])
], StageListComponent);

var _a, _b;
//# sourceMappingURL=stage-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".label-properties {\n    font-size: 14px;\n    font-weight: 600;\n    padding: 6px 10px;\n    background-color: #fff;\n    color: #454545;\n    position: relative;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<nav>\n    <a routerLink=\"/init\" routerLinkActive=\"active\">Init</a>\n    <a routerLink=\"/setting\" routerLinkActive=\"active\">Setting</a>\n    <a routerLink=\"/new-application\" routerLinkActive=\"active\">New Application</a>\n    <a routerLink=\"/application/folderPath\" routerLinkActive=\"active\">Application</a>\n    <a routerLink=\"/activity/folderPath/activityId\" routerLinkActive=\"active\">Activity</a>\n</nav>-->\n\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.test = 'this is test value';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__init_init_component__ = __webpack_require__("../../../../../src/app/init/init.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__setting_setting_component__ = __webpack_require__("../../../../../src/app/setting/setting.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__new_application_new_application_component__ = __webpack_require__("../../../../../src/app/new-application/new-application.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__application_application_component__ = __webpack_require__("../../../../../src/app/application/application.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__activity_activity_component__ = __webpack_require__("../../../../../src/app/activity/activity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__init_recent_project_recent_project_component__ = __webpack_require__("../../../../../src/app/init/recent-project/recent-project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__init_init_menu_init_menu_component__ = __webpack_require__("../../../../../src/app/init/init-menu/init-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__common_device_status_device_status_component__ = __webpack_require__("../../../../../src/app/common/device-status/device-status.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__application_application_info_application_info_component__ = __webpack_require__("../../../../../src/app/application/application-info/application-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__application_activity_list_activity_list_component__ = __webpack_require__("../../../../../src/app/application/activity-list/activity-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__activity_object_tree_object_tree_component__ = __webpack_require__("../../../../../src/app/activity/object-tree/object-tree.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__activity_object_new_object_new_component__ = __webpack_require__("../../../../../src/app/activity/object-new/object-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__activity_object_property_object_property_component__ = __webpack_require__("../../../../../src/app/activity/object-property/object-property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__activity_event_list_event_list_component__ = __webpack_require__("../../../../../src/app/activity/event-list/event-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__activity_preview_preview_component__ = __webpack_require__("../../../../../src/app/activity/preview/preview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__activity_stage_list_stage_list_component__ = __webpack_require__("../../../../../src/app/activity/stage-list/stage-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__activity_preview_size_preview_size_component__ = __webpack_require__("../../../../../src/app/activity/preview-size/preview-size.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__activity_event_generator_event_generator_component__ = __webpack_require__("../../../../../src/app/activity/event-generator/event-generator.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_angular2_tree_component__ = __webpack_require__("../../../../angular2-tree-component/dist/angular2-tree-component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__activity_preview_preview_object_preview_object_component__ = __webpack_require__("../../../../../src/app/activity/preview/preview-object/preview-object.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__common_resource_resource_component__ = __webpack_require__("../../../../../src/app/common/resource/resource.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__activity_event_detail_stage_change_event_detail_stage_change_component__ = __webpack_require__("../../../../../src/app/activity/event-detail-stage-change/event-detail-stage-change.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__activity_event_detail_start_activity_event_detail_start_activity_component__ = __webpack_require__("../../../../../src/app/activity/event-detail-start-activity/event-detail-start-activity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__activity_event_detail_finish_activity_event_detail_finish_activity_component__ = __webpack_require__("../../../../../src/app/activity/event-detail-finish-activity/event-detail-finish-activity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__activity_event_state_change_cell_event_state_change_cell_component__ = __webpack_require__("../../../../../src/app/activity/event-state-change-cell/event-state-change-cell.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__activity_event_state_change_graph_event_state_change_graph_component__ = __webpack_require__("../../../../../src/app/activity/event-state-change-graph/event-state-change-graph.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__activity_event_state_change_timeline_event_state_change_timeline_component__ = __webpack_require__("../../../../../src/app/activity/event-state-change-timeline/event-state-change-timeline.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__activity_lottie_animation_view_lottie_animation_view_component__ = __webpack_require__("../../../../../src/app/activity/lottie-animation-view/lottie-animation-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__guide_guide_component__ = __webpack_require__("../../../../../src/app/guide/guide.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__window_proxy_window_proxy_component__ = __webpack_require__("../../../../../src/app/window-proxy/window-proxy.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_ng2_handy_syntax_highlighter__ = __webpack_require__("../../../../ng2-handy-syntax-highlighter/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_ng2_handy_syntax_highlighter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_38_ng2_handy_syntax_highlighter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_ng2_clip__ = __webpack_require__("../../../../ng2-clip/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__code_export_code_export_component__ = __webpack_require__("../../../../../src/app/code-export/code-export.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









































var appRoutes = [
    { path: 'init/:workspaceFolder', component: __WEBPACK_IMPORTED_MODULE_6__init_init_component__["a" /* InitComponent */] },
    { path: 'init', component: __WEBPACK_IMPORTED_MODULE_6__init_init_component__["a" /* InitComponent */] },
    { path: 'guide/:activityId', component: __WEBPACK_IMPORTED_MODULE_36__guide_guide_component__["a" /* GuideComponent */] },
    { path: 'setting', component: __WEBPACK_IMPORTED_MODULE_7__setting_setting_component__["a" /* SettingComponent */] },
    { path: 'new-application', component: __WEBPACK_IMPORTED_MODULE_8__new_application_new_application_component__["a" /* NewApplicationComponent */] },
    { path: 'code-export/:applicationFolderPath', component: __WEBPACK_IMPORTED_MODULE_40__code_export_code_export_component__["a" /* CodeExportComponent */] },
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
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
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
            __WEBPACK_IMPORTED_MODULE_32__activity_event_state_change_cell_event_state_change_cell_component__["a" /* EventStateChangeCellComponent */],
            __WEBPACK_IMPORTED_MODULE_33__activity_event_state_change_graph_event_state_change_graph_component__["a" /* EventStateChangeGraphComponent */],
            __WEBPACK_IMPORTED_MODULE_34__activity_event_state_change_timeline_event_state_change_timeline_component__["a" /* EventStateChangeTimelineComponent */],
            __WEBPACK_IMPORTED_MODULE_35__activity_lottie_animation_view_lottie_animation_view_component__["a" /* LottieAnimationViewComponent */],
            __WEBPACK_IMPORTED_MODULE_36__guide_guide_component__["a" /* GuideComponent */],
            __WEBPACK_IMPORTED_MODULE_37__window_proxy_window_proxy_component__["a" /* WindowProxyComponent */],
            __WEBPACK_IMPORTED_MODULE_40__code_export_code_export_component__["a" /* CodeExportComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_24_angular2_tree_component__["b" /* TreeModule */],
            __WEBPACK_IMPORTED_MODULE_39_ng2_clip__["a" /* ClipModule */],
            __WEBPACK_IMPORTED_MODULE_38_ng2_handy_syntax_highlighter__["Ng2HandySyntaxHighlighterModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* RouterModule */].forRoot(appRoutes)
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_26__service_application_data_service_service__["a" /* ApplicationDataServiceService */], __WEBPACK_IMPORTED_MODULE_27__service_broadcast_service__["a" /* BroadcastService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/application/activity-list/activity-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".activities-top {\n    height: 40px;\n    background: #f5f6f7;\n    font-size: 15px;\n    color: #898989;\n    padding: 9px 15px;\n    margin-bottom: 0px;\n    padding-top: 11px;\n}\n\n.activities-top p {\n    margin: 0;\n}\n\n.col-3 {\n    width: 25%;\n    float: left;\n    position: relative;\n    min-height: 1px;\n    padding-right: 15px;\n    padding-left: 15px;\n    transition: -webkit-transform 8s;\n    transition: transform 8s;\n    transition: transform 8s, -webkit-transform 8s;\n}\n\n.col-wrap {\n    overflow: hidden;\n}\n\n.list-box {\n    border: 2px solid #f5f6f7;\n    margin-top: 30px;\n    margin-bottom: 30px;\n    max-width: 210px;\n    margin-left: auto;\n    margin-right: auto;\n    position: relative;\n}\n\n.list-box-left {\n    max-width: 300px;\n    margin:15px;\n}\n\n.list-box-left .list-img {\n    padding:15px 75px !important;\n}\n\n.list-box-left button:hover {\n    cursor: pointer;\n}\n\n.list-box-left .list-box-bottom {\n    background: #f5f6f7;\n}\n\n.activity-current .list-box-bottom {\n    background: #46a2ba;\n}\n\n.activity-current .list-box-bottom button{\n    color:#ffffff!important;\n}\n\n.activity-current .list-box-bottom button:hover{\n   background: rgba(255,255,255,0.5);\n}\n\n.list-box-left .list-box-bottom button {\n    color:#898989;\n}\n\n.list-box-left .list-box-bottom button:hover {\n    color:#46a2ba;\n}\n\n.list-box-left .list-text {\n    background: #ffffff;\n    padding:10px 5px!important;\n}\n\n.list-box .list-img {\n    background: #f5f6f7;\n    padding: 15px 52px;\n    position: relative;\n}\n\n.list-box-left .list-img:hover {\n    cursor: pointer;\n}\n\n.activity-current .list-img {\n    background: #46a2ba;\n}\n\n.list-box-left  .list-img   img {\n    background: #ffffff!important;\n}\n\n.list-box-left .btn-trash{\n    background: transparent;\n    border: none;   \n    padding: 5px;\n    font-size: 15px;\n}\n\n.list-box .list-text {\n    padding: 15px 5px;\n    text-align: center;\n}\n\n.list-text .list-text-title h4 {\n    margin: 0;\n    font-size: 15px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-weight: 500;\n}\n\n.list-text .list-text-title .activity-name {\n    width: 100%;\n    font-size: 15px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-weight: 500;\n    border: none;\n    text-align: center;\n}\n\n.list-text .list-text-title .activity-name:focus {\n    background: #f5f6f7;\n}\n\n.list-text .list-text-updated {\n    font-size: 12px;\n    color: #898989;\n    padding-top: 5px;\n}\n\n.list-new-wrap .list-new {\n    border: 2px dotted #dbdbdb;\n    margin-top: 30px;\n    margin-bottom: 30px;\n    background: #fff;\n    margin-left: auto;\n    margin-right: auto;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    width: 88%;\n    max-width: 210px;\n    font-size: 60px;\n    font-weight: 400;\n    color: #dbdbdb;\n}\n\n.list-new-wrap .list-new:hover {\n    border-color: #46a2ba;\n    cursor: pointer;\n    color: #46a2ba;\n}\n\n.list-box .list-img .list-hover {\n    position: absolute;\n    z-index: 999;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    display: none;\n    background: #46a2ba;\n}\n\n.list-box .list-img .list-hover button {\n    background: transparent;\n    text-align: center;\n    color: #fff;\n    border-radius: 50px;\n    display: block;\n    border: 2px solid #fff;\n    width: 110px;\n    margin-left: auto;\n    margin-right: auto;\n    padding: 6px;\n    margin-top: 6px;\n    margin-bottom: 10px;\n}\n\n.list-box .list-img .list-hover button a {\n    color: #898989;\n    text-decoration: none;\n}\n\n.list-box .list-img .list-hover button a:hover {\n    color: #46a2ba;\n    font-weight: bold;\n}\n\n.list-box .list-img .list-hover button:hover {\n    color: #46a2ba;\n    font-weight: bold;\n    background: #fff;\n    cursor: pointer;\n}\n\n.list-box .list-img:hover .list-hover {\n    display: block;\n    padding-top: 26px;\n}\n\n.list-box .list-img img {\n    background: transparent;\n    border: none;\n    outline: none;\n}\n\n.list-box .list-img .preview-img {\n    width:100px;\n    height: 150px;\n}\n\n.list-img .btn-home-on {\n     position: absolute;\n    top: 0;\n    left: 0;\n    background: #46a2ba;\n    /*background-image: url(../../../assets/images/homebutton_on.png);*/\n    background-size: cover;\n margin-left: 8px;\n  margin-top: -5px;\n    width:25px;\n    height: 25px;\n    padding:10px;\n\n}\n\n.list-img .btn-home-on p {\n      margin: 0px;\n    margin-top: -28px;\n    font-size: 12px;\n    margin-left: -14px;\n    color: #46a2ba;\n}\n\n.list-img .btn-home-on:after {\n        content: \"\";\n    width: 0;\n    height: 0;\n    position: absolute;\n    bottom: -9px;\n    left: 0;\n    border-left: 12px solid transparent;\n    border-right: 13px solid transparent;\n    border-top: 9px solid #46a2ba;\n}\n\n.list-hover .btn-home {\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: #fff;\n    /*background-image: url(../../../assets/images/homebutton_on.png);*/\n    background-size: cover;\n margin-left: 8px;\n  margin-top: -5px;\n    width:25px;\n    height: 25px;\n    padding:10px;\nbox-shadow: -1px -2px 5px -1px rgba(0,0,0,0.17);\n}\n\n.list-img .btn-home:after {\n         content: \"\";\n    width: 0;\n    height: 0;\n    position: absolute;\n    bottom: -9px;\n    left: 0;\n    border-left: 12px solid transparent;\n    border-right: 13px solid transparent;\n    border-top: 9px solid #fff;\n}\n\n.list-hover .btn-home:hover {\n    background-image: url(" + __webpack_require__("../../../../../src/assets/images/homebutton_small.png") + ");\n width:26px;\n    height: 26px;\n    cursor: pointer;\n}\n\n\n/*.list-box .btn-home img {\n    background: none!important;\n    margin: 8px;\n}*/\n\n.list-scroll {\n    overflow-x: auto;\n    overflow-y: scroll;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    margin-left: 280px;\n    margin-top: 110px;\n    min-width:800px;\n}\n\n.home-tag-wrap {\n    margin-left: 15px;\n    color:#46a2ba;\n    overflow: hidden;\n}\n\n\n.home-tag-wrap .home-tag {\n    width:30px;\n    height: 30px;\n    background: #46a2ba;\n      position: relative;\n      float: left;\n}\n\n.home-tag-wrap .home-tag img {\n    width:20px;\n        margin-left: 5px;\n    margin-top: 7px;\n}\n\n.home-tag-wrap p {\n        float: left;\n    margin-top: 9px;\n    font-size: 13px;\n    margin-left: 5px;\n}\n\n.home-tag:after {\n        content: \"\";\n    width: 0;\n    height: 0;\n    position: absolute;\n    bottom: -10px;\n    left: 0;\n    border-left: 15px solid transparent;\n    border-right: 15px solid transparent;\n    border-top: 10px solid #46a2ba;\n}\n\n.list-box-export {\n\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    margin-top: 264px;\n    overflow-y: auto;\n}\n\n\n\n@media (min-width: 1850px) {\n    .col-3 {\n        width: 20%;\n    }\n}\n\n@media (max-width: 1080px) {\n    .col-3 {\n        width: 33.33333%;\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/application/activity-list/activity-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"viewMode==='application'\">\n\n    <div class=\"activities-top\">\n        <p>{{applicationData.activityList.length}} Activities </p>\n    </div>\n\n    <div class=\"list-scroll\">\n        <div class=\"col-wrap \">\n            <div *ngFor=\"let activity of applicationData.activityList\" class=\"col-3\">\n\n                <div class=\"list-box\">\n                    <div class=\"list-img\">\n                        <div class=\"btn-home-on\" *ngIf=\"activity.activityId===applicationData.launcherActivityId\">\n                            <p>Home</p>\n                        </div>\n                        <img class=\"preview-img\" [src]=\"getPreviewPath(prefix+applicationFolderPath+'/'+activity.previewPath)\">\n                        <div class=\"list-hover\">\n                            <button (click)=\"clickActivity(activity.activityId)\">Edit</button>\n                            <button (click)=\"clickDuplicateActivity(activity.activityId)\">Duplicate</button>\n                            <button (click)=\"clickDeleteActivity(activity.activityId)\">Delete</button>\n                            <div class=\"btn-home\" (click)=\"clickLauncherActivity(activity.activityId)\"></div>\n                        </div>\n                    </div>\n\n                    <div class=\"list-text\">\n                        <div class=\"list-text-title\">\n                            <input type=\"text\" class=\"activity-name\" [(ngModel)]=\"activity.activityName\" (blur)=\"onChange()\" />\n                        </div>\n                        <div class=\"list-text-updated\">\n                            {{activity.updatedAt | date:'medium'}}\n                        </div>\n                    </div>\n\n                </div>\n\n            </div>\n\n            <div class=\"col-3 list-new-wrap\">\n\n                <div class=\"list-box\">\n\n                    <div class=\"list-img\">\n                        <img width=\"100px\" height=\"150px\">\n\n                    </div>\n\n                    <div class=\"list-text\">\n                        <div class=\"list-text-title\">\n                            <h4>list text title</h4>\n                        </div>\n                        <div class=\"list-text-updated\">\n                            list text updated\n                        </div>\n                    </div>\n\n                </div>\n\n                <button class=\"list-new\" (click)=\"clickNewActivity()\">+</button>\n\n            </div>\n\n        </div>\n    </div>\n</div>\n\n\n<div *ngIf=\"viewMode==='activity'\">\n\n    <div class=\"activity-list-left\">\n        <div class=\"label-properties\">\n            Activity list\n        </div>\n    </div>\n\n    <div *ngFor=\"let activity of applicationData.activityList\" class=\"list-box list-box-left\">\n\n        <div [ngClass]=\"activity.activityId===currentActivityId?'activity-current':''\">\n            <div class=\"list-img\" (click)=\"clickActivity(activity.activityId)\">\n                <img width=\"100px\" height=\"150px\" [src]=\"getPreviewPath(prefix+applicationFolderPath+'/'+activity.previewPath)\">\n            </div>\n            <div class=\"list-text\">\n                <div class=\"btn-home\" (click)=\"clickLauncherActivity(activity.activityId)\"></div>\n                <div class=\"activity-name\" (blur)=\"onChange()\">\n                    {{activity.activityName}}\n                </div>\n                <div class=\"list-text-updated\">\n                    {{activity.updatedAt | date:'medium'}}\n                </div>\n            </div>\n\n            <div align=\"right\" class=\"list-box-bottom\">\n                <button (click)=\"clickDuplicateActivity(activity.activityId)\" class=\"btn-trash\">\n            <i  class=\"fa fa-copy\"></i>\n        </button>\n                <button (click)=\"clickDeleteActivity(activity.activityId)\" class=\"btn-trash\">\n            <i  class=\"fa fa-trash-o\"></i>\n        </button>\n            </div>\n        </div>\n    </div>\n\n    <button class=\"list-new\" (click)=\"clickNewActivity()\">+</button>\n</div>\n\n\n\n\n\n<div *ngIf=\"viewMode==='export'||viewMode==='guide'\">\n    <div class=\"list-export\">\n        <div class=\"activity-list-left\">\n            <div class=\"label-properties\">\n                {{applicationData.activityList.length}} Activities\n            </div>\n        </div>\n        <div class=\"list-box-export\">\n            <div *ngFor=\"let activity of applicationData.activityList\" class=\"list-box list-box-left\">\n                <div [ngClass]=\"activity.activityId===currentActivityId?'activity-current':''\">\n                    <div class=\"list-img\" (click)=\"clickActivity(activity.activityId)\">\n                        <img width=\"100px\" height=\"150px\" [src]=\"getPreviewPath(prefix+applicationFolderPath+'/'+activity.previewPath)\">\n                    </div>\n                    <div class=\"list-text\">\n                        <div class=\"btn-home\"></div>\n                        <div class=\"activity-name\" (blur)=\"onChange()\">\n                            {{activity.activityName}}\n                        </div>\n                        <div class=\"list-text-updated\">\n                            {{activity.updatedAt | date:'medium'}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/application/activity-list/activity-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
    function ActivityListComponent(broadcaster) {
        this.broadcaster = broadcaster;
    }
    ActivityListComponent.prototype.ngOnInit = function () {
        this.refreshTimeStamp();
    };
    ActivityListComponent.prototype.getPreviewPath = function (origin) {
        return origin + '?' + this.timestamp;
    };
    ActivityListComponent.prototype.refreshTimeStamp = function () {
        this.timestamp = new Date().getTime();
    };
    ActivityListComponent.prototype.onChangeActivityListData = function () {
        // this.onChangeActivityData.emit();
        this.sendMessage('on-change-data', '');
    };
    ActivityListComponent.prototype.clickActivity = function (activityId) {
        // this.onClickActivity.emit(activityId);
        this.sendMessage('go-detail-activity', activityId);
    };
    ActivityListComponent.prototype.clickDeleteActivity = function (activityId) {
        this.sendMessage('delete-activity', activityId);
    };
    ActivityListComponent.prototype.clickDuplicateActivity = function (activityId) {
        // this.onClickDuplicatewActivity.emit(activityId);
        this.sendMessage('duplicate-activity', activityId);
    };
    ActivityListComponent.prototype.clickNewActivity = function () {
        // this.onClickNewActivity.emit();
        this.sendMessage('new-activity', '');
    };
    ActivityListComponent.prototype.clickLauncherActivity = function (activityId) {
        // this.onClickLauncherActivity.emit(activityId);
        this.sendMessage('set-launcher-activity', activityId);
    };
    ActivityListComponent.prototype.sendMessage = function (kind, activityId) {
        var message = {
            kind: kind,
            activityId: activityId
        };
        this.broadcaster.broadcast(this.viewMode, message);
    };
    return ActivityListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ActivityListComponent.prototype, "prefix", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ActivityListComponent.prototype, "viewMode", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ActivityListComponent.prototype, "currentActivityId", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ActivityListComponent.prototype, "applicationData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ActivityListComponent.prototype, "applicationFolderPath", void 0);
ActivityListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-activity-list',
        template: __webpack_require__("../../../../../src/app/application/activity-list/activity-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/application/activity-list/activity-list.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _a || Object])
], ActivityListComponent);

var _a;
//# sourceMappingURL=activity-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/application/application-info/application-info.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn-icon {\n    position: relative;\n    margin-top: 20px;\n}\n\n.btn-icon-edit {\n    position: absolute;\n    bottom: -8px;\n    right: 65px;\n    background: rgba(255, 255, 255, 0.7);\n    border: 1px solid #ececec;\n    border-radius: 4px;\n    color: #898989;\n    padding: 0px;\n    padding: 2px 6px;\n    font-size: 16px;\n}\n\n.btn-icon-edit:hover {\n    cursor: pointer;\n    background: rgba(255, 255, 255, 0.9);\n}\n\n.project-edit {\n    background: none;\n    border: none;\n    text-align: center;\n    font-size: 20px;\n    width: 100%;\n}\n\n.project-edit:focus {\n    outline: 0;\n    background: rgba(255, 255, 255, 0.7);\n}\n\n.project-path-edit {\n    background: none;\n    border: none;\n    text-align: center;\n    font-size: 12px;\n    color: #898989;\n    margin-top: 10px;\n    width: 100%;\n}\n\n.project-path-edit:focus {\n    outline: 0;\n    background: rgba(255, 255, 255, 0.7);\n}\n\n\n/* popup test */\n\n.box {\n    width: 40%;\n    margin: 0 auto;\n    background: rgba(255, 255, 255, 0.2);\n    padding: 35px;\n    border: 2px solid #fff;\n    border-radius: 20px/50px;\n    background-clip: padding-box;\n    text-align: center;\n}\n\n.button {\n    font-size: 1em;\n    margin-top: 50px;\n    color: #fff;\n    border: 2px solid #46a2ba;\n    color: #46a2ba;\n    text-decoration: none;\n    cursor: pointer;\n    transition: all 0.3s ease-out;\n}\n\n.button:hover {\n    background: #46a2ba;\n    color: #fff;\n}\n\n.overlay {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0, 0, 0, 0.7);\n    transition: opacity 500ms;\n    opacity: 1;\n}\n\n.overlay:target {\n    visibility: visible;\n    opacity: 1;\n}\n\n.popup {\n    margin: 70px auto;\n    padding: 20px;\n    background: #fff;\n    border-radius: 5px;\n    width: 800px;\n    height: 500px;\n    position: relative;\n    transition: all 5s ease-in-out;\n    overflow-x: hidden;\n    overflow-y: auto;\n}\n\n.popup .active {\n    color: #46a2ba;\n}\n\n.popup h2 {\n    margin-top: 0;\n    color: #333;\n    font-family: Tahoma, Arial, sans-serif;\n}\n\n.popup .close {\n    position: absolute;\n    top: 10px;\n    right: 20px;\n    transition: all 200ms;\n    font-size: 30px;\n    font-weight: bold;\n    text-decoration: none;\n    color: #333;\n    z-index: 9999;\n}\n\n.popup .close:hover {\n    color: #06D85F;\n}\n\n.popup .content {\n    max-height: 30%;\n    overflow: auto;\n}\n\n.popup-list .col-sm-3 {\n    width: 20%;\n    padding: 10px;\n}\n\n.popup-new {\n    border: 2px solid #ececec;\n    border-radius: 4px;\n    height: 460px;\n    text-align: center;\n    padding-top: 100px;\n    color: #898989;\n}\n\n.popup-new:hover {\n    color: #46a2ba;\n}\n\n.popup-new img {\n    margin-left: auto;\n    margin-right: auto;\n    opacity: 0.3;\n}\n\n.popup-category {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    position: relative;\n}\n\n.popup-category label {\n    font-size: 12px;\n    padding-right: 30px;\n}\n\n.popup-category input {\n    position: absolute;\n    right: 0;\n    top: 0;\n}\n\n.popup-nav label {\n    padding-right: 20px;\n}\n\n\n/*popup test finish */\n\n.btn-resource {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    width: 200px;\n    margin-left: auto;\n    margin-right: auto;\n    margin-bottom: 20px;\n    padding: 8px;\n    background: transparent;\n    border: 2px solid #46a2ba;\n    border-radius: 5px;\n    color: #46a2ba;\n    font-weight: bold;\n    font-size: 14px;\n}\n\n.btn-resource:hover {\n    cursor: pointer;\n    background: #46a2ba;\n    color: #fff;\n}\n\n.application-current {\n    background: #46a2ba;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/application/application-info/application-info.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"viewMode==='application'\" style=\"padding:15px;\">\n    <div class=\"btn-icon\" align=\"center\">\n\n        <img [src]=\"prefix+applicationFolderPath+'/'+applicationData.iconPath\" width=\"100px\" height=\"100px\">\n        <button class=\"btn-icon-edit\" (click)=\"clickIcon()\"><i class=\"fa fa-edit\"></i></button>\n    </div>\n\n    <div style=\"margin-top: 20px;\" align=\"center\">\n\n        <input type=\"text\" class=\"project-edit\" [(ngModel)]=\"applicationData.applicationName\" (blur)=\"onChange()\" />\n        <input type=\"text\" class=\"project-path-edit\" [(ngModel)]=\"applicationData.applicationId\" (blur)=\"onChange()\" />\n    </div>\n</div>\n\n\n<div *ngIf=\"viewMode==='activity'\" style=\"padding:15px;\">\n    <div class=\"btn-icon\" align=\"center\">\n\n        <img [src]=\"prefix+applicationFolderPath+'/'+applicationData.iconPath\" width=\"100px\" height=\"100px\">\n        <button class=\"btn-icon-edit\" (click)=\"clickIcon()\"><i class=\"fa fa-edit\"></i></button>\n    </div>\n\n    <div style=\"margin-top: 20px;\" align=\"center\">\n\n        <input type=\"text\" class=\"project-edit\" [(ngModel)]=\"applicationData.applicationName\" (blur)=\"onChange()\" />\n        <input type=\"text\" class=\"project-path-edit\" [(ngModel)]=\"applicationData.applicationId\" (blur)=\"onChange()\" />\n    </div>\n</div>\n\n\n\n<div *ngIf=\"viewMode==='export'||viewMode==='guide'\" style=\"padding:15px;\" (click)=\"clickApplicationInfo()\" [ngClass]=\"!currentActivityId?'application-current':''\">\n    <div class=\"btn-icon\" align=\"center\">\n        <img [src]=\"prefix+applicationFolderPath+'/'+applicationData.iconPath\" width=\"100px\" height=\"100px\">\n    </div>\n    <div style=\"margin-top: 20px;\" align=\"center\">\n        <input type=\"text\" class=\"project-edit\" [(ngModel)]=\"applicationData.applicationName\" (blur)=\"onChange()\" />\n        <input type=\"text\" class=\"project-path-edit\" [(ngModel)]=\"applicationData.applicationId\" (blur)=\"onChange()\" />\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/application/application-info/application-info.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
    function ApplicationInfoComponent(broadcaster) {
        this.broadcaster = broadcaster;
        this.showImageDialog = false;
    }
    ApplicationInfoComponent.prototype.ngOnInit = function () {
    };
    ApplicationInfoComponent.prototype.onChange = function () {
        this.sendMessage('on-change-data', '');
    };
    ApplicationInfoComponent.prototype.clickIcon = function () {
        this.sendMessage('change-icon', '');
    };
    ApplicationInfoComponent.prototype.clickToggleDialog = function () {
        console.log("clickToggleDialog");
        this.showImageDialog = !this.showImageDialog;
    };
    ApplicationInfoComponent.prototype.sendMessage = function (kind, activityId) {
        var message = {
            kind: kind,
            activityId: activityId
        };
        this.broadcaster.broadcast(this.viewMode, message);
    };
    ApplicationInfoComponent.prototype.clickApplicationInfo = function () {
        this.sendMessage('application', '');
    };
    return ApplicationInfoComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ApplicationInfoComponent.prototype, "prefix", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ApplicationInfoComponent.prototype, "viewMode", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ApplicationInfoComponent.prototype, "currentActivityId", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ApplicationInfoComponent.prototype, "applicationData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ApplicationInfoComponent.prototype, "applicationFolderPath", void 0);
ApplicationInfoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-application-info',
        template: __webpack_require__("../../../../../src/app/application/application-info/application-info.component.html"),
        styles: [__webpack_require__("../../../../../src/app/application/application-info/application-info.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _a || Object])
], ApplicationInfoComponent);

var _a;
//# sourceMappingURL=application-info.component.js.map

/***/ }),

/***/ "../../../../../src/app/application/application.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.navbar {\n    position:relative;\n    min-height: 50px;\n    margin-bottom: 20px;\n    background-color: #fff;\n    border: 1px solid #e7e7e7;\nborder-top: none;\n    box-shadow: 1px 1px 6px rgba(0,0,0,0.2);\n    z-index: 9999;\n    margin-bottom: 0;\n}\n\n.connect-wrap {\n z-index: 9998;\n    position: absolute;\n    right:0;\nmargin-right: 186px;\nwidth:134px;\n}\n\n.howtoconnect {\n   width:100%;\nbackground: #fff;\nfont-size: 12px;\n\ntext-align: center;\npadding:8px;\nborder-bottom-left-radius: 8px;\nborder-bottom-right-radius: 8px;\n   box-shadow: 1px 1px 6px rgba(0,0,0,0.2);\n   color:#898989;\n}\n\n.connect-wrap .fa-close {\n    position:absolute;\n    right:0;\n    top:0;\n    color:#898989;\n    padding:5px;\n    margin:6px 3px;\n    margin-right: 5px;\n    font-size: 12px;\n\n}\n\n.connect-wrap .fa-close:hover {\ncolor:#454545;\ncursor: pointer;\n}\n\n.connect-delete {\n       position:absolute;\n    right:0;\n    top:0;\n    color:#898989;\n    padding:5px;\n    margin:6px 3px;\n    margin-right: 5px;\n    font-size: 12px;\n}\n\n#how:target{\ndisplay: none;\n}\n\n\n\n/*\n.howtoconnect a {\n    color:#898989;\n \n    text-decoration: none;\n}\n\n.howtoconnect a:hover {\n    color:#454545;\n}*/\n\n.howtoconnect span a {\n    color:#46a2ba;\n    padding-right: 12px;\n    text-decoration: none;\n}\n\n.howtoconnect span a:hover {\n    color:#2b778b;\n}\n\n/*.connect-wrap .fa-close:active{\n    display: none;\n}*/\n\n\n.list-wrap {\n    width:100%;\n    height:100%;\n    background: #fff;\n    padding-top: 50px;\n    position:absolute;\n    top:0;\n    left:0;\n    right:0;\n    bottom:0;\n    z-index: 99;\n}\n\n.list-wrap .list-left {\n    margin: auto;\n    width: 280px;\n    height: 100%;\n    background: #edf0f4;\n    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n    float: left;\n    position: relative;\n}\n\n.list-wrap .list-right {\n    width: 100%;\n    height: 100%;\n    padding-left: 280px;\n  \n}\n\n.nav-right {\n    float:right;\n}\n\n.navbar .btn-back {\n    height:50px;\n    border:none;\n    color:rgba(0,0,0,0.5);\n    background: none;\n    padding-left: 20px;\n    font-size: 13px;\n    font-weight: 600;\n}\n\n.navbar .btn-back:hover {\n    color:rgba(0,0,0,0.7);\n    cursor: pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/application/application.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"applicationData\">\n\n    <!-- nav bar top -->\n    <div class=\"navbar\">\n        <button class=\"btn-back\" (click)=\"clickBack()\">◄ Back</button>\n\n\n\n        <div class=\"nav-right\">\n            <app-device-status [sendStatus]=\"sendStatus\"></app-device-status>\n        </div>\n    </div>\n\n\n\n    <div *ngIf=\"!resourceAppDialog\" class=\"connect-wrap\">\n\n        <div class=\"howtoconnect\" id=\"#how\">\n            <span><b><a target=\"_blank\" href=\"http://www.vxmaker.com\">How to connect</a></b></span>\n        </div>\n\n        <a href=\"#how\"><i class=\"fa fa-close\" ></i></a>\n\n    </div>\n\n    <!-- navbar top finish -->\n\n    <!-- list-wrap -->\n\n    <div class=\"list-wrap\">\n\n        <div class=\"list-left\">\n            <app-application-info [prefix]=\"prefix\" [viewMode]=\"'application'\" [applicationData]=\"applicationData\" [applicationFolderPath]=\"applicationFolderPath\"></app-application-info>\n        </div>\n        <div class=\"list-right\">\n            <div>\n                <app-activity-list *ngIf=\"applicationData\" [prefix]=\"prefix\" [viewMode]=\"'application'\" [currentActivityId]=\"'none'\" [applicationData]=\"applicationData\" [applicationFolderPath]=\"applicationFolderPath\"></app-activity-list>\n            </div>\n        </div>\n\n        <app-resource #resourceAppDialog (onSelectFile)=\"onSelectFile($event)\"></app-resource>\n\n    </div>\n    <!-- list-wrap finish -->\n</div>"

/***/ }),

/***/ "../../../../../src/app/application/application.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_resource_resource_component__ = __webpack_require__("../../../../../src/app/common/resource/resource.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_uuid__ = __webpack_require__("../../../../angular2-uuid/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
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
        this.prefix = __WEBPACK_IMPORTED_MODULE_8__environments_environment__["a" /* environment */].imgPrefix;
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
    ApplicationComponent.prototype.ngOnDestroy = function () {
        if (this.messageListener) {
            this.messageListener.unsubscribe();
        }
    };
    ApplicationComponent.prototype.registerStringBroadcast = function () {
        var _this = this;
        this.messageListener = this.broadcaster.on('application')
            .subscribe(function (message) {
            var kind = message.kind;
            var activityId = message.activityId;
            console.log("application message received!! = " + kind);
            if (kind === 'send-device') {
                _this.onClickSendDevice(null);
            }
            else if (kind === 'code-export') {
                _this.clickSave();
                _this.router.navigate(['/code-export', _this.applicationFolderPath]);
            }
            else if (kind === 'change-activity-list') {
                _this.onChangeData(null);
            }
            else if (kind === 'go-detail-activity') {
                _this.clickActivity(activityId);
            }
            else if (kind === 'delete-activity') {
                _this.clickDeleteActivity(activityId);
            }
            else if (kind === 'duplicate-activity') {
                _this.clickDuplicateActivity(activityId);
            }
            else if (kind === 'new-activity') {
                console.log("new activity");
                _this.clickNewActivity();
            }
            else if (kind === 'set-launcher-activity') {
                _this.onClickLauncherActivity(activityId);
            }
            else if (kind === 'set-launcher-activity') {
                _this.onClickLauncherActivity(activityId);
            }
            else if (kind === 'on-change-data') {
                _this.onChangeData(null);
            }
            else if (kind === 'change-icon') {
                _this.onClickChangeIcon();
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
        console.log("click new Activity");
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
        this.appDataService.duplicateActivityData(activityId, newActivityId);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('resourceAppDialog'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__common_resource_resource_component__["a" /* ResourceComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_resource_resource_component__["a" /* ResourceComponent */]) === "function" && _a || Object)
], ApplicationComponent.prototype, "resourceDialog", void 0);
ApplicationComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-application',
        template: __webpack_require__("../../../../../src/app/application/application.component.html"),
        styles: [__webpack_require__("../../../../../src/app/application/application.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _f || Object])
], ApplicationComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=application.component.js.map

/***/ }),

/***/ "../../../../../src/app/code-export/code-export.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".navbar {\n    position: relative;\n    min-height: 50px;\n    margin-bottom: 20px;\n    background-color: #fff;\n    border: 1px solid #e7e7e7;\n    border-top: none;\n    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);\n    z-index: 9999;\n    margin-bottom: 0;\n}\n\n.navbar .btn-back {\n    height: 50px;\n    border: none;\n    color: rgba(0, 0, 0, 0.5);\n    background: none;\n    padding-left: 20px;\n    font-size: 13px;\n    font-weight: 600;\n}\n\n.list-wrap {\n    width: 100%;\n    height: 100%;\n    background: #fff;\n    padding-top: 50px;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 99;\n}\n\n.list-wrap .list-left {\n    margin: auto;\n    width: 280px;\n    height: 100%;\n    background: #edf0f4;\n    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n    float: left;\n    position: relative;\n    z-index: 999;\n}\n\n.list-wrap .list-center {\n    margin: auto;\n    width: 500px;\n    height: 100%;\n    background: #ececec;\n    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n    float: left;\n    z-index: 998;\n    position: relative;\n    overflow-x: auto;\n    overflow-y: scroll;\n}\n\n.list-wrap .list-right {\n    width: 100%;\n    height: 100%;\n    padding-left: 800px;\n}\n\n.tab-selected {\n    background: #46a2ba;\n}\n\n.overlay {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0, 0, 0, 0.7);\n    transition: opacity 500ms;\n    opacity: 1;\n    z-index: 9999;\n}\n\n.overlay:target {\n    visibility: visible;\n    opacity: 1;\n}\n\n.popup {\n    margin: 90px auto;\n    padding: 20px;\n    padding-top: 50px;\n    padding-bottom: 50px;\n    background: #fff;\n    border-radius: 5px;\n    width: 800px;\n    height: 500px;\n    position: relative;\n    transition: all 5s ease-in-out;\n    overflow-x: hidden;\n    overflow-y: auto;\n}\n\n.popup .active {\n    color: #46a2ba;\n}\n\n.popup h2 {\n    margin-top: 0;\n    color: #333;\n    font-family: Tahoma, Arial, sans-serif;\n}\n\n.popup .close {\n    position: absolute;\n    top: 10px;\n    right: 20px;\n    transition: all 200ms;\n    font-size: 30px;\n    font-weight: bold;\n    text-decoration: none;\n    color: #333;\n    z-index: 9999;\n}\n\n.popup .close:hover {\n    color: #06D85F;\n}\n\n.popup .content {\n    max-height: 30%;\n    overflow: auto;\n}\n\n.popup-list .col-sm-3 {\n    width: 20%;\n    padding: 10px;\n}\n\n.popup-new {\n    border: 2px solid #ececec;\n    border-radius: 4px;\n    height: 460px;\n    text-align: center;\n    padding-top: 100px;\n    color: #898989;\n}\n\n.popup-new:hover {\n    color: #46a2ba;\n}\n\n.popup-new img {\n    margin-left: auto;\n    margin-right: auto;\n    opacity: 0.3;\n}\n\n.popup-category {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    position: relative;\n}\n\n.popup-category label {\n    font-size: 12px;\n    padding-right: 30px;\n}\n\n.popup-category input {\n    position: absolute;\n    right: 0;\n    top: 0;\n}\n\n.popup-nav label {\n    padding-right: 20px;\n}\n\n\n/*popup test finish */\n\n.popup .resource-footer {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 50px;\n    border-top: 1px solid #ececec;\n    background: #fff;\n    padding: 12px;\n    box-shadow: 0px -1px 6px 0px rgba(0, 0, 0, 0.2);\n}\n\n.popup .resource-footer button {\n    background: transparent;\n    border: none;\n    font-size: 15px;\n    font-weight: 600;\n    color: #454545;\n}\n\n.popup .resource-footer button:hover {\n    cursor: pointer;\n    color: #46a2ba;\n}\n\n.resource-apply {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    padding: 12px;\n}\n\n.popup .resource-nav {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 50px;\n    border-bottom: 1px solid #ececec;\n    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);\n}\n\n.resource-nav .btn-tab {\n    padding: 16px;\n    width: 100px;\n}\n\n.resource-nav .btn-select {\n    border-bottom: 3px solid #46a2ba!important;\n}\n\n.popup .resource-nav .resource-add {\n    position: absolute;\n    right: 0;\n    top: 0;\n    padding: 12px;\n}\n\n.popup .resource-nav .resource-add button {\n    font-weight: normal;\n    font-family: inherit;\n}\n\n.popup .resource-nav .resource-add .resource-delete {\n    border: 1px solid #ececec;\n}\n\n.popup .resource-nav .resource-add .resource-delete:hover {\n    background: #f3f3f3;\n}\n\n.popup .resource-nav button {\n    background: transparent;\n    border: none;\n    font-size: 13px;\n    font-weight: 600;\n    color: #898989;\n    font-weight: bold;\n    font-family: Tahoma, Arial, sans-serif;\n}\n\n.popup .resource-nav button:hover {\n    cursor: pointer;\n    color: #46a2ba;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/code-export/code-export.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"applicationData\">\n\n    <!-- nav bar top -->\n    <div class=\"navbar\">\n        <button class=\"btn-back\" (click)=\"clickRoot()\">◄ Home</button>\n        <button class=\"btn-back\" (click)=\"clickBack()\">◄ Back</button>\n        <button class=\"btn-back\" (click)=\"clickShowExport()\">Export</button>\n\n    </div>\n\n    <!-- navbar top finish -->\n\n\n    <!-- left side -->\n    <div class=\"list-wrap\">\n\n        <div class=\"list-left\">\n            <app-application-info [currentActivityId]=\"currentActivityId\" [prefix]=\"prefix\" [viewMode]=\"'export'\" [applicationData]=\"applicationData\" [applicationFolderPath]=\"applicationFolderPath\"></app-application-info>\n            <app-activity-list *ngIf=\"applicationData\" [prefix]=\"prefix\" [viewMode]=\"'export'\" [currentActivityId]='currentActivityId' [applicationData]=\"applicationData\" [applicationFolderPath]=\"applicationFolderPath\"></app-activity-list>\n        </div>\n\n        <div class=\"list-center\">\n\n            <div *ngIf=\"readyToRender\">\n\n                <h3><span>{{applicationData.applicationName}}</span>\n                    <span *ngIf=\"currentActivityId\">> {{getActivityName(currentActivityId)}}</span></h3>\n                <div [hidden]=\"currentActivityId\">\n\n                    <button [ngClass]=\"currentTab=='AndroidManifest'?'tab-selected':''\" (click)=\"clickTab('AndroidManifest')\">AndroidManifest.xml</button>\n                    <button [ngClass]=\"currentTab=='build'?'tab-selected':''\" (click)=\"clickTab('build')\">build.gradle </button>\n                    <button [ngClass]=\"currentTab=='strings'?'tab-selected':''\" (click)=\"clickTab('strings')\">strings.xml</button>\n\n                    <div [hidden]=\"currentTab!=='AndroidManifest'\">\n                        AndroidManifest.xml <button [clip]=\"manifestXml\" (onClip)=\"callback($event)\">Copy</button>\n                        <handy-syntax-highlighter *ngIf=\"manifestXml\" [language]=\"'java'\" [content]=\"manifestXml\"></handy-syntax-highlighter>\n                    </div>\n\n                    <div [hidden]=\"currentTab!=='build'\">\n                        build.gradle <button [clip]=\"buildGradle\" (onClip)=\"callback($event)\">Copy</button>\n                        <handy-syntax-highlighter *ngIf=\"buildGradle\" [language]=\"'java'\" [content]=\"buildGradle\"></handy-syntax-highlighter>\n                    </div>\n\n                    <div [hidden]=\"currentTab!=='strings'\">\n                        strings.xml <button [clip]=\"stringXml\" (onClip)=\"callback($event)\">Copy</button>\n                        <handy-syntax-highlighter *ngIf=\"stringXml\" [language]=\"'java'\" [content]=\"stringXml\"></handy-syntax-highlighter>\n                    </div>\n\n                </div>\n\n\n\n                <div *ngIf=\"currentActivityId\">\n\n                    <button [ngClass]=\"currentActivityTab=='xml'?'tab-selected':''\" (click)=\"clickActivityTab('xml')\">xml</button>\n                    <button [ngClass]=\"currentActivityTab=='java'?'tab-selected':''\" (click)=\"clickActivityTab('java')\">java </button>\n\n                    <div *ngFor=\"let aData of activityDataList\">\n                        <div [hidden]=\"aData.activityId!==currentActivityId\">\n                            <div [hidden]=\"currentActivityTab=='java'\">\n                                {{aData.codeLayoutName}}.xml <button [clip]=\"aData.layout\" (onClip)=\"callback($event)\">Copy</button>\n                                <handy-syntax-highlighter [language]=\"'java'\" [content]=\"aData.layout\"></handy-syntax-highlighter>\n                            </div>\n                            <div [hidden]=\"currentActivityTab=='xml'\">\n                                {{aData.codeActivityName}}.java <button [clip]=\"aData.java\" (onClip)=\"callback($event)\">Copy</button>\n                                <handy-syntax-highlighter [language]=\"'java'\" [content]=\"aData.java\"></handy-syntax-highlighter>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n        <div class=\"list-right\">\n            <!-- right side -->\n            <div class=\"export-right\">\n                <app-resource #resourceDialog (onSelectFile)=\"onSelectFile($event)\" [viewMode]=\"'export'\"></app-resource>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div *ngIf=\"applicationData\">\n    <div [hidden]=\"!showExportPanel\" class=\"overlay\" (click)=\"clickHideExport()\">\n        <div class=\"popup-wrap\">\n            <div class=\"popup\" (click)=\"nothing($event)\">\n                <button (click)=\"clickHideExport()\">X</button>\n                <div class=\"application-name\">\n                    <h5>Export Android Project</h5>\n                    {{applicationData.applicationName}}\n                    <h5 style=\"margin-top: 15px; margin-bottom: 5px;\">Export Folder </h5>\n                    <div class=\"project-folder\">\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]=\"workspaceFolderPath\" />\n                        <button class=\"btn-change\" (click)=\"clickChangeFolder()\">···</button>\n                    </div>\n                </div>\n                <div *ngIf=\"isLoading\">\n                    Exporting...\n                </div>\n                <div class=\"btn-new-save\">\n                    <button (click)=\"clickExport()\">export ►</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/code-export/code-export.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodeExportComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CodeExportComponent = (function () {
    function CodeExportComponent(route, router, location, appDataService, broadcaster) {
        this.route = route;
        this.router = router;
        this.location = location;
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
        this.prefix = __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].imgPrefix;
        this.readyToRender = false;
        this.showExportPanel = false;
        this.currentTab = 'AndroidManifest';
        this.currentActivityTab = 'xml';
        this.isLoading = false;
    }
    CodeExportComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        this.workspaceFolderPath = this.appDataService.getExportFolderPath();
        this.applicationFolderPath = this.route.snapshot.params['applicationFolderPath'];
        this.appDataService.initApplicationPath(this.applicationFolderPath);
        this.appDataService.loadInitDataFromFile().then(function (result) {
            self.applicationData = self.appDataService.loadApplicationDataSync();
            var temp = _this.appDataService.makeApplicationSourceCode();
            self.activityDataList = temp['activityDataList'];
            self.manifestXml = temp['manifestXml'];
            self.stringXml = temp['stringXml'];
            self.buildGradle = temp['buildGradle'];
            self.sourceCodeData = temp;
            self.readyToRender = true;
            self.registerStringBroadcast();
        });
    };
    CodeExportComponent.prototype.callback = function ($event) {
        console.log("done clip");
        alert("copied!");
    };
    CodeExportComponent.prototype.clickImageFolder = function () {
        this.appDataService.openFinder(this.applicationFolderPath + '/image');
    };
    CodeExportComponent.prototype.ngOnDestroy = function () {
        if (this.messageListener) {
            this.messageListener.unsubscribe();
        }
    };
    CodeExportComponent.prototype.registerStringBroadcast = function () {
        var _this = this;
        this.messageListener = this.broadcaster.on('export')
            .subscribe(function (message) {
            var kind = message.kind;
            console.log("message received!! = " + kind);
            var activityId = message.activityId;
            if (kind === 'go-detail-activity') {
                console.log("message activityId!! = " + activityId);
                _this.currentActivityId = activityId;
            }
            else if (kind === 'application') {
                _this.currentActivityId = null;
            }
        });
    };
    CodeExportComponent.prototype.clickShowExport = function () {
        this.showExportPanel = true;
        console.log("clickShowExport  -" + this.showExportPanel);
    };
    CodeExportComponent.prototype.clickHideExport = function () {
        this.showExportPanel = false;
    };
    CodeExportComponent.prototype.nothing = function (event) {
        event.stopPropagation();
    };
    //change project folder
    CodeExportComponent.prototype.clickChangeFolder = function () {
        var folder = this.appDataService.selectWorkspaceFolderPathFrom(this.workspaceFolderPath);
        if (folder) {
            this.workspaceFolderPath = folder;
        }
    };
    CodeExportComponent.prototype.clickExport = function () {
        var checkFolderPath = this.workspaceFolderPath + '/' + this.applicationData.applicationName + '_export';
        var haveFolder = this.appDataService.haveFile(checkFolderPath);
        var result = true;
        if (haveFolder) {
            result = confirm('will you override folder?');
        }
        if (result) {
            var self_1 = this;
            this.isLoading = true;
            self_1.exportProcess().then(function (result) {
                self_1.isLoading = false;
                var open = confirm('will you open export folder?');
                if (open) {
                    self_1.appDataService.openFinder(checkFolderPath);
                }
            });
        }
    };
    CodeExportComponent.prototype.getActivityName = function (activityId) {
        return this.appDataService.getActivityName(activityId);
    };
    CodeExportComponent.prototype.clickTab = function (target) {
        this.currentTab = target;
    };
    CodeExportComponent.prototype.clickActivityTab = function (target) {
        this.currentActivityTab = target;
    };
    CodeExportComponent.prototype.exportProcess = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.appDataService.writeSourceCode(_this.workspaceFolderPath, _this.sourceCodeData);
            _this.appDataService.writeGuidDoc(_this.workspaceFolderPath, _this.sourceCodeData);
            resolve(true);
        });
    };
    CodeExportComponent.prototype.clickOpenFolder = function () {
        this.appDataService.openFinder(this.workspaceFolderPath + '/' + this.applicationData.applicationName + '_export');
    };
    CodeExportComponent.prototype.clickBack = function () {
        this.location.back();
    };
    CodeExportComponent.prototype.clickRoot = function () {
        this.router.navigate(['/application', this.applicationFolderPath]);
    };
    return CodeExportComponent;
}());
CodeExportComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-code-export',
        template: __webpack_require__("../../../../../src/app/code-export/code-export.component.html"),
        styles: [__webpack_require__("../../../../../src/app/code-export/code-export.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _e || Object])
], CodeExportComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=code-export.component.js.map

/***/ }),

/***/ "../../../../../src/app/common/device-status/device-status.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".device-status {\n    font-size: 13px;\n    \n    padding-left: 20px;\n}\n\n.device-unconnected {\n    color:rgba(0,0,0,0.5);\n    font-weight: 600;\n    padding-top: 3px;\n       padding-left: 15px;\n    padding-right: 15px;\n}\n\n.device-unconnected span {\n    color:#46a2ba;\n}\n\n.device-unconnected span i {\n    font-size: 16px;\n    margin-left: 3px;\n    vertical-align: bottom;\n}\n\n.device-unconnected span:hover {\n    cursor: pointer;\n    color: #1a809b;\n}\n\n.device-connected {\n    color:#46a2ba;\n    font-weight: 600;\n    padding-top: 3px;\n       padding-left: 15px;\n    padding-right: 15px;\n}\n\n.device-status p {\n    float:left;\n}\n\n\n.device-status .nav-btn {\n color:#46a2ba;\n    font-weight: 600;\n    padding-top: 9px;\n    height:51px;\n    padding-left: 15px;\n    padding-right: 15px;\n    border-left: 1px solid #ececec;\n\t  margin: 0;\n\t  text-align: center;\n}\n\n.device-status .nav-btn-sending {\n    background: #46a2ba;\n    width:80.55px;\n}\n\n.device-status .btn-source .nav-btn-img{\nwidth:20px;\n}\n\n\n.device-status .nav-btn:hover {\n    color:#fff;\n    background: #46a2ba;\n    cursor: pointer;\n}\n\n.nav-btn-img {\n    padding-right: 5px;\n  \n    width:18px;\n    margin-top: -2px;\n}\n\n.nav-btn i {\n    font-size: 20px;\n\n    vertical-align: bottom;\n    margin-bottom: -1px;\n}\n\n\n.nav-btn-img-2 {\n    padding-right: 5px;\n    opacity: 0.5;\n    width:29px;\n    margin-top: -2px;\n}\n\n.device-status .nav-btn:hover .nav-btn-img-2{\n   -webkit-filter: invert(100%);\n   filter: invert(100%);\n   opacity: 1;\n   margin-top: -2px;\n}\n\n.device-status .nav-btn:hover .nav-btn-img{\n   -webkit-filter: invert(100%);\n   filter: hue-rotate(100%);\n   opacity: 1;\n   margin-top: -2px;\n}\n\n\n\n/* -------------- loader10 -------------- */\n\n.loader10:before{\n\tcontent: \"\";\n\tposition: absolute;\n\ttop: 0px;\n\tleft: -18px;\n\theight: 8px;\n\twidth: 8px;\n\tborder-radius: 12px;\n\t-webkit-animation: loader10g 1s ease-in-out infinite;\n\t\t\tanimation: loader10g 1s ease-in-out infinite;\n}\n\n.loader10{\n\tposition: relative;\n\twidth: 8px;\n\theight: 8px;\n\tleft: 46%;\n    top:6px;\n\tborder-radius: 12px;\n\t-webkit-animation: loader10m 1s ease-in-out infinite;\n\t\t\tanimation: loader10m 1s ease-in-out infinite;\n}\n\n\n.loader10:after{\n\tcontent: \"\";\n\tposition: absolute;\n\ttop: 0px;\n\tleft: 18px;\n\theight: 8px;\n\twidth: 8px;\n\tborder-radius: 10px;\n\t-webkit-animation: loader10d 1s ease-in-out infinite;\n\t\t\tanimation: loader10d 1s ease-in-out infinite;\n}\n\n@-webkit-keyframes loader10g{\n\t0%{background-color: rgba(255, 255, 255, .2);}\n\t25%{background-color: rgba(255, 255, 255, 1);}\n\t50%{background-color: rgba(255, 255, 255, .2);}\n\t75%{background-color: rgba(255, 255, 255, .2);}\n\t100%{background-color: rgba(255, 255, 255, .2);}\n}\n@keyframes loader10g{\n\t0%{background-color: rgba(255, 255, 255, .2);}\n\t25%{background-color: rgba(255, 255, 255, 1);}\n\t50%{background-color: rgba(255, 255, 255, .2);}\n\t75%{background-color: rgba(255, 255, 255, .2);}\n\t100%{background-color: rgba(255, 255, 255, .2);}\n}\n\n@-webkit-keyframes loader10m{\n\t0%{background-color: rgba(255, 255, 255, .2);}\n\t25%{background-color: rgba(255, 255, 255, .2);}\n\t50%{background-color: rgba(255, 255, 255, 1);}\n\t75%{background-color: rgba(255, 255, 255, .2);}\n\t100%{background-color: rgba(255, 255, 255, .2);}\n}\n@keyframes loader10m{\n\t0%{background-color: rgba(255, 255, 255, .2);}\n\t25%{background-color: rgba(255, 255, 255, .2);}\n\t50%{background-color: rgba(255, 255, 255, 1);}\n\t75%{background-color: rgba(255, 255, 255, .2);}\n\t100%{background-color: rgba(255, 255, 255, .2);}\n}\n\n@-webkit-keyframes loader10d{\n\t0%{background-color: rgba(255, 255, 255, .2);}\n\t25%{background-color: rgba(255, 255, 255, .2);}\n\t50%{background-color: rgba(255, 255, 255, .2);}\n\t75%{background-color: rgba(255, 255, 255, 1);}\n\t100%{background-color: rgba(255, 255, 255, .2);}\n}\n@keyframes loader10d{\n\t0%{background-color: rgba(255, 255, 255, .2);}\n\t25%{background-color: rgba(255, 255, 255, .2);}\n\t50%{background-color: rgba(255, 255, 255, .2);}\n\t75%{background-color: rgba(255, 255, 255, 1);}\n\t100%{background-color: rgba(255, 255, 255, .2);}\n}\n\n\n@media screen and (max-width: 917px) {\n.device-status{\n\tdisplay: none;\n}\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/common/device-status/device-status.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"device-status\">\n\n    <!--<p class=\"device-connected\" *ngIf=\"deviceList.length > 0\">\n        Device Connected\n    </p>-->\n\n    <p class=\"device-unconnected\" *ngIf=\"deviceList.length == 0\">\n        Please connect the device. <span (click)=\"clickHowToConnect('http://vxmaker.com')\">How to connect <i class=\"fa fa-question-circle-o\"></i></span>\n    </p>\n\n    <p [hidden]=\"sendStatus\" class=\"btn-preview nav-btn\" (click)='clickSendFile()'>\n        <i class=\"fa fa-usb\"></i><br>\n        Send\n    </p>\n\n    <p class=\"btn-preview nav-btn\" (click)='clickSaveFile()'>\n        <i class=\"fa fa-floppy-o\"></i><br>\n        Save\n    </p>\n\n    <p class=\"btn-preview nav-btn\" (click)='clickExportCode()'>\n        <i class=\"fa fa-code\"></i><br>\n        Export\n    </p>\n\n    <!-- <p class=\"btn-preview nav-btn\" (click)='clickExportGuide()'>\n        <i class=\"fa fa-mobile\"></i>Guide\n    </p> -->\n\n\n    <!--<div *ngIf=\"deviceList.length > 0\">\n      \n        <div class=\"btn-preview nav-btn nav-btn-sending\" >\n            <div class=\"loader10\"></div>\n        </div>\n    </div>-->\n\n\n    <!--<p class=\"btn-preview nav-btn\">\n        <span><img src=\"assets/images/ic_preview_2.png\"  class=\"nav-btn-img-2\"/></span>Preview\n    </p>-->\n\n    <!--<p class=\"btn-source nav-btn\">\n        <span><img src=\"assets/images/ic_source.png\" class=\"nav-btn-img\"/></span>Source\n    </p>-->\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/common/device-status/device-status.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceStatusComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
        this.onClickSendDevice = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
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
            kind: 'code-export'
        };
        this.broadcaster.broadcast('activity', message);
        this.broadcaster.broadcast('application', message);
    };
    DeviceStatusComponent.prototype.clickExportGuide = function () {
        var message = {
            kind: 'code-export'
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], DeviceStatusComponent.prototype, "onClickSendDevice", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DeviceStatusComponent.prototype, "sendStatus", void 0);
DeviceStatusComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-device-status',
        template: __webpack_require__("../../../../../src/app/common/device-status/device-status.component.html"),
        styles: [__webpack_require__("../../../../../src/app/common/device-status/device-status.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _c || Object])
], DeviceStatusComponent);

var _a, _b, _c;
//# sourceMappingURL=device-status.component.js.map

/***/ }),

/***/ "../../../../../src/app/common/resource/resource.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* popup test */\n\n.box {\n    width: 40%;\n    margin: 0 auto;\n    background: rgba(255, 255, 255, 0.2);\n    padding: 35px;\n    border: 2px solid #fff;\n    border-radius: 20px/50px;\n    background-clip: padding-box;\n    text-align: center;\n}\n\n.button {\n    font-size: 1em;\n    margin-top: 50px;\n    color: #fff;\n    border: 2px solid #46a2ba;\n    color: #46a2ba;\n    text-decoration: none;\n    cursor: pointer;\n    transition: all 0.3s ease-out;\n}\n\n.button:hover {\n    background: #46a2ba;\n    color: #fff;\n}\n\n.overlay {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0, 0, 0, 0.7);\n    transition: opacity 500ms;\n    opacity: 1;\n    z-index: 9999;\n}\n\n.overlay:target {\n    visibility: visible;\n    opacity: 1;\n}\n\n.popup {\n    margin: 90px auto;\n    padding: 20px;\n    padding-top: 50px;\n    padding-bottom: 50px;\n    background: #fff;\n    border-radius: 5px;\n    width: 800px;\n    height: 500px;\n    position: relative;\n    transition: all 5s ease-in-out;\n    overflow-x: hidden;\n    overflow-y: auto;\n}\n\n.popup .active {\n    color: #46a2ba;\n}\n\n.popup h2 {\n    margin-top: 0;\n    color: #333;\n    font-family: Tahoma, Arial, sans-serif;\n}\n\n.popup .close {\n    position: absolute;\n    top: 10px;\n    right: 20px;\n    transition: all 200ms;\n    font-size: 30px;\n    font-weight: bold;\n    text-decoration: none;\n    color: #333;\n    z-index: 9999;\n}\n\n.popup .close:hover {\n    color: #06D85F;\n}\n\n.popup .content {\n    max-height: 30%;\n    overflow: auto;\n}\n\n.popup-list .col-sm-3 {\n    width: 20%;\n    padding: 10px;\n}\n\n.popup-new {\n    border: 2px solid #ececec;\n    border-radius: 4px;\n    height: 460px;\n    text-align: center;\n    padding-top: 100px;\n    color: #898989;\n}\n\n.popup-new:hover {\n    color: #46a2ba;\n}\n\n.popup-new img {\n    margin-left: auto;\n    margin-right: auto;\n    opacity: 0.3;\n}\n\n.popup-category {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    position: relative;\n}\n\n.popup-category label {\n    font-size: 12px;\n    padding-right: 30px;\n}\n\n.popup-category input {\n    position: absolute;\n    right: 0;\n    top: 0;\n}\n\n.popup-nav label {\n    padding-right: 20px;\n}\n\n\n/*popup test finish */\n\n.popup .resource-footer {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 50px;\n    border-top: 1px solid #ececec;\n    background: #fff;\n    padding: 12px;\n    box-shadow: 0px -1px 6px 0px rgba(0, 0, 0, 0.2);\n}\n\n.popup .resource-footer button {\n    background: transparent;\n    border: none;\n    font-size: 15px;\n    font-weight: 600;\n    color: #454545;\n}\n\n.popup .resource-footer button:hover {\n    cursor: pointer;\n    color: #46a2ba;\n}\n\n.resource-apply {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    padding: 12px;\n}\n\n.popup .resource-nav {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 50px;\n    border-bottom: 1px solid #ececec;\n    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);\n}\n\n.resource-nav .btn-tab {\n    padding: 16px;\n    width: 100px;\n}\n\n.resource-nav .btn-select {\n    border-bottom: 3px solid #46a2ba!important;\n}\n\n.popup .resource-nav .resource-add {\n    position: absolute;\n    right: 0;\n    top: 0;\n    padding: 12px;\n}\n\n.popup .resource-nav .resource-add button {\n    font-weight: normal;\n    font-family: inherit;\n}\n\n.popup .resource-nav .resource-add .resource-delete {\n    border: 1px solid #ececec;\n}\n\n.popup .resource-nav .resource-add .resource-delete:hover {\n    background: #f3f3f3;\n}\n\n.popup .resource-nav button {\n    background: transparent;\n    border: none;\n    font-size: 13px;\n    font-weight: 600;\n    color: #898989;\n    font-weight: bold;\n    font-family: Tahoma, Arial, sans-serif;\n}\n\n.popup .resource-nav button:hover {\n    cursor: pointer;\n    color: #46a2ba;\n}\n\n.resource-wrap {\n    overflow: hidden;\n    height: 100%;\n    padding-top: 15px;\n    padding-bottom: 15px;\n    overflow-y: auto;\n}\n\n.resource-wrap h3 {\n    margin-top: 0;\n}\n\n.image-list {\n    overflow: hidden;\n}\n\n.image-list .bg-img img {\n    width: 100%;\n    height: 100%;\n}\n\n.image-list .bg-img {\n    float: left;\n    margin: 5px;\n    background: url(" + __webpack_require__("../../../../../src/assets/images/bg_transparent.png") + ");\n    border: 1px solid #ececec;\n    position: relative;\n    width: 96px;\n    height: 96px;\n}\n\n.resource-wrap .img-delete {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    border: 1px solid red;\n}\n\n.resource-wrap .img-delete .img-delete-icon {\n    position: absolute;\n    border: 1px solid red;\n    width: 50px;\n    height: 50px;\n    border-radius: 50px;\n    padding: 14px 16px;\n    margin-left: auto;\n    margin-right: auto;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    margin-top: auto;\n    margin-bottom: auto;\n    background: rgba(255, 255, 255, 0.7);\n    color: red;\n}\n\n.resource-wrap .img-select {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    border: 2px solid #46a2ba;\n}\n\n.resource-wrap .img-delete .img-delete-icon:hover {\n    background: red;\n    color: #ffffff;\n}\n\n.image-list .bg-img:hover {\n    border-color: #ccc;\n    overflow-y: scroll;\n}\n\n.image-list:hover {\n    cursor: pointer;\n}\n\n.file-list {\n    padding: 8px;\n    font-size: 15px;\n    color: #454545;\n    border-bottom: 1px solid #ececec;\n    overflow-y: scroll;\n}\n\n.file-list:hover {\n    color: #46a2ba;\n    cursor: pointer;\n}\n\n.file-select-pick {\n    color: #46a2ba;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/common/resource/resource.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"viewMode=='activity'\">\n    <div class=\"popup-wrap\" *ngIf=\"visibility\">\n        <div id=\"popup1\" class=\"overlay\" (click)=\"hideDialog()\">\n            <div class=\"popup\" (click)=\"nothing($event)\">\n\n                <div class=\"resource-nav\">\n                    <button class=\"btn-image btn-select btn-tab\" style=\"color:#46a2ba;\" *ngIf=\"tab=='image'\" (click)=\"clickTab($event,'image')\">Image</button>\n                    <button class=\"btn-image  btn-tab\" *ngIf=\"tab=='file'\" (click)=\"clickTab($event,'image')\">Image</button>\n\n\n                    <button class=\"btn-file btn-select btn-tab\" style=\"color:#46a2ba;\" *ngIf=\"tab=='file'\" (click)=\"clickTab($event,'file')\">File</button>\n                    <button class=\"btn-file btn-tab\" *ngIf=\"tab=='image'\" (click)=\"clickTab($event,'file')\">File</button>\n                    <div class=\"resource-add\">\n                        <button *ngIf=\"tab=='image'\" (click)=\"clickNewFile($event,'image')\">+ New Image</button>\n                        <button *ngIf=\"tab=='file'\" align=\"left\" (click)=\"clickNewFile($event,'file')\">+ New File</button>\n                        <button class=\"resource-delete\" (click)=\"clickDeleteMode()\">\n                        <i class=\"fa fa-trash-o\" ></i>\n                    </button>\n                    </div>\n                </div>\n\n\n\n                <div class=\"resource-wrap\">\n                    <div *ngIf=\"tab=='image'\">\n                        <h3>Uploaded Image</h3>\n                        <div class=\"image-list\">\n                            <div *ngFor=\"let imageUrl of imageList\" class=\"bg-img\">\n                                <div class=\"img-delete\" *ngIf=\"isDeleteMode\" (click)=\"clickDeleteFile(imageUrl)\">\n                                    <div class=\"img-delete-icon\">\n                                        <i class=\"fa fa-trash-o\" style=\"font-size:21px;\"></i>\n                                    </div>\n                                </div>\n                                <div class=\"img-select\" *ngIf=\"imageUrl==selectedFileUrl\">\n                                </div>\n                                <img [src]=\"prefix+applicationFolderPath+'/'+imageUrl\" (click)=\"clickFile(imageUrl)\">\n                            </div>\n                        </div>\n                    </div>\n\n                    <div *ngIf=\"tab=='file'\">\n                        <h3>Uploaded File</h3>\n                        <div class=\"image-list\">\n                            <div *ngFor=\"let fileUrl of fileList\" class=\"bg-img\">\n                                <div class=\"img-delete\" *ngIf=\"isDeleteMode\" (click)=\"clickDeleteFile(fileUrl)\">\n                                    <div class=\"img-delete-icon\">\n                                        <i class=\"fa fa-trash-o\" style=\"font-size:21px;\"></i>\n                                    </div>\n                                </div>\n                                <div class=\"img-select\" *ngIf=\"fileUrl==selectedFileUrl\">\n                                </div>\n                                <app-lottie-animation-view [initUrl]=\"fileUrl\" style=\"width:100%;height:100%;\" (click)=\"clickFile(fileUrl)\">\n                                </app-lottie-animation-view>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"resource-footer\">\n                    <div>Filename: <span class=\"file-select-pick \">{{selectedFileUrl}}</span></div>\n                    <div class=\"resource-apply\">\n                        <button (click)=\"hideDialog()\">Cancel</button>\n                        <button (click)=\"clickApply()\" [hidden]=\"isDeleteMode\">Apply</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div *ngIf=\"viewMode=='export'\">\n    <!-- image -->\n    Image {{imageList.length}} <button (click)=\"clickImageFolder()\">Open</button>\n    <div class=\"image-list\" style=\"height:500px;\">\n        <div *ngFor=\"let imageUrl of imageList\" class=\"bg-img\">\n            <img [src]=\"prefix+applicationFolderPath+'/'+imageUrl\" (click)=\"clickFile(imageUrl)\">\n        </div>\n    </div>\n\n    <!-- file -->\n    Json {{fileList.length}} <button (click)=\"clickFileFolder()\">Open</button>\n    <div class=\"image-list\" style=\"height:500px;\">\n\n        <div class=\"image-list\">\n            <div *ngFor=\"let fileUrl of fileList\" class=\"bg-img\">\n\n                <app-lottie-animation-view [initUrl]=\"fileUrl\" style=\"width:100%;height:100%;\" (click)=\"clickFile(fileUrl)\">\n                </app-lottie-animation-view>\n            </div>\n        </div>\n\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/common/resource/resource.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
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
        this.imageList = [];
        this.fileList = [];
        this.fileConfigList = [];
        this.prefix = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].imgPrefix;
        this.visibility = false;
        this.tab = 'image';
        this.onSelectFile = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ResourceComponent.prototype.ngOnInit = function () {
    };
    ResourceComponent.prototype.setSelectedFileUrl = function (url) {
        this.selectedFileUrl = url;
    };
    ResourceComponent.prototype.ngAfterViewInit = function () {
        this.refreshList();
    };
    ResourceComponent.prototype.refreshList = function () {
        var _this = this;
        this.applicationFolderPath = this.appDataService.getApplicationPath();
        this.appDataService.loadImageResourceList().then(function (result) {
            _this.imageList = result.reverse();
            return _this.appDataService.loadFileResourceList();
        }).then(function (result) {
            _this.refreshFileList();
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
        this.selectedFileUrl = target;
    };
    ResourceComponent.prototype.clickDownload = function (url) {
        this.appDataService.openUrl(url);
    };
    ResourceComponent.prototype.clickApply = function () {
        this.onSelectFile.emit(this.selectedFileUrl);
        this.hideDialog();
    };
    ResourceComponent.prototype.clickDeleteMode = function () {
        this.isDeleteMode = !this.isDeleteMode;
    };
    ResourceComponent.prototype.clickDeleteFile = function (dataUrl) {
        var result = confirm('will you delete?');
        if (result) {
            this.appDataService.deleteFile(this.applicationFolderPath + '/' + dataUrl);
            this.refreshList();
        }
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
    ResourceComponent.prototype.clickImageFolder = function () {
        this.appDataService.openFinder(this.applicationFolderPath + '/image');
    };
    ResourceComponent.prototype.clickFileFolder = function () {
        this.appDataService.openFinder(this.applicationFolderPath + '/file');
    };
    return ResourceComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ResourceComponent.prototype, "viewMode", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ResourceComponent.prototype, "applicationData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ResourceComponent.prototype, "onSelectFile", void 0);
ResourceComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-resource',
        template: __webpack_require__("../../../../../src/app/common/resource/resource.component.html"),
        styles: [__webpack_require__("../../../../../src/app/common/resource/resource.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _a || Object])
], ResourceComponent);

var _a;
//# sourceMappingURL=resource.component.js.map

/***/ }),

/***/ "../../../../../src/app/guide/guide.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n    height: 100%;\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    overflow-y: scroll;\n}\n\n.first {\n    width: 15%;\n    background-color: blue;\n    overflow: auto;\n}\n\n.second {\n    width: 15%;\n    background-color: green;\n    overflow-y: scroll;\n}\n\n.third {\n    width: 30%;\n    background-color: yellow;\n    overflow-y: scroll;\n}\n\n.fourth {\n    width: 20%;\n    background-color: red;\n    overflow-y: scroll;\n}\n\n.fiveth {\n    width: 20%;\n    background-color: red;\n    overflow-y: scroll;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/guide/guide.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" (window:resize)=\"onResize($event)\">\n\n    <div class=\"first\" [ngStyle]=\"getFixHeightStyle()\">\n\n        <button (click)=\"clickRoot()\">Home</button>\n\n        <div class=\"activity-left\" *ngIf=\"applicationData\">\n            <app-application-info [prefix]=\"prefix\" [viewMode]=\"'guide'\" [applicationData]=\"applicationData\" [applicationFolderPath]=\"applicationFolderPath\"></app-application-info>\n            <app-activity-list [prefix]=\"prefix\" [viewMode]=\"'guide'\" [applicationData]=\"applicationData\" [applicationFolderPath]=\"applicationFolderPath\" [currentActivityId]=\"activityId\"></app-activity-list>\n        </div>\n    </div>\n\n    <div class=\"second\" [ngStyle]=\"getFixHeightStyle()\">\n        <app-object-tree #objectTree [prefix]=\"prefix\" [viewMode]=\"'guide'\" (onChangeNode)=\"onChangeNodeFromTree($event)\" (onClickNewFile)=\"clickNewFile($event)\" (onSelectNode)=\"onSelectNodeFromTree($event)\"></app-object-tree>\n    </div>\n\n\n    <div class=\"third\" [ngStyle]=\"getFixHeightStyle()\">\n\n        <div class=\"activity-canvas\" [ngStyle]=\"getPreviewWindowStyle()\">\n            <app-stage-list #stageList [viewMode]=\"'guide'\" (onSelectStage)=\"onSelectStage($event)\" (onNewStage)=\"onNewStage()\"></app-stage-list>\n            <app-preview #previewCanvas [viewMode]=\"'guide'\" [prefix]=\"prefix\" (onSelectNodeFromOther)=\"onSelectNodeFromOther($event)\" (onShowResourceDialog)=\"onShowResourceDialog($event)\"></app-preview>\n        </div>\n    </div>\n    <div class=\"fourth\" [ngStyle]=\"getFixHeightStyle()\">\n        <app-object-property [viewMode]=\"'guide'\" [applicationFolderPath]=\"applicationFolderPath\" [prefix]=\"prefix\" #objectProperty (onShowResourceDialog)=\"onShowResourceDialog($event)\" (onChangeTreeData)=\"changePropertyData($event)\"></app-object-property>\n    </div>\n\n    <div class=\"fiveth\" [ngStyle]=\"getFixHeightStyle()\">\n        <app-event-list [viewMode]=\"'guide'\" #eventList></app-event-list>\n        <app-event-detail-stage-change [viewMode]=\"'guide'\" #eventDetailStageChange></app-event-detail-stage-change>\n        <app-event-detail-start-activity [viewMode]=\"'guide'\" #eventDetailStartActivity></app-event-detail-start-activity>\n        <app-event-detail-finish-activity [viewMode]=\"'guide'\" #eventDetailFinishActivity></app-event-detail-finish-activity>\n    </div>\n\n\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/guide/guide.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuideComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__activity_object_tree_object_tree_component__ = __webpack_require__("../../../../../src/app/activity/object-tree/object-tree.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__activity_object_property_object_property_component__ = __webpack_require__("../../../../../src/app/activity/object-property/object-property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__activity_preview_preview_component__ = __webpack_require__("../../../../../src/app/activity/preview/preview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__activity_stage_list_stage_list_component__ = __webpack_require__("../../../../../src/app/activity/stage-list/stage-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__activity_event_list_event_list_component__ = __webpack_require__("../../../../../src/app/activity/event-list/event-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__activity_event_detail_stage_change_event_detail_stage_change_component__ = __webpack_require__("../../../../../src/app/activity/event-detail-stage-change/event-detail-stage-change.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__activity_event_detail_start_activity_event_detail_start_activity_component__ = __webpack_require__("../../../../../src/app/activity/event-detail-start-activity/event-detail-start-activity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__activity_event_detail_finish_activity_event_detail_finish_activity_component__ = __webpack_require__("../../../../../src/app/activity/event-detail-finish-activity/event-detail-finish-activity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__service_message_event_service__ = __webpack_require__("../../../../../src/app/service/message-event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_switchMap__);
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
    function GuideComponent(route, router, location, zone, appDataService, broadcaster, messageEvent) {
        this.route = route;
        this.router = router;
        this.location = location;
        this.zone = zone;
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
        this.messageEvent = messageEvent;
        this.prefix = '.';
        // @ViewChild('previewSize')
        // private previewSize: PreviewSizeComponent;
        this.saveStatus = false;
        this.sendStatus = false;
        this.isOpenActivityList = false;
        this.isReadyToRender = false;
        this.applicationFolderPath = '/assets/data';
        this.imageList = [];
        this.fileList = [];
        this.previewCss = {};
    }
    GuideComponent.prototype.ngOnInit = function () {
        this.activityId = this.route.snapshot.params['activityId'];
        var self = this;
        this.registerStringBroadcast();
        this.appDataService.getHttpToJson('/assets/data/app.json').then(function (result) {
            self.applicationData = result;
            return null;
        }).then(function (result) {
            console.log("this.applicationData = " + self.applicationData);
            if (self.activityId === 'init') {
                self.activityId = self.applicationData.activityList[0].activityId;
            }
            return self.reloadActivityData();
        }).then(function (result) {
            self.invalidatePreviewSize();
        });
    };
    GuideComponent.prototype.ngOnDestroy = function () {
        if (this.messageListener) {
            this.messageListener.unsubscribe();
        }
    };
    GuideComponent.prototype.registerStringBroadcast = function () {
        var _this = this;
        this.broadcaster.on('guide')
            .subscribe(function (message) {
            var kind = message.kind;
            console.log("message received!! = " + kind);
            var activityId = message.activityId;
            if (kind === 'open-url') {
                var targetUrl = message.url;
                _this.appDataService.openUrl(targetUrl);
            }
            else if (kind === 'select-object') {
                var selectedObject = _this.appDataService.findObjectById(message.objectId);
                _this.appDataService.setSelectedObject(selectedObject);
                _this.notifySelectedObjectChanged();
            }
            else if (kind === 'go-detail-activity') {
                _this.clickActivity(activityId);
            }
            else if (kind === 'detail-event') {
                var detailEvent = message.event;
                _this.onClickDetailEvent(detailEvent);
            }
            else if (kind === 'new-after-animation') {
                // this.onClickDetailEvent(null);
            }
            else if (kind === 'close-event') {
                _this.onCloseEvent();
            }
            else if (kind === 'select-object') {
                var selectedObject = _this.appDataService.findObjectById(message.objectId);
                _this.onSelectNodeFromOther(message.objectId);
                _this.appDataService.setSelectedObject(selectedObject);
                _this.notifySelectedObjectChanged();
            }
            else if (kind === 'select-stage') {
                var stage = message.stage;
                _this.onSelectStage(stage);
            }
            else if (kind === 'delete-stage') {
                var stage = message.stage;
                _this.onSelectStage(stage);
            }
        });
    };
    GuideComponent.prototype.clickActivity = function (activityId) {
        this.activityId = activityId;
        this.reloadActivityData();
    };
    GuideComponent.prototype.onClickDetailEvent = function (triggerEvent) {
        this.appDataService.setSelectedTriggerEvent(triggerEvent);
        var impEvent = this.appDataService.findImplentEventByTriggerEventId(triggerEvent.id);
        this.appDataService.setSelectedImplementEvent(impEvent);
        // notify data set changed
        this.notifySelectedObjectChanged();
    };
    GuideComponent.prototype.onResize = function (event) {
        this.invalidatePreviewSize();
    };
    GuideComponent.prototype.invalidatePreviewSize = function () {
        this.windowW = window.innerWidth;
        this.windowH = window.innerHeight;
    };
    GuideComponent.prototype.getFixHeightStyle = function () {
        var objectStyle = {
            'height': this.windowH + 'px',
        };
        return objectStyle;
    };
    GuideComponent.prototype.getPreviewWindowStyle = function () {
        var objectStyle = {
            'width': this.windowW * 0.3 + 'px',
            'height': this.windowH + 'px'
        };
        return objectStyle;
    };
    GuideComponent.prototype.reloadActivityData = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.appDataService.loadInitDataFromFile().then(function (data) {
                self.defaultStateData = self.appDataService.getDefaultStateData();
                self.objectTypeData = self.appDataService.getObjectTypeData();
                self.appDataService.initApplicationPath(self.applicationFolderPath);
                self.appDataService.initActivityId(self.activityId);
                self.appDataService.setApplicationData(self.applicationData);
                return self.appDataService.getHttpToJson('/assets/data/activity/' + self.activityId + '.json');
            }).then(function (result) {
                self.appDataService.setActivityData(result);
                self.applicationData = self.appDataService.getApplicationData();
                self.activityMetaData = self.appDataService.getActivityMetaData();
                self.activityData = self.appDataService.getActivityData();
                self.selectedTriggerEvent = self.appDataService.getSelectedTriggerEvent();
                return self.initDataToView();
            }).then(function (result) {
                self.notifySelectedObjectChanged();
            }).then(function (result) {
                resolve(true);
            });
        });
    };
    GuideComponent.prototype.initDataToView = function () {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
            self.isReadyToRender = true;
            self.appDataService.setSelectedStage(self.activityData.stageList[0]);
            self.appDataService.setSelectedObject(self.activityData.objectList[0]);
            // this.objectNewComponent.setObjectTypeData(this.objectTypeData);
            _this.objectTreeComponent.initObjectData();
            _this.stageList.initData();
            resolve(true);
        });
    };
    GuideComponent.prototype.onSelectNodeFromOther = function (objectId) {
        console.log("onSelectNodeFromOther-" + objectId);
        this.objectTreeComponent.selectObjectNode(this.appDataService.findObjectById(objectId));
    };
    GuideComponent.prototype.onSelectNodeFromTree = function (objectId) {
        var selectedObject = this.appDataService.findObjectById(objectId);
        // console.log("onSelectNodeFromTree = " + selectedObject.id);
        this.appDataService.setSelectedObject(selectedObject);
        this.notifySelectedObjectChanged();
    };
    GuideComponent.prototype.notifySelectedObjectChanged = function () {
        this.previewComponent.onChangeData();
        // this.previewSize.onChangeData();
        this.objectPropertyComponent.onChangeData();
        this.stageList.onChangeData();
        this.eventList.onChangeData();
        this.eventDetailStageChange.onChangeData();
        this.eventDetailStartActivity.onChangeData();
        this.eventDetailFinishActivity.onChangeData();
    };
    GuideComponent.prototype.onCloseEvent = function () {
        this.appDataService.setSelectedTriggerEvent(null);
        this.appDataService.setSelectedImplementEvent(null);
        // notify data set changed
        this.notifySelectedObjectChanged();
    };
    GuideComponent.prototype.onSelectStage = function (target) {
        console.log("onSelectStage = " + target);
        this.appDataService.setSelectedStage(target);
        this.notifySelectedObjectChanged();
    };
    GuideComponent.prototype.clickRoot = function () {
        this.router.navigate(['/application', this.applicationFolderPath]);
    };
    return GuideComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('objectTree'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__activity_object_tree_object_tree_component__["a" /* ObjectTreeComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__activity_object_tree_object_tree_component__["a" /* ObjectTreeComponent */]) === "function" && _a || Object)
], GuideComponent.prototype, "objectTreeComponent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('objectProperty'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__activity_object_property_object_property_component__["a" /* ObjectPropertyComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__activity_object_property_object_property_component__["a" /* ObjectPropertyComponent */]) === "function" && _b || Object)
], GuideComponent.prototype, "objectPropertyComponent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('previewCanvas'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__activity_preview_preview_component__["a" /* PreviewComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__activity_preview_preview_component__["a" /* PreviewComponent */]) === "function" && _c || Object)
], GuideComponent.prototype, "previewComponent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('stageList'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__activity_stage_list_stage_list_component__["a" /* StageListComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__activity_stage_list_stage_list_component__["a" /* StageListComponent */]) === "function" && _d || Object)
], GuideComponent.prototype, "stageList", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('eventList'),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__activity_event_list_event_list_component__["a" /* EventListComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__activity_event_list_event_list_component__["a" /* EventListComponent */]) === "function" && _e || Object)
], GuideComponent.prototype, "eventList", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('eventDetailStageChange'),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__activity_event_detail_stage_change_event_detail_stage_change_component__["a" /* EventDetailStageChangeComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__activity_event_detail_stage_change_event_detail_stage_change_component__["a" /* EventDetailStageChangeComponent */]) === "function" && _f || Object)
], GuideComponent.prototype, "eventDetailStageChange", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('eventDetailStartActivity'),
    __metadata("design:type", typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_9__activity_event_detail_start_activity_event_detail_start_activity_component__["a" /* EventDetailStartActivityComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__activity_event_detail_start_activity_event_detail_start_activity_component__["a" /* EventDetailStartActivityComponent */]) === "function" && _g || Object)
], GuideComponent.prototype, "eventDetailStartActivity", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('eventDetailFinishActivity'),
    __metadata("design:type", typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_10__activity_event_detail_finish_activity_event_detail_finish_activity_component__["a" /* EventDetailFinishActivityComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__activity_event_detail_finish_activity_event_detail_finish_activity_component__["a" /* EventDetailFinishActivityComponent */]) === "function" && _h || Object)
], GuideComponent.prototype, "eventDetailFinishActivity", void 0);
GuideComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-guide',
        template: __webpack_require__("../../../../../src/app/guide/guide.component.html"),
        styles: [__webpack_require__("../../../../../src/app/guide/guide.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_12__service_broadcast_service__["a" /* BroadcastService */], __WEBPACK_IMPORTED_MODULE_13__service_message_event_service__["a" /* MessageEventService */]]
    }),
    __metadata("design:paramtypes", [typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_11__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_12__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_13__service_message_event_service__["a" /* MessageEventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__service_message_event_service__["a" /* MessageEventService */]) === "function" && _q || Object])
], GuideComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
//# sourceMappingURL=guide.component.js.map

/***/ }),

/***/ "../../../../../src/app/init/init-menu/init-menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".menu-main-list button {\nbackground: transparent;\nfont-size: 15px;\nfont-weight: 400;\ncolor:#fff;\ntext-shadow: 0px 0px 11px rgba(0,0,0,0.45);\nborder:none;\n}\n\n.menu-main-list button:hover {\n    cursor: pointer;\n    color:#ececec;\n}\n\n.menu-main-list {\n    margin-top: 25px;\nmax-width:270px;\n\n}\n\n#center {\n    position: absolute;\n    z-index: 9999!important;\n}\n\n.vc {\n    max-height:400px;\n    top: 0;\n    bottom: 0;\n    margin-top: auto;\n    margin-bottom: auto;\n}\n\n.hc {\n    max-width: 320px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.menu-main-list .main-img {\n    width:140px;\n}\n\n/*.hc {\n    max-width: 280px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n\n}\n\n.vc {\n    max-height: 330px;\n    top: 0;\n    bottom: 0;\n    margin-top: auto;\n    margin-bottom: auto;\n}\n\n#center {\n    position: absolute;\n    z-index: 9999!important;\n}*/\n\n.menu-list  div img {\n    width:35px;\n    padding:6px;\n}\n\n\n\n.menu-list {\n    vertical-align: middle;\n}\n\n.menu-list {\n    margin-top: 55px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/init/init-menu/init-menu.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"center\" class=\"menu-main-list hc vc\">\n    <div align=\"center\"><img class=\"main-img\" src=\"assets/images/ic_logo_main.png\" /></div>\n    <!--menu list -->\n    <div class=\"menu-list\">\n        <div><img src=\"assets/images/ic_new.png\"> <button (click)=\"clickNewApplication()\">Start a new VXM project</button></div>\n        <div><img src=\"assets/images/ic_open.png\"> <button (click)=\"clickOpenApplication()\">Open an exisiting VXM project</button></div>\n        <div><img src=\"assets/images/ic_howtouse.png\"> <button (click)=\"clickHelp()\">How to use</button></div>\n        <div><img src=\"assets/images/ic_setting_white.png\"> <button (click)=\"clickSettingApplication()\">Settings</button></div>\n\n        <button (click)=\"clickGuide()\">Guide</button>\n    </div>\n    <!-- menu list finish -->\n</div>"

/***/ }),

/***/ "../../../../../src/app/init/init-menu/init-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_message_event_service__ = __webpack_require__("../../../../../src/app/service/message-event.service.ts");
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
    InitMenuComponent.prototype.clickNewApplication = function () {
        console.log("clickNewApplication");
        var message = {
            kind: 'new-application',
        };
        this.broadcaster.broadcast('init', message);
    };
    InitMenuComponent.prototype.clickOpenApplication = function () {
        console.log("clickOpenApplication");
        var message = {
            kind: 'open-application',
        };
        this.broadcaster.broadcast('init', message);
    };
    InitMenuComponent.prototype.clickHelp = function () {
        var message = {
            kind: 'how-to-use',
        };
        this.broadcaster.broadcast('init', message);
    };
    InitMenuComponent.prototype.clickSettingApplication = function () {
        console.log("clickSettingApplication");
    };
    InitMenuComponent.prototype.clickGuide = function () {
        this.router.navigate(['/guide/init']);
    };
    return InitMenuComponent;
}());
InitMenuComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-init-menu',
        template: __webpack_require__("../../../../../src/app/init/init-menu/init-menu.component.html"),
        styles: [__webpack_require__("../../../../../src/app/init/init-menu/init-menu.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_4__service_message_event_service__["a" /* MessageEventService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__service_message_event_service__["a" /* MessageEventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_message_event_service__["a" /* MessageEventService */]) === "function" && _e || Object])
], InitMenuComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=init-menu.component.js.map

/***/ }),

/***/ "../../../../../src/app/init/init.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n.bg-menu {\n    background: linear-gradient(to bottom, #46a2ba 0%,#8096cc 100%);\n    height: 100%;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n}\n\n.menu-list {\n   height:100%;\n    background: #edf0f4;\n   max-width:280px;\n position: absolute;\n   overflow-y:auto;\n   overflow-x:hidden;\n    float:left;\n    padding-top: 46px;\n}\n\n.menu-main {\n    height:100%;\npadding:30px;\n   overflow: hidden;\n margin-left: 250px;\n position: relative;\n}\n\n/*.menu-list + .menu-main {\n    width:70%;\n    float:left;\n    }*/\n\n.version-info {\n    position: absolute;\n    right:0;\n    top:0;\n    margin-top: 20px;\n    margin-right: 20px;\n    font-size: 13px;\n    color:rgba(255,255,255,0.5);\n}\n\n.go-download {\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    padding-right: 20px;\n    margin-bottom: 10px;\n    overflow: hidden;\n    margin-left: 250px;\n    padding-left: 140px;\n    border-top: 1px solid rgba(255,255,255, 0.3);\n    padding-top: 10px;\n}\n\n.go-download p {\n font-size: 11px;\n color:rgba(255,255,255, 0.8);\n font-weight: lighter;\n float: right;\n margin: 6px;\n margin-top: 10px;\n}\n\n.go-download img {\n    float: right;\n    width:128px;\n}\n\n.go-download img:hover {\n    cursor: pointer;\n}\n\n@media screen and (max-height: 460px) {\n    .go-download {\n        display: none;\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/init/init.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"container\" class=\"bg-menu\">\n    <div class=\"menu-list\">\n\n        <app-recent-project #recentProjectList></app-recent-project>\n    </div>\n    <div class=\"menu-main\">\n        <app-init-menu></app-init-menu>\n    </div>\n    <div class=\"version-info\">Version 1.0</div>\n    <div class=\"go-download\">\n        <img src=\"assets/images/btn_download.png\" (click)=\"clickDownloadApp('https://play.google.com/store/apps/details?id=com.altamirasoft.baby_hub_android')\" />\n        <p> Download the app to see your work immediately ! ▸▸</p>\n\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/init/init.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_message_event_service__ = __webpack_require__("../../../../../src/app/service/message-event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__init_recent_project_recent_project_component__ = __webpack_require__("../../../../../src/app/init/recent-project/recent-project.component.ts");
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
        this.imgPrefix = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].imgPrefix;
    }
    InitComponent.prototype.ngOnInit = function () {
        this.registerStringBroadcast();
    };
    InitComponent.prototype.ngOnDestroy = function () {
        if (this.messageListener) {
            this.messageListener.unsubscribe();
        }
    };
    InitComponent.prototype.registerStringBroadcast = function () {
        var _this = this;
        this.messageListener = this.broadcaster.on('init')
            .subscribe(function (message) {
            var kind = message.kind;
            console.log("message received!! = " + kind);
            if (kind === 'open-application') {
                _this.openApplication();
            }
            else if (kind === 'new-application') {
                _this.newApplication();
            }
            else if (kind === 'open-application-folder') {
                _this.openApplicationFolder(message.folderPath);
            }
            else if (kind === 'how-to-use') {
                _this.appDataService.openUrl('http://www.vxmaker.com');
            }
        });
    };
    InitComponent.prototype.openApplication = function () {
        var folder = this.appDataService.selectWorkspaceFolderPath();
        if (folder) {
            this.openApplicationFolder(folder);
        }
    };
    InitComponent.prototype.newApplication = function () {
        this.router.navigate(['/new-application']);
    };
    InitComponent.prototype.clickDownloadApp = function (url) {
        this.appDataService.openUrl(url);
    };
    InitComponent.prototype.openApplicationFolder = function (folder) {
        var applicationData = this.appDataService.readFileData(folder + '/app.json'); // JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', folder + "/app.json")));
        if (applicationData) {
            this.router.navigate(['/application', folder]);
        }
        else {
            alert("no data");
            this.appDataService.removeRecentProjectListWithPath(folder);
            this.recentProjectList.refreshList();
        }
    };
    return InitComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('recentProjectList'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7__init_recent_project_recent_project_component__["a" /* RecentProjectComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__init_recent_project_recent_project_component__["a" /* RecentProjectComponent */]) === "function" && _a || Object)
], InitComponent.prototype, "recentProjectList", void 0);
InitComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-init',
        template: __webpack_require__("../../../../../src/app/init/init.component.html"),
        styles: [__webpack_require__("../../../../../src/app/init/init.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_4__service_broadcast_service__["a" /* BroadcastService */], __WEBPACK_IMPORTED_MODULE_5__service_message_event_service__["a" /* MessageEventService */]]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__service_message_event_service__["a" /* MessageEventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_message_event_service__["a" /* MessageEventService */]) === "function" && _f || Object])
], InitComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=init.component.js.map

/***/ }),

/***/ "../../../../../src/app/init/recent-project/recent-project.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".recent-project {\n    padding:15px;\n    font-size: 13px;\n    color:#a3a3a3;\n    border-bottom: 1px solid #ccc;\n    margin:0;\n    position: fixed;\n    top:0;\n    width:250px;\nbackground: #edf0f4;\n}\n\n.recent-project-list {\n    padding:15px;\n    border-bottom: 1px solid #ccc;\nwidth:250px;\n}\n\n.recent-project-list h5 {\n    font-weight: 600;\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n\n.recent-project-list p {\n    color:#a3a3a3;\n    margin:0;\n    font-size: 12px;\n    text-overflow: ellipsis;\n    overflow: hidden;\n}\n\n.recent-project-list:hover {\n cursor: pointer;\n background: rgba(227,232,239,1);\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/init/recent-project/recent-project.component.html":
/***/ (function(module, exports) {

module.exports = "<div  [hidden]=\"!(recentProjects!=null && recentProjects.length>0)\">\n    <p class=\"recent-project\">Recent projects</p>\n    <div class=\"recent-project-list\" *ngFor=\"let application of recentProjects\" (click)=\"clickApplication(application.applicationFolderPath)\">\n        <h5>{{application.applicationName}}</h5>\n        <p>{{application.applicationFolderPath}}</p>\n\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/init/recent-project/recent-project.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecentProjectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_message_event_service__ = __webpack_require__("../../../../../src/app/service/message-event.service.ts");
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
    function RecentProjectComponent(router, appDataService, broadcaster, messageEvent) {
        this.router = router;
        this.appDataService = appDataService;
        this.broadcaster = broadcaster;
        this.messageEvent = messageEvent;
    }
    RecentProjectComponent.prototype.ngOnInit = function () {
        this.refreshList();
    };
    RecentProjectComponent.prototype.clickApplication = function (folderPath) {
        var message = {
            kind: 'open-application-folder',
            folderPath: folderPath
        };
        this.broadcaster.broadcast('init', message);
    };
    RecentProjectComponent.prototype.refreshList = function () {
        this.recentProjects = this.appDataService.getRecentProjectList();
    };
    return RecentProjectComponent;
}());
RecentProjectComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-recent-project',
        template: __webpack_require__("../../../../../src/app/init/recent-project/recent-project.component.html"),
        styles: [__webpack_require__("../../../../../src/app/init/recent-project/recent-project.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__service_broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_broadcast_service__["a" /* BroadcastService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__service_message_event_service__["a" /* MessageEventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_message_event_service__["a" /* MessageEventService */]) === "function" && _d || Object])
], RecentProjectComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=recent-project.component.js.map

/***/ }),

/***/ "../../../../../src/app/new-application/new-application.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn-back {\n    background: none;\n    border: none;\n    color: #898989;\n    font-weight: 700;\n    font-size: 14px;\n}\n\n.btn-back:hover {\n    cursor: pointer;\n    color: #454545;\n}\n\n.btn-new-save {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    margin-bottom: 30px;\n    margin-right: 20px;\n}\n\n.btn-new-save button:hover {\n    cursor: pointer;\n}\n\n.btn-new-save button {\n    font-weight: 700;\n    font-size: 14px;\n    border: none;\n    color: #46a2ba;\n    background: transparent;\n}\n\n.btn-new-save button:hover {\n    color: #2c869d;\n}\n\n.ic-newproject {\n    text-align: center;\n    margin-top: 35px;\n    margin-bottom: 30px;\n}\n\n.application-name {\n    max-width: 390px;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.application-name .form-control {\n    width: 100%;\n}\n\n.project-folder input {\n    padding-right: 25px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.application-name input:focus {\n    border-color: #46a2ba!important;\n}\n\n.project-folder {\n    position: relative;\n}\n\n.project-folder button {\n    border: none;\n    border-radius: 4px;\n    font-size: 10px;\n    background: #fff;\n    position: absolute;\n    right: 5px;\n    top: 0;\n    color: #46a2ba;\n    font-weight: 800;\n    margin-top: 7px;\n}\n\n.project-folder button:hover {\n    cursor: pointer;\n    background: #f1f1f1;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/new-application/new-application.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"new-project-top\" style=\"padding:25px;\">\n    <button class=\"btn-back\" (click)=\"clickBack()\">◄ back</button></div>\n<div>\n    <div class=\"ic-newproject\">\n        <img src=\"assets/images/ic_newproject.png\">\n    </div>\n    <div class=\"application-name\">\n        <h5>Application Name</h5>\n        <input class=\"form-control\" type=\"text\" [(ngModel)]=\"applicationName\" />\n        <h5 style=\"margin-top: 15px; margin-bottom: 5px;\">Project Folder </h5>\n        <div class=\"project-folder\">\n            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"workspaceFolderPath\" />\n            <button class=\"btn-change\" (click)=\"clickChangeFolder()\">···</button>\n        </div>\n    </div>\n\n</div>\n<div class=\"btn-new-save\">\n    <button (click)=\"clickNext()\">next ►</button>\n</div>"

/***/ }),

/***/ "../../../../../src/app/new-application/new-application.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewApplicationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__ = __webpack_require__("../../../../../src/app/service/application-data-service.service.ts");
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
        this.workspaceFolderPath = this.appDataService.getWorkspaceFolderPath(); // electron.ipcRenderer.sendSync('get-workspace-folder-path');
    };
    //change project folder
    NewApplicationComponent.prototype.clickChangeFolder = function () {
        var folder = this.appDataService.selectWorkspaceFolderPathFrom(this.workspaceFolderPath); // electron.ipcRenderer.sendSync('select-workspace-folder-path', this.workspaceFolderPath);
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
        this.appDataService.copyFolderFromRoot('/template/sample/file', applicationFolder + '/file');
        this.appDataService.copyFolderFromRoot('/template/sample/image', applicationFolder + '/image');
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-new-application',
        template: __webpack_require__("../../../../../src/app/new-application/new-application.component.html"),
        styles: [__webpack_require__("../../../../../src/app/new-application/new-application.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_application_data_service_service__["a" /* ApplicationDataServiceService */]) === "function" && _c || Object])
], NewApplicationComponent);

var _a, _b, _c;
//# sourceMappingURL=new-application.component.js.map

/***/ }),

/***/ "../../../../../src/app/service/application-data-service.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationDataServiceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__ = __webpack_require__("../../../../angular2-uuid/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
        this.templeteFolderPath = './assets/template';
        this.templateHash = {};
        this.idHash = {};
        this.activityIdHash = {};
        this.activityLayoutIdHash = {};
        this.codeResult = {};
        //template data hash
        this.templateDataHash = {};
        this.templateNameList = [
            'activity_main.xml',
            'MainActivity.java',
            'AndroidManifest.xml',
            'build.gradle',
            'strings.xml',
        ];
        this.templateFileList = [
            '/source_template/activity_main.xml',
            '/source_template/MainActivity.java',
            '/source_template/AndroidManifest.xml',
            '/source_template/build.gradle',
            '/source_template/strings.xml',
        ];
        var self = this;
        if (electron) {
            electron.ipcRenderer.on('parse-psd-result', function (event, arg) {
                _this.parsePsdPromise(arg);
            });
            electron.ipcRenderer.on('capture-screen-result', function (event, arg) {
                _this.capturePromise(arg);
            });
        }
    }
    ApplicationDataServiceService.prototype.parsePsdFile = function (psdFilePath, applicationFolderPath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.parsePsdPromise = resolve;
            electron.ipcRenderer.send('parse-psd', psdFilePath, applicationFolderPath);
        });
    };
    ApplicationDataServiceService.prototype.initApplicationPath = function (applicationFolderPath) {
        this.applicationFolderPath = applicationFolderPath;
    };
    ApplicationDataServiceService.prototype.initActivityId = function (activityId) {
        this.activityId = activityId;
    };
    ApplicationDataServiceService.prototype.getCurrentActivityId = function () {
        return this.activityId;
    };
    ApplicationDataServiceService.prototype.getApplicationPath = function () {
        return this.applicationFolderPath;
    };
    ApplicationDataServiceService.prototype.openUrl = function (url) {
        console.log("will open url = " + url);
        electron.ipcRenderer.sendSync('open-url', url);
    };
    ApplicationDataServiceService.prototype.openFinder = function (path) {
        electron.ipcRenderer.sendSync('open-finder', path);
    };
    ApplicationDataServiceService.prototype.openMainWindowUrl = function (path) {
        console.log('path = ' + path);
        return electron.ipcRenderer.sendSync('go-main-window', path);
    };
    ApplicationDataServiceService.prototype.closeMainWindowUrl = function () {
        console.log('close main window');
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
    ApplicationDataServiceService.prototype.removeRecentProjectListWithPath = function (path) {
        var temp = {
            'applicationFolderPath': path
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
        if (electron) {
            return JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('get-recent-project-list')));
        }
        else {
            return [];
        }
    };
    ApplicationDataServiceService.prototype.saveApplicationData = function (applicationData) {
        electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + '/app.json', applicationData);
    };
    ApplicationDataServiceService.prototype.saveActivityData = function (activityId, activityData) {
        electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + '/activity/' + activityId + '.json', activityData);
    };
    ApplicationDataServiceService.prototype.duplicateActivityData = function (srcAtivityId, dstActivityId) {
        var tempActivityData = this.loadActivityDataSync(srcAtivityId);
        tempActivityData['activityId'] = dstActivityId;
        this.saveActivityData(dstActivityId, tempActivityData);
    };
    ApplicationDataServiceService.prototype.deleteActivity = function (activityId) {
        electron.ipcRenderer.sendSync('delete-file', this.applicationFolderPath + '/activity/' + activityId + '.json');
    };
    ApplicationDataServiceService.prototype.captureScreen = function (x, y, w, h, filePath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.capturePromise = resolve;
            electron.ipcRenderer.send('capture-screen', x, y, w, h, filePath);
        });
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
    ApplicationDataServiceService.prototype.getWorkspaceFolderPath = function () {
        return electron.ipcRenderer.sendSync('get-workspace-folder-path');
    };
    ApplicationDataServiceService.prototype.getExportFolderPath = function () {
        return electron.ipcRenderer.sendSync('get-export-folder-path');
    };
    ApplicationDataServiceService.prototype.selectWorkspaceFolderPath = function () {
        return electron.ipcRenderer.sendSync('select-workspace-folder-path');
    };
    ApplicationDataServiceService.prototype.selectWorkspaceFolderPathFrom = function (beforePath) {
        return electron.ipcRenderer.sendSync('select-workspace-folder-path', beforePath);
    };
    ApplicationDataServiceService.prototype.readFileData = function (path) {
        return JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', path)));
    };
    ApplicationDataServiceService.prototype.deleteFile = function (path) {
        electron.ipcRenderer.sendSync('delete-file', path);
    };
    ApplicationDataServiceService.prototype.writeFile = function (path, data) {
        electron.ipcRenderer.sendSync('write-file-data', path, data);
    };
    ApplicationDataServiceService.prototype.copyFile = function (src, dst) {
        electron.ipcRenderer.sendSync('copy-file', src, dst);
        return true;
    };
    ApplicationDataServiceService.prototype.copyFolder = function (src, dst) {
        electron.ipcRenderer.sendSync('copy-folder', src, dst);
        return true;
    };
    ApplicationDataServiceService.prototype.haveFile = function (path) {
        return electron.ipcRenderer.sendSync('have-file', path);
    };
    ApplicationDataServiceService.prototype.copyFolderFromRoot = function (src, dst) {
        electron.ipcRenderer.sendSync('copy-folder-from-root', src, dst);
        return true;
    };
    ApplicationDataServiceService.prototype.makeFolder = function (path) {
        electron.ipcRenderer.sendSync('make-folder', path);
    };
    ApplicationDataServiceService.prototype.makeSmallEnglish = function (origin) {
        var result = this.makeEnglish(origin.toLowerCase());
        if (!isNaN(parseInt(result[0], 10)) || result.length === 0 || result.startsWith('_')) {
            // Is a number
            result = 'image' + result;
        }
        return result;
    };
    ApplicationDataServiceService.prototype.makeEnglish = function (origin) {
        return origin.trim().replace(/\s/gi, '_').replace(/[^a-zA-Z0-9]/g, '_').replace('-', '_');
    };
    ApplicationDataServiceService.prototype.getUniqueActivityName = function (origin) {
        var result = this.makeEnglish(origin);
        if (!isNaN(parseInt(result[0], 10)) || result.length == 0 || result.startsWith('_')) {
            // Is a number
            result = "Activity" + result;
        }
        return this.getUniqueSourceName(result);
    };
    ApplicationDataServiceService.prototype.getUniqueResourceName = function (origin) {
        var result = this.makeSmallEnglish(origin);
        if (!isNaN(parseInt(result[0], 10)) || result.length == 0 || result.startsWith('_')) {
            // Is a number
            result = "resource" + result;
        }
        return this.getUniqueSourceName(result);
    };
    ApplicationDataServiceService.prototype.getUniqueLayoutName = function (origin) {
        var result = this.makeSmallEnglish(origin);
        if (!isNaN(parseInt(result[0], 10)) || result.length == 0 || result.startsWith('_')) {
            // Is a number
            result = "activity_" + result;
        }
        return this.getUniqueSourceName(result);
    };
    ApplicationDataServiceService.prototype.getUniqueSourceName = function (origin) {
        var result = origin;
        var lastId = 0;
        while (this.idHash[result]) {
            result = origin + '_' + lastId;
            lastId++;
        }
        this.idHash[result] = true;
        return result;
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
    ApplicationDataServiceService.prototype.loadTemplete = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promiseList = [];
            for (var i = 0; i < _this.templateNameList.length; i++) {
                var name = _this.templateNameList[i];
                var path = _this.templateFileList[i];
                promiseList.push(_this.loadTemplateStringByNamePath(name, path));
            }
            Promise.all(promiseList).then(function (result) {
                resolve(result);
            });
        });
    };
    ApplicationDataServiceService.prototype.loadTemplateStringByNamePath = function (name, path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadTemplateString(path).then(function (result) {
                _this.templateDataHash[name] = result;
                resolve(result);
            });
        });
    };
    ApplicationDataServiceService.prototype.loadInitDataFromFile = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //오브젝트 타입 정보 불러오기
            _this.loadTemplete().then(function (result) {
                return _this.getHttpToJson('assets/object/object.json');
            }).then(function (data) {
                var reqeustList = [];
                for (var i = 0; i < data.objectType.length; i++) {
                    reqeustList.push(_this.getHttpToJson('assets/object/' + data.objectType[i]));
                }
                _this.defaultStateData = data.defaultState;
                return Promise.all(reqeustList);
            }).then(function (results) {
                console.log('results =' + JSON.stringify(results));
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
    ApplicationDataServiceService.prototype.loadApplicationDataSync = function () {
        this.applicationData = electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + '/app.json');
        return this.applicationData;
    };
    ApplicationDataServiceService.prototype.setApplicationData = function (data) {
        this.applicationData = data;
    };
    ApplicationDataServiceService.prototype.setActivityData = function (data) {
        this.activityData = data;
        for (var i = 0; i < this.applicationData.activityList.length; i++) {
            var activity = this.applicationData.activityList[i];
            if (activity.activityId === this.activityId) {
                this.activityMetaData = activity;
                break;
            }
        }
    };
    ApplicationDataServiceService.prototype.loadActivityDataSync = function (activityId) {
        return electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + '/activity/' + activityId + '.json');
    };
    ApplicationDataServiceService.prototype.loadTemplateString = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.templateHash[file]) {
                resolve(_this.templateHash[file]);
            }
            else {
                _this.http.get(_this.templeteFolderPath + '/' + file)
                    .subscribe(function (res) {
                    _this.templateHash[file] = res['_body'];
                    resolve(_this.templateHash[file]);
                });
            }
        });
    };
    ApplicationDataServiceService.prototype.loadDataFromUrl = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.templateHash[file]) {
                resolve(_this.templateHash[file]);
            }
            else {
                _this.http.get(file)
                    .subscribe(function (res) {
                    _this.templateHash[file] = res['_body'];
                    resolve(_this.templateHash[file]);
                });
            }
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
    ApplicationDataServiceService.prototype.setSelectedStageByStageId = function (stageId) {
        var value = null;
        for (var i = 0; i < this.activityData.stageList.length; i++) {
            var aStage = this.activityData.stageList[i];
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
    ApplicationDataServiceService.prototype.findTriggerEventByAfterTriggerEventId = function (implEventId) {
        for (var i = 0; i < this.activityData.triggerEventList.length; i++) {
            var aEvent = this.activityData.triggerEventList[i];
            if (aEvent.afterTriggerEventId && aEvent.afterTriggerEventId === implEventId) {
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
    ApplicationDataServiceService.prototype.deleteImplementEventByImplEventId = function (implEventId) {
        var index = -1;
        for (var i = 0; i < this.activityData.implementEventList.length; i++) {
            var aEvent = this.activityData.implementEventList[i];
            if (aEvent.id === implEventId) {
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
    ApplicationDataServiceService.prototype.findStageByStageId = function (stageId) {
        for (var i = 0; i < this.activityData.stageList.length; i++) {
            if (stageId === this.activityData.stageList[i].id) {
                return this.activityData.stageList[i];
            }
        }
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
    ApplicationDataServiceService.prototype.deleteStage = function (stageId) {
        console.log("will delete stage = " + stageId);
        //delete event
        var removeTriggerEventList = [];
        for (var i = 0; i < this.activityData.triggerEventList.length; i++) {
            var aEvent = this.activityData.triggerEventList[i];
            if (aEvent.stageId === stageId) {
                removeTriggerEventList.push(aEvent);
            }
        }
        for (var i = 0; i < removeTriggerEventList.length; i++) {
            this.deleteTriggerEvent(removeTriggerEventList[i]);
        }
        removeTriggerEventList = [];
        for (var i = 0; i < this.activityData.implementEventList.length; i++) {
            var aEvent = this.activityData.implementEventList[i];
            if (aEvent.fromStageId === stageId || aEvent.toStageId === stageId) {
                removeTriggerEventList.push(aEvent);
            }
        }
        for (var i = 0; i < removeTriggerEventList.length; i++) {
            this.deleteTriggerEventByTriggerEventId(removeTriggerEventList[i].triggerEventId);
            this.deleteImplementEventByTriggerEventId(removeTriggerEventList[i].triggerEventId);
            this.deleteImplementEventByImplEventId(removeTriggerEventList[i].id);
        }
        // //delete state
        this.deleteStateByStageId(stageId);
        //delete stage
        var stageResult = [];
        var targetStageList = this.activityData.stageList;
        for (var i = 0; i < targetStageList.length; i++) {
            var aStage = targetStageList[i];
            if (aStage.id === stageId) {
                continue;
            }
            stageResult.push(aStage);
        }
        this.activityData.stageList = stageResult;
    };
    ApplicationDataServiceService.prototype.deleteStateByStageId = function (stageId) {
        //remove state
        var stateresult = [];
        var targetStateList = this.activityData.stateList;
        for (var i = 0; i < targetStateList.length; i++) {
            var aState = targetStateList[i];
            if (aState.stageId === stageId) {
                continue;
            }
            stateresult.push(aState);
        }
        this.activityData.stateList = stateresult;
    };
    ApplicationDataServiceService.prototype.findStateByStateId = function (activityData, stateId) {
        for (var i = 0; i < activityData.stateList.length; i++) {
            var aState = activityData.stateList[i];
            if (aState.id === stateId) {
                return aState;
            }
        }
        return null;
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
            console.log("aProperty.name =" + aProperty.default);
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
            'opacity': state.alpha,
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
        console.log('will remove state = ' + objectId);
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
            return Number(tempState.marginLeft) + Number(tempState.translationX);
        }
        else {
            return Number(tempState.marginLeft) + Number(tempState.translationX) + this.getParentMarginLeft(targetObject.parentId);
        }
    };
    ApplicationDataServiceService.prototype.getParentMarginTop = function (targetObjectId) {
        var targetObject = this.findObjectById(targetObjectId);
        var tempState = this.findStateByObjectId(targetObject.id);
        if (targetObjectId === 'root') {
            return Number(tempState.marginTop) + Number(tempState.translationY);
        }
        else {
            return Number(tempState.marginTop) + Number(tempState.translationY) + this.getParentMarginTop(targetObject.parentId);
        }
    };
    ApplicationDataServiceService.prototype.getMarginLeft = function (state, objectData) {
        var totalMargin = state.marginLeft;
        if (objectData.id !== 'root') {
            totalMargin = Number(state.marginLeft) + Number(state.translationX) + this.getParentMarginLeft(objectData.parentId);
        }
        return totalMargin;
    };
    ApplicationDataServiceService.prototype.getMarginTop = function (state, objectData) {
        var totalMargin = state.marginTop;
        if (objectData.id !== 'root') {
            totalMargin = Number(state.marginTop) + Number(state.translationY) + this.getParentMarginTop(objectData.parentId);
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
    ApplicationDataServiceService.prototype.getViewClass = function (origin) {
        if ("#" == origin) {
            return "FrameLayout";
        }
        else {
            return origin;
        }
    };
    ApplicationDataServiceService.prototype.makeBeautifyWithCount = function (source, line_length) {
        return html_beautify(source, { indent_size: 4, wrap_line_length: line_length });
    };
    ApplicationDataServiceService.prototype.makeBeautify = function (source) {
        return html_beautify(source, { indent_size: 4, wrap_line_length: 70 });
    };
    ApplicationDataServiceService.prototype.getActivityName = function (activityId) {
        for (var i = 0; i < this.applicationData.activityList.length; i++) {
            var aActivity = this.applicationData.activityList[i];
            if (activityId === aActivity.activityId) {
                return aActivity.activityName;
            }
        }
        return null;
    };
    ApplicationDataServiceService.prototype.insertChild = function (objectId) {
        var xmlString = '';
        var object = this.findObjectById(objectId);
        if (object) {
            var state = this.findStateByObjectId(objectId);
            if (state) {
                xmlString += this.getObjectString(object, state);
                if (object.children) {
                    for (var i = 0; i < object.children.length; i++) {
                        xmlString += this.insertChild(object.children[i].id);
                    }
                }
                xmlString += '\n';
                xmlString += this.getCloseString(object);
            }
        }
        return xmlString;
    };
    ApplicationDataServiceService.prototype.pxToDp = function (px) {
        // const result = Number(px * (160 / 640));
        // return result.toFixed(0);
        return px;
    };
    ApplicationDataServiceService.prototype.getObjectString = function (object, state) {
        if (object.type === '#') {
            return '<FrameLayout\n' + this.getStateStringById(object, state) + '>\n';
        }
        else if (object.type === 'FrameLayout') {
            return '\n<FrameLayout\n' + this.getStateStringById(object, state) + '>\n';
        }
        else if (object.type === 'RelativeLayout') {
            return '\n<RelativeLayout\n' + this.getStateStringById(object, state) + '>\n';
        }
        else if (object.type === 'LinearLayout') {
            return '\n<LinearLayout\n' + this.getStateStringById(object, state) + '>\n';
        }
        else if (object.type === 'ScrollView') {
            return '\n<ScrollView\n' + this.getStateStringById(object, state) + '>\n';
        }
        else if (object.type === 'HorizontalScrollView') {
            return '\n<HorizontalScrollView\n' + this.getStateStringById(object, state) + '>\n';
        }
        else if (object.type === 'ImageView') {
            return '\n<ImageView\n' + this.getStateStringById(object, state) + ' />';
        }
        else if (object.type === 'Button') {
            return '\n<Button\n' + this.getStateStringById(object, state) + ' />';
        }
        else if (object.type === 'TextView') {
            return '\n<TextView\n' + this.getStateStringById(object, state) + ' />';
        }
        else if (object.type === 'EditText') {
            return '\n<EditText\n' + this.getStateStringById(object, state) + ' />';
        }
        else if (object.type === 'LottieAnimationView') {
            return '\n<com.airbnb.lottie.LottieAnimationView\n' + this.getStateStringById(object, state) + ' />';
        }
        else if (object.type === 'VideoView') {
            return '\n<VideoView\n' + this.getStateStringById(object, state) + ' />';
        }
        console.log('getObjectString finish');
        return '';
    };
    ApplicationDataServiceService.prototype.getCloseString = function (object) {
        if (object.type === '#') {
            return '</FrameLayout >';
        }
        else if (object.type === 'FrameLayout') {
            return '</FrameLayout >';
        }
        else if (object.type === 'RelativeLayout') {
            return '</RelativeLayout >';
        }
        else if (object.type === 'LinearLayout') {
            return '</LinearLayout >';
        }
        else if (object.type === 'HorizontalScrollView') {
            return '</HorizontalScrollView >';
        }
        else if (object.type === 'ScrollView') {
            return '</ScrollView>';
        }
        else if (object.type === 'ImageView') {
            return '';
        }
        return '';
    };
    ApplicationDataServiceService.prototype.getStateStringById = function (object, state) {
        var temp = 'px';
        var result = '\n';
        if (state === null) {
            console.log('null state!!!');
        }
        else {
            result = '\nandroid:id=\"@+id/' + object.resourceId + '\"\nandroid:layout_width=\"' + this.pxToDp(state.width) + temp + '\"\nandroid:layout_height=\"' + this.pxToDp(state.height) + temp + '\"\n';
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
            // const imageFolder = '@mipmap/';
            var imageFolder = '@drawable/';
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
                    result += ' app:lottie_fileName="' + object.dataUrl + '\"\n';
                }
            }
        }
        console.log('getStateStringById done');
        return result;
    };
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
    ApplicationDataServiceService.prototype.makeApplicationSourceCode = function () {
        var sourceResult = {};
        var activityDataList = [];
        this.makeActivityName();
        var manifestXml = '';
        for (var i = 0; i < this.applicationData.activityList.length; i++) {
            var activity = this.applicationData.activityList[i];
            console.log(i + ",activity = " + activity.activityId);
            this.activityMetaData = activity;
            this.activityData = this.loadActivityDataSync(activity.activityId);
            console.log(i + ",this.activityData = " + JSON.stringify(this.activityData));
            this.selectedStage = this.activityData.stageList[0];
            this.activityData.codeActivityName = activity.codeActivityName;
            this.activityData.codeLayoutName = activity.codeLayoutName;
            var layout = this.makeActivityLayout();
            var java = this.makeActivityJava();
            console.log(i + ",layout = " + layout);
            console.log(i + ",java = " + java);
            var aData = {};
            aData['layout'] = layout;
            aData['java'] = java;
            aData['activityId'] = activity.activityId;
            aData['codeActivityName'] = activity.codeActivityName;
            aData['codeLayoutName'] = activity.codeLayoutName;
            activityDataList.push(aData);
            //manifest activity data
            var tempString = '\n<activity android:name=\".' + activity.codeActivityName + '\"/>';
            if (activity.id === this.applicationData.launcherActivityId) {
                tempString = '\n<activity android:name=\".' + activity.codeActivityName + '\">';
                tempString += '<intent-filter>\n<action android:name=\"android.intent.action.MAIN\"/>\n<category android:name=\"android.intent.category.LAUNCHER\"/>\n</intent-filter>';
                tempString += '\n</activity>\n\n';
            }
            manifestXml += tempString;
        }
        //make manifest.xml
        var androidManifest = this.templateDataHash['AndroidManifest.xml'];
        androidManifest = androidManifest.replace('!!!packageName!!!', this.applicationData.applicationId);
        androidManifest = androidManifest.replace('!!!activityList!!!', manifestXml);
        //make build.xml
        var buildGradle = this.templateDataHash['build.gradle'];
        buildGradle = buildGradle.replace('!!!packageName!!!', this.applicationData.applicationId);
        //make string.xml
        var stringXml = this.templateDataHash['strings.xml'];
        stringXml = stringXml.replace('!!!appName!!!', this.applicationData.applicationName);
        sourceResult['stringXml'] = this.makeBeautify(stringXml);
        sourceResult['buildGradle'] = buildGradle;
        sourceResult['manifestXml'] = this.makeBeautify(androidManifest);
        sourceResult['activityDataList'] = activityDataList;
        return sourceResult;
    };
    ApplicationDataServiceService.prototype.writeSourceCode = function (folderPath, data) {
        var activityDataList = data['activityDataList'];
        var manifestXml = data['manifestXml'];
        var stringXml = data['stringXml'];
        var buildGradle = data['buildGradle'];
        var sourceCodeData = data;
        var exportRoot = folderPath + '/' + this.applicationData.applicationName + '_export';
        var projectRoot = exportRoot + '/android';
        var projectFolder = projectRoot + '/app/src/main';
        var javaFolder = projectFolder + '/java/' + this.replaceAll(this.applicationData.applicationId, '.', '/');
        var resourceFolder = projectFolder + '/res';
        var drawFolder = resourceFolder + '/mipmap-nodpi';
        var layoutFolder = resourceFolder + '/layout';
        var valuesFolder = resourceFolder + '/values';
        var manifestPath = projectFolder + '/AndroidManifest.xml';
        var buildGradlePath = projectRoot + '/app/build.gradle';
        var stringXmlPath = valuesFolder + '/strings.xml';
        this.deleteFile(projectRoot);
        this.makeFolder(projectRoot);
        this.makeFolder(projectFolder);
        this.makeFolder(javaFolder);
        this.makeFolder(resourceFolder);
        this.makeFolder(drawFolder);
        this.makeFolder(layoutFolder);
        this.makeFolder(valuesFolder);
        this.writeFile(manifestPath, manifestXml);
        this.writeFile(buildGradlePath, buildGradle);
        this.writeFile(stringXmlPath, stringXml);
        for (var i = 0; i < this.applicationData.activityList.length; i++) {
            var activity = this.applicationData.activityList[i];
            this.writeFile(javaFolder + '/' + activity.codeActivityName + '.java', activityDataList[i].java);
            this.writeFile(layoutFolder + '/' + activity.codeLayoutName + '.xml', activityDataList[i].layout);
        }
        this.copyFolder(this.applicationFolderPath + '/image', drawFolder);
        //copy project level
        var projectTemplatePath = '/template/project_template';
        var appTemplatePath = '/template/app_template';
        var resourceTemplatePath = '/template/resource_template';
        this.copyFolderFromRoot(projectTemplatePath, projectRoot);
        this.copyFolderFromRoot(appTemplatePath, projectRoot + '/app');
        this.copyFolderFromRoot(resourceTemplatePath, resourceFolder);
    };
    ApplicationDataServiceService.prototype.writeGuidDoc = function (folderPath, data) {
        var exportRoot = folderPath + '/' + this.applicationData.applicationName + '_export';
        var guideRoot = exportRoot + '/guide';
        this.deleteFile(guideRoot);
        this.makeFolder(guideRoot);
        this.copyFolder(this.applicationFolderPath, guideRoot + '/assets/data');
    };
    ApplicationDataServiceService.prototype.replaceAll = function (str, find, replace) {
        return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    };
    ApplicationDataServiceService.prototype.escapeRegExp = function (str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    };
    ApplicationDataServiceService.prototype.makeActivitySourceCode = function () {
        this.makeActivityName();
        this.makeActivityLayout();
        this.makeActivityJava();
        return this.codeResult;
    };
    ApplicationDataServiceService.prototype.makeActivityName = function () {
        this.idHash = {};
        this.activityIdHash = {};
        this.activityLayoutIdHash = {};
        for (var i = 0; i < this.applicationData.activityList.length; i++) {
            var activity = this.applicationData.activityList[i];
            activity.codeActivityName = this.getUniqueActivityName(activity.activityName);
            activity.codeLayoutName = this.getUniqueLayoutName(activity.activityName);
            // if (activity.activityId === this.activityData.activityId) {
            //   this.activityData.codeActivityName = activity.codeActivityName;
            //   this.activityData.codeLayoutName = activity.codeLayoutName;
            // }
        }
    };
    ApplicationDataServiceService.prototype.makeActivityLayout = function () {
        var temp = this.templateDataHash['activity_main.xml'];
        this.objectList = this.getAllObjectList(this.activityData.objectList);
        for (var i = 0; i < this.objectList.length; i++) {
            var object = this.objectList[i];
            object.resourceId = this.getUniqueResourceName(object.name);
        }
        var xmlString = this.insertChild('root');
        temp = temp.replace('!!!layoutList!!!', xmlString);
        temp = temp.replace('!!!packageName!!!', this.applicationData.applicationId);
        temp = temp.replace('!!!activityName!!!', this.activityData.codeActivityName);
        var result = this.makeBeautify(temp);
        this.codeResult['layout'] = result;
        return result;
    };
    ApplicationDataServiceService.prototype.makeActivityJava = function () {
        var temp = this.templateDataHash['MainActivity.java'];
        var variables = this.activityData.codeActivityName + " context;\n";
        var finder = 'currentStage = ' + '\"' + this.activityData.stageList[0].id + '\";\n';
        var eventString = '';
        var onCreateEventString = '';
        var backPressedEventData = '';
        for (var i = 0; i < this.objectList.length; i++) {
            //make resource name
            var object = this.objectList[i];
            var tempVariableString = object.type + ' ' + object.resourceId + ';\n';
            var tempFinderString = object.resourceId + " = (" + object.type + ")findViewById(R.id." + object.resourceId + ");\n";
            variables += tempVariableString;
            if (object.type === 'VideoView' && object.dataUrl) {
                tempFinderString += object.resourceId + '.setVideoPath(Uri.parse("' + object.dataUrl + '"));\n';
            }
            finder += tempFinderString;
        }
        for (var i = 0; i < this.activityData.triggerEventList.length; i++) {
            var aTrigger = this.activityData.triggerEventList[i];
            if (aTrigger.type === 'click') {
                var object = this.findObjectById(aTrigger.objectId);
                var clickEventString = object.resourceId + '.setOnClickListener(new View.OnClickListener() {' +
                    '\n@Override' +
                    '\npublic void onClick(final View v) {\n' +
                    'if(currentStage.equals("' + aTrigger.stageId + '")) {\n' +
                    this.insertImplEvent(aTrigger) +
                    '\n}\n' +
                    '\n}});';
                eventString += '\n' + clickEventString + '\n';
            }
            else if (aTrigger.type === 'onCreate') {
                onCreateEventString += '\n' + this.insertImplEvent(aTrigger);
            }
            else if (aTrigger.type === 'backKey') {
                var backEventString = 'if(currentStage.equals("' + aTrigger.stageId + '")) {\n' + this.insertImplEvent(aTrigger) + '\n return;}\n';
                backPressedEventData += backEventString;
            }
        }
        if (backPressedEventData.length === 0) {
            backPressedEventData += '\nsuper.onBackPressed();';
        }
        var templateData = temp;
        templateData = templateData.replace("!!!packageName!!!", this.applicationData.applicationId);
        templateData = templateData.replace("!!!activityName!!!", this.activityData.codeActivityName);
        templateData = templateData.replace("!!!layoutName!!!", this.activityData.codeLayoutName);
        templateData = templateData.replace("!!!variableList!!!", variables);
        templateData = templateData.replace("!!!variableFindList!!!", finder);
        templateData = templateData.replace("!!!eventList!!!", eventString);
        templateData = templateData.replace("!!!onCreateEvent!!!", onCreateEventString);
        templateData = templateData.replace("!!!onBackPressedEvent!!!", backPressedEventData);
        var result = templateData;
        this.codeResult['java'] = result;
        return result;
    };
    ApplicationDataServiceService.prototype.insertImplEvent = function (triggerEvent) {
        var result = '\n';
        var implEvent = this.findImplentEventByTriggerEventId(triggerEvent.id);
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
    };
    ApplicationDataServiceService.prototype.getActivityByActivityId = function (activityId) {
        for (var i = 0; i < this.applicationData.activityList.length; i++) {
            var activity = this.applicationData.activityList[i];
            if (activity.activityId === this.activityData.activityId) {
                return activity;
            }
        }
        return null;
    };
    ApplicationDataServiceService.prototype.insertStageChangeEvent = function (implEvent) {
        var result = '';
        var stateEventList = this.findStateChangeEventByImplementEventId(implEvent.id);
        var fromStage = this.findStageByStageId(implEvent.fromStageId);
        var toStage = this.findStageByStageId(implEvent.toStageId);
        var eventVar = this.getUniqueResourceName(fromStage.name + '_' + toStage.name);
        var stateEventCount = 0;
        result += "\nAnimatorSet " + eventVar + " = new AnimatorSet();";
        var stateEventCodeList = [];
        for (var i = 0; i < stateEventList.length; i++) {
            var stateEvent = stateEventList[i];
            if (stateEvent.isEnabled) {
                var temp = this.getStateAnimationString(stateEventList[i]);
                if (temp) {
                    stateEventCodeList.push(temp);
                    stateEventCount++;
                }
            }
        }
        for (var i = 0; i < stateEventCodeList.length; i++) {
            var temp = stateEventCodeList[i];
            if (i === 0) {
                result += '\n' + eventVar + '.playTogether(';
                result += ('\n' + stateEventCodeList[i]);
            }
            else {
                result += (',\n' + stateEventCodeList[i]);
            }
        }
        if (stateEventCount === 0) {
            return '';
        }
        var afterAnmiation = this.findTriggerEventByAfterTriggerEventId(implEvent.id);
        var afterAnimationString = '';
        if (afterAnmiation) {
            afterAnimationString = this.insertImplEvent(afterAnmiation);
        }
        if (stateEventCount > 0) {
            result += '); \n';
            result += (eventVar + '.addListener(new Animator.AnimatorListener() {\n'
                + '@Override\n'
                + 'public void onAnimationStart(Animator animator) {}\n'
                + '@Override\n'
                + 'public void onAnimationEnd(Animator animator) {currentStage = "' + implEvent.toStageId + '";\n ' + afterAnimationString + '\n}\n'
                + '@Override\n'
                + 'public void onAnimationCancel(Animator animator) {}\n'
                + '@Override\n'
                + 'public void onAnimationRepeat(Animator animator) {}\n'
                + '});\n');
            result += (eventVar + '.start();\n');
        }
        return result;
    };
    ApplicationDataServiceService.prototype.getStateAnimationString = function (event) {
        var fromState = this.findStateByStateId(this.activityData, event.fromStateId);
        var toState = this.findStateByStateId(this.activityData, event.toStateId);
        var object = this.findObjectById(toState.objectId);
        var result = '';
        if (object && toState && fromState) {
            console.log("have state");
            result = this.getStateAnimationCode(object.resourceId, fromState, toState, event);
        }
        else {
            console.log("null state");
        }
        return result;
    };
    ApplicationDataServiceService.prototype.getStateAnimationCode = function (view, fromState, toState, event) {
        var haveAnimation = false;
        var result = '';
        //translation
        if (fromState.translationX !== toState.translationX) {
            result += '.translationX(' + (toState.translationX | 0).toFixed(0) + ')';
        }
        if (fromState.translationY !== toState.translationY) {
            result += '.translationY(' + (toState.translationY | 0).toFixed(0) + ')';
        }
        //scale
        if (fromState.scaleX !== toState.scaleX) {
            result += '.scaleX(' + (toState.scaleX | 1).toFixed(2) + ')';
        }
        if (fromState.scaleY !== toState.scaleY) {
            result += '.scaleY(' + (toState.scaleY | 1).toFixed(2) + ')';
        }
        //rotate
        if (fromState.rotation !== toState.rotation) {
            result += '.rotation(' + (toState.rotation | 0).toFixed(2) + ')';
        }
        if (fromState.rotationX !== toState.rotationX) {
            result += '.rotationX(' + (toState.rotationX | 0).toFixed(2) + ')';
        }
        if (fromState.rotationY !== toState.rotationY) {
            result += '.rotationY(' + (toState.rotationY | 0).toFixed(2) + ')';
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
            result += '.alpha(' + (toState.alpha | 0).toFixed(2) + ')';
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
        }
        else {
            result += '.setInterpolator(PathInterpolatorCompat.create(' + event.cubicValue[0] + 'f,' + event.cubicValue[1] + 'f,' + event.cubicValue[2] + 'f,' + event.cubicValue[3] + 'f))';
            result += '.setDuration(' + event.duration + ')';
            if (event.startDelay && event.startDelay !== 0) {
                result += '.setStartDelay(' + (event.startDelay).toFixed(0) + ')';
            }
            result += '.get()';
            return 'ViewPropertyObjectAnimator.animate(' + view + ')' + result;
        }
    };
    return ApplicationDataServiceService;
}());
ApplicationDataServiceService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__broadcast_service__["a" /* BroadcastService */]) === "function" && _b || Object])
], ApplicationDataServiceService);

var _a, _b;
//# sourceMappingURL=application-data-service.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/broadcast.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BroadcastService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], BroadcastService);

//# sourceMappingURL=broadcast.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/message-event.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageEventService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__broadcast_service__ = __webpack_require__("../../../../../src/app/service/broadcast.service.ts");
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__broadcast_service__["a" /* BroadcastService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__broadcast_service__["a" /* BroadcastService */]) === "function" && _a || Object])
], MessageEventService);

var MessageEventService_1, _a;
//# sourceMappingURL=message-event.service.js.map

/***/ }),

/***/ "../../../../../src/app/setting/setting.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/setting/setting.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  setting works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/setting/setting.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-setting',
        template: __webpack_require__("../../../../../src/app/setting/setting.component.html"),
        styles: [__webpack_require__("../../../../../src/app/setting/setting.component.css")]
    }),
    __metadata("design:paramtypes", [])
], SettingComponent);

//# sourceMappingURL=setting.component.js.map

/***/ }),

/***/ "../../../../../src/app/window-proxy/window-proxy.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/window-proxy/window-proxy.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  window-proxy works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/window-proxy/window-proxy.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowProxyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-window-proxy',
        template: __webpack_require__("../../../../../src/app/window-proxy/window-proxy.component.html"),
        styles: [__webpack_require__("../../../../../src/app/window-proxy/window-proxy.component.css")]
    }),
    __metadata("design:paramtypes", [])
], WindowProxyComponent);

//# sourceMappingURL=window-proxy.component.js.map

/***/ }),

/***/ "../../../../../src/assets/images/bg_transparent.png":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAEbpJREFUeNrsXWlTG8cWvSONFoQQGIEkwGBwzBbHiZP8wvcD3j9zUk7FYjEUOEIBhEELizT7vA/Pd2rUc29PS/KCq6ar/MFiek5v033u7Xu6tTdv3vwHAJ4AgA2fkmVZMD8/D1tbW6BpGlCp1WrB6ekppNNpSKVSwe+e54HrurC1tQXz8/NkXtd14fDwEHq9HmSz2aG/WZYFc3NzsLOzw2Lf3NzA0dERie15Hjx//hwWFxfJvL7vw8HBAXS7XRK7WCzCjz/+COl0mszf6XTg6OgINE0bwvZ9H2zbho2NDajVasClo6MjuL6+jmADQAYAOjoA1D79J0nfPuVSAHCftMOjSfeppA0eV0o65JEl3bKsyI+GYYDruuyiisk0TUin00MLoOM44Hne0IInpnQ6Da7rgmmaY2FrmgaGYYCu60PYruuC53mxeTls0zQhl8uxCzrmN00TNE0bes7zPKDakiI0hmHwHUIxIdd1oVAowO3tLVs5z/OgUqmApmlDz/i+D77vg2VZcHd3xzKdYrEIuq5HOs51Xcjn8yw2splqtUpi4ztk2IVCAarVagTb8zzIZDLQ6/XYAWVZVsDgRGzP88D3fSn21NQUVKtVttM1z/P++4n2Do2Cu7s7ODg4AN/3I/TOsix49uwZPH36dKghwoU8OTmBi4sLyOVykQbPZDKws7MDhUJhKC/mf3h4gP39fXBdN1Jwy7JgeXkZ1tfXI9iYv9FoQLPZhEwmM9Ro+OW9fPkSpqenybymaUK9XgfLskDX9Qh2rVaD58+fs9jNZhMajQaLvbu7CzMzM5G8yKp17gvQNC3g9WIvi79xI5nK77ou6Loe5KHyplIp8H0/MnWFR2EcNnZm+O84leIAk2FzZY/DDttDInb4/1xenZvLfN8PKhQepfh7XMJ84rP4xTEjZOgZMT82VNzaFsYWn02lUpGGFhuTwsa1Lw4bn6Oe1TRNWu+EZSW0N0mxtFf2R2RM4c9M/L9K/rjfvgdsahEfFXuiDkmn02DbdoTp+L4PpmnGAnieF/D1cHIcJ7Iucdi2bQ/N98jwZGtAGFtcPB3HgXQ6HWFPQx6+TAZs2wbTNCM41G+cfeb7fgQb1ybp+nd5eRmhvWG+TzECz/MCG0LGclzXjfB57EjKBgk/4zhOpFJh2sxhY+UnwZbVO7zYU/iu64Jt2ySZicMGgI5+enpK9nClUoHd3V22J1utFrx//z7iAkdr+dWrVzA3N8fm//vvv6HT6UTc0KZpQrlchp9++onN22634d27d5HKoet/Z2eHdb8DANTrdbi+voZ8Ph80FFr/pVIJXr9+zXZ2t9uFd+/ekezTsizY3t6GZ8+esdiHh4dweXkZsc+CKYv6hMJ2ggq9CzcKuiZkU5qMWsaMoKDy6DYRsVXKnUqlSBx8J/VlitjUfohsKgyXUXT5DJWBqjxOB7KC4XNhQ0t18cT3UnknxVZZcMP5Oey4DqU6RKUsXL0T2pvYIUlSor0UjcM1QMWNTeVVcZ8jE+P8RXFrAYcdR0vjsOO2DrDeYvko3xs3ZcrKqXMVUzFkKL+S6p4E+qVEfFVsqvKUU49rFAobHZdxA4LCoJyuo2AHbXNzc0PaIY7jwP39PVk4z/NgamoKpqamWOCHhwcwTZNc8FOpVLAfQjW+67pwf39PVtzzPMjn81AoFFjswWAAg8GAxNY0DWZmZliW43ke3N3djY1tGAb0+33WBpqZmZGxsY7Oher0+304Pj5mLXVZmA/aCo1GA/L5fKSjc7kcLC8vs1zcNE04Pj4G27aHCk/txVDpw4cP0Gg0IJfLkZb6ysoKi+15HpycnMBgMIBMJhMp1+rqqhS72WzC2dkZZLNZ0lKvVqtQLBZHd524rgvZbDawTsVRpsL18/l8pOLpdBqy2Sz7yYax0V4Qv644eonYYqOg7YGDgkq2bUMmk2HtChVqm8/nIxtUaLvETWsJy0pob5I+e4eoTFmjPPclsCfN+7lxVN+ny+ZhDOkR9yQsy4qlpvicOOfiwiqbixHbcRzynSrYtm1HPMIq2BiiZFlWZFG3bVuJkmM4ELWox3UMaYekUqlgYaWiTtCJJ3aW6K/BhVWscCaTCewNcZHDzshms+SeOi7qmI+K/NA0jVxYsTPQVqLyOo4Tu6izNkQIW3TQ4h474nKLu1av1yN2iOM4UCwWg9gnCrjX68HHjx8jvY7G2dLSEhSLRbLDfN+Hi4sLGAwGEXvAcRwoFAqwvLzMjqL7+3totVoRbKxotVplQ20Qu9/vBw2PdbJtG/L5PCwvL5NfEYYoXV5ekjFhruvC4uIizM7OsmW/vLyE+/t7zhbp6L1ejzRudF2H6elp9sW3t7fQbrcjbmwcfWtra1LDcTAYwM3NTYR+ojEZZ3xR2OHBIMPG/NR+yOzsrNROME0Tut0u6e21LAsqlYq07JZlQbvd5vdDCJ1C8InF2RwYdkltEsn4NhqbuVyO0kko7Ulw2Nw0Gs6L2OIagdMUFaAXfgbtG2oqj0uyeie0N7FDkpR0yHeWJpYjUIs6FfFBcX1OEqAqR8DoE3H9mkSOkM/nY+UIlmWxi3pc4rCDDqEiQ2zbhlwuB/1+X7o4lstlkvZiGI+YHxc+dN+Xy+UI/XMcB6ampoK81GLpOA6Uy+VI/CzuZbiuy5YdJQEcdi6Xg7u7O7JT0OB88uQJGVCBoUtcvZEIUdhBh8vkCIeHh6RhaNv2kBuakyO0Wq0hNoFcP5vNwtbWFisJeHh4gIODgyEjLUwbl5aWYH19nTVKG40G/Pvvv6QkIJVKwc7ODmkjoRxhb2+PlSNUq1XY2NhgXSPNZhOazWYkwh8DBLe3t6FUKo0uRwi7Tqj4ozg/DeU6wQ4JR/BRedPpNDiOA7ZtD0WB4GAI2w4yvi+OYnSdqGJT71Sht6LrBOsdnuZGliNgdCLVISr+HE3TIJvNRkYZ/hYnCcARJmKrOuoQJ/wsTq9xNhLuZIrTlri/Mgp22N302VnWKEHH4+adNP9jxFbJn9Dex0Z7VXr7MckRRhnh40gCKBHp5/jCVKdb6X6IbdvgOM7QOoCh/qpyBNEewcVNxvURW9x/wACLuHk4TDzC+BiVLsPWdR1s2wbDMMizUFRCfQzDiARYIJmJ25PXrq+v2TAg5NOUi3tqaor1WPq+D4ZhBDp2saM0TYPp6Wm2YVzXhYeHBzJe1nVdyOVypDcXGRBiiywLG7NYLJKbRfhVYfgTJZvOZrNBJI3YLkibqW2FMLZkQHT0o6Mj0mJVkSPs7e1J5QiycJlJ5Qj1ep31NO/s7MDKygqbH+UIlOtfRY5Qr9cDiix+ldvb2/DDDz+w2AcHB9BqtUaTI4yqNhVHUlwEeViePK4cgZNCqJSbkwQgdpzrH9tnHDkChjaNJEdAwEkkASpyBKozv4YcQSaFiJNsh8uYyBES93uSvrodQtE49NjGzcdcQLKqJIB69mtih22VcETIONijRr+zcgROH6LycmrvQWU/JO48EVVsqqFU9nHwOUoKMak+JC7FxRxoV1dXETsEG4vSeof5OCcO9Twv8JhykgA0nDhbgNJ647szmUwQoEDldxyHDNLDryGfz0+MzXm4Zdiyegd2CCcf7vf78PbtW6kcoVKpsCPh+PhYKkd4/fq1VI7w559/knIE0zRhY2NDamf8888/cHJyQsoRdF2H33//XSpHePPmDSlHMAwD1tbWpNjNZhNOT09ZOcKvv/4qDa+KlSNQHaLEFlIpMtwllUopyxHQXhBHmcppQIgtRg/ifkecHAG3AMRRrkJtMcSIilyMm9ZiLRmqAUYJth437+fCVjmj6mthK+lqEqKZ2CFJGmfKwihvSqkqygQ4vi267nFxi/OV4VyLgQEitso6hotoeM5XlUIgDhdVooItulao8pAdwkVuhPm46MATF1rK8MLnxAJgg8jkBLiPL9oEog3AlT18FgolR5Bhy3xdSPO5TkEs6oi/OBlF8I69vT1SjjA9PQ3VapUFvr29hevra6kkgAvz8TwPWq2WVI5Qq9XIymuaFsgRqLgsz/NgcXFRKkegsDFUJ5vNwtLSUhDwLWL3+31otVqsHGFhYSGQI4jhUb7vw9XVFTw8PHDe3o7e7XZJOyCdTkv58t3dHbTbbXY/5OnTp9Kw/NPTU1aOgBtYXJLJEVzXhVqtJsX+8OEDux8yOzsLMzMzbF7LsqDT6bCRi4uLi1Js0zRJ7OArpMLi0TUe59dBlZNYMIznktkZXFi+Crbv+5DP5yPTiuif4vLKJAGTyBFUbJR0Oh2ou5RZ1iib+Z8z7yj5uecmxf+WZU9o7/dih3wt6fFjzP81sGXPkXIEDLVRiWHlAg1UpccUdrFYjLVTZNgqNg6FbVlWYKvEYU8iRzAMg522dErgiAseMh4xMxakVCpJ5QjiMa/hBsnlclAqlSKGYy6Xg1wuB4ZhkPvbaLDOzMyQizr+47A9z2OxHceBfD4fUGIZtmifYZ3RQSmSC6xLJpOBUqnELuqa4zikHOH+/h6Oj49J9mBZFqysrMDy8jLb041GA66urkg5QiaTgRcvXpC3IwD8X6F7dHTEyhFqtRqsrq6y2Ofn53B+fh5hUfj1bG9vsypd27bh8PCQlSNUKhVYW1tjv56LiwtoNpuRemNnbW1tsXJxAOjo3OeZTqfBsqwgGjw8EnDjSjYteZ5HXlyCYf6ycB9d18GyLPIgZZxOVbCpw4zRipbRWsuyyAhJwzAiagAqP4etEikTK0cQY6dU9441TYNMJkPGKqnKEfBZkS6q7IcgtugCj7sdAQcgtR/C7RRSU/5XlSN8y/Qt7YyvUcbEDvke7JAkfbskvR0BF/VxbkfAxY3j8HG3I1iWBZZlBScSjYPNLeoqtyOg7Jpa1OMSPidqDJVuR2i322QYkOu6cHt7Sy6inudBoVCIPZUUbQlqfi2VSuRGVRibkwTgyaDcAjsYDNiTQX3fh9nZWRbb933o9Xokk0MbZnp6mg0DQmxOhsHVO6C9nBxhcXERdnZ22AZvtVqwv78foXF4Dtbu7i4rR/B9H+r1OnlBsGmaMD8/Dy9fvmSxb25uYH9/nz18ZmtrS3q8097eHrTbbVKQMzMzA69evWKpabfbhf39fdZS39zchM3NTRb78PAQrq6uePf7JMfRUWE5KtQujEFFdqhKCrioElWWM07dw3UeJyqFyxt0yCRyBByho8oR8POl9rc/hxRCpUHjsKVMiJEjjHJ7XSJHSGhvksaivTKBvMp8Oo5sGqcFmWz6sWOL0/KkN8AFHcKd6aESWo/OPyrIQSX2CSXSIraKxgO9saPuh+BzFDbeShcnRxDPLQmzLBVs2XPaxcUFaYegISV+Kfg3XAA5Ph53nwZnnIVvfOYkAXFac65j8N3cXkS4Y6gZAhfuOE8zenYp7Jj7vTp6rVYj/9Lv9+Gvv/6KRB+itby5uSmVPR8fH8PZ2VlEjoBHsf7888+Rv4Ut3bdv37JyhPX1dfKIJEwyOUI6nYbffvuNxXZdF/744w/WUl9dXYUXL16w2M1mE05OTiKR93howS+//DLe7Qgy97vSISqfZAdipTCi8Uu73xGbih6Mk0JwcoS4qRgTh61CqfUvZQBxRt4kht842KNKAsKd/iWwk9uiEzvky6bv4XaESd6ny17wGOUIqjcUTCJHwPtsqXdOIkdQmTL1uHlQDPNR9R9RecOL2zj58f+qVy6J+ZXncQZH1W8mw44lJO/fvyflCFNTU8FxqBwt7na7rBxhfn6epZa+70O73SaPb8LYqHK5zBZ6MBiwEei+78Pc3By7V4PYeOGAiJ3NZmFhYYGtt2ma0G63Ix2EdteTJ0+CvRqq4zudDinDCOyQ6+tr0g6oVCqwvr7ONophGIFGI/xynOZqtRqUSiU2f6PRIOUIhmHAwsKC1M5wHAdarRZ7M0O5XJZin52dwcePHyMDxjAMmJubkx6v1Ov14OrqijygE/dyZNjn5+dwcXHBDlb2dgQ8mXOcGwomvR1hEmzV2xGoy2YQWyZHwF1D7naEuOlQhp3Q3oT2JinpkO+wQ4pJMzyaVNQB4PIT7bWT9vimKQMAnf8NANcvSVNN0+ciAAAAAElFTkSuQmCC"

/***/ }),

/***/ "../../../../../src/assets/images/homebutton_small.png":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC1CAYAAAD2kdWXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAACilJREFUeNrsnX2QlVUdgJ9lBQFdQEIDtdAQLbPU0Rop0gkzo2igFEQERwikTCerEZmxiZrRMvvDGSczLZsmPlSMJYf8bsgGBYXEBr9DEUEEN0r8GBEJtj/O2ZkVYdl7z33f+957n2dmZ2D33t/7vuc899zfOe95z2lqb29HpF7oYRGIQosotIhCiyi0KLSIQosotIhCiyi0KLSIQosotIhCiyi0KLSIQosotIhCiyi0KLSIQosotIhCiyi0KLSIQosotIhCiyi0KLRI8Tkgy+Bnz32wkcv2JOALwInADmA5sBJYm+M5jAS+BgyJ/98M3A08XI0CuX/KWbUtdIPyIWAOcBHQ0un3lwCbgGuAmzI+h0HA1cDMvfxtNnAz8CNgqy207E/mBcCX9/H3I4BfAwcDv8zoHJqB64HJXbxmJnBQ/NDtMoeWvfFh4M4uZO7MdcCVGZ3H+P3I3MHk+Fo7hfIBhsSW+YslvOdaYFYG5zK9hNfOUGjZk0OB24BRZbz3F8BVFU43hpXw+qMVWjpzJLAIOCMhxtUVlLpniXXartDSweHAfMLQXCqVkvpdYGcjV4pCl8dgYCFwegVjXg38pAJxmhRaSuGjQCvw+Qxiz6mQ1Aot3c6ZbwNGZHiMOcBPLWqFzqNlXgR8Lodj/Rj4uUWu0FnxMcJNk8/meMzZMa8Wha4oQ4E7cpa5g6sIdxVFoSvCMGAxcGpCjDZge8L7r4hSN1kdCp3C8Ngyn5wQYxMwljAJ6L1Eqa+1SvaPs+32ztEVkPlV4Hzg0fjTDNwK9Ckz3iygF/BDYLdVZAvdXY6LaUaKzBuBc4FlnX53GzAtMf24nDDt1PRDobst80LCUyblsgGYCKzYy99ur4DUPyDMdxaF7pJjgT8Bn05smScQHrfaF7cDFwBvJRzne8CNpowKvS8+GdOMExJirAfOAR7rxmsXA1OBdxKOd0lsqU0/FPp9fCJ2AI9PlHkisKqE9ywCLkyU+tLYUjdbjQpNlLg1ttDl8lIJLfPepJ4IvJlw/O8QnlPsqc6NLfSJUaiPJ8R4MY5mrE6IsSS21G8nxLgYuCH+u6HnQzdqp+KEOJpxbEKMdcB5iTJ3cBcwCZgH9CszxrcJ49MH2kI3Xsu8OFHmtcA3gMcreF5LCDditiV2FI9S6MbhFMKsuWMSYjwf04w1GZzfPbGlfhNR6P1wUhzNGJ4o84SMZO7gXsJ6Gf9RT4XeF6fG0YxhCTGejWnGmhzO94HYUr+uogq9N5nvIG0Niqdjy/xsjuf9QMyp/6umCt1Z5jsJT5yUyzNR5qeqcP73E8a4/62qCj0iphkpvf6nYprxTBWv4yHC8KA5dQMLfRphuuZHEmI8GUX6VwGu52/xW0KpG1DoETHNGJoQYw3wzSq3zHuyFBgHvKa2jSP06VHmIxNiPBFlfqGA1/cwYUivTXXrX+iRhCVtj0iU+TzCHI2isix+4DZXIJaLNRa8ZU6R+fHYAVxbA9f7CGH049XEOL0JuwkodIEYRXgKZHBCjFXxq/zlGrruFYRb8FsSYhwOzCVsT6HQBeAMwgy1IQkx/kGYk/xSDV7/CsIyCRvLfH9T7GguBAYodHX5UkwzUmReGdOMdTVcDitj+vFKQoyvxpa6v0JXh7MIi40fmhBjOWFs9xVqn1VR6g0JMcYQHng4TqHzb5nnAYclxHg0phkvUz+sjOnH+oQYZxJut5+p0PkwmjDRKEXmRwjDXhupP/4Zry2lpR4ac+rRCp29zH8EBibEWEaYwbaZ+uWJ2C9IaakHxrIerdDZyTyPsOVviswT6rRl3pPVwNcTO7uDYpmPVujKMjZ2AFNa5oeizFtoHDpmCqZIPTCW/ViFrgxjgN8DhyTE+Dth6a1GkrmDNYRx5pS7n4fEOhij0Okt84LElnkplblFXMs8GcvyucSWekEttNRFFfoc4A9AS0KMBwlDc84hDo+OfT8xRkusk3MUujTGAb8j7VbsX4Ep+OhSZ96tQIwBsW7GKXT3GB971iky3x/jOBH+/VRqldIBsY7GK3TXTIif/pSZX/fElnmb/mbKQbGuJhTtxIqytt34WEApOfN9hEUPs8iZ+xNm9rVQ+f1NehDmYj9XY1L3i3XWTpgkptCRScBvgb4JMe4mDM29UeFz601YL+4KwkSoZrJ5ymN7vIbZ1NbMv46OYk/CKEjDCz0J+E2izI8Ttk2rtMwHEvYHvCyjXLQzfeO31MmEqZxra0jqvrEOKYLU1cyhJxO2OWtJjLMW2JpRGnRpzmVyDLW5In9LrMvJjSr0VOCW+JWeShYr1/chjNtWY/+SUbGVrjV6xzqd2mhCXwj8ivI3oMyrF/+pKh27mbQVUqtJn1i3FzaK0NNiz7hvwStmINXds6QXtUvfWMfT6l3oGfHTWwub21R7Gdv3ClAG2yh/iLJnrOsZ9Sr0NMKmNn2Q/bGLYoxy3AjclJh+3JB3S52H0KMIG0T21tVusZRwx7PatBGGLG9P7CheHx2oC6H7A3Mof2enRuMF4LuxlS7CqEU7Ycu4+Qlx+kUH+teD0MMJa841ArujAOX8vEO4fXw2xbup8lbMhVOkHklOIzdZ3yk8jMbY9mIl4a5irzIblaLP5dgOfCt+aKeUeY2H1YPQechchA/MesIiLfXMDsK8lnbKG2fOpZ6yPkgeG95sLUBlN8rm8W8D0wkTkkrltXoQ+jnK29S9FFrtS+bKTsI2zLeW8J7HyGnN7Txa6GtiDpYFcwnzoCX/9OMywtPg3cm/r8np2zqXvGYJcHkGqcFCPji1U/LvKF7Hvp9X3BrrfkleJ5XXfOhbCEtUXUDYb7vcifLNhAUWlxB2udqlV1XnSsJCPucCx8d63UUYuZlPWBmVehOaeGGrCAPsPcoUuokwkX+3HhWKe+NPx4JAu6n8AxeFE7qDN6z/uqXqe5P3sA6knlBoUWgRhRZRaBGFthytCNmD/1Ha8OLrFplCF5m3KW2OyF8sMoUuMjsJcxS6s43Fn4G7LDKFLjqrCc/3tXXxmgeAmXgrvjAcYBF0SSvwfBT7M4RH85uATYTVQm+mMivji0LnxtOER48GEVYkbSJMi1Rkha5ptloE5tAiCi2i0CIKLQototAiCi2i0KLQIgototAiCi2i0KLQIgototAiCi2i0NKJ9xrhIg+og/MfSnmLpzcSu2I5KXSBmQ6cBxyl0N0S+mCFLia9CPvkna+nUg859M+UWepF6FOAi602qRehTwNarDapF6EHW2VST0LvsMpyo0mhs2eDnuXGFoXOnvuAF3Utc14k7Ayr0BnTBszCPb6zZFcs4zaFzodW4CJgve5VnPWxbFtr9QJq9db3PGA58BXCQuS22Gk0A6tiSreupnuy7e1Og5D6wemjotAiCi2i0CIKLQototAiCi2i0CIKLQototAiCi2i0CIKLQototAiCi2i0CIKLQototAiCi2i0CIKLQototAiCi2i0CIKLQotUgP8fwBaIslYlkfFhQAAAABJRU5ErkJggg=="

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    imgPrefix: 'http://localhost:8080'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map