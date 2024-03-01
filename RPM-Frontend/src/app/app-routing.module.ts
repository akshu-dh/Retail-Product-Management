import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { SignupComponent } from './components/signup/signup.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SearchComponent } from './components/search/search.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';

const routes: Routes = [
  
  { path: 'welcomepage', component: WelcomepageComponent },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'signup',
    component: SignupComponent,
  },

  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'search/:searchTerm',
    component: SearchComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: 'welcomepage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}

export const routingComponents = [
  WelcomepageComponent,
  LoginComponent,
  ProductsComponent,
  SignupComponent,
  CartComponent,
  WishlistComponent,
];
