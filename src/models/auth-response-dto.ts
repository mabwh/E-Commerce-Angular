export interface AuthResponseDto {
  message: string;
  isAuthenticated: boolean;
  token?: string | null;
  expiresOn?: string | null;
  refreshToken?: string | null;
  refreshTokenExpiration?: string | null;
  roles: string[];
}
