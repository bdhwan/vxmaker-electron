import { Component, OnInit } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service';
import { BroadcastService } from '../../service/broadcast.service';


@Component({
  selector: 'app-font-select',
  templateUrl: './font-select.component.html',
  styleUrls: ['./font-select.component.css']
})
export class FontSelectComponent implements OnInit {
  showSelectPanel = false;

  selectedFont;
  selectedVariant;

  fontList;
  weightList;

  showSelectVariant;
  showSelectFamily;
  selectedObject;
  font;
  constructor(private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService) { }

  ngOnInit() {
    this.appDataService.loadFontData().then(result => {
      const temp = JSON.parse(JSON.stringify(result));
      this.fontList = temp.items;
      this.selectedObject = this.appDataService.getSelectedObject();
      if (this.selectedObject.family) {

        for (let i = 0; i < this.fontList.length; i++) {
          if (this.selectedObject.family === this.fontList[i].family) {
            this.selectedFont = this.fontList[i];
            this.selectedVariant = this.selectedObject.family;
            break;
          }
        }
      }
    });
  }
  getPreviewStyle() {
    return {
      'font-family': this.selectedObject.family + '-' + this.selectedObject.variant
    }
  }


  toggleFamilyPanel() {
    this.showSelectFamily = !this.showSelectFamily;
  }

  getFont() {
    return 'http://fonts.gstatic.com/s/almendra/v10/-tXHKMcnn6FqrhJV3l1e3QJKKGfqHaYFsRG-T3ceEVo.ttf';
  }

  toggleVaiantPanel() {
    this.showSelectVariant = !this.showSelectVariant;
  }

  clickSelectFamily(item) {

    this.selectedFont = item;
    this.selectedObject.family = item.family;
    this.clickSelectVariant(item.variants[0]);
    this.showSelectFamily = false;
    this.showSelectVariant = false;

  }
  clickSelectVariant(item) {
    this.selectedObject.variant = item;
    this.selectedObject.fontUrl = this.selectedFont.files.item;
    this.showSelectVariant = false;
    this.showSelectFamily = false;
  }



}
