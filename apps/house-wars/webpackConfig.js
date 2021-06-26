
module.exports = (config, context) => {
  console.log(JSON.stringify(config.module.rules));
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.scss$/i,
          use: 'typings-for-css-modules-loader?modules&sass',
        },
      ],
    },
  };
};
