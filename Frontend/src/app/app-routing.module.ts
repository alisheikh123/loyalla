import { AdminGradedReportComponent } from './components/admin/admin-graded-report/admin-graded-report.component';
import { ExplanationComponent } from './components/admin/explanation/explanation.component';
import { WorkListAdminComponent } from './components/admin/work-list-admin/work-list-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { StudentResultListComponent } from './components/admin/student-result-list/student-result-list.component';
import { UploadClassesComponent } from './components/admin/upload-classes/upload-classes.component';

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
