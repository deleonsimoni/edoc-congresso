import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }


  pagar(form) {
    return this.http.post(`${this.baseUrl}/user/payment`, form);
  }

  atualizarValor(id) {
    return this.http.get(`${this.baseUrl}/user/price/` + id);
  }

  getBoleto() {
    return this.http.get(`${this.baseUrl}/user/getBoleto`);
  }

  updateData(user) {
    return this.http.put(`${this.baseUrl}/user/update`, user);
  }

}
