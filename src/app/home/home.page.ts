import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AddItemPage } from '../add-item/add-item.page';
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';
import { ItemDetailPage } from '../item-detail/item-detail.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public items = [];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage) {}

  async addItem() {
    const addModal = await this.modalCtrl.create({
      component: AddItemPage
    });

    await addModal.present();

    const { data } = await addModal.onDidDismiss();
    if(data) {
      this.items.push(data);
      this.storage.set('todos', this.items);
    }

    return;
  }

  async viewItem(item) {
    const viewModal = await this.modalCtrl.create({
      component: ItemDetailPage,
      componentProps: {
        title: item.title,
        description: item.description
      }
    });

    return await viewModal.present();
  }

  ngOnInit() {
    this.storage.get('todos').then((data) => {
      this.items = data;
    });
  }

}
