const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs') // Solve problems of node modules import
const resolve = require('rollup-plugin-node-resolve') // Solve problems of node modules import
const eslint = require('rollup-plugin-eslint')
const colors = require('colors')
const showError = require('./showError')

module.exports = opts => {
    const isPROD = opts.env === 'PROD'
    const modules = ['node_modules/**', '**/R.js']

    // Rollup plugins
    const plugins = [
        eslint.eslint({
            configFile: opts.eslint,
            exclude: modules
        }),
        resolve(),
        commonjs({
            include: modules
        })
    ]
    if (isPROD) {
        plugins[3] = babel({
            babelrc: false,
            presets: [['@babel/preset-env', { 'modules': false }]]
        })
    }

    // Bundle write options
    const bWO = {
        intro: 'window.Copper={};',
        file: opts.dest
    }
    bWO.format = isPROD ? 'iife' : 'esm'

    // Rollup
    rollup.rollup({
        input: opts.entry,
        plugins: plugins
    }).then(bundle => {
        bundle.write(bWO)
    }).then(() => {
        opts.callback()
    }).catch(error => {
        showError(error)
    })
}
