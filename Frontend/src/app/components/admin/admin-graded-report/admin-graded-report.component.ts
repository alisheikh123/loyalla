import { CasesService } from 'src/app/shared/services/Case/cases.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-graded-report',
  templateUrl: './admin-graded-report.component.html',
  styleUrls: ['./admin-graded-report.component.css']
})
export class AdminGradedReportComponent implements OnInit {
  anwserList: any;
  questionsList: any;
  optionList: any
  paperId:number = 0;
  constructor(private cases: CasesService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.paperId = Number(res['id']);
    });
    this.getQuestions();
    this.getAnwsers();
  }
  getQuestions() {


    this.cases.getQuestionsWithAnwser(this.paperId).subscribe((res: any) => {
      this.questionsList = res?.data;
      console.log(this.questionsList);

    });
  }
  getAnwsers() {
    this.cases.getAnwsers().subscribe((res) => {
      this.anwserList = res;
    });
  }
  selectedOption(optionId: number) {
    console.log(optionId);
  }


}
