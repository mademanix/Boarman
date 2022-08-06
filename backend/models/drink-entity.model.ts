export interface DrinkEntityModel {
  idxDrink: number;
  strDrink: string;
  strDrinkAlternate?: string;
  strTags: string;
  strVideo: string;
  strCategory: string;
  strIBA: string;
  strAlcoholic: string;
  strGlass: string;
  stlInstructions: string;
  stlInstructionsES?: string;
  stlInstructionsDE?: string;
  stlInstructionsFR?: string;
  stlInstructionsIT?: string;
  stlInstructionsZHHANS?: string;
  stlInstructionsZHHANT?: string;
  strDrinkThumb: string;
  strIngredient: string;
  strIngredientMeasures: string;
  stlImageSource: string;
  strImageAttribution: string;
  strCreativeCommonsConfirmed: string;
  strDateModified: string;
}

export interface Ingredients {
  idIngredient: number;
  strABV: string;
  strAlcohol: string;
  strDescription: string;
  strIngredient: string;
  strType: string; // TODO enum
}
