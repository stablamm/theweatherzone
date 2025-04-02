import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../app/landing/landing.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'weather', component: HomeComponent},
  { path: '**', redirectTo: ''} //fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
