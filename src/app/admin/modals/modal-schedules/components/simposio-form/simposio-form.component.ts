import { Component, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { THEME_SIMPOSIO } from 'src/app/declarations';

@Component({
    selector: 'simposio-form',
    templateUrl: './simposio-form.component.html',
    styleUrls: ['./simposio-form.component.scss']
})
export class SimposioFormComponent {

    @Input() type: any;
    @Input() data: any;
    @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

    public form: FormGroup;
    public themes = THEME_SIMPOSIO;
    public days = ["29/10", "30/10", "31/10", "01/11", "02/11", "03/11", "04/11", "05/11", "06/11", "07/11", "08/11", "09/11", "10/11", "11/11", "12/11"];
    constructor(
        private builder: FormBuilder
    ) {
        this.createForm();
    }

    private createForm() {

        this.form = this.builder.group({
            theme: [null],
            startTime: [null],
            date: [null],
            endTime: [null],
            place: [null],
            address: [null],
            classification: [null],
            themeSpeeches: [null],
            virtual: this.builder.group({ linkYoutube: [null] }),
            coordinators: this.builder.array([
                this.createField()
            ])
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
                if (key == 'coordinators') {
                    this.fillArray(data.coordinators);
                } else {
                    this.form.get(key).patchValue(data[key]);
                }
            }
        }
    }

    private fillArray(data) {
        const form = this.form.get('coordinators') as FormArray;
        data.forEach((el, key) => {
            if (key == 0) {
                form.controls[0].patchValue(el);
            } else {
                form.push(this.builder.group(el));
            }
        });
    }

    private createField() {
        return this.builder.group({
            name: [null],
            isCoordinator: [false]
        });
    }

    get coordinators() {
        return this.form.get('coordinators');
    }

    public addCoordinator() {
        const coordinatorCtrl = this.form.get('coordinators') as FormArray;
        coordinatorCtrl.push(this.createField());
    }

    public removeCoordinator(pos) {
        const coordinatorCtrl = this.form.get('coordinators') as FormArray;
        coordinatorCtrl.removeAt(pos);
    }

    public submitSchedule() {
        this.submitForm.emit({ id: this.data ? this.data._id : null, data: this.form.getRawValue() });
    }

}