import { Injectable } from '@angular/core';
import { Wish } from './app.wish';
import { User } from '../user/app.user';
import { Item } from '../item/app.item';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import 'rxjs/Rx';

const URL = 'http://localhost:8080/user'

@Injectable()
export class WishService {
    constructor(
        private http: Http
    ) { }

    public getWishingUsers(item: Item) {
        return this.http.put(URL, item).map(res => res.json() as User[]).catch(this.handleError);
    }

    public getUsersWishes(userId: Number) {
        return this.http.get('http://localhost:8080/item/user/' + userId).map(res => res.json() as Item[]).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}