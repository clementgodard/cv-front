import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { shareReplay } from 'rxjs/operators';
import { Categorie } from '../model/categorie';
import { ThrowStmt } from '@angular/compiler';
import { Ligne } from '../model/Ligne';

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

  public getAllCategories(cache: boolean = true, onlyActive: boolean = true): Observable<Categorie[]> {
    // TODO: Fix cache problem
    if (!this.result) {
      this.result = this.http.get<Categorie[]>(ApiService.URL + 'categorie/', {
        params: {
          actif: '' + onlyActive,
        }
      });

      this.result.pipe(shareReplay(1));
    }
    return this.result;
  }

  public authenticate(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization : 'Basic ' + btoa(username + ':' + password)
    })
      .set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0')
      .set('Pragma', 'no-cache')
      .set('Expires', '0');

    return this.http.get<boolean>(ApiService.URL + 'user/', {
      headers,
      params: {
        username
      }
    });
  }

  public deleteCategorie(id: number): Observable<boolean> {
    const headers = this.getHeaders();
    if (headers === null) {
      return null;
    } else {
      return this.http.delete<boolean>(ApiService.URL + 'categorie/' + id, { headers });
    }
  }

  public deleteLigne(id: number): Observable<boolean> {
      const headers = this.getHeaders();
      if (headers === null) {
        return null;
      } else {
        return this.http.delete<boolean>(ApiService.URL + 'ligne/' + id, { headers });
      }
  }

  private getHeaders(): HttpHeaders {
    const credentials = JSON.parse(localStorage.getItem('credentials'));

    if (credentials === null) {
      return null;
    } else {
      const headers = new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa(credentials.username + ':' + credentials.password))
        .set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0')
        .set('Pragma', 'no-cache')
        .set('Expires', '0');

      return headers;
    }
  }

  public addLigne(ligne: Ligne): Observable<boolean> {
    const headers = this.getHeaders();
    if (headers === null) {
      return null;
    } else {
      const formData = new FormData();

      for (const key in ligne) {
        if (ligne.hasOwnProperty(key)) {
          formData.append(key, ligne[key]);
        }
      }

      return this.http.post<boolean>(ApiService.URL + 'ligne/', formData, {headers});
    }
  }

  public addCategorie(categorie: Categorie): Observable<boolean> {
    const headers = this.getHeaders();
    if (headers === null) {
      return null;
    } else {
      const formData = new FormData();

      for (const key in categorie) {
        if (categorie.hasOwnProperty(key)) {
          formData.append(key, categorie[key]);
        }
      }

      return this.http.post<boolean>(ApiService.URL + 'categorie/', formData, {headers});
    }
  }

  public getCategorieParentId(categorie: Categorie): Observable<number> {
    return this.http.get<number>(ApiService.URL + 'categorie/parent/' + categorie.id);
  }

  public toggleActiveCategorie(categorie: Categorie): Observable<boolean> {
    const headers = this.getHeaders();
    if (headers === null) {
      return null;
    } else {
      const formData = new FormData();

      categorie.active = !categorie.active;

      for (const key in categorie) {
        if (categorie.hasOwnProperty(key)) {
          formData.append(key, categorie[key]);
        }
      }

      return this.http.put<boolean>(ApiService.URL + 'categorie/', formData, {headers});
    }
  }

  public toggleActiveLigne(ligne: Ligne): Observable<boolean> {
    const headers = this.getHeaders();
    if (headers === null) {
      return null;
    } else {
      const formData = new FormData();

      ligne.active = !ligne.active;

      for (const key in ligne) {
        if (ligne.hasOwnProperty(key)) {
          formData.append(key, ligne[key]);
        }
      }

      return this.http.put<boolean>(ApiService.URL + 'ligne/', formData, {headers});
    }
  }
}
