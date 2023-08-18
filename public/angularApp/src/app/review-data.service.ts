import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Review } from './products/products.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewDataService {
  _baseUrl: string = "http://localhost:3000/api/products/";
  _reviewsSubject:Subject<Review[]> =  new Subject<Review[]>();

  constructor(private _http: HttpClient) { }

  getOne(productId: string, reviewId:string): Observable<Review>{
    const url: string = this._baseUrl + productId + "/" +environment.REVIEWS_URL+ "/" + reviewId;
    return this._http.get<Review>(url);
  }

  fullUpdateOne(productId: string, reviewId: string, body: Review): Observable<Review>{
    const url: string = this._baseUrl + productId + "/" + environment.REVIEWS_URL + "/" + reviewId;
    return this._http.put<Review>(url, body);
  }

  deleteOne(productId:string, reviewId:string): Observable<Review>{
    const url: string = this._baseUrl + productId + "/" + environment.REVIEWS_URL + "/" + reviewId;
    return this._http.delete<Review>(url);
  }

  getAll(productId: string, count:number, offset:number): Observable<Review[]>{
    const url :string = this._baseUrl + productId + "/reviews?count="+count+"&offset="+offset;
    return this._http.get<Review[]>(url);
  }

  addOne(productId: string, body:Review):Observable<Review>{
    const url:string = this._baseUrl + productId + "/" + environment.REVIEWS_URL;
    return this._http.post<Review>(url, body);
  }

  getReviewsSubjectAsObservalbe():Observable<Review[]>{
    return this._reviewsSubject.asObservable();
  }

  emitReviewsUpdate(reviews: Review[]){
    this._reviewsSubject.next(reviews);
  }

}
