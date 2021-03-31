import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {
  private url = 'https://ct1h69zeq5.execute-api.us-east-2.amazonaws.com/prod/images';
  constructor(private http: HttpClient) { }

  getCarsSmall(): Observable<any>  {
    //return this.http.get('./assets/cars-small.json');
    return this.http.get(this.url);
                // .toPromise()
                // .then(res => <Car[]> res.data)
                // .then(data => { return data; });
}
}
