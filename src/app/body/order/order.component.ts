import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  orderNumber!: number;
  submittedDate!: number;
  orderDetails: any;
  constructor(private cartService: CartService)
  {

  }
  ngOnInit() {
    this.orderNumber = this.randomIntFromInterval(1000000, 9000000);
    this.submittedDate = Date.now();
    this.getOrderDetails();
  }

  getOrderDetails()
  {
    this.cartService.getOrderDetails().pipe(first()).subscribe(details => this.orderDetails = details);
  }

  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
