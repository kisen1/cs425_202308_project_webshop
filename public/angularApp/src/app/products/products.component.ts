import { Component } from '@angular/core';

import { ProductsDataService } from '../products-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

export class Review{
	#_id: string;
	#title:string;
	#rating:number;
	#description:string;

	constructor(id: string, title:string, rating:number, description: string){
		this.#_id = id;
		this.#title = title;
		this.#rating = rating;
		this.#description = description;
	}

	set title(title:string){
		this.#title = title;
	}
	set rating(rating:number){
		this.#rating = rating;
	}
	set description(description: string){
		this.#description = description;
	}
	set _id(id: string){
		this.#_id = id;
	}

	get title(){
		return this.#title;
	}
	get rating(){
		return this.#rating;
	}
	get description(){
		return this.#description;
	}
	get _id(){
		return this.#_id;
	}
}

export class Product {
	#_id:string;
	#name: string;
	#price: number;
	#img: string;
	#review: Review[];

	constructor(id: string, name: string, price: number, img: string, review:Review[]) {
		this.#_id = id;
		this.#name = name;
		this.#price = price;
		this.#img = img;
		this.#review = review;
	}

	set _id(id: string) {
		this.#_id = id;
	}

	get _id() {
		return this.#_id;
	}

	set name(name: string) {
		this.#name = name;
	}

	get name() {
		return this.#name;
	}

	set price(price: number) {
		this.#price = price;
	}

	get price() {
		return this.#price;
	}

	set img(img: string) {
		this.#img = img;
	}

	get img() {
		return this.#img;
	}

	set review(review: Review[]) {
		this.#review = review;
	}

	get review() {
		return this.#review;
	}
}




@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent  {
	_fb: FormBuilder = new FormBuilder();
	_searchFormGroup: FormGroup = this._fb.group({
		productName: [environment.EMPTY_STRING, Validators.required]
	  });
	_products!: Product[];
	_offset:number= environment.PRODUCTS_OFFSET;
	_count: number = environment.PRODUCTS_COUNT;
	_hasMore!: boolean;
	_productNameToSearch!:string;

	constructor(private _productsService: ProductsDataService){}

	
	search(){
		this._productNameToSearch = this._searchFormGroup.value.productName;
		this.getAllProducts();
	}

	getAllProducts(){
		this._productsService.getAll(this._offset, this._count, this._productNameToSearch).subscribe({
			next: (products)=> {this._products = products},
			error: (error)=> {console.log(error);},
			complete: ()=> this._hasMore = this._products.length >= this._count
		});
	}

	ngOnInit() {
		this.getAllProducts();
	}


	next(){
		this._offset += this._count;
		this.ngOnInit();
	}

	previous(){
		this._offset -= this._count;
		this.ngOnInit();
	}


}
