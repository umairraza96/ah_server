import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { sendResponse } from 'src/helpers/response.helper';
import { message } from 'src/helpers/response.message';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async findAll() {
    const data = await this.productService.findAll();
    return sendResponse({
      status_code: HttpStatus.OK,
      data,
      message: message.PRODUCT_GET_ALL_SUCCESS,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productService.findOne(id);
    return sendResponse({
      status_code: HttpStatus.OK,
      data,
      message: message.PRODUCT_GET_SUCCESS,
    });
  }

  @Auth()
  @Post()
  async create(
    @GetCurrentUser() user: JWTPayload,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const data = await this.productService.create(user, createProductDTO);
    return sendResponse({
      status_code: HttpStatus.CREATED,
      data,
      message: message.PRODUCT_CREATE_SUCCESS,
    });
  }

  @Auth()
  @Patch(':id')
  async update(
    @GetCurrentUser() user: JWTPayload,
    @Param('id') id: string,
    @Body() updateProductDTO: UpdateProductDTO,
  ) {
    const data = await this.productService.update(user, id, updateProductDTO);
    return sendResponse({
      status_code: HttpStatus.OK,
      data,
      message: message.PRODUCT_UPDATE_SUCCESS,
    });
  }
}
