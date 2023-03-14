import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { sendResponse } from 'src/helpers/response.helper';
import { message } from 'src/helpers/response.message';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDto: CreateUserDTO) {
    const data = await this.userService.create(createUserDto);
    return sendResponse({
      status_code: HttpStatus.CREATED,
      data,
      message: message.USER_CREATE_SUCCESS,
    });
  }

  @Auth()
  @Get()
  async findAll(@GetCurrentUser() user: JWTPayload) {
    const data = await this.userService.findAll(user);
    return sendResponse({
      status_code: HttpStatus.OK,
      data,
      message: message.USER_GET_ALL_SUCCESS,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  async update(
    @GetCurrentUser() user: JWTPayload,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    const data = await this.userService.update(user, id, updateUserDto);
    return sendResponse({
      status_code: HttpStatus.OK,
      data,
      message: message.USER_UPDATE_SUCCESS,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
