import { Component, OnInit, signal } from '@angular/core';
import { CancelButton } from '../../ui/action-buttons-ui/cancel-button/cancel-button';
import { DeleteButton } from '../../ui/action-buttons-ui/delete-button/delete-button';
import { DetailsItemUi } from '../../ui/details-item-ui/details-item-ui';
import { Dialog } from 'primeng/dialog';
import { SpinnerUi } from '../../ui/spinner-ui/spinner-ui';
import { ServiceItemForm } from '../service-item-form/service-item-form';
import { DetailField } from '../../../models/details-field.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TabService } from '../../../services/tab-service';
import { ServiceItem } from '../../../models/serviceItem.model';
import { ServiceItemService } from '../../../services/service-item-service';

@Component({
  selector: 'app-service-item-view',
  imports: [CancelButton, DeleteButton, DetailsItemUi, Dialog, SpinnerUi, ServiceItemForm],
  templateUrl: './service-item-view.html',
  styleUrl: './service-item-view.scss',
})
export class ServiceItemView implements OnInit {
  serviceItem: ServiceItem;
  updateDialogVisible = signal(false);
  deleteDialogVisible = signal(false);
  uuid: string;
  loading = signal(true);
  protected readonly Object = Object;
  serviceItemFields: DetailField<ServiceItem>[] = [
    { label: 'ΟΝΟΜΑΣΙΑ', key: 'name' },
    { label: 'ΠΕΡΙΓΡΑΦΗ', key: 'description' },
    { label: 'ΤΙΜΗ', key: 'price' }
  ];

  constructor(
    private readonly serviceItemService: ServiceItemService,
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly tabService: TabService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.uuid = params.get('uuid');
    });
    this.fetchServiceItem();
  }

  edit(): void {
    this.updateDialogVisible.set(true);
  }

  delete(): void {
    this.deleteDialogVisible.set(true);
  }

  fetchServiceItem(): void {
    this.serviceItemService.getServiceItem(this.uuid).subscribe((serviceItem) => {
      this.serviceItem = serviceItem;
      this.loading.set(false);
    });
  }

  serviceItemUpdated(): void {
    this.fetchServiceItem();
    this.updateDialogVisible.set(false);
  }

  confirmDelete(): void {
    this.serviceItemService.deleteServiceItem(this.serviceItem.uuid).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Επιτυχία',
          detail: `Η υπηρεσία ${this.serviceItem.name} διαγράφηκε επιτυχώς`,
        });
        this.deleteDialogVisible.set(false);
        this.tabService.closeTab('serviceItem');
        this.tabService.setActive('/serviceItems');
        this.router.navigate(['/serviceItems']);
      },
      error: (error) => {
        console.error('Error deleting serviceItem:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Σφάλμα',
          detail: `Η υπηρεσία ${this.serviceItem.name} δεν διαγράφηκε`,
        });
        this.deleteDialogVisible.set(false);
      },
    });
  }
}
