import { Component } from '@angular/core';
import { User } from '../user/app.user';
import { Item } from '../item/app.item';
import { UserService } from '../user/app.user.service';
import { WishService } from '../wishlist/app.wishService';
import { NgForm } from '@angular/forms';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'user',
    providers: [UserService],
    templateUrl: './app.users.html',
    
})
export class UserComponent {
    constructor(private userService: UserService, private wishService: WishService) { }

    users: User[];
    userItem: Item[];
    namesorting = 1;
    datesorting = 1;

    ngOnInit(): void {
        this.displayUsers();
    }

    public displayUsers() {
        this.userService.getUsers().subscribe(users => {
            this.users = users;
        });
    }

    public addNewUser(userForm: NgForm) {
        let user = new User(userForm.value['email'], userForm.value['birthDate'], userForm.value['name'], userForm.value['phone']);
        this.userService.saveUser(user);
        this.users.push(user);
        userForm.reset();
        $('#newUser').modal('hide');
    }

    public deleteUser(userId: Number) {
        $('#deleteUser').modal('show');
        $('#deleteUserButton').on('click', () => {
            this.userService.deleteUser(userId);
            for (var i = 0; i < this.users.length; i++) {
                if (this.users[i].id == userId) {
                    this.users.splice(i, 1);
                }
            }
            $('#deleteUser').modal('hide');
        });
    }

    public openWishList(userId: Number) {
        this.wishService.getUsersWishes(userId).subscribe(items => {
            this.userItem = items;
            $('#userWishlist').modal('show');
        })
    }

    public sort(number: Number) {
        if (number == 0) {
            if (this.namesorting == 1) {
                this.users.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    else return a.name < b.name ? -1 : 0;
                })
                $('#sortName').removeClass('glyphicon glyphicon-triangle-bottom').addClass('glyphicon glyphicon-triangle-top')
            }
            else {
                this.users.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    else return a.name < b.name ? 1 : 0;
                })
                $('#sortName').removeClass('glyphicon glyphicon-triangle-top').addClass('glyphicon glyphicon-triangle-bottom')
            }
            this.namesorting = -this.namesorting;
        }
        else {
            if (this.datesorting == 1) {
                this.users.sort(function (a, b) {
                    return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
                })
                $('#sortDate').removeClass('glyphicon glyphicon-triangle-bottom').addClass('glyphicon glyphicon-triangle-top')
            }
            else {
                this.users.sort(function (a, b) {
                    return -(new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime());
                })
                $('#sortDate').removeClass('glyphicon glyphicon-triangle-top').addClass('glyphicon glyphicon-triangle-bottom')
            }
            this.datesorting = -this.datesorting;
        }
    }
}