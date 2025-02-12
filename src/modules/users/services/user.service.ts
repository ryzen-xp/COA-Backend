import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async createUser(dto: CreateUserDto): Promise<User> {
        // Check if a user with the same email or username already exists (optional)
        const userExists = await this.userRepository.findByEmail(dto.email);
        if (userExists) {
            throw new BadRequestException('The email is already in use.');
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const userData = { ...dto, password: hashedPassword, balance: 0 };

        return this.userRepository.createUser(userData);
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }
        return this.userRepository.updateUser(id, dto);
    }

    async deleteUser(id: number): Promise<void> {
        return this.userRepository.deleteUser(id);
    }

    async authenticateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new BadRequestException('Invalid credentials');
        }
        return user;
    }
}
