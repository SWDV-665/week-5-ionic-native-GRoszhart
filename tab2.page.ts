import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '.././groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  title = "Groceries";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceService, public inputDialogService: InputDialogServiceService, public socialSharing: SocialSharing) {
  }

  loadItems(): any {
    return this.dataService.getItems();
  }

  async removeItem(item: any, index) {
    console.log("Removing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Removing Item - ' + item.name,
      duration: 1500
    });

    await toast.present();

    this.dataService.removeItem(index);

  }

  async shareItem(item: any, index) {
    console.log("Sharing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Sharing Item - ' + item.name,
      duration: 1500
    });

    await toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries App";

    this.socialSharing.share(message, subject).then(() => {
      console.log("Shared Successfully!")
    }).catch((error) => {
      console.error("Error Sharing!", error);
    });

  }

  async editItem(item: any, index) {
    console.log("Edit Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Editing Item - ' + item.name,
      duration: 1500
    });

    await toast.present();
    this.inputDialogService.showPrompt(item, index);

  }

  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }

}