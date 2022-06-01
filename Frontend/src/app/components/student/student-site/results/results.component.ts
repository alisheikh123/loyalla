import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  submissionId:number=0;
  result:number=0;
 constructor(private router:Router,private activatedRoute: ActivatedRoute,private service:CasesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      
      this.submissionId = Number(res['submissionId']);
     this.getResult();
    });
  }
  getResult(){
    this.service.getResult(this.submissionId).subscribe((res)=>
    {
      this.result = res.code;
    })
  }
  retake(){
    // this.router.navigateByUrl('/studentNavbar/result/'+this.submissionId)
    this.ngOnInit()
  }

}
