export interface IOrderItem {
  plantId: string;
  quantity: number;
  sku: string;
}

export interface IOrder {
  items: [IOrderItem];
  totalPrice: number;
  userId: string;
  status: string;
}
