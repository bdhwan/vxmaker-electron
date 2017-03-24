import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'



@Component({
  selector: 'app-recent-project',
  templateUrl: './recent-project.component.html',
  styleUrls: ['./recent-project.component.css']
})
export class RecentProjectComponent implements OnInit {

  recentProjects;

  constructor(
   private router: Router,
   private appDataService: ApplicationDataServiceService
  ) { }

  ngOnInit() {
    this.recentProjects = this.appDataService.getRecentProjectList();
  }


  clickApplication(folderPath:string): void{
    this.router.navigate(['/application',folderPath]);
  }
  

}
