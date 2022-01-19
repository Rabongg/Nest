import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MyLogger } from '@src/logger/my-logger.service';
import { Repository } from 'typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardCategoryType } from './entities/board-category';
import { Board } from './entities/board.entity';

const MockBoardRepository = () => ({
  createQueryBuilder: jest.fn().mockReturnValue({
    innerJoin: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
  }),
  save: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('BoardsController', () => {
  let controller: BoardsController;

  let service1: BoardsService;
  let service2: BoardsService;
  let service3: Promise<BoardsService>;
  let service4: Promise<BoardsService>;
  let boardRepository: MockRepository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [
        BoardsService,
        MyLogger,
        {
          provide: getRepositoryToken(Board),
          useValue: MockBoardRepository(),
        },
      ],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
    service1 = module.get<BoardsService>(BoardsService);
    service2 = module.get<BoardsService>(BoardsService);
    service3 = module.resolve<BoardsService>(BoardsService);
    service4 = module.resolve<BoardsService>(BoardsService);
    boardRepository = module.get<MockRepository<Board>>(
      getRepositoryToken(Board),
    );
  });

  it('should be same', () => {
    // get return same instances
    expect(service1).toEqual(service2);
    expect(service1).toBe(service2);

    // resolve return unique instances so toBe and toEqual are different
    expect(service3).toEqual(service4);
    expect(service3).toStrictEqual(service4);
    expect(service3).not.toBe(service4);
  });

  describe('findAll', () => {
    beforeEach(async () => {
      await service1.findAll(BoardCategoryType.공지사항, 1, 1);
    });

    it('should call createQueryBuilder and innerjoin', async () => {
      expect(boardRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(
        boardRepository.createQueryBuilder().innerJoin,
      ).toHaveBeenCalledTimes(1);
      expect(boardRepository.createQueryBuilder().select).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should return an array of boards', async () => {
      expect(boardRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
      jest
        .spyOn(boardRepository.createQueryBuilder(), 'getMany')
        .mockResolvedValue([]);
      expect(boardRepository.createQueryBuilder).toHaveBeenCalledTimes(2);
      const result = await service1.findAll(BoardCategoryType.공지사항, 1, 1);
      expect(boardRepository.createQueryBuilder).toHaveBeenCalledTimes(3);
      expect(boardRepository.createQueryBuilder().getMany).toHaveBeenCalled();
      expect(boardRepository.createQueryBuilder).toHaveBeenCalledTimes(4);
      expect(
        boardRepository.createQueryBuilder().getMany,
      ).toHaveBeenCalledTimes(2);
      expect(boardRepository.createQueryBuilder).toHaveBeenCalledTimes(5);
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    beforeEach(async () => {
      await service1.findOne(1);
    });
    it('should call createQueryBuilder and innerjoin', async () => {
      expect(boardRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(
        boardRepository.createQueryBuilder().innerJoin,
      ).toHaveBeenCalledTimes(1);
      expect(boardRepository.createQueryBuilder().select).toHaveBeenCalledTimes(
        1,
      );
    });
    it('should return', async () => {
      jest
        .spyOn(boardRepository.createQueryBuilder(), 'getOne')
        .mockResolvedValue({});
      const result = await service1.findOne(1);
      expect(boardRepository.createQueryBuilder().getOne).toHaveBeenCalled();
      expect(boardRepository.createQueryBuilder().getOne).toHaveBeenCalledTimes(
        2,
      );
      expect(result).toEqual({});
    });
  });

  describe('create', () => {
    const createBoardDto = {
      title: 'title',
      content: 'content',
      categoryId: 1,
    };
    const session = {
      user_id: 'heesoo',
    };
    it('should call createQueryBuilder', async () => {
      await service1.create(createBoardDto, session);
      expect(boardRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return true', async () => {
      const result = await service1.create(createBoardDto, session);
      expect(result).toBe(true);
    });
  });
});
