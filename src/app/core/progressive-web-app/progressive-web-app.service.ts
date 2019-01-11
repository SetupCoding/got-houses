import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class ProgressiveWebAppService {
  installPromptEvent;

  constructor(private serviceWorkerUpdate: SwUpdate) {
    serviceWorkerUpdate.available.subscribe(event => {
      // if (askUserToUpdate()) {
      //   window.location.reload();
      // }
    });
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      this.installPromptEvent = event;
    });
  }
}
