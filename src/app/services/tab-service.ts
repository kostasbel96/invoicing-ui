import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab } from '../models/tab.model';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private readonly tabsSubject = new BehaviorSubject<Tab[]>([
    { id: 'dashboard', route: '/dashboard', title: 'Πίνακας Ελέγχου' },
  ]);

  tabs$ = this.tabsSubject.asObservable();

  private readonly activeTabSubject = new BehaviorSubject<string>('/dashboard');
  activeTab$ = this.activeTabSubject.asObservable();

  get tabs(): Tab[] {
    return this.tabsSubject.value;
  }

  addTab(tab: Tab) {
    const exists = this.tabsSubject.value.some((t) => t.id === tab.id);

    if (!exists) {
      this.tabsSubject.next([...this.tabsSubject.value, tab]);
    }

    this.setActive(tab.route);
  }

  setActive(route: string) {
    this.activeTabSubject.next(route);
  }

  closeTab(route: string): string | null {
    const tabs = this.tabsSubject.value.filter((t) => t.route !== route);

    this.tabsSubject.next(tabs);

    const isActive = this.activeTabSubject.value === route;

    if (isActive) {
      const fallback = tabs[tabs.length - 1] || null;

      const nextRoute = fallback ? fallback.route : '/dashboard';

      this.setActive(nextRoute);

      return nextRoute;
    }

    return null;
  }
}
