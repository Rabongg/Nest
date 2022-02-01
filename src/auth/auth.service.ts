import { Injectable, Request } from '@nestjs/common';
import { UsersService } from '@src/users/users.service';
import { Hash } from '@src/utils/hash';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password) {
      if (await Hash.validate(user.password, password)) {
        return user;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, nickname: user.nicame };
    return true;
  }

  async kakaoLogin(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
