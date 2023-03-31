import { Injectable } from '@nestjs/common';
import { getOrder } from 'src/helpers/queries';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDTO } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(user: JWTPayload) {
    const isAdmin = user.is_admin;

    if (isAdmin) {
      const orders = await this.prisma.order.findMany({
        include: getOrder,
      });
      return orders;
    }

    const orders = await this.prisma.order.findMany({
      where: {
        user_id: user.id,
      },
    });
    return orders;
  }

  async create(user: JWTPayload, createOrderDTO: CreateOrderDTO) {
    const order = await this.prisma.order.create({
      data: {
        address: createOrderDTO.address,
        phone_no: createOrderDTO.phone_no,
        alt_phone: createOrderDTO.alt_phone,
        user_id: user.id,
        order_items: {
          create: createOrderDTO.order_items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },

      include: getOrder,
    });
    return order;
  }
}
