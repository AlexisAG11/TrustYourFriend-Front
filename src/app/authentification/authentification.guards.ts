import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthentificationService } from "./authentification.service";
import { map, take } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthentificationGuard implements CanActivate{

    constructor(private authService: AuthentificationService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.authService.user.pipe(take(1), map(user => {
        const isAuth = !!user;
        if (isAuth) {
            return true;
        }
        return this.router.createUrlTree(['/auth']);
      }));  
    }
}