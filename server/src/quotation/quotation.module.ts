import { Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quotation } from 'src/entities/quotation.entity';
import { QuotationItem } from 'src/entities/quotation-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quotation, QuotationItem])],
  controllers: [QuotationController],
  providers: [QuotationService],
})
export class QuotationModule { }
