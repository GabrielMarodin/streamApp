import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ToastController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';

@Injectable({
  providedIn: 'root'
})
export class FileHandler {
  fileinfo: any[];
  fileTransfer: FileTransferObject;
  uploadText: string;
  filespath: string;
  filename: any;
  filetype: any;

  constructor(public platform: Platform, private transfer: FileTransfer, private file: File, private fileChooser: FileChooser, private filePicker: IOSFilePicker, private filePath: FilePath, public toastController: ToastController, private http: HTTP) { }

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
    this.fileTransfer.upload(this.filespath, 'http://192.168.56.1/files', options).then((data) => {

      this.presentToast('Upload complete.');
      this.uploadText = '';
    }, (err) => {

      console.log(err)
      this.presentToast('Upload failed.');

    });
  }

  downloadFile(file: string) {

    this.fileTransfer = this.transfer.create();

    this.fileTransfer.download('http://192.168.56.1/files/' + file, this.file.dataDirectory + file).then((entry) => {

      this.presentToast('Download complete.');

      console.log('download complete: ' + entry.toURL());

    }, (error) => {
      console.log(error);
    });
  }

  getFileData() {
    this.http.get('http://192.168.56.1/files/files.php',{},{}).then(fileinfo => {
      this.fileinfo = fileinfo.data;
    }).catch();
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
