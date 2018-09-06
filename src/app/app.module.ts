import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StationsComponent } from './stations/stations.component';
import { BusesComponent } from './buses/buses.component';

@NgModule({
  declarations: [
    AppComponent,
    StationsComponent,
    BusesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
