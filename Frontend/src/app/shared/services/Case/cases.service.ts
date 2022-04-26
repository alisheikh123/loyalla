import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  apiUrl = environment.API_URL;

   constructor(private http: HttpClient,private errorService: ErrorService) { }

   addNewCase(cases: any) {
    return this.http.post(this.apiUrl + '/api/Loyalla/AddCase', cases).pipe(
      catchError(this.errorService.handleError));
  }
  getCaseList() {
    return this.http.get<any>(this.apiUrl + '/api/Loyalla/AdminCaseList').pipe(
      catchError(this.errorService.handleError));
  }
  deleteCase(id:any) {
    debugger;
    return this.http.delete(this.apiUrl + '/api/Loyalla/DeleteCase'+'?Case_Id='+id).pipe(
      catchError(this.errorService.handleError));
  }
  addNewQuestion(questions: any) {
    debugger;
   return this.http.post(this.apiUrl + '/api/Question/addQuestion', questions).pipe(
     catchError(this.errorService.handleError));
 }
 addNewPaper(paper: any) {
  debugger;
 return this.http.post(this.apiUrl + '/api/Question/addPaper', paper).pipe(
   catchError(this.errorService.handleError));
}
 getAllQuestions()
 {
  return this.http.get(this.apiUrl+'/api/Question/GetAllQuestion').pipe(catchError(this.errorService.handleError));

 }
 getAllPaper()
 {
  return this.http.get(this.apiUrl+'/api/Question/GetAllPaper').pipe(catchError(this.errorService.handleError));
 }
 getPaperById(id:any)
 {
   debugger;
  return this.http.get<any>(this.apiUrl+'/api/Question/GetPaperById?Id='+id).pipe(catchError(this.errorService.handleError));
 }
//  uploadExcel(formFile:any) {
//    debugger;
//   return this.http.post(this.apiUrl + '/api/Question/UploadExcel', formFile)
// }
getAnwsers()
{
  return this.http.get(this.apiUrl+'/api/Loyalla/GetAnwsers').pipe(catchError(this.errorService.handleError))
}
}
