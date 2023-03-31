import { PrismaClient } from '@prisma/client';

/**
 * Add Total Price in Orders
 */
async function addTotalPriceInOrders() {
  try {
    const prisma = new PrismaClient();

    const orders = await prisma.order.findMany({
      include: {
        order_items: true,
      },
    });

    let promiseArray = orders.map((order, index) => {
      return prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          total_price: order.order_items.reduce(
            (acc, orderItem) => (acc += orderItem.price),
            0,
          ),
        },
      });
    });

    await Promise.all(promiseArray);

    console.log('Success');
  } catch (error) {
    console.log(error);
  }
}

addTotalPriceInOrders();
