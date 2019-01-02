import R from '@ariiiman/r'
import Xhr from './Xhr.js'

class EventDelegation {

    constructor (getController) {
        // Opts
        this.getController = getController

        // Parameters
        this.c = Copper
        this.xhr = R.G.id('xhr')

        // Bind
        R.BM(this, ['eventDelegation', 'done', 'xhrCallback'])

        R.L(R.Dom.body, 'add', 'click', this.eventDelegation)
    }

    eventDelegation (event) {
        const w = window
        let target = event.target
        let targetIsATag = false
        let targetIsASubmit = false

        while (target) {
            if (target.tagName === 'A') {
                targetIsATag = true
                break
            } else if ((target.tagName === 'INPUT' || target.tagName === 'BUTTON') && target.type === 'submit') {
                targetIsASubmit = true
                break
            }
            target = target.parentNode
        }

        if (targetIsATag) {
            const targetHref = target.dataset.href === undefined ? target.href : target.dataset.href

            if (target.classList.contains('_tb')) {
                prD()
                w.open(targetHref)
            } else if (target.classList.contains('_tbs')) {
                prD()

                if (this.isTouch && this.isSafari) {
                    w.location.href = targetHref
                } else {
                    w.open(targetHref)
                }
            } else {
                const hrefBeginByHash = targetHref.charAt(targetHref.length - 1) === '#'
                const hrefIsMailto = targetHref.substring(0, 6) === 'mailto'

                if (hrefBeginByHash) {
                    prD()
                } else if (!hrefIsMailto && !target.classList.contains('_ost') && targetHref !== '' && target.getAttribute('target') !== '_blank') {
                    prD()

                    if (this.c.outroIsOn) {
                        this.path = {
                            old: location.pathname,
                            new: targetHref.replace(/^.*\/\/[^/]+/, '')
                        }

                        if (this.path.old !== this.path.new) {
                            this.c.outroIsOn = false

                            this.target = target
                            this.xhrReq()
                        }
                    }
                } else if (hrefIsMailto) {
                    prD()
                    const myWindow = w.open(targetHref)
                    setTimeout(_ => {
                        myWindow.close()
                    }, 300)
                }
            }
        } else if (targetIsASubmit) {
            prD()
        }

        function prD () {
            event.preventDefault()
        }
    }

    xhrReq () {
        const oldInstance = this.getController()

        this.c.done = this.done
        this.c.target = this.target
        this.c.path = this.path
        this.c.is404 = false

        // Old outro
        oldInstance.outro()
    }

    done () {
        Xhr.controller(this.path.new, this.xhrCallback)
    }

    xhrCallback (response) {
        const newInstance = this.getController()

        this.c.xhr = {
            insertNew: _ => {
                this.xhr.insertAdjacentHTML('beforeend', response)
            },
            removeOld: _ => {
                const oldXhrContent = this.xhr.children[0]
                oldXhrContent.parentNode.removeChild(oldXhrContent)
            }
        }
        this.c.outroIsOn = true

        // New intro
        newInstance.intro()
    }

}

export default EventDelegation
