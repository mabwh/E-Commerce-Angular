export interface CreatePromoCodeDto {
  code: string;
  discountPercentage: number;
  expiryDate: string;
  maxUsage: number;
}
