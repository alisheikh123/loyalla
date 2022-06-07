import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/shared/toast.service';

@Component({
  selector: 'app-student-paper',
  templateUrl: './student-paper.component.html',
  styleUrls: ['./student-paper.component.css'],
})
export class StudentPaperComponent implements OnInit {
  questionsList: any;
  reviewId:number = 0;
  isHidden: boolean = false;
  answers: any[] = [];
  optionList: any;
  submissionId: number = 0;
  status: any;
  attemptedOptionDetail:any;
  paperId: number = 0;
  TotalQuestions: number = 0;
  caseId: number = 0;
  form: FormGroup;
  options = [];
  AttemptStatus = {
    Case_Id: 0,
    Student_Id: 0,
    Status: '',
    Created_By: 0,
    Updated_By: 0,
  };

  constructor(
    private cases: CasesService,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private router: Router,
    private toast: ToastService
  ) {
    this.form = _fb.group({});
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.paperId = Number(res['id']);
      this.reviewId = Number(res['reviewId'])
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
  getSubmissionAgainstPaperId(){
    this.cases.getSubmissionIdByPaperId(this.paperId).subscribe((res)=>{
      this.attemptedOptionDetail = res.data;
    })
  }
  getQuestions() {
    this.cases.getQuestionsWithAnwser(this.paperId).subscribe((res: any) => {
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
      this.cases.submitPaper(model).subscribe((res: any) => {
        this.AttemptStatus.Case_Id = this.caseId;
        this.AttemptStatus.Student_Id = parseInt(studentid);
        this.AttemptStatus.Status = 'Submitted';
        this.AttemptStatus.Created_By = parseInt(studentid);
        this.AttemptStatus.Updated_By = parseInt(studentid);
        this.submissionId = res.code;

        this.cases
          .UpdateCaseStatusSubmission(this.AttemptStatus)
          .subscribe((res: any) => {
            this.isHidden = true;
            this.toast.showSuccess(
              'Paper successfully submitted.',
              'Paper Submission'
            );
            this.router.navigateByUrl(
              '/studentNavbar/result/' +
                this.submissionId+
                '/' +
                this.paperId +
                '/' +
                '0'
            );
          });
      });
    } else {
      this.isHidden = true;
    }
  }

  getStatusList() {
    var studentid = JSON.parse(localStorage.getItem('userid') || '{}');
    this.cases
      .getStatus(parseInt(studentid), this.caseId)
      .subscribe((res: any) => {
        if (res.data.length > 0) {
          this.status = res.data[0].status;
        }
      });
  }
}
