import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quotation } from 'src/entities/quotation.entity';
import { QuotationItem } from 'src/entities/quotation-item.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/entities/company.entity';

@Injectable()
export class QuotationService {

  constructor(
    @InjectRepository(Quotation)
    private quotationRepo: Repository<Quotation>,

    @InjectRepository(QuotationItem)
    private quotationItemRepo: Repository<QuotationItem>,

    @InjectRepository(Company)
    private companyRepo: Repository<Company>,
  ) { }

  async generateQuotationNo(companyId: string): Promise<string> {
    // Fetch company abbreviation (assuming you have one)
    const company = await this.companyRepo.findOne({ where: { id: companyId } });
    if (!company) throw new NotFoundException('Company not found');

    const abbreviation = company.name
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('');

    // Count existing quotations for that company
    const count = await this.quotationRepo.count({ where: { companyId } });
    const quotationNumber = count + 1;

    // Combine them
    return `${abbreviation}-Q${quotationNumber}-${Date.now()}`;
  }

  async create(createQuotationDto: CreateQuotationDto) {
    const { quotationItems, companyId, ...quotationData } = createQuotationDto;

    // Generate a meaningful quotation number
    const quotationNo = await this.generateQuotationNo(companyId);

    const quotation = this.quotationRepo.create({
      quotationNo,
      companyId,
      ...quotationData,
    });

    const savedQuotation = await this.quotationRepo.save(quotation);

    // Create related quotation items
    const items = quotationItems.map((item) =>
      this.quotationItemRepo.create({
        ...item,
        quotationId: savedQuotation.id,
      }),
    );
    await this.quotationItemRepo.save(items);

    return {
      status: 201,
      message: 'Quotation created successfully',
      data: { ...savedQuotation, items },
    };
  }


  async findAll() {
    const quotations = await this.quotationRepo.find({
      relations: ['quotationItems', 'customer', 'company'],
      order: { createdAt: 'DESC' },
    });

    if (quotations.length <= 0) {
      return {
        status: 200,
        message: 'No quotations found',
        data: quotations
      };
    } else {
      return {
        status: 200,
        message: 'Quotations fetched successfully!',
        data: quotations
      };
    }
  }

  async findOne(id: string) {
    const quotation = await this.quotationRepo.findOne({
      where: { id },
      relations: ['quotationItems', 'customer', 'company'],
    });

    if (!quotation) throw new NotFoundException('Quotation not found');

    return {
      status: 200,
      message: "Quotation fetched successfully!",
      data: quotation
    };
  }

  async update(id: string, updateQuotationDto: UpdateQuotationDto) {
    const existing = await this.quotationRepo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Quotation not found');

    // If items exist in update, handle them
    if (updateQuotationDto.quotationItems) {
      await this.quotationItemRepo.delete({ quotationId: id });
      const newItems = updateQuotationDto.quotationItems.map((item) =>
        this.quotationItemRepo.create({ ...item, quotationId: id }),
      );
      await this.quotationItemRepo.save(newItems);
    }

    await this.quotationRepo.update(id, updateQuotationDto);

    const updated = await this.findOne(id);
    return {
      status: 200,
      message: 'Quotation updated successfully!',
      data: updated.data
    };
  }

  async remove(id: string) {
    const quotation = await this.findOne(id);
    await this.quotationItemRepo.delete({ quotationId: id });
    await this.quotationRepo.delete(id);
    return {
      status: 200,
      message: 'Quotation deleted successfully'
    };
  }
}
