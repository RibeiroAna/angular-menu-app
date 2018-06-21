import { Component, OnInit } from '@angular/core';
import { Item } from '../item.interface';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item [] = [{
    name: 'Pizza',
    price: 3
  },
  {
    name: 'Salad',
    price: 2
  }];

  newItem = new Item();


  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    window.alert('Added to shopping cart');
  }

  addNewItem() {
    this.items.push(this.newItem);
  }

}
