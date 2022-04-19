import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-nav-bar',
  templateUrl: './student-nav-bar.component.html',
  styleUrls: ['./student-nav-bar.component.css']
})
export class StudentNavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.router.navigate([""]);
  }
}
