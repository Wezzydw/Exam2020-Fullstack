import { Component, OnInit } from '@angular/core';
import {News} from '../models/news';
import {NewsService} from '../services/news.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  news: News[];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getAllNews();
  }

  getAllNews() {
    this.newsService.getAllNews().subscribe(a => {
      this.news = a;
    });
  }
}
