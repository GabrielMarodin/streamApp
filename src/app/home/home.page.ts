import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { FileHandler } from "../file";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  ngOnInit() {
    this.photoService.loadSaved();
  }

  constructor(public photoService: PhotoService, public fileHandler: FileHandler) {}

}
