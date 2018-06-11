const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    // entry: `${__dirname}/app/main.js`,
    // entry: [
    //     'react-hot-loader/patch',
    //     'webpack-dev-server/client?http://localhost:3000',
    //     'webpack/hot/only-dev-server', //HRM更新时刷新整个页面，如果是only-dev-server是手动刷新
    //     `${__dirname}/app/main.js`
    // ],
    entry: {
        'index': [
            // For old browsers
            'eventsource-polyfill',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false',
            'react-hot-loader/patch',
            `${__dirname}/app/App.js`
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: `${__dirname}/build`,
        publicPath: '/'// webpack-dev-server服务上的文件是相对publicPath这个路径的，用于设置热加载的服务器
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 启用 HMR
        new webpack.NamedModulesPlugin(),// prints more readable module names in the browser console on HMR updates
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    resolve: {
        // 定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {

                    }
                }
            }
        ]
    }
}