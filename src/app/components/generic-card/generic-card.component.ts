import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.scss']
})
export class GenericCardComponent {

  @Input() schedule: any;
  @Input() admin = false;
  @Input() type: any;
  @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>();

  public userId: string;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnDestroy() {
    this.schedule = {};
  }

  public removeSchedule(id) {
    this.scheduleService.deleteSchedule(this.type, id)
      .subscribe(() => this.update.emit(true));
  }

  public editSchedule() {
    this.edit.emit(this.schedule);
  }

  get title() {
    switch (this.type) {
      // case '5':
      //   return 'Títulos e autores';

      case 7:
        return 'Artista(s)';

      //case '11':
      //  return 'Associação/Rede/Fórum e sigla'

      default:
        return 'Título(s)';
    }
  }
/*
  ngAfterViewInit() {
    //renderizar capa dos livros
    if(this.type == 9){

      let indexArray = 0;

      this.schedule.books.forEach(element => {

        if((document.getElementById(element.nameMiniature) as HTMLImageElement)){
          let file = element.miniature.data;
          const base64 = btoa(new Uint8Array(file).reduce((data, byte) => data + String.fromCharCode(byte), ''));
          (document.getElementById(element.nameMiniature) as HTMLImageElement).src = 'data:image/jpg;base64,' + base64;
          indexArray++;  
        }
      
      });

      
    }
  }*/

}
