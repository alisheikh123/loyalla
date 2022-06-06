import { Router } from '@angular/router';

import { CasesService } from '../../../shared/services/Case/cases.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-classes',
  templateUrl: './upload-classes.component.html',
  styleUrls: ['./upload-classes.component.css'],
})
export class UploadClassesComponent implements OnInit {
  isExcelFile!: boolean;
  // @ViewChild('fileInput') fileInput;
  message: boolean = false;
  spinnerEnabled = false;
  showAlert: boolean = false;
  progressBar: boolean = false;
  TitleFill: boolean = false;
  excelFile: any;
  AnwserFileName: string = '';
  caseForm!: FormGroup;
  @ViewChild('inputFile')
  inputFile!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private service: CasesService,
    private toast: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.caseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: [''],
    });
  }
  user: any = {
    caseTitle: '',
  };
  get f() {
    return this.caseForm.controls;
  }
  uploadExcel(files: any) {
    let fileToUpload = <File>files[0];
    this.AnwserFileName = fileToUpload.name;
    this.progressBar = true;
    setTimeout(() => (this.progressBar = false), 1000);

    // this.message = true;
    setTimeout(() => (this.message = true), 1000);
    setTimeout(() => (this.message = false), 10000);
  }
  submit(files) {
    if (this.user.caseTitle == '') {
      this.TitleFill = true;
    } else {
      let fileToUpload = <File>files[0];
      let formData: FormData = new FormData();
      formData.append('title', this.caseForm.controls['title'].value);
      formData.append(
        'description',
        this.caseForm.controls['description'].value
      );
      formData.append('fileName', fileToUpload.name);
      formData.append('file', fileToUpload);
      formData.append('created_By', '');
      formData.append('creationDateTime', '');
      formData.append('updated_By', '');
      formData.append('updateDateTime', '');
      this.service.addNewCase(formData).subscribe((res) => {
        this.caseForm.reset();
        this.reload('UploadClassesComponent');
        this.TitleFill = false;
        this.toast.success('Case Successfully Uploaded ');
        this.route.navigateByUrl('adminNavbar/WorkListAdmin')
      });
    }
    return 0;
  }
  async reload(url: string): Promise<boolean> {
    await this.route.navigateByUrl('.', { skipLocationChange: true });
    return this.route.navigateByUrl(url);
  }
}
