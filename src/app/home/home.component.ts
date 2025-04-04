import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GeocodingService } from '../geocoding.service';
import { WeatherDataService } from '../weather-data.service';
import { NwsApiService } from '../nwsapi.service';
import { GeocodingResult } from '../interfaces/geocoding-result.modal';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  results$: Observable<GeocodingResult[]>;

  formatDisplayName(name: string): string {
    let split = name.split(',');
    return name;
  }

  constructor(
    private geoService: GeocodingService,
    private weatherDataService: WeatherDataService,
    private nwsApiService: NwsApiService
  ) {
    this.results$ = this.geoService.results$;
  }

  onActionButtonClick(result: GeocodingResult): void {
    const { lat, lon } = result;
    this.weatherDataService.setCoordinates({lat, lon});
    this.nwsApiService.fetchForecastPoint({ lat, lon });
  }
}
