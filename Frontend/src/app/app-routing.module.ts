import { OptionComponent } from './components/admin/option/option.component';
import { PaperComponent } from './components/admin/paper/paper.component';
import { StudentNavBarComponent } from './components/student/student-site/student-nav-bar/student-nav-bar.component';
import { LoginComponent } from './auth/Login/login/login.component';
import { AdminGradedReportComponent } from './components/admin/admin-graded-report/admin-graded-report.component';
import { ExplanationComponent } from './components/admin/explanation/explanation.component';
import { WorkListAdminComponent } from './components/admin/work-list-admin/work-list-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { StudentResultListComponent } from './components/admin/student-result-list/student-result-list.component';
import { UploadClassesComponent } from './components/admin/upload-classes/upload-classes.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { QuestionComponent } from './components/admin/question/question.component';

const routes: Routes = [
  { path: 'adminNavbar', component: AdminNavbarComponent, children: [
  {path: 'AddCase', component: UploadClassesComponent},
  {path: 'AddPaper', component: PaperComponent},
  {path: 'AddOption', component: OptionComponent},
  {path: 'AddQuestion', component: QuestionComponent},
  {path: 'StudentResultList', component: StudentResultListComponent},
   {path: 'Setting', component: SettingsComponent},
   {path: 'WorkListAdmin', component: WorkListAdminComponent},
   {path: 'Explanation', component: ExplanationComponent},
   {path: 'AdminGradedReport/:id', component: AdminGradedReportComponent}
]},
{path: '', component: LoginComponent},
{path: 'signup', component: SignUpComponent},
{ path: 'studentNavbar', component: StudentNavBarComponent, children: [

]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
