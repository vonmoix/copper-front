const config = require('../config/config.js')
const fs = require('fs')

module.exports = o => {
    const v = '?<?= VERSION; ?>'
    const replacement = o.type === 'js' ? '<script>' + o.content + '</script>' : '<style>' + o.content + '</style>'
    const toReplace = o.type === 'js' ? '<script src="/' + config.minify.js + v + '"></script>' : '<link rel="stylesheet" href="/' + config.minify.css + v + '">'

    function writeInternal (i) {
        const file = config.dest + config.internal[i]
        const currentContent = fs.readFileSync(file, 'utf8')
        const newContent = currentContent.replace(toReplace, _ => { return replacement }) // Function as second parameter for escape $& replace pattern

        fs.writeFileSync(file, newContent, 'utf-8')

        if (i === config.internal.length - 1) {
            o.callback()
        } else {
            writeInternal(i + 1)
        }
    }

    writeInternal(0)
}
