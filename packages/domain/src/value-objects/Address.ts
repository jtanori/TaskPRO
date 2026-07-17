import { DomainErrorCode } from '@taskpro/types';
import { DomainError } from '../errors';

export class Address {
  private constructor(
    public readonly street: string,
    public readonly city: string,
    public readonly state: string,
    public readonly postalCode: string,
    public readonly country: string,
    public readonly label: string,
    public readonly latitude?: number,
    public readonly longitude?: number
  ) {}

  static create(props: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    label?: string;
    latitude?: number;
    longitude?: number;
  }): Address {
    const required = [props.street, props.city, props.state, props.postalCode, props.country];
    if (required.some((field) => !field || field.trim().length === 0)) {
      throw new DomainError(
        DomainErrorCode.InvalidArgument,
        'Address street, city, state, postal code, and country are required'
      );
    }

    if (
      (props.latitude !== undefined && (props.latitude < -90 || props.latitude > 90)) ||
      (props.longitude !== undefined && (props.longitude < -180 || props.longitude > 180))
    ) {
      throw new DomainError(DomainErrorCode.InvalidArgument, 'Invalid coordinates');
    }

    return new Address(
      props.street.trim(),
      props.city.trim(),
      props.state.trim(),
      props.postalCode.trim(),
      props.country.trim(),
      props.label?.trim() ?? 'Other',
      props.latitude,
      props.longitude
    );
  }

  hasCoordinates(): boolean {
    return this.latitude !== undefined && this.longitude !== undefined;
  }
}
