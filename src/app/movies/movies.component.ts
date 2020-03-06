import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MOVIES } from '../mock-movies';
import { MovieService } from '../movie.service'; // API service ?!

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  selectedMovie: Movie;

  constructor(private movieService: MovieService) { }

  getMovies(): void { // API stuff here ?!
    this.movieService.getMovies()
    .subscribe(movies => this.movies = movies);
  }

  ngOnInit(): void {
    this.getMovies(); // this calls the API function ?!
  }

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  }
}