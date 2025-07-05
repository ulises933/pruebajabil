import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, CreateMovie, UpdateMovie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:5260/api/movie';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  getMoviesByDirector(directorId: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/director/${directorId}`);
  }

  createMovie(movie: CreateMovie): Observable<Movie> {
    const movieData = {
      ...movie,
      duration: movie.duration ? this.convertDurationToTimeSpan(movie.duration) : undefined
    };
    return this.http.post<Movie>(this.apiUrl, movieData);
  }

  updateMovie(id: number, movie: UpdateMovie): Observable<Movie> {
    const movieData = {
      ...movie,
      duration: movie.duration ? this.convertDurationToTimeSpan(movie.duration) : undefined
    };
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movieData);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private convertDurationToTimeSpan(duration: string): string | undefined {
    if (!duration) return undefined;
    if (duration.match(/^\d{2}:\d{2}:\d{2}$/)) {
      return duration;
    }
    if (duration.match(/^\d{2}:\d{2}$/)) {
      return duration + ':00';
    }
    return duration;
  }
} 