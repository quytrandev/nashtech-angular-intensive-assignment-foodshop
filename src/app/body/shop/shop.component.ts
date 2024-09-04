import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { AlertComponent } from "../../alert/alert.component";
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule, RouterOutlet, AlertComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  products?: any[];

  constructor(private productService: ProductService, private alertService: AlertService,
    private cartService: CartService) {
  }
  ngOnInit(): void {
    this.productService.getAll().pipe(first()).subscribe(products => this.products = products);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product).pipe(first()).subscribe({
      next: () => {
        this.alertService.success(product.productName + " has been added to your cart", { keepAfterRouteChange: true });
      },
      error: error => {
        this.alertService.error(error);
      }
    });
  }
}
