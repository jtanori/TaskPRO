import { UserStatus } from '@taskpro/types';
import { DomainError } from '../errors';

const transitions: Record<UserStatus, UserStatus[]> = {
  [UserStatus.Pending]: [UserStatus.Active, UserStatus.Suspended, UserStatus.Deleted],
  [UserStatus.Active]: [UserStatus.Suspended, UserStatus.Deleted],
  [UserStatus.Suspended]: [UserStatus.Active, UserStatus.Deleted],
  [UserStatus.Deleted]: [],
};

export class UserStateMachine {
  static canTransition(from: UserStatus, to: UserStatus): boolean {
    return transitions[from].includes(to);
  }

  static transition(from: UserStatus, to: UserStatus): UserStatus {
    if (!this.canTransition(from, to)) {
      throw DomainError.invalidTransition(from, to);
    }
    return to;
  }
}
