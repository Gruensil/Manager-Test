import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { EmotionComponent } from './emotion.component';
import { ContextUi } from './contextui.component';

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
  bootstrap: [ AppComponent, ContextUi ]
})
export class AppModule { }
