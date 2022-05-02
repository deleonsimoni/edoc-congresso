import { Component, Output, EventEmitter, SimpleChanges, Input, ElementRef, ViewChild, OnInit, ViewChildren, QueryList } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { NgxImageCompressService } from 'ngx-image-compress';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line: component-selector
  selector: "generic-form",
  templateUrl: "./generic-form.component.html",
  styleUrls: ["./generic-form.component.scss"],
})
export class GenericFormComponent {
  @Input() type: any;
  @Input() data: any;
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  private miniature: FileList;
  @ViewChild('imageRender', { static: false }) imageRender: ElementRef;
  @ViewChildren('images') elements: QueryList<any>;

  public form: FormGroup;
  public days = ["29/10", "30/10", "31/10", "01/11", "02/11", "03/11", "04/11", "05/11", "06/11", "07/11", "08/11", "09/11", "10/11", "11/11", "12/11"];

  constructor(private builder: FormBuilder,
    private imageCompress: NgxImageCompressService,
    private _sanitizer: DomSanitizer) {
    this.createForm();
  }

  private createForm() {
    this.form = this.builder.group({
      titles: this.builder.array([this.createField()]),
      date: [null],
      startTime: [null],
      endTime: [null],
      place: [null],
      virtual: this.builder.group({ linkYoutube: [null], linkZoom: [null] }),
      books: this.builder.array([this.builder.group({ title: [null], author: [null], resume: [null], linkSale: [null], miniature: [null], nameMiniature: [null], isChangeImage: false })]),
      address: [null],
      theme: [null],
      coordinators: this.builder.array([this.createCoordinatorsField()]),
      entrevistados: this.builder.array([this.createEntrevistadosField()]),
      entrevistadores: this.builder.array([this.createEntrevistadoresField()])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      this.fillForm(changes.data.currentValue);
    }
  }

  private fillForm(data) {
    for (const key in this.form.controls) {
      if (data.hasOwnProperty(key)) {
        if (key == "titles") {
          this.fillArray(data.titles, key);
        } else if (key == "coordinators") {
          this.fillArray(data.coordinators, key);
        } else if (key == "entrevistados") {
          this.fillArray(data.entrevistados, key);
        } else if (key == "entrevistadores") {
          this.fillArray(data.entrevistadores, key);
        } else if (key == "books") {
          this.fillArray(data.books, key);
        } else {
          this.form.get(key).patchValue(data[key]);
        }
      }
    }
  }

  private fillArray(data, keyForm) {
    const form = this.form.get(keyForm) as FormArray;
    data.forEach((el, key) => {
      if (key == 0) {
        form.controls[0].patchValue(el);
      } else {
        if (keyForm == "coordinators" || keyForm == "entrevistados" || keyForm == "entrevistadores") {
          form.push(this.builder.group(el));
        } else if (keyForm == "books") {
          form.push(this.builder.group(el));
        } else {
          form.push(this.builder.control(el));
        }
      }
    });
  }

  public createField() {
    return this.builder.control(null);
  }

  private createCoordinatorsField() {
    return this.builder.group({
      name: [null],
      isCoordinator: [false],
    });
  }

  private createEntrevistadosField() {
    return this.builder.group({
      name: [null]
    });
  }


  private createEntrevistadoresField() {
    return this.builder.group({
      name: [null]
    });
  }

  get titles() {
    return this.form.get("titles");
  }

  get coordinators() {
    return this.form.get("coordinators");
  }

  get entrevistados() {
    return this.form.get("entrevistados");
  }

  get entrevistadores() {
    return this.form.get("entrevistadores");
  }

  get books() {
    return this.form.get("books");
  }
  public addTitles() {
    const titlesCtrl = this.form.get("titles") as FormArray;
    titlesCtrl.push(this.createField());
  }

  public removeTitles(pos) {
    const titlesCtrl = this.form.get("titles") as FormArray;
    titlesCtrl.removeAt(pos);
  }

  public addCoordinator() {
    const coordinatorCtrl = this.form.get("coordinators") as FormArray;
    coordinatorCtrl.push(this.createCoordinatorsField());
  }

  public addEntrevistado() {
    const entrevistadoCtrl = this.form.get("entrevistados") as FormArray;
    entrevistadoCtrl.push(this.createEntrevistadosField());
  }

  public addEntrevistador() {
    const entrevistadorCtrl = this.form.get("entrevistadores") as FormArray;
    entrevistadorCtrl.push(this.createEntrevistadoresField());
  }

  public removeCoordinator(pos) {
    const coordinatorCtrl = this.form.get("coordinators") as FormArray;
    coordinatorCtrl.removeAt(pos);
  }


  public removeEntrevistado(pos) {
    const entrevistadoCtrl = this.form.get("entrevistados") as FormArray;
    entrevistadoCtrl.removeAt(pos);
  }

  public removeEntrevistador(pos) {
    const entrevistadorCtrl = this.form.get("entrevistadores") as FormArray;
    entrevistadorCtrl.removeAt(pos);
  }

  public submitSchedule() {
    this.submitForm.emit({ id: this.data ? this.data._id : null, data: this.form.getRawValue() });
  }

  //  public setBookForm(books, i) {
  //   const dataCtrel = this.form.get("books") as FormArray;
  //   dataCtrel.at(i).patchValue({ "title": books.title, "author": books.author, "resume": books.resume, "linkSale": books.linkSale, "miniature": books.miniature });
  //{ "work": workForm._id, "workTitle": workForm.title}
  //}

  public addBook() {
    const dataCtrel = this.form.get("books") as FormArray;
    dataCtrel.push(this.builder.group({ title: [null], author: [null], resume: [null], linkSale: [null], miniature: [null], nameMiniature: [null], isChangeImage: false }));
  }


  public removeBook(pos) {
    const dataCtrel = this.form.get("books") as FormArray;
    dataCtrel.removeAt(pos);
  }

  public loadImage(indexArray) {
    let element: HTMLElement = document.getElementById('miniature' + indexArray) as HTMLElement;
    element.click();
  }

  public setMiniature(files: FileList, indexArray): void {
    this.miniature = files;

    const reader = new FileReader();
    reader.readAsDataURL(this.miniature[0]); // Read file as data url
    reader.onloadend = (e) => { // function call once readAsDataUrl is completed

      var orientation = -1;
      this.imageCompress.compressFile(e.target['result'], orientation, 50, 50).then(
        result => {

          // create file from byte
          const imageName = this.miniature[0].name;
          // call method that creates a blob from dataUri
          //const imageBlob = this.dataURItoBlob(result.split(',')[1]);
          //imageFile created below is the new compressed file which can be send to API in form data
          //const img =  new File([result], imageName, { type: 'image/jpeg' });

          (document.getElementById('imageRender' + indexArray) as HTMLImageElement).src = result;
          // this.imageRender.nativeElement.src = e.target['result']; // Set image in element
          const dataCtrel = this.form.get("books") as FormArray;
          dataCtrel.at(indexArray).patchValue({ "miniature": result, "nameMiniature": imageName, "isChangeImage": true });
        });



    };
  }


  ngAfterViewInit() {
    const dataCtrel = this.form.get("books") as FormArray;
    let indexArray = 0;
    dataCtrel.value.forEach(element => {

      if (dataCtrel.at(indexArray).value.nameMiniature) {
        (document.getElementById('imageRender' + indexArray) as HTMLImageElement).src = "https://ffainfinity.s3-sa-east-1.amazonaws.com/books/" + dataCtrel.at(indexArray).value.nameMiniature;
      }

      indexArray++;

    });

  }

  dataURItoBlob(dataURI) {

    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;

  }

  get title() {
    switch (Number(this.type)) {
      case 5:
        return "Títulos e autores";

      case 7:
        return "Artista(s)";
      case 9:
        return "Título";

      //    case "11":
      //      return "Conexão Entrevista";

      case 1:
      case 10:
      case 11:
      case 12:
        return "Título(s)";
    }
  }
}
