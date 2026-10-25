export interface Item {
  id: number;
  uuid: string;
  name: string;
  price: number;
  description: string;
}

export interface ItemInsert {
  name: string;
  price: number;
  description: string;
}
