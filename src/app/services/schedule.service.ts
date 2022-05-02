import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  public registerSchedule(type, form) {
    return this.http.post<any>(`${this.baseUrl}/schedule/${type}`, form);
  }

  public retrieveSchedules(type, date) {
    return this.http.get<any>(`${this.baseUrl}/schedule/${type}/${date}`);
  }

  public updateSchedule(type, id, form) {
    return this.http.put<any>(`${this.baseUrl}/schedule/${type}/${id}`, form, {});
  }

  public deleteSchedule(type, id) {
    return this.http.delete(`${this.baseUrl}/schedule/${type}/${id}`);
  }

  public enrollSchedule(id) {
    return this.http.post(`${this.baseUrl}/schedule/subscribeMinicurso/${id}`, {});
  }

  public cancelEnrollSchedule(id) {
    return this.http.post(`${this.baseUrl}/schedule/unsubscribeMinicurso/${id}`, {});
  }

  public enrollScheduleRodaDeConversa(id) {
    return this.http.post(`${this.baseUrl}/schedule/subscribeRodadeConversa/${id}`, {});
  }

  public cancelEnrollScheduleRodaDeConversa(id) {
    return this.http.post(`${this.baseUrl}/schedule/unsubscribeRodadeConversa/${id}`, {});
  }

  public enrollSchedulePainel(id) {
    return this.http.post(`${this.baseUrl}/schedule/subscribePainel/${id}`, {});
  }

  public cancelEnrollSchedulePainel(id) {
    return this.http.post(`${this.baseUrl}/schedule/unsubscribePainel/${id}`, {});
  }
}
