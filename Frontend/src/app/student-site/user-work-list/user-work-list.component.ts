import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-work-list',
  templateUrl: './user-work-list.component.html',
  styleUrls: ['./user-work-list.component.css']
})
export class UserWorkListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  read(){
    this.router.navigate(['/UserWOrkList/ReadStudy']);
  }
}
