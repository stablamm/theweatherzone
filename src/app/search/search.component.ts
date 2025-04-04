import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeocodingService } from '../geocoding.service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private geoService: GeocodingService
  ) { 
    this.searchForm = this.fb.group({
      location: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.geoService.fetchAndStoreCoordinates(this.searchForm.value.location);
    }
  }
}
