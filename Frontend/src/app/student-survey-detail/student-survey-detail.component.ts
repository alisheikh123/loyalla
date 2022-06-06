import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from '../shared/services/Case/cases.service';

@Component({
  selector: 'app-student-survey-detail',
  templateUrl: './student-survey-detail.component.html',
  styleUrls: ['./student-survey-detail.component.css']
})
export class StudentSurveyDetailComponent implements OnInit {
  studentId:any;
  surveyDetail:any;
  constructor( private activatedRoute: ActivatedRoute,
    private service: CasesService,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.studentId = Number(res['studentId']);
    });
    this.getStudentSurveyDetail();
  }
  getStudentSurveyDetail(){
    this.service.studentSuveyList(this.studentId).subscribe((res)=>{
      console.log(res);
      this.surveyDetail = res;

    })
  }
}
