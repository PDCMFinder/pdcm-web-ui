const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');


module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],
  webpackFinal: async (baseConfig, { configType }) => {
    const { module = {} } = baseConfig;

    const rules = module.rules.slice();
    rules.forEach(rule => {
      if (rule.oneOf) {
        rule.oneOf = rule.oneOf.filter(r => !rule.test || (rule.test instanceof RegExp && !r.test.test(".scss")));
        rule.oneOf.push({
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader'
            },
          ],
          include: path.resolve(__dirname, '../src/'),
        });
      }
    });

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(rules || [])],
      },
    };
    return newConfig;
  },
}