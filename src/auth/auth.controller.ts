import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDTO } from './dto/signup.dto';
import { LoginAuthDTO } from './dto/login.dto';
import { JWTAuthGuard } from 'src/common/guards/auth.guard';
import { sendResponse } from 'src/helpers/response.helper';
import { message } from 'src/helpers/response.message';
import { Auth } from 'src/common/decorators/auth.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpAuthDTO: SignUpAuthDTO) {
    const data = await this.authService.signUp(signUpAuthDTO);
    return sendResponse({
      status_code: HttpStatus.CREATED,
      data: data,
      message: message.AUTH_SIGNUP_SUCCESS,
    });
  }

  @Post('/signin')
  @HttpCode(HttpStatus.FOUND)
  async login(@Body() loginAuthDTO: LoginAuthDTO) {
    const data = await this.authService.login(loginAuthDTO);
    return sendResponse({
      status_code: HttpStatus.FOUND,
      data,
      message: message.AUTH_LOGIN_SUCCESS,
    });
  }

  @Post('/signout')
  @Auth()
  async logout(@GetCurrentUser() user: JWTPayload) {
    return sendResponse({
      status_code: HttpStatus.OK,
      data: 'Logout success',
      message: message.AUTH_LOGOUT_SUCCESS,
    });
  }

  @Auth()
  @Get('/protected')
  protected(@GetCurrentUser() user: JWTPayload) {
    return { jwt: user, string: 'This is a protected route for test' };
  }
}
