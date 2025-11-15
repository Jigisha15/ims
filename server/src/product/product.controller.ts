import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
  @UseInterceptors(FileInterceptor("imageUrl", { storage: multerStorage }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    let imageUrl: string | undefined = undefined;

    if (file) {
      const upload = await this.cloudinaryService.uploadImage(file.buffer, 'products');
      imageUrl = upload.secure_url;
    }

    const saved = await this.productService.create({
      ...dto,
      imageUrl,
    });

    return saved;
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get("category-wise/:categoryId")
  findCategoryWise(@Param("categoryId") categoryId: string) {
    return this.productService.findCategoryWise(categoryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch("update/:id")
  @UseInterceptors(FileInterceptor("imageUrl", { storage: multerStorage }))
  async update(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateProductDto,
  ) {
    const existing = await this.productService.findOneRaw(id);
    if (!existing) throw new NotFoundException("Product not found");

    let imageUrl: string | undefined;

    if (file) {
      if (existing.imageUrl) {
        await this.cloudinaryService.deleteImageByUrl(existing.imageUrl);
      }

      const upload = await this.cloudinaryService.uploadImage(file.buffer, "products");
      imageUrl = upload.secure_url;
    }

    const updated = await this.productService.update(id, {
      ...dto,
      imageUrl,
    });

    return updated;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(id);
  }
}