import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(@Inject("BASE_API_URL") private baseUrl: string, private http: HttpClient) {}

  public validatePayment(id) {
    return this.http.post(`${this.baseUrl}/admin/validatePayment/${id}`, {});
  }

  public invalidatePayment(id) {
    return this.http.post(`${this.baseUrl}/admin/invalidatePayment/${id}`, {});
  }

  public retrieveUsers(page, search) {
    return this.http.get(`${this.baseUrl}/admin/usrs?page=${page}&search=${search}`);
  }

  public retrieveAllWorksPaginated(axis, modality, situation, nameWork, page) {
    return this.http.get<any>(
      `${this.baseUrl}/admin/worksPaginated?axis=${axis}&modality=${modality}&situation=${situation}&nameWork=${nameWork}&page=${page}`
    );
  }

  public generateReport() {
    return this.http.get(`${this.baseUrl}/admin/generateReport`);
  }

  public registerCoordinator(form, axisId) {
    return this.http.post(`${this.baseUrl}/user/coordinator/${axisId}`, form);
  }

  public retrieveCoordinators(axisId) {
    return this.http.get<any>(`${this.baseUrl}/user/coordinators/${axisId}`);
  }

  public deleteCoordinator(id) {
    return this.http.delete(`${this.baseUrl}/user/coordinator/${id}`);
  }

  public markCoordinator(id) {
    return this.http.post(`${this.baseUrl}/user/markCoordinator/${id}`, null);
  }

  public markReviewerWork(idWork, idReviewer, emailReviewer) {
    return this.http.post(`${this.baseUrl}/user/markReviewerWork/${idWork}/${idReviewer}/${emailReviewer}`, null);
  }

  public unmarkCoordinator(id) {
    return this.http.post(`${this.baseUrl}/user/unmarkCoordinator/${id}`, null);
  }

  public registerReviewers(form) {
    return this.http.post(`${this.baseUrl}/user/reviewer`, form);
  }

  public retrieveReviewers(id) {
    return this.http.get<any>(`${this.baseUrl}/user/reviewer/${id}`);
  }

  public deleteReviewer(id) {
    return this.http.delete(`${this.baseUrl}/user/reviewer/${id}`);
  }

  public recoverMetrics() {
    return this.http.get<any>(`${this.baseUrl}/admin/metrics`);
  }

  public retrieveUserWorks(id) {
    return this.http.get<any>(`${this.baseUrl}/admin/getUserWorks/${id}`);
  }

  public retrieveAllWorks(id) {
    return this.http.get<any>(`${this.baseUrl}/admin/works/${id}`);
  }

  public retrieveAllWorksValids(id, modality) {
    return this.http.get<any>(`${this.baseUrl}/admin/worksValids/${id}/${modality}`);
  }

  public updateUser(form) {
    return this.http.post(`${this.baseUrl}/admin/editUser`, form);
  }

  public registerSchedule(form) {
    return this.http.post<any>(`${this.baseUrl}/schedule/insertSchedule`, form);
  }

  public sendEmail(form) {
    const formData: FormData = new FormData();
    if(form.files){
      formData.append('fileArray', <File>form.files[0], form.files[0].name);
    }
    formData.append('formulario', JSON.stringify({groupId: form.groupId, description: form.description, title: form.title}));
    return this.http.post<any>(`${this.baseUrl}/admin/sendEmail`, formData);
  }

  // public retrieveSchedules() {
  //   return this.http.get<any>(`${this.baseUrl}/schedule/listAll`);
  // }

  public retrieveByFilter(axis) {
    return this.http.get<any>(`${this.baseUrl}/schedule/listByFilter/${axis}`);
  }

  public deleteSchedule(id) {
    return this.http.delete<any>(`${this.baseUrl}/schedule/deleteSchedule/${id}`);
  }

  public removeWork(id) {
    return this.http.delete<any>(`${this.baseUrl}/admin/removeWork/${id}`);
  }

  public removeAuthor(authorId, workId) {
    return this.http.delete<any>(`${this.baseUrl}/admin/removeAuthor/${authorId}/${workId}`);
  }

  public insertAuthorWork(authorEmail, workId) {
    let form = { authorEmail: authorEmail, workId: workId };
    return this.http.post<any>(`${this.baseUrl}/admin/insertAuthorWork`, form);
  }
}
