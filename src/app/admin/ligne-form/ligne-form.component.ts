import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { Ligne } from 'src/app/model/Ligne';
import { ApiService } from 'src/app/service/api.service';
import { UtilsService } from 'src/app/service/utils.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ligne-form',
  templateUrl: './ligne-form.component.html',
  styleUrls: ['./ligne-form.component.scss']
})
export class LigneFormComponent implements OnInit {

  faCalendarAlt = faCalendarAlt;

  private api: ApiService;
  private util: UtilsService;

  public ligne: Ligne;
  public categories: Categorie[];

  public dateDebut: NgbDateStruct;
  public dateFin: NgbDateStruct;

  public constructor(api: ApiService, util: UtilsService) {
    this.api = api;
    this.util = util;

    this.refreshCategories();

    this.ligne = new Ligne();
  }

  public ngOnInit(): void { }

  public submitLigne(e: Event): void {
    e.preventDefault();

    this.api.addLigne(this.ligne).subscribe( (res) => {
      console.log(res);
      this.refreshCategories();
    });
  }

  private refreshCategories(): void {
    this.api.getAllCategories(false).subscribe((res) => {
      this.categories = this.util.extractCategories(res);
    });
  }
}
