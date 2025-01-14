const path = require('path');
const { override, useEslintRc } = require('customize-cra');

module.exports = {
  stories: [
    '../src/components/*.stories.mdx',
    '../src/components/atoms/**/*.stories.@(tsx|mdx)',
    '../src/components/molecules/**/*.stories.@(tsx|mdx)',
    '../src/components/organisms/**/*.stories.@(tsx|mdx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-links'],
  presets: [
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, '../tsconfig.json'),
        },
      },
    },
  ],
  webpack: override(useEslintRc(path.resolve(__dirname, '../.eslintrc.js'))),
};
