import { Component, OnInit } from '@angular/core';
import { BUSES } from '../mockbus-data';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {
  buses = BUSES;
  busForm =  new FormGroup({
    busName: new FormControl(''),
    busType: new FormControl('')
  });

  constructor() {}

  addBus(): void {
    const randNum = Math.floor(Math.random() * 1000);
    // const newStation = {
    //   id: randNum,
    //   name: this.stationName.value,
    //   slots: []
    // };
    // this.buses.push(newStation);
  }

  ngOnInit() {}
}
