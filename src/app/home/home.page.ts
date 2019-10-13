import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AddItemPage } from '../add-item/add-item.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public items = [];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  async addItem() {
    const addModal = await this.modalCtrl.create({
      component: AddItemPage
    });

    await addModal.present();

    const { data } = await addModal.onDidDismiss();
    if(data) {
      this.items.push(data);
    }

    return;
  }

  viewItem(item) {
    
  }

  ngOnInit() {}

}
