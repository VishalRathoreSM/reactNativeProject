module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@root': './src',
          '@assets': './src/assets',
          '@styles': './src/assets/styles',
          '@constants': './src/constants',
          '@services': './src/services',
          '@helpers': './src/helpers',
          '@store': './src/store',
          '@slices': './src/store/slices',
          '@appComponents': './src/components',
          '@sharedComponents': './src/components/shared',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
