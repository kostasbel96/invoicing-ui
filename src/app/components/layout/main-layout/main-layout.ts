import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink} from '@angular/router';
import { TabService } from '../../../services/tab-service';
import { AsyncPipe } from '@angular/common';
import { Tab } from '../../../models/tab.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, RouterLink],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  activeTab$: Observable<string>;
  constructor(
    protected readonly router: Router,
    protected readonly tabService: TabService,
  ) {
    this.activeTab$ = this.tabService.activeTab$;
  }

  private getTitle(id: string): string {
    const map: Record<string, string> = {
      dashboard: 'Πίνακας Ελέγχου',
      customers: 'Πελάτες',
      newCustomer: 'Νέος Πελάτης',
      invoices: 'Παραστατικά',
      products: 'Προϊόντα',
    };

    return map[id] ?? id;
  }

  openTab(id: string, route: string) {
    this.tabService.addTab({
      id,
      title: this.getTitle(id),
      route,
    });

    this.router.navigateByUrl(route);
  }

  closeTab(route: string) {
    const nextRoute = this.tabService.closeTab(route);

    if (nextRoute) {
      this.router.navigateByUrl(nextRoute);
    }
  }

  onTabClick(tab: Tab) {
    this.tabService.setActive(tab.route);
    this.router.navigateByUrl(tab.route);
  }

  isActive(route: string, active: string | null): boolean {
    return route === active;
  }
}
