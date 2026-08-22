import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
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
  @Input() columns: { field: string; header: string; width?: number; sortable: boolean, pipe?: string }[] = [];
  @Input() rows: number;
  @Input() rowType: string;
  @Input() loading: boolean = false;
  @Input() totalRecords = 0;
  @Input() globalSearchPlaceholder: string;
  @Output() lazyLoad = new EventEmitter<TableLazyLoadEvent>();
  @Output() globalSearch = new EventEmitter<string>();
  @ViewChild('dt2') table!: Table;

  resetPage() {
    this.table.first = 0;
  }

  loadData(event: TableLazyLoadEvent): void {
    this.lazyLoad.emit(event);
  }

  onGlobalSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.globalSearch.emit(value);
  }

  private readonly pipeMap: Record<string, any> = {
    date: new DatePipe('el-GR'),
    number: new DecimalPipe('el-GR'),
  };

  transformValue(value: any, pipeName?: string): any {
    if (!pipeName) {
      return value;
    }

    const pipe = this.pipeMap[pipeName];

    return pipe ? pipe.transform(value) : value;
  }
}
