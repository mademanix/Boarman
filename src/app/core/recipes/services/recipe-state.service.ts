import {Injectable} from "@angular/core";
import {CocktailApiService} from "../../../shared/api/services/cocktail-api.service";
import {BehaviorSubject, finalize, map, Observable} from "rxjs";
import {Drink} from "../../../shared/api/models/cocktail";


@Injectable({
  providedIn: 'root'
})
export class RecipeStateService {
  public cocktailListSubject: BehaviorSubject<Partial<Drink>[]> = new BehaviorSubject([]);
  public cocktailList$: Observable<Partial<Drink>[]> = this.cocktailListSubject.asObservable();

  public loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  public drinkDetailsSubject: BehaviorSubject<Partial<Drink>> = new BehaviorSubject(null);
  public drinkDetails$: Observable<Partial<Drink>> = this.drinkDetailsSubject.asObservable();

  public countOfIngredients: number;

  private currentCocktailListState: Partial<Drink>[];

  constructor(private cocktailApiService: CocktailApiService) {
  }

  public fetchUniqueCocktailList(cocktailsList: string[]): void {
    if (!cocktailsList.length) {
      return;
    }

    this.currentCocktailListState = [];
    this.countOfIngredients = cocktailsList.length;
    this.loadingSubject.next(true);

    cocktailsList.forEach((cocktailName, index) => {
      const queryParams = {
        i: cocktailName,
      }
      this.cocktailApiService.filter(queryParams)
        .pipe(
          finalize(() => {
            if (index === cocktailsList.length - 1) {
              this.loadingSubject.next(false);
            }
          })
        ).subscribe(response => {
        this.currentCocktailListState = this.currentCocktailListState.concat(response);
        this.cocktailListSubject.next([]);
        if (index === cocktailsList.length - 1) {
          this.cocktailListSubject.next(this.currentCocktailListState);
        }

      });
    })
  }

  public fetchDrinkDetails(idDrink: number): void {
    const queryParams = {
      i: idDrink,
    }
    this.cocktailApiService.lookup(queryParams).pipe(
      map(drinks => drinks[0]),
    ).subscribe(drink => {
      this.drinkDetailsSubject.next(drink);
    })
  }
}
