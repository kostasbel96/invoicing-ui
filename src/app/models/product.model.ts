import { Item, ItemInsert } from './item.model';

export interface Product extends Item{
  unit: number;
  quantity: number;
}

export interface ProductInsert extends ItemInsert{
  unit: number;
  quantity: number;
}

export interface Unit {
  id: number;
  name: string;
}

export const productUnits: Unit[] = [
  {
    id: 0,
    name: 'τμχ'
  },
  {
    id: 1,
    name: 'κγρ.'
  },
  {
    id: 2,
    name: 'μ.'
  },
  {
    id: 3,
    name: 'λτ.'
  }
];

