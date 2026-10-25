import { Routes } from '@angular/router';
import { CustomerForm } from './components/customer/customer-form/customer-form';
import { MainLayout } from './components/layout/main-layout/main-layout';
import { Dashboard } from './components/dashboard/dashboard/dashboard';
import { CustomerTable } from './components/customer/customer-table/customer-table';
import { CustomerView } from './components/customer/customer-view/customer-view';
import { ProductForm } from './components/product/product-form/product-form';
import { ProductTable } from './components/product/product-table/product-table';
import { ProductView } from './components/product/product-view/product-view';
import { ServiceItemTable } from './components/serviceItem/service-item-table/service-item-table';
import { ServiceItemForm } from './components/serviceItem/service-item-form/service-item-form';
import { ServiceItemView } from './components/serviceItem/service-item-view/service-item-view';

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
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductTable,
          },
          {
            path: 'new',
            component: ProductForm,
          },
          {
            path: ':uuid',
            component: ProductView,
          },
        ],
      },
      {
        path: 'serviceItems',
        children: [
          {
            path: '',
            component: ServiceItemTable,
          },
          {
            path: 'new',
            component: ServiceItemForm,
          },
          {
            path: ':uuid',
            component: ServiceItemView,
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
