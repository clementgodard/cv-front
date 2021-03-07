import { Ligne } from './Ligne';

export class Categorie {
    id: number;
    libelle: string;
    position: number;
    active: number;
    lignes: Ligne[];
    enfants: Categorie[];
    imageCategorie: boolean;
}
