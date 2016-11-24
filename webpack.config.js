const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rimraf = require('rimraf');
const sass = require('node-sass');

const webpack = require('webpack');

const PATHS = {
    javascripts: path.join(__dirname, 'src', 'javascripts'),
    stylesheets: path.join(__dirname, 'src', 'stylesheets'),
    builtJavascripts: path.join(__dirname, 'assets', 'build', 'javascripts'),
    builtStylesheets: path.join(__dirname, 'assets', 'build', 'stylesheets')
};

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (directoryExists(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function directoryExists(path) {
    try {
        return fs.statSync(path).isDirectory();
    }
    catch (err) {
        return false;
    }
}

module.exports = {
    entry: {
        'domain': path.join(PATHS.javascripts, 'domain', 'domain.js')
    },
    output: {
        path: PATHS.builtJavascripts,
        publicPath: '/javascripts/',
        filename: "[name]-[chunkhash].js"
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.scss$/, loader: "sass-loader!style-loader!css-loader"},
            {test: /\.pug$/, loader: "pug-loader"}
        ]
    },
    plugins: [
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        function () {
            rimraf.sync(path.join(__dirname, 'assets', 'build'));

            function includingWatchFileSystem(wfs, paths) {
                this.wfs = wfs;
                this.paths = paths.map((p) => path.join(__dirname, p));
                return {
                    watch: (files, dirs, missing, startTime, options, callback, callbackUndelayed)=> {
                        this.wfs.watch(
                            files.concat(this.paths.map((p) => fs.readdirSync(p).map((file) => path.join(p, file))).reduce((a, b) => a.concat(b))),
                            dirs.concat(this.paths), missing, startTime, options, function (err, filesModified, dirsModified, missingModified, fileTimestamps, dirTimestamps) {
                                if (err) {
                                    callback(err);
                                    return;
                                }

                                if (filesModified.some((file) => file.endsWith('.scss'))) {
                                    rimraf.sync(PATHS.builtStylesheets);
                                }

                                callback(err, filesModified, dirsModified, missingModified, fileTimestamps, dirTimestamps);
                            }, callbackUndelayed);
                    }
                }
            }

            this.plugin('after-environment', function watchSassFiles() {
                this.watchFileSystem = includingWatchFileSystem(this.watchFileSystem, ['src/stylesheets']);
            });

            this.plugin("done", function minifyCssAndUpdatePugAssets(statsData) { //Minifies and hashes css files for cache busting and updates asset paths in pug files
                const stats = statsData.toJson();

                if (!stats.errors.length) {
                    const stylesheets = fs.readdirSync(PATHS.stylesheets)
                        .map((scss) => {
                            if (!scss.endsWith('.scss') || scss.startsWith('_')) {
                                return undefined;
                            }
                            try {
                                return {
                                    name: scss.substr(0, scss.length - 5),
                                    output: sass.renderSync({
                                        file: path.join(PATHS.stylesheets, scss),
                                        outputStyle: 'compressed'
                                    }).css
                                }
                            } catch (e) {
                                console.error(e);
                                return undefined;
                            }
                        });

                    stylesheets.forEach((stylesheet) => {
                        if (stylesheet === undefined) {
                            return;
                        }

                        const name = stylesheet.name + '-' + crypto.createHash('md5').update(stylesheet.output).digest('hex') + '.css';
                        const filePath = path.join(PATHS.builtStylesheets, name);
                        ensureDirectoryExistence(filePath);
                        fs.writeFile(filePath, stylesheet.output);
                    });

                    console.log('SASS rendered!');

                    const pugFiles = fs.readdirSync(path.join(__dirname, 'views'));
                    let buildFiles = fs.readdirSync(path.join(__dirname, 'assets', 'build'))
                        .map((folder) => fs.readdirSync(path.join(__dirname, 'assets', 'build', folder)))
                        .reduce((fileArrayA, fileArrayB) => fileArrayA.concat(fileArrayB));

                    const builtKeys = Object.keys(stats.assetsByChunkName);
                    const oldFiles = buildFiles.filter((file) => {
                        if (!file.endsWith('.js')) {
                            return false;
                        }

                        for (const key of builtKeys) {
                            if (file.startsWith(key)) {
                                return stats.assetsByChunkName[key] !== file;
                            }
                        }

                        return false;
                    });
                    oldFiles.forEach((file) => rimraf.sync(path.join(PATHS.builtJavascripts, file)));

                    buildFiles = buildFiles.filter((file) => !oldFiles.includes(file));

                    pugFiles.forEach(function (file) {
                        let pug = fs.readFileSync(path.join(__dirname, 'views', file), 'utf8');
                        const assetName = file.substr(0, file.length - 4);

                        const relevantBuiltFiles = buildFiles.filter((file) => file.startsWith(assetName));

                        relevantBuiltFiles.forEach((newFileName) => {
                            const separatorSplit = newFileName.split('.');
                            const extensionName = separatorSplit[separatorSplit.length - 1];

                            pug = pug.replace(new RegExp(assetName + '\-[a-z0-9]+\.' + extensionName), newFileName);
                        });

                        fs.writeFileSync(path.join(__dirname, 'views', file), pug);
                    });
                }
            });
        }
    ]
};
