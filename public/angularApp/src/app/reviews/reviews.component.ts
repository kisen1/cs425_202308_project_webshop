import { Component, Input } from '@angular/core';
import { Review } from '../products/products.component';
import { ReviewDataService } from '../review-data.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  _reviews!: Review[];
  hasMore! : boolean;
  _reviewsUpdateSubscription: Subscription;
  _offset: number = environment.REVIEWS_OFFSET;
  _count: number = environment.REVIEWS_COUNT;
  _emptyStar: string = environment.EMPTY_STAR_CSS_CLASS;
  _halfStar:string = environment.HALF_STAR_CSS_CLASS;
  _fullStar:string = environment.FULL_STAR_CSS_CLASS;

  @Input()
  _prdouctId!: string;

  constructor(private _reviewService: ReviewDataService){
    this._reviewsUpdateSubscription = _reviewService.getReviewsSubjectAsObservalbe().subscribe({
      next: (reviews)=> this._reviews = reviews,
      error: (error)=> console.log(error),
    });
  }

  previous(){
    this._offset -= this._count;
    this.getReviews();
  }

  next(){
    this._offset += this._count;
    this.getReviews();
  }

  setStarsClass(rating: number, starRank: number): string{
    if(rating <= starRank - 1) return this._emptyStar ;
    else if(rating > starRank - 1 && rating < starRank) return this._halfStar;
    return this._fullStar;
  }



  getReviews(){
    this._reviewService.getAll(this._prdouctId, this._count, this._offset).subscribe({
      next: (reviews) => this._reviews = reviews,
      error: (error) => console.log(error),
      complete: ()=> this.hasMore = this._reviews.length >= this._count
    });
  }

  ngOnChanges(){
    if(this._prdouctId) this.getReviews();
  }

  ngOnDestroy(){
    this._reviewsUpdateSubscription.unsubscribe();
  }

}
