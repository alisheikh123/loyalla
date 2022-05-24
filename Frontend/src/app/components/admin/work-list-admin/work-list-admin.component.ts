import { CasesService } from './../../../shared/services/Case/cases.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/shared/services/shared/toast.service';

@Component({
  selector: 'app-work-list-admin',
  templateUrl: './work-list-admin.component.html',
  styleUrls: ['./work-list-admin.component.css']
})
export class WorkListAdminComponent implements OnInit {
  allCases:any;
  paperId:number = 0;

  constructor(private service:CasesService,private toast:ToastService) { }

  ngOnInit(): void {
   
    this.getCaseList();
  }
  getCaseList()
  {
    this.service.getCaseList().subscribe((res:any)=>{
        this.allCases = res;
    });
  }

  deleteCase(caseId:number)
  {
    this.service.deleteCase(caseId).subscribe((res:any)=>{
      
    });
    this.toast.showError("Successfully Delete the Case","All Cases")
      setTimeout(() => {window.location.reload()}, 2000); 
  }
 

}

