import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonButtons, IonCard, IonCardContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, arrowBack } from 'ionicons/icons';

import { DataService } from '../../services/data.service';
import { IMG_BASE } from '../../services/tmdb.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonButtons, IonCard, IonCardContent,
  ],
})
export class FavouritesPage {
  movies: any[] = [];
  imgBase = IMG_BASE;

  constructor(
    private data: DataService,
    private router: Router,
    private location: Location
  ) {
    addIcons({ home, arrowBack });
  }

  async ionViewWillEnter() {
    var favs = await this.data.get('favourites');
    if (favs == null) {
      favs = [];
    }
    this.movies = favs;
  }

  async onDetails(movie: any) {
    await this.data.set('selectedMovie', movie);
    this.router.navigate(['/movie-details']);
  }

  async onRemove(movie: any) {
    var favs = await this.data.get('favourites');
    if (favs == null) {
      favs = [];
    }
    var newFavs = [];
    for (var i = 0; i < favs.length; i++) {
      if (favs[i].id != movie.id) {
        newFavs.push(favs[i]);
      }
    }
    await this.data.set('favourites', newFavs);
    this.movies = newFavs;
  }

  goBack() {
    this.location.back();
  }
}