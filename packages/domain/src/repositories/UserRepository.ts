import type { User, UserProps } from '../aggregates/User';
import type { UserId } from '@taskpro/types';

export interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  reconstitute(props: UserProps): User;
}
