import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReviewDataService } from '../review-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  fb: FormBuilder = new FormBuilder();
  showAlert: boolean = false;
  _reviewFormGroup:FormGroup = this.fb.group({
    title: [environment.EMPTY_STRING, Validators.required],
    rating: [environment.EMPTY_STRING, Validators.required],
    description: [environment.EMPTY_STRING, Validators.required]
  });
  @Input()
  _productId!: string

  constructor(private _reviewService: ReviewDataService){}
  
  addOne(){
    this._reviewService.addOne(this._productId, this._reviewFormGroup.value).subscribe({
      error: (error)=> this.showErrorAlert(error),
      complete: ()=> {
        this._getReviewsAndEmit();
        this._reviewFormGroup.reset();
      }
    });
  }

  showErrorAlert(error: any){
    console.log(error);
    if(error.status = environment.UNAUTHORIZED_401_HTTP_CODE) this.showAlert = true;
  }

  _getReviewsAndEmit(){
    this._reviewService.getAll(this._productId, environment.REVIEWS_COUNT, environment.REVIEWS_OFFSET).subscribe({
      next: (reviews) => this._reviewService.emitReviewsUpdate(reviews),
      error: (error) => console.log(error),
    });
  }


}
