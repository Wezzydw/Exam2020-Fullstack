import { Component, OnInit } from '@angular/core';
import {AuthUser} from '../../auth/shared/authUser';
import {Select, Store} from '@ngxs/store';
import {AngularFirestore} from '@angular/fire/firestore';
import {SetSelectedUser} from '../shared/admin.action';
import {CertificateReadAll} from '../../certificates/shared/certificate.action';
import {AuthState} from '../../auth/shared/auth.state';
import {Observable} from 'rxjs';
import {CertificateState} from '../../certificates/shared/certificate.state';
import {Certificate} from '../../certificates/shared/certificate';
import {AdminState} from '../shared/admin.state';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {
  users: AuthUser[];
  tableData: any[] = [];
  firstInResponse: any = [];
  lastInResponse: any = [];
  prevStartAt: any = [];
  paginationClickedCount = 0;
  disableNext = false;
  disablePrev = false;


  constructor(private af: AngularFirestore, private store: Store) { }

  ngOnInit() {
    this.loadItems();
  }

  goToDetails(user: AuthUser) {
    this.store.dispatch(new SetSelectedUser(user));

  }

  loadItems() {
    this.af.collection('users', ref => ref
      .limit(1)
      .orderBy('mName', 'desc')
    ).snapshotChanges()
      .subscribe(response => {
        if (!response.length) {
          console.log('No Data Available');
          return false;
        }
        this.firstInResponse = response[0].payload.doc;
        this.lastInResponse = response[response.length - 1].payload.doc;

        this.tableData = [];
        for (const item of response) {
          this.tableData.push(item.payload.doc.data());
        }

        // Initialize values
        this.prevStartAt = [];
        this.paginationClickedCount = 0;
        this.disableNext = false;
        this.disablePrev = false;

        // Push first item to use for Previous action
        this.pushPrevStartAt(this.firstInResponse);
      }, error => {
      });
  }
  prevPage() {
    this.disablePrev = true;
    this.af.collection('users', ref => ref
      .orderBy('mName', 'desc')
      .startAt(this.getPrevStartAt())
      .endBefore(this.firstInResponse)
      .limit(1)
    ).get()
      .subscribe(response => {
        this.firstInResponse = response.docs[0];
        this.lastInResponse = response.docs[response.docs.length - 1];

        this.tableData = [];
        for (let item of response.docs) {
          this.tableData.push(item.data());
        }

        // Maintaing page no.
        this.paginationClickedCount--;

        // Enable buttons again
        this.disablePrev = false;
        this.disableNext = false;
      }, error => {
        this.disablePrev = false;
      });
  }

  nextPage() {
    this.disableNext = true;
    this.af.collection('users', ref => ref
      .limit(1)
      .orderBy('mName', 'desc')
      .startAfter(this.lastInResponse)
    ).get()
      .subscribe(response => {

        if (!response.docs.length) {
          this.disableNext = true;
          return;
        }

        this.firstInResponse = response.docs[0];

        this.lastInResponse = response.docs[response.docs.length - 1];
        this.tableData = [];
        for (const item of response.docs) {
          this.tableData.push(item.data());
        }

        this.paginationClickedCount++;

        this.pushPrevStartAt(this.firstInResponse);

        this.disableNext = false;
      }, error => {
        this.disableNext = false;
      });
  }

  getPrevStartAt() {
    if (this.prevStartAt.length > (this.paginationClickedCount + 1))
      this.prevStartAt.splice(this.prevStartAt.length - 2, this.prevStartAt.length - 1);
    return this.prevStartAt[this.paginationClickedCount - 1];
  }

  private pushPrevStartAt(firstInResponse: any) {
    this.prevStartAt.push(firstInResponse);
  }
}
