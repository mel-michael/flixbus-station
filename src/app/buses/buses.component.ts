import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { randomBytes } from 'crypto-browserify';

import { DataService } from '../data.service';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {
  buses;
  stations;
  temp;
  busForm =  new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    station: new FormControl('')
  });
  busTypes = [ 'regular', 'doubledecker'];
  isBusSlotFree = true;
  showAddForm = false;
  addFormText = 'Add Bus';

  constructor(private dataService: DataService) { }

  addBus(): void {
    this.isBusSlotFree = true;
    const alphaNumeric = randomBytes(3).toString('hex');
    const randNum = Math.floor(Math.random() * 1000);
    const { station, name, type } = this.busForm.value;
    const busData = {
      name,
      type,
      id: randNum,
      stationId: station.id,
      plateNumber: `BUS-${alphaNumeric.slice(0, 3).toUpperCase()}-${alphaNumeric.slice(-3).toUpperCase()}`
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

  showForm() {
    this.showAddForm = !this.showAddForm;
    this.addFormText = this.showAddForm ? 'Close Bus' : 'Add Bus';
  }

  getBuses(): void {
    this.dataService.getBuses()
      .subscribe(data => {
        this.buses = data;
        this.temp = data;
      },
        error => console.log('Error:', error)
      );
  }

  getBusStations(): void {
    this.dataService.getStations()
      .subscribe(data => {
        this.stations = data;
        this.buses = this.buses.map(bus => {
          const busStation = this.stations.find(station => station.id === bus.stationId);
          bus.stationName = busStation.name;
          return bus;
        });
      },
        error => console.log('Error:', error)
      );
  }

  updateBus(data): void {
    this.dataService.updateBus(data)
      .subscribe(() => this.getBuses());
  }

  deleteBus(busData): void {
    const { id: busID, stationId } = busData;
    const busStation = this.stations.find(station => station.id === stationId);
    if (busStation) {
      const busSlot = busStation.slots.find(slot => slot.busId === busID);
      delete busSlot.busId;
      busStation.availableSlots++;
    }
    this.dataService.deleteBus(busID, busStation);
    return this.getBuses();
  }

  filterBy(value, props) {
    if (value === 'all' || !value) {
      this.buses = this.temp;
      return null;
    }

    if (props === 'station') {
      this.buses = this.temp.filter(bus => bus['stationId'] === parseInt(value, 10));
      return null;
    }

    this.buses = this.temp.filter(bus => bus[props].toLowerCase().includes(value.toLowerCase()));
  }

  ngOnInit() {
    this.getBuses();
    this.getBusStations();
  }


}
