import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private apiService: ApiService;
  public categories: any[];

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  public ngOnInit(): void {
    this.apiService.getAllCategories().subscribe(value => {
      this.categories = value;
    });

    if (window.innerWidth <= 768) {
      const nav: HTMLElement = document.getElementsByTagName('nav')[0];
      const lienMenu: HTMLElement = document.getElementById('menu');

      nav.classList.add('reduced');

      lienMenu.addEventListener('click', (e) => {
        e.preventDefault();
      });

      // Au clic sur le menu ou un de ses enfants
      nav.addEventListener('focusin', (e) => {
        nav.classList.toggle('reduced');
        nav.classList.toggle('extended');
        this.handlePortableMenu();
      });

      this.handlePortableMenu();
    }
  }

  public onClickLink($event, categorie?): void {
    $event.preventDefault(); // Annule l'ancre standard

    let hrefVal: string;
    if ($event.target.nodeName !== 'A') {
      hrefVal = $event.target.parentNode.attributes.href.value;
    } else {
      hrefVal = $event.target.attributes.href.value;
    }

    const elemDestination = document.querySelector(hrefVal);

    elemDestination.scrollIntoView({behavior: 'smooth'});
  }

  public handlePortableMenu(): void {
    const nav: HTMLElement = document.getElementsByTagName('nav')[0];
    const div: HTMLElement = nav.querySelector('div');

    if (nav.classList.contains('extended')) {
      div.style.maxHeight = div.scrollHeight + 'px';
      div.style.marginBottom = '3vh';
    } else if (nav.classList.contains('reduced')) {
      div.style.maxHeight = '0px';
      div.style.marginBottom = '0px';
    }
  }

}
