import { Component, Input } from '@angular/core';
import { TabService } from '../../../../../services/tab-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-row-button',
  imports: [],
  templateUrl: './view-row-button.html',
  styleUrl: './view-row-button.scss',
})
export class ViewRowButton {
  @Input() rowId: string;
  @Input() rowType: string;

  constructor(private readonly tabService: TabService,
              private readonly router: Router) {
  }

  onViewClick() {
    const route = `/${this.getRoute()}/${this.rowId}`;
    this.tabService.addTab({
      id: this.rowType,
      title: this.tabService.getTitle(this.rowType),
      route: route,
    });
    this.router.navigateByUrl(route);
  }

  getRoute(): string {
    const routes: Record<string, string> = {
      customer: 'customers',
      invoice: 'invoices',
      product: 'products',
    };

    return routes[this.rowType] ?? '';
  }
}
