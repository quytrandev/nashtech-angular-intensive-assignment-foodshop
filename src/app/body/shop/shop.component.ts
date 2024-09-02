import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule, RouterOutlet],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  products?: any[];

  constructor(private productService: ProductService) {
  }
  ngOnInit(): void {
    this.productService.getAll().pipe(first()).subscribe(products => this.products = products);
  }
}
