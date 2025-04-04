import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, filter } from 'rxjs';
import { GeocodingResult } from './interfaces/geocoding-result.modal';


@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private baseUrl = 'https://nominatim.openstreetmap.org/search';
  private _results = new BehaviorSubject<GeocodingResult[]>([]);
  public results$ = this._results.asObservable();
  
  getCoordinates(city: string): Observable<GeocodingResult[]> {
    const params = new HttpParams()
    .set('q', city)
    .set('format', 'json');
    
    return this.http.get<GeocodingResult[]>(this.baseUrl, { params });
  }
  
  fetchAndStoreCoordinates(city: string): void {
    this.getCoordinates(city).subscribe({
      next: (results: GeocodingResult[]) => {
        let filteredResults = [];
        for (const result of results) {
          var split = result.display_name.split(',');
          console.log(split[split.length - 1]);
          console.log(split);
          if (split[split.length - 1].trim() === 'United States') {
            filteredResults.push(result);
          }
        }
        this._results.next(filteredResults);
      },
      error: (error: any) => {
        console.error('Error fetching coordinates: ', error);
        this._results.next([]);
      }
    });
  }

  constructor(private http: HttpClient) { }
}
