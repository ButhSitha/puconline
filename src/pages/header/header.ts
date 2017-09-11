import { FeedPage } from './../feed/feed';
import { AccountPage } from './../account/account';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-header',
  templateUrl: 'header.html',
})
export class HeaderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeaderPage');
  }
  goToAccPage() {
    this.navCtrl.push(AccountPage);
  }
  goToFeedPage() {
    this.navCtrl.push(FeedPage);
  }

}
