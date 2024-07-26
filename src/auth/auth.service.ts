import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { AuthResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  private jwtExpirationTime: number;

  constructor(
    private readonly userService: UsersService, 
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtExpirationTime = +this.configService.get<number>('JWT_EXPIRATION_TIME');
  }

  async signIn(username: string, password: string): Promise<AuthResponseDto> {
    const user = await this.userService.findByUserName(username);

    if (!user || !bcryptCompareSync(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username};

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTime };
  }
}
