import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRepository } from '../modules/user/repositories/user.repository';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private userRepository: UserRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
        ]);
        if (!requiredRoles) return true; // No roles required, allow access

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.userId) return false;

        const dbUser = await this.userRepository.findOne(user.userId);
        if (!dbUser) return false;

        return requiredRoles.some((role) => dbUser.role === role);
    }
}