import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1.5,
    spaceBetween: 15,
    pagination: false,
  };

  slideArray = [
    {
      id: 1,
      subTitle: 'Card1 Desc',
      title: 'Card1',
      img: '../../../assets/slider/image1.png',
    },
    {
      id: 2,
      subTitle: 'Card2 Desc',
      title: 'Card2',
      img: '../../../assets/slider/image2.jpeg',
    },
    {
      id: 3,
      subTitle: 'Card3 Desc',
      title: 'Card3',
      img: '../../../assets/slider/image3.jpg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
