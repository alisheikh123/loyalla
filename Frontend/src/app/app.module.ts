import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StudentRoutingModule } from './student-site/student.routing.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { UploadClassesComponent } from './upload-classes/upload-classes.component';
import { StudentResultListComponent } from './student-result-list/student-result-list.component';
import { SettingsComponent } from './settings/settings.component';
import { WorkListAdminComponent } from './work-list-admin/work-list-admin.component';
import { StudentSiteComponent } from './student-site/student-site.component';
import { StudentNavBarComponent } from './student-site/student-nav-bar/student-nav-bar.component';
import { SignUpComponent } from './student-site/sign-up/sign-up.component';
import { UserWorkListComponent } from './student-site/user-work-list/user-work-list.component';
import { CommentFeedbackComponent } from './student-site/comment-feedback/comment-feedback.component';
import { FeedbackoptionalComponent } from './student-site/feedbackoptional/feedbackoptional.component';
import { ResultsComponent } from './student-site/results/results.component';
import { ReadStudyComponent } from './student-site/read-study/read-study.component';
import { GradedReportComponent } from './student-site/graded-report/graded-report.component';
import { ExplanationComponent } from './explanation/explanation.component';
import { AdminGradedReportComponent } from './admin-graded-report/admin-graded-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StudentRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
