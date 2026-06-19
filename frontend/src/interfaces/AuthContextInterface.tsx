import type UserInterface from "./UserInterface";

// -----------------------------------------
// Interface de Contexto de Autenticação
// -----------------------------------------
export interface AuthContextInterface {
  user: UserInterface | null;
  loading: boolean;
  isLogged: boolean;
  login: (userData: UserInterface, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}