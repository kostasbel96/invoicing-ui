import { Component, Input, OnInit, output} from '@angular/core';
import { ResetButton } from '../../ui/action-buttons-ui/reset-button/reset-button';
import { SaveButton } from '../../ui/action-buttons-ui/save-button/save-button';
import {
  Product,
  ProductInsert,
  productUnits,
  Unit,
} from '../../../models/product.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../services/product-service';
import { ERROR_MESSAGES } from '../../../core/constants/error-messages';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-product-form',
  imports: [ResetButton, SaveButton, ReactiveFormsModule, Select],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {
  @Input() product?: Product;
  @Input() mode: string = 'create';
  units: Unit[] = productUnits;
  closed = output<void>();
  productForm: FormGroup;
  productToSubmit: ProductInsert = {
    name: '',
    description: '',
    price: 1,
    quantity: 1,
    unit: 0,
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [
        this.product?.name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],
      description: [this.product?.description, [Validators.maxLength(50)]],
      price: [
        this.product?.price,
        [Validators.required, Validators.pattern(/^\d+([.,]\d{1,2})?$/)],
      ],
      quantity: [
        this.product?.quantity,
        [Validators.required, Validators.pattern(/^\d+([.,]\d{1,2})?$/)],
      ],
      unit: [this.product?.unit, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;
    this.productToSubmit = {
      ...this.productForm.value,
      quantity: Number(String(this.productForm.value.quantity).replaceAll(',', '.')),
      price: Number(String(this.productForm.value.price).replaceAll(',', '.')),
      unit: Number(this.productForm.value.unit),
    };

    switch (this.mode) {
      case 'create':
        this.productService.addProduct(this.productToSubmit).subscribe({
          next: (product) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Επιτυχία',
              detail: `Το Προιόν ${product.name} αποθηκεύτηκε επιτυχώς`,
            });
            this.onReset();
          },
          error: (error) => {
            console.error('Error adding product:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Σφάλμα',
              detail: ERROR_MESSAGES[error.error.code],
            });
          },
        });
        break;

      case 'update':
        this.productService.updateProduct(this.product.uuid, this.productToSubmit).subscribe({
          next: (product) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Επιτυχία',
              detail: `Το Προιόν ${product.name} αποθηκεύτηκε επιτυχώς`,
            });
            this.closed.emit();
          },
          error: (error) => {
            console.error('Error adding product:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Σφάλμα',
              detail: ERROR_MESSAGES[error.error.code],
            });
          },
        });
        break;
    }
  }

  onReset() {
    this.productForm.reset({
      name: '',
      description: '',
      price: 1,
      quantity: 1,
      unit: 0,
    });
  }
}
