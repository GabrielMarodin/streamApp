import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions} from '@ionic-native/streaming-media/ngx';
import { FileHandler } from "../file";
import { EnvService } from '../services/env.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(public photoService: PhotoService, private streamingMedia: StreamingMedia, public fileHandler: FileHandler, private env: EnvService) {}
  
  startVideo(link: string){
    let options: StreamingVideoOptions = {
      successCallback: () => {console.log()},
      errorCallback: (e) => {console.log(e)},
      orientation: '',
      shouldAutoClose: false,
      controls: true
    }
    this.streamingMedia.playVideo(link, options);
  }
  startAudio(link: string){
    let options: StreamingAudioOptions = {
      successCallback: () => {console.log()},
      errorCallback: (e) => {console.log()},
      initFullscreen: false,
    }
    this.streamingMedia.playAudio(link, options);
  }
  stopAudio(){
    this.streamingMedia.stopAudio();
  }
  ngOnInit() {
    this.fileHandler.getFileData().subscribe(data => {
      this.fileHandler.fileinfo = data;
      console.log(data);
    });
    this.photoService.loadSaved();
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
