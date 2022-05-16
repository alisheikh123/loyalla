import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-student-paper',
  templateUrl: './student-paper.component.html',
  styleUrls: ['./student-paper.component.css']
})
export class StudentPaperComponent implements OnInit {

  questionsList: any;
  optionList: any;
  paperId:number=0;
  form: FormGroup;
  options =[]

  constructor(private cases: CasesService,private activatedRoute: ActivatedRoute, private _fb: FormBuilder) {
    this.form = _fb.group({});
   
   }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(res => {
      this.paperId = Number(res['id']);
    });
    this.getQuestions();
  }
  getQuestions() {


    this.cases.getQuestionsWithoutAnwser(this.paperId).subscribe((res: any) => {

      debugger
      this.questionsList = res?.data;
      this.questionsList.questions.forEach(question => {
        this.form.addControl(question.questionId, this._fb.control(null, Validators.required));
      })
      console.log(this.questionsList);

    });
  }

  selectedOption(event:any) {
   const { name, value } = event.target;  
   console.log(name,value);
  }

}
