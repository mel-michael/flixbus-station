import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { DataService } from './data.service';

describe('DataService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  // it('should be created', inject([DataService], (service: DataService) => {
  //   expect(service).toBeTruthy();
  //   const testData = { name: 'Test Data' };

  //   // Make an HTTP GET request
  //   httpClient.get(testUrl)
  //     .subscribe(data =>
  //       // When observable resolves, result should match test data
  //       expect(data).toEqual(testData)
  //     );
  // }));

});
