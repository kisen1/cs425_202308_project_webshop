import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewDataService } from '../review-data.service';
import { Review } from '../products/products.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-review',
  templateUrl: './single-review.component.html',
  styleUrls: ['./single-review.component.css']
})
export class SingleReviewComponent {
  _productId!: string;
  _reviewId!: string;
  showAlert: boolean = false;
  fb: FormBuilder = new FormBuilder();
  _reviewFormGroup:FormGroup = this.fb.group({
    title: [environment.EMPTY_STRING, Validators.required],
    rating: [environment.EMPTY_STRING, Validators.required],
    description: [environment.EMPTY_STRING, Validators.required]
  });

  constructor(private _activatedRoute: ActivatedRoute, private _reviewService: ReviewDataService, private _router:Router){}

  updateOne(){
    this._reviewService.fullUpdateOne(this._productId, this._reviewId, this._reviewFormGroup.value)
      .subscribe({
        error: (error)=> this.showErrorAlert(error),
        complete: ()=> this._router.navigate([environment.SINGLE_PRODUCT_URL +'/'+this._productId])
      });
  }

  deleteOne(){
    this._reviewService.deleteOne(this._productId, this._reviewId).subscribe({
      error: (error)=> this.showErrorAlert(error),
      complete: ()=> this._router.navigate([environment.SINGLE_PRODUCT_URL + '/'+this._productId])
    })
  }

  showErrorAlert(error: any){
    console.log(error);
    if(error.status = environment.UNAUTHORIZED_401_HTTP_CODE) this.showAlert = true;
  }

  setReviewForm(review:Review){
    this._reviewFormGroup.setValue({
      title: review.title,
      rating: review.rating,
      description: review.description
    });
  }

  getReview(){
    this._reviewService.getOne(this._productId, this._reviewId).subscribe({
      next : (review) => this.setReviewForm(review),
      error: (error) => console.log(error)
    });
  }

  ngOnInit(){
     this._productId = this._activatedRoute.snapshot.params[environment.PRODUCT_ID];
     this._reviewId = this._activatedRoute.snapshot.params[environment.REVIEW_ID];
    this.getReview();
  }
}
