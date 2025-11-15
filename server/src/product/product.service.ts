import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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

  /** CREATE */
  async create(dto: CreateProductDto & { imageUrl?: string }) {
    const { name, modelNumber, companyId, categoryId, createdBy } = dto;

    // Check duplicates
    const exists = await this.productRepo.findOne({
      where: [
        { name },
        { modelNumber },
      ]
    });

    if (exists) {
      throw new BadRequestException("Product with same name or model number already exists");
    }

    // Validate category


    // Validate company
    const company = await this.companyRepo.findOne({ where: { id: companyId } });
    if (!company) throw new BadRequestException("Company not found");

    // Validate user
    const user = await this.userRepo.findOne({ where: { id: createdBy } });
    if (!user) throw new BadRequestException("User not found");

    const product = this.productRepo.create(dto);
    const saved = await this.productRepo.save(product);

    return {
      status: 201,
      message: "Product created successfully",
      data: saved,
    };
  }

  /** FIND ALL */
  async findAll() {
    const products = await this.productRepo.find({
      relations: ["company", "category"],
      order: { createdAt: 'DESC' },
    });

    return {
      status: 200,
      message: "Products fetched successfully",
      data: products,
    };
  }

  /** FIND CATEGORY-WISE */
  async findCategoryWise(categoryId: string) {
    const products = await this.productRepo.find({
      where: { categoryId },
      order: { createdAt: "DESC" },
    });

    return {
      status: 200,
      message: "Products fetched successfully",
      data: products,
    };
  }

  /** FIND ONE (formatted) */
  async findOne(id: string) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ["company", "category"],
    });

    if (!product) throw new NotFoundException("Product not found");

    return {
      status: 200,
      message: "Product fetched successfully",
      data: product,
    };
  }

  /** INTERNAL: RAW */
  async findOneRaw(id: string) {
    return this.productRepo.findOne({ where: { id } });
  }

  /** UPDATE */
  async update(id: string, dto: UpdateProductDto & { imageUrl?: string }) {
    await this.productRepo.update(id, {
      ...dto,
      updatedAt: new Date(),
    });

    const updated = await this.findOneRaw(id);

    return {
      status: 200,
      message: "Product updated successfully",
      data: updated,
    };
  }

  /** DELETE */
  async remove(id: string) {
    const exists = await this.findOneRaw(id);
    if (!exists) throw new NotFoundException("Product not found");

    await this.productRepo.delete(id);

    return {
      status: 200,
      message: "Product deleted successfully",
    };
  }
}
