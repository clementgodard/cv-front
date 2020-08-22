import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static readonly URL: string = environment.ApiCV;
  private http: HttpClient;
  private result: Observable<any[]>;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getAllCategories(): Observable<any> {

    if (!this.result) {
      this.result = this.http.get<any[]>(ApiService.URL + 'categorie/')
        .pipe(shareReplay(1));
    }
    return this.result;
  }
}
