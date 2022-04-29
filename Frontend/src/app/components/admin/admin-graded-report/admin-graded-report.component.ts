import { CasesService } from 'src/app/shared/services/Case/cases.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-graded-report',
  templateUrl: './admin-graded-report.component.html',
  styleUrls: ['./admin-graded-report.component.css']
})
export class AdminGradedReportComponent implements OnInit {
  anwserList:any;
  questionsList:any;
  optionList:any
  constructor(private cases:CasesService) { }

  ngOnInit(): void {
    this.getQuestions();
    this.getAnwsers();
  }
  getQuestions()
  {


    this.cases.getQuestions().subscribe((res:any)=>
    {


      this.questionsList = res?.data;

      console.log(this.questionsList);

    });
  }
  getAnwsers()
  {
    this.cases.getAnwsers().subscribe((res)=>
    {
      this.anwserList = res;
    });
  }
  selectedOption(optionId:number)
  {
console.log(optionId);
  }


}
