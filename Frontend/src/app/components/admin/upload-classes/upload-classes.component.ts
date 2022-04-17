import { CasesService } from '../../../shared/services/Case/cases.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-upload-classes',
  templateUrl: './upload-classes.component.html',
  styleUrls: ['./upload-classes.component.css']
})
export class UploadClassesComponent implements OnInit {

  caseForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private service:CasesService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.caseForm = this.fb.group(
      {
        case_Id:0,
        title: [ '', Validators.required,],
        description: [ '',Validators.required,],
        created_By: 0,
        creationDateTime: [''],
        updated_By: 0,
        updateDateTime: [''],
      },
    );
  }
submit()
{
  let cases = {
    "case_Id": 0,
    "title": this.caseForm.controls['title'].value,
    "description": this.caseForm.controls['description'].value,
    "created_By": 0,
    "creationDateTime": moment(),
    "updated_By": 0,
    "updateDateTime": moment()
  }
 this.service.addNewCase(cases).subscribe(res => {
   this.caseForm.reset();
    alert("Add Case Successfully!");
 });
}
}
