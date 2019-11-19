import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { EnvService } from './services/env.service';
import { FileInfo } from './fileInfo';

@Injectable({
  providedIn: 'root'
})
export class FileHandler {
  
  fileinfo: FileInfo[];
  fileTransfer: FileTransferObject;
  uploadText: string;
  filespath: string;
  filename: any;
  filetype: any;

  constructor(public platform: Platform, private transfer: FileTransfer, private file: File, private fileChooser: FileChooser, private filePicker: IOSFilePicker, private filePath: FilePath, public toastController: ToastController, private http: HttpClient, private env: EnvService) { }

  checkDir(dir: string) {
    this.file.checkDir(this.file.dataDirectory, dir).then(_ =>
      console.log('Directory exists')).catch(err =>
        console.log("Directory doesn't exist"));
  }

  uploadFile() {

    if (this.platform.is("android")) {

      this.fileChooser.open().then((uri) => {

        this.filePath.resolveNativePath(uri).then((filepath) => {

          this.filespath = filepath;
          this.filename = this.filespath.substring(this.filespath.lastIndexOf("/") + 1);
          this.filetype = this.filename.substring(this.filename.lastIndexOf(".") + 1);

        }).catch(e => console.log(e));
      }).catch(e => console.log(e));
    }
    else if (this.platform.is("ios")) {

      this.filePicker.pickFile().then((uri) => {

        this.filespath = uri;
        this.filename = this.filespath.substring(this.filespath.lastIndexOf("/") + 1);
        this.filetype = this.filename.substring(this.filename.lastIndexOf(".") + 1);

      }).catch(e => console.log(e));
    }

    this.fileTransfer = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.filename,
      mimeType: (this.filename + '/' + this.filetype),
    }
    this.uploadText = 'uploading';
    this.fileTransfer.upload(this.filespath, this.env.API_URL+'files/uploads', options).then((data) => {

      this.presentToast('Upload complete.');
      this.uploadText = '';
    }, (err) => {

      console.log(err)
      this.presentToast('Upload failed.');

    });
  }

  downloadFile(file: string) {

    this.fileTransfer = this.transfer.create();

    this.fileTransfer.download(this.env.API_URL+'files/uploads' + file, this.file.dataDirectory + file).then((entry) => {

      this.presentToast('Download complete.');

      console.log('download complete: ' + entry.toURL());

    }, (error) => {
      console.log(error);
    });
  }

  getFileData() {
    return this.http.get<FileInfo[]>(this.env.API_URL+'files/files.php');
  }
  
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}

