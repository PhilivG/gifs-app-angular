import { GifItem } from '../interfaces/gif.interface';
import { GiphyItem } from '../interfaces/giphy.interface';

export class GiphyToGif {
  static mapGiphyItemToGifItem(item: GiphyItem): GifItem {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    };
  }

  static mapGiphyItemToGifItemArray(items: GiphyItem[]): GifItem[] {
    return items.map(this.mapGiphyItemToGifItem);
  }
}
