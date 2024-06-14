import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements AfterViewInit {

  sections: HTMLElement[] = [];
  currentActiveSection: string | null = null;
  
  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentActiveSection = this.router.url.split('#')[1];
        this.updateActiveLink();
      }
    });
  }

  ngAfterViewInit() {
    this.sections = Array.from(document.querySelectorAll('.section'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.currentActiveSection = entry.target.id;
          this.updateActiveLink();
        }
      });
    }, { threshold: 0.5 });

    this.sections.forEach(section => observer.observe(section));
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  updateActiveLink() {
    const links = this.el.nativeElement.querySelectorAll('nav ul li');
    links.forEach((link: HTMLElement) => {
      if (link.getAttribute('data-section') === this.currentActiveSection) {
        this.renderer.addClass(link, 'active');
      } else {
        this.renderer.removeClass(link, 'active');
      }
    });
  }

}
