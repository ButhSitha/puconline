
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { RecentTrainingProvider } from '../../providers/recent-training/recent-training';
import * as $ from 'jquery';
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
setInterval(updateGradient,10);

  }

}


var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;

var colorIndices = [0,1,2,3];

var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}
