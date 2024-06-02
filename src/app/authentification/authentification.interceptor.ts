import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthentificationService } from "./authentification.service";

@Injectable()
export class AuthentificationInterceptor implements HttpInterceptor {

    constructor(private authService: AuthentificationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
          return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
              if (!user) {
                return next.handle(req);
              }
              const modifiedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${user.token}`
                }
              });
              return next.handle(modifiedReq);
            }));
    }
}