import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, query, stagger } from '@angular/animations';
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
          stagger(150, [ // 150ms de retraso entre la animación de cada ítem
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})

export class LandingPage implements OnInit {
  estadoAnimacion = 'oculto';
  animacionEstado: string = 'oculto';
  estadoPulsacion: string = 'normal';

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
    this.iniciarPulsacion();
  }
  
  iniciarPulsacion() {
    setInterval(() => {
      this.estadoPulsacion = this.estadoPulsacion === 'normal' ? 'pulsado' : 'normal';
    }, 500);
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