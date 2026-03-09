module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo"]],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "react-native-unistyles/plugin",
        {
          root: "src",
          autoProcessPaths: [
            "react-native-gesture-handler/src/components",
            "react-native-gesture-handler/lib/module/components",
          ],
        },
      ],
      "@lingui/babel-plugin-lingui-macro",
    ],
  };
};
