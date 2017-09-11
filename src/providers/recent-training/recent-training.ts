import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RecentTrainingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RecentTrainingProvider {
  recents:any;
  constructor(public http: Http) {
    
  }
  recent() {
    if (this.recents) {
      return Promise.resolve(this.recents);
    }
    return new Promise(resolve => {
      this.http.get('http://api.pucspelonline.com/recent_training/170010/17051801')
        .map(res => res.json())
        .subscribe(data => {
          this.recents = data.results;
          resolve(this.recents);
        });
    });
  }

}
