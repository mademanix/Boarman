type Alphabet =
  'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
type Alcoholic = 'Alcoholic' | 'Non_Alcoholic';

export interface QuerySearchParams {
  s: string; // name
  f: Alphabet; // first letter
  i: string; // ingredient
}

export interface QueryFilterParams {
  i: string; // name
  a: Alcoholic // is alcoholic?
  c: string // category
  g: string // glass type
}

export interface QueryLookupParams {
  i: number; // drink id
  iid: number; // ingredient id
}
