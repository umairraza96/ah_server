import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants';
import { HashService } from 'src/hash/hash.service';
import { message } from 'src/helpers/response.message';
import { UserService } from 'src/users/users.service';
import { LoginAuthDTO } from './dto/login.dto';
import { SignUpAuthDTO } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpAuthDTO: SignUpAuthDTO) {
    const isAlreadyPresent = await this.userService.findByEmail(
      signUpAuthDTO.email,
    );

    if (isAlreadyPresent)
      throw new NotAcceptableException(message.USER_ALREADY_EXISTS);

    const user = await this.userService.create(signUpAuthDTO);

    const accessToken = await this.jwtService.signAsync(
      { id: user.id, is_admin: user.is_admin },
      {
        secret: jwtConstants.secret,
      },
    );

    return { ...user, access_token: accessToken };
  }

  async login(loginAuthDTO: LoginAuthDTO) {
    const { email, password } = loginAuthDTO;

    const user = await this.userService.findByEmail(email);

    if (!user) throw new NotAcceptableException(message.USER_NOT_FOUND);

    const isPasswordValid = await this.hashService.verifyPassword(
      user.password,
      password,
    );

    if (!isPasswordValid)
      throw new ForbiddenException(message.AUTH_INVALID_CREDENTIALS);

    const accessToken = await this.jwtService.signAsync(
      { id: user.id, is_admin: user.is_admin }, // payload
      {
        secret: jwtConstants.secret,
      },
    );

    return { ...user, access_token: accessToken };
  }
}
