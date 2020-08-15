import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ApiService, CategorieCV } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewChecked {

  private apiService: ApiService;
  public categories: CategorieCV[];
  private timeoutId: number;

  public constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  public ngOnInit(): void {
    this.apiService.getAllCategories().subscribe( value => {
      this.categories = value;
    });
  }

  public ngAfterViewChecked(): void {
    window.onscroll = (e) => {
      if (this.timeoutId) { clearTimeout(this.timeoutId); }
      this.timeoutId = setTimeout(this.handleScroll, 3, e);
    };
  }

  private handleScroll(event): void {

    const liens: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('nav li>a[href^="#"]');
    const positionActuelle: number = window.scrollY;

    liens.forEach( (elem) => {
      const hashRef = elem.attributes.getNamedItem('href').value;
      const elemCible: HTMLDivElement = document.querySelector(hashRef);
      const elementRelativePosition = elemCible.offsetTop;
      const elemHeight = elemCible.scrollHeight;

      const titre: HTMLElement = document.querySelector(hashRef + '>h1, ' + hashRef + '>h2');
      const marginTop: number = parseFloat(window.getComputedStyle(titre, null).getPropertyValue('margin-top'));

      if (elem.classList.contains('active')) {
        elem.classList.remove('active');
      }

      if (positionActuelle >= elementRelativePosition - marginTop &&
         positionActuelle <= elementRelativePosition - marginTop + elemHeight) {
        elem.classList.add('active');
      }
    });

    //         }
    // Position de scroll actuelle
    // let scrollPosition = $('main').scrollTop();

    // $("nav li>a[href^='#']").each(function () {
    //     let hashRef = $(this).attr('href');
    //     let elementRelativePosition = $(hashRef).offset().top;

    //     if ($(window).width() > 768) {
    //         if (event.type == 'scroll') {
    //             if (elementRelativePosition <= 1 && elementRelativePosition >= 0 - $(hashRef).height()) {
    //                 $("nav li>a[href^='#']").removeClass('active');
    //                 $(this).addClass('active');

    //                 if ($(this).parent().parent().parent().get(0).nodeName == "LI") {
    //                     $(this).parent().parent().prev().addClass('active');
    //                 }
    //                 // document.location.hash = hashRef;
    //             }
    //         }
    //     } else if (event.type == 'touchmove' || event.type == 'scroll') {
    //         if (window.pageYOffset >= elementRelativePosition && window.pageYOffset <= elementRelativePosition + $(hashRef).height()) {
    //             $("nav>a[href='#menu']>span#current-section").text($(this).text());
    //             $("nav li>a[href^='#']").removeClass('active');
    //             $(this).addClass('active');

    //             if ($(this).parent().parent().parent().get(0).nodeName == "LI") {
    //                 $(this).parent().parent().prev().addClass('active');
    //             }
    //         }

    //     }
    // });
  }
}
