const addToCart = async ({ plant, session }: { plant: any; session: any }) => {
  const existingItem = req.session.cart.find((item) => item.sku === plant.sku);
  if (existingItem) {
    existingItem.quantity += plant.quantity;
  } else {
    session.push(plant);
  }
};

export const CartServices = {
  addToCart,
};
