import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';


@Injectable({providedIn: 'root'})
export class VersionInterceptor implements HttpInterceptor {
  // eTag = '';

  constructor() {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        Accept: 'application/vnd.anapioficeandfire+json; version=' + environment.iceAndFireApi.version
        // 'If-None-Match': this.eTag,
        // 'If-Modified-Since': new Date().toISOString()
      }
    });
    return next.handle(clonedRequest).pipe(tap((event: HttpResponse<any>) => {
      // if (event.type === 4) {
      // this.handleNewETag(event.headers.get('etag'));
      // }
    }), catchError((error) => {
      console.error(error);
      return throwError(error);
    }) as any);
  }

  handleNewETag(eTag: string) {
    // this.eTag = eTag;
  }
}
