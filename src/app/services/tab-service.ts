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
    const tabs = this.tabsSubject.value;

    const existingTab = tabs.find((t) => t.id === tab.id);

    if (existingTab) {
      existingTab.route = tab.route;
    } else {
      tabs.push(tab);
    }

    this.tabsSubject.next([...tabs]);
    this.setActive(tab.route);
  }

  setActive(route: string) {
    this.activeTabSubject.next(route);
  }

  closeTab(id: string): string | null {
    const tabs = this.tabsSubject.value;
    const tabToClose = tabs.find((t) => t.id === id);

    if (!tabToClose) {
      return null;
    }

    const remainingTabs = tabs.filter((t) => t.id !== id);

    this.tabsSubject.next(remainingTabs);

    const isActive = this.activeTabSubject.value === tabToClose.route;

    if (isActive) {
      const fallback = remainingTabs.at(-1) || null;
      const nextRoute = fallback ? fallback.route : '/dashboard';

      this.setActive(nextRoute);

      return nextRoute;
    }

    return null;
  }

  public getTitle(id: string): string {
    const map: Record<string, string> = {
      dashboard: 'Πίνακας Ελέγχου',
      customers: 'Πελάτες',
      newCustomer: 'Νέος Πελάτης',
      invoices: 'Παραστατικά',
      products: 'Προϊόντα',
      customer: 'Πληροφορίες Πελάτη',
      newProduct: 'Νέο Προιόν',
      product: 'Πληροφορίες Προϊόντος',
    };

    return map[id] ?? id;
  }
}
