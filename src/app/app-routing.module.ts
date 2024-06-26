import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FeedComponent } from './feed/feed.component';
import { AuthentificationGuard } from './authentification/authentification.guards';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddFriendsComponent } from './add-friends/add-friends.component';

const routes: Routes = [
  { path: '', redirectTo: "/auth", pathMatch:"full"},
  { path: 'auth', component: AuthentificationComponent},
  { path: 'feed', component: FeedComponent, canActivate: [AuthentificationGuard]},
  // { path: 'feed', component: FeedComponent},
  { path: 'add-address', component: AddAddressComponent, canActivate: [AuthentificationGuard]},
  // { path: 'add-address', component: AddAddressComponent},
  { path: 'add-friends', component: AddFriendsComponent, canActivate: [AuthentificationGuard]},
  // { path: 'add-friends', component: AddFriendsComponent},
  { path: '*', redirectTo: "/auth" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
