import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { shareReplay } from 'rxjs/operators';
import { Categorie } from '../model/categorie';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static readonly URL: string = environment.ApiCV;
  private http: HttpClient;
  private result: Observable<Categorie[]>;

  public constructor(http: HttpClient) {
    this.http = http;
  }

  public getAllCategories(cache: boolean = true): Observable<Categorie[]> {

    if (!this.result) {
      this.result = this.http.get<Categorie[]>(ApiService.URL + 'categorie/');

      if (cache) {
        this.result.pipe(shareReplay(1));
      }
    }
    return this.result;
  }

  public authenticate(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization : 'Basic ' + btoa(username + ':' + password)
    });

    return this.http.get<boolean>(ApiService.URL + 'user/', { headers, params : {
      username
    }});
  }

  public deleteCategorie(id: number): Observable<boolean> {
    const credentials = JSON.parse(localStorage.getItem('credentials'));

    if (credentials === null) {
      return null;
    } else {
      const headers = new HttpHeaders({
        Authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      });

      return this.http.delete<boolean>(ApiService.URL + 'categorie/' + id, { headers });
    }
  }

  public deleteLigne(id: number): Observable<boolean> {
    const credentials = JSON.parse(localStorage.getItem('credentials'));

    if (credentials === null) {
      return null;
    } else {
      const headers = new HttpHeaders({
        Authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      });

      return this.http.delete<boolean>(ApiService.URL + 'ligne/' + id, { headers });
    }
  }
}
