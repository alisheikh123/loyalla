import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';

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
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: CasesService
  ) {
    this.student_Id = Number(localStorage.getItem('userid'));
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.submissionId = Number(res['submissionId']);
      this.paperId = Number(res['paperId'])
      this.getResult();
      this.showSurvey();
    
    });
  }
  getResult() {
    this.service.getResult(this.submissionId).subscribe((res) => {
      this.result = res.code;
    });
  }
  retake() {
    this.ngOnInit();
  }
  showSurvey(){
    this.service.getAttempts(this.student_Id).subscribe((res)=>{
      if(res.code>=1){
        setTimeout(() => (this.router.navigateByUrl('studentNavbar/Comment/'+ this.student_Id)), 3000)
      }
      else{
      }
    })
  }
}
