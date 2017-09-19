import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ItemComponent } from './founditems/app.item-component';
import { LostItemComponent } from './lostitem/app.lostitem-component';
import { AppComponent } from './app.component';
import { UserComponent } from './user/app.usercomponent';
import { ItemService } from './item/app.item.service';
import { UserService } from './user/app.user.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishService } from './wishlist/app.wishService'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'found',
        component: ItemComponent
      },
      {
        path: 'lost',
        component: LostItemComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: '',
        redirectTo: '/found',
        pathMatch: 'full'
      }
    ])
  ],
  declarations: [AppComponent, ItemComponent, LostItemComponent, UserComponent],
  providers: [ItemService, UserService, WishService],
  bootstrap: [AppComponent]
})
export class AppModule { }
