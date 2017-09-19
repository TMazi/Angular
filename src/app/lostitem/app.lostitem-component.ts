import { Component } from '@angular/core';
import { Item } from '../item/app.item';
import { ItemService } from '../item/app.item.service';
import { NgForm } from '@angular/forms';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'lost',
    providers: [ItemService],
    templateUrl: './app.lost-items.html',
})
export class LostItemComponent {
    constructor(private itemService: ItemService) { }

    items: Item[];
    allitems: Item[];
    singleitem: Item;
    categories = ['Electronic', 'Jewelery', 'Books'];

    ngOnInit(): void {
        this.displayLost();
    }

    public displayLost() {
        this.itemService.getItemsByStatus('LOST').subscribe(items => {
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
            this.items = this.items.filter(function (item) { console.log(category + ' ' + item.category); return item.category === category });
    }

    public addNewItem(itemForm: NgForm) {
        let item = new Item(itemForm.value['category'], itemForm.value['color'],
            itemForm.value['date'], itemForm.value['description'], itemForm.value['itemName'],
            'LOST', itemForm.value['weight'], itemForm.value['photo']);
        this.itemService.saveItem(item);
        this.items.push(item);
        itemForm.reset();
        $('#myModal').modal('hide');
    }

    public closeModal(itemForm: NgForm) {
        itemForm.reset();
        $('#myModal').modal('hide');
    }

    public openDetails(item: Item) {
        $('#details').modal('show');
        $('#bigImage').attr('src', item.photoUrl);
    }

}