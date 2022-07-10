import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators,} from "@angular/forms";
import {DictionariesService} from "../../../shared/api/services/dictionaries.service";
import {Observable, switchMap} from "rxjs";
import {Drink} from "../../../shared/api/models/cocktail";
import {MessageService} from "primeng/api";
import {CocktailApiService} from "../../../shared/api/services/cocktail-api.service";
import {isNil, mapValues, omitBy} from "lodash";
import {QuerySearchParams} from "../../../shared/api/models/query-params";

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.scss']
})
export class SearchRecipesComponent implements OnInit {

  public searchRecipesForm: FormGroup;

  public glassList$: Observable<Partial<Drink>[]> = this.dictionariesService.glassList$;
  public ingredientList$: Observable<Partial<Drink>[]> = this.dictionariesService.ingredientList$;
  public categoryList$: Observable<Partial<Drink>[]> = this.dictionariesService.categoryList$;
  public alcoholicCategoryList$: Observable<Partial<Drink>[]> = this.dictionariesService.alcoholicCategoryList$;

  private responseDrinks: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dictionariesService: DictionariesService,
    private messageService: MessageService,
    private cocktailApiService: CocktailApiService,
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
    // this.dictionariesService.fetchGlassesList();
    this.dictionariesService.fetchIngredientList();
    // this.dictionariesService.fetchCategoryList();
  }

  public onSearch(): void {
    this.responseDrinks = [];
    this.searchRecipesForm.markAsTouched();
    if (this.searchRecipesForm.invalid) {
      return;
    }

    const values = this.searchRecipesForm.value.ingredients;

    if (values.length > 4) {
      this.messageService.add({
        severity: 'error',
        detail: 'Możesz wybrać max 4 składniki',
      })
      return;
    }

    values.forEach(value => {
      this.cocktailApiService.filter({
        i: value,
      }).subscribe(drinks => this.responseDrinks.push(drinks));
    });


    console.log(this.responseDrinks);
    console.log(this.responseDrinks.reduce((a, b) => {
      return a.concat(b);
    }));
  }

  private initForm(): void {
    this.searchRecipesForm = this.fb.group({
      ingredients: [null, Validators.required],
      drinkName: [null]
    })
  }
}
