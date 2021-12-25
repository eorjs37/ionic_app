import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { timer } from 'rxjs';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
const MEDIA_FOLDER_NAME = 'mydir';
@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {
  howl: Howl;
  percent: number = 0;
  milSecond: number = 0;
  files = [];
  status: boolean = false;
  audioFile: MediaObject;

  constructor(private file: File,
              private media: Media) {
    
  }

  ngOnInit() {
    //this.startMusic();
  }
  
  ionViewWillEnter() {
    this.checkDir();
    
    console.log('documentsDirectory : ', this.file.documentsDirectory);
    console.log('dataDirectory : ', this.file.dataDirectory);
    console.log('externalApplicationStorageDirectory : ', this.file.externalApplicationStorageDirectory);
    console.log('applicationStorageDirectory : ', this.file.applicationStorageDirectory);
    console.log('applicationDirectory : ', this.file.applicationDirectory);
    console.log('externalDataDirectory : ', this.file.externalDataDirectory);
  }

  checkDir() {
    this.file.checkDir(this.file.dataDirectory , MEDIA_FOLDER_NAME)
      .then(res => {
        console.log('exists mydir : ', res);
      })
      .catch(err => {
        console.error('not exists mydir :' , err);
        this.makeDir();
      });
  }

  makeDir() {
    console.log('will make dir');
    this.file.createDir(this.file.dataDirectory , MEDIA_FOLDER_NAME, false)
      .then((res) => {
        console.log('Directory create' + JSON.stringify(res));
        this.writeFile();
      })
      .catch(err => {
        console.error('Directory no create'+JSON.stringify(err));
      })
  }

  startRecord() {
    const date = Date.now();
    this.file.createFile(this.file.dataDirectory  + MEDIA_FOLDER_NAME, `temp9`+'.mp3', false)
      .then((res) => {
        console.log('res', JSON.stringify(res));
        
        this.audioFile = this.media.create(this.file.dataDirectory + MEDIA_FOLDER_NAME + `/temp9` + '.mp3');
         
        this.status = true;
        this.audioFile.startRecord();
        this.audioFile.onError.subscribe(error => console.error('Error!', error));
        console.log('audioFile : ' , this.audioFile);
        
      })
      .catch((err) => {
        console.error('startRecord : ', err);
      });
  }

  stopRecord() {
    this.status = false;
    this.audioFile.stopRecord();

    this.file.readAsDataURL(this.file.dataDirectory + MEDIA_FOLDER_NAME, 'temp9.mp3')
      .then((base64File) => {
        console.log(base64File);
        
    });

    // 
    this.audioFile.play();

    this.audioFile.onStatusUpdate.subscribe(status => console.log(status)); 
    this.audioFile.onSuccess.subscribe(() => console.log('Action is successful'));
    this.audioFile.onError.subscribe(error => console.error('Error!', error));
  }

  loadFiles() {
    this.file.listDir(this.file.dataDirectory , MEDIA_FOLDER_NAME)
      .then((res) => {
        console.log('loadFiles Success');
        this.files = res;
      })
      .catch(err => {
        console.error('loadFiles Fail : ' , err);
      })
  }

  deleteFile(f: FileEntry) {
    const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
    console.log('deleteFile path : ' , path);
    
    this.file.removeFile(path, f.name)
      .then(() => {
        this.loadFiles();
      })
      .catch((err) => {
        console.error('deleteFile : ' , err);
      })
  }


  writeFile() {
    this.file.writeFile(this.file.dataDirectory + MEDIA_FOLDER_NAME, 'test.txt', 'sex')
          .then(() => {
            console.log('Success writeFile');
          })
          .catch((err) => {
            console.error('Fail writeFile : ' , err);
          })
  }

  makeFile() {
    this.file.createFile(this.file.dataDirectory  + MEDIA_FOLDER_NAME, 'test.txt', false)
      .then((res) => {
        
          console.log('Success createFile : ' , res);
      })
      .catch((err) => {
        console.error('Fail createFile : ' , err);
      })
  }

  startMusic() {
    this.howl = new Howl({
      src: ['./assets/music/mp3file.mp3'],
      preload : true,
      onplay: () => {
        this.setTimer();
        console.log('onplay');
        
      },
      onend: () => {
        console.log('onend');
      }

    });
    this.howl.play();
  }

  setTimer() {
    const source = timer(/* 시작 초*/0, /* 초 간격 */1000);
    const endTime = Math.floor(this.howl.duration());
    const  t = source.subscribe((val) => {
      this.milSecond = val;
      if (this.milSecond < endTime) {
        this.percent = Math.floor((this.milSecond / endTime)*100) ;
      } else {
        t.unsubscribe();
      }
    });
  }

}
