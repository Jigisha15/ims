import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CATEGORY } from 'src/entities/enum';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import multer from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

const multerStorage = multer.memoryStorage();

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  @Post("create")
  @UseInterceptors(FileInterceptor('imageUrl', { storage: multerStorage }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    let imageUrl: string | undefined = undefined;

    if (file) {
      // optionally pass folder like `products/companyId` to organize
      const uploadResult = await this.cloudinaryService.uploadImage(file.buffer, 'products');
      imageUrl = uploadResult.secure_url; // or uploadResult.url
    }

    // merge imageUrl into DTO then create product
    const saved = await this.productService.create({
      ...createProductDto,
      imageUrl,
    });

    return {
      status: 201,
      message: 'Product created successfully',
      product: saved,
    };
  }


  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get("category-wise/:category")
  findCategoryWise(@Param("category") category: CATEGORY) {
    return this.productService.findCategoryWise(category)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('imageUrl'))
  async updateProduct(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const existingProduct = await this.productService.findOne(id);
    if (!existingProduct) throw new NotFoundException('Product not found');

    let imageUrl: string | undefined;

    if (file) {
      if (existingProduct.data[0].imageUrl) {
        await this.cloudinaryService.deleteImageByUrl(existingProduct.data[0].imageUrl);
      }

      //  Upload the new one
      const uploadResult = await this.cloudinaryService.uploadImage(file.buffer, 'products');
      imageUrl = uploadResult.secure_url;
    }

    const updated = await this.productService.update(id, {
      ...updateProductDto,
      imageUrl,
    });

    return {
      status: 200,
      message: 'Product updated successfully',
      product: updated.data,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
