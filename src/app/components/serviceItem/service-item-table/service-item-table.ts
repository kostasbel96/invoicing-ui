import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { TableUi } from '../../ui/table-ui/table-ui';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { TableLazyLoadEvent } from 'primeng/table';
import { ServiceItem } from '../../../models/serviceItem.model';
import { ServiceItemService } from '../../../services/service-item-service';

@Component({
  selector: 'app-service-item-table',
  imports: [TableUi],
  templateUrl: './service-item-table.html',
  styleUrl: './service-item-table.scss',
})
export class ServiceItemTable implements OnInit {
  columns = [
    { field: 'id', header: 'Α/Α', width: 5, sortable: false },
    { field: 'name', header: 'Ονομασία', width: 9, sortable: true },
    { field: 'description', header: 'Περιγραφή', width: 10, sortable: true },
    { field: 'price', header: 'Τιμή', width: 10, sortable: true, pipe: 'number' }
  ];
  data: ServiceItem[] = [];
  loading = signal<boolean>(true);
  rows: number = 10;
  totalRecords: number = 0;
  searchSubject = new Subject<string>();
  currentSearch: string = '';
  lastLazyEvent: TableLazyLoadEvent = {
    first: 0,
    rows: this.rows,
  };
  @ViewChild(TableUi) table: TableUi<ServiceItem>;

  constructor(private readonly serviceItemService: ServiceItemService) {}

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((search) => {
      this.table.resetPage();
      this.currentSearch = search;
      this.loadServiceItems({ ...this.lastLazyEvent, first: 0 });
    });
  }

  loadServiceItems(event: TableLazyLoadEvent): void {
    this.lastLazyEvent = event;
    const page = (event.first ?? 0) / (this.rows ?? 10);
    const pageSize = this.rows ?? 10;
    const sortField = Array.isArray(event.sortField) ? event.sortField[0] : event.sortField;

    const sortOrder = event.sortOrder === 1 ? 'ASC' : 'DESC';
    this.loading.set(true);

    this.serviceItemService
      .getServiceItems(page, pageSize, this.currentSearch, sortField, sortOrder)
      .subscribe((response) => {
        this.data = response.data.map((serviceItem) => ({
          ...serviceItem
        }));
        this.totalRecords = response.totalRecords;
        this.loading.set(false);
      });
  }

  onSearch(search: string): void {
    this.searchSubject.next(search);
  }
}
