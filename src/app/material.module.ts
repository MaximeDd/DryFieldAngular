import {NgModule} from '@angular/core';
import * as md from '@angular/material';

@NgModule({
  imports: [
    md.MatDialogModule,
    md.MatFormFieldModule,
    md.MatInputModule
  ],
  exports: [
    md.MatDialogModule,
    md.MatFormFieldModule,
    md.MatInputModule
  ],
  declarations: []
})
export class MaterialModule {
}
