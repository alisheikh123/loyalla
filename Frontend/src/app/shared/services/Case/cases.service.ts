import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  apiUrl = environment.API_URL;

   constructor(private http: HttpClient,private errorService: ErrorService) { }

   addNewCase(model: any) {
     debugger;
    return this.http.post<any>(this.apiUrl + '/api/Loyalla/AddCase', model).pipe(
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

}
