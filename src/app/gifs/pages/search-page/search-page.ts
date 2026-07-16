import { Component, computed, inject, signal } from '@angular/core';
import { GifsListMenu } from '../../components/list-menu/list-menu';
import { GiphyToGif } from '../../mappers/giphy.mapper';
import { GiphyToGifService } from '../../services/giphy.service';
import { GifItem } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-search-page',
  imports: [GifsListMenu],
  templateUrl: './search-page.html',
})
export default class GifsSearchPage {
  gifSearchService = inject(GiphyToGifService);
  gifs = signal<GifItem[]>([]);
  searchGifs = signal<GifItem[]>([]);

  searchGifsMasonry = computed<GifItem[][]>(() => {
    const result = this.searchGifs();
    const groups: GifItem[][] = [];
    for (let i = 0; i < result.length; i += 3) {
      groups.push(result.slice(i, i + 3));
    }
    return groups;
  });

  onSearch(query: string) {
    this.gifSearchService.loadSearchGifs(query).subscribe(result => {
      this.searchGifs.set(result);
    });
  }
}
