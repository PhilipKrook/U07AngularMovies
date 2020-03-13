import { Injectable } from "@angular/core";
import { Movie } from "./movie";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { API_KEY } from "../apiKey";

@Injectable({ providedIn: "root" })
export class MovieService {
  private moviesUrl = "https://api.themoviedb.org/3/";
  private apiKeyParam = `api_key=${API_KEY}`;
  public searchResults: Movie[] = [];

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  public getPopularMovies() {
    return this.http.get(`${this.moviesUrl}movie/popular?${this.apiKeyParam}`);
  }

  // GET movies from the server
  getMovies(): Observable<any> {
    return this.http
      .get<any>(`${this.moviesUrl}movie/popular?${this.apiKeyParam}`)
      .pipe(
        tap(_ => this.log("fetched movies")),
        catchError(this.handleError<any>("getMovies", {}))
      );
  }

  getActors(id: number) {
    return this.http.get(
      `${this.moviesUrl}movie/${id}/credits?${this.apiKeyParam}`
    );
  }

  /** GET movie by id. Return `undefined` when id not found */
  getMovieNo404<Data>(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/?id=${id}`;
    return this.http.get<Movie[]>(url).pipe(
      map(movies => movies[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} movie id=${id}`);
      }),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  /** GET movie by id. Will 404 if id not found */
  getMovie(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}movie/${id}?${this.apiKeyParam}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`fetched movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  /** GET person by id. Will 404 if id not found */
  getPerson(id: number): Observable<any> {
    const url = `${this.moviesUrl}person/${id}?${this.apiKeyParam}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched person id=${id}`)),
      catchError(this.handleError<any>(`getPerson id=${id}`))
    );
  }

  /* GET movies which title contains search term */
  searchMovies(term: string): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any>(`${this.moviesUrl}search/multi?${this.apiKeyParam}&query=${term}`).pipe(
        tap(response => {
          if (response.total_results > 0) {
            this.log(`found movies matching "${term}"`);
            this.searchResults = response.results.filter(
              (item: any) => item.media_type !== "tv"
            );
            console.log("results:", this.searchResults);
          } else {
            this.log(`no movies matching "${term}"`);
            this.searchResults = [];
          }
        }),
        catchError(this.handleError<any>("searchMovies", []))
      );
  }

  /** Log a MovieService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
