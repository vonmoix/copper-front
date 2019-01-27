/*

CONTROLLER
──────────

Xhr.controller(page, callback, args);

function callback (response, args) {
    app.insertAdjacentHTML('beforeend', response)
}

ONPOPSTATE
──────────

Xhr.onPopstate()

*/

import R from '@ariii/r'

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

        function getHistoryUpdate () {
            history.pushState({}, '', page)
        }
    }

    static onPopstate () {
        const d = document
        const w = window
        const c = 'complete'
        const a = 'a'

        let popstateEventStopper = d.readyState !== c

        R.L(w, a, 'load', load)
        R.L(w, a, 'popstate', popstate)

        function load () {
            setTimeout(_ => { popstateEventStopper = false }, 0)
        }

        function popstate (e) {
            if (popstateEventStopper && d.readyState === c) {
                e.preventDefault()
                e.stopImmediatePropagation()
            }
        }

        onpopstate = e => {
            location.href = location.pathname
        }
    }

}

export default Xhr
