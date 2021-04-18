module.exports = {
  plugins: {
    'tailwindcss': {},
    'postcss-pxtorem': {
      propList: ['*'],
      minPixelValue: 1,
    },
    'autoprefixer': {},
  },
};
