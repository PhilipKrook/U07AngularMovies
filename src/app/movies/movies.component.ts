import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service'; // API service ?!
import { MessageService} from '../message.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  selectedMovie: Movie;
  movies: Movie[];


  constructor(private movieService: MovieService, private messageService: MessageService) { } 

  ngOnInit() {
    this.getMovies(); // this calls the API function ?!
  }  

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
    this.messageService.add(`MessageService: Selected movie id=${movie.id}`);
  }

  getMovies(): void { // API stuff here ?!
    this.movieService.getMovies()
    .subscribe(movies => this.movies = movies);
  }

}