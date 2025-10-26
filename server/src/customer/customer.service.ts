import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/entities/company.entity';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,

    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {
    const { name, emailId, phoneNumber, address, role, companyId } = createCustomerDto

    const existingCustomer = await this.customerRepo.findOne({
      where: [
        { emailId }
      ]
    })

    if (existingCustomer) {
      throw new BadRequestException('Customer with same emailId already exists');
    }

    const existingCompany = await this.companyRepo.findOne({
      where: { id: companyId }
    })

    if (!existingCompany) {
      throw new NotFoundException("Company not found")
    }

    const newCustomer = this.customerRepo.create(createCustomerDto)
    const savedCustomer = await this.customerRepo.save(newCustomer)

    return {
      satus: 201,
      message: "Customer created successfully!",
      customer: savedCustomer
    }
  }

  async findAll() {
    const customers = await this.companyRepo.find({
      order: { createdAt: 'DESC' },
    });

    if (customers.length <= 0) {
      return {
        status: 200,
        message: 'No customers exist',
        data: customers,
      };
    } else {
      return {
        status: 200,
        message: 'Customers fetched successfully',
        data: customers,
      };
    }
  }

  async findOne(id: string) {
    const customer = await this.companyRepo.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return {
      status: 200,
      message: 'Customer fetched successfully',
      data: customer,
    };
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const existingCustomer = await this.customerRepo.findOne({ where: { id } });

    if (!existingCustomer) {
      throw new NotFoundException('Customer not found');
    }

    await this.customerRepo.update(id, updateCustomerDto);

    const updatedCustomer = await this.customerRepo.findOne({ where: { id } });

    return {
      status: 200,
      message: 'Customer updated successfully',
      data: updatedCustomer,
    };
  }

  async remove(id: string) {
    const existingCustomer = await this.customerRepo.findOne({ where: { id } });

    if (!existingCustomer) {
      throw new NotFoundException('Customer not found');
    }

    await this.customerRepo.delete(id);

    return {
      status: 200,
      message: 'Customer deleted successfully',
    };
  }
}
