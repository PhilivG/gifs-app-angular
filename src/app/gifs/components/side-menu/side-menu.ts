import { Component } from '@angular/core';
import { GifsideMenuHeader } from "./side-menu-header/side-menu-header";
import { GifSideMenuOptions } from "./side-menu-options/side-menu-options";


@Component({
  selector: 'gifs-side-menu',
  imports: [GifsideMenuHeader, GifSideMenuOptions],
  templateUrl: './side-menu.html',
})
export class GifsSideMenu {


}

