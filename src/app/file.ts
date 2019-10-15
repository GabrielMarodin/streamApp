import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ToastController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class FileHandler {

  fileTransfer: FileTransferObject;
  uploadText: string;
  files: {image: string, name: string, path: string} [];

  constructor(private transfer: FileTransfer, private file: File, private fileChooser: FileChooser, private filePath: FilePath,public toastController: ToastController,private http: HTTP) {}

    checkDir(dir: string){
        this.file.checkDir(this.file.dataDirectory, dir).then(_ => 
                console.log('Directory exists')).catch(err => 
                    console.log("Directory doesn't exist"));
    }

    uploadFile() {
        this.fileChooser.open().then((uri) => {

          this.filePath.resolveNativePath(uri).then((nativepath) => {

            this.fileTransfer = this.transfer.create();

            let options: FileUploadOptions = {
              fileKey: 'file',
              fileName: uri,
              headers: {}
           }
           this.uploadText = 'uploading';
           this.fileTransfer.upload(nativepath, 'http://192.168.56.1/files', options).then((data) => {

              this.presentToast('Upload complete.');
              this.uploadText = '';
            }, (err) => {

              console.log(err)
              this.presentToast('Upload failed.');

            })
          }).catch(e => console.log(e));
        }).catch(e => console.log(e)); 
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
    getFileData(){
      this.http.get('http://192.168.56.1/files/items.json',{},{})
        .then(data => {
            this.files = Array.of(data.data);
      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
    }
    async presentToast(msg: string) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }
}
