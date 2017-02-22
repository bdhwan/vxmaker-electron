import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

declare var electron: any;

@Component({
  selector: 'app-recent-project',
  templateUrl: './recent-project.component.html',
  styleUrls: ['./recent-project.component.css']
})
export class RecentProjectComponent implements OnInit {

  recentProjects;

  constructor(
   private router: Router
  ) { }

  ngOnInit() {
    this.recentProjects = JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('get-recent-project-list')));
  }


  clickApplication(folderPath:string): void{
    this.router.navigate(['/application',folderPath]);
  }
  

}
