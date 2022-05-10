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
import { UtilsService } from './service/utils.service';
import { ToastrModule } from 'ngx-toastr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ApiService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
