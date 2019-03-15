import R from '@ariii/r'

class Resize {

    constructor () {
        R.BM(this, ['ro'])

        new R.RO({cb: this.ro, throttleDelay: 100}).on()
        this.ro()
    }

    ro () {
        const c = Copper
        const data = c.data

        c.win = {
            w: innerWidth,
            h: innerHeight
        }
        c.winDemi = {
            w: c.win.w / 2,
            h: c.win.h / 2
        }
        c.over500 = window.matchMedia('(min-width: 501px)').matches
        c.over500Prop = c.over500 ? 'over500' : 'under500'
        c.psd = {
            h: data.psd[c.over500Prop].h,
            w: data.psd[c.over500Prop].w
        }
        c.winWpsdW = c.win.w / c.psd.w
        c.winHpsdH = c.win.h / c.psd.h
        c.psdWwinW = c.psd.w / c.win.w

        // -------------------------------------------

        c.win.ratio = c.win.h / c.win.w

        // -------------------------------------------
        // Shape

        c.shape = c.data.gl
        c.shapeL = c.shape.length
    }

}

export default Resize
