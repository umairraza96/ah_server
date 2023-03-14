import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(user: JWTPayload) {
    const isAdmin = user.is_admin;

    if (isAdmin) {
      const orders = await this.prisma.order.findMany();
      return orders;
    }

    const orders = await this.prisma.order.findMany({
      where: {
        user_id: user.id,
      },
    });
    return orders;
  }
}
