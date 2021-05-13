import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CvComponent } from './cv/cv.component';
import { LoginComponent } from './admin/login/login.component';
import { IsNotSignInGuard } from './guard/is-not-sign-in.guard';

const routes: Routes = [
  { path: '', component: CvComponent },
  { path: 'login', component: LoginComponent, canActivate: [IsNotSignInGuard] },
  // { path: 'admin', component: AdminComponent, canActivate: [IsSignedInGuard], children: [
  //   { path: 'liste', component: ListeComponent },
  //   { path: 'categorie', component: CategorieFormComponent },
  //   { path: 'categorie/:id', component: CategorieFormComponent },
  //   { path: 'ligne', component: LigneFormComponent },
  //   { path: 'ligne/:id', component: LigneFormComponent }
  // ] },
  { path: 'admin', loadChildren: () => import('./admin-route/admin-route.module').then(m => m.AdminRouteModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
