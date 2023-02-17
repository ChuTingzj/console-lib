import { resolve } from 'path';
import type { Configuration } from 'webpack';
module.exports = () => {
  return {
    target: 'node',
    mode: 'production',
    entry: resolve(__dirname, './index.ts'),
    output: {
      publicPath: '/',
      clean: true,
      path: resolve(__dirname, './dist'),
      filename: 'index.js',
      library: {
        name: '@console/utils',
        type: 'umd'
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      },
      extensions: ['.ts', '.d.ts', '...']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-typescript'],
                plugins: ['@babel/plugin-transform-typescript']
              }
            },
            {
              loader: 'ts-loader',
            }
          ]
        },
      ]
    }
  } satisfies Configuration;
};