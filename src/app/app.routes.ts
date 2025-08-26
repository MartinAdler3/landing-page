import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';

export const routes: Routes = [
    { path: '', component: LandingPage }, // Ruta para la página principal
    { path: 'landing-page', component: LandingPage }, // Ruta explícita para /landing-page
];
