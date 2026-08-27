import { Component, OnInit, signal } from '@angular/core';
import { CancelButton } from '../../ui/action-buttons-ui/cancel-button/cancel-button';
import { DeleteButton } from '../../ui/action-buttons-ui/delete-button/delete-button';
import { Dialog } from 'primeng/dialog';
import { EditButton } from '../../ui/action-buttons-ui/edit-button/edit-button';
import { SpinnerUi } from '../../ui/spinner-ui/spinner-ui';
import { ProductForm } from '../product-form/product-form';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product, productUnits } from '../../../models/product.model';
import { ProductService } from '../../../services/product-service';
import { TabService } from '../../../services/tab-service';

@Component({
  selector: 'app-product-view',
  imports: [CancelButton, DeleteButton, Dialog, EditButton, SpinnerUi, ProductForm],
  templateUrl: './product-view.html',
  styleUrl: './product-view.scss',
})
export class ProductView implements OnInit {
  product: Product;
  updateDialogVisible = signal(false);
  deleteDialogVisible = signal(false);
  uuid: string;
  loading = signal(true);
  protected readonly Object = Object;
  productFields = [
    { label: 'ΟΝΟΜΑΣΙΑ', key: 'name' },
    { label: 'ΠΕΡΙΓΡΑΦΗ', key: 'description' },
    { label: 'ΤΙΜΗ', key: 'price' },
    { label: 'ΠΟΣΟΤΗΤΑ', key: 'quantity' },
    { label: 'Μ.Μ', key: 'unit' },
  ];

  constructor(
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly tabService: TabService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.uuid = params.get('uuid');
    });
    this.fetchProduct();
  }

  getFieldValue(key: string) {
    switch (key) {
      case 'unit':
        return productUnits.find(unit => unit.id === this.product.unit).name;
      default:
        return this.product[key as keyof Product];
    }
  }

  edit(): void {
    this.updateDialogVisible.set(true);
  }

  delete(): void {
    this.deleteDialogVisible.set(true);
  }

  fetchProduct(): void {
    this.productService.getProduct(this.uuid).subscribe((product) => {
      this.product = product;
      this.loading.set(false);
    });
  }

  productUpdated(): void {
    this.fetchProduct();
    this.updateDialogVisible.set(false);
  }

  confirmDelete(): void {
    this.productService.deleteProduct(this.product.uuid).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Επιτυχία',
          detail: `Το προϊόν ${this.product.name} διαγράφηκε επιτυχώς`,
        });
        this.deleteDialogVisible.set(false);
        this.tabService.closeTab('product');
        this.tabService.setActive('/products');
        this.router.navigate(['/products']);

      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Σφάλμα',
          detail: `Το προϊόν ${this.product.name} δεν διαγράφηκε`,
        });
        this.deleteDialogVisible.set(false);
      },
    });
  }
}
