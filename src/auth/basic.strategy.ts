import { BasicStrategy as Strategy } from 'passport-http';

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(BasicStrategy.name);
  constructor() {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    req: any,
    username: string,
    password: string,
  ): Promise<boolean> {
    if (username !== 'admin' && password !== 'brewappsllc')
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return true;
  }
}
