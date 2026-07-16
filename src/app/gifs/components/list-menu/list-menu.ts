import { Component, input } from '@angular/core';
import { GifItem } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-list-menu',

  templateUrl: './list-menu.html',
})
export class GifsListMenu {

  gifs = input.required<GifItem[]>()

  constructor() {
    console.log(this.gifs);
  }

}
