import { CasesService } from 'src/app/shared/services/Case/cases.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-graded-report',
  templateUrl: './admin-graded-report.component.html',
  styleUrls: ['./admin-graded-report.component.css']
})
export class AdminGradedReportComponent implements OnInit {
  anwserList:any;
  constructor(private cases:CasesService) { }

  ngOnInit(): void {
    this.getAnwsers();
  }
  getAnwsers()
  {
    this.cases.getAnwsers().subscribe((res)=>
    {
      this.anwserList = res;
      console.log(res[0])
    });
  }
}
