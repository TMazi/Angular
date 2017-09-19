import { Injectable } from '@angular/core';
import { User } from './app.user';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import 'rxjs/Rx';

const URL = 'http://localhost:8080/user'

@Injectable()
export class UserService {
    constructor(
        private http: Http
    ) { }

    public getUsers() {
        return this.http.get(URL).map(res => res.json() as User[]).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    public saveUser(user: User) {
        return this.http.post(URL, user).subscribe();
    }

    public deleteUser(id: Number) {
        return this.http.delete(URL + '/' + id).subscribe();
    }

}