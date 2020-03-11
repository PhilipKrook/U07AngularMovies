import { Injectable } from "@angular/core";
import { Movie } from "./movie";
import { Observable, of } from "rxjs"; // workaround for HttpClient.get() ?!
import { MessageService } from "./message.service"; // imported the new message service
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { API_KEY } from "../apiKey";

@Injectable({ providedIn: "root" })
export class MovieService {
  // 'api/movies'; // URL to web api
  private moviesUrl = "https://api.themoviedb.org/3/";
  apiKeyParam = `api_key=${API_KEY}`;

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
    return this.http.get<any>(`${this.moviesUrl}movie/popular?${this.apiKeyParam}`).pipe(
      tap(_ => this.log("fetched movies")),
      catchError(this.handleError<any>("getMovies", {}))
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

  /* GET movies which title contains search term */
  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesUrl}/?title=${term}`).pipe(
      tap(x =>
        x.length
          ? this.log(`found movies matching "${term}"`)
          : this.log(`no movies matching "${term}"`)
      ),
      catchError(this.handleError<Movie[]>("searchMovies", []))
    );
  }

  /** Log a MovieService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
