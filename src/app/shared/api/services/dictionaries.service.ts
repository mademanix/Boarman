import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {CocktailApiService} from "./cocktail-api.service";
import {PartialDrink} from "../models/cocktail";

@Injectable({
  providedIn: 'root'
})
export class DictionariesService {
  public glassListSubject: BehaviorSubject<PartialDrink[]> = new BehaviorSubject<PartialDrink[]>([]);
  public glassList$: Observable<PartialDrink[]> = this.glassListSubject.asObservable();

  public categoryListSubject: BehaviorSubject<PartialDrink[]> = new BehaviorSubject<PartialDrink[]>([]);
  public categoryList$: Observable<PartialDrink[]> = this.categoryListSubject.asObservable();

  public ingredientListSubject: BehaviorSubject<PartialDrink[]> = new BehaviorSubject<PartialDrink[]>([]);
  public ingredientList$: Observable<PartialDrink[]> = this.ingredientListSubject.asObservable();

  public alcoholicCategoryListSubject: BehaviorSubject<PartialDrink[]> = new BehaviorSubject<PartialDrink[]>([]);
  public alcoholicCategoryList$: Observable<PartialDrink[]> = this.alcoholicCategoryListSubject.asObservable();

  constructor(private cocktailApiService: CocktailApiService) {
  }

  public fetchAllDictionaries(): void {
    this.fetchGlassesList();
    this.fetchCategoryList();
    this.fetchIngredientList();
    this.fetchAlcoholicCategoryList();
  }

  public fetchGlassesList(): void {
    this.cocktailApiService.glassList().subscribe((glasses) => {
      this.glassListSubject.next(glasses);
    })
  }

  public fetchCategoryList(): void {
    this.cocktailApiService.categoryList().subscribe((categories) => {
      this.categoryListSubject.next(categories);
    })
  }

  public fetchIngredientList(): void {
    this.cocktailApiService.ingredientList().subscribe((ingredients) => {
      this.ingredientListSubject.next(ingredients);
    })
  }

  public fetchAlcoholicCategoryList(): void {
    this.cocktailApiService.alcoholicCategoryList().subscribe((alcoholicCategories) => {
      this.alcoholicCategoryListSubject.next(alcoholicCategories);
    })
  }

}
