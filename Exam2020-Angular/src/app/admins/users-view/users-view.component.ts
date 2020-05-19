import { Component, OnInit } from '@angular/core';
import {AuthUser} from '../../auth/shared/authUser';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {
  users: AuthUser[];

  constructor(private store: Store) { }

  ngOnInit() {
  }

  readAllUsers(){
    this.store.dispatch(new ReadA)
  }

  goToDetails(certificate: any) {

  }
}
