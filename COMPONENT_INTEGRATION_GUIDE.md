# E-Commerce Angular Project - Component Integration Guide

## Quick Reference Guide for All Components

---

## 🔐 GUARDS USAGE

### AuthGuard
**Purpose**: Protect routes that require authentication

**Usage in Routes**:
```typescript
{
  path: 'user',
  canActivate: [authGuard],
  children: [...]
}
```

**How it works**:
- Checks if 'token' exists in localStorage
- Redirects to `/auth/login` if token missing
- Passes a `returnUrl` query parameter for post-login redirect

---

### RoleGuard
**Purpose**: Verify user has required role(s)

**Usage in Routes**:
```typescript
{
  path: 'admin',
  canActivate: [authGuard, roleGuard],
  data: { roles: ['Admin'] },
  children: [...]
}
```

**How it works**:
- Checks 'roles' array in localStorage (populated after login)
- Validates user role matches route requirements
- Supports multiple roles: `{ roles: ['Admin', 'Seller'] }`

---

### GuestGuard
**Purpose**: Prevent authenticated users from accessing auth pages

**Usage in Routes**:
```typescript
{
  path: 'auth',
  canActivate: [guestGuard],
  children: [...]
}
```

---

## 📄 PAGE COMPONENT USAGE

### Home Page
**Path**: `/`
**Selector**: `<app-home></app-home>`
**Features**:
- Displays paginated product list (12 items per page)
- Product cards with image, name, price
- Pagination controls (Next/Previous)

**Key Methods**:
```typescript
loadProducts() {
  this.productsService.getProducts({
    pageNumber: this.currentPage,
    pageSize: 12
  }).subscribe(...);
}
```

**Used Components**:
- ProductCard (for each product)
- LoadingSpinner (while loading)

---

### Product Details Page
**Path**: `/products/:id`
**Selector**: `<app-product-details></app-product-details>`
**Features**:
- Product image, details, price, stock status
- Add to cart with quantity selector
- Reviews display and review submission form
- Star rating for reviews

**Integration Example**:
```typescript
// In component.ts
ngOnInit() {
  this.route.params.subscribe(params => {
    const productId = +params['id'];
    this.loadProduct(productId);
  });
}

addToCart() {
  const addToCartDto: AddToCartDto = {
    productId: this.product.id,
    quantity: this.quantity
  };
  this.cartService.addToCart(addToCartDto).subscribe(...);
}

submitReview() {
  const reviewDto: CreateReviewDto = {
    productId: this.product.id,
    rating: this.reviewForm.value.rating,
    comment: this.reviewForm.value.comment
  };
  this.reviewsService.createReview(reviewDto).subscribe(...);
}
```

---

### Categories Page
**Path**: `/categories`
**Selector**: `<app-categories></app-categories>`
**Features**:
- List all categories
- Category cards with names
- Click to view category products

---

### Category Details Page
**Path**: `/categories/:id`
**Selector**: `<app-category-details></app-category-details>`
**Features**:
- Display category name and description
- Show products in category (paginated)
- Product filtering by price range

---

### Shopping Cart Page
**Path**: `/cart`
**Selector**: `<app-cart-view></app-cart-view>`
**Features**:
- List all cart items in table format
- Edit item quantities
- Remove items from cart
- Clear entire cart
- Display order summary

**Integration**:
```typescript
ngOnInit() {
  this.loadCart();
}

loadCart() {
  this.cartService.getCart().subscribe(cart => {
    this.cartItems = cart.items;
    this.cartTotal = cart.total;
  });
}

updateQuantity(itemId: number, newQuantity: number) {
  this.cartService.updateCartItem(itemId, { quantity: newQuantity })
    .subscribe(() => this.loadCart());
}

removeItem(itemId: number) {
  this.cartService.removeCartItem(itemId)
    .subscribe(() => this.loadCart());
}
```

**Used Components**:
- CartSummary (displays totals)

---

### Checkout Page
**Path**: `/checkout`
**Selector**: `<app-checkout></app-checkout>`
**Features**:
- Checkout form with shipping/payment info
- Order summary
- Place order functionality

**Layout**:
```html
<div class="checkout-container">
  <div class="checkout-form">
    <app-checkout-form (submit)="onSubmit($event)"></app-checkout-form>
  </div>
  <div class="order-summary">
    <app-cart-summary 
      [subtotal]="cart.subtotal"
      [discount]="cart.discount"
      [total]="cart.total">
    </app-cart-summary>
  </div>
</div>
```

**Used Components**:
- CheckoutForm
- CartSummary

---

### Order Confirmation Page
**Path**: `/cart/order-confirmation`
**Selector**: `<app-order-confirmation></app-order-confirmation>`
**Features**:
- Success message
- Order details
- Navigation buttons (Continue Shopping, View Orders)

---

### Profile Page
**Path**: `/user/profile`
**Selector**: `<app-profile></app-profile>`
**Features**:
- Display user profile information
- Edit profile form
- Save changes
- Delete account option

**Integration**:
```typescript
ngOnInit() {
  this.usersService.getProfile().subscribe(profile => {
    this.profileForm.patchValue(profile);
  });
}

saveProfile() {
  this.usersService.updateProfile(this.profileForm.value)
    .subscribe(() => {
      // Show success message
    });
}

deleteAccount() {
  if (confirm('Are you sure?')) {
    this.usersService.deleteMe().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
```

---

### Orders Page
**Path**: `/user/orders`
**Selector**: `<app-orders></app-orders>`
**Features**:
- List user's orders
- Order ID, date, status, total
- Click to view order details
- Pagination support

---

### Order Details Page
**Path**: `/user/orders/:id`
**Selector**: `<app-order-details></app-order-details>`
**Features**:
- Display complete order information
- Order status, date, address
- Line items table
- Total calculation

---

### Wishlist Page
**Path**: `/user/wishlist`
**Selector**: `<app-wishlist></app-wishlist>`
**Features**:
- Display wishlist items
- Remove from wishlist
- View product details
- Add to cart from wishlist

**Integration**:
```typescript
ngOnInit() {
  this.loadWishlist();
}

loadWishlist() {
  this.wishlistService.getWishlist().subscribe(wishlist => {
    this.items = wishlist.items;
  });
}

removeFromWishlist(productId: number) {
  this.wishlistService.removeFromWishlist(productId)
    .subscribe(() => this.loadWishlist());
}

addToCart(product: ProductDto) {
  this.cartService.addToCart({
    productId: product.id,
    quantity: 1
  }).subscribe(() => {
    this.router.navigate(['/cart']);
  });
}
```

---

### Seller Dashboard Page
**Path**: `/seller/dashboard`
**Selector**: `<app-dashboard></app-dashboard>`
**Features**:
- Table of seller's products
- Edit/Delete product buttons
- Create new product button
- Stock information

**Integration**:
```typescript
ngOnInit() {
  this.loadProducts();
}

loadProducts() {
  this.sellerProductsService.getProducts()
    .subscribe(products => {
      this.products = products;
    });
}

deleteProduct(productId: number) {
  if (confirm('Are you sure?')) {
    this.sellerProductsService.deleteProduct(productId)
      .subscribe(() => this.loadProducts());
  }
}

editProduct(productId: number) {
  this.router.navigate(['/seller/product', productId, 'edit']);
}

createProduct() {
  this.router.navigate(['/seller/product/new']);
}
```

---

### Product Form Page
**Path**: `/seller/product/new` or `/seller/product/:id/edit`
**Selector**: `<app-product-form></app-product-form>`
**Features**:
- Create new product form
- Edit existing product form
- Product details (name, description, price, stock, category, image)
- Form validation

**Integration**:
```typescript
ngOnInit() {
  this.route.params.subscribe(params => {
    if (params['id']) {
      this.isEditMode = true;
      this.loadProduct(params['id']);
    }
  });
}

onSubmit() {
  if (this.productForm.valid) {
    const productData = this.productForm.value;
    if (this.isEditMode) {
      this.sellerProductsService.updateProduct(this.productId, productData)
        .subscribe(() => this.router.navigate(['/seller/dashboard']));
    } else {
      this.sellerProductsService.createProduct(productData)
        .subscribe(() => this.router.navigate(['/seller/dashboard']));
    }
  }
}
```

---

### Admin Dashboard Page
**Path**: `/admin/dashboard`
**Selector**: `<app-admin-dashboard></app-admin-dashboard>`
**Features**:
- Dashboard cards for navigation
- Link to users management
- Link to orders management
- Link to products management

---

### Admin Users Page
**Path**: `/admin/users`
**Selector**: `<app-users></app-users>`
**Features**:
- Table of all system users
- Deactivate user functionality
- User email, first name, last name

**Integration**:
```typescript
ngOnInit() {
  this.loadUsers();
}

loadUsers() {
  this.adminUsersService.getAll().subscribe(users => {
    this.users = users;
  });
}

deactivateUser(userId: number) {
  if (confirm('Deactivate this user?')) {
    this.adminUsersService.deactivateUser(userId)
      .subscribe(() => this.loadUsers());
  }
}
```

---

### Admin Orders Page
**Path**: `/admin/orders`
**Selector**: `<app-admin-orders></app-admin-orders>`
**Features**:
- Table of all orders
- Order ID, customer, total, status
- Update order status dropdown

**Integration**:
```typescript
ngOnInit() {
  this.loadOrders();
}

loadOrders() {
  this.adminOrdersService.getAll().subscribe(orders => {
    this.orders = orders;
  });
}

updateOrderStatus(orderId: number, newStatus: string) {
  this.adminOrdersService.updateOrderStatus(orderId, newStatus)
    .subscribe(() => this.loadOrders());
}
```

---

### Admin Products Page
**Path**: `/admin/products`
**Selector**: `<app-admin-products></app-admin-products>`
**Features**:
- Product management interface
- View/edit/delete products
- Stock management

---

## 🎨 SHARED COMPONENTS USAGE

### Header Component
**Selector**: `<app-header></app-header>`
**Features**:
- Navigation bar
- Home, Categories, Cart links
- User dropdown menu (Login/Profile/Orders/Logout)
- Admin/Seller links (conditional based on role)

**Automatically displays based on:**
- localStorage 'token' → Login status
- localStorage 'roles' → Admin/Seller links

---

### Footer Component
**Selector**: `<app-footer></app-footer>`
**Features**:
- Company information
- Links section
- Support/Contact info
- Copyright with current year

---

### Product Card Component
**Selector**: `<app-product-card></app-product-card>`
**Input**: `@Input() product: ProductDto`

**Usage**:
```html
<app-product-card 
  *ngFor="let product of products"
  [product]="product">
</app-product-card>
```

**Features**:
- Product image, name, price
- Stock status with color coding
- View Details button
- Add to Cart button
- Hover animations

---

### Rating Component
**Selector**: `<app-rating></app-rating>`
**Input**: `@Input() rating: number = 0`

**Usage**:
```html
<app-rating [rating]="3.5"></app-rating>
```

**Features**:
- Display stars (1-5)
- Half-star support (3.5 stars)
- Hover animations
- Read-only display

---

### Loading Spinner Component
**Selector**: `<app-loading-spinner></app-loading-spinner>`

**Usage**:
```html
<app-loading-spinner *ngIf="isLoading"></app-loading-spinner>
<div *ngIf="!isLoading">Content here</div>
```

**Features**:
- Centered spinner
- Material Design
- Simple overlay

---

### Search Bar Component
**Selector**: `<app-search-bar></app-search-bar>`
**Output**: `@Output() search = new EventEmitter<string>()`

**Usage**:
```html
<app-search-bar (search)="onSearch($event)"></app-search-bar>
```

**Features**:
- Search input field
- Search button
- Clear button
- Enter key support

---

### Category Filter Component
**Selector**: `<app-category-filter></app-category-filter>`
**Outputs**:
- `@Output() categorySelected = new EventEmitter<number>()`
- `@Output() priceRangeChanged = new EventEmitter<{min, max}>()`

**Usage**:
```html
<app-category-filter 
  (categorySelected)="onCategoryChange($event)"
  (priceRangeChanged)="onPriceChange($event)">
</app-category-filter>
```

**Features**:
- Category dropdown
- Price range inputs
- Reset filters button

---

### Cart Summary Component
**Selector**: `<app-cart-summary></app-cart-summary>`
**Inputs**:
- `@Input() subtotal: number = 0`
- `@Input() discount: number = 0`
- `@Input() total: number = 0`
- `@Input() itemCount: number = 0`

**Usage**:
```html
<app-cart-summary 
  [subtotal]="500"
  [discount]="50"
  [total]="480"
  [itemCount]="3">
</app-cart-summary>
```

**Features**:
- Display subtotal
- Display discount
- Calculate and show tax (10%)
- Display final total
- Item count

---

### Checkout Form Component
**Selector**: `<app-checkout-form></app-checkout-form>`

**Usage**:
```html
<app-checkout-form 
  (ngSubmit)="onSubmit($event)">
</app-checkout-form>
```

**Form Fields**:
- Full Name
- Email
- Phone Number
- Address
- City, State, Postal Code, Country
- Payment Method (Credit Card, Debit Card, PayPal, Bank Transfer)

---

## 🔄 SERVICE INTEGRATION PATTERNS

### Pattern 1: Load Data on Init
```typescript
ngOnInit() {
  this.service.getData().subscribe({
    next: (data) => {
      this.data = data;
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error loading data');
      this.error = error;
    }
  });
}
```

### Pattern 2: Form Submission
```typescript
onSubmit(formValue: any) {
  if (this.form.valid) {
    this.service.submitData(formValue).subscribe({
      next: () => {
        this.showSuccess('Success!');
        this.router.navigate(['/success-page']);
      },
      error: (err) => {
        this.showError('Error occurred');
      }
    });
  }
}
```

### Pattern 3: Route Parameters
```typescript
ngOnInit() {
  this.route.params.subscribe(params => {
    const id = +params['id'];
    this.service.getById(id).subscribe(data => {
      this.data = data;
    });
  });
}
```

---

## ✅ Implementation Checklist

- [x] All pages created and configured
- [x] All shared components created
- [x] Guards implemented and configured
- [x] Routes configured with lazy loading support
- [x] Header and Footer integration
- [x] Material Design imports
- [x] Form validation setup
- [x] Service integration patterns documented
- [x] Role-based access control
- [x] Responsive design considerations

---

## 🚀 Ready to Use!

All components are ready to integrate with services. Follow the patterns above and import required services into each page component. The project follows Angular 21 best practices with standalone components and Signals for state management.
