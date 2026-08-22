export interface Product {
  id: number;
  uuid: string;
  name: string;
  price: number;
  description: string;
  unit: number;
  quantity: number;
}

export interface ProductInsert {
  name: string;
  price: number;
  description: string;
  unit: number;
  quantity: number;
}

export interface Unit {
  id: number;
  name: string;
}

export interface ItemType {
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

