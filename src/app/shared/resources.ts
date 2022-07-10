export const BASE_URL = 'https://thecocktaildb.com';
export const API_URL = '/api/json/v1/';
export const API_KEY = '1/';

export const RESOURCES = {
  COCKTAIL: {
    search: BASE_URL + API_URL + API_KEY + `search.php`,
    filter: BASE_URL + API_URL + API_KEY + `filter.php`,
    lookup: BASE_URL + API_URL + API_KEY + `lookup.php`,
    random: BASE_URL + API_URL + API_KEY + `random.php`,

    categoryList: BASE_URL + API_URL + API_KEY + `list.php?c=list`,
    glassList: BASE_URL + API_URL + API_KEY + `list.php?g=list`,
    ingredientList: BASE_URL + API_URL + API_KEY + `list.php?i=list`,
    alcoholicCategoryList: BASE_URL + API_URL + API_KEY + `list.php?a=list`,
  },
};
