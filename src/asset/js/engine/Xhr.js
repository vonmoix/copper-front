/*

CONTROLLER
──────────

Xhr.controller(pageName, myCallback, args);

function myCallback(response, args) {

    // Insert HTML
    app.insertAdjacentHTML('beforeend', response);

}

ONPOPSTATE
──────────

Xhr.onPopstate()

*/

import R from '@ariiiman/r'

class Xhr {

    static controller (page, cb, args) {
        const path = 'index.php?url=' + page + '&xhr=true'
        const xhr = new XMLHttpRequest()

        xhr.open('GET', path, true)

        xhr.onreadystatechange = _ => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const xhrC = JSON.parse(xhr.responseText).xhrController

                R.G.tag('title')[0].textContent = xhrC.title

                getHistoryUpdate()
                cb(xhrC.view, args)
            }
        }
        xhr.send(null)

        // Browser history update
        function getHistoryUpdate () {
            const pageUrl = page === 'home' ? '/' : page

            history.pushState({key: 'value'}, 'titre', pageUrl)
        }
    }

    static onPopstate () {
        const d = document
        const w = window
        const c = 'complete'
        const a = 'add'

        let blockPopstateEvent = d.readyState !== c

        R.L(w, a, 'load', load)
        R.L(w, a, 'popstate', popstate)

        function load () {
            setTimeout(_ => {
                blockPopstateEvent = false
            }, 0)
        }

        function popstate (e) {
            if (blockPopstateEvent && d.readyState === c) {
                e.preventDefault()
                e.stopImmediatePropagation()
            }
        }

        w.onpopstate = e => {
            w.location.href = location.pathname
        }
    }

}

export default Xhr
