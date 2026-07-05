import { Routes } from '@angular/router';
import { CustomerForm } from './components/customer/customer-form/customer-form';
import { MainLayout } from './components/layout/main-layout/main-layout';
import { Dashboard } from './components/dashboard/dashboard/dashboard';
import { CustomerTable } from './components/customer/customer-table/customer-table/customer-table';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'customers',
        component: CustomerTable,
      },
      {
        path: 'customers/new',
        component: CustomerForm,
      },
      // {
      //   path: 'invoices',
      //   component: InvoiceListComponent,
      // },
    ],
  },
];
