
const Gulp = require('gulp');
const Gutil = require('gulp-util');
const Path = require('path');
const Webpack = require('webpack');


let executionCount = 0;

Gulp.task('webpack', (callback) => {

  const plugins = [
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'core',
      filename: '../core.min.js',
      minSize: 2
    }),
    new Webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': `"${process.env.NODE_ENV}"`
      }
    })
  ];

  let devtool = 'source-map';

  if (process.env.NODE_ENV === 'production') {
    plugins.push(new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));

    devtool = 'cheap-module-source-map';
  }

  const config = {
    watch: global.isWatching,
    entry: {
      student: './client/pages/student/index',
      instructor: './client/pages/instructor/index',
      admin: './client/pages/admin/index',      
      main: './client/pages/main/index'
    },
    output: {
      path: Path.resolve(__dirname, '../public/pages'),
      filename: '[name].min.js'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        Path.resolve(__dirname, '..', 'client'),
        'node_modules'
      ]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [
            Path.resolve(__dirname, '../client')
          ],
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader:'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader:'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  require('autoprefixer')({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9'
                    ],
                    flexbox: 'no-2009'
                  })
                ]
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpg$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    devtool,
    plugins
  };

  Webpack(config, (err, stats) => {

    if (err) {
      throw new Gutil.PluginError('webpack', err);
    }

    Gutil.log('[webpack]', stats.toString({
      colors: true,
      chunkModules: false
    }));

    if (executionCount === 0) {
      callback();
    }

    executionCount += 1;
  });
});
