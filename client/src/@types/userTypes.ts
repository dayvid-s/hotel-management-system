export type roles = "admin" | "receptionist" | "guest"

export interface UserType {
  id: number;
  name: string;
  email: string;
  cpf?: string;
  password: string;
  role: roles;
  createdAt: Date;
  updatedAt: Date;
  roomId?: number;
}