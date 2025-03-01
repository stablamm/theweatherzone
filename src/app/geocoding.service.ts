import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
}

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
        this._results.next(results);
      },
      error: (error: any) => {
        console.error('Error fetching coordinates: ', error);
        this._results.next([]);
      }
    });
  }

  constructor(private http: HttpClient) { }
}
