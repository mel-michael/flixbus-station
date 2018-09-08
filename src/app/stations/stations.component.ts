import { Component, OnInit } from '@angular/core';
import { STATIONS } from '../mockstations';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  stations = STATIONS;
  stationForm = new FormGroup({
    name: new FormControl(''),
    numOfSlots: new FormControl('')
  });

  constructor() {}

  addStation(): void {
    const randNum = Math.floor(Math.random() * 1000);
    const newStation = {
      id: randNum,
      numOfSlots: this.stationForm.value.numOfSlots,
      availableSlots: this.stationForm.value.numOfSlots,
      name: this.stationForm.value.name,
      slots: []
    };
    // this.stations[randNum] = newStation;
    this.stations.push(newStation);
    console.log(this.stations, this.stationForm.value);
  }

  ngOnInit() {}
}
