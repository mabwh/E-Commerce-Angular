import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth-guard';
import { guestGuard } from '../guards/guest-guard';
import { roleGuard } from '../guards/role-guard';

export const routes: Routes = [
  // 1. Auth Flow
  { path: 'auth/login', loadComponent: () => import('../pages/auth/login/login').then(m => m.Login), canActivate: [guestGuard] },
  { path: 'auth/register', loadComponent: () => import('../pages/auth/register/register').then(m => m.Register), canActivate: [guestGuard] },
  { path: 'auth/forgot-password', loadComponent: () => import('../pages/auth/forgot-password/forgot-password').then(m => m.ForgotPassword), canActivate: [guestGuard] },
  { path: 'auth/reset-password', loadComponent: () => import('../pages/auth/reset-password/reset-password').then(m => m.ResetPassword), canActivate: [guestGuard] },
  { path: 'auth/confirm-email', loadComponent: () => import('../pages/auth/confirm-email/confirm-email').then(m => m.ConfirmEmail) },

  // 2. Product Browsing Flow & 3. Category Flow
  { path: '', loadComponent: () => import('../pages/store/home/home').then(m => m.Home) },
  { path: 'products/:id', loadComponent: () => import('../pages/store/product-details/product-details').then(m => m.ProductDetails) },
  { path: 'categories', loadComponent: () => import('../pages/store/categories/categories').then(m => m.Categories) },
  { path: 'categories/:id', loadComponent: () => import('../pages/store/category-details/category-details').then(m => m.CategoryDetails) },

  // 4. Cart Flow
  { path: 'cart', loadComponent: () => import('../pages/cart/cart-view/cart-view').then(m => m.CartView) },
  { path: 'checkout', loadComponent: () => import('../pages/cart/checkout/checkout').then(m => m.Checkout) },

  // 5. Order Flow, 6. Wishlist Flow, 8. User Profile Flow
  { 
    path: 'user', 
    canActivate: [authGuard],
    children: [
      { path: 'profile', loadComponent: () => import('../pages/user/profile/profile').then(m => m.Profile) },
      { path: 'orders', loadComponent: () => import('../pages/user/orders/orders').then(m => m.Orders) },
      { path: 'orders/:id', loadComponent: () => import('../pages/user/order-details/order-details').then(m => m.OrderDetails) },
      { path: 'wishlist', loadComponent: () => import('../pages/user/wishlist/wishlist').then(m => m.Wishlist) }
    ]
  },

  // 9. Seller Workflow
  {
    path: 'seller',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Seller'] },
    children: [
      { path: 'dashboard', loadComponent: () => import('../pages/seller/dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'product/new', loadComponent: () => import('../pages/seller/product-form/product-form').then(m => m.ProductForm) },
      { path: 'product/:id/edit', loadComponent: () => import('../pages/seller/product-form/product-form').then(m => m.ProductForm) }
    ]
  },

  // 10. Admin Workflow
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Admin'] },
    children: [
      { path: 'dashboard', loadComponent: () => import('../pages/admin/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard) },
      { path: 'users', loadComponent: () => import('../pages/admin/users/users').then(m => m.Users) },
      { path: 'orders', loadComponent: () => import('../pages/admin/admin-orders/admin-orders').then(m => m.AdminOrders) },
      { path: 'products', loadComponent: () => import('../pages/admin/admin-products/admin-products').then(m => m.AdminProducts) },
      { path: 'promo-codes', loadComponent: () => import('../pages/admin/promo-codes/promo-codes').then(m => m.PromoCodes) }
    ]
  },

  // Fallback route
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
