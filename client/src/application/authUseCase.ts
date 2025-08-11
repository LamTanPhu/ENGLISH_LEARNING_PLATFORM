import type { User } from '../domain/models';

export class AuthUseCase {
    constructor(private api: any, private storage: any) {}

    async login(email: string, password: string): Promise<User> {
        const response = await this.api.auth.login(email, password);
        const token = response.data.token;
        this.storage.setToken(token);
        const payload = JSON.parse(atob(token.split('.')[1]));
        return { userId: payload.userId, email: payload.email, role: payload.role, username: payload.username || '', level: 'beginner', points: 0 };
    }

    async register(email: string, password: string, username: string): Promise<User> {
        const response = await this.api.auth.register(email, password, username);
        const token = response.data.token;
        this.storage.setToken(token);
        const payload = JSON.parse(atob(token.split('.')[1]));
        return { userId: payload.userId, email: payload.email, role: payload.role, username, level: 'beginner', points: 0 };
    }

    logout(): void {
        this.storage.removeToken();
    }

    getCurrentUser(): User | null {
        const token = this.storage.getToken();
        if (!token) return null;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return { userId: payload.userId, email: payload.email, role: payload.role, username: payload.username || '', level: 'beginner', points: 0 };
    }
}

export const authUseCase = new AuthUseCase(null, null);