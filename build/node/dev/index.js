const config = require('./config/config.js')
const ip = require('./config/ip.js')
const browserSync = require('browser-sync').create()
const rollup = require('../common/tool/rollup.js')
const postcss = require('../common/tool/postcss.js')
const colors = require('colors')
const fs = require('fs')

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

compilePHP({newV: false})
compileCss({newV: false})
compileJs({newV: true})

browserSync.watch(config.php.watch).on('change', _ => {
    compilePHP({newV: true})
})
browserSync.watch(config.css.watch).on('change', _ => {
    compileCss({newV: true})
})
browserSync.watch(config.js.watch).on('change', _ => {
    compileJs({newV: true})
})

function compilePHP (o) {
    var startPHP = gD()
    reload({isCSS: false, time: {start: startPHP, name: '[PHP]', color: 'magenta'}, newV: o.newV})
}

function compileJs (o) {
    var startJS = gD()
    rollup({
        env: 'DEV',
        entry: config.js.entry,
        dest: config.js.dest,
        eslint: config.js.eslint,
        callback: _ => {
            reload({isCSS: false, time: {start: startJS, name: '[JS] ', color: 'yellow'}, newV: o.newV})
        }
    })
}

function compileCss (o) {
    var startCSS = gD()
    postcss({
        entry: config.css.entry,
        dest: config.css.dest,
        autoprefixer: config.css.autoprefixer,
        callback: _ => {
            reload({isCSS: true, time: {start: startCSS, name: '[CSS]', color: 'cyan'}, newV: o.newV})
        }
    })
}

function reload (o) {
    if (o.newV) {
        updateVersion()
    }
    showTime(o.time)
    if (o.isCSS) {
        browserSync.reload(config.css.dest)
    } else {
        browserSync.reload()
    }
}

// Update index version for JS, CSS files and pictures versioning
function updateVersion () {
    const src = 'src/public/index.php'
    const content = fs.readFileSync(src, 'utf8')
    const versionCurr = +content.match(/VERSION\',\s(.*?)\);/)[1]
    const replacement = content.replace('VERSION\', ' + versionCurr + ')', 'VERSION\', ' + (versionCurr + 1) + ')')
    fs.writeFileSync(src, replacement, 'utf-8')
}

function showTime (time) {
    const duration = ((+new Date() - time.start) / 1000).toFixed(3)
    console.log(colors[time.color](time.name + ' Reloaded in ' + duration + ' secondes'))
}

function gD () {
    return +new Date()
}
