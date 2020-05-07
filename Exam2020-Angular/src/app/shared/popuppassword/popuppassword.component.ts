import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-popuppassword',
  templateUrl: './popuppassword.component.html',
  styleUrls: ['./popuppassword.component.scss']
})
export class PopuppasswordComponent {



  constructor(
    public dialogRef: MatDialogRef<PopuppasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }


}
