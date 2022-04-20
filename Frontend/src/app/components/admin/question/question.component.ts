import { CasesService } from './../../../shared/services/Case/cases.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionForm!:FormGroup;
  questions:any;
  paper:any
  questionType =
  [{ id:"0",name: "Description" },
  { id:"1",name: "Multiple Choice" },
]
  constructor(private fb: FormBuilder,private router: Router,private service:CasesService) { }

  ngOnInit(): void {
    this.loadPaper();
    this.forminitial();
    this.getQuestion();
  }
  loadPaper()
  {
    this.service.getAllPaper().subscribe((res:any)=>
    {
      this.paper = res;
    })
  }
  getQuestion()
  {
    this.service.getAllQuestions().subscribe((res:any)=>
    {
      debugger;
      this.questions = res;
      this.service.getPaperById(res?.paperId).subscribe((response:any)=>
      {
        debugger;
        this.questions = response;

      });
    })
  }
  forminitial() {
    this.questionForm = this.fb.group({
      Question_Id:0,
      PaperId:[''],
      Question:[''],
      QuestionType:[''],
      Created_By:0,
      CreateDateTime:[''],
      UpdatedDateTime:[''],
      Updated_By:0,
    });


  }
  submit()
  {
    let model = {
      "question_Id": 0,
      "paperId": this.questionForm.controls['PaperId'].value,
      "question": this.questionForm.controls['Question'].value,
      "questionType": this.questionForm.controls['QuestionType'].value,
      "created_By": 0,
      "creationDateTime": "2022-04-20T11:57:06.597Z",
      "updated_By": 0,
      "updateDateTime": "2022-04-20T11:57:06.597Z"
    }
    this.service.addNewQuestion(model).subscribe(
      (res: any) => {
        debugger
          alert('New user created!' + 'Registration successful.');
          // this.router.navigate([""]);
        }


    );
  }

  selectQuestionType(event:any)
  {
    let value = event.target.value;
    this.questionForm.controls['QuestionType'].setValue(value);
  }
  selectPaper(event:any)
  {
    let value = event.target.value;
    this.questionForm.controls['PaperId'].setValue(value);
  }


}
