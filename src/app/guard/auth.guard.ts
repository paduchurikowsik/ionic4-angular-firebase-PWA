import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // AuthGuard to protect some pages from navigating
  // We subscribe to the user object of AngularFireAuth and return true or false

  constructor(private navCtrl: NavController, public afAuth: AngularFireAuth) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.afAuth.user.subscribe((userG) => {
        if (userG) {
          resolve(true);
        } else {
          this.navCtrl.navigateRoot(['']);
          resolve(false);
        }
      });
    });
  }
}
