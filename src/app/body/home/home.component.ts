import { Component } from '@angular/core';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShopComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
