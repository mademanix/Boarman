import {Injectable} from "@angular/core";
import {CocktailApiService} from "../../../shared/api/services/cocktail-api.service";


@Injectable({
  providedIn: 'root'
})
export class RecipeStateService {
  constructor(private cocktailApiService: CocktailApiService) {}
}
