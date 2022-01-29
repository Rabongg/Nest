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

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    try {
      createUserDto.password = await Hash.encrypt(createUserDto.password);
      await this.usersRepository.save(createUserDto);
      return true;
    } catch (err) {
      this.loggerService.error(err);
      throw new ConflictException('문제가 발생했습니다');
    }
  }

  async login(
    userDto: UserDto,
    session: Record<string, any>,
  ): Promise<boolean> {
    try {
      const { username, password } = userDto;
      const user: User = await this.usersRepository
        .createQueryBuilder('user')
        .select(['user.password', 'user.username', 'user.id'])
        .where('user.username = :username ', { username })
        .getOne();

      if (user?.password) {
        if (await Hash.validate(user.password, password)) {
          session.user_id = user.id;
          return true;
        }
      }
      throw new UnauthorizedException('ID와 비밀번호를 확인하세요');
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('ID와 비밀번호를 확인하세요');
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
