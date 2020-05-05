import { Injectable } from '@angular/core';
import { Userstats} from './userstats';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  updateUser(payload: Userstats, id: number) {
    return this.http.put<Userstats>('https://jsonplaceholder.typicode.com/users/' + id, payload);
  }
  getUser() {
    return this.http.get<Userstats>('https://jsonplaceholder.typicode.com/users');
  }

}
