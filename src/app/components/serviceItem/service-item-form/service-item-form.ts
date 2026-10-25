import { Component, Input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetButton } from '../../ui/action-buttons-ui/reset-button/reset-button';
import { SaveButton } from '../../ui/action-buttons-ui/save-button/save-button';
import { MessageService } from 'primeng/api';
import { ERROR_MESSAGES } from '../../../core/constants/error-messages';
import { ServiceItem, ServiceItemInsert } from '../../../models/serviceItem.model';
import { ServiceItemService } from '../../../services/service-item-service';

@Component({
  selector: 'app-service-item-form',
  imports: [FormsModule, ReactiveFormsModule, ResetButton, SaveButton],
  templateUrl: './service-item-form.html',
  styleUrl: './service-item-form.scss',
})
export class ServiceItemForm implements OnInit {
  @Input() serviceItem?: ServiceItem;
  @Input() mode: string = 'create';
  closed = output<void>();
  serviceItemForm: FormGroup;
  serviceItemToSubmit: ServiceItemInsert = {
    name: '',
    description: '',
    price: 1
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly serviceItemService: ServiceItemService,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit() {
    this.serviceItemForm = this.formBuilder.group({
      name: [
        this.serviceItem?.name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],
      description: [this.serviceItem?.description, [Validators.maxLength(50)]],
      price: [
        this.serviceItem?.price,
        [Validators.required, Validators.pattern(/^\d+([.,]\d{1,2})?$/)],
      ],
    });
  }

  onSubmit() {
    if (this.serviceItemForm.invalid) return;
    this.serviceItemToSubmit = {
      ...this.serviceItemForm.value,
      price: Number(String(this.serviceItemForm.value.price).replaceAll(',', '.'))
    };

    switch (this.mode) {
      case 'create':
        this.serviceItemService.addServiceItem(this.serviceItemToSubmit).subscribe({
          next: (serviceItem) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Επιτυχία',
              detail: `Η Υπηρεσία ${serviceItem.name} αποθηκεύτηκε επιτυχώς`,
            });
            this.onReset();
          },
          error: (error) => {
            console.error('Error adding serviceItem:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Σφάλμα',
              detail: ERROR_MESSAGES[error.error.code],
            });
          },
        });
        break;

      case 'update':
        this.serviceItemService.updateServiceItem(this.serviceItem.uuid, this.serviceItemToSubmit).subscribe({
          next: (serviceItem) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Επιτυχία',
              detail: `Η Υπηρεσία ${serviceItem.name} αποθηκεύτηκε επιτυχώς`,
            });
            this.closed.emit();
          },
          error: (error) => {
            console.error('Error adding serviceItem:', error);
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
    this.serviceItemForm.reset(({
      name: '',
      description: '',
      price: 1
    }));
  }
}
