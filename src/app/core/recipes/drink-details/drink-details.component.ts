import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {Drink} from "../../../shared/api/models/cocktail";
import {RecipeStateService} from "../services/recipe-state.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-drink-details',
  templateUrl: './drink-details.component.html',
  styleUrls: ['./drink-details.component.scss']
})
export class DrinkDetailsComponent implements OnInit {
  public drinkDetails$: Observable<Partial<Drink>> = this.recipeStateService.drinkDetails$.pipe(
    map(drink => {
      if (!drink) {
        return;
      }
      let joinedIngredients: string = '';
      for (let i = 1; i <= 15; ++i) {
        const strIngredientKey = 'strIngredient' + i
        const strMeasureKey = 'strMeasure' + i
        if (!drink[strIngredientKey]) {
          break;
        }
        joinedIngredients += drink[strIngredientKey] + ' - ' + drink[strMeasureKey] + ',';
        drink[strIngredientKey] = '';
        drink[strMeasureKey] = '';
      }

      drink.strIngredient1 = joinedIngredients;
      return drink;
    })
  );

  constructor(
    private recipeStateService: RecipeStateService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    const idDrink = this.activatedRoute.snapshot.params['idDrink'];
    this.recipeStateService.fetchDrinkDetails(+idDrink)
  }
}
