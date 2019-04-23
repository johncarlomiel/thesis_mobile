import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagePageModule } from './modals/message/message.module';
import { MessagePage } from './modals/message/message.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'my-info',
    loadChildren: './my-info/my-info.module#MyInfoPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { path: 'my-problems', loadChildren: './my-problems/my-problems.module#MyProblemsPageModule' },
  { path: 'about-me', loadChildren: './about-me/about-me.module#AboutMePageModule' },
  { path: 'about-me-modal', loadChildren: './modals/about-me-modal/about-me-modal.module#AboutMeModalPageModule' },
  { path: 'sds-result', loadChildren: './sds-result/sds-result.module#SdsResultPageModule' },
  { path: 'e-form', loadChildren: './e-form/e-form.module#EFormPageModule' },
  { path: 'message', loadChildren: './modals/message/message.module#MessagePageModule' },
  { path: 'invitation', loadChildren: './invitation/invitation.module#InvitationPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MessagePageModule
  ],
  exports: [RouterModule],
  entryComponents: [MessagePage]

})
export class AppRoutingModule { }
