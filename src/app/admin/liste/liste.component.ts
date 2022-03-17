import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { Ligne } from 'src/app/model/ligne';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
  private api: ApiService;
  private toast: ToastrService;

  public categories: Categorie[];

  public constructor(api: ApiService, toast: ToastrService) {
    this.api = api;
    this.toast = toast;
  }

  public ngOnInit(): void {
    this.refreshCategories();
  }

  public refreshCategories(): void {
    const btnRefresh = document.getElementById('refresh') as HTMLButtonElement;
    const refreshIcon = btnRefresh.firstChild as HTMLElement;

    btnRefresh.classList.remove('btn-success');
    btnRefresh.classList.add('btn-warning');
    refreshIcon.classList.add('rotating');
    btnRefresh.disabled = true;

    this.api.getAllCategories(false, false).subscribe((res) => {
      btnRefresh.classList.remove('btn-warning');
      btnRefresh.classList.add('btn-success');
      refreshIcon.classList.remove('rotating');
      btnRefresh.disabled = false;

      this.categories = res;
      this.toast.success('Liste mise à jour', '', {closeButton: true});
    });
  }

  public deleteCategorie(categorie: Categorie, e: Event): void {
    e.preventDefault();
    if (confirm('Etes-vous sûr de voulez supprimé la catégorie "' + categorie.libelle + '" ?')) {
      this.api.deleteCategorie(categorie.id).subscribe(() => {
        this.toast.success('Catégorie "' + categorie.libelle + '" supprimée', '', {closeButton: true});
        this.refreshCategories();
      });
    }
  }

  public deleteLigne(ligne: Ligne, e: Event): void {
    e.preventDefault();
    if (confirm('Etes-vous sûr de voulez supprimé la ligne "' + ligne.contenu + '" ?')) {
      this.api.deleteLigne(ligne.id).subscribe(() => {
        this.toast.success('Ligne "' + ligne.contenu + '" supprimée', '', {closeButton: true});
        this.refreshCategories();
      });
    }
  }

  public toggleActiveCategorie(categorie: Categorie): void {
    const categ = new Categorie();

    categ.id = categorie.id;
    categ.active = !categorie.active;

    this.api.patchCategorie(categ).subscribe(() => {
      this.toast.success('Catégorie "' + categorie.libelle + '" ' + ((categ.active) ? 'activée' : 'désactivée'), '', {closeButton: true});
      this.refreshCategories();
    });
  }

  public toggleActiveLigne(ligne: Ligne): void {
    const lig = new Ligne();

    lig.id = ligne.id;
    lig.active = !ligne.active;

    this.api.patchLigne(lig, undefined).subscribe(() => {
      this.toast.success('Ligne "' + ligne.contenu + '" ' + ((lig.active) ? 'activée' : 'désactivée'), '', {closeButton: true});
      this.refreshCategories();
    });
  }
}
