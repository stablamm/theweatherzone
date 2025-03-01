import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Coordinates {
  lat: string;
  lon: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  private coordinatesSubject = new BehaviorSubject<Coordinates | null>(null);
  coordinates$ = this.coordinatesSubject.asObservable();

  setCoordinates(coords: Coordinates): void {
    this.coordinatesSubject.next(coords);
  }
}
