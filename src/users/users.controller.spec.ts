import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MyLogger } from '@src/logger/my-logger.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { Hash } from '@src/utils/hash';

const MockUserRepository = () => ({
  createQueryBuilder: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockReturnThis(),
  }),
  save: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
console.log(process.env.NODE_ENV);
describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let usersRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        MyLogger,
        { provide: getRepositoryToken(User), useValue: MockUserRepository() },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<MockRepository<User>>(
      getRepositoryToken(User),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when create is called', () => {
    const createUserDto = {
      username: 'username',
      password: 'password',
      name: 'name',
      email: 'email',
      nickname: 'nickname',
    };
    beforeEach(async () => {
      await service.create(createUserDto);
    });

    it('should call save', async () => {
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return true if create is succeed', async () => {
      const result = await service.create(createUserDto);
      expect(result).toBe(true);
    });
  });

  describe('when login is called', () => {
    const UserDto = {
      username: 'username',
      password: 'password',
    };
    const session = {};

    it('should call error if user is not found', async () => {
      jest
        .spyOn(usersRepository.createQueryBuilder(), 'getOne')
        .mockResolvedValue(null);
      try {
        await service.login(UserDto, session);
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
        expect(err.message).toBe('ID와 비밀번호를 확인하세요');
      }
    });

    it('should call error if password is different', async () => {
      jest
        .spyOn(usersRepository.createQueryBuilder(), 'getOne')
        .mockResolvedValue({
          id: 'id',
          username: 'username',
          password: await Hash.encrypt('password123'),
        });
      try {
        await service.login(UserDto, session);
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
        expect(err.message).toBe('ID와 비밀번호를 확인하세요');
      }
    });

    describe('when login is succeed', () => {
      beforeEach(async () => {
        jest
          .spyOn(usersRepository.createQueryBuilder(), 'getOne')
          .mockResolvedValue({
            id: 'id',
            username: 'username',
            password: await Hash.encrypt('password'),
          });
      });
      it('should call createQueryBuilder(select, where, getOne)', async () => {
        await service.login(UserDto, session);
        expect(
          usersRepository.createQueryBuilder().select,
        ).toHaveBeenCalledTimes(1);
        expect(
          usersRepository.createQueryBuilder().where,
        ).toHaveBeenCalledTimes(1);
        expect(
          usersRepository.createQueryBuilder().getOne,
        ).toHaveBeenCalledTimes(1);
        expect(usersRepository.createQueryBuilder).toHaveBeenCalledTimes(5);
      });

      it('should return true', async () => {
        const result = await service.login(UserDto, session);
        expect(result).toBe(true);
      });
    });
  });
});
