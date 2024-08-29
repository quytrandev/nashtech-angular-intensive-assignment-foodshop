import { Routes } from '@angular/router';
import { ShopComponent } from './body/shop/shop.component';
import { HomeComponent } from './body/home/home.component';
import { WishlistComponent } from './body/wishlist/wishlist.component';
import { CartComponent } from './body/cart/cart.component';
import { CheckoutComponent } from './body/checkout/checkout.component';
import { LoginComponent } from './body/auth/login/login.component';
import { RegisterComponent } from './body/auth/register/register.component';

export const routes: Routes = [
    {
        path:'shop',
        component: ShopComponent
    },
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'wishlist',
        component: WishlistComponent
    },
    {
        path:'cart',
        component: CartComponent
    },
    {
        path:'checkout',
        component: CheckoutComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'register',
        component: RegisterComponent
    },
];
