export interface CreateCategoryDto {
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  parentCategoryId?: number | null;
}
