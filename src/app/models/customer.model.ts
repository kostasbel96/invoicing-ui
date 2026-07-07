import { Region } from './region.model';

export interface CustomerInsert {
  firstname: string;
  lastname: string;
  email?: string;
  phone: string;
  address?: string;
  postalCode?: string;
  vat: string;
  companyName?: string;
  regionId: number;
}

export interface Customer {
  id: number;
  uuid: string;
  firstname: string;
  lastname: string;
  email?: string | null;
  phone: string;
  address: string;
  postalCode: string;
  vat?: string | null;
  companyName?: string | null;
  balance: number;
  region: Region;
}
