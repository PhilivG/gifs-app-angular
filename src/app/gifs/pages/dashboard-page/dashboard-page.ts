import { Component } from '@angular/core';
import { GifsSideMenu } from "../../components/side-menu/side-menu";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'gifs-dashboard-page',
  imports: [GifsSideMenu, RouterOutlet],
  templateUrl: './dashboard-page.html',
})
export default class GifsDashboardPage {}
