import { OrderItemDto } from './order-item-dto';

export interface OrderDto {
  id: number;
  userId: string;
  orderDate: string;
  subTotal: number;
  discountAmount: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string | null;
  items: OrderItemDto[];
}
