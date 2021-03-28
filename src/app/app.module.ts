import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './cv/menu/menu.component';
import { MainComponent } from './cv/main/main.component';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { CategorieComponent } from './cv/main/categorie/categorie.component';
import { LigneComponent } from './cv/main/categorie/ligne/ligne.component';
import { SlugPipe } from './pipe/slug.pipe';
import { ChargementComponent } from './chargement/chargement.component';
import { CvComponent } from './cv/cv.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ListeComponent } from './admin/liste/liste.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { CategorieFormComponent } from './admin/categorie-form/categorie-form.component';
import { LigneFormComponent } from './admin/ligne-form/ligne-form.component';
import { FormsModule } from '@angular/forms';
import { UtilsService } from './service/utils.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainComponent,
    CategorieComponent,
    LigneComponent,
    SlugPipe,
    ChargementComponent,
    CvComponent,
    LoginComponent,
    AdminComponent,
    ListeComponent,
    AdminMenuComponent,
    CategorieFormComponent,
    LigneFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ApiService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
