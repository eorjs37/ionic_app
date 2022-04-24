import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async alert(title, message, callback?) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: [
        {
          text: '확인',
          handler: () => {
            callback();
          }
        }
      ]
    });

    await alert.present();
  }


  async alertConfirm (title, message, callback1?,callback2?){
    const alert = await this.alertController.create({
      header:title,
      message: message,
      buttons:[
        {
          text:'취소',
          handler:()=>{
            callback1();
          }
        },
        {
          text:'확인',
          handler:()=>{
            callback2();
          }
        }
      ]
    });

    await alert.present();
  }
}
