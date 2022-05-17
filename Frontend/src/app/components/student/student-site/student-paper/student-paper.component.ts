import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';

@Component({
  selector: 'app-student-paper',
  templateUrl: './student-paper.component.html',
  styleUrls: ['./student-paper.component.css']
})
export class StudentPaperComponent implements OnInit {

  questionsList: any;
  optionList: any;
  paperId:number=0;
  constructor(private cases: CasesService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.paperId = Number(res['id']);
    });
    this.getQuestions();
  }
  getQuestions() {


    this.cases.getQuestionsWithoutAnwser(this.paperId).subscribe((res: any) => {


      this.questionsList = res?.data;

      console.log(this.questionsList);

    });
  }

  selectedOption(optionId: number) {
    console.log(optionId);
  }

}
