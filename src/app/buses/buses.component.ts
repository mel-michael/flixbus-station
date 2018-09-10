import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DataService } from '../data.service';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {
  buses;
  stations;
  busForm =  new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    station: new FormControl('')
  });
  busTypes = [ 'regular', 'doubledecker'];
  isBusSlotFree = true;

  constructor(private dataService: DataService) { }

  addBus(): void {
    this.isBusSlotFree = true;
    const randNum = Math.floor(Math.random() * 1000);
    const { station, name, type } = this.busForm.value;
    const busData = {
      name,
      type,
      id: randNum,
      stationId: station.id,
      plateNumber: `BUS-${randNum}-${randNum}`
    };

    if (!station.availableSlots) {
      this.isBusSlotFree = false;
      return null;
    }

    const newSlot = station.slots.find(slot => !slot.busId);
    newSlot.busId = randNum;
    station.availableSlots--;
    station.slots = station.slots.map((item) => {
      if (item.id === newSlot.id) { return newSlot; }
      return item;
    });

    this.dataService.createBus(busData, station)
      .subscribe(() => this.getBuses(),
        error => console.log('Error:', error)
      );
  }

  getBuses(): void {
    this.dataService.getBuses()
      .subscribe(data => this.buses = data,
        error => console.log('Error:', error)
      );
  }

  getBusStations(): void {
    this.dataService.getStations()
      .subscribe(data => this.stations = data,
        error => console.log('Error:', error)
      );
  }

  deleteBus(busData): void {
    const { id: busID, stationId } = busData;
    const busStation = this.stations.find(station => station.id === stationId);
    const busSlot = busStation.slots.find(slot => slot.busId === busID);
    delete busSlot.busId;
    busStation.availableSlots++;
    this.dataService.deleteBus(busID, busStation);
    return this.getBuses();
  }

  ngOnInit() {
    this.getBuses();
    this.getBusStations();
  }


}
