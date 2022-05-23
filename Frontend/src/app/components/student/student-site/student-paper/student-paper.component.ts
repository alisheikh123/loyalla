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
  description : any []=[];
  answers : any []=[];
  optionList: any;
  status:any;
  paperId:number=0;
  TotalQuestions:number=0;
  caseId:number=0;
  form: FormGroup;
  options =[];
  AttemptStatus={
    Case_Id : 0,
    Student_Id : 0,
    Status : "",
    Created_By : 0,
    Updated_By : 0,
  };

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
      this.caseId = res?.data.caseId;
      this.TotalQuestions = this.questionsList.questions.length;
      this.questionsList.questions.forEach(question => {
        this.form.addControl(question.questionId, this._fb.control(null, Validators.required));
      })
      this.getStatusList()
      console.log(this.questionsList);

    });
  }

  // selectedOption(Correct option Id, Selected Option Id, Question Id)

  selectedOption(c_id:any, s_id: any, q_id : any) {
   var data = {
     id : 0,
     questionId : q_id,
     submissionId : 0,
     attemptedOptionId : s_id,
     correctOptionId : c_id,
     description: ""
   } 
   this.upsertAnswer(data)
  }

  changeDescription(event:any, id : any) {
    
    var data = {
      description : event.target.value,
      id : id
    }

    this.upsertDescription(data)
  }


   upsertDescription(item:any) { 
    const i = this.description.findIndex(_item => _item.id === item.id);
    if (i > -1) this.description[i] = item; 
    else this.description.push(item);

  }

   upsertAnswer(item:any) { 
    const i = this.answers.findIndex(_item => _item.questionId === item.questionId);
    if (i > -1) this.answers[i] = item; 
    else this.answers.push(item);

  }
  submit(){
    
    if(this.status !== "Submitted"){
    for(var i = 0 ; i < this.description.length ; i++){
          this.answers.find(v => v.questionId == this.description[i].id).description = this.description[i].description;
      }

    var studentid = JSON.parse(localStorage.getItem('userid') || "{}");


    let model = {
      "submissionId": 0,
      "paperId": this.paperId,
      "caseId": this.caseId,
      "totalQuestions" : this.TotalQuestions,
      "studentId": parseInt(studentid),
      "submission" : this.answers 
    }

    this.cases.submitPaper(model).subscribe(
      (res: any) => {
        debugger
        console.log(res)

        this.AttemptStatus.Case_Id = this.caseId;
        this.AttemptStatus.Student_Id = parseInt(studentid);
        this.AttemptStatus.Status = "Submitted";
        this.AttemptStatus.Created_By = parseInt(studentid);
        this.AttemptStatus.Updated_By = parseInt(studentid);
  
        this.cases.UpdateCaseStatusSubmission(this.AttemptStatus).subscribe((res:any)=>{
          alert('Paper successfully submitted.');
        
        })
        }

    );
    }
    else{
      alert("You already submitted the paper")
    }

  }

  getStatusList()
  {  
    
    var studentid = JSON.parse(localStorage.getItem('userid') || "{}");
    this.cases.getStatus(parseInt(studentid),this.caseId).subscribe((res:any)=>{
      console.log("status",res);
      if(res.data.length > 0 ){
        this.status = res.data[0].status;
      }

  });
  }
}
