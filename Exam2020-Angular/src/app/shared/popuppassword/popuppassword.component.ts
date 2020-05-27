import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-popuppassword',
  templateUrl: './popuppassword.component.html',
  styleUrls: ['./popuppassword.component.scss']
})
export class PopuppasswordComponent {

public message = 'Passwords must be atleast 6 characters and matching';

  constructor(
    public dialogRef: MatDialogRef<PopuppasswordComponent>) { }


  closeWindow() {
    this.dialogRef.close();
  }


}
