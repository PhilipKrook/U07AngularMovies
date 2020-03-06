import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { MOVIES } from './mock-movies'; // API service ?!
import { Observable, of } from 'rxjs'; // workaround for HttpClient.get() ?!
import { MessageService } from './message.service'; // imported the new message service

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private messageService: MessageService) { }

  getMovies(): Observable<Movie[]> {  // API Service ?!
    this.messageService.add('MovieService: fetched movies!!!');
    return of(MOVIES);
  }

}