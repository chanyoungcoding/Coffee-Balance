// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // 이 플러그인은 가장 마지막에 위치해야 합니다.
    ],
  };
};
