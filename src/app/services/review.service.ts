import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  constructor(
    @Inject("BASE_API_URL") private baseUrl: string,
    private http: HttpClient
  ) {}

  cadastrar(review) {
    return this.http.post<any>(`${this.baseUrl}/reviews/admin`, review);
  }

  reviewReviewer(review) {
    return this.http.post<any>(`${this.baseUrl}/reviews/reviewer`, review);
  }

  retrieveAllWorks() {
    return this.http.get<any>(`${this.baseUrl}/reviews/getWorks`);
  }

  aplicarRecurso(justificativa, workId) {
    return this.http.post<any>(
      `${this.baseUrl}/reviews/pedirRecurso/` + workId,
      justificativa
    );
  }

  negarRecurso(workId, reply) {
    return this.http.post<any>(
      `${this.baseUrl}/reviews/negarRecurso/` + workId,
      { reply }
    );
  }

  aceitarRecurso(workId, reply) {
    return this.http.post<any>(
      `${this.baseUrl}/reviews/aceitarRecurso/` + workId,
      { reply }
    );
  }

  aplicarRecursoAdmin(justificativa, workId) {
    return this.http.post<any>(
      `${this.baseUrl}/reviews/pedirRecursoAdmin/` + workId,
      justificativa
    );
  }

  negarRecursoAdmin(workId, reply) {
    return this.http.post<any>(
      `${this.baseUrl}/reviews/negarRecursoAdmin/` + workId,
      { reply }
    );
  }

  aceitarRecursoAdmin(workId, reply) {
    return this.http.post<any>(
      `${this.baseUrl}/reviews/aceitarRecursoAdmin/` + workId,
      { reply }
    );
  }
}
