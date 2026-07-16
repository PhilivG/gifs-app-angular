import { Component, input } from '@angular/core';
import { GifItem } from '../../../interfaces/gif.interface';

@Component({
  selector: 'gifs-list-meny-items',
  imports: [],
  templateUrl: './list-meny-items.html',
})
export class GifsListMenyItems {

  gif = input.required<GifItem>()

}
