import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main/main.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { CategorieComponent } from './main/categorie/categorie.component';
import { LigneComponent } from './main/categorie/ligne/ligne.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SlugPipe } from './slug.pipe';
import { ChargementComponent } from './chargement/chargement.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainComponent,
    CategorieComponent,
    LigneComponent,
    SlugPipe,
    ChargementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
