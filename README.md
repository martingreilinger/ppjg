# Publish Package JSON Generator [WIP]

[![npm version](https://badge.fury.io/js/ppjg.svg)](https://badge.fury.io/js/ppjg) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

Generate a dedicated `package.json` for publishing without development bloat.

How can the _generate file_ be _altered_?

- Only **include properties** you need for publishing
- **Override** development **values**
- **Add** new **properties**

## Quick Start

- Install the **ppjg** as a development dependency:
```bash
node i -D ppjgm
```

- Create a new `ppjg.conf.js` in your project root directory.

- Define which `package.json` keys to persist and which to override:
```JavaScript
module.exports = {
  persist: ['author', 'dependencies'],
  alter: {
    version: process.env.VERSION
  }
};
```

- Run **ppjg** by executing the `generatePublishPackageJson` function or by executing the binary via Node:
```bash
VERSION='V1' npx ppjg
```

## Configuration

_[WIP]_

## Usage

Note: Currently an `out` directory is **required**!

### Binary

The provided binary offers easy invocation via the _CLI_ or _NPM script_.

**CLI**
```bash
npx ppjg
```

**NPM script**
```json
{
  "scripts": {
    "generatePPJ": "ppjg"
  }
}
```
```bash
npm run generatePPJ
```

### Programmatically

It is also possible to invoke the generator function directly.

**Pre ES6**
```JavaScript
const ppjg = require('ppjg');

ppjg.generatePublishPackageJson();

```

**Using ES6 modules**
```JavaScript
// import the function directly
import {generatePublishPackageJson} from 'ppjg';

generatePublishPackageJson();

// using the default export
import generatePublishPackageJson from 'ppjg';
generatePublishPackageJson();
```
