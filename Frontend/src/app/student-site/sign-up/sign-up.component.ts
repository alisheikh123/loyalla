import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  ishown: boolean = false;
  isshown: boolean = false;
  isshowns: boolean = false;
  value: any;
  constructor() { }

  ngOnInit(): void {
  }
  changevalue(value) {
    if (value=="otheroption"){
    
      this.ishown= true;
    
    }
    else{
      this.ishown= false;
    }
}
changeValue(value) {
  if (value=="otherpgy"){
  
    this.isshown= true;
  
  }
  else{
    this.isshown= false;
  }
}
changevalues(value) {
  if (value=="selectfield"){
  
    this.isshowns= true;
  
  }
  else{
    this.isshowns= false;
  }
}
}
