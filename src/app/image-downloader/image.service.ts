import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

 //private url='https://ct1h69zeq5.execute-api.us-east-2.amazonaws.com/prod/images'
 // private url='http://localhost:8080/api/file/all';

  private url='./assets/images.json';
  constructor(private http: HttpClient) { }

  public getImages(): Observable<any> {
    return this.http.get(this.url);
  }

}
