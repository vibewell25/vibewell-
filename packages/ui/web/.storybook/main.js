const path = require('path');

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  webpackFinal: async (config) => {
    // TypeScript & TSX support
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-typescript')
            ]
          }
        }
      ],
      include: path.resolve(__dirname, '../components'),
    });

    // Find the existing CSS rules
    const cssRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('css')
    );
    
    // Replace if found
    if (cssRule) {
      const index = config.module.rules.indexOf(cssRule);
      config.module.rules.splice(index, 1, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, '../postcss.config.js'),
              },
            },
          },
        ],
        include: path.resolve(__dirname, '..'),
      });
    } else {
      // Add a new rule if no CSS rule found
      config.module.rules.push({
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, '../postcss.config.js'),
              },
            },
          },
        ],
        include: path.resolve(__dirname, '..'),
      });
    }

    // Resolve aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@vibewell/ui-web': path.resolve(__dirname, '..'),
      '@vibewell/ui-native': path.resolve(__dirname, '../../native/src'),
      '@vibewell/api': path.resolve(__dirname, '../../../api/src'),
    };
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
  staticDirs: ['../public'],
};

module.exports = config; 