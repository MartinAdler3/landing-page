import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideUp', [
      state('oculto', style({
        opacity: 0,
        transform: 'translateY(50px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('oculto => visible', [
        animate('500ms ease')
      ]),
      transition('visible => oculto', [
        animate('300ms ease')
      ])
    ]),
    trigger('latido', [
      state('latir', style({})),
      transition('* => latir', [
        animate('1.5s infinite', 
          keyframes([
            style({ transform: 'scale(1)', offset: 0, easing: 'ease-in-out' }),
            style({ transform: 'scale(1.15)', offset: 0.5, easing: 'ease-in-out' }),
            style({ transform: 'scale(1)', offset: 1.0, easing: 'ease-in-out' })
          ])
        )
      ])
    ]),
    trigger('fadeIn', [
      state('oculto', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('oculto => visible', [
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class LandingPage implements OnInit {
  estadoAnimacion = 'oculto';
  animacionEstado: string = 'oculto';

  isScrollingDown = false;
  lastScrollTop = 0;
  isAutoScrolling = false;

  botonesHeader: any[] = [
    { nombre: "¿Qué es?", id: "landing-info" },
    { nombre: "Clientes", id: "landing-clientes" },
    { nombre: "Preguntas Frecuentes", id: "landing-preguntas" },
    { nombre: "Premium", id: "landing-premium" },
    { nombre: "Nosotros", id: "landing-footer" },
  ];

  clientes: any[] = [
    { nombre: "KFC", imagen: "https://logo.clearbit.com/kfc.com" },
    { nombre: "McDonald's", imagen: "https://logo.clearbit.com/mcdonalds.com" },
    { nombre: "Wendy's", imagen: "https://logo.clearbit.com/wendys.com" },
    { nombre: "Mostaza", imagen: "https://img.logo.dev/mostazaweb.com.ar?token=pk_eOl7nkUBQhCsqN-g3WPKXg" },
    { nombre: "Taco Bell", imagen: "https://logo.clearbit.com/tacobell.com" },
    { nombre: "Five guys", imagen: "https://logo.clearbit.com/fiveguys.com" },
    { nombre: "Pizza hut", imagen: "https://logo.clearbit.com/pizzahut.com" },
    { nombre: "Chipotle", imagen: "https://img.logo.dev/chipotle.com?token=pk_eOl7nkUBQhCsqN-g3WPKXg" },
    { nombre: "Starbucks", imagen: "https://logo.clearbit.com/starbucks.com" },
  ];

  preguntas: any[] = [
    { pregunta: "¿Cómo se usa?", respuesta: "El uso de Statill es blablabla porque blabla y además blablabla blabl ablabal bal ba", activo: false },
    { pregunta: "¿Pueden usarlo mis empleados?", respuesta: "no, depende, a veces si", activo: false },
  ];

  constructor(private viewportScroller: ViewportScroller, private el: ElementRef) {}

  ngOnInit() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.estadoAnimacion = 'visible';
          observer.unobserve(entry.target);
        }
      });
      observer.observe(this.el.nativeElement);
    } else {
      this.estadoAnimacion = 'visible';
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isAutoScrolling) return;

    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    this.isScrollingDown = currentScroll > this.lastScrollTop;
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  dirigirASeccion(id: string) {
    const prueba = document.getElementById(id);
    if (prueba) {
      this.isAutoScrolling = true;
      prueba.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => { this.isAutoScrolling = false; }, 600);
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll(event: Event) {
    const componentPosition = this.el.nativeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    this.animacionEstado = componentPosition < windowHeight * 0.8 ? 'visible' : 'oculto';
  }
}
