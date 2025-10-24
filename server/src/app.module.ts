import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from './auth/auth.module';
import { Transaction } from 'typeorm';
import { User } from './entities/user.entity';
import { Company } from './entities/company.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { Payment } from './entities/payment.entity';
import { Product } from './entities/product.entity';
import { PurchaseOrderItem } from './entities/purchase-order-item.entity';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { QuotationItem } from './entities/quotation-item.entity';
import { Quotation } from './entities/quotation.entity';
import { Customer } from './entities/customer.entity';
import { Supplier } from './entities/supplier.entity';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        User,
        Company,
        Product,
        Quotation,
        QuotationItem,
        Order,
        OrderItem,
        PurchaseOrder,
        PurchaseOrderItem,
        Transaction,
        Payment,
        Customer,
        Supplier
      ],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    AuthModule,
    UserModule,
    CompanyModule,
    // add modules here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
