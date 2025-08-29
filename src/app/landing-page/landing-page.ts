import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {
  botonesHeader: string[] = 
  ["¿Qué es?", 
    "Preguntas Frecuentes", 
    "Clientes", 
    "Nosotros", 
    "Premium",
  ]

  clientes: any[] = [
    {
      nombre: "Fuoco",
      imagen: "https://logo.clearbit.com/mcdonalds.com"
    },
    {
      nombre: "McDonald's",
      imagen: "https://logo.clearbit.com/mcdonalds.com"
    },
    {
      nombre: "Wendy's",
      imagen: "https://logo.clearbit.com/wendys.com"
    },
    {
      nombre: "Mostaza",
      imagen: "https://logo.clearbit.com/mostaza.com.ar"
    },
        {
      nombre: "Freddie Verdury",
      imagen: "https://logo.clearbit.com/mcdonalds.com"
    },
    {
      nombre: "Tacos Goku",
      imagen: "https://logo.clearbit.com/wendys.com"
    },
    {
      nombre: "Mi Gusto",
      imagen: "https://logo.clearbit.com/migusto.com.ar"
    },
    {
      nombre: "Dale bro",
      imagen: "https://logo.clearbit.com/wendys.com"
    },
    {
      nombre: "brotheeer",
      imagen: "https://logo.clearbit.com/wendys.com"
    },
    {
      nombre: "burger king",
      imagen: "https://logo.clearbit.com/burgerking.com"
    },
  ]
  preguntas: any[] = [
    {
      pregunta: "¿Cómo se usa?",
      respuesta: "El uso de Statill es blablabla porque blabla y además blablabla blabl ablabal bal ba",
      activo: false,
    },
    {
      pregunta: "¿Pueden usarlo mis empleados?",
      respuesta: "no, depende, a veces si",
      activo: false,
    },
  ]
}
