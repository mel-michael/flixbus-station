import { Component, OnInit } from '@angular/core';
import { STATIONS } from '../mockstations';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  stations = STATIONS;
  stationName = new FormControl('');

  constructor() {}

  addStation(): void {
    const randNum = Math.floor(Math.random() * 1000);
    const newStation = {
      id: randNum,
      name: `station–${randNum}`,
      slots: []
    };
    this.stations.push(newStation);
  }

  ngOnInit() {}
}
