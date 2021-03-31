import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  //private imgUrl = 'https://ct1h69zeq5.execute-api.us-east-2.amazonaws.com/prod/images';
  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any> {
   return this.http.get("./assets/products.json");
   // return this.http.get(this.imgUrl);
  }
}
