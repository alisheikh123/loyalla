import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError ,take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';
import { ApiResponse } from '../../../http-interceptors/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient, private errorService: ErrorService) { 
  }

  // login(model: any) {
  //   debugger;
  //   return this.http.post<any>(this.apiUrl + '/api/Account/login', model).pipe(
  //     catchError(this.errorService.handleError));
  // }

  login(model:any) {
    // Normally make a POST request to your APi with your login credentials
    return this.http.post(this.apiUrl + '/api/Account/login', model, { observe: 'response' }).pipe(
      take(1),
      map(res => {
        debugger;
        console.log(res);
        let response = new ApiResponse();
        response = Object.assign(response, res);
        if (response.body > 0) {
          localStorage.setItem("userid", response.body.toString());
          localStorage.setItem("email", model.email);
        } 
        return response.body;
      }),
  
    );
  }

  register(model: any) {
    debugger;
    return this.http.post<any>(this.apiUrl + '/api/Account/signup', model).pipe(catchError(this.errorService.handleError));
  }
}
