import { Component, input, output } from '@angular/core';
import { EditButton } from '../action-buttons-ui/edit-button/edit-button';
import { DeleteButton } from '../action-buttons-ui/delete-button/delete-button';
import { SpinnerUi } from '../spinner-ui/spinner-ui';
import { DetailField } from '../../../models/details-field.model';

@Component({
  selector: 'app-details-item-ui',
  imports: [EditButton, DeleteButton, SpinnerUi],
  templateUrl: './details-item-ui.html',
  styleUrl: './details-item-ui.scss',
})
export class DetailsItemUi<T extends Record<string, any>> {
  item = input<T | null>(null);
  fields = input<DetailField<T>[]>([]);
  loading = input(false);

  title = input('Πληροφορίες');
  subtitle = input('Στοιχεία και βασικές πληροφορίες');
  sectionTitle = input('Γενικά στοιχεία');

  editAction = output<void>();
  deleteAction = output<void>();

  getFieldValue(key: keyof T): any {
    const field = this.fields().find((f) => f.key === key);
    if (field?.getValue) {
      return field.getValue();
    }
    return this.item()?.[key];
  }

  edit(): void {
    this.editAction.emit();
  }

  delete(): void {
    this.deleteAction.emit();
  }
}
