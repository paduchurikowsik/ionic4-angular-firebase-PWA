import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopoverController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {
  loading: boolean = false;

  // title passed through component
  @Input('title') title: string;

  constructor(
    public zone: NgZone,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    public popoverController: PopoverController
  ) {

  }

  // On view init, we check for the auth state change and re run the zone to re-render the component
  ngOnInit() {
    this.loading = true;
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.zone.run(() => {
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });
    if (this.loading) {
      setInterval(() => { this.loading = false }, 2000);
    }
  }

  // Login Popover
  async presentLoginPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LoginComponent,
      animated: true,
      mode: "md"
    });
    return await popover.present();
  }

  // Signup Popover
  async presentSignUpPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SignupComponent,
      animated: true,
      mode: "md"
    });
    return await popover.present();
  }

  // Logout for firebase
  logout() {
    this.authService.logout();
  }

}
