import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

export enum BoardCategoryType {
  공지사항 = '공지사항',
  프로젝트게시판 = '프로젝트게시판',
}

@Entity()
export class BoardCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: BoardCategoryType,
    unique: true,
    nullable: false,
  })
  name: BoardCategoryType;

  @OneToMany(() => Board, (board) => board.categoryId)
  boards: Board[];
}
