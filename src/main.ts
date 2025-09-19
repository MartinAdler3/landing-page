
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- Importa esto

bootstrapApplication(App, {
  providers: [ // <-- Un solo arreglo de providers
    provideRouter(routes),
    provideAnimations()
  ], // Configura las rutas aquí
}).catch(err => console.error(err));