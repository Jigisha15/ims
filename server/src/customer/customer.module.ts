import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { Company } from 'src/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Company])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule { }
