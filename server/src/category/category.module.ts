import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, Company, User])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule { }
