import { Component } from '@angular/core';
import { Item } from '../item/app.item';
import { User } from '../user/app.user';
import { ItemService } from '../item/app.item.service';
import { UserService } from '../user/app.user.service';
import { WishService } from '../wishlist/app.wishService'
import { NgForm } from '@angular/forms';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'found',
    providers: [ItemService],
    templateUrl: './app.found-items.html',
})
export class ItemComponent {
    constructor(private itemService: ItemService, private wishService: WishService, private userService: UserService) { }

    historyItems: Item[];
    items: Item[];
    allitems: Item[];
    singleitem: Item;
    users: User[];
    user: User;
    categories = ['Electronic', 'Jewelery', 'Books'];

    ngOnInit(): void {
        this.displayFound();
    }

    public displayFound() {
        this.itemService.getItemsByStatus('FOUND').subscribe(items => {
            this.items = items;
            this.allitems = items
        });
    }

    public sortByDate() {
        this.items.sort(function (a, b) {
            let firsDate = new Date(a.dateOfFound),
                secondDate = new Date(b.dateOfFound);
            return firsDate.getTime() - secondDate.getTime();
        })
    }

    public sortByName() {
        this.items.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        })
    }

    public selectedCategory(category: string) {
        this.items = this.allitems;
        if (category !== 'All')
            this.items = this.items.filter(function (item) { return item.category === category });
    }

    public addNewItem(itemForm: NgForm) {
        let item = new Item(itemForm.value['category'], itemForm.value['color'],
            itemForm.value['date'], itemForm.value['description'], itemForm.value['itemName'],
            'FOUND', itemForm.value['weight'], itemForm.value['photo']);
        this.itemService.saveItem(item);
        this.displayFound();
        itemForm.reset();
        $('#myModal').modal('hide');
    }

    public closeModal(itemForm: NgForm) {
        itemForm.reset();
        $('#myModal').modal('hide');
    }

    public openDetails(item: Item) {
        $('#people').empty();
        $('#image').attr('src', item.photoUrl);
        this.wishService.getWishingUsers(item).subscribe(users => {
            for (let i = 0; i < users.length; i++) {
                $('#people').append('<li><img class="icon" src="resources/images/yes.png" />'
                    + users[i].name + '</li>');
            }
        });
        $('#detailsModal').modal('show')
    }

    public assignNewPerson(item: Item) {
        this.itemService.getPossibleUser(item.id).subscribe(users => {
            this.users = users;
            this.users.sort(function (a, b) {
                return a.id - b.id;
            })
            $('#assignUserModal').modal('show');
            $('#assignUser').on('click', () => {
                this.itemService.assignUser(item.id, this.user.id);
                $('#assignUserModal').modal('hide');
            })
        })
        this.users = [];
    }

    public showHistory() {
        this.itemService.getHistoryItems().subscribe(items => {
            this.historyItems = items;
            $('#history').modal('show');
        })
    }

    public backToOwner(item: Item) {
        $('#confirmBack').modal('show');
        $('#cancel').click(function () {
            $('#confirmBack').modal('hide');
        });
        $('#confirm').on('click', () => {
            item.status = 'RETURNED';
            this.itemService.updateItem(item);
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i] === item) {
                    this.items.splice(i, 1);
                }
            }
            $('#confirmBack').modal('hide');
        });
    }

    public backToUser(item: Item) {
        $('#confirmBackUser').modal('show');
        $('#cancel').click(function () {
            $('#confirmBack').modal('hide');
        });
        $('#confirmUser').on('click', () => {
            if (this.monthDiff(new Date(item.dateOfFound), new Date()) > 0) {
                console.log(item.dateOfFound);
                item.status = 'RETURNED';
                this.itemService.updateItem(item);
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i] === item) {
                        this.items.splice(i, 1);
                    }
                }
            }
            else {
                $('#errorModal').modal('show');
            }
        });
    }

    private monthDiff(d1: Date, d2: Date) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }
}
