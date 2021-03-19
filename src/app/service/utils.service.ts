import { Injectable } from '@angular/core';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public extractCategories(categories: Categorie[]): Categorie[] {
    const res: Categorie[] = [];

    for (const categorie of categories) {
      const categ = new Categorie();
      categ.id = categorie.id;
      categ.libelle = categorie.libelle;
      res.push(categ);

      const extractedCategories = this.getChildCategorie(categorie);

      if (extractedCategories.length > 0) {
        this.flattenArray(extractedCategories, res);
      }
    }

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

      // On inclut la catégorie enfant
      res.push(categ);

      // Si la catégorie possède encore des enfants, on boucle
      if (enfant.enfants.length > 0) {
        enfant.libelle = categ.libelle;
        res.push(this.getChildCategorie(enfant));
      }
    }

    return res;
  }

  private flattenArray(extractedCategories: any, res: Categorie[]): any {
    for (const sousEnfant of extractedCategories) {
      // Si c'est une catégorie
      if (sousEnfant.id) {
        res.push(sousEnfant);
      } else {
        this.flattenArray(sousEnfant, res);
      }
    }
  }
}
