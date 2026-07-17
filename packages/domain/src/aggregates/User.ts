import { UserId, UserRole, UserStatus } from '@taskpro/types';
import { Email, FullName, Phone } from '../value-objects';
import { UserStateMachine } from '../state-machines';
import { UserRegistered } from '../events/identity/UserRegistered';

export interface UserProps {
  id: UserId;
  email: Email;
  role: UserRole;
  status: UserStatus;
  profile?: {
    fullName: FullName;
    phone?: Phone;
  };
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private uncommittedEvents: unknown[] = [];

  private constructor(private props: UserProps) {}

  static create(props: Omit<UserProps, 'status' | 'createdAt' | 'updatedAt'>): User {
    const now = new Date();
    const user = new User({
      ...props,
      status: UserStatus.Pending,
      createdAt: now,
      updatedAt: now,
    });
    user.record(new UserRegistered(props.id, props.email.value));
    return user;
  }

  static reconstitute(props: UserProps): User {
    return new User(props);
  }

  get id(): UserId {
    return this.props.id;
  }

  get email(): Email {
    return this.props.email;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get status(): UserStatus {
    return this.props.status;
  }

  get fullName(): FullName | undefined {
    return this.props.profile?.fullName;
  }

  transitionStatus(to: UserStatus): void {
    this.props.status = UserStateMachine.transition(this.props.status, to);
    this.props.updatedAt = new Date();
  }

  updateProfile(profile: { fullName: FullName; phone?: Phone }): void {
    this.props.profile = profile;
    this.props.updatedAt = new Date();
  }

  private record(event: unknown): void {
    this.uncommittedEvents.push(event);
  }

  getUncommittedEvents(): readonly unknown[] {
    return this.uncommittedEvents;
  }

  commitEvents(): void {
    this.uncommittedEvents = [];
  }
}
