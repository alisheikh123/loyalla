import { CasesService } from './../../../shared/services/Case/cases.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-list-admin',
  templateUrl: './work-list-admin.component.html',
  styleUrls: ['./work-list-admin.component.css']
})
export class WorkListAdminComponent implements OnInit {
  allCases:any;
  paperId:number = 0;

  constructor(private service:CasesService) { }

  ngOnInit(): void {
   
    this.getCaseList();
  }
  getCaseList()
  {
    this.service.getCaseList().subscribe((res:any)=>{
        this.allCases = res;
        console.log(this.allCases);
    });
  }

  deleteCase(caseId:number)
  {
    debugger;
    this.service.deleteCase(caseId).subscribe((res:any)=>{
      window.location.reload();
    });
  }

}

