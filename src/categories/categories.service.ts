import { ForbiddenException, Injectable } from '@nestjs/common';
import { message } from 'src/helpers/response.message';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const categories = await this.prisma.category.findMany({});
    return categories;
  }

  async create(user: JWTPayload, createCategoryDTO: CreateCategoryDTO) {
    const isAdmin = user.is_admin;

    if (!isAdmin) throw new ForbiddenException(message.UNAUTHORIZED);

    const category = await this.prisma.category.create({
      data: createCategoryDTO,
    });

    return category;
  }

  async update(
    user: JWTPayload,
    id: string,
    updateCategoryDTO: UpdateCategoryDTO,
  ) {
    const isAdmin = user.is_admin;

    if (!isAdmin) throw new ForbiddenException(message.UNAUTHORIZED);

    const category = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDTO,
    });

    return category;
  }

  async remove(user: JWTPayload, id: string) {
    const isAdmin = user.is_admin;

    if (!isAdmin) throw new ForbiddenException(message.UNAUTHORIZED);

    const category = await this.prisma.category.delete({
      where: { id },
    });

    return;
  }
}
