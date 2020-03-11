import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service'; // API service ?!

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];

  constructor(private movieService: MovieService) {} 

  ngOnInit() {
    this.getMovies(); // this calls the API function ?!
    this.movieService.getPopularMovies().subscribe((data)=>{
    console.log('data', data);
    this.movies = data['results'];
  });
  }    

  getMovies(): void { // API stuff here ?!
    this.movieService.getMovies()
    .subscribe(movies => this.movies = movies);
  }
}