/*

CLASS
─────

Class "_tb"     →    targetBlank W3C compatible (target blank)
Class "_tbs"    →    targetBlank W3C compatible except for safari (target blank safari)
Class "_ost"    →    open link in same tab without prevent default (open same tab)

PENRYN
──────

is404
path
target
outroIsOn
done
xhr

*/

import R from '@ariiiman/r'
import Xhr from './Xhr.js'
import EventDelegation from './EventDelegation.js'

class Router {

    constructor (o) {
        // Parameters
        const c = Copper

        // Outro is on : paralyse outro method during animations
        c.outroIsOn = false

        c.path = {new: location.pathname}

        // On popstate
        Xhr.onPopstate()

        // Controller + EventDelegation
        this.p404Controller = o.p404
        this.MainController = o.main

        const Controller = this.getController()

        // Event delegation
        R.BM(this, ['getController'])
        new EventDelegation(this.getController)

        // Preload
        Controller.preload()
    }

    getController () {
        return !document.querySelector('meta[name=description]') ? this.p404Controller : this.MainController
    }

}

export default Router
