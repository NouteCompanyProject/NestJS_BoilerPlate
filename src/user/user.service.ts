import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserFields } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async get(id: number) {
        return this.userRepository.findOne({ id });
    }

    async getByEmail(email: string) {
        return await this.userRepository.findOne({ email });
    }

    async create(payload: UserFields) {
        const user = await this.getByEmail(payload.email);

        if(user) {
            throw new NotAcceptableException (
                '이미 사용중인 이메일입니다.',
            );
        }

        return await this.userRepository.save(payload);
    }
}
