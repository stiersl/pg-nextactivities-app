import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NextActivitiesService } from '../next-activities.service';

interface NextActivity {
  "equipment": string,
  "unitId": number,
  "sheetDesc": string,
  "sheetId": number,
  "sheetType": number,
  "duration": number,
  "calendarTime": number,
  "downTime": number,
  "upTime": number,
  "remainingTime": number, 
  "currentTimeStamp": Date,
  "lastActivityID": number,
  "lastActivityName": string,
  "lastActivityStartTime": Date,
  "lastActivityEndTime": Date,
  "lastActivityStatus": string,
  "nextActivityEstimate": Date,
  "nextActivityEstimateCD": string,
  "activityCDTracker": string,
  "color": number
  }

@Component({
  selector: 'next-activities',
  templateUrl: './next-activities.component.html',
  styleUrls: ['./next-activities.component.css']
})
export class NextActivitiesComponent implements OnInit {

  title = "Activities"
  nextActivities$!: Observable<NextActivity[]>;

  puIds = '1,4';

  autoRefreshActive = false;
  autoRefreshDuration: number = 10;
  timeleft: number = this.autoRefreshDuration;
  interval!: any;
  constructor(private service: NextActivitiesService)   {} 
   
  ngOnInit() {
      this.refresh();
      this.toggleAutoRefresh();
  }
  refresh(){
    this.nextActivities$ = this.service.getNextActivities(this.puIds);
  }
  toggleAutoRefresh() {
    if (this.autoRefreshActive){
      this.autoRefreshActive = false;
      this.pauseAutoRefresh();
    } else {
      this.autoRefreshActive = true;
      this.startAutoRefresh();
    }
  }


startAutoRefresh() {
    this.interval = setInterval(() => {
      if(this.timeleft > 0) {
        this.timeleft--;
      } else {
        this.refresh();
        this.timeleft = this.autoRefreshDuration;
      }
    },1000)
  }

  pauseAutoRefresh() {
    clearInterval(this.interval);
  }

}

