import { PaymentMethod } from './payment-method';

export interface PlaceOrderDto {
  shippingAddress: string;
  paymentMethod: PaymentMethod;
}
