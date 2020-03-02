import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies;

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getPopularMovies().subscribe((data)=>{
      console.log('data', data);
      this.movies = data['results'];
    });
  }
}
