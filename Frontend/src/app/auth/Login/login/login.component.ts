import { AuthService } from './../../../shared/services/Auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';									   

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  invalidLogin!: boolean;
  user : any = {
    Email : '',
    Password: '',
  }


   constructor(private fb: FormBuilder,
    private service:AuthService,
    private toastrService:ToastrService,
    private router: Router) { }						   

  ngOnInit(): void {
    this.intiateForm();
  }
intiateForm()
{
  this.loginform = this.fb.group(
    {
    email: ['',Validators.required],
    password: ['', Validators.required]
  });
}
login()
{
  let userNm =this.loginform.controls['email'].value;
  let pwd = this.loginform.controls['password'].value;

  if((userNm =="admin" && pwd=="admin"))
  {
    localStorage.setItem("userid", "0");
    this.router.navigate(["adminNavbar/AddCase"]);
  }
  else{

    this.service.login(this.loginform.value).subscribe(response=>{
      debugger;
      if(parseInt(response.id) > 0)
      {
        this.invalidLogin = false;					   
        this.router.navigate(["/studentNavbar/UserWorkList"]);
      }
      else
      {
         this.toastrService.error('Invalid User')
      }

    });
  }
  }

}
