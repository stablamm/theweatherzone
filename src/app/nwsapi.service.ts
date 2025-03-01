import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { NWSPointResponse } from './interfaces/nws-point-response.model';
import { NWSForecastResponse } from './interfaces/nws-forecast-response.model';

@Injectable({
  providedIn: 'root'
})
export class NwsApiService {
  private baseUrl = 'https://api.weather.gov';
  private _response = new BehaviorSubject<NWSPointResponse | null>(null);
  public response$ = this._response.asObservable();

  private _forecastResponse = new BehaviorSubject<NWSForecastResponse | null>(null);
  public forecastResponse$ = this._forecastResponse.asObservable();

  getPoint(lat: string, lon: string): Observable<NWSPointResponse> {
    var url = `${this.baseUrl}/points/${lat},${lon}`;
    return this.http.get<NWSPointResponse>(url);
  }

  getForecast(url: string): Observable<NWSForecastResponse> {
    return this.http.get<NWSForecastResponse>(url);
  }

  fetchForecastPoint({ lat, lon }: { lat: string; lon: string; }): void {
    console.log(`Lat: ${lat}, Lon: ${lon}`);
    this.getPoint(lat, lon).subscribe({
      next: (result: NWSPointResponse) => {
        this._response.next(result);
      },
      error: (error: any) => {
        console.error('Error fetching coordinates: ', error);
        this._response.next(null);
      }
    });
  }

  fetchForecast(url: string): void {
    this.getForecast(url).subscribe({
      next: (result: NWSForecastResponse) => {
        this._forecastResponse.next(result);
      },
      error: (error: any) => {
        console.error('Error fetching forecast: ', error);
        this._forecastResponse.next(null);
      }
    });
  }

  constructor(private http: HttpClient) { }
}
