import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-success-dialog',
  templateUrl: './signup-success-dialog.component.html',
  styleUrl: './signup-success-dialog.component.scss'
})
export class SignupSuccessDialogComponent {

  constructor(public dialogRef: MatDialogRef<SignupSuccessDialogComponent>) {}

  onOkClick(): void {
    this.dialogRef.close();
  }

}
