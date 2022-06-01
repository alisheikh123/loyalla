import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';

@Component({
  selector: 'app-editcases',
  templateUrl: './editcases.component.html',
  styleUrls: ['./editcases.component.css']
})
export class EditcasesComponent implements OnInit {

  caseId!:number;
  isExcelFile!: boolean;
  message!: string;
  spinnerEnabled = false;
  excelFile:any;
  AnwserFileName: string = '';
  caseForm!: FormGroup;
  @ViewChild('inputFile')
  inputFile!: ElementRef;
  constructor(private fb: FormBuilder,
    private service: CasesService,private route:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.caseId = Number(res['id']);
    });
    this.initForm();
    this.getCaseDetailById();
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
  this.message = "File upload Successfully!";
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
      alert("Add Case Successfully!");
      this.reload("UploadClassesComponent");

    });

    return 0;
  }
  async reload(url: string): Promise<boolean> {
    await this.route.navigateByUrl('.', { skipLocationChange: true });
    return this.route.navigateByUrl(url);
  }
  getCaseDetailById()
  {
    console.log(this.caseId);
    this.service
  }

}
