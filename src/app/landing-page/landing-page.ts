import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {
  constructor(private viewportScroller: ViewportScroller) {}

  isScrollingDown = false;
  lastScrollTop = 0;
  isAutoScrolling = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isAutoScrolling) {
      // Ignoramos scroll durante auto scroll
      return;
    }
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop) {
      // Scrolleando hacia abajo
      this.isScrollingDown = true;
    } else {
      // Scrolleando hacia arriba
      this.isScrollingDown = false;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Para no tener valores negativos
  }

  dirigirASeccion(id: string){
    const prueba = document.getElementById(id);
    if (prueba) {
      this.isAutoScrolling = true;
      prueba.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        this.isAutoScrolling = false;
      }, 600);
    }
  }

  botonesHeader: any[] = [
  {
    nombre: "¿Qué es?",
    id: "landing-info",
  },
  {
    nombre: "Preguntas Frecuentes",
    id: "landing-preguntas",
  },
  {
    nombre: "Clientes",
    id: "landing-clientes",
  },
  {
    nombre: "Nosotros",
    id: "landing-footer",
  },
  {
    nombre: "Premium",
    id: "landing-premium",
  },
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
