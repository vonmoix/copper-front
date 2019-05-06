const config = require('./config/config.js')
const ip = require('./config/ip.js')
const browserSync = require('browser-sync').create()
const rollup = require('../common/tool/rollup.js')
const postcss = require('../common/tool/postcss.js')
const colors = require('colors')

const isWindows = /^win/.test(process.platform)
const browserSyncConfig = {
    win: {
        open: 'external',
        host: ip,
        proxy: ip,
        port: 3000,
        notify: false
    },
    mac: {
        open: 'external',
        proxy: 'http://localhost/',
        port: 3000,
        notify: false
    }
}
const browserSyncConfigObj = isWindows ? browserSyncConfig.win : browserSyncConfig.mac
browserSyncConfigObj.logLevel = 'silent'

browserSync.init(browserSyncConfigObj)

var startPHP = gD()
var startJS = gD()
var startCSS = gD()

compilePHP()
compileJs()
compileCss()

browserSync.watch(config.php.watch).on('change', compilePHP)
browserSync.watch(config.js.watch).on('change', compileJs)
browserSync.watch(config.css.watch).on('change', compileCss)

function compilePHP () {
    startPHP = gD()
    reload({reloadDest: null, time: {start: startPHP, name: '[PHP]', color: 'magenta'}})
}

function compileJs () {
    startJS = gD()
    rollup({
        env: 'DEV',
        entry: config.js.entry,
        dest: config.js.dest,
        eslint: config.js.eslint,
        callback: _ => {
            reload({reloadDest: config.js.dest, time: {start: startJS, name: '[JS] ', color: 'yellow'}})
        }
    })
}

function compileCss () {
    startCSS = gD()
    postcss({
        entry: config.css.entry,
        dest: config.css.dest,
        autoprefixer: config.css.autoprefixer,
        callback: _ => {
            reload({reloadDest: config.css.dest, time: {start: startCSS, name: '[CSS]', color: 'cyan'}})
        }
    })
}

function reload (opts) {
    showTime(opts.time)
    browserSync.reload(opts.reloadDest)
}

function showTime (time) {
    const duration = ((+new Date() - time.start) / 1000).toFixed(3)
    console.log(colors[time.color](time.name + ' Reloaded in ' + duration + ' secondes'))
}

function gD () {
    return +new Date()
}
