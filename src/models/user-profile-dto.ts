export interface UserProfileDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: string | null;
}
