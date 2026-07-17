import { BookingId, InvoiceId } from '@taskpro/types';
import { Money } from '../value-objects';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: Money;
  total: Money;
}

export interface InvoiceProps {
  id: InvoiceId;
  bookingId: BookingId;
  items: InvoiceItem[];
  subtotal: Money;
  tax: Money;
  total: Money;
  issuedAt: Date;
  paidAt?: Date;
}

export class Invoice {
  private constructor(private props: InvoiceProps) {}

  static create(props: Omit<InvoiceProps, 'issuedAt'>): Invoice {
    return new Invoice({ ...props, issuedAt: new Date() });
  }

  static reconstitute(props: InvoiceProps): Invoice {
    return new Invoice(props);
  }

  get id(): InvoiceId {
    return this.props.id;
  }

  get total(): Money {
    return this.props.total;
  }

  markPaid(): void {
    this.props.paidAt = new Date();
  }
}
