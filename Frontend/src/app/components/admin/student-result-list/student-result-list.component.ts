import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';

@Component({
  selector: 'app-student-result-list',
  templateUrl: './student-result-list.component.html',
  styleUrls: ['./student-result-list.component.css'],
})
export class StudentResultListComponent implements OnInit {
  caseId: number = 0;
  studentList: any;
  paperId: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: CasesService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.caseId = Number(res['caseId']);
    });
    this.service.getPaperId(this.caseId).subscribe((res) => {
      this.paperId = res;
    });
    this.getStudentsDetail();
  }
  getStudentsDetail() {
    this.service.getStudentList(this.caseId).subscribe((res) => {
      this.studentList = res;
      console.log(this.studentList);
    });
  }
  navigateToResult() {
    this.router.navigateByUrl('/adminNavbar/studentPaper/'+this.paperId+'/1')
  }
}
