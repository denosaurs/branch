import * as log from "../mod.ts";

await log.setup({ filter: "INFO" });

const logger = log.create("hello");

logger.critical("Hello World!");
logger.error("Hello World!");
logger.warning("Hello World!");
logger.info("Hello World!");

logger.debug("Hello World!");
// ^ this should not print

const logger2 = log.create();

logger2.critical("Hello World!");
logger2.error("Hello World!");
logger2.warning("Hello World!");
logger2.info("Hello World!");

logger2.debug("Hello World!");
