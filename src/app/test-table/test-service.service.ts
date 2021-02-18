import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor(private http: HttpClient) { }

  getCarsSmall(): Observable<any>  {
    return this.http.get('./assets/cars-small.json');
                // .toPromise()
                // .then(res => <Car[]> res.data)
                // .then(data => { return data; });
}
}
