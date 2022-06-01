import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { CaseuploadService } from '../services/caseupload.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload-classes',
  templateUrl: './upload-classes.component.html',
  styleUrls: ['./upload-classes.component.css']
})
export class UploadClassesComponent implements OnInit {

  constructor( private readonly caseuploadSer:CaseuploadService,private readonly route:Router) { }
  myFiles:any [] = [];

  getFileDetails (e) {
    if(e.target.files.length === 0)
      return;
    
    for (var i = 0; i < e.target.files.length; i++) { 

      this.myFiles.push(e.target.files[i]);
    }
  }

  case=new FormGroup({
    Title : new FormControl('',Validators.required),
    Description : new FormControl('',Validators.required),
    //files: new FormControl ('' ,Validators.required)
  })

  ngOnInit(): void {
  }

  uploadCase()
  {
    var formData: any = new FormData();
          for(var i =0 ; i< this.myFiles.length; i++)
          {
            formData.append("Image.files", this.myFiles[i]);
          }
    this.caseuploadSer.caseUpload(this.case.value).subscribe(res=>{
    })
  }
}
