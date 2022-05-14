import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  showlist: boolean = false;
  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  showdown(){
    this.showlist = true;
  }
  logout(){
    localStorage.removeItem("userid")
    this.route.navigate([""]);
  }
}
