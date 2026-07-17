import { Money } from '../value-objects';

export interface PricingLineItem {
  description: string;
  amount: Money;
}

export class BookingPricingService {
  static calculateTotal(items: PricingLineItem[]): Money {
    if (items.length === 0) {
      throw new Error('At least one pricing item is required');
    }
    const currency = items[0].amount.currency;
    return items.reduce((total, item) => total.add(item.amount), Money.zero(currency));
  }
}
