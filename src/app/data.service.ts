import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { STATIONS } from './mock-stations';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const URL = 'https://my-json-server.typicode.com/mel-michael/flix-demo/station';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getStations() {
    return this.http.get(URL, httpOptions);
  }

}

