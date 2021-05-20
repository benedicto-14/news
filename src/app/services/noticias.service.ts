import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TopHeadLines } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private requestQuery<T>(query: string) {
    query = apiUrl + query;

    return this.http.get<T>(query, {headers});
  }

  getTopHeadLines() {
    this.headlinesPage++;
    return this.requestQuery<TopHeadLines>(`/top-headlines?country=mx&page=${this.headlinesPage}`);
    // tslint:disable-next-line: max-line-length
    // return this.http.get<TopHeadLines>(`https://newsapi.org/v2/everything?q=bitcoin&from=2019-08-16&sortBy=publishedAt&apiKey=41833b63c700497bbf93f8a169c92485`);
  }

  getTopHeadLinesCategory(category: string) {

    if (this.categoriaActual === category) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = category;
    }

    return this.requestQuery<TopHeadLines>(`/top-headlines?country=mx&category=${category}&page=${this.categoriaPage}`);
  }
}
