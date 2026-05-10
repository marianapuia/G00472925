import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import type { HttpOptions } from '@capacitor/core';

export const API_KEY = '134995dcf26b789297a56644aad47be8';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {

 async get(options: HttpOptions) {
    return await CapacitorHttp.get(options);
  }
  
}
