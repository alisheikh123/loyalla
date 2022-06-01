import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { countries } from 'src/app/shared/interface/Countries';
import { AuthService } from 'src/app/shared/services/Auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isOtherField: boolean = false;
  isOtherStatus: boolean = false;
  isOtherTraining: boolean = false;
  value: any;
  checkUserNameFill:boolean=false;
  checkEmailFill:boolean=false;
  checkLocFill:boolean=false;
  checkstatusFill:boolean=false;
  checkMedTrainFill:boolean=false;
  checkPassFill:boolean=false;
  checkAgeFill:boolean=false;
  checkFieldFill:boolean=false;
  checkSchoolFill:boolean=false;
  checkGenderFill:boolean=false;
 
  countries: any = countries;
  registrationForm!: FormGroup;
  status =
    [{ name: "Undergraduate student" },
    { name: "Medical student" },
    { name: "Resident" },
    { name: "Fellow" },
    { name: "Attending" },
    { name: "Other" },]
  trainingType =
    [{ name: "PGY-1" },
    { name: "PGY-2" },
    { name: "PGY-3" },
    { name: "PGY-4" },
    { name: "PGY-5" },
    { name: "PGY-6" },
    { name: "PGY-7" },
    { name: "Other" },
  ]
  field =
  [{ name: "Radiology" },
  { name: "Orthopedics" },
  { name: "Physical Medicine and Rehabilitation" },
  { name: "Internal Medicine" },
  { name: "Family Medicine" },
  { name: "Emergency Medicine" },
  { name: "Anesthesiology" },
  { name: "Podiatry" },
  { name: "Other" },
]
genders=[
  {name:'Male'},
  {name:'Female'},
  {name:'Other'}

]
school =
  [{ name: "MS-1" },
]

  constructor(public service: AuthService, private fb: FormBuilder,
    private router: Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {

    this.forminitial();
  }
  forminitial() {
    this.registrationForm = this.fb.group({
      userName:['', Validators.required],
      email:['', Validators.email ],
      location: ['', Validators.required],
      currentStatus: ['', Validators.required],
      medicalTraining: ['' , Validators.required],
      password:['' , Validators.required],
      age: ['' , Validators.required],
      field:['', Validators.required],
      school:['' , Validators.required],
      otherStatus:['' , Validators.required],
      otherTraining:['' , Validators.required],
      otherField:['' , Validators.required] ,
      gender:['' , Validators.required],
    });
  }
  users:any ={
    userInfo:{
      UserName:'',
      Email:'',
      Location:'',
      CurrentStatus:'',
      YearOfMedTra:'',
      Password:'',
      UserAge:'',
      Field:'',
      MedSchool:'',
      Gender:''
    }
  }


  changeField(event:any) {
    var fieldValue = event.target.value;
    if (fieldValue == "Other") {

      this.isOtherField = true;

    }
    else {
      this.isOtherField = false;
      this.registrationForm.controls['field'].setValue(fieldValue);
    }
  }
  changeGender(event:any){

  }
  changeSchool(event:any)
  {
    var schl = event.target.value;
    this.registrationForm.controls['school'].setValue(schl);
  }

  changeTraining(event:any) {
    var trainingName = event.target.value;
    if (trainingName == "Other") {

      this.isOtherTraining = true;

    }
    else {
      this.isOtherTraining = false;
      this.registrationForm.controls['otherTraining'].setValue(trainingName);
    }
  }
  changeStatus(event:any) {
    var statusValue = event.target.value;
debugger;
    if (statusValue == "Other") {

      this.isOtherStatus = true;

    }
    else {
      this.isOtherStatus = false;
      this.registrationForm.controls['currentStatus'].setValue(statusValue);
    }
  }

  selectCountry(event: any) {
    var code = event.target.value;
    this.registrationForm.controls['location'].setValue(code);
  }
  submit() {
    // alert("hello")
    debugger
    if(this.users.userInfo.UserName == ''){
      this.checkUserNameFill = true;
    }
    if(this.users.userInfo.Email == '')
    {
      this.checkEmailFill =true;
    }
    if(this.users.userInfo.Location == '')
    {
      this.checkLocFill =true;
    }
    if(this.users.userInfo.CurrentStatus== '')
    {
      this.checkstatusFill =true;
    }
    if(this.users.userInfo.YearOfMedTra == '')
    {
      this.checkMedTrainFill =true;
    }
    if(this.users.userInfo.Password == '')
    {
      this.checkPassFill =true;
    }
    if(this.users.userInfo.UserAge == '')
    {
      this.checkAgeFill =true;
    }
    if(this.users.userInfo.Field==''){
      this.checkFieldFill = true;
    }
    if(this.users.userInfo.MedSchool==''){
      this.checkSchoolFill = true;
    }
    if(this.users.userInfo.Gender==''){
      this.checkGenderFill = true;
    }
    else{
      console.log(this.registrationForm)
     this.service.register(this.registrationForm.value).subscribe(
      (res: any) => {
        debugger

        this.toastr.success("You are now Successfully registered")

          // alert('New user created!' + 'Registration successful.');
          this.router.navigate([""]);
        }


    );
  }
}
}
