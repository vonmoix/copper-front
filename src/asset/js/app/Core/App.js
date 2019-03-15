import R from '@ariii/r'
import Support from './Support.js'
import Resize from './Resize.js'
import Router from '../../engine/Router.js'
import P404 from '../Controller/P404.js'
import Main from '../Controller/Main.js'
import Data from '../Bundle/Data/Data.js'
import GLCore from '../Bundle/GL/_GLCore.js'
import GL from '../Bundle/GL/_GL.js'

class App {

    constructor () {
        // Support
        new Support()

        // Service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
        }

        // Scroll top when refresh
        R.TopRefresh()

        // Copper
        const c = Copper

        // Data
        c.data = Data

        // GL
        if (!c.isMobile) {
            c.GLCore = new GLCore()
            c.GL = new GL()
        }

        // Resize
        new Resize()

        // Router
        new Router({
            'p404': P404,
            'main': Main
        })
    }

}

export default App
