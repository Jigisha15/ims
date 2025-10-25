import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/entities/supplier.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/entities/company.entity';

@Injectable()
export class SupplierService {

  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepo: Repository<Supplier>,

    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>
  ) { }

  async create(createSupplierDto: CreateSupplierDto) {
    const { name, emailId, phoneNumber, role, companyId } = createSupplierDto

    const existingSupplier = await this.supplierRepo.findOne({
      where: [
        { name },
        { emailId },
        { phoneNumber },
        { role }
      ]
    })

    if (existingSupplier) {
      throw new BadRequestException("Supplier with provided details already exists")
    }

    // check if company exists
    const existingCompany = await this.companyRepo.findOne({
      where: { id: companyId },
      relations: ['createdUser'], // optional
    });

    if (!existingCompany) {
      throw new NotFoundException('Company not found');
    }

    // Create new supplier
    const newSupplier = this.supplierRepo.create(createSupplierDto)
    const savedSupplier = await this.supplierRepo.save(newSupplier)

    return {
      status: 201,
      message: "Supplier created successfully!",
      supplier: savedSupplier
    }
  }

  async findAll() {
    const suppliers = await this.supplierRepo.find({
      order: { createdAt: 'DESC' },
    });

    if (suppliers.length <= 0) {
      return {
        status: 200,
        message: 'No suppliers exist',
        data: suppliers,
      };
    } else {
      return {
        status: 200,
        message: 'Suppliers fetched successfully',
        data: suppliers,
      };
    }
  }

  async findOne(id: string) {
    const supplier = await this.supplierRepo.findOne({
      where: { id },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    return {
      status: 200,
      message: 'Supplier fetched successfully',
      data: supplier,
    };
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const existingSupplier = await this.supplierRepo.findOne({ where: { id } });

    if (!existingSupplier) {
      throw new NotFoundException('Supplier not found');
    }

    await this.supplierRepo.update(id, updateSupplierDto);

    const updatedSupplier = await this.supplierRepo.findOne({ where: { id } });

    return {
      status: 200,
      message: 'Supplier updated successfully',
      data: updatedSupplier,
    };
  }

  async remove(id: string) {
    const existingSupplier = await this.supplierRepo.findOne({ where: { id } });

    if (!existingSupplier) {
      throw new NotFoundException('Supplier not found');
    }

    await this.supplierRepo.delete(id);

    return {
      status: 200,
      message: 'Supplier deleted successfully',
    };
  }
}
