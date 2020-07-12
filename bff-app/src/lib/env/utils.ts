import { join } from 'path';
import { json } from 'express';

/**
 * Public function to get required OS environment variable.
 */
export const getOsEnv = (key: string): string => {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return process.env[key] as string;
};

/**
 * Public function to get optional OS environment variable.
 */
export const getOsEnvOptional = (key: string): string | undefined => {
  return process.env[key] as string;
};

/**
 * Public function to get the path.
 */
export const getPath = (path: string): string => {
  return process.env.NODE_ENV === 'production'
    ? join(process.cwd(), path.replace('src/', 'dist/').slice(0, -3), '.js')
    : join(process.cwd(), path);
};

/**
 * Public function to get the paths.
 */
export const getPaths = (paths: string[]): string[] => {
  return paths.map((path) => getPath(path));
};

/**
 * Public function to get the environment variables from key.
 */
export const getOsEnvArray = (key: string, delimiter = ','): string[] => {
  return (getOsEnv(key) && getOsEnv(key).split(delimiter)) || [];
};

/**
 * Public function to get the path regarding with key for environment variable.
 */
export const getOsPath = (key: string): string => {
  return getPath(getOsEnv(key));
};

/**
 * Public function to get the paths regarding with key for environment variable.
 */
export const getOsPaths = (key: string): string[] => {
  return getPaths(getOsEnvArray(key));
};

/**
 * Public function to parse string to number.
 */
export const toNumber = (value: string): number => {
  return parseInt(value, 10);
};

/**
 * Public function to parse string to boolean.
 */
export const toBool = (value: string): boolean => {
  return value === 'true';
};

/**
 * Public function to normalize port.
 */
export const normalizePort = (port: string): number => {
  const parsedPort = toNumber(port);
  if (parsedPort >= 0) {
    return parsedPort;
  }
  throw new Error(`Setting port is not invalid.`);
};
