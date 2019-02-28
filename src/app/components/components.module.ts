import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components that are needed to be imported into the pages
// We use component modules and import all the component at once.
import { HeaderComponentComponent } from './header-component/header-component.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [HeaderComponentComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [HeaderComponentComponent, LoginComponent, SignupComponent],
  entryComponents: [LoginComponent, SignupComponent]
})
export class ComponentsModule { }
