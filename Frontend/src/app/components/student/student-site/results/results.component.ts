import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';
import { ToastService } from 'src/app/shared/services/shared/toast.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  submissionId: number = 0;
  result: number = 0;
  paperId: number = 0;
  student_Id: number = 0;
  questionsList: any;
  reviewId:number = 0;
  isHidden: boolean = false;
  answers: any[] = [];
  optionList: any;
  status: any;
  attemptedOptionDetail:any;
  TotalQuestions: number = 0;
  caseId: number = 0;
  form!: FormGroup;
  options = [];
  AttemptStatus = {
  Case_Id: 0,
    Student_Id: 0,
    Status: '',
    Created_By: 0,
    Updated_By: 0,
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: CasesService,
    private _fb: FormBuilder,
    private toast: ToastService
  ) {
    this.form = _fb.group({});
    this.student_Id = Number(localStorage.getItem('userid'));
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.submissionId = Number(res['submissionId']);
      this.paperId = Number(res['paperId'])
      this.reviewId = Number(res['reviewId'])
      this.getResult();
      this.showSurvey();
    
    });
    this.getQuestions();
    if(this.reviewId==1){
      this.isHidden=true;
      this.getSubmissionAgainstPaperId();
    }
    if(this.reviewId==0){
      this.isHidden=false
    }
  }
  getResult() {
    this.service.getResult(this.submissionId).subscribe((res) => {
      this.result = res.code;
    });
  }
  getSubmissionAgainstPaperId(){
    this.service.getSubmissionIdByPaperId(this.paperId).subscribe((res)=>{
      this.attemptedOptionDetail = res.data;
    })
  }
  getQuestions() {
    this.service.getQuestionsWithAnwser(this.paperId).subscribe((res: any) => {
      this.questionsList = res?.data;
      this.caseId = res?.data.caseId;
      this.TotalQuestions = this.questionsList.questions.length;
      this.questionsList.questions.forEach((question) => {
        this.form.addControl(
          question.questionId,
          this._fb.control(null, Validators.required)
        );
      });
      this.getStatusList();
    });
  }
  retake() {
    this.ngOnInit();
  }
  showSurvey(){
    this.service.getAttempts(this.student_Id).subscribe((res)=>{
      if(res.code>=10){
        setTimeout(() => (this.router.navigateByUrl('studentNavbar/Comment/'+ this.student_Id)), 3000)
      }
      else{
      }
    })
  }
  getStatusList() {
    var studentid = JSON.parse(localStorage.getItem('userid') || '{}');
    this.service
      .getStatus(parseInt(studentid), this.caseId)
      .subscribe((res: any) => {
        if (res.data.length > 0) {
          this.status = res.data[0].status;
        }
      });
  }
  selectedOption(model: any, obj: any) {
    let findId = obj.find((x: any) => x.isAnwsers === 1);

    var data = {
      id: model.questionId,
      questionId: model.questionId,
      submissionId: 0,
      attemptedOptionId: model.id,
      correctOptionId: findId.id,
      description: '',
    };
    this.upsertAnswer(data);
  }

  upsertAnswer(item: any) {
    const i = this.answers.findIndex(
      (_item) => _item.questionId === item.questionId
    );
    if (i > -1) this.answers[i] = item;
    else this.answers.push(item);
  }
  submit() {
    if (this.status !== 'Submitted') {
      var studentid = JSON.parse(localStorage.getItem('userid') || '{}');

      let model = {
        submissionId: 0,
        paperId: this.paperId,
        caseId: this.caseId,
        totalQuestions: this.TotalQuestions,
        studentId: parseInt(studentid),
        submission: this.answers,
      };
      this.service.submitPaper(model).subscribe((res: any) => {
        this.AttemptStatus.Case_Id = this.caseId;
        this.AttemptStatus.Student_Id = parseInt(studentid);
        this.AttemptStatus.Status = 'Submitted';
        this.AttemptStatus.Created_By = parseInt(studentid);
        this.AttemptStatus.Updated_By = parseInt(studentid);
        this.submissionId = res.code;

        this.service
          .UpdateCaseStatusSubmission(this.AttemptStatus)
          .subscribe((res: any) => {
            this.isHidden = true;
            this.toast.showSuccess(
              'Paper successfully submitted.',
              'Paper Submission'
            );
            this.router.navigateByUrl(
              '/studentNavbar/FeedbackOptional/' +
                this.AttemptStatus.Case_Id +
                '/' +
                this.AttemptStatus.Student_Id +
                '/' +
                this.submissionId+
                '/' +
                this.paperId
            );
          });
      });
    } else {
      this.isHidden = true;
    }
  }
}
