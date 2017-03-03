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
import { RecentProjectComponent } from './recent-project/recent-project.component';
import { InitMenuComponent } from './init-menu/init-menu.component';
import { DeviceStatusComponent } from './device-status/device-status.component';
import { ApplicationInfoComponent } from './application-info/application-info.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ObjectTreeComponent } from './object-tree/object-tree.component';
import { ObjectNewComponent } from './object-new/object-new.component';
import { ObjectPropertyComponent } from './object-property/object-property.component';
import { EventListComponent } from './event-list/event-list.component';
import { PreviewComponent } from './preview/preview.component';
import { StageListComponent } from './stage-list/stage-list.component';
import { PreviewSizeComponent } from './preview-size/preview-size.component';


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
    PreviewSizeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
