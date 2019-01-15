import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LoadingState} from './loading';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loadingSubject = new Subject<LoadingState>();

  constructor() {
  }

  get loadingSubject(): Subject<LoadingState> {
    return this._loadingSubject;
  }

  show(): void {
    this.loadingSubject.next(<LoadingState>{show: true});
  }

  hide(): void {
    this.loadingSubject.next(<LoadingState>{show: false});
  }
}
