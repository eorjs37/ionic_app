import { Component, OnInit } from '@angular/core';
import { AlertService } from '@/app/service/alert.service';

// Angular
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  public progressBar: number = 0;
  public progressBarValue: number = this.progressBar*0.01;
  constructor(private alertService: AlertService,private deploy: Deploy) { }

  ngOnInit() {
    this.performManualUpdate();
  }

  async performManualUpdate() {
    const update = await this.deploy.checkForUpdate();
    if(update){
      console.log('update : ', update);
      await this.deploy.downloadUpdate((progress) =>{
        console.log('progress : ', progress);
        this.progressBar = progress;
        this.progressBarValue = progress*0.01;
        if(progress === 100){
          this.alertService.alert("완료","업데이트가 완료되었습니다");
        }
      })
    }
  }

}
