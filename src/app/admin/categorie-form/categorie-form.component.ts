import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categorie } from 'src/app/model/categorie';
import { ApiService } from 'src/app/service/api.service';
import { UtilsService } from 'src/app/service/utils.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.scss']
})
export class CategorieFormComponent implements OnInit {
  private api: ApiService;
  private util: UtilsService;
  private toast: ToastrService;

  public categorie: Categorie;
  public categories: Categorie[];

  public idPassed: number;
  public action = 'create';

  constructor(api: ApiService, util: UtilsService, route: ActivatedRoute, toast: ToastrService) {
    this.api = api;
    this.util = util;
    this.toast = toast;

    this.categorie = new Categorie();

    route.params.subscribe( params => {
      if (params.id) {
        this.idPassed = params.id;

        this.api.getCategorie(this.idPassed).subscribe( res => {
          if (res.parent) {
            res.parent = res.parent.id;
          }

          this.categorie = res;
          this.action = 'update';

          this.toast.success('Catégorie "' + this.categorie.libelle + '" chargée', '', {closeButton: true});
        },
        errors => {
          console.log('erreur');
          console.log(errors);
          console.log(errors.error.message);
        });
      }
    });

    this.refreshCategories();
  }

  ngOnInit(): void {  }

  public submitCategorie(e: Event): void {
    e.preventDefault();

    delete(this.categorie.lignes);

    if (this.action === 'create') {
      this.api.addCategorie(this.categorie).subscribe( (res) => {
        this.toast.success('Categorie "' + this.categorie.libelle + '" créée', '', {closeButton: true});
        this.refreshCategories();
      });
    }

    if (this.action === 'update') {
      this.toast.success('Categorie "' + this.categorie.libelle + '" mise à jour', '', {closeButton: true});
      this.api.patchCategorie(this.categorie).subscribe( res => { });
    }
  }

  private refreshCategories(): void {
    this.api.getAllCategories(false).subscribe((res) => {
      this.categories = this.util.extractCategories(res);

      // Filtre la catégorie en cours
      this.categories = this.categories.filter( item => {
        return item.id !== this.categorie.id;
      });

      this.toast.success('Liste des catégories mise à jour', '', {closeButton: true});
    });
  }
}
