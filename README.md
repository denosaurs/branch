# branch

```typescript
import log from "../mod.ts";

await log.setup({ filter: "INFO" });

const logger = log.prefix("hello");

logger.critical("Hello World!");
logger.error("Hello World!");
logger.warning("Hello World!");
logger.info("Hello World!");

logger.debug("Hello World!");
// ^ this should not print
```

## other

### contribution

Pull request, issues and feedback are very welcome. Code style is formatted with deno fmt and commit messages are done following Conventional Commits spec.

### licence

Copyright 2020-present, the denosaurs team. All rights reserved. MIT license.
