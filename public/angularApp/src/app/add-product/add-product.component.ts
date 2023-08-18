import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductsDataService } from '../products-data.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
	showAlert: boolean = false;
	_productFormGroup: FormGroup = new FormGroup({
		name: new FormControl(environment.EMPTY_STRING, Validators.required),
		price: new FormControl(environment.EMPTY_STRING, Validators.required),
		img: new FormControl(environment.EMPTY_STRING)
	});

	constructor(private _productsService: ProductsDataService, private _router: Router){}

	addOne() {
			this._productsService.addOne(this._productFormGroup.value).subscribe({
				next: (res)=>console.log(res),
				error: (error)=>this.showErrorAlert(error),
				complete:()=> this._router.navigate([environment.PRODUCTS_URL])
			});
	}

	showErrorAlert(error: any){
		console.log(error);
		if(error.status = environment.UNAUTHORIZED_401_HTTP_CODE) this.showAlert = true;
	  }
}
