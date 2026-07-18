export enum Environment {
  Development = 'development',
  Local = 'local',
  Staging = 'staging',
  Production = 'production',
}

const VALID_ENVIRONMENTS: readonly string[] = Object.values(Environment);

export function getCurrentEnvironment(): Environment {
  const env = process.env.EXPO_PUBLIC_APP_ENV ?? Environment.Development;
  return VALID_ENVIRONMENTS.includes(env) ? (env as Environment) : Environment.Development;
}

export function isDevelopment(): boolean {
  return getCurrentEnvironment() === Environment.Development;
}

export function isLocal(): boolean {
  return getCurrentEnvironment() === Environment.Local;
}

export function isStaging(): boolean {
  return getCurrentEnvironment() === Environment.Staging;
}

export function isProduction(): boolean {
  return getCurrentEnvironment() === Environment.Production;
}
