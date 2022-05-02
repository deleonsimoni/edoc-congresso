import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseUrl: string
  ) { }

  public retrieveConferencers() {
    return this.http.get<any>(`${this.baseUrl}/conferencers`)
      .pipe(
        map(res => res),
        catchError(err => {
          return throwError(err);
        })
      );
  }

}
