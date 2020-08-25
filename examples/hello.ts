import log from "../mod.ts";

await log.setup({ filter: "INFO" });

const logger = log.prefix("hello");

logger.critical("Hello World!");
logger.error("Hello World!");
logger.warning("Hello World!");
logger.info("Hello World!");

logger.debug("Hello World!");
// ^ this should not print