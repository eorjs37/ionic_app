import { Component, OnInit } from '@angular/core';
import { AlertService } from '@/app/service/alert.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  public progressBar: number = 0;
  public progressBarValue: number = this.progressBar*0.01;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    const interval = setInterval(()=>{
      this.progressBar++;
      this.progressBarValue = this.progressBar*0.01;

      if(this.progressBar === 100){
        this.alertService.alert("완료","업데이트가 완료되었습니다");
        clearInterval(interval);
      }
    },100);
  }

}
