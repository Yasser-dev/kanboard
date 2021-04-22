import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { GoogleSigninDirective } from './google-signin.directive';

@NgModule({
  declarations: [AuthPageComponent, GoogleSigninDirective],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
