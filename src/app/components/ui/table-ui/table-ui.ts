import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer-service';
import { FormsModule } from '@angular/forms';

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
  ],
  templateUrl: './table-ui.html',
  styleUrl: './table-ui.scss',
})
export class TableUi<T> {
  @Input() data: T[] = [];
  @Input() columns: { field: string; header: string }[] = [];
  @Input() rows: number = 10;
  value = 's';

  @Input() loading: boolean = false;

  activityValues: number[] = [0, 100];

  clear(table: Table) {
    table.clear();
  }
}
