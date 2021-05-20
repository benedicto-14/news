import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  categorias = ['entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private http: NoticiasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cargarNoticias(category: string, event?) {
    this.noticias = [];

    this.http.getTopHeadLinesCategory(category)
      .subscribe(respon => {
        this.noticias.push(...respon.articles);

        if (event) {
          event.target.complete();
        }
      });
  }

  changeCategory(event) {
    this.cargarNoticias(event.detail.value);
  }

  loadData(event) {
    this.cargarNoticias(this.segment.value, event);
  }

}
