(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) s(n);
  new MutationObserver((n) => {
    for (const r of n)
      if (r.type === 'childList')
        for (const i of r.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function u(n) {
    const r = {};
    return (
      n.integrity && (r.integrity = n.integrity),
      n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : n.crossOrigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    );
  }
  function s(n) {
    if (n.ep) return;
    n.ep = !0;
    const r = u(n);
    fetch(n.href, r);
  }
})();
/**
 * anime.js - ESM
 * @version v4.1.1
 * @author Julian Garnier
 * @license MIT
 * @copyright (c) 2025 Julian Garnier
 * @see https://animejs.com
 */ const gt = typeof window < 'u',
  Rs = gt ? window : null,
  nu = gt ? document : null,
  X = { OBJECT: 0, ATTRIBUTE: 1, CSS: 2, TRANSFORM: 3, CSS_VAR: 4 },
  L = { NUMBER: 0, UNIT: 1, COLOR: 2, COMPLEX: 3 },
  ze = { NONE: 0, AUTO: 1, FORCE: 2 },
  we = { replace: 0, none: 1, blend: 2 },
  Lr = Symbol(),
  On = Symbol(),
  Xi = Symbol(),
  bs = Symbol(),
  B0 = Symbol(),
  $ = 1e-11,
  Ji = 1e12,
  qt = 1e3,
  gn = 120,
  Mt = '',
  Zi = (() => {
    const t = new Map();
    return (
      t.set('x', 'translateX'),
      t.set('y', 'translateY'),
      t.set('z', 'translateZ'),
      t
    );
  })(),
  Yi = [
    'translateX',
    'translateY',
    'translateZ',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'scale',
    'scaleX',
    'scaleY',
    'scaleZ',
    'skew',
    'skewX',
    'skewY',
    'perspective',
    'matrix',
    'matrix3d',
  ],
  Qi = Yi.reduce((t, e) => ({ ...t, [e]: e + '(' }), {}),
  Ee = () => {},
  F0 = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,
  V0 = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,
  U0 = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,
  $0 =
    /hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,
  H0 =
    /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,
  Ir = /[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,
  G0 = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,
  j0 = /([a-z])([A-Z])/g,
  z0 = /(\w+)(\([^)]+\)+)/g,
  ea = {
    id: null,
    keyframes: null,
    playbackEase: null,
    playbackRate: 1,
    frameRate: gn,
    loop: 0,
    reversed: !1,
    alternate: !1,
    autoplay: !0,
    duration: qt,
    delay: 0,
    loopDelay: 0,
    ease: 'out(2)',
    composition: we.replace,
    modifier: (t) => t,
    onBegin: Ee,
    onBeforeUpdate: Ee,
    onUpdate: Ee,
    onLoop: Ee,
    onPause: Ee,
    onComplete: Ee,
    onRender: Ee,
  },
  W0 = { root: nu },
  re = { defaults: ea, precision: 4, timeScale: 1, tickThreshold: 200 },
  ta = { version: '4.1.1', engine: null };
gt && (Rs.AnimeJS || (Rs.AnimeJS = []), Rs.AnimeJS.push(ta));
const K0 = (t) => t.replace(j0, '$1-$2').toLowerCase(),
  uu = (t, e) => t.indexOf(e) === 0,
  Cu = Date.now,
  ru = Array.isArray,
  Ds = (t) => t && t.constructor === Object,
  X0 = (t) => typeof t == 'number' && !isNaN(t),
  gs = (t) => typeof t == 'string',
  vu = (t) => typeof t == 'function',
  F = (t) => typeof t > 'u',
  Ls = (t) => F(t) || t === null,
  ua = (t) => gt && t instanceof SVGElement,
  sa = (t) => F0.test(t),
  na = (t) => uu(t, 'rgb'),
  ra = (t) => uu(t, 'hsl'),
  J0 = (t) => sa(t) || na(t) || ra(t),
  Zu = (t) => !re.defaults.hasOwnProperty(t),
  Bu = (t) => (gs(t) ? parseFloat(t) : t),
  Jt = Math.pow,
  Z0 = Math.sqrt,
  Y0 = Math.sin,
  Q0 = Math.cos,
  mn = Math.abs,
  ec = Math.ceil,
  kn = Math.floor,
  tc = Math.asin,
  _u = Math.PI,
  Sn = Math.round,
  ge = (t, e, u) => (t < e ? e : t > u ? u : t),
  Mr = {},
  Z = (t, e) => {
    if (e < 0) return t;
    if (!e) return Sn(t);
    let u = Mr[e];
    return u || (u = Mr[e] = 10 ** e), Sn(t * u) / u;
  },
  uc = (t, e) =>
    ru(e)
      ? e.reduce((u, s) => (mn(s - t) < mn(u - t) ? s : u))
      : e
      ? Sn(t / e) * e
      : t,
  xt = (t, e, u) => t + (e - t) * u,
  Pn = (t, e, u) => {
    const s = 10 ** (u || 0);
    return kn((Math.random() * (e - t + 1 / s) + t) * s) / s;
  },
  sc = (t) => {
    let e = t.length,
      u,
      s;
    for (; e; ) (s = Pn(0, --e)), (u = t[e]), (t[e] = t[s]), (t[s] = u);
    return t;
  },
  qn = (t) => (t === 1 / 0 ? Ji : t === -1 / 0 ? -1e12 : t),
  xu = (t) => (t <= $ ? $ : qn(Z(t, 11))),
  ve = (t) => (ru(t) ? [...t] : t),
  nc = (t, e) => {
    const u = { ...t };
    for (let s in e) {
      const n = t[s];
      u[s] = F(n) ? e[s] : n;
    }
    return u;
  },
  Y = (t, e, u, s = '_prev', n = '_next') => {
    let r = t._head,
      i = n;
    for (u && ((r = t._tail), (i = s)); r; ) {
      const a = r[i];
      e(r), (r = a);
    }
  },
  yt = (t, e, u = '_prev', s = '_next') => {
    const n = e[u],
      r = e[s];
    n ? (n[s] = r) : (t._head = r),
      r ? (r[u] = n) : (t._tail = n),
      (e[u] = null),
      (e[s] = null);
  },
  eu = (t, e, u, s = '_prev', n = '_next') => {
    let r = t._tail;
    for (; r && u && u(r, e); ) r = r[s];
    const i = r ? r[n] : t._head;
    r ? (r[n] = e) : (t._head = e),
      i ? (i[s] = e) : (t._tail = e),
      (e[s] = r),
      (e[n] = i);
  },
  rc = (t) => {
    let e;
    return (...u) => {
      let s, n, r, i;
      e &&
        ((s = e.currentIteration),
        (n = e.iterationProgress),
        (r = e.reversed),
        (i = e._alternate),
        e.revert());
      const a = t(...u);
      return (
        a && !vu(a) && a.revert && (e = a),
        F(n) ||
          ((e.currentIteration = s),
          (e.iterationProgress = (i && s % 2 ? !r : r) ? 1 - n : n)),
        a || Ee
      );
    };
  };
class ia {
  constructor(e = 0) {
    (this.deltaTime = 0),
      (this._currentTime = e),
      (this._elapsedTime = e),
      (this._startTime = e),
      (this._lastTime = e),
      (this._scheduledTime = 0),
      (this._frameDuration = Z(qt / gn, 0)),
      (this._fps = gn),
      (this._speed = 1),
      (this._hasChildren = !1),
      (this._head = null),
      (this._tail = null);
  }
  get fps() {
    return this._fps;
  }
  set fps(e) {
    const u = this._frameDuration,
      s = +e,
      n = s < $ ? $ : s,
      r = Z(qt / n, 0);
    (this._fps = n), (this._frameDuration = r), (this._scheduledTime += r - u);
  }
  get speed() {
    return this._speed;
  }
  set speed(e) {
    const u = +e;
    this._speed = u < $ ? $ : u;
  }
  requestTick(e) {
    const u = this._scheduledTime,
      s = this._elapsedTime;
    if (((this._elapsedTime += e - s), s < u)) return ze.NONE;
    const n = this._frameDuration,
      r = s - u;
    return (this._scheduledTime += r < n ? n : r), ze.AUTO;
  }
  computeDeltaTime(e) {
    const u = e - this._lastTime;
    return (this.deltaTime = u), (this._lastTime = e), u;
  }
}
const Yu = (t, e, u, s, n) => {
    const r = t.parent,
      i = t.duration,
      a = t.completed,
      o = t.iterationDuration,
      c = t.iterationCount,
      l = t._currentIteration,
      f = t._loopDelay,
      b = t._reversed,
      h = t._alternate,
      S = t._hasChildren,
      E = t._delay,
      I = t._currentTime,
      D = E + o,
      H = e - E,
      q = ge(I, -E, i),
      G = ge(H, -E, i),
      R = H - I,
      k = G > 0,
      z = G >= i,
      te = i <= $,
      me = n === ze.FORCE;
    let ue = 0,
      B = H,
      W = 0;
    if (c > 1) {
      const _e = ~~(G / (o + (z ? 0 : f)));
      (t._currentIteration = ge(_e, 0, c)),
        z && t._currentIteration--,
        (ue = t._currentIteration % 2),
        (B = G % (o + f) || 0);
    }
    const he = b ^ (h && ue),
      pe = t._ease;
    let _ = z ? (he ? 0 : i) : he ? o - B : B;
    pe && (_ = o * pe(_ / o) || 0);
    const Q = (r ? r.backwards : H < I) ? !he : !!he;
    if (
      ((t._currentTime = H),
      (t._iterationTime = _),
      (t.backwards = Q),
      k && !t.began
        ? ((t.began = !0), !u && !(r && (Q || !r.began)) && t.onBegin(t))
        : H <= 0 && (t.began = !1),
      !u && !S && k && t._currentIteration !== l && t.onLoop(t),
      me ||
        (n === ze.AUTO &&
          ((e >= E && e <= D) || (e <= E && q > E) || (e >= D && q !== i))) ||
        (_ >= D && q !== i) ||
        (_ <= E && q > 0) ||
        (e <= q && q === i && a) ||
        (z && !a && te))
    ) {
      if ((k && (t.computeDeltaTime(q), u || t.onBeforeUpdate(t)), !S)) {
        const _e = me || (Q ? R * -1 : R) >= re.tickThreshold,
          J = t._offset + (r ? r._offset : 0) + E + _;
        let y = t._head,
          oe,
          ke,
          Ht,
          Nt,
          Ve = 0;
        for (; y; ) {
          const Ne = y._composition,
            Ue = y._currentTime,
            Pe = y._changeDuration,
            hu = y._absoluteStartTime + y._changeDuration,
            ut = y._nextRep,
            $e = y._prevRep,
            lt = Ne !== we.none;
          if (
            (_e ||
              ((Ue !== Pe || J <= hu + (ut ? ut._delay : 0)) &&
                (Ue !== 0 || J >= y._absoluteStartTime))) &&
            (!lt ||
              (!y._isOverridden &&
                (!y._isOverlapped || J <= hu) &&
                (!ut || ut._isOverridden || J <= ut._absoluteStartTime) &&
                (!$e ||
                  $e._isOverridden ||
                  J >= $e._absoluteStartTime + $e._changeDuration + y._delay)))
          ) {
            const dt = (y._currentTime = ge(_ - y._startTime, 0, Pe)),
              ce = y._ease(dt / y._updateDuration),
              Re = y._modifier,
              We = y._valueType,
              Ce = y._tweenType,
              De = Ce === X.OBJECT,
              Gt = We === L.NUMBER,
              st = (Gt && De) || ce === 0 || ce === 1 ? -1 : re.precision;
            let Le, jt;
            if (Gt) Le = jt = Re(Z(xt(y._fromNumber, y._toNumber, ce), st));
            else if (We === L.UNIT)
              (jt = Re(Z(xt(y._fromNumber, y._toNumber, ce), st))),
                (Le = `${jt}${y._unit}`);
            else if (We === L.COLOR) {
              const se = y._fromNumbers,
                nt = y._toNumbers,
                rt = Z(ge(Re(xt(se[0], nt[0], ce)), 0, 255), 0),
                ft = Z(ge(Re(xt(se[1], nt[1], ce)), 0, 255), 0),
                ku = Z(ge(Re(xt(se[2], nt[2], ce)), 0, 255), 0),
                zt = ge(Re(Z(xt(se[3], nt[3], ce), st)), 0, 1);
              if (((Le = `rgba(${rt},${ft},${ku},${zt})`), lt)) {
                const Rt = y._numbers;
                (Rt[0] = rt), (Rt[1] = ft), (Rt[2] = ku), (Rt[3] = zt);
              }
            } else if (We === L.COMPLEX) {
              Le = y._strings[0];
              for (let se = 0, nt = y._toNumbers.length; se < nt; se++) {
                const rt = Re(
                    Z(xt(y._fromNumbers[se], y._toNumbers[se], ce), st)
                  ),
                  ft = y._strings[se + 1];
                (Le += `${ft ? rt + ft : rt}`), lt && (y._numbers[se] = rt);
              }
            }
            if ((lt && (y._number = jt), !s && Ne !== we.blend)) {
              const se = y.property;
              (oe = y.target),
                De
                  ? (oe[se] = Le)
                  : Ce === X.ATTRIBUTE
                  ? oe.setAttribute(se, Le)
                  : ((ke = oe.style),
                    Ce === X.TRANSFORM
                      ? (oe !== Ht && ((Ht = oe), (Nt = oe[bs])),
                        (Nt[se] = Le),
                        (Ve = 1))
                      : Ce === X.CSS
                      ? (ke[se] = Le)
                      : Ce === X.CSS_VAR && ke.setProperty(se, Le)),
                k && (W = 1);
            } else y._value = Le;
          }
          if (Ve && y._renderTransforms) {
            let dt = Mt;
            for (let ce in Nt) dt += `${Qi[ce]}${Nt[ce]}) `;
            (ke.transform = dt), (Ve = 0);
          }
          y = y._next;
        }
        !u && W && t.onRender(t);
      }
      !u && k && t.onUpdate(t);
    }
    return (
      r && te
        ? !u &&
          ((r.began && !Q && H >= i && !a) || (Q && H <= $ && a)) &&
          (t.onComplete(t), (t.completed = !Q))
        : k && z
        ? c === 1 / 0
          ? (t._startTime += t.duration)
          : t._currentIteration >= c - 1 &&
            ((t.paused = !0),
            !a &&
              !S &&
              ((t.completed = !0),
              !u &&
                !(r && (Q || !r.began)) &&
                (t.onComplete(t), t._resolve(t))))
        : (t.completed = !1),
      W
    );
  },
  Zt = (t, e, u, s, n) => {
    const r = t._currentIteration;
    if ((Yu(t, e, u, s, n), t._hasChildren)) {
      const i = t,
        a = i.backwards,
        o = s ? e : i._iterationTime,
        c = Cu();
      let l = 0,
        f = !0;
      if (!s && i._currentIteration !== r) {
        const b = i.iterationDuration;
        Y(i, (h) => {
          if (!a)
            !h.completed &&
              !h.backwards &&
              h._currentTime < h.iterationDuration &&
              Yu(h, b, u, 1, ze.FORCE),
              (h.began = !1),
              (h.completed = !1);
          else {
            const S = h.duration,
              E = h._offset + h._delay,
              I = E + S;
            !u && S <= $ && (!E || I === b) && h.onComplete(h);
          }
        }),
          u || i.onLoop(i);
      }
      Y(
        i,
        (b) => {
          const h = Z((o - b._offset) * b._speed, 12),
            S = b._fps < i._fps ? b.requestTick(c) : n;
          (l += Yu(b, h, u, s, S)), !b.completed && f && (f = !1);
        },
        a
      ),
        !u && l && i.onRender(i),
        f &&
          i._currentTime >= i.duration &&
          ((i.paused = !0),
          i.completed ||
            ((i.completed = !0), u || (i.onComplete(i), i._resolve(i))));
    }
  },
  su = { animation: null, update: Ee },
  ic = (t) => {
    let e = su.animation;
    return (
      e ||
        ((e = {
          duration: $,
          computeDeltaTime: Ee,
          _offset: 0,
          _delay: 0,
          _head: null,
          _tail: null,
        }),
        (su.animation = e),
        (su.update = () => {
          t.forEach((u) => {
            for (let s in u) {
              const n = u[s],
                r = n._head;
              if (r) {
                const i = r._valueType,
                  a =
                    i === L.COMPLEX || i === L.COLOR
                      ? ve(r._fromNumbers)
                      : null;
                let o = r._fromNumber,
                  c = n._tail;
                for (; c && c !== r; ) {
                  if (a)
                    for (let l = 0, f = c._numbers.length; l < f; l++)
                      a[l] += c._numbers[l];
                  else o += c._number;
                  c = c._prevAdd;
                }
                (r._toNumber = o), (r._toNumbers = a);
              }
            }
          }),
            Yu(e, 1, 1, 0, ze.FORCE);
        })),
      e
    );
  },
  aa = gt ? requestAnimationFrame : setImmediate,
  ac = gt ? cancelAnimationFrame : clearImmediate;
class oc extends ia {
  constructor(e) {
    super(e),
      (this.useDefaultMainLoop = !0),
      (this.pauseOnDocumentHidden = !0),
      (this.defaults = ea),
      (this.paused = !!(gt && nu.hidden)),
      (this.reqId = null);
  }
  update() {
    const e = (this._currentTime = Cu());
    if (this.requestTick(e)) {
      this.computeDeltaTime(e);
      const u = this._speed,
        s = this._fps;
      let n = this._head;
      for (; n; ) {
        const r = n._next;
        n.paused
          ? (yt(this, n),
            (this._hasChildren = !!this._tail),
            (n._running = !1),
            n.completed && !n._cancelled && n.cancel())
          : Zt(
              n,
              (e - n._startTime) * n._speed * u,
              0,
              0,
              n._fps < s ? n.requestTick(e) : ze.AUTO
            ),
          (n = r);
      }
      su.update();
    }
  }
  wake() {
    return (
      this.useDefaultMainLoop &&
        !this.reqId &&
        !this.paused &&
        (this.reqId = aa(oa)),
      this
    );
  }
  pause() {
    return (this.paused = !0), cc();
  }
  resume() {
    if (this.paused)
      return (this.paused = !1), Y(this, (e) => e.resetTime()), this.wake();
  }
  get speed() {
    return this._speed * (re.timeScale === 1 ? 1 : qt);
  }
  set speed(e) {
    (this._speed = e * re.timeScale), Y(this, (u) => (u.speed = u._speed));
  }
  get timeUnit() {
    return re.timeScale === 1 ? 'ms' : 's';
  }
  set timeUnit(e) {
    const s = e === 's',
      n = s ? 0.001 : 1;
    if (re.timeScale !== n) {
      (re.timeScale = n), (re.tickThreshold = 200 * n);
      const r = s ? 0.001 : qt;
      (this.defaults.duration *= r), (this._speed *= r);
    }
  }
  get precision() {
    return re.precision;
  }
  set precision(e) {
    re.precision = e;
  }
}
const ne = (() => {
    const t = new oc(Cu());
    return (
      gt &&
        ((ta.engine = t),
        nu.addEventListener('visibilitychange', () => {
          t.pauseOnDocumentHidden && (nu.hidden ? t.pause() : t.resume());
        })),
      t
    );
  })(),
  oa = () => {
    ne._head ? ((ne.reqId = aa(oa)), ne.update()) : (ne.reqId = 0);
  },
  cc = () => (ac(ne.reqId), (ne.reqId = 0), ne),
  lc = (t, e, u) => {
    const s = t.style.transform;
    let n;
    if (s) {
      const r = t[bs];
      let i;
      for (; (i = z0.exec(s)); ) {
        const a = i[1],
          o = i[2].slice(1, -1);
        (r[a] = o), a === e && ((n = o), u && (u[e] = o));
      }
    }
    return s && !F(n)
      ? n
      : uu(e, 'scale')
      ? '1'
      : uu(e, 'rotate') || uu(e, 'skew')
      ? '0deg'
      : '0px';
  };
function Or(t) {
  const e = gs(t) ? W0.root.querySelectorAll(t) : t;
  if (e instanceof NodeList || e instanceof HTMLCollection) return e;
}
function ca(t) {
  if (Ls(t)) return [];
  if (ru(t)) {
    const u = t.flat(1 / 0),
      s = [];
    for (let n = 0, r = u.length; n < r; n++) {
      const i = u[n];
      if (!Ls(i)) {
        const a = Or(i);
        if (a)
          for (let o = 0, c = a.length; o < c; o++) {
            const l = a[o];
            if (!Ls(l)) {
              let f = !1;
              for (let b = 0, h = s.length; b < h; b++)
                if (s[b] === l) {
                  f = !0;
                  break;
                }
              f || s.push(l);
            }
          }
        else {
          let o = !1;
          for (let c = 0, l = s.length; c < l; c++)
            if (s[c] === i) {
              o = !0;
              break;
            }
          o || s.push(i);
        }
      }
    }
    return s;
  }
  if (!gt) return [t];
  const e = Or(t);
  return e ? Array.from(e) : [t];
}
function Bn(t) {
  const e = ca(t),
    u = e.length;
  if (u)
    for (let s = 0; s < u; s++) {
      const n = e[s];
      if (!n[Lr]) {
        n[Lr] = !0;
        const r = ua(n);
        (n.nodeType || r) && ((n[On] = !0), (n[Xi] = r), (n[bs] = {}));
      }
    }
  return e;
}
const dc = ['opacity', 'rotate', 'overflow', 'color'],
  fc = (t, e) => {
    if (dc.includes(e)) return !1;
    if (t.getAttribute(e) || e in t) {
      if (e === 'scale') {
        const u = t.parentNode;
        return u && u.tagName === 'filter';
      }
      return !0;
    }
  },
  hc = (t) => {
    const e = V0.exec(t) || U0.exec(t),
      u = F(e[4]) ? 1 : +e[4];
    return [+e[1], +e[2], +e[3], u];
  },
  pc = (t) => {
    const e = t.length,
      u = e === 4 || e === 5;
    return [
      +('0x' + t[1] + t[u ? 1 : 2]),
      +('0x' + t[u ? 2 : 3] + t[u ? 2 : 4]),
      +('0x' + t[u ? 3 : 5] + t[u ? 3 : 6]),
      e === 5 || e === 9
        ? +(+('0x' + t[u ? 4 : 7] + t[u ? 4 : 8]) / 255).toFixed(3)
        : 1,
    ];
  },
  Is = (t, e, u) => (
    u < 0 && (u += 1),
    u > 1 && (u -= 1),
    u < 1 / 6
      ? t + (e - t) * 6 * u
      : u < 1 / 2
      ? e
      : u < 2 / 3
      ? t + (e - t) * (2 / 3 - u) * 6
      : t
  ),
  bc = (t) => {
    const e = $0.exec(t) || H0.exec(t),
      u = +e[1] / 360,
      s = +e[2] / 100,
      n = +e[3] / 100,
      r = F(e[4]) ? 1 : +e[4];
    let i, a, o;
    if (s === 0) i = a = o = n;
    else {
      const c = n < 0.5 ? n * (1 + s) : n + s - n * s,
        l = 2 * n - c;
      (i = Z(Is(l, c, u + 1 / 3) * 255, 0)),
        (a = Z(Is(l, c, u) * 255, 0)),
        (o = Z(Is(l, c, u - 1 / 3) * 255, 0));
    }
    return [i, a, o, r];
  },
  gc = (t) => (na(t) ? hc(t) : sa(t) ? pc(t) : ra(t) ? bc(t) : [0, 0, 0, 1]),
  xe = (t, e) => (F(t) ? e : t),
  mt = (t, e, u, s, n) => {
    if (vu(t)) {
      const r = () => {
        const i = t(e, u, s);
        return isNaN(+i) ? i || 0 : +i;
      };
      return n && (n.func = r), r();
    } else return t;
  },
  Fn = (t, e) =>
    t[On]
      ? t[Xi] && fc(t, e)
        ? X.ATTRIBUTE
        : Yi.includes(e) || Zi.get(e)
        ? X.TRANSFORM
        : uu(e, '--')
        ? X.CSS_VAR
        : e in t.style
        ? X.CSS
        : e in t
        ? X.OBJECT
        : X.ATTRIBUTE
      : X.OBJECT,
  kr = (t, e, u) => {
    const s = t.style[e];
    s && u && (u[e] = s);
    const n = s || getComputedStyle(t[B0] || t).getPropertyValue(e);
    return n === 'auto' ? '0' : n;
  },
  Yt = (t, e, u, s) => {
    const n = F(u) ? Fn(t, e) : u;
    return n === X.OBJECT
      ? t[e] || 0
      : n === X.ATTRIBUTE
      ? t.getAttribute(e)
      : n === X.TRANSFORM
      ? lc(t, e, s)
      : n === X.CSS_VAR
      ? kr(t, e, s).trimStart()
      : kr(t, e, s);
  },
  Pr = (t, e, u) => (u === '-' ? t - e : u === '+' ? t + e : t * e),
  Vn = () => ({ t: L.NUMBER, n: 0, u: null, o: null, d: null, s: null }),
  Xe = (t, e) => {
    if (
      ((e.t = L.NUMBER),
      (e.n = 0),
      (e.u = null),
      (e.o = null),
      (e.d = null),
      (e.s = null),
      !t)
    )
      return e;
    const u = +t;
    if (isNaN(u)) {
      let s = t;
      s[1] === '=' && ((e.o = s[0]), (s = s.slice(2)));
      const n = s.includes(' ') ? !1 : G0.exec(s);
      if (n) return (e.t = L.UNIT), (e.n = +n[1]), (e.u = n[2]), e;
      if (e.o) return (e.n = +s), e;
      if (J0(s)) return (e.t = L.COLOR), (e.d = gc(s)), e;
      {
        const r = s.match(Ir);
        return (
          (e.t = L.COMPLEX),
          (e.d = r ? r.map(Number) : []),
          (e.s = s.split(Ir) || []),
          e
        );
      }
    } else return (e.n = u), e;
  },
  qr = (t, e) => (
    (e.t = t._valueType),
    (e.n = t._toNumber),
    (e.u = t._unit),
    (e.o = null),
    (e.d = ve(t._toNumbers)),
    (e.s = ve(t._strings)),
    e
  ),
  Ge = Vn(),
  rs = { _rep: new WeakMap(), _add: new Map() },
  Un = (t, e, u = '_rep') => {
    const s = rs[u];
    let n = s.get(t);
    return (
      n || ((n = {}), s.set(t, n)),
      n[e] ? n[e] : (n[e] = { _head: null, _tail: null })
    );
  },
  mc = (t, e) => t._isOverridden || t._absoluteStartTime > e._absoluteStartTime,
  Qu = (t) => {
    (t._isOverlapped = 1),
      (t._isOverridden = 1),
      (t._changeDuration = $),
      (t._currentTime = $);
  },
  la = (t, e) => {
    const u = t._composition;
    if (u === we.replace) {
      const s = t._absoluteStartTime;
      eu(e, t, mc, '_prevRep', '_nextRep');
      const n = t._prevRep;
      if (n) {
        const r = n.parent,
          i = n._absoluteStartTime + n._changeDuration;
        if (
          t.parent.id !== r.id &&
          r.iterationCount > 1 &&
          i + (r.duration - r.iterationDuration) > s
        ) {
          Qu(n);
          let c = n._prevRep;
          for (; c && c.parent.id === r.id; ) Qu(c), (c = c._prevRep);
        }
        const a = s - t._delay;
        if (i > a) {
          const c = n._startTime,
            l = i - (c + n._updateDuration);
          (n._changeDuration = a - l - c),
            (n._currentTime = n._changeDuration),
            (n._isOverlapped = 1),
            n._changeDuration < $ && Qu(n);
        }
        let o = !0;
        if (
          (Y(r, (c) => {
            c._isOverlapped || (o = !1);
          }),
          o)
        ) {
          const c = r.parent;
          if (c) {
            let l = !0;
            Y(c, (f) => {
              f !== r &&
                Y(f, (b) => {
                  b._isOverlapped || (l = !1);
                });
            }),
              l && c.cancel();
          } else r.cancel();
        }
      }
    } else if (u === we.blend) {
      const s = Un(t.target, t.property, '_add'),
        n = ic(rs._add);
      let r = s._head;
      r ||
        ((r = { ...t }),
        (r._composition = we.replace),
        (r._updateDuration = $),
        (r._startTime = 0),
        (r._numbers = ve(t._fromNumbers)),
        (r._number = 0),
        (r._next = null),
        (r._prev = null),
        eu(s, r),
        eu(n, r));
      const i = t._toNumber;
      if (
        ((t._fromNumber = r._fromNumber - i),
        (t._toNumber = 0),
        (t._numbers = ve(t._fromNumbers)),
        (t._number = 0),
        (r._fromNumber = i),
        t._toNumbers)
      ) {
        const a = ve(t._toNumbers);
        a &&
          a.forEach((o, c) => {
            (t._fromNumbers[c] = r._fromNumbers[c] - o), (t._toNumbers[c] = 0);
          }),
          (r._fromNumbers = a);
      }
      eu(s, t, null, '_prevAdd', '_nextAdd');
    }
    return t;
  },
  da = (t) => {
    const e = t._composition;
    if (e !== we.none) {
      const u = t.target,
        s = t.property,
        i = rs._rep.get(u)[s];
      if ((yt(i, t, '_prevRep', '_nextRep'), e === we.blend)) {
        const a = rs._add,
          o = a.get(u);
        if (!o) return;
        const c = o[s],
          l = su.animation;
        yt(c, t, '_prevAdd', '_nextAdd');
        const f = c._head;
        if (f && f === c._tail) {
          yt(c, f, '_prevAdd', '_nextAdd'), yt(l, f);
          let b = !0;
          for (let h in o)
            if (o[h]._head) {
              b = !1;
              break;
            }
          b && a.delete(u);
        }
      }
    }
    return t;
  },
  Br = (t) => ((t.paused = !0), (t.began = !1), (t.completed = !1), t),
  xn = (t) => (
    t._cancelled &&
      (t._hasChildren
        ? Y(t, xn)
        : Y(t, (e) => {
            e._composition !== we.none && la(e, Un(e.target, e.property));
          }),
      (t._cancelled = 0)),
    t
  );
let Sc = 0;
class fa extends ia {
  constructor(e = {}, u = null, s = 0) {
    super(0);
    const {
        id: n,
        delay: r,
        duration: i,
        reversed: a,
        alternate: o,
        loop: c,
        loopDelay: l,
        autoplay: f,
        frameRate: b,
        playbackRate: h,
        onComplete: S,
        onLoop: E,
        onPause: I,
        onBegin: D,
        onBeforeUpdate: H,
        onUpdate: q,
      } = e,
      G = u ? 0 : ne._elapsedTime,
      R = u ? u.defaults : re.defaults,
      k = vu(r) || F(r) ? R.delay : +r,
      z = vu(i) || F(i) ? 1 / 0 : +i,
      te = xe(c, R.loop),
      me = xe(l, R.loopDelay),
      ue = te === !0 || te === 1 / 0 || te < 0 ? 1 / 0 : te + 1;
    let B = 0;
    if (u) B = s;
    else {
      let W = Cu();
      ne.paused && (ne.requestTick(W), (W = ne._elapsedTime)),
        (B = W - ne._startTime);
    }
    (this.id = F(n) ? ++Sc : n),
      (this.parent = u),
      (this.duration = qn((z + me) * ue - me) || $),
      (this.backwards = !1),
      (this.paused = !0),
      (this.began = !1),
      (this.completed = !1),
      (this.onBegin = D || R.onBegin),
      (this.onBeforeUpdate = H || R.onBeforeUpdate),
      (this.onUpdate = q || R.onUpdate),
      (this.onLoop = E || R.onLoop),
      (this.onPause = I || R.onPause),
      (this.onComplete = S || R.onComplete),
      (this.iterationDuration = z),
      (this.iterationCount = ue),
      (this._autoplay = u ? !1 : xe(f, R.autoplay)),
      (this._offset = B),
      (this._delay = k),
      (this._loopDelay = me),
      (this._iterationTime = 0),
      (this._currentIteration = 0),
      (this._resolve = Ee),
      (this._running = !1),
      (this._reversed = +xe(a, R.reversed)),
      (this._reverse = this._reversed),
      (this._cancelled = 0),
      (this._alternate = xe(o, R.alternate)),
      (this._prev = null),
      (this._next = null),
      (this._elapsedTime = G),
      (this._startTime = G),
      (this._lastTime = G),
      (this._fps = xe(b, R.frameRate)),
      (this._speed = xe(h, R.playbackRate));
  }
  get cancelled() {
    return !!this._cancelled;
  }
  set cancelled(e) {
    e ? this.cancel() : this.reset(1).play();
  }
  get currentTime() {
    return ge(Z(this._currentTime, re.precision), -this._delay, this.duration);
  }
  set currentTime(e) {
    const u = this.paused;
    this.pause().seek(+e), u || this.resume();
  }
  get iterationCurrentTime() {
    return Z(this._iterationTime, re.precision);
  }
  set iterationCurrentTime(e) {
    this.currentTime = this.iterationDuration * this._currentIteration + e;
  }
  get progress() {
    return ge(Z(this._currentTime / this.duration, 10), 0, 1);
  }
  set progress(e) {
    this.currentTime = this.duration * e;
  }
  get iterationProgress() {
    return ge(Z(this._iterationTime / this.iterationDuration, 10), 0, 1);
  }
  set iterationProgress(e) {
    const u = this.iterationDuration;
    this.currentTime = u * this._currentIteration + u * e;
  }
  get currentIteration() {
    return this._currentIteration;
  }
  set currentIteration(e) {
    this.currentTime =
      this.iterationDuration * ge(+e, 0, this.iterationCount - 1);
  }
  get reversed() {
    return !!this._reversed;
  }
  set reversed(e) {
    e ? this.reverse() : this.play();
  }
  get speed() {
    return super.speed;
  }
  set speed(e) {
    (super.speed = e), this.resetTime();
  }
  reset(e = 0) {
    return (
      xn(this),
      this._reversed && !this._reverse && (this.reversed = !1),
      (this._iterationTime = this.iterationDuration),
      Zt(this, 0, 1, e, ze.FORCE),
      Br(this),
      this._hasChildren && Y(this, Br),
      this
    );
  }
  init(e = 0) {
    (this.fps = this._fps),
      (this.speed = this._speed),
      !e && this._hasChildren && Zt(this, this.duration, 1, e, ze.FORCE),
      this.reset(e);
    const u = this._autoplay;
    return u === !0 ? this.resume() : u && !F(u.linked) && u.link(this), this;
  }
  resetTime() {
    const e = 1 / (this._speed * ne._speed);
    return (
      (this._startTime = Cu() - (this._currentTime + this._delay) * e), this
    );
  }
  pause() {
    return this.paused ? this : ((this.paused = !0), this.onPause(this), this);
  }
  resume() {
    return this.paused
      ? ((this.paused = !1),
        this.duration <= $ && !this._hasChildren
          ? Zt(this, $, 0, 0, ze.FORCE)
          : (this._running ||
              (eu(ne, this), (ne._hasChildren = !0), (this._running = !0)),
            this.resetTime(),
            (this._startTime -= 12),
            ne.wake()),
        this)
      : this;
  }
  restart() {
    return this.reset(0).resume();
  }
  seek(e, u = 0, s = 0) {
    xn(this), (this.completed = !1);
    const n = this.paused;
    return (
      (this.paused = !0),
      Zt(this, e + this._delay, ~~u, ~~s, ze.AUTO),
      n ? this : this.resume()
    );
  }
  alternate() {
    const e = this._reversed,
      u = this.iterationCount,
      s = this.iterationDuration,
      n = u === 1 / 0 ? kn(Ji / s) : u;
    return (
      (this._reversed = +(this._alternate && !(n % 2) ? e : !e)),
      u === 1 / 0
        ? (this.iterationProgress = this._reversed
            ? 1 - this.iterationProgress
            : this.iterationProgress)
        : this.seek(s * n - this._currentTime),
      this.resetTime(),
      this
    );
  }
  play() {
    return this._reversed && this.alternate(), this.resume();
  }
  reverse() {
    return this._reversed || this.alternate(), this.resume();
  }
  cancel() {
    return (
      this._hasChildren ? Y(this, (e) => e.cancel(), !0) : Y(this, da),
      (this._cancelled = 1),
      this.pause()
    );
  }
  stretch(e) {
    const u = this.duration,
      s = xu(e);
    if (u === s) return this;
    const n = e / u,
      r = e <= $;
    return (
      (this.duration = r ? $ : s),
      (this.iterationDuration = r ? $ : xu(this.iterationDuration * n)),
      (this._offset *= n),
      (this._delay *= n),
      (this._loopDelay *= n),
      this
    );
  }
  revert() {
    Zt(this, 0, 1, 0, ze.AUTO);
    const e = this._autoplay;
    return e && e.linked && e.linked === this && e.revert(), this.cancel();
  }
  complete() {
    return this.seek(this.duration).cancel();
  }
  then(e = Ee) {
    const u = this.then,
      s = () => {
        (this.then = null), e(this), (this.then = u), (this._resolve = Ee);
      };
    return new Promise(
      (n) => (
        (this._resolve = () => n(s())), this.completed && this._resolve(), this
      )
    );
  }
}
const iu = (t) => t,
  ha = (t, e, u) =>
    (((1 - 3 * u + 3 * e) * t + (3 * u - 6 * e)) * t + 3 * e) * t,
  xc = (t, e, u) => {
    let s = 0,
      n = 1,
      r,
      i,
      a = 0;
    do (i = s + (n - s) / 2), (r = ha(i, e, u) - t), r > 0 ? (n = i) : (s = i);
    while (mn(r) > 1e-7 && ++a < 100);
    return i;
  },
  yc = (t = 0.5, e = 0, u = 0.5, s = 1) =>
    t === e && u === s
      ? iu
      : (n) => (n === 0 || n === 1 ? n : ha(xc(n, t, u), e, s)),
  Tc = (t = 10, e) => {
    const u = e ? ec : kn;
    return (s) => u(ge(s, 0, 1) * t) * (1 / t);
  },
  pa = (...t) => {
    const e = t.length;
    if (!e) return iu;
    const u = e - 1,
      s = t[0],
      n = t[u],
      r = [0],
      i = [Bu(s)];
    for (let a = 1; a < u; a++) {
      const o = t[a],
        c = gs(o) ? o.trim().split(' ') : [o],
        l = c[0],
        f = c[1];
      r.push(F(f) ? a / u : Bu(f) / 100), i.push(Bu(l));
    }
    return (
      i.push(Bu(n)),
      r.push(1),
      function (o) {
        for (let c = 1, l = r.length; c < l; c++) {
          const f = r[c];
          if (o <= f) {
            const b = r[c - 1],
              h = i[c - 1];
            return h + ((i[c] - h) * (o - b)) / (f - b);
          }
        }
        return i[i.length - 1];
      }
    );
  },
  Cc = (t = 10, e = 1) => {
    const u = [0],
      s = t - 1;
    for (let n = 1; n < s; n++) {
      const r = u[n - 1],
        i = n / s,
        a = (n + 1) / s,
        o = i + (a - i) * Math.random(),
        c = i * (1 - e) + o * e;
      u.push(ge(c, r, 1));
    }
    return u.push(1), pa(...u);
  },
  vc = _u / 2,
  Fr = _u * 2,
  pu =
    (t = 1.68) =>
    (e) =>
      Jt(e, +t),
  Vr = {
    [Mt]: pu,
    Quad: pu(2),
    Cubic: pu(3),
    Quart: pu(4),
    Quint: pu(5),
    Sine: (t) => 1 - Q0(t * vc),
    Circ: (t) => 1 - Z0(1 - t * t),
    Expo: (t) => (t ? Jt(2, 10 * t - 10) : 0),
    Bounce: (t) => {
      let e,
        u = 4;
      for (; t < ((e = Jt(2, --u)) - 1) / 11; );
      return 1 / Jt(4, 3 - u) - 7.5625 * Jt((e * 3 - 2) / 22 - t, 2);
    },
    Back:
      (t = 1.70158) =>
      (e) =>
        (+t + 1) * e * e * e - +t * e * e,
    Elastic: (t = 1, e = 0.3) => {
      const u = ge(+t, 1, 10),
        s = ge(+e, $, 2),
        n = (s / Fr) * tc(1 / u),
        r = Fr / s;
      return (i) =>
        i === 0 || i === 1
          ? i
          : -u * Jt(2, -10 * (1 - i)) * Y0((1 - i - n) * r);
    },
  },
  yn = {
    in: (t) => (e) => t(e),
    out: (t) => (e) => 1 - t(1 - e),
    inOut: (t) => (e) => e < 0.5 ? t(e * 2) / 2 : 1 - t(e * -2 + 2) / 2,
    outIn: (t) => (e) =>
      e < 0.5 ? (1 - t(1 - e * 2)) / 2 : (t(e * 2 - 1) + 1) / 2,
  },
  Ec = (t, e, u) => {
    if (u[t]) return u[t];
    if (t.indexOf('(') <= -1) {
      const n =
        yn[t] || t.includes('Back') || t.includes('Elastic') ? e[t]() : e[t];
      return n ? (u[t] = n) : iu;
    } else {
      const s = t.slice(0, -1).split('('),
        n = e[s[0]];
      return n ? (u[t] = n(...s[1].split(','))) : iu;
    }
  },
  wc = (() => {
    const t = { linear: pa, irregular: Cc, steps: Tc, cubicBezier: yc };
    for (let e in yn)
      for (let u in Vr) {
        const s = Vr[u],
          n = yn[e];
        t[e + u] =
          u === Mt || u === 'Back' || u === 'Elastic'
            ? (r, i) => n(s(r, i))
            : n(s);
      }
    return t;
  })(),
  Ac = { linear: iu },
  Ur = (t) => (vu(t) ? t : gs(t) ? Ec(t, wc, Ac) : iu),
  $r = {},
  $n = (t, e, u) => {
    if (u === X.TRANSFORM) {
      const s = Zi.get(t);
      return s || t;
    } else if (u === X.CSS || (u === X.ATTRIBUTE && ua(e) && t in e.style)) {
      const s = $r[t];
      if (s) return s;
      {
        const n = t && K0(t);
        return ($r[t] = n), n;
      }
    } else return t;
  },
  Ms = { deg: 1, rad: 180 / _u, turn: 360 },
  Hr = {},
  ba = (t, e, u, s = !1) => {
    const n = e.u,
      r = e.n;
    if (e.t === L.UNIT && n === u) return e;
    const i = r + n + u,
      a = Hr[i];
    if (!F(a) && !s) e.n = a;
    else {
      let o;
      if (n in Ms) o = (r * Ms[n]) / Ms[u];
      else {
        const l = t.cloneNode(),
          f = t.parentNode,
          b = f && f !== nu ? f : nu.body;
        b.appendChild(l);
        const h = l.style;
        h.width = 100 + n;
        const S = l.offsetWidth || 100;
        h.width = 100 + u;
        const E = l.offsetWidth || 100,
          I = S / E;
        b.removeChild(l), (o = I * r);
      }
      (e.n = o), (Hr[i] = o);
    }
    return e.t, L.UNIT, (e.u = u), e;
  },
  Hn = (t) => {
    if (t._hasChildren) Y(t, Hn, !0);
    else {
      const e = t;
      e.pause(),
        Y(e, (u) => {
          const s = u.property,
            n = u.target;
          if (n[On]) {
            const r = n.style,
              i = e._inlineStyles[s];
            if (u._tweenType === X.TRANSFORM) {
              const a = n[bs];
              if (
                (F(i) || i === Mt ? delete a[s] : (a[s] = i),
                u._renderTransforms)
              )
                if (!Object.keys(a).length) r.removeProperty('transform');
                else {
                  let o = Mt;
                  for (let c in a) o += Qi[c] + a[c] + ') ';
                  r.transform = o;
                }
            } else F(i) || i === Mt ? r.removeProperty(s) : (r[s] = i);
            e._tail === u &&
              e.targets.forEach((a) => {
                a.getAttribute &&
                  a.getAttribute('style') === Mt &&
                  a.removeAttribute('style');
              });
          }
        });
    }
    return t;
  },
  w = Vn(),
  N = Vn(),
  Fu = { func: null },
  Vu = [null],
  Wt = [null, null],
  Uu = { to: null };
let _c = 0,
  St,
  it;
const Nc = (t, e) => {
  const u = {};
  if (ru(t)) {
    const s = [].concat(...t.map((n) => Object.keys(n))).filter(Zu);
    for (let n = 0, r = s.length; n < r; n++) {
      const i = s[n],
        a = t.map((o) => {
          const c = {};
          for (let l in o) {
            const f = o[l];
            Zu(l) ? l === i && (c.to = f) : (c[l] = f);
          }
          return c;
        });
      u[i] = a;
    }
  } else {
    const s = xe(e.duration, re.defaults.duration);
    Object.keys(t)
      .map((r) => ({ o: parseFloat(r) / 100, p: t[r] }))
      .sort((r, i) => r.o - i.o)
      .forEach((r) => {
        const i = r.o,
          a = r.p;
        for (let o in a)
          if (Zu(o)) {
            let c = u[o];
            c || (c = u[o] = []);
            const l = i * s;
            let f = c.length,
              b = c[f - 1];
            const h = { to: a[o] };
            let S = 0;
            for (let E = 0; E < f; E++) S += c[E].duration;
            f === 1 && (h.from = b.to),
              a.ease && (h.ease = a.ease),
              (h.duration = l - (f ? S : 0)),
              c.push(h);
          }
        return r;
      });
    for (let r in u) {
      const i = u[r];
      let a;
      for (let o = 0, c = i.length; o < c; o++) {
        const l = i[o],
          f = l.ease;
        (l.ease = a || void 0), (a = f);
      }
      i[0].duration || i.shift();
    }
  }
  return u;
};
class ga extends fa {
  constructor(e, u, s, n, r = !1, i = 0, a = 0) {
    super(u, s, n);
    const o = Bn(e),
      c = o.length,
      l = u.keyframes,
      f = l ? nc(Nc(l, u), u) : u,
      {
        delay: b,
        duration: h,
        ease: S,
        playbackEase: E,
        modifier: I,
        composition: D,
        onRender: H,
      } = f,
      q = s ? s.defaults : re.defaults,
      G = xe(E, q.playbackEase),
      R = G ? Ur(G) : null,
      k = !F(S) && !F(S.ease),
      z = k ? S.ease : xe(S, R ? 'linear' : q.ease),
      te = k ? S.duration : xe(h, q.duration),
      me = xe(b, q.delay),
      ue = I || q.modifier,
      B = F(D) && c >= qt ? we.none : F(D) ? q.composition : D,
      W = {},
      he = this._offset + (s ? s._offset : 0);
    let pe = NaN,
      _ = NaN,
      Q = 0,
      _e = 0;
    for (let J = 0; J < c; J++) {
      const y = o[J],
        oe = i || J,
        ke = a || c;
      let Ht = NaN,
        Nt = NaN;
      for (let Ve in f)
        if (Zu(Ve)) {
          const Ne = Fn(y, Ve),
            Ue = $n(Ve, y, Ne);
          let Pe = f[Ve];
          const hu = ru(Pe);
          if ((r && !hu && ((Wt[0] = Pe), (Wt[1] = Pe), (Pe = Wt)), hu)) {
            const Re = Pe.length,
              We = !Ds(Pe[0]);
            Re === 2 && We
              ? ((Uu.to = Pe), (Vu[0] = Uu), (St = Vu))
              : Re > 2 && We
              ? ((St = []),
                Pe.forEach((Ce, De) => {
                  De
                    ? De === 1
                      ? ((Wt[1] = Ce), St.push(Wt))
                      : St.push(Ce)
                    : (Wt[0] = Ce);
                }))
              : (St = Pe);
          } else (Vu[0] = Pe), (St = Vu);
          let ut = null,
            $e = null,
            lt = NaN,
            dt = 0,
            ce = 0;
          for (let Re = St.length; ce < Re; ce++) {
            const We = St[ce];
            Ds(We) ? (it = We) : ((Uu.to = We), (it = Uu)), (Fu.func = null);
            const Ce = mt(it.to, y, oe, ke, Fu);
            let De;
            Ds(Ce) && !F(Ce.to) ? ((it = Ce), (De = Ce.to)) : (De = Ce);
            const Gt = mt(it.from, y, oe, ke),
              st = it.ease,
              Le = !F(st) && !F(st.ease),
              jt = Le ? st.ease : st || z,
              se = Le
                ? st.duration
                : mt(
                    xe(it.duration, Re > 1 ? mt(te, y, oe, ke) / Re : te),
                    y,
                    oe,
                    ke
                  ),
              nt = mt(xe(it.delay, ce ? 0 : me), y, oe, ke),
              rt = mt(xe(it.composition, B), y, oe, ke),
              ft = X0(rt) ? rt : we[rt],
              ku = it.modifier || ue,
              zt = !F(Gt),
              Rt = !F(De),
              Pu = ru(De),
              q0 = Pu || (zt && Rt),
              As = $e ? dt + nt : nt,
              _s = he + As;
            !_e && (zt || Pu) && (_e = 1);
            let He = $e;
            if (ft !== we.none) {
              ut || (ut = Un(y, Ue));
              let j = ut._head;
              for (; j && !j._isOverridden && j._absoluteStartTime <= _s; )
                if (
                  ((He = j), (j = j._nextRep), j && j._absoluteStartTime >= _s)
                )
                  for (; j; ) Qu(j), (j = j._nextRep);
            }
            if (
              (q0
                ? (Xe(Pu ? mt(De[0], y, oe, ke) : Gt, w),
                  Xe(Pu ? mt(De[1], y, oe, ke, Fu) : De, N),
                  w.t === L.NUMBER &&
                    (He
                      ? He._valueType === L.UNIT &&
                        ((w.t = L.UNIT), (w.u = He._unit))
                      : (Xe(Yt(y, Ue, Ne, W), Ge),
                        Ge.t === L.UNIT && ((w.t = L.UNIT), (w.u = Ge.u)))))
                : (Rt
                    ? Xe(De, N)
                    : $e
                    ? qr($e, N)
                    : Xe(
                        s && He && He.parent.parent === s
                          ? He._value
                          : Yt(y, Ue, Ne, W),
                        N
                      ),
                  zt
                    ? Xe(Gt, w)
                    : $e
                    ? qr($e, w)
                    : Xe(
                        s && He && He.parent.parent === s
                          ? He._value
                          : Yt(y, Ue, Ne, W),
                        w
                      )),
              w.o &&
                (w.n = Pr(
                  He ? He._toNumber : Xe(Yt(y, Ue, Ne, W), Ge).n,
                  w.n,
                  w.o
                )),
              N.o && (N.n = Pr(w.n, N.n, N.o)),
              w.t !== N.t)
            ) {
              if (w.t === L.COMPLEX || N.t === L.COMPLEX) {
                const j = w.t === L.COMPLEX ? w : N,
                  Se = w.t === L.COMPLEX ? N : w;
                (Se.t = L.COMPLEX),
                  (Se.s = ve(j.s)),
                  (Se.d = j.d.map(() => Se.n));
              } else if (w.t === L.UNIT || N.t === L.UNIT) {
                const j = w.t === L.UNIT ? w : N,
                  Se = w.t === L.UNIT ? N : w;
                (Se.t = L.UNIT), (Se.u = j.u);
              } else if (w.t === L.COLOR || N.t === L.COLOR) {
                const j = w.t === L.COLOR ? w : N,
                  Se = w.t === L.COLOR ? N : w;
                (Se.t = L.COLOR), (Se.s = j.s), (Se.d = [0, 0, 0, 1]);
              }
            }
            if (w.u !== N.u) {
              let j = N.u ? w : N;
              j = ba(y, j, N.u ? N.u : w.u, !1);
            }
            if (N.d && w.d && N.d.length !== w.d.length) {
              const j = w.d.length > N.d.length ? w : N,
                Se = j === w ? N : w;
              (Se.d = j.d.map((m1, Dr) => (F(Se.d[Dr]) ? 0 : Se.d[Dr]))),
                (Se.s = ve(j.s));
            }
            const Ns = Z(+se || $, 12),
              qu = {
                parent: this,
                id: _c++,
                property: Ue,
                target: y,
                _value: null,
                _func: Fu.func,
                _ease: Ur(jt),
                _fromNumbers: ve(w.d),
                _toNumbers: ve(N.d),
                _strings: ve(N.s),
                _fromNumber: w.n,
                _toNumber: N.n,
                _numbers: ve(w.d),
                _number: w.n,
                _unit: N.u,
                _modifier: ku,
                _currentTime: 0,
                _startTime: As,
                _delay: +nt,
                _updateDuration: Ns,
                _changeDuration: Ns,
                _absoluteStartTime: _s,
                _tweenType: Ne,
                _valueType: N.t,
                _composition: ft,
                _isOverlapped: 0,
                _isOverridden: 0,
                _renderTransforms: 0,
                _prevRep: null,
                _nextRep: null,
                _prevAdd: null,
                _nextAdd: null,
                _prev: null,
                _next: null,
              };
            ft !== we.none && la(qu, ut),
              isNaN(lt) && (lt = qu._startTime),
              (dt = Z(As + Ns, 12)),
              ($e = qu),
              Q++,
              eu(this, qu);
          }
          (isNaN(_) || lt < _) && (_ = lt),
            (isNaN(pe) || dt > pe) && (pe = dt),
            Ne === X.TRANSFORM && ((Ht = Q - ce), (Nt = Q));
        }
      if (!isNaN(Ht)) {
        let Ve = 0;
        Y(this, (Ne) => {
          Ve >= Ht &&
            Ve < Nt &&
            ((Ne._renderTransforms = 1),
            Ne._composition === we.blend &&
              Y(su.animation, (Ue) => {
                Ue.id === Ne.id && (Ue._renderTransforms = 1);
              })),
            Ve++;
        });
      }
    }
    c ||
      console.warn(
        "No target found. Make sure the element you're trying to animate is accessible before creating your animation."
      ),
      _
        ? (Y(this, (J) => {
            J._startTime - J._delay || (J._delay -= _), (J._startTime -= _);
          }),
          (pe -= _))
        : (_ = 0),
      pe || ((pe = $), (this.iterationCount = 0)),
      (this.targets = o),
      (this.duration =
        pe === $
          ? $
          : qn(
              (pe + this._loopDelay) * this.iterationCount - this._loopDelay
            ) || $),
      (this.onRender = H || q.onRender),
      (this._ease = R),
      (this._delay = _),
      (this.iterationDuration = pe),
      (this._inlineStyles = W),
      !this._autoplay && _e && this.onRender(this);
  }
  stretch(e) {
    const u = this.duration;
    if (u === xu(e)) return this;
    const s = e / u;
    return (
      Y(this, (n) => {
        (n._updateDuration = xu(n._updateDuration * s)),
          (n._changeDuration = xu(n._changeDuration * s)),
          (n._currentTime *= s),
          (n._startTime *= s),
          (n._absoluteStartTime *= s);
      }),
      super.stretch(e)
    );
  }
  refresh() {
    return (
      Y(this, (e) => {
        const u = e._func;
        if (u) {
          const s = Yt(e.target, e.property, e._tweenType);
          Xe(s, Ge),
            Xe(u(), N),
            (e._fromNumbers = ve(Ge.d)),
            (e._fromNumber = Ge.n),
            (e._toNumbers = ve(N.d)),
            (e._strings = ve(N.s)),
            (e._toNumber = N.n);
        }
      }),
      this
    );
  }
  revert() {
    return super.revert(), Hn(this);
  }
  then(e) {
    return super.then(e);
  }
}
const Rc = (t, e) => new ga(t, e, null, 0, !1).init(),
  Gr = { _head: null, _tail: null },
  Dc = (t, e, u) => {
    let s = Gr._head;
    for (; s; ) {
      const n = s._next,
        r = s.$el === t,
        i = !e || s.property === e,
        a = !u || s.parent === u;
      if (r && i && a) {
        const o = s.animation;
        try {
          o.commitStyles();
        } catch {}
        o.cancel(), yt(Gr, s);
        const c = s.parent;
        c &&
          (c._completed++,
          c.animations.length === c._completed &&
            ((c.completed = !0),
            c.muteCallbacks ||
              ((c.paused = !0), c.onComplete(c), c._resolve(c))));
      }
      s = n;
    }
  },
  Lc = (t = Ee) =>
    new fa({ duration: 1 * re.timeScale, onComplete: t }, null, 0).resume();
function Ic(t, e, u) {
  const s = Bn(t);
  if (!s.length) return;
  const [n] = s,
    r = Fn(n, e),
    i = $n(e, n, r);
  let a = Yt(n, i);
  if (F(u)) return a;
  if ((Xe(a, Ge), Ge.t === L.NUMBER || Ge.t === L.UNIT)) {
    if (u === !1) return Ge.n;
    {
      const o = ba(n, Ge, u, !1);
      return `${Z(o.n, re.precision)}${o.u}`;
    }
  }
}
const Mc = (t, e) => {
    if (!F(e))
      return (
        (e.duration = $),
        (e.composition = xe(e.composition, we.none)),
        new ga(t, e, null, 0, !0).resume()
      );
  },
  jr = (t, e, u) => {
    let s = !1;
    return (
      Y(
        e,
        (n) => {
          const r = n.target;
          if (t.includes(r)) {
            const i = n.property,
              a = n._tweenType,
              o = $n(u, r, a);
            (!o || (o && o === i)) &&
              (n.parent._tail === n &&
                n._tweenType === X.TRANSFORM &&
                n._prev &&
                n._prev._tweenType === X.TRANSFORM &&
                (n._prev._renderTransforms = 1),
              yt(e, n),
              da(n),
              (s = !0));
          }
        },
        !0
      ),
      s
    );
  },
  ma = (t, e, u) => {
    const s = ca(t),
      n = e || ne,
      r = e && e.controlAnimation && e;
    for (let a = 0, o = s.length; a < o; a++) {
      const c = s[a];
      Dc(c, u, r);
    }
    let i;
    if (n._hasChildren) {
      let a = 0;
      Y(
        n,
        (o) => {
          if (!o._hasChildren)
            if (((i = jr(s, o, u)), i && !o._head)) o.cancel(), yt(n, o);
            else {
              const l = o._offset + o._delay + o.duration;
              l > a && (a = l);
            }
          o._head ? ma(t, o, u) : (o._hasChildren = !1);
        },
        !0
      ),
        F(n.iterationDuration) || (n.iterationDuration = a);
    } else i = jr(s, n, u);
    return i && !n._head && ((n._hasChildren = !1), n.cancel && n.cancel()), s;
  },
  Oc = rc,
  kc = (t) => t[Pn(0, t.length - 1)],
  Pc = (t, e) => (+t).toFixed(e),
  qc = (t, e, u) => `${t}`.padStart(e, u),
  Bc = (t, e, u) => `${t}`.padEnd(e, u),
  Fc = (t, e, u) => ((((t - e) % (u - e)) + (u - e)) % (u - e)) + e,
  Vc = (t, e, u, s, n) => s + ((t - e) / (u - e)) * (n - s),
  Uc = (t) => (t * _u) / 180,
  $c = (t) => (t * 180) / _u,
  Hc = (t, e, u, s) => {
    let n = qt / re.defaults.frameRate;
    if (s !== !1) {
      const i = s || (ne._hasChildren && ne);
      i && i.deltaTime && (n = i.deltaTime);
    }
    const r = 1 - Math.exp(-u * n * 0.1);
    return u ? (u === 1 ? e : (1 - r) * t + r * e) : t;
  },
  Gc =
    (t, e = 0) =>
    (...u) =>
      e ? (s) => t(...u, s) : (s) => t(s, ...u),
  Sa =
    (t) =>
    (...e) => {
      const u = t(...e);
      return new Proxy(Ee, {
        apply: (s, n, [r]) => u(r),
        get: (s, n) =>
          Sa((...r) => {
            const i = xa[n](...r);
            return (a) => i(u(a));
          }),
      });
    },
  Ke =
    (t, e = 0) =>
    (...u) =>
      (u.length < t.length ? Sa(Gc(t, e)) : t)(...u),
  xa = {
    $: Bn,
    get: Ic,
    set: Mc,
    remove: ma,
    cleanInlineStyles: Hn,
    random: Pn,
    randomPick: kc,
    shuffle: sc,
    lerp: Hc,
    sync: Lc,
    keepTime: Oc,
    clamp: Ke(ge),
    round: Ke(Z),
    snap: Ke(uc),
    wrap: Ke(Fc),
    interpolate: Ke(xt, 1),
    mapRange: Ke(Vc),
    roundPad: Ke(Pc),
    padStart: Ke(qc),
    padEnd: Ke(Bc),
    degToRad: Ke(Uc),
    radToDeg: Ke($c),
  },
  is = Symbol('changed'),
  Qt = Symbol('classList'),
  Je = Symbol('CustomElements'),
  $u = Symbol('content'),
  Os = Symbol('dataset'),
  Dt = Symbol('doctype'),
  Tn = Symbol('DOMParser'),
  T = Symbol('end'),
  bu = Symbol('EventTarget'),
  es = Symbol('globals'),
  Ze = Symbol('image'),
  ou = Symbol('mime'),
  Tt = Symbol('MutationObserver'),
  m = Symbol('next'),
  ya = Symbol('ownerElement'),
  de = Symbol('prev'),
  ye = Symbol('private'),
  Kt = Symbol('sheet'),
  Ie = Symbol('start'),
  ks = Symbol('style'),
  yu = Symbol('upgrade'),
  U = Symbol('value'),
  jc = new Uint16Array(
    'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'
      .split('')
      .map((t) => t.charCodeAt(0))
  ),
  zc = new Uint16Array(
    'Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢'
      .split('')
      .map((t) => t.charCodeAt(0))
  );
var Ps;
const Wc = new Map([
    [0, 65533],
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
  ]),
  zr =
    (Ps = String.fromCodePoint) !== null && Ps !== void 0
      ? Ps
      : function (t) {
          let e = '';
          return (
            t > 65535 &&
              ((t -= 65536),
              (e += String.fromCharCode(((t >>> 10) & 1023) | 55296)),
              (t = 56320 | (t & 1023))),
            (e += String.fromCharCode(t)),
            e
          );
        };
function Kc(t) {
  var e;
  return (t >= 55296 && t <= 57343) || t > 1114111
    ? 65533
    : (e = Wc.get(t)) !== null && e !== void 0
    ? e
    : t;
}
var fe;
(function (t) {
  (t[(t.NUM = 35)] = 'NUM'),
    (t[(t.SEMI = 59)] = 'SEMI'),
    (t[(t.EQUALS = 61)] = 'EQUALS'),
    (t[(t.ZERO = 48)] = 'ZERO'),
    (t[(t.NINE = 57)] = 'NINE'),
    (t[(t.LOWER_A = 97)] = 'LOWER_A'),
    (t[(t.LOWER_F = 102)] = 'LOWER_F'),
    (t[(t.LOWER_X = 120)] = 'LOWER_X'),
    (t[(t.LOWER_Z = 122)] = 'LOWER_Z'),
    (t[(t.UPPER_A = 65)] = 'UPPER_A'),
    (t[(t.UPPER_F = 70)] = 'UPPER_F'),
    (t[(t.UPPER_Z = 90)] = 'UPPER_Z');
})(fe || (fe = {}));
const Xc = 32;
var Ct;
(function (t) {
  (t[(t.VALUE_LENGTH = 49152)] = 'VALUE_LENGTH'),
    (t[(t.BRANCH_LENGTH = 16256)] = 'BRANCH_LENGTH'),
    (t[(t.JUMP_TABLE = 127)] = 'JUMP_TABLE');
})(Ct || (Ct = {}));
function Cn(t) {
  return t >= fe.ZERO && t <= fe.NINE;
}
function Jc(t) {
  return (
    (t >= fe.UPPER_A && t <= fe.UPPER_F) || (t >= fe.LOWER_A && t <= fe.LOWER_F)
  );
}
function Zc(t) {
  return (
    (t >= fe.UPPER_A && t <= fe.UPPER_Z) ||
    (t >= fe.LOWER_A && t <= fe.LOWER_Z) ||
    Cn(t)
  );
}
function Yc(t) {
  return t === fe.EQUALS || Zc(t);
}
var le;
(function (t) {
  (t[(t.EntityStart = 0)] = 'EntityStart'),
    (t[(t.NumericStart = 1)] = 'NumericStart'),
    (t[(t.NumericDecimal = 2)] = 'NumericDecimal'),
    (t[(t.NumericHex = 3)] = 'NumericHex'),
    (t[(t.NamedEntity = 4)] = 'NamedEntity');
})(le || (le = {}));
var at;
(function (t) {
  (t[(t.Legacy = 0)] = 'Legacy'),
    (t[(t.Strict = 1)] = 'Strict'),
    (t[(t.Attribute = 2)] = 'Attribute');
})(at || (at = {}));
class Qc {
  constructor(e, u, s) {
    (this.decodeTree = e),
      (this.emitCodePoint = u),
      (this.errors = s),
      (this.state = le.EntityStart),
      (this.consumed = 1),
      (this.result = 0),
      (this.treeIndex = 0),
      (this.excess = 1),
      (this.decodeMode = at.Strict);
  }
  startEntity(e) {
    (this.decodeMode = e),
      (this.state = le.EntityStart),
      (this.result = 0),
      (this.treeIndex = 0),
      (this.excess = 1),
      (this.consumed = 1);
  }
  write(e, u) {
    switch (this.state) {
      case le.EntityStart:
        return e.charCodeAt(u) === fe.NUM
          ? ((this.state = le.NumericStart),
            (this.consumed += 1),
            this.stateNumericStart(e, u + 1))
          : ((this.state = le.NamedEntity), this.stateNamedEntity(e, u));
      case le.NumericStart:
        return this.stateNumericStart(e, u);
      case le.NumericDecimal:
        return this.stateNumericDecimal(e, u);
      case le.NumericHex:
        return this.stateNumericHex(e, u);
      case le.NamedEntity:
        return this.stateNamedEntity(e, u);
    }
  }
  stateNumericStart(e, u) {
    return u >= e.length
      ? -1
      : (e.charCodeAt(u) | Xc) === fe.LOWER_X
      ? ((this.state = le.NumericHex),
        (this.consumed += 1),
        this.stateNumericHex(e, u + 1))
      : ((this.state = le.NumericDecimal), this.stateNumericDecimal(e, u));
  }
  addToNumericResult(e, u, s, n) {
    if (u !== s) {
      const r = s - u;
      (this.result =
        this.result * Math.pow(n, r) + Number.parseInt(e.substr(u, r), n)),
        (this.consumed += r);
    }
  }
  stateNumericHex(e, u) {
    const s = u;
    for (; u < e.length; ) {
      const n = e.charCodeAt(u);
      if (Cn(n) || Jc(n)) u += 1;
      else
        return (
          this.addToNumericResult(e, s, u, 16), this.emitNumericEntity(n, 3)
        );
    }
    return this.addToNumericResult(e, s, u, 16), -1;
  }
  stateNumericDecimal(e, u) {
    const s = u;
    for (; u < e.length; ) {
      const n = e.charCodeAt(u);
      if (Cn(n)) u += 1;
      else
        return (
          this.addToNumericResult(e, s, u, 10), this.emitNumericEntity(n, 2)
        );
    }
    return this.addToNumericResult(e, s, u, 10), -1;
  }
  emitNumericEntity(e, u) {
    var s;
    if (this.consumed <= u)
      return (
        (s = this.errors) === null ||
          s === void 0 ||
          s.absenceOfDigitsInNumericCharacterReference(this.consumed),
        0
      );
    if (e === fe.SEMI) this.consumed += 1;
    else if (this.decodeMode === at.Strict) return 0;
    return (
      this.emitCodePoint(Kc(this.result), this.consumed),
      this.errors &&
        (e !== fe.SEMI && this.errors.missingSemicolonAfterCharacterReference(),
        this.errors.validateNumericCharacterReference(this.result)),
      this.consumed
    );
  }
  stateNamedEntity(e, u) {
    const { decodeTree: s } = this;
    let n = s[this.treeIndex],
      r = (n & Ct.VALUE_LENGTH) >> 14;
    for (; u < e.length; u++, this.excess++) {
      const i = e.charCodeAt(u);
      if (
        ((this.treeIndex = el(s, n, this.treeIndex + Math.max(1, r), i)),
        this.treeIndex < 0)
      )
        return this.result === 0 ||
          (this.decodeMode === at.Attribute && (r === 0 || Yc(i)))
          ? 0
          : this.emitNotTerminatedNamedEntity();
      if (
        ((n = s[this.treeIndex]), (r = (n & Ct.VALUE_LENGTH) >> 14), r !== 0)
      ) {
        if (i === fe.SEMI)
          return this.emitNamedEntityData(
            this.treeIndex,
            r,
            this.consumed + this.excess
          );
        this.decodeMode !== at.Strict &&
          ((this.result = this.treeIndex),
          (this.consumed += this.excess),
          (this.excess = 0));
      }
    }
    return -1;
  }
  emitNotTerminatedNamedEntity() {
    var e;
    const { result: u, decodeTree: s } = this,
      n = (s[u] & Ct.VALUE_LENGTH) >> 14;
    return (
      this.emitNamedEntityData(u, n, this.consumed),
      (e = this.errors) === null ||
        e === void 0 ||
        e.missingSemicolonAfterCharacterReference(),
      this.consumed
    );
  }
  emitNamedEntityData(e, u, s) {
    const { decodeTree: n } = this;
    return (
      this.emitCodePoint(u === 1 ? n[e] & ~Ct.VALUE_LENGTH : n[e + 1], s),
      u === 3 && this.emitCodePoint(n[e + 2], s),
      s
    );
  }
  end() {
    var e;
    switch (this.state) {
      case le.NamedEntity:
        return this.result !== 0 &&
          (this.decodeMode !== at.Attribute || this.result === this.treeIndex)
          ? this.emitNotTerminatedNamedEntity()
          : 0;
      case le.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case le.NumericHex:
        return this.emitNumericEntity(0, 3);
      case le.NumericStart:
        return (
          (e = this.errors) === null ||
            e === void 0 ||
            e.absenceOfDigitsInNumericCharacterReference(this.consumed),
          0
        );
      case le.EntityStart:
        return 0;
    }
  }
}
function el(t, e, u, s) {
  const n = (e & Ct.BRANCH_LENGTH) >> 7,
    r = e & Ct.JUMP_TABLE;
  if (n === 0) return r !== 0 && s === r ? u : -1;
  if (r) {
    const o = s - r;
    return o < 0 || o >= n ? -1 : t[u + o] - 1;
  }
  let i = u,
    a = i + n - 1;
  for (; i <= a; ) {
    const o = (i + a) >>> 1,
      c = t[o];
    if (c < s) i = o + 1;
    else if (c > s) a = o - 1;
    else return t[o + n];
  }
  return -1;
}
var C;
(function (t) {
  (t[(t.Tab = 9)] = 'Tab'),
    (t[(t.NewLine = 10)] = 'NewLine'),
    (t[(t.FormFeed = 12)] = 'FormFeed'),
    (t[(t.CarriageReturn = 13)] = 'CarriageReturn'),
    (t[(t.Space = 32)] = 'Space'),
    (t[(t.ExclamationMark = 33)] = 'ExclamationMark'),
    (t[(t.Number = 35)] = 'Number'),
    (t[(t.Amp = 38)] = 'Amp'),
    (t[(t.SingleQuote = 39)] = 'SingleQuote'),
    (t[(t.DoubleQuote = 34)] = 'DoubleQuote'),
    (t[(t.Dash = 45)] = 'Dash'),
    (t[(t.Slash = 47)] = 'Slash'),
    (t[(t.Zero = 48)] = 'Zero'),
    (t[(t.Nine = 57)] = 'Nine'),
    (t[(t.Semi = 59)] = 'Semi'),
    (t[(t.Lt = 60)] = 'Lt'),
    (t[(t.Eq = 61)] = 'Eq'),
    (t[(t.Gt = 62)] = 'Gt'),
    (t[(t.Questionmark = 63)] = 'Questionmark'),
    (t[(t.UpperA = 65)] = 'UpperA'),
    (t[(t.LowerA = 97)] = 'LowerA'),
    (t[(t.UpperF = 70)] = 'UpperF'),
    (t[(t.LowerF = 102)] = 'LowerF'),
    (t[(t.UpperZ = 90)] = 'UpperZ'),
    (t[(t.LowerZ = 122)] = 'LowerZ'),
    (t[(t.LowerX = 120)] = 'LowerX'),
    (t[(t.OpeningSquareBracket = 91)] = 'OpeningSquareBracket');
})(C || (C = {}));
var p;
(function (t) {
  (t[(t.Text = 1)] = 'Text'),
    (t[(t.BeforeTagName = 2)] = 'BeforeTagName'),
    (t[(t.InTagName = 3)] = 'InTagName'),
    (t[(t.InSelfClosingTag = 4)] = 'InSelfClosingTag'),
    (t[(t.BeforeClosingTagName = 5)] = 'BeforeClosingTagName'),
    (t[(t.InClosingTagName = 6)] = 'InClosingTagName'),
    (t[(t.AfterClosingTagName = 7)] = 'AfterClosingTagName'),
    (t[(t.BeforeAttributeName = 8)] = 'BeforeAttributeName'),
    (t[(t.InAttributeName = 9)] = 'InAttributeName'),
    (t[(t.AfterAttributeName = 10)] = 'AfterAttributeName'),
    (t[(t.BeforeAttributeValue = 11)] = 'BeforeAttributeValue'),
    (t[(t.InAttributeValueDq = 12)] = 'InAttributeValueDq'),
    (t[(t.InAttributeValueSq = 13)] = 'InAttributeValueSq'),
    (t[(t.InAttributeValueNq = 14)] = 'InAttributeValueNq'),
    (t[(t.BeforeDeclaration = 15)] = 'BeforeDeclaration'),
    (t[(t.InDeclaration = 16)] = 'InDeclaration'),
    (t[(t.InProcessingInstruction = 17)] = 'InProcessingInstruction'),
    (t[(t.BeforeComment = 18)] = 'BeforeComment'),
    (t[(t.CDATASequence = 19)] = 'CDATASequence'),
    (t[(t.InSpecialComment = 20)] = 'InSpecialComment'),
    (t[(t.InCommentLike = 21)] = 'InCommentLike'),
    (t[(t.BeforeSpecialS = 22)] = 'BeforeSpecialS'),
    (t[(t.BeforeSpecialT = 23)] = 'BeforeSpecialT'),
    (t[(t.SpecialStartSequence = 24)] = 'SpecialStartSequence'),
    (t[(t.InSpecialTag = 25)] = 'InSpecialTag'),
    (t[(t.InEntity = 26)] = 'InEntity');
})(p || (p = {}));
function ht(t) {
  return (
    t === C.Space ||
    t === C.NewLine ||
    t === C.Tab ||
    t === C.FormFeed ||
    t === C.CarriageReturn
  );
}
function Hu(t) {
  return t === C.Slash || t === C.Gt || ht(t);
}
function tl(t) {
  return (t >= C.LowerA && t <= C.LowerZ) || (t >= C.UpperA && t <= C.UpperZ);
}
var Ye;
(function (t) {
  (t[(t.NoValue = 0)] = 'NoValue'),
    (t[(t.Unquoted = 1)] = 'Unquoted'),
    (t[(t.Single = 2)] = 'Single'),
    (t[(t.Double = 3)] = 'Double');
})(Ye || (Ye = {}));
const ee = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  CdataEnd: new Uint8Array([93, 93, 62]),
  CommentEnd: new Uint8Array([45, 45, 62]),
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97]),
  XmpEnd: new Uint8Array([60, 47, 120, 109, 112]),
};
class Ta {
  constructor({ xmlMode: e = !1, decodeEntities: u = !0 }, s) {
    (this.cbs = s),
      (this.state = p.Text),
      (this.buffer = ''),
      (this.sectionStart = 0),
      (this.index = 0),
      (this.entityStart = 0),
      (this.baseState = p.Text),
      (this.isSpecial = !1),
      (this.running = !0),
      (this.offset = 0),
      (this.currentSequence = void 0),
      (this.sequenceIndex = 0),
      (this.xmlMode = e),
      (this.decodeEntities = u),
      (this.entityDecoder = new Qc(e ? zc : jc, (n, r) =>
        this.emitCodePoint(n, r)
      ));
  }
  reset() {
    (this.state = p.Text),
      (this.buffer = ''),
      (this.sectionStart = 0),
      (this.index = 0),
      (this.baseState = p.Text),
      (this.currentSequence = void 0),
      (this.running = !0),
      (this.offset = 0);
  }
  write(e) {
    (this.offset += this.buffer.length), (this.buffer = e), this.parse();
  }
  end() {
    this.running && this.finish();
  }
  pause() {
    this.running = !1;
  }
  resume() {
    (this.running = !0),
      this.index < this.buffer.length + this.offset && this.parse();
  }
  stateText(e) {
    e === C.Lt || (!this.decodeEntities && this.fastForwardTo(C.Lt))
      ? (this.index > this.sectionStart &&
          this.cbs.ontext(this.sectionStart, this.index),
        (this.state = p.BeforeTagName),
        (this.sectionStart = this.index))
      : this.decodeEntities && e === C.Amp && this.startEntity();
  }
  stateSpecialStartSequence(e) {
    const u = this.sequenceIndex === this.currentSequence.length;
    if (!(u ? Hu(e) : (e | 32) === this.currentSequence[this.sequenceIndex]))
      this.isSpecial = !1;
    else if (!u) {
      this.sequenceIndex++;
      return;
    }
    (this.sequenceIndex = 0),
      (this.state = p.InTagName),
      this.stateInTagName(e);
  }
  stateInSpecialTag(e) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (e === C.Gt || ht(e)) {
        const u = this.index - this.currentSequence.length;
        if (this.sectionStart < u) {
          const s = this.index;
          (this.index = u),
            this.cbs.ontext(this.sectionStart, u),
            (this.index = s);
        }
        (this.isSpecial = !1),
          (this.sectionStart = u + 2),
          this.stateInClosingTagName(e);
        return;
      }
      this.sequenceIndex = 0;
    }
    (e | 32) === this.currentSequence[this.sequenceIndex]
      ? (this.sequenceIndex += 1)
      : this.sequenceIndex === 0
      ? this.currentSequence === ee.TitleEnd
        ? this.decodeEntities && e === C.Amp && this.startEntity()
        : this.fastForwardTo(C.Lt) && (this.sequenceIndex = 1)
      : (this.sequenceIndex = +(e === C.Lt));
  }
  stateCDATASequence(e) {
    e === ee.Cdata[this.sequenceIndex]
      ? ++this.sequenceIndex === ee.Cdata.length &&
        ((this.state = p.InCommentLike),
        (this.currentSequence = ee.CdataEnd),
        (this.sequenceIndex = 0),
        (this.sectionStart = this.index + 1))
      : ((this.sequenceIndex = 0),
        (this.state = p.InDeclaration),
        this.stateInDeclaration(e));
  }
  fastForwardTo(e) {
    for (; ++this.index < this.buffer.length + this.offset; )
      if (this.buffer.charCodeAt(this.index - this.offset) === e) return !0;
    return (this.index = this.buffer.length + this.offset - 1), !1;
  }
  stateInCommentLike(e) {
    e === this.currentSequence[this.sequenceIndex]
      ? ++this.sequenceIndex === this.currentSequence.length &&
        (this.currentSequence === ee.CdataEnd
          ? this.cbs.oncdata(this.sectionStart, this.index, 2)
          : this.cbs.oncomment(this.sectionStart, this.index, 2),
        (this.sequenceIndex = 0),
        (this.sectionStart = this.index + 1),
        (this.state = p.Text))
      : this.sequenceIndex === 0
      ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1)
      : e !== this.currentSequence[this.sequenceIndex - 1] &&
        (this.sequenceIndex = 0);
  }
  isTagStartChar(e) {
    return this.xmlMode ? !Hu(e) : tl(e);
  }
  startSpecial(e, u) {
    (this.isSpecial = !0),
      (this.currentSequence = e),
      (this.sequenceIndex = u),
      (this.state = p.SpecialStartSequence);
  }
  stateBeforeTagName(e) {
    if (e === C.ExclamationMark)
      (this.state = p.BeforeDeclaration), (this.sectionStart = this.index + 1);
    else if (e === C.Questionmark)
      (this.state = p.InProcessingInstruction),
        (this.sectionStart = this.index + 1);
    else if (this.isTagStartChar(e)) {
      const u = e | 32;
      (this.sectionStart = this.index),
        this.xmlMode
          ? (this.state = p.InTagName)
          : u === ee.ScriptEnd[2]
          ? (this.state = p.BeforeSpecialS)
          : u === ee.TitleEnd[2] || u === ee.XmpEnd[2]
          ? (this.state = p.BeforeSpecialT)
          : (this.state = p.InTagName);
    } else
      e === C.Slash
        ? (this.state = p.BeforeClosingTagName)
        : ((this.state = p.Text), this.stateText(e));
  }
  stateInTagName(e) {
    Hu(e) &&
      (this.cbs.onopentagname(this.sectionStart, this.index),
      (this.sectionStart = -1),
      (this.state = p.BeforeAttributeName),
      this.stateBeforeAttributeName(e));
  }
  stateBeforeClosingTagName(e) {
    ht(e) ||
      (e === C.Gt
        ? (this.state = p.Text)
        : ((this.state = this.isTagStartChar(e)
            ? p.InClosingTagName
            : p.InSpecialComment),
          (this.sectionStart = this.index)));
  }
  stateInClosingTagName(e) {
    (e === C.Gt || ht(e)) &&
      (this.cbs.onclosetag(this.sectionStart, this.index),
      (this.sectionStart = -1),
      (this.state = p.AfterClosingTagName),
      this.stateAfterClosingTagName(e));
  }
  stateAfterClosingTagName(e) {
    (e === C.Gt || this.fastForwardTo(C.Gt)) &&
      ((this.state = p.Text), (this.sectionStart = this.index + 1));
  }
  stateBeforeAttributeName(e) {
    e === C.Gt
      ? (this.cbs.onopentagend(this.index),
        this.isSpecial
          ? ((this.state = p.InSpecialTag), (this.sequenceIndex = 0))
          : (this.state = p.Text),
        (this.sectionStart = this.index + 1))
      : e === C.Slash
      ? (this.state = p.InSelfClosingTag)
      : ht(e) ||
        ((this.state = p.InAttributeName), (this.sectionStart = this.index));
  }
  stateInSelfClosingTag(e) {
    e === C.Gt
      ? (this.cbs.onselfclosingtag(this.index),
        (this.state = p.Text),
        (this.sectionStart = this.index + 1),
        (this.isSpecial = !1))
      : ht(e) ||
        ((this.state = p.BeforeAttributeName),
        this.stateBeforeAttributeName(e));
  }
  stateInAttributeName(e) {
    (e === C.Eq || Hu(e)) &&
      (this.cbs.onattribname(this.sectionStart, this.index),
      (this.sectionStart = this.index),
      (this.state = p.AfterAttributeName),
      this.stateAfterAttributeName(e));
  }
  stateAfterAttributeName(e) {
    e === C.Eq
      ? (this.state = p.BeforeAttributeValue)
      : e === C.Slash || e === C.Gt
      ? (this.cbs.onattribend(Ye.NoValue, this.sectionStart),
        (this.sectionStart = -1),
        (this.state = p.BeforeAttributeName),
        this.stateBeforeAttributeName(e))
      : ht(e) ||
        (this.cbs.onattribend(Ye.NoValue, this.sectionStart),
        (this.state = p.InAttributeName),
        (this.sectionStart = this.index));
  }
  stateBeforeAttributeValue(e) {
    e === C.DoubleQuote
      ? ((this.state = p.InAttributeValueDq),
        (this.sectionStart = this.index + 1))
      : e === C.SingleQuote
      ? ((this.state = p.InAttributeValueSq),
        (this.sectionStart = this.index + 1))
      : ht(e) ||
        ((this.sectionStart = this.index),
        (this.state = p.InAttributeValueNq),
        this.stateInAttributeValueNoQuotes(e));
  }
  handleInAttributeValue(e, u) {
    e === u || (!this.decodeEntities && this.fastForwardTo(u))
      ? (this.cbs.onattribdata(this.sectionStart, this.index),
        (this.sectionStart = -1),
        this.cbs.onattribend(
          u === C.DoubleQuote ? Ye.Double : Ye.Single,
          this.index + 1
        ),
        (this.state = p.BeforeAttributeName))
      : this.decodeEntities && e === C.Amp && this.startEntity();
  }
  stateInAttributeValueDoubleQuotes(e) {
    this.handleInAttributeValue(e, C.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(e) {
    this.handleInAttributeValue(e, C.SingleQuote);
  }
  stateInAttributeValueNoQuotes(e) {
    ht(e) || e === C.Gt
      ? (this.cbs.onattribdata(this.sectionStart, this.index),
        (this.sectionStart = -1),
        this.cbs.onattribend(Ye.Unquoted, this.index),
        (this.state = p.BeforeAttributeName),
        this.stateBeforeAttributeName(e))
      : this.decodeEntities && e === C.Amp && this.startEntity();
  }
  stateBeforeDeclaration(e) {
    e === C.OpeningSquareBracket
      ? ((this.state = p.CDATASequence), (this.sequenceIndex = 0))
      : (this.state = e === C.Dash ? p.BeforeComment : p.InDeclaration);
  }
  stateInDeclaration(e) {
    (e === C.Gt || this.fastForwardTo(C.Gt)) &&
      (this.cbs.ondeclaration(this.sectionStart, this.index),
      (this.state = p.Text),
      (this.sectionStart = this.index + 1));
  }
  stateInProcessingInstruction(e) {
    (e === C.Gt || this.fastForwardTo(C.Gt)) &&
      (this.cbs.onprocessinginstruction(this.sectionStart, this.index),
      (this.state = p.Text),
      (this.sectionStart = this.index + 1));
  }
  stateBeforeComment(e) {
    e === C.Dash
      ? ((this.state = p.InCommentLike),
        (this.currentSequence = ee.CommentEnd),
        (this.sequenceIndex = 2),
        (this.sectionStart = this.index + 1))
      : (this.state = p.InDeclaration);
  }
  stateInSpecialComment(e) {
    (e === C.Gt || this.fastForwardTo(C.Gt)) &&
      (this.cbs.oncomment(this.sectionStart, this.index, 0),
      (this.state = p.Text),
      (this.sectionStart = this.index + 1));
  }
  stateBeforeSpecialS(e) {
    const u = e | 32;
    u === ee.ScriptEnd[3]
      ? this.startSpecial(ee.ScriptEnd, 4)
      : u === ee.StyleEnd[3]
      ? this.startSpecial(ee.StyleEnd, 4)
      : ((this.state = p.InTagName), this.stateInTagName(e));
  }
  stateBeforeSpecialT(e) {
    switch (e | 32) {
      case ee.TitleEnd[3]: {
        this.startSpecial(ee.TitleEnd, 4);
        break;
      }
      case ee.TextareaEnd[3]: {
        this.startSpecial(ee.TextareaEnd, 4);
        break;
      }
      case ee.XmpEnd[3]: {
        this.startSpecial(ee.XmpEnd, 4);
        break;
      }
      default:
        (this.state = p.InTagName), this.stateInTagName(e);
    }
  }
  startEntity() {
    (this.baseState = this.state),
      (this.state = p.InEntity),
      (this.entityStart = this.index),
      this.entityDecoder.startEntity(
        this.xmlMode
          ? at.Strict
          : this.baseState === p.Text || this.baseState === p.InSpecialTag
          ? at.Legacy
          : at.Attribute
      );
  }
  stateInEntity() {
    const e = this.entityDecoder.write(this.buffer, this.index - this.offset);
    e >= 0
      ? ((this.state = this.baseState),
        e === 0 && (this.index = this.entityStart))
      : (this.index = this.offset + this.buffer.length - 1);
  }
  cleanup() {
    this.running &&
      this.sectionStart !== this.index &&
      (this.state === p.Text ||
      (this.state === p.InSpecialTag && this.sequenceIndex === 0)
        ? (this.cbs.ontext(this.sectionStart, this.index),
          (this.sectionStart = this.index))
        : (this.state === p.InAttributeValueDq ||
            this.state === p.InAttributeValueSq ||
            this.state === p.InAttributeValueNq) &&
          (this.cbs.onattribdata(this.sectionStart, this.index),
          (this.sectionStart = this.index)));
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  parse() {
    for (; this.shouldContinue(); ) {
      const e = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case p.Text: {
          this.stateText(e);
          break;
        }
        case p.SpecialStartSequence: {
          this.stateSpecialStartSequence(e);
          break;
        }
        case p.InSpecialTag: {
          this.stateInSpecialTag(e);
          break;
        }
        case p.CDATASequence: {
          this.stateCDATASequence(e);
          break;
        }
        case p.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(e);
          break;
        }
        case p.InAttributeName: {
          this.stateInAttributeName(e);
          break;
        }
        case p.InCommentLike: {
          this.stateInCommentLike(e);
          break;
        }
        case p.InSpecialComment: {
          this.stateInSpecialComment(e);
          break;
        }
        case p.BeforeAttributeName: {
          this.stateBeforeAttributeName(e);
          break;
        }
        case p.InTagName: {
          this.stateInTagName(e);
          break;
        }
        case p.InClosingTagName: {
          this.stateInClosingTagName(e);
          break;
        }
        case p.BeforeTagName: {
          this.stateBeforeTagName(e);
          break;
        }
        case p.AfterAttributeName: {
          this.stateAfterAttributeName(e);
          break;
        }
        case p.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(e);
          break;
        }
        case p.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(e);
          break;
        }
        case p.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(e);
          break;
        }
        case p.AfterClosingTagName: {
          this.stateAfterClosingTagName(e);
          break;
        }
        case p.BeforeSpecialS: {
          this.stateBeforeSpecialS(e);
          break;
        }
        case p.BeforeSpecialT: {
          this.stateBeforeSpecialT(e);
          break;
        }
        case p.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(e);
          break;
        }
        case p.InSelfClosingTag: {
          this.stateInSelfClosingTag(e);
          break;
        }
        case p.InDeclaration: {
          this.stateInDeclaration(e);
          break;
        }
        case p.BeforeDeclaration: {
          this.stateBeforeDeclaration(e);
          break;
        }
        case p.BeforeComment: {
          this.stateBeforeComment(e);
          break;
        }
        case p.InProcessingInstruction: {
          this.stateInProcessingInstruction(e);
          break;
        }
        case p.InEntity: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    this.state === p.InEntity &&
      (this.entityDecoder.end(), (this.state = this.baseState)),
      this.handleTrailingData(),
      this.cbs.onend();
  }
  handleTrailingData() {
    const e = this.buffer.length + this.offset;
    this.sectionStart >= e ||
      (this.state === p.InCommentLike
        ? this.currentSequence === ee.CdataEnd
          ? this.cbs.oncdata(this.sectionStart, e, 0)
          : this.cbs.oncomment(this.sectionStart, e, 0)
        : this.state === p.InTagName ||
          this.state === p.BeforeAttributeName ||
          this.state === p.BeforeAttributeValue ||
          this.state === p.AfterAttributeName ||
          this.state === p.InAttributeName ||
          this.state === p.InAttributeValueSq ||
          this.state === p.InAttributeValueDq ||
          this.state === p.InAttributeValueNq ||
          this.state === p.InClosingTagName ||
          this.cbs.ontext(this.sectionStart, e));
  }
  emitCodePoint(e, u) {
    this.baseState !== p.Text && this.baseState !== p.InSpecialTag
      ? (this.sectionStart < this.entityStart &&
          this.cbs.onattribdata(this.sectionStart, this.entityStart),
        (this.sectionStart = this.entityStart + u),
        (this.index = this.sectionStart - 1),
        this.cbs.onattribentity(e))
      : (this.sectionStart < this.entityStart &&
          this.cbs.ontext(this.sectionStart, this.entityStart),
        (this.sectionStart = this.entityStart + u),
        (this.index = this.sectionStart - 1),
        this.cbs.ontextentity(e, this.sectionStart));
  }
}
const Xt = new Set([
    'input',
    'option',
    'optgroup',
    'select',
    'button',
    'datalist',
    'textarea',
  ]),
  V = new Set(['p']),
  Wr = new Set(['thead', 'tbody']),
  Kr = new Set(['dd', 'dt']),
  Xr = new Set(['rt', 'rp']),
  ul = new Map([
    ['tr', new Set(['tr', 'th', 'td'])],
    ['th', new Set(['th'])],
    ['td', new Set(['thead', 'th', 'td'])],
    ['body', new Set(['head', 'link', 'script'])],
    ['li', new Set(['li'])],
    ['p', V],
    ['h1', V],
    ['h2', V],
    ['h3', V],
    ['h4', V],
    ['h5', V],
    ['h6', V],
    ['select', Xt],
    ['input', Xt],
    ['output', Xt],
    ['button', Xt],
    ['datalist', Xt],
    ['textarea', Xt],
    ['option', new Set(['option'])],
    ['optgroup', new Set(['optgroup', 'option'])],
    ['dd', Kr],
    ['dt', Kr],
    ['address', V],
    ['article', V],
    ['aside', V],
    ['blockquote', V],
    ['details', V],
    ['div', V],
    ['dl', V],
    ['fieldset', V],
    ['figcaption', V],
    ['figure', V],
    ['footer', V],
    ['form', V],
    ['header', V],
    ['hr', V],
    ['main', V],
    ['nav', V],
    ['ol', V],
    ['pre', V],
    ['section', V],
    ['table', V],
    ['ul', V],
    ['rt', Xr],
    ['rp', Xr],
    ['tbody', Wr],
    ['tfoot', Wr],
  ]),
  sl = new Set([
    'area',
    'base',
    'basefont',
    'br',
    'col',
    'command',
    'embed',
    'frame',
    'hr',
    'img',
    'input',
    'isindex',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
  ]),
  Jr = new Set(['math', 'svg']),
  Zr = new Set([
    'mi',
    'mo',
    'mn',
    'ms',
    'mtext',
    'annotation-xml',
    'foreignobject',
    'desc',
    'title',
  ]),
  nl = /\s|\//;
let ms = class {
  constructor(e, u = {}) {
    var s, n, r, i, a, o;
    (this.options = u),
      (this.startIndex = 0),
      (this.endIndex = 0),
      (this.openTagStart = 0),
      (this.tagname = ''),
      (this.attribname = ''),
      (this.attribvalue = ''),
      (this.attribs = null),
      (this.stack = []),
      (this.buffers = []),
      (this.bufferOffset = 0),
      (this.writeIndex = 0),
      (this.ended = !1),
      (this.cbs = e ?? {}),
      (this.htmlMode = !this.options.xmlMode),
      (this.lowerCaseTagNames =
        (s = u.lowerCaseTags) !== null && s !== void 0 ? s : this.htmlMode),
      (this.lowerCaseAttributeNames =
        (n = u.lowerCaseAttributeNames) !== null && n !== void 0
          ? n
          : this.htmlMode),
      (this.recognizeSelfClosing =
        (r = u.recognizeSelfClosing) !== null && r !== void 0
          ? r
          : !this.htmlMode),
      (this.tokenizer = new (
        (i = u.Tokenizer) !== null && i !== void 0 ? i : Ta
      )(this.options, this)),
      (this.foreignContext = [!this.htmlMode]),
      (o = (a = this.cbs).onparserinit) === null ||
        o === void 0 ||
        o.call(a, this);
  }
  ontext(e, u) {
    var s, n;
    const r = this.getSlice(e, u);
    (this.endIndex = u - 1),
      (n = (s = this.cbs).ontext) === null || n === void 0 || n.call(s, r),
      (this.startIndex = u);
  }
  ontextentity(e, u) {
    var s, n;
    (this.endIndex = u - 1),
      (n = (s = this.cbs).ontext) === null || n === void 0 || n.call(s, zr(e)),
      (this.startIndex = u);
  }
  isVoidElement(e) {
    return this.htmlMode && sl.has(e);
  }
  onopentagname(e, u) {
    this.endIndex = u;
    let s = this.getSlice(e, u);
    this.lowerCaseTagNames && (s = s.toLowerCase()), this.emitOpenTag(s);
  }
  emitOpenTag(e) {
    var u, s, n, r;
    (this.openTagStart = this.startIndex), (this.tagname = e);
    const i = this.htmlMode && ul.get(e);
    if (i)
      for (; this.stack.length > 0 && i.has(this.stack[0]); ) {
        const a = this.stack.shift();
        (s = (u = this.cbs).onclosetag) === null ||
          s === void 0 ||
          s.call(u, a, !0);
      }
    this.isVoidElement(e) ||
      (this.stack.unshift(e),
      this.htmlMode &&
        (Jr.has(e)
          ? this.foreignContext.unshift(!0)
          : Zr.has(e) && this.foreignContext.unshift(!1))),
      (r = (n = this.cbs).onopentagname) === null ||
        r === void 0 ||
        r.call(n, e),
      this.cbs.onopentag && (this.attribs = {});
  }
  endOpenTag(e) {
    var u, s;
    (this.startIndex = this.openTagStart),
      this.attribs &&
        ((s = (u = this.cbs).onopentag) === null ||
          s === void 0 ||
          s.call(u, this.tagname, this.attribs, e),
        (this.attribs = null)),
      this.cbs.onclosetag &&
        this.isVoidElement(this.tagname) &&
        this.cbs.onclosetag(this.tagname, !0),
      (this.tagname = '');
  }
  onopentagend(e) {
    (this.endIndex = e), this.endOpenTag(!1), (this.startIndex = e + 1);
  }
  onclosetag(e, u) {
    var s, n, r, i, a, o, c, l;
    this.endIndex = u;
    let f = this.getSlice(e, u);
    if (
      (this.lowerCaseTagNames && (f = f.toLowerCase()),
      this.htmlMode && (Jr.has(f) || Zr.has(f)) && this.foreignContext.shift(),
      this.isVoidElement(f))
    )
      this.htmlMode &&
        f === 'br' &&
        ((i = (r = this.cbs).onopentagname) === null ||
          i === void 0 ||
          i.call(r, 'br'),
        (o = (a = this.cbs).onopentag) === null ||
          o === void 0 ||
          o.call(a, 'br', {}, !0),
        (l = (c = this.cbs).onclosetag) === null ||
          l === void 0 ||
          l.call(c, 'br', !1));
    else {
      const b = this.stack.indexOf(f);
      if (b !== -1)
        for (let h = 0; h <= b; h++) {
          const S = this.stack.shift();
          (n = (s = this.cbs).onclosetag) === null ||
            n === void 0 ||
            n.call(s, S, h !== b);
        }
      else
        this.htmlMode &&
          f === 'p' &&
          (this.emitOpenTag('p'), this.closeCurrentTag(!0));
    }
    this.startIndex = u + 1;
  }
  onselfclosingtag(e) {
    (this.endIndex = e),
      this.recognizeSelfClosing || this.foreignContext[0]
        ? (this.closeCurrentTag(!1), (this.startIndex = e + 1))
        : this.onopentagend(e);
  }
  closeCurrentTag(e) {
    var u, s;
    const n = this.tagname;
    this.endOpenTag(e),
      this.stack[0] === n &&
        ((s = (u = this.cbs).onclosetag) === null ||
          s === void 0 ||
          s.call(u, n, !e),
        this.stack.shift());
  }
  onattribname(e, u) {
    this.startIndex = e;
    const s = this.getSlice(e, u);
    this.attribname = this.lowerCaseAttributeNames ? s.toLowerCase() : s;
  }
  onattribdata(e, u) {
    this.attribvalue += this.getSlice(e, u);
  }
  onattribentity(e) {
    this.attribvalue += zr(e);
  }
  onattribend(e, u) {
    var s, n;
    (this.endIndex = u),
      (n = (s = this.cbs).onattribute) === null ||
        n === void 0 ||
        n.call(
          s,
          this.attribname,
          this.attribvalue,
          e === Ye.Double
            ? '"'
            : e === Ye.Single
            ? "'"
            : e === Ye.NoValue
            ? void 0
            : null
        ),
      this.attribs &&
        !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) &&
        (this.attribs[this.attribname] = this.attribvalue),
      (this.attribvalue = '');
  }
  getInstructionName(e) {
    const u = e.search(nl);
    let s = u < 0 ? e : e.substr(0, u);
    return this.lowerCaseTagNames && (s = s.toLowerCase()), s;
  }
  ondeclaration(e, u) {
    this.endIndex = u;
    const s = this.getSlice(e, u);
    if (this.cbs.onprocessinginstruction) {
      const n = this.getInstructionName(s);
      this.cbs.onprocessinginstruction(`!${n}`, `!${s}`);
    }
    this.startIndex = u + 1;
  }
  onprocessinginstruction(e, u) {
    this.endIndex = u;
    const s = this.getSlice(e, u);
    if (this.cbs.onprocessinginstruction) {
      const n = this.getInstructionName(s);
      this.cbs.onprocessinginstruction(`?${n}`, `?${s}`);
    }
    this.startIndex = u + 1;
  }
  oncomment(e, u, s) {
    var n, r, i, a;
    (this.endIndex = u),
      (r = (n = this.cbs).oncomment) === null ||
        r === void 0 ||
        r.call(n, this.getSlice(e, u - s)),
      (a = (i = this.cbs).oncommentend) === null || a === void 0 || a.call(i),
      (this.startIndex = u + 1);
  }
  oncdata(e, u, s) {
    var n, r, i, a, o, c, l, f, b, h;
    this.endIndex = u;
    const S = this.getSlice(e, u - s);
    !this.htmlMode || this.options.recognizeCDATA
      ? ((r = (n = this.cbs).oncdatastart) === null ||
          r === void 0 ||
          r.call(n),
        (a = (i = this.cbs).ontext) === null || a === void 0 || a.call(i, S),
        (c = (o = this.cbs).oncdataend) === null || c === void 0 || c.call(o))
      : ((f = (l = this.cbs).oncomment) === null ||
          f === void 0 ||
          f.call(l, `[CDATA[${S}]]`),
        (h = (b = this.cbs).oncommentend) === null ||
          h === void 0 ||
          h.call(b)),
      (this.startIndex = u + 1);
  }
  onend() {
    var e, u;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let s = 0; s < this.stack.length; s++)
        this.cbs.onclosetag(this.stack[s], !0);
    }
    (u = (e = this.cbs).onend) === null || u === void 0 || u.call(e);
  }
  reset() {
    var e, u, s, n;
    (u = (e = this.cbs).onreset) === null || u === void 0 || u.call(e),
      this.tokenizer.reset(),
      (this.tagname = ''),
      (this.attribname = ''),
      (this.attribs = null),
      (this.stack.length = 0),
      (this.startIndex = 0),
      (this.endIndex = 0),
      (n = (s = this.cbs).onparserinit) === null ||
        n === void 0 ||
        n.call(s, this),
      (this.buffers.length = 0),
      (this.foreignContext.length = 0),
      this.foreignContext.unshift(!this.htmlMode),
      (this.bufferOffset = 0),
      (this.writeIndex = 0),
      (this.ended = !1);
  }
  parseComplete(e) {
    this.reset(), this.end(e);
  }
  getSlice(e, u) {
    for (; e - this.bufferOffset >= this.buffers[0].length; )
      this.shiftBuffer();
    let s = this.buffers[0].slice(e - this.bufferOffset, u - this.bufferOffset);
    for (; u - this.bufferOffset > this.buffers[0].length; )
      this.shiftBuffer(),
        (s += this.buffers[0].slice(0, u - this.bufferOffset));
    return s;
  }
  shiftBuffer() {
    (this.bufferOffset += this.buffers[0].length),
      this.writeIndex--,
      this.buffers.shift();
  }
  write(e) {
    var u, s;
    if (this.ended) {
      (s = (u = this.cbs).onerror) === null ||
        s === void 0 ||
        s.call(u, new Error('.write() after done!'));
      return;
    }
    this.buffers.push(e),
      this.tokenizer.running && (this.tokenizer.write(e), this.writeIndex++);
  }
  end(e) {
    var u, s;
    if (this.ended) {
      (s = (u = this.cbs).onerror) === null ||
        s === void 0 ||
        s.call(u, new Error('.end() after done!'));
      return;
    }
    e && this.write(e), (this.ended = !0), this.tokenizer.end();
  }
  pause() {
    this.tokenizer.pause();
  }
  resume() {
    for (
      this.tokenizer.resume();
      this.tokenizer.running && this.writeIndex < this.buffers.length;

    )
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    this.ended && this.tokenizer.end();
  }
  parseChunk(e) {
    this.write(e);
  }
  done(e) {
    this.end(e);
  }
};
var O;
(function (t) {
  (t.Root = 'root'),
    (t.Text = 'text'),
    (t.Directive = 'directive'),
    (t.Comment = 'comment'),
    (t.Script = 'script'),
    (t.Style = 'style'),
    (t.Tag = 'tag'),
    (t.CDATA = 'cdata'),
    (t.Doctype = 'doctype');
})(O || (O = {}));
function Ca(t) {
  return t.type === O.Tag || t.type === O.Script || t.type === O.Style;
}
const va = O.Root,
  Ea = O.Text,
  wa = O.Directive,
  Aa = O.Comment,
  _a = O.Script,
  Na = O.Style,
  Ra = O.Tag,
  Da = O.CDATA,
  La = O.Doctype,
  rl = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        CDATA: Da,
        Comment: Aa,
        Directive: wa,
        Doctype: La,
        get ElementType() {
          return O;
        },
        Root: va,
        Script: _a,
        Style: Na,
        Tag: Ra,
        Text: Ea,
        isTag: Ca,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  );
let Ia = class {
  constructor() {
    (this.parent = null),
      (this.prev = null),
      (this.next = null),
      (this.startIndex = null),
      (this.endIndex = null);
  }
  get parentNode() {
    return this.parent;
  }
  set parentNode(e) {
    this.parent = e;
  }
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(e) {
    this.prev = e;
  }
  get nextSibling() {
    return this.next;
  }
  set nextSibling(e) {
    this.next = e;
  }
  cloneNode(e = !1) {
    return Ba(this, e);
  }
};
class Gn extends Ia {
  constructor(e) {
    super(), (this.data = e);
  }
  get nodeValue() {
    return this.data;
  }
  set nodeValue(e) {
    this.data = e;
  }
}
let vn = class extends Gn {
    constructor() {
      super(...arguments), (this.type = O.Text);
    }
    get nodeType() {
      return 3;
    }
  },
  Ma = class extends Gn {
    constructor() {
      super(...arguments), (this.type = O.Comment);
    }
    get nodeType() {
      return 8;
    }
  };
class Oa extends Gn {
  constructor(e, u) {
    super(u), (this.name = e), (this.type = O.Directive);
  }
  get nodeType() {
    return 1;
  }
}
class jn extends Ia {
  constructor(e) {
    super(), (this.children = e);
  }
  get firstChild() {
    var e;
    return (e = this.children[0]) !== null && e !== void 0 ? e : null;
  }
  get lastChild() {
    return this.children.length > 0
      ? this.children[this.children.length - 1]
      : null;
  }
  get childNodes() {
    return this.children;
  }
  set childNodes(e) {
    this.children = e;
  }
}
class ka extends jn {
  constructor() {
    super(...arguments), (this.type = O.CDATA);
  }
  get nodeType() {
    return 4;
  }
}
let En = class extends jn {
    constructor() {
      super(...arguments), (this.type = O.Root);
    }
    get nodeType() {
      return 9;
    }
  },
  Pa = class extends jn {
    constructor(
      e,
      u,
      s = [],
      n = e === 'script' ? O.Script : e === 'style' ? O.Style : O.Tag
    ) {
      super(s), (this.name = e), (this.attribs = u), (this.type = n);
    }
    get nodeType() {
      return 1;
    }
    get tagName() {
      return this.name;
    }
    set tagName(e) {
      this.name = e;
    }
    get attributes() {
      return Object.keys(this.attribs).map((e) => {
        var u, s;
        return {
          name: e,
          value: this.attribs[e],
          namespace:
            (u = this['x-attribsNamespace']) === null || u === void 0
              ? void 0
              : u[e],
          prefix:
            (s = this['x-attribsPrefix']) === null || s === void 0
              ? void 0
              : s[e],
        };
      });
    }
  };
function qe(t) {
  return Ca(t);
}
function Ss(t) {
  return t.type === O.CDATA;
}
function Bt(t) {
  return t.type === O.Text;
}
function zn(t) {
  return t.type === O.Comment;
}
function il(t) {
  return t.type === O.Directive;
}
function qa(t) {
  return t.type === O.Root;
}
function tt(t) {
  return Object.prototype.hasOwnProperty.call(t, 'children');
}
function Ba(t, e = !1) {
  let u;
  if (Bt(t)) u = new vn(t.data);
  else if (zn(t)) u = new Ma(t.data);
  else if (qe(t)) {
    const s = e ? qs(t.children) : [],
      n = new Pa(t.name, { ...t.attribs }, s);
    s.forEach((r) => (r.parent = n)),
      t.namespace != null && (n.namespace = t.namespace),
      t['x-attribsNamespace'] &&
        (n['x-attribsNamespace'] = { ...t['x-attribsNamespace'] }),
      t['x-attribsPrefix'] &&
        (n['x-attribsPrefix'] = { ...t['x-attribsPrefix'] }),
      (u = n);
  } else if (Ss(t)) {
    const s = e ? qs(t.children) : [],
      n = new ka(s);
    s.forEach((r) => (r.parent = n)), (u = n);
  } else if (qa(t)) {
    const s = e ? qs(t.children) : [],
      n = new En(s);
    s.forEach((r) => (r.parent = n)),
      t['x-mode'] && (n['x-mode'] = t['x-mode']),
      (u = n);
  } else if (il(t)) {
    const s = new Oa(t.name, t.data);
    t['x-name'] != null &&
      ((s['x-name'] = t['x-name']),
      (s['x-publicId'] = t['x-publicId']),
      (s['x-systemId'] = t['x-systemId'])),
      (u = s);
  } else throw new Error(`Not implemented yet: ${t.type}`);
  return (
    (u.startIndex = t.startIndex),
    (u.endIndex = t.endIndex),
    t.sourceCodeLocation != null &&
      (u.sourceCodeLocation = t.sourceCodeLocation),
    u
  );
}
function qs(t) {
  const e = t.map((u) => Ba(u, !0));
  for (let u = 1; u < e.length; u++)
    (e[u].prev = e[u - 1]), (e[u - 1].next = e[u]);
  return e;
}
const Yr = { withStartIndices: !1, withEndIndices: !1, xmlMode: !1 };
class Eu {
  constructor(e, u, s) {
    (this.dom = []),
      (this.root = new En(this.dom)),
      (this.done = !1),
      (this.tagStack = [this.root]),
      (this.lastNode = null),
      (this.parser = null),
      typeof u == 'function' && ((s = u), (u = Yr)),
      typeof e == 'object' && ((u = e), (e = void 0)),
      (this.callback = e ?? null),
      (this.options = u ?? Yr),
      (this.elementCB = s ?? null);
  }
  onparserinit(e) {
    this.parser = e;
  }
  onreset() {
    (this.dom = []),
      (this.root = new En(this.dom)),
      (this.done = !1),
      (this.tagStack = [this.root]),
      (this.lastNode = null),
      (this.parser = null);
  }
  onend() {
    this.done ||
      ((this.done = !0), (this.parser = null), this.handleCallback(null));
  }
  onerror(e) {
    this.handleCallback(e);
  }
  onclosetag() {
    this.lastNode = null;
    const e = this.tagStack.pop();
    this.options.withEndIndices && (e.endIndex = this.parser.endIndex),
      this.elementCB && this.elementCB(e);
  }
  onopentag(e, u) {
    const s = this.options.xmlMode ? O.Tag : void 0,
      n = new Pa(e, u, void 0, s);
    this.addNode(n), this.tagStack.push(n);
  }
  ontext(e) {
    const { lastNode: u } = this;
    if (u && u.type === O.Text)
      (u.data += e),
        this.options.withEndIndices && (u.endIndex = this.parser.endIndex);
    else {
      const s = new vn(e);
      this.addNode(s), (this.lastNode = s);
    }
  }
  oncomment(e) {
    if (this.lastNode && this.lastNode.type === O.Comment) {
      this.lastNode.data += e;
      return;
    }
    const u = new Ma(e);
    this.addNode(u), (this.lastNode = u);
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const e = new vn(''),
      u = new ka([e]);
    this.addNode(u), (e.parent = u), (this.lastNode = e);
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(e, u) {
    const s = new Oa(e, u);
    this.addNode(s);
  }
  handleCallback(e) {
    if (typeof this.callback == 'function') this.callback(e, this.dom);
    else if (e) throw e;
  }
  addNode(e) {
    const u = this.tagStack[this.tagStack.length - 1],
      s = u.children[u.children.length - 1];
    this.options.withStartIndices && (e.startIndex = this.parser.startIndex),
      this.options.withEndIndices && (e.endIndex = this.parser.endIndex),
      u.children.push(e),
      s && ((e.prev = s), (s.next = e)),
      (e.parent = u),
      (this.lastNode = null);
  }
}
const Qr = /["&'<>$\x80-\uFFFF]/g,
  al = new Map([
    [34, '&quot;'],
    [38, '&amp;'],
    [39, '&apos;'],
    [60, '&lt;'],
    [62, '&gt;'],
  ]),
  ol =
    String.prototype.codePointAt != null
      ? (t, e) => t.codePointAt(e)
      : (t, e) =>
          (t.charCodeAt(e) & 64512) === 55296
            ? (t.charCodeAt(e) - 55296) * 1024 +
              t.charCodeAt(e + 1) -
              56320 +
              65536
            : t.charCodeAt(e);
function Fa(t) {
  let e = '',
    u = 0,
    s;
  for (; (s = Qr.exec(t)) !== null; ) {
    const n = s.index,
      r = t.charCodeAt(n),
      i = al.get(r);
    i !== void 0
      ? ((e += t.substring(u, n) + i), (u = n + 1))
      : ((e += `${t.substring(u, n)}&#x${ol(t, n).toString(16)};`),
        (u = Qr.lastIndex += +((r & 64512) === 55296)));
  }
  return e + t.substr(u);
}
function Va(t, e) {
  return function (s) {
    let n,
      r = 0,
      i = '';
    for (; (n = t.exec(s)); )
      r !== n.index && (i += s.substring(r, n.index)),
        (i += e.get(n[0].charCodeAt(0))),
        (r = n.index + 1);
    return i + s.substring(r);
  };
}
const cl = Va(
    /["&\u00A0]/g,
    new Map([
      [34, '&quot;'],
      [38, '&amp;'],
      [160, '&nbsp;'],
    ])
  ),
  ll = Va(
    /[&<>\u00A0]/g,
    new Map([
      [38, '&amp;'],
      [60, '&lt;'],
      [62, '&gt;'],
      [160, '&nbsp;'],
    ])
  ),
  dl = new Map(
    [
      'altGlyph',
      'altGlyphDef',
      'altGlyphItem',
      'animateColor',
      'animateMotion',
      'animateTransform',
      'clipPath',
      'feBlend',
      'feColorMatrix',
      'feComponentTransfer',
      'feComposite',
      'feConvolveMatrix',
      'feDiffuseLighting',
      'feDisplacementMap',
      'feDistantLight',
      'feDropShadow',
      'feFlood',
      'feFuncA',
      'feFuncB',
      'feFuncG',
      'feFuncR',
      'feGaussianBlur',
      'feImage',
      'feMerge',
      'feMergeNode',
      'feMorphology',
      'feOffset',
      'fePointLight',
      'feSpecularLighting',
      'feSpotLight',
      'feTile',
      'feTurbulence',
      'foreignObject',
      'glyphRef',
      'linearGradient',
      'radialGradient',
      'textPath',
    ].map((t) => [t.toLowerCase(), t])
  ),
  fl = new Map(
    [
      'definitionURL',
      'attributeName',
      'attributeType',
      'baseFrequency',
      'baseProfile',
      'calcMode',
      'clipPathUnits',
      'diffuseConstant',
      'edgeMode',
      'filterUnits',
      'glyphRef',
      'gradientTransform',
      'gradientUnits',
      'kernelMatrix',
      'kernelUnitLength',
      'keyPoints',
      'keySplines',
      'keyTimes',
      'lengthAdjust',
      'limitingConeAngle',
      'markerHeight',
      'markerUnits',
      'markerWidth',
      'maskContentUnits',
      'maskUnits',
      'numOctaves',
      'pathLength',
      'patternContentUnits',
      'patternTransform',
      'patternUnits',
      'pointsAtX',
      'pointsAtY',
      'pointsAtZ',
      'preserveAlpha',
      'preserveAspectRatio',
      'primitiveUnits',
      'refX',
      'refY',
      'repeatCount',
      'repeatDur',
      'requiredExtensions',
      'requiredFeatures',
      'specularConstant',
      'specularExponent',
      'spreadMethod',
      'startOffset',
      'stdDeviation',
      'stitchTiles',
      'surfaceScale',
      'systemLanguage',
      'tableValues',
      'targetX',
      'targetY',
      'textLength',
      'viewBox',
      'viewTarget',
      'xChannelSelector',
      'yChannelSelector',
      'zoomAndPan',
    ].map((t) => [t.toLowerCase(), t])
  ),
  hl = new Set([
    'style',
    'script',
    'xmp',
    'iframe',
    'noembed',
    'noframes',
    'plaintext',
    'noscript',
  ]);
function pl(t) {
  return t.replace(/"/g, '&quot;');
}
function bl(t, e) {
  var u;
  if (!t) return;
  const s =
    ((u = e.encodeEntities) !== null && u !== void 0 ? u : e.decodeEntities) ===
    !1
      ? pl
      : e.xmlMode || e.encodeEntities !== 'utf8'
      ? Fa
      : cl;
  return Object.keys(t)
    .map((n) => {
      var r, i;
      const a = (r = t[n]) !== null && r !== void 0 ? r : '';
      return (
        e.xmlMode === 'foreign' &&
          (n = (i = fl.get(n)) !== null && i !== void 0 ? i : n),
        !e.emptyAttrs && !e.xmlMode && a === '' ? n : `${n}="${s(a)}"`
      );
    })
    .join(' ');
}
const ei = new Set([
  'area',
  'base',
  'basefont',
  'br',
  'col',
  'command',
  'embed',
  'frame',
  'hr',
  'img',
  'input',
  'isindex',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);
function Wn(t, e = {}) {
  const u = 'length' in t ? t : [t];
  let s = '';
  for (let n = 0; n < u.length; n++) s += gl(u[n], e);
  return s;
}
function gl(t, e) {
  switch (t.type) {
    case va:
      return Wn(t.children, e);
    case La:
    case wa:
      return yl(t);
    case Aa:
      return vl(t);
    case Da:
      return Cl(t);
    case _a:
    case Na:
    case Ra:
      return xl(t, e);
    case Ea:
      return Tl(t, e);
  }
}
const ml = new Set([
    'mi',
    'mo',
    'mn',
    'ms',
    'mtext',
    'annotation-xml',
    'foreignObject',
    'desc',
    'title',
  ]),
  Sl = new Set(['svg', 'math']);
function xl(t, e) {
  var u;
  e.xmlMode === 'foreign' &&
    ((t.name = (u = dl.get(t.name)) !== null && u !== void 0 ? u : t.name),
    t.parent && ml.has(t.parent.name) && (e = { ...e, xmlMode: !1 })),
    !e.xmlMode && Sl.has(t.name) && (e = { ...e, xmlMode: 'foreign' });
  let s = `<${t.name}`;
  const n = bl(t.attribs, e);
  return (
    n && (s += ` ${n}`),
    t.children.length === 0 &&
    (e.xmlMode ? e.selfClosingTags !== !1 : e.selfClosingTags && ei.has(t.name))
      ? (e.xmlMode || (s += ' '), (s += '/>'))
      : ((s += '>'),
        t.children.length > 0 && (s += Wn(t.children, e)),
        (e.xmlMode || !ei.has(t.name)) && (s += `</${t.name}>`)),
    s
  );
}
function yl(t) {
  return `<${t.data}>`;
}
function Tl(t, e) {
  var u;
  let s = t.data || '';
  return (
    ((u = e.encodeEntities) !== null && u !== void 0 ? u : e.decodeEntities) !==
      !1 &&
      !(!e.xmlMode && t.parent && hl.has(t.parent.name)) &&
      (s = e.xmlMode || e.encodeEntities !== 'utf8' ? Fa(s) : ll(s)),
    s
  );
}
function Cl(t) {
  return `<![CDATA[${t.children[0].data}]]>`;
}
function vl(t) {
  return `<!--${t.data}-->`;
}
function Ua(t, e) {
  return Wn(t, e);
}
function El(t, e) {
  return tt(t) ? t.children.map((u) => Ua(u, e)).join('') : '';
}
function ts(t) {
  return Array.isArray(t)
    ? t.map(ts).join('')
    : qe(t)
    ? t.name === 'br'
      ? `
`
      : ts(t.children)
    : Ss(t)
    ? ts(t.children)
    : Bt(t)
    ? t.data
    : '';
}
function as(t) {
  return Array.isArray(t)
    ? t.map(as).join('')
    : tt(t) && !zn(t)
    ? as(t.children)
    : Bt(t)
    ? t.data
    : '';
}
function wn(t) {
  return Array.isArray(t)
    ? t.map(wn).join('')
    : tt(t) && (t.type === O.Tag || Ss(t))
    ? wn(t.children)
    : Bt(t)
    ? t.data
    : '';
}
function $a(t) {
  return tt(t) ? t.children : [];
}
function Ha(t) {
  return t.parent || null;
}
function wl(t) {
  const e = Ha(t);
  if (e != null) return $a(e);
  const u = [t];
  let { prev: s, next: n } = t;
  for (; s != null; ) u.unshift(s), ({ prev: s } = s);
  for (; n != null; ) u.push(n), ({ next: n } = n);
  return u;
}
function Al(t, e) {
  var u;
  return (u = t.attribs) === null || u === void 0 ? void 0 : u[e];
}
function _l(t, e) {
  return (
    t.attribs != null &&
    Object.prototype.hasOwnProperty.call(t.attribs, e) &&
    t.attribs[e] != null
  );
}
function Nl(t) {
  return t.name;
}
function Rl(t) {
  let { next: e } = t;
  for (; e !== null && !qe(e); ) ({ next: e } = e);
  return e;
}
function Dl(t) {
  let { prev: e } = t;
  for (; e !== null && !qe(e); ) ({ prev: e } = e);
  return e;
}
function Nu(t) {
  if (
    (t.prev && (t.prev.next = t.next),
    t.next && (t.next.prev = t.prev),
    t.parent)
  ) {
    const e = t.parent.children,
      u = e.lastIndexOf(t);
    u >= 0 && e.splice(u, 1);
  }
  (t.next = null), (t.prev = null), (t.parent = null);
}
function Ll(t, e) {
  const u = (e.prev = t.prev);
  u && (u.next = e);
  const s = (e.next = t.next);
  s && (s.prev = e);
  const n = (e.parent = t.parent);
  if (n) {
    const r = n.children;
    (r[r.lastIndexOf(t)] = e), (t.parent = null);
  }
}
function Il(t, e) {
  if ((Nu(e), (e.next = null), (e.parent = t), t.children.push(e) > 1)) {
    const u = t.children[t.children.length - 2];
    (u.next = e), (e.prev = u);
  } else e.prev = null;
}
function Ml(t, e) {
  Nu(e);
  const { parent: u } = t,
    s = t.next;
  if (((e.next = s), (e.prev = t), (t.next = e), (e.parent = u), s)) {
    if (((s.prev = e), u)) {
      const n = u.children;
      n.splice(n.lastIndexOf(s), 0, e);
    }
  } else u && u.children.push(e);
}
function Ol(t, e) {
  if ((Nu(e), (e.parent = t), (e.prev = null), t.children.unshift(e) !== 1)) {
    const u = t.children[1];
    (u.prev = e), (e.next = u);
  } else e.next = null;
}
function kl(t, e) {
  Nu(e);
  const { parent: u } = t;
  if (u) {
    const s = u.children;
    s.splice(s.indexOf(t), 0, e);
  }
  t.prev && (t.prev.next = e),
    (e.parent = u),
    (e.prev = t.prev),
    (e.next = t),
    (t.prev = e);
}
function Ru(t, e, u = !0, s = 1 / 0) {
  return Ga(t, Array.isArray(e) ? e : [e], u, s);
}
function Ga(t, e, u, s) {
  const n = [],
    r = [Array.isArray(e) ? e : [e]],
    i = [0];
  for (;;) {
    if (i[0] >= r[0].length) {
      if (i.length === 1) return n;
      r.shift(), i.shift();
      continue;
    }
    const a = r[0][i[0]++];
    if (t(a) && (n.push(a), --s <= 0)) return n;
    u &&
      tt(a) &&
      a.children.length > 0 &&
      (i.unshift(0), r.unshift(a.children));
  }
}
function Pl(t, e) {
  return e.find(t);
}
function Kn(t, e, u = !0) {
  const s = Array.isArray(e) ? e : [e];
  for (let n = 0; n < s.length; n++) {
    const r = s[n];
    if (qe(r) && t(r)) return r;
    if (u && tt(r) && r.children.length > 0) {
      const i = Kn(t, r.children, !0);
      if (i) return i;
    }
  }
  return null;
}
function ja(t, e) {
  return (Array.isArray(e) ? e : [e]).some(
    (u) => (qe(u) && t(u)) || (tt(u) && ja(t, u.children))
  );
}
function ql(t, e) {
  const u = [],
    s = [Array.isArray(e) ? e : [e]],
    n = [0];
  for (;;) {
    if (n[0] >= s[0].length) {
      if (s.length === 1) return u;
      s.shift(), n.shift();
      continue;
    }
    const r = s[0][n[0]++];
    qe(r) && t(r) && u.push(r),
      tt(r) && r.children.length > 0 && (n.unshift(0), s.unshift(r.children));
  }
}
const os = {
  tag_name(t) {
    return typeof t == 'function'
      ? (e) => qe(e) && t(e.name)
      : t === '*'
      ? qe
      : (e) => qe(e) && e.name === t;
  },
  tag_type(t) {
    return typeof t == 'function' ? (e) => t(e.type) : (e) => e.type === t;
  },
  tag_contains(t) {
    return typeof t == 'function'
      ? (e) => Bt(e) && t(e.data)
      : (e) => Bt(e) && e.data === t;
  },
};
function Xn(t, e) {
  return typeof e == 'function'
    ? (u) => qe(u) && e(u.attribs[t])
    : (u) => qe(u) && u.attribs[t] === e;
}
function Bl(t, e) {
  return (u) => t(u) || e(u);
}
function za(t) {
  const e = Object.keys(t).map((u) => {
    const s = t[u];
    return Object.prototype.hasOwnProperty.call(os, u) ? os[u](s) : Xn(u, s);
  });
  return e.length === 0 ? null : e.reduce(Bl);
}
function Fl(t, e) {
  const u = za(t);
  return u ? u(e) : !0;
}
function Vl(t, e, u, s = 1 / 0) {
  const n = za(t);
  return n ? Ru(n, e, u, s) : [];
}
function Ul(t, e, u = !0) {
  return Array.isArray(e) || (e = [e]), Kn(Xn('id', t), e, u);
}
function cu(t, e, u = !0, s = 1 / 0) {
  return Ru(os.tag_name(t), e, u, s);
}
function $l(t, e, u = !0, s = 1 / 0) {
  return Ru(Xn('class', t), e, u, s);
}
function Hl(t, e, u = !0, s = 1 / 0) {
  return Ru(os.tag_type(t), e, u, s);
}
function Gl(t) {
  let e = t.length;
  for (; --e >= 0; ) {
    const u = t[e];
    if (e > 0 && t.lastIndexOf(u, e - 1) >= 0) {
      t.splice(e, 1);
      continue;
    }
    for (let s = u.parent; s; s = s.parent)
      if (t.includes(s)) {
        t.splice(e, 1);
        break;
      }
  }
  return t;
}
var je;
(function (t) {
  (t[(t.DISCONNECTED = 1)] = 'DISCONNECTED'),
    (t[(t.PRECEDING = 2)] = 'PRECEDING'),
    (t[(t.FOLLOWING = 4)] = 'FOLLOWING'),
    (t[(t.CONTAINS = 8)] = 'CONTAINS'),
    (t[(t.CONTAINED_BY = 16)] = 'CONTAINED_BY');
})(je || (je = {}));
function Wa(t, e) {
  const u = [],
    s = [];
  if (t === e) return 0;
  let n = tt(t) ? t : t.parent;
  for (; n; ) u.unshift(n), (n = n.parent);
  for (n = tt(e) ? e : e.parent; n; ) s.unshift(n), (n = n.parent);
  const r = Math.min(u.length, s.length);
  let i = 0;
  for (; i < r && u[i] === s[i]; ) i++;
  if (i === 0) return je.DISCONNECTED;
  const a = u[i - 1],
    o = a.children,
    c = u[i],
    l = s[i];
  return o.indexOf(c) > o.indexOf(l)
    ? a === e
      ? je.FOLLOWING | je.CONTAINED_BY
      : je.FOLLOWING
    : a === t
    ? je.PRECEDING | je.CONTAINS
    : je.PRECEDING;
}
function jl(t) {
  return (
    (t = t.filter((e, u, s) => !s.includes(e, u + 1))),
    t.sort((e, u) => {
      const s = Wa(e, u);
      return s & je.PRECEDING ? -1 : s & je.FOLLOWING ? 1 : 0;
    }),
    t
  );
}
function Jn(t) {
  const e = cs(Jl, t);
  return e ? (e.name === 'feed' ? zl(e) : Wl(e)) : null;
}
function zl(t) {
  var e;
  const u = t.children,
    s = {
      type: 'atom',
      items: cu('entry', u).map((i) => {
        var a;
        const { children: o } = i,
          c = { media: Ka(o) };
        Me(c, 'id', 'id', o), Me(c, 'title', 'title', o);
        const l =
          (a = cs('link', o)) === null || a === void 0
            ? void 0
            : a.attribs.href;
        l && (c.link = l);
        const f = vt('summary', o) || vt('content', o);
        f && (c.description = f);
        const b = vt('updated', o);
        return b && (c.pubDate = new Date(b)), c;
      }),
    };
  Me(s, 'id', 'id', u), Me(s, 'title', 'title', u);
  const n =
    (e = cs('link', u)) === null || e === void 0 ? void 0 : e.attribs.href;
  n && (s.link = n), Me(s, 'description', 'subtitle', u);
  const r = vt('updated', u);
  return r && (s.updated = new Date(r)), Me(s, 'author', 'email', u, !0), s;
}
function Wl(t) {
  var e, u;
  const s =
      (u =
        (e = cs('channel', t.children)) === null || e === void 0
          ? void 0
          : e.children) !== null && u !== void 0
        ? u
        : [],
    n = {
      type: t.name.substr(0, 3),
      id: '',
      items: cu('item', t.children).map((i) => {
        const { children: a } = i,
          o = { media: Ka(a) };
        Me(o, 'id', 'guid', a),
          Me(o, 'title', 'title', a),
          Me(o, 'link', 'link', a),
          Me(o, 'description', 'description', a);
        const c = vt('pubDate', a) || vt('dc:date', a);
        return c && (o.pubDate = new Date(c)), o;
      }),
    };
  Me(n, 'title', 'title', s),
    Me(n, 'link', 'link', s),
    Me(n, 'description', 'description', s);
  const r = vt('lastBuildDate', s);
  return (
    r && (n.updated = new Date(r)), Me(n, 'author', 'managingEditor', s, !0), n
  );
}
const Kl = ['url', 'type', 'lang'],
  Xl = [
    'fileSize',
    'bitrate',
    'framerate',
    'samplingrate',
    'channels',
    'duration',
    'height',
    'width',
  ];
function Ka(t) {
  return cu('media:content', t).map((e) => {
    const { attribs: u } = e,
      s = { medium: u.medium, isDefault: !!u.isDefault };
    for (const n of Kl) u[n] && (s[n] = u[n]);
    for (const n of Xl) u[n] && (s[n] = parseInt(u[n], 10));
    return u.expression && (s.expression = u.expression), s;
  });
}
function cs(t, e) {
  return cu(t, e, !0, 1)[0];
}
function vt(t, e, u = !1) {
  return as(cu(t, e, u, 1)).trim();
}
function Me(t, e, u, s, n = !1) {
  const r = vt(u, s, n);
  r && (t[e] = r);
}
function Jl(t) {
  return t === 'rss' || t === 'feed' || t === 'rdf:RDF';
}
const Zn = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      get DocumentPosition() {
        return je;
      },
      append: Ml,
      appendChild: Il,
      compareDocumentPosition: Wa,
      existsOne: ja,
      filter: Ru,
      find: Ga,
      findAll: ql,
      findOne: Kn,
      findOneChild: Pl,
      getAttributeValue: Al,
      getChildren: $a,
      getElementById: Ul,
      getElements: Vl,
      getElementsByClassName: $l,
      getElementsByTagName: cu,
      getElementsByTagType: Hl,
      getFeed: Jn,
      getInnerHTML: El,
      getName: Nl,
      getOuterHTML: Ua,
      getParent: Ha,
      getSiblings: wl,
      getText: ts,
      hasAttrib: _l,
      hasChildren: tt,
      innerText: wn,
      isCDATA: Ss,
      isComment: zn,
      isDocument: qa,
      isTag: qe,
      isText: Bt,
      nextElementSibling: Rl,
      prepend: kl,
      prependChild: Ol,
      prevElementSibling: Dl,
      removeElement: Nu,
      removeSubsets: Gl,
      replaceElement: Ll,
      testElement: Fl,
      textContent: as,
      uniqueSort: jl,
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
function Xa(t, e) {
  const u = new Eu(void 0, e);
  return new ms(u, e).end(t), u.root;
}
function Ja(t, e) {
  return Xa(t, e).children;
}
function Zl(t, e, u) {
  const s = new Eu((n) => t(n, s.root), e, u);
  return new ms(s, e);
}
function Yl(t, e, u) {
  const s = new Eu(t, e, u);
  return new ms(s, e);
}
const Ql = { xmlMode: !0 };
function ed(t, e = Ql) {
  return Jn(Ja(t, e));
}
const td = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        DefaultHandler: Eu,
        DomHandler: Eu,
        DomUtils: Zn,
        ElementType: rl,
        Parser: ms,
        get QuoteType() {
          return Ye;
        },
        Tokenizer: Ta,
        createDocumentStream: Zl,
        createDomStream: Yl,
        getFeed: Jn,
        parseDOM: Ja,
        parseDocument: Xa,
        parseFeed: ed,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  At = -1,
  M = 1,
  be = 2,
  Te = 3,
  ct = 4,
  bt = 8,
  Ot = 9,
  au = 10,
  pt = 11,
  ud = new Set([
    'ARTICLE',
    'ASIDE',
    'BLOCKQUOTE',
    'BODY',
    'BR',
    'BUTTON',
    'CANVAS',
    'CAPTION',
    'COL',
    'COLGROUP',
    'DD',
    'DIV',
    'DL',
    'DT',
    'EMBED',
    'FIELDSET',
    'FIGCAPTION',
    'FIGURE',
    'FOOTER',
    'FORM',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'LI',
    'UL',
    'OL',
    'P',
  ]),
  sd = -1,
  nd = 1,
  rd = 4,
  id = 8,
  ad = 128,
  od = 1,
  ti = 2,
  ui = 4,
  cd = 8,
  ld = 16,
  dd = 32,
  ls = 'http://www.w3.org/2000/svg',
  {
    assign: fd,
    create: hd,
    defineProperties: pd,
    entries: bd,
    keys: gd,
    setPrototypeOf: Ae,
  } = Object,
  kt = String,
  Oe = (t) => (t.nodeType === M ? t[T] : t),
  _t = ({ ownerDocument: t }) => t[ou].ignoreCase,
  et = (t, e) => {
    (t[m] = e), (e[de] = t);
  },
  Za = (t, e, u) => {
    et(t, e), et(Oe(e), u);
  },
  Ya = (t, e, u, s) => {
    et(t, e), et(Oe(u), s);
  },
  xs = (t, e, u) => {
    et(t, e), et(e, u);
  },
  An = ({ localName: t, ownerDocument: e }) =>
    e[ou].ignoreCase ? t.toUpperCase() : t,
  Qa = (t, e) => {
    t && (t[m] = e), e && (e[de] = t);
  },
  eo = (t, e) => {
    const u = t.createDocumentFragment(),
      s = t.createElement('');
    s.innerHTML = e;
    const { firstChild: n, lastChild: r } = s;
    if (n) {
      Ya(u, n, r, u[T]);
      let i = n;
      do i.parentNode = u;
      while (i !== r && (i = Oe(i)[m]));
    }
    return u;
  },
  Et = new WeakMap();
let ys = !1;
const tu = new WeakMap(),
  Ft = new WeakMap(),
  Ts = (t, e, u, s) => {
    ys &&
      Ft.has(t) &&
      t.attributeChangedCallback &&
      t.constructor.observedAttributes.includes(e) &&
      t.attributeChangedCallback(e, u, s);
  },
  to = (t, e) => (u) => {
    if (Ft.has(u)) {
      const s = Ft.get(u);
      s.connected !== e &&
        u.isConnected === e &&
        ((s.connected = e), t in u && u[t]());
    }
  },
  si = to('connectedCallback', !0),
  _n = (t) => {
    if (ys) {
      si(t), Et.has(t) && (t = Et.get(t).shadowRoot);
      let { [m]: e, [T]: u } = t;
      for (; e !== u; ) e.nodeType === M && si(e), (e = e[m]);
    }
  },
  ni = to('disconnectedCallback', !1),
  md = (t) => {
    if (ys) {
      ni(t), Et.has(t) && (t = Et.get(t).shadowRoot);
      let { [m]: e, [T]: u } = t;
      for (; e !== u; ) e.nodeType === M && ni(e), (e = e[m]);
    }
  };
class Sd {
  constructor(e) {
    (this.ownerDocument = e),
      (this.registry = new Map()),
      (this.waiting = new Map()),
      (this.active = !1);
  }
  define(e, u, s = {}) {
    const { ownerDocument: n, registry: r, waiting: i } = this;
    if (r.has(e)) throw new Error('unable to redefine ' + e);
    if (tu.has(u)) throw new Error('unable to redefine the same class: ' + u);
    this.active = ys = !0;
    const { extends: a } = s;
    tu.set(u, {
      ownerDocument: n,
      options: { is: a ? e : '' },
      localName: a || e,
    });
    const o = a
      ? (c) => c.localName === a && c.getAttribute('is') === e
      : (c) => c.localName === e;
    if ((r.set(e, { Class: u, check: o }), i.has(e))) {
      for (const c of i.get(e)) c(u);
      i.delete(e);
    }
    n.querySelectorAll(a ? `${a}[is="${e}"]` : e).forEach(this.upgrade, this);
  }
  upgrade(e) {
    if (Ft.has(e)) return;
    const { ownerDocument: u, registry: s } = this,
      n = e.getAttribute('is') || e.localName;
    if (s.has(n)) {
      const { Class: r, check: i } = s.get(n);
      if (i(e)) {
        const { attributes: a, isConnected: o } = e;
        for (const l of a) e.removeAttributeNode(l);
        const c = bd(e);
        for (const [l] of c) delete e[l];
        Ae(e, r.prototype),
          (u[yu] = { element: e, values: c }),
          new r(u, n),
          Ft.set(e, { connected: o });
        for (const l of a) e.setAttributeNode(l);
        o && e.connectedCallback && e.connectedCallback();
      }
    }
  }
  whenDefined(e) {
    const { registry: u, waiting: s } = this;
    return new Promise((n) => {
      u.has(e)
        ? n(u.get(e).Class)
        : (s.has(e) || s.set(e, []), s.get(e).push(n));
    });
  }
  get(e) {
    const u = this.registry.get(e);
    return u && u.Class;
  }
  getName(e) {
    if (tu.has(e)) {
      const { localName: u } = tu.get(e);
      return u;
    }
    return null;
  }
}
const { Parser: xd } = td,
  Lt = (t, e, u) => {
    const s = t[T];
    return (
      (e.parentNode = t), Za(s[de], e, s), u && e.nodeType === M && _n(e), e
    );
  },
  yd = (t, e, u, s, n) => {
    (u[U] = s),
      (u.ownerElement = t),
      xs(e[de], u, e),
      u.name === 'class' && (t.className = s),
      n && Ts(t, u.name, null, s);
  },
  uo = (t, e, u) => {
    const { active: s, registry: n } = t[Je];
    let r = t,
      i = null,
      a = !1;
    const o = new xd(
      {
        onprocessinginstruction(c, l) {
          c.toLowerCase() === '!doctype' &&
            (t.doctype = l.slice(c.length).trim());
        },
        onopentag(c, l) {
          let f = !0;
          if (e) {
            if (i)
              (r = Lt(r, t.createElementNS(ls, c), s)),
                (r.ownerSVGElement = i),
                (f = !1);
            else if (c === 'svg' || c === 'SVG')
              (i = t.createElementNS(ls, c)), (r = Lt(r, i, s)), (f = !1);
            else if (s) {
              const h = c.includes('-') ? c : l.is || '';
              if (h && n.has(h)) {
                const { Class: S } = n.get(h);
                (r = Lt(r, new S(), s)), delete l.is, (f = !1);
              }
            }
          }
          f && (r = Lt(r, t.createElement(c), !1));
          let b = r[T];
          for (const h of gd(l)) yd(r, b, t.createAttribute(h), l[h], s);
        },
        oncomment(c) {
          Lt(r, t.createComment(c), s);
        },
        ontext(c) {
          a ? Lt(r, t.createCDATASection(c), s) : Lt(r, t.createTextNode(c), s);
        },
        oncdatastart() {
          a = !0;
        },
        oncdataend() {
          a = !1;
        },
        onclosetag() {
          e && r === i && (i = null), (r = r.parentNode);
        },
      },
      { lowerCaseAttributeNames: !1, decodeEntities: !0, xmlMode: !e }
    );
    return o.write(u), o.end(), t;
  },
  ds = new Map(),
  ae = (t, e) => {
    for (const u of [].concat(t)) ds.set(u, e), ds.set(u.toUpperCase(), e);
  };
function so(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default')
    ? t.default
    : t;
}
function Td(t) {
  if (Object.prototype.hasOwnProperty.call(t, '__esModule')) return t;
  var e = t.default;
  if (typeof e == 'function') {
    var u = function s() {
      var n = !1;
      try {
        n = this instanceof s;
      } catch {}
      return n
        ? Reflect.construct(e, arguments, this.constructor)
        : e.apply(this, arguments);
    };
    u.prototype = e.prototype;
  } else u = {};
  return (
    Object.defineProperty(u, '__esModule', { value: !0 }),
    Object.keys(t).forEach(function (s) {
      var n = Object.getOwnPropertyDescriptor(t, s);
      Object.defineProperty(
        u,
        s,
        n.get
          ? n
          : {
              enumerable: !0,
              get: function () {
                return t[s];
              },
            }
      );
    }),
    u
  );
}
var Gu = {};
const Cd = {},
  vd = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Cd },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Ed = Td(vd);
var ri;
function wd() {
  if (ri) return Gu;
  ri = 1;
  try {
    const { performance: t } = Ed;
    Gu.performance = t;
  } catch {
    Gu.performance = {
      now() {
        return +new Date();
      },
    };
  }
  return Gu;
}
var Ad = wd();
const no = ({ [m]: t, [T]: e }, u) => {
    for (; t !== e; ) {
      switch (t.nodeType) {
        case be:
          ro(t, u);
          break;
        case Te:
        case bt:
        case ct:
          io(t, u);
          break;
        case M:
          oo(t, u), (t = Oe(t));
          break;
        case au:
          ao(t, u);
          break;
      }
      t = t[m];
    }
    const s = u.length - 1,
      n = u[s];
    typeof n == 'number' && n < 0 ? (u[s] += At) : u.push(At);
  },
  ro = (t, e) => {
    e.push(be, t.name);
    const u = t[U].trim();
    u && e.push(u);
  },
  io = (t, e) => {
    const u = t[U];
    u.trim() && e.push(t.nodeType, u);
  },
  _d = (t, e) => {
    e.push(t.nodeType), no(t, e);
  },
  ao = ({ name: t, publicId: e, systemId: u }, s) => {
    s.push(au, t), e && s.push(e), u && s.push(u);
  },
  oo = (t, e) => {
    e.push(M, t.localName), no(t, e);
  },
  co = (t, e, u, s, n, r, i) => ({
    type: t,
    target: e,
    addedNodes: s,
    removedNodes: n,
    attributeName: r,
    oldValue: i,
    previousSibling: u?.previousSibling || null,
    nextSibling: u?.nextSibling || null,
  }),
  ii = (t, e, u, s, n, r) => {
    if (!s || s.includes(u)) {
      const { callback: i, records: a, scheduled: o } = t;
      a.push(co('attributes', e, null, [], [], u, n ? r : void 0)),
        o ||
          ((t.scheduled = !0),
          Promise.resolve().then(() => {
            (t.scheduled = !1), i(a.splice(0), t);
          }));
    }
  },
  Yn = (t, e, u) => {
    const { ownerDocument: s } = t,
      { active: n, observers: r } = s[Tt];
    if (n) {
      for (const i of r)
        for (const [
          a,
          {
            childList: o,
            subtree: c,
            attributes: l,
            attributeFilter: f,
            attributeOldValue: b,
          },
        ] of i.nodes)
          if (o) {
            if (
              (c && (a === s || a.contains(t))) ||
              (!c && a.children.includes(t))
            ) {
              ii(i, t, e, f, b, u);
              break;
            }
          } else if (l && a === t) {
            ii(i, t, e, f, b, u);
            break;
          }
    }
  },
  Tu = (t, e) => {
    const { ownerDocument: u } = t,
      { active: s, observers: n } = u[Tt];
    if (s) {
      for (const r of n)
        for (const [
          i,
          { subtree: a, childList: o, characterData: c },
        ] of r.nodes)
          if (
            o &&
            ((e && (i === e || (a && i.contains(e)))) ||
              (!e &&
                ((a && (i === u || i.contains(t))) ||
                  (!a && i[c ? 'childNodes' : 'children'].includes(t)))))
          ) {
            const { callback: l, records: f, scheduled: b } = r;
            f.push(co('childList', i, t, e ? [] : [t], e ? [t] : [])),
              b ||
                ((r.scheduled = !0),
                Promise.resolve().then(() => {
                  (r.scheduled = !1), l(f.splice(0), r);
                }));
            break;
          }
    }
  };
class Nd {
  constructor(e) {
    const u = new Set();
    (this.observers = u),
      (this.active = !1),
      (this.class = class {
        constructor(n) {
          (this.callback = n),
            (this.nodes = new Map()),
            (this.records = []),
            (this.scheduled = !1);
        }
        disconnect() {
          this.records.splice(0),
            this.nodes.clear(),
            u.delete(this),
            (e[Tt].active = !!u.size);
        }
        observe(
          n,
          r = {
            subtree: !1,
            childList: !1,
            attributes: !1,
            attributeFilter: null,
            attributeOldValue: !1,
            characterData: !1,
          }
        ) {
          ('attributeOldValue' in r || 'attributeFilter' in r) &&
            (r.attributes = !0),
            (r.childList = !!r.childList),
            (r.subtree = !!r.subtree),
            this.nodes.set(n, r),
            u.add(this),
            (e[Tt].active = !0);
        }
        takeRecords() {
          return this.records.splice(0);
        }
      });
  }
}
const Rd = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'class',
    'contenteditable',
    'controls',
    'default',
    'defer',
    'disabled',
    'draggable',
    'formnovalidate',
    'hidden',
    'id',
    'ismap',
    'itemscope',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected',
    'style',
    'truespeed',
  ]),
  Nn = (t, e) => {
    const { [U]: u, name: s } = e;
    (e.ownerElement = t),
      xs(t, e, t[m]),
      s === 'class' && (t.className = u),
      Yn(t, s, null),
      Ts(t, s, null, u);
  },
  ai = (t, e) => {
    const { [U]: u, name: s } = e;
    et(e[de], e[m]),
      (e.ownerElement = e[de] = e[m] = null),
      s === 'class' && (t[Qt] = null),
      Yn(t, s, u),
      Ts(t, s, u, null);
  },
  P = {
    get(t, e) {
      return t.hasAttribute(e);
    },
    set(t, e, u) {
      u ? t.setAttribute(e, '') : t.removeAttribute(e);
    },
  },
  wt = {
    get(t, e) {
      return parseFloat(t.getAttribute(e) || 0);
    },
    set(t, e, u) {
      t.setAttribute(e, u);
    },
  },
  g = {
    get(t, e) {
      return t.getAttribute(e) || '';
    },
    set(t, e, u) {
      t.setAttribute(e, u);
    },
  },
  us = new WeakMap();
function Dd(t, e) {
  return (
    typeof e == 'function' ? e.call(t.target, t) : e.handleEvent(t),
    t._stopImmediatePropagationFlag
  );
}
function Ld({ currentTarget: t, target: e }) {
  const u = us.get(t);
  if (u && u.has(this.type)) {
    const s = u.get(this.type);
    t === e
      ? (this.eventPhase = this.AT_TARGET)
      : (this.eventPhase = this.BUBBLING_PHASE),
      (this.currentTarget = t),
      (this.target = e);
    for (const [n, r] of s)
      if ((r && r.once && s.delete(n), Dd(this, n))) break;
    return delete this.currentTarget, delete this.target, this.cancelBubble;
  }
}
class Qn {
  constructor() {
    us.set(this, new Map());
  }
  _getParent() {
    return null;
  }
  addEventListener(e, u, s) {
    const n = us.get(this);
    n.has(e) || n.set(e, new Map()), n.get(e).set(u, s);
  }
  removeEventListener(e, u) {
    const s = us.get(this);
    if (s.has(e)) {
      const n = s.get(e);
      n.delete(u) && !n.size && s.delete(e);
    }
  }
  dispatchEvent(e) {
    let u = this;
    for (e.eventPhase = e.CAPTURING_PHASE; u; )
      u.dispatchEvent && e._path.push({ currentTarget: u, target: this }),
        (u = e.bubbles && u._getParent && u._getParent());
    return (
      e._path.some(Ld, e),
      (e._path = []),
      (e.eventPhase = e.NONE),
      !e.defaultPrevented
    );
  }
}
let ot = class extends Array {
  item(e) {
    return e < this.length ? this[e] : null;
  }
};
const oi = ({ parentNode: t }) => {
  let e = 0;
  for (; t; ) e++, (t = t.parentNode);
  return e;
};
let $t = class extends Qn {
  static get ELEMENT_NODE() {
    return M;
  }
  static get ATTRIBUTE_NODE() {
    return be;
  }
  static get TEXT_NODE() {
    return Te;
  }
  static get CDATA_SECTION_NODE() {
    return ct;
  }
  static get COMMENT_NODE() {
    return bt;
  }
  static get DOCUMENT_NODE() {
    return Ot;
  }
  static get DOCUMENT_FRAGMENT_NODE() {
    return pt;
  }
  static get DOCUMENT_TYPE_NODE() {
    return au;
  }
  constructor(e, u, s) {
    super(),
      (this.ownerDocument = e),
      (this.localName = u),
      (this.nodeType = s),
      (this.parentNode = null),
      (this[m] = null),
      (this[de] = null);
  }
  get ELEMENT_NODE() {
    return M;
  }
  get ATTRIBUTE_NODE() {
    return be;
  }
  get TEXT_NODE() {
    return Te;
  }
  get CDATA_SECTION_NODE() {
    return ct;
  }
  get COMMENT_NODE() {
    return bt;
  }
  get DOCUMENT_NODE() {
    return Ot;
  }
  get DOCUMENT_FRAGMENT_NODE() {
    return pt;
  }
  get DOCUMENT_TYPE_NODE() {
    return au;
  }
  get baseURI() {
    const e = this.nodeType === Ot ? this : this.ownerDocument;
    if (e) {
      const u = e.querySelector('base');
      if (u) return u.getAttribute('href');
      const { location: s } = e.defaultView;
      if (s) return s.href;
    }
    return null;
  }
  get isConnected() {
    return !1;
  }
  get nodeName() {
    return this.localName;
  }
  get parentElement() {
    return null;
  }
  get previousSibling() {
    return null;
  }
  get previousElementSibling() {
    return null;
  }
  get nextSibling() {
    return null;
  }
  get nextElementSibling() {
    return null;
  }
  get childNodes() {
    return new ot();
  }
  get firstChild() {
    return null;
  }
  get lastChild() {
    return null;
  }
  get nodeValue() {
    return null;
  }
  set nodeValue(e) {}
  get textContent() {
    return null;
  }
  set textContent(e) {}
  normalize() {}
  cloneNode() {
    return null;
  }
  contains() {
    return !1;
  }
  insertBefore(e, u) {
    return e;
  }
  appendChild(e) {
    return e;
  }
  replaceChild(e, u) {
    return u;
  }
  removeChild(e) {
    return e;
  }
  toString() {
    return '';
  }
  hasChildNodes() {
    return !!this.lastChild;
  }
  isSameNode(e) {
    return this === e;
  }
  compareDocumentPosition(e) {
    let u = 0;
    if (this !== e) {
      let s = oi(this),
        n = oi(e);
      if (s < n) (u += ui), this.contains(e) && (u += ld);
      else if (n < s) (u += ti), e.contains(this) && (u += cd);
      else if (s && n) {
        const { childNodes: r } = this.parentNode;
        r.indexOf(this) < r.indexOf(e) ? (u += ui) : (u += ti);
      }
      (!s || !n) && ((u += dd), (u += od));
    }
    return u;
  }
  isEqualNode(e) {
    if (this === e) return !0;
    if (this.nodeType === e.nodeType) {
      switch (this.nodeType) {
        case Ot:
        case pt: {
          const u = this.childNodes,
            s = e.childNodes;
          return (
            u.length === s.length && u.every((n, r) => n.isEqualNode(s[r]))
          );
        }
      }
      return this.toString() === e.toString();
    }
    return !1;
  }
  _getParent() {
    return this.parentNode;
  }
  getRootNode() {
    let e = this;
    for (; e.parentNode; ) e = e.parentNode;
    return e;
  }
};
const { replace: Id } = '',
  Md = /[<>&\xA0]/g,
  Od = { ' ': '&#160;', '&': '&amp;', '<': '&lt;', '>': '&gt;' },
  kd = (t) => Od[t],
  er = (t) => Id.call(t, Md, kd),
  Pd = /"/g;
let Du = class lo extends $t {
  constructor(e, u, s = '') {
    super(e, u, be),
      (this.ownerElement = null),
      (this.name = kt(u)),
      (this[U] = kt(s)),
      (this[is] = !1);
  }
  get value() {
    return this[U];
  }
  set value(e) {
    const { [U]: u, name: s, ownerElement: n } = this;
    (this[U] = kt(e)),
      (this[is] = !0),
      n && (Yn(n, s, u), Ts(n, s, u, this[U]));
  }
  cloneNode() {
    const { ownerDocument: e, name: u, [U]: s } = this;
    return new lo(e, u, s);
  }
  toString() {
    const { name: e, [U]: u } = this;
    if (Rd.has(e) && !u) return _t(this) ? e : `${e}=""`;
    const s = (_t(this) ? u : er(u)).replace(Pd, '&quot;');
    return `${e}="${s}"`;
  }
  toJSON() {
    const e = [];
    return ro(this, e), e;
  }
};
const fo = ({ ownerDocument: t, parentNode: e }) => {
    for (; e; ) {
      if (e === t) return !0;
      e = e.parentNode || e.host;
    }
    return !1;
  },
  ho = ({ parentNode: t }) => {
    if (t)
      switch (t.nodeType) {
        case Ot:
        case pt:
          return null;
      }
    return t;
  },
  wu = ({ [de]: t }) => {
    switch (t ? t.nodeType : 0) {
      case At:
        return t[Ie];
      case Te:
      case bt:
      case ct:
        return t;
    }
    return null;
  },
  Pt = (t) => {
    const e = Oe(t)[m];
    return e && (e.nodeType === At ? null : e);
  },
  tr = (t) => {
    let e = Pt(t);
    for (; e && e.nodeType !== M; ) e = Pt(e);
    return e;
  },
  po = (t) => {
    let e = wu(t);
    for (; e && e.nodeType !== M; ) e = wu(e);
    return e;
  },
  ur = (t, e) => {
    const u = t.createDocumentFragment();
    return u.append(...e), u;
  },
  bo = (t, e) => {
    const { ownerDocument: u, parentNode: s } = t;
    s && s.insertBefore(ur(u, e), t);
  },
  go = (t, e) => {
    const { ownerDocument: u, parentNode: s } = t;
    s && s.insertBefore(ur(u, e), Oe(t)[m]);
  },
  sr = (t, e) => {
    const { ownerDocument: u, parentNode: s } = t;
    s &&
      (e.includes(t) && sr(t, [(t = t.cloneNode())]),
      s.insertBefore(ur(u, e), t),
      t.remove());
  },
  mo = (t, e, u) => {
    const { parentNode: s, nodeType: n } = e;
    (t || u) && (Qa(t, u), (e[de] = null), (Oe(e)[m] = null)),
      s && ((e.parentNode = null), Tu(e, s), n === M && md(e));
  };
let Lu = class extends $t {
    constructor(e, u, s, n) {
      super(e, u, s), (this[U] = kt(n));
    }
    get isConnected() {
      return fo(this);
    }
    get parentElement() {
      return ho(this);
    }
    get previousSibling() {
      return wu(this);
    }
    get nextSibling() {
      return Pt(this);
    }
    get previousElementSibling() {
      return po(this);
    }
    get nextElementSibling() {
      return tr(this);
    }
    before(...e) {
      bo(this, e);
    }
    after(...e) {
      go(this, e);
    }
    replaceWith(...e) {
      sr(this, e);
    }
    remove() {
      mo(this[de], this, this[m]);
    }
    get data() {
      return this[U];
    }
    set data(e) {
      (this[U] = kt(e)), Tu(this, this.parentNode);
    }
    get nodeValue() {
      return this.data;
    }
    set nodeValue(e) {
      this.data = e;
    }
    get textContent() {
      return this.data;
    }
    set textContent(e) {
      this.data = e;
    }
    get length() {
      return this.data.length;
    }
    substringData(e, u) {
      return this.data.substr(e, u);
    }
    appendData(e) {
      this.data += e;
    }
    insertData(e, u) {
      const { data: s } = this;
      this.data = s.slice(0, e) + u + s.slice(e);
    }
    deleteData(e, u) {
      const { data: s } = this;
      this.data = s.slice(0, e) + s.slice(e + u);
    }
    replaceData(e, u, s) {
      const { data: n } = this;
      this.data = n.slice(0, e) + s + n.slice(e + u);
    }
    toJSON() {
      const e = [];
      return io(this, e), e;
    }
  },
  nr = class So extends Lu {
    constructor(e, u = '') {
      super(e, '#cdatasection', ct, u);
    }
    cloneNode() {
      const { ownerDocument: e, [U]: u } = this;
      return new So(e, u);
    }
    toString() {
      return `<![CDATA[${this[U]}]]>`;
    }
  },
  rr = class xo extends Lu {
    constructor(e, u = '') {
      super(e, '#comment', bt, u);
    }
    cloneNode() {
      const { ownerDocument: e, [U]: u } = this;
      return new xo(e, u);
    }
    toString() {
      return `<!--${this[U]}-->`;
    }
  };
var Bs, ci;
function qd() {
  return (
    ci ||
      ((ci = 1),
      (Bs = {
        trueFunc: function () {
          return !0;
        },
        falseFunc: function () {
          return !1;
        },
      })),
    Bs
  );
}
var Bd = qd();
const A = so(Bd);
var v;
(function (t) {
  (t.Attribute = 'attribute'),
    (t.Pseudo = 'pseudo'),
    (t.PseudoElement = 'pseudo-element'),
    (t.Tag = 'tag'),
    (t.Universal = 'universal'),
    (t.Adjacent = 'adjacent'),
    (t.Child = 'child'),
    (t.Descendant = 'descendant'),
    (t.Parent = 'parent'),
    (t.Sibling = 'sibling'),
    (t.ColumnCombinator = 'column-combinator');
})(v || (v = {}));
var ie;
(function (t) {
  (t.Any = 'any'),
    (t.Element = 'element'),
    (t.End = 'end'),
    (t.Equals = 'equals'),
    (t.Exists = 'exists'),
    (t.Hyphen = 'hyphen'),
    (t.Not = 'not'),
    (t.Start = 'start');
})(ie || (ie = {}));
const li = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,
  Fd = /\\([\da-f]{1,6}\s?|(\s)|.)/gi,
  Vd = new Map([
    [126, ie.Element],
    [94, ie.Start],
    [36, ie.End],
    [42, ie.Any],
    [33, ie.Not],
    [124, ie.Hyphen],
  ]),
  Ud = new Set([
    'has',
    'not',
    'matches',
    'is',
    'where',
    'host',
    'host-context',
  ]);
function $d(t) {
  switch (t.type) {
    case v.Adjacent:
    case v.Child:
    case v.Descendant:
    case v.Parent:
    case v.Sibling:
    case v.ColumnCombinator:
      return !0;
    default:
      return !1;
  }
}
const Hd = new Set(['contains', 'icontains']);
function Gd(t, e, u) {
  const s = parseInt(e, 16) - 65536;
  return s !== s || u
    ? e
    : s < 0
    ? String.fromCharCode(s + 65536)
    : String.fromCharCode((s >> 10) | 55296, (s & 1023) | 56320);
}
function gu(t) {
  return t.replace(Fd, Gd);
}
function Fs(t) {
  return t === 39 || t === 34;
}
function di(t) {
  return t === 32 || t === 9 || t === 10 || t === 12 || t === 13;
}
function yo(t) {
  const e = [],
    u = To(e, `${t}`, 0);
  if (u < t.length) throw new Error(`Unmatched selector: ${t.slice(u)}`);
  return e;
}
function To(t, e, u) {
  let s = [];
  function n(b) {
    const h = e.slice(u + b).match(li);
    if (!h) throw new Error(`Expected name, found ${e.slice(u)}`);
    const [S] = h;
    return (u += b + S.length), gu(S);
  }
  function r(b) {
    for (u += b; u < e.length && di(e.charCodeAt(u)); ) u++;
  }
  function i() {
    u += 1;
    const b = u;
    let h = 1;
    for (; h > 0 && u < e.length; u++)
      e.charCodeAt(u) === 40 && !a(u)
        ? h++
        : e.charCodeAt(u) === 41 && !a(u) && h--;
    if (h) throw new Error('Parenthesis not matched');
    return gu(e.slice(b, u - 1));
  }
  function a(b) {
    let h = 0;
    for (; e.charCodeAt(--b) === 92; ) h++;
    return (h & 1) === 1;
  }
  function o() {
    if (s.length > 0 && $d(s[s.length - 1]))
      throw new Error('Did not expect successive traversals.');
  }
  function c(b) {
    if (s.length > 0 && s[s.length - 1].type === v.Descendant) {
      s[s.length - 1].type = b;
      return;
    }
    o(), s.push({ type: b });
  }
  function l(b, h) {
    s.push({
      type: v.Attribute,
      name: b,
      action: h,
      value: n(1),
      namespace: null,
      ignoreCase: 'quirks',
    });
  }
  function f() {
    if (
      (s.length && s[s.length - 1].type === v.Descendant && s.pop(),
      s.length === 0)
    )
      throw new Error('Empty sub-selector');
    t.push(s);
  }
  if ((r(0), e.length === u)) return u;
  e: for (; u < e.length; ) {
    const b = e.charCodeAt(u);
    switch (b) {
      case 32:
      case 9:
      case 10:
      case 12:
      case 13: {
        (s.length === 0 || s[0].type !== v.Descendant) &&
          (o(), s.push({ type: v.Descendant })),
          r(1);
        break;
      }
      case 62: {
        c(v.Child), r(1);
        break;
      }
      case 60: {
        c(v.Parent), r(1);
        break;
      }
      case 126: {
        c(v.Sibling), r(1);
        break;
      }
      case 43: {
        c(v.Adjacent), r(1);
        break;
      }
      case 46: {
        l('class', ie.Element);
        break;
      }
      case 35: {
        l('id', ie.Equals);
        break;
      }
      case 91: {
        r(1);
        let h,
          S = null;
        e.charCodeAt(u) === 124
          ? (h = n(1))
          : e.startsWith('*|', u)
          ? ((S = '*'), (h = n(2)))
          : ((h = n(0)),
            e.charCodeAt(u) === 124 &&
              e.charCodeAt(u + 1) !== 61 &&
              ((S = h), (h = n(1)))),
          r(0);
        let E = ie.Exists;
        const I = Vd.get(e.charCodeAt(u));
        if (I) {
          if (((E = I), e.charCodeAt(u + 1) !== 61))
            throw new Error('Expected `=`');
          r(2);
        } else e.charCodeAt(u) === 61 && ((E = ie.Equals), r(1));
        let D = '',
          H = null;
        if (E !== 'exists') {
          if (Fs(e.charCodeAt(u))) {
            const R = e.charCodeAt(u);
            let k = u + 1;
            for (; k < e.length && (e.charCodeAt(k) !== R || a(k)); ) k += 1;
            if (e.charCodeAt(k) !== R)
              throw new Error("Attribute value didn't end");
            (D = gu(e.slice(u + 1, k))), (u = k + 1);
          } else {
            const R = u;
            for (
              ;
              u < e.length &&
              ((!di(e.charCodeAt(u)) && e.charCodeAt(u) !== 93) || a(u));

            )
              u += 1;
            D = gu(e.slice(R, u));
          }
          r(0);
          const G = e.charCodeAt(u) | 32;
          G === 115 ? ((H = !1), r(1)) : G === 105 && ((H = !0), r(1));
        }
        if (e.charCodeAt(u) !== 93)
          throw new Error("Attribute selector didn't terminate");
        u += 1;
        const q = {
          type: v.Attribute,
          name: h,
          action: E,
          value: D,
          namespace: S,
          ignoreCase: H,
        };
        s.push(q);
        break;
      }
      case 58: {
        if (e.charCodeAt(u + 1) === 58) {
          s.push({
            type: v.PseudoElement,
            name: n(2).toLowerCase(),
            data: e.charCodeAt(u) === 40 ? i() : null,
          });
          continue;
        }
        const h = n(1).toLowerCase();
        let S = null;
        if (e.charCodeAt(u) === 40)
          if (Ud.has(h)) {
            if (Fs(e.charCodeAt(u + 1)))
              throw new Error(`Pseudo-selector ${h} cannot be quoted`);
            if (((S = []), (u = To(S, e, u + 1)), e.charCodeAt(u) !== 41))
              throw new Error(`Missing closing parenthesis in :${h} (${e})`);
            u += 1;
          } else {
            if (((S = i()), Hd.has(h))) {
              const E = S.charCodeAt(0);
              E === S.charCodeAt(S.length - 1) && Fs(E) && (S = S.slice(1, -1));
            }
            S = gu(S);
          }
        s.push({ type: v.Pseudo, name: h, data: S });
        break;
      }
      case 44: {
        f(), (s = []), r(1);
        break;
      }
      default: {
        if (e.startsWith('/*', u)) {
          const E = e.indexOf('*/', u + 2);
          if (E < 0) throw new Error('Comment was not terminated');
          (u = E + 2), s.length === 0 && r(0);
          break;
        }
        let h = null,
          S;
        if (b === 42) (u += 1), (S = '*');
        else if (b === 124) {
          if (((S = ''), e.charCodeAt(u + 1) === 124)) {
            c(v.ColumnCombinator), r(2);
            break;
          }
        } else if (li.test(e.slice(u))) S = n(0);
        else break e;
        e.charCodeAt(u) === 124 &&
          e.charCodeAt(u + 1) !== 124 &&
          ((h = S),
          e.charCodeAt(u + 1) === 42 ? ((S = '*'), (u += 2)) : (S = n(1))),
          s.push(
            S === '*'
              ? { type: v.Universal, namespace: h }
              : { type: v.Tag, name: S, namespace: h }
          );
      }
    }
  }
  return f(), u;
}
const Co = new Map([
  [v.Universal, 50],
  [v.Tag, 30],
  [v.Attribute, 1],
  [v.Pseudo, 0],
]);
function ir(t) {
  return !Co.has(t.type);
}
const jd = new Map([
  [ie.Exists, 10],
  [ie.Equals, 8],
  [ie.Not, 7],
  [ie.Start, 6],
  [ie.End, 6],
  [ie.Any, 5],
]);
function zd(t) {
  const e = t.map(vo);
  for (let u = 1; u < t.length; u++) {
    const s = e[u];
    if (!(s < 0))
      for (let n = u - 1; n >= 0 && s < e[n]; n--) {
        const r = t[n + 1];
        (t[n + 1] = t[n]), (t[n] = r), (e[n + 1] = e[n]), (e[n] = s);
      }
  }
}
function vo(t) {
  var e, u;
  let s = (e = Co.get(t.type)) !== null && e !== void 0 ? e : -1;
  return (
    t.type === v.Attribute
      ? ((s = (u = jd.get(t.action)) !== null && u !== void 0 ? u : 4),
        t.action === ie.Equals && t.name === 'id' && (s = 9),
        t.ignoreCase && (s >>= 1))
      : t.type === v.Pseudo &&
        (t.data
          ? t.name === 'has' || t.name === 'contains'
            ? (s = 0)
            : Array.isArray(t.data)
            ? ((s = Math.min(...t.data.map((n) => Math.min(...n.map(vo))))),
              s < 0 && (s = 0))
            : (s = 2)
          : (s = 3)),
    s
  );
}
const Wd = /[-[\]{}()*+?.,\\^$|#\s]/g;
function fi(t) {
  return t.replace(Wd, '\\$&');
}
const Kd = new Set([
  'accept',
  'accept-charset',
  'align',
  'alink',
  'axis',
  'bgcolor',
  'charset',
  'checked',
  'clear',
  'codetype',
  'color',
  'compact',
  'declare',
  'defer',
  'dir',
  'direction',
  'disabled',
  'enctype',
  'face',
  'frame',
  'hreflang',
  'http-equiv',
  'lang',
  'language',
  'link',
  'media',
  'method',
  'multiple',
  'nohref',
  'noresize',
  'noshade',
  'nowrap',
  'readonly',
  'rel',
  'rev',
  'rules',
  'scope',
  'scrolling',
  'selected',
  'shape',
  'target',
  'text',
  'type',
  'valign',
  'valuetype',
  'vlink',
]);
function It(t, e) {
  return typeof t.ignoreCase == 'boolean'
    ? t.ignoreCase
    : t.ignoreCase === 'quirks'
    ? !!e.quirksMode
    : !e.xmlMode && Kd.has(t.name);
}
const Xd = {
    equals(t, e, u) {
      const { adapter: s } = u,
        { name: n } = e;
      let { value: r } = e;
      return It(e, u)
        ? ((r = r.toLowerCase()),
          (i) => {
            const a = s.getAttributeValue(i, n);
            return (
              a != null &&
              a.length === r.length &&
              a.toLowerCase() === r &&
              t(i)
            );
          })
        : (i) => s.getAttributeValue(i, n) === r && t(i);
    },
    hyphen(t, e, u) {
      const { adapter: s } = u,
        { name: n } = e;
      let { value: r } = e;
      const i = r.length;
      return It(e, u)
        ? ((r = r.toLowerCase()),
          function (o) {
            const c = s.getAttributeValue(o, n);
            return (
              c != null &&
              (c.length === i || c.charAt(i) === '-') &&
              c.substr(0, i).toLowerCase() === r &&
              t(o)
            );
          })
        : function (o) {
            const c = s.getAttributeValue(o, n);
            return (
              c != null &&
              (c.length === i || c.charAt(i) === '-') &&
              c.substr(0, i) === r &&
              t(o)
            );
          };
    },
    element(t, e, u) {
      const { adapter: s } = u,
        { name: n, value: r } = e;
      if (/\s/.test(r)) return A.falseFunc;
      const i = new RegExp(`(?:^|\\s)${fi(r)}(?:$|\\s)`, It(e, u) ? 'i' : '');
      return function (o) {
        const c = s.getAttributeValue(o, n);
        return c != null && c.length >= r.length && i.test(c) && t(o);
      };
    },
    exists(t, { name: e }, { adapter: u }) {
      return (s) => u.hasAttrib(s, e) && t(s);
    },
    start(t, e, u) {
      const { adapter: s } = u,
        { name: n } = e;
      let { value: r } = e;
      const i = r.length;
      return i === 0
        ? A.falseFunc
        : It(e, u)
        ? ((r = r.toLowerCase()),
          (a) => {
            const o = s.getAttributeValue(a, n);
            return (
              o != null &&
              o.length >= i &&
              o.substr(0, i).toLowerCase() === r &&
              t(a)
            );
          })
        : (a) => {
            var o;
            return (
              !!(
                !((o = s.getAttributeValue(a, n)) === null || o === void 0) &&
                o.startsWith(r)
              ) && t(a)
            );
          };
    },
    end(t, e, u) {
      const { adapter: s } = u,
        { name: n } = e;
      let { value: r } = e;
      const i = -r.length;
      return i === 0
        ? A.falseFunc
        : It(e, u)
        ? ((r = r.toLowerCase()),
          (a) => {
            var o;
            return (
              ((o = s.getAttributeValue(a, n)) === null || o === void 0
                ? void 0
                : o.substr(i).toLowerCase()) === r && t(a)
            );
          })
        : (a) => {
            var o;
            return (
              !!(
                !((o = s.getAttributeValue(a, n)) === null || o === void 0) &&
                o.endsWith(r)
              ) && t(a)
            );
          };
    },
    any(t, e, u) {
      const { adapter: s } = u,
        { name: n, value: r } = e;
      if (r === '') return A.falseFunc;
      if (It(e, u)) {
        const i = new RegExp(fi(r), 'i');
        return function (o) {
          const c = s.getAttributeValue(o, n);
          return c != null && c.length >= r.length && i.test(c) && t(o);
        };
      }
      return (i) => {
        var a;
        return (
          !!(
            !((a = s.getAttributeValue(i, n)) === null || a === void 0) &&
            a.includes(r)
          ) && t(i)
        );
      };
    },
    not(t, e, u) {
      const { adapter: s } = u,
        { name: n } = e;
      let { value: r } = e;
      return r === ''
        ? (i) => !!s.getAttributeValue(i, n) && t(i)
        : It(e, u)
        ? ((r = r.toLowerCase()),
          (i) => {
            const a = s.getAttributeValue(i, n);
            return (
              (a == null || a.length !== r.length || a.toLowerCase() !== r) &&
              t(i)
            );
          })
        : (i) => s.getAttributeValue(i, n) !== r && t(i);
    },
  },
  Jd = new Set([9, 10, 12, 13, 32]),
  hi = 48,
  Zd = 57;
function Yd(t) {
  if (((t = t.trim().toLowerCase()), t === 'even')) return [2, 0];
  if (t === 'odd') return [2, 1];
  let e = 0,
    u = 0,
    s = r(),
    n = i();
  if (
    (e < t.length &&
      t.charAt(e) === 'n' &&
      (e++,
      (u = s * (n ?? 1)),
      a(),
      e < t.length ? ((s = r()), a(), (n = i())) : (s = n = 0)),
    n === null || e < t.length)
  )
    throw new Error(`n-th rule couldn't be parsed ('${t}')`);
  return [u, s * n];
  function r() {
    return t.charAt(e) === '-' ? (e++, -1) : (t.charAt(e) === '+' && e++, 1);
  }
  function i() {
    const o = e;
    let c = 0;
    for (; e < t.length && t.charCodeAt(e) >= hi && t.charCodeAt(e) <= Zd; )
      (c = c * 10 + (t.charCodeAt(e) - hi)), e++;
    return e === o ? null : c;
  }
  function a() {
    for (; e < t.length && Jd.has(t.charCodeAt(e)); ) e++;
  }
}
function Qd(t) {
  const e = t[0],
    u = t[1] - 1;
  if (u < 0 && e <= 0) return A.falseFunc;
  if (e === -1) return (r) => r <= u;
  if (e === 0) return (r) => r === u;
  if (e === 1) return u < 0 ? A.trueFunc : (r) => r >= u;
  const s = Math.abs(e),
    n = ((u % s) + s) % s;
  return e > 1 ? (r) => r >= u && r % s === n : (r) => r <= u && r % s === n;
}
function ju(t) {
  return Qd(Yd(t));
}
function zu(t, e) {
  return (u) => {
    const s = e.getParent(u);
    return s != null && e.isTag(s) && t(u);
  };
}
const Rn = {
  contains(t, e, { adapter: u }) {
    return function (n) {
      return t(n) && u.getText(n).includes(e);
    };
  },
  icontains(t, e, { adapter: u }) {
    const s = e.toLowerCase();
    return function (r) {
      return t(r) && u.getText(r).toLowerCase().includes(s);
    };
  },
  'nth-child'(t, e, { adapter: u, equals: s }) {
    const n = ju(e);
    return n === A.falseFunc
      ? A.falseFunc
      : n === A.trueFunc
      ? zu(t, u)
      : function (i) {
          const a = u.getSiblings(i);
          let o = 0;
          for (let c = 0; c < a.length && !s(i, a[c]); c++)
            u.isTag(a[c]) && o++;
          return n(o) && t(i);
        };
  },
  'nth-last-child'(t, e, { adapter: u, equals: s }) {
    const n = ju(e);
    return n === A.falseFunc
      ? A.falseFunc
      : n === A.trueFunc
      ? zu(t, u)
      : function (i) {
          const a = u.getSiblings(i);
          let o = 0;
          for (let c = a.length - 1; c >= 0 && !s(i, a[c]); c--)
            u.isTag(a[c]) && o++;
          return n(o) && t(i);
        };
  },
  'nth-of-type'(t, e, { adapter: u, equals: s }) {
    const n = ju(e);
    return n === A.falseFunc
      ? A.falseFunc
      : n === A.trueFunc
      ? zu(t, u)
      : function (i) {
          const a = u.getSiblings(i);
          let o = 0;
          for (let c = 0; c < a.length; c++) {
            const l = a[c];
            if (s(i, l)) break;
            u.isTag(l) && u.getName(l) === u.getName(i) && o++;
          }
          return n(o) && t(i);
        };
  },
  'nth-last-of-type'(t, e, { adapter: u, equals: s }) {
    const n = ju(e);
    return n === A.falseFunc
      ? A.falseFunc
      : n === A.trueFunc
      ? zu(t, u)
      : function (i) {
          const a = u.getSiblings(i);
          let o = 0;
          for (let c = a.length - 1; c >= 0; c--) {
            const l = a[c];
            if (s(i, l)) break;
            u.isTag(l) && u.getName(l) === u.getName(i) && o++;
          }
          return n(o) && t(i);
        };
  },
  root(t, e, { adapter: u }) {
    return (s) => {
      const n = u.getParent(s);
      return (n == null || !u.isTag(n)) && t(s);
    };
  },
  scope(t, e, u, s) {
    const { equals: n } = u;
    return !s || s.length === 0
      ? Rn.root(t, e, u)
      : s.length === 1
      ? (r) => n(s[0], r) && t(r)
      : (r) => s.includes(r) && t(r);
  },
  hover: Vs('isHovered'),
  visited: Vs('isVisited'),
  active: Vs('isActive'),
};
function Vs(t) {
  return function (u, s, { adapter: n }) {
    const r = n[t];
    return typeof r != 'function'
      ? A.falseFunc
      : function (a) {
          return r(a) && u(a);
        };
  };
}
const pi = {
  empty(t, { adapter: e }) {
    return !e.getChildren(t).some((u) => e.isTag(u) || e.getText(u) !== '');
  },
  'first-child'(t, { adapter: e, equals: u }) {
    if (e.prevElementSibling) return e.prevElementSibling(t) == null;
    const s = e.getSiblings(t).find((n) => e.isTag(n));
    return s != null && u(t, s);
  },
  'last-child'(t, { adapter: e, equals: u }) {
    const s = e.getSiblings(t);
    for (let n = s.length - 1; n >= 0; n--) {
      if (u(t, s[n])) return !0;
      if (e.isTag(s[n])) break;
    }
    return !1;
  },
  'first-of-type'(t, { adapter: e, equals: u }) {
    const s = e.getSiblings(t),
      n = e.getName(t);
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      if (u(t, i)) return !0;
      if (e.isTag(i) && e.getName(i) === n) break;
    }
    return !1;
  },
  'last-of-type'(t, { adapter: e, equals: u }) {
    const s = e.getSiblings(t),
      n = e.getName(t);
    for (let r = s.length - 1; r >= 0; r--) {
      const i = s[r];
      if (u(t, i)) return !0;
      if (e.isTag(i) && e.getName(i) === n) break;
    }
    return !1;
  },
  'only-of-type'(t, { adapter: e, equals: u }) {
    const s = e.getName(t);
    return e
      .getSiblings(t)
      .every((n) => u(t, n) || !e.isTag(n) || e.getName(n) !== s);
  },
  'only-child'(t, { adapter: e, equals: u }) {
    return e.getSiblings(t).every((s) => u(t, s) || !e.isTag(s));
  },
};
function bi(t, e, u, s) {
  if (u === null) {
    if (t.length > s)
      throw new Error(`Pseudo-class :${e} requires an argument`);
  } else if (t.length === s)
    throw new Error(`Pseudo-class :${e} doesn't have any arguments`);
}
const ef = {
    'any-link': ':is(a, area, link)[href]',
    link: ':any-link:not(:visited)',
    disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
    enabled: ':not(:disabled)',
    checked:
      ':is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)',
    required: ':is(input, select, textarea)[required]',
    optional: ':is(input, select, textarea):not([required])',
    selected:
      'option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)',
    checkbox: '[type=checkbox]',
    file: '[type=file]',
    password: '[type=password]',
    radio: '[type=radio]',
    reset: '[type=reset]',
    image: '[type=image]',
    submit: '[type=submit]',
    parent: ':not(:empty)',
    header: ':is(h1, h2, h3, h4, h5, h6)',
    button: ':is(button, input[type=button])',
    input: ':is(input, textarea, select, button)',
    text: "input:is(:not([type!='']), [type=text])",
  },
  Eo = {};
function wo(t, e) {
  return t === A.falseFunc ? A.falseFunc : (u) => e.isTag(u) && t(u);
}
function tf(t, e) {
  const u = e.getSiblings(t);
  if (u.length <= 1) return [];
  const s = u.indexOf(t);
  return s < 0 || s === u.length - 1 ? [] : u.slice(s + 1).filter(e.isTag);
}
function Dn(t) {
  return {
    xmlMode: !!t.xmlMode,
    lowerCaseAttributeNames: !!t.lowerCaseAttributeNames,
    lowerCaseTags: !!t.lowerCaseTags,
    quirksMode: !!t.quirksMode,
    cacheResults: !!t.cacheResults,
    pseudos: t.pseudos,
    adapter: t.adapter,
    equals: t.equals,
  };
}
const Us = (t, e, u, s, n) => {
    const r = n(e, Dn(u), s);
    return r === A.trueFunc
      ? t
      : r === A.falseFunc
      ? A.falseFunc
      : (i) => r(i) && t(i);
  },
  $s = {
    is: Us,
    matches: Us,
    where: Us,
    not(t, e, u, s, n) {
      const r = n(e, Dn(u), s);
      return r === A.falseFunc
        ? t
        : r === A.trueFunc
        ? A.falseFunc
        : (i) => !r(i) && t(i);
    },
    has(t, e, u, s, n) {
      const { adapter: r } = u,
        i = Dn(u);
      i.relativeSelector = !0;
      const a = e.some((l) => l.some(ir)) ? [Eo] : void 0,
        o = n(e, i, a);
      if (o === A.falseFunc) return A.falseFunc;
      const c = wo(o, r);
      if (a && o !== A.trueFunc) {
        const { shouldTestNextSiblings: l = !1 } = o;
        return (f) => {
          if (!t(f)) return !1;
          a[0] = f;
          const b = r.getChildren(f),
            h = l ? [...b, ...tf(f, r)] : b;
          return r.existsOne(c, h);
        };
      }
      return (l) => t(l) && r.existsOne(c, r.getChildren(l));
    },
  };
function uf(t, e, u, s, n) {
  var r;
  const { name: i, data: a } = e;
  if (Array.isArray(a)) {
    if (!(i in $s)) throw new Error(`Unknown pseudo-class :${i}(${a})`);
    return $s[i](t, a, u, s, n);
  }
  const o = (r = u.pseudos) === null || r === void 0 ? void 0 : r[i],
    c = typeof o == 'string' ? o : ef[i];
  if (typeof c == 'string') {
    if (a != null) throw new Error(`Pseudo ${i} doesn't have any arguments`);
    const l = yo(c);
    return $s.is(t, l, u, s, n);
  }
  if (typeof o == 'function') return bi(o, i, a, 1), (l) => o(l, a) && t(l);
  if (i in Rn) return Rn[i](t, a, u, s);
  if (i in pi) {
    const l = pi[i];
    return bi(l, i, a, 2), (f) => l(f, u, a) && t(f);
  }
  throw new Error(`Unknown pseudo-class :${i}`);
}
function Hs(t, e) {
  const u = e.getParent(t);
  return u && e.isTag(u) ? u : null;
}
function sf(t, e, u, s, n) {
  const { adapter: r, equals: i } = u;
  switch (e.type) {
    case v.PseudoElement:
      throw new Error('Pseudo-elements are not supported by css-select');
    case v.ColumnCombinator:
      throw new Error('Column combinators are not yet supported by css-select');
    case v.Attribute: {
      if (e.namespace != null)
        throw new Error(
          'Namespaced attributes are not yet supported by css-select'
        );
      return (
        (!u.xmlMode || u.lowerCaseAttributeNames) &&
          (e.name = e.name.toLowerCase()),
        Xd[e.action](t, e, u)
      );
    }
    case v.Pseudo:
      return uf(t, e, u, s, n);
    case v.Tag: {
      if (e.namespace != null)
        throw new Error(
          'Namespaced tag names are not yet supported by css-select'
        );
      let { name: a } = e;
      return (
        (!u.xmlMode || u.lowerCaseTags) && (a = a.toLowerCase()),
        function (c) {
          return r.getName(c) === a && t(c);
        }
      );
    }
    case v.Descendant: {
      if (u.cacheResults === !1 || typeof WeakSet > 'u')
        return function (c) {
          let l = c;
          for (; (l = Hs(l, r)); ) if (t(l)) return !0;
          return !1;
        };
      const a = new WeakSet();
      return function (c) {
        let l = c;
        for (; (l = Hs(l, r)); )
          if (!a.has(l)) {
            if (r.isTag(l) && t(l)) return !0;
            a.add(l);
          }
        return !1;
      };
    }
    case '_flexibleDescendant':
      return function (o) {
        let c = o;
        do if (t(c)) return !0;
        while ((c = Hs(c, r)));
        return !1;
      };
    case v.Parent:
      return function (o) {
        return r.getChildren(o).some((c) => r.isTag(c) && t(c));
      };
    case v.Child:
      return function (o) {
        const c = r.getParent(o);
        return c != null && r.isTag(c) && t(c);
      };
    case v.Sibling:
      return function (o) {
        const c = r.getSiblings(o);
        for (let l = 0; l < c.length; l++) {
          const f = c[l];
          if (i(o, f)) break;
          if (r.isTag(f) && t(f)) return !0;
        }
        return !1;
      };
    case v.Adjacent:
      return r.prevElementSibling
        ? function (o) {
            const c = r.prevElementSibling(o);
            return c != null && t(c);
          }
        : function (o) {
            const c = r.getSiblings(o);
            let l;
            for (let f = 0; f < c.length; f++) {
              const b = c[f];
              if (i(o, b)) break;
              r.isTag(b) && (l = b);
            }
            return !!l && t(l);
          };
    case v.Universal: {
      if (e.namespace != null && e.namespace !== '*')
        throw new Error(
          'Namespaced universal selectors are not yet supported by css-select'
        );
      return t;
    }
  }
}
function Ao(t, e, u) {
  const s = nf(t, e, u);
  return wo(s, e.adapter);
}
function nf(t, e, u) {
  const s = typeof t == 'string' ? yo(t) : t;
  return No(s, e, u);
}
function _o(t) {
  return (
    t.type === v.Pseudo &&
    (t.name === 'scope' ||
      (Array.isArray(t.data) && t.data.some((e) => e.some(_o))))
  );
}
const rf = { type: v.Descendant },
  af = { type: '_flexibleDescendant' },
  of = { type: v.Pseudo, name: 'scope', data: null };
function cf(t, { adapter: e }, u) {
  const s = !!u?.every((n) => {
    const r = e.isTag(n) && e.getParent(n);
    return n === Eo || (r && e.isTag(r));
  });
  for (const n of t) {
    if (!(n.length > 0 && ir(n[0]) && n[0].type !== v.Descendant))
      if (s && !n.some(_o)) n.unshift(rf);
      else continue;
    n.unshift(of);
  }
}
function No(t, e, u) {
  var s;
  t.forEach(zd), (u = (s = e.context) !== null && s !== void 0 ? s : u);
  const n = Array.isArray(u),
    r = u && (Array.isArray(u) ? u : [u]);
  if (e.relativeSelector !== !1) cf(t, e, r);
  else if (t.some((o) => o.length > 0 && ir(o[0])))
    throw new Error(
      'Relative selectors are not allowed when the `relativeSelector` option is disabled'
    );
  let i = !1;
  const a = t
    .map((o) => {
      if (o.length >= 2) {
        const [c, l] = o;
        c.type !== v.Pseudo ||
          c.name !== 'scope' ||
          (n && l.type === v.Descendant
            ? (o[1] = af)
            : (l.type === v.Adjacent || l.type === v.Sibling) && (i = !0));
      }
      return lf(o, e, r);
    })
    .reduce(df, A.falseFunc);
  return (a.shouldTestNextSiblings = i), a;
}
function lf(t, e, u) {
  var s;
  return t.reduce(
    (n, r) => (n === A.falseFunc ? A.falseFunc : sf(n, r, e, u, No)),
    (s = e.rootFunc) !== null && s !== void 0 ? s : A.trueFunc
  );
}
function df(t, e) {
  return e === A.falseFunc || t === A.trueFunc
    ? t
    : t === A.falseFunc || e === A.trueFunc
    ? e
    : function (s) {
        return t(s) || e(s);
      };
}
const Ro = (t, e) => t === e,
  ff = { adapter: Zn, equals: Ro };
function Do(t) {
  var e, u, s, n;
  const r = t ?? ff;
  return (
    ((e = r.adapter) !== null && e !== void 0) || (r.adapter = Zn),
    ((u = r.equals) !== null && u !== void 0) ||
      (r.equals =
        (n = (s = r.adapter) === null || s === void 0 ? void 0 : s.equals) !==
          null && n !== void 0
          ? n
          : Ro),
    r
  );
}
function hf(t) {
  return function (u, s, n) {
    const r = Do(s);
    return t(u, r, n);
  };
}
const pf = hf(Ao);
function bf(t, e, u) {
  const s = Do(u);
  return (typeof e == 'function' ? e : Ao(e, s))(t);
}
const { isArray: gf } = Array,
  Cs = ({ nodeType: t }) => t === M,
  Lo = (t, e) => e.some((u) => Cs(u) && (t(u) || Lo(t, lu(u)))),
  mf = (t, e) => (e === 'class' ? t.classList.value : t.getAttribute(e)),
  lu = ({ childNodes: t }) => t,
  Sf = (t) => {
    const { localName: e } = t;
    return _t(t) ? e.toLowerCase() : e;
  },
  xf = ({ parentNode: t }) => t,
  yf = (t) => {
    const { parentNode: e } = t;
    return e ? lu(e) : t;
  },
  Ln = (t) =>
    gf(t)
      ? t.map(Ln).join('')
      : Cs(t)
      ? Ln(lu(t))
      : t.nodeType === Te
      ? t.data
      : '',
  Tf = (t, e) => t.hasAttribute(e),
  Cf = (t) => {
    let { length: e } = t;
    for (; e--; ) {
      const u = t[e];
      if (e && -1 < t.lastIndexOf(u, e - 1)) {
        t.splice(e, 1);
        continue;
      }
      for (let { parentNode: s } = u; s; s = s.parentNode)
        if (t.includes(s)) {
          t.splice(e, 1);
          break;
        }
    }
    return t;
  },
  Io = (t, e) => {
    const u = [];
    for (const s of e) Cs(s) && (t(s) && u.push(s), u.push(...Io(t, lu(s))));
    return u;
  },
  Mo = (t, e) => {
    for (let u of e) if (t(u) || (u = Mo(t, lu(u)))) return u;
    return null;
  },
  Oo = {
    isTag: Cs,
    existsOne: Lo,
    getAttributeValue: mf,
    getChildren: lu,
    getName: Sf,
    getParent: xf,
    getSiblings: yf,
    getText: Ln,
    hasAttrib: Tf,
    removeSubsets: Cf,
    findAll: Io,
    findOne: Mo,
  },
  In = (t, e) =>
    pf(e, {
      context: e.includes(':scope') ? t : void 0,
      xmlMode: !_t(t),
      adapter: Oo,
    }),
  vf = (t, e) =>
    bf(t, e, {
      strict: !0,
      context: e.includes(':scope') ? t : void 0,
      xmlMode: !_t(t),
      adapter: Oo,
    });
let Iu = class ko extends Lu {
  constructor(e, u = '') {
    super(e, '#text', Te, u);
  }
  get wholeText() {
    const e = [];
    let { previousSibling: u, nextSibling: s } = this;
    for (; u && u.nodeType === Te; ) {
      e.unshift(u[U]);
      u = u.previousSibling;
    }
    for (e.push(this[U]); s && s.nodeType === Te; ) {
      e.push(s[U]);
      s = s.nextSibling;
    }
    return e.join('');
  }
  cloneNode() {
    const { ownerDocument: e, [U]: u } = this;
    return new ko(e, u);
  }
  toString() {
    return er(this[U]);
  }
};
const Ef = (t) => t instanceof $t,
  Gs = (t, e, u) => {
    const { ownerDocument: s } = t;
    for (const n of u) t.insertBefore(Ef(n) ? n : new Iu(s, n), e);
  };
class Po extends $t {
  constructor(e, u, s) {
    super(e, u, s),
      (this[ye] = null),
      (this[m] = this[T] =
        {
          [m]: null,
          [de]: this,
          [Ie]: this,
          nodeType: At,
          ownerDocument: this.ownerDocument,
          parentNode: null,
        });
  }
  get childNodes() {
    const e = new ot();
    let { firstChild: u } = this;
    for (; u; ) e.push(u), (u = Pt(u));
    return e;
  }
  get children() {
    const e = new ot();
    let { firstElementChild: u } = this;
    for (; u; ) e.push(u), (u = tr(u));
    return e;
  }
  get firstChild() {
    let { [m]: e, [T]: u } = this;
    for (; e.nodeType === be; ) e = e[m];
    return e === u ? null : e;
  }
  get firstElementChild() {
    let { firstChild: e } = this;
    for (; e; ) {
      if (e.nodeType === M) return e;
      e = Pt(e);
    }
    return null;
  }
  get lastChild() {
    const e = this[T][de];
    switch (e.nodeType) {
      case At:
        return e[Ie];
      case be:
        return null;
    }
    return e === this ? null : e;
  }
  get lastElementChild() {
    let { lastChild: e } = this;
    for (; e; ) {
      if (e.nodeType === M) return e;
      e = wu(e);
    }
    return null;
  }
  get childElementCount() {
    return this.children.length;
  }
  prepend(...e) {
    Gs(this, this.firstChild, e);
  }
  append(...e) {
    Gs(this, this[T], e);
  }
  replaceChildren(...e) {
    let { [m]: u, [T]: s } = this;
    for (; u !== s && u.nodeType === be; ) u = u[m];
    for (; u !== s; ) {
      const n = Oe(u)[m];
      u.remove(), (u = n);
    }
    e.length && Gs(this, s, e);
  }
  getElementsByClassName(e) {
    const u = new ot();
    let { [m]: s, [T]: n } = this;
    for (; s !== n; )
      s.nodeType === M &&
        s.hasAttribute('class') &&
        s.classList.has(e) &&
        u.push(s),
        (s = s[m]);
    return u;
  }
  getElementsByTagName(e) {
    const u = new ot();
    let { [m]: s, [T]: n } = this;
    for (; s !== n; )
      s.nodeType === M && (s.localName === e || An(s) === e) && u.push(s),
        (s = s[m]);
    return u;
  }
  querySelector(e) {
    const u = In(this, e);
    let { [m]: s, [T]: n } = this;
    for (; s !== n; ) {
      if (s.nodeType === M && u(s)) return s;
      s = s.nodeType === M && s.localName === 'template' ? s[T] : s[m];
    }
    return null;
  }
  querySelectorAll(e) {
    const u = In(this, e),
      s = new ot();
    let { [m]: n, [T]: r } = this;
    for (; n !== r; )
      n.nodeType === M && u(n) && s.push(n),
        (n = n.nodeType === M && n.localName === 'template' ? n[T] : n[m]);
    return s;
  }
  appendChild(e) {
    return this.insertBefore(e, this[T]);
  }
  contains(e) {
    let u = e;
    for (; u && u !== this; ) u = u.parentNode;
    return u === this;
  }
  insertBefore(e, u = null) {
    if (e === u) return e;
    if (e === this) throw new Error('unable to append a node to itself');
    const s = u || this[T];
    switch (e.nodeType) {
      case M:
        e.remove(), (e.parentNode = this), Za(s[de], e, s), Tu(e, null), _n(e);
        break;
      case pt: {
        let { [ye]: n, firstChild: r, lastChild: i } = e;
        if (r) {
          Ya(s[de], r, i, s), et(e, e[T]), n && n.replaceChildren();
          do (r.parentNode = this), Tu(r, null), r.nodeType === M && _n(r);
          while (r !== i && (r = Pt(r)));
        }
        break;
      }
      case Te:
      case bt:
      case ct:
        e.remove();
      default:
        (e.parentNode = this), xs(s[de], e, s), Tu(e, null);
        break;
    }
    return e;
  }
  normalize() {
    let { [m]: e, [T]: u } = this;
    for (; e !== u; ) {
      const { [m]: s, [de]: n, nodeType: r } = e;
      r === Te &&
        (e[U]
          ? n &&
            n.nodeType === Te &&
            ((n.textContent += e.textContent), e.remove())
          : e.remove()),
        (e = s);
    }
  }
  removeChild(e) {
    if (e.parentNode !== this) throw new Error('node is not a child');
    return e.remove(), e;
  }
  replaceChild(e, u) {
    const s = Oe(u)[m];
    return u.remove(), this.insertBefore(e, s), u;
  }
}
class ar extends Po {
  getElementById(e) {
    let { [m]: u, [T]: s } = this;
    for (; u !== s; ) {
      if (u.nodeType === M && u.id === e) return u;
      u = u[m];
    }
    return null;
  }
  cloneNode(e) {
    const { ownerDocument: u, constructor: s } = this,
      n = new s(u);
    if (e) {
      const { [T]: r } = n;
      for (const i of this.childNodes) n.insertBefore(i.cloneNode(e), r);
    }
    return n;
  }
  toString() {
    const { childNodes: e, localName: u } = this;
    return `<${u}>${e.join('')}</${u}>`;
  }
  toJSON() {
    const e = [];
    return _d(this, e), e;
  }
}
let or = class extends ar {
    constructor(e) {
      super(e, '#document-fragment', pt);
    }
  },
  fs = class qo extends $t {
    constructor(e, u, s = '', n = '') {
      super(e, '#document-type', au),
        (this.name = u),
        (this.publicId = s),
        (this.systemId = n);
    }
    cloneNode() {
      const { ownerDocument: e, name: u, publicId: s, systemId: n } = this;
      return new qo(e, u, s, n);
    }
    toString() {
      const { name: e, publicId: u, systemId: s } = this,
        n = 0 < u.length,
        r = [e];
      return (
        n && r.push('PUBLIC', `"${u}"`),
        s.length && (n || r.push('SYSTEM'), r.push(`"${s}"`)),
        `<!DOCTYPE ${r.join(' ')}>`
      );
    }
    toJSON() {
      const e = [];
      return ao(this, e), e;
    }
  };
const Bo = (t) => t.childNodes.join(''),
  Fo = (t, e) => {
    const { ownerDocument: u } = t,
      { constructor: s } = u,
      n = new s();
    n[Je] = u[Je];
    const { childNodes: r } = uo(n, _t(t), e);
    t.replaceChildren(...r.map(Vo, u));
  };
function Vo(t) {
  switch (((t.ownerDocument = this), t.nodeType)) {
    case M:
    case pt:
      t.childNodes.forEach(Vo, this);
      break;
  }
  return t;
}
const ss = (t) =>
    t
      .replace(/(([A-Z0-9])([A-Z0-9][a-z]))|(([a-z0-9]+)([A-Z]))/g, '$2$5-$3$6')
      .toLowerCase(),
  ns = new WeakMap(),
  js = (t) => `data-${ss(t)}`,
  wf = (t) => t.slice(5).replace(/-([a-z])/g, (e, u) => u.toUpperCase()),
  Af = {
    get(t, e) {
      if (e in t) return ns.get(t).getAttribute(js(e));
    },
    set(t, e, u) {
      return (t[e] = u), ns.get(t).setAttribute(js(e), u), !0;
    },
    deleteProperty(t, e) {
      return e in t && ns.get(t).removeAttribute(js(e)), delete t[e];
    },
  };
class Uo {
  constructor(e) {
    for (const { name: u, value: s } of e.attributes)
      /^data-/.test(u) && (this[wf(u)] = s);
    return ns.set(this, e), new Proxy(this, Af);
  }
}
Ae(Uo.prototype, null);
const { add: _f } = Set.prototype,
  gi = (t, e) => {
    for (const u of e) u && _f.call(t, u);
  },
  mu = ({ [ya]: t, value: e }) => {
    const u = t.getAttributeNode('class');
    u ? (u.value = e) : Nn(t, new Du(t.ownerDocument, 'class', e));
  };
class Nf extends Set {
  constructor(e) {
    super(), (this[ya] = e);
    const u = e.getAttributeNode('class');
    u && gi(this, u.value.split(/\s+/));
  }
  get length() {
    return this.size;
  }
  get value() {
    return [...this].join(' ');
  }
  add(...e) {
    gi(this, e), mu(this);
  }
  contains(e) {
    return this.has(e);
  }
  remove(...e) {
    for (const u of e) this.delete(u);
    mu(this);
  }
  toggle(e, u) {
    if (this.has(e)) {
      if (u) return !0;
      this.delete(e), mu(this);
    } else if (u || arguments.length === 1) return super.add(e), mu(this), !0;
    return !1;
  }
  replace(e, u) {
    return this.has(e) ? (this.delete(e), super.add(u), mu(this), !0) : !1;
  }
  supports() {
    return !0;
  }
}
const hs = new WeakMap(),
  Mn = (t) => [...t.keys()].filter((e) => e !== ye),
  ps = (t) => {
    const e = hs.get(t).getAttributeNode('style');
    if ((!e || e[is] || t.get(ye) !== e) && (t.clear(), e)) {
      t.set(ye, e);
      for (const u of e[U].split(/\s*;\s*/)) {
        let [s, ...n] = u.split(':');
        if (n.length > 0) {
          s = s.trim();
          const r = n.join(':').trim();
          s && r && t.set(s, r);
        }
      }
    }
    return e;
  },
  Wu = {
    get(t, e) {
      return e in Rf
        ? t[e]
        : (ps(t),
          e === 'length'
            ? Mn(t).length
            : /^\d+$/.test(e)
            ? Mn(t)[e]
            : t.get(ss(e)));
    },
    set(t, e, u) {
      if (e === 'cssText') t[e] = u;
      else {
        let s = ps(t);
        if ((u == null ? t.delete(ss(e)) : t.set(ss(e), u), !s)) {
          const n = hs.get(t);
          (s = n.ownerDocument.createAttribute('style')),
            n.setAttributeNode(s),
            t.set(ye, s);
        }
        (s[is] = !1), (s[U] = t.toString());
      }
      return !0;
    },
  };
let $o = class extends Map {
  constructor(e) {
    return super(), hs.set(this, e), new Proxy(this, Wu);
  }
  get cssText() {
    return this.toString();
  }
  set cssText(e) {
    hs.get(this).setAttribute('style', e);
  }
  getPropertyValue(e) {
    const u = this[ye];
    return Wu.get(u, e);
  }
  setProperty(e, u) {
    const s = this[ye];
    Wu.set(s, e, u);
  }
  removeProperty(e) {
    const u = this[ye];
    Wu.set(u, e, null);
  }
  [Symbol.iterator]() {
    const e = this[ye];
    ps(e);
    const u = Mn(e),
      { length: s } = u;
    let n = 0;
    return {
      next() {
        const r = n === s;
        return { done: r, value: r ? null : u[n++] };
      },
    };
  }
  get [ye]() {
    return this;
  }
  toString() {
    const e = this[ye];
    ps(e);
    const u = [];
    return e.forEach(Df, u), u.join(';');
  }
};
const { prototype: Rf } = $o;
function Df(t, e) {
  e !== ye && this.push(`${e}:${t}`);
}
const mi = 3,
  Si = 2,
  xi = 1,
  yi = 0;
function Lf(t) {
  return t.currentTarget;
}
class Vt {
  static get BUBBLING_PHASE() {
    return mi;
  }
  static get AT_TARGET() {
    return Si;
  }
  static get CAPTURING_PHASE() {
    return xi;
  }
  static get NONE() {
    return yi;
  }
  constructor(e, u = {}) {
    (this.type = e),
      (this.bubbles = !!u.bubbles),
      (this.cancelBubble = !1),
      (this._stopImmediatePropagationFlag = !1),
      (this.cancelable = !!u.cancelable),
      (this.eventPhase = this.NONE),
      (this.timeStamp = Date.now()),
      (this.defaultPrevented = !1),
      (this.originalTarget = null),
      (this.returnValue = null),
      (this.srcElement = null),
      (this.target = null),
      (this._path = []);
  }
  get BUBBLING_PHASE() {
    return mi;
  }
  get AT_TARGET() {
    return Si;
  }
  get CAPTURING_PHASE() {
    return xi;
  }
  get NONE() {
    return yi;
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
  composedPath() {
    return this._path.map(Lf);
  }
  stopPropagation() {
    this.cancelBubble = !0;
  }
  stopImmediatePropagation() {
    this.stopPropagation(), (this._stopImmediatePropagationFlag = !0);
  }
}
class Ho extends Array {
  constructor(e) {
    super(), (this.ownerElement = e);
  }
  getNamedItem(e) {
    return this.ownerElement.getAttributeNode(e);
  }
  setNamedItem(e) {
    this.ownerElement.setAttributeNode(e), this.unshift(e);
  }
  removeNamedItem(e) {
    const u = this.getNamedItem(e);
    this.ownerElement.removeAttribute(e), this.splice(this.indexOf(u), 1);
  }
  item(e) {
    return e < this.length ? this[e] : null;
  }
  getNamedItemNS(e, u) {
    return this.getNamedItem(u);
  }
  setNamedItemNS(e, u) {
    return this.setNamedItem(u);
  }
  removeNamedItemNS(e, u) {
    return this.removeNamedItem(u);
  }
}
let cr = class extends ar {
  constructor(e) {
    super(e.ownerDocument, '#shadow-root', pt), (this.host = e);
  }
  get innerHTML() {
    return Bo(this);
  }
  set innerHTML(e) {
    Fo(this, e);
  }
};
const If = {
    get(t, e) {
      return e in t ? t[e] : t.find(({ name: u }) => u === e);
    },
  },
  Ti = (t, e, u) => {
    if ('ownerSVGElement' in e) {
      const s = t.createElementNS(ls, u);
      return (s.ownerSVGElement = e.ownerSVGElement), s;
    }
    return t.createElement(u);
  },
  Mf = ({ localName: t, ownerDocument: e }) => e[ou].voidElements.test(t);
let Mu = class extends Po {
  constructor(e, u) {
    super(e, u, M), (this[Qt] = null), (this[Os] = null), (this[ks] = null);
  }
  get isConnected() {
    return fo(this);
  }
  get parentElement() {
    return ho(this);
  }
  get previousSibling() {
    return wu(this);
  }
  get nextSibling() {
    return Pt(this);
  }
  get namespaceURI() {
    return 'http://www.w3.org/1999/xhtml';
  }
  get previousElementSibling() {
    return po(this);
  }
  get nextElementSibling() {
    return tr(this);
  }
  before(...e) {
    bo(this, e);
  }
  after(...e) {
    go(this, e);
  }
  replaceWith(...e) {
    sr(this, e);
  }
  remove() {
    mo(this[de], this, this[T][m]);
  }
  get id() {
    return g.get(this, 'id');
  }
  set id(e) {
    g.set(this, 'id', e);
  }
  get className() {
    return this.classList.value;
  }
  set className(e) {
    const { classList: u } = this;
    u.clear(), u.add(...kt(e).split(/\s+/));
  }
  get nodeName() {
    return An(this);
  }
  get tagName() {
    return An(this);
  }
  get classList() {
    return this[Qt] || (this[Qt] = new Nf(this));
  }
  get dataset() {
    return this[Os] || (this[Os] = new Uo(this));
  }
  getBoundingClientRect() {
    return {
      x: 0,
      y: 0,
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    };
  }
  get nonce() {
    return g.get(this, 'nonce');
  }
  set nonce(e) {
    g.set(this, 'nonce', e);
  }
  get style() {
    return this[ks] || (this[ks] = new $o(this));
  }
  get tabIndex() {
    return wt.get(this, 'tabindex') || -1;
  }
  set tabIndex(e) {
    wt.set(this, 'tabindex', e);
  }
  get slot() {
    return g.get(this, 'slot');
  }
  set slot(e) {
    g.set(this, 'slot', e);
  }
  get innerText() {
    const e = [];
    let { [m]: u, [T]: s } = this;
    for (; u !== s; )
      u.nodeType === Te
        ? e.push(u.textContent.replace(/\s+/g, ' '))
        : e.length &&
          u[m] != s &&
          ud.has(u.tagName) &&
          e.push(`
`),
        (u = u[m]);
    return e.join('');
  }
  get textContent() {
    const e = [];
    let { [m]: u, [T]: s } = this;
    for (; u !== s; ) {
      const n = u.nodeType;
      (n === Te || n === ct) && e.push(u.textContent), (u = u[m]);
    }
    return e.join('');
  }
  set textContent(e) {
    this.replaceChildren(),
      e != null && e !== '' && this.appendChild(new Iu(this.ownerDocument, e));
  }
  get innerHTML() {
    return Bo(this);
  }
  set innerHTML(e) {
    Fo(this, e);
  }
  get outerHTML() {
    return this.toString();
  }
  set outerHTML(e) {
    const u = this.ownerDocument.createElement('');
    (u.innerHTML = e), this.replaceWith(...u.childNodes);
  }
  get attributes() {
    const e = new Ho(this);
    let u = this[m];
    for (; u.nodeType === be; ) e.push(u), (u = u[m]);
    return new Proxy(e, If);
  }
  focus() {
    this.dispatchEvent(new Vt('focus'));
  }
  getAttribute(e) {
    if (e === 'class') return this.className;
    const u = this.getAttributeNode(e);
    return u && (_t(this) ? u.value : er(u.value));
  }
  getAttributeNode(e) {
    let u = this[m];
    for (; u.nodeType === be; ) {
      if (u.name === e) return u;
      u = u[m];
    }
    return null;
  }
  getAttributeNames() {
    const e = new ot();
    let u = this[m];
    for (; u.nodeType === be; ) e.push(u.name), (u = u[m]);
    return e;
  }
  hasAttribute(e) {
    return !!this.getAttributeNode(e);
  }
  hasAttributes() {
    return this[m].nodeType === be;
  }
  removeAttribute(e) {
    e === 'class' && this[Qt] && this[Qt].clear();
    let u = this[m];
    for (; u.nodeType === be; ) {
      if (u.name === e) {
        ai(this, u);
        return;
      }
      u = u[m];
    }
  }
  removeAttributeNode(e) {
    let u = this[m];
    for (; u.nodeType === be; ) {
      if (u === e) {
        ai(this, u);
        return;
      }
      u = u[m];
    }
  }
  setAttribute(e, u) {
    if (e === 'class') this.className = u;
    else {
      const s = this.getAttributeNode(e);
      s ? (s.value = u) : Nn(this, new Du(this.ownerDocument, e, u));
    }
  }
  setAttributeNode(e) {
    const { name: u } = e,
      s = this.getAttributeNode(u);
    if (s !== e) {
      s && this.removeAttributeNode(s);
      const { ownerElement: n } = e;
      n && n.removeAttributeNode(e), Nn(this, e);
    }
    return s;
  }
  toggleAttribute(e, u) {
    return this.hasAttribute(e)
      ? u
        ? !0
        : (this.removeAttribute(e), !1)
      : u || arguments.length === 1
      ? (this.setAttribute(e, ''), !0)
      : !1;
  }
  get shadowRoot() {
    if (Et.has(this)) {
      const { mode: e, shadowRoot: u } = Et.get(this);
      if (e === 'open') return u;
    }
    return null;
  }
  attachShadow(e) {
    if (Et.has(this)) throw new Error('operation not supported');
    const u = new cr(this);
    return Et.set(this, { mode: e.mode, shadowRoot: u }), u;
  }
  matches(e) {
    return vf(this, e);
  }
  closest(e) {
    let u = this;
    const s = In(u, e);
    for (; u && !s(u); ) u = u.parentElement;
    return u;
  }
  insertAdjacentElement(e, u) {
    const { parentElement: s } = this;
    switch (e) {
      case 'beforebegin':
        if (s) {
          s.insertBefore(u, this);
          break;
        }
        return null;
      case 'afterbegin':
        this.insertBefore(u, this.firstChild);
        break;
      case 'beforeend':
        this.insertBefore(u, null);
        break;
      case 'afterend':
        if (s) {
          s.insertBefore(u, this.nextSibling);
          break;
        }
        return null;
    }
    return u;
  }
  insertAdjacentHTML(e, u) {
    this.insertAdjacentElement(e, eo(this.ownerDocument, u));
  }
  insertAdjacentText(e, u) {
    const s = this.ownerDocument.createTextNode(u);
    this.insertAdjacentElement(e, s);
  }
  cloneNode(e = !1) {
    const { ownerDocument: u, localName: s } = this,
      n = (l) => {
        (l.parentNode = i), et(a, l), (a = l);
      },
      r = Ti(u, this, s);
    let i = r,
      a = r,
      { [m]: o, [T]: c } = this;
    for (; o !== c && (e || o.nodeType === be); ) {
      switch (o.nodeType) {
        case At:
          et(a, i[T]), (a = i[T]), (i = i.parentNode);
          break;
        case M: {
          const l = Ti(u, o, o.localName);
          n(l), (i = l);
          break;
        }
        case be: {
          const l = o.cloneNode(e);
          (l.ownerElement = i), n(l);
          break;
        }
        case Te:
        case bt:
        case ct:
          n(o.cloneNode(e));
          break;
      }
      o = o[m];
    }
    return et(a, r[T]), r;
  }
  toString() {
    const e = [],
      { [T]: u } = this;
    let s = { [m]: this },
      n = !1;
    do
      switch (((s = s[m]), s.nodeType)) {
        case be: {
          const r = ' ' + s;
          switch (r) {
            case ' id':
            case ' class':
            case ' style':
              break;
            default:
              e.push(r);
          }
          break;
        }
        case At: {
          const r = s[Ie];
          n
            ? ('ownerSVGElement' in r
                ? e.push(' />')
                : Mf(r)
                ? e.push(_t(r) ? '>' : ' />')
                : e.push(`></${r.localName}>`),
              (n = !1))
            : e.push(`</${r.localName}>`);
          break;
        }
        case M:
          n && e.push('>'),
            s.toString !== this.toString
              ? (e.push(s.toString()), (s = s[T]), (n = !1))
              : (e.push(`<${s.localName}`), (n = !0));
          break;
        case Te:
        case bt:
        case ct:
          e.push((n ? '>' : '') + s), (n = !1);
          break;
      }
    while (s !== u);
    return e.join('');
  }
  toJSON() {
    const e = [];
    return oo(this, e), e;
  }
  getAttributeNS(e, u) {
    return this.getAttribute(u);
  }
  getElementsByTagNameNS(e, u) {
    return this.getElementsByTagName(u);
  }
  hasAttributeNS(e, u) {
    return this.hasAttribute(u);
  }
  removeAttributeNS(e, u) {
    this.removeAttribute(u);
  }
  setAttributeNS(e, u, s) {
    this.setAttribute(u, s);
  }
  setAttributeNodeNS(e) {
    return this.setAttributeNode(e);
  }
};
const zs = new WeakMap(),
  Of = {
    get(t, e) {
      return t[e];
    },
    set(t, e, u) {
      return (t[e] = u), !0;
    },
  };
let Au = class extends Mu {
  constructor(e, u, s = null) {
    super(e, u), (this.ownerSVGElement = s);
  }
  get className() {
    return (
      zs.has(this) || zs.set(this, new Proxy({ baseVal: '', animVal: '' }, Of)),
      zs.get(this)
    );
  }
  set className(e) {
    const { classList: u } = this;
    u.clear(), u.add(...kt(e).split(/\s+/));
  }
  get namespaceURI() {
    return 'http://www.w3.org/2000/svg';
  }
  getAttribute(e) {
    return e === 'class'
      ? [...this.classList].join(' ')
      : super.getAttribute(e);
  }
  setAttribute(e, u) {
    if (e === 'class') this.className = u;
    else if (e === 'style') {
      const { className: s } = this;
      s.baseVal = s.animVal = u;
    }
    super.setAttribute(e, u);
  }
};
const Be = () => {
  throw new TypeError('Illegal constructor');
};
function lr() {
  Be();
}
Ae(lr, Du);
lr.prototype = Du.prototype;
function dr() {
  Be();
}
Ae(dr, nr);
dr.prototype = nr.prototype;
function fr() {
  Be();
}
Ae(fr, Lu);
fr.prototype = Lu.prototype;
function hr() {
  Be();
}
Ae(hr, rr);
hr.prototype = rr.prototype;
function pr() {
  Be();
}
Ae(pr, or);
pr.prototype = or.prototype;
function br() {
  Be();
}
Ae(br, fs);
br.prototype = fs.prototype;
function gr() {
  Be();
}
Ae(gr, Mu);
gr.prototype = Mu.prototype;
function mr() {
  Be();
}
Ae(mr, $t);
mr.prototype = $t.prototype;
function Sr() {
  Be();
}
Ae(Sr, cr);
Sr.prototype = cr.prototype;
function xr() {
  Be();
}
Ae(xr, Iu);
xr.prototype = Iu.prototype;
function yr() {
  Be();
}
Ae(yr, Au);
yr.prototype = Au.prototype;
const kf = {
    Attr: lr,
    CDATASection: dr,
    CharacterData: fr,
    Comment: hr,
    DocumentFragment: pr,
    DocumentType: br,
    Element: gr,
    Node: mr,
    ShadowRoot: Sr,
    Text: xr,
    SVGElement: yr,
  },
  Su = new WeakMap(),
  d = {
    get(t, e) {
      return (Su.has(t) && Su.get(t)[e]) || null;
    },
    set(t, e, u) {
      Su.has(t) || Su.set(t, {});
      const s = Su.get(t),
        n = e.slice(2);
      s[e] && t.removeEventListener(n, s[e], !1),
        (s[e] = u) && t.addEventListener(n, u, !1);
    },
  };
class x extends Mu {
  static get observedAttributes() {
    return [];
  }
  constructor(e = null, u = '') {
    super(e, u);
    const s = !e;
    let n;
    if (s) {
      const { constructor: r } = this;
      if (!tu.has(r))
        throw new Error('unable to initialize this Custom Element');
      ({ ownerDocument: e, localName: u, options: n } = tu.get(r));
    }
    if (e[yu]) {
      const { element: r, values: i } = e[yu];
      e[yu] = null;
      for (const [a, o] of i) r[a] = o;
      return r;
    }
    s &&
      ((this.ownerDocument = this[T].ownerDocument = e),
      (this.localName = u),
      Ft.set(this, { connected: !1 }),
      n.is && this.setAttribute('is', n.is));
  }
  blur() {
    this.dispatchEvent(new Vt('blur'));
  }
  click() {
    const e = new Vt('click', { bubbles: !0, cancelable: !0 });
    (e.button = 0), this.dispatchEvent(e);
  }
  get accessKeyLabel() {
    const { accessKey: e } = this;
    return e && `Alt+Shift+${e}`;
  }
  get isContentEditable() {
    return this.hasAttribute('contenteditable');
  }
  get contentEditable() {
    return P.get(this, 'contenteditable');
  }
  set contentEditable(e) {
    P.set(this, 'contenteditable', e);
  }
  get draggable() {
    return P.get(this, 'draggable');
  }
  set draggable(e) {
    P.set(this, 'draggable', e);
  }
  get hidden() {
    return P.get(this, 'hidden');
  }
  set hidden(e) {
    P.set(this, 'hidden', e);
  }
  get spellcheck() {
    return P.get(this, 'spellcheck');
  }
  set spellcheck(e) {
    P.set(this, 'spellcheck', e);
  }
  get accessKey() {
    return g.get(this, 'accesskey');
  }
  set accessKey(e) {
    g.set(this, 'accesskey', e);
  }
  get dir() {
    return g.get(this, 'dir');
  }
  set dir(e) {
    g.set(this, 'dir', e);
  }
  get lang() {
    return g.get(this, 'lang');
  }
  set lang(e) {
    g.set(this, 'lang', e);
  }
  get title() {
    return g.get(this, 'title');
  }
  set title(e) {
    g.set(this, 'title', e);
  }
  get onabort() {
    return d.get(this, 'onabort');
  }
  set onabort(e) {
    d.set(this, 'onabort', e);
  }
  get onblur() {
    return d.get(this, 'onblur');
  }
  set onblur(e) {
    d.set(this, 'onblur', e);
  }
  get oncancel() {
    return d.get(this, 'oncancel');
  }
  set oncancel(e) {
    d.set(this, 'oncancel', e);
  }
  get oncanplay() {
    return d.get(this, 'oncanplay');
  }
  set oncanplay(e) {
    d.set(this, 'oncanplay', e);
  }
  get oncanplaythrough() {
    return d.get(this, 'oncanplaythrough');
  }
  set oncanplaythrough(e) {
    d.set(this, 'oncanplaythrough', e);
  }
  get onchange() {
    return d.get(this, 'onchange');
  }
  set onchange(e) {
    d.set(this, 'onchange', e);
  }
  get onclick() {
    return d.get(this, 'onclick');
  }
  set onclick(e) {
    d.set(this, 'onclick', e);
  }
  get onclose() {
    return d.get(this, 'onclose');
  }
  set onclose(e) {
    d.set(this, 'onclose', e);
  }
  get oncontextmenu() {
    return d.get(this, 'oncontextmenu');
  }
  set oncontextmenu(e) {
    d.set(this, 'oncontextmenu', e);
  }
  get oncuechange() {
    return d.get(this, 'oncuechange');
  }
  set oncuechange(e) {
    d.set(this, 'oncuechange', e);
  }
  get ondblclick() {
    return d.get(this, 'ondblclick');
  }
  set ondblclick(e) {
    d.set(this, 'ondblclick', e);
  }
  get ondrag() {
    return d.get(this, 'ondrag');
  }
  set ondrag(e) {
    d.set(this, 'ondrag', e);
  }
  get ondragend() {
    return d.get(this, 'ondragend');
  }
  set ondragend(e) {
    d.set(this, 'ondragend', e);
  }
  get ondragenter() {
    return d.get(this, 'ondragenter');
  }
  set ondragenter(e) {
    d.set(this, 'ondragenter', e);
  }
  get ondragleave() {
    return d.get(this, 'ondragleave');
  }
  set ondragleave(e) {
    d.set(this, 'ondragleave', e);
  }
  get ondragover() {
    return d.get(this, 'ondragover');
  }
  set ondragover(e) {
    d.set(this, 'ondragover', e);
  }
  get ondragstart() {
    return d.get(this, 'ondragstart');
  }
  set ondragstart(e) {
    d.set(this, 'ondragstart', e);
  }
  get ondrop() {
    return d.get(this, 'ondrop');
  }
  set ondrop(e) {
    d.set(this, 'ondrop', e);
  }
  get ondurationchange() {
    return d.get(this, 'ondurationchange');
  }
  set ondurationchange(e) {
    d.set(this, 'ondurationchange', e);
  }
  get onemptied() {
    return d.get(this, 'onemptied');
  }
  set onemptied(e) {
    d.set(this, 'onemptied', e);
  }
  get onended() {
    return d.get(this, 'onended');
  }
  set onended(e) {
    d.set(this, 'onended', e);
  }
  get onerror() {
    return d.get(this, 'onerror');
  }
  set onerror(e) {
    d.set(this, 'onerror', e);
  }
  get onfocus() {
    return d.get(this, 'onfocus');
  }
  set onfocus(e) {
    d.set(this, 'onfocus', e);
  }
  get oninput() {
    return d.get(this, 'oninput');
  }
  set oninput(e) {
    d.set(this, 'oninput', e);
  }
  get oninvalid() {
    return d.get(this, 'oninvalid');
  }
  set oninvalid(e) {
    d.set(this, 'oninvalid', e);
  }
  get onkeydown() {
    return d.get(this, 'onkeydown');
  }
  set onkeydown(e) {
    d.set(this, 'onkeydown', e);
  }
  get onkeypress() {
    return d.get(this, 'onkeypress');
  }
  set onkeypress(e) {
    d.set(this, 'onkeypress', e);
  }
  get onkeyup() {
    return d.get(this, 'onkeyup');
  }
  set onkeyup(e) {
    d.set(this, 'onkeyup', e);
  }
  get onload() {
    return d.get(this, 'onload');
  }
  set onload(e) {
    d.set(this, 'onload', e);
  }
  get onloadeddata() {
    return d.get(this, 'onloadeddata');
  }
  set onloadeddata(e) {
    d.set(this, 'onloadeddata', e);
  }
  get onloadedmetadata() {
    return d.get(this, 'onloadedmetadata');
  }
  set onloadedmetadata(e) {
    d.set(this, 'onloadedmetadata', e);
  }
  get onloadstart() {
    return d.get(this, 'onloadstart');
  }
  set onloadstart(e) {
    d.set(this, 'onloadstart', e);
  }
  get onmousedown() {
    return d.get(this, 'onmousedown');
  }
  set onmousedown(e) {
    d.set(this, 'onmousedown', e);
  }
  get onmouseenter() {
    return d.get(this, 'onmouseenter');
  }
  set onmouseenter(e) {
    d.set(this, 'onmouseenter', e);
  }
  get onmouseleave() {
    return d.get(this, 'onmouseleave');
  }
  set onmouseleave(e) {
    d.set(this, 'onmouseleave', e);
  }
  get onmousemove() {
    return d.get(this, 'onmousemove');
  }
  set onmousemove(e) {
    d.set(this, 'onmousemove', e);
  }
  get onmouseout() {
    return d.get(this, 'onmouseout');
  }
  set onmouseout(e) {
    d.set(this, 'onmouseout', e);
  }
  get onmouseover() {
    return d.get(this, 'onmouseover');
  }
  set onmouseover(e) {
    d.set(this, 'onmouseover', e);
  }
  get onmouseup() {
    return d.get(this, 'onmouseup');
  }
  set onmouseup(e) {
    d.set(this, 'onmouseup', e);
  }
  get onmousewheel() {
    return d.get(this, 'onmousewheel');
  }
  set onmousewheel(e) {
    d.set(this, 'onmousewheel', e);
  }
  get onpause() {
    return d.get(this, 'onpause');
  }
  set onpause(e) {
    d.set(this, 'onpause', e);
  }
  get onplay() {
    return d.get(this, 'onplay');
  }
  set onplay(e) {
    d.set(this, 'onplay', e);
  }
  get onplaying() {
    return d.get(this, 'onplaying');
  }
  set onplaying(e) {
    d.set(this, 'onplaying', e);
  }
  get onprogress() {
    return d.get(this, 'onprogress');
  }
  set onprogress(e) {
    d.set(this, 'onprogress', e);
  }
  get onratechange() {
    return d.get(this, 'onratechange');
  }
  set onratechange(e) {
    d.set(this, 'onratechange', e);
  }
  get onreset() {
    return d.get(this, 'onreset');
  }
  set onreset(e) {
    d.set(this, 'onreset', e);
  }
  get onresize() {
    return d.get(this, 'onresize');
  }
  set onresize(e) {
    d.set(this, 'onresize', e);
  }
  get onscroll() {
    return d.get(this, 'onscroll');
  }
  set onscroll(e) {
    d.set(this, 'onscroll', e);
  }
  get onseeked() {
    return d.get(this, 'onseeked');
  }
  set onseeked(e) {
    d.set(this, 'onseeked', e);
  }
  get onseeking() {
    return d.get(this, 'onseeking');
  }
  set onseeking(e) {
    d.set(this, 'onseeking', e);
  }
  get onselect() {
    return d.get(this, 'onselect');
  }
  set onselect(e) {
    d.set(this, 'onselect', e);
  }
  get onshow() {
    return d.get(this, 'onshow');
  }
  set onshow(e) {
    d.set(this, 'onshow', e);
  }
  get onstalled() {
    return d.get(this, 'onstalled');
  }
  set onstalled(e) {
    d.set(this, 'onstalled', e);
  }
  get onsubmit() {
    return d.get(this, 'onsubmit');
  }
  set onsubmit(e) {
    d.set(this, 'onsubmit', e);
  }
  get onsuspend() {
    return d.get(this, 'onsuspend');
  }
  set onsuspend(e) {
    d.set(this, 'onsuspend', e);
  }
  get ontimeupdate() {
    return d.get(this, 'ontimeupdate');
  }
  set ontimeupdate(e) {
    d.set(this, 'ontimeupdate', e);
  }
  get ontoggle() {
    return d.get(this, 'ontoggle');
  }
  set ontoggle(e) {
    d.set(this, 'ontoggle', e);
  }
  get onvolumechange() {
    return d.get(this, 'onvolumechange');
  }
  set onvolumechange(e) {
    d.set(this, 'onvolumechange', e);
  }
  get onwaiting() {
    return d.get(this, 'onwaiting');
  }
  set onwaiting(e) {
    d.set(this, 'onwaiting', e);
  }
  get onauxclick() {
    return d.get(this, 'onauxclick');
  }
  set onauxclick(e) {
    d.set(this, 'onauxclick', e);
  }
  get ongotpointercapture() {
    return d.get(this, 'ongotpointercapture');
  }
  set ongotpointercapture(e) {
    d.set(this, 'ongotpointercapture', e);
  }
  get onlostpointercapture() {
    return d.get(this, 'onlostpointercapture');
  }
  set onlostpointercapture(e) {
    d.set(this, 'onlostpointercapture', e);
  }
  get onpointercancel() {
    return d.get(this, 'onpointercancel');
  }
  set onpointercancel(e) {
    d.set(this, 'onpointercancel', e);
  }
  get onpointerdown() {
    return d.get(this, 'onpointerdown');
  }
  set onpointerdown(e) {
    d.set(this, 'onpointerdown', e);
  }
  get onpointerenter() {
    return d.get(this, 'onpointerenter');
  }
  set onpointerenter(e) {
    d.set(this, 'onpointerenter', e);
  }
  get onpointerleave() {
    return d.get(this, 'onpointerleave');
  }
  set onpointerleave(e) {
    d.set(this, 'onpointerleave', e);
  }
  get onpointermove() {
    return d.get(this, 'onpointermove');
  }
  set onpointermove(e) {
    d.set(this, 'onpointermove', e);
  }
  get onpointerout() {
    return d.get(this, 'onpointerout');
  }
  set onpointerout(e) {
    d.set(this, 'onpointerout', e);
  }
  get onpointerover() {
    return d.get(this, 'onpointerover');
  }
  set onpointerover(e) {
    d.set(this, 'onpointerover', e);
  }
  get onpointerup() {
    return d.get(this, 'onpointerup');
  }
  set onpointerup(e) {
    d.set(this, 'onpointerup', e);
  }
}
const Go = 'template';
class jo extends x {
  constructor(e) {
    super(e, Go);
    const u = this.ownerDocument.createDocumentFragment();
    (this[$u] = u)[ye] = this;
  }
  get content() {
    if (this.hasChildNodes() && !this[$u].hasChildNodes())
      for (const e of this.childNodes) this[$u].appendChild(e.cloneNode(!0));
    return this[$u];
  }
}
ae(Go, jo);
class Pf extends x {
  constructor(e, u = 'html') {
    super(e, u);
  }
}
const { toString: qf } = x.prototype;
class vs extends x {
  get innerHTML() {
    return this.textContent;
  }
  set innerHTML(e) {
    this.textContent = e;
  }
  toString() {
    return qf
      .call(this.cloneNode())
      .replace('><', () => `>${this.textContent}<`);
  }
}
const zo = 'script';
class Wo extends vs {
  constructor(e, u = zo) {
    super(e, u);
  }
  get type() {
    return g.get(this, 'type');
  }
  set type(e) {
    g.set(this, 'type', e);
  }
  get src() {
    return g.get(this, 'src');
  }
  set src(e) {
    g.set(this, 'src', e);
  }
  get defer() {
    return P.get(this, 'defer');
  }
  set defer(e) {
    P.set(this, 'defer', e);
  }
  get crossOrigin() {
    return g.get(this, 'crossorigin');
  }
  set crossOrigin(e) {
    g.set(this, 'crossorigin', e);
  }
  get nomodule() {
    return P.get(this, 'nomodule');
  }
  set nomodule(e) {
    P.set(this, 'nomodule', e);
  }
  get referrerPolicy() {
    return g.get(this, 'referrerpolicy');
  }
  set referrerPolicy(e) {
    g.set(this, 'referrerpolicy', e);
  }
  get nonce() {
    return g.get(this, 'nonce');
  }
  set nonce(e) {
    g.set(this, 'nonce', e);
  }
  get async() {
    return P.get(this, 'async');
  }
  set async(e) {
    P.set(this, 'async', e);
  }
  get text() {
    return this.textContent;
  }
  set text(e) {
    this.textContent = e;
  }
}
ae(zo, Wo);
class Bf extends x {
  constructor(e, u = 'frame') {
    super(e, u);
  }
}
const Ko = 'iframe';
class Xo extends x {
  constructor(e, u = Ko) {
    super(e, u);
  }
  get src() {
    return g.get(this, 'src');
  }
  set src(e) {
    g.set(this, 'src', e);
  }
  get srcdoc() {
    return g.get(this, 'srcdoc');
  }
  set srcdoc(e) {
    g.set(this, 'srcdoc', e);
  }
  get name() {
    return g.get(this, 'name');
  }
  set name(e) {
    g.set(this, 'name', e);
  }
  get allow() {
    return g.get(this, 'allow');
  }
  set allow(e) {
    g.set(this, 'allow', e);
  }
  get allowFullscreen() {
    return P.get(this, 'allowfullscreen');
  }
  set allowFullscreen(e) {
    P.set(this, 'allowfullscreen', e);
  }
  get referrerPolicy() {
    return g.get(this, 'referrerpolicy');
  }
  set referrerPolicy(e) {
    g.set(this, 'referrerpolicy', e);
  }
  get loading() {
    return g.get(this, 'loading');
  }
  set loading(e) {
    g.set(this, 'loading', e);
  }
}
ae(Ko, Xo);
class Ff extends x {
  constructor(e, u = 'object') {
    super(e, u);
  }
}
class Vf extends x {
  constructor(e, u = 'head') {
    super(e, u);
  }
}
class Uf extends x {
  constructor(e, u = 'body') {
    super(e, u);
  }
}
var K = {},
  Ws = {},
  Ks = {},
  Xs = {},
  Js = {},
  Ci;
function Jo() {
  if (Ci) return Js;
  Ci = 1;
  var t = {};
  return (
    (t.StyleSheet = function () {
      this.parentStyleSheet = null;
    }),
    (Js.StyleSheet = t.StyleSheet),
    Js
  );
}
var Zs = {},
  Ys = {},
  vi;
function Fe() {
  if (vi) return Ys;
  vi = 1;
  var t = {};
  return (
    (t.CSSRule = function () {
      (this.parentRule = null), (this.parentStyleSheet = null);
    }),
    (t.CSSRule.UNKNOWN_RULE = 0),
    (t.CSSRule.STYLE_RULE = 1),
    (t.CSSRule.CHARSET_RULE = 2),
    (t.CSSRule.IMPORT_RULE = 3),
    (t.CSSRule.MEDIA_RULE = 4),
    (t.CSSRule.FONT_FACE_RULE = 5),
    (t.CSSRule.PAGE_RULE = 6),
    (t.CSSRule.KEYFRAMES_RULE = 7),
    (t.CSSRule.KEYFRAME_RULE = 8),
    (t.CSSRule.MARGIN_RULE = 9),
    (t.CSSRule.NAMESPACE_RULE = 10),
    (t.CSSRule.COUNTER_STYLE_RULE = 11),
    (t.CSSRule.SUPPORTS_RULE = 12),
    (t.CSSRule.DOCUMENT_RULE = 13),
    (t.CSSRule.FONT_FEATURE_VALUES_RULE = 14),
    (t.CSSRule.VIEWPORT_RULE = 15),
    (t.CSSRule.REGION_STYLE_RULE = 16),
    (t.CSSRule.prototype = { constructor: t.CSSRule }),
    (Ys.CSSRule = t.CSSRule),
    Ys
  );
}
var Ei;
function Es() {
  if (Ei) return Zs;
  Ei = 1;
  var t = {
    CSSStyleDeclaration: fu().CSSStyleDeclaration,
    CSSRule: Fe().CSSRule,
  };
  return (
    (t.CSSStyleRule = function () {
      t.CSSRule.call(this),
        (this.selectorText = ''),
        (this.style = new t.CSSStyleDeclaration()),
        (this.style.parentRule = this);
    }),
    (t.CSSStyleRule.prototype = new t.CSSRule()),
    (t.CSSStyleRule.prototype.constructor = t.CSSStyleRule),
    (t.CSSStyleRule.prototype.type = 1),
    Object.defineProperty(t.CSSStyleRule.prototype, 'cssText', {
      get: function () {
        var e;
        return (
          this.selectorText
            ? (e = this.selectorText + ' {' + this.style.cssText + '}')
            : (e = ''),
          e
        );
      },
      set: function (e) {
        var u = t.CSSStyleRule.parse(e);
        (this.style = u.style), (this.selectorText = u.selectorText);
      },
    }),
    (t.CSSStyleRule.parse = function (e) {
      for (
        var u = 0,
          s = 'selector',
          n,
          r = u,
          i = '',
          a = { selector: !0, value: !0 },
          o = new t.CSSStyleRule(),
          c,
          l = '',
          f;
        (f = e.charAt(u));
        u++
      )
        switch (f) {
          case ' ':
          case '	':
          case '\r':
          case `
`:
          case '\f':
            if (a[s])
              switch (e.charAt(u - 1)) {
                case ' ':
                case '	':
                case '\r':
                case `
`:
                case '\f':
                  break;
                default:
                  i += ' ';
                  break;
              }
            break;
          case '"':
            if (((r = u + 1), (n = e.indexOf('"', r) + 1), !n))
              throw '" is missing';
            (i += e.slice(u, n)), (u = n - 1);
            break;
          case "'":
            if (((r = u + 1), (n = e.indexOf("'", r) + 1), !n))
              throw "' is missing";
            (i += e.slice(u, n)), (u = n - 1);
            break;
          case '/':
            if (e.charAt(u + 1) === '*') {
              if (((u += 2), (n = e.indexOf('*/', u)), n === -1))
                throw new SyntaxError('Missing */');
              u = n + 1;
            } else i += f;
            break;
          case '{':
            s === 'selector' &&
              ((o.selectorText = i.trim()), (i = ''), (s = 'name'));
            break;
          case ':':
            s === 'name' ? ((c = i.trim()), (i = ''), (s = 'value')) : (i += f);
            break;
          case '!':
            s === 'value' && e.indexOf('!important', u) === u
              ? ((l = 'important'), (u += 9))
              : (i += f);
            break;
          case ';':
            s === 'value'
              ? (o.style.setProperty(c, i.trim(), l),
                (l = ''),
                (i = ''),
                (s = 'name'))
              : (i += f);
            break;
          case '}':
            if (s === 'value')
              o.style.setProperty(c, i.trim(), l), (l = ''), (i = '');
            else {
              if (s === 'name') break;
              i += f;
            }
            s = 'selector';
            break;
          default:
            i += f;
            break;
        }
      return o;
    }),
    (Zs.CSSStyleRule = t.CSSStyleRule),
    Zs
  );
}
var wi;
function ws() {
  if (wi) return Xs;
  wi = 1;
  var t = { StyleSheet: Jo().StyleSheet, CSSStyleRule: Es().CSSStyleRule };
  return (
    (t.CSSStyleSheet = function () {
      t.StyleSheet.call(this), (this.cssRules = []);
    }),
    (t.CSSStyleSheet.prototype = new t.StyleSheet()),
    (t.CSSStyleSheet.prototype.constructor = t.CSSStyleSheet),
    (t.CSSStyleSheet.prototype.insertRule = function (e, u) {
      if (u < 0 || u > this.cssRules.length)
        throw new RangeError('INDEX_SIZE_ERR');
      var s = t.parse(e).cssRules[0];
      return (s.parentStyleSheet = this), this.cssRules.splice(u, 0, s), u;
    }),
    (t.CSSStyleSheet.prototype.deleteRule = function (e) {
      if (e < 0 || e >= this.cssRules.length)
        throw new RangeError('INDEX_SIZE_ERR');
      this.cssRules.splice(e, 1);
    }),
    (t.CSSStyleSheet.prototype.toString = function () {
      for (var e = '', u = this.cssRules, s = 0; s < u.length; s++)
        e +=
          u[s].cssText +
          `
`;
      return e;
    }),
    (Xs.CSSStyleSheet = t.CSSStyleSheet),
    (t.parse = Ar().parse),
    Xs
  );
}
var Qs = {},
  en = {},
  Ai;
function Tr() {
  if (Ai) return en;
  Ai = 1;
  var t = {};
  return (
    (t.MediaList = function () {
      this.length = 0;
    }),
    (t.MediaList.prototype = {
      constructor: t.MediaList,
      get mediaText() {
        return Array.prototype.join.call(this, ', ');
      },
      set mediaText(e) {
        for (
          var u = e.split(','), s = (this.length = u.length), n = 0;
          n < s;
          n++
        )
          this[n] = u[n].trim();
      },
      appendMedium: function (e) {
        Array.prototype.indexOf.call(this, e) === -1 &&
          ((this[this.length] = e), this.length++);
      },
      deleteMedium: function (e) {
        var u = Array.prototype.indexOf.call(this, e);
        u !== -1 && Array.prototype.splice.call(this, u, 1);
      },
    }),
    (en.MediaList = t.MediaList),
    en
  );
}
var _i;
function Zo() {
  if (_i) return Qs;
  _i = 1;
  var t = {
    CSSRule: Fe().CSSRule,
    CSSStyleSheet: ws().CSSStyleSheet,
    MediaList: Tr().MediaList,
  };
  return (
    (t.CSSImportRule = function () {
      t.CSSRule.call(this),
        (this.href = ''),
        (this.media = new t.MediaList()),
        (this.styleSheet = new t.CSSStyleSheet());
    }),
    (t.CSSImportRule.prototype = new t.CSSRule()),
    (t.CSSImportRule.prototype.constructor = t.CSSImportRule),
    (t.CSSImportRule.prototype.type = 3),
    Object.defineProperty(t.CSSImportRule.prototype, 'cssText', {
      get: function () {
        var e = this.media.mediaText;
        return '@import url(' + this.href + ')' + (e ? ' ' + e : '') + ';';
      },
      set: function (e) {
        for (var u = 0, s = '', n = '', r, i; (i = e.charAt(u)); u++)
          switch (i) {
            case ' ':
            case '	':
            case '\r':
            case `
`:
            case '\f':
              s === 'after-import' ? (s = 'url') : (n += i);
              break;
            case '@':
              !s &&
                e.indexOf('@import', u) === u &&
                ((s = 'after-import'), (u += 6), (n = ''));
              break;
            case 'u':
              if (s === 'url' && e.indexOf('url(', u) === u) {
                if (((r = e.indexOf(')', u + 1)), r === -1))
                  throw u + ': ")" not found';
                u += 4;
                var a = e.slice(u, r);
                a[0] === a[a.length - 1] &&
                  (a[0] === '"' || a[0] === "'") &&
                  (a = a.slice(1, -1)),
                  (this.href = a),
                  (u = r),
                  (s = 'media');
              }
              break;
            case '"':
              if (s === 'url') {
                if (((r = e.indexOf('"', u + 1)), !r))
                  throw u + `: '"' not found`;
                (this.href = e.slice(u + 1, r)), (u = r), (s = 'media');
              }
              break;
            case "'":
              if (s === 'url') {
                if (((r = e.indexOf("'", u + 1)), !r))
                  throw u + `: "'" not found`;
                (this.href = e.slice(u + 1, r)), (u = r), (s = 'media');
              }
              break;
            case ';':
              s === 'media' && n && (this.media.mediaText = n.trim());
              break;
            default:
              s === 'media' && (n += i);
              break;
          }
      },
    }),
    (Qs.CSSImportRule = t.CSSImportRule),
    Qs
  );
}
var tn = {},
  Ni;
function du() {
  if (Ni) return tn;
  Ni = 1;
  var t = { CSSRule: Fe().CSSRule };
  return (
    (t.CSSGroupingRule = function () {
      t.CSSRule.call(this), (this.cssRules = []);
    }),
    (t.CSSGroupingRule.prototype = new t.CSSRule()),
    (t.CSSGroupingRule.prototype.constructor = t.CSSGroupingRule),
    (t.CSSGroupingRule.prototype.insertRule = function (u, s) {
      if (s < 0 || s > this.cssRules.length)
        throw new RangeError('INDEX_SIZE_ERR');
      var n = t.parse(u).cssRules[0];
      return (n.parentRule = this), this.cssRules.splice(s, 0, n), s;
    }),
    (t.CSSGroupingRule.prototype.deleteRule = function (u) {
      if (u < 0 || u >= this.cssRules.length)
        throw new RangeError('INDEX_SIZE_ERR');
      this.cssRules.splice(u, 1)[0].parentRule = null;
    }),
    (tn.CSSGroupingRule = t.CSSGroupingRule),
    tn
  );
}
var un = {},
  sn = {},
  Ri;
function Ou() {
  if (Ri) return sn;
  Ri = 1;
  var t = { CSSRule: Fe().CSSRule, CSSGroupingRule: du().CSSGroupingRule };
  return (
    (t.CSSConditionRule = function () {
      t.CSSGroupingRule.call(this), (this.cssRules = []);
    }),
    (t.CSSConditionRule.prototype = new t.CSSGroupingRule()),
    (t.CSSConditionRule.prototype.constructor = t.CSSConditionRule),
    (t.CSSConditionRule.prototype.conditionText = ''),
    (t.CSSConditionRule.prototype.cssText = ''),
    (sn.CSSConditionRule = t.CSSConditionRule),
    sn
  );
}
var Di;
function Cr() {
  if (Di) return un;
  Di = 1;
  var t = {
    CSSRule: Fe().CSSRule,
    CSSGroupingRule: du().CSSGroupingRule,
    CSSConditionRule: Ou().CSSConditionRule,
    MediaList: Tr().MediaList,
  };
  return (
    (t.CSSMediaRule = function () {
      t.CSSConditionRule.call(this), (this.media = new t.MediaList());
    }),
    (t.CSSMediaRule.prototype = new t.CSSConditionRule()),
    (t.CSSMediaRule.prototype.constructor = t.CSSMediaRule),
    (t.CSSMediaRule.prototype.type = 4),
    Object.defineProperties(t.CSSMediaRule.prototype, {
      conditionText: {
        get: function () {
          return this.media.mediaText;
        },
        set: function (e) {
          this.media.mediaText = e;
        },
        configurable: !0,
        enumerable: !0,
      },
      cssText: {
        get: function () {
          for (var e = [], u = 0, s = this.cssRules.length; u < s; u++)
            e.push(this.cssRules[u].cssText);
          return '@media ' + this.media.mediaText + ' {' + e.join('') + '}';
        },
        configurable: !0,
        enumerable: !0,
      },
    }),
    (un.CSSMediaRule = t.CSSMediaRule),
    un
  );
}
var nn = {},
  Li;
function vr() {
  if (Li) return nn;
  Li = 1;
  var t = {
    CSSRule: Fe().CSSRule,
    CSSGroupingRule: du().CSSGroupingRule,
    CSSConditionRule: Ou().CSSConditionRule,
  };
  return (
    (t.CSSSupportsRule = function () {
      t.CSSConditionRule.call(this);
    }),
    (t.CSSSupportsRule.prototype = new t.CSSConditionRule()),
    (t.CSSSupportsRule.prototype.constructor = t.CSSSupportsRule),
    (t.CSSSupportsRule.prototype.type = 12),
    Object.defineProperty(t.CSSSupportsRule.prototype, 'cssText', {
      get: function () {
        for (var e = [], u = 0, s = this.cssRules.length; u < s; u++)
          e.push(this.cssRules[u].cssText);
        return '@supports ' + this.conditionText + ' {' + e.join('') + '}';
      },
    }),
    (nn.CSSSupportsRule = t.CSSSupportsRule),
    nn
  );
}
var rn = {},
  Ii;
function Yo() {
  if (Ii) return rn;
  Ii = 1;
  var t = {
    CSSStyleDeclaration: fu().CSSStyleDeclaration,
    CSSRule: Fe().CSSRule,
  };
  return (
    (t.CSSFontFaceRule = function () {
      t.CSSRule.call(this),
        (this.style = new t.CSSStyleDeclaration()),
        (this.style.parentRule = this);
    }),
    (t.CSSFontFaceRule.prototype = new t.CSSRule()),
    (t.CSSFontFaceRule.prototype.constructor = t.CSSFontFaceRule),
    (t.CSSFontFaceRule.prototype.type = 5),
    Object.defineProperty(t.CSSFontFaceRule.prototype, 'cssText', {
      get: function () {
        return '@font-face {' + this.style.cssText + '}';
      },
    }),
    (rn.CSSFontFaceRule = t.CSSFontFaceRule),
    rn
  );
}
var an = {},
  Mi;
function Qo() {
  if (Mi) return an;
  Mi = 1;
  var t = { CSSRule: Fe().CSSRule };
  return (
    (t.CSSHostRule = function () {
      t.CSSRule.call(this), (this.cssRules = []);
    }),
    (t.CSSHostRule.prototype = new t.CSSRule()),
    (t.CSSHostRule.prototype.constructor = t.CSSHostRule),
    (t.CSSHostRule.prototype.type = 1001),
    Object.defineProperty(t.CSSHostRule.prototype, 'cssText', {
      get: function () {
        for (var e = [], u = 0, s = this.cssRules.length; u < s; u++)
          e.push(this.cssRules[u].cssText);
        return '@host {' + e.join('') + '}';
      },
    }),
    (an.CSSHostRule = t.CSSHostRule),
    an
  );
}
var on = {},
  Oi;
function Er() {
  if (Oi) return on;
  Oi = 1;
  var t = {
    CSSRule: Fe().CSSRule,
    CSSStyleDeclaration: fu().CSSStyleDeclaration,
  };
  return (
    (t.CSSKeyframeRule = function () {
      t.CSSRule.call(this),
        (this.keyText = ''),
        (this.style = new t.CSSStyleDeclaration()),
        (this.style.parentRule = this);
    }),
    (t.CSSKeyframeRule.prototype = new t.CSSRule()),
    (t.CSSKeyframeRule.prototype.constructor = t.CSSKeyframeRule),
    (t.CSSKeyframeRule.prototype.type = 8),
    Object.defineProperty(t.CSSKeyframeRule.prototype, 'cssText', {
      get: function () {
        return this.keyText + ' {' + this.style.cssText + '} ';
      },
    }),
    (on.CSSKeyframeRule = t.CSSKeyframeRule),
    on
  );
}
var cn = {},
  ki;
function wr() {
  if (ki) return cn;
  ki = 1;
  var t = { CSSRule: Fe().CSSRule };
  return (
    (t.CSSKeyframesRule = function () {
      t.CSSRule.call(this), (this.name = ''), (this.cssRules = []);
    }),
    (t.CSSKeyframesRule.prototype = new t.CSSRule()),
    (t.CSSKeyframesRule.prototype.constructor = t.CSSKeyframesRule),
    (t.CSSKeyframesRule.prototype.type = 7),
    Object.defineProperty(t.CSSKeyframesRule.prototype, 'cssText', {
      get: function () {
        for (var e = [], u = 0, s = this.cssRules.length; u < s; u++)
          e.push('  ' + this.cssRules[u].cssText);
        return (
          '@' +
          (this._vendorPrefix || '') +
          'keyframes ' +
          this.name +
          ` {
` +
          e.join(`
`) +
          `
}`
        );
      },
    }),
    (cn.CSSKeyframesRule = t.CSSKeyframesRule),
    cn
  );
}
var ln = {},
  dn = {},
  Pi;
function e0() {
  if (Pi) return dn;
  Pi = 1;
  var t = {};
  return (
    (t.CSSValue = function () {}),
    (t.CSSValue.prototype = {
      constructor: t.CSSValue,
      set cssText(e) {
        var u = this._getConstructorName();
        throw new Error(
          'DOMException: property "cssText" of "' +
            u +
            '" is readonly and can not be replaced with "' +
            e +
            '"!'
        );
      },
      get cssText() {
        var e = this._getConstructorName();
        throw new Error('getter "cssText" of "' + e + '" is not implemented!');
      },
      _getConstructorName: function () {
        var e = this.constructor.toString(),
          u = e.match(/function\s([^\(]+)/),
          s = u[1];
        return s;
      },
    }),
    (dn.CSSValue = t.CSSValue),
    dn
  );
}
var qi;
function t0() {
  if (qi) return ln;
  qi = 1;
  var t = { CSSValue: e0().CSSValue };
  return (
    (t.CSSValueExpression = function (u, s) {
      (this._token = u), (this._idx = s);
    }),
    (t.CSSValueExpression.prototype = new t.CSSValue()),
    (t.CSSValueExpression.prototype.constructor = t.CSSValueExpression),
    (t.CSSValueExpression.prototype.parse = function () {
      for (
        var e = this._token, u = this._idx, s = '', n = '', r = '', i, a = [];
        ;
        ++u
      ) {
        if (((s = e.charAt(u)), s === '')) {
          r = 'css expression error: unfinished expression!';
          break;
        }
        switch (s) {
          case '(':
            a.push(s), (n += s);
            break;
          case ')':
            a.pop(s), (n += s);
            break;
          case '/':
            (i = this._parseJSComment(e, u))
              ? i.error
                ? (r =
                    'css expression error: unfinished comment in expression!')
                : (u = i.idx)
              : (i = this._parseJSRexExp(e, u))
              ? ((u = i.idx), (n += i.text))
              : (n += s);
            break;
          case "'":
          case '"':
            (i = this._parseJSString(e, u, s)),
              i ? ((u = i.idx), (n += i.text)) : (n += s);
            break;
          default:
            n += s;
            break;
        }
        if (r || a.length === 0) break;
      }
      var o;
      return r ? (o = { error: r }) : (o = { idx: u, expression: n }), o;
    }),
    (t.CSSValueExpression.prototype._parseJSComment = function (e, u) {
      var s = e.charAt(u + 1),
        n;
      if (s === '/' || s === '*') {
        var r = u,
          i,
          a;
        if (
          (s === '/'
            ? (a = `
`)
            : s === '*' && (a = '*/'),
          (i = e.indexOf(a, r + 1 + 1)),
          i !== -1)
        )
          return (
            (i = i + a.length - 1),
            (n = e.substring(u, i + 1)),
            { idx: i, text: n }
          );
        var o = 'css expression error: unfinished comment in expression!';
        return { error: o };
      } else return !1;
    }),
    (t.CSSValueExpression.prototype._parseJSString = function (e, u, s) {
      var n = this._findMatchedIdx(e, u, s),
        r;
      return n === -1
        ? !1
        : ((r = e.substring(u, n + s.length)), { idx: n, text: r });
    }),
    (t.CSSValueExpression.prototype._parseJSRexExp = function (e, u) {
      var s = e.substring(0, u).replace(/\s+$/, ''),
        n = [
          /^$/,
          /\($/,
          /\[$/,
          /\!$/,
          /\+$/,
          /\-$/,
          /\*$/,
          /\/\s+/,
          /\%$/,
          /\=$/,
          /\>$/,
          /<$/,
          /\&$/,
          /\|$/,
          /\^$/,
          /\~$/,
          /\?$/,
          /\,$/,
          /delete$/,
          /in$/,
          /instanceof$/,
          /new$/,
          /typeof$/,
          /void$/,
        ],
        r = n.some(function (a) {
          return a.test(s);
        });
      if (r) {
        var i = '/';
        return this._parseJSString(e, u, i);
      } else return !1;
    }),
    (t.CSSValueExpression.prototype._findMatchedIdx = function (e, u, s) {
      for (var n = u, r, i = -1; ; )
        if (((r = e.indexOf(s, n + 1)), r === -1)) {
          r = i;
          break;
        } else {
          var a = e.substring(u + 1, r),
            o = a.match(/\\+$/);
          if (!o || o[0] % 2 === 0) break;
          n = r;
        }
      var c = e.indexOf(
        `
`,
        u + 1
      );
      return c < r && (r = i), r;
    }),
    (ln.CSSValueExpression = t.CSSValueExpression),
    ln
  );
}
var fn = {},
  hn = {},
  Bi;
function u0() {
  if (Bi) return hn;
  Bi = 1;
  var t = {};
  return (
    (t.MatcherList = function () {
      this.length = 0;
    }),
    (t.MatcherList.prototype = {
      constructor: t.MatcherList,
      get matcherText() {
        return Array.prototype.join.call(this, ', ');
      },
      set matcherText(e) {
        for (
          var u = e.split(','), s = (this.length = u.length), n = 0;
          n < s;
          n++
        )
          this[n] = u[n].trim();
      },
      appendMatcher: function (e) {
        Array.prototype.indexOf.call(this, e) === -1 &&
          ((this[this.length] = e), this.length++);
      },
      deleteMatcher: function (e) {
        var u = Array.prototype.indexOf.call(this, e);
        u !== -1 && Array.prototype.splice.call(this, u, 1);
      },
    }),
    (hn.MatcherList = t.MatcherList),
    hn
  );
}
var Fi;
function s0() {
  if (Fi) return fn;
  Fi = 1;
  var t = { CSSRule: Fe().CSSRule, MatcherList: u0().MatcherList };
  return (
    (t.CSSDocumentRule = function () {
      t.CSSRule.call(this),
        (this.matcher = new t.MatcherList()),
        (this.cssRules = []);
    }),
    (t.CSSDocumentRule.prototype = new t.CSSRule()),
    (t.CSSDocumentRule.prototype.constructor = t.CSSDocumentRule),
    (t.CSSDocumentRule.prototype.type = 10),
    Object.defineProperty(t.CSSDocumentRule.prototype, 'cssText', {
      get: function () {
        for (var e = [], u = 0, s = this.cssRules.length; u < s; u++)
          e.push(this.cssRules[u].cssText);
        return (
          '@-moz-document ' + this.matcher.matcherText + ' {' + e.join('') + '}'
        );
      },
    }),
    (fn.CSSDocumentRule = t.CSSDocumentRule),
    fn
  );
}
var Vi;
function Ar() {
  if (Vi) return Ks;
  Vi = 1;
  var t = {};
  return (
    (t.parse = function (u) {
      for (
        var s = 0,
          n = 'before-selector',
          r,
          i = '',
          a = 0,
          o = {
            selector: !0,
            value: !0,
            'value-parenthesis': !0,
            atRule: !0,
            'importRule-begin': !0,
            importRule: !0,
            atBlock: !0,
            conditionBlock: !0,
            'documentRule-begin': !0,
          },
          c = new t.CSSStyleSheet(),
          l = c,
          f,
          b = [],
          h = !1,
          S,
          E,
          I = '',
          D,
          H,
          q,
          G,
          R,
          k,
          z,
          te,
          me = /@(-(?:\w+-)+)?keyframes/g,
          ue = function (pe) {
            var _ = u.substring(0, s).split(`
`),
              Q = _.length,
              _e = _.pop().length + 1,
              J = new Error(pe + ' (line ' + Q + ', char ' + _e + ')');
            throw ((J.line = Q), (J.char = _e), (J.styleSheet = c), J);
          },
          B;
        (B = u.charAt(s));
        s++
      )
        switch (B) {
          case ' ':
          case '	':
          case '\r':
          case `
`:
          case '\f':
            o[n] && (i += B);
            break;
          case '"':
            r = s + 1;
            do (r = u.indexOf('"', r) + 1), r || ue('Unmatched "');
            while (u[r - 2] === '\\');
            switch (((i += u.slice(s, r)), (s = r - 1), n)) {
              case 'before-value':
                n = 'value';
                break;
              case 'importRule-begin':
                n = 'importRule';
                break;
            }
            break;
          case "'":
            r = s + 1;
            do (r = u.indexOf("'", r) + 1), r || ue("Unmatched '");
            while (u[r - 2] === '\\');
            switch (((i += u.slice(s, r)), (s = r - 1), n)) {
              case 'before-value':
                n = 'value';
                break;
              case 'importRule-begin':
                n = 'importRule';
                break;
            }
            break;
          case '/':
            u.charAt(s + 1) === '*'
              ? ((s += 2),
                (r = u.indexOf('*/', s)),
                r === -1 ? ue('Missing */') : (s = r + 1))
              : (i += B),
              n === 'importRule-begin' && ((i += ' '), (n = 'importRule'));
            break;
          case '@':
            if (u.indexOf('@-moz-document', s) === s) {
              (n = 'documentRule-begin'),
                (z = new t.CSSDocumentRule()),
                (z.__starts = s),
                (s += 13),
                (i = '');
              break;
            } else if (u.indexOf('@media', s) === s) {
              (n = 'atBlock'),
                (H = new t.CSSMediaRule()),
                (H.__starts = s),
                (s += 5),
                (i = '');
              break;
            } else if (u.indexOf('@supports', s) === s) {
              (n = 'conditionBlock'),
                (q = new t.CSSSupportsRule()),
                (q.__starts = s),
                (s += 8),
                (i = '');
              break;
            } else if (u.indexOf('@host', s) === s) {
              (n = 'hostRule-begin'),
                (s += 4),
                (te = new t.CSSHostRule()),
                (te.__starts = s),
                (i = '');
              break;
            } else if (u.indexOf('@import', s) === s) {
              (n = 'importRule-begin'), (s += 6), (i += '@import');
              break;
            } else if (u.indexOf('@font-face', s) === s) {
              (n = 'fontFaceRule-begin'),
                (s += 9),
                (R = new t.CSSFontFaceRule()),
                (R.__starts = s),
                (i = '');
              break;
            } else {
              me.lastIndex = s;
              var W = me.exec(u);
              if (W && W.index === s) {
                (n = 'keyframesRule-begin'),
                  (k = new t.CSSKeyframesRule()),
                  (k.__starts = s),
                  (k._vendorPrefix = W[1]),
                  (s += W[0].length - 1),
                  (i = '');
                break;
              } else n === 'selector' && (n = 'atRule');
            }
            i += B;
            break;
          case '{':
            n === 'selector' || n === 'atRule'
              ? ((D.selectorText = i.trim()),
                (D.style.__starts = s),
                (i = ''),
                (n = 'before-name'))
              : n === 'atBlock'
              ? ((H.media.mediaText = i.trim()),
                f && b.push(f),
                (l = f = H),
                (H.parentStyleSheet = c),
                (i = ''),
                (n = 'before-selector'))
              : n === 'conditionBlock'
              ? ((q.conditionText = i.trim()),
                f && b.push(f),
                (l = f = q),
                (q.parentStyleSheet = c),
                (i = ''),
                (n = 'before-selector'))
              : n === 'hostRule-begin'
              ? (f && b.push(f),
                (l = f = te),
                (te.parentStyleSheet = c),
                (i = ''),
                (n = 'before-selector'))
              : n === 'fontFaceRule-begin'
              ? (f && (R.parentRule = f),
                (R.parentStyleSheet = c),
                (D = R),
                (i = ''),
                (n = 'before-name'))
              : n === 'keyframesRule-begin'
              ? ((k.name = i.trim()),
                f && (b.push(f), (k.parentRule = f)),
                (k.parentStyleSheet = c),
                (l = f = k),
                (i = ''),
                (n = 'keyframeRule-begin'))
              : n === 'keyframeRule-begin'
              ? ((D = new t.CSSKeyframeRule()),
                (D.keyText = i.trim()),
                (D.__starts = s),
                (i = ''),
                (n = 'before-name'))
              : n === 'documentRule-begin' &&
                ((z.matcher.matcherText = i.trim()),
                f && (b.push(f), (z.parentRule = f)),
                (l = f = z),
                (z.parentStyleSheet = c),
                (i = ''),
                (n = 'before-selector'));
            break;
          case ':':
            n === 'name'
              ? ((E = i.trim()), (i = ''), (n = 'before-value'))
              : (i += B);
            break;
          case '(':
            if (n === 'value')
              if (i.trim() === 'expression') {
                var he = new t.CSSValueExpression(u, s).parse();
                he.error ? ue(he.error) : ((i += he.expression), (s = he.idx));
              } else (n = 'value-parenthesis'), (a = 1), (i += B);
            else n === 'value-parenthesis' && a++, (i += B);
            break;
          case ')':
            n === 'value-parenthesis' && (a--, a === 0 && (n = 'value')),
              (i += B);
            break;
          case '!':
            n === 'value' && u.indexOf('!important', s) === s
              ? ((I = 'important'), (s += 9))
              : (i += B);
            break;
          case ';':
            switch (n) {
              case 'value':
                D.style.setProperty(E, i.trim(), I),
                  (I = ''),
                  (i = ''),
                  (n = 'before-name');
                break;
              case 'atRule':
                (i = ''), (n = 'before-selector');
                break;
              case 'importRule':
                (G = new t.CSSImportRule()),
                  (G.parentStyleSheet = G.styleSheet.parentStyleSheet = c),
                  (G.cssText = i + B),
                  c.cssRules.push(G),
                  (i = ''),
                  (n = 'before-selector');
                break;
              default:
                i += B;
                break;
            }
            break;
          case '}':
            switch (n) {
              case 'value':
                D.style.setProperty(E, i.trim(), I), (I = '');
              case 'before-name':
              case 'name':
                (D.__ends = s + 1),
                  f && (D.parentRule = f),
                  (D.parentStyleSheet = c),
                  l.cssRules.push(D),
                  (i = ''),
                  l.constructor === t.CSSKeyframesRule
                    ? (n = 'keyframeRule-begin')
                    : (n = 'before-selector');
                break;
              case 'keyframeRule-begin':
              case 'before-selector':
              case 'selector':
                for (
                  f || ue('Unexpected }'), h = b.length > 0;
                  b.length > 0;

                ) {
                  if (
                    ((f = b.pop()),
                    f.constructor.name === 'CSSMediaRule' ||
                      f.constructor.name === 'CSSSupportsRule')
                  ) {
                    (S = l), (l = f), l.cssRules.push(S);
                    break;
                  }
                  b.length === 0 && (h = !1);
                }
                h ||
                  ((l.__ends = s + 1), c.cssRules.push(l), (l = c), (f = null)),
                  (i = ''),
                  (n = 'before-selector');
                break;
            }
            break;
          default:
            switch (n) {
              case 'before-selector':
                (n = 'selector'), (D = new t.CSSStyleRule()), (D.__starts = s);
                break;
              case 'before-name':
                n = 'name';
                break;
              case 'before-value':
                n = 'value';
                break;
              case 'importRule-begin':
                n = 'importRule';
                break;
            }
            i += B;
            break;
        }
      return c;
    }),
    (Ks.parse = t.parse),
    (t.CSSStyleSheet = ws().CSSStyleSheet),
    (t.CSSStyleRule = Es().CSSStyleRule),
    (t.CSSImportRule = Zo().CSSImportRule),
    (t.CSSGroupingRule = du().CSSGroupingRule),
    (t.CSSMediaRule = Cr().CSSMediaRule),
    (t.CSSConditionRule = Ou().CSSConditionRule),
    (t.CSSSupportsRule = vr().CSSSupportsRule),
    (t.CSSFontFaceRule = Yo().CSSFontFaceRule),
    (t.CSSHostRule = Qo().CSSHostRule),
    (t.CSSStyleDeclaration = fu().CSSStyleDeclaration),
    (t.CSSKeyframeRule = Er().CSSKeyframeRule),
    (t.CSSKeyframesRule = wr().CSSKeyframesRule),
    (t.CSSValueExpression = t0().CSSValueExpression),
    (t.CSSDocumentRule = s0().CSSDocumentRule),
    Ks
  );
}
var Ui;
function fu() {
  if (Ui) return Ws;
  Ui = 1;
  var t = {};
  return (
    (t.CSSStyleDeclaration = function () {
      (this.length = 0), (this.parentRule = null), (this._importants = {});
    }),
    (t.CSSStyleDeclaration.prototype = {
      constructor: t.CSSStyleDeclaration,
      getPropertyValue: function (e) {
        return this[e] || '';
      },
      setProperty: function (e, u, s) {
        if (this[e]) {
          var n = Array.prototype.indexOf.call(this, e);
          n < 0 && ((this[this.length] = e), this.length++);
        } else (this[this.length] = e), this.length++;
        (this[e] = u + ''), (this._importants[e] = s);
      },
      removeProperty: function (e) {
        if (!(e in this)) return '';
        var u = Array.prototype.indexOf.call(this, e);
        if (u < 0) return '';
        var s = this[e];
        return (this[e] = ''), Array.prototype.splice.call(this, u, 1), s;
      },
      getPropertyCSSValue: function () {},
      getPropertyPriority: function (e) {
        return this._importants[e] || '';
      },
      getPropertyShorthand: function () {},
      isPropertyImplicit: function () {},
      get cssText() {
        for (var e = [], u = 0, s = this.length; u < s; ++u) {
          var n = this[u],
            r = this.getPropertyValue(n),
            i = this.getPropertyPriority(n);
          i && (i = ' !' + i), (e[u] = n + ': ' + r + i + ';');
        }
        return e.join(' ');
      },
      set cssText(e) {
        var u, s;
        for (u = this.length; u--; ) (s = this[u]), (this[s] = '');
        Array.prototype.splice.call(this, 0, this.length),
          (this._importants = {});
        var n = t.parse('#bogus{' + e + '}').cssRules[0].style,
          r = n.length;
        for (u = 0; u < r; ++u)
          (s = n[u]),
            this.setProperty(
              n[u],
              n.getPropertyValue(s),
              n.getPropertyPriority(s)
            );
      },
    }),
    (Ws.CSSStyleDeclaration = t.CSSStyleDeclaration),
    (t.parse = Ar().parse),
    Ws
  );
}
var pn = {},
  $i;
function $f() {
  if ($i) return pn;
  $i = 1;
  var t = {
    CSSStyleSheet: ws().CSSStyleSheet,
    CSSRule: Fe().CSSRule,
    CSSStyleRule: Es().CSSStyleRule,
    CSSGroupingRule: du().CSSGroupingRule,
    CSSConditionRule: Ou().CSSConditionRule,
    CSSMediaRule: Cr().CSSMediaRule,
    CSSSupportsRule: vr().CSSSupportsRule,
    CSSStyleDeclaration: fu().CSSStyleDeclaration,
    CSSKeyframeRule: Er().CSSKeyframeRule,
    CSSKeyframesRule: wr().CSSKeyframesRule,
  };
  return (
    (t.clone = function e(u) {
      var s = new t.CSSStyleSheet(),
        n = u.cssRules;
      if (!n) return s;
      for (var r = 0, i = n.length; r < i; r++) {
        var a = n[r],
          o = (s.cssRules[r] = new a.constructor()),
          c = a.style;
        if (c) {
          for (
            var l = (o.style = new t.CSSStyleDeclaration()),
              f = 0,
              b = c.length;
            f < b;
            f++
          ) {
            var h = (l[f] = c[f]);
            (l[h] = c[h]), (l._importants[h] = c.getPropertyPriority(h));
          }
          l.length = c.length;
        }
        a.hasOwnProperty('keyText') && (o.keyText = a.keyText),
          a.hasOwnProperty('selectorText') && (o.selectorText = a.selectorText),
          a.hasOwnProperty('mediaText') && (o.mediaText = a.mediaText),
          a.hasOwnProperty('conditionText') &&
            (o.conditionText = a.conditionText),
          a.hasOwnProperty('cssRules') && (o.cssRules = e(a).cssRules);
      }
      return s;
    }),
    (pn.clone = t.clone),
    pn
  );
}
var Hi;
function Hf() {
  return (
    Hi ||
      ((Hi = 1),
      (K.CSSStyleDeclaration = fu().CSSStyleDeclaration),
      (K.CSSRule = Fe().CSSRule),
      (K.CSSGroupingRule = du().CSSGroupingRule),
      (K.CSSConditionRule = Ou().CSSConditionRule),
      (K.CSSStyleRule = Es().CSSStyleRule),
      (K.MediaList = Tr().MediaList),
      (K.CSSMediaRule = Cr().CSSMediaRule),
      (K.CSSSupportsRule = vr().CSSSupportsRule),
      (K.CSSImportRule = Zo().CSSImportRule),
      (K.CSSFontFaceRule = Yo().CSSFontFaceRule),
      (K.CSSHostRule = Qo().CSSHostRule),
      (K.StyleSheet = Jo().StyleSheet),
      (K.CSSStyleSheet = ws().CSSStyleSheet),
      (K.CSSKeyframesRule = wr().CSSKeyframesRule),
      (K.CSSKeyframeRule = Er().CSSKeyframeRule),
      (K.MatcherList = u0().MatcherList),
      (K.CSSDocumentRule = s0().CSSDocumentRule),
      (K.CSSValue = e0().CSSValue),
      (K.CSSValueExpression = t0().CSSValueExpression),
      (K.parse = Ar().parse),
      (K.clone = $f().clone)),
    K
  );
}
var Gf = Hf();
const n0 = 'style';
class r0 extends vs {
  constructor(e, u = n0) {
    super(e, u), (this[Kt] = null);
  }
  get sheet() {
    const e = this[Kt];
    return e !== null ? e : (this[Kt] = Gf.parse(this.textContent));
  }
  get innerHTML() {
    return super.innerHTML || '';
  }
  set innerHTML(e) {
    (super.textContent = e), (this[Kt] = null);
  }
  get innerText() {
    return super.innerText || '';
  }
  set innerText(e) {
    (super.textContent = e), (this[Kt] = null);
  }
  get textContent() {
    return super.textContent || '';
  }
  set textContent(e) {
    (super.textContent = e), (this[Kt] = null);
  }
}
ae(n0, r0);
class i0 extends x {
  constructor(e, u = 'time') {
    super(e, u);
  }
  get dateTime() {
    return g.get(this, 'datetime');
  }
  set dateTime(e) {
    g.set(this, 'datetime', e);
  }
}
ae('time', i0);
class jf extends x {
  constructor(e, u = 'fieldset') {
    super(e, u);
  }
}
class zf extends x {
  constructor(e, u = 'embed') {
    super(e, u);
  }
}
class Wf extends x {
  constructor(e, u = 'hr') {
    super(e, u);
  }
}
class Kf extends x {
  constructor(e, u = 'progress') {
    super(e, u);
  }
}
class Xf extends x {
  constructor(e, u = 'p') {
    super(e, u);
  }
}
class Jf extends x {
  constructor(e, u = 'table') {
    super(e, u);
  }
}
class Zf extends x {
  constructor(e, u = 'frameset') {
    super(e, u);
  }
}
class Yf extends x {
  constructor(e, u = 'li') {
    super(e, u);
  }
}
class Qf extends x {
  constructor(e, u = 'base') {
    super(e, u);
  }
}
class eh extends x {
  constructor(e, u = 'datalist') {
    super(e, u);
  }
}
const a0 = 'input';
class o0 extends x {
  constructor(e, u = a0) {
    super(e, u);
  }
  get autofocus() {
    return P.get(this, 'autofocus') || -1;
  }
  set autofocus(e) {
    P.set(this, 'autofocus', e);
  }
  get disabled() {
    return P.get(this, 'disabled');
  }
  set disabled(e) {
    P.set(this, 'disabled', e);
  }
  get name() {
    return this.getAttribute('name');
  }
  set name(e) {
    this.setAttribute('name', e);
  }
  get placeholder() {
    return this.getAttribute('placeholder');
  }
  set placeholder(e) {
    this.setAttribute('placeholder', e);
  }
  get type() {
    return this.getAttribute('type');
  }
  set type(e) {
    this.setAttribute('type', e);
  }
  get value() {
    return g.get(this, 'value');
  }
  set value(e) {
    g.set(this, 'value', e);
  }
}
ae(a0, o0);
class th extends x {
  constructor(e, u = 'param') {
    super(e, u);
  }
}
class uh extends x {
  constructor(e, u = 'media') {
    super(e, u);
  }
}
class sh extends x {
  constructor(e, u = 'audio') {
    super(e, u);
  }
}
const c0 = 'h1';
class l0 extends x {
  constructor(e, u = c0) {
    super(e, u);
  }
}
ae([c0, 'h2', 'h3', 'h4', 'h5', 'h6'], l0);
class nh extends x {
  constructor(e, u = 'dir') {
    super(e, u);
  }
}
class rh extends x {
  constructor(e, u = 'quote') {
    super(e, u);
  }
}
var Ku = { exports: {} },
  bn,
  Gi;
function ih() {
  if (Gi) return bn;
  Gi = 1;
  class t {
    constructor(u, s) {
      (this.width = u), (this.height = s);
    }
    getContext() {
      return null;
    }
    toDataURL() {
      return '';
    }
  }
  return (bn = { createCanvas: (e, u) => new t(e, u) }), bn;
}
var ji;
function ah() {
  if (ji) return Ku.exports;
  ji = 1;
  try {
    Ku.exports = require('canvas');
  } catch {
    Ku.exports = ih();
  }
  return Ku.exports;
}
var oh = ah();
const ch = so(oh),
  { createCanvas: lh } = ch,
  d0 = 'canvas';
class f0 extends x {
  constructor(e, u = d0) {
    super(e, u), (this[Ze] = lh(300, 150));
  }
  get width() {
    return this[Ze].width;
  }
  set width(e) {
    wt.set(this, 'width', e), (this[Ze].width = e);
  }
  get height() {
    return this[Ze].height;
  }
  set height(e) {
    wt.set(this, 'height', e), (this[Ze].height = e);
  }
  getContext(e) {
    return this[Ze].getContext(e);
  }
  toDataURL(...e) {
    return this[Ze].toDataURL(...e);
  }
}
ae(d0, f0);
class dh extends x {
  constructor(e, u = 'legend') {
    super(e, u);
  }
}
const h0 = 'option';
class p0 extends x {
  constructor(e, u = h0) {
    super(e, u);
  }
  get value() {
    return g.get(this, 'value');
  }
  set value(e) {
    g.set(this, 'value', e);
  }
  get selected() {
    return P.get(this, 'selected');
  }
  set selected(e) {
    const u = this.parentElement?.querySelector('option[selected]');
    u && u !== this && (u.selected = !1), P.set(this, 'selected', e);
  }
}
ae(h0, p0);
class fh extends x {
  constructor(e, u = 'span') {
    super(e, u);
  }
}
class hh extends x {
  constructor(e, u = 'meter') {
    super(e, u);
  }
}
class ph extends x {
  constructor(e, u = 'video') {
    super(e, u);
  }
}
class bh extends x {
  constructor(e, u = 'td') {
    super(e, u);
  }
}
const b0 = 'title';
class g0 extends vs {
  constructor(e, u = b0) {
    super(e, u);
  }
}
ae(b0, g0);
class gh extends x {
  constructor(e, u = 'output') {
    super(e, u);
  }
}
class mh extends x {
  constructor(e, u = 'tr') {
    super(e, u);
  }
}
class Sh extends x {
  constructor(e, u = 'data') {
    super(e, u);
  }
}
class xh extends x {
  constructor(e, u = 'menu') {
    super(e, u);
  }
}
const m0 = 'select';
class S0 extends x {
  constructor(e, u = m0) {
    super(e, u);
  }
  get options() {
    let e = new ot(),
      { firstElementChild: u } = this;
    for (; u; )
      u.tagName === 'OPTGROUP' ? e.push(...u.children) : e.push(u),
        (u = u.nextElementSibling);
    return e;
  }
  get disabled() {
    return P.get(this, 'disabled');
  }
  set disabled(e) {
    P.set(this, 'disabled', e);
  }
  get name() {
    return this.getAttribute('name');
  }
  set name(e) {
    this.setAttribute('name', e);
  }
  get value() {
    return this.querySelector('option[selected]')?.value;
  }
}
ae(m0, S0);
class yh extends x {
  constructor(e, u = 'br') {
    super(e, u);
  }
}
const x0 = 'button';
class y0 extends x {
  constructor(e, u = x0) {
    super(e, u);
  }
  get disabled() {
    return P.get(this, 'disabled');
  }
  set disabled(e) {
    P.set(this, 'disabled', e);
  }
  get name() {
    return this.getAttribute('name');
  }
  set name(e) {
    this.setAttribute('name', e);
  }
  get type() {
    return this.getAttribute('type');
  }
  set type(e) {
    this.setAttribute('type', e);
  }
}
ae(x0, y0);
class Th extends x {
  constructor(e, u = 'map') {
    super(e, u);
  }
}
class Ch extends x {
  constructor(e, u = 'optgroup') {
    super(e, u);
  }
}
class vh extends x {
  constructor(e, u = 'dl') {
    super(e, u);
  }
}
const T0 = 'textarea';
class C0 extends vs {
  constructor(e, u = T0) {
    super(e, u);
  }
  get disabled() {
    return P.get(this, 'disabled');
  }
  set disabled(e) {
    P.set(this, 'disabled', e);
  }
  get name() {
    return this.getAttribute('name');
  }
  set name(e) {
    this.setAttribute('name', e);
  }
  get placeholder() {
    return this.getAttribute('placeholder');
  }
  set placeholder(e) {
    this.setAttribute('placeholder', e);
  }
  get type() {
    return this.getAttribute('type');
  }
  set type(e) {
    this.setAttribute('type', e);
  }
  get value() {
    return this.textContent;
  }
  set value(e) {
    this.textContent = e;
  }
}
ae(T0, C0);
class Eh extends x {
  constructor(e, u = 'font') {
    super(e, u);
  }
}
class wh extends x {
  constructor(e, u = 'div') {
    super(e, u);
  }
}
const v0 = 'link';
class E0 extends x {
  constructor(e, u = v0) {
    super(e, u);
  }
  get disabled() {
    return P.get(this, 'disabled');
  }
  set disabled(e) {
    P.set(this, 'disabled', e);
  }
  get href() {
    return g.get(this, 'href').trim();
  }
  set href(e) {
    g.set(this, 'href', e);
  }
  get hreflang() {
    return g.get(this, 'hreflang');
  }
  set hreflang(e) {
    g.set(this, 'hreflang', e);
  }
  get media() {
    return g.get(this, 'media');
  }
  set media(e) {
    g.set(this, 'media', e);
  }
  get rel() {
    return g.get(this, 'rel');
  }
  set rel(e) {
    g.set(this, 'rel', e);
  }
  get type() {
    return g.get(this, 'type');
  }
  set type(e) {
    g.set(this, 'type', e);
  }
}
ae(v0, E0);
const w0 = 'slot';
class A0 extends x {
  constructor(e, u = w0) {
    super(e, u);
  }
  get name() {
    return this.getAttribute('name');
  }
  set name(e) {
    this.setAttribute('name', e);
  }
  assign() {}
  assignedNodes(e) {
    const u = !!this.name,
      s = this.getRootNode().host?.childNodes ?? [];
    let n;
    if (
      (u
        ? (n = [...s].filter((r) => r.slot === this.name))
        : (n = [...s].filter((r) => !r.slot)),
      e?.flatten)
    ) {
      const r = [];
      for (let i of n)
        i.localName === 'slot'
          ? r.push(...i.assignedNodes({ flatten: !0 }))
          : r.push(i);
      n = r;
    }
    return n.length ? n : [...this.childNodes];
  }
  assignedElements(e) {
    const u = this.assignedNodes(e).filter((s) => s.nodeType === 1);
    return u.length ? u : [...this.children];
  }
}
ae(w0, A0);
class Ah extends x {
  constructor(e, u = 'form') {
    super(e, u);
  }
}
const _0 = 'img';
class _r extends x {
  constructor(e, u = _0) {
    super(e, u);
  }
  get alt() {
    return g.get(this, 'alt');
  }
  set alt(e) {
    g.set(this, 'alt', e);
  }
  get sizes() {
    return g.get(this, 'sizes');
  }
  set sizes(e) {
    g.set(this, 'sizes', e);
  }
  get src() {
    return g.get(this, 'src');
  }
  set src(e) {
    g.set(this, 'src', e);
  }
  get srcset() {
    return g.get(this, 'srcset');
  }
  set srcset(e) {
    g.set(this, 'srcset', e);
  }
  get title() {
    return g.get(this, 'title');
  }
  set title(e) {
    g.set(this, 'title', e);
  }
  get width() {
    return wt.get(this, 'width');
  }
  set width(e) {
    wt.set(this, 'width', e);
  }
  get height() {
    return wt.get(this, 'height');
  }
  set height(e) {
    wt.set(this, 'height', e);
  }
}
ae(_0, _r);
class _h extends x {
  constructor(e, u = 'pre') {
    super(e, u);
  }
}
class Nh extends x {
  constructor(e, u = 'ul') {
    super(e, u);
  }
}
const N0 = 'meta';
class R0 extends x {
  constructor(e, u = N0) {
    super(e, u);
  }
  get name() {
    return g.get(this, 'name');
  }
  set name(e) {
    g.set(this, 'name', e);
  }
  get httpEquiv() {
    return g.get(this, 'http-equiv');
  }
  set httpEquiv(e) {
    g.set(this, 'http-equiv', e);
  }
  get content() {
    return g.get(this, 'content');
  }
  set content(e) {
    g.set(this, 'content', e);
  }
  get charset() {
    return g.get(this, 'charset');
  }
  set charset(e) {
    g.set(this, 'charset', e);
  }
  get media() {
    return g.get(this, 'media');
  }
  set media(e) {
    g.set(this, 'media', e);
  }
}
ae(N0, R0);
class Rh extends x {
  constructor(e, u = 'picture') {
    super(e, u);
  }
}
class Dh extends x {
  constructor(e, u = 'area') {
    super(e, u);
  }
}
class Lh extends x {
  constructor(e, u = 'ol') {
    super(e, u);
  }
}
class Ih extends x {
  constructor(e, u = 'caption') {
    super(e, u);
  }
}
const D0 = 'a';
class L0 extends x {
  constructor(e, u = D0) {
    super(e, u);
  }
  get href() {
    return encodeURI(decodeURI(g.get(this, 'href'))).trim();
  }
  set href(e) {
    g.set(this, 'href', decodeURI(e));
  }
  get download() {
    return encodeURI(decodeURI(g.get(this, 'download')));
  }
  set download(e) {
    g.set(this, 'download', decodeURI(e));
  }
  get target() {
    return g.get(this, 'target');
  }
  set target(e) {
    g.set(this, 'target', e);
  }
  get type() {
    return g.get(this, 'type');
  }
  set type(e) {
    g.set(this, 'type', e);
  }
  get rel() {
    return g.get(this, 'rel');
  }
  set rel(e) {
    g.set(this, 'rel', e);
  }
}
ae(D0, L0);
class Mh extends x {
  constructor(e, u = 'label') {
    super(e, u);
  }
}
class Oh extends x {
  constructor(e, u = 'unknown') {
    super(e, u);
  }
}
class kh extends x {
  constructor(e, u = 'mod') {
    super(e, u);
  }
}
class Ph extends x {
  constructor(e, u = 'details') {
    super(e, u);
  }
}
const I0 = 'source';
class M0 extends x {
  constructor(e, u = I0) {
    super(e, u);
  }
  get src() {
    return g.get(this, 'src');
  }
  set src(e) {
    g.set(this, 'src', e);
  }
  get srcset() {
    return g.get(this, 'srcset');
  }
  set srcset(e) {
    g.set(this, 'srcset', e);
  }
  get sizes() {
    return g.get(this, 'sizes');
  }
  set sizes(e) {
    g.set(this, 'sizes', e);
  }
  get type() {
    return g.get(this, 'type');
  }
  set type(e) {
    g.set(this, 'type', e);
  }
}
ae(I0, M0);
class qh extends x {
  constructor(e, u = 'track') {
    super(e, u);
  }
}
class Bh extends x {
  constructor(e, u = 'marquee') {
    super(e, u);
  }
}
const Fh = {
    HTMLElement: x,
    HTMLTemplateElement: jo,
    HTMLHtmlElement: Pf,
    HTMLScriptElement: Wo,
    HTMLFrameElement: Bf,
    HTMLIFrameElement: Xo,
    HTMLObjectElement: Ff,
    HTMLHeadElement: Vf,
    HTMLBodyElement: Uf,
    HTMLStyleElement: r0,
    HTMLTimeElement: i0,
    HTMLFieldSetElement: jf,
    HTMLEmbedElement: zf,
    HTMLHRElement: Wf,
    HTMLProgressElement: Kf,
    HTMLParagraphElement: Xf,
    HTMLTableElement: Jf,
    HTMLFrameSetElement: Zf,
    HTMLLIElement: Yf,
    HTMLBaseElement: Qf,
    HTMLDataListElement: eh,
    HTMLInputElement: o0,
    HTMLParamElement: th,
    HTMLMediaElement: uh,
    HTMLAudioElement: sh,
    HTMLHeadingElement: l0,
    HTMLDirectoryElement: nh,
    HTMLQuoteElement: rh,
    HTMLCanvasElement: f0,
    HTMLLegendElement: dh,
    HTMLOptionElement: p0,
    HTMLSpanElement: fh,
    HTMLMeterElement: hh,
    HTMLVideoElement: ph,
    HTMLTableCellElement: bh,
    HTMLTitleElement: g0,
    HTMLOutputElement: gh,
    HTMLTableRowElement: mh,
    HTMLDataElement: Sh,
    HTMLMenuElement: xh,
    HTMLSelectElement: S0,
    HTMLBRElement: yh,
    HTMLButtonElement: y0,
    HTMLMapElement: Th,
    HTMLOptGroupElement: Ch,
    HTMLDListElement: vh,
    HTMLTextAreaElement: C0,
    HTMLFontElement: Eh,
    HTMLDivElement: wh,
    HTMLLinkElement: E0,
    HTMLSlotElement: A0,
    HTMLFormElement: Ah,
    HTMLImageElement: _r,
    HTMLPreElement: _h,
    HTMLUListElement: Nh,
    HTMLMetaElement: R0,
    HTMLPictureElement: Rh,
    HTMLAreaElement: Dh,
    HTMLOListElement: Lh,
    HTMLTableCaptionElement: Ih,
    HTMLAnchorElement: L0,
    HTMLLabelElement: Mh,
    HTMLUnknownElement: Oh,
    HTMLModElement: kh,
    HTMLDetailsElement: Ph,
    HTMLSourceElement: M0,
    HTMLTrackElement: qh,
    HTMLMarqueeElement: Bh,
  },
  Xu = { test: () => !0 },
  Vh = {
    'text/html': {
      docType: '<!DOCTYPE html>',
      ignoreCase: !0,
      voidElements:
        /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,
    },
    'image/svg+xml': {
      docType: '<?xml version="1.0" encoding="utf-8"?>',
      ignoreCase: !1,
      voidElements: Xu,
    },
    'text/xml': {
      docType: '<?xml version="1.0" encoding="utf-8"?>',
      ignoreCase: !1,
      voidElements: Xu,
    },
    'application/xml': {
      docType: '<?xml version="1.0" encoding="utf-8"?>',
      ignoreCase: !1,
      voidElements: Xu,
    },
    'application/xhtml+xml': {
      docType: '<?xml version="1.0" encoding="utf-8"?>',
      ignoreCase: !1,
      voidElements: Xu,
    },
  };
class O0 extends Vt {
  constructor(e, u = {}) {
    super(e, u), (this.detail = u.detail);
  }
}
class Uh extends Vt {
  constructor(e, u = {}) {
    super(e, u),
      (this.inputType = u.inputType),
      (this.data = u.data),
      (this.dataTransfer = u.dataTransfer),
      (this.isComposing = u.isComposing || !1),
      (this.ranges = u.ranges);
  }
}
const $h = (t) =>
    class extends _r {
      constructor(u, s) {
        switch ((super(t), arguments.length)) {
          case 1:
            (this.height = u), (this.width = u);
            break;
          case 2:
            (this.height = s), (this.width = u);
            break;
        }
      }
    },
  zi = ({ [Ie]: t, [T]: e }, u = null) => {
    Qa(t[de], e[m]);
    do {
      const s = Oe(t),
        n = s === e ? s : s[m];
      u ? u.insertBefore(t, u[T]) : t.remove(), (t = n);
    } while (t !== e);
  };
class Nr {
  constructor() {
    (this[Ie] = null), (this[T] = null), (this.commonAncestorContainer = null);
  }
  insertNode(e) {
    this[T].parentNode.insertBefore(e, this[Ie]);
  }
  selectNode(e) {
    (this[Ie] = e), (this[T] = Oe(e));
  }
  selectNodeContents(e) {
    this.selectNode(e), (this.commonAncestorContainer = e);
  }
  surroundContents(e) {
    e.replaceChildren(this.extractContents());
  }
  setStartBefore(e) {
    this[Ie] = e;
  }
  setStartAfter(e) {
    this[Ie] = e.nextSibling;
  }
  setEndBefore(e) {
    this[T] = Oe(e.previousSibling);
  }
  setEndAfter(e) {
    this[T] = Oe(e);
  }
  cloneContents() {
    let { [Ie]: e, [T]: u } = this;
    const s = e.ownerDocument.createDocumentFragment();
    for (; e !== u; )
      s.insertBefore(e.cloneNode(!0), s[T]), (e = Oe(e)), e !== u && (e = e[m]);
    return s;
  }
  deleteContents() {
    zi(this);
  }
  extractContents() {
    const e = this[Ie].ownerDocument.createDocumentFragment();
    return zi(this, e), e;
  }
  createContextualFragment(e) {
    const { commonAncestorContainer: u } = this,
      s = 'ownerSVGElement' in u,
      n = s ? u.ownerDocument : u;
    let r = eo(n, e);
    if (s) {
      const i = [...r.childNodes];
      (r = n.createDocumentFragment()),
        Object.setPrototypeOf(r, Au.prototype),
        (r.ownerSVGElement = n);
      for (const a of i)
        Object.setPrototypeOf(a, Au.prototype),
          (a.ownerSVGElement = n),
          r.appendChild(a);
    } else this.selectNode(r);
    return r;
  }
  cloneRange() {
    const e = new Nr();
    return (e[Ie] = this[Ie]), (e[T] = this[T]), e;
  }
}
const Hh = ({ nodeType: t }, e) => {
  switch (t) {
    case M:
      return e & nd;
    case Te:
      return e & rd;
    case bt:
      return e & ad;
    case ct:
      return e & id;
  }
  return 0;
};
class Gh {
  constructor(e, u = sd) {
    (this.root = e), (this.currentNode = e), (this.whatToShow = u);
    let { [m]: s, [T]: n } = e;
    if (e.nodeType === Ot) {
      const { documentElement: i } = e;
      (s = i), (n = i[T]);
    }
    const r = [];
    for (; s && s !== n; ) Hh(s, u) && r.push(s), (s = s[m]);
    this[ye] = { i: 0, nodes: r };
  }
  nextNode() {
    const e = this[ye];
    return (
      (this.currentNode = e.i < e.nodes.length ? e.nodes[e.i++] : null),
      this.currentNode
    );
  }
}
const Wi = (t, e, u) => {
    let { [m]: s, [T]: n } = e;
    return t.call({ ownerDocument: e, [m]: s, [T]: n }, u);
  },
  k0 = fd({}, kf, Fh, {
    CustomEvent: O0,
    Event: Vt,
    EventTarget: Qn,
    InputEvent: Uh,
    NamedNodeMap: Ho,
    NodeList: ot,
  }),
  Ju = new WeakMap();
let Ut = class extends ar {
  constructor(e) {
    super(null, '#document', Ot),
      (this[Je] = { active: !1, registry: null }),
      (this[Tt] = { active: !1, class: null }),
      (this[ou] = Vh[e]),
      (this[Dt] = null),
      (this[Tn] = null),
      (this[es] = null),
      (this[Ze] = null),
      (this[yu] = null);
  }
  get defaultView() {
    return (
      Ju.has(this) ||
        Ju.set(
          this,
          new Proxy(globalThis, {
            set: (e, u, s) => {
              switch (u) {
                case 'addEventListener':
                case 'removeEventListener':
                case 'dispatchEvent':
                  this[bu][u] = s;
                  break;
                default:
                  e[u] = s;
                  break;
              }
              return !0;
            },
            get: (e, u) => {
              switch (u) {
                case 'addEventListener':
                case 'removeEventListener':
                case 'dispatchEvent':
                  if (!this[bu]) {
                    const s = (this[bu] = new Qn());
                    (s.dispatchEvent = s.dispatchEvent.bind(s)),
                      (s.addEventListener = s.addEventListener.bind(s)),
                      (s.removeEventListener = s.removeEventListener.bind(s));
                  }
                  return this[bu][u];
                case 'document':
                  return this;
                case 'navigator':
                  return {
                    userAgent:
                      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
                  };
                case 'window':
                  return Ju.get(this);
                case 'customElements':
                  return (
                    this[Je].registry || (this[Je] = new Sd(this)), this[Je]
                  );
                case 'performance':
                  return Ad.performance;
                case 'DOMParser':
                  return this[Tn];
                case 'Image':
                  return this[Ze] || (this[Ze] = $h(this)), this[Ze];
                case 'MutationObserver':
                  return (
                    this[Tt].class || (this[Tt] = new Nd(this)), this[Tt].class
                  );
              }
              return (this[es] && this[es][u]) || k0[u] || e[u];
            },
          })
        ),
      Ju.get(this)
    );
  }
  get doctype() {
    const e = this[Dt];
    if (e) return e;
    const { firstChild: u } = this;
    return u && u.nodeType === au ? (this[Dt] = u) : null;
  }
  set doctype(e) {
    if (
      /^([a-z:]+)(\s+system|\s+public(\s+"([^"]+)")?)?(\s+"([^"]+)")?/i.test(e)
    ) {
      const { $1: u, $4: s, $6: n } = RegExp;
      (this[Dt] = new fs(this, u, s, n)), xs(this, this[Dt], this[m]);
    }
  }
  get documentElement() {
    return this.firstElementChild;
  }
  get isConnected() {
    return !0;
  }
  _getParent() {
    return this[bu];
  }
  createAttribute(e) {
    return new Du(this, e);
  }
  createCDATASection(e) {
    return new nr(this, e);
  }
  createComment(e) {
    return new rr(this, e);
  }
  createDocumentFragment() {
    return new or(this);
  }
  createDocumentType(e, u, s) {
    return new fs(this, e, u, s);
  }
  createElement(e) {
    return new Mu(this, e);
  }
  createRange() {
    const e = new Nr();
    return (e.commonAncestorContainer = this), e;
  }
  createTextNode(e) {
    return new Iu(this, e);
  }
  createTreeWalker(e, u = -1) {
    return new Gh(e, u);
  }
  createNodeIterator(e, u = -1) {
    return this.createTreeWalker(e, u);
  }
  createEvent(e) {
    const u = hd(e === 'Event' ? new Vt('') : new O0(''));
    return (
      (u.initEvent = u.initCustomEvent =
        (s, n = !1, r = !1, i) => {
          (u.bubbles = !!n),
            pd(u, {
              type: { value: s },
              canBubble: { value: n },
              cancelable: { value: r },
              detail: { value: i },
            });
        }),
      u
    );
  }
  cloneNode(e = !1) {
    const { constructor: u, [Je]: s, [Dt]: n } = this,
      r = new u();
    if (((r[Je] = s), e)) {
      const i = r[T],
        { childNodes: a } = this;
      for (let { length: o } = a, c = 0; c < o; c++)
        r.insertBefore(a[c].cloneNode(!0), i);
      n && (r[Dt] = a[0]);
    }
    return r;
  }
  importNode(e) {
    const u = 1 < arguments.length && !!arguments[1],
      s = e.cloneNode(u),
      { [Je]: n } = this,
      { active: r } = n,
      i = (a) => {
        const { ownerDocument: o, nodeType: c } = a;
        (a.ownerDocument = this), r && o !== this && c === M && n.upgrade(a);
      };
    if ((i(s), u))
      switch (s.nodeType) {
        case M:
        case pt: {
          let { [m]: a, [T]: o } = s;
          for (; a !== o; ) a.nodeType === M && i(a), (a = a[m]);
          break;
        }
      }
    return s;
  }
  toString() {
    return this.childNodes.join('');
  }
  querySelector(e) {
    return Wi(super.querySelector, this, e);
  }
  querySelectorAll(e) {
    return Wi(super.querySelectorAll, this, e);
  }
  getElementsByTagNameNS(e, u) {
    return this.getElementsByTagName(u);
  }
  createAttributeNS(e, u) {
    return this.createAttribute(u);
  }
  createElementNS(e, u, s) {
    return e === ls ? new Au(this, u, null) : this.createElement(u, s);
  }
};
Ae(
  (k0.Document = function () {
    Be();
  }),
  Ut
).prototype = Ut.prototype;
const jh = (t, e, u, s) => {
  if (!e && ds.has(u)) {
    const i = ds.get(u);
    return new i(t, u);
  }
  const {
    [Je]: { active: n, registry: r },
  } = t;
  if (n) {
    const i = e ? s.is : u;
    if (r.has(i)) {
      const { Class: a } = r.get(i),
        o = new a(t, u);
      return Ft.set(o, { connected: !1 }), o;
    }
  }
  return new x(t, u);
};
class zh extends Ut {
  constructor() {
    super('text/html');
  }
  get all() {
    const e = new ot();
    let { [m]: u, [T]: s } = this;
    for (; u !== s; ) {
      switch (u.nodeType) {
        case M:
          e.push(u);
          break;
      }
      u = u[m];
    }
    return e;
  }
  get head() {
    const { documentElement: e } = this;
    let { firstElementChild: u } = e;
    return (
      (!u || u.tagName !== 'HEAD') &&
        ((u = this.createElement('head')), e.prepend(u)),
      u
    );
  }
  get body() {
    const { head: e } = this;
    let { nextElementSibling: u } = e;
    return (
      (!u || u.tagName !== 'BODY') &&
        ((u = this.createElement('body')), e.after(u)),
      u
    );
  }
  get title() {
    const { head: e } = this;
    return e.getElementsByTagName('title').at(0)?.textContent || '';
  }
  set title(e) {
    const { head: u } = this;
    let s = u.getElementsByTagName('title').at(0);
    s
      ? (s.textContent = e)
      : (u.insertBefore(this.createElement('title'), u.firstChild).textContent =
          e);
  }
  createElement(e, u) {
    const s = !!(u && u.is),
      n = jh(this, s, e, u);
    return s && n.setAttribute('is', u.is), n;
  }
}
class Wh extends Ut {
  constructor() {
    super('image/svg+xml');
  }
  toString() {
    return this[ou].docType + super.toString();
  }
}
class Kh extends Ut {
  constructor() {
    super('text/xml');
  }
  toString() {
    return this[ou].docType + super.toString();
  }
}
class Rr {
  parseFromString(e, u, s = null) {
    let n = !1,
      r;
    return (
      u === 'text/html'
        ? ((n = !0), (r = new zh()))
        : u === 'image/svg+xml'
        ? (r = new Wh())
        : (r = new Kh()),
      (r[Tn] = Rr),
      s && (r[es] = s),
      n &&
        e === '...' &&
        (e = '<!doctype html><html><head></head><body></body></html>'),
      e ? uo(r, n, e) : r
    );
  }
}
const Xh = (t, e = null) =>
  new Rr().parseFromString(t, 'text/html', e).defaultView;
function Jh() {
  Be();
}
Ae(Jh, Ut).prototype = Ut.prototype;
const Qe = (t) => {
    if (typeof document < 'u' && document instanceof Document)
      return document.createElementNS('http://www.w3.org/2000/svg', t);
    {
      const { document: e } = Xh(
        '<!doctype html><html><head></head><body></body></html>'
      );
      return e.createElementNS('http://www.w3.org/2000/svg', t);
    }
  },
  Zh = (t, e) => {
    const u = Qe('svg');
    return (
      u.setAttribute('width', `${e}`),
      u.setAttribute('height', `${t}`),
      u.setAttribute('viewBox', `0 0 ${e} ${t}`),
      u.setAttribute('xmlns', 'http://www.w3.org/2000/svg'),
      u.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink'),
      u
    );
  },
  Yh = 15,
  Qh = (
    t,
    e,
    u,
    s,
    n,
    r,
    i,
    a,
    { width: o, height: c },
    { barClass: l, textClass: f }
  ) => {
    const b = Qe('text'),
      h = Qe('rect');
    let S = 0,
      E = 0,
      I = u,
      D = i,
      H = 0,
      q = 0;
    S = i * 2 * t + n;
    {
      const R = D;
      (D = I), (I = R);
      const k = S;
      (S = E), (E = k), (H = D + Yh), (q = E + I * 0.5);
    }
    return (
      r !== i && ((I = r), (E += Math.abs(i * 0.5 - r))),
      h.setAttribute('fill', a),
      h.setAttribute('x', `${S}`),
      h.setAttribute('y', `${E}`),
      h.setAttribute('width', `${D}`),
      h.setAttribute('height', `${I}`),
      h.setAttribute('title', `Bar value of ${u}`),
      h.classList.add(l),
      b.setAttribute('fill', a),
      b.setAttribute('x', `${H}`),
      b.setAttribute('y', `${q}`),
      b.setAttribute('title', `Bar label ${s}`),
      (b.textContent = s),
      f && b.classList.add(f),
      [h, b]
    );
  };
function e1(t, e, u) {
  if (!Number.isFinite(t))
    throw new RangeError(`Cannot generate a random number: min cannot be ${t}`);
  if (!Number.isFinite(e))
    throw new RangeError(`Cannot generate a random number: max cannot be ${e}`);
  if (e < t)
    throw new RangeError(
      `Cannot generate a random number as max must be greater than or equal to min: max=${e}, min=${t}`
    );
  const s = (0, Math.random)(),
    n = t * (1 - s) + e * s;
  return n >= t && n < e ? n : t;
}
function t1(t, e, u) {
  return Math.floor(e1(Math.ceil(t), Math.floor(e) + 1));
}
new Uint8Array(new Uint16Array([1]).buffer)[0];
const u1 = new Uint8Array(4);
new DataView(u1.buffer);
const s1 = new Uint8Array(8);
new DataView(s1.buffer);
const n1 = (t, e) => {
    let u = e;
    for (; u !== 0; ) t.push(''), u--;
  },
  r1 = (t, e) => {
    let u = e;
    for (; u !== 0; ) t.push(0), u--;
  },
  P0 = (t = 8) => {
    const e = 'abdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let u = '';
    for (let s = 0; s < t; s++) u += e[t1(0, e.length - 1)];
    return u;
  },
  i1 = (t, e = 'left-to-right', u) => {
    const s = Qe('defs'),
      n = Qe('linearGradient'),
      r = P0();
    n.id = r;
    const i = 1 / (t.length - 1);
    for (let a = 0; a < t.length; a++) {
      const o = Qe('stop'),
        c = a * i * 100;
      o.setAttribute('offset', `${c}%`),
        o.setAttribute('stop-color', t[a % t.length]),
        n.appendChild(o);
    }
    if (
      (s.appendChild(n),
      e === 'left-to-right' || e === 'right-to-left'
        ? n.setAttribute('gradientTransform', 'rotate(180,0.5,0.5)')
        : e === 'top-to-bottom'
        ? n.setAttribute('gradientTransform', 'rotate(90,0.5,0.5)')
        : e === 'bottom-to-top'
        ? n.setAttribute('gradientTransform', 'rotate(270,0.5,0.5)')
        : n.setAttribute('gradientTransform', `rotate(${e},0.5,0.5)`),
      u === 'individual')
    )
      return [s, r, null];
    {
      const a = Qe('rect');
      return (
        a.setAttribute('x', '0'),
        a.setAttribute('y', '0'),
        a.setAttribute('width', '100%'),
        a.setAttribute('height', '100%'),
        a.setAttribute('fill', `url('#${r}')`),
        [s, r, a]
      );
    }
  },
  a1 = (t) => {
    const e = P0(),
      u = Qe('mask');
    u.id = e;
    const s = Qe('rect');
    s.setAttribute('x', '0'),
      s.setAttribute('y', '0'),
      s.setAttribute('width', '100%'),
      s.setAttribute('height', '100%'),
      s.setAttribute('fill', '#000000'),
      u.appendChild(s);
    for (const n of t) {
      const r = n.cloneNode();
      r.setAttribute('fill', '#ffffff'),
        u.appendChild(r),
        r.getAttribute('title') && r.removeAttribute('title');
    }
    return [e, u];
  },
  Ki = { size: 300 },
  o1 = (t) => Math.round(t / 10) * 10,
  c1 = (t) => o1(Math.max(...t)),
  l1 = (t, e) => t / e / 2,
  d1 = (t, e) => t / e / 4;
function f1({
  data: t,
  labels: e = [],
  height: u,
  width: s,
  gap: n,
  max: r,
  placement: i,
  barWidth: a,
  groupClass: o,
  parentClass: c,
  barClass: l,
  textClass: f,
  barGroupClass: b,
  textGroupClass: h,
  colors: S,
  gradientColors: E,
  gradientMode: I,
  gradientDirection: D,
}) {
  if (
    (r || (r = c1(t)),
    u || (u = Ki.size),
    s || (s = Ki.size),
    e.length < t.length)
  ) {
    const _ = Math.abs(e.length - t.length);
    n1(e, _);
  }
  if (t.length < e.length) {
    const _ = Math.abs(e.length - t.length);
    r1(t, _);
  }
  const G = t.length,
    R = l1(u, G);
  a || (a = R),
    n || (n = d1(u, G)),
    a * G + (n * G - 1) > u &&
      console.warn('toomanychart might exceed given size bounds');
  const z = Zh(u, s);
  t.some((_) => _ > u) && z.setAttribute('viewBox', `0 0 ${r} ${u}`);
  let te = !1,
    me = null,
    ue = null,
    B = null;
  if (E) {
    (te = !0), I || (I = 'individual');
    const [_, Q, _e] = i1(E, D, I);
    (me = Q), (ue = _), (B = _e);
  }
  ue && z.appendChild(ue);
  const W = Qe('g'),
    he = Qe('g');
  o && (W.classList.add(o), he.classList.add(o)),
    b && W.classList.add(b),
    h && he.classList.add(h),
    W.classList.add('nc-bargroup'),
    he.classList.add('nc-textgroup');
  const pe = [];
  for (let _ = 0; _ < t.length; _++) {
    const Q = e[_],
      _e = t[_],
      J =
        te && me
          ? I === 'continuous'
            ? 'transparent'
            : `url('#${me}')`
          : S && S.length > 0
          ? S[_ % S.length]
          : '#ffffff',
      [y, oe] = Qh(
        _,
        i,
        _e,
        Q,
        n,
        a,
        R,
        J,
        { width: s, height: u },
        { textClass: f, barClass: l }
      );
    W.appendChild(y),
      he.appendChild(oe),
      I === 'continuous' && me && pe.push(y);
  }
  if (te && ue && B && I === 'continuous') {
    const [_, Q] = a1(pe);
    ue.appendChild(Q), B.setAttribute('mask', `url('#${_}')`), z.appendChild(B);
  }
  return z.appendChild(W), z.appendChild(he), c && z.classList.add(c), z;
}
const h1 = () => {
  xa.set('.el-bar', { transformOrigin: 'left center', scaleX: 0 }),
    Rc('.el-bar', { scaleX: [0, 1], duration: 2e3, ease: 'linear' });
};
function p1() {
  const t = f1({ data: [50, 100, 30], barClass: 'el-bar', placement: 'left' });
  return (
    setTimeout(() => {
      h1();
    }, 100),
    t
  );
}
const b1 = document.querySelector('#app'),
  g1 = p1();
b1.appendChild(g1);
