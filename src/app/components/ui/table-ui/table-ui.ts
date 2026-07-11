import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewRowButton } from '../action-buttons-ui/view/view-row-button/view-row-button';
import { LazyLoadEvent } from 'primeng/api';

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
  @Input() rows: number;
  @Input() rowType: string;
  @Input() loading: boolean = false;
  @Input() totalRecords = 0;
  @Output() lazyLoad = new EventEmitter<TableLazyLoadEvent>();
  @Output() globalSearch = new EventEmitter<string>();
  selectedItems: T[] = [];

  activityValues: number[] = [0, 100];

  clear(table: Table) {
    table.clear();
  }

  loadData(event: TableLazyLoadEvent): void {
    this.lazyLoad.emit(event);
  }

  onGlobalSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.globalSearch.emit(value);
  }
}
