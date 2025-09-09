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
    nombre: "Clientes",
    id: "landing-clientes",
  },
  {
    nombre: "Preguntas Frecuentes",
    id: "landing-preguntas",
  },
    {
    nombre: "Premium",
    id: "landing-premium",
  },
  {
    nombre: "Nosotros",
    id: "landing-footer",
  },
]

  clientes: any[] = [
    {
      nombre: "KFC",
      imagen: "https://logo.clearbit.com/kfc.com"
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
      imagen: "https://img.logo.dev/mostazaweb.com.ar?token=pk_eOl7nkUBQhCsqN-g3WPKXg"
    },
        {
      nombre: "Taco Bell",
      imagen: "https://logo.clearbit.com/tacobell.com"
    },
    {
      nombre: "Five guys",
      imagen: "https://logo.clearbit.com/fiveguys.com"
    },
    {
      nombre: "Pizza hut",
      imagen: "https://logo.clearbit.com/pizzahut.com"
    },
    {
      nombre: "Chipotle",
      imagen: "https://img.logo.dev/chipotle.com?token=pk_eOl7nkUBQhCsqN-g3WPKXg"
    },
    {
      nombre: "Starbucks",
      imagen: "https://logo.clearbit.com/starbucks.com"
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
