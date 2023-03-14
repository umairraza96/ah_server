import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { message } from 'src/helpers/response.message';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new NotFoundException(message.PRODUCT_GET_FAILED);

    return product;
  }

  async create(user: JWTPayload, createProductDTO: CreateProductDTO) {
    const isAdmin = user.is_admin;

    if (!isAdmin) throw new ForbiddenException(message.UNAUTHORIZED);

    const product = await this.prisma.product.create({
      data: createProductDTO,
    });

    return product;
  }

  async update(
    user: JWTPayload,
    id: string,
    updateProductDTO: UpdateProductDTO,
  ) {
    const isAdmin = user.is_admin;

    if (!isAdmin) throw new ForbiddenException(message.UNAUTHORIZED);

    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new NotFoundException(message.PRODUCT_NOT_FOUND);

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: updateProductDTO,
    });

    return updatedProduct;
  }
}
