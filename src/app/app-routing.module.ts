import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CvComponent } from './cv/cv.component';
import { LoginComponent } from './admin/login/login.component';
import { IsNotSignInGuard } from './guard/is-not-sign-in.guard';

const routes: Routes = [
  { path: '', component: CvComponent },
  { path: 'login', loadChildren: () => import('./admin/login/login-route.module').then(m => m.LoginRouteModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin-route-routing.module').then(m => m.AdminRouteRoutingModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
