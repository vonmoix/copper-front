import R from '@ariii/r'
import Xhr from './Xhr.js'

class EventDelegation {

    constructor (getController) {
        // Opts
        this.getC = getController

        // Parameters
        this.c = Copper
        this.xhr = R.G.id('xhr')

        // Bind
        R.BM(this, ['eDeleg', 'done', 'xhrCb'])

        R.L(R.Dom.body, 'a', 'click', this.eDeleg)
    }

    eDeleg (e) {
        const w = window
        let target = e.target
        let targetIsATag = false
        let targetIsSubmit = false

        while (target) {
            const tagName = target.tagName
            if (tagName === 'A') {
                targetIsATag = true
                break
            } else if ((tagName === 'INPUT' || tagName === 'BUTTON') && target.type === 'submit') {
                targetIsSubmit = true
                break
            }
            target = target.parentNode
        }

        if (targetIsATag) {
            const targetHref = R.Is.und(target.dataset.href) ? target.href : target.dataset.href

            if (target.classList.contains('_tb')) {
                pD()
                w.open(targetHref)
            } else if (target.classList.contains('_tbs')) {
                pD()

                if (this.isTouch && this.isSafari) {
                    w.location.href = targetHref
                } else {
                    w.open(targetHref)
                }
            } else {
                const hrefBeginByHash = targetHref.charAt(targetHref.length - 1) === '#'
                const hrefIsMailto = targetHref.substring(0, 6) === 'mailto'

                if (hrefBeginByHash) {
                    pD()
                } else if (!hrefIsMailto && !target.classList.contains('_ost') && targetHref !== '' && target.getAttribute('target') !== '_blank') {
                    pD()

                    if (this.c.outroIsOn) {
                        this.path = {
                            old: location.pathname,
                            new: targetHref.replace(/^.*\/\/[^/]+/, '')
                        }

                        if (this.path.old !== this.path.new) {
                            this.c.outroIsOn = false

                            this.xhrReq(target)
                        }
                    }
                } else if (hrefIsMailto) {
                    pD()
                    const myWindow = w.open(targetHref)
                    setTimeout(_ => {
                        myWindow.close()
                    }, 300)
                }
            }
        } else if (targetIsSubmit) {
            pD()
        }

        function pD () {
            e.preventDefault()
        }
    }

    xhrReq (target) {
        const oldInstance = this.getC()

        this.c.done = this.done
        this.c.target = target
        this.c.path = this.path
        this.c.is404 = false

        // Old outro
        oldInstance.outro()
    }

    done () {
        Xhr.controller(this.path.new, this.xhrCb)
    }

    xhrCb (response) {
        const newInstance = this.getC()

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
