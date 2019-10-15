import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions} from '@ionic-native/streaming-media/ngx';
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

  constructor(public photoService: PhotoService, private streamingMedia: StreamingMedia, public fileHandler: FileHandler) {}

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
    this.streamingMedia.playAudio(link,options);
  }
  stopAudio(){
    this.streamingMedia.stopAudio();
  }
}
