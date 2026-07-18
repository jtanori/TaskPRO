export interface CrashReportingService {
  captureException(error: Error, context?: Record<string, unknown>): void;
  captureMessage(message: string, context?: Record<string, unknown>): void;
  setUser(user: { id: string; email?: string } | null): void;
}

export class ConsoleCrashReportingService implements CrashReportingService {
  captureException(error: Error, context?: Record<string, unknown>): void {
    console.error('[CrashReporting] exception', error, context);
  }

  captureMessage(message: string, context?: Record<string, unknown>): void {
    console.warn('[CrashReporting] message', message, context);
  }

  setUser(user: { id: string; email?: string } | null): void {
    console.log('[CrashReporting] setUser', user);
  }
}

export const crashReportingService = new ConsoleCrashReportingService();
