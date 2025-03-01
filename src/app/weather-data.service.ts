import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coordinates } from './interfaces/coordinates.model';
import { NWSForecastResponse } from './interfaces/nws-forecast-response.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  private coordinatesSubject = new BehaviorSubject<Coordinates | null>(null);
  coordinates$ = this.coordinatesSubject.asObservable();

  private forecastSubject = new BehaviorSubject<NWSForecastResponse | null>(null);
  forecast$ = this.forecastSubject.asObservable();

  setCoordinates(coords: Coordinates): void {
    this.coordinatesSubject.next(coords);
  }

  setForecast(forecast: NWSForecastResponse): void {
    this.forecastSubject.next(forecast);
  }
}
