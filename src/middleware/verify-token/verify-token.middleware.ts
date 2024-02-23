import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers.authtoken as string;
    const verified = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_KEY,
    });
    res.locals.user = verified.user;
    next();
  }
}
