export interface CartItemDto {
  id: number;
  productId: number;
  productName: string;
  productImageUrl?: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}
