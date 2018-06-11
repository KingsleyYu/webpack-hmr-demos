
const webpack = require('webpack')
// const devMiddleware = require('koa-webpack-middleware').devMiddleware
// const hotMiddleware = require('koa-webpack-middleware').hotMiddleware
const devConfig = require('./webpack.config.js')
const compile = webpack(devConfig)
const PORT = 8080
const Koa = require('koa')
const KoaViews = require('koa-views')
const KoaStatic = require('koa-static')
import path from 'path'

const app = new Koa()

app.use(KoaStatic(path.join(__dirname, '/')));
app.use(KoaViews(path.join(__dirname, './views'), {
    extension: 'html'
}));

const devMiddleware = require('koa-webpack-dev-middleware')(compile, {
    publicPath: '/',
    hot: true,
    stats: {
        colors: true,
        children: true,
        modules: false,
        chunks: false,
        chunkModules: false,
    },
    watchOptions: {
        ignored: /node_modules/,
    }
});

app.use(devMiddleware);
const hotMiddleware = require('koa-webpack-hot-middleware')(compile, {
    log: false,
    reload: true
});
app.use(hotMiddleware);


// app.use(devMiddleware(compile, {
//     // display no info to console (only warnings and errors)
//     noInfo: false,

//     // display nothing to the console
//     quiet: false,

//     // switch into lazy mode
//     // that means no watching, but recompilation on every request
//     lazy: false,

//     // watch options (only lazy: false)
//     watchOptions: {
//         aggregateTimeout: 300,
//         poll: true
//     },

//     // public path to bind the middleware to
//     // use the same as in webpack
//     publicPath: "/",

//     stats: {
// 		colors: true
// 	}
// }))
// app.use(hotMiddleware(compile, {
//     log: console.log,
//     path: '/__webpack_hmr',
//     heartbeat: 10 * 1000
// }))

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(async (ctx) => {
    await ctx.render('index.html');
});


const server = app.listen(PORT, 'localhost', (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(`HMR Listening at http://localhost:${PORT}`)
})
process.on('SIGTERM', () => {
    console.log('Stopping dev server')
    // wdm.close()
    server.close(() => {
        process.exit(0)
    })
})