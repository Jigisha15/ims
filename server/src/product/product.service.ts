import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CATEGORY } from 'src/entities/enum';
import { User } from 'src/entities/user.entity';
import { Company } from 'src/entities/company.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async create(createProductDto: CreateProductDto & { imageUrl?: string }) {
    const { name, description, modelNumber, category, imageUrl, costPrice, sellingPrice, stockQuantity, companyId, createdBy } = createProductDto

    const existingProduct = await this.productRepo.find({
      where: [
        { name },
        { category },
        { modelNumber },
      ]
    })
    console.log("existingProduct : ", existingProduct)
    if (existingProduct.length > 0) {
      throw new BadRequestException('Product with either same name, category or modelNumber already exists');
    }

    // find company
    const companyExists = await this.companyRepo.find({
      where: { id: companyId }
    })

    if (!companyExists) {
      throw new BadRequestException("Company not found")
    }

    // find user
    const userExists = await this.userRepo.find({
      where: { id: createdBy }
    })

    if (!userExists) {
      throw new BadRequestException("User not found")
    }

    const newProduct = this.productRepo.create(createProductDto)
    const savedProduct = await this.productRepo.save(newProduct)

    return {
      status: 201,
      message: 'Product created successfully!',
      company: savedProduct,
    };
  }

  async findAll() {
    const products = await this.productRepo.find({
      order: { createdAt: 'DESC' },
    });

    if (products.length <= 0) {
      return {
        status: 200,
        message: 'No products exist',
        data: products,
      };
    } else {
      return {
        status: 200,
        message: 'Products fetched successfully',
        data: products,
      };
    }
  }

  async findCategoryWise(category: CATEGORY) {
    const categoryProducts = await this.productRepo.find({
      where: { category },
      order: { createdAt: 'DESC' },
    });

    if (!categoryProducts || categoryProducts.length === 0) {
      return {
        status: 200,
        message: `No products found in category: ${category}`,
        data: [],
      };
    }

    return {
      status: 200,
      message: `Products fetched successfully for category: ${category}`,
      data: categoryProducts,
    };
  }

  async findOne(id: string) {
    const product = await this.productRepo.find({
      where: { id }
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      status: 200,
      message: 'Product fetched successfully',
      data: product,
    };
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto & { imageUrl?: string },
  ) {
    const existingProduct = await this.productRepo.findOne({ where: { id } });

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepo.update(id, {
      ...updateProductDto,
      updatedAt: new Date(),
    });

    const updatedProduct = await this.productRepo.findOne({ where: { id } });

    return {
      status: 200,
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  async remove(id: string) {
    const existingProduct = await this.productRepo.findOne({ where: { id } });

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepo.delete(id);

    return {
      status: 200,
      message: 'Product deleted successfully',
    };
  }
}
