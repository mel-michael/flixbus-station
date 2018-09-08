import { Component, OnInit } from '@angular/core';
// import { STATIONS } from '../mockstations';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  stations;
  stationForm = new FormGroup({
    name: new FormControl(''),
    numOfSlots: new FormControl('')
  });

  constructor(private dataService: DataService) {}

  addStation(): void {
    const randNum = Math.floor(Math.random() * 1000);
    const newStation = {
      id: randNum,
      name: this.stationForm.value.name,
      numOfSlots: this.stationForm.value.numOfSlots,
      availableSlots: this.stationForm.value.numOfSlots,
      slots: []
    };
    this.dataService.createStation(newStation)
      .subscribe(() => this.getBusStations(),
      error => console.log('Error:', error)
    );
  }

  getBusStations(): void {
    this.dataService.getStations()
      .subscribe(data => this.stations = data,
        error => console.log('Error:', error)
      );
  }

  ngOnInit() {
    this.getBusStations();
  }
}
