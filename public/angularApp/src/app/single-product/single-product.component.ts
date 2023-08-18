import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsDataService } from '../products-data.service';
import { Product, Review } from '../products/products.component';
import { AuthenticationService } from '../authentication.service';
import { Token } from '../login/login.component';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  _product: Product;
  isLoggedIn!: boolean;
  showAlert: boolean = false;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductsDataService,
    private _authenticationService: AuthenticationService
  ) {
    this._product = new Product(
      environment.EMPTY_STRING,
      environment.EMPTY_STRING, 
      0,
      environment.EMPTY_STRING, 
      [new Review(
        environment.EMPTY_STRING, 
        environment.EMPTY_STRING, 
        0, 
        environment.EMPTY_STRING
        )
      ]
    );
    this.setIsLoggedIn(this._authenticationService.token);
    this._authenticationService.getTokenSubjectAsObservalbe().subscribe({
      next: (token) => this.setIsLoggedIn(token),
      error: (error) => console.log(error)
    });
    
  }

  setIsLoggedIn(token: Token | null) {
    if (token) this.isLoggedIn = true;
    else this.isLoggedIn = false;
  }


  delete() {
    this._productService.deleteOne(this._product._id).subscribe({
      error: (error) => this.showErrorAlert(error),
      complete: () => this._router.navigate([environment.PRODUCTS_URL])
    });
  }

  goToEdit() {
    this._router.navigate([ environment.UPDATE_PRODUCT_URL +'/' + this._product._id])
  }

  showErrorAlert(error: any){
    console.log(error);
    if(error.status = 401) this.showAlert = true;
  }

  ngOnInit(): void {
    const productId = this._route.snapshot.params[environment.PRODUCT_ID];;
    this._productService.getOne(productId).subscribe({
      next: (product) => this._product = product,
      error: (error) => console.log(error),
    });
  }

}
