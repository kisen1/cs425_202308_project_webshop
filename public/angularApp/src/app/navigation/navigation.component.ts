import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Token } from '../login/login.component';
import { environment } from 'src/environments/environment';
@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent{
	isLoggedIn!:boolean;
	name:string = environment.EMPTY_STRING;
	constructor(private _router: Router, private _authenticationService: AuthenticationService) {
		this.setIsLoggedIn(this._authenticationService.token)
		this._authenticationService.getTokenSubjectAsObservalbe().subscribe({
			next: (token) => this.setIsLoggedIn(token),
			error: (error) => console.log(error)
		})	
	}

	setIsLoggedIn(token: Token | null){
		if(token) {
			this.isLoggedIn = true;
			this.name = this._authenticationService.decodeToken(token.token).user
		}
		else this.isLoggedIn = false;
	}

	goHome() {
		this._router.navigate([environment.HOME_URL]);
	}

	goToProducts() {
		this._router.navigate([environment.PRODUCTS_URL]);
	}

	goToAddProduct(){
		this._router.navigate([environment.ADD_PRODUCT_URL])
	}

	logOut(){
		localStorage.clear();
		this._router.navigate([environment.HOME_URL]);
		this._authenticationService.emitTokenUpdate(null);
	}
}
