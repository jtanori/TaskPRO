import { BookingId, DomainErrorCode, TaskId, TaskStatus, UserId } from '@taskpro/types';
import { DomainError } from '../errors';

export interface TaskProps {
  id: TaskId;
  bookingId: BookingId;
  description: string;
  status: TaskStatus;
  assignedTo?: UserId;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Task {
  private constructor(private props: TaskProps) {}

  static create(props: Omit<TaskProps, 'status' | 'createdAt' | 'updatedAt'>): Task {
    const now = new Date();
    return new Task({ ...props, status: TaskStatus.Pending, createdAt: now, updatedAt: now });
  }

  static reconstitute(props: TaskProps): Task {
    return new Task(props);
  }

  get id(): TaskId {
    return this.props.id;
  }

  get status(): TaskStatus {
    return this.props.status;
  }

  start(): void {
    if (this.props.status !== TaskStatus.Pending) {
      throw new DomainError(
        DomainErrorCode.InvalidTransition,
        `Cannot start task from status ${this.props.status}`
      );
    }
    this.props.status = TaskStatus.InProgress;
    this.props.updatedAt = new Date();
  }

  complete(): void {
    if (this.props.status !== TaskStatus.InProgress) {
      throw new DomainError(
        DomainErrorCode.InvalidTransition,
        `Cannot complete task from status ${this.props.status}`
      );
    }
    this.props.status = TaskStatus.Completed;
    this.props.completedAt = new Date();
    this.props.updatedAt = new Date();
  }
}
