import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyLogger } from '@src/logger/my-logger.service';
import { Hash } from '@src/utils/hash';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly loggerService: MyLogger,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.save(createUserDto);
      return user;
    } catch (err) {
      this.loggerService.error(err);
      throw new ConflictException('문제가 발생했습니다');
    }
  }

  findMyInfo(session) {
    return session;
  }

  async findOne(user: UserDto): Promise<User | undefined> {
    return await this.usersRepository.findOne(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
