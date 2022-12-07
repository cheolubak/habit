import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
