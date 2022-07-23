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
  public count: number = 0;
  public progressBarValue: number = this.progressBar * 0.01;
  constructor(private alertService: AlertService
    , private deploy: Deploy
  ) { }

  ngOnInit() {
    this.performManualUpdate();
  }

  async performManualUpdate() {


    await this.deploy.configure({
      appId: '2bdcce2b',
      updateMethod: 'none',
      channel: 'Production'
    });

    const update = await this.deploy.checkForUpdate();

    if (update.available) {


      await this.deploy.downloadUpdate((progress) => {
        console.log('download progress : ', progress);
        this.progressBar = progress;
      });

      await this.deploy.extractUpdate((progress) => {
        console.log('extractUpdate progress : ', progress);

      });

      await this.deploy.reloadApp();
    }
  }

}
