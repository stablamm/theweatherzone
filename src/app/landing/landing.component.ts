import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  onCheckWeather() {
    this.router.navigate(['/weather']);
  }

  constructor(private router: Router) {}
}
