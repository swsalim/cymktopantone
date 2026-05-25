export const isMaintenanceMode = (): boolean => process.env.MAINTENANCE_MODE === 'true';

export const maintenanceHeaders = {
  'X-Robots-Tag': 'noindex, nofollow',
  'Cache-Control': 'no-store',
} as const;
