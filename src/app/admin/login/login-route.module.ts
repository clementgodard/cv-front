import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login.component';
import {IsNotSignInGuard} from '../../guard/is-not-sign-in.guard';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [IsNotSignInGuard]
  }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoginRouteModule { }
