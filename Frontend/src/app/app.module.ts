import { LoginComponent } from './auth/Login/login/login.component';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { UploadClassesComponent } from './components/admin/upload-classes/upload-classes.component';
import { StudentResultListComponent } from './components/admin/student-result-list/student-result-list.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { WorkListAdminComponent } from './components/admin/work-list-admin/work-list-admin.component';
import { StudentSiteComponent } from './components/student/student-site/student-site.component';
import { StudentNavBarComponent } from './components/student/student-site/student-nav-bar/student-nav-bar.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UserWorkListComponent } from './components/student/student-site/user-work-list/user-work-list.component';
import { CommentFeedbackComponent } from './components/student/student-site/comment-feedback/comment-feedback.component';
import { FeedbackoptionalComponent } from './components/student/student-site/feedbackoptional/feedbackoptional.component';
import { ResultsComponent } from './components/student/student-site/results/results.component';
import { ReadStudyComponent } from './components/student/student-site/read-study/read-study.component';
import { GradedReportComponent } from './components/student/student-site/graded-report/graded-report.component';
import { ExplanationComponent } from './components/admin/explanation/explanation.component';
import { AdminGradedReportComponent } from './components/admin/admin-graded-report/admin-graded-report.component';
import { StudentRoutingModule } from './components/student/student-site/student.routing.component';
import { CasesService } from './shared/services/Case/cases.service';
import { QuestionComponent } from './components/admin/question/question.component';
import { PaperComponent } from './components/admin/paper/paper.component';
import { OptionComponent } from './components/admin/option/option.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AdminNavbarComponent,
    UploadClassesComponent,
    StudentResultListComponent,
    SettingsComponent,
    WorkListAdminComponent,
    StudentSiteComponent,
    StudentNavBarComponent,
    SignUpComponent,
    UserWorkListComponent,
    CommentFeedbackComponent,
    FeedbackoptionalComponent,
    ResultsComponent,
    ReadStudyComponent,
    GradedReportComponent,
    ExplanationComponent,
    AdminGradedReportComponent,
    LoginComponent,
    QuestionComponent,
    PaperComponent,
    OptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StudentRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {timeOut: 10000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CasesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
