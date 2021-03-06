import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './cv/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './cv/main/main.component';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { CategorieComponent } from './cv/main/categorie/categorie.component';
import { LigneComponent } from './cv/main/categorie/ligne/ligne.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SlugPipe } from './pipe/slug.pipe';
import { ChargementComponent } from './chargement/chargement.component';
import { CvComponent } from './cv/cv.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainComponent,
    CategorieComponent,
    LigneComponent,
    SlugPipe,
    ChargementComponent,
    CvComponent
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
