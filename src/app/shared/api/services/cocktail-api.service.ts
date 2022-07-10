import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Drink} from "../models/cocktail";
import {RESOURCES} from "../../resources";
import {isNil, omitBy} from 'lodash'
import {QueryFilterParams, QueryLookupParams, QuerySearchParams} from "../models/query-params";

@Injectable({
  providedIn: 'root'
})
export class CocktailApiService {

  constructor(private http: HttpClient) {
  }

  public search(querySearchParams: Partial<QuerySearchParams>): Observable<Partial<Drink>[]> {
    const httpParams = new HttpParams({fromObject: omitBy(querySearchParams, isNil)});
    return this.http.get<Partial<Drink>[]>(RESOURCES.COCKTAIL.search, {params: httpParams});
  }

  public filter(queryFilterParams: Partial<QueryFilterParams>): Observable<Partial<Drink>[]> {
    const httpParams = new HttpParams({fromObject: omitBy(queryFilterParams, isNil)});
    return this.http.get<Partial<Drink>[]>(RESOURCES.COCKTAIL.filter, {params: httpParams});
  }

  public lookup(queryLookupParams: Partial<QueryLookupParams>): Observable<Partial<Drink>[]> {
    const httpParams = new HttpParams({fromObject: omitBy(queryLookupParams, isNil)});
    return this.http.get<Partial<Drink>[]>(RESOURCES.COCKTAIL.lookup, {params: httpParams});
  }

  public categoryList(): Observable<Partial<Drink>[]> {
    return this.http.get<Partial<Drink>[]>(RESOURCES.COCKTAIL.categoryList);
  }

  public glassList(): Observable<Partial<Drink>[]> {
    return this.http.get<Partial<Drink>[]>(RESOURCES.COCKTAIL.glassList);
  }

  public ingredientList(): Observable<Partial<Drink>[]> {
    return this.http.get<Partial<Drink>[]>(RESOURCES.COCKTAIL.ingredientList);
  }

  public alcoholicCategoryList(): Observable<Partial<Drink>[]> {
    return this.http.get<Partial<Drink>[]>(RESOURCES.COCKTAIL.alcoholicCategoryList);
  }

}
