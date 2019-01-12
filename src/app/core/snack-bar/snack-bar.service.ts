import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {IceAndFireService} from '../http/ice-and-fire.service';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar, private iceAndFireService: IceAndFireService) {
  }

  showSnackBar(message = 'Error retrieving data.'): void {
    const snackBarRef = this.snackBar.open(message, 'Retry');
    snackBarRef.onAction().subscribe(() => {
      this.iceAndFireService.fetchHouses();
    });
  }

  hideSnackBar(): void {
    this.snackBar.dismiss();
  }
}
