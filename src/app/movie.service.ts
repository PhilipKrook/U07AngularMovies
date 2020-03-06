import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { MOVIES } from './mock-movies'; // API service ?!
import { Observable, of } from 'rxjs'; // workaround for HttpClient.get() ?!
import { MessageService } from './message.service'; // imported the new message service

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  getMovies(): Observable<Movie[]> {  // API Service ?!
    return of(MOVIES);
  }

  constructor(private messageService: MessageService) { }
}
