const autoprefixer = require('autoprefixer'); // Плагин для добавления вендорных префиксов
const cssnano = require('cssnano'); // плагин модификации css

module.exports = {
  // подключите плагины к PostCSS
  plugins: [
    // подключите autoprefixer
    autoprefixer,
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
};
