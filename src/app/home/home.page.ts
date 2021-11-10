import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File , FileEntry} from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { MediaCapture, MediaFile } from '@ionic-native/media-capture/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
const MEDIA_FOLDER_NAME = 'carrotfarm';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  files = [];
  constructor(
    public platform: Platform,
    private file: File,
    private actionSheetController: ActionSheetController,
    private mediaCapture: MediaCapture,
    private imagePicker: ImagePicker,
    private media: Media,
    private streamingMedia: StreamingMedia
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      let path = this.file.applicationStorageDirectory;
      this.file.checkDir(path, MEDIA_FOLDER_NAME).then(() => {
        console.log(MEDIA_FOLDER_NAME+' Directory exists');
        this.loadFiles();
      }, err => {
        console.error('error : ' , err);
        this.file.createDir(path, MEDIA_FOLDER_NAME,false).then(() => {
          this.loadFiles();
        })
      })
    })
  }
  
  loadFiles() {
    console.log('dataDirectory : ', this.file.dataDirectory);
    
    this.file.listDir(this.file.dataDirectory,MEDIA_FOLDER_NAME).then((res) => {
      this.files = res;
      console.log('files : ' , res);
      
    });
  }

  async selectMedia() {
    const actionsheet = await this.actionSheetController.create({
      header: 'What would you like to add?',
      buttons: [
        {
          text: 'Capture Image',
          handler: () => {
            this.captureImage();
          }
        },
        {
          text: 'Record Video',
          handler: () => {
            this.recordVideo();
          }
        },
        {
          text: 'Record Audio',
          handler: () => {
            this.recordAudio();
          }
        }
      ]
    });

    await actionsheet.present();
  }

  openFile(f: FileEntry) {
    if (f.name.indexOf('.wav') > -1) {
      const path = f.nativeURL.replace(/^file:\/\//, '');
      const audioFile: MediaObject = this.media.create(path);
      audioFile.play();
    }
    else if (f.name.indexOf('.MOV') > -1 || f.name.indexOf('.mp4') > -1) {
      let options: StreamingVideoOptions = {
        successCallback: () => { console.log("Video was closed without error.") },
        errorCallback: (e)=> { console.error('error : ', e);}
      }
      console.log('f.nativeURL : ' , f.nativeURL);
      
      this.streamingMedia.playVideo(f.nativeURL,options);
    }
  }

  
  deleteFile(f: FileEntry) {
    const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);

    this.file.removeFile(path, f.name).then(() => {
      this.loadFiles();
    }, err => console.log('error remove: ' , err))
  }

  captureImage() {
    this.mediaCapture.captureImage().then((data: MediaFile[]) => {
      if (data.length > 0) {
        this.copyFileToLocalDir(data[0].fullPath);
      }
    });
  }

  recordAudio() {
    this.mediaCapture.captureAudio().then((data: MediaFile[]) => {
      if (data.length > 0) {
        this.copyFileToLocalDir(data[0].fullPath);
      }
    });
  }

  recordVideo() {
    this.mediaCapture.captureVideo().then((data: MediaFile[]) => {
      if (data.length > 0) {
        this.copyFileToLocalDir(data[0].fullPath);
      }
    });
  }

  pickImages() {
    this.imagePicker.getPictures({}).then((results) => {
      console.log('images : ', results);
      for (let result of results) {
        this.copyFileToLocalDir(result);
      }
    });
  }

  copyFileToLocalDir(fullpath) {
    console.log('copy now : ', fullpath);
    let mypath = fullpath;

    if (fullpath.indexOf('file://') < 0) {
      mypath = 'file://' + fullpath;
    }

    const ext = mypath.split('.').pop();
    const d = Date.now();
    const newName = `${d}.${ext}`;

    const name = mypath.substr(mypath.lastIndexOf('/') + 1);
    const copyFrom = mypath.substr(0, mypath.lastIndexOf('/') + 1);
    const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;

    console.log('copyFrom : ' , copyFrom);
    console.log('copyTo : ' , copyTo);
    

    this.file.copyFile(copyFrom, name, copyTo, newName).then(() => {
      this.loadFiles();
    }, err => console.log('error : ' , err))
    
  }
}
