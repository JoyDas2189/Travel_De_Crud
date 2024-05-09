import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private _http: HttpClient) { }

  addlocation(data: any) : Observable<any> {
    return this._http.post('http://localhost:3000/locationType',data);
  }
  getLocationList():Observable<any> {
    return this._http.get('http://localhost:3000/locationType');
  }
  deleteLocation(id:number):Observable<any> {
    return this._http.delete(`http://localhost:3000/locationType/${id}`);
  }
}
