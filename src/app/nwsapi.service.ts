import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { NWSPointResponse } from './interfaces/nws-point-response.model';
import { NWSForecastResponse } from './interfaces/nws-forecast-response.model';
import { WeatherDataService } from './weather-data.service';

@Injectable({
  providedIn: 'root'
})
export class NwsApiService {
  private baseUrl = 'https://api.weather.gov';
  private _pointResponse = new BehaviorSubject<NWSPointResponse | null>(null);
  public pointResponse$ = this._pointResponse.asObservable();

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
        this._pointResponse.next(result);
      },
      error: (error: any) => {
        console.error('Error fetching coordinates: ', error);
        this._pointResponse.next(null);
      }
    });
  }

  fetchForecast(url: string): void {
    this.getForecast(url).subscribe({
      next: (result: NWSForecastResponse) => {
        this.weatherDataService.setForecast(result);
      },
      error: (error: any) => {
        console.error('Error fetching forecast: ', error);
      }
    });
  }

  constructor(private http: HttpClient, private weatherDataService: WeatherDataService) { }
}
