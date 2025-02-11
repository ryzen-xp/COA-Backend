import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/services/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(id: number, pass: string): Promise<any> {
        const user = await this.userService.findUserById(id); 
        if (user && user.password === pass) { 
            const { password, ...result } = user; 
            return result;
        }
        throw new UnauthorizedException('Invalid credentials'); 
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id }; 
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}