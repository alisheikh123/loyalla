import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  showlist: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  showdown(){
    this.showlist = true;
  }
}
