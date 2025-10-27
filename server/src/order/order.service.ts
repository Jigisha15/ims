import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { ORDER_STATUS } from 'src/entities/enum';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,

    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) { }

  // generate order id - identifier
  async generateOrderNo(companyId: string): Promise<string> {
    const company = await this.companyRepo.findOne({ where: { id: companyId } });
    if (!company) throw new NotFoundException('Company not found');

    const abbreviation = company.name
      .split(' ')
      .map((w) => w[0].toUpperCase())
      .join('');

    const orderCount = await this.orderRepo.count({ where: { companyId } });
    const nextNumber = orderCount + 1;

    return `${abbreviation}-ORD${nextNumber}-${Date.now()}`;
  }

  async create(createOrderDto: CreateOrderDto) {
    const { orderItems, companyId, ...orderData } = createOrderDto;

    const orderNo = await this.generateOrderNo(companyId);

    const order = this.orderRepo.create({
      orderNo,
      companyId,
      ...orderData,
      status: orderData.status || ORDER_STATUS.PENDING,
    });

    const savedOrder = await this.orderRepo.save(order);

    // Save order items
    const items = orderItems.map((item) =>
      this.orderItemRepo.create({
        ...item,
        orderId: savedOrder.id,
      }),
    );
    await this.orderItemRepo.save(items);

    return {
      status: 201,
      message: 'Order created successfully',
      data: { ...savedOrder, items },
    };
  }

  async findAll(companyId?: string) {
    const where = companyId ? { companyId } : {};
    const orders = await this.orderRepo.find({
      relations: ['orderItems', 'customer', 'company'],
      order: { createdAt: 'DESC' },
    });

    if (orders.length <= 0) {
      return {
        status: 200,
        message: 'No orders found',
        data: orders,
      };
    } else {
      return {
        status: 200,
        message: 'Orders fetched successfully!',
        data: orders,
      };
    }
  }

  async findOne(id: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['orderItems', 'customer', 'company'],
    });

    if (!order) throw new NotFoundException('Order not found');

    return {
      status: 200,
      message: 'Order fetched successfully',
      data: order,
    };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const { orderItems, ...orderData } = updateOrderDto;

    const existingOrder = await this.orderRepo.findOne({ where: { id } });
    if (!existingOrder) throw new NotFoundException('Order not found');

    await this.orderRepo.update(id, {
      ...orderData,
      updatedAt: new Date(),
    });

    if (orderItems && orderItems.length > 0) {
      // Remove old items and add new ones
      await this.orderItemRepo.delete({ orderId: id });
      const newItems = orderItems.map((item) =>
        this.orderItemRepo.create({
          ...item,
          orderId: id,
        }),
      );
      await this.orderItemRepo.save(newItems);
    }

    const updatedOrder = await this.orderRepo.findOne({
      where: { id },
      relations: ['orderItems', 'customer', 'company'],
    });

    return {
      status: 200,
      message: 'Order updated successfully',
      data: updatedOrder,
    };
  }

  async remove(id: string) {
    const existingOrder = await this.orderRepo.findOne({ where: { id } });
    if (!existingOrder) throw new NotFoundException('Order not found');

    await this.orderItemRepo.delete({ orderId: id });
    await this.orderRepo.delete(id);

    return {
      status: 200,
      message: 'Order deleted successfully',
    };
  }
}
