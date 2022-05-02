import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ConferencistaService } from '../services/conferencista.service';
import { Observable } from 'rxjs';
import { DownloadFileService } from '../services/download-file.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-modal-conferencistas',
  templateUrl: './modal-conferencistas.component.html',
  styleUrls: ['./modal-conferencistas.component.scss']
})
export class ModalConferencistasComponent implements OnInit {

  public conferencistas: any[] = [];
  carregando = false;

  constructor(
    public dialogRef: MatDialogRef<ModalConferencistasComponent>,
    public conferencistaService: ConferencistaService,
    public donwloadService: DownloadFileService,
    public _DomSanitizationService: DomSanitizer

  ) { }

  ngOnInit() {
    this.conferencistaService.listar().subscribe((res: any) => {
      this.carregando = false;
      this.conferencistas = res;
      this.getImageConferencista();
      this.popularConferencistasLocal();

    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public getImageConferencista() {

    this.conferencistas.forEach(element => {

      this.donwloadService.getImage(element.imagePathS3).subscribe((res: any) => {
        element.imagem = "data:image/jpeg;base64," + this.encode(res.data.Body.data);
      }, err => {
        console.log('Erro ao obter a imagem');
      });

    });


  }

  popularConferencistasLocal() {
    this.conferencistas.push({
      fullname: 'Abraham Magendzo (Universidad Academia de Humanismo Cristiano)',
      imagemLocal: '../../assets/img/conferencistas/Abraham Magendzo (Universidad Academia de Humanismo Cristiano).jpg'
    }, {
      fullname: 'Aída Monteiro (UFPE)',
      imagemLocal: '../../assets/img/conferencistas/Aída Monteiro (UFPE).jpg'
    }, {
      fullname: 'Walkiria Rigolon (SEE SP)',
      imagemLocal: '../../assets/img/conferencistas/Walkiria Rigolon (SEE SP).jpg'
    }, {
      fullname: 'Alda Marin (PUC SP)',
      imagemLocal: '../../assets/img/conferencistas/Alda Marin (PUC SP).jpg'
    }, {
      fullname: 'Alice Casimiro Lopes (UERJ)',
      imagemLocal: '../../assets/img/conferencistas/Alice Casimiro Lopes (UERJ).jpg'
    }, {
      fullname: 'Alicia Bonamino (PUC-Rio)',
      imagemLocal: '../../assets/img/conferencistas/Alicia Bonamino (PUC-Rio).jpg'
    }, {
      fullname: 'Andrea Rosana Fetzner (UNIRIO)',
      imagemLocal: '../../assets/img/conferencistas/Andrea Rosana Fetzner (UNIRIO).jpg'
    }, {
      fullname: 'Angela Dalben (UFMG)',
      imagemLocal: '../../assets/img/conferencistas/Angela Dalben (UFMG).jpg'
    }, {
      fullname: 'Antonio Flavio Moreira (UCP)',
      imagemLocal: '../../assets/img/conferencistas/Antonio Flavio Moreira (UCP).jpg'
    }, {
      fullname: 'Antònio Nóvoa (ULisboa PT – UFRJ)',
      imagemLocal: '../../assets/img/conferencistas/Antònio Nóvoa (ULisboa PT – UFRJ).jpg'
    }, {
      fullname: 'Bernardete Gatti (FFC)',
      imagemLocal: '../../assets/img/conferencistas/Bernardete Gatti (FFC).png'
    }, {
      fullname: 'Carmen Teresa Gabriel (UFRJ)',
      imagemLocal: '../../assets/img/conferencistas/Carmen Teresa Gabriel (UFRJ).jpg'
    }, {
      fullname: 'Cristina D’Avila (UFBA)',
      imagemLocal: '../../assets/img/conferencistas/Cristina D’Avila (UFBA).jpg'
    }, {
      fullname: 'Dalila Andrade Oliveira (UFMG)',
      imagemLocal: '../../assets/img/conferencistas/Dalila Andrade Oliveira (UFMG).jpg'
    }, {
      fullname: 'Elizeu Clementino de Souza (UNEB)',
      imagemLocal: '../../assets/img/conferencistas/Elizeu Clementino de Souza (UNEB).jpg'
    }, {
      fullname: 'Flavia Medeiros Sarti (UNESP)',
      imagemLocal: '../../assets/img/conferencistas/Flavia Medeiros Sarti (UNESP).jpg'
    }, {
      fullname: 'Guilherme Alcantara (UFMG)',
      imagemLocal: '../../assets/img/conferencistas/Guilherme Alcantara (UFMG).jpg'
    }, {
      fullname: 'Gustavo Fischman (Arizona State University)',
      imagemLocal: '../../assets/img/conferencistas/Gustavo Fischman (Arizona State University).jpg'
    }, {
      fullname: 'Ilma Passos Alencastro Veiga (UnB)',
      imagemLocal: '../../assets/img/conferencistas/Ilma Passos Alencastro Veiga (UnB).jpg'
    }, {
      fullname: 'Isabel Maria Sabino (UECE)',
      imagemLocal: '../../assets/img/conferencistas/Isabel Maria Sabino (UECE).jpg'
    }, {
      fullname: 'José Carlos Libâneo (UFG)',
      imagemLocal: '../../assets/img/conferencistas/José Carlos Libâneo (UFG).jpg'
    }, {
      fullname: 'Julio Diniz-Pereira (UFMG)',
      imagemLocal: '../../assets/img/conferencistas/Julio Diniz-Pereira (UFMG).jpg'
    }, {
      fullname: 'Leda Sheibe (UFSC)',
      imagemLocal: '../../assets/img/conferencistas/Leda Sheibe (UFSC).jpg'
    }, {
      fullname: 'Lucíola Santos (UFMG)',
      imagemLocal: '../../assets/img/conferencistas/Lucíola Santos (UFMG).jpg'
    }, {
      fullname: 'Luiz Fernandes de Oliveira (UFRRJ)',
      imagemLocal: '../../assets/img/conferencistas/Luiz Fernandes de Oliveira (UFRRJ).jpg'
    }, {
      fullname: 'Luiz Fernandes Dourado (UFG)',
      imagemLocal: '../../assets/img/conferencistas/Luiz Fernandes Dourado (UFG).jpg'
    }, {
      fullname: 'Marcia Serra Ferreira (UFRJ)',
      imagemLocal: '../../assets/img/conferencistas/Marcia Serra Ferreira (UFRJ).jpg'
    }, {
      fullname: 'Maria Amélia Santoro Franco (UNISANTOS)',
      imagemLocal: '../../assets/img/conferencistas/Maria Amélia Santoro Franco (UNISANTOS).jpg'
    }, {
      fullname: 'Maria do Céu Roldão (UCPorto PT)',
      imagemLocal: '../../assets/img/conferencistas/Maria do Céu Roldão (UCPorto PT).jpg'
    }, {
      fullname: 'Maria Inês Marcondes (PUC-Rio)',
      imagemLocal: '../../assets/img/conferencistas/Maria Inês Marcondes (PUC-Rio).jpg'
    }, {
      fullname: 'Maria Isabel Cunha (UNISINOS)',
      imagemLocal: '../../assets/img/conferencistas/Maria Isabel Cunha (UNISINOS).jpg'
    }, {
      fullname: 'Maria Isabel de Almeida (USP)',
      imagemLocal: '../../assets/img/conferencistas/Maria Isabel de Almeida (USP).jpg'
    }, {
      fullname: 'Maria Rita de Oliveira (CEFET MG)',
      imagemLocal: '../../assets/img/conferencistas/Maria Rita de Oliveira (CEFET MG).jpg'
    }, {
      fullname: 'Maria Teresa Esteban (UFF)',
      imagemLocal: '../../assets/img/conferencistas/Maria Teresa Esteban (UFF).jpg'
    }, {
      fullname: 'Marli André (PUC SP)',
      imagemLocal: '../../assets/img/conferencistas/Marli André (PUC SP).jpg'
    }, {
      fullname: 'Menga Lüdke (PUC Rio)',
      imagemLocal: '../../assets/img/conferencistas/Menga Lüdke (PUC Rio).jpg'
    }, {
      fullname: 'Morgana Rezende (SME-Rio)',
      imagemLocal: '../../assets/img/conferencistas/Morgana Rezende (SME-Rio).jpg'
    }, {
      fullname: 'Nilda Alves (UERJ)',
      imagemLocal: '../../assets/img/conferencistas/Nilda Alves (UERJ).jpg'
    }, {
      fullname: 'Nilma Lino Gomes (UFMG)',
      imagemLocal: '../../assets/img/conferencistas/Nilma Lino Gomes (UFMG).jpg'
    }, {
      fullname: 'Patricia Cristina Albieri de Almeida (FCC)',
      imagemLocal: '../../assets/img/conferencistas/Patricia Cristina Albieri de Almeida (FCC).jpg'
    }, {
      fullname: 'Sandra Regina Soares (UNEB)',
      imagemLocal: '../../assets/img/conferencistas/Sandra Regina Soares (UNEB).jpg'
    }, {
      fullname: 'Sandra Zakia (USP)',
      imagemLocal: '../../assets/img/conferencistas/Sandra Zakia (USP).jpg'
    }, {
      fullname: 'Selma Garrido Pimenta (USP)',
      imagemLocal: '../../assets/img/conferencistas/Selma Garrido Pimenta (USP).jpg'
    }, {
      fullname: 'Silas Borges Monteiro (UFMT)',
      imagemLocal: '../../assets/img/conferencistas/Silas Borges Monteiro (UFMT).jpg'
    }, {
      fullname: 'Vera Candau (PUC-Rio)',
      imagemLocal: '../../assets/img/conferencistas/Vera Candau (PUC-Rio).jpg'
    })
  }

  encode(data) {
    var str = data.reduce(function (a, b) { return a + String.fromCharCode(b) }, '');
    return btoa(str).replace(/.{76}(?=.)/g, '$&\n');
  }

}
