import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CaseuploadService {

  constructor( private readonly http:HttpClient) { }
  private BaseURL=environment.API_URL
  //private BaseURLFILE=environment.FileLoaderApi


  caseUpload(form)
  {
    //const body=JSON.stringify(form);
    var formData : any=new FormData();
    formData.append("cas.Title",form.Title)
    formData.append("cas.Description",form.Description)
   return this.http.post<any>(this.BaseURL +"api/loyalla/AddCase" , formData)
  }

  FileUpload(form)
  {
    //return this.http.post<any>(this.BaseURLFILE +"api/files/uploadserver" , form)
  }
}
