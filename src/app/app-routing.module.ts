import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoadComponent } from './load/load.component';
import { GameComponent } from './game/game.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';


const routes: Route[] = [
  {path:'', redirectTo:'/load', pathMatch:'full'},
  {path:'load', component: LoadComponent},
  {path:'game',component: GameComponent,
  },
  {path:'**', component: ErrorpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
