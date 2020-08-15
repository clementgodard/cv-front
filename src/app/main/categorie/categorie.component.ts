import { Component, OnInit, Input } from '@angular/core';
import { CategorieCV } from 'src/app/api.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  @Input()
  public categorie: any;

  @Input()
  public sousCategorie: boolean;

  constructor() {
    this.sousCategorie = false;
  }

  ngOnInit(): void {
  }

}
