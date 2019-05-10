const config = require('./config/config.js')
const bs = require('browser-sync').create()
const rollup = require('../common/tool/rollup.js')
const postcss = require('../common/tool/postcss.js')
const colors = require('colors')
const fs = require('fs')

function compilePHP (o) {
    reload({isCSS: false, time: {start: o.startTime, name: '[PHP]', color: 'magenta'}, newV: o.newV})
}

function compileJs (o) {
    rollup({
        env: 'DEV',
        entry: config.js.entry,
        dest: config.js.dest,
        eslint: config.js.eslint,
        callback: _ => {
            reload({isCSS: false, time: {start: o.startTime, name: '[JS] ', color: 'yellow'}, newV: o.newV})
        }
    })
}

function compileCss (o) {
    postcss({
        entry: config.css.entry,
        dest: config.css.dest,
        autoprefixer: config.css.autoprefixer,
        callback: _ => {
            reload({isCSS: true, time: {start: o.startTime, name: '[CSS]', color: 'cyan'}, newV: o.newV})
        }
    })
}

function reload (o) {
    if (o.newV) {
        updateVersion()
    }
    showTime(o.time)
    if (o.isCSS) {
        bs.reload(config.css.dest)
    } else {
        bs.reload()
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
    let timeMsg = ''
    if (time.start !== 0) {
        const duration = ((+new Date() - time.start) / 1000).toFixed(3)
        timeMsg = ' in ' + duration + ' secondes'
    }
    console.log(colors[time.color](time.name + ' Built' + timeMsg))
}

function gD () {
    return +new Date()
}

// -----------------------

const bsConfig = {
    open: 'external',
    port: 3000,
    notify: false,
    logLevel: 'silent'
}
// Windows
if (/^win/.test(process.platform)) {
    const ip = '10.0.75.1'
    bsConfig.host = ip
    bsConfig.proxy = ip
// Mac
} else {
    bsConfig.proxy = 'http://localhost/'
}
bs.init(bsConfig)

// -----------------------

compilePHP({startTime: 0, newV: false})
compileCss({startTime: 0, newV: false})
compileJs({startTime: 0, newV: true})

bs.watch(config.php.watch).on('change', _ => {
    compilePHP({startTime: 0, newV: true})
})
bs.watch(config.css.watch).on('change', _ => {
    const startTime = gD()
    compileCss({startTime: startTime, newV: true})
})
bs.watch(config.js.watch).on('change', _ => {
    const startTime = gD()
    compileJs({startTime: startTime, newV: true})
})
