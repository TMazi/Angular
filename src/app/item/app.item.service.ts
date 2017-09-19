import { Injectable } from '@angular/core';
import { Item } from './app.item';
import { User } from '../user/app.user';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import 'rxjs/Rx';

const URL = 'http://localhost:8080/item'
const lost = 'http://localhost:8080/lost'
const found = 'http://localhost:8080/found'
const history = 'http://localhost:8080/history'

@Injectable()
export class ItemService {
    items: Item[];
    constructor(
        private http: Http
    ) { }

    public getSingleItem(itemId: number) {
        const url = `${URL}/${itemId}`;
        return this.http.get(url).map(res => res.json() as Item).catch(this.handleError);
    }

    public getItems() {
        return this.http.get(URL).map(res => res.json() as Item[]).catch(this.handleError);
    }

    public getItemsByStatus(status: string) {
        if (status === 'LOST') {
            return this.http.get(lost).map(res => res.json() as Item[]).catch(this.handleError);
        }
        else
            return this.http.get(found).map(res => res.json() as Item[]).catch(this.handleError);
    }

    public saveItem(item: Item) {
        let newItem =
            {

                "name": item.name,
                "description": item.description,
                "color": item.color,
                "category": item.category,
                "weight": item.weight,
                "status": item.status,
                "dateOfFound": item.dateOfFound,
                "photoUrl": item.photoUrl
            }
        return this.http.post(URL, newItem).subscribe();
    }

    public updateItem(item: Item) {
        const url = `${URL}/${item.id}`;
        return this.http.put(url, item).subscribe();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    public assignUser(itemId: Number, userId: Number) {
        return this.http.put(URL + '/assign/' + userId + '/' + itemId, null).subscribe();
    }

    public getPossibleUser(itemId: Number) {
        return this.http.get(URL + '/possible/' + itemId).map(res => res.json() as User[]).catch(this.handleError);
    }

    public getHistoryItems() {
        return this.http.get(history).map(res => res.json() as Item[]).catch(this.handleError);
    }
}