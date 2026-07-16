import { AfterViewInit, Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { GiphyToGifService } from '../../services/giphy.service';
import { GifsListMenu } from '../../components/list-menu/list-menu';
import { ScrollStateService } from '../../shared/services/scroll-state.service';

@Component({
  selector: 'gifs-trending-page',
  templateUrl: './trending-page.html',
})
export default class GifsTrendingPage implements AfterViewInit {
  gifService = inject(GiphyToGifService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.scrollTrendingState()
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.scrollTrendingState.set(scrollTop);

    console.log(isBottom);

    if (isBottom) {
      this.gifService.loadTrendingGifs();
    }
  }

  gifs = () => this.gifService.trendingGifs();
}
