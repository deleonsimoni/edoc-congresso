import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  createCoordinator(form) {
    return this.http.post(`${this.baseUrl}/user/coordinator`, form);
  }

}
