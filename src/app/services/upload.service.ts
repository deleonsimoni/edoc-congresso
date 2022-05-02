import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  uploadFile(fileDOC: File, filePDF: File, id: string, document: string, formulario: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileArray', filePDF, `${id}/${document}_${filePDF.name}`);
    formData.append('fileArray', fileDOC, `${id}/${document}_${fileDOC.name}`);
    formData.append('formulario', JSON.stringify(formulario));
    return this.http.post(`${this.baseUrl}/user/uploadWork/xxiendiperio2022/${id}`, formData);
  }

  alterUserWorkFile(fileDOC: File, filePDF: File, id: string, idWork: string): Observable<any> {
    const formData: FormData = new FormData();
    if (filePDF) formData.append('fileArray', filePDF, `${id}/${filePDF.name}`);
    if (fileDOC) formData.append('fileArray', fileDOC, `${id}/${fileDOC.name}`);
    return this.http.post(`${this.baseUrl}/admin/alterUserWorkFile/xxiendiperio2022/${idWork}`, formData);
  }

  submitWorkAdmin(fileDOC: File, filePDF: File, id: string, document: string, formulario: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileArray', filePDF, `${id}/${document}_${filePDF.name}`);
    formData.append('fileArray', fileDOC, `${id}/${document}_${fileDOC.name}`);
    formData.append('formulario', JSON.stringify(formulario));
    return this.http.post(`${this.baseUrl}/admin/uploadWork/xxiendiperio2022/${id}`, formData);
  }

  submeterTransferencia(file: File, id: string, document: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileArray', file, `${id}/${document}_${file.name}`);
    formData.append('formulario', '');
    return this.http.post(`${this.baseUrl}/user/submeterTransferencia/xxiendiperio2022/${id}`, formData);
  }

  submeterConferencista(file: File, formulario: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileArray', file, `conferencista/${file.name}`);
    formData.append('formulario', JSON.stringify(formulario));
    return this.http.post(`${this.baseUrl}/conferencista/conferencista`, formData);
  }

  gerarPagamento(file: File, id: string, document: string, formulario: any): Observable<any> {
    const formData: FormData = new FormData();
    if (file) {
      formData.append('file', file, `${id}/${document}_${file.name}`);
    }
    formData.append('formulario', JSON.stringify(formulario));
    return this.http.post(`${this.baseUrl}/user/gerarPagamento/xxiendiperio2022/${id}`, formData);
  }

}
