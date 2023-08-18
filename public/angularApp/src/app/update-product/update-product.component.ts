import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsDataService } from '../products-data.service';
import { Product } from '../products/products.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  _product!: Product;
  _productFormGroup: FormGroup = new FormGroup({
		name: new FormControl(environment.EMPTY_STRING, Validators.required),
		price: new FormControl(environment.EMPTY_STRING, Validators.required),
		img: new FormControl(environment.EMPTY_STRING)
	});
  showAlert: boolean = false;

	constructor(private _productsService: ProductsDataService, private _router: Router, private _activatedRoute: ActivatedRoute){}

	fullUpdateOne() {
			this._productsService.fullUpdateOne(this._product._id, this._productFormGroup.value).subscribe({
				error: (error)=>this.showErrorAlert(error),
        complete: ()=> this._router.navigate([environment.SINGLE_PRODUCT_URL + '/' + this._product._id]),
			});
	}

  showErrorAlert(error: any){
    console.log(typeof error.status)
    if(error.status = environment.UNAUTHORIZED_401_HTTP_CODE) this.showAlert = true;
  }

  setFormValues(){
    this._productFormGroup.patchValue({
      name: this._product.name,
      price: this._product.price,
      img: this._product.img
    });
  }

  ngOnInit(){
    const productId:string = this._activatedRoute.snapshot.params[environment.PRODUCT_ID];
    this._productsService.getOne(productId).subscribe({
      next:(product)=> this._product = product,
      error: (error)=> console.log(error),
      complete: ()=> this.setFormValues()
    });
  }
}
