import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonButtons, IonCard, IonCardContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, heart, arrowBack } from 'ionicons/icons';
import type { HttpOptions } from '@capacitor/core';

import { TmdbService, API_KEY, BASE_URL, IMG_BASE } from '../../services/tmdb.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, RouterLink,
     IonButton, IonIcon, IonButtons, IonCard, IonCardContent,
   ]
})
export class MovieDetailsPage {
  movie: any = null;
  cast: any[] = [];
  crew: any[] = [];
  imgBase = IMG_BASE;
  isFav = false;

  constructor(private tmdb: TmdbService, private data: DataService, private router: Router)
  {
    addIcons({ home, heart, arrowBack });
  }

  async ionViewWillEnter() {
    this.movie = await this.data.get('selectedMovie');
    var favs = await this.data.get('favourites');
    if (favs == null) {
      favs = [];
    }
    this.isFav = false;
    for (var i = 0; i < favs.length; i++) {
      if (favs[i].id == this.movie.id) {
        this.isFav = true;
      }
    }
    var options: HttpOptions = {
      url: BASE_URL + '/movie/' + this.movie.id + '/credits?api_key=' + API_KEY
    };
    var result = await this.tmdb.get(options);
    this.cast = result.data.cast;
    this.crew = result.data.crew;
  }

  async toggleFavourite() {
    var favs = await this.data.get('favourites');
    if (favs == null) {
      favs = [];
    }
    if (this.isFav == true) {
      var newFavs = [];
      for (var i = 0; i < favs.length; i++) {
        if (favs[i].id != this.movie.id) {
          newFavs.push(favs[i]);
        }
      }
      favs = newFavs;
    } else {
      favs.push(this.movie);
    }
    await this.data.set('favourites', favs);
    this.isFav = !this.isFav;
  }

  async onPersonClick(personId: number) {
    await this.data.set('selectedPersonId', personId);
    this.router.navigate(['/person-details']);
  }
}