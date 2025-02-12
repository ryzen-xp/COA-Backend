import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) { }

    async createUser(userData: Partial<User>): Promise<User> {
        const user = this.repo.create(userData);
        return this.repo.save(user);
    }

    async findById(id: number): Promise<User> {
        return this.repo.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<User> {
        return this.repo.findOneBy({ email });
    }

    async updateUser(id: number, updateData: Partial<User>): Promise<User> {
        await this.repo.update(id, updateData);
        return this.findById(id);
    }

    async deleteUser(id: number): Promise<void> {
        await this.repo.delete(id);
    }
}
