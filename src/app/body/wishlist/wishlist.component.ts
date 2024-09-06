import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  wishlistItems: any[] =[];
  constructor(private cartService:CartService, private alertService:AlertService)
  {

  }
  ngOnInit(): void {
    this.getWishlistItems();
  
  }
 
  getWishlistItems()
  {
    this.cartService.getWishlistItems().pipe(first()).subscribe(products => this.wishlistItems = products);

  }
  removeItemFromWishlist(item:any)
  {
    if (window.confirm('Are sure you want to remove this item from your wishlist?')) {
      this.cartService.deleteWishlistItem(item).pipe(first()).subscribe({});
      this.alertService.success("Item <strong>" + item.productName+ "</strong> has been removed from your wishlist ");
      this.getWishlistItems();
    }

  }
  moveWishlistItemToCart(item:any)
  {
    if (window.confirm('Are sure you want to move this item to cart?')) {
      this.cartService.moveWishlistItemToCart(item).pipe(first()).subscribe({});
      this.getWishlistItems();

      this.alertService.success("The item <strong>" + item.productName + "</strong> has been moved to your <a style='color: red;text-decoration:underline' href='/cart'><strong>cart </strong> </a>");

    }
    
  }
}
