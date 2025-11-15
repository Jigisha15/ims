import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) { }

  // Create a new category
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepo.findOne({
      where: { name: createCategoryDto.name },
      relations: ['products'],
    });
    if (category) {
      return {
        success: false,
        message: "Category already exists",
        status: 401
      }
    } else {
      const category = this.categoryRepo.create(createCategoryDto);
      await this.categoryRepo.save(category);
      return {
        success: true,
        message: "Category created successfully!",
        status: 201,
        data: category
      }
    }
  }

  // Get all categories
  async findAll() {
    const categories = await this.categoryRepo.find({
      relations: ['products'],
    });

    return {
      success: true,
      data: categories,
      message:
        categories.length > 0
          ? "Categories fetched successfully!"
          : "No categories found",
      status: 200,
    };
  }

  // Get one category by ID
  async findOne(id: string) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) throw new NotFoundException('Category not found');

    return {
      success: true,
      data: category,
      message: "Data fetched succesfully!",
      status: 200
    }
  }

  // Update category
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.findOne(id);

    if (!existingCategory) {
      throw new NotFoundException("Category not found")
    }

    await this.categoryRepo.update(id, updateCategoryDto)

    const updatedCategory = await this.categoryRepo.findOne({
      where: { id }
    })

    return {
      status: 200,
      message: 'Category updated successfully',
      data: updatedCategory,
    };
  }

  async findOneRaw(id: string) {
    return this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  // Delete category
  async removeCategory(id: string) {
    const category = await this.findOneRaw(id);

    if (!category) {
      return {
        success: false,
        status: 404,
        message: "Category not found",
      };
    }

    await this.categoryRepo.remove(category);

    return {
      success: true,
      status: 201,
      message: "Category deleted successfully",
    };
  }
}