export interface Product {
  id: number;
  uuid: string;
  name: string;
  price: number;
  itemTypeId: number;
  description: string;
  unitId: number;
  quantity: number;
}

export interface ProductInsert {
  name: string;
  price: number;
  itemTypeId: number;
  description: string;
  unitId: number;
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
    name: 'ώρα'
  },
  {
    id: 2,
    name: 'ημέρα'
  },
  {
    id: 3,
    name: 'κγρ.'
  },
  {
    id: 4,
    name: 'μ.'
  },
  {
    id: 5,
    name: 'λτ.'
  }
];

export const productTypes: ItemType[] = [
  {
    id: 0,
    name: 'Προιόν'
  },
  {
    id: 1,
    name: 'Υπηρεσία'
  }
]

