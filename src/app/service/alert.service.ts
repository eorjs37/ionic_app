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
}
