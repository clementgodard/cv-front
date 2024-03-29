import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private api: ApiService;
  private router: Router;
  private toast: ToastrService;

  constructor(apiService: ApiService, router: Router, toastr: ToastrService) {
    this.api = apiService;
    this.router = router;
    this.toast = toastr;
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
            this.toast.warning('Mauvais identifiants', '', {closeButton: true});
            return throwError('Mauvais identifiants');
          } else if (error.status === 404) {
            this.toast.warning('Utilisateur inconnu', '', {closeButton: true});
            return throwError('Utilisateur inconnu');
          } else {
            this.toast.error('Serveur indisponible, réessayer plus tard', '', {closeButton: true});
            return throwError('Serveur indisponible, réessayer plus tard');
          }
        })
      ).subscribe( (res) => {
        // Si on obtient une 200 du serveur, alors c'est bon :)
        localStorage.setItem('credentials', JSON.stringify({username: username.value, password: password.value}));
        this.router.navigate(['/admin']);
      });
    });
  }

}
