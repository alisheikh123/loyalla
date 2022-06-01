import { StudentPaperComponent } from './student-paper/student-paper.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentNavBarComponent } from './student-nav-bar/student-nav-bar.component';
import { SignUpComponent } from '../../../auth/sign-up/sign-up.component';
import { UserWorkListComponent } from './user-work-list/user-work-list.component';
import { CommentFeedbackComponent } from './comment-feedback/comment-feedback.component';
import { FeedbackoptionalComponent } from './feedbackoptional/feedbackoptional.component';
import { ResultsComponent } from './results/results.component';
import { ReadStudyComponent } from './read-study/read-study.component';
import { GradedReportComponent } from './graded-report/graded-report.component';

const routes: Routes = [
{path:'studentNavbar', component: StudentNavBarComponent, children:[
{path: '', component: SignUpComponent },
{path: 'UserWorkList', component: UserWorkListComponent},
{path: 'Comment/:studentId', component: CommentFeedbackComponent},
{path: 'FeedbackOptional/:caseId/:studentId/:submissionId/:paperId', component: FeedbackoptionalComponent},
{path: 'result/:submissionId/:paperId', component: ResultsComponent},
{path: 'ReadStudy', component: ReadStudyComponent},
{path: 'ReviewReport', component: GradedReportComponent},
{path:'studentPaper/:id/:reviewId',component: StudentPaperComponent}
]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
