import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyLogger } from '@src/logger/my-logger.service';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardCategoryType } from './entities/board-category';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
    private readonly loggerService: MyLogger,
  ) {}

  async create(
    createBoardDto: CreateBoardDto,
    session: Record<string, any>,
  ): Promise<boolean> {
    try {
      await this.boardsRepository.save({
        ...createBoardDto,
        user: session.user_id,
      });
      return true;
    } catch (err) {
      this.loggerService.error(err);
      throw new ConflictException('문제가 발생했습니다');
    }
  }

  async findAll(
    category: BoardCategoryType,
    limit: number,
    page: number,
  ): Promise<BoardList[]> {
    const data: BoardList[] = await this.boardsRepository
      .createQueryBuilder('board')
      .innerJoin('board.user', 'user')
      .select(['user.nickname', 'board.id', 'board.title', 'board.content'])
      .where('board.category_id = :category', { category })
      .offset(limit * (page - 1))
      .limit(limit)
      .getMany();
    return data;
  }

  async findOne(id: number): Promise<BoardDetail> {
    const data: BoardDetail = await this.boardsRepository
      .createQueryBuilder('board')
      .innerJoin('board.user', 'user')
      .select([
        'user.nickname',
        'board.id',
        'board.title',
        'board.content',
        'board.createdAt',
      ])
      .where('board.id = :id', { id })
      .getOne();
    return data;
  }

  async update(
    id: number,
    session: Record<string, any>,
    updateBoardDto: UpdateBoardDto,
  ) {
    try {
      await this.boardsRepository
        .createQueryBuilder()
        .update(Board)
        .set({ ...updateBoardDto })
        .where('id = :id', { id })
        .andWhere('user = :user', { user: session.user_id })
        .execute();
      return true;
    } catch (err) {
      this.loggerService.error(err);
      throw new ConflictException('문제가 발생했습니다');
    }
  }

  async remove(id: number, session: Record<string, any>) {
    try {
      await this.boardsRepository.delete({ id, user: session.user_id });
      return true;
    } catch (err) {
      console.log(err);
      throw new ConflictException('문제가 발생했습니다');
    }
  }
}
