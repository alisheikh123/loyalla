import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';
import { ToastService } from 'src/app/shared/services/shared/toast.service';

@Component({
  selector: 'app-edit-upload-classes',
  templateUrl: './edit-upload-classes.component.html',
  styleUrls: ['./edit-upload-classes.component.css']
})
export class EditUploadClassesComponent implements OnInit {

  caseId!:number;
  isExcelFile!: boolean;
  message: boolean = false;
  spinnerEnabled = false;
  excelFile:any;
  showAlert: boolean = false;
  progressBar: boolean = false;
  AnwserFileName: string = '';
  editCaseForm!: FormGroup;
  @ViewChild('inputFile')
  inputFile!: ElementRef;
  caseDetail:any;
  paperId:number=0;
  constructor(private fb: FormBuilder,
    private service: CasesService,private route:Router,private toaste:ToastService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.caseId = Number(res['id']);
      this.paperId = Number(res['paperId']);
    });
    
    this.initForm();
    this.editCase();
  }
  initForm() {
    this.editCaseForm = this.fb.group(
      {
        case_id:['',Validators.required],
        title: ['', Validators.required,],
        description: ['', Validators.required,],
        file: ['']
      },
    );
  }
  get f() {
    return this.editCaseForm.controls;
  }
  editCase()
  {
    this.service.editCase(this.caseId).subscribe((res:any)=>{
      this.caseDetail = res;
      let cases = {
        case_id:this.caseDetail.case_Id,
        title: this.caseDetail.title,
        description:this.caseDetail.description,
        file: this.caseDetail.fileName,
        paperId:this.paperId
      };
      this.AnwserFileName = cases.file;
      this.editCaseForm.patchValue(cases)

    });
   
    
  }
  uploadExcel(files: any) {

    let fileToUpload = <File>files[0];
    this.AnwserFileName = fileToUpload.name;
    this.progressBar = true;
    setTimeout(() => (this.progressBar = false), 1000)

    this.message = true;
    setTimeout(() => (this.message = true), 1000)
    setTimeout(() => (this.message = false), 10000)

  }

  submit(files) {
    let fileToUpload = <File>files[0];
    let formData: FormData = new FormData();
    formData.append('id',this.editCaseForm.controls['case_id'].value)
    formData.append('title', this.editCaseForm.controls['title'].value);
    formData.append('description', this.editCaseForm.controls['description'].value);
    formData.append('fileName', fileToUpload.name);
    formData.append('file', fileToUpload);
    formData.append('created_By', '');
    formData.append('creationDateTime', '');
    formData.append('updated_By', '');
    formData.append('updateDateTime', '');
    formData.append('paperId',this.paperId.toString())
    this.service.updateCases(formData).subscribe(res => {
      this.editCaseForm.reset();
      this.reload("UploadClassesComponent");

      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
      this.toaste.showSuccess("successfully updated the case","Update Case")
      setTimeout(() => {window.location.reload()}, 2000); 
      this.route.navigate(['/adminNavbar/WorkListAdmin']);

    })
    return 0;
  }
  async reload(url: string): Promise<boolean> {
    await this.route.navigateByUrl('.', { skipLocationChange: true });
    return this.route.navigateByUrl(url);
  }

}
