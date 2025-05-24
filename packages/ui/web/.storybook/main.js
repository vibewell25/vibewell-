const path = require('path');

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)', '../stories/**/*.story.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
  },
  webpackFinal: async (config) => {
    // Add TypeScript path aliases based on root tsconfig
    config.resolve.alias = {
      ...config.resolve.alias,
      '@vibewell/ui-web': path.resolve(__dirname, '..'),
      '@vibewell/ui-core': path.resolve(__dirname, '../../core'),
      '@vibewell/ui-core-theme': path.resolve(__dirname, '../../core/theme'),
      '@vibewell/api': path.resolve(__dirname, '../../../api'),
    };
    
    // Handle CSS with postcss for Tailwind support
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../..'),
    });

    // Return the altered config
    return config;
  },
};

module.exports = config; 