import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {CocktailApiService} from "./cocktail-api.service";
import {Drink} from "../models/cocktail";

@Injectable({
  providedIn: 'root'
})
export class DictionariesService {
  public glassListSubject: BehaviorSubject<Partial<Drink>[]> = new BehaviorSubject<Partial<Drink>[]>([]);
  public glassList$: Observable<Partial<Drink>[]> = this.glassListSubject.asObservable();

  public categoryListSubject: BehaviorSubject<Partial<Drink>[]> = new BehaviorSubject<Partial<Drink>[]>([]);
  public categoryList$: Observable<Partial<Drink>[]> = this.categoryListSubject.asObservable();

  public ingredientListSubject: BehaviorSubject<Partial<Drink>[]> = new BehaviorSubject<Partial<Drink>[]>([]);
  public ingredientList$: Observable<Partial<Drink>[]> = this.ingredientListSubject.asObservable();

  public alcoholicCategoryListSubject: BehaviorSubject<Partial<Drink>[]> = new BehaviorSubject<Partial<Drink>[]>([]);
  public alcoholicCategoryList$: Observable<Partial<Drink>[]> = this.alcoholicCategoryListSubject.asObservable();

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
