import { Controller, Get, HttpStatus } from '@nestjs/common';
import { sendResponse } from 'src/helpers/response.helper';

@Controller('categories')
export class CategoryController {
  constructor() {}

  @Get()
  findAll() {
    return sendResponse({
      status_code: HttpStatus.OK,
      message: 'All categories',
    });
  }
}
