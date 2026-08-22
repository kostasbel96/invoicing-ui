import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { TableUi } from '../../ui/table-ui/table-ui';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { TableLazyLoadEvent } from 'primeng/table';
import { Product, productUnits } from '../../../models/product.model';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-product-table',
  imports: [TableUi],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss',
})
export class ProductTable implements OnInit {
  columns = [
    { field: 'id', header: 'Α/Α', width: 5, sortable: false },
    { field: 'name', header: 'Ονομασία', width: 9, sortable: true },
    { field: 'description', header: 'Περιγραφή', width: 10, sortable: true },
    { field: 'price', header: 'Τιμή', width: 10, sortable: true, pipe: 'number' },
    { field: 'unitName', header: 'M.M', width: 10, sortable: false },
    { field: 'quantity', header: 'Ποσότητα', width: 15, sortable: true, pipe: 'number' },
  ];
  data: Product[] = [];
  loading = signal<boolean>(true);
  rows: number = 10;
  totalRecords: number = 0;
  searchSubject = new Subject<string>();
  currentSearch: string = '';
  lastLazyEvent: TableLazyLoadEvent = {
    first: 0,
    rows: this.rows,
  };
  @ViewChild(TableUi) table: TableUi<Product>;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((search) => {
      this.table.resetPage();
      this.currentSearch = search;
      this.loadProducts({ ...this.lastLazyEvent, first: 0 });
    });
  }

  loadProducts(event: TableLazyLoadEvent): void {
    this.lastLazyEvent = event;
    const page = (event.first ?? 0) / (this.rows ?? 10);
    const pageSize = this.rows ?? 10;
    const sortField = Array.isArray(event.sortField) ? event.sortField[0] : event.sortField;

    const sortOrder = event.sortOrder === 1 ? 'ASC' : 'DESC';
    this.loading.set(true);

    this.productService
      .getProducts(page, pageSize, this.currentSearch, sortField, sortOrder)
      .subscribe((response) => {
        this.data = response.data.map((product) => (
          {...product, unitName: productUnits.find(unit => unit.id === product.unit).name}
        ));
        this.totalRecords = response.totalRecords;
        this.loading.set(false);
      });
  }

  onSearch(search: string): void {
    this.searchSubject.next(search);
  }
}
