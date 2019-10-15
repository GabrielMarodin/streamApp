import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@Injectable({
  providedIn: 'root'
})
export class FileHandler {

  fileTransfer: FileTransferObject = this.transfer.create();

  returnpath: string;
  filename: string;

  constructor(private transfer: FileTransfer, private file: File, private fileChooser: FileChooser, private filePath: FilePath) { }



    checkDir(dir: string){
        this.file.checkDir(this.file.dataDirectory, dir).then(_ => 
                console.log('Directory exists')).catch(err => 
                    console.log("Directory doesn't exist"));
    }
    uploadFile(name: string, filePath: string, endFolder: string) {
        let options: FileUploadOptions = {
           fileKey: 'file',
           fileName: name,
           headers: {}
        }
      
        this.fileTransfer.upload(filePath, endFolder, options)
         .then((data) => {
           // success
         }, (err) => {
           // error
         })
    }
    downloadFile(url: string, file: string) {
      this.fileTransfer.download(url, this.file.dataDirectory + file).then((entry) => {
         console.log('download complete: ' + entry.toURL());
      }, (error) => {
        // handle error
      });
    }
    chooseFile(){
      this.fileChooser.open().then((uri) => {
        this.filePath.resolveNativePath(uri).then((resolveduri) => {
          this.returnpath = resolveduri;
        })
      })
      .catch(e => console.log(e));
      this.fileChooser.open().then((name) => {
        this.filename = name;
      });
    }
}
