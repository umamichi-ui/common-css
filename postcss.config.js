export default {
  plugins: {
    '@csstools/postcss-oklab-function': {
      preserve: true,
      subFeatures: {
        displayP3: true,
      },
    },
  },
};
