import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { Ligne } from 'src/app/model/Ligne';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ligne-form',
  templateUrl: './ligne-form.component.html',
  styleUrls: ['./ligne-form.component.scss']
})
export class LigneFormComponent implements OnInit {

  private api: ApiService;
  public ligne: Ligne;

  public categories: Categorie[];

  public constructor(api: ApiService) {
    this.api = api;
    this.api.getAllCategories(false).subscribe((res) => {
      this.categories = res;
    });

    this.ligne = new Ligne();
  }

  public ngOnInit(): void { }

  public submitLigne(e: Event): void {
    e.preventDefault();

    this.api.addLigne(this.ligne).subscribe( (res) => {
      console.log(res);
    });
  }
}
