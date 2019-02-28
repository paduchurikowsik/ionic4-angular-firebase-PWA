import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // Service that provide loading screen overlay

  private loading;

  constructor(public loadingController: LoadingController) { }

  // Take a message that is displayed on the loading screen
  async showLoading(message: string) {
    if (!this.loading) {
      this.loading = await this.loadingController.create({
        spinner: 'crescent',
        message: message
      });
      return await this.loading.present();
    }
  }

  async hideLoading() {
    if (this.loading) {
      return await this.loading.dismiss().then(() => {
        this.loading = null;
      });
    }
  }

}
