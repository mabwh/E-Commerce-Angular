export interface PromoCodeDto {
  id: number;
  code: string;
  discountPercentage: number;
  expiryDate: string;
  maxUsage: number;
  currentUsage: number;
  isActive: boolean;
  isValid: boolean;
}
