import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './movie';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const movies = [
      { id: 11, title: 'Parasite' },
      { id: 12, title: 'The Invicible Man' },
      { id: 13, title: 'Knives Out' },
      { id: 14, title: 'Sonig the Hedgehog' },
      { id: 15, title: 'Candyman' },
      { id: 16, title: 'The' },
      { id: 17, title: 'Jojo Rabbit' },
      { id: 18, title: 'Birds of Prey' },
      { id: 19, title: 'The Call of the Wild' },
      { id: 20, title: '1917' }
    ];
    return {movies};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(movies: Movie[]): number {
    return movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 11;
  }
}