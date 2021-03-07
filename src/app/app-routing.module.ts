import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CvComponent } from './cv/cv.component';
import { LoginComponent } from './login/login.component';
import { IsSignedInGuard } from './guard/is-signed-in.guard';
import { AdminComponent } from './admin/admin.component';
import { IsNotSignInGuard } from './guard/is-not-sign-in.guard';
import { ListeComponent } from './admin/liste/liste.component';

const routes: Routes = [
  { path: '', component: CvComponent },
  { path: 'login', component: LoginComponent, canActivate: [IsNotSignInGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [IsSignedInGuard], children: [
    { path: 'liste', component: ListeComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
