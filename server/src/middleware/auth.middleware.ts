import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: any, res: any, next: () => void) {
    const { token } = req.headers;
    const user = await this.authService.validator(token);
    req.user = user;
    next();
  }
}
