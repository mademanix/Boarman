import {Component} from '@angular/core';
import {filter, map, Observable} from "rxjs";
import {Drink} from "../../../shared/api/models/cocktail";
import {RecipeStateService} from "../services/recipe-state.service";

@Component({
  selector: 'app-result-list-recipes',
  templateUrl: './result-list-recipes.component.html',
  styleUrls: ['./result-list-recipes.component.scss']
})
export class ResultListRecipesComponent {
  public loading$: Observable<boolean> = this.recipeStateService.loading$;

  public commonCocktailList$: Observable<Partial<Drink>[]> = this.recipeStateService.cocktailList$.pipe(
    map(cocktailList => {
      if (!cocktailList.length) {
        return [];
      }

      if (this.recipeStateService.countOfIngredients === 1) {
        return cocktailList;
      }

      const sortedCocktails = cocktailList.sort((a, b) => {
        if (a.strDrink < b.strDrink) {
          return -1;
        }

        if (a.strDrink > b.strDrink) {
          return 1;
        }

        return 0;
      });

      const commonCocktails = [];

      let ingredientsCounter = 1;

      for (let i = 0; i <= sortedCocktails.length - 2; ++i) {
        if (sortedCocktails[i].strDrink === sortedCocktails[i + 1].strDrink) {
          ingredientsCounter++;
          if (ingredientsCounter === this.recipeStateService.countOfIngredients) {
            commonCocktails.push(sortedCocktails[i]);
            ingredientsCounter = 1;
          }
        } else {
          ingredientsCounter = 1;
        }
      }

      return commonCocktails;
    }),
  );

  constructor(private recipeStateService: RecipeStateService) {
  }
}
