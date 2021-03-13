import { Injectable } from '@angular/core';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public extractCategories(categories: Categorie[]): Categorie[] {
    const res: Categorie[] = [];

    console.log(categories);

    for (const categorie of categories) {
      const categ = new Categorie();
      categ.id = categorie.id;
      categ.libelle = categorie.libelle;
      res.push(categ);

      console.log('extraction de la catégorie : ' + categorie.libelle);

      const extractedCategories = this.getChildCategorie(categorie);

      if (extractedCategories.length > 0) {

        res.push(extractedCategories);
        for (const sousEnfant of extractedCategories) {
          res.push(sousEnfant);
        }
      }
    }

    console.log('résultats : ');
    console.log(res);

    return res;
  }


  // Extrait toutes les catégories enfants de la catégorie donnée et renvoie tout sous forme de tableau à une dimension
  // Les propriétés des catégories sont réduits au minimum pour affichage (libelle + id)
  private getChildCategorie(categorie: Categorie): any {
    const res: Categorie[] = [];

    for (const enfant of categorie.enfants) {
      const categ: Categorie = new Categorie();

      categ.id = enfant.id;
      categ.libelle = categorie.libelle + ' > ' + enfant.libelle;

      res.push(categ);
      if (enfant.enfants.length > 0) {
        res.push(this.getChildCategorie(enfant));
      }
    }

    return res;
  }
}
