module.exports = function (api) {
  const presets = [
    [
      "@babel/preset-env",
      {
        modules: "commonjs",
        targets: { node: "current" },
        useBuiltIns: false,
        bugfixes: true,
      },
    ],
    ["@babel/preset-react"],
  ];
  const plugins = ["@babel/plugin-transform-modules-commonjs"];

  api.cache.forever();

  return {
    presets,
    plugins,
  };
};
