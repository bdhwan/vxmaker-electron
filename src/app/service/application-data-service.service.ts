import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationDataServiceService {

  applicationData;


  constructor() {

  }

  public setApplicationData(data: any) {
    this.applicationData = data;
  }
  
  public getApplicationData() {
    return this.applicationData;
  }

  public getActivityData(activityId: string): any {

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



  findStateByObjectIdWithList(targetList: any, objectId: string, stageId: string) {
    for (var i = 0; i < targetList.length; i++) {
      var aState = targetList[i];
      if (aState.objectId == objectId && aState.stageId == stageId) {
        return aState;
      }
    }
    return null;
  }








}
