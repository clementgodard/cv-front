import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { ApiService } from '../../service/api.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private apiService: ApiService;
  public categories: Categorie[];
  private timeoutId: number;
  public chargement: boolean;
  private meta: Meta;

  public constructor(apiService: ApiService, meta: Meta) {
    this.apiService = apiService;
    this.meta = meta;
  }

  public ngOnInit(): void {
    this.meta.addTag({
      name: 'description',
      content: 'CV de Clément Godard'
    });

    this.chargement = true;
    this.apiService.getAllCategories().subscribe(value => {
      this.categories = value;
      this.chargement = false;
    });

    window.onscroll = () => {
      if (this.timeoutId) { clearTimeout(this.timeoutId); }
      this.timeoutId = setTimeout(this.handleScroll, 4);
    };

    this.handleScroll();
  }

  private handleScroll(): void {

    const liens: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('nav li>a[href^="#"]');
    const positionActuelle: number = window.scrollY;

    liens.forEach( (elem) => {
      const hashRef = elem.attributes.getNamedItem('href').value;
      const elemCible: HTMLDivElement = document.querySelector(hashRef);
      const elementRelativePosition = elemCible.offsetTop;
      const elemHeight = elemCible.scrollHeight;

      const titre: HTMLElement = document.querySelector(hashRef + '>h1, ' + hashRef + '>h2, ' + hashRef + '>h3');
      const marginTop: number = parseFloat(window.getComputedStyle(titre, null).getPropertyValue('margin-top'));

      if (elem.classList.contains('active')) {
        elem.classList.remove('active');
      }

      if (positionActuelle >= elementRelativePosition - marginTop &&
         positionActuelle <= elementRelativePosition - marginTop + elemHeight) {
        elem.classList.add('active');

        if (window.innerWidth <= 768) {
          const current = document.getElementById('current-section');
          current.innerText = elem.textContent;
        }
      }
    });
  }
}
