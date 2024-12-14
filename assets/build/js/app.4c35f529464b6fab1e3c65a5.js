!function() {
    let e = history.pushState;
    history.pushState = function() {
        let t = e.apply(this, arguments);
        return window.dispatchEvent(new Event("pushstate")),
        t
    }
    ,
    window.addEventListener("popstate", function() {
        window.location.reload()
    });
    (function() {
        "use strict";
        let e = "transitionend"
          , t = e => null == e ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase()
          , i = e => {
            do
                e += Math.floor(1e6 * Math.random());
            while (document.getElementById(e))return e
        }
          , n = e => {
            let t = e.getAttribute("data-bs-target");
            if (!t || "#" === t) {
                let i = e.getAttribute("href");
                if (!i || !i.includes("#") && !i.startsWith("."))
                    return null;
                i.includes("#") && !i.startsWith("#") && (i = `#${i.split("#")[1]}`),
                t = i && "#" !== i ? i.trim() : null
            }
            return t
        }
          , r = e => {
            let t = n(e);
            return t && document.querySelector(t) ? t : null
        }
          , s = e => {
            let t = n(e);
            return t ? document.querySelector(t) : null
        }
          , o = e => {
            if (!e)
                return 0;
            let {transitionDuration: t, transitionDelay: i} = window.getComputedStyle(e)
              , n = Number.parseFloat(t)
              , r = Number.parseFloat(i);
            return n || r ? (t = t.split(",")[0],
            i = i.split(",")[0],
            (Number.parseFloat(t) + Number.parseFloat(i)) * 1e3) : 0
        }
          , a = t => {
            t.dispatchEvent(new Event(e))
        }
          , l = e => !!e && "object" == typeof e && (void 0 !== e.jquery && (e = e[0]),
        void 0 !== e.nodeType)
          , c = e => l(e) ? e.jquery ? e[0] : e : "string" == typeof e && e.length > 0 ? document.querySelector(e) : null
          , d = e => {
            if (!l(e) || 0 === e.getClientRects().length)
                return !1;
            let t = "visible" === getComputedStyle(e).getPropertyValue("visibility")
              , i = e.closest("details:not([open])");
            if (!i)
                return t;
            if (i !== e) {
                let t = e.closest("summary");
                if (t && t.parentNode !== i || null === t)
                    return !1
            }
            return t
        }
          , u = e => !!(!e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled")) || (void 0 !== e.disabled ? e.disabled : e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled"))
          , h = e => {
            if (!document.documentElement.attachShadow)
                return null;
            if ("function" == typeof e.getRootNode) {
                let t = e.getRootNode();
                return t instanceof ShadowRoot ? t : null
            }
            return e instanceof ShadowRoot ? e : e.parentNode ? h(e.parentNode) : null
        }
          , f = () => {}
          , p = e => {
            e.offsetHeight
        }
          , m = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null
          , g = []
          , _ = e => {
            "loading" === document.readyState ? (g.length || document.addEventListener("DOMContentLoaded", () => {
                for (let e of g)
                    e()
            }
            ),
            g.push(e)) : e()
        }
          , b = () => "rtl" === document.documentElement.dir
          , v = e => {
            _( () => {
                let t = m();
                if (t) {
                    let i = e.NAME
                      , n = t.fn[i];
                    t.fn[i] = e.jQueryInterface,
                    t.fn[i].Constructor = e,
                    t.fn[i].noConflict = () => (t.fn[i] = n,
                    e.jQueryInterface)
                }
            }
            )
        }
          , y = e => {
            "function" == typeof e && e()
        }
          , w = (t, i, n=!0) => {
            if (!n) {
                y(t);
                return
            }
            let r = o(i) + 5
              , s = !1
              , l = ({target: n}) => {
                n === i && (s = !0,
                i.removeEventListener(e, l),
                y(t))
            }
            ;
            i.addEventListener(e, l),
            setTimeout( () => {
                s || a(i)
            }
            , r)
        }
          , A = (e, t, i, n) => {
            let r = e.length
              , s = e.indexOf(t);
            return -1 === s ? !i && n ? e[r - 1] : e[0] : (s += i ? 1 : -1,
            n && (s = (s + r) % r),
            e[Math.max(0, Math.min(s, r - 1))])
        }
          , E = /[^.]*(?=\..*)\.|.*/
          , S = /\..*/
          , L = /::\d+$/
          , T = {}
          , x = 1
          , k = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }
          , C = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
        function O(e, t) {
            return t && `${t}::${x++}` || e.uidEvent || x++
        }
        function $(e) {
            let t = O(e);
            return e.uidEvent = t,
            T[t] = T[t] || {},
            T[t]
        }
        function q(e, t, i=null) {
            return Object.values(e).find(e => e.callable === t && e.delegationSelector === i)
        }
        function D(e, t, i) {
            let n = "string" == typeof t
              , r = j(e);
            return C.has(r) || (r = e),
            [n, n ? i : t || i, r]
        }
        function N(e, t, i, n, r) {
            var s, o, a;
            if ("string" != typeof t || !e)
                return;
            let[l,c,d] = D(t, i, n);
            t in k && (s = c,
            c = function(e) {
                if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget))
                    return s.call(this, e)
            }
            );
            let u = $(e)
              , h = u[d] || (u[d] = {})
              , f = q(h, c, l ? i : null);
            if (f) {
                f.oneOff = f.oneOff && r;
                return
            }
            let p = O(c, t.replace(E, ""))
              , m = l ? (o = c,
            function t(n) {
                let r = e.querySelectorAll(i);
                for (let {target: s} = n; s && s !== this; s = s.parentNode)
                    for (let a of r)
                        if (a === s)
                            return M(n, {
                                delegateTarget: s
                            }),
                            t.oneOff && I.off(e, n.type, i, o),
                            o.apply(s, [n])
            }
            ) : (a = c,
            function t(i) {
                return M(i, {
                    delegateTarget: e
                }),
                t.oneOff && I.off(e, i.type, a),
                a.apply(e, [i])
            }
            );
            m.delegationSelector = l ? i : null,
            m.callable = c,
            m.oneOff = r,
            m.uidEvent = p,
            h[p] = m,
            e.addEventListener(d, m, l)
        }
        function P(e, t, i, n, r) {
            let s = q(t[i], n, r);
            s && (e.removeEventListener(i, s, !!r),
            delete t[i][s.uidEvent])
        }
        function j(e) {
            return k[e = e.replace(S, "")] || e
        }
        let I = {
            on(e, t, i, n) {
                N(e, t, i, n, !1)
            },
            one(e, t, i, n) {
                N(e, t, i, n, !0)
            },
            off(e, t, i, n) {
                if ("string" != typeof t || !e)
                    return;
                let[r,s,o] = D(t, i, n)
                  , a = o !== t
                  , l = $(e)
                  , c = l[o] || {}
                  , d = t.startsWith(".");
                if (void 0 !== s) {
                    if (!Object.keys(c).length)
                        return;
                    P(e, l, o, s, r ? i : null);
                    return
                }
                if (d)
                    for (let i of Object.keys(l))
                        !function(e, t, i, n) {
                            let r = t[i] || {};
                            for (let s of Object.keys(r))
                                if (s.includes(n)) {
                                    let n = r[s];
                                    P(e, t, i, n.callable, n.delegationSelector)
                                }
                        }(e, l, i, t.slice(1));
                for (let i of Object.keys(c)) {
                    let n = i.replace(L, "");
                    if (!a || t.includes(n)) {
                        let t = c[i];
                        P(e, l, o, t.callable, t.delegationSelector)
                    }
                }
            },
            trigger(e, t, i) {
                if ("string" != typeof t || !e)
                    return null;
                let n = m()
                  , r = j(t)
                  , s = t !== r
                  , o = null
                  , a = !0
                  , l = !0
                  , c = !1;
                s && n && (o = n.Event(t, i),
                n(e).trigger(o),
                a = !o.isPropagationStopped(),
                l = !o.isImmediatePropagationStopped(),
                c = o.isDefaultPrevented());
                let d = new Event(t,{
                    bubbles: a,
                    cancelable: !0
                });
                return d = M(d, i),
                c && d.preventDefault(),
                l && e.dispatchEvent(d),
                d.defaultPrevented && o && o.preventDefault(),
                d
            }
        };
        function M(e, t) {
            for (let[i,n] of Object.entries(t || {}))
                try {
                    e[i] = n
                } catch (t) {
                    Object.defineProperty(e, i, {
                        configurable: !0,
                        get: () => n
                    })
                }
            return e
        }
        let z = new Map
          , H = {
            set(e, t, i) {
                z.has(e) || z.set(e, new Map);
                let n = z.get(e);
                if (!n.has(t) && 0 !== n.size) {
                    console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);
                    return
                }
                n.set(t, i)
            },
            get: (e, t) => z.has(e) && z.get(e).get(t) || null,
            remove(e, t) {
                if (!z.has(e))
                    return;
                let i = z.get(e);
                i.delete(t),
                0 === i.size && z.delete(e)
            }
        };
        function F(e) {
            if ("true" === e)
                return !0;
            if ("false" === e)
                return !1;
            if (e === Number(e).toString())
                return Number(e);
            if ("" === e || "null" === e)
                return null;
            if ("string" != typeof e)
                return e;
            try {
                return JSON.parse(decodeURIComponent(e))
            } catch (t) {
                return e
            }
        }
        function W(e) {
            return e.replace(/[A-Z]/g, e => `-${e.toLowerCase()}`)
        }
        let R = {
            setDataAttribute(e, t, i) {
                e.setAttribute(`data-bs-${W(t)}`, i)
            },
            removeDataAttribute(e, t) {
                e.removeAttribute(`data-bs-${W(t)}`)
            },
            getDataAttributes(e) {
                if (!e)
                    return {};
                let t = {}
                  , i = Object.keys(e.dataset).filter(e => e.startsWith("bs") && !e.startsWith("bsConfig"));
                for (let n of i) {
                    let i = n.replace(/^bs/, "");
                    t[i = i.charAt(0).toLowerCase() + i.slice(1, i.length)] = F(e.dataset[n])
                }
                return t
            },
            getDataAttribute: (e, t) => F(e.getAttribute(`data-bs-${W(t)}`))
        };
        class B {
            static get Default() {
                return {}
            }
            static get DefaultType() {
                return {}
            }
            static get NAME() {
                throw Error('You have to implement the static method "NAME", for each component!')
            }
            _getConfig(e) {
                return e = this._mergeConfigObj(e),
                e = this._configAfterMerge(e),
                this._typeCheckConfig(e),
                e
            }
            _configAfterMerge(e) {
                return e
            }
            _mergeConfigObj(e, t) {
                let i = l(t) ? R.getDataAttribute(t, "config") : {};
                return {
                    ...this.constructor.Default,
                    ..."object" == typeof i ? i : {},
                    ...l(t) ? R.getDataAttributes(t) : {},
                    ..."object" == typeof e ? e : {}
                }
            }
            _typeCheckConfig(e, i=this.constructor.DefaultType) {
                for (let n of Object.keys(i)) {
                    let r = i[n]
                      , s = e[n]
                      , o = l(s) ? "element" : t(s);
                    if (!new RegExp(r).test(o))
                        throw TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${r}".`)
                }
            }
        }
        class V extends B {
            constructor(e, t) {
                if (super(),
                !(e = c(e)))
                    return;
                this._element = e,
                this._config = this._getConfig(t),
                H.set(this._element, this.constructor.DATA_KEY, this)
            }
            dispose() {
                for (let e of (H.remove(this._element, this.constructor.DATA_KEY),
                I.off(this._element, this.constructor.EVENT_KEY),
                Object.getOwnPropertyNames(this)))
                    this[e] = null
            }
            _queueCallback(e, t, i=!0) {
                w(e, t, i)
            }
            _getConfig(e) {
                return e = this._mergeConfigObj(e, this._element),
                e = this._configAfterMerge(e),
                this._typeCheckConfig(e),
                e
            }
            static getInstance(e) {
                return H.get(c(e), this.DATA_KEY)
            }
            static getOrCreateInstance(e, t={}) {
                return this.getInstance(e) || new this(e,"object" == typeof t ? t : null)
            }
            static get VERSION() {
                return "5.2.3"
            }
            static get DATA_KEY() {
                return `bs.${this.NAME}`
            }
            static get EVENT_KEY() {
                return `.${this.DATA_KEY}`
            }
            static eventName(e) {
                return `${e}${this.EVENT_KEY}`
            }
        }
        let U = (e, t="hide") => {
            let i = `click.dismiss${e.EVENT_KEY}`
              , n = e.NAME;
            I.on(document, i, `[data-bs-dismiss="${n}"]`, function(i) {
                if (["A", "AREA"].includes(this.tagName) && i.preventDefault(),
                u(this))
                    return;
                let r = s(this) || this.closest(`.${n}`)
                  , o = e.getOrCreateInstance(r);
                o[t]()
            })
        }
          , K = ".bs.alert"
          , Q = `close${K}`
          , X = `closed${K}`;
        class Y extends V {
            static get NAME() {
                return "alert"
            }
            close() {
                let e = I.trigger(this._element, Q);
                if (e.defaultPrevented)
                    return;
                this._element.classList.remove("show");
                let t = this._element.classList.contains("fade");
                this._queueCallback( () => this._destroyElement(), this._element, t)
            }
            _destroyElement() {
                this._element.remove(),
                I.trigger(this._element, X),
                this.dispose()
            }
            static jQueryInterface(e) {
                return this.each(function() {
                    let t = Y.getOrCreateInstance(this);
                    if ("string" == typeof e) {
                        if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                            throw TypeError(`No method named "${e}"`);
                        t[e](this)
                    }
                })
            }
        }
        U(Y, "close"),
        v(Y);
        let J = '[data-bs-toggle="button"]';
        class G extends V {
            static get NAME() {
                return "button"
            }
            toggle() {
                this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
            }
            static jQueryInterface(e) {
                return this.each(function() {
                    let t = G.getOrCreateInstance(this);
                    "toggle" === e && t[e]()
                })
            }
        }
        I.on(document, "click.bs.button.data-api", J, e => {
            e.preventDefault();
            let t = e.target.closest(J)
              , i = G.getOrCreateInstance(t);
            i.toggle()
        }
        ),
        v(G);
        let Z = {
            find: (e, t=document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(t, e)),
            findOne: (e, t=document.documentElement) => Element.prototype.querySelector.call(t, e),
            children: (e, t) => [].concat(...e.children).filter(e => e.matches(t)),
            parents(e, t) {
                let i = []
                  , n = e.parentNode.closest(t);
                for (; n; )
                    i.push(n),
                    n = n.parentNode.closest(t);
                return i
            },
            prev(e, t) {
                let i = e.previousElementSibling;
                for (; i; ) {
                    if (i.matches(t))
                        return [i];
                    i = i.previousElementSibling
                }
                return []
            },
            next(e, t) {
                let i = e.nextElementSibling;
                for (; i; ) {
                    if (i.matches(t))
                        return [i];
                    i = i.nextElementSibling
                }
                return []
            },
            focusableChildren(e) {
                let t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(e => `${e}:not([tabindex^="-"])`).join(",");
                return this.find(t, e).filter(e => !u(e) && d(e))
            }
        }
          , ee = ".bs.swipe"
          , et = `touchstart${ee}`
          , ei = `touchmove${ee}`
          , en = `touchend${ee}`
          , er = `pointerdown${ee}`
          , es = `pointerup${ee}`
          , eo = {
            endCallback: null,
            leftCallback: null,
            rightCallback: null
        }
          , ea = {
            endCallback: "(function|null)",
            leftCallback: "(function|null)",
            rightCallback: "(function|null)"
        };
        class el extends B {
            constructor(e, t) {
                if (super(),
                this._element = e,
                !e || !el.isSupported())
                    return;
                this._config = this._getConfig(t),
                this._deltaX = 0,
                this._supportPointerEvents = !!window.PointerEvent,
                this._initEvents()
            }
            static get Default() {
                return eo
            }
            static get DefaultType() {
                return ea
            }
            static get NAME() {
                return "swipe"
            }
            dispose() {
                I.off(this._element, ee)
            }
            _start(e) {
                if (!this._supportPointerEvents) {
                    this._deltaX = e.touches[0].clientX;
                    return
                }
                this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX)
            }
            _end(e) {
                this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX),
                this._handleSwipe(),
                y(this._config.endCallback)
            }
            _move(e) {
                this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX
            }
            _handleSwipe() {
                let e = Math.abs(this._deltaX);
                if (e <= 40)
                    return;
                let t = e / this._deltaX;
                this._deltaX = 0,
                t && y(t > 0 ? this._config.rightCallback : this._config.leftCallback)
            }
            _initEvents() {
                this._supportPointerEvents ? (I.on(this._element, er, e => this._start(e)),
                I.on(this._element, es, e => this._end(e)),
                this._element.classList.add("pointer-event")) : (I.on(this._element, et, e => this._start(e)),
                I.on(this._element, ei, e => this._move(e)),
                I.on(this._element, en, e => this._end(e)))
            }
            _eventIsPointerPenTouch(e) {
                return this._supportPointerEvents && ("pen" === e.pointerType || "touch" === e.pointerType)
            }
            static isSupported() {
                return "ontouchstart"in document.documentElement || navigator.maxTouchPoints > 0
            }
        }
        let ec = ".bs.carousel"
          , ed = ".data-api"
          , eu = "next"
          , eh = "prev"
          , ef = "left"
          , ep = "right"
          , em = `slide${ec}`
          , eg = `slid${ec}`
          , e_ = `keydown${ec}`
          , eb = `mouseenter${ec}`
          , ev = `mouseleave${ec}`
          , ey = `dragstart${ec}`
          , ew = `load${ec}${ed}`
          , eA = `click${ec}${ed}`
          , eE = "carousel"
          , eS = "active"
          , eL = ".active"
          , eT = ".carousel-item"
          , ex = eL + eT
          , ek = {
            ArrowLeft: ep,
            ArrowRight: ef
        }
          , eC = {
            interval: 5e3,
            keyboard: !0,
            pause: "hover",
            ride: !1,
            touch: !0,
            wrap: !0
        }
          , eO = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            pause: "(string|boolean)",
            ride: "(boolean|string)",
            touch: "boolean",
            wrap: "boolean"
        };
        class e$ extends V {
            constructor(e, t) {
                super(e, t),
                this._interval = null,
                this._activeElement = null,
                this._isSliding = !1,
                this.touchTimeout = null,
                this._swipeHelper = null,
                this._indicatorsElement = Z.findOne(".carousel-indicators", this._element),
                this._addEventListeners(),
                this._config.ride === eE && this.cycle()
            }
            static get Default() {
                return eC
            }
            static get DefaultType() {
                return eO
            }
            static get NAME() {
                return "carousel"
            }
            next() {
                this._slide(eu)
            }
            nextWhenVisible() {
                !document.hidden && d(this._element) && this.next()
            }
            prev() {
                this._slide(eh)
            }
            pause() {
                this._isSliding && a(this._element),
                this._clearInterval()
            }
            cycle() {
                this._clearInterval(),
                this._updateInterval(),
                this._interval = setInterval( () => this.nextWhenVisible(), this._config.interval)
            }
            _maybeEnableCycle() {
                if (this._config.ride) {
                    if (this._isSliding) {
                        I.one(this._element, eg, () => this.cycle());
                        return
                    }
                    this.cycle()
                }
            }
            to(e) {
                let t = this._getItems();
                if (e > t.length - 1 || e < 0)
                    return;
                if (this._isSliding) {
                    I.one(this._element, eg, () => this.to(e));
                    return
                }
                let i = this._getItemIndex(this._getActive());
                if (i === e)
                    return;
                let n = e > i ? eu : eh;
                this._slide(n, t[e])
            }
            dispose() {
                this._swipeHelper && this._swipeHelper.dispose(),
                super.dispose()
            }
            _configAfterMerge(e) {
                return e.defaultInterval = e.interval,
                e
            }
            _addEventListeners() {
                this._config.keyboard && I.on(this._element, e_, e => this._keydown(e)),
                "hover" === this._config.pause && (I.on(this._element, eb, () => this.pause()),
                I.on(this._element, ev, () => this._maybeEnableCycle())),
                this._config.touch && el.isSupported() && this._addTouchEventListeners()
            }
            _addTouchEventListeners() {
                for (let e of Z.find(".carousel-item img", this._element))
                    I.on(e, ey, e => e.preventDefault());
                this._swipeHelper = new el(this._element,{
                    leftCallback: () => this._slide(this._directionToOrder(ef)),
                    rightCallback: () => this._slide(this._directionToOrder(ep)),
                    endCallback: () => {
                        "hover" === this._config.pause && (this.pause(),
                        this.touchTimeout && clearTimeout(this.touchTimeout),
                        this.touchTimeout = setTimeout( () => this._maybeEnableCycle(), 500 + this._config.interval))
                    }
                })
            }
            _keydown(e) {
                if (/input|textarea/i.test(e.target.tagName))
                    return;
                let t = ek[e.key];
                t && (e.preventDefault(),
                this._slide(this._directionToOrder(t)))
            }
            _getItemIndex(e) {
                return this._getItems().indexOf(e)
            }
            _setActiveIndicatorElement(e) {
                if (!this._indicatorsElement)
                    return;
                let t = Z.findOne(eL, this._indicatorsElement);
                t.classList.remove(eS),
                t.removeAttribute("aria-current");
                let i = Z.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
                i && (i.classList.add(eS),
                i.setAttribute("aria-current", "true"))
            }
            _updateInterval() {
                let e = this._activeElement || this._getActive();
                if (!e)
                    return;
                let t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
                this._config.interval = t || this._config.defaultInterval
            }
            _slide(e, t=null) {
                if (this._isSliding)
                    return;
                let i = this._getActive()
                  , n = e === eu
                  , r = t || A(this._getItems(), i, n, this._config.wrap);
                if (r === i)
                    return;
                let s = this._getItemIndex(r)
                  , o = t => I.trigger(this._element, t, {
                    relatedTarget: r,
                    direction: this._orderToDirection(e),
                    from: this._getItemIndex(i),
                    to: s
                })
                  , a = o(em);
                if (a.defaultPrevented || !i || !r)
                    return;
                let l = !!this._interval;
                this.pause(),
                this._isSliding = !0,
                this._setActiveIndicatorElement(s),
                this._activeElement = r;
                let c = n ? "carousel-item-start" : "carousel-item-end"
                  , d = n ? "carousel-item-next" : "carousel-item-prev";
                r.classList.add(d),
                p(r),
                i.classList.add(c),
                r.classList.add(c),
                this._queueCallback( () => {
                    r.classList.remove(c, d),
                    r.classList.add(eS),
                    i.classList.remove(eS, d, c),
                    this._isSliding = !1,
                    o(eg)
                }
                , i, this._isAnimated()),
                l && this.cycle()
            }
            _isAnimated() {
                return this._element.classList.contains("slide")
            }
            _getActive() {
                return Z.findOne(ex, this._element)
            }
            _getItems() {
                return Z.find(eT, this._element)
            }
            _clearInterval() {
                this._interval && (clearInterval(this._interval),
                this._interval = null)
            }
            _directionToOrder(e) {
                return b() ? e === ef ? eh : eu : e === ef ? eu : eh
            }
            _orderToDirection(e) {
                return b() ? e === eh ? ef : ep : e === eh ? ep : ef
            }
            static jQueryInterface(e) {
                return this.each(function() {
                    let t = e$.getOrCreateInstance(this, e);
                    if ("number" == typeof e) {
                        t.to(e);
                        return
                    }
                    if ("string" == typeof e) {
                        if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                            throw TypeError(`No method named "${e}"`);
                        t[e]()
                    }
                })
            }
        }
        I.on(document, eA, "[data-bs-slide], [data-bs-slide-to]", function(e) {
            let t = s(this);
            if (!t || !t.classList.contains(eE))
                return;
            e.preventDefault();
            let i = e$.getOrCreateInstance(t)
              , n = this.getAttribute("data-bs-slide-to");
            if (n) {
                i.to(n),
                i._maybeEnableCycle();
                return
            }
            if ("next" === R.getDataAttribute(this, "slide")) {
                i.next(),
                i._maybeEnableCycle();
                return
            }
            i.prev(),
            i._maybeEnableCycle()
        }),
        I.on(window, ew, () => {
            let e = Z.find('[data-bs-ride="carousel"]');
            for (let t of e)
                e$.getOrCreateInstance(t)
        }
        ),
        v(e$);
        let eq = ".bs.collapse"
          , eD = `show${eq}`
          , eN = `shown${eq}`
          , eP = `hide${eq}`
          , ej = `hidden${eq}`
          , eI = `click${eq}.data-api`
          , eM = "show"
          , ez = "collapse"
          , eH = "collapsing"
          , eF = `:scope .${ez} .${ez}`
          , eW = '[data-bs-toggle="collapse"]'
          , eR = {
            parent: null,
            toggle: !0
        }
          , eB = {
            parent: "(null|element)",
            toggle: "boolean"
        };
        class eV extends V {
            constructor(e, t) {
                super(e, t),
                this._isTransitioning = !1,
                this._triggerArray = [];
                let i = Z.find(eW);
                for (let e of i) {
                    let t = r(e)
                      , i = Z.find(t).filter(e => e === this._element);
                    null !== t && i.length && this._triggerArray.push(e)
                }
                this._initializeChildren(),
                this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
                this._config.toggle && this.toggle()
            }
            static get Default() {
                return eR
            }
            static get DefaultType() {
                return eB
            }
            static get NAME() {
                return "collapse"
            }
            toggle() {
                this._isShown() ? this.hide() : this.show()
            }
            show() {
                if (this._isTransitioning || this._isShown())
                    return;
                let e = [];
                if (this._config.parent && (e = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter(e => e !== this._element).map(e => eV.getOrCreateInstance(e, {
                    toggle: !1
                }))),
                e.length && e[0]._isTransitioning)
                    return;
                let t = I.trigger(this._element, eD);
                if (t.defaultPrevented)
                    return;
                for (let t of e)
                    t.hide();
                let i = this._getDimension();
                this._element.classList.remove(ez),
                this._element.classList.add(eH),
                this._element.style[i] = 0,
                this._addAriaAndCollapsedClass(this._triggerArray, !0),
                this._isTransitioning = !0;
                let n = i[0].toUpperCase() + i.slice(1)
                  , r = `scroll${n}`;
                this._queueCallback( () => {
                    this._isTransitioning = !1,
                    this._element.classList.remove(eH),
                    this._element.classList.add(ez, eM),
                    this._element.style[i] = "",
                    I.trigger(this._element, eN)
                }
                , this._element, !0),
                this._element.style[i] = `${this._element[r]}px`
            }
            hide() {
                if (this._isTransitioning || !this._isShown())
                    return;
                let e = I.trigger(this._element, eP);
                if (e.defaultPrevented)
                    return;
                let t = this._getDimension();
                for (let e of (this._element.style[t] = `${this._element.getBoundingClientRect()[t]}px`,
                p(this._element),
                this._element.classList.add(eH),
                this._element.classList.remove(ez, eM),
                this._triggerArray)) {
                    let t = s(e);
                    t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1)
                }
                this._isTransitioning = !0,
                this._element.style[t] = "",
                this._queueCallback( () => {
                    this._isTransitioning = !1,
                    this._element.classList.remove(eH),
                    this._element.classList.add(ez),
                    I.trigger(this._element, ej)
                }
                , this._element, !0)
            }
            _isShown(e=this._element) {
                return e.classList.contains(eM)
            }
            _configAfterMerge(e) {
                return e.toggle = !!e.toggle,
                e.parent = c(e.parent),
                e
            }
            _getDimension() {
                return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
            }
            _initializeChildren() {
                if (!this._config.parent)
                    return;
                let e = this._getFirstLevelChildren(eW);
                for (let t of e) {
                    let e = s(t);
                    e && this._addAriaAndCollapsedClass([t], this._isShown(e))
                }
            }
            _getFirstLevelChildren(e) {
                let t = Z.find(eF, this._config.parent);
                return Z.find(e, this._config.parent).filter(e => !t.includes(e))
            }
            _addAriaAndCollapsedClass(e, t) {
                if (e.length)
                    for (let i of e)
                        i.classList.toggle("collapsed", !t),
                        i.setAttribute("aria-expanded", t)
            }
            static jQueryInterface(e) {
                let t = {};
                return "string" == typeof e && /show|hide/.test(e) && (t.toggle = !1),
                this.each(function() {
                    let i = eV.getOrCreateInstance(this, t);
                    if ("string" == typeof e) {
                        if (void 0 === i[e])
                            throw TypeError(`No method named "${e}"`);
                        i[e]()
                    }
                })
            }
        }
        I.on(document, eI, eW, function(e) {
            ("A" === e.target.tagName || e.delegateTarget && "A" === e.delegateTarget.tagName) && e.preventDefault();
            let t = r(this)
              , i = Z.find(t);
            for (let e of i)
                eV.getOrCreateInstance(e, {
                    toggle: !1
                }).toggle()
        }),
        v(eV);
        var eU = "bottom"
          , eK = "right"
          , eQ = "left"
          , eX = "auto"
          , eY = ["top", eU, eK, eQ]
          , eJ = "start"
          , eG = "clippingParents"
          , eZ = "viewport"
          , e0 = "popper"
          , e1 = "reference"
          , e2 = eY.reduce(function(e, t) {
            return e.concat([t + "-" + eJ, t + "-end"])
        }, [])
          , e3 = [].concat(eY, [eX]).reduce(function(e, t) {
            return e.concat([t, t + "-" + eJ, t + "-end"])
        }, [])
          , e6 = "beforeRead"
          , e5 = "read"
          , e9 = "afterRead"
          , e4 = "beforeMain"
          , e8 = "main"
          , e7 = "afterMain"
          , te = "beforeWrite"
          , tt = "write"
          , ti = "afterWrite"
          , tn = [e6, e5, e9, e4, e8, e7, te, tt, ti];
        function tr(e) {
            return e ? (e.nodeName || "").toLowerCase() : null
        }
        function ts(e) {
            if (null == e)
                return window;
            if ("[object Window]" !== e.toString()) {
                var t = e.ownerDocument;
                return t && t.defaultView || window
            }
            return e
        }
        function to(e) {
            var t = ts(e).Element;
            return e instanceof t || e instanceof Element
        }
        function ta(e) {
            var t = ts(e).HTMLElement;
            return e instanceof t || e instanceof HTMLElement
        }
        function tl(e) {
            if ("undefined" == typeof ShadowRoot)
                return !1;
            var t = ts(e).ShadowRoot;
            return e instanceof t || e instanceof ShadowRoot
        }
        let tc = {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function(e) {
                var t = e.state;
                Object.keys(t.elements).forEach(function(e) {
                    var i = t.styles[e] || {}
                      , n = t.attributes[e] || {}
                      , r = t.elements[e];
                    ta(r) && tr(r) && (Object.assign(r.style, i),
                    Object.keys(n).forEach(function(e) {
                        var t = n[e];
                        !1 === t ? r.removeAttribute(e) : r.setAttribute(e, !0 === t ? "" : t)
                    }))
                })
            },
            effect: function(e) {
                var t = e.state
                  , i = {
                    popper: {
                        position: t.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0"
                    },
                    arrow: {
                        position: "absolute"
                    },
                    reference: {}
                };
                return Object.assign(t.elements.popper.style, i.popper),
                t.styles = i,
                t.elements.arrow && Object.assign(t.elements.arrow.style, i.arrow),
                function() {
                    Object.keys(t.elements).forEach(function(e) {
                        var n = t.elements[e]
                          , r = t.attributes[e] || {}
                          , s = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : i[e]).reduce(function(e, t) {
                            return e[t] = "",
                            e
                        }, {});
                        ta(n) && tr(n) && (Object.assign(n.style, s),
                        Object.keys(r).forEach(function(e) {
                            n.removeAttribute(e)
                        }))
                    })
                }
            },
            requires: ["computeStyles"]
        };
        function td(e) {
            return e.split("-")[0]
        }
        var tu = Math.max
          , th = Math.min
          , tf = Math.round;
        function tp() {
            var e = navigator.userAgentData;
            return null != e && e.brands ? e.brands.map(function(e) {
                return e.brand + "/" + e.version
            }).join(" ") : navigator.userAgent
        }
        function tm() {
            return !/^((?!chrome|android).)*safari/i.test(tp())
        }
        function tg(e, t, i) {
            void 0 === t && (t = !1),
            void 0 === i && (i = !1);
            var n = e.getBoundingClientRect()
              , r = 1
              , s = 1;
            t && ta(e) && (r = e.offsetWidth > 0 && tf(n.width) / e.offsetWidth || 1,
            s = e.offsetHeight > 0 && tf(n.height) / e.offsetHeight || 1);
            var o = (to(e) ? ts(e) : window).visualViewport
              , a = !tm() && i
              , l = (n.left + (a && o ? o.offsetLeft : 0)) / r
              , c = (n.top + (a && o ? o.offsetTop : 0)) / s
              , d = n.width / r
              , u = n.height / s;
            return {
                width: d,
                height: u,
                top: c,
                right: l + d,
                bottom: c + u,
                left: l,
                x: l,
                y: c
            }
        }
        function t_(e) {
            var t = tg(e)
              , i = e.offsetWidth
              , n = e.offsetHeight;
            return 1 >= Math.abs(t.width - i) && (i = t.width),
            1 >= Math.abs(t.height - n) && (n = t.height),
            {
                x: e.offsetLeft,
                y: e.offsetTop,
                width: i,
                height: n
            }
        }
        function tb(e, t) {
            var i = t.getRootNode && t.getRootNode();
            if (e.contains(t))
                return !0;
            if (i && tl(i)) {
                var n = t;
                do {
                    if (n && e.isSameNode(n))
                        return !0;
                    n = n.parentNode || n.host
                } while (n)
            }
            return !1
        }
        function tv(e) {
            return ts(e).getComputedStyle(e)
        }
        function ty(e) {
            return ((to(e) ? e.ownerDocument : e.document) || window.document).documentElement
        }
        function tw(e) {
            return "html" === tr(e) ? e : e.assignedSlot || e.parentNode || (tl(e) ? e.host : null) || ty(e)
        }
        function tA(e) {
            return ta(e) && "fixed" !== tv(e).position ? e.offsetParent : null
        }
        function tE(e) {
            for (var t = ts(e), i = tA(e); i && ["table", "td", "th"].indexOf(tr(i)) >= 0 && "static" === tv(i).position; )
                i = tA(i);
            return i && ("html" === tr(i) || "body" === tr(i) && "static" === tv(i).position) ? t : i || function(e) {
                var t = /firefox/i.test(tp());
                if (/Trident/i.test(tp()) && ta(e) && "fixed" === tv(e).position)
                    return null;
                var i = tw(e);
                for (tl(i) && (i = i.host); ta(i) && 0 > ["html", "body"].indexOf(tr(i)); ) {
                    var n = tv(i);
                    if ("none" !== n.transform || "none" !== n.perspective || "paint" === n.contain || -1 !== ["transform", "perspective"].indexOf(n.willChange) || t && "filter" === n.willChange || t && n.filter && "none" !== n.filter)
                        return i;
                    i = i.parentNode
                }
                return null
            }(e) || t
        }
        function tS(e) {
            return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
        }
        function tL(e, t, i) {
            return tu(e, th(t, i))
        }
        function tT() {
            return {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        }
        function tx(e) {
            return Object.assign({}, tT(), e)
        }
        function tk(e, t) {
            return t.reduce(function(t, i) {
                return t[i] = e,
                t
            }, {})
        }
        let tC = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t, i = e.state, n = e.name, r = e.options, s = i.elements.arrow, o = i.modifiersData.popperOffsets, a = td(i.placement), l = tS(a), c = [eQ, eK].indexOf(a) >= 0 ? "height" : "width";
                if (s && o) {
                    var d, u = tx("number" != typeof (d = "function" == typeof (d = r.padding) ? d(Object.assign({}, i.rects, {
                        placement: i.placement
                    })) : d) ? d : tk(d, eY)), h = t_(s), f = "y" === l ? "top" : eQ, p = "y" === l ? eU : eK, m = i.rects.reference[c] + i.rects.reference[l] - o[l] - i.rects.popper[c], g = o[l] - i.rects.reference[l], _ = tE(s), b = _ ? "y" === l ? _.clientHeight || 0 : _.clientWidth || 0 : 0, v = u[f], y = b - h[c] - u[p], w = b / 2 - h[c] / 2 + (m / 2 - g / 2), A = tL(v, w, y);
                    i.modifiersData[n] = ((t = {})[l] = A,
                    t.centerOffset = A - w,
                    t)
                }
            },
            effect: function(e) {
                var t = e.state
                  , i = e.options.element
                  , n = void 0 === i ? "[data-popper-arrow]" : i;
                null != n && ("string" != typeof n || (n = t.elements.popper.querySelector(n))) && tb(t.elements.popper, n) && (t.elements.arrow = n)
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"]
        };
        function tO(e) {
            return e.split("-")[1]
        }
        var t$ = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };
        function tq(e) {
            var t, i, n, r, s, o, a = e.popper, l = e.popperRect, c = e.placement, d = e.variation, u = e.offsets, h = e.position, f = e.gpuAcceleration, p = e.adaptive, m = e.roundOffsets, g = e.isFixed, _ = u.x, b = void 0 === _ ? 0 : _, v = u.y, y = void 0 === v ? 0 : v, w = "function" == typeof m ? m({
                x: b,
                y: y
            }) : {
                x: b,
                y: y
            };
            b = w.x,
            y = w.y;
            var A = u.hasOwnProperty("x")
              , E = u.hasOwnProperty("y")
              , S = eQ
              , L = "top"
              , T = window;
            if (p) {
                var x = tE(a)
                  , k = "clientHeight"
                  , C = "clientWidth";
                x === ts(a) && "static" !== tv(x = ty(a)).position && "absolute" === h && (k = "scrollHeight",
                C = "scrollWidth"),
                ("top" === c || (c === eQ || c === eK) && "end" === d) && (L = eU,
                y -= (g && x === T && T.visualViewport ? T.visualViewport.height : x[k]) - l.height,
                y *= f ? 1 : -1),
                (c === eQ || ("top" === c || c === eU) && "end" === d) && (S = eK,
                b -= (g && x === T && T.visualViewport ? T.visualViewport.width : x[C]) - l.width,
                b *= f ? 1 : -1)
            }
            var O = Object.assign({
                position: h
            }, p && t$)
              , $ = !0 === m ? (i = (t = {
                x: b,
                y: y
            }).x,
            n = t.y,
            {
                x: tf(i * (r = window.devicePixelRatio || 1)) / r || 0,
                y: tf(n * r) / r || 0
            }) : {
                x: b,
                y: y
            };
            return (b = $.x,
            y = $.y,
            f) ? Object.assign({}, O, ((o = {})[L] = E ? "0" : "",
            o[S] = A ? "0" : "",
            o.transform = 1 >= (T.devicePixelRatio || 1) ? "translate(" + b + "px, " + y + "px)" : "translate3d(" + b + "px, " + y + "px, 0)",
            o)) : Object.assign({}, O, ((s = {})[L] = E ? y + "px" : "",
            s[S] = A ? b + "px" : "",
            s.transform = "",
            s))
        }
        let tD = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function(e) {
                var t = e.state
                  , i = e.options
                  , n = i.gpuAcceleration
                  , r = i.adaptive
                  , s = i.roundOffsets
                  , o = void 0 === s || s
                  , a = {
                    placement: td(t.placement),
                    variation: tO(t.placement),
                    popper: t.elements.popper,
                    popperRect: t.rects.popper,
                    gpuAcceleration: void 0 === n || n,
                    isFixed: "fixed" === t.options.strategy
                };
                null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, tq(Object.assign({}, a, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: void 0 === r || r,
                    roundOffsets: o
                })))),
                null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, tq(Object.assign({}, a, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: o
                })))),
                t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-placement": t.placement
                })
            },
            data: {}
        };
        var tN = {
            passive: !0
        };
        let tP = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(e) {
                var t = e.state
                  , i = e.instance
                  , n = e.options
                  , r = n.scroll
                  , s = void 0 === r || r
                  , o = n.resize
                  , a = void 0 === o || o
                  , l = ts(t.elements.popper)
                  , c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                return s && c.forEach(function(e) {
                    e.addEventListener("scroll", i.update, tN)
                }),
                a && l.addEventListener("resize", i.update, tN),
                function() {
                    s && c.forEach(function(e) {
                        e.removeEventListener("scroll", i.update, tN)
                    }),
                    a && l.removeEventListener("resize", i.update, tN)
                }
            },
            data: {}
        };
        var tj = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        function tI(e) {
            return e.replace(/left|right|bottom|top/g, function(e) {
                return tj[e]
            })
        }
        var tM = {
            start: "end",
            end: "start"
        };
        function tz(e) {
            return e.replace(/start|end/g, function(e) {
                return tM[e]
            })
        }
        function tH(e) {
            var t = ts(e);
            return {
                scrollLeft: t.pageXOffset,
                scrollTop: t.pageYOffset
            }
        }
        function tF(e) {
            return tg(ty(e)).left + tH(e).scrollLeft
        }
        function tW(e) {
            var t = tv(e)
              , i = t.overflow
              , n = t.overflowX
              , r = t.overflowY;
            return /auto|scroll|overlay|hidden/.test(i + r + n)
        }
        function tR(e, t) {
            void 0 === t && (t = []);
            var i, n = function e(t) {
                return ["html", "body", "#document"].indexOf(tr(t)) >= 0 ? t.ownerDocument.body : ta(t) && tW(t) ? t : e(tw(t))
            }(e), r = n === (null == (i = e.ownerDocument) ? void 0 : i.body), s = ts(n), o = r ? [s].concat(s.visualViewport || [], tW(n) ? n : []) : n, a = t.concat(o);
            return r ? a : a.concat(tR(tw(o)))
        }
        function tB(e) {
            return Object.assign({}, e, {
                left: e.x,
                top: e.y,
                right: e.x + e.width,
                bottom: e.y + e.height
            })
        }
        function tV(e, t, i) {
            var n, r, s, o, a, l, c, d, u, h;
            return t === eZ ? tB(function(e, t) {
                var i = ts(e)
                  , n = ty(e)
                  , r = i.visualViewport
                  , s = n.clientWidth
                  , o = n.clientHeight
                  , a = 0
                  , l = 0;
                if (r) {
                    s = r.width,
                    o = r.height;
                    var c = tm();
                    (c || !c && "fixed" === t) && (a = r.offsetLeft,
                    l = r.offsetTop)
                }
                return {
                    width: s,
                    height: o,
                    x: a + tF(e),
                    y: l
                }
            }(e, i)) : to(t) ? ((n = tg(t, !1, "fixed" === i)).top = n.top + t.clientTop,
            n.left = n.left + t.clientLeft,
            n.bottom = n.top + t.clientHeight,
            n.right = n.left + t.clientWidth,
            n.width = t.clientWidth,
            n.height = t.clientHeight,
            n.x = n.left,
            n.y = n.top,
            n) : tB((r = ty(e),
            o = ty(r),
            a = tH(r),
            l = null == (s = r.ownerDocument) ? void 0 : s.body,
            c = tu(o.scrollWidth, o.clientWidth, l ? l.scrollWidth : 0, l ? l.clientWidth : 0),
            d = tu(o.scrollHeight, o.clientHeight, l ? l.scrollHeight : 0, l ? l.clientHeight : 0),
            u = -a.scrollLeft + tF(r),
            h = -a.scrollTop,
            "rtl" === tv(l || o).direction && (u += tu(o.clientWidth, l ? l.clientWidth : 0) - c),
            {
                width: c,
                height: d,
                x: u,
                y: h
            }))
        }
        function tU(e) {
            var t, i = e.reference, n = e.element, r = e.placement, s = r ? td(r) : null, o = r ? tO(r) : null, a = i.x + i.width / 2 - n.width / 2, l = i.y + i.height / 2 - n.height / 2;
            switch (s) {
            case "top":
                t = {
                    x: a,
                    y: i.y - n.height
                };
                break;
            case eU:
                t = {
                    x: a,
                    y: i.y + i.height
                };
                break;
            case eK:
                t = {
                    x: i.x + i.width,
                    y: l
                };
                break;
            case eQ:
                t = {
                    x: i.x - n.width,
                    y: l
                };
                break;
            default:
                t = {
                    x: i.x,
                    y: i.y
                }
            }
            var c = s ? tS(s) : null;
            if (null != c) {
                var d = "y" === c ? "height" : "width";
                switch (o) {
                case eJ:
                    t[c] = t[c] - (i[d] / 2 - n[d] / 2);
                    break;
                case "end":
                    t[c] = t[c] + (i[d] / 2 - n[d] / 2)
                }
            }
            return t
        }
        function tK(e, t) {
            void 0 === t && (t = {});
            var i, n, r, s, o, a, l, c = t, d = c.placement, u = void 0 === d ? e.placement : d, h = c.strategy, f = void 0 === h ? e.strategy : h, p = c.boundary, m = c.rootBoundary, g = c.elementContext, _ = void 0 === g ? e0 : g, b = c.altBoundary, v = c.padding, y = void 0 === v ? 0 : v, w = tx("number" != typeof y ? y : tk(y, eY)), A = e.rects.popper, E = e.elements[void 0 !== b && b ? _ === e0 ? e1 : e0 : _], S = (i = to(E) ? E : E.contextElement || ty(e.elements.popper),
            a = (o = [].concat("clippingParents" === (n = void 0 === p ? eG : p) ? (r = tR(tw(i)),
            to(s = ["absolute", "fixed"].indexOf(tv(i).position) >= 0 && ta(i) ? tE(i) : i) ? r.filter(function(e) {
                return to(e) && tb(e, s) && "body" !== tr(e)
            }) : []) : [].concat(n), [void 0 === m ? eZ : m]))[0],
            (l = o.reduce(function(e, t) {
                var n = tV(i, t, f);
                return e.top = tu(n.top, e.top),
                e.right = th(n.right, e.right),
                e.bottom = th(n.bottom, e.bottom),
                e.left = tu(n.left, e.left),
                e
            }, tV(i, a, f))).width = l.right - l.left,
            l.height = l.bottom - l.top,
            l.x = l.left,
            l.y = l.top,
            l), L = tg(e.elements.reference), T = tU({
                reference: L,
                element: A,
                strategy: "absolute",
                placement: u
            }), x = tB(Object.assign({}, A, T)), k = _ === e0 ? x : L, C = {
                top: S.top - k.top + w.top,
                bottom: k.bottom - S.bottom + w.bottom,
                left: S.left - k.left + w.left,
                right: k.right - S.right + w.right
            }, O = e.modifiersData.offset;
            if (_ === e0 && O) {
                var $ = O[u];
                Object.keys(C).forEach(function(e) {
                    var t = [eK, eU].indexOf(e) >= 0 ? 1 : -1
                      , i = ["top", eU].indexOf(e) >= 0 ? "y" : "x";
                    C[e] += $[i] * t
                })
            }
            return C
        }
        let tQ = {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state
                  , i = e.options
                  , n = e.name;
                if (!t.modifiersData[n]._skip) {
                    for (var r = i.mainAxis, s = void 0 === r || r, o = i.altAxis, a = void 0 === o || o, l = i.fallbackPlacements, c = i.padding, d = i.boundary, u = i.rootBoundary, h = i.altBoundary, f = i.flipVariations, p = void 0 === f || f, m = i.allowedAutoPlacements, g = t.options.placement, _ = td(g) === g, b = l || (_ || !p ? [tI(g)] : function(e) {
                        if (td(e) === eX)
                            return [];
                        var t = tI(e);
                        return [tz(e), t, tz(t)]
                    }(g)), v = [g].concat(b).reduce(function(e, i) {
                        var n, r, s, o, a, l, h, f, g, _, b, v;
                        return e.concat(td(i) === eX ? (r = (n = {
                            placement: i,
                            boundary: d,
                            rootBoundary: u,
                            padding: c,
                            flipVariations: p,
                            allowedAutoPlacements: m
                        }).placement,
                        s = n.boundary,
                        o = n.rootBoundary,
                        a = n.padding,
                        l = n.flipVariations,
                        f = void 0 === (h = n.allowedAutoPlacements) ? e3 : h,
                        0 === (b = (_ = (g = tO(r)) ? l ? e2 : e2.filter(function(e) {
                            return tO(e) === g
                        }) : eY).filter(function(e) {
                            return f.indexOf(e) >= 0
                        })).length && (b = _),
                        Object.keys(v = b.reduce(function(e, i) {
                            return e[i] = tK(t, {
                                placement: i,
                                boundary: s,
                                rootBoundary: o,
                                padding: a
                            })[td(i)],
                            e
                        }, {})).sort(function(e, t) {
                            return v[e] - v[t]
                        })) : i)
                    }, []), y = t.rects.reference, w = t.rects.popper, A = new Map, E = !0, S = v[0], L = 0; L < v.length; L++) {
                        var T = v[L]
                          , x = td(T)
                          , k = tO(T) === eJ
                          , C = ["top", eU].indexOf(x) >= 0
                          , O = C ? "width" : "height"
                          , $ = tK(t, {
                            placement: T,
                            boundary: d,
                            rootBoundary: u,
                            altBoundary: h,
                            padding: c
                        })
                          , q = C ? k ? eK : eQ : k ? eU : "top";
                        y[O] > w[O] && (q = tI(q));
                        var D = tI(q)
                          , N = [];
                        if (s && N.push($[x] <= 0),
                        a && N.push($[q] <= 0, $[D] <= 0),
                        N.every(function(e) {
                            return e
                        })) {
                            S = T,
                            E = !1;
                            break
                        }
                        A.set(T, N)
                    }
                    if (E)
                        for (var P = p ? 3 : 1, j = function(e) {
                            var t = v.find(function(t) {
                                var i = A.get(t);
                                if (i)
                                    return i.slice(0, e).every(function(e) {
                                        return e
                                    })
                            });
                            if (t)
                                return S = t,
                                "break"
                        }, I = P; I > 0 && "break" !== j(I); I--)
                            ;
                    t.placement !== S && (t.modifiersData[n]._skip = !0,
                    t.placement = S,
                    t.reset = !0)
                }
            },
            requiresIfExists: ["offset"],
            data: {
                _skip: !1
            }
        };
        function tX(e, t, i) {
            return void 0 === i && (i = {
                x: 0,
                y: 0
            }),
            {
                top: e.top - t.height - i.y,
                right: e.right - t.width + i.x,
                bottom: e.bottom - t.height + i.y,
                left: e.left - t.width - i.x
            }
        }
        function tY(e) {
            return ["top", eK, eU, eQ].some(function(t) {
                return e[t] >= 0
            })
        }
        let tJ = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(e) {
                var t = e.state
                  , i = e.name
                  , n = t.rects.reference
                  , r = t.rects.popper
                  , s = t.modifiersData.preventOverflow
                  , o = tK(t, {
                    elementContext: "reference"
                })
                  , a = tK(t, {
                    altBoundary: !0
                })
                  , l = tX(o, n)
                  , c = tX(a, r, s)
                  , d = tY(l)
                  , u = tY(c);
                t.modifiersData[i] = {
                    referenceClippingOffsets: l,
                    popperEscapeOffsets: c,
                    isReferenceHidden: d,
                    hasPopperEscaped: u
                },
                t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-reference-hidden": d,
                    "data-popper-escaped": u
                })
            }
        }
          , tG = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(e) {
                var t = e.state
                  , i = e.options
                  , n = e.name
                  , r = i.offset
                  , s = void 0 === r ? [0, 0] : r
                  , o = e3.reduce(function(e, i) {
                    var n, r, o, a, l, c;
                    return e[i] = (n = t.rects,
                    o = [eQ, "top"].indexOf(r = td(i)) >= 0 ? -1 : 1,
                    l = (a = "function" == typeof s ? s(Object.assign({}, n, {
                        placement: i
                    })) : s)[0],
                    c = a[1],
                    l = l || 0,
                    c = (c || 0) * o,
                    [eQ, eK].indexOf(r) >= 0 ? {
                        x: c,
                        y: l
                    } : {
                        x: l,
                        y: c
                    }),
                    e
                }, {})
                  , a = o[t.placement]
                  , l = a.x
                  , c = a.y;
                null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += l,
                t.modifiersData.popperOffsets.y += c),
                t.modifiersData[n] = o
            }
        }
          , tZ = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(e) {
                var t = e.state
                  , i = e.name;
                t.modifiersData[i] = tU({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement
                })
            },
            data: {}
        }
          , t0 = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state
                  , i = e.options
                  , n = e.name
                  , r = i.mainAxis
                  , s = i.altAxis
                  , o = i.boundary
                  , a = i.rootBoundary
                  , l = i.altBoundary
                  , c = i.padding
                  , d = i.tether
                  , u = void 0 === d || d
                  , h = i.tetherOffset
                  , f = void 0 === h ? 0 : h
                  , p = tK(t, {
                    boundary: o,
                    rootBoundary: a,
                    padding: c,
                    altBoundary: l
                })
                  , m = td(t.placement)
                  , g = tO(t.placement)
                  , _ = !g
                  , b = tS(m)
                  , v = "x" === b ? "y" : "x"
                  , y = t.modifiersData.popperOffsets
                  , w = t.rects.reference
                  , A = t.rects.popper
                  , E = "function" == typeof f ? f(Object.assign({}, t.rects, {
                    placement: t.placement
                })) : f
                  , S = "number" == typeof E ? {
                    mainAxis: E,
                    altAxis: E
                } : Object.assign({
                    mainAxis: 0,
                    altAxis: 0
                }, E)
                  , L = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null
                  , T = {
                    x: 0,
                    y: 0
                };
                if (y) {
                    if (void 0 === r || r) {
                        var x, k = "y" === b ? "top" : eQ, C = "y" === b ? eU : eK, O = "y" === b ? "height" : "width", $ = y[b], q = $ + p[k], D = $ - p[C], N = u ? -A[O] / 2 : 0, P = g === eJ ? w[O] : A[O], j = g === eJ ? -A[O] : -w[O], I = t.elements.arrow, M = u && I ? t_(I) : {
                            width: 0,
                            height: 0
                        }, z = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : tT(), H = z[k], F = z[C], W = tL(0, w[O], M[O]), R = _ ? w[O] / 2 - N - W - H - S.mainAxis : P - W - H - S.mainAxis, B = _ ? -w[O] / 2 + N + W + F + S.mainAxis : j + W + F + S.mainAxis, V = t.elements.arrow && tE(t.elements.arrow), U = V ? "y" === b ? V.clientTop || 0 : V.clientLeft || 0 : 0, K = null != (x = null == L ? void 0 : L[b]) ? x : 0, Q = $ + R - K - U, X = $ + B - K, Y = tL(u ? th(q, Q) : q, $, u ? tu(D, X) : D);
                        y[b] = Y,
                        T[b] = Y - $
                    }
                    if (void 0 !== s && s) {
                        var J, G, Z = "x" === b ? "top" : eQ, ee = "x" === b ? eU : eK, et = y[v], ei = "y" === v ? "height" : "width", en = et + p[Z], er = et - p[ee], es = -1 !== ["top", eQ].indexOf(m), eo = null != (G = null == L ? void 0 : L[v]) ? G : 0, ea = es ? en : et - w[ei] - A[ei] - eo + S.altAxis, el = es ? et + w[ei] + A[ei] - eo - S.altAxis : er, ec = u && es ? (J = tL(ea, et, el)) > el ? el : J : tL(u ? ea : en, et, u ? el : er);
                        y[v] = ec,
                        T[v] = ec - et
                    }
                    t.modifiersData[n] = T
                }
            },
            requiresIfExists: ["offset"]
        };
        var t1 = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute"
        };
        function t2() {
            for (var e = arguments.length, t = Array(e), i = 0; i < e; i++)
                t[i] = arguments[i];
            return !t.some(function(e) {
                return !(e && "function" == typeof e.getBoundingClientRect)
            })
        }
        function t3(e) {
            void 0 === e && (e = {});
            var t = e
              , i = t.defaultModifiers
              , n = void 0 === i ? [] : i
              , r = t.defaultOptions
              , s = void 0 === r ? t1 : r;
            return function(e, t, i) {
                void 0 === i && (i = s);
                var r, o = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, t1, s),
                    modifiersData: {},
                    elements: {
                        reference: e,
                        popper: t
                    },
                    attributes: {},
                    styles: {}
                }, a = [], l = !1, c = {
                    state: o,
                    setOptions: function(i) {
                        var r, l, u, h, f, p = "function" == typeof i ? i(o.options) : i;
                        d(),
                        o.options = Object.assign({}, s, o.options, p),
                        o.scrollParents = {
                            reference: to(e) ? tR(e) : e.contextElement ? tR(e.contextElement) : [],
                            popper: tR(t)
                        };
                        var m = (l = Object.keys(r = [].concat(n, o.options.modifiers).reduce(function(e, t) {
                            var i = e[t.name];
                            return e[t.name] = i ? Object.assign({}, i, t, {
                                options: Object.assign({}, i.options, t.options),
                                data: Object.assign({}, i.data, t.data)
                            }) : t,
                            e
                        }, {})).map(function(e) {
                            return r[e]
                        }),
                        u = new Map,
                        h = new Set,
                        f = [],
                        l.forEach(function(e) {
                            u.set(e.name, e)
                        }),
                        l.forEach(function(e) {
                            h.has(e.name) || function e(t) {
                                h.add(t.name),
                                [].concat(t.requires || [], t.requiresIfExists || []).forEach(function(t) {
                                    if (!h.has(t)) {
                                        var i = u.get(t);
                                        i && e(i)
                                    }
                                }),
                                f.push(t)
                            }(e)
                        }),
                        tn.reduce(function(e, t) {
                            return e.concat(f.filter(function(e) {
                                return e.phase === t
                            }))
                        }, []));
                        return o.orderedModifiers = m.filter(function(e) {
                            return e.enabled
                        }),
                        o.orderedModifiers.forEach(function(e) {
                            var t = e.name
                              , i = e.options
                              , n = e.effect;
                            if ("function" == typeof n) {
                                var r = n({
                                    state: o,
                                    name: t,
                                    instance: c,
                                    options: void 0 === i ? {} : i
                                });
                                a.push(r || function() {}
                                )
                            }
                        }),
                        c.update()
                    },
                    forceUpdate: function() {
                        if (!l) {
                            var e = o.elements
                              , t = e.reference
                              , i = e.popper;
                            if (t2(t, i)) {
                                o.rects = {
                                    reference: (r = tE(i),
                                    s = "fixed" === o.options.strategy,
                                    a = ta(r),
                                    f = ta(r) && (u = tf((d = r.getBoundingClientRect()).width) / r.offsetWidth || 1,
                                    h = tf(d.height) / r.offsetHeight || 1,
                                    1 !== u || 1 !== h),
                                    p = ty(r),
                                    m = tg(t, f, s),
                                    g = {
                                        scrollLeft: 0,
                                        scrollTop: 0
                                    },
                                    _ = {
                                        x: 0,
                                        y: 0
                                    },
                                    (a || !a && !s) && (("body" !== tr(r) || tW(p)) && (g = (n = r) !== ts(n) && ta(n) ? {
                                        scrollLeft: n.scrollLeft,
                                        scrollTop: n.scrollTop
                                    } : tH(n)),
                                    ta(r) ? (_ = tg(r, !0),
                                    _.x += r.clientLeft,
                                    _.y += r.clientTop) : p && (_.x = tF(p))),
                                    {
                                        x: m.left + g.scrollLeft - _.x,
                                        y: m.top + g.scrollTop - _.y,
                                        width: m.width,
                                        height: m.height
                                    }),
                                    popper: t_(i)
                                },
                                o.reset = !1,
                                o.placement = o.options.placement,
                                o.orderedModifiers.forEach(function(e) {
                                    return o.modifiersData[e.name] = Object.assign({}, e.data)
                                });
                                for (var n, r, s, a, d, u, h, f, p, m, g, _, b = 0; b < o.orderedModifiers.length; b++) {
                                    if (!0 === o.reset) {
                                        o.reset = !1,
                                        b = -1;
                                        continue
                                    }
                                    var v = o.orderedModifiers[b]
                                      , y = v.fn
                                      , w = v.options
                                      , A = void 0 === w ? {} : w
                                      , E = v.name;
                                    "function" == typeof y && (o = y({
                                        state: o,
                                        options: A,
                                        name: E,
                                        instance: c
                                    }) || o)
                                }
                            }
                        }
                    },
                    update: function() {
                        return r || (r = new Promise(function(e) {
                            Promise.resolve().then(function() {
                                r = void 0,
                                e(new Promise(function(e) {
                                    c.forceUpdate(),
                                    e(o)
                                }
                                ))
                            })
                        }
                        )),
                        r
                    },
                    destroy: function() {
                        d(),
                        l = !0
                    }
                };
                if (!t2(e, t))
                    return c;
                function d() {
                    a.forEach(function(e) {
                        return e()
                    }),
                    a = []
                }
                return c.setOptions(i).then(function(e) {
                    !l && i.onFirstUpdate && i.onFirstUpdate(e)
                }),
                c
            }
        }
        var t6 = t3()
          , t5 = t3({
            defaultModifiers: [tP, tZ, tD, tc]
        })
          , t9 = t3({
            defaultModifiers: [tP, tZ, tD, tc, tG, tQ, t0, tC, tJ]
        });
        let t4 = Object.freeze(Object.defineProperty({
            __proto__: null,
            popperGenerator: t3,
            detectOverflow: tK,
            createPopperBase: t6,
            createPopper: t9,
            createPopperLite: t5,
            top: "top",
            bottom: eU,
            right: eK,
            left: eQ,
            auto: eX,
            basePlacements: eY,
            start: eJ,
            end: "end",
            clippingParents: eG,
            viewport: eZ,
            popper: e0,
            reference: e1,
            variationPlacements: e2,
            placements: e3,
            beforeRead: e6,
            read: e5,
            afterRead: e9,
            beforeMain: e4,
            main: e8,
            afterMain: e7,
            beforeWrite: te,
            write: tt,
            afterWrite: ti,
            modifierPhases: tn,
            applyStyles: tc,
            arrow: tC,
            computeStyles: tD,
            eventListeners: tP,
            flip: tQ,
            hide: tJ,
            offset: tG,
            popperOffsets: tZ,
            preventOverflow: t0
        }, Symbol.toStringTag, {
            value: "Module"
        }))
          , t8 = "dropdown"
          , t7 = ".bs.dropdown"
          , ie = ".data-api"
          , it = "ArrowDown"
          , ii = `hide${t7}`
          , ir = `hidden${t7}`
          , is = `show${t7}`
          , io = `shown${t7}`
          , ia = `click${t7}${ie}`
          , il = `keydown${t7}${ie}`
          , ic = `keyup${t7}${ie}`
          , id = "show"
          , iu = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)'
          , ih = `${iu}.${id}`
          , ip = ".dropdown-menu"
          , im = b() ? "top-end" : "top-start"
          , ig = b() ? "top-start" : "top-end"
          , i_ = b() ? "bottom-end" : "bottom-start"
          , ib = b() ? "bottom-start" : "bottom-end"
          , iv = b() ? "left-start" : "right-start"
          , iy = b() ? "right-start" : "left-start"
          , iw = {
            autoClose: !0,
            boundary: "clippingParents",
            display: "dynamic",
            offset: [0, 2],
            popperConfig: null,
            reference: "toggle"
        }
          , iA = {
            autoClose: "(boolean|string)",
            boundary: "(string|element)",
            display: "string",
            offset: "(array|string|function)",
            popperConfig: "(null|object|function)",
            reference: "(string|element|object)"
        };
        class iE extends V {
            constructor(e, t) {
                super(e, t),
                this._popper = null,
                this._parent = this._element.parentNode,
                this._menu = Z.next(this._element, ip)[0] || Z.prev(this._element, ip)[0] || Z.findOne(ip, this._parent),
                this._inNavbar = this._detectNavbar()
            }
            static get Default() {
                return iw
            }
            static get DefaultType() {
                return iA
            }
            static get NAME() {
                return t8
            }
            toggle() {
                return this._isShown() ? this.hide() : this.show()
            }
            show() {
                if (u(this._element) || this._isShown())
                    return;
                let e = {
                    relatedTarget: this._element
                }
                  , t = I.trigger(this._element, is, e);
                if (!t.defaultPrevented) {
                    if (this._createPopper(),
                    "ontouchstart"in document.documentElement && !this._parent.closest(".navbar-nav"))
                        for (let e of [].concat(...document.body.children))
                            I.on(e, "mouseover", f);
                    this._element.focus(),
                    this._element.setAttribute("aria-expanded", !0),
                    this._menu.classList.add(id),
                    this._element.classList.add(id),
                    I.trigger(this._element, io, e)
                }
            }
            hide() {
                if (u(this._element) || !this._isShown())
                    return;
                let e = {
                    relatedTarget: this._element
                };
                this._completeHide(e)
            }
            dispose() {
                this._popper && this._popper.destroy(),
                super.dispose()
            }
            update() {
                this._inNavbar = this._detectNavbar(),
                this._popper && this._popper.update()
            }
            _completeHide(e) {
                let t = I.trigger(this._element, ii, e);
                if (!t.defaultPrevented) {
                    if ("ontouchstart"in document.documentElement)
                        for (let e of [].concat(...document.body.children))
                            I.off(e, "mouseover", f);
                    this._popper && this._popper.destroy(),
                    this._menu.classList.remove(id),
                    this._element.classList.remove(id),
                    this._element.setAttribute("aria-expanded", "false"),
                    R.removeDataAttribute(this._menu, "popper"),
                    I.trigger(this._element, ir, e)
                }
            }
            _getConfig(e) {
                if ("object" == typeof (e = super._getConfig(e)).reference && !l(e.reference) && "function" != typeof e.reference.getBoundingClientRect)
                    throw TypeError(`${t8.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
                return e
            }
            _createPopper() {
                if (void 0 === t4)
                    throw TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
                let e = this._element;
                "parent" === this._config.reference ? e = this._parent : l(this._config.reference) ? e = c(this._config.reference) : "object" == typeof this._config.reference && (e = this._config.reference);
                let t = this._getPopperConfig();
                this._popper = t9(e, this._menu, t)
            }
            _isShown() {
                return this._menu.classList.contains(id)
            }
            _getPlacement() {
                let e = this._parent;
                if (e.classList.contains("dropend"))
                    return iv;
                if (e.classList.contains("dropstart"))
                    return iy;
                if (e.classList.contains("dropup-center"))
                    return "top";
                if (e.classList.contains("dropdown-center"))
                    return "bottom";
                let t = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
                return e.classList.contains("dropup") ? t ? ig : im : t ? ib : i_
            }
            _detectNavbar() {
                return null !== this._element.closest(".navbar")
            }
            _getOffset() {
                let {offset: e} = this._config;
                return "string" == typeof e ? e.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof e ? t => e(t, this._element) : e
            }
            _getPopperConfig() {
                let e = {
                    placement: this._getPlacement(),
                    modifiers: [{
                        name: "preventOverflow",
                        options: {
                            boundary: this._config.boundary
                        }
                    }, {
                        name: "offset",
                        options: {
                            offset: this._getOffset()
                        }
                    }]
                };
                return (this._inNavbar || "static" === this._config.display) && (R.setDataAttribute(this._menu, "popper", "static"),
                e.modifiers = [{
                    name: "applyStyles",
                    enabled: !1
                }]),
                {
                    ...e,
                    ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(e) : this._config.popperConfig
                }
            }
            _selectMenuItem({key: e, target: t}) {
                let i = Z.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(e => d(e));
                i.length && A(i, t, e === it, !i.includes(t)).focus()
            }
            static jQueryInterface(e) {
                return this.each(function() {
                    let t = iE.getOrCreateInstance(this, e);
                    if ("string" == typeof e) {
                        if (void 0 === t[e])
                            throw TypeError(`No method named "${e}"`);
                        t[e]()
                    }
                })
            }
            static clearMenus(e) {
                if (2 === e.button || "keyup" === e.type && "Tab" !== e.key)
                    return;
                let t = Z.find(ih);
                for (let i of t) {
                    let t = iE.getInstance(i);
                    if (!t || !1 === t._config.autoClose)
                        continue;
                    let n = e.composedPath()
                      , r = n.includes(t._menu);
                    if (n.includes(t._element) || "inside" === t._config.autoClose && !r || "outside" === t._config.autoClose && r || t._menu.contains(e.target) && ("keyup" === e.type && "Tab" === e.key || /input|select|option|textarea|form/i.test(e.target.tagName)))
                        continue;
                    let s = {
                        relatedTarget: t._element
                    };
                    "click" === e.type && (s.clickEvent = e),
                    t._completeHide(s)
                }
            }
            static dataApiKeydownHandler(e) {
                let t = /input|textarea/i.test(e.target.tagName)
                  , i = "Escape" === e.key
                  , n = ["ArrowUp", it].includes(e.key);
                if (!n && !i || t && !i)
                    return;
                e.preventDefault();
                let r = this.matches(iu) ? this : Z.prev(this, iu)[0] || Z.next(this, iu)[0] || Z.findOne(iu, e.delegateTarget.parentNode)
                  , s = iE.getOrCreateInstance(r);
                if (n) {
                    e.stopPropagation(),
                    s.show(),
                    s._selectMenuItem(e);
                    return
                }
                s._isShown() && (e.stopPropagation(),
                s.hide(),
                r.focus())
            }
        }
        I.on(document, il, iu, iE.dataApiKeydownHandler),
        I.on(document, il, ip, iE.dataApiKeydownHandler),
        I.on(document, ia, iE.clearMenus),
        I.on(document, ic, iE.clearMenus),
        I.on(document, ia, iu, function(e) {
            e.preventDefault(),
            iE.getOrCreateInstance(this).toggle()
        }),
        v(iE);
        let iS = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
          , iL = ".sticky-top"
          , iT = "padding-right"
          , ix = "margin-right";
        class ik {
            constructor() {
                this._element = document.body
            }
            getWidth() {
                let e = document.documentElement.clientWidth;
                return Math.abs(window.innerWidth - e)
            }
            hide() {
                let e = this.getWidth();
                this._disableOverFlow(),
                this._setElementAttributes(this._element, iT, t => t + e),
                this._setElementAttributes(iS, iT, t => t + e),
                this._setElementAttributes(iL, ix, t => t - e)
            }
            reset() {
                this._resetElementAttributes(this._element, "overflow"),
                this._resetElementAttributes(this._element, iT),
                this._resetElementAttributes(iS, iT),
                this._resetElementAttributes(iL, ix)
            }
            isOverflowing() {
                return this.getWidth() > 0
            }
            _disableOverFlow() {
                this._saveInitialAttribute(this._element, "overflow"),
                this._element.style.overflow = "hidden"
            }
            _setElementAttributes(e, t, i) {
                let n = this.getWidth();
                this._applyManipulationCallback(e, e => {
                    if (e !== this._element && window.innerWidth > e.clientWidth + n)
                        return;
                    this._saveInitialAttribute(e, t);
                    let r = window.getComputedStyle(e).getPropertyValue(t);
                    e.style.setProperty(t, `${i(Number.parseFloat(r))}px`)
                }
                )
            }
            _saveInitialAttribute(e, t) {
                let i = e.style.getPropertyValue(t);
                i && R.setDataAttribute(e, t, i)
            }
            _resetElementAttributes(e, t) {
                this._applyManipulationCallback(e, e => {
                    let i = R.getDataAttribute(e, t);
                    if (null === i) {
                        e.style.removeProperty(t);
                        return
                    }
                    R.removeDataAttribute(e, t),
                    e.style.setProperty(t, i)
                }
                )
            }
            _applyManipulationCallback(e, t) {
                if (l(e)) {
                    t(e);
                    return
                }
                for (let i of Z.find(e, this._element))
                    t(i)
            }
        }
        let iC = "backdrop"
          , iO = "show"
          , i$ = `mousedown.bs.${iC}`
          , iq = {
            className: "modal-backdrop",
            clickCallback: null,
            isAnimated: !1,
            isVisible: !0,
            rootElement: "body"
        }
          , iD = {
            className: "string",
            clickCallback: "(function|null)",
            isAnimated: "boolean",
            isVisible: "boolean",
            rootElement: "(element|string)"
        };
        class iN extends B {
            constructor(e) {
                super(),
                this._config = this._getConfig(e),
                this._isAppended = !1,
                this._element = null
            }
            static get Default() {
                return iq
            }
            static get DefaultType() {
                return iD
            }
            static get NAME() {
                return iC
            }
            show(e) {
                if (!this._config.isVisible) {
                    y(e);
                    return
                }
                this._append();
                let t = this._getElement();
                this._config.isAnimated && p(t),
                t.classList.add(iO),
                this._emulateAnimation( () => {
                    y(e)
                }
                )
            }
            hide(e) {
                if (!this._config.isVisible) {
                    y(e);
                    return
                }
                this._getElement().classList.remove(iO),
                this._emulateAnimation( () => {
                    this.dispose(),
                    y(e)
                }
                )
            }
            dispose() {
                this._isAppended && (I.off(this._element, i$),
                this._element.remove(),
                this._isAppended = !1)
            }
            _getElement() {
                if (!this._element) {
                    let e = document.createElement("div");
                    e.className = this._config.className,
                    this._config.isAnimated && e.classList.add("fade"),
                    this._element = e
                }
                return this._element
            }
            _configAfterMerge(e) {
                return e.rootElement = c(e.rootElement),
                e
            }
            _append() {
                if (this._isAppended)
                    return;
                let e = this._getElement();
                this._config.rootElement.append(e),
                I.on(e, i$, () => {
                    y(this._config.clickCallback)
                }
                ),
                this._isAppended = !0
            }
            _emulateAnimation(e) {
                w(e, this._getElement(), this._config.isAnimated)
            }
        }
        let iP = ".bs.focustrap"
          , ij = `focusin${iP}`
          , iI = `keydown.tab${iP}`
          , iM = "backward"
          , iz = {
            autofocus: !0,
            trapElement: null
        }
          , iH = {
            autofocus: "boolean",
            trapElement: "element"
        };
        class iF extends B {
            constructor(e) {
                super(),
                this._config = this._getConfig(e),
                this._isActive = !1,
                this._lastTabNavDirection = null
            }
            static get Default() {
                return iz
            }
            static get DefaultType() {
                return iH
            }
            static get NAME() {
                return "focustrap"
            }
            activate() {
                this._isActive || (this._config.autofocus && this._config.trapElement.focus(),
                I.off(document, iP),
                I.on(document, ij, e => this._handleFocusin(e)),
                I.on(document, iI, e => this._handleKeydown(e)),
                this._isActive = !0)
            }
            deactivate() {
                this._isActive && (this._isActive = !1,
                I.off(document, iP))
            }
            _handleFocusin(e) {
                let {trapElement: t} = this._config;
                if (e.target === document || e.target === t || t.contains(e.target))
                    return;
                let i = Z.focusableChildren(t);
                0 === i.length ? t.focus() : this._lastTabNavDirection === iM ? i[i.length - 1].focus() : i[0].focus()
            }
            _handleKeydown(e) {
                "Tab" === e.key && (this._lastTabNavDirection = e.shiftKey ? iM : "forward")
            }
        }
        let iW = ".bs.modal"
          , iR = `hide${iW}`
          , iB = `hidePrevented${iW}`
          , iV = `hidden${iW}`
          , iU = `show${iW}`
          , iK = `shown${iW}`
          , iQ = `resize${iW}`
          , iX = `click.dismiss${iW}`
          , iY = `mousedown.dismiss${iW}`
          , iJ = `keydown.dismiss${iW}`
          , iG = `click${iW}.data-api`
          , iZ = "modal-open"
          , i0 = "show"
          , i1 = "modal-static"
          , i2 = {
            backdrop: !0,
            focus: !0,
            keyboard: !0
        }
          , i3 = {
            backdrop: "(boolean|string)",
            focus: "boolean",
            keyboard: "boolean"
        };
        class i6 extends V {
            constructor(e, t) {
                super(e, t),
                this._dialog = Z.findOne(".modal-dialog", this._element),
                this._backdrop = this._initializeBackDrop(),
                this._focustrap = this._initializeFocusTrap(),
                this._isShown = !1,
                this._isTransitioning = !1,
                this._scrollBar = new ik,
                this._addEventListeners()
            }
            static get Default() {
                return i2
            }
            static get DefaultType() {
                return i3
            }
            static get NAME() {
                return "modal"
            }
            toggle(e) {
                return this._isShown ? this.hide() : this.show(e)
            }
            show(e) {
                if (this._isShown || this._isTransitioning)
                    return;
                let t = I.trigger(this._element, iU, {
                    relatedTarget: e
                });
                t.defaultPrevented || (this._isShown = !0,
                this._isTransitioning = !0,
                this._scrollBar.hide(),
                document.body.classList.add(iZ),
                this._adjustDialog(),
                this._backdrop.show( () => this._showElement(e)))
            }
            hide() {
                if (!this._isShown || this._isTransitioning)
                    return;
                let e = I.trigger(this._element, iR);
                e.defaultPrevented || (this._isShown = !1,
                this._isTransitioning = !0,
                this._focustrap.deactivate(),
                this._element.classList.remove(i0),
                this._queueCallback( () => this._hideModal(), this._element, this._isAnimated()))
            }
            dispose() {
                for (let e of [window, this._dialog])
                    I.off(e, iW);
                this._backdrop.dispose(),
                this._focustrap.deactivate(),
                super.dispose()
            }
            handleUpdate() {
                this._adjustDialog()
            }
            _initializeBackDrop() {
                return new iN({
                    isVisible: !!this._config.backdrop,
                    isAnimated: this._isAnimated()
                })
            }
            _initializeFocusTrap() {
                return new iF({
                    trapElement: this._element
                })
            }
            _showElement(e) {
                document.body.contains(this._element) || document.body.append(this._element),
                this._element.style.display = "block",
                this._element.removeAttribute("aria-hidden"),
                this._element.setAttribute("aria-modal", !0),
                this._element.setAttribute("role", "dialog"),
                this._element.scrollTop = 0;
                let t = Z.findOne(".modal-body", this._dialog);
                t && (t.scrollTop = 0),
                p(this._element),
                this._element.classList.add(i0),
                this._queueCallback( () => {
                    this._config.focus && this._focustrap.activate(),
                    this._isTransitioning = !1,
                    I.trigger(this._element, iK, {
                        relatedTarget: e
                    })
                }
                , this._dialog, this._isAnimated())
            }
            _addEventListeners() {
                I.on(this._element, iJ, e => {
                    if ("Escape" === e.key) {
                        if (this._config.keyboard) {
                            e.preventDefault(),
                            this.hide();
                            return
                        }
                        this._triggerBackdropTransition()
                    }
                }
                ),
                I.on(window, iQ, () => {
                    this._isShown && !this._isTransitioning && this._adjustDialog()
                }
                ),
                I.on(this._element, iY, e => {
                    I.one(this._element, iX, t => {
                        if (this._element === e.target && this._element === t.target) {
                            if ("static" === this._config.backdrop) {
                                this._triggerBackdropTransition();
                                return
                            }
                            this._config.backdrop && this.hide()
                        }
                    }
                    )
                }
                )
            }
            _hideModal() {
                this._element.style.display = "none",
                this._element.setAttribute("aria-hidden", !0),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                this._isTransitioning = !1,
                this._backdrop.hide( () => {
                    document.body.classList.remove(iZ),
                    this._resetAdjustments(),
                    this._scrollBar.reset(),
                    I.trigger(this._element, iV)
                }
                )
            }
            _isAnimated() {
                return this._element.classList.contains("fade")
            }
            _triggerBackdropTransition() {
                let e = I.trigger(this._element, iB);
                if (e.defaultPrevented)
                    return;
                let t = this._element.scrollHeight > document.documentElement.clientHeight
                  , i = this._element.style.overflowY;
                "hidden" === i || this._element.classList.contains(i1) || (t || (this._element.style.overflowY = "hidden"),
                this._element.classList.add(i1),
                this._queueCallback( () => {
                    this._element.classList.remove(i1),
                    this._queueCallback( () => {
                        this._element.style.overflowY = i
                    }
                    , this._dialog)
                }
                , this._dialog),
                this._element.focus())
            }
            _adjustDialog() {
                let e = this._element.scrollHeight > document.documentElement.clientHeight
                  , t = this._scrollBar.getWidth()
                  , i = t > 0;
                if (i && !e) {
                    let e = b() ? "paddingLeft" : "paddingRight";
                    this._element.style[e] = `${t}px`
                }
                if (!i && e) {
                    let e = b() ? "paddingRight" : "paddingLeft";
                    this._element.style[e] = `${t}px`
                }
            }
            _resetAdjustments() {
                this._element.style.paddingLeft = "",
                this._element.style.paddingRight = ""
            }
            static jQueryInterface(e, t) {
                return this.each(function() {
                    let i = i6.getOrCreateInstance(this, e);
                    if ("string" == typeof e) {
                        if (void 0 === i[e])
                            throw TypeError(`No method named "${e}"`);
                        i[e](t)
                    }
                })
            }
        }
        I.on(document, iG, '[data-bs-toggle="modal"]', function(e) {
            let t = s(this);
            ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
            I.one(t, iU, e => {
                e.defaultPrevented || I.one(t, iV, () => {
                    d(this) && this.focus()
                }
                )
            }
            );
            let i = Z.findOne(".modal.show");
            i && i6.getInstance(i).hide();
            let n = i6.getOrCreateInstance(t);
            n.toggle(this)
        }),
        U(i6),
        v(i6);
        let i5 = ".bs.offcanvas"
          , i9 = ".data-api"
          , i4 = `load${i5}${i9}`
          , i8 = "show"
          , i7 = "showing"
          , ne = "hiding"
          , nt = ".offcanvas.show"
          , ni = `show${i5}`
          , nn = `shown${i5}`
          , nr = `hide${i5}`
          , ns = `hidePrevented${i5}`
          , no = `hidden${i5}`
          , na = `resize${i5}`
          , nl = `click${i5}${i9}`
          , nc = `keydown.dismiss${i5}`
          , nd = {
            backdrop: !0,
            keyboard: !0,
            scroll: !1
        }
          , nu = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            scroll: "boolean"
        };
        class nh extends V {
            constructor(e, t) {
                super(e, t),
                this._isShown = !1,
                this._backdrop = this._initializeBackDrop(),
                this._focustrap = this._initializeFocusTrap(),
                this._addEventListeners()
            }
            static get Default() {
                return nd
            }
            static get DefaultType() {
                return nu
            }
            static get NAME() {
                return "offcanvas"
            }
            toggle(e) {
                return this._isShown ? this.hide() : this.show(e)
            }
            show(e) {
                if (this._isShown)
                    return;
                let t = I.trigger(this._element, ni, {
                    relatedTarget: e
                });
                t.defaultPrevented || (this._isShown = !0,
                this._backdrop.show(),
                this._config.scroll || new ik().hide(),
                this._element.setAttribute("aria-modal", !0),
                this._element.setAttribute("role", "dialog"),
                this._element.classList.add(i7),
                this._queueCallback( () => {
                    (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(),
                    this._element.classList.add(i8),
                    this._element.classList.remove(i7),
                    I.trigger(this._element, nn, {
                        relatedTarget: e
                    })
                }
                , this._element, !0))
            }
            hide() {
                if (!this._isShown)
                    return;
                let e = I.trigger(this._element, nr);
                e.defaultPrevented || (this._focustrap.deactivate(),
                this._element.blur(),
                this._isShown = !1,
                this._element.classList.add(ne),
                this._backdrop.hide(),
                this._queueCallback( () => {
                    this._element.classList.remove(i8, ne),
                    this._element.removeAttribute("aria-modal"),
                    this._element.removeAttribute("role"),
                    this._config.scroll || new ik().reset(),
                    I.trigger(this._element, no)
                }
                , this._element, !0))
            }
            dispose() {
                this._backdrop.dispose(),
                this._focustrap.deactivate(),
                super.dispose()
            }
            _initializeBackDrop() {
                let e = !!this._config.backdrop;
                return new iN({
                    className: "offcanvas-backdrop",
                    isVisible: e,
                    isAnimated: !0,
                    rootElement: this._element.parentNode,
                    clickCallback: e ? () => {
                        if ("static" === this._config.backdrop) {
                            I.trigger(this._element, ns);
                            return
                        }
                        this.hide()
                    }
                    : null
                })
            }
            _initializeFocusTrap() {
                return new iF({
                    trapElement: this._element
                })
            }
            _addEventListeners() {
                I.on(this._element, nc, e => {
                    if ("Escape" === e.key) {
                        if (!this._config.keyboard) {
                            I.trigger(this._element, ns);
                            return
                        }
                        this.hide()
                    }
                }
                )
            }
            static jQueryInterface(e) {
                return this.each(function() {
                    let t = nh.getOrCreateInstance(this, e);
                    if ("string" == typeof e) {
                        if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                            throw TypeError(`No method named "${e}"`);
                        t[e](this)
                    }
                })
            }
        }
        I.on(document, nl, '[data-bs-toggle="offcanvas"]', function(e) {
            let t = s(this);
            if (["A", "AREA"].includes(this.tagName) && e.preventDefault(),
            u(this))
                return;
            I.one(t, no, () => {
                d(this) && this.focus()
            }
            );
            let i = Z.findOne(nt);
            i && i !== t && nh.getInstance(i).hide();
            let n = nh.getOrCreateInstance(t);
            n.toggle(this)
        }),
        I.on(window, i4, () => {
            for (let e of Z.find(nt))
                nh.getOrCreateInstance(e).show()
        }
        ),
        I.on(window, na, () => {
            for (let e of Z.find("[aria-modal][class*=show][class*=offcanvas-]"))
                "fixed" !== getComputedStyle(e).position && nh.getOrCreateInstance(e).hide()
        }
        ),
        U(nh),
        v(nh);
        let nf = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"])
          , np = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i
          , nm = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i
          , ng = (e, t) => {
            let i = e.nodeName.toLowerCase();
            return t.includes(i) ? !nf.has(i) || !!(np.test(e.nodeValue) || nm.test(e.nodeValue)) : t.filter(e => e instanceof RegExp).some(e => e.test(i))
        }
          , n_ = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        }
          , nb = {
            allowList: n_,
            content: {},
            extraClass: "",
            html: !1,
            sanitize: !0,
            sanitizeFn: null,
            template: "<div></div>"
        }
          , nv = {
            allowList: "object",
            content: "object",
            extraClass: "(string|function)",
            html: "boolean",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            template: "string"
        }
          , ny = {
            entry: "(string|element|function|null)",
            selector: "(string|element)"
        };
        class nw extends B {
            constructor(e) {
                super(),
                this._config = this._getConfig(e)
            }
            static get Default() {
                return nb
            }
            static get DefaultType() {
                return nv
            }
            static get NAME() {
                return "TemplateFactory"
            }
            getContent() {
                return Object.values(this._config.content).map(e => this._resolvePossibleFunction(e)).filter(Boolean)
            }
            hasContent() {
                return this.getContent().length > 0
            }
            changeContent(e) {
                return this._checkContent(e),
                this._config.content = {
                    ...this._config.content,
                    ...e
                },
                this
            }
            toHtml() {
                let e = document.createElement("div");
                for (let[t,i] of (e.innerHTML = this._maybeSanitize(this._config.template),
                Object.entries(this._config.content)))
                    this._setContent(e, i, t);
                let t = e.children[0]
                  , i = this._resolvePossibleFunction(this._config.extraClass);
                return i && t.classList.add(...i.split(" ")),
                t
            }
            _typeCheckConfig(e) {
                super._typeCheckConfig(e),
                this._checkContent(e.content)
            }
            _checkContent(e) {
                for (let[t,i] of Object.entries(e))
                    super._typeCheckConfig({
                        selector: t,
                        entry: i
                    }, ny)
            }
            _setContent(e, t, i) {
                let n = Z.findOne(i, e);
                if (n) {
                    if (!(t = this._resolvePossibleFunction(t))) {
                        n.remove();
                        return
                    }
                    if (l(t)) {
                        this._putElementInTemplate(c(t), n);
                        return
                    }
                    if (this._config.html) {
                        n.innerHTML = this._maybeSanitize(t);
                        return
                    }
                    n.textContent = t
                }
            }
            _maybeSanitize(e) {
                return this._config.sanitize ? function(e, t, i) {
                    if (!e.length)
                        return e;
                    if (i && "function" == typeof i)
                        return i(e);
                    let n = new window.DOMParser
                      , r = n.parseFromString(e, "text/html")
                      , s = [].concat(...r.body.querySelectorAll("*"));
                    for (let e of s) {
                        let i = e.nodeName.toLowerCase();
                        if (!Object.keys(t).includes(i)) {
                            e.remove();
                            continue
                        }
                        let n = [].concat(...e.attributes)
                          , r = [].concat(t["*"] || [], t[i] || []);
                        for (let t of n)
                            ng(t, r) || e.removeAttribute(t.nodeName)
                    }
                    return r.body.innerHTML
                }(e, this._config.allowList, this._config.sanitizeFn) : e
            }
            _resolvePossibleFunction(e) {
                return "function" == typeof e ? e(this) : e
            }
            _putElementInTemplate(e, t) {
                if (this._config.html) {
                    t.innerHTML = "",
                    t.append(e);
                    return
                }
                t.textContent = e.textContent
            }
        }
        let nA = new Set(["sanitize", "allowList", "sanitizeFn"])
          , nE = "fade"
          , nS = "show"
          , nL = ".modal"
          , nT = "hide.bs.modal"
          , nx = "hover"
          , nk = "focus"
          , nC = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: b() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: b() ? "right" : "left"
        }
          , nO = {
            allowList: n_,
            animation: !0,
            boundary: "clippingParents",
            container: !1,
            customClass: "",
            delay: 0,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            html: !1,
            offset: [0, 0],
            placement: "top",
            popperConfig: null,
            sanitize: !0,
            sanitizeFn: null,
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            title: "",
            trigger: "hover focus"
        }
          , n$ = {
            allowList: "object",
            animation: "boolean",
            boundary: "(string|element)",
            container: "(string|element|boolean)",
            customClass: "(string|function)",
            delay: "(number|object)",
            fallbackPlacements: "array",
            html: "boolean",
            offset: "(array|string|function)",
            placement: "(string|function)",
            popperConfig: "(null|object|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            selector: "(string|boolean)",
            template: "string",
            title: "(string|element|function)",
            trigger: "string"
        };
        class nq extends V {
            constructor(e, t) {
                if (void 0 === t4)
                    throw TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
                super(e, t),
                this._isEnabled = !0,
                this._timeout = 0,
                this._isHovered = null,
                this._activeTrigger = {},
                this._popper = null,
                this._templateFactory = null,
                this._newContent = null,
                this.tip = null,
                this._setListeners(),
                this._config.selector || this._fixTitle()
            }
            static get Default() {
                return nO
            }
            static get DefaultType() {
                return n$
            }
            static get NAME() {
                return "tooltip"
            }
            enable() {
                this._isEnabled = !0
            }
            disable() {
                this._isEnabled = !1
            }
            toggleEnabled() {
                this._isEnabled = !this._isEnabled
            }
            toggle() {
                if (this._isEnabled) {
                    if (this._activeTrigger.click = !this._activeTrigger.click,
                    this._isShown()) {
                        this._leave();
                        return
                    }
                    this._enter()
                }
            }
            dispose() {
                clearTimeout(this._timeout),
                I.off(this._element.closest(nL), nT, this._hideModalHandler),
                this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")),
                this._disposePopper(),
                super.dispose()
            }
            show() {
                if ("none" === this._element.style.display)
                    throw Error("Please use show on visible elements");
                if (!(this._isWithContent() && this._isEnabled))
                    return;
                let e = I.trigger(this._element, this.constructor.eventName("show"))
                  , t = h(this._element)
                  , i = (t || this._element.ownerDocument.documentElement).contains(this._element);
                if (e.defaultPrevented || !i)
                    return;
                this._disposePopper();
                let n = this._getTipElement();
                this._element.setAttribute("aria-describedby", n.getAttribute("id"));
                let {container: r} = this._config;
                if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(n),
                I.trigger(this._element, this.constructor.eventName("inserted"))),
                this._popper = this._createPopper(n),
                n.classList.add(nS),
                "ontouchstart"in document.documentElement)
                    for (let e of [].concat(...document.body.children))
                        I.on(e, "mouseover", f);
                this._queueCallback( () => {
                    I.trigger(this._element, this.constructor.eventName("shown")),
                    !1 === this._isHovered && this._leave(),
                    this._isHovered = !1
                }
                , this.tip, this._isAnimated())
            }
            hide() {
                if (!this._isShown())
                    return;
                let e = I.trigger(this._element, this.constructor.eventName("hide"));
                if (e.defaultPrevented)
                    return;
                let t = this._getTipElement();
                if (t.classList.remove(nS),
                "ontouchstart"in document.documentElement)
                    for (let e of [].concat(...document.body.children))
                        I.off(e, "mouseover", f);
                this._activeTrigger.click = !1,
                this._activeTrigger[nk] = !1,
                this._activeTrigger[nx] = !1,
                this._isHovered = null,
                this._queueCallback( () => {
                    this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(),
                    this._element.removeAttribute("aria-describedby"),
                    I.trigger(this._element, this.constructor.eventName("hidden")))
                }
                , this.tip, this._isAnimated())
            }
            update() {
                this._popper && this._popper.update()
            }
            _isWithContent() {
                return !!this._getTitle()
            }
            _getTipElement() {
                return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())),
                this.tip
            }
            _createTipElement(e) {
                let t = this._getTemplateFactory(e).toHtml();
                if (!t)
                    return null;
                t.classList.remove(nE, nS),
                t.classList.add(`bs-${this.constructor.NAME}-auto`);
                let n = i(this.constructor.NAME).toString();
                return t.setAttribute("id", n),
                this._isAnimated() && t.classList.add(nE),
                t
            }
            setContent(e) {
                this._newContent = e,
                this._isShown() && (this._disposePopper(),
                this.show())
            }
            _getTemplateFactory(e) {
                return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new nw({
                    ...this._config,
                    content: e,
                    extraClass: this._resolvePossibleFunction(this._config.customClass)
                }),
                this._templateFactory
            }
            _getContentForTemplate() {
                return {
                    ".tooltip-inner": this._getTitle()
                }
            }
            _getTitle() {
                return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
            }
            _initializeOnDelegatedTarget(e) {
                return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig())
            }
            _isAnimated() {
                return this._config.animation || this.tip && this.tip.classList.contains(nE)
            }
            _isShown() {
                return this.tip && this.tip.classList.contains(nS)
            }
            _createPopper(e) {
                let t = "function" == typeof this._config.placement ? this._config.placement.call(this, e, this._element) : this._config.placement
                  , i = nC[t.toUpperCase()];
                return t9(this._element, e, this._getPopperConfig(i))
            }
            _getOffset() {
                let {offset: e} = this._config;
                return "string" == typeof e ? e.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof e ? t => e(t, this._element) : e
            }
            _resolvePossibleFunction(e) {
                return "function" == typeof e ? e.call(this._element) : e
            }
            _getPopperConfig(e) {
                let t = {
                    placement: e,
                    modifiers: [{
                        name: "flip",
                        options: {
                            fallbackPlacements: this._config.fallbackPlacements
                        }
                    }, {
                        name: "offset",
                        options: {
                            offset: this._getOffset()
                        }
                    }, {
                        name: "preventOverflow",
                        options: {
                            boundary: this._config.boundary
                        }
                    }, {
                        name: "arrow",
                        options: {
                            element: `.${this.constructor.NAME}-arrow`
                        }
                    }, {
                        name: "preSetPlacement",
                        enabled: !0,
                        phase: "beforeMain",
                        fn: e => {
                            this._getTipElement().setAttribute("data-popper-placement", e.state.placement)
                        }
                    }]
                };
                return {
                    ...t,
                    ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(t) : this._config.popperConfig
                }
            }
            _setListeners() {
                let e = this._config.trigger.split(" ");
                for (let t of e)
                    if ("click" === t)
                        I.on(this._element, this.constructor.eventName("click"), this._config.selector, e => {
                            let t = this._initializeOnDelegatedTarget(e);
                            t.toggle()
                        }
                        );
                    else if ("manual" !== t) {
                        let e = t === nx ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin")
                          , i = t === nx ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
                        I.on(this._element, e, this._config.selector, e => {
                            let t = this._initializeOnDelegatedTarget(e);
                            t._activeTrigger["focusin" === e.type ? nk : nx] = !0,
                            t._enter()
                        }
                        ),
                        I.on(this._element, i, this._config.selector, e => {
                            let t = this._initializeOnDelegatedTarget(e);
                            t._activeTrigger["focusout" === e.type ? nk : nx] = t._element.contains(e.relatedTarget),
                            t._leave()
                        }
                        )
                    }
                this._hideModalHandler = () => {
                    this._element && this.hide()
                }
                ,
                I.on(this._element.closest(nL), nT, this._hideModalHandler)
            }
            _fixTitle() {
                let e = this._element.getAttribute("title");
                e && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", e),
                this._element.setAttribute("data-bs-original-title", e),
                this._element.removeAttribute("title"))
            }
            _enter() {
                if (this._isShown() || this._isHovered) {
                    this._isHovered = !0;
                    return
                }
                this._isHovered = !0,
                this._setTimeout( () => {
                    this._isHovered && this.show()
                }
                , this._config.delay.show)
            }
            _leave() {
                this._isWithActiveTrigger() || (this._isHovered = !1,
                this._setTimeout( () => {
                    this._isHovered || this.hide()
                }
                , this._config.delay.hide))
            }
            _setTimeout(e, t) {
                clearTimeout(this._timeout),
                this._timeout = setTimeout(e, t)
            }
            _isWithActiveTrigger() {
                return Object.values(this._activeTrigger).includes(!0)
            }
            _getConfig(e) {
                let t = R.getDataAttributes(this._element);
                for (let e of Object.keys(t))
                    nA.has(e) && delete t[e];
                return e = {
                    ...t,
                    ..."object" == typeof e && e ? e : {}
                },
                e = this._mergeConfigObj(e),
                e = this._configAfterMerge(e),
                this._typeCheckConfig(e),
                e
            }
            _configAfterMerge(e) {
                return e.container = !1 === e.container ? document.body : c(e.container),
                "number" == typeof e.delay && (e.delay = {
                    show: e.delay,
                    hide: e.delay
                }),
                "number" == typeof e.title && (e.title = e.title.toString()),
                "number" == typeof e.content && (e.content = e.content.toString()),
                e
            }
            _getDelegateConfig() {
                let e = {};
                for (let t in this._config)
                    this.constructor.Default[t] !== this._config[t] && (e[t] = this._config[t]);
                return e.selector = !1,
                e.trigger = "manual",
                e
            }
            _disposePopper() {
                this._popper && (this._popper.destroy(),
                this._popper = null),
                this.tip && (this.tip.remove(),
                this.tip = null)
            }
            static jQueryInterface(e) {
                return this.each(function() {
                    let t = nq.getOrCreateInstance(this, e);
                    if ("string" == typeof e) {
                        if (void 0 === t[e])
                            throw TypeError(`No method named "${e}"`);
                        t[e]()
                    }
                })
            }
        }
        v(nq);
        let nD = {
            ...nq.Default,
            content: "",
            offset: [0, 8],
            placement: "right",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            trigger: "click"
        }
          , nN = {
            ...nq.DefaultType,
            content: "(null|string|element|function)"
        };
        class nP extends nq {
            static get Default() {
                return nD
            }
            static get DefaultType() {
                return nN
            }
            static get NAME() {
                return "popover"
            }
            _isWithContent() {
                return this._getTitle() || this._getContent()
            }
            _getContentForTemplate() {
                return {
                    ".popover-header": this._getTitle(),
                    ".popover-body": this._getContent()
                }
            }
            _getContent() {
                return this._resolvePossibleFunction(this._config.content)
            }
            static jQueryInterface(e) {
                return this.each(function() {
                    let t = nP.getOrCreateInstance(this, e);
                    if ("string" == typeof e) {
                        if (void 0 === t[e])
                            throw TypeError(`No method named "${e}"`);
                        t[e]()
                    }
                })
            }
        }
        v(nP);
        let nj = ".bs.scrollspy"
          , nI = `activate${nj}`
          , nM = `click${nj}`
          , nz = `load${nj}.data-api`
          , nH = "active"
          , nF = "[href]"
          , nW = ".nav-link"
          , nR = `${nW}, .nav-item > ${nW}, .list-group-item`
          , nB = {
            offset: null,
            rootMargin: "0px 0px -25%",
            smoothScroll: !1,
            target: null,
            threshold: [.1, .5, 1]
        }
          , nV = {
            offset: "(number|null)",
            rootMargin: "string",
            smoothScroll: "boolean",
            target: "element",
            threshold: "array"
        };
        class nU extends V {
            constructor(e, t) {
                super(e, t),
                this._targetLinks = new Map,
                this._observableSections = new Map,
                this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element,
                this._activeTarget = null,
                this._observer = null,
                this._previousScrollData = {
                    visibleEntryTop: 0,
                    parentScrollTop: 0
                },
                this.refresh()
            }
            static get Default() {
                return nB
            }
            static get DefaultType() {
                return nV
            }
            static get NAME() {
                return "scrollspy"
            }
            refresh() {
                for (let e of (this._initializeTargetsAndObservables(),
                this._maybeEnableSmoothScroll(),
                this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver(),
                this._observableSections.values()))
                    this._observer.observe(e)
            }
            dispose() {
                this._observer.disconnect(),
                super.dispose()
            }
            _configAfterMerge(e) {
                return e.target = c(e.target) || document.body,
                e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin,
                "string" == typeof e.threshold && (e.threshold = e.threshold.split(",").map(e => Number.parseFloat(e))),
                e
            }
            _maybeEnableSmoothScroll() {
                this._config.smoothScroll && (I.off(this._config.target, nM),
                I.on(this._config.target, nM, nF, e => {
                    let t = this._observableSections.get(e.target.hash);
                    if (t) {
                        e.preventDefault();
                        let i = this._rootElement || window
                          , n = t.offsetTop - this._element.offsetTop;
                        if (i.scrollTo) {
                            i.scrollTo({
                                top: n,
                                behavior: "smooth"
                            });
                            return
                        }
                        i.scrollTop = n
                    }
                }
                ))
            }
            _getNewObserver() {
                let e = {
                    root: this._rootElement,
                    threshold: this._config.threshold,
                    rootMargin: this._config.rootMargin
                };
                return new IntersectionObserver(e => this._observerCallback(e),e)
            }
            _observerCallback(e) {
                let t = e => this._targetLinks.get(`#${e.target.id}`)
                  , i = e => {
                    this._previousScrollData.visibleEntryTop = e.target.offsetTop,
                    this._process(t(e))
                }
                  , n = (this._rootElement || document.documentElement).scrollTop
                  , r = n >= this._previousScrollData.parentScrollTop;
                for (let s of (this._previousScrollData.parentScrollTop = n,
                e)) {
                    if (!s.isIntersecting) {
                        this._activeTarget = null,
                        this._clearActiveClass(t(s));
                        continue
                    }
                    let e = s.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                    if (r && e) {
                        if (i(s),
                        !n)
                            return;
                        continue
                    }
                    r || e || i(s)
                }
            }
            _initializeTargetsAndObservables() {
                this._targetLinks = new Map,
                this._observableSections = new Map;
                let e = Z.find(nF, this._config.target);
                for (let t of e) {
                    if (!t.hash || u(t))
                        continue;
                    let e = Z.findOne(t.hash, this._element);
                    d(e) && (this._targetLinks.set(t.hash, t),
                    this._observableSections.set(t.hash, e))
                }
            }
            _process(e) {
                this._activeTarget !== e && (this._clearActiveClass(this._config.target),
                this._activeTarget = e,
                e.classList.add(nH),
                this._activateParents(e),
                I.trigger(this._element, nI, {
                    relatedTarget: e
                }))
            }
            _activateParents(e) {
                if (e.classList.contains("dropdown-item")) {
                    Z.findOne(".dropdown-toggle", e.closest(".dropdown")).classList.add(nH);
                    return
                }
                for (let t of Z.parents(e, ".nav, .list-group"))
                    for (let e of Z.prev(t, nR))
                        e.classList.add(nH)
            }
            _clearActiveClass(e) {
                e.classList.remove(nH);
                let t = Z.find(`${nF}.${nH}`, e);
                for (let e of t)
                    e.classList.remove(nH)
            }
            static jQueryInterface(e) {
                return this.each(function() {
                    let t = nU.getOrCreateInstance(this, e);
                    if ("string" == typeof e) {
                        if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                            throw TypeError(`No method named "${e}"`);
                        t[e]()
                    }
                })
            }
        }
        I.on(window, nz, () => {
            for (let e of Z.find('[data-bs-spy="scroll"]'))
                nU.getOrCreateInstance(e)
        }
        ),
        v(nU);
        let nK = ".bs.tab"
          , nQ = `hide${nK}`
          , nX = `hidden${nK}`
          , nY = `show${nK}`
          , nJ = `shown${nK}`
          , nG = `click${nK}`
          , nZ = `keydown${nK}`
          , n0 = `load${nK}`
          , n1 = "ArrowRight"
          , n2 = "ArrowDown"
          , n3 = "active"
          , n6 = "fade"
          , n5 = "show"
          , n9 = ":not(.dropdown-toggle)"
          , n4 = `.nav-link${n9}, .list-group-item${n9}, [role="tab"]${n9}`
          , n8 = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'
          , n7 = `${n4}, ${n8}`
          , re = `.${n3}[data-bs-toggle="tab"], .${n3}[data-bs-toggle="pill"], .${n3}[data-bs-toggle="list"]`;
        class rt extends V {
            constructor(e) {
                if (super(e),
                this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'),
                !this._parent)
                    return;
                this._setInitialAttributes(this._parent, this._getChildren()),
                I.on(this._element, nZ, e => this._keydown(e))
            }
            static get NAME() {
                return "tab"
            }
            show() {
                let e = this._element;
                if (this._elemIsActive(e))
                    return;
                let t = this._getActiveElem()
                  , i = t ? I.trigger(t, nQ, {
                    relatedTarget: e
                }) : null
                  , n = I.trigger(e, nY, {
                    relatedTarget: t
                });
                n.defaultPrevented || i && i.defaultPrevented || (this._deactivate(t, e),
                this._activate(e, t))
            }
            _activate(e, t) {
                e && (e.classList.add(n3),
                this._activate(s(e)),
                this._queueCallback( () => {
                    if ("tab" !== e.getAttribute("role")) {
                        e.classList.add(n5);
                        return
                    }
                    e.removeAttribute("tabindex"),
                    e.setAttribute("aria-selected", !0),
                    this._toggleDropDown(e, !0),
                    I.trigger(e, nJ, {
                        relatedTarget: t
                    })
                }
                , e, e.classList.contains(n6)))
            }
            _deactivate(e, t) {
                e && (e.classList.remove(n3),
                e.blur(),
                this._deactivate(s(e)),
                this._queueCallback( () => {
                    if ("tab" !== e.getAttribute("role")) {
                        e.classList.remove(n5);
                        return
                    }
                    e.setAttribute("aria-selected", !1),
                    e.setAttribute("tabindex", "-1"),
                    this._toggleDropDown(e, !1),
                    I.trigger(e, nX, {
                        relatedTarget: t
                    })
                }
                , e, e.classList.contains(n6)))
            }
            _keydown(e) {
                if (!["ArrowLeft", n1, "ArrowUp", n2].includes(e.key))
                    return;
                e.stopPropagation(),
                e.preventDefault();
                let t = [n1, n2].includes(e.key)
                  , i = A(this._getChildren().filter(e => !u(e)), e.target, t, !0);
                i && (i.focus({
                    preventScroll: !0
                }),
                rt.getOrCreateInstance(i).show())
            }
            _getChildren() {
                return Z.find(n7, this._parent)
            }
            _getActiveElem() {
                return this._getChildren().find(e => this._elemIsActive(e)) || null
            }
            _setInitialAttributes(e, t) {
                for (let i of (this._setAttributeIfNotExists(e, "role", "tablist"),
                t))
                    this._setInitialAttributesOnChild(i)
            }
            _setInitialAttributesOnChild(e) {
                e = this._getInnerElement(e);
                let t = this._elemIsActive(e)
                  , i = this._getOuterElement(e);
                e.setAttribute("aria-selected", t),
                i !== e && this._setAttributeIfNotExists(i, "role", "presentation"),
                t || e.setAttribute("tabindex", "-1"),
                this._setAttributeIfNotExists(e, "role", "tab"),
                this._setInitialAttributesOnTargetPanel(e)
            }
            _setInitialAttributesOnTargetPanel(e) {
                let t = s(e);
                t && (this._setAttributeIfNotExists(t, "role", "tabpanel"),
                e.id && this._setAttributeIfNotExists(t, "aria-labelledby", `#${e.id}`))
            }
            _toggleDropDown(e, t) {
                let i = this._getOuterElement(e);
                if (!i.classList.contains("dropdown"))
                    return;
                let n = (e, n) => {
                    let r = Z.findOne(e, i);
                    r && r.classList.toggle(n, t)
                }
                ;
                n(".dropdown-toggle", n3),
                n(".dropdown-menu", n5),
                i.setAttribute("aria-expanded", t)
            }
            _setAttributeIfNotExists(e, t, i) {
                e.hasAttribute(t) || e.setAttribute(t, i)
            }
            _elemIsActive(e) {
                return e.classList.contains(n3)
            }
            _getInnerElement(e) {
                return e.matches(n7) ? e : Z.findOne(n7, e)
            }
            _getOuterElement(e) {
                return e.closest(".nav-item, .list-group-item") || e
            }
            static jQueryInterface(e) {
                return this.each(function() {
                    let t = rt.getOrCreateInstance(this);
                    if ("string" == typeof e) {
                        if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                            throw TypeError(`No method named "${e}"`);
                        t[e]()
                    }
                })
            }
        }
        I.on(document, nG, n8, function(e) {
            ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
            u(this) || rt.getOrCreateInstance(this).show()
        }),
        I.on(window, n0, () => {
            for (let e of Z.find(re))
                rt.getOrCreateInstance(e)
        }
        ),
        v(rt);
        let ri = ".bs.toast"
          , rn = `mouseover${ri}`
          , rr = `mouseout${ri}`
          , rs = `focusin${ri}`
          , ro = `focusout${ri}`
          , ra = `hide${ri}`
          , rl = `hidden${ri}`
          , rc = `show${ri}`
          , rd = `shown${ri}`
          , ru = "hide"
          , rh = "show"
          , rf = "showing"
          , rp = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        }
          , rm = {
            animation: !0,
            autohide: !0,
            delay: 5e3
        };
        class rg extends V {
            constructor(e, t) {
                super(e, t),
                this._timeout = null,
                this._hasMouseInteraction = !1,
                this._hasKeyboardInteraction = !1,
                this._setListeners()
            }
            static get Default() {
                return rm
            }
            static get DefaultType() {
                return rp
            }
            static get NAME() {
                return "toast"
            }
            show() {
                let e = I.trigger(this._element, rc);
                e.defaultPrevented || (this._clearTimeout(),
                this._config.animation && this._element.classList.add("fade"),
                this._element.classList.remove(ru),
                p(this._element),
                this._element.classList.add(rh, rf),
                this._queueCallback( () => {
                    this._element.classList.remove(rf),
                    I.trigger(this._element, rd),
                    this._maybeScheduleHide()
                }
                , this._element, this._config.animation))
            }
            hide() {
                if (!this.isShown())
                    return;
                let e = I.trigger(this._element, ra);
                e.defaultPrevented || (this._element.classList.add(rf),
                this._queueCallback( () => {
                    this._element.classList.add(ru),
                    this._element.classList.remove(rf, rh),
                    I.trigger(this._element, rl)
                }
                , this._element, this._config.animation))
            }
            dispose() {
                this._clearTimeout(),
                this.isShown() && this._element.classList.remove(rh),
                super.dispose()
            }
            isShown() {
                return this._element.classList.contains(rh)
            }
            _maybeScheduleHide() {
                this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout( () => {
                    this.hide()
                }
                , this._config.delay)))
            }
            _onInteraction(e, t) {
                switch (e.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = t;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = t
                }
                if (t) {
                    this._clearTimeout();
                    return
                }
                let i = e.relatedTarget;
                this._element === i || this._element.contains(i) || this._maybeScheduleHide()
            }
            _setListeners() {
                I.on(this._element, rn, e => this._onInteraction(e, !0)),
                I.on(this._element, rr, e => this._onInteraction(e, !1)),
                I.on(this._element, rs, e => this._onInteraction(e, !0)),
                I.on(this._element, ro, e => this._onInteraction(e, !1))
            }
            _clearTimeout() {
                clearTimeout(this._timeout),
                this._timeout = null
            }
            static jQueryInterface(e) {
                return this.each(function() {
                    let t = rg.getOrCreateInstance(this, e);
                    if ("string" == typeof e) {
                        if (void 0 === t[e])
                            throw TypeError(`No method named "${e}"`);
                        t[e](this)
                    }
                })
            }
        }
        U(rg),
        v(rg)
    }
    )(),
    document.querySelectorAll(".contact-form__component").forEach(e => {
        e.querySelector("form").addEventListener("submit", async function(t) {
            t.preventDefault(),
            t.stopPropagation();
            let i = e.querySelector(".success-message");
            i.classList.add("d-none"),
            i.innerText = "";
            let n = t.currentTarget
              , r = Array.from(new FormData(n).keys())
              , s = Array.from(new FormData(n).values())
              , o = {};
            r.forEach( (e, t) => {
                o[e] = s[t]
            }
            ),
            o.token = await window.grecaptcha.execute(window.recaptchaPublic, {
                action: "FormSubmit"
            });
            let a = e.querySelectorAll("input, textarea");
            a.forEach(e => e.setAttribute("disabled", ""));
            let l = e.querySelector('button[type="submit"]');
            l.setAttribute("disabled", "");
            let c = e.querySelectorAll("#applicateOther, #applicateMySelf");
            c.forEach(e => e.setAttribute("disabled", "")),
            l.querySelector(".spinner-border").classList.remove("d-none"),
            fetch(n.getAttribute("action"), {
                method: n.getAttribute("method"),
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(o)
            }).then(async e => {
                if (n.querySelectorAll(".error-message").forEach(e => {
                    e.classList.add("d-none"),
                    e.innerText = ""
                }
                ),
                c.forEach(e => e.removeAttribute("disabled")),
                l.querySelector(".spinner-border").classList.add("d-none"),
                200 != e.status) {
                    let t = await e.json();
                    n.querySelectorAll(".error-message").forEach(e => {
                        let i = e.getAttribute("data-related");
                        t[i] && (e.innerText = t[i],
                        e.classList.remove("d-none"))
                    }
                    ),
                    a.forEach(e => e.removeAttribute("disabled")),
                    l.removeAttribute("disabled")
                } else
                    i.innerText = "A nevez\xe9s lead\xe1sa sikeresen megt\xf6rt\xe9nt!",
                    i.classList.remove("d-none"),
                    n.reset(),
                    a.forEach(e => {
                        e.removeAttribute("disabled")
                    }
                    )
            }
            )
        }),
        e.querySelector("#privacyCheckbox").addEventListener("change", t => {
            let i = e.querySelector('[type="submit"]');
            t.currentTarget.checked ? i.removeAttribute("disabled") : i.setAttribute("disabled", "")
        }
        ),
        e.querySelector("#applicateMySelf").addEventListener("click", function(t) {
            let i = t.currentTarget;
            if (i.classList.contains("bg-transparent")) {
                e.querySelector('[name="application_type"]').value = "myself",
                i.classList.add("bg-gold"),
                i.classList.remove("bg-transparent");
                let t = e.querySelector("#applicateOther");
                t.classList.add("bg-transparent"),
                t.classList.remove("bg-gold-dark");
                let n = {
                    name: "Neved",
                    email: "Email c\xedmed",
                    phone: "Telefonsz\xe1mod",
                    job: "Mivel foglalkozol?",
                    company: "C\xe9g neve (opcion\xe1lis)",
                    reason: "Mi\xe9rt t\xe9ged v\xe1lasszunk? (Max. 1000 krakter)"
                };
                Object.keys(n).forEach(t => {
                    e.querySelector(`[name="${t}"]`).previousElementSibling.innerText = n[t]
                }
                ),
                ["name", "email", "phone"].forEach(t => {
                    let i = e.querySelector(`[name="extra_${t}"]`);
                    e.querySelector(`[name="${t}"]`).value = i.value,
                    i.value = null
                }
                ),
                e.querySelector(".extra-fields").classList.add("d-none")
            }
        }),
        e.querySelector("#applicateOther").addEventListener("click", function(t) {
            let i = t.currentTarget;
            if (i.classList.contains("bg-transparent")) {
                e.querySelector('[name="application_type"]').value = "other",
                i.classList.add("bg-gold"),
                i.classList.remove("bg-transparent");
                let t = e.querySelector("#applicateMySelf");
                t.classList.add("bg-transparent"),
                t.classList.remove("bg-gold");
                let n = {
                    name: "A jel\xf6ltem neve",
                    email: "Jel\xf6lt email c\xedme (ha ismered)",
                    phone: "Jel\xf6lt telefonsz\xe1ma (ha ismered)",
                    job: "Mivel foglalkozik?",
                    company: "A jel\xf6lt c\xe9g\xe9nek a neve (opcion\xe1lis)",
                    reason: "Mi\xe9rt őt v\xe1lasszuk? (maximum 1000 karakter)"
                };
                Object.keys(n).forEach(t => {
                    e.querySelector(`[name="${t}"]`).previousElementSibling.innerText = n[t]
                }
                ),
                ["name", "email", "phone"].forEach(t => {
                    let i = e.querySelector(`[name="${t}"]`);
                    e.querySelector(`[name="extra_${t}"]`).value = i.value,
                    i.value = null
                }
                ),
                e.querySelector(".extra-fields").classList.remove("d-none")
            }
        })
    }
    ),
    document.querySelectorAll(".voting-subscribe__component").forEach(e => {
        e.querySelector("form").addEventListener("submit", async function(t) {
            t.preventDefault(),
            t.stopPropagation();
            let i = e.querySelector(".success-message");
            i.classList.add("d-none"),
            i.innerText = "";
            let n = t.currentTarget
              , r = Array.from(new FormData(n).keys())
              , s = Array.from(new FormData(n).values())
              , o = {};
            r.forEach( (e, t) => {
                o[e] = s[t]
            }
            ),
            o.token = await window.grecaptcha.execute(window.recaptchaPublic, {
                action: "FormSubmit"
            });
            let a = e.querySelectorAll("input");
            a.forEach(e => e.setAttribute("disabled", ""));
            let l = e.querySelector('button[type="submit"]');
            l.setAttribute("disabled", ""),
            l.querySelector(".spinner-border").classList.remove("d-none"),
            fetch(n.getAttribute("action"), {
                method: n.getAttribute("method"),
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(o)
            }).then(async e => {
                if (n.querySelectorAll(".error-message").forEach(e => {
                    e.classList.add("d-none"),
                    e.innerText = ""
                }
                ),
                l.querySelector(".spinner-border").classList.add("d-none"),
                200 != e.status) {
                    let t = await e.json();
                    n.querySelectorAll(".error-message").forEach(e => {
                        let i = e.getAttribute("data-related");
                        t[i] && (e.innerText = t[i],
                        e.classList.remove("d-none"))
                    }
                    ),
                    a.forEach(e => e.removeAttribute("disabled")),
                    l.removeAttribute("disabled")
                } else
                    i.innerText = "A feliratkoz\xe1s sikeres volt!",
                    i.classList.remove("d-none"),
                    n.reset(),
                    a.forEach(e => {
                        e.removeAttribute("disabled")
                    }
                    )
            }
            )
        }),
        e.querySelector("#privacyCheckbox").addEventListener("change", t => {
            let i = e.querySelector('[type="submit"]');
            t.currentTarget.checked ? i.removeAttribute("disabled") : i.setAttribute("disabled", "")
        }
        )
    }
    ),
    function() {
        let e = document.querySelector(".competitors-details__component");
        if (e) {
            let t = e.querySelector(".items")
              , i = () => {
                let e = new URLSearchParams(location.search)
                  , i = e.get("jelolt");
                if (i) {
                    let e = t.querySelector(`#${i}`).parentElement
                      , n = t.offsetLeft + t.scrollLeft
                      , r = e.offsetLeft - n;
                    (r < 0 || r >= t.offsetWidth) && t.scrollTo(t.scrollLeft + r, 0)
                }
            }
              , n = !1;
            window.addEventListener("pushstate", function() {
                let t;
                let r = new URLSearchParams(location.search)
                  , s = r.get("jelolt");
                document.querySelectorAll("#view-selector-container button.active").forEach(e => e?.classList.remove("active")),
                s ? (document.querySelectorAll("button.details-view").forEach(e => e?.classList.add("active")),
                document.querySelector(".szavazz-te-is") && document.querySelector(".szavazz-te-is").classList.add("d-none"),
                t = e.querySelector(`button#${s}`),
                document.querySelector("#list-view")?.classList.add("d-none"),
                document.querySelector("#details-view")?.classList.remove("d-none"),
                document.querySelector(".competitors-details__component #view-selector-container").parentElement.classList.add("d-none")) : (document.querySelectorAll("button.list-view").forEach(e => e?.classList.add("active")),
                document.querySelector(".szavazz-te-is") && document.querySelector(".szavazz-te-is")?.classList.remove("d-none"),
                t = e.querySelector(".pic-container"),
                document.querySelector("#details-view")?.classList.add("d-none"),
                document.querySelector("#list-view")?.classList.remove("d-none"),
                document.querySelector(".competitors-details__component #view-selector-container").parentElement.classList.remove("d-none")),
                e.querySelector(".pic-container.active")?.classList.remove("active"),
                t?.classList.add("active"),
                t.querySelector("p").removeAttribute("style"),
                e.querySelector(".img-container img").setAttribute("src", t.querySelector("img").getAttribute("src")),
                e.querySelector("h2").innerHTML = t.getAttribute("data-name"),
                e.querySelector(".description").innerHTML = t.getAttribute("data-description");
                e.querySelector(".subtitle").innerHTML = t.getAttribute("data-subtitle");
                let o = r.get("order");
                if (o) {
                    let t = document.querySelector("#competitor-ad");
                    Array.from(e.querySelectorAll(".competitor-item:not(#competitor-ad)")).sort(function(e, t) {
                        let i = e.querySelector("*").getAttribute("data-name")
                          , n = t.querySelector("*").getAttribute("data-name")
                          , r = i.localeCompare(n);
                        return r * ("name-asc" === o ? 1 : -1)
                    }).forEach(function(e, t) {
                        t >= 3 && (t += 1),
                        e.style.order = t + 1
                    }),
                    t.setAttribute("style", "order:4;")
                } else
                    e.querySelectorAll(".items .col-auto, #list-view > .row > div").forEach(function(e, t) {
                        e.removeAttribute("style")
                    });
                n ? n = !1 : i()
            }),
            
            e.querySelector(".prev-item-mobile-arrow")
            .addEventListener("click", function () {
                const params = new URLSearchParams(location.search);
                let selected = params.get("jelolt");

                const item = t.querySelector(`#${selected}`);
                const nextItem =
                    item.parentElement.style.order !== ""
                        ? t.querySelector(
                            `[style="order:${Number(item.parentElement.style.order) - 1};"]`
                        )
                        : item.parentElement.previousElementSibling;

                if (nextItem) {
                    params.set(
                        "jelolt",
                        nextItem.querySelector("button").getAttribute("id")
                    );

                    history.pushState({}, "", `?${params.toString()}`);
                }
                else {
                    const lastItem = item.parentElement?.parentElement.lastElementChild;

                    if(lastItem) {
                        params.set(
                            "jelolt",
                            lastItem.querySelector("button").getAttribute("id")
                        );
    
                        history.pushState({}, "", `?${params.toString()}`);
                    }
                }
            }),
            e.querySelector(".next-item-mobile-arrow")
            .addEventListener("click", function () {
                const params = new URLSearchParams(location.search);
                let selected = params.get("jelolt");

                const item = t.querySelector(`#${selected}`);
                const nextItem =
                    item.parentElement.style.order !== ""
                        ? t.querySelector(
                            `[style="order:${Number(item.parentElement.style.order) + 1};"]`
                        )
                        : item.parentElement.nextElementSibling;

                if (nextItem) {
                    params.set(
                        "jelolt",
                        nextItem.querySelector("button").getAttribute("id")
                    );

                    history.pushState({}, "", `?${params.toString()}`);
                }
                else {
                    const firstItem = item.parentElement?.parentElement.firstElementChild;

                    if(firstItem) {
                        params.set(
                            "jelolt",
                            firstItem.querySelector("button").getAttribute("id")
                        );
    
                        history.pushState({}, "", `?${params.toString()}`);
                    }
                }
            }),
            document.querySelectorAll("button.details-view").forEach(t => t.addEventListener("click", function() {
                let t = new URLSearchParams(location.search);
                if (!t.get("jelolt")) {
                    document.querySelector("#view-selector-container button.active")?.classList.remove("active");
                    let i = e.querySelector(".pic-container").getAttribute("id");
                    t.set("jelolt", i),
                    this?.classList.add("active"),
                    history.pushState({}, "", `?${t.toString()}`)
                }
            })),
            document.querySelectorAll("button.list-view").forEach(e => e.addEventListener("click", function() {
                let e = new URLSearchParams(location.search);
                e.get("jelolt") && (document.querySelector("#view-selector-container button.active")?.classList.remove("active"),
                e.delete("jelolt"),
                this?.classList.add("active"),
                history.pushState({}, "", `?${e.toString()}`))
            }));
            let[r,s] = e.querySelectorAll(".arrow-box");
            r.addEventListener("click", function() {
                let e = t.querySelector("button.active").parentNode
                  , i = "" !== e.style.order ? t.querySelector(`[style="order:${Number(e.style.order) - 1};"]`) : e.previousElementSibling;
                if (i) {
                    let e = t.offsetLeft + t.scrollLeft;
                    if (i.offsetLeft < e) {
                        let e = i.offsetWidth
                          , n = t.scrollLeft - e;
                        t.scrollTo(n, 0)
                    }
                    i.querySelector("button").click()
                }
            }),
            s.addEventListener("click", function() {
                let e = t.querySelector("button.active").parentNode
                  , i = "" !== e.style.order ? t.querySelector(`[style="order:${Number(e.style.order) + 1};"]`) : e.nextElementSibling;
                if (i) {
                    let e = t.offsetLeft + t.offsetWidth + t.scrollLeft;
                    if (i.offsetLeft + i.offsetWidth > e) {
                        let e = i.offsetWidth
                          , n = t.scrollLeft + e;
                        t.scrollTo(n, 0)
                    }
                    i.querySelector("button").click()
                }
            });
            let o = new ResizeObserver(function() {
                let e = t.scrollWidth - t.clientWidth;
                e > 0 ? (r.removeAttribute("disabled"),
                s.removeAttribute("disabled")) : (r.setAttribute("disabled", ""),
                s.setAttribute("disabled", ""))
            }
            );
            o.observe(t),
            e.querySelectorAll(".list-item").forEach(e => {
                e.addEventListener("click", function() {
                    document.documentElement.clientWidth < 768 && this.querySelector(".list-item-image button").click()
                })
            }
            ),
            e.querySelectorAll(".list-item-image button").forEach(e => {
                e.addEventListener("click", function() {
                    let e = new URLSearchParams(location.search);
                    e.set("jelolt", this.getAttribute("selected-id")),
                    history.pushState({}, "", `?${e.toString()}`)
                })
            }
            ),
            e.querySelectorAll(".pic-container").forEach(e => {
                e.addEventListener("mouseenter", function() {
                    this?.classList.add("hover")
                }),
                e.addEventListener("mouseleave", function() {
                    this?.classList.remove("hover")
                }),
                e.addEventListener("transitionend", function() {
                    if (!this?.classList.contains("active")) {
                        let e = this.querySelector("p");
                        this?.classList.contains("hover") ? e.style = "opacity: 1" : e.removeAttribute("style")
                    }
                }),
                e.addEventListener("click", function() {
                    let e = new URLSearchParams(location.search);
                    e.set("jelolt", this.getAttribute("id")),
                    history.pushState({}, "", `?${e.toString()}`),
                    n = !0
                })
            }
            ),
            document.querySelectorAll("#ordering-dropdown .dropdown-item").forEach(e => {
                e.addEventListener("click", function(t) {
                    t.preventDefault();
                    let i = new URLSearchParams(location.search)
                      , n = e.getAttribute("data-key");
                    n ? i.set("order", n) : i.delete("order"),
                    history.pushState({}, "", `?${i.toString()}`),
                    document.querySelectorAll("#ordering-dropdown button").forEach(t => {
                        t.innerHTML = e.innerHTML;
                        let i = e.parentNode.getAttribute("data-index");
                        document.querySelectorAll("#ordering-dropdown .dropdown-item").forEach(e => {
                            e.parentNode.getAttribute("data-index") == i ? e.parentNode?.classList.add("d-none") : e.parentNode?.classList.remove("d-none")
                        }
                        )
                    }
                    )
                })
            }
            );
            let a = e.querySelector("#voting-modal");
            a.querySelectorAll('input:not([type="checkbox"])').forEach(e => {
                e.addEventListener("focus", function() {
                    this.previousElementSibling?.classList.add("text-gold")
                }),
                e.addEventListener("blur", function() {
                    this.previousElementSibling?.classList.remove("text-gold")
                })
            }
            ),
            a.querySelector("form").addEventListener("submit", async function(e) {
                e.preventDefault(),
                e.stopPropagation();
                let t = a.querySelector(".success-message")
                  , i = a.querySelector(".error-msg")
                  , n = a.querySelectorAll(".error-message");
                t?.classList.add("d-none"),
                t.innerText = "",
                n.forEach(e => {
                    e.innerText = "",
                    e?.classList.add("d-none")
                }
                );
                let r = e.currentTarget
                  , s = Array.from(new FormData(r).keys())
                  , o = Array.from(new FormData(r).values())
                  , l = {};
                s.forEach( (e, t) => {
                    l[e] = o[t]
                }
                ),
                l.token = await window.grecaptcha.execute(window.recaptchaPublic, {
                    action: "FormSubmit"
                });
                let c = a.querySelectorAll("input");
                c.forEach(e => e.setAttribute("disabled", ""));
                let d = a.querySelector('button[type="submit"]');
                a.querySelector(".btn-close").setAttribute("disabled", ""),
                d.setAttribute("disabled", ""),
                d.querySelector(".spinner-border")?.classList.remove("d-none"),
                fetch(r.getAttribute("action"), {
                    method: r.getAttribute("method"),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(l)
                }).then(async e => {
                    if (r.querySelectorAll(".error-message").forEach(e => {
                        e?.classList.add("d-none"),
                        e.innerText = ""
                    }
                    ),
                    d.querySelector(".spinner-border")?.classList.add("d-none"),
                    a.querySelector(".btn-close").removeAttribute("disabled"),
                    200 !== e.status) {
                        let t = await e.json();
                        r.querySelectorAll(".error-message").forEach(e => {
                            let i = e.getAttribute("data-related");
                            t[i] && (e.innerText = t[i],
                            e?.classList.remove("d-none"))
                        }
                        ),
                        t.msg && (i.innerText = t.msg,
                        i?.classList.remove("d-none")),
                        c.forEach(e => e.removeAttribute("disabled")),
                        d.removeAttribute("disabled")
                    } else {
                        let n = await e.json();
                        t.innerText = n.msg,
                        i?.classList.add("d-none"),
                        t?.classList.remove("d-none"),
                        r.reset(),
                        c.forEach(e => {
                            e.removeAttribute("disabled")
                        }
                        )
                    }
                }
                )
            }),
            a.querySelector("#privacyCheckbox").addEventListener("change", e => {
                let t = a.querySelector('[type="submit"]');
                e.currentTarget.checked ? t.removeAttribute("disabled") : t.setAttribute("disabled", "")
            }
            ),
            a.addEventListener("show.bs.modal", function(e) {
                let t = new URLSearchParams(location.search)
                  , i = t.get("jelolt");
                a.querySelector('input[name="competitor"]')?.remove();
                let n = null !== e.relatedTarget.getAttribute("data-competitor") ? e.relatedTarget.getAttribute("data-competitor") : i
                  , r = document.createElement("input");
                r.setAttribute("type", "hidden"),
                r.setAttribute("name", "competitor"),
                r.setAttribute("value", n),
                a.querySelector("form").appendChild(r)
            }),
            i()
        }
    }()
}();
