const fs = require('fs')
const PackageFile = 'package.json'
const PackageJson = require('../../../' + PackageFile)
const Readline = require('readline')
const colors = require('colors')

// Version reset
const src = 'src/public/index.php'
const content = fs.readFileSync(src, 'utf8')
const versionCurr = +content.match(/VERSION\',\s(.*?)\);/)[1]
const replacement = content.replace('VERSION\', ' + versionCurr + ')', 'VERSION\', 0)')
fs.writeFileSync(src, replacement, 'utf-8')

// Get package.json version
const q = colors.blue('CURRENT VERSION : ' + PackageJson.version + '\r\n') + colors.yellow('NEW VERSION ?\r\n\r\n')
const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.question(q, version => {
    const futureVersion = isInt(version.charAt(0)) ? version : PackageJson.version
    updatePackage(futureVersion)
    rl.close()
})

function isInt (value) {
    if (isNaN(value)) {
        return false
    }
    const x = parseFloat(value)
    return (x | 0) === x
}

function updatePackage (version) {
    PackageJson.version = version

    fs.writeFile(PackageFile, JSON.stringify(PackageJson, null, 4), err => {
        if (err) {
            console.log(err)
        }
    })
}
