import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {   IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonButtons, IonItem, IonLabel, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, heart, arrowBack } from 'ionicons/icons';
import type { HttpOptions } from '@capacitor/core';

import { TmdbService, API_KEY, BASE_URL, IMG_BASE } from '../../services/tmdb.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonButtons, IonItem, IonLabel,
  ],
})

export class DetailsPage {
  person: any = null;
  credits: any[] = [];
  imgBase = IMG_BASE;

  constructor(
    private tmdb: TmdbService,
    private data: DataService,
    private router: Router
  ) {
    addIcons({ home, heart, arrowBack });
  }

  async ionViewWillEnter() {
    var id = await this.data.get('selectedPersonId');
    var personOpts: HttpOptions = {
      url: BASE_URL + '/person/' + id + '?api_key=' + API_KEY
    };
    var personResult = await this.tmdb.get(personOpts);
    this.person = personResult.data;

    var creditsOpts: HttpOptions = {
      url: BASE_URL + '/person/' + id + '/movie_credits?api_key=' + API_KEY
    };
    var creditsResult = await this.tmdb.get(creditsOpts);
    this.credits = creditsResult.data.cast;
  }

  async onMovieClick(m: any) {
    var movie = {
      id: m.id,
      title: m.title,
      overview: m.overview,
      poster_path: m.poster_path
    };
    await this.data.set('selectedMovie', movie);
    this.router.navigate(['/movie-details']);
  }
}