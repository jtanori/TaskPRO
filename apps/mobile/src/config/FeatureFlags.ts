import { Config } from './Config';
import { Environment } from './Environment';

export interface FeatureFlagConfig {
  enableRealAuth: boolean;
  enableRealPayments: boolean;
  enableRealNotifications: boolean;
  enableAnalytics: boolean;
  enableCrashReporting: boolean;
  enableMaps: boolean;
}

function isRealBackendEnvironment(): boolean {
  return (
    Config.environment === Environment.Staging || Config.environment === Environment.Production
  );
}

export const FeatureFlags: FeatureFlagConfig = {
  enableRealAuth: isRealBackendEnvironment(),
  enableRealPayments: isRealBackendEnvironment(),
  enableRealNotifications: isRealBackendEnvironment(),
  enableAnalytics: isRealBackendEnvironment(),
  enableCrashReporting: isRealBackendEnvironment(),
  enableMaps: Boolean(Config.maps.apiKey),
};
