import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderItem } from 'src/entities/purchase-order-item.entity';
import { PurchaseOrder } from 'src/entities/purchase-order.entity';
import { Repository, DataSource } from 'typeorm';

// started to use query runner from here onwards
@Injectable()
export class PurchaseOrderService {

  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly purchaseOrderRepo: Repository<PurchaseOrder>,

    @InjectRepository(PurchaseOrderItem)
    private readonly purchaseOrderItemRepo: Repository<PurchaseOrderItem>,
  ) { }

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const { purchaseItems, ...purchaseOrderData } = createPurchaseOrderDto;

    // create order
    const purchaseOrder = this.purchaseOrderRepo.create(purchaseOrderData);
    await this.purchaseOrderRepo.save(purchaseOrder);

    // create order items
    if (purchaseItems && purchaseItems.length > 0) {
      const items = purchaseItems.map(item =>
        this.purchaseOrderItemRepo.create({
          ...item,
          purchaseOrderId: purchaseOrder.id,
        }),
      );
      await this.purchaseOrderItemRepo.save(items);
    }

    return {
      message: 'Purchase Order created successfully',
      data: { purchaseOrder, purchaseItems },
    };
  }

  async findAll() {
    const allPurchaseOrders = await this.purchaseOrderRepo.find({
      relations: ['purchaseItems'],
      order: { createdAt: "DESC" }
    })

    if (allPurchaseOrders.length <= 0) {
      return {
        status: 200,
        message: "No purchase orders found",
        data: allPurchaseOrders
      }
    } else {
      return {
        status: 200,
        message: "Purchase orders fetched successfully!",
        data: allPurchaseOrders
      }
    }
  }

  async findOne(id: string) {
    const purchaseOrder = await this.purchaseOrderRepo.findOne({
      where: { id },
      relations: ["purchaseItems"],
      order: { createdAt: "DESC" }
    })

    if (!purchaseOrder) throw new NotFoundException('Purchase order not found');

    return {
      status: 200,
      message: 'Purchase order fetched successfully',
      data: purchaseOrder,
    };
  }

  async update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    const existingOrder = await this.purchaseOrderRepo.findOne({ where: { id } });
    if (!existingOrder) throw new NotFoundException('Purchase Order not found');

    const { purchaseItems, ...updateData } = updatePurchaseOrderDto;

    await this.purchaseOrderRepo.update(id, updateData);

    if (purchaseItems && purchaseItems.length > 0) {
      // remove old items
      await this.purchaseOrderItemRepo.delete({ purchaseOrderId: id });

      // add new items
      const newItems = purchaseItems.map(item =>
        this.purchaseOrderItemRepo.create({
          ...item,
          purchaseOrderId: id,
        }),
      );
      await this.purchaseOrderItemRepo.save(newItems);
    }

    return {
      message: 'Purchase Order updated successfully',
      data: await this.findOne(id),
    };
  }

  async remove(id: string) {
    const existingOrder = await this.purchaseOrderRepo.findOne({ where: { id } });
    if (!existingOrder) throw new NotFoundException('Purchase Order not found');

    await this.purchaseOrderRepo.delete(id);
    return { message: 'Purchase Order deleted successfully' };
  }
}
