export interface CategoryDto {
  id: number;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  parentCategoryId?: number | null;
  createdAt: string;
  subCategories: CategoryDto[];
}
