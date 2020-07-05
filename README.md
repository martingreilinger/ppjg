# Publish Package JSON Generator

Small package.json generator, used to generate a dedicated package.json for publishing your NPM package

# Quickstart

1. Install the **PPJG** as a development dependenvy:
```bash
node i -D ppjg
```

2. Create a new `ppjg.conf.js` in your project root directory.

3. Define which `package.json` keys to persist and which to override:
```javascript
module.exports = {
  persist: ['author', 'dependencies'],
  alter: {
    version: process.env.VERSION
  }
};
```

4. Run **PPJG** by executing the `generatePublishPackageJson` function or by executing the binary via Node:
```bash
npx ppjg
```
