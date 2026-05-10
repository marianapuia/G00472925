import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, 
  IonIcon, IonCard, IonCardContent, IonButtons, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import type { HttpOptions } from '@capacitor/core';
import { TmdbService, API_KEY, BASE_URL, IMG_BASE } from '../services/tmdb.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonItem, IonLabel, IonInput, IonButton, IonIcon, 
    IonCard, IonCardContent, IonButtons,],
})
export class HomePage {
  studentNumber = 'G00472925';
  searchQuery = '';
  movies: any[] = [];
  listTitle = "Today's Trending Movies";
  imgBase = IMG_BASE;

  constructor(private tmdb: TmdbService, private data: DataService, private router: Router) {

    addIcons({ heart });
    }

  async ngOnInit() {
  this.getTrending();
}

 async getTrending() {
    this.listTitle = "Today's Trending Movies";
    var options: HttpOptions = {
      url: BASE_URL + '/trending/movie/day?api_key=' + API_KEY
    };
    var result = await this.tmdb.get(options);
    this.movies = result.data.results;
  }

  async onSearch() {
    if (this.searchQuery == '') {
      this.getTrending();
      return;
    }
    this.listTitle = this.searchQuery + ' Movies';
    var options: HttpOptions = {
      url: BASE_URL + '/search/movie?query=' + this.searchQuery + '&api_key=' + API_KEY
    };
    var result = await this.tmdb.get(options);
    this.movies = result.data.results;
  }
onClear() {
  this.searchQuery = '';
  this.getTrending();
}

async onMovieClick(movie: any) {
    await this.data.set('selectedMovie', movie);
    this.router.navigate(['/movie-details']);
  }

}
