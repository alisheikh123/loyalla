import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';
@Component({
  selector: 'app-user-work-list',
  templateUrl: './user-work-list.component.html',
  styleUrls: ['./user-work-list.component.css']
})
export class UserWorkListComponent implements OnInit {
  allCases:any;
  constructor(private service:CasesService,private router: Router) { }

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
  read(){
    this.router.navigate(['/UserWOrkList/ReadStudy']);
  }
}
