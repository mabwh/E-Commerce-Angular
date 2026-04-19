import { Routes } from '@angular/router';
import { authGuard, roleGuard, guestGuard } from '../guards/index';

// Auth Pages
import { Login } from '../pages/auth/login/login';
import { Register } from '../pages/auth/register/register';
import { ForgotPassword } from '../pages/auth/forgot-password/forgot-password';
import { ResetPassword } from '../pages/auth/reset-password/reset-password';
import { ConfirmEmail } from '../pages/auth/confirm-email/confirm-email';

// Store Pages
import { Home } from '../pages/store/home/home';
import { ProductDetails } from '../pages/store/product-details/product-details';
import { Categories } from '../pages/store/categories/categories';
import { CategoryDetails } from '../pages/store/category-details/category-details';

// Cart Pages
import { CartView } from '../pages/cart/cart-view/cart-view';
import { Checkout } from '../pages/cart/checkout/checkout';
import { OrderConfirmation } from '../pages/cart/order-confirmation/order-confirmation';

// User Pages
import { Profile } from '../pages/user/profile/profile';
import { Orders } from '../pages/user/orders/orders';
import { OrderDetails } from '../pages/user/order-details/order-details';
import { Wishlist } from '../pages/user/wishlist/wishlist';

// Seller Pages
import { Dashboard as SellerDashboard } from '../pages/seller/dashboard/dashboard';
import { ProductForm } from '../pages/seller/product-form/product-form';

// Admin Pages
import { AdminDashboard } from '../pages/admin/admin-dashboard/admin-dashboard';
import { Users as AdminUsers } from '../pages/admin/users/users';
import { AdminOrders } from '../pages/admin/admin-orders/admin-orders';
import { AdminProducts } from '../pages/admin/admin-products/admin-products';

export const routes: Routes = [
    // 1. Authentication Workflow
    {
        path: 'auth',
        canActivate: [guestGuard],
        children: [
            { path: 'login', component: Login },
            { path: 'register', component: Register },
            { path: 'forgot-password', component: ForgotPassword },
            { path: 'reset-password', component: ResetPassword },
            { path: 'confirm-email', component: ConfirmEmail }
        ]
    },

    // 2. Product Browsing Flow & 3. Category Flow
    { path: '', component: Home },
    { path: 'products/:id', component: ProductDetails },
    { path: 'categories', component: Categories },
    { path: 'categories/:id', component: CategoryDetails },

    // 4. Cart Flow
    { path: 'cart', component: CartView },
    { path: 'checkout', canActivate: [authGuard], component: Checkout },
    { path: 'cart/order-confirmation', canActivate: [authGuard], component: OrderConfirmation },

    // 5. Order Flow, 6. Wishlist Flow, 8. User Profile Flow
    {
        path: 'user',
        canActivate: [authGuard],
        children: [
            { path: 'profile', component: Profile },
            { path: 'orders', component: Orders },
            { path: 'orders/:id', component: OrderDetails },
            { path: 'wishlist', component: Wishlist }
        ]
    },

    // 9. Seller Workflow
    {
        path: 'seller',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['Seller'] },
        children: [
            { path: 'dashboard', component: SellerDashboard },
            { path: 'product/new', component: ProductForm },
            { path: 'product/:id/edit', component: ProductForm }
        ]
    },

    // 10. Admin Workflow
    {
        path: 'admin',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['Admin'] },
        children: [
            { path: 'dashboard', component: AdminDashboard },
            { path: 'users', component: AdminUsers },
            { path: 'orders', component: AdminOrders },
            { path: 'products', component: AdminProducts }
        ]
    },

    // Wildcard route - must be last
    { path: '**', redirectTo: '' }
];
