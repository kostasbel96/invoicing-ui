import { Component, Input } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewRowButton } from '../action-buttons-ui/view/view-row-button/view-row-button';

@Component({
  selector: 'app-table-ui',
  imports: [
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    CommonModule,
    FormsModule,
    ViewRowButton,
  ],
  templateUrl: './table-ui.html',
  styleUrl: './table-ui.scss',
})
export class TableUi<T> {
  @Input() data: T[] = [];
  @Input() columns: { field: string; header: string; width?: number }[] = [];
  @Input() rows: number = 10;
  @Input() rowType: string;
  value = 's';
  selectedItems: T[] = [];

  @Input() loading: boolean = false;

  activityValues: number[] = [0, 100];

  clear(table: Table) {
    table.clear();
  }
}
