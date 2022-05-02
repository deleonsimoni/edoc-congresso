import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  constructor() { }

  public generateCertified() {
    const doc = new jsPDF();

    doc.text('hello certified', 10, 10);
    doc.save('certified.pdf');
  }
}
