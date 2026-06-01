import { Component, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { NAVIGATION_CONFIG } from '../../configs/navigation';

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

  protected onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}
