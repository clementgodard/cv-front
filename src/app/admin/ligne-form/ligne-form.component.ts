import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { Ligne } from 'src/app/model/Ligne';
import { ApiService } from 'src/app/service/api.service';
import { UtilsService } from 'src/app/service/utils.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ligne-form',
  templateUrl: './ligne-form.component.html',
  styleUrls: ['./ligne-form.component.scss']
})
export class LigneFormComponent implements OnInit {

  public api: ApiService;
  private util: UtilsService;
  private toast: ToastrService;
  private routeActive: ActivatedRoute;

  public ligne: Ligne = new Ligne();
  public categories: Categorie[];

  public idPassed: number;
  public action = 'create';

  public constructor(api: ApiService, util: UtilsService, route: ActivatedRoute, toast: ToastrService) {
    this.api = api;
    this.util = util;
    this.toast = toast;
    this.routeActive = route;

    this.refreshCategories();
    this.loadLigne();
  }

  public ngOnInit(): void { }

  public submitLigne(e: Event): void {
    e.preventDefault();

    const img = document.getElementById('image') as HTMLInputElement;
    const file: File = img.files[0];

    if (this.action === 'update') {
      this.api.patchLigne(this.ligne, file).subscribe( (res) => {
        this.toast.success('Ligne "' + this.ligne.contenu + '" créée', '', {closeButton: true});
      });
    }

    if (this.action === 'create') {
      this.api.addLigne(this.ligne, file).subscribe( (res) => {
        this.toast.success('Ligne "' + this.ligne.contenu + '" mise à jour', '', {closeButton: true});
      });
    }
  }

  private refreshCategories(): void {
    this.api.getAllCategories(false).subscribe((res) => {
      this.categories = this.util.extractCategories(res);
      this.toast.success('Liste des catégories mise à jour', '', {closeButton: true});
    });
  }

  private loadLigne(): void {
    this.routeActive.params.subscribe( params => {
      if (params.id) {
        this.idPassed = params.id;

        this.api.getLigne(this.idPassed).then( (res: Ligne) => {
          this.ligne = res;
          this.action = 'update';

          this.api.getCategorieByLigne(this.ligne).subscribe( res2 => {
            this.ligne.categorie = res2.id;
            this.toast.success('Ligne "' + this.ligne.contenu + '" chargée', '', {closeButton: true});
          });
        });
      } else {
        this.ligne = new Ligne();
      }
    });
  }
}
