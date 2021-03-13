import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { Ligne } from 'src/app/model/Ligne';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {

  private api: ApiService;

  public categories: Categorie[];

  public constructor(api: ApiService) {
    this.api = api;
    this.refreshCategories();
  }

  public ngOnInit(): void { }

  private refreshCategories(): void {
    this.api.getAllCategories(false).subscribe((res) => {
      this.categories = res;
    });
  }

  public deleteCategorie(categorie: Categorie): void {
    if (confirm('Etes-vous sûr de voulez supprimé la catégorie "' + categorie.libelle + '" ?')) {
      this.api.deleteCategorie(categorie.id).subscribe((res) => {
        this.refreshCategories();
      });
    }
  }

  public deleteLigne(ligne: Ligne): void {
    if (confirm('Etes-vous sûr de voulez supprimé la ligne "' + ligne.contenu + '" ?')) {
      this.api.deleteLigne(ligne.id).subscribe((res) => {
        this.refreshCategories();
      });
    }
  }
}
