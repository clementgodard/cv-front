import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private apiService: ApiService;
  public categories: Categorie[];

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  public ngOnInit(): void {
    this.apiService.getAllCategories().subscribe(value => {
      this.categories = value;
    });

    const nav: HTMLElement = document.getElementsByTagName('nav')[0];
    const lienMenu: HTMLElement = document.getElementById('menu');

    lienMenu.addEventListener('click', (e) => {
      e.preventDefault();
    });

    if (window.innerWidth < 768) {
      this.handlePortableMenu();
      this.evalPortableMenu();
    }
  }

  public onClickLink($event): void {
    $event.preventDefault(); // Annule l'ancre standard

    let hrefVal: string;
    if ($event.target.nodeName !== 'A') {
      hrefVal = $event.target.parentNode.attributes.href.value;
    } else {
      hrefVal = $event.target.attributes.href.value;
    }

    const elemDestination = document.querySelector(hrefVal);

    elemDestination.scrollIntoView({behavior: 'smooth'});

    const menuBurger: HTMLDivElement = document.querySelector('.menu-burger');
    menuBurger.click();
  }

  public handlePortableMenu(): void {

    const nav: HTMLElement = document.getElementsByTagName('nav')[0];
    const div: HTMLElement = document.querySelector('nav > div');
    const menuBurger: HTMLElement = document.querySelector('.menu-burger');
    const menuBurgerBtn: HTMLElement = document.querySelector('.menu-burger-btn');
    let ouvert = false;

    menuBurger.addEventListener('click', () => {
      if (!ouvert) {
        menuBurgerBtn.classList.add('ouvert');
        nav.classList.add('extended');
        ouvert = true;
      } else {
        menuBurgerBtn.classList.remove('ouvert');
        nav.classList.remove('extended');
        ouvert = false;
      }

      this.evalPortableMenu();
    });
  }

  private evalPortableMenu(): void {
    const nav: HTMLElement = document.getElementsByTagName('nav')[0];
    const div: HTMLElement = document.querySelector('nav > div');

    if (nav.classList.contains('extended')) {
      div.style.maxHeight = div.scrollHeight + 'px';
      div.style.marginBottom = '3vh';
    } else {
      div.style.maxHeight = '0px';
      div.style.marginBottom = '0px';
    }
  }

}
