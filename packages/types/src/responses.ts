import type { DomainErrorDto } from './errors';

export type ApiResponse<T> = { success: true; data: T } | { success: false; error: DomainErrorDto };

export type Result<T, E = DomainErrorDto> = { ok: true; value: T } | { ok: false; error: E };
