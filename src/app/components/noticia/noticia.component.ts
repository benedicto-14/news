import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { ActionSheetController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() statusFav: boolean;

  constructor(private iab: InAppBrowser,
              private actions: ActionSheetController,
              private socialShare: SocialSharing,
              private storage: DataLocalService) { }

  ngOnInit() {}

  openNews() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {
    let btnSaveDelete;

    if (this.statusFav) {

      btnSaveDelete = {
        text: 'Borrar',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.storage.deleteFavorite(this.noticia);
        }
      };

    } else {

      btnSaveDelete = {
          text: 'Favoritos',
          icon: 'star',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Favorite clicked');
            this.storage.saveFavorite(this.noticia);
          }
       };

    }

    const actionSheet = await this.actions.create({
      buttons: [
      {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialShare.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
            );
        }
      },
      btnSaveDelete,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
