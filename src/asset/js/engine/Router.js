/*

CLASS
─────

"_tb"     →    targetBlank W3C compatible (target blank)
"_ost"    →    open link in same tab without prevent default (open same tab)

COPPER PROPERTIES
─────────────────

isLocal
path
target
outroIsOn
done
xhr

*/

import R from '@ariii/r'
import Xhr from './Xhr.js'
import EventDelegation from './EventDelegation.js'

class Router {

    constructor (o) {
        const c = Copper

        // Outro is on : paralyse outro method during animations
        c.outroIsOn = false

        // Is local
        const host = location.hostname
        c.isLocal = host === '10.0.75.1' || host === 'localhost'

        // Path
        c.path = {new: location.pathname}

        // On popstate
        Xhr.onPopstate()

        // Controller
        const p404Controller = o.p404
        const MainController = o.main

        // Event delegation
        new EventDelegation(getC)

        // Preload
        getC().preload()

        // Get Controller
        function getC () {
            return !document.querySelector('meta[name=description]') ? p404Controller : MainController
        }
    }

}

export default Router
