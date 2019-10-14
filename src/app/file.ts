import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

class FileHandler {

    constructor(private transfer: FileTransfer, private file: File) { }

    fileTransfer: FileTransferObject = this.transfer.create();

    checkDir(dir: string){
        this.file.checkDir(this.file.dataDirectory, dir).then(_ => 
                console.log('Directory exists')).catch(err => 
                    console.log("Directory doesn't exist"));
    }
    upload(name: string, filePath: string, endFolder: string) {
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
      download(url: string, file: string) {
        this.fileTransfer.download(url, this.file.dataDirectory + file).then((entry) => {
          console.log('download complete: ' + entry.toURL());
        }, (error) => {
          // handle error
        });
      }
}
