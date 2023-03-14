import { Module } from '@nestjs/common';
import { CategoryController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
