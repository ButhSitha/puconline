import { TrainingPage } from './../training/training';
import { TicketPage } from './../ticket/ticket';
import { TestingPage } from './../testing/testing';
import { MorePage } from './../more/more';
import { DiscoverPage } from './../discover/discover';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
// import { SchedulePage } from '../schedule/schedule';
// import { SpeakerListPage } from '../speaker-list/speaker-list';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = DiscoverPage;
  tab2Root: any = TicketPage;
  tab3Root: any = TrainingPage;
  tab4Root: any = TestingPage;  
  tab5Root: any = MorePage;
  
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
