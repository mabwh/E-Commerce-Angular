export interface CreateProductDto {
  name: string;
  description?: string | null;
  price: number;
  stockQuantity: number;
  categoryId: number;
  sellerId: string;
  isActive: boolean;
}
