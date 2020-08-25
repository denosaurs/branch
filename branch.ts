// Copyright 2020-present the denosaurs team. All rights reserved. MIT license.

import {
  log,
  reset,
  bold,
  blue,
  yellow,
  green,
  red,
  gray,
  italic,
  LogRecord,
  LogLevels,
  BaseHandler,
  LevelName,
} from "./deps.ts";

export declare interface LogConfig {
  /** Disables logging */
  quiet?: boolean;
  /** Enables debugging */
  debug?: boolean;
  /** Clear the console on reload events */
  fullscreen?: boolean;
}

/** Logger tag */
const TAG = `${bold("[denon]")}`;

const DEBUG_LEVEL = "DEBUG";
const QUIET_LEVEL = "ERROR";
const DEFAULT_LEVEL = "INFO";

const DEFAULT_HANDLER = "format_fn";

/** Deno logger, but slightly better. */
export class ConsoleHandler extends BaseHandler {
  format(record: LogRecord): string {
    if (record.args.length === 0) throw new Error("Logger Error");
    let msg = "";
    let tag = TAG;
    let op = record.args[0] as string;
    let error: Error | undefined = undefined;

    switch (record.level) {
      case LogLevels.DEBUG:
        tag = green("[&]");
        break;
      case LogLevels.INFO:
        tag = blue("[*]");
        break;
      case LogLevels.WARNING:
        tag = yellow("[!]");
        break;
      case LogLevels.ERROR:
        tag = red("[E]");
        error = record.args[1] as Error;
        break;
      case LogLevels.CRITICAL:
        tag = bold(red("[@]"));
        error = record.args[1] as Error;
        break;
    }

    let action = gray(`[${italic(op)}]`);

    msg += tag;
    msg += ` ${action}`;
    msg += ` ${reset(record.msg)}`;

    if (error) {
      msg += `\n`;
      msg += `${bold(red("error"))}: Uncaught `;
      msg += Deno.inspect(error);
    }

    return msg;
  }

  log(msg: string): void {
    console.log(msg);
  }
}

interface LogOptions {
  filter: LevelName;
}

/** Modify default deno logger with configurable
 * log level. */
export async function setup({ filter }: LogOptions): Promise<void> {
  await log.setup({
    handlers: {
      [DEFAULT_HANDLER]: new ConsoleHandler(DEBUG_LEVEL),
    },
    loggers: {
      default: {
        level: filter,
        handlers: [DEFAULT_HANDLER],
      },
    },
  });
}

type Message<T> = (T extends Function ? never : T) | (() => T);

function debug<T>(msg: Message<T>, op?: string): T | undefined {
  // Assist TS compiler with pass-through generic type
  op = op ?? "main";
  if (msg instanceof Function) {
    return log.debug(msg, op);
  }
  return log.debug(msg, op);
}

function info<T>(msg: Message<T>, op?: string): T | undefined {
  // Assist TS compiler with pass-through generic type
  op = op ?? "main";
  if (msg instanceof Function) {
    return log.info(msg, op);
  }
  return log.info(msg, op);
}

function warning<T>(msg: Message<T>, op?: string): T | undefined {
  // Assist TS compiler with pass-through generic type
  op = op ?? "main";
  if (msg instanceof Function) {
    return log.warning(msg, op);
  }
  return log.warning(msg, op);
}

function error<T>(
  msg: Message<T>,
  op?: string,
  error?: Error,
): T | undefined {
  // Assist TS compiler with pass-through generic type
  op = op ?? "main";
  error = error ?? undefined;
  if (msg instanceof Function) {
    return log.error(msg, op, error);
  }
  return log.error(msg, op, error);
}

function critical<T>(
  msg: Message<T>,
  op?: string,
  error?: Error,
): T | undefined {
  // Assist TS compiler with pass-through generic type
  op = op ?? "main";
  error = error ?? undefined;
  if (msg instanceof Function) {
    return log.critical(msg, op, error);
  }
  return log.critical(msg, op, error);
}

export function prefix<T>(op: string) {
  return {
    debug: (msg: Message<T>) => debug(msg, op),
    info: (msg: Message<T>) => info(msg, op),
    warning: (msg: Message<T>) => warning(msg, op),
    error: (msg: Message<T>, err?: Error) => error(msg, op, err),
    critical: (msg: Message<T>, err?: Error) => critical(msg, op, err),
  };
}
