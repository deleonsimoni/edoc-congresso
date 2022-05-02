import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnaisService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  listar() {
    return this.http.get(`${this.baseUrl}/anais/anais`);
  }

  listarVirtual() {
    return this.http.get(`${this.baseUrl}/anais/anaisVirtual`);
  }

  listarSumarioVirtual(id, page) {
    return this.http.get(`${this.baseUrl}/anais/anaisSumarioVirtual?id=${id}&page=${page}`);
  }

  cadastrar(anais) {
    return this.http.post(`${this.baseUrl}/anais/anais`, anais);
  }

  deletar(anais) {
    return this.http.delete(`${this.baseUrl}/anais/anais/${anais._id}`);
  }

  atualizar(anais) {
    return this.http.put(`${this.baseUrl}/anais/anais/`, anais);
  }

}
