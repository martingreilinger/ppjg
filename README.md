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
node i -D ppjg
```

- Create a new publish config called `ppj.config.js` in your project root directory.

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

### The Publish Configuration

The publish configuration defines which properties of the projects `package.json` are kept and which will be overwritten.  
By default the publish configuration is defined inside the `ppj.config.js`.  
To provide a differently named configuration, see the [Generator Configuration](#the-generator-configuration) section.

The publish configuration has two main properties:

- `persist` - an array of property names which will be kept inside the publish configuration
- `alter` - an object of new or altered properties and their values

### The Generator Configuration

#### CLI

Configuration via CLI parameter: _[WIP]_

#### Programmatically

When invoking `generatePublishPackageJson` a generator config (`GeneratorConfigModel`) can be supplied.
This config allows the configuration of various properties:

- `publishConfigFileName` - custom config file name (default `ppj.config.js`)
- `outDir` - custom out directory (default `/out`)
- `logger` - custom logger (default `console` logger)
- `ioAdapter` - custom IO functions for file system access (default _nodejs fs_ utils)

## Usage

### Binary

The provided binary offers easy invocation via the _CLI_ or _NPM script_.

**CLI**

Directly execute the binary with `npx`:
```bash
npx ppjg
```

**NPM script**

Create a new script entry invoking the binary:
```json
{
  "scripts": {
    "generatePPJ": "ppjg"
  }
}
```

Run the script:
```bash
npm run generatePPJ
```

### Programmatically

It is also possible to invoke the generator function directly.

```JavaScript
import { generatePublishPackageJson } from 'ppjg';

generatePublishPackageJson();
```
