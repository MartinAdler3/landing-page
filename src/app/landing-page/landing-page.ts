// SOLUCIÓN COMPLETA - Reemplazá todo el código TypeScript

import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, query, stagger} from '@angular/animations';

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
       animate('500ms 100ms ease-out')
      ]),
      transition('visible => oculto', [
        animate('300ms ease')
      ])
    ]),
    trigger('pulsar', [
      state('normal', style({ transform: 'scale(1)' })),
      state('pulsado', style({ transform: 'scale(1.05)' })),

      transition('normal => pulsado', [
        animate('0.5s ease-in')
      ]),
      transition('pulsado => normal', [
        animate('0.5s ease-out')
      ])
    ]),
    trigger('fadeIn', [
      state('oculto', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('oculto => visible', [
        animate('500ms ease-out')
      ])
    ]),
    trigger('slideRight', [
      state('oculto', style({
        opacity: 0,
        transform: 'translateX(-100px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('oculto => visible', [
        animate('700ms ease-out')
      ]),
      transition('visible => oculto', [
        animate('300ms ease-in')
      ])
    ]),
    trigger('carruselAnimacion', [
      transition(':enter', [
        query('.cartel-cliente', [
          style({ opacity: 0, transform: 'translateX(100px)' }),
          stagger(150, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})

export class LandingPage implements OnInit, OnDestroy {
  
  estadoAnimacion = 'oculto';
  animacionEstado: string = 'oculto';
  estadoPulsacion: string = 'normal';

  isScrollingDown = false;
  lastScrollTop = 0;
  isAutoScrolling = false;
  isPaused = false;

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

  // Duplicamos los clientes para el efecto infinito
  clientesDuplicados: any[] = [];

  preguntas: any[] = [
    { pregunta: "¿Cómo se usa?", respuesta: "El uso de Statill es blablabla porque blabla y además blablabla blabl ablabal bal ba", activo: false },
    { pregunta: "¿Pueden usarlo mis empleados?", respuesta: "no, depende, a veces si", activo: false },
  ];

  private autoScrollInterval: any;

  constructor(private viewportScroller: ViewportScroller, private el: ElementRef) {}

  ngOnInit() {
    // Triplicamos los clientes para el loop infinito más suave
    this.clientesDuplicados = [...this.clientes, ...this.clientes, ...this.clientes];

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
    this.iniciarPulsacion();

    // Iniciamos el scroll con un pequeño delay para asegurar que el DOM esté listo
    setTimeout(() => {
      this.startAutoScroll();
    }, 100);
  }

  ngOnDestroy() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  iniciarPulsacion() {
    setInterval(() => {
      this.estadoPulsacion = this.estadoPulsacion === 'normal' ? 'pulsado' : 'normal';
    }, 500);
  }

  private startAutoScroll() {
    const carrusel = document.querySelector('.carrusel') as HTMLElement;
    if (!carrusel) {
      console.log('No se encontró el carrusel');
      return;
    }

    console.log('Carrusel encontrado, iniciando scroll...');
    const velocidad = 1;

    this.autoScrollInterval = setInterval(() => {
      if (this.isPaused) return;

      carrusel.scrollLeft += velocidad;

      // Calculamos cuándo resetear (justo después de pasar el primer conjunto completo)
      const anchoUnConjunto = carrusel.scrollWidth / 3; // dividido por 3 porque triplicamos

      // Reseteamos justo después de scrollear el ancho de un conjunto
      if (carrusel.scrollLeft >= anchoUnConjunto + 10) { // +10 de margen
        carrusel.scrollLeft = carrusel.scrollLeft - anchoUnConjunto;
      }
    }, 16);
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('carrusel') || target.closest('.carrusel')) {
      this.isPaused = true;
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('carrusel') || target.closest('.carrusel')) {
      this.isPaused = false;
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

    this.animacionEstado = componentPosition < windowHeight * 0.99 ? 'visible' : 'oculto';
  }
}
