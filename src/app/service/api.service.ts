import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {shareReplay} from 'rxjs/operators';
import {Categorie} from '../model/categorie';
import {Ligne} from '../model/ligne';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static readonly URL: string = environment.ApiCV;
  private http: HttpClient;
  private result: Observable<Categorie[]>;

  private static getHeaders(): HttpHeaders {
    const credentials = JSON.parse(localStorage.getItem('credentials'));

    if (credentials === null) {
      return null;
    } else {
      return new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa(credentials.username + ':' + credentials.password))
        .set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0')
        .set('Pragma', 'no-cache')
        .set('Expires', '0');
    }
  }

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

  public getCategorie(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(ApiService.URL + 'categorie/' + id);
  }

  public getLigne(id: number): Promise<Ligne> {
    return this.http.get<Ligne>(ApiService.URL + 'ligne/' + id).toPromise();
  }

  public getCategorieByLigne(ligne: Ligne): Observable<Categorie> {
    return this.http.get<Categorie>(ApiService.URL + 'ligne/categorie/' + ligne.id);
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
    const headers = ApiService.getHeaders();
    if (headers === null) {
      return null;
    } else {
      return this.http.delete<boolean>(ApiService.URL + 'categorie/' + id, { headers });
    }
  }

  public deleteLigne(id: number): Observable<boolean> {
      const headers = ApiService.getHeaders();
      if (headers === null) {
        return null;
      } else {
        return this.http.delete<boolean>(ApiService.URL + 'ligne/' + id, { headers });
      }
  }

  public addLigne(ligne: Ligne, image: File): Observable<boolean> {
    const headers = ApiService.getHeaders();
    if (headers === null) {
      return null;
    } else {
      const formData = new FormData();

      for (const key in ligne) {
        if (ligne.hasOwnProperty(key) && ligne[key] !== null) {
          formData.append(key, ligne[key]);
        }
      }

      if (image !== undefined) {
        formData.append('file', image, image.name);
      }

      return this.http.post<boolean>(ApiService.URL + 'ligne/', formData, {headers});
    }
  }

  public addCategorie(categorie: Categorie): Observable<boolean> {
    const headers = ApiService.getHeaders();
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

  public updateCategorie(categorie: Categorie): Observable<boolean> {
    const headers = ApiService.getHeaders();
    if (headers === null) {
      return null;
    } else {
      const formData = new FormData();

      this.buildFormData(formData, categorie, null);

      return this.http.put<boolean>(ApiService.URL + 'categorie/', formData, {headers});
    }
  }

  public updateLigne(ligne: Ligne): Observable<boolean> {
    const headers = ApiService.getHeaders();
    if (headers === null) {
      return null;
    } else {
      const formData = new FormData();

      this.buildFormData(formData, ligne, null);

      return this.http.put<boolean>(ApiService.URL + 'ligne/', formData, {headers});
    }
  }

  public patchCategorie(categorie: Categorie): Observable<boolean> {
    const headers = ApiService.getHeaders();
    if (headers === null) {
      return null;
    } else {
      const formData = new FormData();

      this.buildFormData(formData, categorie, null);

      return this.http.patch<boolean>(ApiService.URL + 'categorie/' + categorie.id, formData, {headers});
    }
  }

  public patchLigne(ligne: Ligne, image: File): Observable<boolean> {
    const headers = ApiService.getHeaders();
    if (headers === null) {
      return null;
    } else {
      const formData = new FormData();

      this.buildFormData(formData, ligne, null);

      if (image !== undefined) {
        formData.append('file', image, image.name);
        console.log('file added');
      }

      return this.http.patch<boolean>(ApiService.URL + 'ligne/' + ligne.id, formData, {headers});
    }
  }

  private buildFormData(formData: FormData, data: any, parentKey: any): any {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
        this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
      formData.append(parentKey, value);
    }
  }
}
