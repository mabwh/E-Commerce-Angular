export interface ReviewDto {
  id: number;
  userName: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
}
