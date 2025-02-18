import { Role } from "src/users/role.enum";

export interface JwtPayload {
    username: string;
    sub: number; // ID del usuario
    role: Role
  }
  