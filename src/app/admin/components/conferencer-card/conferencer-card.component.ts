import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ConferencistaService } from 'src/app/services/conferencista.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'conferencer-card',
  templateUrl: './conferencer-card.component.html',
  styleUrls: ['./conferencer-card.component.scss']
})
export class ConferencerCardComponent {

  @Input() public conferencista: any;
  @Output() selected = new EventEmitter();

  @ViewChild('imageRender', { static: false }) imageRender: ElementRef;

  constructor(
    public conferencistaService: ConferencistaService,
    public toast: ToastrService

  ) { }


  public delete(_id) {

    this.conferencistaService.deletar(_id).subscribe((res: any) => {
      this.toast.success("Sucesso", "Conferencista excluido com sucesso");
      this.selected.emit(true);

    }, err => {
      this.toast.error("Erro", "Ocorreu um erro no servidor, tente novamente mais tarde");
    });

  }
}
