import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/Case/cases.service';
@Component({
  selector: 'app-user-work-list',
  templateUrl: './user-work-list.component.html',
  styleUrls: ['./user-work-list.component.css']
})
export class UserWorkListComponent implements OnInit {
  allCases : any[] = [];
  AttemptStatus={
    Case_Id : 0,
    Student_Id : 0,
    Status : "",
    Created_By : 0,
    Updated_By : 0,
  };
  student_Id : any;
  constructor(private service:CasesService,private router: Router) { 
    this.student_Id= localStorage.getItem("userid");
  }

  ngOnInit(): void {
    this.getCaseList();
  }
  getStatusList(item:any)
  {  
    
    var Id = parseInt(this.student_Id)
    this.service.getStatus(Id,item.caseId).subscribe((res:any)=>{
      debugger

      if(res.data.length === 0){
        item.Status = "Unread";
        this.allCases.push(item)
      }
      else if(res.data[0].status === "Read"){
        item.Status = "Read";
        this.allCases.push(item)
      }
      else if(res.data[0].status === "Submitted"){
        item.Status = "Submitted";
        this.allCases.push(item)
      }
      console.log(this.allCases);
      // this.allCases = res;
      // this.getStatusList(res)
      // this.allCases[0].status = true

      // console.log(this.allCases);
  });
  }
  getCaseList()
  {
    this.service.getCaseList().subscribe((res:any)=>{
  
        for(var i = 0 ; i < res.length ; i++){
          this.getStatusList(res[i])
        }
    });
  }
  read(){
    this.router.navigate(['/UserWOrkList/ReadStudy']);
  }
  changeStatus(item: any){
    debugger
    if(item.Status === "Unread")
    {
      
      this.AttemptStatus.Case_Id = item.caseId;
      this.AttemptStatus.Student_Id = parseInt(this.student_Id);
      this.AttemptStatus.Status = "Read";
      this.AttemptStatus.Created_By = parseInt(this.student_Id);
      this.AttemptStatus.Updated_By = parseInt(this.student_Id);

      this.service.UpdateStatus(this.AttemptStatus).subscribe((res:any)=>{
      
      })

    }

    this.router.navigate(['/studentNavbar/studentPaper/'+item.paperId])
  }
}
