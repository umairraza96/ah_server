export const getOrder = {
  user: {
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  },

  order_items: {
    include: {
      product: {
        select: {
          id: true,
          name: true,
          type: true,
          tags: true,
        },
      },
    },
  },
};
