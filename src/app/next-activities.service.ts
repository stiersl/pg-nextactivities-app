import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

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

@Injectable({
  providedIn: 'root'
})
export class NextActivitiesService {

  constructor(private http:HttpClient) {
  }

  getNextActivities(puIds : string): Observable<NextActivity[]> {
      return this.http.get<NextActivity[]>(`http://localhost:8093/nextActivities/${puIds}`)
  }

}