// Copyright 2020-present the denosaurs team. All rights reserved. MIT license.

export * as log from "https://deno.land/std@0.78.0/log/mod.ts";

export type {
  LogRecord,
  GenericFunction,
} from "https://deno.land/std@0.78.0/log/logger.ts";

export type {
  LevelName,
} from "https://deno.land/std@0.78.0/log/levels.ts";

export {
  LogLevels,
} from "https://deno.land/std@0.78.0/log/levels.ts";

export { BaseHandler } from "https://deno.land/std@0.78.0/log/handlers.ts";

export {
  setColorEnabled,
  reset,
  bold,
  blue,
  yellow,
  red,
  gray,
  green,
  italic,
} from "https://deno.land/std@0.78.0/fmt/colors.ts";
