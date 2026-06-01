import { Component, signal, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { NAVIGATION_CONFIG } from '../../configs/navigation';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Header, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  // Сигнал поискового запроса
  protected readonly searchQuery = signal<string>('');

  // Состояние видимости сайдбара на мобильных устройствах
  protected readonly isSidebarOpen = signal<boolean>(false);

  // Вычисляемое реактивное меню на основе поискового запроса
  protected readonly filteredMenu = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();

    if (!query) {
      return NAVIGATION_CONFIG;
    }

    return NAVIGATION_CONFIG.map((section) => {
      const filteredItems = section.items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.id.includes(query) ||
          item.keywords.some((k) => k.toLowerCase().includes(query)),
      );

      return {
        ...section,
        items: filteredItems,
      };
    }).filter((section) => section.items.length > 0);
  });

  constructor() {
    const router = inject(Router);

    // Автоматически закрываем сайдбар на мобильных устройствах при переходе на другую страницу
    router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.isSidebarOpen.set(false);
      });
  }

  protected onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  protected toggleSidebar(): void {
    this.isSidebarOpen.update((open) => !open);
  }

  protected closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }
}
