import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsNotSignInGuard implements CanActivate {

  private router: Router;

  public constructor(router: Router) {
    this.router = router;
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const credentials = JSON.parse(localStorage.getItem('credentials'));

      if (credentials == null) {
        return true;
      } else {
        this.router.navigate(['admin']);
      }
  }
}
