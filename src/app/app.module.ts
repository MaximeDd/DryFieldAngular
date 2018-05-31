import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './game/game.component';
import {ScoreComponent} from './score/score.component';
import {HelpComponent} from './help/help.component';
import {GameService} from './service/game.service';
import { HeaderComponent } from './header/header.component';
import { FieldComponent } from './field/field.component';

const appRoutes: Routes = [
  {path: 'game', component: GameComponent},
  {path: 'help', component: HelpComponent},
  {path: 'score', component: ScoreComponent},
  {path: '', redirectTo: 'game', pathMatch: 'full'},
  {path: '**', redirectTo: 'game'}
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ScoreComponent,
    HelpComponent,
    HeaderComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
