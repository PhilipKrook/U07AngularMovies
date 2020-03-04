import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_KEY } from '../apiKey';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://api.themoviedb.org/3/';
  apiKeyParam = `api_key=${API_KEY}`;

  constructor(private httpClient: HttpClient) { }
  
  public getPopularMovies(){
    return this.httpClient.get(`${this.apiUrl}movie/popular?${this.apiKeyParam}`);    
  };
}