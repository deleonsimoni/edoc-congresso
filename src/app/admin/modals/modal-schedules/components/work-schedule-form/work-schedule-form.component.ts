import { Component, Input, SimpleChanges, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, FormArray } from "@angular/forms";
import { AXIS } from "src/app/declarations";
import { AdminService } from "src/app/admin/admin.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "work-schedule-form",
  templateUrl: "./work-schedule-form.component.html",
  styleUrls: ["./work-schedule-form.component.scss"],
})
export class WorkScheduleFormComponent {
  @Input() type: any;
  @Input() data: any;
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;
  public axisCollection = AXIS;
  public works = [];
  public days = ["29/10", "30/10", "31/10", "01/11", "02/11", "03/11", "04/11", "05/11", "06/11", "07/11", "08/11", "09/11", "10/11", "11/11", "12/11"];
  public selectedWork;
  public selectedWorkPoster = [];

  public modelConfig = { standalone: true };

  constructor(private builder: FormBuilder, private toastr: ToastrService, private adminService: AdminService) {
    
    this.form = this.builder.group({
      work: [null],
      axis: [null],
      place: [null],
      authors: [null],
      address: [null],
      monitor: [null],
      mediator: [null],
      worksPoster: this.builder.array([this.builder.group({ work: [null], workTitle: [null], linkPPT: [null] })]),
      dates: this.builder.array([this.builder.group({ startTime: [null], endTime: [null], date: [null], linkZoom: [null] })]),
      virtual: this.builder.group({ linkZoom: [null], monitor: [null], mediator: [null], ppt: [null] }),
      workTitle: [null],
      qtdSubscribers: [null],
      qtdDias: [null],
      resumePropose: [null],
    });

    this.form.get("axis").valueChanges.subscribe((val) => {
      this.listAllWorks(Number(val), Number(this.type));
    });
  }


  public setWorkForm(workForm) {
    this.form.get("work").patchValue(workForm._id);
    this.form.get("workTitle").patchValue(workForm.title);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      this.fillForm(changes.data.currentValue);
    }
  }

  private fillForm(data) {
    for (const key in this.form.controls) {
      if (data.hasOwnProperty(key)) {
        if (key == "axis") {
          this.form.get(key).patchValue(Number(data[key]));
        }else if (key == "dates") {
          this.fillArray(data.dates, key);
        }else if (key == "worksPoster") {
          this.selectedWorkPoster = data.worksPoster;
          this.fillArray(data.worksPoster, key);
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
          form.push(this.builder.group(el));
      }
    });
  }

  private listAllWorks(axis, modality) {
      this.adminService.retrieveAllWorksValids(axis, modality).subscribe((works) => {
        if (works.temErro) {
          this.toastr.error("Erro", works);
        } else {
          this.works = works;

          //caso seja poster - tratar os trabalhos para combobox
          if(this.type == 3){
            let workFor = this.selectedWorkPoster;

            for (let index = 0; index < workFor.length; index++) {
              this.selectedWorkPoster[index] = this.works.filter(e => {
              return workFor[index].work == e._id 
              })[0];
            }
          } else {
            this.selectedWork = this.works.filter(e => {
              return this.form.get("work").value == e._id 
              })[0];
          }


        }
      });
  }

  get dates() {
    return this.form.get("dates");
  }

  public addDate() {
    const dataCtrel = this.form.get("dates") as FormArray;
    dataCtrel.push(this.builder.group({ startTime: [null], endTime: [null], date: [null], linkZoom: [null] }));
  }

  public removeDate(pos) {
    const dataCtrel = this.form.get("dates") as FormArray;
    dataCtrel.removeAt(pos);
  }

  get worksPoster() {
    return this.form.get("worksPoster");
  }

  public addWorkPoster() {
    const dataCtrel = this.form.get("worksPoster") as FormArray;
    dataCtrel.push(this.builder.group({ work: [null], workTitle: [null], linkPPT: [null] }));
  }

  public setWorkFormPoster(workForm, i) {
    const dataCtrel = this.form.get("worksPoster") as FormArray;
    dataCtrel.at(i).patchValue({"work": workForm._id, "workTitle": workForm.title});
    //{ "work": workForm._id, "workTitle": workForm.title}
  }

  public removeWorkPoster(pos) {
    const dataCtrel = this.form.get("worksPoster") as FormArray;
    dataCtrel.removeAt(pos);
  }

  public get axis() {
    return this.form.get("axis").value;
  }

  public diffTypeP() {
    return this.type != "3";
  }

  public submitSchedule() {
    this.submitForm.emit({ id: this.data ? this.data._id : null, data: this.form.getRawValue() });
  }
}
