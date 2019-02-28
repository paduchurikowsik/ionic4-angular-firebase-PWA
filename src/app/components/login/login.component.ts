import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Simple Login form without any validate and error checks

  public loginForm: FormGroup;

  constructor(public authService: AuthService, public popoverController: PopoverController) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginForm.value["email"], this.loginForm.value["password"]).then(() => {
      this.close();
    });
  }

  clearForm() {
    this.loginForm.reset();
  }

  close() {
    this.popoverController.dismiss();
  }
}
