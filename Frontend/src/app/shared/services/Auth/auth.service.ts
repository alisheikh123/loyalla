import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient, private errorService: ErrorService) { }

  login(model: any) {
    debugger;
    return this.http.post<any>(this.apiUrl + '/api/Account/login', model).pipe(
      catchError(this.errorService.handleError));
  }

  register(model: any) {
    debugger;
    return this.http.post<any>(this.apiUrl + '/api/Account/signup', model).pipe(catchError(this.errorService.handleError));
  }
}
