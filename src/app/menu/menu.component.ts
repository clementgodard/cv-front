import { Component, OnInit } from '@angular/core';
import { ApiService, CategorieCV } from '../api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private apiService: ApiService;
  public categories: CategorieCV[];

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  ngOnInit(): void {
    this.apiService.getAllCategories().subscribe( value => {
      this.categories = value;
    });
  }

  onClickLink($event, categorie): void {
    console.log($event);
    console.log(categorie);
  }

}
