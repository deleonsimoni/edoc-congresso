import { Component, OnInit } from '@angular/core';
import { ModalProgramacaoComponent } from '../modal-programacao/modal-programacao.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-hospedagem',
  templateUrl: './modal-hospedagem.component.html',
  styleUrls: ['./modal-hospedagem.component.scss']
})
export class ModalHospedagemComponent implements OnInit {

  public hoteis: any;
  public hostels: any;

  constructor(
    public dialogRef: MatDialogRef<ModalProgramacaoComponent>,
  ) { }

  public close() {
    this.dialogRef.close();
  }

  ngOnInit() {

    this.hostels = [
      {
        "nome": "Gaia Hostel",
        "endereco": "Rua Mena Barreto, 18, Botafogo, Rio de Janeiro/RJ",
        "tel": "+55 21 3081-5108",
        "site": "http://www.gaiahostel.com.br/site/pt/",
        "deslocamento": "8 min de carro / 20 min a pé",
        "email": "contato@gaiahostel.com.br"
      },
      {
        "nome": "Hospedaria Rio",
        "endereco": "Rua Vicente de Sousa, 29,  Botafogo, Rio de Janeiro/RJ",
        "tel": "+55 21 3496-2064",
        "site": "https://www.hospedariario.com.br/",
        "deslocamento": "9 min de carro / 20 min a pé",
        "email": "falecom@hospedariario.com.br"
      },
      {
        "nome": "Villa 25 Hostel &amp; Suites",
        "endereco": "Rua Gago Coutinho, 25, Laranjeiras, Rio de Janeiro/RJ",
        "tel": "+55 21 3596-2069",
        "site": "http://villa25.com.br/",
        "deslocamento": "11 min de carro / 45 min a pé",
        "email": ""
      },
      {
        "nome": "Injoy Hostel",
        "endereco": "Rua Estácio Coimbra, 80, Botafogo, Rio de Janeiro/RJ",
        "tel": "+55 21 3593-6662",
        "site": "http://www.injoyhostel.com/",
        "deslocamento": "10 min de carro / 25 min a pé",
        "email": ""
      },
      {
        "nome": "Che Lagarto Hostel Copacabana",
        "endereco": "Rua Barata Ribeiro, 111, Copacabana, Rio de Janeiro/RJ",
        "tel": "+55 21 3209-0348",
        "site": "https://www.chelagarto.com/es/component/chelagarto/hostels/24-hostel-copacabana.html",
        "deslocamento": "8 min de carro / 30 min a pé",
        "email": ""
      },
      {
        "nome": "Hostel in Rio Suites",
        "endereco": "Rua Senador Corrêa, 61, Laranjeiras, Rio de Janeiro/RJ",
        "tel": "+55 21 3591-1685",
        "site": "https://hostelinriobrazil.com.br/",
        "deslocamento": "11 min de carro / 40 min a pé",
        "email": ""
      },
    ];

    this.hoteis = [
      {
        "nome": "Ibis budget RJ Praia de Botafogo",
        "endereco": "Praça Joia Valansi, 24, Botafogo, Rio de Janeiro/RJ",
        "tel": "+55 21 2156-6999",
        "site": "https://all.accor.com/hotel/9600/index.pt-br.shtml?adults=&amp;children=&amp;nights=&amp;dateIn=",
        "deslocamento": "7 min de carro / 19 min a pé",
        "email": ""
      },
      {
        "nome": "Hotel Ibis Styles Rio de Janeiro Botafogo",
        "endereco": "Rua São Clemente, 30, Botafogo, Rio de Janeiro/RJ",
        "tel": "+55 21 3166-9240",
        "site": "https://all.accor.com/hotel/B2Z6/index.pt-br.shtml",
        "deslocamento": "8 min de carro / 18 min a pé",
        "email": ""
      },
      {
        "nome": "Ibis",
        "endereco": "Rua Paulino Fernandes, 39, Botafogo, Rio de Janeiro/RJ",
        "tel": "+55 21 3515-2999",
        "site": "https://all.accor.com/hotel/7547/index.pt-br.shtml",
        "deslocamento": "Localizado a 5 min do metrô e a 6 km do local do evento",
        "email": ""
      },
      {
        "nome": "Mercure Botafogo Mourisco",
        "endereco": "Rua da Passagem, 39, Botafogo, Rio de Janeiro/RJ",
        "tel": "+55 21 2131-1212",
        "site": "https://all.accor.com/hotel/8940/index.pt-br.shtml?adults=&amp;children=&amp;nights=&amp;dateIn=",
        "deslocamento": "6 min de carro / 12 min a pé",
        "email": ""
      },
      {
        "nome": "Novotel RJ Praia de Botafogo",
        "endereco": "Condomínio do Edifício Praia de Botafogo - Praia de Botafogo, 330 - Botafogo, Rio de Janeiro",
        "tel": "+55 21 2187-9999",
        "site": "https://all.accor.com/hotel/9631/index.en.shtml?adults=&amp;children=&amp;nights=&amp;dateIn=",
        "deslocamento": "5 min de carro / 17 min a pé",
        "email": ""
      },
      {
        "nome": "Acapulco Copacabana Hotel",
        "endereco": "Rua Gustavo Sampaio, 854, Leme, Rio de Janeiro/RJ",
        "tel": "+55 21 3077-2000",
        "site": "http://www.acapulcohotel.com.br/",
        "deslocamento": "5 min de carro / 25 min a pé",
        "email": ""
      },
      {
        "nome": "Real Palace Hotel",
        "endereco": "Rua Duvivier, 70, Copacabana, Rio de Janeiro/RJ",
        "tel": "+55 21 2101-9292",
        "site": "https://site.realpalacehotelrj.com.br/",
        "deslocamento": "7 min de carro / 31 min a pé",
        "email": ""
      },
      {
        "nome": "Hotel Atlântico Praia",
        "endereco": "Av. Atlântica, 1456, Copacabana, Rio de Janeiro/RJ",
        "tel": "+55 21 2543-4123",
        "site": "https://www.atlanticopraia.com.br/",
        "deslocamento": "6 min de carro / 35 min a pé",
        "email": ""
      },
      {
        "nome": "Windsor Copa Hotel",
        "endereco": "Av. Nossa Sra. de Copacabana, 335, Copacabana, Rio de Janeiro/RJ",
        "tel": "+55 21 2195-5300",
        "site": "https://windsorhoteis.com/",
        "deslocamento": "10 min de carro / 35 min a pé",
        "email": ""
      },
      {
        "nome": "Hotel SESC",
        "endereco": "Rua Domingos Ferreira, 160, Copacabana, Rio de Janeiro/RJ",
        "tel": "+55 21 2548-1088",
        "site": "http://www.sescrio.org.br/servicos/hotel/hotel-sesc-copacabana",
        "deslocamento": "15 min de carro / 44 min a pé",
        "email": ""
      },
      {
        "nome": "Hotel Regina",
        "endereco": "Rua Ferreira Viana, 29, Flamengo, Rio de Janeiro/RJ",
        "tel": "+55 21 4042-0989",
        "site": "https://www.hotelregina.com.br/",
        "deslocamento": "10 km do evento",
        "email": ""
      },
      {
        "nome": "Hotel Santa Clara",
        "endereco": "Rua Decio Vilares, 316, Copacabana, Rio de Janeiro/RJ",
        "tel": "+55 2256-2650",
        "site": "https://www.hotelsantaclara.com.br/",
        "deslocamento": "13 min de carro / 44 min a pé",
        "email": ""
      }
    ];

  }

}
