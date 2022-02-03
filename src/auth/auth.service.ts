import { Injectable, Request } from '@nestjs/common';
import { UsersService } from '@src/users/users.service';
import { UserDto } from '@src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(userDto: UserDto): Promise<any> {
    const user = await this.usersService.findOne(userDto);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, nickname: user.nicame };
    return true;
  }

  async kakaoLogin(@Request() req) {
    req.session.token = req.user.accessToken;
    req.session.provider = 'kakao';
    return true;
  }

  async googleLogin(@Request() req) {
    req.session.token = req.user.accessToken;
    req.session.provider = 'google';
    return true;
  }

  async naverLogin(@Request() req) {
    req.session.token = req.user.accessToken;
    req.session.provider = 'naver';
    return true;
  }
}
