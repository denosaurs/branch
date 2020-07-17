// Copyright 2020-present the denosaurs team. All rights reserved. MIT license.

import {
  log,
  reset,
  bold,
  blue,
  yellow,
  red,
  LogRecord,
  LogLevels,
  BaseHandler,
  LevelName,
} from "./deps.ts";

const DEFAULT_HANDLER = "format_fn";

/** Deno logger, but slightly better. */
export class ConsoleHandler extends BaseHandler {
  constructor(level: LevelName, private tag?: string) {
    super(level)
  }
  format(record: LogRecord): string {
    let msg = "";
    switch (record.level) {
      case LogLevels.DEBUG:
        msg += blue(this.tag ?? "[DEBUG]");
        break;
      case LogLevels.INFO:
        msg += blue(this.tag ?? "[INFO]");
        break;
      case LogLevels.WARNING:
        msg += yellow(this.tag ?? "[WARN]");
        break;
      case LogLevels.ERROR:
        msg += red(this.tag ?? "[ERR]");
        break;
      case LogLevels.CRITICAL:
        msg += bold(red(this.tag ?? "[CRIT]"));
        break;
      default:
        break;
    }

    msg += ` ${reset(record.msg)}`;
    return msg;
  }

  log(msg: string): void {
    console.log(msg);
  }
}

/** Modify default deno logger with configurable
 * log level. */
export async function setup(level: LevelName, tag?: string): Promise<void> {
  await log.setup({
    handlers: {
      [DEFAULT_HANDLER]: new ConsoleHandler(level, tag),
    },
    loggers: {
      default: {
        level,
        handlers: [DEFAULT_HANDLER],
      },
    },
  });
}