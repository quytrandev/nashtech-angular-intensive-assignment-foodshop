import { Routes } from '@angular/router';
import { ShopComponent } from './body/shop/shop.component';
import { HomeComponent } from './body/home/home.component';
import { WishlistComponent } from './body/wishlist/wishlist.component';
import { CartComponent } from './body/cart/cart.component';
import { CheckoutComponent } from './body/checkout/checkout.component';
import { LoginComponent } from './body/account/login/login.component';
import { RegisterComponent } from './body/account/register/register.component';
import { AuthGuard } from './backend-less/auth.guard';
import { NotfoundComponent } from './body/notfound/notfound.component';
import { OrderComponent } from './body/order/order.component';

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
        component: WishlistComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'cart',
        component: CartComponent
    },
    {
        path:'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'order',
        component: OrderComponent,
        //canActivate: [AuthGuard]
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path:'**',
        component: NotfoundComponent
    },
];
