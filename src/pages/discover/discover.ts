
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { RecentTrainingProvider } from '../../providers/recent-training/recent-training';
/**
 * Generated class for the DiscoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})


export class DiscoverPage {

  @ViewChild('mySlider') slider: Slides;

  public selected = 0;
  public indicator:any;
  public mySlideOptions = {};
  public loading:boolean;
  public recents:any;
  public error:any;
  ngAfterViewInit() {
    this.indicator = document.getElementById("indicator");
    if (this.platform.is('windows')) {
      this.indicator.style.opacity = '0';
    }
    this.initData();
  }

  segmentsArray = ['segmentOne', 'segmentTwo'];
  segmentModel: string = this.segmentsArray[0];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public db:RecentTrainingProvider,
    public platform: Platform) {
    this.platform = platform;
    
  }

  initData() {
    let self = this;
    this.loading = true;
    this.recents = [];
    this.db.recent().then(snapshots => {
      this.recents=snapshots;
      self.loading = false;
    }).catch(function (error) {
      self.error=error;
      self.loading = false;
    });;
  }



  select(index:any) 
  {
    this.selected = index;
    if (index === 1)
      this.indicator.style.webkitTransform = 'translate3d(100%,0,0)';
    if (index === 0)
      this.indicator.style.webkitTransform = 'translate3d(0%,0,0)';
    this.slider.slideTo(index, 500);
  }

  onSlideChanged($event:any) 
  {
    if (((($event.touches.startX - $event.touches.currentX) <= 100) || (($event.touches.startX - $event.touches.currentX) > 0)) && (this.slider.isBeginning() || this.slider.isEnd())) 
    {
      //console.log("interdit Direction");
    }
    else 
    {
      //console.log("OK Direction");
      this.indicator.style.webkitTransform = 'translate3d(' + (-($event.translate) / 4) + 'px,0,0)';
    }
    this.indicator.style.webkitTransform = 'translate3d(' + (-($event.translate) / 4) + 'px,0,0)';

  }

  panEvent() 
  {
    let currentIndex = this.slider.getActiveIndex();
    if (currentIndex === 1) 
    {
      this.selected = 1;
      this.indicator.style.webkitTransform = 'translate3d(100%,0,0)';
    }
    if (currentIndex === 0) 
    {
      this.selected = 0;
      this.indicator.style.webkitTransform = 'translate3d(0%,0,0)';
    }
  }
  // public onSegmentChanged(segmentButton:any) {
  //   // console.log("Segment changed to");
  //   const selectedIndex = this.slides.findIndex((slide:any) => {
  //     return slide.id === segmentButton.value;
  //   });
  //   this.slider.slideTo(selectedIndex);
  // }

  // public onSlideChanged(slider:any) {
  //   // console.log('Slide changed');
  //   const currentSlide = this.slides[slider.activeIndex];
  //   this.selectedSegment = currentSlide.id;
  // }

  swipeEvent(event: any) {
    if (event.direction == 2) {
      if (this.segmentsArray.indexOf(this.segmentModel) < 1) {
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) + 1];
      }
    }

    if (event.direction == 4) {
      if (this.segmentsArray.indexOf(this.segmentModel) > 0) {
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) - 1];
      }
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscoverPage');
  }

}
