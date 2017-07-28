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
import { EventGeneratorComponent } from './activity/event-generator/event-generator.component';

import { TreeModule } from 'angular2-tree-component';
import { PreviewObjectComponent } from './activity/preview/preview-object/preview-object.component';

import { ApplicationDataServiceService } from './service/application-data-service.service';
import { BroadcastService } from './service/broadcast.service';

import { ResourceComponent } from './common/resource/resource.component';
import { EventDetailStageChangeComponent } from './activity/event-detail-stage-change/event-detail-stage-change.component';
import { EventDetailStartActivityComponent } from './activity/event-detail-start-activity/event-detail-start-activity.component';
import { EventDetailFinishActivityComponent } from './activity/event-detail-finish-activity/event-detail-finish-activity.component';
import { EventStageChangeCellComponent } from './activity/event-stage-change-cell/event-stage-change-cell.component';
import { EventStateChangeCellComponent } from './activity/event-state-change-cell/event-state-change-cell.component';
import { EventStateChangeGraphComponent } from './activity/event-state-change-graph/event-state-change-graph.component';
import { EventStateChangeTimelineComponent } from './activity/event-state-change-timeline/event-state-change-timeline.component';
import { LottieAnimationViewComponent } from './activity/lottie-animation-view/lottie-animation-view.component';
import { GuideComponent } from './guide/guide.component';




const appRoutes: Routes = [
  { path: 'init/:workspaceFolder', component: InitComponent },
  { path: 'init', component: InitComponent },
  { path: 'guide', component: GuideComponent },
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
    ResourceComponent,
    EventGeneratorComponent,
    EventDetailStageChangeComponent,
    EventDetailStartActivityComponent,
    EventDetailFinishActivityComponent,
    EventStageChangeCellComponent,
    EventStateChangeCellComponent,
    EventStateChangeGraphComponent,
    EventStateChangeTimelineComponent,
    LottieAnimationViewComponent,
    GuideComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApplicationDataServiceService, BroadcastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
