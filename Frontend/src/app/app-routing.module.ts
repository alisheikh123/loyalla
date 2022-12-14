import { OptionComponent } from './components/admin/option/option.component';
import { PaperComponent } from './components/admin/paper/paper.component';
import { StudentNavBarComponent } from './components/student/student-site/student-nav-bar/student-nav-bar.component';
import { UserWorkListComponent } from './components/student/student-site/user-work-list/user-work-list.component';
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
import { AuthGuard } from './shared/guards/auth.guard'
import { Role } from './shared/model/role';
import { EditUploadClassesComponent } from './components/admin/edit-upload-classes/edit-upload-classes.component';
import { StudentPaperComponent } from './components/student/student-site/student-paper/student-paper.component';
import { StudentSurveyDetailComponent } from './student-survey-detail/student-survey-detail.component';
import { AllSurviesComponent } from './components/admin/all-survies/all-survies.component';

const routes: Routes = [
  { path: 'adminNavbar',canActivate: [AuthGuard], component: AdminNavbarComponent, children: [
  {path: 'AddCase',canActivate: [AuthGuard], component: UploadClassesComponent},
  {path: 'Edit-Case/:id/:paperId',canActivate: [AuthGuard], component: EditUploadClassesComponent},
  {path: 'AddPaper',canActivate: [AuthGuard], component: PaperComponent},
  {path: 'AddOption',canActivate: [AuthGuard], component: OptionComponent},
  {path: 'AddQuestion',canActivate: [AuthGuard], component: QuestionComponent},
  {path: 'StudentResultList/:caseId', canActivate: [AuthGuard],component: StudentResultListComponent},
   {path: 'Setting',canActivate: [AuthGuard], component: SettingsComponent},
   {path: 'WorkListAdmin',canActivate: [AuthGuard], component: WorkListAdminComponent},
   {path: 'Explanation',canActivate: [AuthGuard], component: ExplanationComponent},
   {path: 'AdminGradedReport/:id',canActivate: [AuthGuard], component: AdminGradedReportComponent},
   {path:'studentPaper/:id/:reviewId',canActivate: [AuthGuard],component: StudentPaperComponent},
   {path:'studentSurvey/:studentId',canActivate: [AuthGuard],component: StudentSurveyDetailComponent},
   {path:'allSurvies',canActivate: [AuthGuard],component: AllSurviesComponent},

]},
{path: '', component: LoginComponent},
{path: 'signup', component: SignUpComponent},
{ path: 'studentNavbar', canActivate: [AuthGuard] ,component: StudentNavBarComponent, children: [
  {path: 'UserWorkList',canActivate: [AuthGuard], component: UserWorkListComponent},
]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
