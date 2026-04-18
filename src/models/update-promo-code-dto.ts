import { CreatePromoCodeDto } from './create-promo-code-dto';

export interface UpdatePromoCodeDto extends CreatePromoCodeDto {
  isActive: boolean;
}
