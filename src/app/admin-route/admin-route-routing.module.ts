import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { CategorieFormComponent } from '../admin/categorie-form/categorie-form.component';
import { LigneFormComponent } from '../admin/ligne-form/ligne-form.component';
import { ListeComponent } from '../admin/liste/liste.component';
import { IsSignedInGuard } from '../guard/is-signed-in.guard';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouteRoutingModule { }
