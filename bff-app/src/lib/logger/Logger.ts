import path from 'path';
import winston from 'winston';
import { LoggerInterface } from './LoggerInterface';

/**
 * This is the main Logger Object. You can create a scope logger
 * or directory use the static log methods
 */
export class Logger implements LoggerInterface {
  public static DEFAULT_SCOPE = 'app';

  private scope: string;

  public getScope(): string {
    return this.scope;
  }

  constructor(scope?: string) {
    this.scope = Logger.parsePathToScope(scope || Logger.DEFAULT_SCOPE);
  }

  /**
   * private static method to parse the app filepath to the app scope.
   */
  private static parsePathToScope(filepath: string): string {
    let scope: string;
    if (filepath.indexOf(path.sep) >= 0) {
      scope = filepath
        .replace(process.cwd(), '')
        .replace(`${path.sep}src${path.sep}`, '')
        .replace(`${path.sep}dist${path.sep}`, '')
        .replace('.ts', '')
        .replace('.js', '')
        .replace(`${path.sep}`, ':');
    } else {
      scope = filepath;
    }
    return scope;
  }

  /**
   * private method to format the app scope for the logger.
   */
  private formatScope(): string {
    return `[${this.scope}]`;
  }

  /**
   * private method to log with winston.
   */
  private log(level: string, message: string, args: any[]): void {
    if (winston) {
      winston[level](`${this.formatScope()} ${message}`, args);
    }
  }

  /**
   * public method to log on debug.
   */
  public debug(message: string, ...args: any[]): void {
    this.log('debug', message, args);
  }

  /**
   * public method to log on info.
   */
  public info(message: string, ...args: any[]): void {
    this.log('info', message, args);
  }

  /**
   * public method to log on warn.
   */
  public warn(message: string, ...args: any[]): void {
    this.log('warn', message, args);
  }

  /**
   * public method to log on error.
   */
  public error(message: string, ...args: any[]): void {
    this.log('error', message, args);
  }
}
