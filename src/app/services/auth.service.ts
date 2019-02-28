import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Service that handles the login, register, login to Firebase Authentication

  constructor(
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase,
    public loadingervice: LoadingService
  ) { }


  // Login the user with emailand password
  // return a promise of true or false
  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.loadingervice.showLoading("Authenticating ...").then(() => {
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then((success) => {
          this.loadingervice.hideLoading();
          resolve(true);
        }).catch((error) => {
          this.loadingervice.hideLoading().then(() => {
            resolve(false);
          });
        });
      });
    });
  }


  // Register the user with email, password
  // On success, add the full name to the realtime database under users/userid/fullname
  // Return a promise of true or false
  register(email: string, password: string, fullname: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.loadingervice.showLoading("Registering User...").then(() => {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((success) => {
          this.afDatabase.object('/users/' + success.user.uid).update({ fullname: fullname, userId: success.user.uid }).then((v) => {
            this.loadingervice.hideLoading();
            resolve(true);
          }).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
          console.log(error);
          this.loadingervice.hideLoading();
          resolve(false);
        })
      });
    })
  }


  // Logout the Current logged in User
  logout() {
    this.loadingervice.showLoading("Logging Out User...").then(() => {
      this.afAuth.auth.signOut().then(() => {
        console.log("logged out");
        this.loadingervice.hideLoading();
      }).catch((error) => {
        this.loadingervice.hideLoading();
      });
    });
  }


}
