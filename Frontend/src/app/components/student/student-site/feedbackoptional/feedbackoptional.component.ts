import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';
import { ToastService } from 'src/app/shared/services/shared/toast.service';

@Component({
  selector: 'app-feedbackoptional',
  templateUrl: './feedbackoptional.component.html',
  styleUrls: ['./feedbackoptional.component.css']
})
export class FeedbackoptionalComponent implements OnInit {
  caseId:number=0;
  submission:number=0;
  studentId:number=0;
  paperId:number=0;
  feedbackDescription:string='';
  constructor(private activatedRoute: ActivatedRoute,private service:CasesService,private toast:ToastService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      
      this.caseId = Number(res['caseId']);
      this.studentId = Number(res['studentId']);
      this.submission = Number(res['submissionId'])
      this.paperId = Number(res['paperId'])
    });
  }
  getFeedbackDescription(event:any){
    this.feedbackDescription = event.target.value;
  }
  submit(){
    const feedbackObject = {
      CaseId:this.caseId,
      StudentId:this.studentId,
      Feedbacks:this.feedbackDescription
    }
    this.service.saveFeedBack(feedbackObject).subscribe((res)=>{
        this.toast.showSuccess("Feedback Successfully Added","Feedback Submission")
        this.router.navigateByUrl('studentNavbar/result/'+this.submission+'/'+this.paperId)
    })
  }   
  skip()
  {
    this.router.navigateByUrl('studentNavbar/result/'+this.submission)
  }

}
