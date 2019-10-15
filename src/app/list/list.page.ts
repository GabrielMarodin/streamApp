import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions} from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(public photoService: PhotoService, private streamingMedia: StreamingMedia) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }
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
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
