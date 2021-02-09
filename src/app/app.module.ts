import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NextActivitiesService } from './next-activities.service';
import { AppComponent } from './app.component';
import { NextActivitiesComponent } from './next-activities/next-activities.component';
import { UnitsComponent } from './units/units.component';
import { UnitsService } from './units.service';

@NgModule({
  declarations: [
    AppComponent,
    NextActivitiesComponent,
    UnitsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule
  ],
  providers: [NextActivitiesService,
              UnitsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
