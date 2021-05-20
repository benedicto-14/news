import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article, TopHeadLines } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(private data: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.data.getTopHeadLines()
      .subscribe(respon => {
        console.log('noticias', respon);

        if (respon.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        this.noticias.push(...respon.articles);

        if (event) {
          event.target.complete();
        }
      });
  }

}
