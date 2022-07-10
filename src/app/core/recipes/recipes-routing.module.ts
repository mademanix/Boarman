import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipesComponent} from "./recipes.component";

const routes: Routes = [
  {
    component: RecipesComponent,
    title: 'Szukaj przepisu',
    path: 'search'
  },
  {
    path: '**',
    redirectTo: 'search'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
