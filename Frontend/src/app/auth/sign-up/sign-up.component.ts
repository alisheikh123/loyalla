import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { countries } from 'src/app/shared/interface/Countries';
import { AuthService } from 'src/app/shared/services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  isOtherField: boolean = false;
  isOtherStatus: boolean = false;
  isOtherTraining: boolean = false;
  value: any;
  countries: any = countries;
  registrationForm!: FormGroup;
  status = [
    { name: 'Undergraduate student' },
    { name: 'Medical student' },
    { name: 'Resident' },
    { name: 'Fellow' },
    { name: 'Attending' },
    { name: 'Other' },
  ];
  trainingType = [
    { name: 'PGY-1' },
    { name: 'PGY-2' },
    { name: 'PGY-3' },
    { name: 'PGY-4' },
    { name: 'PGY-5' },
    { name: 'PGY-6' },
    { name: 'PGY-7' },
    { name: 'Other' },
  ];
  field = [
    { name: 'Radiology' },
    { name: 'Orthopedics' },
    { name: 'Physical Medicine and Rehabilitation' },
    { name: 'Internal Medicine' },
    { name: 'Family Medicine' },
    { name: 'Emergency Medicine' },
    { name: 'Anesthesiology' },
    { name: 'Podiatry' },
    { name: 'Other' },
  ];
  school = [{ name: 'MS-1' }];

  constructor(
    public service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forminitial();
  }
  forminitial() {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.email],
      location: [''],
      currentStatus: [''],
      medicalTraining: [''],
      password: [''],
      age: [''],
      field: [''],
      school: [''],
      otherStatus: [''],
      otherTraining: [''],
      otherField: [''],
    });
  }
  changeField(event: any) {
    var fieldValue = event.target.value;
    if (fieldValue == 'Other') {
      this.isOtherField = true;
    } else {
      this.isOtherField = false;
      this.registrationForm.controls['field'].setValue(fieldValue);
    }
  }
  changeSchool(event: any) {
    var schl = event.target.value;
    this.registrationForm.controls['school'].setValue(schl);
  }

  changeTraining(event: any) {
    var trainingName = event.target.value;
    if (trainingName == 'Other') {
      this.isOtherTraining = true;
    } else {
      this.isOtherTraining = false;
      this.registrationForm.controls['otherTraining'].setValue(trainingName);
    }
  }
  changeStatus(event: any) {
    var statusValue = event.target.value;
    if (statusValue == 'Other') {
      this.isOtherStatus = true;
    } else {
      this.isOtherStatus = false;
      this.registrationForm.controls['currentStatus'].setValue(statusValue);
    }
  }

  selectCountry(event: any) {
    var code = event.target.value;
    this.registrationForm.controls['location'].setValue(code);
  }
  submit() {
    this.service.register(this.registrationForm.value).subscribe((res: any) => {
      alert('New user created!' + 'Registration successful.');
      this.router.navigate(['']);
    });
  }
}
