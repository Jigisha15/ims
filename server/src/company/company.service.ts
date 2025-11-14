import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/entities/company.entity';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    const { name, emailId, phoneNumber, gstin } = createCompanyDto;

    // Check for duplicate company
    const existingCompany = await this.companyRepo.findOne({
      where: [
        { name },
        { emailId },
        { phoneNumber },
        { gstin },
      ],
    });

    if (existingCompany) {
      throw new BadRequestException('Company with provided details already exists');
    }

    // Create new company
    const newCompany = this.companyRepo.create(createCompanyDto);
    const savedCompany = await this.companyRepo.save(newCompany);

    return {
      status: 201,
      message: 'Company created successfully!',
      company: savedCompany,
    };
  }

  async findAll() {
    const companies = await this.companyRepo.find({
      order: { createdAt: 'DESC' },
      relations: ['createdUser'],
    });

    if (companies.length <= 0) {
      return {
        status: 200,
        message: 'No companies exist',
        data: companies,
      };
    } else {
      return {
        status: 200,
        message: 'Companies fetched successfully',
        data: companies,
      };
    }
  }

  async findOne(id: string) {
    const company = await this.companyRepo.findOne({
      where: { id },
      relations: ['createdUser'], // optional
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return {
      status: 200,
      message: 'Company fetched successfully',
      data: company,
    };
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const existingCompany = await this.companyRepo.findOne({ where: { id } });

    if (!existingCompany) {
      throw new NotFoundException('Company not found');
    }

    await this.companyRepo.update(id, updateCompanyDto);

    const updatedCompany = await this.companyRepo.findOne({ where: { id } });

    return {
      status: 200,
      message: 'Company updated successfully',
      data: updatedCompany,
    };
  }

  async remove(id: string) {
    const existingCompany = await this.companyRepo.findOne({ where: { id } });

    if (!existingCompany) {
      throw new NotFoundException('Company not found');
    }

    await this.companyRepo.delete(id);

    return {
      status: 200,
      message: 'Company deleted successfully',
    };
  }
}
