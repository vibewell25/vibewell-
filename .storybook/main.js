const path = require('path');

module.exports = {
  stories: ['../packages/ui/**/*.stories.@(js|jsx|ts|tsx)', '../packages/ui/**/*.story.@(js|jsx|ts|tsx)'],
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
    // Add TypeScript path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@vibewell/ui-web': path.resolve(__dirname, '../packages/ui/web'),
      '@vibewell/ui-core': path.resolve(__dirname, '../packages/ui/core'),
      '@vibewell/ui-core-theme': path.resolve(__dirname, '../packages/ui/core/theme'),
      '@vibewell/api': path.resolve(__dirname, '../packages/api'),
    };

    // Handle CSS imports for Tailwind
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
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
}; 