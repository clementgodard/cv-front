import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ThrowStmt } from '@angular/compiler';

export interface CategorieCV {
  libelle: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public static readonly URL: string = environment.ApiCV;
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getAllCategories(): Observable<CategorieCV[]> {
    return this.http.get<CategorieCV[]>(ApiService.URL + 'categorie/');
  }
}
