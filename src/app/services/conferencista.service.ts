import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConferencistaService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  listar() {
    return this.http.get(`${this.baseUrl}/conferencista/conferencista`);
  }

  cadastrar(conferencista) {
    return this.http.post(`${this.baseUrl}/conferencista/conferencista`, conferencista);
  }

  deletar(id) {
    return this.http.delete(`${this.baseUrl}/conferencista/conferencista/${id}`);
  }

}
