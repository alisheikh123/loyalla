import { AuthService } from './../../../shared/services/Auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private fb: FormBuilder,private service:AuthService,private router: Router) { }

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
    this.router.navigate(["/adminNavbar"]);
  }
  else{

    this.service.login(this.loginform.value).subscribe(response=>{
      debugger;
      if(response!="")
      {
        this.invalidLogin = false;
        const userid = (<any>response).user_Id;
        const name = (<any>response).email;
        localStorage.setItem("userid", userid);
        localStorage.setItem("email", name);
        this.router.navigate(["/studentNavbar"]);
      }
      else
      {
        alert("Invalid User");
      }

    });
  }
  }

}
