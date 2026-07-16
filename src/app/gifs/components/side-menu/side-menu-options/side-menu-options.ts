import { Component, inject, signal } from '@angular/core';
import { MenuOptions } from '../../../interfaces/menu-options.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GiphyToGifService } from '../../../services/giphy.service';

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
})
export class GifSideMenuOptions {
  gifService = inject(GiphyToGifService);

  gifsHistory = () => this.gifService.searchHistoryKeys();

  menuOptions = signal<MenuOptions[]>([
    {
      icon: 'fa-chart-line fa-solid',
      label: 'Tendencia',
      subLabel: 'Gifs populares',
      route: '/dashboard/trending',
    },
    {
      icon: 'fa-magnifying-glass fa-solid',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      route: '/dashboard/search',
    },
  ]);
}
