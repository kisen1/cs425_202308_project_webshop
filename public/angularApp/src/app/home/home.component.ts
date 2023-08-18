import { Component } from '@angular/core';

import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  _homeWelcome:string = environment.HOME_WELCOME;
}
