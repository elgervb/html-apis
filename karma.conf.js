/* global require */
const path = require('path');

const reporters = ['spec'];
if (!process.env.DEBUG) { 
    reporters.push('coverage');
}

module.exports = (config) => {
    config.set({
        // base path used to resolve all patterns
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files/patterns to load in the browser
        files: [{ pattern: 'spec.bundle.js', watched: false }],

        // files to exclude
        exclude: [],

        plugins: [
            'karma-coverage',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-ie-launcher',
            'karma-opera-launcher',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-spec-reporter',
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: { 'spec.bundle.js': ['webpack', 'sourcemap'] },

        webpack: {
            babel: {
                presets: ['es2015', 'stage-0'],
            },
            isparta: {
                embedSource: true,
                noAutoWrap: true,
                babel: {
                    presets: ['es2015', 'stage-0'],
                },
            },
            devtool: 'source-map',
            module: {
                preLoaders: [
                    // transpile all files except testing sources with babel as usual
                    {
                        test: /\.js$/,
                        exclude: [
                            path.resolve('src'),
                            path.resolve('node_modules/'),
                        ],
                        loader: 'babel',
                    },
                    // transpile and instrument only testing sources with babel-istanbul
                    {
                        test: /\.js$/,
                        include: process.env.DEBUG ? path.resolve('__noop') : path.resolve('src'),
                        loader: 'babel-istanbul',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                ],
                loaders: [
                    { test: /\.js/, exclude: [/app\/lib/, /node_modules/], loader: 'babel' },
                    { test: /\.html/, loader: 'raw' },
                    { test: /\.scss$/, loader: 'style!css!sass' },
                    { test: /\.css$/, loader: 'style!css' },
                    { 
                        test: /\.(jpe?g|png|gif|svg)$/i,
                        loaders: [
                            'file?hash=sha512&digest=hex&name=[hash].[ext]',
                            'image-webpack',
                        ],
                    },
                ],
                imageWebpackLoader: {
                    pngquant: {
                        quality: '65-90',
                        speed: 4,
                    },
                    svgo: {
                        plugins: [
                            {
                                removeViewBox: false,
                            },
                            {
                                removeEmptyAttrs: false,
                            },
                        ],
                    },
                },
            },
        },

        webpackServer: {
            noInfo: true, // prevent console spamming when running in Karma!
        },

        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters,

        // web server port
        port: 9876,

        // enable colors in the output
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || 
        //    config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // toggle whether to watch files and re-run tests upon incurring changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'], // 'Chrome', 'Crome_without_security', 'Firefox', 'IE', 'Opera', 'PhantomJS'

        // if true, Karma runs tests once and exits
        singleRun: true,
        coverageReporter: {
            dir: 'reports/coverage',
            reporters: [
                { type: 'html', subdir: 'html' },
                // { type: 'lcov', subdir: 'report-lcov' },
                // // reporters supporting the `file` property, use `subdir` to directly 
                // // output them in the `dir` directory 
                // { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
                // { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
                // { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
                // { type: 'text', subdir: '.', file: 'text.txt' },
                // { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
                { type: 'text' },
                { type: 'text-summary' },
            ],
            instrumenterOptions: {
                istanbul: { noCompact: true },
            },
        },
    });
};
