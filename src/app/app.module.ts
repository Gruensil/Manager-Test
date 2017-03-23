import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { EmotionComponent } from './emotion.component';
import { ContextUi } from './contextui.component';

import { ManagerService } from './services/manager.service';
import { GeolocationService } from './services/geolocation.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    EmotionComponent,
    ContextUi
  ],
  providers:[
    ManagerService,
    GeolocationService
  ],
  bootstrap: [ AppComponent, ContextUi ]
})
export class AppModule { }
