import { Component, OnInit } from '@angular/core';
import {AuthState} from '../../auth/shared/auth.state';
import {MatDialogRef} from '@angular/material';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {Select, Store} from '@ngxs/store';
import {AuthUser} from '../../auth/shared/authUser';
import {Observable} from 'rxjs';
import {DeleteUser, LogOut} from '../../auth/shared/auth.action';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {
  message = 'Are you sure you wish to delete your account';
  @Select(AuthState.loggedInUser)
  SelectedUser$: Observable<AuthUser>;
  private user: AuthUser;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, public store: Store) { }

  ngOnInit() {this.SelectedUser$.subscribe(value => {
    this.user = value;
  });
  }

  closeWindow() {
    this.dialogRef.close();
  }

  deleteUser() {
    this.store.dispatch(new DeleteUser(this.user.mUId));
    this.closeWindow();
    this.store.dispatch(new LogOut());
  }

}
