export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  password: string;
}
