import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { sendResponse } from 'src/helpers/response.helper';
import { message } from 'src/helpers/response.message';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return sendResponse({
      status_code: HttpStatus.OK,
      data: categories,
      message: message.CATEGORY_GET_ALL_SUCCESS,
    });
  }

  @Auth()
  @Post()
  async create(
    @GetCurrentUser() user: JWTPayload,
    @Body() createCategoryDTO: CreateCategoryDTO,
  ) {
    const category = await this.categoryService.create(user, createCategoryDTO);
    return sendResponse({
      status_code: HttpStatus.CREATED,
      data: category,
      message: message.CATEGORY_CREATE_SUCCESS,
    });
  }

  @Auth()
  @Patch(':id')
  async update(
    @GetCurrentUser() user: JWTPayload,
    @Param('id') id: string,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
  ) {
    const category = await this.categoryService.update(
      user,
      id,
      updateCategoryDTO,
    );
    return sendResponse({
      status_code: HttpStatus.OK,
      data: category,
      message: message.CATEGORY_UPDATE_SUCCESS,
    });
  }

  @Auth()
  @Delete(':id')
  async remove(@GetCurrentUser() user: JWTPayload, @Param('id') id: string) {
    await this.categoryService.remove(user, id);
    return sendResponse({
      status_code: HttpStatus.OK,
      message: message.CATEGORY_DELETE_SUCCESS,
    });
  }
}
