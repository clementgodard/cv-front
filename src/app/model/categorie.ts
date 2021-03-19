import { Ligne } from './Ligne';

export class Categorie {
    id: number;
    libelle: string;
    position: number;
    active: boolean;
    lignes: Ligne[];
    enfants: Categorie[];
    imageCategorie: boolean;
    parent: number;
}
