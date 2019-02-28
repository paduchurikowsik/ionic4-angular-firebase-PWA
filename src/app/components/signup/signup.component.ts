import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // Simple Sign Up form without any validate and error checks

  public registerForm: FormGroup;

  constructor(public authService: AuthService, public popoverController: PopoverController) {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      fullname: new FormControl(),
    });
  }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.registerForm.value["email"], this.registerForm.value["password"], this.registerForm.value["fullname"]).then((value) => {
      this.close();
    });
  }

  close() {
    this.popoverController.dismiss();
  }

}
