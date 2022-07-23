import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from "./core/recipes/recipes.component";
import {DrinkDetailsComponent} from "./core/recipes/drink-details/drink-details.component";

const routes: Routes = [
  {
    component: RecipesComponent,
    title: 'Szukaj przepisu',
    path: 'search'
  },
  {
    component: DrinkDetailsComponent,
    title: 'Szczegóły',
    path: 'drink/:idDrink'
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
export class AppRoutingModule {
}
