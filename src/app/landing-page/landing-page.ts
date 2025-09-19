import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- 1. Importa este módulo

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss'], // o .css
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideUp', [ // <-- Nombre de nuestro trigger: 'slideUp'
      transition(':enter', [ // <-- Se activa cuando un elemento entra en el DOM
        style({
          opacity: 0,
          transform: 'translateY(50px)' // <-- Estado inicial (oculto y 50px abajo)
        }),
        animate('500ms ease', // <-- Duración y curva de tiempo (0.5s)
          style({
            opacity: 1,
            transform: 'translateY(0)' // <-- Estado final (visible y en su lugar)
          })
        )
      ])
    ])
  ]
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
