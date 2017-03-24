import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InitComponent } from './init/init.component';
import { SettingComponent } from './setting/setting.component';
import { NewApplicationComponent } from './new-application/new-application.component';
import { ApplicationComponent } from './application/application.component';
import { ActivityComponent } from './activity/activity.component';
import { RecentProjectComponent } from './init/recent-project/recent-project.component';
import { InitMenuComponent } from './init/init-menu/init-menu.component';
import { DeviceStatusComponent } from './common/device-status/device-status.component';
import { ApplicationInfoComponent } from './application/application-info/application-info.component';
import { ActivityListComponent } from './application/activity-list/activity-list.component';
import { ObjectTreeComponent } from './activity/object-tree/object-tree.component';
import { ObjectNewComponent } from './activity/object-new/object-new.component';
import { ObjectPropertyComponent } from './activity/object-property/object-property.component';
import { EventListComponent } from './activity/event-list/event-list.component';
import { PreviewComponent } from './activity/preview/preview.component';
import { StageListComponent } from './activity/stage-list/stage-list.component';
import { PreviewSizeComponent } from './activity/preview-size/preview-size.component';

import { TreeModule } from 'angular2-tree-component';
import { PreviewObjectComponent } from './activity/preview/preview-object/preview-object.component';

import { ApplicationDataServiceService } from './service/application-data-service.service';
import { ResourceComponent } from './activity/resource/resource.component'



const appRoutes: Routes = [
  { path: 'init/:workspaceFolder', component: InitComponent },
  { path: 'init', component: InitComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'new-application', component: NewApplicationComponent },
  { path: 'application/:applicationFolderPath', component: ApplicationComponent },
  { path: 'activity/:applicationFolderPath/:activityId', component: ActivityComponent },
  { path: '', component: InitComponent },
  { path: '**', component: InitComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    SettingComponent,
    NewApplicationComponent,
    ApplicationComponent,
    ActivityComponent,
    RecentProjectComponent,
    InitMenuComponent,
    DeviceStatusComponent,
    ApplicationInfoComponent,
    ActivityListComponent,
    ObjectTreeComponent,
    ObjectNewComponent,
    ObjectPropertyComponent,
    EventListComponent,
    PreviewComponent,
    StageListComponent,
    PreviewSizeComponent,
    PreviewObjectComponent,
    ResourceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApplicationDataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
