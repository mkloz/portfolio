module.exports = {
  'src/**/*.{ts,tsx,js,jsx}': ['prettier --write', 'eslint --fix --quiet --cache --report-unused-disable-directives'],
  '*.{cjs,mjs,json,md,css,html,yml,yaml}': ['prettier --write --ignore-unknown']
};
