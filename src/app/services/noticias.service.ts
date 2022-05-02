import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  listar() {
    return this.http.get(`${this.baseUrl}/news/news`);
  }

  cadastrar(news) {
    return this.http.post(`${this.baseUrl}/news/news`, news);
  }

  deletar(news) {
    return this.http.delete(`${this.baseUrl}/news/news/${news._id}`);
  }

  atualizar(news) {
    return this.http.put(`${this.baseUrl}/news/news/`, news);
  }

}
