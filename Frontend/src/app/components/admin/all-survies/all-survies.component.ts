import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';

@Component({
  selector: 'app-all-survies',
  templateUrl: './all-survies.component.html',
  styleUrls: ['./all-survies.component.css']
})
export class AllSurviesComponent implements OnInit {

  studentId:any;
  surveyDetail:any;
  constructor(
    private service: CasesService,
    private router:Router) { }

  ngOnInit(): void {
    this.getStudentSurveyDetail();
  }
  getStudentSurveyDetail(){
    this.service.getAllSurvies().subscribe((res)=>{
      this.surveyDetail = res;
    })
  }

}
