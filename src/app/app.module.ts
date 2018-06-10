import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './component/game/game.component';
import {ScoreComponent} from './component/score/score.component';
import {HelpComponent} from './component/help/help.component';
import {GameService} from './service/game.service';
import {HeaderComponent} from './component/header/header.component';
import {FieldComponent} from './component/field/field.component';
import {WaterTankComponent} from './component/water-tank/water-tank.component';
import {NewFieldComponent} from './component/new-field/new-field.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import { DialogComponent } from './component/dialog/dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    FieldComponent,
    WaterTankComponent,
    NewFieldComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule {
}
