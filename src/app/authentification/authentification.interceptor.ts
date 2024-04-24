import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthentificationService } from "./authentification.service";

@Injectable()
export class AuthentificationInterceptor implements HttpInterceptor {

    constructor(private authService: AuthentificationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.authService.getLocalStorage();
          if (!token) {
            return next.handle(req);
          }
          const modifiedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(modifiedReq);

    }

}