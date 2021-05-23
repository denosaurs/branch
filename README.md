# branch

[![Tags](https://img.shields.io/github/release/denosaurs/branch)](https://github.com/denosaurs/branch/releases)
[![CI Status](https://img.shields.io/github/workflow/status/denosaurs/branch/check)](https://github.com/denosaurs/branch/actions)
[![Dependencies](https://img.shields.io/github/workflow/status/denosaurs/branch/depsbot?label=dependencies)](https://github.com/denosaurs/depsbot)
[![License](https://img.shields.io/github/license/denosaurs/branch)](https://github.com/denosaurs/branch/blob/master/LICENSE)

```typescript
import * as log from "https://deno.land/x/branch/mod.ts";

await log.setup({ filter: "INFO" });

const logger = log.prefix("hello");

logger.critical("Hello World!");
logger.error("Hello World!");
logger.warning("Hello World!");
logger.info("Hello World!");

logger.debug("Hello World!");
// ^ this should not print
```

## Maintainers

- Filippo Rossi ([@qu4k](https://github.com/qu4k))

## Other

### Contribution

Pull request, issues and feedback are very welcome. Code style is formatted with
`deno fmt` and commit messages are done following Conventional Commits spec.

### Licence
2020-2021
Copyright 2020-present, the denosaurs team. All rights reserved. MIT license.
