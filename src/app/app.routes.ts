import { Routes } from '@angular/router';
import { CustomerForm } from './components/customer/customer-form/customer-form';
import { MainLayout } from './components/layout/main-layout/main-layout';
import { Dashboard } from './components/dashboard/dashboard/dashboard';
import { CustomerTable } from './components/customer/customer-table/customer-table/customer-table';
import { CustomerView } from './components/customer/customer-view/customer-view';

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
        children: [
          {
            path: '',
            component: CustomerTable,
          },
          {
            path: 'new',
            component: CustomerForm,
          },
          {
            path: ':uuid',
            component: CustomerView,
          },
        ],
      },

      // {
      //   path: 'invoices',
      //   component: InvoiceListComponent,
      // },
    ],
  },
];
