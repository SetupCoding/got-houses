import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LoadingService} from '../loading/loading.service';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/internal/operators';

@Injectable({providedIn: 'root'})
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone();
    this.loadingService.show();
    return next.handle(clonedRequest).pipe(tap(event => {
      if (event.type === 4) {
        this.loadingService.hide();
      }
    }), catchError((error) => {
      this.loadingService.hide();
      console.error(error);
      return throwError(error);
    }) as any);
  }


}
