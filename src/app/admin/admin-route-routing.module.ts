import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';
import { LigneFormComponent } from './ligne-form/ligne-form.component';
import { ListeComponent } from './liste/liste.component';
import { IsSignedInGuard } from '../guard/is-signed-in.guard';
import {AdminMenuComponent} from './admin-menu/admin-menu.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [IsSignedInGuard], children: [
    { path: 'liste', component: ListeComponent },
    { path: 'categorie', component: CategorieFormComponent },
    { path: 'categorie/:id', component: CategorieFormComponent },
    { path: 'ligne', component: LigneFormComponent },
    { path: 'ligne/:id', component: LigneFormComponent }
  ]}
];

@NgModule({
  declarations: [
    AdminComponent,
    ListeComponent,
    AdminMenuComponent,
    CategorieFormComponent,
    LigneFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [RouterModule]
})
export class AdminRouteRoutingModule { }
