import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {News} from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
url = 'http://77.75.161.9:1337/api/news';

  constructor(private client: HttpClient) { }

  getAllNews(): Observable<News[]> {
    return this.client.get<News[]>(this.url);
  }
}
