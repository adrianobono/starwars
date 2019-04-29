import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { AppRoutingModule } from './app-routing.module';
import { GameComponent } from './game/game.component';
import { LoadComponent } from './load/load.component';
import { ErrorpageComponent } from './errorpage/errorpage.component'


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    GameComponent,
    LoadComponent,
    ErrorpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
