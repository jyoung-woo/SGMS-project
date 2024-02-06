const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const appDir = fs.realpathSync(process.cwd());
module.exports = {
    mode: 'production',
    entry: {
        main: [path.resolve(appDir, 'front/main/main.js')],
        test: [path.resolve(appDir, 'front/test/index.js')],
        siteList: [path.resolve(appDir, 'front/information/siteList.js')],
		siteInfo: [path.resolve(appDir, 'front/information/siteInfo.js')],
        leftMenu: [path.resolve(appDir, 'front/leftMenu/leftMenu.js')],
        userMng: [path.resolve(appDir, 'front/user/userMng.js')],
        realTime: [path.resolve(appDir, 'front/realTime/realTime.js')],
        obsvData: [path.resolve(appDir, 'front/obsvData/obsvData.js')],
        obsvWeather: [path.resolve(appDir, 'front/obsvData/obsvWeather.js')],
        obsvCompare: [path.resolve(appDir, 'front/obsvData/obsvCompare.js')],
        comnChart: [path.resolve(appDir, 'front/chart/comnChart.js')]
    },

    output: {
        filename: '[name]/[name].js',
        environment: {
            arrowFunction: false,
        },
        library: 'SGMS',
        libraryTarget: 'umd',
        chunkFilename: 'chunks/[name].[contenthash].js',
        path: path.resolve(appDir, 'src/main/webapp/resources', 'js'),
    },

    optimization: {
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
            },
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
            })
        ]
    }, resolve: {
        fallback: {
            "zlib": false,
            "http": false,
            "https": require.resolve("https-browserify"),
            "url": false,
            "buffer": false,
            "assert": require.resolve("assert")

        }
    },
    module: {
        rules: [{
            test: /\.m?js/,
            resolve: {
                fullySpecified: false
            },
        },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },]
    },
};