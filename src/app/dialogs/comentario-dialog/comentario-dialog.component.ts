import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comentario-dialog',
  templateUrl: './comentario-dialog.component.html',
  styleUrl: './comentario-dialog.component.scss'
})
export class ComentarioDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ComentarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: FormGroup }
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAcceptClick(): void {
      this.dialogRef.close(this.data.form.value);
  }
}
