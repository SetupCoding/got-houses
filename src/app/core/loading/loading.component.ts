import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from './loading.service';
import {Subscription} from 'rxjs';
import {LoadingState} from './loading';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  isLoading = false;

  private loadingStateChangeSubscription: Subscription;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingStateChangeSubscription = this.loadingService.loadingSubject.subscribe((state: LoadingState) => {
      this.isLoading = state.show;
    });
  }

  ngOnDestroy(): void {
    this.loadingStateChangeSubscription.unsubscribe();
  }
}
