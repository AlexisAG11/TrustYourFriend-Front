import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FeedComponent } from './feed/feed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FeedCenterComponent } from './feed/feed-center/feed-center.component';
import { FeedLeftComponent } from './feed/feed-left/feed-left.component';
import { FeedRightComponent } from './feed/feed-right/feed-right.component';
import { FeedHeaderComponent } from './feed/feed-center/feed-header/feed-header.component';
import { AuthentificationInterceptor } from './authentification/authentification.interceptor';
import { PostComponent } from './feed/feed-center/post/post.component';
import { TimeAgoPipe } from 'src/pipe/time-ago.pipe';
import { AddAddressComponent } from './add-address/add-address.component';
import { FriendsListComponent } from './feed/feed-right/friends-list/friends-list.component';
import { AddFriendsComponent } from './add-friends/add-friends.component';
import { ConfirationDialogComponent } from './confiration-dialog/confiration-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    FeedComponent,
    FeedCenterComponent,
    FeedLeftComponent,
    FeedRightComponent,
    FeedHeaderComponent,
    PostComponent,
    TimeAgoPipe,
    AddAddressComponent,
    FriendsListComponent,
    AddFriendsComponent,
    ConfirationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthentificationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
