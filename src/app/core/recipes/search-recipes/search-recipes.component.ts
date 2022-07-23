import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from "@angular/forms";
import {DictionariesService} from "../../../shared/api/services/dictionaries.service";
import {Observable, tap} from "rxjs";
import {Drink} from "../../../shared/api/models/cocktail";
import {MessageService} from "primeng/api";
import {RecipeStateService} from "../services/recipe-state.service";

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.scss']
})
export class SearchRecipesComponent implements OnInit {

  public searchRecipesForm: FormGroup;

  public glassList$: Observable<Partial<Drink>[]> = this.dictionariesService.glassList$;
  public ingredientList$: Observable<Partial<Drink>[]> = this.dictionariesService.ingredientList$.pipe(
    tap(ingredientList => {
      return ingredientList.sort((a, b) => a.strIngredient1.localeCompare(b.strIngredient1));
    })
  );
  public categoryList$: Observable<Partial<Drink>[]> = this.dictionariesService.categoryList$;
  public alcoholicCategoryList$: Observable<Partial<Drink>[]> = this.dictionariesService.alcoholicCategoryList$;

  constructor(
    private fb: FormBuilder,
    private dictionariesService: DictionariesService,
    private messageService: MessageService,
    private recipeStateService: RecipeStateService,
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
    // this.dictionariesService.fetchGlassesList();
    this.dictionariesService.fetchIngredientList();
    // this.dictionariesService.fetchCategoryList();
  }

  public onSearch(): void {
    this.searchRecipesForm.markAsTouched();
    if (this.searchRecipesForm.invalid) {
      return;
    }

    const values = this.searchRecipesForm.value.ingredients;

    if (values.length > 5) {
      this.messageService.add({
        severity: 'error',
        detail: 'Możesz wybrać max 5 składniki. W przeciwnym razie możesz dostać bana na API :O',
      })
      return;
    }

    this.recipeStateService.fetchUniqueCocktailList(values);
  }

  private initForm(): void {
    this.searchRecipesForm = this.fb.group({
      ingredients: [null, Validators.required],
      drinkName: [null]
    })
  }
}
