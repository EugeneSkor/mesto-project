const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключили плагин для работы с HTML
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин для очистки папки dist перед новой сборкой
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключили плагин для объединения CSS в один файл

module.exports = {
  entry: {
    main: './src/index.js' // указали в какой файл будет собираться весь js и дали ему имя
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },

  mode: 'development', // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    open: true, // сайт будет открываться сам при запуске npm run dev
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080 // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
  },

  module: {
    rules: [ // rules — это массив правил

      { // добавим в него объект правил для бабеля
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader
        exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },

      { // добавим правило для обработки файлов
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/, // регулярное выражение, которое ищет все файлы с такими расширениями
        type: 'asset/resource'
      },

      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        use: [MiniCssExtractPlugin.loader, { // при обработке этих файлов нужно использовать MiniCssExtractPlugin.loader и css-loader
          loader: 'css-loader',
          options: { // объект options для работы с файлами, использующими @import в css
            importLoaders: 1 // Значение 1 говорит о том, что некоторые трансформации PostCSS нужно применить до css-loader.
          }
        },
        'postcss-loader'
        ] // Добавим postcss-loader для уменьшения объёма файлов при загрузке на страницу
        // Перед сборкой удалить импорт файла со стилями в HTML и перенести импорт в index.js (import './styles/index.css'; // добавьте импорт главного файла стилей)
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // использовали для очистки папки dist перед сборкой
    new MiniCssExtractPlugin() // подключение плагина для объединения файлов CSS
  ]

}
