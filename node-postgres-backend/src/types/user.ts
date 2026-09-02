export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  is_verified: boolean;
  created_at: Date;
}

export type UserRole = "user" | "admin" | "manager";
