import { PayoutId, ProfessionalId } from '@taskpro/types';
import { Money } from '../value-objects';

export interface PayoutProps {
  id: PayoutId;
  professionalId: ProfessionalId;
  amount: Money;
  status: 'pending' | 'in_transit' | 'paid' | 'failed';
  createdAt: Date;
  paidAt?: Date;
}

export class Payout {
  private constructor(private props: PayoutProps) {}

  static create(props: Omit<PayoutProps, 'status' | 'createdAt'>): Payout {
    return new Payout({
      ...props,
      status: 'pending',
      createdAt: new Date(),
    });
  }

  static reconstitute(props: PayoutProps): Payout {
    return new Payout(props);
  }

  get id(): PayoutId {
    return this.props.id;
  }

  get professionalId(): ProfessionalId {
    return this.props.professionalId;
  }

  get amount(): Money {
    return this.props.amount;
  }

  get status(): PayoutProps['status'] {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  markPaid(): void {
    this.props.status = 'paid';
    this.props.paidAt = new Date();
  }

  markFailed(): void {
    this.props.status = 'failed';
  }
}
