module.exports = {
    entry: './src/js/calculator.js',
    output: {
        filename: 'scripts.js'
    },
    //devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] }
                }
            }
        ]
    }
};