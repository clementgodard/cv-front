import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { ApiService } from 'src/app/service/api.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.scss']
})
export class CategorieFormComponent implements OnInit {

  private api: ApiService;
  private util: UtilsService;

  public categorie: Categorie;
  public categories: Categorie[];

  constructor(api: ApiService, util: UtilsService) {
    this.api = api;
    this.util = util;

    this.categorie = new Categorie();
    this.refreshCategories();
  }

  ngOnInit(): void {
  }

  public submitCategorie(e: Event): void {
    e.preventDefault();

    this.api.addCategorie(this.categorie).subscribe( (res) => {
      console.log(res);
      this.refreshCategories();
    });
  }

  private refreshCategories(): void {
    this.api.getAllCategories(false).subscribe((res) => {
      this.categories = this.util.extractCategories(res);
    });
  }

}
