import {NgModule} from '@angular/core';
import {RecipesRoutingModule} from "./recipes-routing.module";
import {RecipesComponent} from "./recipes.component";
import {SearchRecipesComponent} from './search-recipes/search-recipes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MessageService} from "primeng/api";
import {MultiSelectModule} from "primeng/multiselect";
import {SelectableChipsModule} from "../../shared/lib/slider-switch/selectable-chips.module";

@NgModule({
  declarations: [
    RecipesComponent,
    SearchRecipesComponent
  ],
  imports: [
    RecipesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MultiSelectModule,
    SelectableChipsModule,
  ],
  providers: [
    MessageService,
  ],
})
export class RecipesModule {
}
