import { AuthGuard } from './user/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'kanban',
    loadChildren: () =>
      import('./kanban/kanban.module').then((m) => m.KanbanModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
