import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Company } from 'src/entities/company.entity';
import { User } from 'src/entities/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Company, User])],
  controllers: [ProductController],
  providers: [ProductService, CloudinaryService],
})
export class ProductModule { }
