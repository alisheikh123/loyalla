import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { UploadClassesComponent } from './upload-classes/upload-classes.component';
import { StudentResultListComponent } from './student-result-list/student-result-list.component';
import { SettingsComponent } from './settings/settings.component';
import { WorkListAdminComponent } from './work-list-admin/work-list-admin.component';
import { ExplanationComponent } from './explanation/explanation.component';
import { AdminGradedReportComponent } from './admin-graded-report/admin-graded-report.component';

const routes: Routes = [
  { path: '', component: AdminNavbarComponent, children: [
  {path: '', component: UploadClassesComponent},
  {path: 'StudentResultList', component: StudentResultListComponent},
   {path: 'Setting', component: SettingsComponent},
   {path: 'WorkListAdmin', component: WorkListAdminComponent},
   {path: 'Explanation', component: ExplanationComponent},
   {path: 'AdminGradedReport', component: AdminGradedReportComponent}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
