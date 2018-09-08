import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { STATIONS } from './mock-stations';

// const URL = 'https://my-json-server.typicode.com/mel-michael/flix-demo';
const BUS_URL = 'http://localhost:3000/bus';
const STATION_URL = 'http://localhost:3000/station';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getStations() {
    return this.http.get(STATION_URL, httpOptions);
  }

  createStation(body) {
    return this.http.post(STATION_URL, body, httpOptions)
  }

}

