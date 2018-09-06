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
    name: new FormControl(''),
    type: new FormControl('')
  });
  busTypes = [ 'regular', 'doubledecker'];

  constructor() {}

  addBus(): void {
    const randNum = Math.floor(Math.random() * 1000);
    const newBus = {
      busId: randNum,
      plateNumber: `BUS-${randNum}-${randNum}`,
      name: this.busForm.value.name,
      type: this.busForm.value.type
    };
    this.buses.push(newBus);
  }

  ngOnInit() {}
}
