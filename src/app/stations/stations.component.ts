import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  stations;
  temp;
  slots = [];
  stationForm = new FormGroup({
    name: new FormControl(''),
    numOfSlots: new FormControl('')
  });
  showAddForm = false;
  addFormText = 'Add Station';

  constructor(private dataService: DataService) {}

  addStation(): void {
    const randNum = Math.ceil(Math.random() * 1000);
    const { name, numOfSlots } = this.stationForm.value;
    const newStation = {
      name,
      numOfSlots,
      id: randNum,
      availableSlots: numOfSlots,
      slots: this.createSlot(numOfSlots)
    };
    this.dataService.createStation(newStation)
      .subscribe(() => this.getBusStations(),
        error => console.log('Error:', error)
      );
  }

  showForm() {
    this.showAddForm = !this.showAddForm;
    this.addFormText = this.showAddForm ? 'Close Station' : 'Add Station';
  }

  createSlot(len) {
    for (let i = 0; i < len; i++) {
      this.slots.push({ id: Math.ceil(Math.random() * 100) });
    }
    return this.slots;
  }

  getBusStations(): void {
    this.dataService.getStations()
      .subscribe(data => {
        this.stations = data;
        this.temp = data;
      },
      error => console.log('Error:', error)
    );
  }

  updateStation(data): void {
    this.dataService.updateStation(data).subscribe(() => this.getBusStations());
  }

  deleteStation(station): void {
    this.dataService.deleteStation(station.id);
    return this.getBusStations();
  }

  filterBy(value, field) {
    this.stations = this.temp.filter(
      bus => bus[field].indexOf(value.toLowerCase()) !== -1 || !value
    );
  }

  ngOnInit() {
    this.getBusStations();
  }
}
