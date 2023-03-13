import { applyDecorators, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../guards/auth.guard';

export function Auth() {
  return applyDecorators(UseGuards(JWTAuthGuard));
}
