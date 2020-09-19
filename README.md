# Publish Package JSON Generator [WIP]

[![npm](https://img.shields.io/npm/v/ppjg)](https://www.npmjs.com/package/ppjg) [![NPM](https://img.shields.io/npm/l/ppjg)](https://lbesson.mit-license.org/)

Generate a dedicated `package.json` for publishing without development bloat.

- Only **include properties** you need for publishing
- **Override** development **values**
- **Addition** of new **properties**

## Quick Start

- Install the **ppjg** as a development dependency
````shell script
node i -D ppjg
````
- Create a new publish config called `ppj.config.js` in your project root directory
- Define which `package.json` keys to persist and which to override:
````javascript
module.exports = {
  persist: ['author', 'dependencies'],
  alter: {
    version: process.env.VERSION
  }
};
````
- Run **ppjg** by executing the `generatePublishPackageJson` function or by executing the binary via Node
````shell script
VERSION='V1' npx ppjg
````

## Configuration

### The Publish-Configuration

The publish-configuration defines which properties of the projects `package.json` are kept and which will be overwritten.
By default, the publish-configuration is defined inside the `ppj.config.js`.
To provide a differently named configuration, see the <<_generator_configuration>> section.

The publish-configuration has two main properties:

- `persist` - an array of property names which will be kept inside the publish-configuration
- `alter` - an object of new or altered properties and their values

[#_generator_configuration]
### The Generator Configuration

#### Output Directory

Defines the location of the generated `package.json`

- CLI flags: `-o, --outDir DIRECTORY`
- Programmatically: `{ outDir: DIRECTORY }`

#### Publish Config File

File name of the config used for the generation

- CLI flags: `-c, --config FILE`
- Programmatically: `{publishConfigFileName: FILE}`

## Usage

### Binary

The provided binary offers easy invocation via the _CLI_ or _NPM script_.

#### CLI

- Directly execute the binary with `npx`:
````shell script
npx ppjg [options]
````

#### NPM script

- Create a new script entry invoking the binary:
````json
{
  "scripts": {
    "generatePPJ": "ppjg [options]"
  }
}
````

- Run the script:
````shell script
npm run generatePPJ
````

### Programmatically

- It is also possible to invoke the generator function directly:
````javascript
import { generatePublishPackageJson } from 'ppjg';

generatePublishPackageJson();
````
