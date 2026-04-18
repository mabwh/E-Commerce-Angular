export interface UpdateProductDto {
  name: string;
  description?: string | null;
  price: number;
  stockQuantity: number;
  categoryId: number;
  isActive: boolean;
}
