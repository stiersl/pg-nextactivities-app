import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitsService } from '../units.service';

interface Unit {
  "unitId": number,
  "equipment": string
  }

@Component({
  selector: 'units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {

  
  title = "My Machines"
  units$!: Observable<Unit[]>;

  constructor(private service: UnitsService)   {} 
   
  ngOnInit() {
      this.refresh();
  }
  refresh(){
    this.units$ = this.service.getUnits();
  }

}


