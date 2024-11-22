import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IBooks } from '../models/books.interface';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getProducto(): Observable<IBooks[]> {
    return this.http.get<IBooks[]>(environment.baseUrl).pipe(
      catchError(this.handleError)
    );

  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Algo salió mal; por favor intenta de nuevo más tarde.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error en la aplicación: ${error.error.message}`;
    } else {
      errorMessage = `Error en el servidor: ${error.statusText}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
