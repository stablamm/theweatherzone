import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';
import { NwsApiService } from '../nwsapi.service';
import { NWSPointResponse } from '../interfaces/nws-point-response.model';
import { NWSForecastResponse } from '../interfaces/nws-forecast-response.model';
import { Coordinates } from '../interfaces/coordinates.model';
import { filter, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-forecast',
  standalone: false,
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  coordinates$: Observable<Coordinates | null>;
  pointResponse$: Observable<NWSPointResponse | null>;
  forecastResponse$: Observable<NWSForecastResponse | null>;

  constructor(
    private weatherDataService: WeatherDataService,
    private nwsApiService: NwsApiService
  ) { 
    this.coordinates$ = this.weatherDataService.coordinates$;
    this.pointResponse$ = this.nwsApiService.pointResponse$;
    this.forecastResponse$ = this.pointResponse$.pipe(
      filter((point): point is NWSPointResponse => !!point && !!point.properties.forecast),
      switchMap((point) => this.nwsApiService.getForecast(point.properties.forecast))
    );
  }

  ngOnInit(): void { }
}
