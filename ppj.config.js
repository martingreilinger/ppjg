module.exports = {
  persist: [
    'author',
    'description',
    'keywords',
    'license',
    'name',
    'repository',
    'version',
  ],
  alter: {
    bin: './cli.js',
    main: './index.js',
  },
};
