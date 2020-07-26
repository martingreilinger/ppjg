module.exports = {
  persist: [
    'author',
    'description',
    'devDependencies',
    'keywords',
    'license',
    'name',
    'repository',
    'version'
  ],
  alter: {
    bin: './cli.js'
  }
};
