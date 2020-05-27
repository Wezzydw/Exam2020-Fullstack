import { Component, OnInit } from '@angular/core';
import {News} from '../models/news';
import {NewsService} from '../services/news.service';
import {element} from 'protractor';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  news: News[];
  color = '0s';
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getAllNews();
  }

  getAllNews() {
    this.newsService.getAllNews().subscribe(a => {
      this.news = a;
      this.color = a.length * 9 + 's';
    });
  }
}
