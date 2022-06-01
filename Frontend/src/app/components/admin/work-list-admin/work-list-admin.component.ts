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
  allCases: any;
  paperId: number = 0;
  config: any;
  // collection = { count: 60, data: [] };
  id:any;
  searchText: any;

  constructor(private service:CasesService, private toast :ToastService) { 

    
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      // totalItems: this.collection.count
    };  
   }
 
	   
   
ngOnInit(): void {
  this.getCaseList();
}
pageChanged(event){
  this.config.currentPage = event;
}

getCaseList()
{
  this.service.getCaseList().subscribe((res: any) => {
    this.allCases = res;
    console.log(this.allCases)
  });
}

deleteCase(caseId: number)
{
  this.service.deleteCase(caseId).subscribe((res: any) => {
    window.location.reload();
  });
  this.toast.showError("Successfully Delete the Case", "All Cases")
  setTimeout(() => { window.location.reload() }, 1000);
}
 

}

