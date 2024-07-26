import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(user: UserDto) {
    const registeredUser = await this.findByUserName(user.username);

    if (registeredUser) {
      throw new ConflictException(`User ${user.username} already exists`);
    }

    const newUser = new UserEntity();
    newUser.username = user.username;
    newUser.password = bcryptHashSync(user.password, 10);

    const {id, username} = await this.userRepository.save(newUser);

    return { id, username };
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({
      where: { username }
    })

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      password: user.password
    }
  }
}
