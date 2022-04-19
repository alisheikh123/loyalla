import { CasesService } from '../../../shared/services/Case/cases.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-upload-classes',
  templateUrl: './upload-classes.component.html',
  styleUrls: ['./upload-classes.component.css']
})
export class UploadClassesComponent implements OnInit {
  isExcelFile!: boolean;
  spinnerEnabled = false;
  keys: string = '';
  caseForm!: FormGroup;
  @ViewChild('inputFile')
  inputFile!: ElementRef;
  constructor(private fb: FormBuilder,
    private service: CasesService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.caseForm = this.fb.group(
      {
        case_Id: 0,
        title: ['', Validators.required,],
        description: ['', Validators.required,],
        file: ['', Validators.required],
        fileSource: ['', Validators.required,],
        created_By: 0,
        creationDateTime: [''],
        updated_By: 0,
        updateDateTime: [''],
      },
    );
  }
  get f() {
    return this.caseForm.controls;
  }


  onChange(event) {
    debugger;
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.keys = file.name;
      this.caseForm.get('file')!.setValue(file);
    }
  }

  submit() {

    const formData = new FormData();
    if (!this.caseForm.get('file')!.value) {
      alert('Please fill valid details!');
      return false;
    }
    formData.append('file', this.caseForm.get('file')!.value);
    debugger;
    console.log(this.caseForm.get('file')!.value);

    let cases = {
      "case_Id": 0,
      "title": this.caseForm.controls['title'].value,
      "description": this.caseForm.controls['description'].value,
      "created_By": 0,
      "fileName": '',
      "file": formData,
      "creationDateTime": moment(),
      "updated_By": 0,
      "updateDateTime": moment()
    }
    this.service.addNewCase(cases).subscribe(res => {
      this.caseForm.reset();
      alert("Add Case Successfully!");
    });

    return 0;
  }
}
