import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { BasicStrategy } from './basic.strategy';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    forwardRef(() => BookModule),
    PassportModule,
    JwtModule.register({
      secret: <string>process.env.JWT_SECRET,
      signOptions: { expiresIn: `60s` },
    }),
  ],
  providers: [AuthService, BasicStrategy],
  exports: [AuthService],
})
export class AuthModule {}
