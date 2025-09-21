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

export class LandingPageComponent implements OnInit {
  estadoAnimacion = 'oculto';

  constructor(private el: ElementRef) {}

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
}

export class LandingPage {
  constructor(private viewportScroller: ViewportScroller, private el: ElementRef) {}

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

  animacionEstado: string = 'oculto';

  // 2. Necesitamos acceder al elemento del DOM para saber su posición

  // 3. Escuchamos el evento de scroll de la ventana
  @HostListener('window:scroll', ['$event'])
  checkScroll(event: Event) {
    const componentPosition = this.el.nativeElement.getBoundingClientRect().top;
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // 4. Si la parte superior del componente está dentro de la ventana del navegador
    //    activamos la animación
    if (componentPosition < windowHeight * 0.8) { // El 0.8 es para que se active un poco antes de que esté totalmente visible
      this.animacionEstado = 'visible';
    } else {
      // 5. Si no está, lo ponemos en 'oculto'
      this.animacionEstado = 'oculto';
    }
  }
}
