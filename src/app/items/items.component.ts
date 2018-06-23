import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Item } from './item.interface';
import { AuthService } from '../auth/auth.service';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  itemForm: FormGroup;
  items: Item [];
  itemSubmitted = false;

  constructor(public authService: AuthService, private itemService: ItemsService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.itemService.getItems().subscribe(items => this.items = items);
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  addToCart() {
    this.itemService.postToShoppingCart().subscribe(response => {
    }, error => {
        window.alert(error.error.message || error.error.text);
        console.log(error);
    });
  }

  get getItemForm() {
    return this.itemForm.controls;
  }

  addNewItem() {
    this.itemSubmitted = true;

    if (this.itemForm.invalid) {
      console.log(this.itemForm);
    } else {
      this.itemService.postItems(this.itemForm.value).subscribe(response => {
        window.location.reload();
      }, error => {
          window.alert(error.error.message);
      });
    }
  }

}
