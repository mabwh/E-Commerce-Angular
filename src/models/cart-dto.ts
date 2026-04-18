import { CartItemDto } from './cart-item-dto';

export interface CartDto {
  id: number;
  userId?: string | null;
  guestSessionId?: string | null;
  appliedPromoCodeId?: number | null;
  appliedPromoCode?: string | null;
  items: CartItemDto[];
  subTotal: number;
  discountAmount: number;
  total: number;
}
