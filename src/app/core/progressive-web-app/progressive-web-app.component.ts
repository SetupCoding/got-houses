import {Component, OnInit} from '@angular/core';
import {ProgressiveWebAppService} from './progressive-web-app.service';

@Component({
  selector: 'app-progressive-web-app',
  templateUrl: './progressive-web-app.component.html',
  styleUrls: ['./progressive-web-app.component.scss']
})
export class ProgressiveWebAppComponent implements OnInit {

  constructor(public pwaService: ProgressiveWebAppService) {
  }

  ngOnInit() {
  }

  installPwa(): void {
    this.pwaService.installPromptEvent.prompt();
  }
}
