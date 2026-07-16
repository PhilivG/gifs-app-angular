import { inject, Injectable, signal, Pipe, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { GifItem } from '../interfaces/gif.interface';
import { GiphyToGif } from '../mappers/giphy.mapper';
import { GiphyResponse } from '../interfaces/giphy.interface';
import { map, tap, Observable } from 'rxjs';

const GIF_KEY = 'gifs';

const loadGifsToLocalStorage = () => {
  const gifsStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifsHistory = JSON.parse(gifsStorage);

  return gifsHistory;
};

@Injectable({ providedIn: 'root' })
export class GiphyToGifService {
  http = inject(HttpClient);

  trendingGifs = signal<GifItem[]>([]);
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  trendingGifsMasonry = computed(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;
  });

  searchGifs = signal<GifItem[]>([]);
  searchGifsLoading = signal(true);

  searchGifsMasonry = computed<GifItem[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.searchGifs().length; i += 3) {
      groups.push(this.searchGifs().slice(i, i + 3));
    }

    return groups;
  });

  saveGifsToLocalStorage = effect(() => {
    const history = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, history);
  });

  searchHistory = signal<Record<string, GifItem[]>>(loadGifsToLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${environment.apiUrl}/gifs/trending`, {
        params: {
          api_key: environment.apiKey,
          limite: 20,
          offset: this.trendingPage() * 20,
        },
      })
      .subscribe((response) => {
        const gifs = GiphyToGif.mapGiphyItemToGifItemArray(response.data);
        this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
        this.trendingGifsLoading.set(false);
        this.trendingPage.update((page) => page + 1);
        // console.log(gifs);
      });
  }

  loadSearchGifs(query: string): Observable<GifItem[]> {
    return this.http
      .get<GiphyResponse>(`${environment.apiUrl}/gifs/search`, {
        params: {
          api_key: environment.apiKey,
          limite: 20,
          q: query,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GiphyToGif.mapGiphyItemToGifItemArray(items)),

        // TODO historial
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLocaleLowerCase()]: items,
          }));
        }),
      );

  }

  getHistoryGifs(query: string): GifItem[][] {
    const history = this.searchHistory()[query] ?? [];

    const groups = [];
    for (let i = 0; i < history.length; i += 3) {
      groups.push(history.slice(i, i + 3));
    }

    return groups;
  }
}
