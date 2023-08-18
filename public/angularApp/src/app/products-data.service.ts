import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from './products/products.component';

@Injectable({
	providedIn: 'root'
})
export class ProductsDataService {
	private _baseURL = "http://localhost:3000/api/products";

	constructor(private _http: HttpClient) { }

	getAll(offset:number, count:number, productName:string | undefined = undefined) : Observable<Product[]> {
		const url = this._baseURL + "?count="+count + "&offset="+ offset + "&productName=" + productName;
		return this._http.get<Product[]>(url);
	}

	getOne(id: string) : Observable<Product>{
		return this._http.get<Product>(this._baseURL + "/" + id);
	}

	addOne(product: Product): Observable<Product>{
		return	this._http.post<Product>(this._baseURL, product);
	}

	deleteOne(id: string) : Observable<Product>{
		return this._http.delete<Product>(this._baseURL + "/" + id);
	}

	fullUpdateOne(id: string, product:Product): Observable<Product>{
		return this._http.put<Product>(this._baseURL + "/" + id, product);
	}
}
