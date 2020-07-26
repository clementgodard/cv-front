import { Component, OnInit } from '@angular/core';
import { ApiService, CategorieCV } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private apiService: ApiService;
  public categories: CategorieCV[];

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  ngOnInit(): void {
    this.apiService.getAllCategories().subscribe( value => {
      this.categories = value;
    });
  }

}
