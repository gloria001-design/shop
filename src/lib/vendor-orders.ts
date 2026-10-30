import type { CartItem, Order, OrderStatus } from "@/src/types/product";

/** Line items in an order that belong to this vendor. */
export function vendorLines(order: Order, vendorId: string): CartItem[] {
  return order.items.filter((i) => i.vendorId === vendorId);
}

/** Orders that contain at least one item from this vendor. */
export function ordersForVendor(orders: Order[], vendorId: string): Order[] {
  return orders.filter((o) => vendorLines(o, vendorId).length > 0);
}

/** This vendor's fulfilment status for an order (defaults to pending). */
export function vendorStatus(order: Order, vendorId: string): OrderStatus {
  return order.fulfillment?.[vendorId] ?? "pending";
}

/** Gross sales for this vendor's lines (before store-wide discount/delivery). */
export function vendorSales(order: Order, vendorId: string): number {
  return vendorLines(order, vendorId).reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );
}
