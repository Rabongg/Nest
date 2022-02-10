import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ChatsService } from './chat.service';
import { FindRoomQueryDto } from './dto/find-room-query.dto';

@Controller('/chat')
@ApiTags('chat API')
export class ChatController {
  constructor(private readonly chatService: ChatsService) {}

  @ApiOperation({
    summary: '내 채팅방 조회',
    description: '내 채팅방 전체 조회',
  })
  @Get('/rooms/:username')
  getMyChatList(@Param('username') username: string) {
    return this.chatService.getMyChatList(username);
  }

  @ApiOperation({
    summary: '채팅방 검색',
    description: '채팅방 검색',
  })
  @Get(':room')
  findRoom(@Param('room') room: string, @Query() query: FindRoomQueryDto) {
    const { limit, page } = query;
    return this.chatService.findRoom(room, limit, page);
  }

  // @ApiOperation({
  //   summay: '메세지 조회',
  //   description: '메세지 조회',
  // })
  // @Get('/messages')
  // getMessageList(@Query() ) {

  // }
}
