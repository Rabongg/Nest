import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
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
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('BoardsController', () => {
  let controller1: BoardsController;
  let controller2: BoardsController;
  let boardRepository: MockRepository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [
        BoardsService,
        {
          provide: getRepositoryToken(Board),
          useValue: MockBoardRepository(),
        },
      ],
    }).compile();

    controller1 = module.get<BoardsController>(BoardsController);
    controller2 = module.get<BoardsController>(BoardsController);
    boardRepository = module.get<MockRepository<Board>>(
      getRepositoryToken(Board),
    );
  });

  it('should be same', () => {
    expect(controller1).toEqual(controller2);
  });

  it('should create a new board', async () => {
    expect(controller1).toEqual(controller2);
  });
});
