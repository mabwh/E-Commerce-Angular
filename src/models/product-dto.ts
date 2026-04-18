import { ProductImageDto } from './product-image-dto';

export interface ProductDto {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  stockQuantity: number;
  categoryId: number;
  categoryName?: string | null;
  sellerId: string;
  isActive: boolean;
  createdAt: string;
  images: ProductImageDto[];
}
