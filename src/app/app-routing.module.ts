import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthPageComponent} from './user/auth-page/auth-page.component';

const routes: Routes = [{ path: '', loadChildren:() => import('./user/user.module').then(m => m.UserModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
