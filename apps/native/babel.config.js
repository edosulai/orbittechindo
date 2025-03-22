module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-reanimated/plugin",
      ["@babel/plugin-transform-private-property-in-object", { loose: true }],
      ["@babel/plugin-transform-private-methods", { loose: true }],
      "@babel/plugin-syntax-export-default-from",
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-transform-react-jsx",
    ],
  };
};