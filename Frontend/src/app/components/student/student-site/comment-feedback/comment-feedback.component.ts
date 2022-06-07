import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';
import { ToastService } from 'src/app/shared/services/shared/toast.service';

@Component({
  selector: 'app-comment-feedback',
  templateUrl: './comment-feedback.component.html',
  styleUrls: ['./comment-feedback.component.css'],
})
export class CommentFeedbackComponent implements OnInit {
  form!: FormGroup;
  studentId: number = 0;
  constructor(
    private fb: FormBuilder,
    private service: CasesService,
    private activatedRoute: ActivatedRoute,
    private toast:ToastService,
    private router:Router
  ) {}
  model = {
    IsTechnicalIssue: false,
    rate: 0,
    IsUseFullLearningTool: false,
    Comment: '',
    techincalIssueDescription: '',
    studentId: 0,
  };
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.studentId = Number(res['studentId']);
    });
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      techincalIssueDescription: ['', Validators.required],
      comment: ['', Validators.required],
      rate: [0, Validators.required],
      isTechnicalIssue: [''],
      IsUseFullLearningTool: [''],
    });
  }

  selectRate(event: any) {
    this.model.rate = event.target.value;
  }
  isTechnicalIs(value: any) {
    this.model.IsTechnicalIssue = value;
  }
  isUseFull(value: any) {
    this.model.IsUseFullLearningTool = value;
  }
  submit() {
    this.model.Comment = this.form.controls['comment'].value,
    this.model.techincalIssueDescription =this.form.controls['techincalIssueDescription'].value;
    this.model.studentId = this.studentId;
    this.service.saveSurvey(this.model).subscribe((res) => {
      this.toast.showSuccess("Survey Successfull Submitted","Paper Survey")
      this.router.navigateByUrl('/studentNavbar/UserWorkList')
    });
  }
  useWorkList()
  {
    this.router.navigateByUrl('studentNavbar/UserWorkList')
  }
  newCase()
  {
    this.router.navigateByUrl('studentNavbar/UserWorkList')
  }
}
