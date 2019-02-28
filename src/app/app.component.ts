import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { Platform, PopoverController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController } from '@ionic/angular';

import { SwUpdate } from '@angular/service-worker';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertController: AlertController,
    public popoverController: PopoverController,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    public swUpdate: SwUpdate,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  // Shows a popup when ever a new update has been pushed to the server
  async newUpdate() {
    const alert = await this.alertController.create({
      header: `App update!`,
      message: `Newer version of the app is available. It's a quick refresh away!`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Refresh',
          handler: () => {
            window.location.reload();
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async () => {
        this.newUpdate();
      });
    }
  }

  // Login Popover for Side Menu
  async presentLoginPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LoginComponent,
      animated: true,
      mode: "md"
    });
    return await popover.present();
  }


  // Signup Popover for Side Menu
  async presentSignUpPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SignupComponent,
      animated: true,
      mode: "md"
    });
    return await popover.present();
  }

  logout() {
    this.authService.logout();
  }
}
