import { CasesService } from 'src/app/shared/services/Case/cases.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnwserSheet } from 'src/app/shared/interface/AnwserSheet';
import { ToastrService } from 'ngx-toastr';

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
  arr: any = [];
 
  constructor(private cases: CasesService,private toast:ToastrService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.paperId = Number(res['id']);
    });
    this.getQuestions();
  }
  getQuestions() {
    this.cases.getQuestionsWithAnwser(this.paperId).subscribe((res: any) => {
      this.questionsList = res?.data;
    });
  }
  getDescription(event:any,questionId:number){
    debugger;
    const anwserSheet : AnwserSheet = {
      questionId:questionId,
      optionId:0,
      anwserStatus:0,
      description:event.target.value
    }
   this.arr.push(anwserSheet);

  }
  selectedOption(questionId:number,optionId: number,description:string) {
    const anwserSheet : AnwserSheet = {
      questionId:questionId,
      optionId:optionId,
      anwserStatus:1,
      description:description
    }
     this.arr.push(anwserSheet);
  }


  saveFormData(){
    console.log(this.arr)
    this.cases.saveAnwser(this.arr).subscribe((res)=>{
      this.toast.success("Updated Successfully","Anwser Sheet")
      setTimeout(() => {window.location.reload()}, 2000); 
    })
  }


}
