import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TabService } from '../../../services/tab-service';
import { AsyncPipe } from '@angular/common';
import { Tab } from '../../../models/tab.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  activeTab$: Observable<string>;
  sidebarCollapsed = signal(false);

  constructor(
    protected readonly router: Router,
    protected readonly tabService: TabService,
  ) {
    this.activeTab$ = this.tabService.activeTab$;
  }

  openTab(id: string, route: string) {
    this.tabService.addTab({
      id,
      title: this.tabService.getTitle(id),
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

  toggleSidebar() {
    this.sidebarCollapsed.update((value) => !value);
  }
}
