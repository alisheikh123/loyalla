import { ToastService } from './../../../shared/services/shared/toast.service';
import { CasesService } from '../../../shared/services/Case/cases.service';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-classes',
  templateUrl: './upload-classes.component.html',
  styleUrls: ['./upload-classes.component.css']
})
export class UploadClassesComponent implements OnInit,OnDestroy  {
  isExcelFile!: boolean;
  @ViewChild('fileInput') fileInput;
  message!: string;
  spinnerEnabled = false;
  excelFile:any;
  AnwserFileName: string = '';
  caseForm!: FormGroup;
  @ViewChild('inputFile')
  inputFile!: ElementRef;
  constructor(private fb: FormBuilder,
    private service: CasesService,private toast:ToastService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.caseForm = this.fb.group(
      {
        title: ['', Validators.required,],
        description: ['', Validators.required,],
        file: ['']
      },
    );
  }
  get f() {
    return this.caseForm.controls;
  }
uploadExcel(files:any)
{

  let fileToUpload = <File>files[0];
  this.AnwserFileName = fileToUpload.name;

}
  submit(files) {
    let fileToUpload = <File>files[0];
    let formData:FormData = new FormData();
    formData.append('title', this.caseForm.controls['title'].value);
    formData.append('description', this.caseForm.controls['description'].value);
    formData.append('fileName', fileToUpload.name);
     formData.append('file', fileToUpload);
    formData.append('created_By','');
    formData.append('creationDateTime', '');
    formData.append('updated_By', '');
    formData.append('updateDateTime', '');
    this.service.addNewCase(formData).subscribe(res => {
      this.caseForm.reset();
      this.toast.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
      alert("Add Case Successfully!");
    });

    return 0;
  }
  ngOnDestroy(): void {
    this.toast.clear();
  }
}
