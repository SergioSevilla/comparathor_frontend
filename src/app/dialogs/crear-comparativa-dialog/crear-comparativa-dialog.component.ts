import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-comparativa-dialog',
  templateUrl: './crear-comparativa-dialog.component.html',
  styleUrl: './crear-comparativa-dialog.component.scss'
})
export class CrearComparativaDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CrearComparativaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: FormGroup }
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAcceptClick(): void {
      this.dialogRef.close(this.data.form.value);
  }


}
