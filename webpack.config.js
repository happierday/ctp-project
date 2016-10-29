const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const webpack = require('webpack');

module.exports = {
    entry: {
        'domain-create': path.join(__dirname, 'src', 'javascripts', 'domain-create.js')
    },
    output: {
        path: path.join(__dirname, 'assets', 'build', 'javascripts'),
        publicPath: '/javascripts/',
        filename: "[name]-[chunkhash].js"
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins: [
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        function updatePugAssets() { //Hashes css files for cache busting and updates asset paths in pug files
            this.plugin("done", function (statsData) {
                const stats = statsData.toJson();

                if (!stats.errors.length) {
                    const pugFiles = fs.readdirSync(path.join(__dirname, 'views'), "utf8");
                    const buildFiles = fs.readdirSync(path.join(__dirname, 'assets', 'build'), "utf8")
                        .map((folder) =>fs.readdirSync(path.join(__dirname, 'assets', 'build', folder), "utf8"))
                        .reduce((fileArrayA, fileArrayB) => fileArrayA.concat(fileArrayB));

                    pugFiles.forEach(function (file) {
                        const pug = fs.readFileSync(path.join(__dirname, 'views', file), "utf8");
                        const assetName = file.substr(0, file.length - 4);

                        const relevantBuiltFiles = buildFiles.filter((file) => file.startsWith(assetName));

                        relevantBuiltFiles.forEach((newFileName) => {
                            const separatorSplit = newFileName.split('.');
                            const extensionName = separatorSplit[separatorSplit.length - 1];

                            if (extensionName === 'css') {
                                const oldName = newFileName;
                                newFileName = newFileName.replace('.css', '-' + crypto.createHash('md5').update(fs.readFileSync(path.join(__dirname, 'assets', 'build', 'stylesheets', newFileName), "utf8")).digest('hex') + '.css');
                                fs.renameSync(path.join(__dirname, 'assets', 'build', 'stylesheets', oldName), path.join(__dirname, 'assets', 'build', 'stylesheets', newFileName));
                            }

                            const pugOutput = pug.replace(new RegExp(assetName + '\..+\.' + extensionName, 'i'), newFileName);
                            fs.writeFileSync(path.join(__dirname, 'views', file), pugOutput);
                        });
                    });
                }
            });
        }
    ]
};
