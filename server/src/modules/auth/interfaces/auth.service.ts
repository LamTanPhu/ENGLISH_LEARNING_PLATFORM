export interface AuthService {
  register(registerDto: any): Promise<any>;
  login(loginDto: any): Promise<any>;
}