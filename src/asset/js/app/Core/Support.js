import R from '@ariiiman/r'

class Support {

    constructor () {
        const glSupport = this.glTest()

        if (R.Snif.isIEolderThan11 || R.Snif.isSafariOlderThan8) {
            R.Dom.html.className = 'old-browser'
        } else if (glSupport === false) {
            R.Dom.html.className = 'no-gl'
        }

        const c = Copper
        c.isMobile = R.Snif.isMobile
        const bClass = c.isMobile ? 'mobile' : 'desktop'
        R.Dom.body.className = 'is-' + bClass
    }

    glTest () {
        try {
            const c = document.createElement('canvas')
            return !!window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))
        } catch (e) {
            return false
        }
    }

}

export default Support
