import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private api: ApiService;

  constructor(apiService: ApiService) {
    this.api = apiService;
  }

  ngOnInit(): void {
    const form = document.getElementsByTagName('form')[0];

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('login') as HTMLInputElement;
      const password = document.getElementById('password') as HTMLInputElement;

      this.api.authenticate(username.value, password.value).pipe(
        catchError((error) => {
          if (error.status === 401) {
            return throwError('Mauvais identifiants');
          } else if (error.status === 404) {
            return throwError('Utilisateur inconnu');
          } else {
            return throwError('Serveur indisponible, réessayer plus tard');
          }
        })
      ).subscribe( (res) => {
        // Si on obtient une 200 du serveur, alors c'est bon :)
        localStorage.setItem('credentials', JSON.stringify({username: username.value, password: password.value}));
      });
    });
  }

}
