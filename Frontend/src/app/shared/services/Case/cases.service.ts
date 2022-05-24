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
  getCaseDetailById(caseId:number)
  {
    return this.http.get<any>(this.apiUrl + '/api/Loyalla/GetCaseDetail'+'?caseId='+caseId).pipe(
      catchError(this.errorService.handleError));
  }
  updateCases(cases:any)
  {
    return this.http.post(this.apiUrl + '/api/Loyalla/UpdateCase', cases).pipe(
      catchError(this.errorService.handleError));

  }
  getCaseList() {
    return this.http.get<any>(this.apiUrl + '/api/Loyalla/AdminCaseList').pipe(
      catchError(this.errorService.handleError));
  }
  UpdateStatus(model:any) {
    return this.http.post<any>(this.apiUrl + '/api/Loyalla/UpdateCaseStatus',model).pipe(
      catchError(this.errorService.handleError));
  }
  UpdateCaseStatusSubmission(model:any) {
    return this.http.put<any>(this.apiUrl + '/api/Loyalla/UpdateCaseStatusSubmission',model).pipe(
      catchError(this.errorService.handleError));
  }
  getStatus(studentId : number , CaseId : number) {

    return this.http.get<any>(this.apiUrl + '/api/Loyalla/GetCaseStatus?Student_Id='+studentId+'&Case_Id= '+CaseId+'').pipe(
      catchError(this.errorService.handleError));
  }
  getStudentPaperList() {
    return this.http.get<any>(this.apiUrl + '/api/Loyalla/StudentPaperList').pipe(
      catchError(this.errorService.handleError));
  }
  deleteCase(id:any) {
    return this.http.delete(this.apiUrl + '/api/Loyalla/DeleteCase'+'?Case_Id='+id).pipe(
      catchError(this.errorService.handleError));
  }
  editCase(id:number)
  {
    return this.http.get(this.apiUrl + '/api/Loyalla/EditCase'+'?Case_Id='+id).pipe(
      catchError(this.errorService.handleError));
  }
  addNewQuestion(questions: any) {
    debugger;
   return this.http.post(this.apiUrl + '/api/Question/addQuestion', questions).pipe(
     catchError(this.errorService.handleError));
 }
  submitPaper(model: any) {
    debugger;
   return this.http.post(this.apiUrl + '/api/Loyalla/SubmitPaper', model).pipe(
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
 getQuestionsWithoutAnwser(paperId:number)
 {
  return this.http.get(this.apiUrl+'/api/Loyalla/getQuestionDetailWithoutAnwser?paperId='+paperId).pipe(catchError(this.errorService.handleError));
 }
 getQuestionsWithAnwser(paperId:number)
 {
  return this.http.get(this.apiUrl+'/api/Loyalla/getQuestionDetailWithAnwser?paperId='+paperId).pipe(catchError(this.errorService.handleError));
 }
 getOption(questionId:number)
 {
return this.http.get(this.apiUrl+'/api/Loyalla/GetOption?questionId='+`{questionId}`).pipe(catchError(this.errorService.handleError));
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
getAnwsers()
{
  return this.http.get(this.apiUrl+'/api/Loyalla/GetAnwsers').pipe(catchError(this.errorService.handleError))
}
}
