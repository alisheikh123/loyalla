import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  paperForm!:FormGroup;
  paper:any;
  constructor(private fb: FormBuilder,private router: Router,private service:CasesService) { }

  ngOnInit(): void {
    this.getPaper();
    this.forminitial();
  }
  getPaper()
  {
    this.service.getAllPaper().subscribe((res:any)=>
    {
      this.paper = res;
    })
  }
  forminitial() {
    this.paperForm = this.fb.group({
      PaperId:0,
      PaperName:[''],
      Title:[''],
      Description:[''],
    });


  }
  submit()
  {
    let model = {
      "paperId": this.paperForm.controls['PaperId'].value,
      "paperName": this.paperForm.controls['PaperName'].value,
      "title": this.paperForm.controls['Title'].value,
      "description": this.paperForm.controls['Description'].value,
    }
    this.service.addNewPaper(model).subscribe(
      (res: any) => {
          alert('New user Paper!' + 'Registration successful.');
        }


    );
  }


}
