import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GiphyToGifService } from '../../services/giphy.service';
import { GifsListMenu } from "../../components/list-menu/list-menu";

@Component({
  selector: 'gif-history',
  templateUrl: './gif-history.html',
})
export default class GifHistoryComponent {

  gifService = inject(GiphyToGifService)

  query= toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    )
  )

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()))
}
