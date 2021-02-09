import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  token = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vcHVnb3BodWIvdWFhL3Rva2VuX2tleXMiLCJraWQiOiJrZXktaWQtMSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYTA3YjIxYmZjZmM0ODVjOGE3MzJiNWVhNzY5ZmRiOCIsInN1YiI6IjQyMTkwNjlhLTRmMzctNGJjMC1hZmM5LTE5MmYwNzY5MDJmMCIsInNjb3BlIjpbIm1lcy5hcHByb3ZhbF9jb2NrcGl0LnVzZXIiLCJtZXMucm91dGVfbWFuYWdlbWVudC51c2VyIiwibWVzLnNlY3VyaXR5X21hbmFnZW1lbnQudXNlciIsIm1lcy5wcm9wZXJ0eV9kZWZpbml0aW9uLnVzZXIiLCJpcXAuY2xvdWR1c2VyIiwibWVzLmRvd250aW1lLnVzZXIiLCJjbG91ZF9jb250cm9sbGVyLndyaXRlIiwibWVzLm9wZXJhdGlvbnMudXNlciIsIm1lcy5hbmFseXNpcy51c2VyIiwibWVzLnJlcG9ydHMudXNlciIsIm1lcy5teV9tYWNoaW5lcy51c2VyIiwid2ViaG1pLnVzZXIiLCJzY2ltLnVzZXJpZHMiLCJtZXMuYWN0aXZpdGllcy51c2VyIiwiYm0tb3BlcmF0b3IiLCJvcGVuaWQiLCJpcXAudXNlciIsIndlYmhtaS5hZG1pbmlzdHJhdG9yIiwiY2xvdWRfY29udHJvbGxlci5yZWFkIiwicGFzc3dvcmQud3JpdGUiLCJtZXMubmNtX21hbmFnZW1lbnQudXNlciIsIm1lcy53YXN0ZS51c2VyIiwibWVzLmVxdWlwbWVudC51c2VyIiwibWVzLndvcmtfcXVldWUudXNlciIsImlxcC5kZXZlbG9wZXIiLCJtZXMub3JkZXJfbWFuYWdlbWVudC51c2VyIl0sImNsaWVudF9pZCI6InB1Z29waHViX21lcyIsImNpZCI6InB1Z29waHViX21lcyIsImF6cCI6InB1Z29waHViX21lcyIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6ImF1dGhvcml6YXRpb25fY29kZSIsInVzZXJfaWQiOiI0MjE5MDY5YS00ZjM3LTRiYzAtYWZjOS0xOTJmMDc2OTAyZjAiLCJvcmlnaW4iOiJ1YWEiLCJ1c2VyX25hbWUiOiJjb214Y2xpZW50IiwiZW1haWwiOiJjb214Y2xpZW50QHh4LmNvbSIsImF1dGhfdGltZSI6MTYxMjgyODY1MCwicmV2X3NpZyI6IjE0YzVjNTllIiwiaWF0IjoxNjEyODI4NjUxLCJleHAiOjE2MTI4NzE4NTEsImlzcyI6Imh0dHBzOi8vcHVnb3BodWIvdWFhL29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbIm1lcy5hcHByb3ZhbF9jb2NrcGl0IiwiY2xvdWRfY29udHJvbGxlciIsInNjaW0iLCJtZXMuYWN0aXZpdGllcyIsIm1lcy5yb3V0ZV9tYW5hZ2VtZW50IiwibWVzLmRvd250aW1lIiwib3BlbmlkIiwibWVzLnJlcG9ydHMiLCJtZXMud2FzdGUiLCJpcXAiLCJtZXMubXlfbWFjaGluZXMiLCJtZXMuZXF1aXBtZW50IiwibWVzLm9yZGVyX21hbmFnZW1lbnQiLCJwYXNzd29yZCIsInB1Z29waHViX21lcyIsIm1lcy53b3JrX3F1ZXVlIiwibWVzLmFuYWx5c2lzIiwibWVzLm5jbV9tYW5hZ2VtZW50IiwibWVzLnNlY3VyaXR5X21hbmFnZW1lbnQiLCJtZXMub3BlcmF0aW9ucyIsIm1lcy5wcm9wZXJ0eV9kZWZpbml0aW9uIiwid2ViaG1pIl19.OblTbH5DUNhhIJDbzrhvcjXLVo_rkVhwyTQkDUlTOKaUhIidrDlbv2Ed7GzKdG0IKwC8dPxU1o-l0wenFQXJHuKZdzfifE3dsTa6t-cYMC-zukkpEvNSxeGJAI2PbHZTEvWCAhYxmh2ArUB4X-nojdpddHZmnQ0PWau2sX0ar5poe9-05OyTgVU7SPYKIiqViHgw58ilXZCQMXeqqnrNAhm4po6S8iJQK_dDouZxT2-Wt7EXviEX12EGkw1WAfzdojt_XBwJt1yWhEd4pHL8m1kEpI2z6ZRTSq-jtUClfuoT5MVvU0ieyQ1CqHEN4Qlx10cX5Qe8iUn1rhjV20SedQ'
  httpOptions = {
    headers: new HttpHeaders({'token' : this.token})
  }

  constructor(private http:HttpClient) {
  }

  getNextActivities(puIds : string): Observable<NextActivity[]> {
    // Fetch data from a 
      return this.http.get<NextActivity[]>(`http://localhost:8093/nextActivities/${puIds}`, this.httpOptions)
  }

}