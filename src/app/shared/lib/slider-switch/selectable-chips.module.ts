import {NgModule} from '@angular/core';
import {SliderModule} from 'primeng/slider';
import {SelectableChipsComponent} from "./selectable-chips.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CheckboxModule} from "primeng/checkbox";

@NgModule({
  declarations: [
    SelectableChipsComponent
  ],
  imports: [
    SliderModule,
    FormsModule,
    CommonModule,
    CheckboxModule,
  ],
  exports: [
    SelectableChipsComponent
  ],
})
export class SelectableChipsModule {
}
