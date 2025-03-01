import { Component, OnInit } from '@angular/core';
import { WeatherDataService, Coordinates } from '../weather-data.service';
import { NwsApiService } from '../nwsapi.service';
import { NWSPointResponse } from '../interfaces/nws-point-response.model';
import { NWSForecastResponse } from '../interfaces/nws-forecast-response.model';

@Component({
  selector: 'app-forecast',
  standalone: false,
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  coordinates: Coordinates | null = null;
  pointResponse: NWSPointResponse | null = null;
  forecastUrl: string | null = null;
  forecastResponse: NWSForecastResponse | null = null;

  constructor(
    private weatherDataService: WeatherDataService,
    private nwsApiService: NwsApiService
  ) { }

  ngOnInit(): void {
    this.weatherDataService.coordinates$.subscribe((coords) => {
      this.coordinates = coords;
    });

    this.nwsApiService.response$.subscribe((point) => {
      this.pointResponse = point;
      this.forecastUrl = point?.properties.forecast ?? '';

      if (this.forecastUrl) {
        this.nwsApiService.fetchForecast(this.forecastUrl);
      }
    });

    this.nwsApiService.forecastResponse$.subscribe((forecast) => {
      this.forecastResponse = forecast;
    })
  }
}
