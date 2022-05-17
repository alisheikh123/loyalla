import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../services/Auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }
  
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
      debugger;
    var isAuthenticated =  localStorage.getItem("userid")
    
    if (typeof(isAuthenticated) !== "undefined" && isAuthenticated !== null) {
        return true;
    }
    else{
    this.router.navigate(["/"]);
    return false;
    }
}

}
