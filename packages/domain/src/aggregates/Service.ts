import { CategoryId, ServiceId } from '@taskpro/types';
import { Duration, Money } from '../value-objects';

export interface ServiceProps {
  id: ServiceId;
  categoryId: CategoryId;
  name: string;
  description: string;
  estimatedDuration: Duration;
  basePrice: Money;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Service {
  private constructor(private props: ServiceProps) {}

  static create(props: Omit<ServiceProps, 'isActive' | 'createdAt' | 'updatedAt'>): Service {
    const now = new Date();
    return new Service({ ...props, isActive: true, createdAt: now, updatedAt: now });
  }

  static reconstitute(props: ServiceProps): Service {
    return new Service(props);
  }

  get id(): ServiceId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get basePrice(): Money {
    return this.props.basePrice;
  }

  deactivate(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  activate(): void {
    this.props.isActive = true;
    this.props.updatedAt = new Date();
  }
}
