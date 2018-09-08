import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BUSES } from '../mockbus-data';
import { STATIONS } from '../mockstations';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {
  buses = BUSES;
  stations = STATIONS;
  busForm =  new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    station: new FormControl('')
  });
  busTypes = [ 'regular', 'doubledecker'];
  isBusSlotFree = true;

  constructor() {}

  addBus(): void {
    this.isBusSlotFree = true;
    let newSlot;
    const { station, name, type } = this.busForm.value;
    const randNum = Math.floor(Math.random() * 1000);
    const newBus = {
      name,
      type,
      id: randNum,
      stationId: station.id,
      plateNumber: `BUS-${randNum}-${randNum}`
    };
    if (station.availableSlots > 0) {
      newSlot = station.slots.find(slot => !slot.busId);
      newSlot.busId = randNum;
      station.availableSlots--;
      this.buses.push(newBus);
    } else {
      this.isBusSlotFree = false;
    }
  }

  ngOnInit() {}
}
