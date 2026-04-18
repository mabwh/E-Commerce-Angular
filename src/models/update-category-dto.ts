export interface UpdateCategoryDto {
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  parentCategoryId?: number | null;
}
