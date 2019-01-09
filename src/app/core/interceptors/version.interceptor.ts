import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

export const iceAndFireApiVersion = new InjectionToken<string>('iceAndFireApiVersion');

@Injectable({providedIn: 'root'})
export class VersionInterceptor implements HttpInterceptor {
  version: string;

  constructor(@Inject(iceAndFireApiVersion) version?: string) {
    this.version = version ? version : '';
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({setHeaders: {Accept: 'application/vnd.anapioficeandfire+json; version=' + this.version}});
    return next.handle(clonedRequest).pipe(tap(event => {
    }), catchError((error) => {
      console.error(error);
      return throwError(error);
    }) as any);

  }
}
