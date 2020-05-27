import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {News} from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
url = 'https://localhost:44326/api/news';

  constructor(private client: HttpClient) { }

  getAllNews(): Observable<News[]> {
    return this.client.get<News[]>(this.url);
  }
}
