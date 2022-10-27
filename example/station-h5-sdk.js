/*! For license information please see station-web-sdk.js.LICENSE.txt */
!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.stationH5SDK = t())
    : (e.stationH5SDK = t());
})(self, () =>
  (() => {
    var e = {
        9669: (e, t, n) => {
          e.exports = n(1609);
        },
        5448: (e, t, n) => {
          'use strict';
          var r = n(4867),
            o = n(6026),
            i = n(5327),
            a = n(4109),
            s = n(7985),
            c = n(5061);
          e.exports = function (e) {
            return new Promise(function (t, u) {
              var l = e.data,
                d = e.headers;
              r.isFormData(l) && delete d['Content-Type'];
              var p = new XMLHttpRequest();
              if (e.auth) {
                var f = e.auth.username || '',
                  h = e.auth.password || '';
                d.Authorization = 'Basic ' + btoa(f + ':' + h);
              }
              if (
                (p.open(e.method.toUpperCase(), i(e.url, e.params, e.paramsSerializer), !0),
                (p.timeout = e.timeout),
                (p.onreadystatechange = function () {
                  if (
                    p &&
                    4 === p.readyState &&
                    (0 !== p.status || (p.responseURL && 0 === p.responseURL.indexOf('file:')))
                  ) {
                    var n = 'getAllResponseHeaders' in p ? a(p.getAllResponseHeaders()) : null,
                      r = {
                        data: e.responseType && 'text' !== e.responseType ? p.response : p.responseText,
                        status: p.status,
                        statusText: p.statusText,
                        headers: n,
                        config: e,
                        request: p,
                      };
                    o(t, u, r), (p = null);
                  }
                }),
                (p.onerror = function () {
                  u(c('Network Error', e, null, p)), (p = null);
                }),
                (p.ontimeout = function () {
                  u(c('timeout of ' + e.timeout + 'ms exceeded', e, 'ECONNABORTED', p)), (p = null);
                }),
                r.isStandardBrowserEnv())
              ) {
                var v = n(4372),
                  m = (e.withCredentials || s(e.url)) && e.xsrfCookieName ? v.read(e.xsrfCookieName) : void 0;
                m && (d[e.xsrfHeaderName] = m);
              }
              if (
                ('setRequestHeader' in p &&
                  r.forEach(d, function (e, t) {
                    void 0 === l && 'content-type' === t.toLowerCase() ? delete d[t] : p.setRequestHeader(t, e);
                  }),
                e.withCredentials && (p.withCredentials = !0),
                e.responseType)
              )
                try {
                  p.responseType = e.responseType;
                } catch (t) {
                  if ('json' !== e.responseType) throw t;
                }
              'function' == typeof e.onDownloadProgress && p.addEventListener('progress', e.onDownloadProgress),
                'function' == typeof e.onUploadProgress &&
                  p.upload &&
                  p.upload.addEventListener('progress', e.onUploadProgress),
                e.cancelToken &&
                  e.cancelToken.promise.then(function (e) {
                    p && (p.abort(), u(e), (p = null));
                  }),
                void 0 === l && (l = null),
                p.send(l);
            });
          };
        },
        1609: (e, t, n) => {
          'use strict';
          var r = n(4867),
            o = n(1849),
            i = n(321),
            a = n(5655);
          function s(e) {
            var t = new i(e),
              n = o(i.prototype.request, t);
            return r.extend(n, i.prototype, t), r.extend(n, t), n;
          }
          var c = s(a);
          (c.Axios = i),
            (c.create = function (e) {
              return s(r.merge(a, e));
            }),
            (c.Cancel = n(5263)),
            (c.CancelToken = n(4972)),
            (c.isCancel = n(6502)),
            (c.all = function (e) {
              return Promise.all(e);
            }),
            (c.spread = n(8713)),
            (e.exports = c),
            (e.exports.default = c);
        },
        5263: (e) => {
          'use strict';
          function t(e) {
            this.message = e;
          }
          (t.prototype.toString = function () {
            return 'Cancel' + (this.message ? ': ' + this.message : '');
          }),
            (t.prototype.__CANCEL__ = !0),
            (e.exports = t);
        },
        4972: (e, t, n) => {
          'use strict';
          var r = n(5263);
          function o(e) {
            if ('function' != typeof e) throw new TypeError('executor must be a function.');
            var t;
            this.promise = new Promise(function (e) {
              t = e;
            });
            var n = this;
            e(function (e) {
              n.reason || ((n.reason = new r(e)), t(n.reason));
            });
          }
          (o.prototype.throwIfRequested = function () {
            if (this.reason) throw this.reason;
          }),
            (o.source = function () {
              var e;
              return {
                token: new o(function (t) {
                  e = t;
                }),
                cancel: e,
              };
            }),
            (e.exports = o);
        },
        6502: (e) => {
          'use strict';
          e.exports = function (e) {
            return !(!e || !e.__CANCEL__);
          };
        },
        321: (e, t, n) => {
          'use strict';
          var r = n(5655),
            o = n(4867),
            i = n(782),
            a = n(3572);
          function s(e) {
            (this.defaults = e), (this.interceptors = { request: new i(), response: new i() });
          }
          (s.prototype.request = function (e) {
            'string' == typeof e && (e = o.merge({ url: arguments[0] }, arguments[1])),
              ((e = o.merge(r, { method: 'get' }, this.defaults, e)).method = e.method.toLowerCase());
            var t = [a, void 0],
              n = Promise.resolve(e);
            for (
              this.interceptors.request.forEach(function (e) {
                t.unshift(e.fulfilled, e.rejected);
              }),
                this.interceptors.response.forEach(function (e) {
                  t.push(e.fulfilled, e.rejected);
                });
              t.length;

            )
              n = n.then(t.shift(), t.shift());
            return n;
          }),
            o.forEach(['delete', 'get', 'head', 'options'], function (e) {
              s.prototype[e] = function (t, n) {
                return this.request(o.merge(n || {}, { method: e, url: t }));
              };
            }),
            o.forEach(['post', 'put', 'patch'], function (e) {
              s.prototype[e] = function (t, n, r) {
                return this.request(o.merge(r || {}, { method: e, url: t, data: n }));
              };
            }),
            (e.exports = s);
        },
        782: (e, t, n) => {
          'use strict';
          var r = n(4867);
          function o() {
            this.handlers = [];
          }
          (o.prototype.use = function (e, t) {
            return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1;
          }),
            (o.prototype.eject = function (e) {
              this.handlers[e] && (this.handlers[e] = null);
            }),
            (o.prototype.forEach = function (e) {
              r.forEach(this.handlers, function (t) {
                null !== t && e(t);
              });
            }),
            (e.exports = o);
        },
        5061: (e, t, n) => {
          'use strict';
          var r = n(481);
          e.exports = function (e, t, n, o, i) {
            var a = new Error(e);
            return r(a, t, n, o, i);
          };
        },
        3572: (e, t, n) => {
          'use strict';
          var r = n(4867),
            o = n(8527),
            i = n(6502),
            a = n(5655),
            s = n(1793),
            c = n(7303);
          function u(e) {
            e.cancelToken && e.cancelToken.throwIfRequested();
          }
          e.exports = function (e) {
            return (
              u(e),
              e.baseURL && !s(e.url) && (e.url = c(e.baseURL, e.url)),
              (e.headers = e.headers || {}),
              (e.data = o(e.data, e.headers, e.transformRequest)),
              (e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {})),
              r.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function (t) {
                delete e.headers[t];
              }),
              (e.adapter || a.adapter)(e).then(
                function (t) {
                  return u(e), (t.data = o(t.data, t.headers, e.transformResponse)), t;
                },
                function (t) {
                  return (
                    i(t) ||
                      (u(e),
                      t &&
                        t.response &&
                        (t.response.data = o(t.response.data, t.response.headers, e.transformResponse))),
                    Promise.reject(t)
                  );
                },
              )
            );
          };
        },
        481: (e) => {
          'use strict';
          e.exports = function (e, t, n, r, o) {
            return (e.config = t), n && (e.code = n), (e.request = r), (e.response = o), e;
          };
        },
        6026: (e, t, n) => {
          'use strict';
          var r = n(5061);
          e.exports = function (e, t, n) {
            var o = n.config.validateStatus;
            n.status && o && !o(n.status)
              ? t(r('Request failed with status code ' + n.status, n.config, null, n.request, n))
              : e(n);
          };
        },
        8527: (e, t, n) => {
          'use strict';
          var r = n(4867);
          e.exports = function (e, t, n) {
            return (
              r.forEach(n, function (n) {
                e = n(e, t);
              }),
              e
            );
          };
        },
        5655: (e, t, n) => {
          'use strict';
          var r = n(4867),
            o = n(6016),
            i = { 'Content-Type': 'application/x-www-form-urlencoded' };
          function a(e, t) {
            !r.isUndefined(e) && r.isUndefined(e['Content-Type']) && (e['Content-Type'] = t);
          }
          var s,
            c = {
              adapter: (('undefined' != typeof XMLHttpRequest || 'undefined' != typeof process) && (s = n(5448)), s),
              transformRequest: [
                function (e, t) {
                  return (
                    o(t, 'Content-Type'),
                    r.isFormData(e) ||
                    r.isArrayBuffer(e) ||
                    r.isBuffer(e) ||
                    r.isStream(e) ||
                    r.isFile(e) ||
                    r.isBlob(e)
                      ? e
                      : r.isArrayBufferView(e)
                      ? e.buffer
                      : r.isURLSearchParams(e)
                      ? (a(t, 'application/x-www-form-urlencoded;charset=utf-8'), e.toString())
                      : r.isObject(e)
                      ? (a(t, 'application/json;charset=utf-8'), JSON.stringify(e))
                      : e
                  );
                },
              ],
              transformResponse: [
                function (e) {
                  if ('string' == typeof e)
                    try {
                      e = JSON.parse(e);
                    } catch (e) {}
                  return e;
                },
              ],
              timeout: 0,
              xsrfCookieName: 'XSRF-TOKEN',
              xsrfHeaderName: 'X-XSRF-TOKEN',
              maxContentLength: -1,
              validateStatus: function (e) {
                return e >= 200 && e < 300;
              },
              headers: { common: { Accept: 'application/json, text/plain, */*' } },
            };
          r.forEach(['delete', 'get', 'head'], function (e) {
            c.headers[e] = {};
          }),
            r.forEach(['post', 'put', 'patch'], function (e) {
              c.headers[e] = r.merge(i);
            }),
            (e.exports = c);
        },
        1849: (e) => {
          'use strict';
          e.exports = function (e, t) {
            return function () {
              for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
              return e.apply(t, n);
            };
          };
        },
        5327: (e, t, n) => {
          'use strict';
          var r = n(4867);
          function o(e) {
            return encodeURIComponent(e)
              .replace(/%40/gi, '@')
              .replace(/%3A/gi, ':')
              .replace(/%24/g, '$')
              .replace(/%2C/gi, ',')
              .replace(/%20/g, '+')
              .replace(/%5B/gi, '[')
              .replace(/%5D/gi, ']');
          }
          e.exports = function (e, t, n) {
            if (!t) return e;
            var i;
            if (n) i = n(t);
            else if (r.isURLSearchParams(t)) i = t.toString();
            else {
              var a = [];
              r.forEach(t, function (e, t) {
                null != e &&
                  (r.isArray(e) ? (t += '[]') : (e = [e]),
                  r.forEach(e, function (e) {
                    r.isDate(e) ? (e = e.toISOString()) : r.isObject(e) && (e = JSON.stringify(e)),
                      a.push(o(t) + '=' + o(e));
                  }));
              }),
                (i = a.join('&'));
            }
            return i && (e += (-1 === e.indexOf('?') ? '?' : '&') + i), e;
          };
        },
        7303: (e) => {
          'use strict';
          e.exports = function (e, t) {
            return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e;
          };
        },
        4372: (e, t, n) => {
          'use strict';
          var r = n(4867);
          e.exports = r.isStandardBrowserEnv()
            ? {
                write: function (e, t, n, o, i, a) {
                  var s = [];
                  s.push(e + '=' + encodeURIComponent(t)),
                    r.isNumber(n) && s.push('expires=' + new Date(n).toGMTString()),
                    r.isString(o) && s.push('path=' + o),
                    r.isString(i) && s.push('domain=' + i),
                    !0 === a && s.push('secure'),
                    (document.cookie = s.join('; '));
                },
                read: function (e) {
                  var t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
                  return t ? decodeURIComponent(t[3]) : null;
                },
                remove: function (e) {
                  this.write(e, '', Date.now() - 864e5);
                },
              }
            : {
                write: function () {},
                read: function () {
                  return null;
                },
                remove: function () {},
              };
        },
        1793: (e) => {
          'use strict';
          e.exports = function (e) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
          };
        },
        7985: (e, t, n) => {
          'use strict';
          var r = n(4867);
          e.exports = r.isStandardBrowserEnv()
            ? (function () {
                var e,
                  t = /(msie|trident)/i.test(navigator.userAgent),
                  n = document.createElement('a');
                function o(e) {
                  var r = e;
                  return (
                    t && (n.setAttribute('href', r), (r = n.href)),
                    n.setAttribute('href', r),
                    {
                      href: n.href,
                      protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
                      host: n.host,
                      search: n.search ? n.search.replace(/^\?/, '') : '',
                      hash: n.hash ? n.hash.replace(/^#/, '') : '',
                      hostname: n.hostname,
                      port: n.port,
                      pathname: '/' === n.pathname.charAt(0) ? n.pathname : '/' + n.pathname,
                    }
                  );
                }
                return (
                  (e = o(window.location.href)),
                  function (t) {
                    var n = r.isString(t) ? o(t) : t;
                    return n.protocol === e.protocol && n.host === e.host;
                  }
                );
              })()
            : function () {
                return !0;
              };
        },
        6016: (e, t, n) => {
          'use strict';
          var r = n(4867);
          e.exports = function (e, t) {
            r.forEach(e, function (n, r) {
              r !== t && r.toUpperCase() === t.toUpperCase() && ((e[t] = n), delete e[r]);
            });
          };
        },
        4109: (e, t, n) => {
          'use strict';
          var r = n(4867),
            o = [
              'age',
              'authorization',
              'content-length',
              'content-type',
              'etag',
              'expires',
              'from',
              'host',
              'if-modified-since',
              'if-unmodified-since',
              'last-modified',
              'location',
              'max-forwards',
              'proxy-authorization',
              'referer',
              'retry-after',
              'user-agent',
            ];
          e.exports = function (e) {
            var t,
              n,
              i,
              a = {};
            return e
              ? (r.forEach(e.split('\n'), function (e) {
                  if (
                    ((i = e.indexOf(':')), (t = r.trim(e.substr(0, i)).toLowerCase()), (n = r.trim(e.substr(i + 1))), t)
                  ) {
                    if (a[t] && o.indexOf(t) >= 0) return;
                    a[t] = 'set-cookie' === t ? (a[t] ? a[t] : []).concat([n]) : a[t] ? a[t] + ', ' + n : n;
                  }
                }),
                a)
              : a;
          };
        },
        8713: (e) => {
          'use strict';
          e.exports = function (e) {
            return function (t) {
              return e.apply(null, t);
            };
          };
        },
        4867: (e, t, n) => {
          'use strict';
          var r = n(1849),
            o = n(8738),
            i = Object.prototype.toString;
          function a(e) {
            return '[object Array]' === i.call(e);
          }
          function s(e) {
            return null !== e && 'object' == typeof e;
          }
          function c(e) {
            return '[object Function]' === i.call(e);
          }
          function u(e, t) {
            if (null != e)
              if (('object' != typeof e && (e = [e]), a(e)))
                for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
              else for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);
          }
          e.exports = {
            isArray: a,
            isArrayBuffer: function (e) {
              return '[object ArrayBuffer]' === i.call(e);
            },
            isBuffer: o,
            isFormData: function (e) {
              return 'undefined' != typeof FormData && e instanceof FormData;
            },
            isArrayBufferView: function (e) {
              return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
                ? ArrayBuffer.isView(e)
                : e && e.buffer && e.buffer instanceof ArrayBuffer;
            },
            isString: function (e) {
              return 'string' == typeof e;
            },
            isNumber: function (e) {
              return 'number' == typeof e;
            },
            isObject: s,
            isUndefined: function (e) {
              return void 0 === e;
            },
            isDate: function (e) {
              return '[object Date]' === i.call(e);
            },
            isFile: function (e) {
              return '[object File]' === i.call(e);
            },
            isBlob: function (e) {
              return '[object Blob]' === i.call(e);
            },
            isFunction: c,
            isStream: function (e) {
              return s(e) && c(e.pipe);
            },
            isURLSearchParams: function (e) {
              return 'undefined' != typeof URLSearchParams && e instanceof URLSearchParams;
            },
            isStandardBrowserEnv: function () {
              return (
                ('undefined' == typeof navigator || 'ReactNative' !== navigator.product) &&
                'undefined' != typeof window &&
                'undefined' != typeof document
              );
            },
            forEach: u,
            merge: function e() {
              var t = {};
              function n(n, r) {
                'object' == typeof t[r] && 'object' == typeof n ? (t[r] = e(t[r], n)) : (t[r] = n);
              }
              for (var r = 0, o = arguments.length; r < o; r++) u(arguments[r], n);
              return t;
            },
            extend: function (e, t, n) {
              return (
                u(t, function (t, o) {
                  e[o] = n && 'function' == typeof t ? r(t, n) : t;
                }),
                e
              );
            },
            trim: function (e) {
              return e.replace(/^\s*/, '').replace(/\s*$/, '');
            },
          };
        },
        1605: (e, t, n) => {
          'use strict';
          n.r(t),
            n.d(t, {
              getCharacterList: () => a,
              getLiveKitToken: () => p,
              getSkillList: () => s,
              heart: () => d,
              join: () => u,
              matching: () => c,
              post: () => i,
              sendSkill: () => l,
            });
          var r = n(3386);
          function o(e, t) {
            return (0, r.Z)({ baseURL: 'https://api.open.crossevery.com', url: e, method: 'get', params: t });
          }
          function i(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return (0, r.Z)({ baseURL: 'https://api.open.crossevery.com', url: e, method: 'post', data: t, params: n });
          }
          function a(e) {
            return o('/endpoint/character/list', e);
          }
          function s(e) {
            return o('/endpoint/character/abi', e);
          }
          function c(e) {
            return o('/endpoint/matching/match', e);
          }
          function u(e, t) {
            return i('/endpoint/matching/join', e, t);
          }
          function l(e) {
            return o('/endpoint/character/play', e);
          }
          function d(e) {
            return o('/endpoint/polling/point', e);
          }
          function p(e) {
            return o(e);
          }
        },
        5809: (e, t, n) => {
          'use strict';
          n.d(t, { IZ: () => o });
          var r = n(3386);
          function o(e) {
            return (
              (t = '/stationpoint/role/self'),
              (n = e),
              (0, r.Z)({ baseURL: 'https://api.open.crossevery.com', url: t, method: 'get', params: n })
            );
            var t, n;
          }
        },
        3386: (e, t, n) => {
          'use strict';
          n.d(t, { Z: () => v });
          var r = n(9669),
            o = n.n(r),
            i = n(2492),
            a = n.n(i),
            s = n(129),
            c = n.n(s);
          function u(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n) e[r] = n[r];
            }
            return e;
          }
          const l = (function e(t, n) {
            function r(e, r, o) {
              if ('undefined' != typeof document) {
                'number' == typeof (o = u({}, n, o)).expires && (o.expires = new Date(Date.now() + 864e5 * o.expires)),
                  o.expires && (o.expires = o.expires.toUTCString()),
                  (e = encodeURIComponent(e)
                    .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                    .replace(/[()]/g, escape));
                var i = '';
                for (var a in o) o[a] && ((i += '; ' + a), !0 !== o[a] && (i += '=' + o[a].split(';')[0]));
                return (document.cookie = e + '=' + t.write(r, e) + i);
              }
            }
            return Object.create(
              {
                set: r,
                get: function (e) {
                  if ('undefined' != typeof document && (!arguments.length || e)) {
                    for (var n = document.cookie ? document.cookie.split('; ') : [], r = {}, o = 0; o < n.length; o++) {
                      var i = n[o].split('='),
                        a = i.slice(1).join('=');
                      try {
                        var s = decodeURIComponent(i[0]);
                        if (((r[s] = t.read(a, s)), e === s)) break;
                      } catch (e) {}
                    }
                    return e ? r[e] : r;
                  }
                },
                remove: function (e, t) {
                  r(e, '', u({}, t, { expires: -1 }));
                },
                withAttributes: function (t) {
                  return e(this.converter, u({}, this.attributes, t));
                },
                withConverter: function (t) {
                  return e(u({}, this.converter, t), this.attributes);
                },
              },
              { attributes: { value: Object.freeze(n) }, converter: { value: Object.freeze(t) } },
            );
          })(
            {
              read: function (e) {
                return '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
              },
              write: function (e) {
                return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
              },
            },
            { path: '/' },
          );
          function d() {
            var e = l.get('cross_sdk_token');
            return e || (e = c().parse(window.location.search, { ignoreQueryPrefix: !0 }).ticket), e;
          }
          var p = n(7484),
            f = n.n(p),
            h = o().create({ baseURL: 'https://api.open.crossevery.com', timeout: 6e5 });
          h.interceptors.request.use(
            function (e) {
              return (
                d() &&
                  (e.url =
                    e.url + (e.url.indexOf('?') >= 0 ? '&' : '?token=' + d() + '&appId=10004&_t=' + f()().valueOf())),
                e
              );
            },
            function (e) {
              return console.log(e), Promise.reject(e);
            },
          ),
            h.interceptors.response.use(
              function (e) {
                var t = e.data;
                return t.code && 200 !== t.code
                  ? 401 === t.code || 501 === t.code || 502 === t.code
                    ? Promise.reject('error')
                    : (500 !== t.code && -1 !== t.code) || !t.msg
                    ? e.data
                    : Promise.reject(t.msg)
                  : e.data;
              },
              function (e) {
                return (
                  console.log('err' + e),
                  e.response && 401 === e.response.status ? (e.response.data, Promise.reject(e)) : Promise.reject(e)
                );
              },
            ),
            (h.adornParams = function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                n = { _t: new Date().getTime() };
              return t ? a()(n, e) : e;
            }),
            (h.adornData = function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 'json',
                r = { t: new Date().getTime() };
              return (e = t ? a()(r, e) : e), 'json' === n ? JSON.stringify(e) : c().stringify(e);
            });
          const v = h;
        },
        2297: (e, t, n) => {
          var r, o, i, a;
          function s(e, t, n) {
            return (
              t in e
                ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                : (e[t] = n),
              e
            );
          }
          function c(e) {
            return (
              (c =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                  ? function (e) {
                      return typeof e;
                    }
                  : function (e) {
                      return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                        ? 'symbol'
                        : typeof e;
                    }),
              c(e)
            );
          }
          (e = n.nmd(e)),
            self,
            (a = function () {
              return (function () {
                var e = {
                    4206: function (e, t, n) {
                      e.exports = n(8057);
                    },
                    4387: function (e, t, n) {
                      'use strict';
                      var r = n(7485),
                        o = n(4570),
                        i = n(2940),
                        a = n(581),
                        s = n(574),
                        c = n(3845),
                        u = n(8338),
                        l = n(8524),
                        d = n(3141),
                        p = n(7132);
                      e.exports = function (e) {
                        return new Promise(function (t, n) {
                          var f,
                            h = e.data,
                            v = e.headers,
                            m = e.responseType;
                          function y() {
                            e.cancelToken && e.cancelToken.unsubscribe(f),
                              e.signal && e.signal.removeEventListener('abort', f);
                          }
                          r.isFormData(h) && delete v['Content-Type'];
                          var g = new XMLHttpRequest();
                          if (e.auth) {
                            var b = e.auth.username || '',
                              S = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : '';
                            v.Authorization = 'Basic ' + btoa(b + ':' + S);
                          }
                          var C = s(e.baseURL, e.url);
                          function w() {
                            if (g) {
                              var r = 'getAllResponseHeaders' in g ? c(g.getAllResponseHeaders()) : null,
                                i = {
                                  data: m && 'text' !== m && 'json' !== m ? g.response : g.responseText,
                                  status: g.status,
                                  statusText: g.statusText,
                                  headers: r,
                                  config: e,
                                  request: g,
                                };
                              o(
                                function (e) {
                                  t(e), y();
                                },
                                function (e) {
                                  n(e), y();
                                },
                                i,
                              ),
                                (g = null);
                            }
                          }
                          if (
                            (g.open(e.method.toUpperCase(), a(C, e.params, e.paramsSerializer), !0),
                            (g.timeout = e.timeout),
                            'onloadend' in g
                              ? (g.onloadend = w)
                              : (g.onreadystatechange = function () {
                                  g &&
                                    4 === g.readyState &&
                                    (0 !== g.status || (g.responseURL && 0 === g.responseURL.indexOf('file:'))) &&
                                    setTimeout(w);
                                }),
                            (g.onabort = function () {
                              g && (n(l('Request aborted', e, 'ECONNABORTED', g)), (g = null));
                            }),
                            (g.onerror = function () {
                              n(l('Network Error', e, null, g)), (g = null);
                            }),
                            (g.ontimeout = function () {
                              var t = e.timeout ? 'timeout of ' + e.timeout + 'ms exceeded' : 'timeout exceeded',
                                r = e.transitional || d.transitional;
                              e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                                n(l(t, e, r.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', g)),
                                (g = null);
                            }),
                            r.isStandardBrowserEnv())
                          ) {
                            var E = (e.withCredentials || u(C)) && e.xsrfCookieName ? i.read(e.xsrfCookieName) : void 0;
                            E && (v[e.xsrfHeaderName] = E);
                          }
                          'setRequestHeader' in g &&
                            r.forEach(v, function (e, t) {
                              void 0 === h && 'content-type' === t.toLowerCase()
                                ? delete v[t]
                                : g.setRequestHeader(t, e);
                            }),
                            r.isUndefined(e.withCredentials) || (g.withCredentials = !!e.withCredentials),
                            m && 'json' !== m && (g.responseType = e.responseType),
                            'function' == typeof e.onDownloadProgress &&
                              g.addEventListener('progress', e.onDownloadProgress),
                            'function' == typeof e.onUploadProgress &&
                              g.upload &&
                              g.upload.addEventListener('progress', e.onUploadProgress),
                            (e.cancelToken || e.signal) &&
                              ((f = function (e) {
                                g && (n(!e || (e && e.type) ? new p('canceled') : e), g.abort(), (g = null));
                              }),
                              e.cancelToken && e.cancelToken.subscribe(f),
                              e.signal && (e.signal.aborted ? f() : e.signal.addEventListener('abort', f))),
                            h || (h = null),
                            g.send(h);
                        });
                      };
                    },
                    8057: function (e, t, n) {
                      'use strict';
                      var r = n(7485),
                        o = n(875),
                        i = n(5029),
                        a = n(4941),
                        s = (function e(t) {
                          var n = new i(t),
                            s = o(i.prototype.request, n);
                          return (
                            r.extend(s, i.prototype, n),
                            r.extend(s, n),
                            (s.create = function (n) {
                              return e(a(t, n));
                            }),
                            s
                          );
                        })(n(3141));
                      (s.Axios = i),
                        (s.Cancel = n(7132)),
                        (s.CancelToken = n(4603)),
                        (s.isCancel = n(1475)),
                        (s.VERSION = n(3345).version),
                        (s.all = function (e) {
                          return Promise.all(e);
                        }),
                        (s.spread = n(5739)),
                        (s.isAxiosError = n(5835)),
                        (e.exports = s),
                        (e.exports.default = s);
                    },
                    7132: function (e) {
                      'use strict';
                      function t(e) {
                        this.message = e;
                      }
                      (t.prototype.toString = function () {
                        return 'Cancel' + (this.message ? ': ' + this.message : '');
                      }),
                        (t.prototype.__CANCEL__ = !0),
                        (e.exports = t);
                    },
                    4603: function (e, t, n) {
                      'use strict';
                      var r = n(7132);
                      function o(e) {
                        if ('function' != typeof e) throw new TypeError('executor must be a function.');
                        var t;
                        this.promise = new Promise(function (e) {
                          t = e;
                        });
                        var n = this;
                        this.promise.then(function (e) {
                          if (n._listeners) {
                            var t,
                              r = n._listeners.length;
                            for (t = 0; t < r; t++) n._listeners[t](e);
                            n._listeners = null;
                          }
                        }),
                          (this.promise.then = function (e) {
                            var t,
                              r = new Promise(function (e) {
                                n.subscribe(e), (t = e);
                              }).then(e);
                            return (
                              (r.cancel = function () {
                                n.unsubscribe(t);
                              }),
                              r
                            );
                          }),
                          e(function (e) {
                            n.reason || ((n.reason = new r(e)), t(n.reason));
                          });
                      }
                      (o.prototype.throwIfRequested = function () {
                        if (this.reason) throw this.reason;
                      }),
                        (o.prototype.subscribe = function (e) {
                          this.reason
                            ? e(this.reason)
                            : this._listeners
                            ? this._listeners.push(e)
                            : (this._listeners = [e]);
                        }),
                        (o.prototype.unsubscribe = function (e) {
                          if (this._listeners) {
                            var t = this._listeners.indexOf(e);
                            -1 !== t && this._listeners.splice(t, 1);
                          }
                        }),
                        (o.source = function () {
                          var e;
                          return {
                            token: new o(function (t) {
                              e = t;
                            }),
                            cancel: e,
                          };
                        }),
                        (e.exports = o);
                    },
                    1475: function (e) {
                      'use strict';
                      e.exports = function (e) {
                        return !(!e || !e.__CANCEL__);
                      };
                    },
                    5029: function (e, t, n) {
                      'use strict';
                      var r = n(7485),
                        o = n(581),
                        i = n(8096),
                        a = n(5009),
                        s = n(4941),
                        c = n(6144),
                        u = c.validators;
                      function l(e) {
                        (this.defaults = e), (this.interceptors = { request: new i(), response: new i() });
                      }
                      (l.prototype.request = function (e) {
                        'string' == typeof e ? ((e = arguments[1] || {}).url = arguments[0]) : (e = e || {}),
                          (e = s(this.defaults, e)).method
                            ? (e.method = e.method.toLowerCase())
                            : this.defaults.method
                            ? (e.method = this.defaults.method.toLowerCase())
                            : (e.method = 'get');
                        var t = e.transitional;
                        void 0 !== t &&
                          c.assertOptions(
                            t,
                            {
                              silentJSONParsing: u.transitional(u.boolean),
                              forcedJSONParsing: u.transitional(u.boolean),
                              clarifyTimeoutError: u.transitional(u.boolean),
                            },
                            !1,
                          );
                        var n = [],
                          r = !0;
                        this.interceptors.request.forEach(function (t) {
                          ('function' == typeof t.runWhen && !1 === t.runWhen(e)) ||
                            ((r = r && t.synchronous), n.unshift(t.fulfilled, t.rejected));
                        });
                        var o,
                          i = [];
                        if (
                          (this.interceptors.response.forEach(function (e) {
                            i.push(e.fulfilled, e.rejected);
                          }),
                          !r)
                        ) {
                          var l = [a, void 0];
                          for (Array.prototype.unshift.apply(l, n), l = l.concat(i), o = Promise.resolve(e); l.length; )
                            o = o.then(l.shift(), l.shift());
                          return o;
                        }
                        for (var d = e; n.length; ) {
                          var p = n.shift(),
                            f = n.shift();
                          try {
                            d = p(d);
                          } catch (e) {
                            f(e);
                            break;
                          }
                        }
                        try {
                          o = a(d);
                        } catch (e) {
                          return Promise.reject(e);
                        }
                        for (; i.length; ) o = o.then(i.shift(), i.shift());
                        return o;
                      }),
                        (l.prototype.getUri = function (e) {
                          return (e = s(this.defaults, e)), o(e.url, e.params, e.paramsSerializer).replace(/^\?/, '');
                        }),
                        r.forEach(['delete', 'get', 'head', 'options'], function (e) {
                          l.prototype[e] = function (t, n) {
                            return this.request(s(n || {}, { method: e, url: t, data: (n || {}).data }));
                          };
                        }),
                        r.forEach(['post', 'put', 'patch'], function (e) {
                          l.prototype[e] = function (t, n, r) {
                            return this.request(s(r || {}, { method: e, url: t, data: n }));
                          };
                        }),
                        (e.exports = l);
                    },
                    8096: function (e, t, n) {
                      'use strict';
                      var r = n(7485);
                      function o() {
                        this.handlers = [];
                      }
                      (o.prototype.use = function (e, t, n) {
                        return (
                          this.handlers.push({
                            fulfilled: e,
                            rejected: t,
                            synchronous: !!n && n.synchronous,
                            runWhen: n ? n.runWhen : null,
                          }),
                          this.handlers.length - 1
                        );
                      }),
                        (o.prototype.eject = function (e) {
                          this.handlers[e] && (this.handlers[e] = null);
                        }),
                        (o.prototype.forEach = function (e) {
                          r.forEach(this.handlers, function (t) {
                            null !== t && e(t);
                          });
                        }),
                        (e.exports = o);
                    },
                    574: function (e, t, n) {
                      'use strict';
                      var r = n(2642),
                        o = n(2288);
                      e.exports = function (e, t) {
                        return e && !r(t) ? o(e, t) : t;
                      };
                    },
                    8524: function (e, t, n) {
                      'use strict';
                      var r = n(9953);
                      e.exports = function (e, t, n, o, i) {
                        var a = new Error(e);
                        return r(a, t, n, o, i);
                      };
                    },
                    5009: function (e, t, n) {
                      'use strict';
                      var r = n(7485),
                        o = n(9212),
                        i = n(1475),
                        a = n(3141),
                        s = n(7132);
                      function c(e) {
                        if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
                          throw new s('canceled');
                      }
                      e.exports = function (e) {
                        return (
                          c(e),
                          (e.headers = e.headers || {}),
                          (e.data = o.call(e, e.data, e.headers, e.transformRequest)),
                          (e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers)),
                          r.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function (t) {
                            delete e.headers[t];
                          }),
                          (e.adapter || a.adapter)(e).then(
                            function (t) {
                              return c(e), (t.data = o.call(e, t.data, t.headers, e.transformResponse)), t;
                            },
                            function (t) {
                              return (
                                i(t) ||
                                  (c(e),
                                  t &&
                                    t.response &&
                                    (t.response.data = o.call(
                                      e,
                                      t.response.data,
                                      t.response.headers,
                                      e.transformResponse,
                                    ))),
                                Promise.reject(t)
                              );
                            },
                          )
                        );
                      };
                    },
                    9953: function (e) {
                      'use strict';
                      e.exports = function (e, t, n, r, o) {
                        return (
                          (e.config = t),
                          n && (e.code = n),
                          (e.request = r),
                          (e.response = o),
                          (e.isAxiosError = !0),
                          (e.toJSON = function () {
                            return {
                              message: this.message,
                              name: this.name,
                              description: this.description,
                              number: this.number,
                              fileName: this.fileName,
                              lineNumber: this.lineNumber,
                              columnNumber: this.columnNumber,
                              stack: this.stack,
                              config: this.config,
                              code: this.code,
                              status: this.response && this.response.status ? this.response.status : null,
                            };
                          }),
                          e
                        );
                      };
                    },
                    4941: function (e, t, n) {
                      'use strict';
                      var r = n(7485);
                      e.exports = function (e, t) {
                        t = t || {};
                        var n = {};
                        function o(e, t) {
                          return r.isPlainObject(e) && r.isPlainObject(t)
                            ? r.merge(e, t)
                            : r.isPlainObject(t)
                            ? r.merge({}, t)
                            : r.isArray(t)
                            ? t.slice()
                            : t;
                        }
                        function i(n) {
                          return r.isUndefined(t[n]) ? (r.isUndefined(e[n]) ? void 0 : o(void 0, e[n])) : o(e[n], t[n]);
                        }
                        function a(e) {
                          if (!r.isUndefined(t[e])) return o(void 0, t[e]);
                        }
                        function s(n) {
                          return r.isUndefined(t[n])
                            ? r.isUndefined(e[n])
                              ? void 0
                              : o(void 0, e[n])
                            : o(void 0, t[n]);
                        }
                        function c(n) {
                          return n in t ? o(e[n], t[n]) : n in e ? o(void 0, e[n]) : void 0;
                        }
                        var u = {
                          url: a,
                          method: a,
                          data: a,
                          baseURL: s,
                          transformRequest: s,
                          transformResponse: s,
                          paramsSerializer: s,
                          timeout: s,
                          timeoutMessage: s,
                          withCredentials: s,
                          adapter: s,
                          responseType: s,
                          xsrfCookieName: s,
                          xsrfHeaderName: s,
                          onUploadProgress: s,
                          onDownloadProgress: s,
                          decompress: s,
                          maxContentLength: s,
                          maxBodyLength: s,
                          transport: s,
                          httpAgent: s,
                          httpsAgent: s,
                          cancelToken: s,
                          socketPath: s,
                          responseEncoding: s,
                          validateStatus: c,
                        };
                        return (
                          r.forEach(Object.keys(e).concat(Object.keys(t)), function (e) {
                            var t = u[e] || i,
                              o = t(e);
                            (r.isUndefined(o) && t !== c) || (n[e] = o);
                          }),
                          n
                        );
                      };
                    },
                    4570: function (e, t, n) {
                      'use strict';
                      var r = n(8524);
                      e.exports = function (e, t, n) {
                        var o = n.config.validateStatus;
                        n.status && o && !o(n.status)
                          ? t(r('Request failed with status code ' + n.status, n.config, null, n.request, n))
                          : e(n);
                      };
                    },
                    9212: function (e, t, n) {
                      'use strict';
                      var r = n(7485),
                        o = n(3141);
                      e.exports = function (e, t, n) {
                        var i = this || o;
                        return (
                          r.forEach(n, function (n) {
                            e = n.call(i, e, t);
                          }),
                          e
                        );
                      };
                    },
                    3141: function (e, t, n) {
                      'use strict';
                      var r = n(7485),
                        o = n(1446),
                        i = n(9953),
                        a = { 'Content-Type': 'application/x-www-form-urlencoded' };
                      function s(e, t) {
                        !r.isUndefined(e) && r.isUndefined(e['Content-Type']) && (e['Content-Type'] = t);
                      }
                      var c,
                        u = {
                          transitional: { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
                          adapter:
                            (('undefined' != typeof XMLHttpRequest ||
                              ('undefined' != typeof process &&
                                '[object process]' === Object.prototype.toString.call(process))) &&
                              (c = n(4387)),
                            c),
                          transformRequest: [
                            function (e, t) {
                              return (
                                o(t, 'Accept'),
                                o(t, 'Content-Type'),
                                r.isFormData(e) ||
                                r.isArrayBuffer(e) ||
                                r.isBuffer(e) ||
                                r.isStream(e) ||
                                r.isFile(e) ||
                                r.isBlob(e)
                                  ? e
                                  : r.isArrayBufferView(e)
                                  ? e.buffer
                                  : r.isURLSearchParams(e)
                                  ? (s(t, 'application/x-www-form-urlencoded;charset=utf-8'), e.toString())
                                  : r.isObject(e) || (t && 'application/json' === t['Content-Type'])
                                  ? (s(t, 'application/json'),
                                    (function (e, t, n) {
                                      if (r.isString(e))
                                        try {
                                          return (0, JSON.parse)(e), r.trim(e);
                                        } catch (e) {
                                          if ('SyntaxError' !== e.name) throw e;
                                        }
                                      return (0, JSON.stringify)(e);
                                    })(e))
                                  : e
                              );
                            },
                          ],
                          transformResponse: [
                            function (e) {
                              var t = this.transitional || u.transitional,
                                n = t && t.silentJSONParsing,
                                o = t && t.forcedJSONParsing,
                                a = !n && 'json' === this.responseType;
                              if (a || (o && r.isString(e) && e.length))
                                try {
                                  return JSON.parse(e);
                                } catch (e) {
                                  if (a) {
                                    if ('SyntaxError' === e.name) throw i(e, this, 'E_JSON_PARSE');
                                    throw e;
                                  }
                                }
                              return e;
                            },
                          ],
                          timeout: 0,
                          xsrfCookieName: 'XSRF-TOKEN',
                          xsrfHeaderName: 'X-XSRF-TOKEN',
                          maxContentLength: -1,
                          maxBodyLength: -1,
                          validateStatus: function (e) {
                            return e >= 200 && e < 300;
                          },
                          headers: { common: { Accept: 'application/json, text/plain, */*' } },
                        };
                      r.forEach(['delete', 'get', 'head'], function (e) {
                        u.headers[e] = {};
                      }),
                        r.forEach(['post', 'put', 'patch'], function (e) {
                          u.headers[e] = r.merge(a);
                        }),
                        (e.exports = u);
                    },
                    3345: function (e) {
                      e.exports = { version: '0.24.0' };
                    },
                    875: function (e) {
                      'use strict';
                      e.exports = function (e, t) {
                        return function () {
                          for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
                          return e.apply(t, n);
                        };
                      };
                    },
                    581: function (e, t, n) {
                      'use strict';
                      var r = n(7485);
                      function o(e) {
                        return encodeURIComponent(e)
                          .replace(/%3A/gi, ':')
                          .replace(/%24/g, '$')
                          .replace(/%2C/gi, ',')
                          .replace(/%20/g, '+')
                          .replace(/%5B/gi, '[')
                          .replace(/%5D/gi, ']');
                      }
                      e.exports = function (e, t, n) {
                        if (!t) return e;
                        var i;
                        if (n) i = n(t);
                        else if (r.isURLSearchParams(t)) i = t.toString();
                        else {
                          var a = [];
                          r.forEach(t, function (e, t) {
                            null != e &&
                              (r.isArray(e) ? (t += '[]') : (e = [e]),
                              r.forEach(e, function (e) {
                                r.isDate(e) ? (e = e.toISOString()) : r.isObject(e) && (e = JSON.stringify(e)),
                                  a.push(o(t) + '=' + o(e));
                              }));
                          }),
                            (i = a.join('&'));
                        }
                        if (i) {
                          var s = e.indexOf('#');
                          -1 !== s && (e = e.slice(0, s)), (e += (-1 === e.indexOf('?') ? '?' : '&') + i);
                        }
                        return e;
                      };
                    },
                    2288: function (e) {
                      'use strict';
                      e.exports = function (e, t) {
                        return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e;
                      };
                    },
                    2940: function (e, t, n) {
                      'use strict';
                      var r = n(7485);
                      e.exports = r.isStandardBrowserEnv()
                        ? {
                            write: function (e, t, n, o, i, a) {
                              var s = [];
                              s.push(e + '=' + encodeURIComponent(t)),
                                r.isNumber(n) && s.push('expires=' + new Date(n).toGMTString()),
                                r.isString(o) && s.push('path=' + o),
                                r.isString(i) && s.push('domain=' + i),
                                !0 === a && s.push('secure'),
                                (document.cookie = s.join('; '));
                            },
                            read: function (e) {
                              var t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
                              return t ? decodeURIComponent(t[3]) : null;
                            },
                            remove: function (e) {
                              this.write(e, '', Date.now() - 864e5);
                            },
                          }
                        : {
                            write: function () {},
                            read: function () {
                              return null;
                            },
                            remove: function () {},
                          };
                    },
                    2642: function (e) {
                      'use strict';
                      e.exports = function (e) {
                        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
                      };
                    },
                    5835: function (e) {
                      'use strict';
                      e.exports = function (e) {
                        return 'object' == c(e) && !0 === e.isAxiosError;
                      };
                    },
                    8338: function (e, t, n) {
                      'use strict';
                      var r = n(7485);
                      e.exports = r.isStandardBrowserEnv()
                        ? (function () {
                            var e,
                              t = /(msie|trident)/i.test(navigator.userAgent),
                              n = document.createElement('a');
                            function o(e) {
                              var r = e;
                              return (
                                t && (n.setAttribute('href', r), (r = n.href)),
                                n.setAttribute('href', r),
                                {
                                  href: n.href,
                                  protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
                                  host: n.host,
                                  search: n.search ? n.search.replace(/^\?/, '') : '',
                                  hash: n.hash ? n.hash.replace(/^#/, '') : '',
                                  hostname: n.hostname,
                                  port: n.port,
                                  pathname: '/' === n.pathname.charAt(0) ? n.pathname : '/' + n.pathname,
                                }
                              );
                            }
                            return (
                              (e = o(window.location.href)),
                              function (t) {
                                var n = r.isString(t) ? o(t) : t;
                                return n.protocol === e.protocol && n.host === e.host;
                              }
                            );
                          })()
                        : function () {
                            return !0;
                          };
                    },
                    1446: function (e, t, n) {
                      'use strict';
                      var r = n(7485);
                      e.exports = function (e, t) {
                        r.forEach(e, function (n, r) {
                          r !== t && r.toUpperCase() === t.toUpperCase() && ((e[t] = n), delete e[r]);
                        });
                      };
                    },
                    3845: function (e, t, n) {
                      'use strict';
                      var r = n(7485),
                        o = [
                          'age',
                          'authorization',
                          'content-length',
                          'content-type',
                          'etag',
                          'expires',
                          'from',
                          'host',
                          'if-modified-since',
                          'if-unmodified-since',
                          'last-modified',
                          'location',
                          'max-forwards',
                          'proxy-authorization',
                          'referer',
                          'retry-after',
                          'user-agent',
                        ];
                      e.exports = function (e) {
                        var t,
                          n,
                          i,
                          a = {};
                        return e
                          ? (r.forEach(e.split('\n'), function (e) {
                              if (
                                ((i = e.indexOf(':')),
                                (t = r.trim(e.substr(0, i)).toLowerCase()),
                                (n = r.trim(e.substr(i + 1))),
                                t)
                              ) {
                                if (a[t] && o.indexOf(t) >= 0) return;
                                a[t] = 'set-cookie' === t ? (a[t] ? a[t] : []).concat([n]) : a[t] ? a[t] + ', ' + n : n;
                              }
                            }),
                            a)
                          : a;
                      };
                    },
                    5739: function (e) {
                      'use strict';
                      e.exports = function (e) {
                        return function (t) {
                          return e.apply(null, t);
                        };
                      };
                    },
                    6144: function (e, t, n) {
                      'use strict';
                      var r = n(3345).version,
                        o = {};
                      ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (e, t) {
                        o[e] = function (n) {
                          return c(n) === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
                        };
                      });
                      var i = {};
                      (o.transitional = function (e, t, n) {
                        function o(e, t) {
                          return '[Axios v' + r + "] Transitional option '" + e + "'" + t + (n ? '. ' + n : '');
                        }
                        return function (n, r, a) {
                          if (!1 === e) throw new Error(o(r, ' has been removed' + (t ? ' in ' + t : '')));
                          return (
                            t &&
                              !i[r] &&
                              ((i[r] = !0),
                              console.warn(
                                o(r, ' has been deprecated since v' + t + ' and will be removed in the near future'),
                              )),
                            !e || e(n, r, a)
                          );
                        };
                      }),
                        (e.exports = {
                          assertOptions: function (e, t, n) {
                            if ('object' != c(e)) throw new TypeError('options must be an object');
                            for (var r = Object.keys(e), o = r.length; o-- > 0; ) {
                              var i = r[o],
                                a = t[i];
                              if (a) {
                                var s = e[i],
                                  u = void 0 === s || a(s, i, e);
                                if (!0 !== u) throw new TypeError('option ' + i + ' must be ' + u);
                              } else if (!0 !== n) throw Error('Unknown option ' + i);
                            }
                          },
                          validators: o,
                        });
                    },
                    7485: function (e, t, n) {
                      'use strict';
                      var r = n(875),
                        o = Object.prototype.toString;
                      function i(e) {
                        return '[object Array]' === o.call(e);
                      }
                      function a(e) {
                        return void 0 === e;
                      }
                      function s(e) {
                        return null !== e && 'object' == c(e);
                      }
                      function u(e) {
                        if ('[object Object]' !== o.call(e)) return !1;
                        var t = Object.getPrototypeOf(e);
                        return null === t || t === Object.prototype;
                      }
                      function l(e) {
                        return '[object Function]' === o.call(e);
                      }
                      function d(e, t) {
                        if (null != e)
                          if (('object' != c(e) && (e = [e]), i(e)))
                            for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
                          else for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);
                      }
                      e.exports = {
                        isArray: i,
                        isArrayBuffer: function (e) {
                          return '[object ArrayBuffer]' === o.call(e);
                        },
                        isBuffer: function (e) {
                          return (
                            null !== e &&
                            !a(e) &&
                            null !== e.constructor &&
                            !a(e.constructor) &&
                            'function' == typeof e.constructor.isBuffer &&
                            e.constructor.isBuffer(e)
                          );
                        },
                        isFormData: function (e) {
                          return 'undefined' != typeof FormData && e instanceof FormData;
                        },
                        isArrayBufferView: function (e) {
                          return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
                            ? ArrayBuffer.isView(e)
                            : e && e.buffer && e.buffer instanceof ArrayBuffer;
                        },
                        isString: function (e) {
                          return 'string' == typeof e;
                        },
                        isNumber: function (e) {
                          return 'number' == typeof e;
                        },
                        isObject: s,
                        isPlainObject: u,
                        isUndefined: a,
                        isDate: function (e) {
                          return '[object Date]' === o.call(e);
                        },
                        isFile: function (e) {
                          return '[object File]' === o.call(e);
                        },
                        isBlob: function (e) {
                          return '[object Blob]' === o.call(e);
                        },
                        isFunction: l,
                        isStream: function (e) {
                          return s(e) && l(e.pipe);
                        },
                        isURLSearchParams: function (e) {
                          return 'undefined' != typeof URLSearchParams && e instanceof URLSearchParams;
                        },
                        isStandardBrowserEnv: function () {
                          return (
                            ('undefined' == typeof navigator ||
                              ('ReactNative' !== navigator.product &&
                                'NativeScript' !== navigator.product &&
                                'NS' !== navigator.product)) &&
                            'undefined' != typeof window &&
                            'undefined' != typeof document
                          );
                        },
                        forEach: d,
                        merge: function e() {
                          var t = {};
                          function n(n, r) {
                            u(t[r]) && u(n)
                              ? (t[r] = e(t[r], n))
                              : u(n)
                              ? (t[r] = e({}, n))
                              : i(n)
                              ? (t[r] = n.slice())
                              : (t[r] = n);
                          }
                          for (var r = 0, o = arguments.length; r < o; r++) d(arguments[r], n);
                          return t;
                        },
                        extend: function (e, t, n) {
                          return (
                            d(t, function (t, o) {
                              e[o] = n && 'function' == typeof t ? r(t, n) : t;
                            }),
                            e
                          );
                        },
                        trim: function (e) {
                          return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
                        },
                        stripBOM: function (e) {
                          return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e;
                        },
                      };
                    },
                    2179: function (e, t, n) {
                      'use strict';
                      var r =
                        (this && this.__importDefault) ||
                        function (e) {
                          return e && e.__esModule ? e : { default: e };
                        };
                      Object.defineProperty(t, '__esModule', { value: !0 });
                      var o = r(n(4993)),
                        i = r(n(9752)),
                        a = r(n(4711)),
                        s = r(n(2343)),
                        c = r(n(5922)),
                        u = n(1743),
                        l = c.default.log,
                        d = (function () {
                          function e() {
                            (this.config = null),
                              (this.featureSwitch = null),
                              (this.role = null),
                              (this.hostUserId = null),
                              (this.loginHelper = null),
                              (this.seatIndex = 0),
                              (this.serverSideDescription = u.empty);
                          }
                          return (
                            (e.prototype.setRole = function (e) {
                              this.role = e;
                            }),
                            (e.prototype.setHostUserId = function (e) {
                              this.hostUserId = e;
                            }),
                            (e.prototype.getHostUserId = function () {
                              return this.hostUserId;
                            }),
                            (e.prototype.setSeatIndex = function (e) {
                              (this.seatIndex = e), this.parse();
                            }),
                            (e.prototype.setGameConfig = function (e) {
                              this.config = e;
                              var t = e.sdk_conf;
                              if (t) {
                                var n = o.default.getInitOptions(),
                                  r = n.webDraftLevel,
                                  s = n.keepLastFrame,
                                  c = n.tabletMode;
                                'number' == typeof t.webdraft_level &&
                                  void 0 !== r &&
                                  a.default.setWebDraftLevel(t.webdraft_level),
                                  t.connect_timeout && i.default.setNewConnectTimeout(t.connect_timeout),
                                  t.noflow_timeout && i.default.setNoflowTimeout(t.noflow_timeout),
                                  t.cursor_scale && i.default.setMobileCursorScale(t.cursor_scale),
                                  t.cursor_style && o.default.setRemoteCursorStyle(t.cursor_style),
                                  'boolean' == typeof t.keep_lastframe &&
                                    void 0 === s &&
                                    i.default.setKeepLastFrame(t.keep_lastframe),
                                  'boolean' == typeof t.tablet_mode &&
                                    void 0 === c &&
                                    o.default.mouseTabletMode(t.tablet_mode),
                                  'boolean' == typeof t.mobile_show_cursor &&
                                    i.default.setMobileShowCursor(t.mobile_show_cursor);
                              }
                            }),
                            (e.prototype.getConfig = function () {
                              return {
                                login_helper: this.loginHelper,
                                seat_index: this.seatIndex,
                                role: this.role,
                                game_config: this.config,
                                server_side_description: this.serverSideDescription,
                              };
                            }),
                            (e.prototype.setFeatureSwitch = function (e) {
                              void 0 === e && (e = {});
                              try {
                                var t = e.network_event_script;
                                t && (t = JSON.parse(t)), (this.featureSwitch = { network_event_script: t });
                              } catch (e) {
                                l('setFeatureSwitch error', e);
                              }
                            }),
                            (e.prototype.getFeatureSwitch = function () {
                              return this.featureSwitch;
                            }),
                            (e.prototype.setServerSideDescription = function (e) {
                              (this.serverSideDescription = e), s.default.setStaticStat();
                            }),
                            (e.prototype.getServerSideDescription = function () {
                              return this.serverSideDescription || u.empty;
                            }),
                            (e.prototype.parse = function () {
                              if ((l('enter gameConfig parse', this.config, this.role, this.seatIndex), !this.config))
                                return l('game_config does not set');
                              if (!this.role) return l('role does not set');
                              var e = (this.config.sdk_conf || u.empty).login_helper;
                              e ? (this.loginHelper = e) : l('no login helper loaded');
                            }),
                            e
                          );
                        })();
                      t.default = new d();
                    },
                    5262: function (e, t) {
                      'use strict';
                      Object.defineProperty(t, '__esModule', { value: !0 }),
                        (t.config = void 0),
                        (t.config = { version: '1.1.6', lite: !1 });
                    },
                    8751: function (e, t) {
                      'use strict';
                      Object.defineProperty(t, '__esModule', { value: !0 }),
                        (t.CameraProfile = void 0),
                        (t.CameraProfile = {
                          '120p': { width: 160, height: 120, frameRate: 30, bitrate: 200, type: '120p' },
                          '180p': { width: 320, height: 180, frameRate: 30, bitrate: 350, type: '180p' },
                          '240p': { width: 320, height: 240, frameRate: 30, bitrate: 400, type: '240p' },
                          '360p': { width: 640, height: 360, frameRate: 30, bitrate: 800, type: '360p' },
                          '480p': { width: 640, height: 480, frameRate: 30, bitrate: 900, type: '480p' },
                          '720p': { width: 1280, height: 720, frameRate: 30, bitrate: 1500, type: '720p' },
                          '1080p': { width: 1920, height: 1080, frameRate: 30, bitrate: 2e3, type: '1080p' },
                          '2K': { width: 2560, height: 1440, frameRate: 30, bitrate: 4860, type: '2K' },
                          '4K': { width: 3840, height: 2160, frameRate: 30, bitrate: 9e3, type: '4K' },
                        });
                    },
                    9418: function (e, t) {
                      'use strict';
                      var n, r, o, i, a, s, c, u, l, d, p;
                      Object.defineProperty(t, '__esModule', { value: !0 }),
                        (t.ANSWER_SDP_CODE =
                          t.PROXY_CODE =
                          t.TOUCH_EVENT_TYPE =
                          t.WEB_DRAFT_LEVEL =
                          t.DATACHANNEL =
                          t.CONNECT_FAILED_CODE =
                          t.RTC_CODE =
                          t.CURSOR_MODE =
                          t.STATUS =
                          t.PAGE_STATS =
                          t.STATS =
                            void 0),
                        ((p = t.STATS || (t.STATS = {})).LOADING = 'loading'),
                        (p.PLAYING = 'playing'),
                        (p.ENDED = 'ended'),
                        ((d = t.PAGE_STATS || (t.PAGE_STATS = {})).LOADING = 'loading'),
                        (d.PLAYING = 'playing'),
                        (d.ENDED = 'ended'),
                        ((l = t.STATUS || (t.STATUS = {}))[(l.DISCONNECTED = 0)] = 'DISCONNECTED'),
                        (l[(l.CONNECTING = 1)] = 'CONNECTING'),
                        (l[(l.ESTABLISHED = 2)] = 'ESTABLISHED'),
                        ((u = t.CURSOR_MODE || (t.CURSOR_MODE = {}))[(u.LOCAL = 0)] = 'LOCAL'),
                        (u[(u.REMOTE_SRC = 1)] = 'REMOTE_SRC'),
                        (u[(u.REMOTE_DRAW = 2)] = 'REMOTE_DRAW'),
                        (u[(u.REMOTE_CUSTOM = 3)] = 'REMOTE_CUSTOM'),
                        (u[(u.REMOTE_SRC_POS = 4)] = 'REMOTE_SRC_POS'),
                        ((c = t.RTC_CODE || (t.RTC_CODE = {}))[(c.CREATE_OFFER_FAILED = -2)] = 'CREATE_OFFER_FAILED'),
                        (c[(c.NEED_RECONNECT = -1)] = 'NEED_RECONNECT'),
                        (c[(c.MANUAL_CLOSE = 0)] = 'MANUAL_CLOSE'),
                        (c[(c.OTHER_KICK = 1)] = 'OTHER_KICK'),
                        (c[(c.HEARTBEAT_TIMEOUT = 2)] = 'HEARTBEAT_TIMEOUT'),
                        (c[(c.CONNECT_FAILED = 3)] = 'CONNECT_FAILED'),
                        (c[(c.TOKEN_ERROR = 4)] = 'TOKEN_ERROR'),
                        ((s = t.CONNECT_FAILED_CODE || (t.CONNECT_FAILED_CODE = {}))[(s.AUTO_RECONNECTING = -2)] =
                          'AUTO_RECONNECTING'),
                        (s[(s.TOO_FREQUENTLY = -1)] = 'TOO_FREQUENTLY'),
                        ((a = t.DATACHANNEL || (t.DATACHANNEL = {})).ACK = 'ack'),
                        (a.HB = 'hb'),
                        (a.CD = 'cd'),
                        (a.KM = 'km'),
                        (a.SVR = 'svr'),
                        (a.SV = 'sv'),
                        ((i = t.WEB_DRAFT_LEVEL || (t.WEB_DRAFT_LEVEL = {}))[(i.CLOSE_HIGH_FREQUENCY = 0)] =
                          'CLOSE_HIGH_FREQUENCY'),
                        (i[(i.UNPACKAGE_SEND = 1)] = 'UNPACKAGE_SEND'),
                        (i[(i.PACKAGE_SEND = 2)] = 'PACKAGE_SEND'),
                        (i[(i.LIMIT_LENGTH = 3)] = 'LIMIT_LENGTH'),
                        ((o = t.TOUCH_EVENT_TYPE || (t.TOUCH_EVENT_TYPE = {}))[(o.touchstart = 0)] = 'touchstart'),
                        (o[(o.touchmove = 1)] = 'touchmove'),
                        (o[(o.touchend = 2)] = 'touchend'),
                        ((r = t.PROXY_CODE || (t.PROXY_CODE = {}))[(r.SUCCESS = 0)] = 'SUCCESS'),
                        (r[(r.STREAM_NOT_FOUND = 4e3)] = 'STREAM_NOT_FOUND'),
                        (r[(r.STREAM_EXIST = 4001)] = 'STREAM_EXIST'),
                        (r[(r.PARAM_ERROR = 4002)] = 'PARAM_ERROR'),
                        (r[(r.SERVER_ERROR = 5e3)] = 'SERVER_ERROR'),
                        (r[(r.BACK_TO_SOURCE_ERROR = 5001)] = 'BACK_TO_SOURCE_ERROR'),
                        (r[(r.BACK_TO_SOURCE_REQ_PARAM_ERROR = 5002)] = 'BACK_TO_SOURCE_REQ_PARAM_ERROR'),
                        (r[(r.BACK_TO_SOURCE_RES_PARAM_ERROR = 5003)] = 'BACK_TO_SOURCE_RES_PARAM_ERROR'),
                        ((n = t.ANSWER_SDP_CODE || (t.ANSWER_SDP_CODE = {}))[(n.SUCCESS = 0)] = 'SUCCESS'),
                        (n[(n.BUSY = 1)] = 'BUSY'),
                        (n[(n.TOKEN_ERROR = 2)] = 'TOKEN_ERROR'),
                        (n[(n.SDP_ERROR = 6)] = 'SDP_ERROR'),
                        (n[(n.WAIT_HOST = 8)] = 'WAIT_HOST'),
                        (n[(n.PLAYERS_NUMBER_OR_ROLE_LIMIT = 9)] = 'PLAYERS_NUMBER_OR_ROLE_LIMIT'),
                        (n[(n.PROXY_ERROR = 100)] = 'PROXY_ERROR');
                    },
                    1587: function (e, t) {
                      'use strict';
                      var n;
                      Object.defineProperty(t, '__esModule', { value: !0 }),
                        (t.KEYCODE = void 0),
                        ((n = t.KEYCODE || (t.KEYCODE = {}))[(n.Backspace = 8)] = 'Backspace'),
                        (n[(n.Tab = 9)] = 'Tab'),
                        (n[(n.Enter = 13)] = 'Enter'),
                        (n[(n.Shift = 16)] = 'Shift'),
                        (n[(n.Ctrl = 17)] = 'Ctrl'),
                        (n[(n.Alt = 18)] = 'Alt'),
                        (n[(n.PauseBreak = 19)] = 'PauseBreak'),
                        (n[(n.CapsLock = 20)] = 'CapsLock'),
                        (n[(n.Escape = 27)] = 'Escape'),
                        (n[(n.Space = 32)] = 'Space'),
                        (n[(n.PageUp = 33)] = 'PageUp'),
                        (n[(n.PageDown = 34)] = 'PageDown'),
                        (n[(n.End = 35)] = 'End'),
                        (n[(n.Home = 36)] = 'Home'),
                        (n[(n.LeftArrow = 37)] = 'LeftArrow'),
                        (n[(n.UpArrow = 38)] = 'UpArrow'),
                        (n[(n.RightArrow = 39)] = 'RightArrow'),
                        (n[(n.DownArrow = 40)] = 'DownArrow'),
                        (n[(n.Insert = 45)] = 'Insert'),
                        (n[(n.Delete = 46)] = 'Delete'),
                        (n[(n.Zero = 48)] = 'Zero'),
                        (n[(n.ClosedParen = 48)] = 'ClosedParen'),
                        (n[(n.One = 49)] = 'One'),
                        (n[(n.ExclamationMark = 49)] = 'ExclamationMark'),
                        (n[(n.Two = 50)] = 'Two'),
                        (n[(n.AtSign = 50)] = 'AtSign'),
                        (n[(n.Three = 51)] = 'Three'),
                        (n[(n.PoundSign = 51)] = 'PoundSign'),
                        (n[(n.Hash = 51)] = 'Hash'),
                        (n[(n.Four = 52)] = 'Four'),
                        (n[(n.DollarSign = 52)] = 'DollarSign'),
                        (n[(n.Five = 53)] = 'Five'),
                        (n[(n.PercentSign = 53)] = 'PercentSign'),
                        (n[(n.Six = 54)] = 'Six'),
                        (n[(n.Caret = 54)] = 'Caret'),
                        (n[(n.Hat = 54)] = 'Hat'),
                        (n[(n.Seven = 55)] = 'Seven'),
                        (n[(n.Ampersand = 55)] = 'Ampersand'),
                        (n[(n.Eight = 56)] = 'Eight'),
                        (n[(n.Star = 56)] = 'Star'),
                        (n[(n.Asterik = 56)] = 'Asterik'),
                        (n[(n.Nine = 57)] = 'Nine'),
                        (n[(n.OpenParen = 57)] = 'OpenParen'),
                        (n[(n.A = 65)] = 'A'),
                        (n[(n.B = 66)] = 'B'),
                        (n[(n.C = 67)] = 'C'),
                        (n[(n.D = 68)] = 'D'),
                        (n[(n.E = 69)] = 'E'),
                        (n[(n.F = 70)] = 'F'),
                        (n[(n.G = 71)] = 'G'),
                        (n[(n.H = 72)] = 'H'),
                        (n[(n.I = 73)] = 'I'),
                        (n[(n.J = 74)] = 'J'),
                        (n[(n.K = 75)] = 'K'),
                        (n[(n.L = 76)] = 'L'),
                        (n[(n.M = 77)] = 'M'),
                        (n[(n.N = 78)] = 'N'),
                        (n[(n.O = 79)] = 'O'),
                        (n[(n.P = 80)] = 'P'),
                        (n[(n.Q = 81)] = 'Q'),
                        (n[(n.R = 82)] = 'R'),
                        (n[(n.S = 83)] = 'S'),
                        (n[(n.T = 84)] = 'T'),
                        (n[(n.U = 85)] = 'U'),
                        (n[(n.V = 86)] = 'V'),
                        (n[(n.W = 87)] = 'W'),
                        (n[(n.X = 88)] = 'X'),
                        (n[(n.Y = 89)] = 'Y'),
                        (n[(n.Z = 90)] = 'Z'),
                        (n[(n.LeftWindowKey = 91)] = 'LeftWindowKey'),
                        (n[(n.RightWindowKey = 92)] = 'RightWindowKey'),
                        (n[(n.SelectKey = 93)] = 'SelectKey'),
                        (n[(n.Numpad0 = 96)] = 'Numpad0'),
                        (n[(n.Numpad1 = 97)] = 'Numpad1'),
                        (n[(n.Numpad2 = 98)] = 'Numpad2'),
                        (n[(n.Numpad3 = 99)] = 'Numpad3'),
                        (n[(n.Numpad4 = 100)] = 'Numpad4'),
                        (n[(n.Numpad5 = 101)] = 'Numpad5'),
                        (n[(n.Numpad6 = 102)] = 'Numpad6'),
                        (n[(n.Numpad7 = 103)] = 'Numpad7'),
                        (n[(n.Numpad8 = 104)] = 'Numpad8'),
                        (n[(n.Numpad9 = 105)] = 'Numpad9'),
                        (n[(n.Multiply = 106)] = 'Multiply'),
                        (n[(n.Add = 107)] = 'Add'),
                        (n[(n.Subtract = 109)] = 'Subtract'),
                        (n[(n.DecimalPoint = 110)] = 'DecimalPoint'),
                        (n[(n.Divide = 111)] = 'Divide'),
                        (n[(n.F1 = 112)] = 'F1'),
                        (n[(n.F2 = 113)] = 'F2'),
                        (n[(n.F3 = 114)] = 'F3'),
                        (n[(n.F4 = 115)] = 'F4'),
                        (n[(n.F5 = 116)] = 'F5'),
                        (n[(n.F6 = 117)] = 'F6'),
                        (n[(n.F7 = 118)] = 'F7'),
                        (n[(n.F8 = 119)] = 'F8'),
                        (n[(n.F9 = 120)] = 'F9'),
                        (n[(n.F10 = 121)] = 'F10'),
                        (n[(n.F11 = 122)] = 'F11'),
                        (n[(n.F12 = 123)] = 'F12'),
                        (n[(n.NumLock = 144)] = 'NumLock'),
                        (n[(n.ScrollLock = 145)] = 'ScrollLock'),
                        (n[(n.SemiColon = 186)] = 'SemiColon'),
                        (n[(n.Equals = 187)] = 'Equals'),
                        (n[(n.Comma = 188)] = 'Comma'),
                        (n[(n.Dash = 189)] = 'Dash'),
                        (n[(n.Period = 190)] = 'Period'),
                        (n[(n.UnderScore = 189)] = 'UnderScore'),
                        (n[(n.PlusSign = 187)] = 'PlusSign'),
                        (n[(n.ForwardSlash = 191)] = 'ForwardSlash'),
                        (n[(n.Tilde = 192)] = 'Tilde'),
                        (n[(n.GraveAccent = 192)] = 'GraveAccent'),
                        (n[(n.Backquote = 192)] = 'Backquote'),
                        (n[(n.OpenBracket = 219)] = 'OpenBracket'),
                        (n[(n.ClosedBracket = 221)] = 'ClosedBracket'),
                        (n[(n.Quote = 222)] = 'Quote');
                    },
                    4993: function (e, t, n) {
                      'use strict';
                      var r =
                          (this && this.__assign) ||
                          function () {
                            return (
                              (r =
                                Object.assign ||
                                function (e) {
                                  for (var t, n = 1, r = arguments.length; n < r; n++)
                                    for (var o in (t = arguments[n]))
                                      Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                                  return e;
                                }),
                              r.apply(this, arguments)
                            );
                          },
                        o =
                          (this && this.__awaiter) ||
                          function (e, t, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                              function a(e) {
                                try {
                                  c(r.next(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function s(e) {
                                try {
                                  c(r.throw(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function c(e) {
                                var t;
                                e.done
                                  ? o(e.value)
                                  : ((t = e.value),
                                    t instanceof n
                                      ? t
                                      : new n(function (e) {
                                          e(t);
                                        })).then(a, s);
                              }
                              c((r = r.apply(e, t || [])).next());
                            });
                          },
                        i =
                          (this && this.__generator) ||
                          function (e, t) {
                            var n,
                              r,
                              o,
                              i,
                              a = {
                                label: 0,
                                sent: function () {
                                  if (1 & o[0]) throw o[1];
                                  return o[1];
                                },
                                trys: [],
                                ops: [],
                              };
                            return (
                              (i = { next: s(0), throw: s(1), return: s(2) }),
                              'function' == typeof Symbol &&
                                (i[Symbol.iterator] = function () {
                                  return this;
                                }),
                              i
                            );
                            function s(i) {
                              return function (s) {
                                return (function (i) {
                                  if (n) throw new TypeError('Generator is already executing.');
                                  for (; a; )
                                    try {
                                      if (
                                        ((n = 1),
                                        r &&
                                          (o =
                                            2 & i[0]
                                              ? r.return
                                              : i[0]
                                              ? r.throw || ((o = r.return) && o.call(r), 0)
                                              : r.next) &&
                                          !(o = o.call(r, i[1])).done)
                                      )
                                        return o;
                                      switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                                        case 0:
                                        case 1:
                                          o = i;
                                          break;
                                        case 4:
                                          return a.label++, { value: i[1], done: !1 };
                                        case 5:
                                          a.label++, (r = i[1]), (i = [0]);
                                          continue;
                                        case 7:
                                          (i = a.ops.pop()), a.trys.pop();
                                          continue;
                                        default:
                                          if (
                                            !(
                                              (o = (o = a.trys).length > 0 && o[o.length - 1]) ||
                                              (6 !== i[0] && 2 !== i[0])
                                            )
                                          ) {
                                            a = 0;
                                            continue;
                                          }
                                          if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                                            a.label = i[1];
                                            break;
                                          }
                                          if (6 === i[0] && a.label < o[1]) {
                                            (a.label = o[1]), (o = i);
                                            break;
                                          }
                                          if (o && a.label < o[2]) {
                                            (a.label = o[2]), a.ops.push(i);
                                            break;
                                          }
                                          o[2] && a.ops.pop(), a.trys.pop();
                                          continue;
                                      }
                                      i = t.call(e, a);
                                    } catch (e) {
                                      (i = [6, e]), (r = 0);
                                    } finally {
                                      n = o = 0;
                                    }
                                  if (5 & i[0]) throw i[1];
                                  return { value: i[0] ? i[1] : void 0, done: !0 };
                                })([i, s]);
                              };
                            }
                          },
                        a =
                          (this && this.__importDefault) ||
                          function (e) {
                            return e && e.__esModule ? e : { default: e };
                          };
                      Object.defineProperty(t, '__esModule', { value: !0 });
                      var s = a(n(6994)),
                        u = n(5262),
                        l = n(9418),
                        d = a(n(9752)),
                        p = a(n(4711)),
                        f = n(869),
                        h = n(1743),
                        v = a(n(4112)),
                        m = a(n(2343)),
                        y = a(n(2179)),
                        g = a(n(5922)),
                        b = g.default.log,
                        S = new ((function () {
                          function e() {
                            (this.version = u.config.version),
                              (this.initOptions = { mount: null, reconnect: !0 }),
                              (this.sdkInitStartTime = null);
                          }
                          return (
                            (e.prototype.init = function (e) {
                              this.sdkInitStartTime = +new Date();
                              var t = e.mount,
                                n = e.loadingText,
                                o = e.showLoading;
                              this.mountGamePoint({ mount: t, loadingText: n, showLoading: o }),
                                (this.initOptions = r(r({}, this.initOptions), e)),
                                this.onPageLoad(e),
                                b('init->', this.initOptions);
                            }),
                            Object.defineProperty(e.prototype, 'initStartTime', {
                              get: function () {
                                return this.sdkInitStartTime;
                              },
                              enumerable: !1,
                              configurable: !0,
                            }),
                            (e.prototype.getInitOptions = function () {
                              return this.initOptions;
                            }),
                            (e.prototype.getClientSession = function () {
                              return d.default.getClientSideDescription();
                            }),
                            (e.prototype.getServerSession = function () {
                              return y.default.getServerSideDescription();
                            }),
                            (e.prototype.start = function (e) {
                              void 0 === e && (e = ''), d.default.connect(e);
                            }),
                            (e.prototype.destroy = function (e) {
                              var t = void 0 === e ? h.empty : e,
                                n = t.message,
                                r = void 0 === n ? '主动关闭' : n,
                                o = t.code,
                                i = void 0 === o ? l.RTC_CODE.MANUAL_CLOSE : o;
                              b('destroy->', 'message: ', r, 'code: ', i),
                                d.default.disconnected({ message: r, code: i });
                            }),
                            (e.prototype.reconnect = function () {
                              d.default.clearPeerConnection(), d.default.reconnect({ message: 'manual reconnect' });
                            }),
                            (e.prototype.gameRestart = function (e) {
                              void 0 === e && (e = h.noop),
                                b('gameRestart->'),
                                d.default.sendAckData({ data: { type: 'game_op', op: 'restart' }, callback: e }),
                                this.clearRemoteKeys();
                            }),
                            (e.prototype.gamePause = function (e) {
                              void 0 === e && (e = h.noop),
                                b('gamePause->'),
                                d.default.sendAckData({ data: { type: 'game_op', op: 'pause' }, callback: e }),
                                d.default.setGameStatus('pause'),
                                this.clearRemoteKeys();
                            }),
                            (e.prototype.gameResume = function (e) {
                              void 0 === e && (e = h.noop),
                                b('gameResume->'),
                                d.default.sendAckData({ data: { type: 'game_op', op: 'resume' }, callback: e }),
                                d.default.setGameStatus('playing'),
                                this.clearRemoteKeys();
                            }),
                            (e.prototype.loginHelper = function (e, t) {
                              var n = e.gameid,
                                r = void 0 === n ? '' : n,
                                o = e.acc,
                                i = void 0 === o ? '' : o,
                                a = e.pwd,
                                s = void 0 === a ? '' : a;
                              void 0 === t && (t = h.noop),
                                (i && s) || console.error('require parameter is missing'),
                                v.default.inputLoginInfo({
                                  loginData: { gameid: r, acc: i, pwd: s, appid: this.initOptions.appid },
                                  callback: t,
                                });
                            }),
                            (e.prototype.getLoginWindowStat = function (e, t) {
                              void 0 === t && (t = h.noop),
                                'string' != typeof e && console.error('gameid is not correct'),
                                v.default.loginWindowStat(t);
                            }),
                            (e.prototype.playVideo = function (e) {
                              var t, n;
                              'play' === e && (null === (t = (0, h.getVideoElement)()) || void 0 === t || t.play()),
                                'pause' === e && (null === (n = (0, h.getVideoElement)()) || void 0 === n || n.pause());
                            }),
                            (e.prototype.setVideoOrientation = function (e) {
                              var t = void 0 === e ? {} : e,
                                n = t.deg,
                                r = void 0 === n ? 0 : n,
                                o = t.rotateContainer,
                                i = void 0 === o || o,
                                a = t.rotateMountPoint,
                                s = void 0 !== a && a;
                              b('setVideoOrientation', r, i),
                                p.default.setVideoOrientation({ deg: r, rotateContainer: i, rotateMountPoint: s });
                            }),
                            (e.prototype.getPageSize = function () {
                              return { width: window.innerWidth, height: window.innerHeight };
                            }),
                            (e.prototype.sendKeyboardEvent = function (e) {
                              var t = e.key,
                                n = e.down;
                              d.default.sendKmData({ type: 'keyboard', key: t, down: n });
                            }),
                            (e.prototype.sendMouseEvent = function (e) {
                              var t = e.type,
                                n = e.down;
                              d.default.sendKmData({ type: t, down: n });
                            }),
                            (e.prototype.sendRawEvent = function (e) {
                              b('sendRawEvent->', e),
                                'object' != c(e) && console.error('data is not an object'),
                                d.default.sendAckData({ data: e });
                            }),
                            (e.prototype.setMoveSensitivity = function (e) {
                              b('setMoveSensitivity->', e),
                                'number' != typeof e && console.error('input value must be number'),
                                (e - 0.01 < Number.EPSILON || e - 100 > Number.EPSILON) &&
                                  console.error('sensitivity is out of range'),
                                p.default.setMoveSensitivity(e);
                            }),
                            (e.prototype.sendSeqRawEvents = function (e) {
                              b('sendSeqRawEvents->', e),
                                d.default.sendKmData({
                                  type: 'key_seq',
                                  keys: e.map(function (e) {
                                    return JSON.stringify(e);
                                  }),
                                });
                            }),
                            (e.prototype.getMoveSensitivity = function () {
                              return p.default ? 1 / p.default.getMoveSensitivity() : 1;
                            }),
                            (e.prototype.setMouseCanLock = function (e) {
                              b('setMouseCanLock->', e), d.default.lockMouse(e), d.default.setForceShowCursor(!e);
                            }),
                            (e.prototype.mouseMove = function (e, t, n, r) {
                              p.default.mouseMove(e, t, n, r);
                            }),
                            (e.prototype.mouseTabletMode = function (e) {
                              b('mouseTabletMode->', e),
                                p.default.setTabletMode(e),
                                this.resetCursorPos(d.default.getCursorMode());
                            }),
                            (e.prototype.setRemoteCursor = function (e) {
                              if ((void 0 === e && (e = 0), b('setRemoteCursor->', e), ![0, 1, 2].includes(e)))
                                return console.error('val is out of Range in [0, 1, 2]');
                              d.default.setCursorMode(e), this.resetCursorPos(e);
                            }),
                            (e.prototype.setCursorShowStat = function (e) {
                              b('setCursorShowStat->', e), d.default.setForceShowCursor(e);
                            }),
                            (e.prototype.setCursorShowStatus = function (e) {
                              b('setCursorShowStat->', e), d.default.setForceShowCursor(e);
                            }),
                            (e.prototype.getCursorShowStat = function () {
                              return (
                                b('getCursorShowStat->', d.default.getCursorShowStatus()),
                                d.default.getCursorShowStatus()
                              );
                            }),
                            (e.prototype.setMobileCursorScale = function (e) {
                              b('setMobileCursorScale->', e), d.default.setMobileCursorScale(e);
                            }),
                            (e.prototype.setRemoteCursorStyle = function (e) {
                              b('setRemoteCursorStyle->', e),
                                d.default.sendAckData({ data: { type: 'set_pointer_style', style: e } });
                            }),
                            (e.prototype.clearRemoteKeys = function () {
                              b('clearRemoteKeys->'), p.default.clearRemoteKeys();
                            }),
                            (e.prototype.resetRemoteCapsLock = function () {
                              b('resetRemoteCapsLock->'), d.default.sendAckData({ data: { type: 'reset_capslock' } });
                            }),
                            (e.prototype.setDefaultCursorImage = function (e) {
                              b('setDefaultCursorImage->', e), d.default.setDefaultCursorImage(e);
                            }),
                            (e.prototype.setKMStatus = function (e) {
                              var t = e.keyboard,
                                n = void 0 === t || t,
                                r = e.mouse,
                                o = void 0 === r || r;
                              p.default.setKMStatus({ keyboard: n, mouse: o });
                            }),
                            (e.prototype.setPaste = function (e) {
                              p.default.setPaste(e);
                            }),
                            (e.prototype.setDebugMode = function (e) {
                              var t = void 0 === e ? {} : e,
                                n = t.showStats,
                                o = void 0 !== n && n,
                                i = t.showLog,
                                a = void 0 !== i && i,
                                s = t.showOnAckMessage,
                                c = void 0 !== s && s,
                                u = t.showOnCdMessage,
                                l = void 0 !== u && u,
                                d = t.showOnHbMessage,
                                p = void 0 !== d && d,
                                f = t.showOnKmMessage,
                                h = void 0 !== f && f,
                                v = t.showOnSvMessage,
                                y = void 0 !== v && v,
                                g = t.showSendAckData,
                                b = void 0 !== g && g,
                                S = t.showSendHbData,
                                C = void 0 !== S && S,
                                w = t.showSendKmData,
                                E = void 0 !== w && w;
                              m.default.show(o),
                                this.initOptions.debugSetting || (this.initOptions.debugSetting = {}),
                                (this.initOptions.debugSetting = r(r({}, this.initOptions.debugSetting), {
                                  showLog: a,
                                  showOnAckMessage: c,
                                  showOnCdMessage: l,
                                  showOnHbMessage: p,
                                  showOnKmMessage: h,
                                  showOnSvMessage: y,
                                  showSendAckData: b,
                                  showSendHbData: C,
                                  showSendKmData: E,
                                }));
                            }),
                            (e.prototype.reportLog = function () {
                              return b('reportLog, user manual upload'), g.default.reportLog();
                            }),
                            (e.prototype.setLogHandler = function (e) {
                              void 0 === e && (e = h.noop), b('setLogHandler'), g.default.setExternalLog(e);
                            }),
                            (e.prototype.toggleMetricReportBulk = function (e) {
                              void 0 === e && (e = !1), m.default.toggleMetricReportBulk(e);
                            }),
                            (e.prototype.setStreamProfile = function (e, t) {
                              return (
                                void 0 === t && (t = h.noop),
                                b('setStreamProfile->', e),
                                e.fps && 'number' == typeof e.fps
                                  ? e.max_bitrate && 'number' == typeof e.max_bitrate
                                    ? e.min_bitrate && 'number' == typeof e.min_bitrate
                                      ? e.fps < 10 || e.fps > 60
                                        ? b('fps out of range [10,60]')
                                        : e.max_bitrate < 1 || e.max_bitrate > 15
                                        ? b('max_bitrate out of range [1,15]')
                                        : e.min_bitrate < 1 || e.min_bitrate > 15
                                        ? b('min_bitrate out of range [1,15]')
                                        : void (
                                            null === d.default ||
                                            void 0 === d.default ||
                                            d.default.sendAckData({
                                              data: r(r({}, e), { type: 'res_mode', res: '' }),
                                              callback: t,
                                            })
                                          )
                                      : b('min_bitrate must be set with integer')
                                    : b('max_bitrate must be set with integer')
                                  : b('fps must be set with integer')
                              );
                            }),
                            (e.prototype.getDisplayRect = function () {
                              return d.default.getDisplayRect();
                            }),
                            (e.prototype.getPlayerVolume = function (e) {
                              return document.getElementById(''.concat(e, 'A')).volume;
                            }),
                            (e.prototype.setPlayerVolume = function (e, t) {
                              b('setPlayerVolume->', t), (document.getElementById(''.concat(e, 'A')).volume = t);
                            }),
                            (e.prototype.setVideoVolume = function (e) {
                              b('setVideoVolume->', e),
                                ((0, h.getVideoElement)().volume = e),
                                (0, h.isMobile)() && 0 === e
                                  ? (((0, h.getVideoElement)().muted = !0), p.default.setVideoMuted(!0))
                                  : (((0, h.getVideoElement)().muted = !1),
                                    p.default.setVideoMuted(!1),
                                    this.playVideo('play'));
                            }),
                            (e.prototype.getVideoVolume = function () {
                              var e;
                              return null !== (e = (0, h.getVideoElement)().volume) && void 0 !== e ? e : 0;
                            }),
                            (e.prototype.switchMic = function (e) {
                              var t = e.status;
                              d.default.switchMic({ status: t });
                            }),
                            (e.prototype.switchCamera = function (e) {
                              var t = e.status;
                              d.default.switchCamera({ status: t });
                            }),
                            (e.prototype.setMicProfile = function (e) {
                              d.default.setMicProfile(e);
                            }),
                            (e.prototype.setCameraProfile = function (e) {
                              d.default.setCameraProfile(e);
                            }),
                            (e.prototype.getDevices = function () {
                              return d.default.getDevices();
                            }),
                            (e.prototype.setPageBackground = function (e) {
                              void 0 === e && (e = ''), b('setPageBackground->', e);
                              var t = (0, h.getCloudGamingContainerElement)();
                              t && (t.style.background = 'url('.concat(e, ')'));
                            }),
                            (e.prototype.sendText = function (e) {
                              void 0 === e && (e = ''),
                                b('sendText', e),
                                d.default.sendAckData({ data: { type: 'paste', content: e } });
                            }),
                            (e.prototype.setClientInteractMode = function (e) {
                              void 0 === e && (e = 'cursor'), p.default.setClientInteractMode(e);
                            }),
                            (e.prototype.setRemoteDesktopResolution = function (e) {
                              var t = e.width,
                                n = e.height;
                              return new Promise(function (e) {
                                d.default.sendAckData({
                                  data: { type: 'desktop_res', width: t, height: n },
                                  callback: function (t) {
                                    var n = t.data;
                                    e(void 0 === n ? { code: -1 } : n);
                                  },
                                });
                              });
                            }),
                            (e.prototype.getRemoteStreamResolution = function () {
                              return {
                                width: (0, h.getVideoElement)().videoWidth,
                                height: (0, h.getVideoElement)().videoHeight,
                              };
                            }),
                            (e.prototype.reshapeWindow = function () {
                              p.default.reshapeWindow();
                            }),
                            (e.prototype.getUserMedia = function () {
                              return d.default.getUserMedia();
                            }),
                            (e.prototype.getIsMobileGame = function () {
                              return d.default.getIsMobileGame();
                            }),
                            (e.prototype.createCustomDataChannel = function (e) {
                              var t = e.destPort,
                                n = e.onMessage;
                              return o(this, void 0, void 0, function () {
                                var e, r, o, a;
                                return i(this, function (i) {
                                  switch (i.label) {
                                    case 0:
                                      return [
                                        4,
                                        d.default.createCustomDataChannel({
                                          destPort: t,
                                          onMessage: n,
                                          onerror: function (e) {
                                            b('createCustomDataChannel onerror', e);
                                          },
                                          onclose: function (e) {
                                            b('createCustomDataChannel onclose', e);
                                          },
                                        }),
                                      ];
                                    case 1:
                                      return (
                                        (e = i.sent()),
                                        (r = e.code),
                                        (o = e.msg),
                                        (a = function (e) {
                                          d.default.sendCustomDataChannelMessage({ destPort: t, msg: e });
                                        }),
                                        b('createCustomDataChannel code', r, 'msg', o),
                                        [2, { sendMessage: a, code: r, msg: o }]
                                      );
                                  }
                                });
                              });
                            }),
                            (e.prototype.getSeats = function () {
                              return new Promise(function (e) {
                                d.default.sendAckData({
                                  data: { type: 'sync_seats' },
                                  callback: function (t) {
                                    var n = t.code,
                                      r = t.data,
                                      o = r.players,
                                      i = r.viewers;
                                    0 === n && e({ players: o, viewers: i });
                                  },
                                });
                              });
                            }),
                            (e.prototype.submitSeatChange = function (e) {
                              var t = e.user_id,
                                n = e.to_role,
                                r = e.seat_index,
                                o = void 0 === r ? 0 : r;
                              return new Promise(function (e) {
                                d.default.sendAckData({
                                  data: { type: 'submit_seat_change', user_id: t, to_role: n, seat_index: o },
                                  callback: function (t) {
                                    var n = t.data,
                                      r = void 0 === n ? { code: -1 } : n;
                                    b('submit_seat_change res', r), e(r);
                                  },
                                });
                              });
                            }),
                            (e.prototype.seatChange = function (e) {
                              var t = e.user_id,
                                n = e.to_role,
                                r = e.seat_index,
                                o = void 0 === r ? 0 : r;
                              return new Promise(function (e) {
                                d.default.sendAckData({
                                  data: { type: 'seat_change', user_id: t, to_role: n, seat_index: o },
                                  callback: function (t) {
                                    var n = t.data,
                                      r = void 0 === n ? { code: -1 } : n;
                                    b('seat_change res', r), e(r);
                                  },
                                });
                              });
                            }),
                            (e.prototype.changeMicStatus = function (e) {
                              var t = e.status,
                                n = e.user_id;
                              return new Promise(function (e) {
                                d.default.sendAckData({
                                  data: { type: 'mic_status', user_id: n, status: t },
                                  callback: function (t) {
                                    var n = t.data,
                                      r = void 0 === n ? { code: -1 } : n,
                                      o = r.code,
                                      i = r.status,
                                      a = r.user_id,
                                      s = y.default.getServerSideDescription().user_id;
                                    0 === o &&
                                      a === s &&
                                      (b('changeMicStatus', r),
                                      (0 !== i && 1 !== i) ||
                                        (a && d.default.setTrackEnable({ type: 'audio', enable: !1 })),
                                      2 === i && a && d.default.setTrackEnable({ type: 'audio', enable: !0 })),
                                      e(r);
                                  },
                                });
                              });
                            }),
                            (e.prototype.onOrientationChange = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onOrientationChange) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onInitSuccess = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onInitSuccess) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onNetworkChange = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onNetworkChange) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onWebrtcStatusChange = function (e) {
                              var t, n, r, o;
                              null === (n = (t = this.initOptions).onWebrtcStat) || void 0 === n || n.call(t, e),
                                null === (o = (r = this.initOptions).onWebrtcStatusChange) ||
                                  void 0 === o ||
                                  o.call(r, e);
                            }),
                            (e.prototype.onDisconnect = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onDisconnect) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onConnectFailed = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onConnectFail) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onConnectSuccess = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onConnectSuccess) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onGameStartComplete = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onGameStartComplete) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onLoadGameArchive = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onLoadGameArchive) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onSaveGameArchive = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onSaveGameArchive) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onInputStatusChange = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onInputStatusChange) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onTouchEvent = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onTouchEvent) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onCursorShowStatChange = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onCursorShowStatChange) ||
                                void 0 === n ||
                                n.call(t, e);
                            }),
                            (e.prototype.onGamepadConnectChange = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onGamepadConnectChange) ||
                                void 0 === n ||
                                n.call(t, e);
                            }),
                            (e.prototype.onConfigurationChange = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onConfigurationChange) ||
                                void 0 === n ||
                                n.call(t, e);
                            }),
                            (e.prototype.onVmafChange = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onVmafChange) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onDoubleTap = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onDoubleTap) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onEvent = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onEvent) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onDeviceChange = function (e) {
                              var t, n;
                              b('onDeviceChange', Event),
                                null === (n = (t = this.initOptions).onDeviceChange) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onGetUserMediaStatusChange = function (e) {
                              var t,
                                n,
                                r = e.msg,
                                o = '',
                                i = 0;
                              switch (r) {
                                case 'NotFoundError':
                                case 'DevicesNotFoundError':
                                  (o = 'NotFoundError'), (i = 1);
                                  break;
                                case 'NotAllowedError':
                                case 'PermissionDeniedError':
                                  (o = 'NotAllowedError'), (i = 2);
                                  break;
                                default:
                                  o = r;
                              }
                              null === (n = (t = this.initOptions).onGetUserMediaStatusChange) ||
                                void 0 === n ||
                                n.call(t, { code: i, msg: o, userMedia: d.default.getUserMedia() });
                            }),
                            (e.prototype.onMultiPlayerChange = function (e) {
                              var t, n;
                              null === (n = (t = this.initOptions).onMultiPlayerChange) || void 0 === n || n.call(t, e);
                            }),
                            (e.prototype.onWebrtcStatsChange = function (e) {
                              var t, n, r, o;
                              if (e === l.PAGE_STATS.PLAYING) {
                                p.default.addEventHandler();
                                var i = y.default.getConfig().game_config,
                                  a = (void 0 === i ? h.empty : i).sdk_conf,
                                  s = void 0 === a ? h.empty : a;
                                s || (s = h.empty),
                                  this.resetCursorPos(
                                    null !== (t = this.initOptions.cursorMode) && void 0 !== t ? t : s.cursor_mode,
                                  ),
                                  this.setRemoteCursor(
                                    null !== (n = this.initOptions.cursorMode) && void 0 !== n ? n : s.cursor_mode,
                                  ),
                                  this.setPageBackground(
                                    null !== (r = this.initOptions.bgImgUrl) && void 0 !== r ? r : s.bgimg_url,
                                  ),
                                  this.setDefaultCursorImage(
                                    null !== (o = this.initOptions.defaultCursorImgUrl) && void 0 !== o
                                      ? o
                                      : s.default_cursor_url,
                                  );
                              }
                            }),
                            (e.prototype.setFullscreen = function (e, t) {
                              void 0 === t && (t = document.documentElement),
                                b('setFullscreen->', e),
                                e ? p.default.fullscreen(t) : p.default.exitFullscreen(t);
                            }),
                            (e.prototype.getFullscreen = function () {
                              return (0, h.isFullScreen)();
                            }),
                            (e.prototype.isMobile = function () {
                              return (0, h.isMobile)();
                            }),
                            (e.prototype.getGameMountPoint = function () {
                              return document.getElementById(this.initOptions.mount);
                            }),
                            (e.prototype.getGameConfig = function () {
                              return y.default.getConfig();
                            }),
                            (e.prototype.showTouchPosition = function (e) {
                              d.default.sendAckData({ data: { type: 'show_touch_pos', show: e } });
                            }),
                            (e.prototype.mountGamePoint = function (e) {
                              var t = e.mount,
                                n = void 0 === t ? '' : t,
                                r = e.loadingText,
                                o = void 0 === r ? '正在启动云渲染' : r,
                                i = e.showLoading,
                                a = void 0 === i || i,
                                s = document.createElement('style');
                              document.querySelector('head').append(s),
                                s.appendChild(document.createTextNode(f.mountPointCss));
                              var c = document.getElementById(n);
                              c || console.error('mount point is not found'),
                                (c.innerHTML = f.htmlString),
                                (c.style.backgroundColor = 'black');
                              var u = function (e) {
                                (null == e ? void 0 : e.style) && ((e.style.width = '100%'), (e.style.height = '100%'));
                              };
                              u(c),
                                u(document.body),
                                u(document.getRootNode()),
                                a || ((0, h.getProgressBarElement)().style.display = 'none'),
                                (document.querySelector('.starting').innerHTML = o);
                            }),
                            (e.prototype.onPageLoad = function (e) {
                              b('init tcgsdk version->', u.config.version, 'options->', e),
                                b('webrtc-adapter', s.default.browserDetails.browser, s.default.browserDetails.version),
                                e.onLog && g.default.setExternalLog(e.onLog),
                                d.default.init(e),
                                p.default.init(e),
                                this.setDebugMode(e.debugSetting),
                                d.default.initWebRTCConnect();
                            }),
                            (e.prototype.resetCursorPos = function (e) {
                              if ((0, h.isMobile)()) {
                                var t = window.devicePixelRatio,
                                  n = this.getDisplayRect(),
                                  r = (n.width / 2) * t,
                                  o = (n.height / 2) * t;
                                b('isMobile true, cursor will auto move to->', r, o),
                                  p.default.resetLastPosition({ x: 0, y: 0 }),
                                  this.mouseMove(0, e >= 2 ? 'touchstart' : 'dummy_touchstart', 0, 0),
                                  this.mouseMove(0, e >= 2 ? 'touchmove' : 'dummy_touchmove', r, o),
                                  this.mouseMove(0, 'touchend', r, o);
                              }
                            }),
                            e
                          );
                        })())();
                      (window.TCGSDK = S), (t.default = S);
                    },
                    969: function (e, t, n) {
                      'use strict';
                      var r =
                          (this && this.__read) ||
                          function (e, t) {
                            var n = 'function' == typeof Symbol && e[Symbol.iterator];
                            if (!n) return e;
                            var r,
                              o,
                              i = n.call(e),
                              a = [];
                            try {
                              for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; ) a.push(r.value);
                            } catch (e) {
                              o = { error: e };
                            } finally {
                              try {
                                r && !r.done && (n = i.return) && n.call(i);
                              } finally {
                                if (o) throw o.error;
                              }
                            }
                            return a;
                          },
                        o =
                          (this && this.__importDefault) ||
                          function (e) {
                            return e && e.__esModule ? e : { default: e };
                          };
                      Object.defineProperty(t, '__esModule', { value: !0 });
                      var i = n(7408),
                        a = o(n(4993)),
                        s = o(n(5922)),
                        c = o(n(9752)),
                        u = s.default.log,
                        l = (function () {
                          function e() {
                            this.gamepad = 'function' == typeof navigator.getGamepads ? new i.GamepadListener() : null;
                          }
                          return (
                            (e.prototype.addGamepadHandler = function () {
                              var e = new Map();
                              e.set(12, 1),
                                e.set(13, 2),
                                e.set(14, 4),
                                e.set(15, 8),
                                e.set(2, 16384),
                                e.set(3, 32768),
                                e.set(0, 4096),
                                e.set(1, 8192),
                                e.set(8, 32),
                                e.set(9, 16),
                                e.set(10, 128),
                                e.set(11, 64),
                                e.set(4, 256),
                                e.set(5, 512),
                                this.gamepad &&
                                  (this.gamepad.on('gamepad:connected', function (e) {
                                    var t = e.index,
                                      n = e.gamepad;
                                    u('gamepad connect, gamepad index is', t),
                                      c.default.sendKmData({ type: 'gamepadconnect' }),
                                      a.default.onGamepadConnectChange({
                                        status: 'gamepadconnect',
                                        index: t,
                                        gamepad: n,
                                      });
                                  }),
                                  this.gamepad.on('gamepad:disconnected', function (e) {
                                    var t = e.index;
                                    u('gamepad disconnected, gamepad index is', t),
                                      c.default.sendKmData({ type: 'gamepaddisconnect' }),
                                      a.default.onGamepadConnectChange({ status: 'gamepaddisconnect', index: t });
                                  }),
                                  this.gamepad.on('gamepad:button', function (t) {
                                    var n = t.detail,
                                      r = n.button,
                                      o = n.pressed,
                                      i = n.value,
                                      a = e.get(r);
                                    6 === r || 7 === r
                                      ? (6 === r &&
                                          c.default.sendKmData({
                                            type: 'lt',
                                            x: parseInt(''.concat(255 * i), 10),
                                            down: o,
                                          }),
                                        7 === r &&
                                          c.default.sendKmData({
                                            type: 'rt',
                                            x: parseInt(''.concat(255 * i), 10),
                                            down: o,
                                          }))
                                      : c.default.sendKmData({ type: 'gamepadkey', key: a, down: o });
                                  }),
                                  this.gamepad.on('gamepad:axis', function (e) {
                                    var t = e.detail,
                                      n = t.stick,
                                      o = t.gamepad,
                                      i = r(o.axes, 4),
                                      a = i[0],
                                      s = i[1],
                                      u = i[2],
                                      l = i[3];
                                    0 === n &&
                                      c.default.sendKmData({
                                        type: 'axisleft',
                                        x: parseInt(''.concat(32767 * a), 10),
                                        y: -parseInt(''.concat(32767 * s), 10),
                                      }),
                                      1 === n &&
                                        c.default.sendKmData({
                                          type: 'axisright',
                                          x: parseInt(''.concat(32767 * u), 10),
                                          y: -parseInt(''.concat(32767 * l), 10),
                                        });
                                  }),
                                  this.gamepad.start());
                            }),
                            e
                          );
                        })();
                      t.default = new l();
                    },
                    9752: function (e, t, n) {
                      'use strict';
                      var r =
                          (this && this.__assign) ||
                          function () {
                            return (
                              (r =
                                Object.assign ||
                                function (e) {
                                  for (var t, n = 1, r = arguments.length; n < r; n++)
                                    for (var o in (t = arguments[n]))
                                      Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                                  return e;
                                }),
                              r.apply(this, arguments)
                            );
                          },
                        o =
                          (this && this.__awaiter) ||
                          function (e, t, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                              function a(e) {
                                try {
                                  c(r.next(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function s(e) {
                                try {
                                  c(r.throw(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function c(e) {
                                var t;
                                e.done
                                  ? o(e.value)
                                  : ((t = e.value),
                                    t instanceof n
                                      ? t
                                      : new n(function (e) {
                                          e(t);
                                        })).then(a, s);
                              }
                              c((r = r.apply(e, t || [])).next());
                            });
                          },
                        i =
                          (this && this.__generator) ||
                          function (e, t) {
                            var n,
                              r,
                              o,
                              i,
                              a = {
                                label: 0,
                                sent: function () {
                                  if (1 & o[0]) throw o[1];
                                  return o[1];
                                },
                                trys: [],
                                ops: [],
                              };
                            return (
                              (i = { next: s(0), throw: s(1), return: s(2) }),
                              'function' == typeof Symbol &&
                                (i[Symbol.iterator] = function () {
                                  return this;
                                }),
                              i
                            );
                            function s(i) {
                              return function (s) {
                                return (function (i) {
                                  if (n) throw new TypeError('Generator is already executing.');
                                  for (; a; )
                                    try {
                                      if (
                                        ((n = 1),
                                        r &&
                                          (o =
                                            2 & i[0]
                                              ? r.return
                                              : i[0]
                                              ? r.throw || ((o = r.return) && o.call(r), 0)
                                              : r.next) &&
                                          !(o = o.call(r, i[1])).done)
                                      )
                                        return o;
                                      switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                                        case 0:
                                        case 1:
                                          o = i;
                                          break;
                                        case 4:
                                          return a.label++, { value: i[1], done: !1 };
                                        case 5:
                                          a.label++, (r = i[1]), (i = [0]);
                                          continue;
                                        case 7:
                                          (i = a.ops.pop()), a.trys.pop();
                                          continue;
                                        default:
                                          if (
                                            !(
                                              (o = (o = a.trys).length > 0 && o[o.length - 1]) ||
                                              (6 !== i[0] && 2 !== i[0])
                                            )
                                          ) {
                                            a = 0;
                                            continue;
                                          }
                                          if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                                            a.label = i[1];
                                            break;
                                          }
                                          if (6 === i[0] && a.label < o[1]) {
                                            (a.label = o[1]), (o = i);
                                            break;
                                          }
                                          if (o && a.label < o[2]) {
                                            (a.label = o[2]), a.ops.push(i);
                                            break;
                                          }
                                          o[2] && a.ops.pop(), a.trys.pop();
                                          continue;
                                      }
                                      i = t.call(e, a);
                                    } catch (e) {
                                      (i = [6, e]), (r = 0);
                                    } finally {
                                      n = o = 0;
                                    }
                                  if (5 & i[0]) throw i[1];
                                  return { value: i[0] ? i[1] : void 0, done: !0 };
                                })([i, s]);
                              };
                            }
                          },
                        a =
                          (this && this.__values) ||
                          function (e) {
                            var t = 'function' == typeof Symbol && Symbol.iterator,
                              n = t && e[t],
                              r = 0;
                            if (n) return n.call(e);
                            if (e && 'number' == typeof e.length)
                              return {
                                next: function () {
                                  return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
                                },
                              };
                            throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
                          },
                        s =
                          (this && this.__read) ||
                          function (e, t) {
                            var n = 'function' == typeof Symbol && e[Symbol.iterator];
                            if (!n) return e;
                            var r,
                              o,
                              i = n.call(e),
                              a = [];
                            try {
                              for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; ) a.push(r.value);
                            } catch (e) {
                              o = { error: e };
                            } finally {
                              try {
                                r && !r.done && (n = i.return) && n.call(i);
                              } finally {
                                if (o) throw o.error;
                              }
                            }
                            return a;
                          },
                        u =
                          (this && this.__importDefault) ||
                          function (e) {
                            return e && e.__esModule ? e : { default: e };
                          };
                      Object.defineProperty(t, '__esModule', { value: !0 });
                      var l = u(n(4993)),
                        d = n(3578),
                        p = u(n(9531)),
                        f = n(9418),
                        h = n(1743),
                        v = u(n(4711)),
                        m = u(n(2179)),
                        y = u(n(2343)),
                        g = u(n(1586)),
                        b = u(n(5922)),
                        S = n(8751),
                        C = b.default.log,
                        w = {},
                        E = new ((function () {
                          function e() {
                            (this.firstCreateDefaultChannel = !0),
                              (this.forceShowCursor = !1),
                              (this.showCursor = !0),
                              (this.remoteCursorMode = f.CURSOR_MODE.LOCAL),
                              (this.mobileCursorScale = 1),
                              (this.mobileShowCursor = !0),
                              (this.originCursorStyle = ''),
                              (this.hotSpot = { x: 0, y: 0 }),
                              (this.remoteCursorImage = ''),
                              (this.token = ''),
                              (this.keepLastFrame = !1),
                              (this.serverSideDescription = ''),
                              (this.latestActionTime = +new Date()),
                              (this.isMobileGame = !1),
                              (this.connectBeginTime = 0),
                              (this.connectTimeoutCount = 0),
                              (this.connectStatus = f.STATUS.DISCONNECTED),
                              (this.heartbeatTimer = null),
                              (this.newConnectTimeout = 60),
                              (this.noflowTimeout = 10),
                              (this.peerConnection = null),
                              (this.kmDataChannel = null),
                              (this.ackDataChannel = null),
                              (this.hbDataChannel = null),
                              (this.cdDataChannel = null),
                              (this.svrDataChannel = null),
                              (this.customDataChannel = new Map()),
                              (this.ackDataChannelTimer = null),
                              (this.mediaStream = null),
                              (this.audioStreamSender = null),
                              (this.videoStreamSender = null),
                              (this.userMedia = null),
                              (this.cameraProfile = S.CameraProfile['720p']),
                              (this.micProfile = {
                                sampleRate: 44100,
                                echoCancellation: !0,
                                autoGainControl: !0,
                                noiseSuppression: !0,
                              }),
                              (this.clientSideDescription = null),
                              (this.dataChannelCallbacks = {}),
                              (this.dataChannelRetryTimers = {}),
                              (this.checkMouseShowInterval = null),
                              (this.idleThreshold = 3e5),
                              (this.idleTimes = 0),
                              (this.lastInputStatus = !1),
                              (this.noFlowCount = 0),
                              (this.gameStatus = 'playing');
                          }
                          return (
                            (e.prototype.init = function (e) {
                              var t, n, r;
                              (this.forceShowCursor = null !== (t = e.forceShowCursor) && void 0 !== t && t),
                                (this.idleThreshold = null !== (n = 1e3 * e.idleThreshold) && void 0 !== n ? n : 3e5),
                                (this.keepLastFrame = null !== (r = e.keepLastFrame) && void 0 !== r && r),
                                (this.isMobileGame = e.mobileGame);
                            }),
                            Object.defineProperty(e.prototype, 'debugSetting', {
                              get: function () {
                                return l.default.getInitOptions().debugSetting || {};
                              },
                              enumerable: !1,
                              configurable: !0,
                            }),
                            (e.prototype.initWebRTCConnect = function () {
                              return o(this, void 0, void 0, function () {
                                var e,
                                  t,
                                  n = this;
                                return i(this, function (r) {
                                  return this.peerConnection
                                    ? [2, C('please call disconnected before connect')]
                                    : ((e = 5),
                                      (t = function () {
                                        return o(n, void 0, void 0, function () {
                                          var n,
                                            r = this;
                                          return i(this, function (a) {
                                            switch (a.label) {
                                              case 0:
                                                return !this.isMobileGame ||
                                                  l.default.getInitOptions().mobileVpx ||
                                                  (0, h.canReceiveH264)()
                                                  ? ((n = this), [4, this.newWebRtcConnect()])
                                                  : (setTimeout(function () {
                                                      return o(r, void 0, void 0, function () {
                                                        var n;
                                                        return i(this, function (r) {
                                                          switch (r.label) {
                                                            case 0:
                                                              return 0 != (e -= 1)
                                                                ? [3, 2]
                                                                : ((n = this), [4, this.newWebRtcConnect()]);
                                                            case 1:
                                                              return (
                                                                (n.clientSideDescription = r.sent()),
                                                                l.default.onInitSuccess({
                                                                  code: -1,
                                                                  description: this.clientSideDescription,
                                                                }),
                                                                [2]
                                                              );
                                                            case 2:
                                                              return [4, t()];
                                                            case 3:
                                                              return r.sent(), [2];
                                                          }
                                                        });
                                                      });
                                                    }, 100),
                                                    l.default.onWebrtcStatusChange({ code: -2 }),
                                                    [2]);
                                              case 1:
                                                return (
                                                  (n.clientSideDescription = a.sent()),
                                                  l.default.onInitSuccess({
                                                    code: 0,
                                                    msg: 'ok',
                                                    description: this.clientSideDescription,
                                                  }),
                                                  [2]
                                                );
                                            }
                                          });
                                        });
                                      }),
                                      t(),
                                      [2]);
                                });
                              });
                            }),
                            (e.prototype.sendKmData = function (e) {
                              (this.idleTimes = 0),
                                (this.latestActionTime = +new Date()),
                                this.debugSetting.showSendKmData && console.log('sendKmData', e),
                                this.dataChannelSend(this.kmDataChannel, e);
                            }),
                            (e.prototype.sendAckData = function (e) {
                              var t = e.data,
                                n = void 0 === t ? w : t,
                                r = e.retry,
                                o = void 0 === r ? 0 : r,
                                i = e.callback,
                                a = void 0 === i ? h.noop : i,
                                s = e.interval,
                                c = void 0 === s ? 1e3 : s,
                                u = n.type;
                              'cursor_state' !== u && ((this.latestActionTime = +new Date()), (this.idleTimes = 0));
                              var l = (0, h.getSequence)();
                              this.dataChannelSendWithCallback({
                                dataChannel: this.ackDataChannel,
                                ackMsg: { seq: l, data: n },
                                retry: o,
                                callback: a,
                                interval: c,
                              }),
                                this.debugSetting.showSendAckData &&
                                  ('cursor_state' === u || console.log('sendAckData:', n, l));
                            }),
                            (e.prototype.connect = function (e) {
                              var t, n, r;
                              void 0 === e && (e = ''), C('connect->'), y.default.setServerSessionTime(+new Date());
                              var o = +new Date();
                              if (o - this.connectBeginTime < 5e3)
                                return (
                                  C(
                                    'connect too frequently, please make sure the duration of two connection is longer than 5s, last is '.concat(
                                      Math.ceil((o - this.connectBeginTime) / 1e3),
                                      's',
                                    ),
                                  ),
                                  this.clearPeerConnection(),
                                  void l.default.onConnectFailed({
                                    code: f.CONNECT_FAILED_CODE.TOO_FREQUENTLY,
                                    msg: 'connect too frequently',
                                  })
                                );
                              ('connected' !==
                                (null === (t = this.peerConnection) || void 0 === t ? void 0 : t.connectionState) &&
                                'connecting' !==
                                  (null === (n = this.peerConnection) || void 0 === n ? void 0 : n.connectionState)) ||
                                C(
                                  'peerConnection status is '.concat(
                                    null === (r = this.peerConnection) || void 0 === r ? void 0 : r.connectionState,
                                    ', please clear current connection before call TCGSDK.start()',
                                  ),
                                ),
                                (this.connectBeginTime = o),
                                (this.connectTimeoutCount = 0),
                                (this.connectStatus = f.STATUS.CONNECTING);
                              try {
                                this.serverSideDescription = d.Base64.decode(e);
                              } catch (e) {
                                throw 'serverSession is not base64 string format';
                              }
                              this.serverSideDescription
                                ? this.onAnswer(this.serverSideDescription)
                                : l.default.onWebrtcStatusChange({
                                    code: -1,
                                    msg: 'set server description failed, please try again later.',
                                  });
                            }),
                            (e.prototype.getClientSideDescription = function () {
                              this.clientSideDescription || console.error('webrtc is not initialized');
                              try {
                                return d.Base64.encode(JSON.stringify(this.clientSideDescription));
                              } catch (e) {
                                console.error('clientSideDescription is not in json string or encode fail');
                              }
                            }),
                            (e.prototype.newWebRtcConnect = function () {
                              return o(this, void 0, void 0, function () {
                                var e,
                                  t,
                                  n,
                                  r = this;
                                return i(this, function (o) {
                                  switch (o.label) {
                                    case 0:
                                      try {
                                        this.peerConnection = new RTCPeerConnection({ sdpSemantics: 'unified-plan' });
                                      } catch (e) {
                                        return (
                                          C('new RTCPeerConnection error', e),
                                          'ReferenceError' === e.name &&
                                            e.message.includes('RTCPeerConnection') &&
                                            (l.default.onWebrtcStatusChange({
                                              code: 255,
                                              msg: 'your browser without webrtc support',
                                            }),
                                            console.log('浏览器不支持WebRTC')),
                                          [2]
                                        );
                                      }
                                      return (
                                        (this.connectStatus = f.STATUS.CONNECTING),
                                        (this.peerConnection.ontrack = function (e) {
                                          return r.onTrack(e);
                                        }),
                                        (this.peerConnection.onconnectionstatechange = function () {
                                          var e;
                                          C(
                                            'onconnectionstatechange',
                                            null === (e = r.peerConnection) || void 0 === e
                                              ? void 0
                                              : e.connectionState,
                                          );
                                        }),
                                        (this.peerConnection.oniceconnectionstatechange = function () {
                                          return r.onIceConnectionStateChange();
                                        }),
                                        (this.peerConnection.onicecandidate = function () {}),
                                        (this.peerConnection.onnegotiationneeded = function () {
                                          C('onnegotiationneeded');
                                        }),
                                        (null === navigator || void 0 === navigator
                                          ? void 0
                                          : navigator.mediaDevices) &&
                                          (navigator.mediaDevices.ondevicechange = function (e) {
                                            l.default.onDeviceChange(e);
                                          }),
                                        this.createKmDataChannel(),
                                        this.createHbDataChannel(),
                                        this.createAckDataChannel(),
                                        this.createSvrDataChannel(),
                                        this.createDefaultCustomDataChannel(),
                                        (e = l.default.getInitOptions()),
                                        (t = e.mic),
                                        (n = e.camera),
                                        [4, this.createOffer({ mic: t, camera: n })]
                                      );
                                    case 1:
                                      return [2, o.sent()];
                                  }
                                });
                              });
                            }),
                            (e.prototype.startHeartbeatReport = function () {
                              var e = this;
                              clearInterval(this.heartbeatTimer),
                                C('startHeartbeatReport ->'),
                                (this.heartbeatTimer = setInterval(function () {
                                  return o(e, void 0, void 0, function () {
                                    var e, t, n;
                                    return i(this, function (r) {
                                      switch (r.label) {
                                        case 0:
                                          return [
                                            4,
                                            null === (n = this.peerConnection) || void 0 === n
                                              ? void 0
                                              : n.getStats(null),
                                          ];
                                        case 1:
                                          return (
                                            (e = r.sent()),
                                            (t = []),
                                            null == e ||
                                              e.forEach(function (e) {
                                                void 0 === e && (e = {}),
                                                  ('inbound-rtp' !== e.type && 'track' !== e.type) || t.push(e);
                                              }),
                                            0 === t.length &&
                                              (t = [
                                                { type: 'inbound-rtp', mediaType: 'video' },
                                                { type: 'track', jitterBufferDelay: ((100 * Math.random()) % 30) + 10 },
                                              ]),
                                            y.default.setStat(t, e),
                                            this.reportStat(),
                                            [2]
                                          );
                                      }
                                    });
                                  });
                                }, 1e3));
                            }),
                            (e.prototype.getCursorShowStatus = function () {
                              return !!l.default.getIsMobileGame() || this.showCursor;
                            }),
                            (e.prototype.mouseDeltaMove = function () {
                              return this.remoteCursorMode === f.CURSOR_MODE.REMOTE_SRC_POS;
                            }),
                            (e.prototype.lockMouse = function (e) {
                              var t, n, r;
                              if (e)
                                try {
                                  null === (n = (t = (0, h.getVideoElement)()).requestPointerLock) ||
                                    void 0 === n ||
                                    n.call(t);
                                } catch (e) {
                                  C('requestPointerLock error', e);
                                }
                              else null === (r = document.exitPointerLock) || void 0 === r || r.call(document);
                              this.remoteCursorMode === f.CURSOR_MODE.REMOTE_SRC_POS &&
                                (e ? v.default.setDropMouseEvent(!1) : v.default.setDropMouseEvent(!0));
                            }),
                            (e.prototype.setForceShowCursor = function (e) {
                              this.forceShowCursor = e;
                            }),
                            (e.prototype.getForceShowCursor = function () {
                              return this.forceShowCursor;
                            }),
                            (e.prototype.clearPeerConnection = function () {
                              this.mediaStream &&
                                (this.mediaStream.getTracks().forEach(function (e) {
                                  e.stop();
                                }),
                                (this.mediaStream = null)),
                                (this.dataChannelCallbacks = {}),
                                this.peerConnection &&
                                  (this.kmDataChannel && (this.kmDataChannel.close(), (this.kmDataChannel = null)),
                                  this.hbDataChannel && (this.hbDataChannel.close(), (this.hbDataChannel = null)),
                                  this.ackDataChannel && (this.ackDataChannel.close(), (this.ackDataChannel = null)),
                                  this.cdDataChannel && (this.cdDataChannel.close(), (this.cdDataChannel = null)),
                                  this.svrDataChannel && (this.svrDataChannel.close(), (this.svrDataChannel = null)),
                                  this.customDataChannel.size &&
                                    (this.customDataChannel.forEach(function (e) {
                                      return e.close();
                                    }),
                                    this.customDataChannel.clear()),
                                  this.peerConnection.close(),
                                  (this.peerConnection.ontrack = null),
                                  (this.peerConnection.oniceconnectionstatechange = null),
                                  (this.peerConnection.onicecandidate = null),
                                  (this.peerConnection = null),
                                  this.audioStreamSender && this.stopTrack({ type: 'audio' }),
                                  this.videoStreamSender && this.stopTrack({ type: 'video' })),
                                (this.clientSideDescription = null),
                                (this.serverSideDescription = null),
                                clearInterval(this.heartbeatTimer),
                                this.checkMouseShowInterval &&
                                  (clearInterval(this.checkMouseShowInterval), (this.checkMouseShowInterval = null)),
                                y.default.toggleMetricReportBulk(!1);
                            }),
                            (e.prototype.disconnected = function (e) {
                              var t,
                                n = e.message,
                                r = void 0 === n ? '' : n,
                                o = e.code,
                                i = void 0 === o ? null : o;
                              C('disconnected', i, r),
                                (this.connectStatus = f.STATUS.DISCONNECTED),
                                this.keepLastFrame &&
                                  (null === (t = (0, h.getVideoElement)()) || void 0 === t || t.pause()),
                                i === f.RTC_CODE.OTHER_KICK &&
                                  (0, h.getRestartElement)() &&
                                  ((0, h.getRestartElement)().style.display = 'block'),
                                this.clearPeerConnection(),
                                l.default.getInitOptions().reconnect && i === f.RTC_CODE.NEED_RECONNECT
                                  ? this.reconnect({ message: r })
                                  : (C('destroy code: '.concat(i, ' and clear reconnect token')),
                                    p.default.setReconnectInfo({ serverIp: '', token: '' })),
                                l.default.onDisconnect({ code: i, msg: r }),
                                C('call onDisconnect');
                            }),
                            (e.prototype.reconnect = function (e) {
                              var t = e.message,
                                n = void 0 === t ? '' : t;
                              C(
                                'reconnect, setup reconnect server_ip='
                                  .concat(m.default.getServerSideDescription().server_ip, ' and token=')
                                  .concat(this.token),
                              ),
                                p.default.setReconnectInfo({
                                  serverIp: m.default.getServerSideDescription().server_ip,
                                  token: this.token,
                                }),
                                p.default.autoReconnect({ message: n });
                            }),
                            (e.prototype.getRemoteCursorState = function (e) {
                              this.sendAckData({ data: { type: e } });
                            }),
                            (e.prototype.getIdleTime = function () {
                              return +new Date() - this.latestActionTime;
                            }),
                            (e.prototype.checkUserIdle = function () {
                              var e = this.getIdleTime();
                              if (e > this.idleThreshold) {
                                var t = Math.floor(e / this.idleThreshold);
                                t > this.idleTimes &&
                                  (l.default.onNetworkChange({ status: 'idle', times: t }), (this.idleTimes = t));
                              }
                            }),
                            (e.prototype.setCursorMode = function (e) {
                              var t = this,
                                n = e;
                              e === f.CURSOR_MODE.REMOTE_SRC_POS && (n = f.CURSOR_MODE.REMOTE_SRC);
                              var r = n === f.CURSOR_MODE.REMOTE_DRAW;
                              if (
                                (this.sendAckData({
                                  data: { type: 'set_cursor', show: n },
                                  callback: function () {
                                    t.setCursorShowStatus(!r);
                                  },
                                }),
                                (this.remoteCursorMode = e),
                                e === f.CURSOR_MODE.REMOTE_SRC
                                  ? this.createCdDataChannel()
                                  : this.cdDataChannel && (this.cdDataChannel.close(), (this.cdDataChannel = null)),
                                e === f.CURSOR_MODE.LOCAL)
                              ) {
                                var o = (0, h.getVideoElement)();
                                o &&
                                  (C('videoElement.style.cursor will set to origin style', this.originCursorStyle),
                                  (o.style.cursor = 'url('
                                    .concat(this.originCursorStyle, ') ')
                                    .concat(this.hotSpot.x, ' ')
                                    .concat(this.hotSpot.y, ', auto')));
                              }
                            }),
                            (e.prototype.getCursorMode = function () {
                              return this.remoteCursorMode;
                            }),
                            (e.prototype.setMobileCursorScale = function (e) {
                              this.mobileCursorScale = e;
                            }),
                            (e.prototype.getDisplayRect = function () {
                              var e,
                                t =
                                  (null === (e = (0, h.getVideoElement)()) || void 0 === e
                                    ? void 0
                                    : e.getBoundingClientRect()) || w,
                                n = t.width,
                                r = void 0 === n ? 0 : n,
                                o = t.height,
                                i = void 0 === o ? 0 : o,
                                a = t.left,
                                s = void 0 === a ? 0 : a,
                                c = t.top;
                              return {
                                left: s,
                                top: void 0 === c ? 0 : c,
                                width: r,
                                height: i,
                                pixelRatio: window.devicePixelRatio || 1,
                              };
                            }),
                            (e.prototype.setDefaultCursorImage = function (e) {
                              if ((0, h.isMobile)()) {
                                var t = (0, h.getCursorElement)();
                                void 0 === e
                                  ? ((t.style.width = '3px'),
                                    (t.style.height = '3px'),
                                    (t.style.borderRadius = '50%'),
                                    (t.style.backgroundColor = '#2dc7ef'))
                                  : (t.style.backgroundImage = 'url('.concat(e, ')'));
                              } else {
                                var n = (0, h.getVideoElement)();
                                (this.originCursorStyle = null != e ? e : ''),
                                  (n.style.cursor = 'url('
                                    .concat(e, ') ')
                                    .concat(this.hotSpot.x, ' ')
                                    .concat(this.hotSpot.y, ', auto'));
                              }
                            }),
                            (e.prototype.toggleStatisticsView = function () {
                              var e = document.querySelector('#__vconsole');
                              y.default.show(!y.default.isShowing()),
                                e && (e.style.display = y.default.isShowing() ? '' : 'none');
                            }),
                            (e.prototype.setNewConnectTimeout = function (e) {
                              void 0 === e && (e = 60), (this.newConnectTimeout = e);
                            }),
                            (e.prototype.setNoflowTimeout = function (e) {
                              void 0 === e && (e = 10), (this.noflowTimeout = e);
                            }),
                            (e.prototype.setKeepLastFrame = function (e) {
                              void 0 === e && (e = !1), (this.keepLastFrame = e);
                            }),
                            (e.prototype.setMobileShowCursor = function (e) {
                              void 0 === e && (e = !0), (this.mobileShowCursor = e);
                            }),
                            (e.prototype.setGameStatus = function (e) {
                              this.gameStatus = e;
                            }),
                            (e.prototype.getIsMobileGame = function () {
                              return this.isMobileGame;
                            }),
                            (e.prototype.createCustomDataChannel = function (e) {
                              var t,
                                n,
                                r,
                                a = e.destPort,
                                s = void 0 === a ? 1 : a,
                                c = e.onMessage,
                                u = void 0 === c ? h.noop : c,
                                l = e.onclose,
                                d = void 0 === l ? h.noop : l,
                                p = e.onerror,
                                f = void 0 === p ? h.noop : p;
                              return o(this, void 0, Promise, function () {
                                var e,
                                  o,
                                  a = this;
                                return i(this, function (i) {
                                  switch (i.label) {
                                    case 0:
                                      return (
                                        C(
                                          'start createCustomDataChannel, destPort: '
                                            .concat(s, ', ackDataChannel state: ')
                                            .concat(
                                              null === (t = this.ackDataChannel) || void 0 === t
                                                ? void 0
                                                : t.readyState,
                                            ),
                                        ),
                                        'open' !==
                                        (null === (n = this.ackDataChannel) || void 0 === n ? void 0 : n.readyState)
                                          ? [
                                              2,
                                              {
                                                code: 1,
                                                msg: 'ack dataChannel does not open, please try again later.',
                                              },
                                            ]
                                          : this.customDataChannel.has(s) && !this.firstCreateDefaultChannel
                                          ? (C('this destPort '.concat(s, ' is already exit')),
                                            (this.customDataChannel.get(s).onmessage = function (e) {
                                              var t;
                                              C(
                                                'dataChannel:'.concat(
                                                  null === (t = a.customDataChannel.get(s)) || void 0 === t
                                                    ? void 0
                                                    : t.label,
                                                  ' onmessage',
                                                ),
                                                e.data,
                                              ),
                                                u(e.data);
                                            }),
                                            [2, { code: 0, msg: 'this dataChannel is already exist.' }])
                                          : ((e = this.firstCreateDefaultChannel ? 'cs_0' : 'cs_'.concat(s)),
                                            (o = null),
                                            this.firstCreateDefaultChannel
                                              ? ((o = this.customDataChannel.get(0)),
                                                this.customDataChannel.delete(0),
                                                (this.firstCreateDefaultChannel = !1))
                                              : (o =
                                                  null === (r = this.peerConnection) || void 0 === r
                                                    ? void 0
                                                    : r.createDataChannel(e)),
                                            o
                                              ? ((o.onmessage = function (t) {
                                                  C('dataChannel:'.concat(e, ' onmessage'), t.data), u(t.data);
                                                }),
                                                (o.onclose = function (e) {
                                                  return d(e);
                                                }),
                                                (o.onerror = function (e) {
                                                  return f(e);
                                                }),
                                                this.customDataChannel.set(s, o),
                                                [
                                                  4,
                                                  new Promise(function (t) {
                                                    a.sendAckData({
                                                      data: { type: 'udp_trans', dest_port: s, label: e },
                                                      callback: function (n) {
                                                        var r = n.data;
                                                        C(
                                                          'createCustomDataChannel label:'
                                                            .concat(e, ' destPort:')
                                                            .concat(s, ' success'),
                                                          r,
                                                        ),
                                                          t({ code: r.code });
                                                      },
                                                    }),
                                                      C('customDataChannels', a.customDataChannel),
                                                      setTimeout(function () {
                                                        t({ code: 3, msg: 'request timeout, please try again later.' });
                                                      }, 5e3);
                                                  }),
                                                ])
                                              : [3, 2])
                                      );
                                    case 1:
                                      return [2, i.sent()];
                                    case 2:
                                      return C('createCustomDataChannel fail'), [2, { code: 1 }];
                                  }
                                });
                              });
                            }),
                            (e.prototype.sendCustomDataChannelMessage = function (e) {
                              var t = e.destPort,
                                n = void 0 === t ? 0 : t,
                                r = e.msg,
                                o = void 0 === r ? '' : r,
                                i = this.customDataChannel.get(n);
                              'open' === (null == i ? void 0 : i.readyState) && i.send(o);
                            }),
                            (e.prototype.setTrackEnable = function (e) {
                              var t = e.type,
                                n = void 0 === t ? 'audio' : t,
                                r = e.enable,
                                o = void 0 === r || r;
                              return (
                                C('setTrackEnable type', n, 'enable', o),
                                'audio' === n
                                  ? this.audioStreamSender
                                    ? ((this.audioStreamSender.track.enabled = o),
                                      C('audioStreamSender', this.audioStreamSender, o),
                                      { code: 0 })
                                    : { code: 1, message: 'audioStreamSender is null' }
                                  : 'video' === n
                                  ? this.videoStreamSender
                                    ? ((this.videoStreamSender.track.enabled = o),
                                      C('videoStreamSender', this.videoStreamSender, o),
                                      { code: 0 })
                                    : { code: 2, message: 'videoStreamSender is null' }
                                  : void 0
                              );
                            }),
                            (e.prototype.stopTrack = function (e) {
                              var t = e.type;
                              return (
                                C('stopTrack type', t),
                                'audio' === t
                                  ? this.audioStreamSender
                                    ? (this.audioStreamSender.track.stop(),
                                      C('audioStreamSender', this.audioStreamSender),
                                      { code: 0 })
                                    : { code: 1, message: 'audioStreamSender is null' }
                                  : 'video' === t
                                  ? this.videoStreamSender
                                    ? (this.videoStreamSender.track.stop(), { code: 0 })
                                    : { code: 2, message: 'videoStreamSender is null' }
                                  : void 0
                              );
                            }),
                            (e.prototype.getMediaStream = function () {
                              return this.mediaStream;
                            }),
                            (e.prototype.getUserMedia = function () {
                              return this.userMedia;
                            }),
                            (e.prototype.switchMic = function (e) {
                              var t = e.status;
                              return o(this, void 0, void 0, function () {
                                var e;
                                return i(this, function (n) {
                                  switch (n.label) {
                                    case 0:
                                      return (
                                        C('switchMic status', t),
                                        'open' !== t ? [3, 2] : [4, this.createOffer({ mic: !0 })]
                                      );
                                    case 1:
                                      (e = n.sent().sdp),
                                        this.sendAckData({ data: { type: 'user_sdk_update', sdp: e } }),
                                        l.default.onGetUserMediaStatusChange({ msg: 'mic open' }),
                                        (n.label = 2);
                                    case 2:
                                      return (
                                        'close' === t &&
                                          (this.stopTrack({ type: 'audio' }),
                                          l.default.onGetUserMediaStatusChange({ msg: 'mic close' })),
                                        [2]
                                      );
                                  }
                                });
                              });
                            }),
                            (e.prototype.switchCamera = function (e) {
                              var t = e.status;
                              return o(this, void 0, void 0, function () {
                                var e;
                                return i(this, function (n) {
                                  switch (n.label) {
                                    case 0:
                                      return (
                                        C('switchCamera status', t),
                                        'open' !== t ? [3, 2] : [4, this.createOffer({ camera: !0 })]
                                      );
                                    case 1:
                                      (e = n.sent().sdp),
                                        this.sendAckData({ data: { type: 'user_sdk_update', sdp: e } }),
                                        l.default.onGetUserMediaStatusChange({ msg: 'camera open' }),
                                        (n.label = 2);
                                    case 2:
                                      return (
                                        'close' === t &&
                                          (this.stopTrack({ type: 'video' }),
                                          l.default.onGetUserMediaStatusChange({ msg: 'camera close' })),
                                        [2]
                                      );
                                  }
                                });
                              });
                            }),
                            (e.prototype.setMicProfile = function (e) {
                              var t;
                              return o(this, void 0, void 0, function () {
                                var n, r, o, a;
                                return i(this, function (i) {
                                  switch (i.label) {
                                    case 0:
                                      return (
                                        (n = l.default.getInitOptions()),
                                        (r = n.mic),
                                        (o = n.camera),
                                        r
                                          ? [4, this.createUserMedia({ camera: o, mic: e })]
                                          : (C('please open mic'), [2])
                                      );
                                    case 1:
                                      return (
                                        (a = i.sent()) &&
                                          (this.audioStreamSender.replaceTrack(
                                            null === (t = a.getAudioTracks()) || void 0 === t ? void 0 : t[0],
                                          ),
                                          (this.userMedia = a),
                                          l.default.onGetUserMediaStatusChange({ msg: 'success' })),
                                        [2]
                                      );
                                  }
                                });
                              });
                            }),
                            (e.prototype.setCameraProfile = function (e) {
                              var t;
                              return o(this, void 0, void 0, function () {
                                var n, r, o;
                                return i(this, function (i) {
                                  switch (i.label) {
                                    case 0:
                                      return (
                                        C('setCameraProfile', e),
                                        (n = l.default.getInitOptions()),
                                        (r = n.mic),
                                        n.camera
                                          ? 'string' == typeof e && e === this.cameraProfile.type
                                            ? (C('profile is same as last value'), [2])
                                            : [4, this.createUserMedia({ camera: e, mic: r })]
                                          : (C('please open camera'), [2])
                                      );
                                    case 1:
                                      return (
                                        (o = i.sent()) &&
                                          (this.videoStreamSender.replaceTrack(
                                            null === (t = o.getVideoTracks()) || void 0 === t ? void 0 : t[0],
                                          ),
                                          'string' == typeof e
                                            ? this.setCameraBitrate(S.CameraProfile[e].bitrate)
                                            : this.setCameraBitrate(e.bitrate),
                                          (this.userMedia = o),
                                          l.default.onGetUserMediaStatusChange({ msg: 'success' })),
                                        [2]
                                      );
                                  }
                                });
                              });
                            }),
                            (e.prototype.setCameraBitrate = function (e) {
                              return o(this, void 0, void 0, function () {
                                var t, n;
                                return i(this, function (r) {
                                  switch (r.label) {
                                    case 0:
                                      if (
                                        !('RTCRtpSender' in window) ||
                                        !('setParameters' in window.RTCRtpSender.prototype)
                                      )
                                        return [3, 7];
                                      if (!this.videoStreamSender) return [3, 5];
                                      (t = this.videoStreamSender.getParameters()).encodings || (t.encodings = [{}]),
                                        'unlimited' === e
                                          ? delete t.encodings[0].maxBitrate
                                          : (t.encodings[0].maxBitrate = 1e3 * e),
                                        (r.label = 1);
                                    case 1:
                                      return r.trys.push([1, 3, , 4]), [4, this.videoStreamSender.setParameters(t)];
                                    case 2:
                                      return (
                                        r.sent(),
                                        C(
                                          'setCameraBitrate success '.concat(
                                            'number' == typeof e ? e : 'unlimited',
                                            ' kbps',
                                          ),
                                        ),
                                        [3, 4]
                                      );
                                    case 3:
                                      return (n = r.sent()), C('setCameraBitrate error', n), [3, 4];
                                    case 4:
                                      return [3, 6];
                                    case 5:
                                      C('camera sender is not found'), (r.label = 6);
                                    case 6:
                                      return [3, 8];
                                    case 7:
                                      C('can not find RTCRtpSender in window'), (r.label = 8);
                                    case 8:
                                      return [2];
                                  }
                                });
                              });
                            }),
                            (e.prototype.getDevices = function () {
                              return o(this, void 0, void 0, function () {
                                var e, t, n;
                                return i(this, function (r) {
                                  switch (r.label) {
                                    case 0:
                                      return r.trys.push([0, 2, , 3]), [4, navigator.mediaDevices.enumerateDevices()];
                                    case 1:
                                      return (
                                        (e = r.sent()),
                                        C('getDevices', e),
                                        (t =
                                          null == e
                                            ? void 0
                                            : e.filter(function (e) {
                                                return e.kind.includes('input') && 'default' !== e.deviceId;
                                              })),
                                        C('inputDevices', t),
                                        [2, t]
                                      );
                                    case 2:
                                      throw ((n = r.sent()), C('getDevices error', n), n);
                                    case 3:
                                      return [2];
                                  }
                                });
                              });
                            }),
                            (e.prototype.renegotiation = function (e) {
                              return o(this, void 0, void 0, function () {
                                var t, n, r;
                                return i(this, function (o) {
                                  switch (o.label) {
                                    case 0:
                                      return (
                                        o.trys.push([0, 2, , 3]),
                                        [
                                          4,
                                          this.peerConnection.setRemoteDescription(
                                            new RTCSessionDescription({ sdp: e, type: 'offer' }),
                                          ),
                                        ]
                                      );
                                    case 1:
                                      return o.sent(), [3, 3];
                                    case 2:
                                      return (
                                        (t = o.sent()),
                                        C('renegotiation setRemoteDescription exception->', t),
                                        l.default.onWebrtcStatusChange({
                                          code: -1,
                                          msg: 'setRemoteDescription 失败，请稍后重试.',
                                        }),
                                        [3, 3]
                                      );
                                    case 3:
                                      return o.trys.push([3, 6, , 7]), [4, this.peerConnection.createAnswer()];
                                    case 4:
                                      return (n = o.sent()), [4, this.peerConnection.setLocalDescription(n)];
                                    case 5:
                                      return (
                                        o.sent(),
                                        this.sendAckData({ data: { type: 'user_update', sdp: n.sdp } }),
                                        [3, 7]
                                      );
                                    case 6:
                                      return (
                                        (r = o.sent()), C('renegotiation setLocalDescription exception->', r), [3, 7]
                                      );
                                    case 7:
                                      return C('renegotiation'), [2];
                                  }
                                });
                              });
                            }),
                            (e.prototype.onAnswer = function (e) {
                              void 0 === e && (e = '');
                              try {
                                var t = JSON.parse(e),
                                  n = t.role,
                                  r = t.game_config,
                                  o = t.feature_switch,
                                  i = t.input_seat,
                                  a = t.code,
                                  s = t.message,
                                  c = t.screen_config,
                                  u = t.plat;
                                C('onAnswer-> serverSideDescriptionObject', t),
                                  u && 'android' === u && (this.isMobileGame = !0),
                                  l.default.onWebrtcStatusChange({
                                    code: a > 1e3 ? f.ANSWER_SDP_CODE.PROXY_ERROR : a,
                                    msg: s,
                                  }),
                                  (0, h.isMobile)()
                                    ? v.default.initOrientationDetector()
                                    : l.default.getIsMobileGame() &&
                                      'landscape' === (null == c ? void 0 : c.orientation) &&
                                      (v.default.setRemoteOrientation(c.orientation),
                                      v.default.setVideoOrientation({ deg: 270, rotateMountPoint: !0 })),
                                  l.default.onConfigurationChange({ screen_config: c });
                                try {
                                  this.peerConnection.setRemoteDescription(
                                    new RTCSessionDescription({ sdp: t.sdp, type: 'answer' }),
                                  ),
                                    m.default.setGameConfig(r),
                                    m.default.setRole(n),
                                    m.default.setSeatIndex(i),
                                    m.default.setServerSideDescription(t),
                                    m.default.setFeatureSwitch(o);
                                } catch (e) {
                                  C('setRemoteDescription exception->', e),
                                    l.default.onWebrtcStatusChange({
                                      code: -1,
                                      msg: 'setRemoteDescription 失败，请稍后重试.',
                                    });
                                }
                              } catch (e) {
                                C('parse serverSideDescription error', e),
                                  l.default.onWebrtcStatusChange({
                                    code: -1,
                                    msg: 'parse serverSideDescription error',
                                  });
                              }
                            }),
                            (e.prototype.createUserMedia = function (e) {
                              var t,
                                n = e.mic,
                                a = void 0 !== n && n,
                                s = e.camera,
                                u = void 0 !== s && s;
                              return o(this, void 0, void 0, function () {
                                var e, n, o, s, l, d;
                                return i(this, function (i) {
                                  switch (i.label) {
                                    case 0:
                                      if (!a && !u) return [3, 4];
                                      'string' == typeof u &&
                                        (Object.keys(S.CameraProfile).includes(u)
                                          ? (this.cameraProfile = S.CameraProfile[u])
                                          : C(
                                              ''.concat(
                                                u,
                                                ' is not included in camera profile types, use default settings',
                                              ),
                                            )),
                                        'object' == c(u) && (this.cameraProfile = r(r({}, this.cameraProfile), u)),
                                        u && C('cameraProfile', this.cameraProfile),
                                        'object' == c(a) && (this.micProfile = r(r({}, this.micProfile), a)),
                                        a && C('micProfile', this.micProfile),
                                        (e = this.cameraProfile),
                                        (n = e.width),
                                        (o = e.height),
                                        (s = e.frameRate),
                                        (l = e.deviceId),
                                        (i.label = 1);
                                    case 1:
                                      return (
                                        i.trys.push([1, 3, , 4]),
                                        [
                                          4,
                                          null === (t = navigator.mediaDevices) || void 0 === t
                                            ? void 0
                                            : t.getUserMedia({
                                                video: !!u && { width: n, height: o, frameRate: s, deviceId: l },
                                                audio: !!a && this.micProfile,
                                              }),
                                        ]
                                      );
                                    case 2:
                                      return [2, i.sent()];
                                    case 3:
                                      throw ((d = i.sent()), C('getUserMedia error', d, d.name), d);
                                    case 4:
                                      return [2, null];
                                  }
                                });
                              });
                            }),
                            (e.prototype.createOffer = function (e) {
                              var t = e.mic,
                                n = void 0 !== t && t,
                                r = e.camera,
                                s = void 0 !== r && r;
                              return o(this, void 0, void 0, function () {
                                var e, t, r, o, c, u, d, p, h, v, m;
                                return i(this, function (i) {
                                  switch (i.label) {
                                    case 0:
                                      if (!this.peerConnection.addTransceiver) return [3, 10];
                                      i.label = 1;
                                    case 1:
                                      return i.trys.push([1, 3, , 4]), [4, this.createUserMedia({ mic: n, camera: s })];
                                    case 2:
                                      if (((e = i.sent()), C('userMedia', e), e)) {
                                        try {
                                          for (t = a(e.getTracks()), r = t.next(); !r.done; r = t.next())
                                            'audio' === (o = r.value).kind
                                              ? (this.audioStreamSender = this.peerConnection.addTrack(o))
                                              : (this.videoStreamSender = this.peerConnection.addTrack(o));
                                        } catch (e) {
                                          v = { error: e };
                                        } finally {
                                          try {
                                            r && !r.done && (m = t.return) && m.call(t);
                                          } finally {
                                            if (v) throw v.error;
                                          }
                                        }
                                        (this.userMedia = e), l.default.onGetUserMediaStatusChange({ msg: 'success' });
                                      }
                                      return (
                                        n || this.peerConnection.addTransceiver('audio', { direction: 'recvonly' }),
                                        s || this.peerConnection.addTransceiver('video', { direction: 'recvonly' }),
                                        [3, 4]
                                      );
                                    case 3:
                                      return (
                                        (c = i.sent()),
                                        C('createUserMedia error', c),
                                        l.default.onGetUserMediaStatusChange({ msg: c.name }),
                                        this.peerConnection.addTransceiver('audio', { direction: 'recvonly' }),
                                        this.peerConnection.addTransceiver('video', { direction: 'recvonly' }),
                                        [3, 4]
                                      );
                                    case 4:
                                      C('peerConnection addTransceiver'), (i.label = 5);
                                    case 5:
                                      return (
                                        i.trys.push([5, 8, , 9]),
                                        (u = this.onOffer),
                                        [4, this.peerConnection.createOffer()]
                                      );
                                    case 6:
                                      return [4, u.apply(this, [i.sent()])];
                                    case 7:
                                      return [2, i.sent()];
                                    case 8:
                                      return (
                                        (d = i.sent()),
                                        C('create offer with addTransceiver error', d),
                                        this.disconnected({
                                          message: 'create offer with addTransceiver is failed',
                                          code: f.RTC_CODE.CREATE_OFFER_FAILED,
                                        }),
                                        [3, 9]
                                      );
                                    case 9:
                                      return [3, 15];
                                    case 10:
                                      C('peerConnection no addTransceiver'), (i.label = 11);
                                    case 11:
                                      return (
                                        i.trys.push([11, 14, , 15]),
                                        (p = this.onOffer),
                                        [
                                          4,
                                          this.peerConnection.createOffer({
                                            offerToReceiveVideo: !0,
                                            offerToReceiveAudio: !0,
                                          }),
                                        ]
                                      );
                                    case 12:
                                      return [4, p.apply(this, [i.sent()])];
                                    case 13:
                                      return [2, i.sent()];
                                    case 14:
                                      return (
                                        (h = i.sent()),
                                        C('create offer without addTransceiver error', h),
                                        this.disconnected({
                                          message: 'create offer without addTransceiver is failed',
                                          code: f.RTC_CODE.CREATE_OFFER_FAILED,
                                        }),
                                        [3, 15]
                                      );
                                    case 15:
                                      return [2];
                                  }
                                });
                              });
                            }),
                            (e.prototype.onOffer = function (e) {
                              return o(this, void 0, void 0, function () {
                                var t, n;
                                return i(this, function (r) {
                                  switch (r.label) {
                                    case 0:
                                      C('onOffer->', e), (r.label = 1);
                                    case 1:
                                      return r.trys.push([1, 3, , 4]), [4, this.peerConnection.setLocalDescription(e)];
                                    case 2:
                                      return (
                                        r.sent(),
                                        (t = this.peerConnection.localDescription),
                                        (0, h.checkProfileLevelId)(t.sdp),
                                        (this.clientSideDescription = {
                                          sdp: t.sdp,
                                          type: t.type,
                                          deviceInfo: {
                                            platform: (0, h.isMobile)() ? 'mobile' : 'pc',
                                            user_agent: (0, h.is360)()
                                              ? ''.concat(
                                                  null === navigator || void 0 === navigator
                                                    ? void 0
                                                    : navigator.userAgent,
                                                  ' 360 browser',
                                                )
                                              : null === navigator || void 0 === navigator
                                              ? void 0
                                              : navigator.userAgent,
                                          },
                                          sdkType: 'JS',
                                        }),
                                        [2, this.clientSideDescription]
                                      );
                                    case 3:
                                      return (n = r.sent()), C('onOffer exception->', n), [3, 4];
                                    case 4:
                                      return [2];
                                  }
                                });
                              });
                            }),
                            (e.prototype.checkAckDataChannelStatus = function () {
                              var e,
                                t = this;
                              'open' === (null === (e = this.ackDataChannel) || void 0 === e ? void 0 : e.readyState)
                                ? (this.onLoadedMetaData(),
                                  clearInterval(this.ackDataChannelTimer),
                                  (this.ackDataChannelTimer = null))
                                : this.ackDataChannelTimer ||
                                  (this.ackDataChannelTimer = setInterval(function () {
                                    t.checkAckDataChannelStatus();
                                  }, 500));
                            }),
                            (e.prototype.onTrack = function (e) {
                              var t,
                                n = this;
                              if ((C('onTrack', e.track), 'audio' === e.track.kind && e.track.label.includes('|'))) {
                                var r = s(e.track.label.split('|'), 2),
                                  o = r[0],
                                  i = r[1];
                                return (
                                  C('on audio Track', e.track.label, o, i, e.streams[0].id),
                                  m.default.setHostUserId(o),
                                  (0, h.createAudioAndAddTrack)({ id: i, source: e.streams[0] })
                                );
                              }
                              this.mediaStream || (this.mediaStream = new MediaStream()),
                                this.mediaStream.addTrack(e.track);
                              var a = (0, h.getVideoElement)();
                              (a.srcObject = this.mediaStream),
                                'video' === e.track.kind &&
                                  (C('on video Track', null === (t = e.streams[0]) || void 0 === t ? void 0 : t.id),
                                  'wx' === (0, h.checkBrowser)()
                                    ? this.checkAckDataChannelStatus()
                                    : (a.onloadedmetadata = function () {
                                        return n.checkAckDataChannelStatus();
                                      }));
                            }),
                            (e.prototype.onLoadedMetaData = function () {
                              var e,
                                t,
                                n,
                                r,
                                o,
                                i = this;
                              if ((C('onLoadedMetaData->'), this.connectStatus === f.STATUS.DISCONNECTED))
                                return C('connectStatus is disconnected, onLoadedMetaData return');
                              ((0, h.getCloudGamingContainerElement)().style.display = 'flex'),
                                ((0, h.getProgressBarElement)().style.display = 'none'),
                                ((0, h.getRestartElement)().style.display = 'none'),
                                (0, h.getVideoElement)().focus(),
                                null ===
                                  (n =
                                    null ===
                                      (t =
                                        null === (e = (0, h.getVideoElement)()) || void 0 === e ? void 0 : e.play()) ||
                                    void 0 === t
                                      ? void 0
                                      : t.then(function () {
                                          C('video play success'),
                                            l.default.onEvent({
                                              type: 'autoplay',
                                              data: { code: 0, message: 'video play success' },
                                            });
                                        })) ||
                                  void 0 === n ||
                                  n.catch(function (e) {
                                    l.default.onEvent({ type: 'autoplay', data: { code: -1, message: e } }),
                                      C('onLoadedMetaData play error, ', e);
                                  }),
                                l.default.onWebrtcStatsChange(f.PAGE_STATS.PLAYING),
                                l.default.onConnectSuccess({
                                  code: 0,
                                  seat_index: m.default.getConfig().seat_index,
                                  role: m.default.getConfig().role,
                                }),
                                y.default.setConnectSuccessTime(+new Date()),
                                y.default.toggleMetricReportBulk(!0),
                                (this.connectStatus = f.STATUS.ESTABLISHED),
                                this.checkMouseShowInterval ||
                                  (this.checkMouseShowInterval = setInterval(function () {
                                    i.checkUserIdle();
                                  }, 100)),
                                this.startHeartbeatReport(),
                                (null === (r = l.default.getInitOptions()) || void 0 === r ? void 0 : r.camera) &&
                                  this.setCameraBitrate(
                                    null === (o = this.cameraProfile) || void 0 === o ? void 0 : o.bitrate,
                                  );
                            }),
                            (e.prototype.onIceConnectionStateChange = function () {
                              C('onIceConnectionStateChange', this.peerConnection.iceConnectionState),
                                'connected' === this.peerConnection.iceConnectionState &&
                                  y.default.setIceConnectedTime(+new Date()),
                                'disconnected' === this.peerConnection.iceConnectionState &&
                                  (C('连接已断开，请重试'),
                                  this.disconnected({
                                    message: '连接已断开，请重试',
                                    code: f.RTC_CODE.NEED_RECONNECT,
                                  }));
                            }),
                            (e.prototype.createKmDataChannel = function () {
                              var e = this;
                              C('start createKmDataChannel'),
                                (this.kmDataChannel = this.peerConnection.createDataChannel(f.DATACHANNEL.KM, {
                                  ordered: !0,
                                  maxRetransmits: 0,
                                })),
                                (this.kmDataChannel.onmessage = function (t) {
                                  return e.onKmMessage(t);
                                }),
                                (this.kmDataChannel.onopen = function (t) {
                                  return e.onDataChannelOpen(t);
                                }),
                                (this.kmDataChannel.onclose = function (t) {
                                  return e.onDataChannelClose(t);
                                }),
                                (this.kmDataChannel.onerror = function (t) {
                                  return e.onDataChannelError(t);
                                });
                            }),
                            (e.prototype.createHbDataChannel = function () {
                              var e = this;
                              C('start createHbDataChannel'),
                                (this.hbDataChannel = this.peerConnection.createDataChannel(f.DATACHANNEL.HB, {
                                  ordered: !0,
                                  maxRetransmits: 0,
                                })),
                                (this.hbDataChannel.onmessage = function (t) {
                                  return e.onHbMessage(t);
                                }),
                                (this.hbDataChannel.onopen = function (t) {
                                  return e.onDataChannelOpen(t);
                                }),
                                (this.hbDataChannel.onclose = function (t) {
                                  return e.onDataChannelClose(t);
                                }),
                                (this.hbDataChannel.onerror = function (t) {
                                  return e.onDataChannelError(t);
                                });
                            }),
                            (e.prototype.createAckDataChannel = function () {
                              var e = this;
                              C('start createAckDataChannel'),
                                (this.ackDataChannel = this.peerConnection.createDataChannel(f.DATACHANNEL.ACK, {
                                  ordered: !0,
                                  maxRetransmits: 0,
                                })),
                                (this.ackDataChannel.onmessage = function (t) {
                                  return e.onAckMessage(t);
                                }),
                                (this.ackDataChannel.onopen = function (t) {
                                  return e.onDataChannelOpen(t);
                                }),
                                (this.ackDataChannel.onclose = function (t) {
                                  return e.onDataChannelClose(t);
                                }),
                                (this.ackDataChannel.onerror = function (t) {
                                  return e.onDataChannelError(t);
                                });
                            }),
                            (e.prototype.createCdDataChannel = function () {
                              var e,
                                t = this;
                              C('start createCdDataChannel'),
                                (this.cdDataChannel =
                                  null === (e = this.peerConnection) || void 0 === e
                                    ? void 0
                                    : e.createDataChannel(f.DATACHANNEL.CD, { ordered: !0, maxRetransmits: 0 })),
                                this.cdDataChannel &&
                                  ((this.cdDataChannel.onmessage = function (e) {
                                    return t.onCdMessage(e);
                                  }),
                                  (this.cdDataChannel.onopen = function (e) {
                                    return t.onDataChannelOpen(e);
                                  }),
                                  (this.cdDataChannel.onclose = function (e) {
                                    return t.onDataChannelClose(e);
                                  }),
                                  (this.cdDataChannel.onerror = function (e) {
                                    return t.onDataChannelError(e);
                                  }));
                            }),
                            (e.prototype.createSvrDataChannel = function () {
                              var e,
                                t = this;
                              C('start createSvrDataChannel'),
                                (this.svrDataChannel =
                                  null === (e = this.peerConnection) || void 0 === e
                                    ? void 0
                                    : e.createDataChannel(f.DATACHANNEL.SV, { ordered: !0, maxRetransmits: 0 })),
                                this.svrDataChannel &&
                                  ((this.svrDataChannel.onmessage = function (e) {
                                    return t.onSvrMessage(e);
                                  }),
                                  (this.svrDataChannel.onopen = function (e) {
                                    return t.onDataChannelOpen(e);
                                  }),
                                  (this.svrDataChannel.onclose = function (e) {
                                    return t.onDataChannelClose(e);
                                  }),
                                  (this.svrDataChannel.onerror = function (e) {
                                    return t.onDataChannelError(e);
                                  }));
                            }),
                            (e.prototype.createDefaultCustomDataChannel = function () {
                              var e,
                                t = this;
                              C('start createDefaultCustomDataChannel');
                              var n =
                                null === (e = this.peerConnection) || void 0 === e
                                  ? void 0
                                  : e.createDataChannel('cs_0', { ordered: !0, maxRetransmits: 0 });
                              (n.onopen = function (e) {
                                return t.onDataChannelOpen(e);
                              }),
                                (n.onmessage = function (e) {
                                  C('defaultCustomDataChannel onmessage', e);
                                }),
                                this.customDataChannel.set(0, n);
                            }),
                            (e.prototype.onDataChannelError = function (e) {
                              var t = e || {},
                                n = t.target,
                                r = t.error;
                              C(''.concat(n.label, ' datachannel error->'), null == r ? void 0 : r.message);
                            }),
                            (e.prototype.onDataChannelOpen = function (e) {
                              var t = (e || {}).target;
                              C(''.concat(t.label, ' datachannel open->'), t.readyState, t.label),
                                'hb' === t.label && this.startHeartbeatReport();
                            }),
                            (e.prototype.onDataChannelClose = function (e) {
                              var t = (e || {}).target;
                              C(''.concat(t.label, ' datachannel close->'), t.readyState);
                            }),
                            (e.prototype.onKmMessage = function (e) {
                              var t = JSON.parse(e.data);
                              this.debugSetting.showOnKmMessage && console.log('onKmMessage', t);
                              var n = t.screen_width,
                                r = t.screen_height,
                                o = t.screen_left,
                                i = t.screen_top,
                                a = t.cursor_showing;
                              v.default.remoteScreenResolutionChange({ width: n, height: r, left: o, top: i }),
                                y.default.setCpuAndGpuUsage({ cpu: t.cpu_usage, gpu: t.gpu_usage }),
                                this.setCursorShowStatus(null == a || a);
                            }),
                            (e.prototype.onHbMessage = function (e) {
                              var t = JSON.parse(e.data),
                                n = t.token,
                                r = t.code,
                                o = t.user_id,
                                i = t.timestamp,
                                a = t.message;
                              if (
                                (n && (this.token = n),
                                this.debugSetting.showOnHbMessage && console.log('onHbMessage', t),
                                r >= 0 && (C('onHbMessage', a), this.disconnected({ message: a, code: r })),
                                o && l.default.onNetworkChange({ status: 'stats', stats: t }),
                                i)
                              ) {
                                var s = +new Date() - +i;
                                y.default.setRTT(s) &&
                                  (o
                                    ? m.default.getServerSideDescription().user_id === o &&
                                      l.default.onNetworkChange({
                                        status: 'jitter',
                                        data: { value: s, message: 'NETWORK_JITTER' },
                                      })
                                    : l.default.onNetworkChange({
                                        status: 'jitter',
                                        data: { value: s, message: 'NETWORK_JITTER' },
                                      }));
                              }
                            }),
                            (e.prototype.onAckMessage = function (e) {
                              try {
                                var t = JSON.parse(e.data),
                                  n = t.data,
                                  r = void 0 === n ? w : n,
                                  o = t.seq;
                                if (
                                  (this.debugSetting.showOnAckMessage &&
                                    ('cursor_state' === r.type ||
                                      'keys_clean' === r.type ||
                                      console.log('onAckMessage', r, o)),
                                  'seats_info_sync' === r.type)
                                )
                                  return;
                                var i = this.dataChannelCallbacks[o];
                                if (o && (y.default.setInputEnd(o), i)) {
                                  var a = i.callback;
                                  delete this.dataChannelCallbacks[o],
                                    this.dataChannelRetryTimers[o] &&
                                      (clearTimeout(this.dataChannelRetryTimers[o]),
                                      delete this.dataChannelRetryTimers[o]),
                                    null == a || a({ code: 0, msg: 'on ack message', data: r });
                                }
                                switch (r.type) {
                                  case 'cursor_state':
                                    if (!r.state) return;
                                    this.setCursorShowStatus('showing' === r.state);
                                    break;
                                  case 'game_launched':
                                    C('game_launched', r),
                                      l.default.onNetworkChange({
                                        status: 'gamelaunched',
                                        data: { begin: r.launch_begin, finish: r.launch_complete },
                                      });
                                    break;
                                  case 'input_seat':
                                    C('got new input_seat', r), m.default.setSeatIndex(r.input_seat);
                                    break;
                                  case 'user_state':
                                    C('user state update', r),
                                      l.default.onMultiPlayerChange({
                                        user_state: { user_id: r.user_id, state: r.state },
                                      });
                                    break;
                                  case 'open_url':
                                    C('got open_url', r),
                                      l.default.onNetworkChange({ status: 'openurl', data: { value: r.url } });
                                    break;
                                  case 'vmaf_test':
                                    l.default.onVmafChange(r);
                                    break;
                                  case 'user_sdk_update':
                                    C('user_sdk_update', r),
                                      this.peerConnection.setRemoteDescription(
                                        new RTCSessionDescription({ sdp: r.sdp, type: 'answer' }),
                                      );
                                    break;
                                  case 'user_update':
                                    this.renegotiation(r.sdp);
                                    break;
                                  case 'sync_seats':
                                    i ||
                                      l.default.onMultiPlayerChange({
                                        seats_info: { players: r.players, viewers: r.viewers },
                                      });
                                    var s = m.default.getServerSideDescription().user_id,
                                      c = r.players.find(function (e) {
                                        return e.name === s;
                                      });
                                    c &&
                                      ((0 !== c.mic_status && 1 !== c.mic_status) ||
                                        E.setTrackEnable({ type: 'audio', enable: !1 }),
                                      2 === c.mic_status && E.setTrackEnable({ type: 'audio', enable: !0 }));
                                    break;
                                  case 'submit_seat_change':
                                    i ||
                                      l.default.onMultiPlayerChange({
                                        submit_seat_change: {
                                          user_id: r.user_id,
                                          to_role: r.to_role,
                                          seat_index: r.seat_index,
                                        },
                                      });
                                    break;
                                  case 'cursor_pos':
                                    if (this.remoteCursorMode === f.CURSOR_MODE.REMOTE_SRC_POS) {
                                      var u = r.x,
                                        d = r.y,
                                        p = v.default.transferLocalScale({
                                          width: u - this.hotSpot.x,
                                          height: d - this.hotSpot.y,
                                        }),
                                        h = p.width,
                                        g = p.height;
                                      v.default.updateCursorPosition({ displayX: h, displayY: g });
                                    }
                                }
                              } catch (e) {
                                C('onAckMessage exception->', e);
                              }
                            }),
                            (e.prototype.onCdMessage = function (e) {
                              var t = this,
                                n = e.data;
                              if (n)
                                try {
                                  var r = JSON.parse(n),
                                    o = r.data,
                                    i = r.hotspotx,
                                    a = void 0 === i ? 0 : i,
                                    s = r.hotspoty,
                                    c = void 0 === s ? 0 : s;
                                  this.debugSetting.showOnCdMessage &&
                                    C(
                                      'onCdMessage image data->'.concat(o.length, ' ').concat((0, g.default)(o)),
                                      'hotspotx',
                                      a,
                                      'hotspoty',
                                      c,
                                    ),
                                    (this.hotSpot.x = a),
                                    (this.hotSpot.y = c);
                                  var u = 'data:image/png;base64,'.concat(o);
                                  this.remoteCursorImage = u;
                                  var l = new Image();
                                  (l.onload = function () {
                                    if ((0, h.isMobile)() || t.remoteCursorMode === f.CURSOR_MODE.REMOTE_SRC_POS) {
                                      (0, h.getCursorElement)().style.backgroundImage = 'url('.concat(u, ')');
                                      var e = v.default.transferLocalScale({ width: l.width, height: l.height }),
                                        n = e.width,
                                        r = e.height;
                                      t.resizeMobileCursor({ width: n, height: r });
                                    } else {
                                      var o = (0, h.getVideoElement)();
                                      o &&
                                        (o.style.cursor = 'url('
                                          .concat(u, ') ')
                                          .concat(t.hotSpot.x, ' ')
                                          .concat(t.hotSpot.y, ', auto'));
                                    }
                                  }),
                                    (l.onerror = function (e) {
                                      C('onCdMessage image data load failed', e);
                                    }),
                                    (l.src = u);
                                } catch (e) {
                                  C('onCdMessage data parse failed', e);
                                }
                              else C('onCdMessage no data');
                            }),
                            (e.prototype.onSvrMessage = function (e) {
                              var t = e.data;
                              if (t)
                                try {
                                  var n = JSON.parse(t),
                                    o = n.type,
                                    i = n.data;
                                  switch (
                                    (this.debugSetting.showOnSvMessage && C('onSvMessage', 'type: ', o, 'data', t), o)
                                  ) {
                                    case 'game_start_complete':
                                      l.default.onGameStartComplete(i);
                                      break;
                                    case 'archive_load_status':
                                      l.default.onLoadGameArchive(i);
                                      break;
                                    case 'archive_save_status':
                                      l.default.onSaveGameArchive(i);
                                      break;
                                    case 'metric_sig_key':
                                      m.default.setServerSideDescription(
                                        r(r({}, m.default.getServerSideDescription()), { sig_key: i.sig_key }),
                                      );
                                      break;
                                    case 'screen_config_change':
                                      l.default.onConfigurationChange({ screen_config: i });
                                      break;
                                    case 'hit_input':
                                      var a = i.field_type,
                                        s = i.status;
                                      l.default.onInputStatusChange({ field_type: a, status: s });
                                      break;
                                    default:
                                      C('onSvMessage, type:', o, 'data: ', i);
                                  }
                                } catch (e) {
                                  C('onSvMessage data parse failed', e);
                                }
                              else C('onSvMessage no data');
                            }),
                            (e.prototype.resizeMobileCursor = function (e) {
                              var t = e.width,
                                n = void 0 === t ? 13 : t,
                                r = e.height,
                                o = void 0 === r ? 13 : r,
                                i = (0, h.getCursorElement)();
                              (i.style.width = ''.concat(Math.round(n * this.mobileCursorScale), 'px')),
                                (i.style.height = ''.concat(Math.round(o * this.mobileCursorScale), 'px')),
                                (i.style.borderRadius = null),
                                (i.style.backgroundColor = null);
                            }),
                            (e.prototype.reportStat = function () {
                              var e = y.default.getStats(),
                                t = e.fps;
                              if (
                                (this.connectStatus === f.STATUS.CONNECTING &&
                                  ((this.connectTimeoutCount += 1),
                                  this.connectTimeoutCount >= this.newConnectTimeout &&
                                    (C('connect timeout, no-flow notify'),
                                    l.default.onNetworkChange({ status: 'noflow' }),
                                    this.disconnected({
                                      message: 'connect timeout, please reconnect',
                                      code: f.RTC_CODE.NEED_RECONNECT,
                                    }),
                                    (this.connectTimeoutCount = 0))),
                                this.connectStatus === f.STATUS.ESTABLISHED &&
                                  (0 === t && 'playing' === this.gameStatus
                                    ? ((this.noFlowCount += 1),
                                      this.noFlowCount >= this.noflowTimeout &&
                                        (C('noFlowCount reach, no-flow notify'),
                                        l.default.onNetworkChange({ status: 'noflowcenter' }),
                                        this.disconnected({
                                          message: 'no flow and fps is 0, please reconnect',
                                          code: f.RTC_CODE.NEED_RECONNECT,
                                        }),
                                        (this.noFlowCount = 0)))
                                    : (this.noFlowCount = 0)),
                                !this.hbDataChannel)
                              )
                                return C('hbDataChannel has been closed');
                              if (((e.timestamp = +new Date()), this.connectStatus !== f.STATUS.DISCONNECTED)) {
                                var n = e.fps,
                                  o = e.delay,
                                  i = e.bit_rate,
                                  a = e.packet_lost,
                                  s = e.nack,
                                  c = e.packet_received,
                                  u = r(r({}, e), {
                                    fps: ''.concat(n),
                                    delay: ''.concat(o),
                                    bit_rate: ''.concat(i),
                                    packet_lost: ''.concat(a),
                                    nack: ''.concat(s),
                                    packet_received: ''.concat(c),
                                  });
                                this.dataChannelSend(this.hbDataChannel, u),
                                  this.debugSetting.showSendHbData && console.log('sendHbData', u),
                                  l.default.onNetworkChange({ status: 'stats', stats: e });
                              }
                              y.default.addReportStat();
                            }),
                            (e.prototype.dataChannelSend = function (e, t) {
                              'open' === (null == e ? void 0 : e.readyState) && e.send(JSON.stringify(t));
                            }),
                            (e.prototype.dataChannelSendWithCallback = function (e) {
                              var t = this,
                                n = e.dataChannel,
                                r = void 0 === n ? null : n,
                                o = e.ackMsg,
                                i = void 0 === o ? w : o,
                                a = e.retry,
                                s = void 0 === a ? 0 : a,
                                c = e.callback,
                                u = void 0 === c ? h.noop : c,
                                l = e.interval,
                                d = void 0 === l ? 1e3 : l;
                              if ('open' === (null == r ? void 0 : r.readyState))
                                try {
                                  var p = i.seq;
                                  if (
                                    (p || ((p = (0, h.getSequence)()), y.default.setInputStart(p)),
                                    r.send(JSON.stringify(i)),
                                    (this.dataChannelCallbacks[p] = {
                                      ackMsg: i,
                                      retry: s,
                                      callback: u,
                                      interval: d,
                                      retryAction: function () {
                                        if (!t.dataChannelCallbacks[p]) return C(r.label, p, 'ackItem not exist');
                                        var e = t.dataChannelCallbacks[p];
                                        if (e.retry >= 1 || -1 === e.retry)
                                          C(r.label, p, 'ackItem retry, remain '.concat(e.retry, ' times')),
                                            (e.retry = e.retry >= 1 ? e.retry - 1 : e.retry),
                                            t.dataChannelSendWithCallback({
                                              dataChannel: r,
                                              ackMsg: e.ackMsg,
                                              retry: e.retry,
                                              callback: e.callback,
                                              interval: e.interval,
                                            });
                                        else {
                                          var n = e.callback;
                                          delete t.dataChannelCallbacks[p],
                                            t.dataChannelRetryTimers[p] &&
                                              (y.default.setInputEnd(p),
                                              clearTimeout(t.dataChannelRetryTimers[p]),
                                              delete t.dataChannelRetryTimers[p],
                                              C('ack msg timer timeout clear:', p)),
                                            n({ code: 1, msg: 'send ack message timeout' }),
                                            C('send ack message timeout:', p);
                                        }
                                      },
                                    }),
                                    s > 0)
                                  ) {
                                    var f = setTimeout(function () {
                                      var e;
                                      null === (e = t.dataChannelCallbacks[p]) || void 0 === e || e.retryAction();
                                    }, d);
                                    this.dataChannelRetryTimers[p] = f;
                                  }
                                } catch (e) {
                                  C('ack msg exception:', e);
                                }
                            }),
                            (e.prototype.setCursorShowStatus = function (e) {
                              if (this.connectStatus === f.STATUS.ESTABLISHED) {
                                this.forceShowCursor
                                  ? this.lockMouse(!1)
                                  : e
                                  ? this.remoteCursorMode === f.CURSOR_MODE.REMOTE_SRC_POS
                                    ? this.lockMouse(!0)
                                    : this.lockMouse(!1)
                                  : this.lockMouse(!0),
                                  e !== this.showCursor &&
                                    (C('cursor show stat will set to', e),
                                    l.default.onCursorShowStatChange({ oldStatus: this.showCursor, newStatus: e })),
                                  (this.showCursor = e);
                                var t = (0, h.getVideoElement)(),
                                  n = (0, h.getCursorElement)();
                                if (this.remoteCursorMode !== f.CURSOR_MODE.REMOTE_SRC_POS) {
                                  if (this.remoteCursorMode === f.CURSOR_MODE.REMOTE_DRAW)
                                    return (t.style.cursor = 'none');
                                  t &&
                                    (e || this.forceShowCursor
                                      ? (t.style.cursor = 'url('
                                          .concat(
                                            this.remoteCursorImage ? this.remoteCursorImage : this.originCursorStyle,
                                            ') ',
                                          )
                                          .concat(this.hotSpot.x, ' ')
                                          .concat(this.hotSpot.y, ', auto'))
                                      : (t.style.cursor = 'none')),
                                    (0, h.isMobile)() &&
                                      ((e || this.forceShowCursor) && this.mobileShowCursor
                                        ? (n.style.display = 'block')
                                        : (n.style.display = 'none'));
                                } else
                                  (e || this.forceShowCursor) && this.mobileShowCursor
                                    ? (n.style.display = 'block')
                                    : (n.style.display = 'none');
                              }
                            }),
                            e
                          );
                        })())();
                      (window.CloudGamingWebRTC = E), (t.default = E);
                    },
                    4112: function (e, t, n) {
                      'use strict';
                      var r =
                          (this && this.__awaiter) ||
                          function (e, t, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                              function a(e) {
                                try {
                                  c(r.next(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function s(e) {
                                try {
                                  c(r.throw(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function c(e) {
                                var t;
                                e.done
                                  ? o(e.value)
                                  : ((t = e.value),
                                    t instanceof n
                                      ? t
                                      : new n(function (e) {
                                          e(t);
                                        })).then(a, s);
                              }
                              c((r = r.apply(e, t || [])).next());
                            });
                          },
                        o =
                          (this && this.__generator) ||
                          function (e, t) {
                            var n,
                              r,
                              o,
                              i,
                              a = {
                                label: 0,
                                sent: function () {
                                  if (1 & o[0]) throw o[1];
                                  return o[1];
                                },
                                trys: [],
                                ops: [],
                              };
                            return (
                              (i = { next: s(0), throw: s(1), return: s(2) }),
                              'function' == typeof Symbol &&
                                (i[Symbol.iterator] = function () {
                                  return this;
                                }),
                              i
                            );
                            function s(i) {
                              return function (s) {
                                return (function (i) {
                                  if (n) throw new TypeError('Generator is already executing.');
                                  for (; a; )
                                    try {
                                      if (
                                        ((n = 1),
                                        r &&
                                          (o =
                                            2 & i[0]
                                              ? r.return
                                              : i[0]
                                              ? r.throw || ((o = r.return) && o.call(r), 0)
                                              : r.next) &&
                                          !(o = o.call(r, i[1])).done)
                                      )
                                        return o;
                                      switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                                        case 0:
                                        case 1:
                                          o = i;
                                          break;
                                        case 4:
                                          return a.label++, { value: i[1], done: !1 };
                                        case 5:
                                          a.label++, (r = i[1]), (i = [0]);
                                          continue;
                                        case 7:
                                          (i = a.ops.pop()), a.trys.pop();
                                          continue;
                                        default:
                                          if (
                                            !(
                                              (o = (o = a.trys).length > 0 && o[o.length - 1]) ||
                                              (6 !== i[0] && 2 !== i[0])
                                            )
                                          ) {
                                            a = 0;
                                            continue;
                                          }
                                          if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                                            a.label = i[1];
                                            break;
                                          }
                                          if (6 === i[0] && a.label < o[1]) {
                                            (a.label = o[1]), (o = i);
                                            break;
                                          }
                                          if (o && a.label < o[2]) {
                                            (a.label = o[2]), a.ops.push(i);
                                            break;
                                          }
                                          o[2] && a.ops.pop(), a.trys.pop();
                                          continue;
                                      }
                                      i = t.call(e, a);
                                    } catch (e) {
                                      (i = [6, e]), (r = 0);
                                    } finally {
                                      n = o = 0;
                                    }
                                  if (5 & i[0]) throw i[1];
                                  return { value: i[0] ? i[1] : void 0, done: !0 };
                                })([i, s]);
                              };
                            }
                          },
                        i =
                          (this && this.__read) ||
                          function (e, t) {
                            var n = 'function' == typeof Symbol && e[Symbol.iterator];
                            if (!n) return e;
                            var r,
                              o,
                              i = n.call(e),
                              a = [];
                            try {
                              for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; ) a.push(r.value);
                            } catch (e) {
                              o = { error: e };
                            } finally {
                              try {
                                r && !r.done && (n = i.return) && n.call(i);
                              } finally {
                                if (o) throw o.error;
                              }
                            }
                            return a;
                          },
                        a =
                          (this && this.__spreadArray) ||
                          function (e, t, n) {
                            if (n || 2 === arguments.length)
                              for (var r, o = 0, i = t.length; o < i; o++)
                                (!r && o in t) || (r || (r = Array.prototype.slice.call(t, 0, o)), (r[o] = t[o]));
                            return e.concat(r || Array.prototype.slice.call(t));
                          },
                        s =
                          (this && this.__importDefault) ||
                          function (e) {
                            return e && e.__esModule ? e : { default: e };
                          };
                      Object.defineProperty(t, '__esModule', { value: !0 });
                      var c = s(n(4993)),
                        u = s(n(2179)),
                        l = n(1587),
                        d = n(1743),
                        p = s(n(9752)),
                        f = s(n(5922)).default.log,
                        h = (function () {
                          function e() {
                            (this.loginTaskFinish = !0),
                              (this.repeatKey = function (e, t) {
                                for (var n = [], r = 0; r < t; ++r)
                                  n.push({ type: 'keyboard', key: e, down: !0 }),
                                    n.push({ type: 'keyboard', key: e, down: !1 });
                                return n;
                              }),
                              (this.eventFromChar = function (e) {
                                var t = [],
                                  n = d.codeMap[e];
                                return (
                                  n &&
                                    (n.shift && t.push({ type: 'keyboard', key: 16, down: !0 }),
                                    t.push({ type: 'keyboard', key: n.key, down: !0 }),
                                    t.push({ type: 'keyboard', key: n.key, down: !1 }),
                                    n.shift && t.push({ type: 'keyboard', key: 16, down: !1 })),
                                  t
                                );
                              });
                          }
                          return (
                            (e.prototype.getLoginHelperInfo = function () {
                              return u.default.getConfig().login_helper;
                            }),
                            (e.prototype.inputLoginInfo = function (e) {
                              var t = this,
                                n = e.loginData,
                                s = void 0 === n ? d.empty : n,
                                u = e.callback,
                                h = void 0 === u ? d.noop : u;
                              this.loginTaskFinish || h({ code: 1, finish: !1, msg: 'last task is not complete' });
                              var v = s.acc,
                                m = s.pwd,
                                y = this.getLoginHelperInfo();
                              if (null == y ? void 0 : y.title) {
                                var g = y.before_script,
                                  b = void 0 === g ? [] : g,
                                  S = y.acc_pos,
                                  C = y.pwd_pos,
                                  w = y.title,
                                  E = y.after_script,
                                  _ = void 0 === E ? [] : E;
                                p.default.sendAckData({
                                  data: { type: 'wnd_pos', name: w },
                                  callback: function (e) {
                                    return r(t, void 0, void 0, function () {
                                      var t,
                                        n,
                                        r,
                                        s,
                                        u,
                                        p,
                                        y,
                                        g,
                                        w,
                                        E,
                                        T = this;
                                      return o(this, function (o) {
                                        switch (o.label) {
                                          case 0:
                                            return (
                                              f('internalLoginHelper->res', e),
                                              (t = e.code),
                                              (n = e.data),
                                              (r = n.found),
                                              (s = n.left),
                                              (u = void 0 === s ? 0 : s),
                                              (p = n.top),
                                              (y = void 0 === p ? 0 : p),
                                              0 !== t || 1 !== r
                                                ? [3, 3]
                                                : (f('login helper script is running->', n),
                                                  (this.loginTaskFinish = !1),
                                                  (g = b.map(function (e) {
                                                    return 'mousemove' === e.type
                                                      ? { type: e.type, x: e.x + u, y: e.y + y }
                                                      : e;
                                                  })),
                                                  c.default.sendSeqRawEvents(g),
                                                  [4, (0, d.sleep)(1500)])
                                            );
                                          case 1:
                                            return (
                                              o.sent(),
                                              f('account and password input is running'),
                                              (w = []).push({ type: 'mousemove', x: u + S.x, y: y + S.y }),
                                              w.push({ type: 'mouseleft', down: !0 }),
                                              w.push({ type: 'mouseleft', down: !1 }),
                                              w.push({ type: 'keyboard', key: l.KEYCODE.End, down: !0 }),
                                              w.push({ type: 'keyboard', key: l.KEYCODE.End, down: !1 }),
                                              (w = w.concat(this.repeatKey(l.KEYCODE.Backspace, 32))),
                                              a([], i(v), !1).map(function (e) {
                                                return w.push.apply(w, a([], i(T.eventFromChar(e)), !1));
                                              }),
                                              w.push({ type: 'mousemove', x: u + C.x, y: y + C.y }),
                                              w.push({ type: 'mouseleft', down: !0 }),
                                              w.push({ type: 'mouseleft', down: !1 }),
                                              w.push({ type: 'keyboard', key: l.KEYCODE.End, down: !0 }),
                                              w.push({ type: 'keyboard', key: l.KEYCODE.End, down: !1 }),
                                              (w = w.concat(this.repeatKey(l.KEYCODE.Backspace, 32))),
                                              a([], i(m), !1).map(function (e) {
                                                return w.push.apply(w, a([], i(T.eventFromChar(e)), !1));
                                              }),
                                              c.default.sendSeqRawEvents(w),
                                              [4, (0, d.sleep)(1500)]
                                            );
                                          case 2:
                                            o.sent(),
                                              (E = _.map(function (e) {
                                                return 'mousemove' === e.type
                                                  ? { type: e.type, x: e.x + u, y: e.y + y }
                                                  : e;
                                              })),
                                              c.default.sendSeqRawEvents(E),
                                              (this.loginTaskFinish = !0),
                                              h({ code: 0, finish: this.loginTaskFinish, msg: 'success' }),
                                              (o.label = 3);
                                          case 3:
                                            return [2];
                                        }
                                      });
                                    });
                                  },
                                });
                              } else
                                (this.loginTaskFinish = !0),
                                  h({ code: 1, finish: this.loginTaskFinish, msg: 'does not find loginHelper info.' }),
                                  f('internalLoginHelper loginInfo failed', y);
                            }),
                            (e.prototype.loginWindowStat = function (e) {
                              void 0 === e && (e = d.noop);
                              var t = this.getLoginHelperInfo().title;
                              p.default.sendAckData({
                                data: { type: 'wnd_pos', name: t || 'cloud_gaming_dummy_title' },
                                callback: e,
                              });
                            }),
                            e
                          );
                        })();
                      t.default = new h();
                    },
                    4711: function (e, t, n) {
                      'use strict';
                      var r =
                          (this && this.__decorate) ||
                          function (e, t, n, r) {
                            var o,
                              i = arguments.length,
                              a = i < 3 ? t : null === r ? (r = Object.getOwnPropertyDescriptor(t, n)) : r;
                            if (
                              'object' == ('undefined' == typeof Reflect ? 'undefined' : c(Reflect)) &&
                              'function' == typeof Reflect.decorate
                            )
                              a = Reflect.decorate(e, t, n, r);
                            else
                              for (var s = e.length - 1; s >= 0; s--)
                                (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
                            return i > 3 && a && Object.defineProperty(t, n, a), a;
                          },
                        o =
                          (this && this.__awaiter) ||
                          function (e, t, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                              function a(e) {
                                try {
                                  c(r.next(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function s(e) {
                                try {
                                  c(r.throw(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function c(e) {
                                var t;
                                e.done
                                  ? o(e.value)
                                  : ((t = e.value),
                                    t instanceof n
                                      ? t
                                      : new n(function (e) {
                                          e(t);
                                        })).then(a, s);
                              }
                              c((r = r.apply(e, t || [])).next());
                            });
                          },
                        i =
                          (this && this.__generator) ||
                          function (e, t) {
                            var n,
                              r,
                              o,
                              i,
                              a = {
                                label: 0,
                                sent: function () {
                                  if (1 & o[0]) throw o[1];
                                  return o[1];
                                },
                                trys: [],
                                ops: [],
                              };
                            return (
                              (i = { next: s(0), throw: s(1), return: s(2) }),
                              'function' == typeof Symbol &&
                                (i[Symbol.iterator] = function () {
                                  return this;
                                }),
                              i
                            );
                            function s(i) {
                              return function (s) {
                                return (function (i) {
                                  if (n) throw new TypeError('Generator is already executing.');
                                  for (; a; )
                                    try {
                                      if (
                                        ((n = 1),
                                        r &&
                                          (o =
                                            2 & i[0]
                                              ? r.return
                                              : i[0]
                                              ? r.throw || ((o = r.return) && o.call(r), 0)
                                              : r.next) &&
                                          !(o = o.call(r, i[1])).done)
                                      )
                                        return o;
                                      switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                                        case 0:
                                        case 1:
                                          o = i;
                                          break;
                                        case 4:
                                          return a.label++, { value: i[1], done: !1 };
                                        case 5:
                                          a.label++, (r = i[1]), (i = [0]);
                                          continue;
                                        case 7:
                                          (i = a.ops.pop()), a.trys.pop();
                                          continue;
                                        default:
                                          if (
                                            !(
                                              (o = (o = a.trys).length > 0 && o[o.length - 1]) ||
                                              (6 !== i[0] && 2 !== i[0])
                                            )
                                          ) {
                                            a = 0;
                                            continue;
                                          }
                                          if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                                            a.label = i[1];
                                            break;
                                          }
                                          if (6 === i[0] && a.label < o[1]) {
                                            (a.label = o[1]), (o = i);
                                            break;
                                          }
                                          if (o && a.label < o[2]) {
                                            (a.label = o[2]), a.ops.push(i);
                                            break;
                                          }
                                          o[2] && a.ops.pop(), a.trys.pop();
                                          continue;
                                      }
                                      i = t.call(e, a);
                                    } catch (e) {
                                      (i = [6, e]), (r = 0);
                                    } finally {
                                      n = o = 0;
                                    }
                                  if (5 & i[0]) throw i[1];
                                  return { value: i[0] ? i[1] : void 0, done: !0 };
                                })([i, s]);
                              };
                            }
                          },
                        a =
                          (this && this.__values) ||
                          function (e) {
                            var t = 'function' == typeof Symbol && Symbol.iterator,
                              n = t && e[t],
                              r = 0;
                            if (n) return n.call(e);
                            if (e && 'number' == typeof e.length)
                              return {
                                next: function () {
                                  return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
                                },
                              };
                            throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
                          },
                        s =
                          (this && this.__importDefault) ||
                          function (e) {
                            return e && e.__esModule ? e : { default: e };
                          };
                      Object.defineProperty(t, '__esModule', { value: !0 });
                      var u = s(n(4993)),
                        l = n(9418),
                        d = n(2484),
                        p = n(1743),
                        f = s(n(9752)),
                        h = n(1587),
                        v = s(n(5922)),
                        m = s(n(969)),
                        y = s(n(7329)),
                        g = s(n(6363)),
                        b = s(n(7023)),
                        S = v.default.log,
                        C = !0,
                        w = new ((function () {
                          function e() {
                            var e = this;
                            (this.moveSensitivity = 1),
                              (this.touchesForDelta = null),
                              (this.touchesIdentifierMap = new Map()),
                              (this.touchesMap = new Map()),
                              (this.mousePosition = { x: 0, y: 0, movementX: 0, movementY: 0, remoteX: 0, remoteY: 0 }),
                              (this.enableMousemoveV2 = !1),
                              (this.tabletModeLastPosition = null),
                              (this.kmStatus = { keyboard: !0, mouse: !0 }),
                              (this.enablePaste = !1),
                              (this.deltaMoveToCalcX = 0),
                              (this.deltaMoveToCalcY = 0),
                              (this.escPressTime = null),
                              (this.tabletMode = !1),
                              (this.clickToFullscreen = !1),
                              (this.clickBodyToPlay = !0),
                              (this.mutedVideo = !1),
                              (this.webDraftLevel = l.WEB_DRAFT_LEVEL.CLOSE_HIGH_FREQUENCY),
                              (this.videoWidth = 0),
                              (this.videoHeight = 0),
                              (this.videoLeft = 0),
                              (this.videoTop = 0),
                              (this.videoStatus = 'pause'),
                              (this.remoteScreenWidth = 0),
                              (this.remoteScreenHeight = 0),
                              (this.remoteScreenLeft = 0),
                              (this.remoteScreenTop = 0),
                              (this.remoteOrientation = 'portrait'),
                              (this.dropMouseEvent = !1),
                              (this.videoOrientation = 0),
                              (this.resizeObserver = null),
                              (this.doubleTap = !1),
                              (this.doubleTapResponse = []),
                              (this.addKMHandlerFlag = !1),
                              (this.clientInteractMode = 'cursor'),
                              window.addEventListener(
                                'online',
                                function (t) {
                                  e.onNetwork(t);
                                },
                                !1,
                              ),
                              window.addEventListener(
                                'offline',
                                function (t) {
                                  e.onNetwork(t);
                                },
                                !1,
                              ),
                              (this.onTouch = this.onTouch.bind(this));
                          }
                          return (
                            (e.prototype.init = function (e) {
                              var t, n, r;
                              (this.tabletMode = e.tabletMode),
                                (this.clickToFullscreen = e.clickToFullscreen),
                                (this.clickBodyToPlay = null === (t = e.clickBodyToPlay) || void 0 === t || t),
                                (this.webDraftLevel =
                                  null !== (n = e.webDraftLevel) && void 0 !== n
                                    ? n
                                    : l.WEB_DRAFT_LEVEL.CLOSE_HIGH_FREQUENCY),
                                (C = null === (r = e.enableEventIntercept) || void 0 === r || r),
                                (this.clientInteractMode = e.clientInteractMode || 'cursor'),
                                (this.enablePaste = e.enablePaste);
                            }),
                            (e.prototype.addEventHandler = function () {
                              var e = this;
                              this.addKMHandler(),
                                this.addTouchHandler(),
                                (0, p.isMobile)() || m.default.addGamepadHandler(),
                                document.body.addEventListener(
                                  'click',
                                  function () {
                                    e.onBodyClick();
                                  },
                                  !1,
                                ),
                                (0, p.getVideoElement)().addEventListener('playing', function (t) {
                                  S('playing', t.type), (e.videoStatus = 'playing');
                                }),
                                (0, p.getVideoElement)().addEventListener('ended', function (t) {
                                  S('ended', t.type), (e.videoStatus = 'pause');
                                }),
                                (0, p.getVideoElement)().addEventListener('pause', function (t) {
                                  S('pause', t.type), (e.videoStatus = 'pause');
                                }),
                                (0, p.getVideoElement)().addEventListener('click', function () {
                                  (0, p.getVideoElement)().focus();
                                }),
                                window.addEventListener('orientationchange', function () {
                                  S('orientationchange'),
                                    setTimeout(function () {
                                      e.reshapeWindow();
                                    }, 0);
                                }),
                                window.addEventListener('resize', function (t) {
                                  S('onresize', t),
                                    setTimeout(function () {
                                      e.reshapeWindow();
                                    }, 0);
                                }),
                                this.fullscreenChange(),
                                f.default.sendKmData({ type: 'mousedeltamove', x: 1, y: 1 });
                            }),
                            (e.prototype.initOrientationDetector = function () {
                              this.addOrientationDetector();
                            }),
                            (e.prototype.setTabletMode = function (e) {
                              this.tabletMode = e;
                            }),
                            (e.prototype.setMoveSensitivity = function (e) {
                              this.moveSensitivity = 1 / e;
                            }),
                            (e.prototype.getMoveSensitivity = function () {
                              return this.moveSensitivity;
                            }),
                            (e.prototype.remoteScreenResolutionChange = function (e) {
                              var t = e.width,
                                n = e.height,
                                r = e.left,
                                o = e.top;
                              (this.remoteScreenWidth === t &&
                                this.remoteScreenHeight === n &&
                                this.remoteScreenLeft === r &&
                                this.remoteScreenTop === o) ||
                                ((this.remoteScreenWidth = t),
                                (this.remoteScreenHeight = n),
                                (this.remoteScreenLeft = r),
                                (this.remoteScreenTop = o),
                                S(
                                  'remoteScreenResolutionChange->'
                                    .concat(t, ' ')
                                    .concat(n, ' ')
                                    .concat(r, ' ')
                                    .concat(o, ' '),
                                ));
                            }),
                            (e.prototype.getRemoteOrientation = function () {
                              return this.remoteOrientation;
                            }),
                            (e.prototype.setRemoteOrientation = function (e) {
                              this.remoteOrientation = e;
                            }),
                            (e.prototype.clearRemoteKeys = function () {
                              f.default.sendAckData({ data: { type: 'keys_clean' }, retry: 5, interval: 2e3 });
                            }),
                            (e.prototype.transferLocalScale = function (e) {
                              var t = e.width,
                                n = void 0 === t ? 1 : t,
                                r = e.height,
                                o = void 0 === r ? 1 : r,
                                i = (this.videoWidth / this.remoteScreenWidth) * n,
                                a = (this.videoHeight / this.remoteScreenHeight) * o;
                              return (
                                90 === this.videoOrientation &&
                                  ((i = (this.videoHeight / this.remoteScreenWidth) * o),
                                  (a = (this.videoWidth / this.remoteScreenHeight) * n)),
                                { width: i, height: a }
                              );
                            }),
                            (e.prototype.mouseMove = function (e, t, n, r) {
                              var o,
                                i,
                                a = f.default.getDisplayRect(),
                                s = a.left,
                                c = a.top,
                                u = a.width,
                                l = a.height;
                              if (
                                (this.tabletMode
                                  ? (this.tabletModeLastPosition || (this.tabletModeLastPosition = { x: n, y: r }),
                                    (this.mousePosition.x = this.mousePosition.x + (n - this.tabletModeLastPosition.x)),
                                    (this.mousePosition.y = this.mousePosition.y + (r - this.tabletModeLastPosition.y)),
                                    this.mousePosition.x <= s && (this.mousePosition.x = s),
                                    this.mousePosition.x >= u + s && (this.mousePosition.x = u + s),
                                    this.mousePosition.y <= c && (this.mousePosition.y = c),
                                    this.mousePosition.y >= l + c && (this.mousePosition.y = l + c),
                                    (this.tabletModeLastPosition = { x: n, y: r }))
                                  : (this.mousePosition = {
                                      x: n,
                                      y: r,
                                      movementX: n - this.mousePosition.x,
                                      movementY: r - this.mousePosition.y,
                                    }),
                                90 === this.videoOrientation
                                  ? ((o = this.mousePosition.y - c), (i = this.videoWidth - this.mousePosition.x + s))
                                  : ((o = this.mousePosition.x - s), (i = this.mousePosition.y - c)),
                                this.updateCursorPosition({ displayX: o, displayY: i }),
                                'touchstart' === t)
                              )
                                if (f.default.getCursorShowStatus()) {
                                  var d = this.moveTo(o, i),
                                    p = d.remoteX,
                                    h = d.remoteY;
                                  this.enableMousemoveV2
                                    ? f.default.sendKmData({ type: 'mousemove_v2', x: p, y: h })
                                    : f.default.sendKmData({ type: 'mousemove', x: p, y: h });
                                } else S('cursor is not showing, cursor will not move');
                              if ('touchmove' === t)
                                if (f.default.getCursorShowStatus()) {
                                  var v = this.moveTo(o, i);
                                  (p = v.remoteX),
                                    (h = v.remoteY),
                                    this.enableMousemoveV2
                                      ? f.default.sendKmData({ type: 'mousemove_v2', x: p, y: h })
                                      : f.default.sendKmData({ type: 'mousemove', x: p, y: h });
                                } else {
                                  var m = this.deltaMoveTo(this.mousePosition.movementX, this.mousePosition.movementY),
                                    y = m.remoteDeltaX,
                                    g = m.remoteDeltaY;
                                  90 === this.videoOrientation
                                    ? f.default.sendKmData({ type: 'mousedeltamove', x: g, y })
                                    : f.default.sendKmData({ type: 'mousedeltamove', x: y, y: g });
                                }
                              ('touchend' !== t && 'touchcancel' !== t) || (this.tabletModeLastPosition = null);
                            }),
                            (e.prototype.mobileTouchMove = function (e) {
                              var t = e.finger_id,
                                n = e.event_type,
                                r = e.x,
                                o = e.y,
                                i = e.width,
                                a = e.height,
                                s = e.timestamp;
                              f.default.sendKmData({
                                type: 'event_touch',
                                finger_id: t,
                                event_type: n,
                                x: r,
                                y: o,
                                width: i,
                                height: a,
                                timestamp: s,
                              });
                            }),
                            (e.prototype.fullscreen = function (e) {
                              var t;
                              void 0 === e && (e = document.documentElement),
                                S('enter fullscreen'),
                                g.default.requestFullscreen
                                  ? e[g.default.requestFullscreen]()
                                  : e.webkitEnterFullScreen();
                              try {
                                null ===
                                  (t = null === navigator || void 0 === navigator ? void 0 : navigator.keyboard) ||
                                  void 0 === t ||
                                  t.lock(['Escape', 'F11']);
                              } catch (e) {
                                S('lockKeyboard', e);
                              }
                            }),
                            (e.prototype.exitFullscreen = function (e) {
                              var t, n;
                              return (
                                void 0 === e && (e = document.documentElement),
                                o(this, void 0, void 0, function () {
                                  return i(this, function (r) {
                                    return (
                                      S('exit fullscreen'),
                                      g.default.exitFullscreen
                                        ? null ===
                                            (n =
                                              null === (t = document[g.default.exitFullscreen]()) || void 0 === t
                                                ? void 0
                                                : t.catch) ||
                                          void 0 === n ||
                                          n.call(t, function (e) {
                                            return console.log(
                                              'exit full screen failed, ',
                                              null == e ? void 0 : e.message,
                                            );
                                          })
                                        : e.webkitExitFullScreen(),
                                      [2]
                                    );
                                  });
                                })
                              );
                            }),
                            (e.prototype.resetLastPosition = function (e) {
                              var t = e.x,
                                n = void 0 === t ? 0 : t,
                                r = e.y,
                                o = void 0 === r ? 0 : r;
                              (this.mousePosition.x = n), (this.mousePosition.y = o);
                            }),
                            (e.prototype.updateCursorPosition = function (e) {
                              var t = e.displayX,
                                n = e.displayY,
                                r = (0, p.getCursorElement)();
                              90 === this.videoOrientation
                                ? (t > this.videoHeight && (t = this.videoHeight),
                                  n > this.videoWidth && (n = this.videoWidth))
                                : (t > this.videoWidth && (t = this.videoWidth),
                                  n > this.videoHeight && (n = this.videoHeight)),
                                t < 0 && (t = 0),
                                n < 0 && (n = 0),
                                r &&
                                  ((r.style.top = ''.concat(
                                    n + (90 === this.videoOrientation ? this.videoLeft : this.videoTop),
                                    'px',
                                  )),
                                  (r.style.left = ''.concat(
                                    t + (90 === this.videoOrientation ? this.videoTop : this.videoLeft),
                                    'px',
                                  )),
                                  (r.style.zIndex = '100'));
                            }),
                            (e.prototype.setDropMouseEvent = function (e) {
                              this.dropMouseEvent = e;
                            }),
                            (e.prototype.setWebDraftLevel = function (e) {
                              void 0 === e && (e = 0), (this.webDraftLevel = e);
                            }),
                            (e.prototype.setEnableEventIntercept = function (e) {
                              void 0 === e && (e = !0), (C = e);
                            }),
                            (e.prototype.setVideoOrientation = function (e) {
                              var t = e.deg,
                                n = void 0 === t ? 0 : t,
                                r = e.rotateContainer,
                                o = void 0 === r || r,
                                i = e.rotateMountPoint,
                                a = void 0 !== i && i;
                              if (
                                (S('setVideoOrientation', n, o, a),
                                (this.videoOrientation = n),
                                (0, p.dispatchEvent)({
                                  name: 'TCGSDK:VideoOrientation',
                                  data: { deg: n, rotateContainer: o, rotateMountPoint: a },
                                }),
                                o || a)
                              ) {
                                var s = document.querySelector('html');
                                a &&
                                  (s =
                                    u.default.getIsMobileGame() && !(0, p.isMobile)()
                                      ? (0, p.getCloudGamingContainerElement)()
                                      : (0, p.getGameMountPointElement)()),
                                  s
                                    ? (90 === n && (s.className = ''.concat(s.className, ' rotate-html-90')),
                                      270 === n && (s.className = ''.concat(s.className, ' rotate-html-270')),
                                      0 === n
                                        ? (o && ((s.className = ''), (s.style.width = null), (s.style.height = null)),
                                          a &&
                                            ((s.className = s.className
                                              .split(' rotate-html-'.concat(u.default.getIsMobileGame() ? '270' : '90'))
                                              .join('')),
                                            (s.style.width = '100%'),
                                            (s.style.height = '100%')))
                                        : setTimeout(function () {
                                            (s.style.width = ''.concat(window.innerHeight, 'px')),
                                              (s.style.height = ''.concat(window.innerWidth, 'px'));
                                          }, 100))
                                    : S('setVideoOrientation -> can not find mount point');
                              }
                            }),
                            (e.prototype.reshapeWindow = function () {
                              var e = this,
                                t = (0, p.getVideoElement)();
                              if (t) {
                                var n = (0, p.getCloudGamingContainerElement)(),
                                  r = u.default.getInitOptions().fullVideoToScreen,
                                  o = void 0 === r || r;
                                n.clientWidth > t.videoWidth &&
                                  n.clientHeight > t.videoHeight &&
                                  o &&
                                  (n.clientWidth / n.clientHeight > t.videoWidth / t.videoHeight
                                    ? ((t.style.height = '100%'), (t.style.width = null))
                                    : ((t.style.width = '100%'), (t.style.height = null))),
                                  (n.clientWidth < t.videoWidth || n.clientHeight < t.videoHeight) &&
                                    ((t.style.width = null), (t.style.height = null));
                                var i = function () {
                                  var n = t.getBoundingClientRect(),
                                    r = n.width,
                                    o = n.height,
                                    i = n.top,
                                    a = n.left;
                                  (e.videoWidth = r),
                                    (e.videoHeight = o),
                                    (e.videoLeft = a),
                                    (e.videoTop = i),
                                    S(
                                      'videoResolutionChange-> width: '
                                        .concat(e.videoWidth, ', height: ')
                                        .concat(e.videoHeight, ', left: ')
                                        .concat(e.videoLeft, ', top: ')
                                        .concat(e.videoTop),
                                    );
                                };
                                i(),
                                  this.resizeObserver ||
                                    ((this.resizeObserver = new y.default(function () {
                                      i();
                                    })),
                                    this.resizeObserver.observe(t));
                              }
                            }),
                            (e.prototype.setKMStatus = function (e) {
                              var t = e.keyboard,
                                n = void 0 === t || t,
                                r = e.mouse,
                                o = void 0 === r || r;
                              this.kmStatus = { keyboard: n, mouse: o };
                            }),
                            (e.prototype.setPaste = function (e) {
                              this.enablePaste = e;
                            }),
                            (e.prototype.setVideoMuted = function (e) {
                              this.mutedVideo = e;
                            }),
                            (e.prototype.setClientInteractMode = function (e) {
                              void 0 === e && (e = 'cursor'), (this.clientInteractMode = e);
                            }),
                            (e.prototype.addKMHandler = function () {
                              var e = this;
                              this.addKMHandlerFlag ||
                                ((this.addKMHandlerFlag = !0),
                                (0, p.isMobile)() ||
                                  (this.webDraftLevel === l.WEB_DRAFT_LEVEL.CLOSE_HIGH_FREQUENCY
                                    ? document.addEventListener(
                                        'mousemove',
                                        function (t) {
                                          e.onMouseMove(t);
                                        },
                                        !1,
                                      )
                                    : document.addEventListener(
                                        'pointermove',
                                        function (t) {
                                          e.onMouseMove(t);
                                        },
                                        !1,
                                      ),
                                  document.addEventListener(
                                    'mousedown',
                                    function (t) {
                                      e.onMouseDown(t);
                                    },
                                    !1,
                                  ),
                                  document.addEventListener(
                                    'mouseup',
                                    function (t) {
                                      e.onMouseUp(t);
                                    },
                                    !1,
                                  )),
                                document.addEventListener(
                                  'wheel',
                                  function (t) {
                                    e.onWheel(t);
                                  },
                                  !1,
                                ),
                                document.addEventListener(
                                  'keydown',
                                  function (t) {
                                    e.onKeyEvent(t);
                                  },
                                  !1,
                                ),
                                document.addEventListener(
                                  'keyup',
                                  function (t) {
                                    e.onKeyEvent(t);
                                  },
                                  !1,
                                ),
                                document.addEventListener(
                                  'keypress',
                                  function () {
                                    e.onKeyPress();
                                  },
                                  !1,
                                ),
                                document.addEventListener(
                                  'contextmenu',
                                  function (t) {
                                    e.onContextMenu(t);
                                  },
                                  !1,
                                ),
                                document.addEventListener(
                                  'fullscreenchange',
                                  function () {
                                    e.fullscreenChange();
                                  },
                                  !1,
                                ),
                                window.addEventListener(
                                  'visibilitychange',
                                  function () {
                                    e.visibilityChange();
                                  },
                                  !1,
                                ),
                                window.addEventListener(
                                  'focus',
                                  function () {
                                    e.focusChange();
                                  },
                                  !1,
                                ),
                                window.addEventListener(
                                  'blur',
                                  function () {
                                    e.focusChange();
                                  },
                                  !1,
                                ),
                                document.addEventListener('pointerlockchange', function () {
                                  e.pointerlockchange();
                                }),
                                document.addEventListener('paste', function (t) {
                                  e.onPaste(t);
                                }));
                            }),
                            (e.prototype.addTouchHandler = function () {
                              var e = (0, p.getCloudGamingContainerElement)();
                              e.removeEventListener('touchmove', this.onTouch, !1),
                                e.removeEventListener('touchstart', this.onTouch, !1),
                                e.removeEventListener('touchend', this.onTouch, !1),
                                e.removeEventListener('touchcancel', this.onTouch, !1),
                                e.addEventListener('touchmove', this.onTouch, !1),
                                e.addEventListener('touchstart', this.onTouch, !1),
                                e.addEventListener('touchend', this.onTouch, !1),
                                e.addEventListener('touchcancel', this.onTouch, !1),
                                document.addEventListener('gesturestart', function (e) {
                                  e.preventDefault();
                                });
                            }),
                            (e.prototype.fullscreenChange = function () {
                              if ((0, p.isFullScreen)()) {
                                S('enter fullscreenChange');
                                try {
                                  (0, p.getVideoElement)().focus();
                                } catch (e) {
                                  S('fullscreenChange error,', e);
                                }
                              }
                              this.reshapeWindow();
                            }),
                            (e.prototype.addOrientationDetector = function () {
                              var e = this,
                                t = u.default.getInitOptions(),
                                n = t.autoRotateContainer,
                                r = t.autoRotateMountPoint,
                                o = window.matchMedia('(orientation: portrait)'),
                                i = function (t) {
                                  t.matches
                                    ? (u.default.onOrientationChange({ type: 'portrait' }),
                                      (n || r) &&
                                        e.setVideoOrientation({
                                          deg: u.default.getIsMobileGame() ? 0 : 90,
                                          rotateContainer: n,
                                          rotateMountPoint: r,
                                        }))
                                    : (u.default.onOrientationChange({ type: 'landscape' }),
                                      (n || r) &&
                                        e.setVideoOrientation({
                                          deg: u.default.getIsMobileGame() ? 270 : 0,
                                          rotateContainer: n,
                                          rotateMountPoint: r,
                                        }));
                                };
                              i(o), o.addListener(i);
                            }),
                            (e.prototype.visibilityChange = function () {
                              return this.clearRemoteKeys(), document.hidden;
                            }),
                            (e.prototype.onNetwork = function (e) {
                              S('onNetwork', e.type), u.default.onNetworkChange({ status: e.type });
                            }),
                            (e.prototype.focusChange = function () {
                              this.clearRemoteKeys();
                            }),
                            (e.prototype.pointerlockchange = function () {}),
                            (e.prototype.onPaste = function (e) {
                              console.log('onPaste', e, e.clipboardData.getData('text/plain'));
                            }),
                            (e.prototype.onContextMenu = function (e) {
                              e.preventDefault();
                            }),
                            (e.prototype.transferRemotePosition = function (e) {
                              var t = e.displayX,
                                n = void 0 === t ? 1 : t,
                                r = e.displayY,
                                o = void 0 === r ? 1 : r,
                                i = e.moveSensitivity,
                                a = void 0 === i ? 1 : i,
                                s =
                                  Math.round((n * this.remoteScreenWidth) / this.videoWidth / a) +
                                  this.remoteScreenLeft,
                                c =
                                  Math.round((o * this.remoteScreenHeight) / this.videoHeight / a) +
                                  this.remoteScreenTop;
                              return (
                                (90 !== this.videoOrientation && 270 !== this.videoOrientation) ||
                                  ((s =
                                    Math.round((n * this.remoteScreenWidth) / this.videoHeight / a) +
                                    this.remoteScreenLeft),
                                  (c =
                                    Math.round((o * this.remoteScreenHeight) / this.videoWidth / a) +
                                    this.remoteScreenTop)),
                                { x: s, y: c }
                              );
                            }),
                            (e.prototype.transferRemotePositionV2 = function (e) {
                              var t = e.displayX,
                                n = void 0 === t ? 1 : t,
                                r = e.displayY,
                                o = void 0 === r ? 1 : r,
                                i = e.moveSensitivity,
                                a = void 0 === i ? 1 : i,
                                s = n / this.videoWidth / a,
                                c = o / this.videoHeight / a;
                              return (
                                (90 !== this.videoOrientation && 270 !== this.videoOrientation) ||
                                  ((s = n / this.videoHeight / a), (c = o / this.videoWidth / a)),
                                { x: Math.round(8192 * s), y: Math.round(8192 * c) }
                              );
                            }),
                            Object.defineProperty(e.prototype, 'touchesList', {
                              get: function () {
                                var e,
                                  t,
                                  n = [];
                                if (this.touchesMap.size)
                                  try {
                                    for (var r = a(this.touchesMap.values()), o = r.next(); !o.done; o = r.next()) {
                                      var i = o.value;
                                      n.push(i);
                                    }
                                  } catch (t) {
                                    e = { error: t };
                                  } finally {
                                    try {
                                      o && !o.done && (t = r.return) && t.call(r);
                                    } finally {
                                      if (e) throw e.error;
                                    }
                                  }
                                return n;
                              },
                              enumerable: !1,
                              configurable: !0,
                            }),
                            (e.prototype.onTouch = function (e) {
                              var t,
                                n,
                                r = this,
                                o = e.type,
                                i = e.timeStamp,
                                s = e.targetTouches,
                                c = e.changedTouches,
                                d = function (e) {
                                  var t = e.pageX,
                                    n = e.pageY,
                                    a = e.identifier,
                                    s = p.transferRemotePosition({
                                      displayX: t - p.videoLeft,
                                      displayY: n - p.videoTop,
                                    }),
                                    c = s.x,
                                    d = s.y;
                                  (c -= p.remoteScreenLeft), (d -= p.remoteScreenTop);
                                  var h = p.touchesForDelta || { lastX: c, lastY: d },
                                    v = (c - h.lastX) / p.moveSensitivity,
                                    m = (d - h.lastY) / p.moveSensitivity;
                                  if (
                                    ((p.touchesForDelta = { lastX: c, lastY: d }),
                                    'touchstart' === o && p.touchesIdentifierMap.set(a, p.touchesIdentifierMap.size),
                                    f.default.getIsMobileGame() || 'touch' === p.clientInteractMode)
                                  ) {
                                    var y = o;
                                    if (270 === p.videoOrientation) {
                                      var g = p.transferRemotePosition({
                                          displayX: p.videoHeight - n + p.videoTop,
                                          displayY: t - p.videoLeft,
                                        }),
                                        b = g.x,
                                        S = g.y;
                                      (c = b - p.remoteScreenLeft), (d = S - p.remoteScreenTop);
                                    }
                                    if (90 === p.videoOrientation) {
                                      var C = p.transferRemotePosition({
                                        displayX: n - p.videoTop,
                                        displayY: p.videoWidth - t + p.videoLeft,
                                      });
                                      (b = C.x), (S = C.y), (c = b - p.remoteScreenLeft), (d = S - p.remoteScreenTop);
                                    }
                                    if (
                                      ('touch' === p.clientInteractMode &&
                                        (c > p.remoteScreenWidth && (c = p.remoteScreenWidth),
                                        d > p.remoteScreenHeight && (d = p.remoteScreenHeight),
                                        c < 0 && (c = 0),
                                        d < 0 && (d = 0)),
                                      p.mobileTouchMove({
                                        finger_id: p.touchesIdentifierMap.get(a),
                                        event_type: l.TOUCH_EVENT_TYPE[y],
                                        x: c,
                                        y: d,
                                        width: p.remoteScreenWidth,
                                        height: p.remoteScreenHeight,
                                        timestamp: i,
                                      }),
                                      'touch' === p.clientInteractMode)
                                    ) {
                                      var w = void 0,
                                        E = void 0;
                                      90 === p.videoOrientation
                                        ? ((w = n - p.videoTop), (E = p.videoWidth - t + p.videoLeft))
                                        : ((w = t - p.videoLeft), (E = n - p.videoTop)),
                                        p.updateCursorPosition({ displayX: w, displayY: E });
                                    }
                                  }
                                  var _ = {
                                    id: a,
                                    type: o,
                                    x: c,
                                    y: d,
                                    pageX: t,
                                    pageY: n,
                                    movementX: v,
                                    movementY: m,
                                  };
                                  p.touchesMap.set(a, _),
                                    ('touchend' !== o && 'touchcancel' !== o) ||
                                      (p.touchesIdentifierMap.delete(a),
                                      setTimeout(function () {
                                        r.touchesMap.delete(a);
                                      }, 100)),
                                    'touchstart' !== o ||
                                      f.default.getIsMobileGame() ||
                                      (p.doubleTapResponse.push(_),
                                      p.doubleTap
                                        ? u.default.onDoubleTap(p.doubleTapResponse)
                                        : ((p.doubleTap = !0),
                                          setTimeout(function () {
                                            (r.doubleTap = !1), (r.doubleTapResponse = []);
                                          }, 300)));
                                },
                                p = this;
                              try {
                                for (
                                  var h = a(
                                      'touchend' === o ||
                                        f.default.getIsMobileGame() ||
                                        'touch' === this.clientInteractMode
                                        ? c
                                        : s,
                                    ),
                                    v = h.next();
                                  !v.done;
                                  v = h.next()
                                )
                                  d(v.value);
                              } catch (e) {
                                t = { error: e };
                              } finally {
                                try {
                                  v && !v.done && (n = h.return) && n.call(h);
                                } finally {
                                  if (t) throw t.error;
                                }
                              }
                              f.default.getIsMobileGame() ||
                                'touch' === this.clientInteractMode ||
                                u.default.onTouchEvent(this.touchesList);
                            }),
                            (e.prototype.onMouseMove = function (e) {
                              var t, n;
                              if (!1 !== this.kmStatus.mouse && !this.dropMouseEvent) {
                                var r = 'getCoalescedEvents' in e ? e.getCoalescedEvents() : [e],
                                  o = null;
                                this.webDraftLevel === l.WEB_DRAFT_LEVEL.UNPACKAGE_SEND && r.length > 3
                                  ? (S(
                                      'webDraftLevel 1 and events length is '.concat(r.length, ', only pick 3 events'),
                                    ),
                                    r.splice(0, r.length - 3))
                                  : this.webDraftLevel === l.WEB_DRAFT_LEVEL.PACKAGE_SEND &&
                                    (S(
                                      'webDraftLevel 2 and events length is '.concat(
                                        r.length,
                                        ', will send seq events',
                                      ),
                                    ),
                                    (o = []));
                                try {
                                  for (var i = a(r), s = i.next(); !s.done; s = i.next()) {
                                    var c = s.value,
                                      u = c.offsetX,
                                      d = c.offsetY,
                                      p = c.movementX,
                                      h = c.movementY,
                                      v = u,
                                      m = d;
                                    if (
                                      (v < 0 && (v = 0),
                                      m < 0 && (m = 0),
                                      f.default.mouseDeltaMove() || !f.default.getCursorShowStatus())
                                    ) {
                                      var y = this.deltaMoveTo(p, h),
                                        g = y.remoteDeltaX,
                                        b = y.remoteDeltaY;
                                      o
                                        ? o.push({ type: 'mousedeltamove', x: g, y: b })
                                        : f.default.sendKmData({ type: 'mousedeltamove', x: g, y: b });
                                    } else {
                                      var C = this.moveTo(v, m),
                                        w = C.remoteX,
                                        E = C.remoteY;
                                      o
                                        ? o.push({ type: 'mousemove', x: w, y: E })
                                        : (this.enableMousemoveV2
                                            ? f.default.sendKmData({ type: 'mousemove_v2', x: w, y: E })
                                            : f.default.sendKmData({ type: 'mousemove', x: w, y: E }),
                                          f.default.getIsMobileGame() &&
                                            (this.mobileTouchMove({
                                              finger_id: 1,
                                              event_type: l.TOUCH_EVENT_TYPE.touchmove,
                                              x: w,
                                              y: E,
                                              width: this.remoteScreenWidth,
                                              height: this.remoteScreenHeight,
                                              timestamp: +new Date(),
                                            }),
                                            (this.mousePosition.remoteX = w),
                                            (this.mousePosition.remoteY = E)));
                                    }
                                    (this.mousePosition.x = v), (this.mousePosition.y = m);
                                  }
                                } catch (e) {
                                  t = { error: e };
                                } finally {
                                  try {
                                    s && !s.done && (n = i.return) && n.call(i);
                                  } finally {
                                    if (t) throw t.error;
                                  }
                                }
                                this.webDraftLevel === l.WEB_DRAFT_LEVEL.PACKAGE_SEND &&
                                  f.default.sendKmData({
                                    type: 'key_seq',
                                    keys: o.map(function (e) {
                                      return JSON.stringify(e);
                                    }),
                                  });
                              }
                            }),
                            (e.prototype.moveTo = function (e, t) {
                              if (this.enableMousemoveV2) {
                                var n = this.transferRemotePositionV2({ displayX: e, displayY: t });
                                return { remoteX: n.x, remoteY: n.y };
                              }
                              var r = this.transferRemotePosition({ displayX: e, displayY: t }),
                                o = r.x,
                                i = r.y;
                              return (
                                o >= this.remoteScreenWidth + this.remoteScreenLeft &&
                                  (o = this.remoteScreenWidth + this.remoteScreenLeft - 1),
                                o < 0 && (o = 0),
                                i >= this.remoteScreenHeight + this.remoteScreenTop &&
                                  (i = this.remoteScreenHeight + this.remoteScreenTop - 1),
                                i < 0 && (i = 0),
                                { remoteX: o, remoteY: i }
                              );
                            }),
                            (e.prototype.deltaMoveTo = function (e, t) {
                              var n,
                                r,
                                o = this.transferRemotePosition({
                                  displayX: e,
                                  displayY: t,
                                  moveSensitivity: this.moveSensitivity,
                                }),
                                i = o.x,
                                a = o.y,
                                s = null !== (n = i - this.remoteScreenLeft) && void 0 !== n ? n : 0,
                                c = null !== (r = a - this.remoteScreenTop) && void 0 !== r ? r : 0;
                              return (
                                (this.deltaMoveToCalcX += s),
                                (this.deltaMoveToCalcY += c),
                                this.deltaMoveToCalcX < 0 && (this.deltaMoveToCalcX = 0),
                                this.deltaMoveToCalcY < 0 && (this.deltaMoveToCalcY = 0),
                                this.deltaMoveToCalcX > this.remoteScreenWidth &&
                                  (this.deltaMoveToCalcX = this.remoteScreenWidth),
                                this.deltaMoveToCalcY > this.remoteScreenHeight &&
                                  (this.deltaMoveToCalcX = this.remoteScreenHeight),
                                { remoteDeltaX: s, remoteDeltaY: c }
                              );
                            }),
                            (e.prototype.isRightClick = function (e) {
                              return 'which' in e ? 3 === e.which : 'button' in e ? 2 === e.button : void 0;
                            }),
                            (e.prototype.determineButtonType = function (e) {
                              var t;
                              return null !==
                                (t = [
                                  'mouseleft',
                                  'mousemiddle',
                                  'mouseright',
                                  'mousebackward',
                                  'mouseforward',
                                  'unused',
                                  'unused',
                                ][e.button]) && void 0 !== t
                                ? t
                                : '';
                            }),
                            (e.prototype.onMouseDown = function (e) {
                              if (!1 !== this.kmStatus.mouse) {
                                if (f.default.getIsMobileGame()) {
                                  var t = this.mousePosition,
                                    n = t.remoteX,
                                    r = t.remoteY;
                                  this.mobileTouchMove({
                                    finger_id: 1,
                                    event_type: l.TOUCH_EVENT_TYPE.touchstart,
                                    x: n,
                                    y: r,
                                    width: this.remoteScreenWidth,
                                    height: this.remoteScreenHeight,
                                    timestamp: +new Date(),
                                  });
                                } else
                                  f.default.sendKmData({ type: this.determineButtonType(e), down: !0 }),
                                    this.isRightClick(e) && this.tryToCursorLock();
                                (3 !== e.button && 4 !== e.button) || e.preventDefault();
                              }
                            }),
                            (e.prototype.onMouseUp = function (e) {
                              if (!1 !== this.kmStatus.mouse)
                                if (f.default.getIsMobileGame()) {
                                  var t = this.mousePosition,
                                    n = t.remoteX,
                                    r = t.remoteY;
                                  this.mobileTouchMove({
                                    finger_id: 1,
                                    event_type: l.TOUCH_EVENT_TYPE.touchend,
                                    x: n,
                                    y: r,
                                    width: this.remoteScreenWidth,
                                    height: this.remoteScreenHeight,
                                    timestamp: +new Date(),
                                  });
                                } else f.default.sendKmData({ type: this.determineButtonType(e), down: !1 });
                            }),
                            (e.prototype.onWheel = function (e) {
                              f.default.sendKmData({ type: 'mousescroll', delta: e.deltaY });
                            }),
                            (e.prototype.onKeyEvent = function (e) {
                              var t;
                              if ((e.preventDefault(), !1 !== this.kmStatus.keyboard)) {
                                var n = e.which || e.keyCode,
                                  r = e.ctrlKey,
                                  o = e.altKey,
                                  i = e.type,
                                  a = e.metaKey;
                                if ('keyup' === i) {
                                  if (r) {
                                    if (n === h.KEYCODE.Space)
                                      return (
                                        f.default.sendKmData({ type: 'keyboard', key: n, down: !0 }),
                                        void setTimeout(function () {
                                          f.default.sendKmData({ type: 'keyboard', key: n, down: !1 });
                                        }, 10)
                                      );
                                    n === h.KEYCODE.Backquote && f.default.toggleStatisticsView();
                                  }
                                  n === h.KEYCODE.Escape &&
                                    (+new Date() - this.escPressTime > 300 && f.default.lockMouse(!1),
                                    (this.escPressTime = null));
                                }
                                if ('keydown' === i) {
                                  if (
                                    ((n === h.KEYCODE.X && o) || n === h.KEYCODE.Escape
                                      ? (n === h.KEYCODE.X && o && f.default.lockMouse(!1),
                                        n === h.KEYCODE.Escape &&
                                          (this.escPressTime || (this.escPressTime = +new Date())))
                                      : this.tryToCursorLock(),
                                    this.enablePaste && (a || r) && n === h.KEYCODE.V)
                                  )
                                    return void navigator.clipboard
                                      .readText()
                                      .then(function (e) {
                                        u.default.sendText(e);
                                      })
                                      .catch(function (e) {
                                        S('Failed to read clipboard contents: ', e);
                                      });
                                  if (o && n === h.KEYCODE.F4) return void S('alt + f4 is forbidden');
                                }
                                if (
                                  (null === (t = b.default.ua) || void 0 === t ? void 0 : t.includes('Mac')) &&
                                  n === h.KEYCODE.CapsLock
                                )
                                  return (
                                    f.default.sendKmData({ type: 'keyboard', key: n, down: !0 }),
                                    void setTimeout(function () {
                                      f.default.sendKmData({ type: 'keyboard', key: n, down: !1 });
                                    }, 10)
                                  );
                                f.default.sendKmData({ type: 'keyboard', key: n, down: 'keydown' === i });
                              }
                            }),
                            (e.prototype.onKeyPress = function () {}),
                            (e.prototype.onBodyClick = function () {
                              if (this.clickBodyToPlay) {
                                var e = (0, p.getVideoElement)();
                                if (e) {
                                  this.mutedVideo || (e.muted = !1);
                                  try {
                                    'pause' === this.videoStatus && e.pause(), e.play();
                                  } catch (e) {
                                    S('play video error', e);
                                  }
                                }
                                (0, p.isMobile)() ||
                                  (0, p.isFullScreen)() ||
                                  !this.clickToFullscreen ||
                                  (S('click to fullscreen->', this.clickToFullscreen), this.fullscreen());
                              }
                            }),
                            (e.prototype.tryToCursorLock = function () {
                              if (!f.default.getForceShowCursor()) {
                                var e = document.pointerLockElement;
                                e ||
                                  (f.default.getCursorShowStatus() && !f.default.mouseDeltaMove()) ||
                                  (f.default.lockMouse(!0),
                                  S('tryToCursorLock', e, 'forceShowCursor', f.default.getForceShowCursor()),
                                  S('toggleMouseLock true, auto run requestPointerLock'));
                              }
                            }),
                            r([(0, d.interceptUserEvent)(C)], e.prototype, 'onTouch', null),
                            r([(0, d.interceptUserEvent)(C)], e.prototype, 'onMouseMove', null),
                            r([(0, d.interceptUserEvent)(C)], e.prototype, 'onMouseDown', null),
                            r([(0, d.interceptUserEvent)(C)], e.prototype, 'onMouseUp', null),
                            r([(0, d.interceptUserEvent)(C)], e.prototype, 'onWheel', null),
                            r([(0, d.interceptUserEvent)(C)], e.prototype, 'onKeyEvent', null),
                            e
                          );
                        })())();
                      (window.PageEvent = w), (t.default = w);
                    },
                    9531: function (e, t, n) {
                      'use strict';
                      var r =
                          (this && this.__awaiter) ||
                          function (e, t, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                              function a(e) {
                                try {
                                  c(r.next(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function s(e) {
                                try {
                                  c(r.throw(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function c(e) {
                                var t;
                                e.done
                                  ? o(e.value)
                                  : ((t = e.value),
                                    t instanceof n
                                      ? t
                                      : new n(function (e) {
                                          e(t);
                                        })).then(a, s);
                              }
                              c((r = r.apply(e, t || [])).next());
                            });
                          },
                        o =
                          (this && this.__generator) ||
                          function (e, t) {
                            var n,
                              r,
                              o,
                              i,
                              a = {
                                label: 0,
                                sent: function () {
                                  if (1 & o[0]) throw o[1];
                                  return o[1];
                                },
                                trys: [],
                                ops: [],
                              };
                            return (
                              (i = { next: s(0), throw: s(1), return: s(2) }),
                              'function' == typeof Symbol &&
                                (i[Symbol.iterator] = function () {
                                  return this;
                                }),
                              i
                            );
                            function s(i) {
                              return function (s) {
                                return (function (i) {
                                  if (n) throw new TypeError('Generator is already executing.');
                                  for (; a; )
                                    try {
                                      if (
                                        ((n = 1),
                                        r &&
                                          (o =
                                            2 & i[0]
                                              ? r.return
                                              : i[0]
                                              ? r.throw || ((o = r.return) && o.call(r), 0)
                                              : r.next) &&
                                          !(o = o.call(r, i[1])).done)
                                      )
                                        return o;
                                      switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                                        case 0:
                                        case 1:
                                          o = i;
                                          break;
                                        case 4:
                                          return a.label++, { value: i[1], done: !1 };
                                        case 5:
                                          a.label++, (r = i[1]), (i = [0]);
                                          continue;
                                        case 7:
                                          (i = a.ops.pop()), a.trys.pop();
                                          continue;
                                        default:
                                          if (
                                            !(
                                              (o = (o = a.trys).length > 0 && o[o.length - 1]) ||
                                              (6 !== i[0] && 2 !== i[0])
                                            )
                                          ) {
                                            a = 0;
                                            continue;
                                          }
                                          if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                                            a.label = i[1];
                                            break;
                                          }
                                          if (6 === i[0] && a.label < o[1]) {
                                            (a.label = o[1]), (o = i);
                                            break;
                                          }
                                          if (o && a.label < o[2]) {
                                            (a.label = o[2]), a.ops.push(i);
                                            break;
                                          }
                                          o[2] && a.ops.pop(), a.trys.pop();
                                          continue;
                                      }
                                      i = t.call(e, a);
                                    } catch (e) {
                                      (i = [6, e]), (r = 0);
                                    } finally {
                                      n = o = 0;
                                    }
                                  if (5 & i[0]) throw i[1];
                                  return { value: i[0] ? i[1] : void 0, done: !0 };
                                })([i, s]);
                              };
                            }
                          },
                        i =
                          (this && this.__importDefault) ||
                          function (e) {
                            return e && e.__esModule ? e : { default: e };
                          };
                      Object.defineProperty(t, '__esModule', { value: !0 });
                      var a,
                        s = i(n(4993)),
                        c = n(9418),
                        u = i(n(9752)),
                        l = i(n(2179)),
                        d = i(n(5922)),
                        p = n(3578),
                        f = i(n(4206)),
                        h = n(5262),
                        v = d.default.log;
                      !(function (e) {
                        (e[(e.CONNECT = 0)] = 'CONNECT'), (e[(e.FAILED = 1)] = 'FAILED'), (e[(e.RETRY = 2)] = 'RETRY');
                      })(a || (a = {}));
                      var m = (function () {
                        function e() {
                          (this.token = ''), (this.serverIp = ''), (this.tokenExpired = 0);
                        }
                        return (
                          (e.prototype.autoReconnect = function (e) {
                            var t = e.message;
                            return r(this, void 0, void 0, function () {
                              var e,
                                n,
                                r,
                                i,
                                d,
                                m,
                                y,
                                g,
                                b,
                                S,
                                C,
                                w,
                                E,
                                _,
                                T = this;
                              return o(this, function (o) {
                                switch (o.label) {
                                  case 0:
                                    return this.serverIp && this.token
                                      ? (0 === this.tokenExpired && (this.tokenExpired = new Date().getTime() + 51e3),
                                        [4, u.default.newWebRtcConnect()])
                                      : (v(
                                          'Watchdog, autoReconnect, serverIp:'
                                            .concat(this.serverIp, ' or token:')
                                            .concat(this.token, ' is not set, abort'),
                                        ),
                                        [
                                          2,
                                          s.default.onConnectFailed({
                                            code: c.RTC_CODE.CONNECT_FAILED,
                                            msg: 'reconnect failed',
                                          }),
                                        ]);
                                  case 1:
                                    o.sent(),
                                      u.default.startHeartbeatReport(),
                                      (e = u.default.getClientSideDescription()),
                                      (n = l.default.getServerSideDescription()),
                                      (r = n.user_id),
                                      (i = n.server_port),
                                      (d = i || 7392),
                                      (o.label = 2);
                                  case 2:
                                    return (
                                      o.trys.push([2, 4, , 5]),
                                      v('Watchdog, reconnect'),
                                      h.config.lite
                                        ? [2, v('lite sdk can not auto reconnect')]
                                        : [
                                            4,
                                            f.default.post(
                                              'https://cgproxy.cloud-gaming.myqcloud.com/reconnect?host='
                                                .concat(this.serverIp, '&port=')
                                                .concat(d, '&token=')
                                                .concat(this.token, '&uid=')
                                                .concat(r),
                                              p.Base64.decode(e),
                                            ),
                                          ]
                                    );
                                  case 3:
                                    return (
                                      (m = o.sent().data),
                                      (g = (y = void 0 === m ? {} : m).Code),
                                      (b = y.ServerSession),
                                      (S = function () {
                                        +new Date() < T.tokenExpired
                                          ? (setTimeout(function () {
                                              T.autoReconnect({ message: t }),
                                                s.default.onConnectFailed({
                                                  code: c.CONNECT_FAILED_CODE.AUTO_RECONNECTING,
                                                  msg: 'auto connecting',
                                                });
                                            }, 5e3),
                                            v('Watchdog, reconnect proxy failed, try again'))
                                          : ((T.tokenExpired = 0),
                                            u.default.clearPeerConnection(),
                                            s.default.onConnectFailed({
                                              code: c.RTC_CODE.TOKEN_ERROR,
                                              msg: 'reconnect failed',
                                            }),
                                            v('Watchdog, reconnect proxy failed, token was expired, stop retry'));
                                      }),
                                      v('Watchdog, reconnect response code: '.concat(g)),
                                      0 === g
                                        ? ((C = this.checkServerSession(b)),
                                          (w = C.code),
                                          (E = C.status) === a.CONNECT
                                            ? (v('Watchdog, reconnect proxy successful, reset token expired time'),
                                              u.default.connect(p.Base64.encode(b)),
                                              (this.tokenExpired = 0))
                                            : E === a.RETRY
                                            ? S()
                                            : ((this.tokenExpired = 0),
                                              u.default.clearPeerConnection(),
                                              s.default.onConnectFailed({ code: w, msg: 'reconnect failed' }),
                                              v('Watchdog, reconnect proxy failed, token was expired, give up')))
                                        : S(),
                                      [3, 5]
                                    );
                                  case 4:
                                    return (_ = o.sent()), v('Watchdog post error', _), [3, 5];
                                  case 5:
                                    return [2];
                                }
                              });
                            });
                          }),
                          (e.prototype.setReconnectInfo = function (e) {
                            var t = e.serverIp,
                              n = void 0 === t ? '' : t,
                              r = e.token,
                              o = void 0 === r ? '' : r;
                            (this.serverIp = n), (this.token = o);
                          }),
                          (e.prototype.checkServerSession = function (e) {
                            try {
                              var t = JSON.parse(e).code;
                              return (
                                v('Watchdog, server session code: '.concat(t)),
                                this.isProxyError(t) && (t = 100),
                                t === c.ANSWER_SDP_CODE.SUCCESS
                                  ? { code: t, status: a.CONNECT }
                                  : t === c.ANSWER_SDP_CODE.BUSY
                                  ? { code: t, status: a.RETRY }
                                  : { code: t, status: a.FAILED }
                              );
                            } catch (e) {
                              v('Watchdog, parse ServerSession error');
                            }
                          }),
                          (e.prototype.isProxyError = function (e) {
                            return e > 1e3;
                          }),
                          e
                        );
                      })();
                      t.default = new m();
                    },
                    2343: function (e, t, n) {
                      'use strict';
                      var r =
                          (this && this.__awaiter) ||
                          function (e, t, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                              function a(e) {
                                try {
                                  c(r.next(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function s(e) {
                                try {
                                  c(r.throw(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function c(e) {
                                var t;
                                e.done
                                  ? o(e.value)
                                  : ((t = e.value),
                                    t instanceof n
                                      ? t
                                      : new n(function (e) {
                                          e(t);
                                        })).then(a, s);
                              }
                              c((r = r.apply(e, t || [])).next());
                            });
                          },
                        o =
                          (this && this.__generator) ||
                          function (e, t) {
                            var n,
                              r,
                              o,
                              i,
                              a = {
                                label: 0,
                                sent: function () {
                                  if (1 & o[0]) throw o[1];
                                  return o[1];
                                },
                                trys: [],
                                ops: [],
                              };
                            return (
                              (i = { next: s(0), throw: s(1), return: s(2) }),
                              'function' == typeof Symbol &&
                                (i[Symbol.iterator] = function () {
                                  return this;
                                }),
                              i
                            );
                            function s(i) {
                              return function (s) {
                                return (function (i) {
                                  if (n) throw new TypeError('Generator is already executing.');
                                  for (; a; )
                                    try {
                                      if (
                                        ((n = 1),
                                        r &&
                                          (o =
                                            2 & i[0]
                                              ? r.return
                                              : i[0]
                                              ? r.throw || ((o = r.return) && o.call(r), 0)
                                              : r.next) &&
                                          !(o = o.call(r, i[1])).done)
                                      )
                                        return o;
                                      switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                                        case 0:
                                        case 1:
                                          o = i;
                                          break;
                                        case 4:
                                          return a.label++, { value: i[1], done: !1 };
                                        case 5:
                                          a.label++, (r = i[1]), (i = [0]);
                                          continue;
                                        case 7:
                                          (i = a.ops.pop()), a.trys.pop();
                                          continue;
                                        default:
                                          if (
                                            !(
                                              (o = (o = a.trys).length > 0 && o[o.length - 1]) ||
                                              (6 !== i[0] && 2 !== i[0])
                                            )
                                          ) {
                                            a = 0;
                                            continue;
                                          }
                                          if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                                            a.label = i[1];
                                            break;
                                          }
                                          if (6 === i[0] && a.label < o[1]) {
                                            (a.label = o[1]), (o = i);
                                            break;
                                          }
                                          if (o && a.label < o[2]) {
                                            (a.label = o[2]), a.ops.push(i);
                                            break;
                                          }
                                          o[2] && a.ops.pop(), a.trys.pop();
                                          continue;
                                      }
                                      i = t.call(e, a);
                                    } catch (e) {
                                      (i = [6, e]), (r = 0);
                                    } finally {
                                      n = o = 0;
                                    }
                                  if (5 & i[0]) throw i[1];
                                  return { value: i[0] ? i[1] : void 0, done: !0 };
                                })([i, s]);
                              };
                            }
                          },
                        i =
                          (this && this.__values) ||
                          function (e) {
                            var t = 'function' == typeof Symbol && Symbol.iterator,
                              n = t && e[t],
                              r = 0;
                            if (n) return n.call(e);
                            if (e && 'number' == typeof e.length)
                              return {
                                next: function () {
                                  return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
                                },
                              };
                            throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
                          },
                        a =
                          (this && this.__importDefault) ||
                          function (e) {
                            return e && e.__esModule ? e : { default: e };
                          };
                      Object.defineProperty(t, '__esModule', { value: !0 });
                      var s = a(n(4206)),
                        c = a(n(4993)),
                        u = n(1743),
                        l = a(n(2179)),
                        d = n(5262),
                        p = a(n(5922)),
                        f = a(n(7023)),
                        h = a(n(4652)),
                        v = a(n(9752)),
                        m = n(7461),
                        y = p.default.log,
                        g = new ((function () {
                          function e() {
                            (this.inputDelay = 0),
                              (this.inputSeqMap = {}),
                              (this.rttSum = 0),
                              (this.rttCount = 0),
                              (this.rttArray = []),
                              (this.rtt = 0),
                              (this.latency = { times: 0, status: null }),
                              (this.fps = null),
                              (this.delay = null),
                              (this.cpu = '0'),
                              (this.bitrate = null),
                              (this.lastBytesRevc = 0),
                              (this.packetLost = null),
                              (this.nack = null),
                              (this.packetsReceived = null),
                              (this.framesDecoded = null),
                              (this.framesDropped = null),
                              (this.framesReceived = null),
                              (this.firCount = null),
                              (this.pliCount = null),
                              (this.decodems = null),
                              (this.interfameDelayMaxMs = null),
                              (this.jitterBuffer = 0),
                              (this.lastFramesReceived = 0),
                              (this.gpu = ''),
                              (this.audioFps = null),
                              (this.audioLevel = 0),
                              (this.audioBitrate = null),
                              (this.audioLastBytesRevc = 0),
                              (this.audioPacketsLost = null),
                              (this.audioPacketsReceived = null),
                              (this.audioNack = null),
                              (this.metricBulk = []),
                              (this.reportTimer = null),
                              (this.serverSessionCost = 0),
                              (this.connectSuccessTimeCost = 0),
                              (this.iceConnectedCost = 0);
                          }
                          return (
                            (e.prototype.isShowing = function () {
                              return (
                                !!(0, u.getQcloudStatElement)() &&
                                'none' !== (0, u.getQcloudStatElement)().style.display
                              );
                            }),
                            (e.prototype.show = function (e) {
                              (0, u.getQcloudStatElement)() &&
                                ((0, u.getQcloudStatElement)().style.display = e ? 'block' : 'none');
                            }),
                            (e.prototype.getStats = function () {
                              var e = (l.default.getServerSideDescription() || u.empty).user_id;
                              return {
                                fps: this.fps,
                                delay: this.delay,
                                rtt: this.rtt,
                                cpu: this.cpu,
                                load_cost_time: this.connectSuccessTimeCost - this.serverSessionCost,
                                bit_rate: this.bitrate,
                                packet_lost: this.packetLost,
                                nack: this.nack,
                                packet_received: this.packetsReceived,
                                gpu: this.gpu,
                                input_delay: this.inputDelay,
                                user_id: e,
                                timestamp: +new Date(),
                              };
                            }),
                            (e.prototype.setStat = function (e, t) {
                              var n,
                                r,
                                o,
                                a,
                                s,
                                d = [],
                                p = [];
                              e.forEach(function (e) {
                                'video' === e.mediaType && p.push(e),
                                  'audio' === e.mediaType && d.push(e),
                                  'track' === e.type &&
                                    (e.frameHeight || e.frameWidth || 'video' === e.kind) &&
                                    p.push(e),
                                  'track' !== e.type || (e.frameHeight && e.frameWidth) || d.push(e);
                              });
                              try {
                                for (var h = i(p), v = h.next(); !v.done; v = h.next()) {
                                  var y = v.value,
                                    g = y.type,
                                    b = y.frameWidth,
                                    S = void 0 === b ? 0 : b,
                                    C = y.frameHeight,
                                    w = void 0 === C ? 0 : C,
                                    E = y.framesPerSecond,
                                    _ = y.framerateMean,
                                    T = y.totalDecodeTime,
                                    k = void 0 === T ? 0 : T,
                                    R = y.framesDropped,
                                    x = void 0 === R ? 0 : R,
                                    O = y.firCount,
                                    P = void 0 === O ? 0 : O,
                                    D = y.pliCount,
                                    M = void 0 === D ? 0 : D,
                                    A = y.jitterBufferDelay,
                                    I = void 0 === A ? 0 : A,
                                    j = y.packetsLost,
                                    L = void 0 === j ? null : j,
                                    N = y.bytesReceived,
                                    F = void 0 === N ? 0 : N,
                                    B = y.nackCount,
                                    U = void 0 === B ? 0 : B,
                                    G = y.packetsReceived,
                                    H = void 0 === G ? 0 : G,
                                    W = y.framesReceived,
                                    q = void 0 === W ? 0 : W,
                                    K = y.jitter,
                                    V = y.totalInterFrameDelay,
                                    z = void 0 === V ? 0 : V,
                                    $ = y.codecId,
                                    Y = void 0 === $ ? '' : $,
                                    X = y.remoteSource,
                                    J = y.framesDecoded,
                                    Q = void 0 === J ? 0 : J,
                                    Z = y.jitterBufferEmittedCount,
                                    ee = void 0 === Z ? 0 : Z;
                                  if (
                                    (ee || (ee = 1),
                                    Q || (Q = 1),
                                    'track' === g &&
                                      (X &&
                                        this.modifyStatElement({
                                          name: 'Resolution',
                                          tag: 'video-resolution',
                                          stat: ''.concat(S, 'x').concat(w),
                                          point: 'qcloud-video',
                                        }),
                                      (!(null === (s = f.default.name) || void 0 === s
                                        ? void 0
                                        : s.toLowerCase().includes('safari')) &&
                                        E) ||
                                        !X ||
                                        ((this.fps = q - this.lastFramesReceived),
                                        this.modifyStatElement({
                                          name: 'FPS',
                                          tag: 'video-fps',
                                          stat: ''.concat(this.fps),
                                          point: 'qcloud-video',
                                        }),
                                        (this.lastFramesReceived = q)),
                                      (this.jitterBuffer = (0, u.getFixedDecimal)((I / ee) * 1e3)),
                                      this.modifyStatElement({
                                        name: 'JitterBuffer',
                                        tag: 'video-jitter-buffer',
                                        stat: ''.concat(this.jitterBuffer, 'ms'),
                                        point: 'qcloud-video',
                                      })),
                                    'inbound-rtp' === g)
                                  ) {
                                    var te = ((null == t ? void 0 : t.get(Y)) || {}).mimeType,
                                      ne = void 0 === te ? '' : te;
                                    this.modifyStatElement({
                                      name: 'Codec',
                                      tag: 'video-codec',
                                      stat: ne,
                                      point: 'qcloud-video',
                                    }),
                                      E &&
                                        ((this.fps = E),
                                        this.modifyStatElement({
                                          name: 'FPS',
                                          tag: 'video-fps',
                                          stat: ''.concat(this.fps),
                                          point: 'qcloud-video',
                                        })),
                                      _ &&
                                        ((this.fps = Math.floor(_)),
                                        this.modifyStatElement({
                                          name: 'FPS',
                                          tag: 'video-fps',
                                          stat: ''.concat(this.fps),
                                          point: 'qcloud-video',
                                        }),
                                        (this.jitterBuffer = Math.floor(1e3 * K)),
                                        this.modifyStatElement({
                                          name: 'JitterBuffer',
                                          tag: 'video-jitter-buffer',
                                          stat: ''.concat(this.jitterBuffer, 'ms'),
                                          point: 'qcloud-video',
                                        })),
                                      (this.bitrate = F - this.lastBytesRevc);
                                    var re = (0, u.getFixedDecimal)((+this.bitrate / 1024 / 1024) * 8);
                                    this.modifyStatElement({
                                      name: 'VideoBitrate',
                                      tag: 'video-bitrates',
                                      stat: ''.concat(re, 'Mbit/s'),
                                      point: 'qcloud-video',
                                    }),
                                      (this.lastBytesRevc = F),
                                      (this.packetLost = L),
                                      this.modifyStatElement({
                                        name: 'PacketLost',
                                        tag: 'video-packet-lost',
                                        stat: ''.concat(this.packetLost),
                                        point: 'qcloud-video',
                                      }),
                                      (this.nack = U),
                                      this.modifyStatElement({
                                        name: 'NACK',
                                        tag: 'video-nack',
                                        stat: ''.concat(this.nack),
                                        point: 'qcloud-video',
                                      }),
                                      (this.delay = (0, u.getFixedDecimal)(+((k / Q) * 1e3 + this.jitterBuffer))),
                                      this.modifyStatElement({
                                        name: 'Delay',
                                        tag: 'video-delay',
                                        stat: ''.concat(this.delay, 'ms'),
                                        point: 'qcloud-video',
                                      }),
                                      (this.packetsReceived = H),
                                      (this.framesDecoded = Q),
                                      (this.framesDropped = x),
                                      (this.framesReceived = q),
                                      (this.decodems = Math.floor((k / Q) * 1e3)),
                                      (this.interfameDelayMaxMs = Math.floor((z / Q) * 1e3)),
                                      (this.firCount = P),
                                      (this.pliCount = M);
                                    var oe = (l.default.getFeatureSwitch() || {}).network_event_script;
                                    if (oe) {
                                      var ie = oe.notify_threshold,
                                        ae = void 0 === ie ? 5 : ie,
                                        se = (0, m.computeLatency)({
                                          packetsReceived: H,
                                          packetsLost: L,
                                          nack: U,
                                          rtt: this.rttArray,
                                        });
                                      this.latency.status === se
                                        ? ((this.latency.times = this.latency.times + 1),
                                          this.latency.times === ae &&
                                            this.latency.status !== m.NETWORK_STATUS.NETWORK_NORMAL &&
                                            (c.default.onNetworkChange({
                                              status: 'latency',
                                              data: { value: se, message: m.NETWORK_STATUS[se] },
                                            }),
                                            (this.latency.times = 0)))
                                        : ((this.latency.status = se), (this.latency.times = 0));
                                    }
                                  }
                                }
                              } catch (e) {
                                n = { error: e };
                              } finally {
                                try {
                                  v && !v.done && (r = h.return) && r.call(h);
                                } finally {
                                  if (n) throw n.error;
                                }
                              }
                              try {
                                for (var ce = i(d), ue = ce.next(); !ue.done; ue = ce.next()) {
                                  var le = ue.value,
                                    de = ((g = le.type), le.packetsLost),
                                    pe = ((L = void 0 === de ? 0 : de), le.packetsReceived),
                                    fe = ((H = void 0 === pe ? 0 : pe), le.bytesReceived),
                                    he = ((F = void 0 === fe ? 0 : fe), le.audioLevel),
                                    ve = void 0 === he ? 0 : he,
                                    me = le.nackCount,
                                    ye = ((U = void 0 === me ? 0 : me), le.codecId);
                                  if (((Y = void 0 === ye ? '' : ye), 'inbound-rtp' === g)) {
                                    (this.audioPacketsLost = L), (this.audioPacketsReceived = H);
                                    var ge = ((null == t ? void 0 : t.get(Y)) || {}).mimeType;
                                    (ne = void 0 === ge ? '' : ge),
                                      this.modifyStatElement({
                                        name: 'Codec',
                                        tag: 'audio-codec',
                                        stat: ne,
                                        point: 'qcloud-audio',
                                      }),
                                      (this.audioBitrate = F - this.audioLastBytesRevc),
                                      (re = (0, u.getFixedDecimal)((+this.audioBitrate / 1024 / 1024) * 8)),
                                      this.modifyStatElement({
                                        name: 'AudioBitrate',
                                        tag: 'audio-bitrates',
                                        stat: ''.concat(re, 'Mbit/s'),
                                        point: 'qcloud-audio',
                                      }),
                                      (this.audioLastBytesRevc = F),
                                      this.modifyStatElement({
                                        name: 'PacketLost',
                                        tag: 'audio-packet-lost',
                                        stat: ''.concat(this.audioPacketsLost),
                                        point: 'qcloud-audio',
                                      }),
                                      (this.audioNack = U),
                                      this.modifyStatElement({
                                        name: 'NACK',
                                        tag: 'audio-nack',
                                        stat: ''.concat(this.audioNack),
                                        point: 'qcloud-audio',
                                      });
                                  }
                                  'track' === g &&
                                    this.modifyStatElement({
                                      name: 'AudioLevel',
                                      tag: 'audio-level',
                                      stat: ''.concat((0, u.getFixedDecimal)(ve)),
                                      point: 'qcloud-audio',
                                    });
                                }
                              } catch (e) {
                                o = { error: e };
                              } finally {
                                try {
                                  ue && !ue.done && (a = ce.return) && a.call(ce);
                                } finally {
                                  if (o) throw o.error;
                                }
                              }
                            }),
                            (e.prototype.setInputStart = function (e) {
                              this.inputSeqMap[e] = new Date().getTime();
                            }),
                            (e.prototype.setInputEnd = function (e) {
                              void 0 === e && (e = 0),
                                this.inputSeqMap[e] &&
                                  ((this.inputDelay = Math.round((+new Date() - this.inputSeqMap[e]) / 2)),
                                  delete this.inputSeqMap[e]);
                            }),
                            (e.prototype.setRTT = function (e) {
                              (this.rtt = e),
                                this.modifyStatElement({
                                  name: 'RTT',
                                  tag: 'video-rtt',
                                  stat: ''.concat(e.toString(), 'ms'),
                                  point: 'qcloud-video',
                                }),
                                5 === this.rttArray.length && this.rttArray.shift(),
                                this.rttArray.push(e),
                                (this.rttSum += e),
                                (this.rttCount += 1);
                              var t = e / (this.rttSum / this.rttCount) > 2;
                              return this.rttCount > 60 && ((this.rttSum = 0), (this.rttCount = 0)), t;
                            }),
                            (e.prototype.setCpuAndGpuUsage = function (e) {
                              var t = e.cpu,
                                n = void 0 === t ? '0' : t,
                                r = e.gpu,
                                o = void 0 === r ? '' : r;
                              (this.cpu = n),
                                this.modifyStatElement({
                                  name: 'CpuUsage',
                                  tag: 'cpu-usage',
                                  stat: n,
                                  point: 'qcloud-info',
                                }),
                                (this.gpu = o),
                                this.modifyStatElement({
                                  name: 'GpuUsage',
                                  tag: 'gpu-usage',
                                  stat: o,
                                  point: 'qcloud-info',
                                });
                            }),
                            (e.prototype.setStaticStat = function () {
                              var e = this,
                                t = l.default.getServerSideDescription(),
                                n = t.server_ip,
                                r = t.region,
                                o = t.instance_type,
                                i = t.host_name,
                                a = t.request_id;
                              if (
                                (this.modifyStatElement({
                                  name: 'Version',
                                  tag: 'sdk-version',
                                  stat: d.config.version,
                                  point: 'qcloud-info',
                                }),
                                this.modifyStatElement({
                                  name: 'ServerIp',
                                  tag: 'server-ip',
                                  stat: n,
                                  point: 'qcloud-info',
                                }),
                                this.modifyStatElement({
                                  name: 'Region',
                                  tag: 'region',
                                  stat: r,
                                  point: 'qcloud-info',
                                }),
                                this.modifyStatElement({
                                  name: 'InstanceType',
                                  tag: 'instance-type',
                                  stat: o,
                                  point: 'qcloud-info',
                                }),
                                setTimeout(function () {
                                  e.modifyStatElement({
                                    name: 'RequestId',
                                    tag: 'request-id',
                                    stat: a,
                                    point: 'qcloud-info',
                                  });
                                }, 2e3),
                                !document.querySelector('.qcloud-host') && v.default.getIsMobileGame())
                              ) {
                                var s = document.createElement('div');
                                (s.className = 'qcloud-stat-row qcloud-host'),
                                  (s.innerHTML =
                                    "<div class='qcloud-stat-left'>HostName</div><div class='qcloud-stat-right'>".concat(
                                      i,
                                      '</div>',
                                    )),
                                  (0, u.getQcloudStatElement)().appendChild(s);
                              }
                            }),
                            (e.prototype.modifyStatElement = function (e) {
                              var t = e.name,
                                n = void 0 === t ? '' : t,
                                r = e.tag,
                                o = void 0 === r ? '' : r,
                                i = e.stat,
                                a = void 0 === i ? '' : i,
                                s = e.point,
                                c = void 0 === s ? null : s;
                              if ((0, u.getQcloudStatElement)().querySelector('.qcloud-'.concat(o)))
                                (0, u.getQcloudStatElement)().querySelector(
                                  '.qcloud-'.concat(o, ' .qcloud-stat-right'),
                                ).innerHTML = a;
                              else {
                                var l = document.createElement('div');
                                (l.className = 'qcloud-stat-row qcloud-'.concat(o)),
                                  (l.innerHTML = "<div class='qcloud-stat-left'>"
                                    .concat(n, "</div><div class='qcloud-stat-right'>")
                                    .concat(a, '</div>')),
                                  (0, u.getQcloudStatElement)().querySelector('.'.concat(c)).appendChild(l);
                              }
                            }),
                            (e.prototype.setServerSessionTime = function (e) {
                              var t = this;
                              (this.serverSessionCost = e),
                                setTimeout(function () {
                                  t.modifyStatElement({
                                    name: 'ServerSessionTime',
                                    tag: 'server-session',
                                    stat: ''.concat((0, u.getFixedDecimal)((e - c.default.initStartTime) / 1e3), 's'),
                                    point: 'qcloud-info',
                                  });
                                }, 0);
                            }),
                            (e.prototype.setIceConnectedTime = function (e) {
                              this.iceConnectedCost = e;
                            }),
                            (e.prototype.setConnectSuccessTime = function (e) {
                              (this.connectSuccessTimeCost = e),
                                this.modifyStatElement({
                                  name: 'ConnectSuccessTime',
                                  tag: 'connect-success',
                                  stat: ''.concat((0, u.getFixedDecimal)((e - c.default.initStartTime) / 1e3), 's'),
                                  point: 'qcloud-info',
                                });
                            }),
                            (e.prototype.addReportStat = function () {
                              var e,
                                t,
                                n,
                                r,
                                o,
                                i = l.default.getServerSideDescription(),
                                a = i.server_ip,
                                s = i.request_id,
                                c = i.server_version,
                                u = i.user_id;
                              this.metricBulk.push({
                                user_id: u,
                                request_id: s,
                                server_ip: a,
                                server_version: c,
                                timestamp: +new Date(),
                                bit_rate: this.bitrate,
                                packet_lost: this.packetLost,
                                packet_received: this.packetsReceived,
                                bytes_received: this.lastBytesRevc,
                                audio_packet_lost: this.audioPacketsLost,
                                audio_packet_received: this.audioPacketsReceived,
                                fps: this.fps,
                                delay: this.delay,
                                nack: this.nack,
                                cpu: +this.cpu,
                                gpu: this.gpu,
                                load_cost_time: this.iceConnectedCost - this.serverSessionCost,
                                first_frame: this.connectSuccessTimeCost - this.serverSessionCost,
                                jitter_buffer: this.jitterBuffer,
                                input_delay: this.inputDelay,
                                rtt: this.rtt,
                                frame_decoded: this.framesDecoded,
                                frame_dropped: this.framesDropped,
                                frame_received: this.framesReceived,
                                render_frame_rate: this.framesDecoded,
                                receive_frame_rate: this.framesReceived,
                                decoded_frame_rate: this.framesDecoded,
                                decode_ms: this.decodems,
                                version: ''.concat(d.config.version),
                                platform: '0',
                                pli_count: this.pliCount,
                                fir_count: this.firCount,
                                browser: ''
                                  .concat(null === (e = f.default.os) || void 0 === e ? void 0 : e.family, '/')
                                  .concat(null === (t = f.default.os) || void 0 === t ? void 0 : t.version, '/')
                                  .concat(f.default.name),
                                app_id: ''.concat(
                                  null !==
                                    (r =
                                      null === (n = l.default.getServerSideDescription()) || void 0 === n
                                        ? void 0
                                        : n.app_id) && void 0 !== r
                                    ? r
                                    : 0,
                                ),
                                game_id:
                                  null === (o = l.default.getServerSideDescription()) || void 0 === o
                                    ? void 0
                                    : o.game_id,
                              });
                            }),
                            (e.prototype.toggleMetricReportBulk = function (e) {
                              var t = this;
                              e
                                ? (this.reportTimer = setInterval(function () {
                                    t.metricReportBulk(), p.default.reportLog();
                                  }, 1e4))
                                : clearInterval(this.reportTimer);
                            }),
                            (e.prototype.metricReportBulk = function () {
                              return r(this, void 0, void 0, function () {
                                var e, t, n, r, i, a, c, u;
                                return o(this, function (o) {
                                  switch (o.label) {
                                    case 0:
                                      (e = JSON.stringify({ metric: 'cg_client_stat', bulk: this.metricBulk })),
                                        (t = l.default.getServerSideDescription().sig_key),
                                        (n = null);
                                      try {
                                        n = t && (0, h.default)(e.slice(0, 128), t).toString();
                                      } catch (e) {
                                        y('encode sig_key error', e);
                                      }
                                      (r = n
                                        ? ' https://metrics.cloud-gaming.myqcloud.com/report_metric_bulk?sig='.concat(n)
                                        : ' https://metrics.cloud-gaming.myqcloud.com/report_metric_bulk'),
                                        (o.label = 1);
                                    case 1:
                                      return (
                                        o.trys.push([1, 3, , 4]),
                                        d.config.lite
                                          ? [2, y('lite sdk can not report state')]
                                          : [4, s.default.post(r, e)]
                                      );
                                    case 2:
                                      return (
                                        (i = o.sent()),
                                        (a = i.status),
                                        (c = i.data),
                                        200 === a || y('metricReport failed', c),
                                        (this.metricBulk = []),
                                        [3, 4]
                                      );
                                    case 3:
                                      return (u = o.sent()), y('metricReportBulk failed', u), [3, 4];
                                    case 4:
                                      return [2];
                                  }
                                });
                              });
                            }),
                            (e.prototype.selector = function (e) {
                              var t = (0, u.getQcloudStatElement)();
                              return t ? t.querySelector(e) : document.createElement('div');
                            }),
                            e
                          );
                        })())();
                      t.default = g;
                    },
                    869: function (e, t) {
                      'use strict';
                      Object.defineProperty(t, '__esModule', { value: !0 }),
                        (t.mountPointCss = t.htmlString = t.htmlStats = void 0),
                        (t.htmlStats =
                          '\n<div class="qcloud-stat">\n  \n  <div class="qcloud-video">\n    <div class="qcloud-stat-video">\n      <div class="qcloud-stat-left">Video</div>\n    </div>\n  </div>\n\n  <div class="qcloud-audio">\n    <div class="qcloud-stat-audio">\n      <div class="qcloud-stat-left">Audio</div>\n    </div>\n  </div>\n\n  <div class="qcloud-info">\n    <div class="qcloud-stat-info">\n      <div class="qcloud-stat-left">Info</div>\n    </div>\n  </div>\n\n</div>'),
                        (t.htmlString =
                          '\n<div id="cloud-gaming-container" tabindex="-1">\n  <video id="video-stream" tabindex="-1" playsinline webkit-playsinline x5-playsinline autoplay muted preload="auto"></video>\n  <div class="cursor" id="cursor"></div>\n</div>\n\n'.concat(
                            t.htmlStats,
                            '\n\n<div class="progress-bar-container">\n  <div class="spinner"> </div>\n  <p class="starting">正在启动云渲染服务</p>\n  <p id="speed" class="starting"></p>\n</div>\n\n<a class="restart" href="javascript:window.location.reload();">重新连接</a>',
                          )),
                        (t.mountPointCss =
                          "\n#cloud-gaming-container {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  justify-content: center;\n  align-items: center;\n  display: none;\n  background-size: cover !important; /* stylelint-disable-line */\n}\n.qcloud-stat {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n  line-height: 18px;\n  padding: 5px 10px;\n  z-index: 5;\n  color: #eee;\n  background: rgba(0, 0, 0, .5);\n  border-radius: 5px;\n  text-align: left;\n  font-size: 12px;\n  pointer-events: none;\n  display: none;\n  flex-direction: column;\n  width: 220px;\n}\n.qcloud-request-id {\n  pointer-events: all;\n}\n.qcloud-stat-left {\n  width: 120px;\n}\n.qcloud-stat-right {\n  flex: 1;\n}\n.qcloud-stat-row {\n  text-align: left;\n  display: flex;\n}\n\n@keyframes spinner {\n  to {transform: rotate(360deg);}\n}\n.progress-bar-container {\n  text-align: center;\n  position: absolute;\n  width: 40%;\n  height: 15%;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.starting {\n  color:white;\n  font-weight:bold;\n  margin-top:30px;\n}\n.spinner:before {\n  content: '';\n  box-sizing: border-box;\n  position: absolute;\n  top: 60px;\n  width: 20px;\n  height: 20px;\n  margin-top: -5px;\n  margin-left: -10px;\n  border-radius: 50%;\n  border: 4px solid #ccc;\n  border-top-color: #000;\n  animation: spinner .6s linear infinite;\n}\n.restart {\n  position: absolute;\n  width: 350px;\n  text-align: center;\n  height: 30px;\n  line-height: 30px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  align-items: center;\n  font-size: 24px;\n  color: #fff;\n  display: none;\n}\n.cursor {\n  position: absolute;\n  width: 26px;\n  height: 26px;\n  top: 0px;\n  left: 0px;\n  z-index: 1;\n  background-size: cover;\n  display: none;\n}\n.audio-stream {\n  width: 0px;\n}\n#video-stream {\n  max-width: 100%;\n  max-height: 100%;\n  outline: none;\n  border: 0;\n}\n#video-stream:focus {\n  outline :none;\n}\n.rotate-html-90 {\n  transform: rotate(90deg);\n  transform-origin: left top;\n  width: 100vh;\n  height: 100vw;\n  overflow-x: hidden;\n  position: absolute;\n  top: 0;\n  left: 100%;\n}\n.rotate-html-270 {\n  transform: rotate(270deg);\n  transform-origin: left top;\n  overflow-x: hidden;\n  position: absolute;\n  top: 100%;\n  left: 0;\n}");
                    },
                    5922: function (e, t, n) {
                      'use strict';
                      var r =
                          (this && this.__awaiter) ||
                          function (e, t, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                              function a(e) {
                                try {
                                  c(r.next(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function s(e) {
                                try {
                                  c(r.throw(e));
                                } catch (e) {
                                  i(e);
                                }
                              }
                              function c(e) {
                                var t;
                                e.done
                                  ? o(e.value)
                                  : ((t = e.value),
                                    t instanceof n
                                      ? t
                                      : new n(function (e) {
                                          e(t);
                                        })).then(a, s);
                              }
                              c((r = r.apply(e, t || [])).next());
                            });
                          },
                        o =
                          (this && this.__generator) ||
                          function (e, t) {
                            var n,
                              r,
                              o,
                              i,
                              a = {
                                label: 0,
                                sent: function () {
                                  if (1 & o[0]) throw o[1];
                                  return o[1];
                                },
                                trys: [],
                                ops: [],
                              };
                            return (
                              (i = { next: s(0), throw: s(1), return: s(2) }),
                              'function' == typeof Symbol &&
                                (i[Symbol.iterator] = function () {
                                  return this;
                                }),
                              i
                            );
                            function s(i) {
                              return function (s) {
                                return (function (i) {
                                  if (n) throw new TypeError('Generator is already executing.');
                                  for (; a; )
                                    try {
                                      if (
                                        ((n = 1),
                                        r &&
                                          (o =
                                            2 & i[0]
                                              ? r.return
                                              : i[0]
                                              ? r.throw || ((o = r.return) && o.call(r), 0)
                                              : r.next) &&
                                          !(o = o.call(r, i[1])).done)
                                      )
                                        return o;
                                      switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                                        case 0:
                                        case 1:
                                          o = i;
                                          break;
                                        case 4:
                                          return a.label++, { value: i[1], done: !1 };
                                        case 5:
                                          a.label++, (r = i[1]), (i = [0]);
                                          continue;
                                        case 7:
                                          (i = a.ops.pop()), a.trys.pop();
                                          continue;
                                        default:
                                          if (
                                            !(
                                              (o = (o = a.trys).length > 0 && o[o.length - 1]) ||
                                              (6 !== i[0] && 2 !== i[0])
                                            )
                                          ) {
                                            a = 0;
                                            continue;
                                          }
                                          if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                                            a.label = i[1];
                                            break;
                                          }
                                          if (6 === i[0] && a.label < o[1]) {
                                            (a.label = o[1]), (o = i);
                                            break;
                                          }
                                          if (o && a.label < o[2]) {
                                            (a.label = o[2]), a.ops.push(i);
                                            break;
                                          }
                                          o[2] && a.ops.pop(), a.trys.pop();
                                          continue;
                                      }
                                      i = t.call(e, a);
                                    } catch (e) {
                                      (i = [6, e]), (r = 0);
                                    } finally {
                                      n = o = 0;
                                    }
                                  if (5 & i[0]) throw i[1];
                                  return { value: i[0] ? i[1] : void 0, done: !0 };
                                })([i, s]);
                              };
                            }
                          },
                        i =
                          (this && this.__read) ||
                          function (e, t) {
                            var n = 'function' == typeof Symbol && e[Symbol.iterator];
                            if (!n) return e;
                            var r,
                              o,
                              i = n.call(e),
                              a = [];
                            try {
                              for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; ) a.push(r.value);
                            } catch (e) {
                              o = { error: e };
                            } finally {
                              try {
                                r && !r.done && (n = i.return) && n.call(i);
                              } finally {
                                if (o) throw o.error;
                              }
                            }
                            return a;
                          },
                        a =
                          (this && this.__spreadArray) ||
                          function (e, t, n) {
                            if (n || 2 === arguments.length)
                              for (var r, o = 0, i = t.length; o < i; o++)
                                (!r && o in t) || (r || (r = Array.prototype.slice.call(t, 0, o)), (r[o] = t[o]));
                            return e.concat(r || Array.prototype.slice.call(t));
                          },
                        s =
                          (this && this.__values) ||
                          function (e) {
                            var t = 'function' == typeof Symbol && Symbol.iterator,
                              n = t && e[t],
                              r = 0;
                            if (n) return n.call(e);
                            if (e && 'number' == typeof e.length)
                              return {
                                next: function () {
                                  return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
                                },
                              };
                            throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
                          },
                        u =
                          (this && this.__importDefault) ||
                          function (e) {
                            return e && e.__esModule ? e : { default: e };
                          };
                      Object.defineProperty(t, '__esModule', { value: !0 });
                      var l = u(n(4206)),
                        d = u(n(2179)),
                        p = n(1743),
                        f = u(n(4993)),
                        h = u(n(4652)),
                        v = n(5262),
                        m = (function () {
                          function e() {
                            (this.logStr = []), (this.allLogs = []), (this.externalLogHandler = p.noop);
                          }
                          return (
                            (e.prototype.log = function () {
                              for (var e, t, n, r, o, u = [], l = 0; l < arguments.length; l++) u[l] = arguments[l];
                              (null === (n = f.default.getInitOptions().debugSetting) || void 0 === n
                                ? void 0
                                : n.showLog) && console.log.apply(console, a([], i(u), !1));
                              var h = '';
                              try {
                                for (var v = s(u), m = v.next(); !m.done; m = v.next()) {
                                  var g = m.value;
                                  h += ''.concat('object' == c(g) ? JSON.stringify(g) : g, ' ');
                                }
                              } catch (t) {
                                e = { error: t };
                              } finally {
                                try {
                                  m && !m.done && (t = v.return) && t.call(v);
                                } finally {
                                  if (e) throw e.error;
                                }
                              }
                              var b = d.default.getServerSideDescription(),
                                S = b.request_id,
                                C = void 0 === S ? '' : S,
                                w = b.server_ip,
                                E = void 0 === w ? '' : w,
                                _ = b.user_id,
                                T = void 0 === _ ? '' : _,
                                k = null !== (r = E || C) && void 0 !== r ? r : '';
                              (h = '[TCG/'.concat(k, '][').concat(T, ']:').concat(h)),
                                null === (o = y.externalLogHandler) || void 0 === o || o.call(y, h);
                              var R = new Date(),
                                x = {
                                  timestamp: +R,
                                  server_ip: E,
                                  request_id: C,
                                  user_id: T,
                                  content: ''.concat((0, p.formatTime)(R, 'yyyy-mm-dd hh:ii:ss'), ' ').concat(h, '\n'),
                                };
                              y.logStr.push(x),
                                y.allLogs.push({ request_id: x.request_id, user_id: x.user_id, content: x.content });
                            }),
                            (e.prototype.getLog = function () {
                              var e = d.default.getServerSideDescription(),
                                t = e.request_id,
                                n = void 0 === t ? '' : t,
                                r = e.server_ip,
                                o = void 0 === r ? '' : r;
                              return (
                                this.logStr.forEach(function (e) {
                                  e.server_ip || (e.server_ip = o), e.request_id || (e.request_id = n);
                                }),
                                this.logStr
                              );
                            }),
                            (e.prototype.getAllLogs = function () {
                              var e = d.default.getServerSideDescription().request_id,
                                t = void 0 === e ? '' : e;
                              return (
                                this.allLogs.forEach(function (e) {
                                  e.request_id || (e.request_id = t);
                                }),
                                this.allLogs
                              );
                            }),
                            (e.prototype.reportLog = function () {
                              return r(this, void 0, void 0, function () {
                                return o(this, function (e) {
                                  return [2, this.metricLogReport(this.getLog())];
                                });
                              });
                            }),
                            (e.prototype.setExternalLog = function (e) {
                              void 0 === e && (e = p.noop), (this.externalLogHandler = e);
                            }),
                            (e.prototype.metricLogReport = function (e) {
                              return r(this, void 0, void 0, function () {
                                var t, n, r, i, a, s, c, u;
                                return o(this, function (o) {
                                  switch (o.label) {
                                    case 0:
                                      if (0 === this.logStr.length) return [2];
                                      (t = JSON.stringify({ metric: 'cg_client_log', bulk: e })),
                                        (n = d.default.getServerSideDescription().sig_key),
                                        (r = null);
                                      try {
                                        r = n && (0, h.default)(t.slice(0, 128), n).toString();
                                      } catch (e) {
                                        this.log('encode sig_key error', e);
                                      }
                                      (i = r
                                        ? 'https://metrics.cloud-gaming.myqcloud.com/report_log_bulk?sig='.concat(r)
                                        : 'https://metrics.cloud-gaming.myqcloud.com/report_log_bulk'),
                                        (o.label = 1);
                                    case 1:
                                      return (
                                        o.trys.push([1, 3, , 4]),
                                        v.config.lite
                                          ? [2, this.log('lite sdk can not report logs')]
                                          : [4, l.default.post(i, t)]
                                      );
                                    case 2:
                                      return (
                                        (a = o.sent()),
                                        (s = a.status),
                                        (c = a.data),
                                        200 === s
                                          ? (this.log('metricReport', c), (this.logStr = []), [2, c])
                                          : (this.log('metricReport failed', c), [2, { code: -1, message: 'failed' }])
                                      );
                                    case 3:
                                      return (
                                        (u = o.sent()),
                                        this.log('metricReport failed', u),
                                        [2, { code: -1, message: 'failed' }]
                                      );
                                    case 4:
                                      return [2];
                                  }
                                });
                              });
                            }),
                            e
                          );
                        })(),
                        y = new m();
                      (window.TCGLogger = y), (t.default = y);
                    },
                    2484: function (e, t) {
                      'use strict';
                      Object.defineProperty(t, '__esModule', { value: !0 }),
                        (t.interceptUserEvent = void 0),
                        (t.interceptUserEvent = function (e) {
                          return function (t, n, r) {
                            void 0 === t && (t = null);
                            var o = r.value;
                            return (
                              (r.value = function () {
                                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                                var r = ['video-stream', 'cursor', 'cloud-gaming-container'],
                                  i = t[0].target.id;
                                (e && !r.includes(i)) || o.apply(this, t);
                              }),
                              r
                            );
                          };
                        });
                    },
                    6363: function (e, t) {
                      'use strict';
                      var n,
                        r,
                        o =
                          (this && this.__read) ||
                          function (e, t) {
                            var n = 'function' == typeof Symbol && e[Symbol.iterator];
                            if (!n) return e;
                            var r,
                              o,
                              i = n.call(e),
                              a = [];
                            try {
                              for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; ) a.push(r.value);
                            } catch (e) {
                              o = { error: e };
                            } finally {
                              try {
                                r && !r.done && (n = i.return) && n.call(i);
                              } finally {
                                if (o) throw o.error;
                              }
                            }
                            return a;
                          },
                        i =
                          (this && this.__values) ||
                          function (e) {
                            var t = 'function' == typeof Symbol && Symbol.iterator,
                              n = t && e[t],
                              r = 0;
                            if (n) return n.call(e);
                            if (e && 'number' == typeof e.length)
                              return {
                                next: function () {
                                  return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
                                },
                              };
                            throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
                          };
                      Object.defineProperty(t, '__esModule', { value: !0 }), (t.supportFullScreen = void 0);
                      var a,
                        s = {},
                        c = [
                          [
                            'requestFullscreen',
                            'exitFullscreen',
                            'fullscreenElement',
                            'fullscreenEnabled',
                            'fullscreenchange',
                            'fullscreenerror',
                          ],
                          [
                            'webkitRequestFullscreen',
                            'webkitExitFullscreen',
                            'webkitFullscreenElement',
                            'webkitFullscreenEnabled',
                            'webkitfullscreenchange',
                            'webkitfullscreenerror',
                          ],
                          [
                            'webkitRequestFullScreen',
                            'webkitCancelFullScreen',
                            'webkitCurrentFullScreenElement',
                            'webkitCancelFullScreen',
                            'webkitfullscreenchange',
                            'webkitfullscreenerror',
                          ],
                          [
                            'mozRequestFullScreen',
                            'mozCancelFullScreen',
                            'mozFullScreenElement',
                            'mozFullScreenEnabled',
                            'mozfullscreenchange',
                            'mozfullscreenerror',
                          ],
                          [
                            'msRequestFullscreen',
                            'msExitFullscreen',
                            'msFullscreenElement',
                            'msFullscreenEnabled',
                            'MSFullscreenChange',
                            'MSFullscreenError',
                          ],
                        ],
                        u = o(c, 1)[0];
                      try {
                        for (var l = i(c), d = l.next(); !d.done; d = l.next()) {
                          var p = d.value;
                          if (p[1] in document) {
                            a = p;
                            break;
                          }
                        }
                      } catch (e) {
                        n = { error: e };
                      } finally {
                        try {
                          d && !d.done && (r = l.return) && r.call(l);
                        } finally {
                          if (n) throw n.error;
                        }
                      }
                      if (a) for (var f = 0; f < a.length; f++) s[u[f]] = a[f];
                      (t.default = s),
                        (t.supportFullScreen = function (e) {
                          if ('function' == typeof e.webkitEnterFullScreen) {
                            var t = navigator.userAgent || '';
                            if (/Android/.test(t) || !/Chrome|Mac OS X 10.5/.test(t)) return !0;
                          }
                          return !1;
                        });
                    },
                    7461: function (e, t, n) {
                      'use strict';
                      var r =
                        (this && this.__importDefault) ||
                        function (e) {
                          return e && e.__esModule ? e : { default: e };
                        };
                      Object.defineProperty(t, '__esModule', { value: !0 }),
                        (t.computeLatency = t.NETWORK_STATUS = t.variance = void 0);
                      var o = r(n(2179));
                      t.variance = function (e) {
                        if ((void 0 === e && (e = []), !e.length)) return 0;
                        var t = e.reduce(function (e, t) {
                            return e + t;
                          }, 0),
                          n = e.length,
                          r = t / n,
                          o = 0;
                        return (
                          e.forEach(function (e) {
                            o += (e - r) * (e - r);
                          }),
                          (o /= n),
                          Math.floor(o)
                        );
                      };
                      var i,
                        a = {
                          packetsReceived: 0,
                          packetsLost: 0,
                          nack: 0,
                          rttAverage: 0,
                          rttVariance: 0,
                          nackRate: 0,
                          packetsLostRate: 0,
                        };
                      !(function (e) {
                        (e[(e.NETWORK_NORMAL = 0)] = 'NETWORK_NORMAL'),
                          (e[(e.NETWORK_CONGESTION = 1)] = 'NETWORK_CONGESTION'),
                          (e[(e.NACK_RISING = 2)] = 'NACK_RISING'),
                          (e[(e.HIGH_DELAY = 3)] = 'HIGH_DELAY'),
                          (e[(e.NETWORK_JITTER = 4)] = 'NETWORK_JITTER');
                      })((i = t.NETWORK_STATUS || (t.NETWORK_STATUS = {}))),
                        (t.computeLatency = function (e) {
                          var n = e.packetsReceived,
                            r = void 0 === n ? 0 : n,
                            s = e.packetsLost,
                            c = void 0 === s ? 0 : s,
                            u = e.nack,
                            l = void 0 === u ? 0 : u,
                            d = e.rtt,
                            p = void 0 === d ? [] : d,
                            f = r - a.packetsReceived;
                          a.packetsReceived = r;
                          var h = c - a.packetsLost;
                          (a.packetsLost = c), (a.packetsLostRate = h / f);
                          var v = c - a.nack;
                          (a.nack = l),
                            (a.nackRate = v / f),
                            (a.rttAverage =
                              p.reduce(function (e, t) {
                                return e + t;
                              }, 0) / p.length),
                            (a.rttVariance = (0, t.variance)(p));
                          var m = o.default.getFeatureSwitch().network_event_script,
                            y = void 0 === m ? {} : m,
                            g = y.loss_rate_threshold,
                            b = y.nack_rate_threshold,
                            S = y.rtt_avg_threshold,
                            C = y.rtt_dev_threshold;
                          return a.packetsLostRate > g
                            ? i.NETWORK_CONGESTION
                            : a.nackRate > b
                            ? i.NACK_RISING
                            : a.rttAverage > S
                            ? i.HIGH_DELAY
                            : a.rttVariance > C
                            ? i.NETWORK_JITTER
                            : i.NETWORK_NORMAL;
                        });
                    },
                    1743: function (e, t, n) {
                      'use strict';
                      var r =
                          (this && this.__read) ||
                          function (e, t) {
                            var n = 'function' == typeof Symbol && e[Symbol.iterator];
                            if (!n) return e;
                            var r,
                              o,
                              i = n.call(e),
                              a = [];
                            try {
                              for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; ) a.push(r.value);
                            } catch (e) {
                              o = { error: e };
                            } finally {
                              try {
                                r && !r.done && (n = i.return) && n.call(i);
                              } finally {
                                if (o) throw o.error;
                              }
                            }
                            return a;
                          },
                        o =
                          (this && this.__values) ||
                          function (e) {
                            var t = 'function' == typeof Symbol && Symbol.iterator,
                              n = t && e[t],
                              r = 0;
                            if (n) return n.call(e);
                            if (e && 'number' == typeof e.length)
                              return {
                                next: function () {
                                  return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
                                },
                              };
                            throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
                          },
                        i =
                          (this && this.__importDefault) ||
                          function (e) {
                            return e && e.__esModule ? e : { default: e };
                          };
                      Object.defineProperty(t, '__esModule', { value: !0 }),
                        (t.createAudioAndAddTrack =
                          t.getFakeInput =
                          t.getRestartElement =
                          t.getQcloudSpeedElement =
                          t.getQcloudStatElement =
                          t.getGameMountPointElement =
                          t.getCloudGamingContainerElement =
                          t.getCursorElement =
                          t.getProgressBarElement =
                          t.getAudioElement =
                          t.getVideoElement =
                          t.empty =
                          t.getSequence =
                          t.getFixedDecimal =
                          t.is360 =
                          t.canReceiveH264 =
                          t.checkProfileLevelId =
                          t.getSearch =
                          t.noop =
                          t.dispatchEvent =
                          t.formatTime =
                          t.addZero =
                          t.sleep =
                          t.checkBrowser =
                          t.isAndroid =
                          t.isMobile =
                          t.isFullScreen =
                          t.isWegameChrome =
                          t.codeMap =
                            void 0);
                      var a = i(n(4993)),
                        s = i(n(5922)).default.log;
                      (t.codeMap = {
                        0: { key: 48, shift: !1 },
                        ')': { key: 48, shift: !0 },
                        1: { key: 49, shift: !1 },
                        '!': { key: 49, shift: !0 },
                        2: { key: 50, shift: !1 },
                        '@': { key: 50, shift: !0 },
                        3: { key: 51, shift: !1 },
                        '#': { key: 51, shift: !0 },
                        4: { key: 52, shift: !1 },
                        $: { key: 52, shift: !0 },
                        5: { key: 53, shift: !1 },
                        '%': { key: 53, shift: !0 },
                        6: { key: 54, shift: !1 },
                        '^': { key: 54, shift: !0 },
                        7: { key: 55, shift: !1 },
                        '&': { key: 55, shift: !0 },
                        8: { key: 56, shift: !1 },
                        '*': { key: 56, shift: !0 },
                        9: { key: 57, shift: !1 },
                        '(': { key: 57, shift: !0 },
                        a: { key: 65, shift: !1 },
                        A: { key: 65, shift: !0 },
                        b: { key: 66, shift: !1 },
                        B: { key: 66, shift: !0 },
                        c: { key: 67, shift: !1 },
                        C: { key: 67, shift: !0 },
                        d: { key: 68, shift: !1 },
                        D: { key: 68, shift: !0 },
                        e: { key: 69, shift: !1 },
                        E: { key: 69, shift: !0 },
                        f: { key: 70, shift: !1 },
                        F: { key: 70, shift: !0 },
                        g: { key: 71, shift: !1 },
                        G: { key: 71, shift: !0 },
                        h: { key: 72, shift: !1 },
                        H: { key: 72, shift: !0 },
                        i: { key: 73, shift: !1 },
                        I: { key: 73, shift: !0 },
                        j: { key: 74, shift: !1 },
                        J: { key: 74, shift: !0 },
                        k: { key: 75, shift: !1 },
                        K: { key: 75, shift: !0 },
                        l: { key: 76, shift: !1 },
                        L: { key: 76, shift: !0 },
                        m: { key: 77, shift: !1 },
                        M: { key: 77, shift: !0 },
                        n: { key: 78, shift: !1 },
                        N: { key: 78, shift: !0 },
                        o: { key: 79, shift: !1 },
                        O: { key: 79, shift: !0 },
                        p: { key: 80, shift: !1 },
                        P: { key: 80, shift: !0 },
                        q: { key: 81, shift: !1 },
                        Q: { key: 81, shift: !0 },
                        r: { key: 82, shift: !1 },
                        R: { key: 82, shift: !0 },
                        s: { key: 83, shift: !1 },
                        S: { key: 83, shift: !0 },
                        t: { key: 84, shift: !1 },
                        T: { key: 84, shift: !0 },
                        u: { key: 85, shift: !1 },
                        U: { key: 85, shift: !0 },
                        v: { key: 86, shift: !1 },
                        V: { key: 86, shift: !0 },
                        w: { key: 87, shift: !1 },
                        W: { key: 87, shift: !0 },
                        x: { key: 88, shift: !1 },
                        X: { key: 88, shift: !0 },
                        y: { key: 89, shift: !1 },
                        Y: { key: 89, shift: !0 },
                        z: { key: 90, shift: !1 },
                        Z: { key: 90, shift: !0 },
                        '=': { key: 187, shift: !1 },
                        '+': { key: 187, shift: !0 },
                        ',': { key: 188, shift: !1 },
                        '<': { key: 188, shift: !0 },
                        '-': { key: 189, shift: !1 },
                        _: { key: 189, shift: !0 },
                        '.': { key: 190, shift: !1 },
                        '>': { key: 190, shift: !0 },
                        '/': { key: 191, shift: !1 },
                        '?': { key: 191, shift: !0 },
                        '`': { key: 192, shift: !1 },
                        '~': { key: 192, shift: !0 },
                        '[': { key: 219, shift: !1 },
                        '{': { key: 219, shift: !0 },
                        '\\': { key: 220, shift: !1 },
                        '|': { key: 220, shift: !0 },
                        ']': { key: 221, shift: !1 },
                        '}': { key: 221, shift: !0 },
                        "'": { key: 222, shift: !1 },
                        '"': { key: 222, shift: !0 },
                        '↑': { key: 38, shift: !1 },
                        '↓': { key: 40, shift: !1 },
                        '←': { key: 37, shift: !1 },
                        '→': { key: 39, shift: !1 },
                        Home: { key: 36, shift: !1 },
                        Ctrl: { key: 17, shift: !1 },
                        Alt: { key: 18, shift: !1 },
                        Win: { key: 91, shift: !1 },
                        NumLock: { key: 144, shift: !1 },
                        Tab: { key: 9, shift: !1 },
                        CapsLock: { key: 20, shift: !1 },
                        Shift: { key: 16, shift: !1 },
                        Enter: { key: 13, shift: !1 },
                        BackSpace: { key: 8, shift: !1 },
                        Insert: { key: 45, shift: !1 },
                        Delete: { key: 46, shift: !1 },
                        PageUp: { key: 33, shift: !1 },
                        PageDown: { key: 34, shift: !1 },
                        End: { key: 35, shift: !1 },
                        PrintScreen: { key: 42, shift: !1 },
                        ScrollLock: { key: 145, shift: !1 },
                        PauseBreak: { key: 19, shift: !1 },
                        Space: { key: 32, shift: !1 },
                        Esc: { key: 27, shift: !1 },
                        F1: { key: 112, shift: !1 },
                        F2: { key: 113, shift: !1 },
                        F3: { key: 114, shift: !1 },
                        F4: { key: 115, shift: !1 },
                        F5: { key: 116, shift: !1 },
                        F6: { key: 117, shift: !1 },
                        F7: { key: 118, shift: !1 },
                        F8: { key: 119, shift: !1 },
                        F9: { key: 120, shift: !1 },
                        F10: { key: 121, shift: !1 },
                        F11: { key: 122, shift: !1 },
                        F12: { key: 123, shift: !1 },
                        '^0': { key: 96, shift: !1 },
                        '^1': { key: 97, shift: !1 },
                        '^2': { key: 98, shift: !1 },
                        '^3': { key: 99, shift: !1 },
                        '^4': { key: 100, shift: !1 },
                        '^5': { key: 101, shift: !1 },
                        '^6': { key: 102, shift: !1 },
                        '^7': { key: 103, shift: !1 },
                        '^8': { key: 104, shift: !1 },
                        '^9': { key: 105, shift: !1 },
                        '^.': { key: 110, shift: !1 },
                        '^+': { key: 107, shift: !1 },
                        '^/': { key: 111, shift: !1 },
                        '^*': { key: 106, shift: !1 },
                        '^-': { key: 109, shift: !1 },
                        '^Enter': { key: 108, shift: !1 },
                        '^,': { key: 188, shift: !1 },
                      }),
                        (t.isWegameChrome = function () {
                          return !(!window.external || !window.external.callcpp);
                        }),
                        (t.isFullScreen = function () {
                          return !(!document.fullscreenElement && !document.webkitIsFullScreen);
                        }),
                        (t.isMobile = function () {
                          return !!(
                            /Android|iPhone|iPad|iOS/i.test(navigator.userAgent) ||
                            ('MacIntel' === navigator.platform && navigator.maxTouchPoints > 0)
                          );
                        }),
                        (t.isAndroid = function () {
                          var e, t;
                          return (
                            (null === (e = null === navigator || void 0 === navigator ? void 0 : navigator.userAgent) ||
                            void 0 === e
                              ? void 0
                              : e.includes('Android')) ||
                            (null === (t = null === navigator || void 0 === navigator ? void 0 : navigator.userAgent) ||
                            void 0 === t
                              ? void 0
                              : t.includes('Adr'))
                          );
                        }),
                        (t.checkBrowser = function () {
                          var e = navigator.userAgent.toLowerCase();
                          return /micromessenger/gi.test(e) ? 'wx' : /qq/gi.test(e) ? 'qq' : 'system';
                        }),
                        (t.sleep = function (e) {
                          return new Promise(function (t) {
                            setTimeout(t, e);
                          });
                        }),
                        (t.addZero = function (e, t) {
                          for (var n = 0, r = t - ''.concat(e).length; n < r; n++) e = '0'.concat(e);
                          return ''.concat(e);
                        }),
                        (t.formatTime = function (e, n) {
                          return n
                            .replace(/yyyy|YYYY/, e.getFullYear())
                            .replace(/yy|YY/, (0, t.addZero)(e.getFullYear() % 100, 2))
                            .replace(/mm|MM/, (0, t.addZero)(e.getMonth() + 1, 2))
                            .replace(/m|M/g, e.getMonth() + 1)
                            .replace(/dd|DD/, (0, t.addZero)(e.getDate(), 2))
                            .replace(/d|D/g, e.getDate())
                            .replace(/hh|HH/, (0, t.addZero)(e.getHours(), 2))
                            .replace(/h|H/g, e.getHours())
                            .replace(/ii|II/, (0, t.addZero)(e.getMinutes(), 2))
                            .replace(/i|I/g, e.getMinutes())
                            .replace(/ss|SS/, (0, t.addZero)(e.getSeconds(), 2))
                            .replace(/s|S/g, e.getSeconds())
                            .replace(/w/g, e.getDay())
                            .replace(/W/g, ['日', '一', '二', '三', '四', '五', '六'][e.getDay()]);
                        }),
                        (t.dispatchEvent = function (e) {
                          var t = e.name,
                            n = e.data,
                            r = new CustomEvent(t, { bubbles: !0, detail: n });
                          return window.dispatchEvent(r);
                        }),
                        (t.noop = function () {
                          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        }),
                        (t.getSearch = function () {
                          var e = {};
                          return (
                            window.location.search
                              .replace('?', '')
                              .split('&')
                              .forEach(function (t) {
                                var n = r(t.split('='), 2),
                                  o = n[0],
                                  i = n[1];
                                e[o] = i;
                              }),
                            e
                          );
                        }),
                        (t.checkProfileLevelId = function (e) {
                          void 0 === e && (e = '');
                          var t = [];
                          return (
                            e.split('\r\n').forEach(function (e) {
                              e.includes('profile-level-id') &&
                                ((e = e.split('profile-level-id').pop().slice(1)), t.push(e));
                            }),
                            s('available profile-level-ids: ', t.join(',')),
                            t
                          );
                        }),
                        (t.canReceiveH264 = function () {
                          var e = !1;
                          return (
                            null === RTCRtpReceiver || void 0 === RTCRtpReceiver
                              ? void 0
                              : RTCRtpReceiver.getCapabilities
                          )
                            ? (RTCRtpReceiver.getCapabilities('video').codecs.forEach(function (t) {
                                'video/H264' !== t.mimeType || (e = !0);
                              }),
                              e)
                            : (s('RTCRtpReceiver.getCapabilities is not a function'), !0);
                        }),
                        (t.is360 = function () {
                          var e = !1,
                            t = navigator.userAgent,
                            n = function (e, t) {
                              var n,
                                r,
                                i = navigator.mimeTypes;
                              try {
                                for (var a = o(i), s = a.next(); !s.done; s = a.next()) if (s.value[e] === t) return !0;
                              } catch (e) {
                                n = { error: e };
                              } finally {
                                try {
                                  s && !s.done && (r = a.return) && r.call(a);
                                } finally {
                                  if (n) throw n.error;
                                }
                              }
                              return !1;
                            },
                            r = {
                              360: t.indexOf('QihooBrowser') > -1 || t.indexOf('QHBrowser') > -1,
                              '360EE': t.indexOf('360EE') > -1,
                              '360SE': t.indexOf('360SE') > -1,
                              '2345Explorer':
                                t.indexOf('2345Explorer') > -1 ||
                                t.indexOf('Mb2345Browser') > -1 ||
                                t.indexOf('2345chrome') > -1,
                              Mobile: t.indexOf('Mobi') > -1 || t.indexOf('iPh') > -1 || t.indexOf('480') > -1,
                            };
                          if (window.chrome) {
                            var i = t.replace(/^.*Chrome\/([\d]+).*$/, '$1');
                            window.chrome.adblock2345 || window.chrome.common2345
                              ? (r['2345Explorer'] = !0)
                              : n('type', 'application/360softmgrplugin') ||
                                n('type', 'application/mozilla-npqihooquicklogin') ||
                                (i > 36 && window.showModalDialog)
                              ? (e = !0)
                              : i > 45 &&
                                !(e = n('type', 'application/vnd.chromium.remoting-viewer')) &&
                                i >= 69 &&
                                (e =
                                  n('type', 'application/hwepass2001.installepass2001') ||
                                  n('type', 'application/asx'));
                          }
                          return e;
                        }),
                        (t.getFixedDecimal = function (e, t) {
                          return void 0 === t && (t = 2), Math.floor(10 * e * t) / (10 * t);
                        }),
                        (t.getSequence = function () {
                          return +(+new Date() + Math.round(1e4 * Math.random()));
                        }),
                        (t.empty = {}),
                        (t.getVideoElement = function () {
                          return document.getElementById('video-stream');
                        }),
                        (t.getAudioElement = function () {
                          return document.getElementById('audio-stream');
                        }),
                        (t.getProgressBarElement = function () {
                          return document.querySelector('.progress-bar-container');
                        }),
                        (t.getCursorElement = function () {
                          return document.getElementById('cursor');
                        }),
                        (t.getCloudGamingContainerElement = function () {
                          return document.getElementById('cloud-gaming-container');
                        }),
                        (t.getGameMountPointElement = function () {
                          var e;
                          return document.getElementById(
                            null === (e = a.default.getInitOptions()) || void 0 === e ? void 0 : e.mount,
                          );
                        }),
                        (t.getQcloudStatElement = function () {
                          return document.querySelector('.qcloud-stat');
                        }),
                        (t.getQcloudSpeedElement = function () {
                          return document.querySelector('.qcloud-speed');
                        }),
                        (t.getRestartElement = function () {
                          return document.querySelector('.restart');
                        }),
                        (t.getFakeInput = function () {
                          return document.getElementById('fake-input');
                        }),
                        (t.createAudioAndAddTrack = function (e) {
                          var n = e.id,
                            r = e.source,
                            o = document.getElementById(n);
                          o ||
                            (((o = document.createElement('audio')).id = n),
                            (o.autoplay = !0),
                            (o.className = 'audio-stream'),
                            o.setAttribute('playsinline', 'true'),
                            o.setAttribute('webkit-playsinline', 'true'),
                            o.setAttribute('x5-playsinline', 'true')),
                            (o.srcObject = r),
                            (0, t.getCloudGamingContainerElement)().appendChild(o);
                        });
                    },
                    943: function (e) {
                      var t = {
                        utf8: {
                          stringToBytes: function (e) {
                            return t.bin.stringToBytes(unescape(encodeURIComponent(e)));
                          },
                          bytesToString: function (e) {
                            return decodeURIComponent(escape(t.bin.bytesToString(e)));
                          },
                        },
                        bin: {
                          stringToBytes: function (e) {
                            for (var t = [], n = 0; n < e.length; n++) t.push(255 & e.charCodeAt(n));
                            return t;
                          },
                          bytesToString: function (e) {
                            for (var t = [], n = 0; n < e.length; n++) t.push(String.fromCharCode(e[n]));
                            return t.join('');
                          },
                        },
                      };
                      e.exports = t;
                    },
                    9677: function (e) {
                      var t, n;
                      (t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                        (n = {
                          rotl: function (e, t) {
                            return (e << t) | (e >>> (32 - t));
                          },
                          rotr: function (e, t) {
                            return (e << (32 - t)) | (e >>> t);
                          },
                          endian: function (e) {
                            if (e.constructor == Number)
                              return (16711935 & n.rotl(e, 8)) | (4278255360 & n.rotl(e, 24));
                            for (var t = 0; t < e.length; t++) e[t] = n.endian(e[t]);
                            return e;
                          },
                          randomBytes: function (e) {
                            for (var t = []; e > 0; e--) t.push(Math.floor(256 * Math.random()));
                            return t;
                          },
                          bytesToWords: function (e) {
                            for (var t = [], n = 0, r = 0; n < e.length; n++, r += 8)
                              t[r >>> 5] |= e[n] << (24 - (r % 32));
                            return t;
                          },
                          wordsToBytes: function (e) {
                            for (var t = [], n = 0; n < 32 * e.length; n += 8)
                              t.push((e[n >>> 5] >>> (24 - (n % 32))) & 255);
                            return t;
                          },
                          bytesToHex: function (e) {
                            for (var t = [], n = 0; n < e.length; n++)
                              t.push((e[n] >>> 4).toString(16)), t.push((15 & e[n]).toString(16));
                            return t.join('');
                          },
                          hexToBytes: function (e) {
                            for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substr(n, 2), 16));
                            return t;
                          },
                          bytesToBase64: function (e) {
                            for (var n = [], r = 0; r < e.length; r += 3)
                              for (var o = (e[r] << 16) | (e[r + 1] << 8) | e[r + 2], i = 0; i < 4; i++)
                                8 * r + 6 * i <= 8 * e.length
                                  ? n.push(t.charAt((o >>> (6 * (3 - i))) & 63))
                                  : n.push('=');
                            return n.join('');
                          },
                          base64ToBytes: function (e) {
                            e = e.replace(/[^A-Z0-9+\/]/gi, '');
                            for (var n = [], r = 0, o = 0; r < e.length; o = ++r % 4)
                              0 != o &&
                                n.push(
                                  ((t.indexOf(e.charAt(r - 1)) & (Math.pow(2, -2 * o + 8) - 1)) << (2 * o)) |
                                    (t.indexOf(e.charAt(r)) >>> (6 - 2 * o)),
                                );
                            return n;
                          },
                        }),
                        (e.exports = n);
                    },
                    8112: function (e, t, n) {
                      var r;
                      e.exports =
                        ((r =
                          r ||
                          (function (e, t) {
                            var r;
                            if (
                              ('undefined' != typeof window && window.crypto && (r = window.crypto),
                              'undefined' != typeof self && self.crypto && (r = self.crypto),
                              'undefined' != typeof globalThis && globalThis.crypto && (r = globalThis.crypto),
                              !r && 'undefined' != typeof window && window.msCrypto && (r = window.msCrypto),
                              !r && void 0 !== n.g && n.g.crypto && (r = n.g.crypto),
                              !r)
                            )
                              try {
                                r = n(429);
                              } catch (e) {}
                            var o = function () {
                                if (r) {
                                  if ('function' == typeof r.getRandomValues)
                                    try {
                                      return r.getRandomValues(new Uint32Array(1))[0];
                                    } catch (e) {}
                                  if ('function' == typeof r.randomBytes)
                                    try {
                                      return r.randomBytes(4).readInt32LE();
                                    } catch (e) {}
                                }
                                throw new Error('Native crypto module could not be used to get secure random number.');
                              },
                              i =
                                Object.create ||
                                (function () {
                                  function e() {}
                                  return function (t) {
                                    var n;
                                    return (e.prototype = t), (n = new e()), (e.prototype = null), n;
                                  };
                                })(),
                              a = {},
                              s = (a.lib = {}),
                              c = (s.Base = {
                                extend: function (e) {
                                  var t = i(this);
                                  return (
                                    e && t.mixIn(e),
                                    (t.hasOwnProperty('init') && this.init !== t.init) ||
                                      (t.init = function () {
                                        t.$super.init.apply(this, arguments);
                                      }),
                                    (t.init.prototype = t),
                                    (t.$super = this),
                                    t
                                  );
                                },
                                create: function () {
                                  var e = this.extend();
                                  return e.init.apply(e, arguments), e;
                                },
                                init: function () {},
                                mixIn: function (e) {
                                  for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                                  e.hasOwnProperty('toString') && (this.toString = e.toString);
                                },
                                clone: function () {
                                  return this.init.prototype.extend(this);
                                },
                              }),
                              u = (s.WordArray = c.extend({
                                init: function (e, t) {
                                  (e = this.words = e || []), (this.sigBytes = null != t ? t : 4 * e.length);
                                },
                                toString: function (e) {
                                  return (e || d).stringify(this);
                                },
                                concat: function (e) {
                                  var t = this.words,
                                    n = e.words,
                                    r = this.sigBytes,
                                    o = e.sigBytes;
                                  if ((this.clamp(), r % 4))
                                    for (var i = 0; i < o; i++) {
                                      var a = (n[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                                      t[(r + i) >>> 2] |= a << (24 - ((r + i) % 4) * 8);
                                    }
                                  else for (var s = 0; s < o; s += 4) t[(r + s) >>> 2] = n[s >>> 2];
                                  return (this.sigBytes += o), this;
                                },
                                clamp: function () {
                                  var t = this.words,
                                    n = this.sigBytes;
                                  (t[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8)), (t.length = e.ceil(n / 4));
                                },
                                clone: function () {
                                  var e = c.clone.call(this);
                                  return (e.words = this.words.slice(0)), e;
                                },
                                random: function (e) {
                                  for (var t = [], n = 0; n < e; n += 4) t.push(o());
                                  return new u.init(t, e);
                                },
                              })),
                              l = (a.enc = {}),
                              d = (l.Hex = {
                                stringify: function (e) {
                                  for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {
                                    var i = (t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                                    r.push((i >>> 4).toString(16)), r.push((15 & i).toString(16));
                                  }
                                  return r.join('');
                                },
                                parse: function (e) {
                                  for (var t = e.length, n = [], r = 0; r < t; r += 2)
                                    n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << (24 - (r % 8) * 4);
                                  return new u.init(n, t / 2);
                                },
                              }),
                              p = (l.Latin1 = {
                                stringify: function (e) {
                                  for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {
                                    var i = (t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                                    r.push(String.fromCharCode(i));
                                  }
                                  return r.join('');
                                },
                                parse: function (e) {
                                  for (var t = e.length, n = [], r = 0; r < t; r++)
                                    n[r >>> 2] |= (255 & e.charCodeAt(r)) << (24 - (r % 4) * 8);
                                  return new u.init(n, t);
                                },
                              }),
                              f = (l.Utf8 = {
                                stringify: function (e) {
                                  try {
                                    return decodeURIComponent(escape(p.stringify(e)));
                                  } catch (e) {
                                    throw new Error('Malformed UTF-8 data');
                                  }
                                },
                                parse: function (e) {
                                  return p.parse(unescape(encodeURIComponent(e)));
                                },
                              }),
                              h = (s.BufferedBlockAlgorithm = c.extend({
                                reset: function () {
                                  (this._data = new u.init()), (this._nDataBytes = 0);
                                },
                                _append: function (e) {
                                  'string' == typeof e && (e = f.parse(e)),
                                    this._data.concat(e),
                                    (this._nDataBytes += e.sigBytes);
                                },
                                _process: function (t) {
                                  var n,
                                    r = this._data,
                                    o = r.words,
                                    i = r.sigBytes,
                                    a = this.blockSize,
                                    s = i / (4 * a),
                                    c = (s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0)) * a,
                                    l = e.min(4 * c, i);
                                  if (c) {
                                    for (var d = 0; d < c; d += a) this._doProcessBlock(o, d);
                                    (n = o.splice(0, c)), (r.sigBytes -= l);
                                  }
                                  return new u.init(n, l);
                                },
                                clone: function () {
                                  var e = c.clone.call(this);
                                  return (e._data = this._data.clone()), e;
                                },
                                _minBufferSize: 0,
                              })),
                              v =
                                ((s.Hasher = h.extend({
                                  cfg: c.extend(),
                                  init: function (e) {
                                    (this.cfg = this.cfg.extend(e)), this.reset();
                                  },
                                  reset: function () {
                                    h.reset.call(this), this._doReset();
                                  },
                                  update: function (e) {
                                    return this._append(e), this._process(), this;
                                  },
                                  finalize: function (e) {
                                    return e && this._append(e), this._doFinalize();
                                  },
                                  blockSize: 16,
                                  _createHelper: function (e) {
                                    return function (t, n) {
                                      return new e.init(n).finalize(t);
                                    };
                                  },
                                  _createHmacHelper: function (e) {
                                    return function (t, n) {
                                      return new v.HMAC.init(e, n).finalize(t);
                                    };
                                  },
                                })),
                                (a.algo = {}));
                            return a;
                          })(Math)),
                        r);
                    },
                    4652: function (e, t, n) {
                      var r;
                      e.exports = ((r = n(8112)), n(2232), n(3456), r.HmacSHA256);
                    },
                    3456: function (e, t, n) {
                      var r, o, i;
                      e.exports =
                        ((o = (r = n(8112)).lib.Base),
                        (i = r.enc.Utf8),
                        void (r.algo.HMAC = o.extend({
                          init: function (e, t) {
                            (e = this._hasher = new e.init()), 'string' == typeof t && (t = i.parse(t));
                            var n = e.blockSize,
                              r = 4 * n;
                            t.sigBytes > r && (t = e.finalize(t)), t.clamp();
                            for (
                              var o = (this._oKey = t.clone()),
                                a = (this._iKey = t.clone()),
                                s = o.words,
                                c = a.words,
                                u = 0;
                              u < n;
                              u++
                            )
                              (s[u] ^= 1549556828), (c[u] ^= 909522486);
                            (o.sigBytes = a.sigBytes = r), this.reset();
                          },
                          reset: function () {
                            var e = this._hasher;
                            e.reset(), e.update(this._iKey);
                          },
                          update: function (e) {
                            return this._hasher.update(e), this;
                          },
                          finalize: function (e) {
                            var t = this._hasher,
                              n = t.finalize(e);
                            return t.reset(), t.finalize(this._oKey.clone().concat(n));
                          },
                        })));
                    },
                    2232: function (e, t, n) {
                      var r;
                      e.exports =
                        ((r = n(8112)),
                        (function (e) {
                          var t = r,
                            n = t.lib,
                            o = n.WordArray,
                            i = n.Hasher,
                            a = t.algo,
                            s = [],
                            c = [];
                          !(function () {
                            function t(t) {
                              for (var n = e.sqrt(t), r = 2; r <= n; r++) if (!(t % r)) return !1;
                              return !0;
                            }
                            function n(e) {
                              return (4294967296 * (e - (0 | e))) | 0;
                            }
                            for (var r = 2, o = 0; o < 64; )
                              t(r) && (o < 8 && (s[o] = n(e.pow(r, 0.5))), (c[o] = n(e.pow(r, 1 / 3))), o++), r++;
                          })();
                          var u = [],
                            l = (a.SHA256 = i.extend({
                              _doReset: function () {
                                this._hash = new o.init(s.slice(0));
                              },
                              _doProcessBlock: function (e, t) {
                                for (
                                  var n = this._hash.words,
                                    r = n[0],
                                    o = n[1],
                                    i = n[2],
                                    a = n[3],
                                    s = n[4],
                                    l = n[5],
                                    d = n[6],
                                    p = n[7],
                                    f = 0;
                                  f < 64;
                                  f++
                                ) {
                                  if (f < 16) u[f] = 0 | e[t + f];
                                  else {
                                    var h = u[f - 15],
                                      v = ((h << 25) | (h >>> 7)) ^ ((h << 14) | (h >>> 18)) ^ (h >>> 3),
                                      m = u[f - 2],
                                      y = ((m << 15) | (m >>> 17)) ^ ((m << 13) | (m >>> 19)) ^ (m >>> 10);
                                    u[f] = v + u[f - 7] + y + u[f - 16];
                                  }
                                  var g = (r & o) ^ (r & i) ^ (o & i),
                                    b = ((r << 30) | (r >>> 2)) ^ ((r << 19) | (r >>> 13)) ^ ((r << 10) | (r >>> 22)),
                                    S =
                                      p +
                                      (((s << 26) | (s >>> 6)) ^ ((s << 21) | (s >>> 11)) ^ ((s << 7) | (s >>> 25))) +
                                      ((s & l) ^ (~s & d)) +
                                      c[f] +
                                      u[f];
                                  (p = d),
                                    (d = l),
                                    (l = s),
                                    (s = (a + S) | 0),
                                    (a = i),
                                    (i = o),
                                    (o = r),
                                    (r = (S + (b + g)) | 0);
                                }
                                (n[0] = (n[0] + r) | 0),
                                  (n[1] = (n[1] + o) | 0),
                                  (n[2] = (n[2] + i) | 0),
                                  (n[3] = (n[3] + a) | 0),
                                  (n[4] = (n[4] + s) | 0),
                                  (n[5] = (n[5] + l) | 0),
                                  (n[6] = (n[6] + d) | 0),
                                  (n[7] = (n[7] + p) | 0);
                              },
                              _doFinalize: function () {
                                var t = this._data,
                                  n = t.words,
                                  r = 8 * this._nDataBytes,
                                  o = 8 * t.sigBytes;
                                return (
                                  (n[o >>> 5] |= 128 << (24 - (o % 32))),
                                  (n[14 + (((o + 64) >>> 9) << 4)] = e.floor(r / 4294967296)),
                                  (n[15 + (((o + 64) >>> 9) << 4)] = r),
                                  (t.sigBytes = 4 * n.length),
                                  this._process(),
                                  this._hash
                                );
                              },
                              clone: function () {
                                var e = i.clone.call(this);
                                return (e._hash = this._hash.clone()), e;
                              },
                            }));
                          (t.SHA256 = i._createHelper(l)), (t.HmacSHA256 = i._createHmacHelper(l));
                        })(Math),
                        r.SHA256);
                    },
                    7408: function (e) {
                      e.exports = (function () {
                        var e = {
                            944: function (e) {
                              e.exports = (function () {
                                'use strict';
                                var e = {
                                    d: function (t, n) {
                                      for (var r in n)
                                        e.o(n, r) &&
                                          !e.o(t, r) &&
                                          Object.defineProperty(t, r, { enumerable: !0, get: n[r] });
                                    },
                                    o: function (e, t) {
                                      return Object.prototype.hasOwnProperty.call(e, t);
                                    },
                                  },
                                  t = {};
                                function n(e) {
                                  return (n =
                                    'function' == typeof Symbol && 'symbol' == c(Symbol.iterator)
                                      ? function (e) {
                                          return c(e);
                                        }
                                      : function (e) {
                                          return e &&
                                            'function' == typeof Symbol &&
                                            e.constructor === Symbol &&
                                            e !== Symbol.prototype
                                            ? 'symbol'
                                            : c(e);
                                        })(e);
                                }
                                function r(e, t) {
                                  var n = ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                                  if (!n) {
                                    if (Array.isArray(e) || (n = i(e)) || (t && e && 'number' == typeof e.length)) {
                                      n && (e = n);
                                      var r = 0,
                                        o = function () {};
                                      return {
                                        s: o,
                                        n: function () {
                                          return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
                                        },
                                        e: function (e) {
                                          throw e;
                                        },
                                        f: o,
                                      };
                                    }
                                    throw new TypeError(
                                      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                                    );
                                  }
                                  var a,
                                    s = !0,
                                    c = !1;
                                  return {
                                    s: function () {
                                      n = n.call(e);
                                    },
                                    n: function () {
                                      var e = n.next();
                                      return (s = e.done), e;
                                    },
                                    e: function (e) {
                                      (c = !0), (a = e);
                                    },
                                    f: function () {
                                      try {
                                        s || null == n.return || n.return();
                                      } finally {
                                        if (c) throw a;
                                      }
                                    },
                                  };
                                }
                                function o(e, t) {
                                  return (
                                    (function (e) {
                                      if (Array.isArray(e)) return e;
                                    })(e) ||
                                    (function (e, t) {
                                      var n =
                                        e && (('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator']);
                                      if (null != n) {
                                        var r,
                                          o,
                                          i = [],
                                          a = !0,
                                          s = !1;
                                        try {
                                          for (
                                            n = n.call(e);
                                            !(a = (r = n.next()).done) && (i.push(r.value), !t || i.length !== t);
                                            a = !0
                                          );
                                        } catch (e) {
                                          (s = !0), (o = e);
                                        } finally {
                                          try {
                                            a || null == n.return || n.return();
                                          } finally {
                                            if (s) throw o;
                                          }
                                        }
                                        return i;
                                      }
                                    })(e, t) ||
                                    i(e, t) ||
                                    (function () {
                                      throw new TypeError(
                                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                                      );
                                    })()
                                  );
                                }
                                function i(e, t) {
                                  if (e) {
                                    if ('string' == typeof e) return a(e, t);
                                    var n = Object.prototype.toString.call(e).slice(8, -1);
                                    return (
                                      'Object' === n && e.constructor && (n = e.constructor.name),
                                      'Map' === n || 'Set' === n
                                        ? Array.from(e)
                                        : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                                        ? a(e, t)
                                        : void 0
                                    );
                                  }
                                }
                                function a(e, t) {
                                  (null == t || t > e.length) && (t = e.length);
                                  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
                                  return r;
                                }
                                function s(e, t) {
                                  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                                }
                                e.d(t, {
                                  default: function () {
                                    return u;
                                  },
                                });
                                var u = (function () {
                                  function e() {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                                    s(this, e),
                                      (this.allowExtra = t),
                                      (this.defaults = new Map()),
                                      (this.types = new Map()),
                                      (this.optional = new Set()),
                                      (this.required = new Set());
                                  }
                                  var t;
                                  return (
                                    (t = [
                                      {
                                        key: 'setDefaults',
                                        value: function (e) {
                                          var t = this;
                                          return (
                                            Object.entries(e).forEach(function (e) {
                                              var n = o(e, 2),
                                                r = n[0],
                                                i = n[1];
                                              return t.defaults.set(r, i);
                                            }),
                                            this
                                          );
                                        },
                                      },
                                      {
                                        key: 'setTypes',
                                        value: function (e) {
                                          var t = this;
                                          return (
                                            Object.entries(e).forEach(function (e) {
                                              var n = o(e, 2),
                                                r = n[0],
                                                i = n[1];
                                              return t.types.set(r, i);
                                            }),
                                            this
                                          );
                                        },
                                      },
                                      {
                                        key: 'setOptional',
                                        value: function (e) {
                                          var t = this;
                                          return (
                                            e.forEach(function (e) {
                                              return t.optional.add(e);
                                            }),
                                            this
                                          );
                                        },
                                      },
                                      {
                                        key: 'setRequired',
                                        value: function (e) {
                                          var t = this;
                                          return (
                                            e.forEach(function (e) {
                                              return t.required.add(e);
                                            }),
                                            this
                                          );
                                        },
                                      },
                                      {
                                        key: 'resolve',
                                        value: function (e) {
                                          var t = Object.assign(this.getDefaults(), e);
                                          return this.validate(t), t;
                                        },
                                      },
                                      {
                                        key: 'getDefaults',
                                        value: function () {
                                          var e,
                                            t = {},
                                            n = r(this.defaults);
                                          try {
                                            for (n.s(); !(e = n.n()).done; ) {
                                              var i = o(e.value, 2),
                                                a = i[0],
                                                s = i[1];
                                              t[a] = s;
                                            }
                                          } catch (e) {
                                            n.e(e);
                                          } finally {
                                            n.f();
                                          }
                                          return t;
                                        },
                                      },
                                      {
                                        key: 'validate',
                                        value: function (e) {
                                          for (var t in e) {
                                            if (!this.optionExists(t))
                                              throw new Error('Unkown option "'.concat(t, '".'));
                                            this.checkType(t, e[t]);
                                          }
                                          var n,
                                            o = r(this.required.values());
                                          try {
                                            for (o.s(); !(n = o.n()).done; ) {
                                              var i = n.value;
                                              if (void 0 === e[i])
                                                throw new Error('Option "'.concat(i, '" is required.'));
                                            }
                                          } catch (e) {
                                            o.e(e);
                                          } finally {
                                            o.f();
                                          }
                                        },
                                      },
                                      {
                                        key: 'checkType',
                                        value: function (e, t) {
                                          if (this.types.has(e)) {
                                            var r = this.types.get(e),
                                              o = n(t);
                                            if (o !== r)
                                              throw new Error(
                                                'Wrong value for option "'
                                                  .concat(e, '". Expected type "')
                                                  .concat(r, '" but got "')
                                                  .concat(o, '".'),
                                              );
                                          }
                                        },
                                      },
                                      {
                                        key: 'optionExists',
                                        value: function (e) {
                                          return (
                                            !!this.allowExtra ||
                                            this.defaults.has(e) ||
                                            this.optional.has(e) ||
                                            this.required.has(e) ||
                                            this.types.has(e)
                                          );
                                        },
                                      },
                                    ]) &&
                                      (function (e, t) {
                                        for (var n = 0; n < t.length; n++) {
                                          var r = t[n];
                                          (r.enumerable = r.enumerable || !1),
                                            (r.configurable = !0),
                                            'value' in r && (r.writable = !0),
                                            Object.defineProperty(e, r.key, r);
                                        }
                                      })(e.prototype, t),
                                    e
                                  );
                                })();
                                return t.default;
                              })();
                            },
                            162: function (e) {
                              e.exports = (function () {
                                'use strict';
                                var e = {
                                    d: function (t, n) {
                                      for (var r in n)
                                        e.o(n, r) &&
                                          !e.o(t, r) &&
                                          Object.defineProperty(t, r, { enumerable: !0, get: n[r] });
                                    },
                                    o: function (e, t) {
                                      return Object.prototype.hasOwnProperty.call(e, t);
                                    },
                                  },
                                  t = {};
                                e.d(t, {
                                  default: function () {
                                    return n;
                                  },
                                });
                                var n = (function () {
                                  function e() {
                                    !(function (e, t) {
                                      if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                                    })(this, e),
                                      (this._events = {}),
                                      (this.on = this.addEventListener),
                                      (this.off = this.removeEventListener);
                                  }
                                  var t;
                                  return (
                                    (t = [
                                      {
                                        key: 'emit',
                                        value: function (e, t) {
                                          if (Object.prototype.hasOwnProperty.call(this._events, e))
                                            for (
                                              var n = this._events[e], r = { type: e, detail: t }, o = n.length, i = 0;
                                              i < o;
                                              i++
                                            )
                                              this.handle(n[i], r);
                                        },
                                      },
                                      {
                                        key: 'handle',
                                        value: function (e, t) {
                                          e(t);
                                        },
                                      },
                                      {
                                        key: 'addEventListener',
                                        value: function (e, t) {
                                          Object.prototype.hasOwnProperty.call(this._events, e) ||
                                            (this._events[e] = []),
                                            this._events[e].indexOf(t) < 0 && this._events[e].push(t);
                                        },
                                      },
                                      {
                                        key: 'removeEventListener',
                                        value: function (e, t) {
                                          if (Object.prototype.hasOwnProperty.call(this._events, e)) {
                                            var n = this._events[e],
                                              r = n.indexOf(t);
                                            r >= 0 && n.splice(r, 1), 0 === n.length && delete this._events[e];
                                          }
                                        },
                                      },
                                    ]) &&
                                      (function (e, t) {
                                        for (var n = 0; n < t.length; n++) {
                                          var r = t[n];
                                          (r.enumerable = r.enumerable || !1),
                                            (r.configurable = !0),
                                            'value' in r && (r.writable = !0),
                                            Object.defineProperty(e, r.key, r);
                                        }
                                      })(e.prototype, t),
                                    e
                                  );
                                })();
                                return t.default;
                              })();
                            },
                          },
                          t = {};
                        function n(r) {
                          var o = t[r];
                          if (void 0 !== o) return o.exports;
                          var i = (t[r] = { exports: {} });
                          return e[r].call(i.exports, i, i.exports, n), i.exports;
                        }
                        (n.n = function (e) {
                          var t =
                            e && e.__esModule
                              ? function () {
                                  return e.default;
                                }
                              : function () {
                                  return e;
                                };
                          return n.d(t, { a: t }), t;
                        }),
                          (n.d = function (e, t) {
                            for (var r in t)
                              n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
                          }),
                          (n.o = function (e, t) {
                            return Object.prototype.hasOwnProperty.call(e, t);
                          }),
                          (n.r = function (e) {
                            'undefined' != typeof Symbol &&
                              Symbol.toStringTag &&
                              Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                              Object.defineProperty(e, '__esModule', { value: !0 });
                          });
                        var r = {};
                        return (
                          (function () {
                            'use strict';
                            n.r(r),
                              n.d(r, {
                                GamepadHandler: function () {
                                  return h;
                                },
                                GamepadListener: function () {
                                  return w;
                                },
                              });
                            var e = n(162),
                              t = n.n(e),
                              o = n(944),
                              i = n.n(o);
                            function a(e) {
                              return (a =
                                'function' == typeof Symbol && 'symbol' == c(Symbol.iterator)
                                  ? function (e) {
                                      return c(e);
                                    }
                                  : function (e) {
                                      return e &&
                                        'function' == typeof Symbol &&
                                        e.constructor === Symbol &&
                                        e !== Symbol.prototype
                                        ? 'symbol'
                                        : c(e);
                                    })(e);
                            }
                            function s(e, t) {
                              if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                            }
                            function u(e, t) {
                              for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                (r.enumerable = r.enumerable || !1),
                                  (r.configurable = !0),
                                  'value' in r && (r.writable = !0),
                                  Object.defineProperty(e, r.key, r);
                              }
                            }
                            function l(e, t) {
                              return (l =
                                Object.setPrototypeOf ||
                                function (e, t) {
                                  return (e.__proto__ = t), e;
                                })(e, t);
                            }
                            function d(e, t) {
                              return !t || ('object' !== a(t) && 'function' != typeof t) ? p(e) : t;
                            }
                            function p(e) {
                              if (void 0 === e)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                              return e;
                            }
                            function f(e) {
                              return (f = Object.setPrototypeOf
                                ? Object.getPrototypeOf
                                : function (e) {
                                    return e.__proto__ || Object.getPrototypeOf(e);
                                  })(e);
                            }
                            var h = (function (e) {
                              !(function (e, t) {
                                if ('function' != typeof t && null !== t)
                                  throw new TypeError('Super expression must either be null or a function');
                                (e.prototype = Object.create(t && t.prototype, {
                                  constructor: { value: e, writable: !0, configurable: !0 },
                                })),
                                  t && l(e, t);
                              })(c, e);
                              var t,
                                n,
                                r,
                                o,
                                i,
                                a =
                                  ((o = c),
                                  (i = (function () {
                                    if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                                    if (Reflect.construct.sham) return !1;
                                    if ('function' == typeof Proxy) return !0;
                                    try {
                                      return (
                                        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})),
                                        !0
                                      );
                                    } catch (e) {
                                      return !1;
                                    }
                                  })()),
                                  function () {
                                    var e,
                                      t = f(o);
                                    if (i) {
                                      var n = f(this).constructor;
                                      e = Reflect.construct(t, arguments, n);
                                    } else e = t.apply(this, arguments);
                                    return d(this, e);
                                  });
                              function c(e, t) {
                                var n,
                                  r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                return (
                                  s(this, c),
                                  ((n = a.call(this)).index = e),
                                  (n.options = n.constructor.resolveOptions(r)),
                                  (n.sticks = new Array(t.axes.length / 2).fill(null).map(function () {
                                    return [null, null];
                                  })),
                                  (n.buttons = new Array(t.buttons.length).fill(null)),
                                  (n.updateStick = n.updateStick.bind(p(n))),
                                  (n.updateButton = n.updateButton.bind(p(n))),
                                  n
                                );
                              }
                              return (
                                (t = c),
                                (r = [
                                  {
                                    key: 'resolveOptions',
                                    value: function (e) {
                                      var t = void 0 !== e.stick,
                                        n = void 0 !== e.button,
                                        r = {
                                          stick: this.optionResolver.resolve(t ? e.stick : n ? {} : e),
                                          button: this.optionResolver.resolve(n ? e.button : t ? {} : e),
                                        };
                                      return (
                                        (r.stick.deadZone = Math.max(Math.min(r.stick.deadZone, 1), 0)),
                                        (r.button.deadZone = Math.max(Math.min(r.button.deadZone, 1), 0)),
                                        (r.stick.precision = r.stick.precision ? Math.pow(10, r.stick.precision) : 0),
                                        (r.button.precision = r.button.precision
                                          ? Math.pow(10, r.button.precision)
                                          : 0),
                                        r
                                      );
                                    },
                                  },
                                ]),
                                (n = [
                                  {
                                    key: 'update',
                                    value: function (e) {
                                      for (var t = 0, n = this.sticks.length, r = 0; r < n; r++)
                                        for (var o = 0; o < 2; o++) this.updateStick(e, r, o, e.axes[t++]);
                                      var i = this.buttons.length;
                                      for (t = 0; t < i; t++) this.updateButton(e, e.buttons[t], t);
                                    },
                                  },
                                  {
                                    key: 'updateStick',
                                    value: function (e, t, n, r) {
                                      var o = this.options.stick,
                                        i = o.deadZone,
                                        a = o.analog,
                                        s = o.precision;
                                      i && r < i && r > -i && (r = 0),
                                        a ? s && (r = Math.round(r * s) / s) : (r = r > 0 ? 1 : r < 0 ? -1 : 0),
                                        this.sticks[t][n] !== r &&
                                          ((this.sticks[t][n] = r),
                                          this.emit('axis', {
                                            gamepad: e,
                                            stick: t,
                                            axis: n,
                                            value: r,
                                            index: this.index,
                                          }));
                                    },
                                  },
                                  {
                                    key: 'updateButton',
                                    value: function (e, t, n) {
                                      var r = this.options.button,
                                        o = r.deadZone,
                                        i = r.analog,
                                        a = r.precision,
                                        s = t.value,
                                        c = t.pressed,
                                        u = s;
                                      o && t.value < o && t.value > -o && (u = 0),
                                        i ? a && (u = Math.round(u * a) / a) : (u = c ? 1 : 0),
                                        this.buttons[n] !== u &&
                                          ((this.buttons[n] = u),
                                          this.emit('button', {
                                            gamepad: e,
                                            button: n,
                                            pressed: c,
                                            value: u,
                                            index: this.index,
                                          }));
                                    },
                                  },
                                ]) && u(t.prototype, n),
                                r && u(t, r),
                                c
                              );
                            })(t());
                            h.optionResolver = new (i())()
                              .setDefaults({ analog: !0, deadZone: 0, precision: 0 })
                              .setTypes({ analog: 'boolean', deadZone: 'number', precision: 'number' });
                            var v = (function () {
                              function e(t) {
                                !(function (e, t) {
                                  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                                })(this, e),
                                  (this.callback = t),
                                  (this.frame = null),
                                  (this.update = this.update.bind(this));
                              }
                              var t;
                              return (
                                (t = [
                                  {
                                    key: 'setCallback',
                                    value: function (e) {
                                      this.callback = e;
                                    },
                                  },
                                  {
                                    key: 'start',
                                    value: function () {
                                      this.frame || (this.frame = window.requestAnimationFrame(this.update));
                                    },
                                  },
                                  {
                                    key: 'stop',
                                    value: function () {
                                      this.frame && (window.cancelAnimationFrame(this.frame), (this.frame = null));
                                    },
                                  },
                                  {
                                    key: 'update',
                                    value: function () {
                                      (this.frame = window.requestAnimationFrame(this.update)), this.callback();
                                    },
                                  },
                                ]) &&
                                  (function (e, t) {
                                    for (var n = 0; n < t.length; n++) {
                                      var r = t[n];
                                      (r.enumerable = r.enumerable || !1),
                                        (r.configurable = !0),
                                        'value' in r && (r.writable = !0),
                                        Object.defineProperty(e, r.key, r);
                                    }
                                  })(e.prototype, t),
                                e
                              );
                            })();
                            function m(e) {
                              return (m =
                                'function' == typeof Symbol && 'symbol' == c(Symbol.iterator)
                                  ? function (e) {
                                      return c(e);
                                    }
                                  : function (e) {
                                      return e &&
                                        'function' == typeof Symbol &&
                                        e.constructor === Symbol &&
                                        e !== Symbol.prototype
                                        ? 'symbol'
                                        : c(e);
                                    })(e);
                            }
                            function y(e, t) {
                              if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                            }
                            function g(e, t) {
                              return (g =
                                Object.setPrototypeOf ||
                                function (e, t) {
                                  return (e.__proto__ = t), e;
                                })(e, t);
                            }
                            function b(e, t) {
                              return !t || ('object' !== m(t) && 'function' != typeof t) ? S(e) : t;
                            }
                            function S(e) {
                              if (void 0 === e)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                              return e;
                            }
                            function C(e) {
                              return (C = Object.setPrototypeOf
                                ? Object.getPrototypeOf
                                : function (e) {
                                    return e.__proto__ || Object.getPrototypeOf(e);
                                  })(e);
                            }
                            var w = (function (e) {
                              !(function (e, t) {
                                if ('function' != typeof t && null !== t)
                                  throw new TypeError('Super expression must either be null or a function');
                                (e.prototype = Object.create(t && t.prototype, {
                                  constructor: { value: e, writable: !0, configurable: !0 },
                                })),
                                  t && g(e, t);
                              })(i, e);
                              var t,
                                n,
                                r,
                                o =
                                  ((n = i),
                                  (r = (function () {
                                    if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                                    if (Reflect.construct.sham) return !1;
                                    if ('function' == typeof Proxy) return !0;
                                    try {
                                      return (
                                        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})),
                                        !0
                                      );
                                    } catch (e) {
                                      return !1;
                                    }
                                  })()),
                                  function () {
                                    var e,
                                      t = C(n);
                                    if (r) {
                                      var o = C(this).constructor;
                                      e = Reflect.construct(t, arguments, o);
                                    } else e = t.apply(this, arguments);
                                    return b(this, e);
                                  });
                              function i() {
                                var e,
                                  t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                if ((y(this, i), (e = o.call(this)), 'function' != typeof navigator.getGamepads))
                                  throw new Error('This browser does not support gamepad API.');
                                return (
                                  (e.options = t),
                                  (e.onAxis = e.onAxis.bind(S(e))),
                                  (e.update = e.update.bind(S(e))),
                                  (e.start = e.start.bind(S(e))),
                                  (e.stop = e.stop.bind(S(e))),
                                  (e.discover = e.discover.bind(S(e))),
                                  (e.onButton = e.onButton.bind(S(e))),
                                  (e.handlers = new Array(4).fill(null)),
                                  (e.loop = new v(e.update)),
                                  window.addEventListener('error', e.stop),
                                  e
                                );
                              }
                              return (
                                (t = [
                                  {
                                    key: 'start',
                                    value: function () {
                                      this.loop.start();
                                    },
                                  },
                                  {
                                    key: 'stop',
                                    value: function () {
                                      this.loop.stop();
                                    },
                                  },
                                  {
                                    key: 'update',
                                    value: function () {
                                      var e = navigator.getGamepads();
                                      this.discover(e[0], 0),
                                        this.discover(e[1], 1),
                                        this.discover(e[2], 2),
                                        this.discover(e[3], 3);
                                    },
                                  },
                                  {
                                    key: 'discover',
                                    value: function (e, t) {
                                      e
                                        ? (this.handlers[t] || this.registerHandler(t, e), this.handlers[t].update(e))
                                        : this.handlers[t] && this.removeGamepad(t);
                                    },
                                  },
                                  {
                                    key: 'registerHandler',
                                    value: function (e, t) {
                                      if (this.handlers[e])
                                        throw new Error('Gamepad #'.concat(e, ' is already registered.'));
                                      var n = new h(e, t, this.options);
                                      (this.handlers[e] = n),
                                        n.addEventListener('axis', this.onAxis),
                                        n.addEventListener('button', this.onButton),
                                        this.emit('gamepad:connected', { index: e, gamepad: t }),
                                        this.emit('gamepad:'.concat(e, ':connected'), { index: e, gamepad: t });
                                    },
                                  },
                                  {
                                    key: 'removeGamepad',
                                    value: function (e) {
                                      if (!this.handlers[e])
                                        throw new Error('Gamepad #'.concat(e, ' is not registered.'));
                                      this.handlers[e].removeEventListener('axis', this.onAxis),
                                        this.handlers[e].removeEventListener('button', this.onButton),
                                        (this.handlers[e] = null),
                                        this.emit('gamepad:disconnected', { index: e }),
                                        this.emit('gamepad:'.concat(e, ':disconnected'), { index: e });
                                    },
                                  },
                                  {
                                    key: 'onAxis',
                                    value: function (e) {
                                      var t = e.detail.index;
                                      this.emit('gamepad:axis', e.detail),
                                        this.emit('gamepad:'.concat(t, ':axis'), e.detail),
                                        this.emit('gamepad:'.concat(t, ':axis:').concat(e.detail.axis), e.detail);
                                    },
                                  },
                                  {
                                    key: 'onButton',
                                    value: function (e) {
                                      var t = e.detail.index;
                                      this.emit('gamepad:button', e.detail),
                                        this.emit('gamepad:'.concat(t, ':button'), e.detail),
                                        this.emit('gamepad:'.concat(t, ':button:').concat(e.detail.button), e.detail);
                                    },
                                  },
                                ]) &&
                                  (function (e, t) {
                                    for (var n = 0; n < t.length; n++) {
                                      var r = t[n];
                                      (r.enumerable = r.enumerable || !1),
                                        (r.configurable = !0),
                                        'value' in r && (r.writable = !0),
                                        Object.defineProperty(e, r.key, r);
                                    }
                                  })(i.prototype, t),
                                i
                              );
                            })(t());
                          })(),
                          r
                        );
                      })();
                    },
                    8809: function (e) {
                      function t(e) {
                        return (
                          !!e.constructor && 'function' == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
                        );
                      }
                      e.exports = function (e) {
                        return (
                          null != e &&
                          (t(e) ||
                            (function (e) {
                              return (
                                'function' == typeof e.readFloatLE && 'function' == typeof e.slice && t(e.slice(0, 0))
                              );
                            })(e) ||
                            !!e._isBuffer)
                        );
                      };
                    },
                    3578: function (e, t, n) {
                      'undefined' != typeof self ? self : 'undefined' != typeof window ? window : void 0 !== n.g && n.g,
                        (e.exports = (function () {
                          'use strict';
                          var e,
                            t = 'function' == typeof atob,
                            n = 'function' == typeof btoa,
                            r = 'function' == typeof Buffer,
                            o = 'function' == typeof TextDecoder ? new TextDecoder() : void 0,
                            i = 'function' == typeof TextEncoder ? new TextEncoder() : void 0,
                            a = Array.prototype.slice.call(
                              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
                            ),
                            s =
                              ((e = {}),
                              a.forEach(function (t, n) {
                                return (e[t] = n);
                              }),
                              e),
                            c = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,
                            u = String.fromCharCode.bind(String),
                            l =
                              'function' == typeof Uint8Array.from
                                ? Uint8Array.from.bind(Uint8Array)
                                : function (e, t) {
                                    return (
                                      void 0 === t &&
                                        (t = function (e) {
                                          return e;
                                        }),
                                      new Uint8Array(Array.prototype.slice.call(e, 0).map(t))
                                    );
                                  },
                            d = function (e) {
                              return e.replace(/=/g, '').replace(/[+\/]/g, function (e) {
                                return '+' == e ? '-' : '_';
                              });
                            },
                            p = function (e) {
                              return e.replace(/[^A-Za-z0-9\+\/]/g, '');
                            },
                            f = function (e) {
                              for (var t, n, r, o, i = '', s = e.length % 3, c = 0; c < e.length; ) {
                                if (
                                  (n = e.charCodeAt(c++)) > 255 ||
                                  (r = e.charCodeAt(c++)) > 255 ||
                                  (o = e.charCodeAt(c++)) > 255
                                )
                                  throw new TypeError('invalid character found');
                                i +=
                                  a[((t = (n << 16) | (r << 8) | o) >> 18) & 63] +
                                  a[(t >> 12) & 63] +
                                  a[(t >> 6) & 63] +
                                  a[63 & t];
                              }
                              return s ? i.slice(0, s - 3) + '==='.substring(s) : i;
                            },
                            h = n
                              ? function (e) {
                                  return btoa(e);
                                }
                              : r
                              ? function (e) {
                                  return Buffer.from(e, 'binary').toString('base64');
                                }
                              : f,
                            v = r
                              ? function (e) {
                                  return Buffer.from(e).toString('base64');
                                }
                              : function (e) {
                                  for (var t = [], n = 0, r = e.length; n < r; n += 4096)
                                    t.push(u.apply(null, e.subarray(n, n + 4096)));
                                  return h(t.join(''));
                                },
                            m = function (e, t) {
                              return void 0 === t && (t = !1), t ? d(v(e)) : v(e);
                            },
                            y = function (e) {
                              if (e.length < 2)
                                return (t = e.charCodeAt(0)) < 128
                                  ? e
                                  : t < 2048
                                  ? u(192 | (t >>> 6)) + u(128 | (63 & t))
                                  : u(224 | ((t >>> 12) & 15)) + u(128 | ((t >>> 6) & 63)) + u(128 | (63 & t));
                              var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
                              return (
                                u(240 | ((t >>> 18) & 7)) +
                                u(128 | ((t >>> 12) & 63)) +
                                u(128 | ((t >>> 6) & 63)) +
                                u(128 | (63 & t))
                              );
                            },
                            g = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
                            b = function (e) {
                              return e.replace(g, y);
                            },
                            S = r
                              ? function (e) {
                                  return Buffer.from(e, 'utf8').toString('base64');
                                }
                              : i
                              ? function (e) {
                                  return v(i.encode(e));
                                }
                              : function (e) {
                                  return h(b(e));
                                },
                            C = function (e, t) {
                              return void 0 === t && (t = !1), t ? d(S(e)) : S(e);
                            },
                            w = function (e) {
                              return C(e, !0);
                            },
                            E = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,
                            _ = function (e) {
                              switch (e.length) {
                                case 4:
                                  var t =
                                    (((7 & e.charCodeAt(0)) << 18) |
                                      ((63 & e.charCodeAt(1)) << 12) |
                                      ((63 & e.charCodeAt(2)) << 6) |
                                      (63 & e.charCodeAt(3))) -
                                    65536;
                                  return u(55296 + (t >>> 10)) + u(56320 + (1023 & t));
                                case 3:
                                  return u(
                                    ((15 & e.charCodeAt(0)) << 12) |
                                      ((63 & e.charCodeAt(1)) << 6) |
                                      (63 & e.charCodeAt(2)),
                                  );
                                default:
                                  return u(((31 & e.charCodeAt(0)) << 6) | (63 & e.charCodeAt(1)));
                              }
                            },
                            T = function (e) {
                              return e.replace(E, _);
                            },
                            k = function (e) {
                              if (((e = e.replace(/\s+/g, '')), !c.test(e))) throw new TypeError('malformed base64.');
                              e += '=='.slice(2 - (3 & e.length));
                              for (var t, n, r, o = '', i = 0; i < e.length; )
                                (t =
                                  (s[e.charAt(i++)] << 18) |
                                  (s[e.charAt(i++)] << 12) |
                                  ((n = s[e.charAt(i++)]) << 6) |
                                  (r = s[e.charAt(i++)])),
                                  (o +=
                                    64 === n
                                      ? u((t >> 16) & 255)
                                      : 64 === r
                                      ? u((t >> 16) & 255, (t >> 8) & 255)
                                      : u((t >> 16) & 255, (t >> 8) & 255, 255 & t));
                              return o;
                            },
                            R = t
                              ? function (e) {
                                  return atob(p(e));
                                }
                              : r
                              ? function (e) {
                                  return Buffer.from(e, 'base64').toString('binary');
                                }
                              : k,
                            x = r
                              ? function (e) {
                                  return l(Buffer.from(e, 'base64'));
                                }
                              : function (e) {
                                  return l(R(e), function (e) {
                                    return e.charCodeAt(0);
                                  });
                                },
                            O = function (e) {
                              return x(D(e));
                            },
                            P = r
                              ? function (e) {
                                  return Buffer.from(e, 'base64').toString('utf8');
                                }
                              : o
                              ? function (e) {
                                  return o.decode(x(e));
                                }
                              : function (e) {
                                  return T(R(e));
                                },
                            D = function (e) {
                              return p(
                                e.replace(/[-_]/g, function (e) {
                                  return '-' == e ? '+' : '/';
                                }),
                              );
                            },
                            M = function (e) {
                              return P(D(e));
                            },
                            A = function (e) {
                              return { value: e, enumerable: !1, writable: !0, configurable: !0 };
                            },
                            I = function () {
                              var e = function (e, t) {
                                return Object.defineProperty(String.prototype, e, A(t));
                              };
                              e('fromBase64', function () {
                                return M(this);
                              }),
                                e('toBase64', function (e) {
                                  return C(this, e);
                                }),
                                e('toBase64URI', function () {
                                  return C(this, !0);
                                }),
                                e('toBase64URL', function () {
                                  return C(this, !0);
                                }),
                                e('toUint8Array', function () {
                                  return O(this);
                                });
                            },
                            j = function () {
                              var e = function (e, t) {
                                return Object.defineProperty(Uint8Array.prototype, e, A(t));
                              };
                              e('toBase64', function (e) {
                                return m(this, e);
                              }),
                                e('toBase64URI', function () {
                                  return m(this, !0);
                                }),
                                e('toBase64URL', function () {
                                  return m(this, !0);
                                });
                            },
                            L = {
                              version: '3.7.2',
                              VERSION: '3.7.2',
                              atob: R,
                              atobPolyfill: k,
                              btoa: h,
                              btoaPolyfill: f,
                              fromBase64: M,
                              toBase64: C,
                              encode: C,
                              encodeURI: w,
                              encodeURL: w,
                              utob: b,
                              btou: T,
                              decode: M,
                              isValid: function (e) {
                                if ('string' != typeof e) return !1;
                                var t = e.replace(/\s+/g, '').replace(/={0,2}$/, '');
                                return !/[^\s0-9a-zA-Z\+/]/.test(t) || !/[^\s0-9a-zA-Z\-_]/.test(t);
                              },
                              fromUint8Array: m,
                              toUint8Array: O,
                              extendString: I,
                              extendUint8Array: j,
                              extendBuiltins: function () {
                                I(), j();
                              },
                              Base64: {},
                            };
                          return (
                            Object.keys(L).forEach(function (e) {
                              return (L.Base64[e] = L[e]);
                            }),
                            L
                          );
                        })());
                    },
                    1586: function (e, t, n) {
                      var r, o, i, a, s;
                      (r = n(9677)),
                        (o = n(943).utf8),
                        (i = n(8809)),
                        (a = n(943).bin),
                        ((s = function (e, t) {
                          e.constructor == String
                            ? (e = t && 'binary' === t.encoding ? a.stringToBytes(e) : o.stringToBytes(e))
                            : i(e)
                            ? (e = Array.prototype.slice.call(e, 0))
                            : Array.isArray(e) || e.constructor === Uint8Array || (e = e.toString());
                          for (
                            var n = r.bytesToWords(e),
                              c = 8 * e.length,
                              u = 1732584193,
                              l = -271733879,
                              d = -1732584194,
                              p = 271733878,
                              f = 0;
                            f < n.length;
                            f++
                          )
                            n[f] =
                              (16711935 & ((n[f] << 8) | (n[f] >>> 24))) | (4278255360 & ((n[f] << 24) | (n[f] >>> 8)));
                          (n[c >>> 5] |= 128 << c % 32), (n[14 + (((c + 64) >>> 9) << 4)] = c);
                          var h = s._ff,
                            v = s._gg,
                            m = s._hh,
                            y = s._ii;
                          for (f = 0; f < n.length; f += 16) {
                            var g = u,
                              b = l,
                              S = d,
                              C = p;
                            (u = h(u, l, d, p, n[f + 0], 7, -680876936)),
                              (p = h(p, u, l, d, n[f + 1], 12, -389564586)),
                              (d = h(d, p, u, l, n[f + 2], 17, 606105819)),
                              (l = h(l, d, p, u, n[f + 3], 22, -1044525330)),
                              (u = h(u, l, d, p, n[f + 4], 7, -176418897)),
                              (p = h(p, u, l, d, n[f + 5], 12, 1200080426)),
                              (d = h(d, p, u, l, n[f + 6], 17, -1473231341)),
                              (l = h(l, d, p, u, n[f + 7], 22, -45705983)),
                              (u = h(u, l, d, p, n[f + 8], 7, 1770035416)),
                              (p = h(p, u, l, d, n[f + 9], 12, -1958414417)),
                              (d = h(d, p, u, l, n[f + 10], 17, -42063)),
                              (l = h(l, d, p, u, n[f + 11], 22, -1990404162)),
                              (u = h(u, l, d, p, n[f + 12], 7, 1804603682)),
                              (p = h(p, u, l, d, n[f + 13], 12, -40341101)),
                              (d = h(d, p, u, l, n[f + 14], 17, -1502002290)),
                              (u = v(u, (l = h(l, d, p, u, n[f + 15], 22, 1236535329)), d, p, n[f + 1], 5, -165796510)),
                              (p = v(p, u, l, d, n[f + 6], 9, -1069501632)),
                              (d = v(d, p, u, l, n[f + 11], 14, 643717713)),
                              (l = v(l, d, p, u, n[f + 0], 20, -373897302)),
                              (u = v(u, l, d, p, n[f + 5], 5, -701558691)),
                              (p = v(p, u, l, d, n[f + 10], 9, 38016083)),
                              (d = v(d, p, u, l, n[f + 15], 14, -660478335)),
                              (l = v(l, d, p, u, n[f + 4], 20, -405537848)),
                              (u = v(u, l, d, p, n[f + 9], 5, 568446438)),
                              (p = v(p, u, l, d, n[f + 14], 9, -1019803690)),
                              (d = v(d, p, u, l, n[f + 3], 14, -187363961)),
                              (l = v(l, d, p, u, n[f + 8], 20, 1163531501)),
                              (u = v(u, l, d, p, n[f + 13], 5, -1444681467)),
                              (p = v(p, u, l, d, n[f + 2], 9, -51403784)),
                              (d = v(d, p, u, l, n[f + 7], 14, 1735328473)),
                              (u = m(u, (l = v(l, d, p, u, n[f + 12], 20, -1926607734)), d, p, n[f + 5], 4, -378558)),
                              (p = m(p, u, l, d, n[f + 8], 11, -2022574463)),
                              (d = m(d, p, u, l, n[f + 11], 16, 1839030562)),
                              (l = m(l, d, p, u, n[f + 14], 23, -35309556)),
                              (u = m(u, l, d, p, n[f + 1], 4, -1530992060)),
                              (p = m(p, u, l, d, n[f + 4], 11, 1272893353)),
                              (d = m(d, p, u, l, n[f + 7], 16, -155497632)),
                              (l = m(l, d, p, u, n[f + 10], 23, -1094730640)),
                              (u = m(u, l, d, p, n[f + 13], 4, 681279174)),
                              (p = m(p, u, l, d, n[f + 0], 11, -358537222)),
                              (d = m(d, p, u, l, n[f + 3], 16, -722521979)),
                              (l = m(l, d, p, u, n[f + 6], 23, 76029189)),
                              (u = m(u, l, d, p, n[f + 9], 4, -640364487)),
                              (p = m(p, u, l, d, n[f + 12], 11, -421815835)),
                              (d = m(d, p, u, l, n[f + 15], 16, 530742520)),
                              (u = y(u, (l = m(l, d, p, u, n[f + 2], 23, -995338651)), d, p, n[f + 0], 6, -198630844)),
                              (p = y(p, u, l, d, n[f + 7], 10, 1126891415)),
                              (d = y(d, p, u, l, n[f + 14], 15, -1416354905)),
                              (l = y(l, d, p, u, n[f + 5], 21, -57434055)),
                              (u = y(u, l, d, p, n[f + 12], 6, 1700485571)),
                              (p = y(p, u, l, d, n[f + 3], 10, -1894986606)),
                              (d = y(d, p, u, l, n[f + 10], 15, -1051523)),
                              (l = y(l, d, p, u, n[f + 1], 21, -2054922799)),
                              (u = y(u, l, d, p, n[f + 8], 6, 1873313359)),
                              (p = y(p, u, l, d, n[f + 15], 10, -30611744)),
                              (d = y(d, p, u, l, n[f + 6], 15, -1560198380)),
                              (l = y(l, d, p, u, n[f + 13], 21, 1309151649)),
                              (u = y(u, l, d, p, n[f + 4], 6, -145523070)),
                              (p = y(p, u, l, d, n[f + 11], 10, -1120210379)),
                              (d = y(d, p, u, l, n[f + 2], 15, 718787259)),
                              (l = y(l, d, p, u, n[f + 9], 21, -343485551)),
                              (u = (u + g) >>> 0),
                              (l = (l + b) >>> 0),
                              (d = (d + S) >>> 0),
                              (p = (p + C) >>> 0);
                          }
                          return r.endian([u, l, d, p]);
                        })._ff = function (e, t, n, r, o, i, a) {
                          var s = e + ((t & n) | (~t & r)) + (o >>> 0) + a;
                          return ((s << i) | (s >>> (32 - i))) + t;
                        }),
                        (s._gg = function (e, t, n, r, o, i, a) {
                          var s = e + ((t & r) | (n & ~r)) + (o >>> 0) + a;
                          return ((s << i) | (s >>> (32 - i))) + t;
                        }),
                        (s._hh = function (e, t, n, r, o, i, a) {
                          var s = e + (t ^ n ^ r) + (o >>> 0) + a;
                          return ((s << i) | (s >>> (32 - i))) + t;
                        }),
                        (s._ii = function (e, t, n, r, o, i, a) {
                          var s = e + (n ^ (t | ~r)) + (o >>> 0) + a;
                          return ((s << i) | (s >>> (32 - i))) + t;
                        }),
                        (s._blocksize = 16),
                        (s._digestsize = 16),
                        (e.exports = function (e, t) {
                          if (null == e) throw new Error('Illegal argument ' + e);
                          var n = r.wordsToBytes(s(e, t));
                          return t && t.asBytes ? n : t && t.asString ? a.bytesToString(n) : r.bytesToHex(n);
                        });
                    },
                    7023: function (e, t, n) {
                      var r;
                      (e = n.nmd(e)),
                        function () {
                          'use strict';
                          var o = { function: !0, object: !0 },
                            i = (o['undefined' == typeof window ? 'undefined' : c(window)] && window) || this,
                            a = o[c(t)] && t,
                            s = o.object && e && !e.nodeType && e,
                            u = a && s && 'object' == c(n.g) && n.g;
                          !u || (u.global !== u && u.window !== u && u.self !== u) || (i = u);
                          var l = Math.pow(2, 53) - 1,
                            d = /\bOpera/,
                            p = Object.prototype,
                            f = p.hasOwnProperty,
                            h = p.toString;
                          function v(e) {
                            return (e = String(e)).charAt(0).toUpperCase() + e.slice(1);
                          }
                          function m(e) {
                            return (e = C(e)), /^(?:webOS|i(?:OS|P))/.test(e) ? e : v(e);
                          }
                          function y(e, t) {
                            for (var n in e) f.call(e, n) && t(e[n], n, e);
                          }
                          function g(e) {
                            return null == e ? v(e) : h.call(e).slice(8, -1);
                          }
                          function b(e) {
                            return String(e).replace(/([ -])(?!$)/g, '$1?');
                          }
                          function S(e, t) {
                            var n = null;
                            return (
                              (function (e, t) {
                                var n = -1,
                                  r = e ? e.length : 0;
                                if ('number' == typeof r && r > -1 && r <= l) for (; ++n < r; ) t(e[n], n);
                                else y(e, t);
                              })(e, function (r, o) {
                                n = t(n, r, o, e);
                              }),
                              n
                            );
                          }
                          function C(e) {
                            return String(e).replace(/^ +| +$/g, '');
                          }
                          var w = (function e(t) {
                            var n = i,
                              r = t && 'object' == c(t) && 'String' != g(t);
                            r && ((n = t), (t = null));
                            var o = n.navigator || {},
                              a = o.userAgent || '';
                            t || (t = a);
                            var s,
                              u,
                              l,
                              p,
                              f = r ? !!o.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(h.toString()),
                              v = 'Object',
                              w = r ? v : 'ScriptBridgingProxyObject',
                              E = r ? v : 'Environment',
                              _ = r && n.java ? 'JavaPackage' : g(n.java),
                              T = r ? v : 'RuntimeObject',
                              k = /\bJava/.test(_) && n.java,
                              R = k && g(n.environment) == E,
                              x = k ? 'a' : 'α',
                              O = k ? 'b' : 'β',
                              P = n.document || {},
                              D = n.operamini || n.opera,
                              M = d.test((M = r && D ? D['[[Class]]'] : g(D))) ? M : (D = null),
                              A = t,
                              I = [],
                              j = null,
                              L = t == a,
                              N = L && D && 'function' == typeof D.version && D.version(),
                              F = S(
                                [
                                  { label: 'EdgeHTML', pattern: 'Edge' },
                                  'Trident',
                                  { label: 'WebKit', pattern: 'AppleWebKit' },
                                  'iCab',
                                  'Presto',
                                  'NetFront',
                                  'Tasman',
                                  'KHTML',
                                  'Gecko',
                                ],
                                function (e, n) {
                                  return (
                                    e || (RegExp('\\b' + (n.pattern || b(n)) + '\\b', 'i').exec(t) && (n.label || n))
                                  );
                                },
                              ),
                              B = S(
                                [
                                  'Adobe AIR',
                                  'Arora',
                                  'Avant Browser',
                                  'Breach',
                                  'Camino',
                                  'Electron',
                                  'Epiphany',
                                  'Fennec',
                                  'Flock',
                                  'Galeon',
                                  'GreenBrowser',
                                  'iCab',
                                  'Iceweasel',
                                  'K-Meleon',
                                  'Konqueror',
                                  'Lunascape',
                                  'Maxthon',
                                  { label: 'Microsoft Edge', pattern: '(?:Edge|Edg|EdgA|EdgiOS)' },
                                  'Midori',
                                  'Nook Browser',
                                  'PaleMoon',
                                  'PhantomJS',
                                  'Raven',
                                  'Rekonq',
                                  'RockMelt',
                                  { label: 'Samsung Internet', pattern: 'SamsungBrowser' },
                                  'SeaMonkey',
                                  { label: 'Silk', pattern: '(?:Cloud9|Silk-Accelerated)' },
                                  'Sleipnir',
                                  'SlimBrowser',
                                  { label: 'SRWare Iron', pattern: 'Iron' },
                                  'Sunrise',
                                  'Swiftfox',
                                  'Vivaldi',
                                  'Waterfox',
                                  'WebPositive',
                                  { label: 'Yandex Browser', pattern: 'YaBrowser' },
                                  { label: 'UC Browser', pattern: 'UCBrowser' },
                                  'Opera Mini',
                                  { label: 'Opera Mini', pattern: 'OPiOS' },
                                  'Opera',
                                  { label: 'Opera', pattern: 'OPR' },
                                  'Chromium',
                                  'Chrome',
                                  { label: 'Chrome', pattern: '(?:HeadlessChrome)' },
                                  { label: 'Chrome Mobile', pattern: '(?:CriOS|CrMo)' },
                                  { label: 'Firefox', pattern: '(?:Firefox|Minefield)' },
                                  { label: 'Firefox for iOS', pattern: 'FxiOS' },
                                  { label: 'IE', pattern: 'IEMobile' },
                                  { label: 'IE', pattern: 'MSIE' },
                                  'Safari',
                                ],
                                function (e, n) {
                                  return (
                                    e || (RegExp('\\b' + (n.pattern || b(n)) + '\\b', 'i').exec(t) && (n.label || n))
                                  );
                                },
                              ),
                              U = W([
                                { label: 'BlackBerry', pattern: 'BB10' },
                                'BlackBerry',
                                { label: 'Galaxy S', pattern: 'GT-I9000' },
                                { label: 'Galaxy S2', pattern: 'GT-I9100' },
                                { label: 'Galaxy S3', pattern: 'GT-I9300' },
                                { label: 'Galaxy S4', pattern: 'GT-I9500' },
                                { label: 'Galaxy S5', pattern: 'SM-G900' },
                                { label: 'Galaxy S6', pattern: 'SM-G920' },
                                { label: 'Galaxy S6 Edge', pattern: 'SM-G925' },
                                { label: 'Galaxy S7', pattern: 'SM-G930' },
                                { label: 'Galaxy S7 Edge', pattern: 'SM-G935' },
                                'Google TV',
                                'Lumia',
                                'iPad',
                                'iPod',
                                'iPhone',
                                'Kindle',
                                { label: 'Kindle Fire', pattern: '(?:Cloud9|Silk-Accelerated)' },
                                'Nexus',
                                'Nook',
                                'PlayBook',
                                'PlayStation Vita',
                                'PlayStation',
                                'TouchPad',
                                'Transformer',
                                { label: 'Wii U', pattern: 'WiiU' },
                                'Wii',
                                'Xbox One',
                                { label: 'Xbox 360', pattern: 'Xbox' },
                                'Xoom',
                              ]),
                              G = S(
                                {
                                  Apple: { iPad: 1, iPhone: 1, iPod: 1 },
                                  Alcatel: {},
                                  Archos: {},
                                  Amazon: { Kindle: 1, 'Kindle Fire': 1 },
                                  Asus: { Transformer: 1 },
                                  'Barnes & Noble': { Nook: 1 },
                                  BlackBerry: { PlayBook: 1 },
                                  Google: { 'Google TV': 1, Nexus: 1 },
                                  HP: { TouchPad: 1 },
                                  HTC: {},
                                  Huawei: {},
                                  Lenovo: {},
                                  LG: {},
                                  Microsoft: { Xbox: 1, 'Xbox One': 1 },
                                  Motorola: { Xoom: 1 },
                                  Nintendo: { 'Wii U': 1, Wii: 1 },
                                  Nokia: { Lumia: 1 },
                                  Oppo: {},
                                  Samsung: { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
                                  Sony: { PlayStation: 1, 'PlayStation Vita': 1 },
                                  Xiaomi: { Mi: 1, Redmi: 1 },
                                },
                                function (e, n, r) {
                                  return (
                                    e ||
                                    ((n[U] ||
                                      n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(U)] ||
                                      RegExp('\\b' + b(r) + '(?:\\b|\\w*\\d)', 'i').exec(t)) &&
                                      r)
                                  );
                                },
                              ),
                              H = S(
                                [
                                  'Windows Phone',
                                  'KaiOS',
                                  'Android',
                                  'CentOS',
                                  { label: 'Chrome OS', pattern: 'CrOS' },
                                  'Debian',
                                  { label: 'DragonFly BSD', pattern: 'DragonFly' },
                                  'Fedora',
                                  'FreeBSD',
                                  'Gentoo',
                                  'Haiku',
                                  'Kubuntu',
                                  'Linux Mint',
                                  'OpenBSD',
                                  'Red Hat',
                                  'SuSE',
                                  'Ubuntu',
                                  'Xubuntu',
                                  'Cygwin',
                                  'Symbian OS',
                                  'hpwOS',
                                  'webOS ',
                                  'webOS',
                                  'Tablet OS',
                                  'Tizen',
                                  'Linux',
                                  'Mac OS X',
                                  'Macintosh',
                                  'Mac',
                                  'Windows 98;',
                                  'Windows ',
                                ],
                                function (e, n) {
                                  var r = n.pattern || b(n);
                                  return (
                                    !e &&
                                      (e = RegExp('\\b' + r + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(t)) &&
                                      (e = (function (e, t, n) {
                                        var r = {
                                          '10.0': '10',
                                          6.4: '10 Technical Preview',
                                          6.3: '8.1',
                                          6.2: '8',
                                          6.1: 'Server 2008 R2 / 7',
                                          '6.0': 'Server 2008 / Vista',
                                          5.2: 'Server 2003 / XP 64-bit',
                                          5.1: 'XP',
                                          5.01: '2000 SP1',
                                          '5.0': '2000',
                                          '4.0': 'NT',
                                          '4.90': 'ME',
                                        };
                                        return (
                                          t &&
                                            n &&
                                            /^Win/i.test(e) &&
                                            !/^Windows Phone /i.test(e) &&
                                            (r = r[/[\d.]+$/.exec(e)]) &&
                                            (e = 'Windows ' + r),
                                          (e = String(e)),
                                          t && n && (e = e.replace(RegExp(t, 'i'), n)),
                                          m(
                                            e
                                              .replace(/ ce$/i, ' CE')
                                              .replace(/\bhpw/i, 'web')
                                              .replace(/\bMacintosh\b/, 'Mac OS')
                                              .replace(/_PowerPC\b/i, ' OS')
                                              .replace(/\b(OS X) [^ \d]+/i, '$1')
                                              .replace(/\bMac (OS X)\b/, '$1')
                                              .replace(/\/(\d)/, ' $1')
                                              .replace(/_/g, '.')
                                              .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
                                              .replace(/\bx86\.64\b/gi, 'x86_64')
                                              .replace(/\b(Windows Phone) OS\b/, '$1')
                                              .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
                                              .split(' on ')[0],
                                          )
                                        );
                                      })(e, r, n.label || n)),
                                    e
                                  );
                                },
                              );
                            function W(e) {
                              return S(e, function (e, n) {
                                var r = n.pattern || b(n);
                                return (
                                  !e &&
                                    (e =
                                      RegExp('\\b' + r + ' *\\d+[.\\w_]*', 'i').exec(t) ||
                                      RegExp('\\b' + r + ' *\\w+-[\\w]*', 'i').exec(t) ||
                                      RegExp('\\b' + r + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(t)) &&
                                    ((e = String(n.label && !RegExp(r, 'i').test(n.label) ? n.label : e).split(
                                      '/',
                                    ))[1] &&
                                      !/[\d.]+/.test(e[0]) &&
                                      (e[0] += ' ' + e[1]),
                                    (n = n.label || n),
                                    (e = m(
                                      e[0]
                                        .replace(RegExp(r, 'i'), n)
                                        .replace(RegExp('; *(?:' + n + '[_-])?', 'i'), ' ')
                                        .replace(RegExp('(' + n + ')[-_.]?(\\w)', 'i'), '$1 $2'),
                                    ))),
                                  e
                                );
                              });
                            }
                            function q(e) {
                              return S(e, function (e, n) {
                                return (
                                  e ||
                                  (RegExp(n + '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(
                                    t,
                                  ) || 0)[1] ||
                                  null
                                );
                              });
                            }
                            if (
                              (F && (F = [F]),
                              /\bAndroid\b/.test(H) &&
                                !U &&
                                (s = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(t)) &&
                                (U = C(s[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, '') || null),
                              G && !U
                                ? (U = W([G]))
                                : G &&
                                  U &&
                                  (U = U.replace(RegExp('^(' + b(G) + ')[-_.\\s]', 'i'), G + ' ').replace(
                                    RegExp('^(' + b(G) + ')[-_.]?(\\w)', 'i'),
                                    G + ' $2',
                                  )),
                              (s = /\bGoogle TV\b/.exec(U)) && (U = s[0]),
                              /\bSimulator\b/i.test(t) && (U = (U ? U + ' ' : '') + 'Simulator'),
                              'Opera Mini' == B && /\bOPiOS\b/.test(t) && I.push('running in Turbo/Uncompressed mode'),
                              'IE' == B && /\blike iPhone OS\b/.test(t)
                                ? ((G = (s = e(t.replace(/like iPhone OS/, ''))).manufacturer), (U = s.product))
                                : /^iP/.test(U)
                                ? (B || (B = 'Safari'),
                                  (H = 'iOS' + ((s = / OS ([\d_]+)/i.exec(t)) ? ' ' + s[1].replace(/_/g, '.') : '')))
                                : 'Konqueror' == B && /^Linux\b/i.test(H)
                                ? (H = 'Kubuntu')
                                : (G &&
                                    'Google' != G &&
                                    ((/Chrome/.test(B) && !/\bMobile Safari\b/i.test(t)) || /\bVita\b/.test(U))) ||
                                  (/\bAndroid\b/.test(H) && /^Chrome/.test(B) && /\bVersion\//i.test(t))
                                ? ((B = 'Android Browser'), (H = /\bAndroid\b/.test(H) ? H : 'Android'))
                                : 'Silk' == B
                                ? (/\bMobi/i.test(t) || ((H = 'Android'), I.unshift('desktop mode')),
                                  /Accelerated *= *true/i.test(t) && I.unshift('accelerated'))
                                : 'UC Browser' == B && /\bUCWEB\b/.test(t)
                                ? I.push('speed mode')
                                : 'PaleMoon' == B && (s = /\bFirefox\/([\d.]+)\b/.exec(t))
                                ? I.push('identifying as Firefox ' + s[1])
                                : 'Firefox' == B && (s = /\b(Mobile|Tablet|TV)\b/i.exec(t))
                                ? (H || (H = 'Firefox OS'), U || (U = s[1]))
                                : !B || (s = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(B))
                                ? (B && !U && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(s + '/') + 8)) && (B = null),
                                  (s = U || G || H) &&
                                    (U || G || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(H)) &&
                                    (B = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(H) ? H : s) + ' Browser'))
                                : 'Electron' == B &&
                                  (s = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) &&
                                  I.push('Chromium ' + s),
                              N ||
                                (N = q([
                                  '(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)',
                                  'Version',
                                  b(B),
                                  '(?:Firefox|Minefield|NetFront)',
                                ])),
                              (s =
                                ('iCab' == F && parseFloat(N) > 3
                                  ? 'WebKit'
                                  : /\bOpera\b/.test(B) && (/\bOPR\b/.test(t) ? 'Blink' : 'Presto')) ||
                                (/\b(?:Midori|Nook|Safari)\b/i.test(t) &&
                                  !/^(?:Trident|EdgeHTML)$/.test(F) &&
                                  'WebKit') ||
                                (!F && /\bMSIE\b/i.test(t) && ('Mac OS' == H ? 'Tasman' : 'Trident')) ||
                                ('WebKit' == F && /\bPlayStation\b(?! Vita\b)/i.test(B) && 'NetFront')) && (F = [s]),
                              'IE' == B && (s = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1])
                                ? ((B += ' Mobile'),
                                  (H = 'Windows Phone ' + (/\+$/.test(s) ? s : s + '.x')),
                                  I.unshift('desktop mode'))
                                : /\bWPDesktop\b/i.test(t)
                                ? ((B = 'IE Mobile'),
                                  (H = 'Windows Phone 8.x'),
                                  I.unshift('desktop mode'),
                                  N || (N = (/\brv:([\d.]+)/.exec(t) || 0)[1]))
                                : 'IE' != B &&
                                  'Trident' == F &&
                                  (s = /\brv:([\d.]+)/.exec(t)) &&
                                  (B && I.push('identifying as ' + B + (N ? ' ' + N : '')), (B = 'IE'), (N = s[1])),
                              L)
                            ) {
                              if (
                                ((p = null != (l = n) ? c(l.global) : 'number'),
                                /^(?:boolean|number|string|undefined)$/.test(p) || ('object' == p && !l.global))
                              )
                                g((s = n.runtime)) == w
                                  ? ((B = 'Adobe AIR'), (H = s.flash.system.Capabilities.os))
                                  : g((s = n.phantom)) == T
                                  ? ((B = 'PhantomJS'),
                                    (N = (s = s.version || null) && s.major + '.' + s.minor + '.' + s.patch))
                                  : 'number' == typeof P.documentMode && (s = /\bTrident\/(\d+)/i.exec(t))
                                  ? ((N = [N, P.documentMode]),
                                    (s = +s[1] + 4) != N[1] &&
                                      (I.push('IE ' + N[1] + ' mode'), F && (F[1] = ''), (N[1] = s)),
                                    (N = 'IE' == B ? String(N[1].toFixed(1)) : N[0]))
                                  : 'number' == typeof P.documentMode &&
                                    /^(?:Chrome|Firefox)\b/.test(B) &&
                                    (I.push('masking as ' + B + ' ' + N),
                                    (B = 'IE'),
                                    (N = '11.0'),
                                    (F = ['Trident']),
                                    (H = 'Windows'));
                              else if (
                                (k &&
                                  ((A = (s = k.lang.System).getProperty('os.arch')),
                                  (H = H || s.getProperty('os.name') + ' ' + s.getProperty('os.version'))),
                                R)
                              ) {
                                try {
                                  (N = n.require('ringo/engine').version.join('.')), (B = 'RingoJS');
                                } catch (e) {
                                  (s = n.system) &&
                                    s.global.system == n.system &&
                                    ((B = 'Narwhal'), H || (H = s[0].os || null));
                                }
                                B || (B = 'Rhino');
                              } else
                                'object' == c(n.process) &&
                                  !n.process.browser &&
                                  (s = n.process) &&
                                  ('object' == c(s.versions) &&
                                    ('string' == typeof s.versions.electron
                                      ? (I.push('Node ' + s.versions.node), (B = 'Electron'), (N = s.versions.electron))
                                      : 'string' == typeof s.versions.nw &&
                                        (I.push('Chromium ' + N, 'Node ' + s.versions.node),
                                        (B = 'NW.js'),
                                        (N = s.versions.nw))),
                                  B ||
                                    ((B = 'Node.js'),
                                    (A = s.arch),
                                    (H = s.platform),
                                    (N = (N = /[\d.]+/.exec(s.version)) ? N[0] : null)));
                              H = H && m(H);
                            }
                            if (
                              (N &&
                                (s =
                                  /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(N) ||
                                  /(?:alpha|beta)(?: ?\d)?/i.exec(t + ';' + (L && o.appMinorVersion)) ||
                                  (/\bMinefield\b/i.test(t) && 'a')) &&
                                ((j = /b/i.test(s) ? 'beta' : 'alpha'),
                                (N =
                                  N.replace(RegExp(s + '\\+?$'), '') +
                                  ('beta' == j ? O : x) +
                                  (/\d+\+?/.exec(s) || ''))),
                              'Fennec' == B || ('Firefox' == B && /\b(?:Android|Firefox OS|KaiOS)\b/.test(H)))
                            )
                              B = 'Firefox Mobile';
                            else if ('Maxthon' == B && N) N = N.replace(/\.[\d.]+/, '.x');
                            else if (/\bXbox\b/i.test(U))
                              'Xbox 360' == U && (H = null),
                                'Xbox 360' == U && /\bIEMobile\b/.test(t) && I.unshift('mobile mode');
                            else if (
                              (!/^(?:Chrome|IE|Opera)$/.test(B) && (!B || U || /Browser|Mobi/.test(B))) ||
                              ('Windows CE' != H && !/Mobi/i.test(t))
                            )
                              if ('IE' == B && L)
                                try {
                                  null === n.external && I.unshift('platform preview');
                                } catch (e) {
                                  I.unshift('embedded');
                                }
                              else
                                (/\bBlackBerry\b/.test(U) || /\bBB10\b/.test(t)) &&
                                (s = (RegExp(U.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(t) || 0)[1] || N)
                                  ? ((H =
                                      ((s = [s, /BB10/.test(t)])[1]
                                        ? ((U = null), (G = 'BlackBerry'))
                                        : 'Device Software') +
                                      ' ' +
                                      s[0]),
                                    (N = null))
                                  : this != y &&
                                    'Wii' != U &&
                                    ((L && D) ||
                                      (/Opera/.test(B) && /\b(?:MSIE|Firefox)\b/i.test(t)) ||
                                      ('Firefox' == B && /\bOS X (?:\d+\.){2,}/.test(H)) ||
                                      ('IE' == B &&
                                        ((H && !/^Win/.test(H) && N > 5.5) ||
                                          (/\bWindows XP\b/.test(H) && N > 8) ||
                                          (8 == N && !/\bTrident\b/.test(t))))) &&
                                    !d.test((s = e.call(y, t.replace(d, '') + ';'))) &&
                                    s.name &&
                                    ((s = 'ing as ' + s.name + ((s = s.version) ? ' ' + s : '')),
                                    d.test(B)
                                      ? (/\bIE\b/.test(s) && 'Mac OS' == H && (H = null), (s = 'identify' + s))
                                      : ((s = 'mask' + s),
                                        (B = M ? m(M.replace(/([a-z])([A-Z])/g, '$1 $2')) : 'Opera'),
                                        /\bIE\b/.test(s) && (H = null),
                                        L || (N = null)),
                                    (F = ['Presto']),
                                    I.push(s));
                            else B += ' Mobile';
                            (s = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) &&
                              ((s = [parseFloat(s.replace(/\.(\d)$/, '.0$1')), s]),
                              'Safari' == B && '+' == s[1].slice(-1)
                                ? ((B = 'WebKit Nightly'), (j = 'alpha'), (N = s[1].slice(0, -1)))
                                : (N != s[1] && N != (s[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])) || (N = null),
                              (s[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(t) || 0)[1]),
                              537.36 == s[0] &&
                                537.36 == s[2] &&
                                parseFloat(s[1]) >= 28 &&
                                'WebKit' == F &&
                                (F = ['Blink']),
                              L && (f || s[1])
                                ? (F && (F[1] = 'like Chrome'),
                                  (s =
                                    s[1] ||
                                    ((s = s[0]) < 530
                                      ? 1
                                      : s < 532
                                      ? 2
                                      : s < 532.05
                                      ? 3
                                      : s < 533
                                      ? 4
                                      : s < 534.03
                                      ? 5
                                      : s < 534.07
                                      ? 6
                                      : s < 534.1
                                      ? 7
                                      : s < 534.13
                                      ? 8
                                      : s < 534.16
                                      ? 9
                                      : s < 534.24
                                      ? 10
                                      : s < 534.3
                                      ? 11
                                      : s < 535.01
                                      ? 12
                                      : s < 535.02
                                      ? '13+'
                                      : s < 535.07
                                      ? 15
                                      : s < 535.11
                                      ? 16
                                      : s < 535.19
                                      ? 17
                                      : s < 536.05
                                      ? 18
                                      : s < 536.1
                                      ? 19
                                      : s < 537.01
                                      ? 20
                                      : s < 537.11
                                      ? '21+'
                                      : s < 537.13
                                      ? 23
                                      : s < 537.18
                                      ? 24
                                      : s < 537.24
                                      ? 25
                                      : s < 537.36
                                      ? 26
                                      : 'Blink' != F
                                      ? '27'
                                      : '28')))
                                : (F && (F[1] = 'like Safari'),
                                  (s =
                                    (s = s[0]) < 400
                                      ? 1
                                      : s < 500
                                      ? 2
                                      : s < 526
                                      ? 3
                                      : s < 533
                                      ? 4
                                      : s < 534
                                      ? '4+'
                                      : s < 535
                                      ? 5
                                      : s < 537
                                      ? 6
                                      : s < 538
                                      ? 7
                                      : s < 601
                                      ? 8
                                      : s < 602
                                      ? 9
                                      : s < 604
                                      ? 10
                                      : s < 606
                                      ? 11
                                      : s < 608
                                      ? 12
                                      : '12')),
                              F && (F[1] += ' ' + (s += 'number' == typeof s ? '.x' : /[.+]/.test(s) ? '' : '+')),
                              'Safari' == B && (!N || parseInt(N) > 45)
                                ? (N = s)
                                : 'Chrome' == B && /\bHeadlessChrome/i.test(t) && I.unshift('headless')),
                              'Opera' == B && (s = /\bzbov|zvav$/.exec(H))
                                ? ((B += ' '),
                                  I.unshift('desktop mode'),
                                  'zvav' == s ? ((B += 'Mini'), (N = null)) : (B += 'Mobile'),
                                  (H = H.replace(RegExp(' *' + s + '$'), '')))
                                : 'Safari' == B && /\bChrome\b/.exec(F && F[1])
                                ? (I.unshift('desktop mode'),
                                  (B = 'Chrome Mobile'),
                                  (N = null),
                                  /\bOS X\b/.test(H) ? ((G = 'Apple'), (H = 'iOS 4.3+')) : (H = null))
                                : /\bSRWare Iron\b/.test(B) && !N && (N = q('Chrome')),
                              N &&
                                0 == N.indexOf((s = /[\d.]+$/.exec(H))) &&
                                t.indexOf('/' + s + '-') > -1 &&
                                (H = C(H.replace(s, ''))),
                              H &&
                                -1 != H.indexOf(B) &&
                                !RegExp(B + ' OS').test(H) &&
                                (H = H.replace(RegExp(' *' + b(B) + ' *'), '')),
                              F &&
                                !/\b(?:Avant|Nook)\b/.test(B) &&
                                (/Browser|Lunascape|Maxthon/.test(B) ||
                                  ('Safari' != B && /^iOS/.test(H) && /\bSafari\b/.test(F[1])) ||
                                  (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(
                                    B,
                                  ) &&
                                    F[1])) &&
                                (s = F[F.length - 1]) &&
                                I.push(s),
                              I.length && (I = ['(' + I.join('; ') + ')']),
                              G && U && U.indexOf(G) < 0 && I.push('on ' + G),
                              U && I.push((/^on /.test(I[I.length - 1]) ? '' : 'on ') + U),
                              H &&
                                ((s = / ([\d.+]+)$/.exec(H)),
                                (u = s && '/' == H.charAt(H.length - s[0].length - 1)),
                                (H = {
                                  architecture: 32,
                                  family: s && !u ? H.replace(s[0], '') : H,
                                  version: s ? s[1] : null,
                                  toString: function () {
                                    var e = this.version;
                                    return (
                                      this.family +
                                      (e && !u ? ' ' + e : '') +
                                      (64 == this.architecture ? ' 64-bit' : '')
                                    );
                                  },
                                })),
                              (s = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(A)) && !/\bi686\b/i.test(A)
                                ? (H && ((H.architecture = 64), (H.family = H.family.replace(RegExp(' *' + s), ''))),
                                  B &&
                                    (/\bWOW64\b/i.test(t) ||
                                      (L &&
                                        /\w(?:86|32)$/.test(o.cpuClass || o.platform) &&
                                        !/\bWin64; x64\b/i.test(t))) &&
                                    I.unshift('32-bit'))
                                : H &&
                                  /^OS X/.test(H.family) &&
                                  'Chrome' == B &&
                                  parseFloat(N) >= 39 &&
                                  (H.architecture = 64),
                              t || (t = null);
                            var K = {};
                            return (
                              (K.description = t),
                              (K.layout = F && F[0]),
                              (K.manufacturer = G),
                              (K.name = B),
                              (K.prerelease = j),
                              (K.product = U),
                              (K.ua = t),
                              (K.version = B && N),
                              (K.os = H || {
                                architecture: null,
                                family: null,
                                version: null,
                                toString: function () {
                                  return 'null';
                                },
                              }),
                              (K.parse = e),
                              (K.toString = function () {
                                return this.description || '';
                              }),
                              K.version && I.unshift(N),
                              K.name && I.unshift(B),
                              H &&
                                B &&
                                (H != String(H).split(' ')[0] || (H != B.split(' ')[0] && !U)) &&
                                I.push(U ? '(' + H + ')' : 'on ' + H),
                              I.length && (K.description = I.join(' ')),
                              K
                            );
                          })();
                          (i.platform = w),
                            void 0 ===
                              (r = function () {
                                return w;
                              }.call(t, n, t, e)) || (e.exports = r);
                        }.call(this);
                    },
                    7329: function (e, t, n) {
                      'use strict';
                      n.r(t),
                        n.d(t, {
                          default: function () {
                            return w;
                          },
                        });
                      var r = (function () {
                          if ('undefined' != typeof Map) return Map;
                          function e(e, t) {
                            var n = -1;
                            return (
                              e.some(function (e, r) {
                                return e[0] === t && ((n = r), !0);
                              }),
                              n
                            );
                          }
                          return (function () {
                            function t() {
                              this.__entries__ = [];
                            }
                            return (
                              Object.defineProperty(t.prototype, 'size', {
                                get: function () {
                                  return this.__entries__.length;
                                },
                                enumerable: !0,
                                configurable: !0,
                              }),
                              (t.prototype.get = function (t) {
                                var n = e(this.__entries__, t),
                                  r = this.__entries__[n];
                                return r && r[1];
                              }),
                              (t.prototype.set = function (t, n) {
                                var r = e(this.__entries__, t);
                                ~r ? (this.__entries__[r][1] = n) : this.__entries__.push([t, n]);
                              }),
                              (t.prototype.delete = function (t) {
                                var n = this.__entries__,
                                  r = e(n, t);
                                ~r && n.splice(r, 1);
                              }),
                              (t.prototype.has = function (t) {
                                return !!~e(this.__entries__, t);
                              }),
                              (t.prototype.clear = function () {
                                this.__entries__.splice(0);
                              }),
                              (t.prototype.forEach = function (e, t) {
                                void 0 === t && (t = null);
                                for (var n = 0, r = this.__entries__; n < r.length; n++) {
                                  var o = r[n];
                                  e.call(t, o[1], o[0]);
                                }
                              }),
                              t
                            );
                          })();
                        })(),
                        o =
                          'undefined' != typeof window &&
                          'undefined' != typeof document &&
                          window.document === document,
                        i =
                          void 0 !== n.g && n.g.Math === Math
                            ? n.g
                            : 'undefined' != typeof self && self.Math === Math
                            ? self
                            : 'undefined' != typeof window && window.Math === Math
                            ? window
                            : Function('return this')(),
                        a =
                          'function' == typeof requestAnimationFrame
                            ? requestAnimationFrame.bind(i)
                            : function (e) {
                                return setTimeout(function () {
                                  return e(Date.now());
                                }, 1e3 / 60);
                              },
                        s = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'],
                        c = 'undefined' != typeof MutationObserver,
                        u = (function () {
                          function e() {
                            (this.connected_ = !1),
                              (this.mutationEventsAdded_ = !1),
                              (this.mutationsObserver_ = null),
                              (this.observers_ = []),
                              (this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)),
                              (this.refresh = (function (e, t) {
                                var n = !1,
                                  r = !1,
                                  o = 0;
                                function i() {
                                  n && ((n = !1), e()), r && c();
                                }
                                function s() {
                                  a(i);
                                }
                                function c() {
                                  var e = Date.now();
                                  if (n) {
                                    if (e - o < 2) return;
                                    r = !0;
                                  } else (n = !0), (r = !1), setTimeout(s, 20);
                                  o = e;
                                }
                                return c;
                              })(this.refresh.bind(this)));
                          }
                          return (
                            (e.prototype.addObserver = function (e) {
                              ~this.observers_.indexOf(e) || this.observers_.push(e),
                                this.connected_ || this.connect_();
                            }),
                            (e.prototype.removeObserver = function (e) {
                              var t = this.observers_,
                                n = t.indexOf(e);
                              ~n && t.splice(n, 1), !t.length && this.connected_ && this.disconnect_();
                            }),
                            (e.prototype.refresh = function () {
                              this.updateObservers_() && this.refresh();
                            }),
                            (e.prototype.updateObservers_ = function () {
                              var e = this.observers_.filter(function (e) {
                                return e.gatherActive(), e.hasActive();
                              });
                              return (
                                e.forEach(function (e) {
                                  return e.broadcastActive();
                                }),
                                e.length > 0
                              );
                            }),
                            (e.prototype.connect_ = function () {
                              o &&
                                !this.connected_ &&
                                (document.addEventListener('transitionend', this.onTransitionEnd_),
                                window.addEventListener('resize', this.refresh),
                                c
                                  ? ((this.mutationsObserver_ = new MutationObserver(this.refresh)),
                                    this.mutationsObserver_.observe(document, {
                                      attributes: !0,
                                      childList: !0,
                                      characterData: !0,
                                      subtree: !0,
                                    }))
                                  : (document.addEventListener('DOMSubtreeModified', this.refresh),
                                    (this.mutationEventsAdded_ = !0)),
                                (this.connected_ = !0));
                            }),
                            (e.prototype.disconnect_ = function () {
                              o &&
                                this.connected_ &&
                                (document.removeEventListener('transitionend', this.onTransitionEnd_),
                                window.removeEventListener('resize', this.refresh),
                                this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
                                this.mutationEventsAdded_ &&
                                  document.removeEventListener('DOMSubtreeModified', this.refresh),
                                (this.mutationsObserver_ = null),
                                (this.mutationEventsAdded_ = !1),
                                (this.connected_ = !1));
                            }),
                            (e.prototype.onTransitionEnd_ = function (e) {
                              var t = e.propertyName,
                                n = void 0 === t ? '' : t;
                              s.some(function (e) {
                                return !!~n.indexOf(e);
                              }) && this.refresh();
                            }),
                            (e.getInstance = function () {
                              return this.instance_ || (this.instance_ = new e()), this.instance_;
                            }),
                            (e.instance_ = null),
                            e
                          );
                        })(),
                        l = function (e, t) {
                          for (var n = 0, r = Object.keys(t); n < r.length; n++) {
                            var o = r[n];
                            Object.defineProperty(e, o, {
                              value: t[o],
                              enumerable: !1,
                              writable: !1,
                              configurable: !0,
                            });
                          }
                          return e;
                        },
                        d = function (e) {
                          return (e && e.ownerDocument && e.ownerDocument.defaultView) || i;
                        },
                        p = m(0, 0, 0, 0);
                      function f(e) {
                        return parseFloat(e) || 0;
                      }
                      function h(e) {
                        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                        return t.reduce(function (t, n) {
                          return t + f(e['border-' + n + '-width']);
                        }, 0);
                      }
                      var v =
                        'undefined' != typeof SVGGraphicsElement
                          ? function (e) {
                              return e instanceof d(e).SVGGraphicsElement;
                            }
                          : function (e) {
                              return e instanceof d(e).SVGElement && 'function' == typeof e.getBBox;
                            };
                      function m(e, t, n, r) {
                        return { x: e, y: t, width: n, height: r };
                      }
                      var y = (function () {
                          function e(e) {
                            (this.broadcastWidth = 0),
                              (this.broadcastHeight = 0),
                              (this.contentRect_ = m(0, 0, 0, 0)),
                              (this.target = e);
                          }
                          return (
                            (e.prototype.isActive = function () {
                              var e = (function (e) {
                                return o
                                  ? v(e)
                                    ? (function (e) {
                                        var t = e.getBBox();
                                        return m(0, 0, t.width, t.height);
                                      })(e)
                                    : (function (e) {
                                        var t = e.clientWidth,
                                          n = e.clientHeight;
                                        if (!t && !n) return p;
                                        var r = d(e).getComputedStyle(e),
                                          o = (function (e) {
                                            for (
                                              var t = {}, n = 0, r = ['top', 'right', 'bottom', 'left'];
                                              n < r.length;
                                              n++
                                            ) {
                                              var o = r[n],
                                                i = e['padding-' + o];
                                              t[o] = f(i);
                                            }
                                            return t;
                                          })(r),
                                          i = o.left + o.right,
                                          a = o.top + o.bottom,
                                          s = f(r.width),
                                          c = f(r.height);
                                        if (
                                          ('border-box' === r.boxSizing &&
                                            (Math.round(s + i) !== t && (s -= h(r, 'left', 'right') + i),
                                            Math.round(c + a) !== n && (c -= h(r, 'top', 'bottom') + a)),
                                          !(function (e) {
                                            return e === d(e).document.documentElement;
                                          })(e))
                                        ) {
                                          var u = Math.round(s + i) - t,
                                            l = Math.round(c + a) - n;
                                          1 !== Math.abs(u) && (s -= u), 1 !== Math.abs(l) && (c -= l);
                                        }
                                        return m(o.left, o.top, s, c);
                                      })(e)
                                  : p;
                              })(this.target);
                              return (
                                (this.contentRect_ = e),
                                e.width !== this.broadcastWidth || e.height !== this.broadcastHeight
                              );
                            }),
                            (e.prototype.broadcastRect = function () {
                              var e = this.contentRect_;
                              return (this.broadcastWidth = e.width), (this.broadcastHeight = e.height), e;
                            }),
                            e
                          );
                        })(),
                        g = function (e, t) {
                          var n,
                            r,
                            o,
                            i,
                            a,
                            s,
                            c,
                            u =
                              ((r = (n = t).x),
                              (o = n.y),
                              (i = n.width),
                              (a = n.height),
                              (s = 'undefined' != typeof DOMRectReadOnly ? DOMRectReadOnly : Object),
                              (c = Object.create(s.prototype)),
                              l(c, { x: r, y: o, width: i, height: a, top: o, right: r + i, bottom: a + o, left: r }),
                              c);
                          l(this, { target: e, contentRect: u });
                        },
                        b = (function () {
                          function e(e, t, n) {
                            if (
                              ((this.activeObservations_ = []), (this.observations_ = new r()), 'function' != typeof e)
                            )
                              throw new TypeError('The callback provided as parameter 1 is not a function.');
                            (this.callback_ = e), (this.controller_ = t), (this.callbackCtx_ = n);
                          }
                          return (
                            (e.prototype.observe = function (e) {
                              if (!arguments.length) throw new TypeError('1 argument required, but only 0 present.');
                              if ('undefined' != typeof Element && Element instanceof Object) {
                                if (!(e instanceof d(e).Element))
                                  throw new TypeError('parameter 1 is not of type "Element".');
                                var t = this.observations_;
                                t.has(e) ||
                                  (t.set(e, new y(e)), this.controller_.addObserver(this), this.controller_.refresh());
                              }
                            }),
                            (e.prototype.unobserve = function (e) {
                              if (!arguments.length) throw new TypeError('1 argument required, but only 0 present.');
                              if ('undefined' != typeof Element && Element instanceof Object) {
                                if (!(e instanceof d(e).Element))
                                  throw new TypeError('parameter 1 is not of type "Element".');
                                var t = this.observations_;
                                t.has(e) && (t.delete(e), t.size || this.controller_.removeObserver(this));
                              }
                            }),
                            (e.prototype.disconnect = function () {
                              this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
                            }),
                            (e.prototype.gatherActive = function () {
                              var e = this;
                              this.clearActive(),
                                this.observations_.forEach(function (t) {
                                  t.isActive() && e.activeObservations_.push(t);
                                });
                            }),
                            (e.prototype.broadcastActive = function () {
                              if (this.hasActive()) {
                                var e = this.callbackCtx_,
                                  t = this.activeObservations_.map(function (e) {
                                    return new g(e.target, e.broadcastRect());
                                  });
                                this.callback_.call(e, t, e), this.clearActive();
                              }
                            }),
                            (e.prototype.clearActive = function () {
                              this.activeObservations_.splice(0);
                            }),
                            (e.prototype.hasActive = function () {
                              return this.activeObservations_.length > 0;
                            }),
                            e
                          );
                        })(),
                        S = 'undefined' != typeof WeakMap ? new WeakMap() : new r(),
                        C = function e(t) {
                          if (!(this instanceof e)) throw new TypeError('Cannot call a class as a function.');
                          if (!arguments.length) throw new TypeError('1 argument required, but only 0 present.');
                          var n = u.getInstance(),
                            r = new b(t, n, this);
                          S.set(this, r);
                        };
                      ['observe', 'unobserve', 'disconnect'].forEach(function (e) {
                        C.prototype[e] = function () {
                          var t;
                          return (t = S.get(this))[e].apply(t, arguments);
                        };
                      });
                      var w = void 0 !== i.ResizeObserver ? i.ResizeObserver : C;
                    },
                    2226: function (e, t, n) {
                      'use strict';
                      var r = n(347);
                      function o(e, t, n, o, i) {
                        var a = r.writeRtpDescription(e.kind, t);
                        if (
                          ((a += r.writeIceParameters(e.iceGatherer.getLocalParameters())),
                          (a += r.writeDtlsParameters(
                            e.dtlsTransport.getLocalParameters(),
                            'offer' === n ? 'actpass' : i || 'active',
                          )),
                          (a += 'a=mid:' + e.mid + '\r\n'),
                          e.rtpSender && e.rtpReceiver
                            ? (a += 'a=sendrecv\r\n')
                            : e.rtpSender
                            ? (a += 'a=sendonly\r\n')
                            : e.rtpReceiver
                            ? (a += 'a=recvonly\r\n')
                            : (a += 'a=inactive\r\n'),
                          e.rtpSender)
                        ) {
                          var s = e.rtpSender._initialTrackId || e.rtpSender.track.id;
                          e.rtpSender._initialTrackId = s;
                          var c = 'msid:' + (o ? o.id : '-') + ' ' + s + '\r\n';
                          (a += 'a=' + c),
                            (a += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' ' + c),
                            e.sendEncodingParameters[0].rtx &&
                              ((a += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' ' + c),
                              (a +=
                                'a=ssrc-group:FID ' +
                                e.sendEncodingParameters[0].ssrc +
                                ' ' +
                                e.sendEncodingParameters[0].rtx.ssrc +
                                '\r\n'));
                        }
                        return (
                          (a += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' cname:' + r.localCName + '\r\n'),
                          e.rtpSender &&
                            e.sendEncodingParameters[0].rtx &&
                            (a += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' cname:' + r.localCName + '\r\n'),
                          a
                        );
                      }
                      function i(e, t) {
                        var n = { codecs: [], headerExtensions: [], fecMechanisms: [] },
                          r = function (e, t) {
                            e = parseInt(e, 10);
                            for (var n = 0; n < t.length; n++)
                              if (t[n].payloadType === e || t[n].preferredPayloadType === e) return t[n];
                          },
                          o = function (e, t, n, o) {
                            var i = r(e.parameters.apt, n),
                              a = r(t.parameters.apt, o);
                            return i && a && i.name.toLowerCase() === a.name.toLowerCase();
                          };
                        return (
                          e.codecs.forEach(function (r) {
                            for (var i = 0; i < t.codecs.length; i++) {
                              var a = t.codecs[i];
                              if (r.name.toLowerCase() === a.name.toLowerCase() && r.clockRate === a.clockRate) {
                                if (
                                  'rtx' === r.name.toLowerCase() &&
                                  r.parameters &&
                                  a.parameters.apt &&
                                  !o(r, a, e.codecs, t.codecs)
                                )
                                  continue;
                                ((a = JSON.parse(JSON.stringify(a))).numChannels = Math.min(
                                  r.numChannels,
                                  a.numChannels,
                                )),
                                  n.codecs.push(a),
                                  (a.rtcpFeedback = a.rtcpFeedback.filter(function (e) {
                                    for (var t = 0; t < r.rtcpFeedback.length; t++)
                                      if (
                                        r.rtcpFeedback[t].type === e.type &&
                                        r.rtcpFeedback[t].parameter === e.parameter
                                      )
                                        return !0;
                                    return !1;
                                  }));
                                break;
                              }
                            }
                          }),
                          e.headerExtensions.forEach(function (e) {
                            for (var r = 0; r < t.headerExtensions.length; r++) {
                              var o = t.headerExtensions[r];
                              if (e.uri === o.uri) {
                                n.headerExtensions.push(o);
                                break;
                              }
                            }
                          }),
                          n
                        );
                      }
                      function a(e, t, n) {
                        return (
                          -1 !==
                          {
                            offer: {
                              setLocalDescription: ['stable', 'have-local-offer'],
                              setRemoteDescription: ['stable', 'have-remote-offer'],
                            },
                            answer: {
                              setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
                              setRemoteDescription: ['have-local-offer', 'have-remote-pranswer'],
                            },
                          }[t][e].indexOf(n)
                        );
                      }
                      function s(e, t) {
                        var n = e.getRemoteCandidates().find(function (e) {
                          return (
                            t.foundation === e.foundation &&
                            t.ip === e.ip &&
                            t.port === e.port &&
                            t.priority === e.priority &&
                            t.protocol === e.protocol &&
                            t.type === e.type
                          );
                        });
                        return n || e.addRemoteCandidate(t), !n;
                      }
                      function c(e, t) {
                        var n = new Error(t);
                        return (
                          (n.name = e),
                          (n.code = {
                            NotSupportedError: 9,
                            InvalidStateError: 11,
                            InvalidAccessError: 15,
                            TypeError: void 0,
                            OperationError: void 0,
                          }[e]),
                          n
                        );
                      }
                      e.exports = function (e, t) {
                        function n(t, n) {
                          n.addTrack(t), n.dispatchEvent(new e.MediaStreamTrackEvent('addtrack', { track: t }));
                        }
                        function u(t, n, r, o) {
                          var i = new Event('track');
                          (i.track = n),
                            (i.receiver = r),
                            (i.transceiver = { receiver: r }),
                            (i.streams = o),
                            e.setTimeout(function () {
                              t._dispatchEvent('track', i);
                            });
                        }
                        var l = function (n) {
                          var o = this,
                            i = document.createDocumentFragment();
                          if (
                            (['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function (e) {
                              o[e] = i[e].bind(i);
                            }),
                            (this.canTrickleIceCandidates = null),
                            (this.needNegotiation = !1),
                            (this.localStreams = []),
                            (this.remoteStreams = []),
                            (this._localDescription = null),
                            (this._remoteDescription = null),
                            (this.signalingState = 'stable'),
                            (this.iceConnectionState = 'new'),
                            (this.connectionState = 'new'),
                            (this.iceGatheringState = 'new'),
                            (n = JSON.parse(JSON.stringify(n || {}))),
                            (this.usingBundle = 'max-bundle' === n.bundlePolicy),
                            'negotiate' === n.rtcpMuxPolicy)
                          )
                            throw c('NotSupportedError', "rtcpMuxPolicy 'negotiate' is not supported");
                          switch ((n.rtcpMuxPolicy || (n.rtcpMuxPolicy = 'require'), n.iceTransportPolicy)) {
                            case 'all':
                            case 'relay':
                              break;
                            default:
                              n.iceTransportPolicy = 'all';
                          }
                          switch (n.bundlePolicy) {
                            case 'balanced':
                            case 'max-compat':
                            case 'max-bundle':
                              break;
                            default:
                              n.bundlePolicy = 'balanced';
                          }
                          if (
                            ((n.iceServers = (function (e, t) {
                              var n = !1;
                              return (e = JSON.parse(JSON.stringify(e))).filter(function (e) {
                                if (e && (e.urls || e.url)) {
                                  var r = e.urls || e.url;
                                  e.url && !e.urls && console.warn('RTCIceServer.url is deprecated! Use urls instead.');
                                  var o = 'string' == typeof r;
                                  return (
                                    o && (r = [r]),
                                    (r = r.filter(function (e) {
                                      return 0 !== e.indexOf('turn:') ||
                                        -1 === e.indexOf('transport=udp') ||
                                        -1 !== e.indexOf('turn:[') ||
                                        n
                                        ? 0 === e.indexOf('stun:') && t >= 14393 && -1 === e.indexOf('?transport=udp')
                                        : ((n = !0), !0);
                                    })),
                                    delete e.url,
                                    (e.urls = o ? r[0] : r),
                                    !!r.length
                                  );
                                }
                              });
                            })(n.iceServers || [], t)),
                            (this._iceGatherers = []),
                            n.iceCandidatePoolSize)
                          )
                            for (var a = n.iceCandidatePoolSize; a > 0; a--)
                              this._iceGatherers.push(
                                new e.RTCIceGatherer({ iceServers: n.iceServers, gatherPolicy: n.iceTransportPolicy }),
                              );
                          else n.iceCandidatePoolSize = 0;
                          (this._config = n),
                            (this.transceivers = []),
                            (this._sdpSessionId = r.generateSessionId()),
                            (this._sdpSessionVersion = 0),
                            (this._dtlsRole = void 0),
                            (this._isClosed = !1);
                        };
                        Object.defineProperty(l.prototype, 'localDescription', {
                          configurable: !0,
                          get: function () {
                            return this._localDescription;
                          },
                        }),
                          Object.defineProperty(l.prototype, 'remoteDescription', {
                            configurable: !0,
                            get: function () {
                              return this._remoteDescription;
                            },
                          }),
                          (l.prototype.onicecandidate = null),
                          (l.prototype.onaddstream = null),
                          (l.prototype.ontrack = null),
                          (l.prototype.onremovestream = null),
                          (l.prototype.onsignalingstatechange = null),
                          (l.prototype.oniceconnectionstatechange = null),
                          (l.prototype.onconnectionstatechange = null),
                          (l.prototype.onicegatheringstatechange = null),
                          (l.prototype.onnegotiationneeded = null),
                          (l.prototype.ondatachannel = null),
                          (l.prototype._dispatchEvent = function (e, t) {
                            this._isClosed ||
                              (this.dispatchEvent(t), 'function' == typeof this['on' + e] && this['on' + e](t));
                          }),
                          (l.prototype._emitGatheringStateChange = function () {
                            var e = new Event('icegatheringstatechange');
                            this._dispatchEvent('icegatheringstatechange', e);
                          }),
                          (l.prototype.getConfiguration = function () {
                            return this._config;
                          }),
                          (l.prototype.getLocalStreams = function () {
                            return this.localStreams;
                          }),
                          (l.prototype.getRemoteStreams = function () {
                            return this.remoteStreams;
                          }),
                          (l.prototype._createTransceiver = function (e, t) {
                            var n = this.transceivers.length > 0,
                              r = {
                                track: null,
                                iceGatherer: null,
                                iceTransport: null,
                                dtlsTransport: null,
                                localCapabilities: null,
                                remoteCapabilities: null,
                                rtpSender: null,
                                rtpReceiver: null,
                                kind: e,
                                mid: null,
                                sendEncodingParameters: null,
                                recvEncodingParameters: null,
                                stream: null,
                                associatedRemoteMediaStreams: [],
                                wantReceive: !0,
                              };
                            if (this.usingBundle && n)
                              (r.iceTransport = this.transceivers[0].iceTransport),
                                (r.dtlsTransport = this.transceivers[0].dtlsTransport);
                            else {
                              var o = this._createIceAndDtlsTransports();
                              (r.iceTransport = o.iceTransport), (r.dtlsTransport = o.dtlsTransport);
                            }
                            return t || this.transceivers.push(r), r;
                          }),
                          (l.prototype.addTrack = function (t, n) {
                            if (this._isClosed)
                              throw c('InvalidStateError', 'Attempted to call addTrack on a closed peerconnection.');
                            var r;
                            if (
                              this.transceivers.find(function (e) {
                                return e.track === t;
                              })
                            )
                              throw c('InvalidAccessError', 'Track already exists.');
                            for (var o = 0; o < this.transceivers.length; o++)
                              this.transceivers[o].track ||
                                this.transceivers[o].kind !== t.kind ||
                                (r = this.transceivers[o]);
                            return (
                              r || (r = this._createTransceiver(t.kind)),
                              this._maybeFireNegotiationNeeded(),
                              -1 === this.localStreams.indexOf(n) && this.localStreams.push(n),
                              (r.track = t),
                              (r.stream = n),
                              (r.rtpSender = new e.RTCRtpSender(t, r.dtlsTransport)),
                              r.rtpSender
                            );
                          }),
                          (l.prototype.addStream = function (e) {
                            var n = this;
                            if (t >= 15025)
                              e.getTracks().forEach(function (t) {
                                n.addTrack(t, e);
                              });
                            else {
                              var r = e.clone();
                              e.getTracks().forEach(function (e, t) {
                                var n = r.getTracks()[t];
                                e.addEventListener('enabled', function (e) {
                                  n.enabled = e.enabled;
                                });
                              }),
                                r.getTracks().forEach(function (e) {
                                  n.addTrack(e, r);
                                });
                            }
                          }),
                          (l.prototype.removeTrack = function (t) {
                            if (this._isClosed)
                              throw c('InvalidStateError', 'Attempted to call removeTrack on a closed peerconnection.');
                            if (!(t instanceof e.RTCRtpSender))
                              throw new TypeError(
                                'Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.',
                              );
                            var n = this.transceivers.find(function (e) {
                              return e.rtpSender === t;
                            });
                            if (!n) throw c('InvalidAccessError', 'Sender was not created by this connection.');
                            var r = n.stream;
                            n.rtpSender.stop(),
                              (n.rtpSender = null),
                              (n.track = null),
                              (n.stream = null),
                              -1 ===
                                this.transceivers
                                  .map(function (e) {
                                    return e.stream;
                                  })
                                  .indexOf(r) &&
                                this.localStreams.indexOf(r) > -1 &&
                                this.localStreams.splice(this.localStreams.indexOf(r), 1),
                              this._maybeFireNegotiationNeeded();
                          }),
                          (l.prototype.removeStream = function (e) {
                            var t = this;
                            e.getTracks().forEach(function (e) {
                              var n = t.getSenders().find(function (t) {
                                return t.track === e;
                              });
                              n && t.removeTrack(n);
                            });
                          }),
                          (l.prototype.getSenders = function () {
                            return this.transceivers
                              .filter(function (e) {
                                return !!e.rtpSender;
                              })
                              .map(function (e) {
                                return e.rtpSender;
                              });
                          }),
                          (l.prototype.getReceivers = function () {
                            return this.transceivers
                              .filter(function (e) {
                                return !!e.rtpReceiver;
                              })
                              .map(function (e) {
                                return e.rtpReceiver;
                              });
                          }),
                          (l.prototype._createIceGatherer = function (t, n) {
                            var r = this;
                            if (n && t > 0) return this.transceivers[0].iceGatherer;
                            if (this._iceGatherers.length) return this._iceGatherers.shift();
                            var o = new e.RTCIceGatherer({
                              iceServers: this._config.iceServers,
                              gatherPolicy: this._config.iceTransportPolicy,
                            });
                            return (
                              Object.defineProperty(o, 'state', { value: 'new', writable: !0 }),
                              (this.transceivers[t].bufferedCandidateEvents = []),
                              (this.transceivers[t].bufferCandidates = function (e) {
                                var n = !e.candidate || 0 === Object.keys(e.candidate).length;
                                (o.state = n ? 'completed' : 'gathering'),
                                  null !== r.transceivers[t].bufferedCandidateEvents &&
                                    r.transceivers[t].bufferedCandidateEvents.push(e);
                              }),
                              o.addEventListener('localcandidate', this.transceivers[t].bufferCandidates),
                              o
                            );
                          }),
                          (l.prototype._gather = function (t, n) {
                            var o = this,
                              i = this.transceivers[n].iceGatherer;
                            if (!i.onlocalcandidate) {
                              var a = this.transceivers[n].bufferedCandidateEvents;
                              (this.transceivers[n].bufferedCandidateEvents = null),
                                i.removeEventListener('localcandidate', this.transceivers[n].bufferCandidates),
                                (i.onlocalcandidate = function (e) {
                                  if (!(o.usingBundle && n > 0)) {
                                    var a = new Event('icecandidate');
                                    a.candidate = { sdpMid: t, sdpMLineIndex: n };
                                    var s = e.candidate,
                                      c = !s || 0 === Object.keys(s).length;
                                    if (c) ('new' !== i.state && 'gathering' !== i.state) || (i.state = 'completed');
                                    else {
                                      'new' === i.state && (i.state = 'gathering'),
                                        (s.component = 1),
                                        (s.ufrag = i.getLocalParameters().usernameFragment);
                                      var u = r.writeCandidate(s);
                                      (a.candidate = Object.assign(a.candidate, r.parseCandidate(u))),
                                        (a.candidate.candidate = u),
                                        (a.candidate.toJSON = function () {
                                          return {
                                            candidate: a.candidate.candidate,
                                            sdpMid: a.candidate.sdpMid,
                                            sdpMLineIndex: a.candidate.sdpMLineIndex,
                                            usernameFragment: a.candidate.usernameFragment,
                                          };
                                        });
                                    }
                                    var l = r.getMediaSections(o._localDescription.sdp);
                                    (l[a.candidate.sdpMLineIndex] += c
                                      ? 'a=end-of-candidates\r\n'
                                      : 'a=' + a.candidate.candidate + '\r\n'),
                                      (o._localDescription.sdp =
                                        r.getDescription(o._localDescription.sdp) + l.join(''));
                                    var d = o.transceivers.every(function (e) {
                                      return e.iceGatherer && 'completed' === e.iceGatherer.state;
                                    });
                                    'gathering' !== o.iceGatheringState &&
                                      ((o.iceGatheringState = 'gathering'), o._emitGatheringStateChange()),
                                      c || o._dispatchEvent('icecandidate', a),
                                      d &&
                                        (o._dispatchEvent('icecandidate', new Event('icecandidate')),
                                        (o.iceGatheringState = 'complete'),
                                        o._emitGatheringStateChange());
                                  }
                                }),
                                e.setTimeout(function () {
                                  a.forEach(function (e) {
                                    i.onlocalcandidate(e);
                                  });
                                }, 0);
                            }
                          }),
                          (l.prototype._createIceAndDtlsTransports = function () {
                            var t = this,
                              n = new e.RTCIceTransport(null);
                            n.onicestatechange = function () {
                              t._updateIceConnectionState(), t._updateConnectionState();
                            };
                            var r = new e.RTCDtlsTransport(n);
                            return (
                              (r.ondtlsstatechange = function () {
                                t._updateConnectionState();
                              }),
                              (r.onerror = function () {
                                Object.defineProperty(r, 'state', { value: 'failed', writable: !0 }),
                                  t._updateConnectionState();
                              }),
                              { iceTransport: n, dtlsTransport: r }
                            );
                          }),
                          (l.prototype._disposeIceAndDtlsTransports = function (e) {
                            var t = this.transceivers[e].iceGatherer;
                            t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
                            var n = this.transceivers[e].iceTransport;
                            n && (delete n.onicestatechange, delete this.transceivers[e].iceTransport);
                            var r = this.transceivers[e].dtlsTransport;
                            r &&
                              (delete r.ondtlsstatechange, delete r.onerror, delete this.transceivers[e].dtlsTransport);
                          }),
                          (l.prototype._transceive = function (e, n, o) {
                            var a = i(e.localCapabilities, e.remoteCapabilities);
                            n &&
                              e.rtpSender &&
                              ((a.encodings = e.sendEncodingParameters),
                              (a.rtcp = { cname: r.localCName, compound: e.rtcpParameters.compound }),
                              e.recvEncodingParameters.length && (a.rtcp.ssrc = e.recvEncodingParameters[0].ssrc),
                              e.rtpSender.send(a)),
                              o &&
                                e.rtpReceiver &&
                                a.codecs.length > 0 &&
                                ('video' === e.kind &&
                                  e.recvEncodingParameters &&
                                  t < 15019 &&
                                  e.recvEncodingParameters.forEach(function (e) {
                                    delete e.rtx;
                                  }),
                                e.recvEncodingParameters.length
                                  ? (a.encodings = e.recvEncodingParameters)
                                  : (a.encodings = [{}]),
                                (a.rtcp = { compound: e.rtcpParameters.compound }),
                                e.rtcpParameters.cname && (a.rtcp.cname = e.rtcpParameters.cname),
                                e.sendEncodingParameters.length && (a.rtcp.ssrc = e.sendEncodingParameters[0].ssrc),
                                e.rtpReceiver.receive(a));
                          }),
                          (l.prototype.setLocalDescription = function (e) {
                            var t,
                              n,
                              o = this;
                            if (-1 === ['offer', 'answer'].indexOf(e.type))
                              return Promise.reject(c('TypeError', 'Unsupported type "' + e.type + '"'));
                            if (!a('setLocalDescription', e.type, o.signalingState) || o._isClosed)
                              return Promise.reject(
                                c('InvalidStateError', 'Can not set local ' + e.type + ' in state ' + o.signalingState),
                              );
                            if ('offer' === e.type)
                              (t = r.splitSections(e.sdp)),
                                (n = t.shift()),
                                t.forEach(function (e, t) {
                                  var n = r.parseRtpParameters(e);
                                  o.transceivers[t].localCapabilities = n;
                                }),
                                o.transceivers.forEach(function (e, t) {
                                  o._gather(e.mid, t);
                                });
                            else if ('answer' === e.type) {
                              (t = r.splitSections(o._remoteDescription.sdp)), (n = t.shift());
                              var s = r.matchPrefix(n, 'a=ice-lite').length > 0;
                              t.forEach(function (e, t) {
                                var a = o.transceivers[t],
                                  c = a.iceGatherer,
                                  u = a.iceTransport,
                                  l = a.dtlsTransport,
                                  d = a.localCapabilities,
                                  p = a.remoteCapabilities;
                                if (
                                  !((r.isRejected(e) && 0 === r.matchPrefix(e, 'a=bundle-only').length) || a.rejected)
                                ) {
                                  var f = r.getIceParameters(e, n),
                                    h = r.getDtlsParameters(e, n);
                                  s && (h.role = 'server'),
                                    (o.usingBundle && 0 !== t) ||
                                      (o._gather(a.mid, t),
                                      'new' === u.state && u.start(c, f, s ? 'controlling' : 'controlled'),
                                      'new' === l.state && l.start(h));
                                  var v = i(d, p);
                                  o._transceive(a, v.codecs.length > 0, !1);
                                }
                              });
                            }
                            return (
                              (o._localDescription = { type: e.type, sdp: e.sdp }),
                              'offer' === e.type
                                ? o._updateSignalingState('have-local-offer')
                                : o._updateSignalingState('stable'),
                              Promise.resolve()
                            );
                          }),
                          (l.prototype.setRemoteDescription = function (o) {
                            var l = this;
                            if (-1 === ['offer', 'answer'].indexOf(o.type))
                              return Promise.reject(c('TypeError', 'Unsupported type "' + o.type + '"'));
                            if (!a('setRemoteDescription', o.type, l.signalingState) || l._isClosed)
                              return Promise.reject(
                                c(
                                  'InvalidStateError',
                                  'Can not set remote ' + o.type + ' in state ' + l.signalingState,
                                ),
                              );
                            var d = {};
                            l.remoteStreams.forEach(function (e) {
                              d[e.id] = e;
                            });
                            var p = [],
                              f = r.splitSections(o.sdp),
                              h = f.shift(),
                              v = r.matchPrefix(h, 'a=ice-lite').length > 0,
                              m = r.matchPrefix(h, 'a=group:BUNDLE ').length > 0;
                            l.usingBundle = m;
                            var y = r.matchPrefix(h, 'a=ice-options:')[0];
                            return (
                              (l.canTrickleIceCandidates = !!y && y.substr(14).split(' ').indexOf('trickle') >= 0),
                              f.forEach(function (a, c) {
                                var u = r.splitLines(a),
                                  f = r.getKind(a),
                                  y = r.isRejected(a) && 0 === r.matchPrefix(a, 'a=bundle-only').length,
                                  g = u[0].substr(2).split(' ')[2],
                                  b = r.getDirection(a, h),
                                  S = r.parseMsid(a),
                                  C = r.getMid(a) || r.generateIdentifier();
                                if (y || ('application' === f && ('DTLS/SCTP' === g || 'UDP/DTLS/SCTP' === g)))
                                  l.transceivers[c] = { mid: C, kind: f, protocol: g, rejected: !0 };
                                else {
                                  var w, E, _, T, k, R, x, O, P;
                                  !y &&
                                    l.transceivers[c] &&
                                    l.transceivers[c].rejected &&
                                    (l.transceivers[c] = l._createTransceiver(f, !0));
                                  var D,
                                    M,
                                    A = r.parseRtpParameters(a);
                                  y ||
                                    ((D = r.getIceParameters(a, h)), ((M = r.getDtlsParameters(a, h)).role = 'client')),
                                    (x = r.parseRtpEncodingParameters(a));
                                  var I = r.parseRtcpParameters(a),
                                    j = r.matchPrefix(a, 'a=end-of-candidates', h).length > 0,
                                    L = r
                                      .matchPrefix(a, 'a=candidate:')
                                      .map(function (e) {
                                        return r.parseCandidate(e);
                                      })
                                      .filter(function (e) {
                                        return 1 === e.component;
                                      });
                                  if (
                                    (('offer' === o.type || 'answer' === o.type) &&
                                      !y &&
                                      m &&
                                      c > 0 &&
                                      l.transceivers[c] &&
                                      (l._disposeIceAndDtlsTransports(c),
                                      (l.transceivers[c].iceGatherer = l.transceivers[0].iceGatherer),
                                      (l.transceivers[c].iceTransport = l.transceivers[0].iceTransport),
                                      (l.transceivers[c].dtlsTransport = l.transceivers[0].dtlsTransport),
                                      l.transceivers[c].rtpSender &&
                                        l.transceivers[c].rtpSender.setTransport(l.transceivers[0].dtlsTransport),
                                      l.transceivers[c].rtpReceiver &&
                                        l.transceivers[c].rtpReceiver.setTransport(l.transceivers[0].dtlsTransport)),
                                    'offer' !== o.type || y)
                                  )
                                    'answer' !== o.type ||
                                      y ||
                                      ((E = (w = l.transceivers[c]).iceGatherer),
                                      (_ = w.iceTransport),
                                      (T = w.dtlsTransport),
                                      (k = w.rtpReceiver),
                                      (R = w.sendEncodingParameters),
                                      (O = w.localCapabilities),
                                      (l.transceivers[c].recvEncodingParameters = x),
                                      (l.transceivers[c].remoteCapabilities = A),
                                      (l.transceivers[c].rtcpParameters = I),
                                      L.length &&
                                        'new' === _.state &&
                                        ((!v && !j) || (m && 0 !== c)
                                          ? L.forEach(function (e) {
                                              s(w.iceTransport, e);
                                            })
                                          : _.setRemoteCandidates(L)),
                                      (m && 0 !== c) ||
                                        ('new' === _.state && _.start(E, D, 'controlling'),
                                        'new' === T.state && T.start(M)),
                                      !i(w.localCapabilities, w.remoteCapabilities).codecs.filter(function (e) {
                                        return 'rtx' === e.name.toLowerCase();
                                      }).length &&
                                        w.sendEncodingParameters[0].rtx &&
                                        delete w.sendEncodingParameters[0].rtx,
                                      l._transceive(
                                        w,
                                        'sendrecv' === b || 'recvonly' === b,
                                        'sendrecv' === b || 'sendonly' === b,
                                      ),
                                      !k || ('sendrecv' !== b && 'sendonly' !== b)
                                        ? delete w.rtpReceiver
                                        : ((P = k.track),
                                          S
                                            ? (d[S.stream] || (d[S.stream] = new e.MediaStream()),
                                              n(P, d[S.stream]),
                                              p.push([P, k, d[S.stream]]))
                                            : (d.default || (d.default = new e.MediaStream()),
                                              n(P, d.default),
                                              p.push([P, k, d.default]))));
                                  else {
                                    ((w = l.transceivers[c] || l._createTransceiver(f)).mid = C),
                                      w.iceGatherer || (w.iceGatherer = l._createIceGatherer(c, m)),
                                      L.length &&
                                        'new' === w.iceTransport.state &&
                                        (!j || (m && 0 !== c)
                                          ? L.forEach(function (e) {
                                              s(w.iceTransport, e);
                                            })
                                          : w.iceTransport.setRemoteCandidates(L)),
                                      (O = e.RTCRtpReceiver.getCapabilities(f)),
                                      t < 15019 &&
                                        (O.codecs = O.codecs.filter(function (e) {
                                          return 'rtx' !== e.name;
                                        })),
                                      (R = w.sendEncodingParameters || [{ ssrc: 1001 * (2 * c + 2) }]);
                                    var N,
                                      F = !1;
                                    'sendrecv' === b || 'sendonly' === b
                                      ? ((F = !w.rtpReceiver),
                                        (k = w.rtpReceiver || new e.RTCRtpReceiver(w.dtlsTransport, f)),
                                        F &&
                                          ((P = k.track),
                                          (S && '-' === S.stream) ||
                                            (S
                                              ? (d[S.stream] ||
                                                  ((d[S.stream] = new e.MediaStream()),
                                                  Object.defineProperty(d[S.stream], 'id', {
                                                    get: function () {
                                                      return S.stream;
                                                    },
                                                  })),
                                                Object.defineProperty(P, 'id', {
                                                  get: function () {
                                                    return S.track;
                                                  },
                                                }),
                                                (N = d[S.stream]))
                                              : (d.default || (d.default = new e.MediaStream()), (N = d.default))),
                                          N && (n(P, N), w.associatedRemoteMediaStreams.push(N)),
                                          p.push([P, k, N])))
                                      : w.rtpReceiver &&
                                        w.rtpReceiver.track &&
                                        (w.associatedRemoteMediaStreams.forEach(function (t) {
                                          var n = t.getTracks().find(function (e) {
                                            return e.id === w.rtpReceiver.track.id;
                                          });
                                          n &&
                                            (function (t, n) {
                                              n.removeTrack(t),
                                                n.dispatchEvent(
                                                  new e.MediaStreamTrackEvent('removetrack', { track: t }),
                                                );
                                            })(n, t);
                                        }),
                                        (w.associatedRemoteMediaStreams = [])),
                                      (w.localCapabilities = O),
                                      (w.remoteCapabilities = A),
                                      (w.rtpReceiver = k),
                                      (w.rtcpParameters = I),
                                      (w.sendEncodingParameters = R),
                                      (w.recvEncodingParameters = x),
                                      l._transceive(l.transceivers[c], !1, F);
                                  }
                                }
                              }),
                              void 0 === l._dtlsRole && (l._dtlsRole = 'offer' === o.type ? 'active' : 'passive'),
                              (l._remoteDescription = { type: o.type, sdp: o.sdp }),
                              'offer' === o.type
                                ? l._updateSignalingState('have-remote-offer')
                                : l._updateSignalingState('stable'),
                              Object.keys(d).forEach(function (t) {
                                var n = d[t];
                                if (n.getTracks().length) {
                                  if (-1 === l.remoteStreams.indexOf(n)) {
                                    l.remoteStreams.push(n);
                                    var r = new Event('addstream');
                                    (r.stream = n),
                                      e.setTimeout(function () {
                                        l._dispatchEvent('addstream', r);
                                      });
                                  }
                                  p.forEach(function (e) {
                                    var t = e[0],
                                      r = e[1];
                                    n.id === e[2].id && u(l, t, r, [n]);
                                  });
                                }
                              }),
                              p.forEach(function (e) {
                                e[2] || u(l, e[0], e[1], []);
                              }),
                              e.setTimeout(function () {
                                l &&
                                  l.transceivers &&
                                  l.transceivers.forEach(function (e) {
                                    e.iceTransport &&
                                      'new' === e.iceTransport.state &&
                                      e.iceTransport.getRemoteCandidates().length > 0 &&
                                      (console.warn(
                                        'Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification',
                                      ),
                                      e.iceTransport.addRemoteCandidate({}));
                                  });
                              }, 4e3),
                              Promise.resolve()
                            );
                          }),
                          (l.prototype.close = function () {
                            this.transceivers.forEach(function (e) {
                              e.iceTransport && e.iceTransport.stop(),
                                e.dtlsTransport && e.dtlsTransport.stop(),
                                e.rtpSender && e.rtpSender.stop(),
                                e.rtpReceiver && e.rtpReceiver.stop();
                            }),
                              (this._isClosed = !0),
                              this._updateSignalingState('closed');
                          }),
                          (l.prototype._updateSignalingState = function (e) {
                            this.signalingState = e;
                            var t = new Event('signalingstatechange');
                            this._dispatchEvent('signalingstatechange', t);
                          }),
                          (l.prototype._maybeFireNegotiationNeeded = function () {
                            var t = this;
                            'stable' === this.signalingState &&
                              !0 !== this.needNegotiation &&
                              ((this.needNegotiation = !0),
                              e.setTimeout(function () {
                                if (t.needNegotiation) {
                                  t.needNegotiation = !1;
                                  var e = new Event('negotiationneeded');
                                  t._dispatchEvent('negotiationneeded', e);
                                }
                              }, 0));
                          }),
                          (l.prototype._updateIceConnectionState = function () {
                            var e,
                              t = {
                                new: 0,
                                closed: 0,
                                checking: 0,
                                connected: 0,
                                completed: 0,
                                disconnected: 0,
                                failed: 0,
                              };
                            if (
                              (this.transceivers.forEach(function (e) {
                                e.iceTransport && !e.rejected && t[e.iceTransport.state]++;
                              }),
                              (e = 'new'),
                              t.failed > 0
                                ? (e = 'failed')
                                : t.checking > 0
                                ? (e = 'checking')
                                : t.disconnected > 0
                                ? (e = 'disconnected')
                                : t.new > 0
                                ? (e = 'new')
                                : t.connected > 0
                                ? (e = 'connected')
                                : t.completed > 0 && (e = 'completed'),
                              e !== this.iceConnectionState)
                            ) {
                              this.iceConnectionState = e;
                              var n = new Event('iceconnectionstatechange');
                              this._dispatchEvent('iceconnectionstatechange', n);
                            }
                          }),
                          (l.prototype._updateConnectionState = function () {
                            var e,
                              t = {
                                new: 0,
                                closed: 0,
                                connecting: 0,
                                connected: 0,
                                completed: 0,
                                disconnected: 0,
                                failed: 0,
                              };
                            if (
                              (this.transceivers.forEach(function (e) {
                                e.iceTransport &&
                                  e.dtlsTransport &&
                                  !e.rejected &&
                                  (t[e.iceTransport.state]++, t[e.dtlsTransport.state]++);
                              }),
                              (t.connected += t.completed),
                              (e = 'new'),
                              t.failed > 0
                                ? (e = 'failed')
                                : t.connecting > 0
                                ? (e = 'connecting')
                                : t.disconnected > 0
                                ? (e = 'disconnected')
                                : t.new > 0
                                ? (e = 'new')
                                : t.connected > 0 && (e = 'connected'),
                              e !== this.connectionState)
                            ) {
                              this.connectionState = e;
                              var n = new Event('connectionstatechange');
                              this._dispatchEvent('connectionstatechange', n);
                            }
                          }),
                          (l.prototype.createOffer = function () {
                            var n = this;
                            if (n._isClosed)
                              return Promise.reject(c('InvalidStateError', 'Can not call createOffer after close'));
                            var i = n.transceivers.filter(function (e) {
                                return 'audio' === e.kind;
                              }).length,
                              a = n.transceivers.filter(function (e) {
                                return 'video' === e.kind;
                              }).length,
                              s = arguments[0];
                            if (s) {
                              if (s.mandatory || s.optional)
                                throw new TypeError('Legacy mandatory/optional constraints not supported.');
                              void 0 !== s.offerToReceiveAudio &&
                                (i =
                                  !0 === s.offerToReceiveAudio
                                    ? 1
                                    : !1 === s.offerToReceiveAudio
                                    ? 0
                                    : s.offerToReceiveAudio),
                                void 0 !== s.offerToReceiveVideo &&
                                  (a =
                                    !0 === s.offerToReceiveVideo
                                      ? 1
                                      : !1 === s.offerToReceiveVideo
                                      ? 0
                                      : s.offerToReceiveVideo);
                            }
                            for (
                              n.transceivers.forEach(function (e) {
                                'audio' === e.kind
                                  ? --i < 0 && (e.wantReceive = !1)
                                  : 'video' === e.kind && --a < 0 && (e.wantReceive = !1);
                              });
                              i > 0 || a > 0;

                            )
                              i > 0 && (n._createTransceiver('audio'), i--),
                                a > 0 && (n._createTransceiver('video'), a--);
                            var u = r.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
                            n.transceivers.forEach(function (o, i) {
                              var a = o.track,
                                s = o.kind,
                                c = o.mid || r.generateIdentifier();
                              (o.mid = c), o.iceGatherer || (o.iceGatherer = n._createIceGatherer(i, n.usingBundle));
                              var u = e.RTCRtpSender.getCapabilities(s);
                              t < 15019 &&
                                (u.codecs = u.codecs.filter(function (e) {
                                  return 'rtx' !== e.name;
                                })),
                                u.codecs.forEach(function (e) {
                                  'H264' === e.name &&
                                    void 0 === e.parameters['level-asymmetry-allowed'] &&
                                    (e.parameters['level-asymmetry-allowed'] = '1'),
                                    o.remoteCapabilities &&
                                      o.remoteCapabilities.codecs &&
                                      o.remoteCapabilities.codecs.forEach(function (t) {
                                        e.name.toLowerCase() === t.name.toLowerCase() &&
                                          e.clockRate === t.clockRate &&
                                          (e.preferredPayloadType = t.payloadType);
                                      });
                                }),
                                u.headerExtensions.forEach(function (e) {
                                  ((o.remoteCapabilities && o.remoteCapabilities.headerExtensions) || []).forEach(
                                    function (t) {
                                      e.uri === t.uri && (e.id = t.id);
                                    },
                                  );
                                });
                              var l = o.sendEncodingParameters || [{ ssrc: 1001 * (2 * i + 1) }];
                              a && t >= 15019 && 'video' === s && !l[0].rtx && (l[0].rtx = { ssrc: l[0].ssrc + 1 }),
                                o.wantReceive && (o.rtpReceiver = new e.RTCRtpReceiver(o.dtlsTransport, s)),
                                (o.localCapabilities = u),
                                (o.sendEncodingParameters = l);
                            }),
                              'max-compat' !== n._config.bundlePolicy &&
                                (u +=
                                  'a=group:BUNDLE ' +
                                  n.transceivers
                                    .map(function (e) {
                                      return e.mid;
                                    })
                                    .join(' ') +
                                  '\r\n'),
                              (u += 'a=ice-options:trickle\r\n'),
                              n.transceivers.forEach(function (e, t) {
                                (u += o(e, e.localCapabilities, 'offer', e.stream, n._dtlsRole)),
                                  (u += 'a=rtcp-rsize\r\n'),
                                  !e.iceGatherer ||
                                    'new' === n.iceGatheringState ||
                                    (0 !== t && n.usingBundle) ||
                                    (e.iceGatherer.getLocalCandidates().forEach(function (e) {
                                      (e.component = 1), (u += 'a=' + r.writeCandidate(e) + '\r\n');
                                    }),
                                    'completed' === e.iceGatherer.state && (u += 'a=end-of-candidates\r\n'));
                              });
                            var l = new e.RTCSessionDescription({ type: 'offer', sdp: u });
                            return Promise.resolve(l);
                          }),
                          (l.prototype.createAnswer = function () {
                            var n = this;
                            if (n._isClosed)
                              return Promise.reject(c('InvalidStateError', 'Can not call createAnswer after close'));
                            if ('have-remote-offer' !== n.signalingState && 'have-local-pranswer' !== n.signalingState)
                              return Promise.reject(
                                c(
                                  'InvalidStateError',
                                  'Can not call createAnswer in signalingState ' + n.signalingState,
                                ),
                              );
                            var a = r.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
                            n.usingBundle &&
                              (a +=
                                'a=group:BUNDLE ' +
                                n.transceivers
                                  .map(function (e) {
                                    return e.mid;
                                  })
                                  .join(' ') +
                                '\r\n'),
                              (a += 'a=ice-options:trickle\r\n');
                            var s = r.getMediaSections(n._remoteDescription.sdp).length;
                            n.transceivers.forEach(function (e, r) {
                              if (!(r + 1 > s)) {
                                if (e.rejected)
                                  return (
                                    'application' === e.kind
                                      ? 'DTLS/SCTP' === e.protocol
                                        ? (a += 'm=application 0 DTLS/SCTP 5000\r\n')
                                        : (a += 'm=application 0 ' + e.protocol + ' webrtc-datachannel\r\n')
                                      : 'audio' === e.kind
                                      ? (a += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n')
                                      : 'video' === e.kind &&
                                        (a += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n'),
                                    void (a += 'c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:' + e.mid + '\r\n')
                                  );
                                var c;
                                e.stream &&
                                  ('audio' === e.kind
                                    ? (c = e.stream.getAudioTracks()[0])
                                    : 'video' === e.kind && (c = e.stream.getVideoTracks()[0]),
                                  c &&
                                    t >= 15019 &&
                                    'video' === e.kind &&
                                    !e.sendEncodingParameters[0].rtx &&
                                    (e.sendEncodingParameters[0].rtx = { ssrc: e.sendEncodingParameters[0].ssrc + 1 }));
                                var u = i(e.localCapabilities, e.remoteCapabilities);
                                !u.codecs.filter(function (e) {
                                  return 'rtx' === e.name.toLowerCase();
                                }).length &&
                                  e.sendEncodingParameters[0].rtx &&
                                  delete e.sendEncodingParameters[0].rtx,
                                  (a += o(e, u, 'answer', e.stream, n._dtlsRole)),
                                  e.rtcpParameters && e.rtcpParameters.reducedSize && (a += 'a=rtcp-rsize\r\n');
                              }
                            });
                            var u = new e.RTCSessionDescription({ type: 'answer', sdp: a });
                            return Promise.resolve(u);
                          }),
                          (l.prototype.addIceCandidate = function (e) {
                            var t,
                              n = this;
                            return e && void 0 === e.sdpMLineIndex && !e.sdpMid
                              ? Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'))
                              : new Promise(function (o, i) {
                                  if (!n._remoteDescription)
                                    return i(
                                      c('InvalidStateError', 'Can not add ICE candidate without a remote description'),
                                    );
                                  if (e && '' !== e.candidate) {
                                    var a = e.sdpMLineIndex;
                                    if (e.sdpMid)
                                      for (var u = 0; u < n.transceivers.length; u++)
                                        if (n.transceivers[u].mid === e.sdpMid) {
                                          a = u;
                                          break;
                                        }
                                    var l = n.transceivers[a];
                                    if (!l) return i(c('OperationError', 'Can not add ICE candidate'));
                                    if (l.rejected) return o();
                                    var d = Object.keys(e.candidate).length > 0 ? r.parseCandidate(e.candidate) : {};
                                    if ('tcp' === d.protocol && (0 === d.port || 9 === d.port)) return o();
                                    if (d.component && 1 !== d.component) return o();
                                    if (
                                      (0 === a || (a > 0 && l.iceTransport !== n.transceivers[0].iceTransport)) &&
                                      !s(l.iceTransport, d)
                                    )
                                      return i(c('OperationError', 'Can not add ICE candidate'));
                                    var p = e.candidate.trim();
                                    0 === p.indexOf('a=') && (p = p.substr(2)),
                                      ((t = r.getMediaSections(n._remoteDescription.sdp))[a] +=
                                        'a=' + (d.type ? p : 'end-of-candidates') + '\r\n'),
                                      (n._remoteDescription.sdp =
                                        r.getDescription(n._remoteDescription.sdp) + t.join(''));
                                  } else for (var f = 0; f < n.transceivers.length && (n.transceivers[f].rejected || (n.transceivers[f].iceTransport.addRemoteCandidate({}), ((t = r.getMediaSections(n._remoteDescription.sdp))[f] += 'a=end-of-candidates\r\n'), (n._remoteDescription.sdp = r.getDescription(n._remoteDescription.sdp) + t.join('')), !n.usingBundle)); f++);
                                  o();
                                });
                          }),
                          (l.prototype.getStats = function (t) {
                            if (t && t instanceof e.MediaStreamTrack) {
                              var n = null;
                              if (
                                (this.transceivers.forEach(function (e) {
                                  e.rtpSender && e.rtpSender.track === t
                                    ? (n = e.rtpSender)
                                    : e.rtpReceiver && e.rtpReceiver.track === t && (n = e.rtpReceiver);
                                }),
                                !n)
                              )
                                throw c('InvalidAccessError', 'Invalid selector.');
                              return n.getStats();
                            }
                            var r = [];
                            return (
                              this.transceivers.forEach(function (e) {
                                ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport', 'dtlsTransport'].forEach(
                                  function (t) {
                                    e[t] && r.push(e[t].getStats());
                                  },
                                );
                              }),
                              Promise.all(r).then(function (e) {
                                var t = new Map();
                                return (
                                  e.forEach(function (e) {
                                    e.forEach(function (e) {
                                      t.set(e.id, e);
                                    });
                                  }),
                                  t
                                );
                              })
                            );
                          }),
                          [
                            'RTCRtpSender',
                            'RTCRtpReceiver',
                            'RTCIceGatherer',
                            'RTCIceTransport',
                            'RTCDtlsTransport',
                          ].forEach(function (t) {
                            var n = e[t];
                            if (n && n.prototype && n.prototype.getStats) {
                              var r = n.prototype.getStats;
                              n.prototype.getStats = function () {
                                return r.apply(this).then(function (e) {
                                  var t = new Map();
                                  return (
                                    Object.keys(e).forEach(function (n) {
                                      var r;
                                      (e[n].type =
                                        {
                                          inboundrtp: 'inbound-rtp',
                                          outboundrtp: 'outbound-rtp',
                                          candidatepair: 'candidate-pair',
                                          localcandidate: 'local-candidate',
                                          remotecandidate: 'remote-candidate',
                                        }[(r = e[n]).type] || r.type),
                                        t.set(n, e[n]);
                                    }),
                                    t
                                  );
                                });
                              };
                            }
                          });
                        var d = ['createOffer', 'createAnswer'];
                        return (
                          d.forEach(function (e) {
                            var t = l.prototype[e];
                            l.prototype[e] = function () {
                              var e = arguments;
                              return 'function' == typeof e[0] || 'function' == typeof e[1]
                                ? t.apply(this, [arguments[2]]).then(
                                    function (t) {
                                      'function' == typeof e[0] && e[0].apply(null, [t]);
                                    },
                                    function (t) {
                                      'function' == typeof e[1] && e[1].apply(null, [t]);
                                    },
                                  )
                                : t.apply(this, arguments);
                            };
                          }),
                          (d = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']).forEach(function (
                            e,
                          ) {
                            var t = l.prototype[e];
                            l.prototype[e] = function () {
                              var e = arguments;
                              return 'function' == typeof e[1] || 'function' == typeof e[2]
                                ? t.apply(this, arguments).then(
                                    function () {
                                      'function' == typeof e[1] && e[1].apply(null);
                                    },
                                    function (t) {
                                      'function' == typeof e[2] && e[2].apply(null, [t]);
                                    },
                                  )
                                : t.apply(this, arguments);
                            };
                          }),
                          ['getStats'].forEach(function (e) {
                            var t = l.prototype[e];
                            l.prototype[e] = function () {
                              var e = arguments;
                              return 'function' == typeof e[1]
                                ? t.apply(this, arguments).then(function () {
                                    'function' == typeof e[1] && e[1].apply(null);
                                  })
                                : t.apply(this, arguments);
                            };
                          }),
                          l
                        );
                      };
                    },
                    347: function (e) {
                      'use strict';
                      var t = {
                        generateIdentifier: function () {
                          return Math.random().toString(36).substr(2, 10);
                        },
                      };
                      (t.localCName = t.generateIdentifier()),
                        (t.splitLines = function (e) {
                          return e
                            .trim()
                            .split('\n')
                            .map(function (e) {
                              return e.trim();
                            });
                        }),
                        (t.splitSections = function (e) {
                          return e.split('\nm=').map(function (e, t) {
                            return (t > 0 ? 'm=' + e : e).trim() + '\r\n';
                          });
                        }),
                        (t.getDescription = function (e) {
                          var n = t.splitSections(e);
                          return n && n[0];
                        }),
                        (t.getMediaSections = function (e) {
                          var n = t.splitSections(e);
                          return n.shift(), n;
                        }),
                        (t.matchPrefix = function (e, n) {
                          return t.splitLines(e).filter(function (e) {
                            return 0 === e.indexOf(n);
                          });
                        }),
                        (t.parseCandidate = function (e) {
                          for (
                            var t,
                              n = {
                                foundation: (t =
                                  0 === e.indexOf('a=candidate:')
                                    ? e.substring(12).split(' ')
                                    : e.substring(10).split(' '))[0],
                                component: parseInt(t[1], 10),
                                protocol: t[2].toLowerCase(),
                                priority: parseInt(t[3], 10),
                                ip: t[4],
                                address: t[4],
                                port: parseInt(t[5], 10),
                                type: t[7],
                              },
                              r = 8;
                            r < t.length;
                            r += 2
                          )
                            switch (t[r]) {
                              case 'raddr':
                                n.relatedAddress = t[r + 1];
                                break;
                              case 'rport':
                                n.relatedPort = parseInt(t[r + 1], 10);
                                break;
                              case 'tcptype':
                                n.tcpType = t[r + 1];
                                break;
                              case 'ufrag':
                                (n.ufrag = t[r + 1]), (n.usernameFragment = t[r + 1]);
                                break;
                              default:
                                n[t[r]] = t[r + 1];
                            }
                          return n;
                        }),
                        (t.writeCandidate = function (e) {
                          var t = [];
                          t.push(e.foundation),
                            t.push(e.component),
                            t.push(e.protocol.toUpperCase()),
                            t.push(e.priority),
                            t.push(e.address || e.ip),
                            t.push(e.port);
                          var n = e.type;
                          return (
                            t.push('typ'),
                            t.push(n),
                            'host' !== n &&
                              e.relatedAddress &&
                              e.relatedPort &&
                              (t.push('raddr'), t.push(e.relatedAddress), t.push('rport'), t.push(e.relatedPort)),
                            e.tcpType && 'tcp' === e.protocol.toLowerCase() && (t.push('tcptype'), t.push(e.tcpType)),
                            (e.usernameFragment || e.ufrag) && (t.push('ufrag'), t.push(e.usernameFragment || e.ufrag)),
                            'candidate:' + t.join(' ')
                          );
                        }),
                        (t.parseIceOptions = function (e) {
                          return e.substr(14).split(' ');
                        }),
                        (t.parseRtpMap = function (e) {
                          var t = e.substr(9).split(' '),
                            n = { payloadType: parseInt(t.shift(), 10) };
                          return (
                            (t = t[0].split('/')),
                            (n.name = t[0]),
                            (n.clockRate = parseInt(t[1], 10)),
                            (n.channels = 3 === t.length ? parseInt(t[2], 10) : 1),
                            (n.numChannels = n.channels),
                            n
                          );
                        }),
                        (t.writeRtpMap = function (e) {
                          var t = e.payloadType;
                          void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
                          var n = e.channels || e.numChannels || 1;
                          return 'a=rtpmap:' + t + ' ' + e.name + '/' + e.clockRate + (1 !== n ? '/' + n : '') + '\r\n';
                        }),
                        (t.parseExtmap = function (e) {
                          var t = e.substr(9).split(' ');
                          return {
                            id: parseInt(t[0], 10),
                            direction: t[0].indexOf('/') > 0 ? t[0].split('/')[1] : 'sendrecv',
                            uri: t[1],
                          };
                        }),
                        (t.writeExtmap = function (e) {
                          return (
                            'a=extmap:' +
                            (e.id || e.preferredId) +
                            (e.direction && 'sendrecv' !== e.direction ? '/' + e.direction : '') +
                            ' ' +
                            e.uri +
                            '\r\n'
                          );
                        }),
                        (t.parseFmtp = function (e) {
                          for (var t, n = {}, r = e.substr(e.indexOf(' ') + 1).split(';'), o = 0; o < r.length; o++)
                            n[(t = r[o].trim().split('='))[0].trim()] = t[1];
                          return n;
                        }),
                        (t.writeFmtp = function (e) {
                          var t = '',
                            n = e.payloadType;
                          if (
                            (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType),
                            e.parameters && Object.keys(e.parameters).length)
                          ) {
                            var r = [];
                            Object.keys(e.parameters).forEach(function (t) {
                              e.parameters[t] ? r.push(t + '=' + e.parameters[t]) : r.push(t);
                            }),
                              (t += 'a=fmtp:' + n + ' ' + r.join(';') + '\r\n');
                          }
                          return t;
                        }),
                        (t.parseRtcpFb = function (e) {
                          var t = e.substr(e.indexOf(' ') + 1).split(' ');
                          return { type: t.shift(), parameter: t.join(' ') };
                        }),
                        (t.writeRtcpFb = function (e) {
                          var t = '',
                            n = e.payloadType;
                          return (
                            void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType),
                            e.rtcpFeedback &&
                              e.rtcpFeedback.length &&
                              e.rtcpFeedback.forEach(function (e) {
                                t +=
                                  'a=rtcp-fb:' +
                                  n +
                                  ' ' +
                                  e.type +
                                  (e.parameter && e.parameter.length ? ' ' + e.parameter : '') +
                                  '\r\n';
                              }),
                            t
                          );
                        }),
                        (t.parseSsrcMedia = function (e) {
                          var t = e.indexOf(' '),
                            n = { ssrc: parseInt(e.substr(7, t - 7), 10) },
                            r = e.indexOf(':', t);
                          return (
                            r > -1
                              ? ((n.attribute = e.substr(t + 1, r - t - 1)), (n.value = e.substr(r + 1)))
                              : (n.attribute = e.substr(t + 1)),
                            n
                          );
                        }),
                        (t.parseSsrcGroup = function (e) {
                          var t = e.substr(13).split(' ');
                          return {
                            semantics: t.shift(),
                            ssrcs: t.map(function (e) {
                              return parseInt(e, 10);
                            }),
                          };
                        }),
                        (t.getMid = function (e) {
                          var n = t.matchPrefix(e, 'a=mid:')[0];
                          if (n) return n.substr(6);
                        }),
                        (t.parseFingerprint = function (e) {
                          var t = e.substr(14).split(' ');
                          return { algorithm: t[0].toLowerCase(), value: t[1] };
                        }),
                        (t.getDtlsParameters = function (e, n) {
                          return {
                            role: 'auto',
                            fingerprints: t.matchPrefix(e + n, 'a=fingerprint:').map(t.parseFingerprint),
                          };
                        }),
                        (t.writeDtlsParameters = function (e, t) {
                          var n = 'a=setup:' + t + '\r\n';
                          return (
                            e.fingerprints.forEach(function (e) {
                              n += 'a=fingerprint:' + e.algorithm + ' ' + e.value + '\r\n';
                            }),
                            n
                          );
                        }),
                        (t.parseCryptoLine = function (e) {
                          var t = e.substr(9).split(' ');
                          return {
                            tag: parseInt(t[0], 10),
                            cryptoSuite: t[1],
                            keyParams: t[2],
                            sessionParams: t.slice(3),
                          };
                        }),
                        (t.writeCryptoLine = function (e) {
                          return (
                            'a=crypto:' +
                            e.tag +
                            ' ' +
                            e.cryptoSuite +
                            ' ' +
                            ('object' == c(e.keyParams) ? t.writeCryptoKeyParams(e.keyParams) : e.keyParams) +
                            (e.sessionParams ? ' ' + e.sessionParams.join(' ') : '') +
                            '\r\n'
                          );
                        }),
                        (t.parseCryptoKeyParams = function (e) {
                          if (0 !== e.indexOf('inline:')) return null;
                          var t = e.substr(7).split('|');
                          return {
                            keyMethod: 'inline',
                            keySalt: t[0],
                            lifeTime: t[1],
                            mkiValue: t[2] ? t[2].split(':')[0] : void 0,
                            mkiLength: t[2] ? t[2].split(':')[1] : void 0,
                          };
                        }),
                        (t.writeCryptoKeyParams = function (e) {
                          return (
                            e.keyMethod +
                            ':' +
                            e.keySalt +
                            (e.lifeTime ? '|' + e.lifeTime : '') +
                            (e.mkiValue && e.mkiLength ? '|' + e.mkiValue + ':' + e.mkiLength : '')
                          );
                        }),
                        (t.getCryptoParameters = function (e, n) {
                          return t.matchPrefix(e + n, 'a=crypto:').map(t.parseCryptoLine);
                        }),
                        (t.getIceParameters = function (e, n) {
                          var r = t.matchPrefix(e + n, 'a=ice-ufrag:')[0],
                            o = t.matchPrefix(e + n, 'a=ice-pwd:')[0];
                          return r && o ? { usernameFragment: r.substr(12), password: o.substr(10) } : null;
                        }),
                        (t.writeIceParameters = function (e) {
                          return 'a=ice-ufrag:' + e.usernameFragment + '\r\na=ice-pwd:' + e.password + '\r\n';
                        }),
                        (t.parseRtpParameters = function (e) {
                          for (
                            var n = { codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: [] },
                              r = t.splitLines(e)[0].split(' '),
                              o = 3;
                            o < r.length;
                            o++
                          ) {
                            var i = r[o],
                              a = t.matchPrefix(e, 'a=rtpmap:' + i + ' ')[0];
                            if (a) {
                              var s = t.parseRtpMap(a),
                                c = t.matchPrefix(e, 'a=fmtp:' + i + ' ');
                              switch (
                                ((s.parameters = c.length ? t.parseFmtp(c[0]) : {}),
                                (s.rtcpFeedback = t.matchPrefix(e, 'a=rtcp-fb:' + i + ' ').map(t.parseRtcpFb)),
                                n.codecs.push(s),
                                s.name.toUpperCase())
                              ) {
                                case 'RED':
                                case 'ULPFEC':
                                  n.fecMechanisms.push(s.name.toUpperCase());
                              }
                            }
                          }
                          return (
                            t.matchPrefix(e, 'a=extmap:').forEach(function (e) {
                              n.headerExtensions.push(t.parseExtmap(e));
                            }),
                            n
                          );
                        }),
                        (t.writeRtpDescription = function (e, n) {
                          var r = '';
                          (r += 'm=' + e + ' '),
                            (r += n.codecs.length > 0 ? '9' : '0'),
                            (r += ' UDP/TLS/RTP/SAVPF '),
                            (r +=
                              n.codecs
                                .map(function (e) {
                                  return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType;
                                })
                                .join(' ') + '\r\n'),
                            (r += 'c=IN IP4 0.0.0.0\r\n'),
                            (r += 'a=rtcp:9 IN IP4 0.0.0.0\r\n'),
                            n.codecs.forEach(function (e) {
                              (r += t.writeRtpMap(e)), (r += t.writeFmtp(e)), (r += t.writeRtcpFb(e));
                            });
                          var o = 0;
                          return (
                            n.codecs.forEach(function (e) {
                              e.maxptime > o && (o = e.maxptime);
                            }),
                            o > 0 && (r += 'a=maxptime:' + o + '\r\n'),
                            (r += 'a=rtcp-mux\r\n'),
                            n.headerExtensions &&
                              n.headerExtensions.forEach(function (e) {
                                r += t.writeExtmap(e);
                              }),
                            r
                          );
                        }),
                        (t.parseRtpEncodingParameters = function (e) {
                          var n,
                            r = [],
                            o = t.parseRtpParameters(e),
                            i = -1 !== o.fecMechanisms.indexOf('RED'),
                            a = -1 !== o.fecMechanisms.indexOf('ULPFEC'),
                            s = t
                              .matchPrefix(e, 'a=ssrc:')
                              .map(function (e) {
                                return t.parseSsrcMedia(e);
                              })
                              .filter(function (e) {
                                return 'cname' === e.attribute;
                              }),
                            c = s.length > 0 && s[0].ssrc,
                            u = t.matchPrefix(e, 'a=ssrc-group:FID').map(function (e) {
                              return e
                                .substr(17)
                                .split(' ')
                                .map(function (e) {
                                  return parseInt(e, 10);
                                });
                            });
                          u.length > 0 && u[0].length > 1 && u[0][0] === c && (n = u[0][1]),
                            o.codecs.forEach(function (e) {
                              if ('RTX' === e.name.toUpperCase() && e.parameters.apt) {
                                var t = { ssrc: c, codecPayloadType: parseInt(e.parameters.apt, 10) };
                                c && n && (t.rtx = { ssrc: n }),
                                  r.push(t),
                                  i &&
                                    (((t = JSON.parse(JSON.stringify(t))).fec = {
                                      ssrc: c,
                                      mechanism: a ? 'red+ulpfec' : 'red',
                                    }),
                                    r.push(t));
                              }
                            }),
                            0 === r.length && c && r.push({ ssrc: c });
                          var l = t.matchPrefix(e, 'b=');
                          return (
                            l.length &&
                              ((l =
                                0 === l[0].indexOf('b=TIAS:')
                                  ? parseInt(l[0].substr(7), 10)
                                  : 0 === l[0].indexOf('b=AS:')
                                  ? 1e3 * parseInt(l[0].substr(5), 10) * 0.95 - 16e3
                                  : void 0),
                              r.forEach(function (e) {
                                e.maxBitrate = l;
                              })),
                            r
                          );
                        }),
                        (t.parseRtcpParameters = function (e) {
                          var n = {},
                            r = t
                              .matchPrefix(e, 'a=ssrc:')
                              .map(function (e) {
                                return t.parseSsrcMedia(e);
                              })
                              .filter(function (e) {
                                return 'cname' === e.attribute;
                              })[0];
                          r && ((n.cname = r.value), (n.ssrc = r.ssrc));
                          var o = t.matchPrefix(e, 'a=rtcp-rsize');
                          (n.reducedSize = o.length > 0), (n.compound = 0 === o.length);
                          var i = t.matchPrefix(e, 'a=rtcp-mux');
                          return (n.mux = i.length > 0), n;
                        }),
                        (t.parseMsid = function (e) {
                          var n,
                            r = t.matchPrefix(e, 'a=msid:');
                          if (1 === r.length) return { stream: (n = r[0].substr(7).split(' '))[0], track: n[1] };
                          var o = t
                            .matchPrefix(e, 'a=ssrc:')
                            .map(function (e) {
                              return t.parseSsrcMedia(e);
                            })
                            .filter(function (e) {
                              return 'msid' === e.attribute;
                            });
                          return o.length > 0 ? { stream: (n = o[0].value.split(' '))[0], track: n[1] } : void 0;
                        }),
                        (t.parseSctpDescription = function (e) {
                          var n,
                            r = t.parseMLine(e),
                            o = t.matchPrefix(e, 'a=max-message-size:');
                          o.length > 0 && (n = parseInt(o[0].substr(19), 10)), isNaN(n) && (n = 65536);
                          var i = t.matchPrefix(e, 'a=sctp-port:');
                          if (i.length > 0)
                            return { port: parseInt(i[0].substr(12), 10), protocol: r.fmt, maxMessageSize: n };
                          if (t.matchPrefix(e, 'a=sctpmap:').length > 0) {
                            var a = t.matchPrefix(e, 'a=sctpmap:')[0].substr(10).split(' ');
                            return { port: parseInt(a[0], 10), protocol: a[1], maxMessageSize: n };
                          }
                        }),
                        (t.writeSctpDescription = function (e, t) {
                          var n = [];
                          return (
                            (n =
                              'DTLS/SCTP' !== e.protocol
                                ? [
                                    'm=' + e.kind + ' 9 ' + e.protocol + ' ' + t.protocol + '\r\n',
                                    'c=IN IP4 0.0.0.0\r\n',
                                    'a=sctp-port:' + t.port + '\r\n',
                                  ]
                                : [
                                    'm=' + e.kind + ' 9 ' + e.protocol + ' ' + t.port + '\r\n',
                                    'c=IN IP4 0.0.0.0\r\n',
                                    'a=sctpmap:' + t.port + ' ' + t.protocol + ' 65535\r\n',
                                  ]),
                            void 0 !== t.maxMessageSize && n.push('a=max-message-size:' + t.maxMessageSize + '\r\n'),
                            n.join('')
                          );
                        }),
                        (t.generateSessionId = function () {
                          return Math.random().toString().substr(2, 21);
                        }),
                        (t.writeSessionBoilerplate = function (e, n, r) {
                          var o = void 0 !== n ? n : 2;
                          return (
                            'v=0\r\no=' +
                            (r || 'thisisadapterortc') +
                            ' ' +
                            (e || t.generateSessionId()) +
                            ' ' +
                            o +
                            ' IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n'
                          );
                        }),
                        (t.writeMediaSection = function (e, n, r, o) {
                          var i = t.writeRtpDescription(e.kind, n);
                          if (
                            ((i += t.writeIceParameters(e.iceGatherer.getLocalParameters())),
                            (i += t.writeDtlsParameters(
                              e.dtlsTransport.getLocalParameters(),
                              'offer' === r ? 'actpass' : 'active',
                            )),
                            (i += 'a=mid:' + e.mid + '\r\n'),
                            e.direction
                              ? (i += 'a=' + e.direction + '\r\n')
                              : e.rtpSender && e.rtpReceiver
                              ? (i += 'a=sendrecv\r\n')
                              : e.rtpSender
                              ? (i += 'a=sendonly\r\n')
                              : e.rtpReceiver
                              ? (i += 'a=recvonly\r\n')
                              : (i += 'a=inactive\r\n'),
                            e.rtpSender)
                          ) {
                            var a = 'msid:' + o.id + ' ' + e.rtpSender.track.id + '\r\n';
                            (i += 'a=' + a),
                              (i += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' ' + a),
                              e.sendEncodingParameters[0].rtx &&
                                ((i += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' ' + a),
                                (i +=
                                  'a=ssrc-group:FID ' +
                                  e.sendEncodingParameters[0].ssrc +
                                  ' ' +
                                  e.sendEncodingParameters[0].rtx.ssrc +
                                  '\r\n'));
                          }
                          return (
                            (i += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' cname:' + t.localCName + '\r\n'),
                            e.rtpSender &&
                              e.sendEncodingParameters[0].rtx &&
                              (i +=
                                'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' cname:' + t.localCName + '\r\n'),
                            i
                          );
                        }),
                        (t.getDirection = function (e, n) {
                          for (var r = t.splitLines(e), o = 0; o < r.length; o++)
                            switch (r[o]) {
                              case 'a=sendrecv':
                              case 'a=sendonly':
                              case 'a=recvonly':
                              case 'a=inactive':
                                return r[o].substr(2);
                            }
                          return n ? t.getDirection(n) : 'sendrecv';
                        }),
                        (t.getKind = function (e) {
                          return t.splitLines(e)[0].split(' ')[0].substr(2);
                        }),
                        (t.isRejected = function (e) {
                          return '0' === e.split(' ', 2)[1];
                        }),
                        (t.parseMLine = function (e) {
                          var n = t.splitLines(e)[0].substr(2).split(' ');
                          return { kind: n[0], port: parseInt(n[1], 10), protocol: n[2], fmt: n.slice(3).join(' ') };
                        }),
                        (t.parseOLine = function (e) {
                          var n = t.matchPrefix(e, 'o=')[0].substr(2).split(' ');
                          return {
                            username: n[0],
                            sessionId: n[1],
                            sessionVersion: parseInt(n[2], 10),
                            netType: n[3],
                            addressType: n[4],
                            address: n[5],
                          };
                        }),
                        (t.isValidSDP = function (e) {
                          if ('string' != typeof e || 0 === e.length) return !1;
                          for (var n = t.splitLines(e), r = 0; r < n.length; r++)
                            if (n[r].length < 2 || '=' !== n[r].charAt(1)) return !1;
                          return !0;
                        }),
                        (e.exports = t);
                    },
                    6994: function (e, t, n) {
                      'use strict';
                      n.r(t),
                        n.d(t, {
                          default: function () {
                            return me;
                          },
                        });
                      var r = {};
                      n.r(r),
                        n.d(r, {
                          fixNegotiationNeeded: function () {
                            return A;
                          },
                          shimAddTrackRemoveTrack: function () {
                            return D;
                          },
                          shimAddTrackRemoveTrackWithNative: function () {
                            return P;
                          },
                          shimGetDisplayMedia: function () {
                            return _;
                          },
                          shimGetSendersWithDtmf: function () {
                            return R;
                          },
                          shimGetStats: function () {
                            return x;
                          },
                          shimGetUserMedia: function () {
                            return E;
                          },
                          shimMediaStream: function () {
                            return T;
                          },
                          shimOnTrack: function () {
                            return k;
                          },
                          shimPeerConnection: function () {
                            return M;
                          },
                          shimSenderReceiverGetStats: function () {
                            return O;
                          },
                        });
                      var o = {};
                      n.r(o),
                        n.d(o, {
                          shimGetDisplayMedia: function () {
                            return N;
                          },
                          shimGetUserMedia: function () {
                            return L;
                          },
                          shimPeerConnection: function () {
                            return F;
                          },
                          shimReplaceTrack: function () {
                            return B;
                          },
                        });
                      var i = {};
                      n.r(i),
                        n.d(i, {
                          shimAddTransceiver: function () {
                            return $;
                          },
                          shimCreateAnswer: function () {
                            return J;
                          },
                          shimCreateOffer: function () {
                            return X;
                          },
                          shimGetDisplayMedia: function () {
                            return G;
                          },
                          shimGetParameters: function () {
                            return Y;
                          },
                          shimGetUserMedia: function () {
                            return U;
                          },
                          shimOnTrack: function () {
                            return H;
                          },
                          shimPeerConnection: function () {
                            return W;
                          },
                          shimRTCDataChannel: function () {
                            return z;
                          },
                          shimReceiverGetStats: function () {
                            return K;
                          },
                          shimRemoveStream: function () {
                            return V;
                          },
                          shimSenderGetStats: function () {
                            return q;
                          },
                        });
                      var a = {};
                      n.r(a),
                        n.d(a, {
                          shimAudioContext: function () {
                            return ae;
                          },
                          shimCallbacksAPI: function () {
                            return ee;
                          },
                          shimConstraints: function () {
                            return ne;
                          },
                          shimCreateOfferLegacy: function () {
                            return ie;
                          },
                          shimGetUserMedia: function () {
                            return te;
                          },
                          shimLocalStreamsAPI: function () {
                            return Q;
                          },
                          shimRTCIceServerUrls: function () {
                            return re;
                          },
                          shimRemoteStreamsAPI: function () {
                            return Z;
                          },
                          shimTrackEventTransceiver: function () {
                            return oe;
                          },
                        });
                      var u = {};
                      n.r(u),
                        n.d(u, {
                          removeExtmapAllowMixed: function () {
                            return fe;
                          },
                          shimAddIceCandidateNullOrEmpty: function () {
                            return he;
                          },
                          shimConnectionState: function () {
                            return pe;
                          },
                          shimMaxMessageSize: function () {
                            return le;
                          },
                          shimRTCIceCandidate: function () {
                            return ue;
                          },
                          shimSendThrowTypeError: function () {
                            return de;
                          },
                        });
                      var l = !0,
                        d = !0;
                      function p(e, t, n) {
                        var r = e.match(t);
                        return r && r.length >= n && parseInt(r[n], 10);
                      }
                      function f(e, t, n) {
                        if (e.RTCPeerConnection) {
                          var r = e.RTCPeerConnection.prototype,
                            o = r.addEventListener;
                          r.addEventListener = function (e, r) {
                            if (e !== t) return o.apply(this, arguments);
                            var i = function (e) {
                              var t = n(e);
                              t && (r.handleEvent ? r.handleEvent(t) : r(t));
                            };
                            return (
                              (this._eventMap = this._eventMap || {}),
                              this._eventMap[t] || (this._eventMap[t] = new Map()),
                              this._eventMap[t].set(r, i),
                              o.apply(this, [e, i])
                            );
                          };
                          var i = r.removeEventListener;
                          (r.removeEventListener = function (e, n) {
                            if (e !== t || !this._eventMap || !this._eventMap[t]) return i.apply(this, arguments);
                            if (!this._eventMap[t].has(n)) return i.apply(this, arguments);
                            var r = this._eventMap[t].get(n);
                            return (
                              this._eventMap[t].delete(n),
                              0 === this._eventMap[t].size && delete this._eventMap[t],
                              0 === Object.keys(this._eventMap).length && delete this._eventMap,
                              i.apply(this, [e, r])
                            );
                          }),
                            Object.defineProperty(r, 'on' + t, {
                              get: function () {
                                return this['_on' + t];
                              },
                              set: function (e) {
                                this['_on' + t] &&
                                  (this.removeEventListener(t, this['_on' + t]), delete this['_on' + t]),
                                  e && this.addEventListener(t, (this['_on' + t] = e));
                              },
                              enumerable: !0,
                              configurable: !0,
                            });
                        }
                      }
                      function h(e) {
                        return 'boolean' != typeof e
                          ? new Error('Argument type: ' + c(e) + '. Please use a boolean.')
                          : ((l = e), e ? 'adapter.js logging disabled' : 'adapter.js logging enabled');
                      }
                      function v(e) {
                        return 'boolean' != typeof e
                          ? new Error('Argument type: ' + c(e) + '. Please use a boolean.')
                          : ((d = !e), 'adapter.js deprecation warnings ' + (e ? 'disabled' : 'enabled'));
                      }
                      function m() {
                        if ('object' == ('undefined' == typeof window ? 'undefined' : c(window))) {
                          if (l) return;
                          'undefined' != typeof console &&
                            'function' == typeof console.log &&
                            console.log.apply(console, arguments);
                        }
                      }
                      function y(e, t) {
                        d && console.warn(e + ' is deprecated, please use ' + t + ' instead.');
                      }
                      function g(e) {
                        return '[object Object]' === Object.prototype.toString.call(e);
                      }
                      function b(e) {
                        return g(e)
                          ? Object.keys(e).reduce(function (t, n) {
                              var r = g(e[n]),
                                o = r ? b(e[n]) : e[n],
                                i = r && !Object.keys(o).length;
                              return void 0 === o || i ? t : Object.assign(t, s({}, n, o));
                            }, {})
                          : e;
                      }
                      function S(e, t, n) {
                        t &&
                          !n.has(t.id) &&
                          (n.set(t.id, t),
                          Object.keys(t).forEach(function (r) {
                            r.endsWith('Id')
                              ? S(e, e.get(t[r]), n)
                              : r.endsWith('Ids') &&
                                t[r].forEach(function (t) {
                                  S(e, e.get(t), n);
                                });
                          }));
                      }
                      function C(e, t, n) {
                        var r = n ? 'outbound-rtp' : 'inbound-rtp',
                          o = new Map();
                        if (null === t) return o;
                        var i = [];
                        return (
                          e.forEach(function (e) {
                            'track' === e.type && e.trackIdentifier === t.id && i.push(e);
                          }),
                          i.forEach(function (t) {
                            e.forEach(function (n) {
                              n.type === r && n.trackId === t.id && S(e, n, o);
                            });
                          }),
                          o
                        );
                      }
                      var w = m;
                      function E(e, t) {
                        var n = e && e.navigator;
                        if (n.mediaDevices) {
                          var r = function (e) {
                              if ('object' != c(e) || e.mandatory || e.optional) return e;
                              var t = {};
                              return (
                                Object.keys(e).forEach(function (n) {
                                  if ('require' !== n && 'advanced' !== n && 'mediaSource' !== n) {
                                    var r = 'object' == c(e[n]) ? e[n] : { ideal: e[n] };
                                    void 0 !== r.exact && 'number' == typeof r.exact && (r.min = r.max = r.exact);
                                    var o = function (e, t) {
                                      return e
                                        ? e + t.charAt(0).toUpperCase() + t.slice(1)
                                        : 'deviceId' === t
                                        ? 'sourceId'
                                        : t;
                                    };
                                    if (void 0 !== r.ideal) {
                                      t.optional = t.optional || [];
                                      var i = {};
                                      'number' == typeof r.ideal
                                        ? ((i[o('min', n)] = r.ideal),
                                          t.optional.push(i),
                                          ((i = {})[o('max', n)] = r.ideal),
                                          t.optional.push(i))
                                        : ((i[o('', n)] = r.ideal), t.optional.push(i));
                                    }
                                    void 0 !== r.exact && 'number' != typeof r.exact
                                      ? ((t.mandatory = t.mandatory || {}), (t.mandatory[o('', n)] = r.exact))
                                      : ['min', 'max'].forEach(function (e) {
                                          void 0 !== r[e] &&
                                            ((t.mandatory = t.mandatory || {}), (t.mandatory[o(e, n)] = r[e]));
                                        });
                                  }
                                }),
                                e.advanced && (t.optional = (t.optional || []).concat(e.advanced)),
                                t
                              );
                            },
                            o = function (e, o) {
                              if (t.version >= 61) return o(e);
                              if ((e = JSON.parse(JSON.stringify(e))) && 'object' == c(e.audio)) {
                                var i = function (e, t, n) {
                                  t in e && !(n in e) && ((e[n] = e[t]), delete e[t]);
                                };
                                i((e = JSON.parse(JSON.stringify(e))).audio, 'autoGainControl', 'googAutoGainControl'),
                                  i(e.audio, 'noiseSuppression', 'googNoiseSuppression'),
                                  (e.audio = r(e.audio));
                              }
                              if (e && 'object' == c(e.video)) {
                                var a = e.video.facingMode;
                                a = a && ('object' == c(a) ? a : { ideal: a });
                                var s,
                                  u = t.version < 66;
                                if (
                                  a &&
                                  ('user' === a.exact ||
                                    'environment' === a.exact ||
                                    'user' === a.ideal ||
                                    'environment' === a.ideal) &&
                                  (!n.mediaDevices.getSupportedConstraints ||
                                    !n.mediaDevices.getSupportedConstraints().facingMode ||
                                    u) &&
                                  (delete e.video.facingMode,
                                  'environment' === a.exact || 'environment' === a.ideal
                                    ? (s = ['back', 'rear'])
                                    : ('user' !== a.exact && 'user' !== a.ideal) || (s = ['front']),
                                  s)
                                )
                                  return n.mediaDevices.enumerateDevices().then(function (t) {
                                    var n = (t = t.filter(function (e) {
                                      return 'videoinput' === e.kind;
                                    })).find(function (e) {
                                      return s.some(function (t) {
                                        return e.label.toLowerCase().includes(t);
                                      });
                                    });
                                    return (
                                      !n && t.length && s.includes('back') && (n = t[t.length - 1]),
                                      n && (e.video.deviceId = a.exact ? { exact: n.deviceId } : { ideal: n.deviceId }),
                                      (e.video = r(e.video)),
                                      w('chrome: ' + JSON.stringify(e)),
                                      o(e)
                                    );
                                  });
                                e.video = r(e.video);
                              }
                              return w('chrome: ' + JSON.stringify(e)), o(e);
                            },
                            i = function (e) {
                              return t.version >= 64
                                ? e
                                : {
                                    name:
                                      {
                                        PermissionDeniedError: 'NotAllowedError',
                                        PermissionDismissedError: 'NotAllowedError',
                                        InvalidStateError: 'NotAllowedError',
                                        DevicesNotFoundError: 'NotFoundError',
                                        ConstraintNotSatisfiedError: 'OverconstrainedError',
                                        TrackStartError: 'NotReadableError',
                                        MediaDeviceFailedDueToShutdown: 'NotAllowedError',
                                        MediaDeviceKillSwitchOn: 'NotAllowedError',
                                        TabCaptureError: 'AbortError',
                                        ScreenCaptureError: 'AbortError',
                                        DeviceCaptureError: 'AbortError',
                                      }[e.name] || e.name,
                                    message: e.message,
                                    constraint: e.constraint || e.constraintName,
                                    toString: function () {
                                      return this.name + (this.message && ': ') + this.message;
                                    },
                                  };
                            };
                          if (
                            ((n.getUserMedia = function (e, t, r) {
                              o(e, function (e) {
                                n.webkitGetUserMedia(e, t, function (e) {
                                  r && r(i(e));
                                });
                              });
                            }.bind(n)),
                            n.mediaDevices.getUserMedia)
                          ) {
                            var a = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
                            n.mediaDevices.getUserMedia = function (e) {
                              return o(e, function (e) {
                                return a(e).then(
                                  function (t) {
                                    if (
                                      (e.audio && !t.getAudioTracks().length) ||
                                      (e.video && !t.getVideoTracks().length)
                                    )
                                      throw (
                                        (t.getTracks().forEach(function (e) {
                                          e.stop();
                                        }),
                                        new DOMException('', 'NotFoundError'))
                                      );
                                    return t;
                                  },
                                  function (e) {
                                    return Promise.reject(i(e));
                                  },
                                );
                              });
                            };
                          }
                        }
                      }
                      function _(e, t) {
                        (e.navigator.mediaDevices && 'getDisplayMedia' in e.navigator.mediaDevices) ||
                          (e.navigator.mediaDevices &&
                            ('function' == typeof t
                              ? (e.navigator.mediaDevices.getDisplayMedia = function (n) {
                                  return t(n).then(function (t) {
                                    var r = n.video && n.video.width,
                                      o = n.video && n.video.height,
                                      i = n.video && n.video.frameRate;
                                    return (
                                      (n.video = {
                                        mandatory: {
                                          chromeMediaSource: 'desktop',
                                          chromeMediaSourceId: t,
                                          maxFrameRate: i || 3,
                                        },
                                      }),
                                      r && (n.video.mandatory.maxWidth = r),
                                      o && (n.video.mandatory.maxHeight = o),
                                      e.navigator.mediaDevices.getUserMedia(n)
                                    );
                                  });
                                })
                              : console.error('shimGetDisplayMedia: getSourceId argument is not a function')));
                      }
                      function T(e) {
                        e.MediaStream = e.MediaStream || e.webkitMediaStream;
                      }
                      function k(e) {
                        if ('object' == c(e) && e.RTCPeerConnection && !('ontrack' in e.RTCPeerConnection.prototype)) {
                          Object.defineProperty(e.RTCPeerConnection.prototype, 'ontrack', {
                            get: function () {
                              return this._ontrack;
                            },
                            set: function (e) {
                              this._ontrack && this.removeEventListener('track', this._ontrack),
                                this.addEventListener('track', (this._ontrack = e));
                            },
                            enumerable: !0,
                            configurable: !0,
                          });
                          var t = e.RTCPeerConnection.prototype.setRemoteDescription;
                          e.RTCPeerConnection.prototype.setRemoteDescription = function () {
                            var n = this;
                            return (
                              this._ontrackpoly ||
                                ((this._ontrackpoly = function (t) {
                                  t.stream.addEventListener('addtrack', function (r) {
                                    var o;
                                    o = e.RTCPeerConnection.prototype.getReceivers
                                      ? n.getReceivers().find(function (e) {
                                          return e.track && e.track.id === r.track.id;
                                        })
                                      : { track: r.track };
                                    var i = new Event('track');
                                    (i.track = r.track),
                                      (i.receiver = o),
                                      (i.transceiver = { receiver: o }),
                                      (i.streams = [t.stream]),
                                      n.dispatchEvent(i);
                                  }),
                                    t.stream.getTracks().forEach(function (r) {
                                      var o;
                                      o = e.RTCPeerConnection.prototype.getReceivers
                                        ? n.getReceivers().find(function (e) {
                                            return e.track && e.track.id === r.id;
                                          })
                                        : { track: r };
                                      var i = new Event('track');
                                      (i.track = r),
                                        (i.receiver = o),
                                        (i.transceiver = { receiver: o }),
                                        (i.streams = [t.stream]),
                                        n.dispatchEvent(i);
                                    });
                                }),
                                this.addEventListener('addstream', this._ontrackpoly)),
                              t.apply(this, arguments)
                            );
                          };
                        } else
                          f(e, 'track', function (e) {
                            return (
                              e.transceiver ||
                                Object.defineProperty(e, 'transceiver', { value: { receiver: e.receiver } }),
                              e
                            );
                          });
                      }
                      function R(e) {
                        if (
                          'object' == c(e) &&
                          e.RTCPeerConnection &&
                          !('getSenders' in e.RTCPeerConnection.prototype) &&
                          'createDTMFSender' in e.RTCPeerConnection.prototype
                        ) {
                          var t = function (e, t) {
                            return {
                              track: t,
                              get dtmf() {
                                return (
                                  void 0 === this._dtmf &&
                                    ('audio' === t.kind ? (this._dtmf = e.createDTMFSender(t)) : (this._dtmf = null)),
                                  this._dtmf
                                );
                              },
                              _pc: e,
                            };
                          };
                          if (!e.RTCPeerConnection.prototype.getSenders) {
                            e.RTCPeerConnection.prototype.getSenders = function () {
                              return (this._senders = this._senders || []), this._senders.slice();
                            };
                            var n = e.RTCPeerConnection.prototype.addTrack;
                            e.RTCPeerConnection.prototype.addTrack = function (e, r) {
                              var o = n.apply(this, arguments);
                              return o || ((o = t(this, e)), this._senders.push(o)), o;
                            };
                            var r = e.RTCPeerConnection.prototype.removeTrack;
                            e.RTCPeerConnection.prototype.removeTrack = function (e) {
                              r.apply(this, arguments);
                              var t = this._senders.indexOf(e);
                              -1 !== t && this._senders.splice(t, 1);
                            };
                          }
                          var o = e.RTCPeerConnection.prototype.addStream;
                          e.RTCPeerConnection.prototype.addStream = function (e) {
                            var n = this;
                            (this._senders = this._senders || []),
                              o.apply(this, [e]),
                              e.getTracks().forEach(function (e) {
                                n._senders.push(t(n, e));
                              });
                          };
                          var i = e.RTCPeerConnection.prototype.removeStream;
                          e.RTCPeerConnection.prototype.removeStream = function (e) {
                            var t = this;
                            (this._senders = this._senders || []),
                              i.apply(this, [e]),
                              e.getTracks().forEach(function (e) {
                                var n = t._senders.find(function (t) {
                                  return t.track === e;
                                });
                                n && t._senders.splice(t._senders.indexOf(n), 1);
                              });
                          };
                        } else if (
                          'object' == c(e) &&
                          e.RTCPeerConnection &&
                          'getSenders' in e.RTCPeerConnection.prototype &&
                          'createDTMFSender' in e.RTCPeerConnection.prototype &&
                          e.RTCRtpSender &&
                          !('dtmf' in e.RTCRtpSender.prototype)
                        ) {
                          var a = e.RTCPeerConnection.prototype.getSenders;
                          (e.RTCPeerConnection.prototype.getSenders = function () {
                            var e = this,
                              t = a.apply(this, []);
                            return (
                              t.forEach(function (t) {
                                return (t._pc = e);
                              }),
                              t
                            );
                          }),
                            Object.defineProperty(e.RTCRtpSender.prototype, 'dtmf', {
                              get: function () {
                                return (
                                  void 0 === this._dtmf &&
                                    ('audio' === this.track.kind
                                      ? (this._dtmf = this._pc.createDTMFSender(this.track))
                                      : (this._dtmf = null)),
                                  this._dtmf
                                );
                              },
                            });
                        }
                      }
                      function x(e) {
                        if (e.RTCPeerConnection) {
                          var t = e.RTCPeerConnection.prototype.getStats;
                          e.RTCPeerConnection.prototype.getStats = function () {
                            var e = this,
                              n = Array.prototype.slice.call(arguments),
                              r = n[0],
                              o = n[1],
                              i = n[2];
                            if (arguments.length > 0 && 'function' == typeof r) return t.apply(this, arguments);
                            if (0 === t.length && (0 === arguments.length || 'function' != typeof r))
                              return t.apply(this, []);
                            var a = function (e) {
                                var t = {};
                                return (
                                  e.result().forEach(function (e) {
                                    var n = {
                                      id: e.id,
                                      timestamp: e.timestamp,
                                      type:
                                        { localcandidate: 'local-candidate', remotecandidate: 'remote-candidate' }[
                                          e.type
                                        ] || e.type,
                                    };
                                    e.names().forEach(function (t) {
                                      n[t] = e.stat(t);
                                    }),
                                      (t[n.id] = n);
                                  }),
                                  t
                                );
                              },
                              s = function (e) {
                                return new Map(
                                  Object.keys(e).map(function (t) {
                                    return [t, e[t]];
                                  }),
                                );
                              };
                            if (arguments.length >= 2) {
                              var c = function (e) {
                                o(s(a(e)));
                              };
                              return t.apply(this, [c, r]);
                            }
                            return new Promise(function (n, r) {
                              t.apply(e, [
                                function (e) {
                                  n(s(a(e)));
                                },
                                r,
                              ]);
                            }).then(o, i);
                          };
                        }
                      }
                      function O(e) {
                        if ('object' == c(e) && e.RTCPeerConnection && e.RTCRtpSender && e.RTCRtpReceiver) {
                          if (!('getStats' in e.RTCRtpSender.prototype)) {
                            var t = e.RTCPeerConnection.prototype.getSenders;
                            t &&
                              (e.RTCPeerConnection.prototype.getSenders = function () {
                                var e = this,
                                  n = t.apply(this, []);
                                return (
                                  n.forEach(function (t) {
                                    return (t._pc = e);
                                  }),
                                  n
                                );
                              });
                            var n = e.RTCPeerConnection.prototype.addTrack;
                            n &&
                              (e.RTCPeerConnection.prototype.addTrack = function () {
                                var e = n.apply(this, arguments);
                                return (e._pc = this), e;
                              }),
                              (e.RTCRtpSender.prototype.getStats = function () {
                                var e = this;
                                return this._pc.getStats().then(function (t) {
                                  return C(t, e.track, !0);
                                });
                              });
                          }
                          if (!('getStats' in e.RTCRtpReceiver.prototype)) {
                            var r = e.RTCPeerConnection.prototype.getReceivers;
                            r &&
                              (e.RTCPeerConnection.prototype.getReceivers = function () {
                                var e = this,
                                  t = r.apply(this, []);
                                return (
                                  t.forEach(function (t) {
                                    return (t._pc = e);
                                  }),
                                  t
                                );
                              }),
                              f(e, 'track', function (e) {
                                return (e.receiver._pc = e.srcElement), e;
                              }),
                              (e.RTCRtpReceiver.prototype.getStats = function () {
                                var e = this;
                                return this._pc.getStats().then(function (t) {
                                  return C(t, e.track, !1);
                                });
                              });
                          }
                          if ('getStats' in e.RTCRtpSender.prototype && 'getStats' in e.RTCRtpReceiver.prototype) {
                            var o = e.RTCPeerConnection.prototype.getStats;
                            e.RTCPeerConnection.prototype.getStats = function () {
                              if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
                                var t,
                                  n,
                                  r,
                                  i = arguments[0];
                                return (
                                  this.getSenders().forEach(function (e) {
                                    e.track === i && (t ? (r = !0) : (t = e));
                                  }),
                                  this.getReceivers().forEach(function (e) {
                                    return e.track === i && (n ? (r = !0) : (n = e)), e.track === i;
                                  }),
                                  r || (t && n)
                                    ? Promise.reject(
                                        new DOMException(
                                          'There are more than one sender or receiver for the track.',
                                          'InvalidAccessError',
                                        ),
                                      )
                                    : t
                                    ? t.getStats()
                                    : n
                                    ? n.getStats()
                                    : Promise.reject(
                                        new DOMException(
                                          'There is no sender or receiver for the track.',
                                          'InvalidAccessError',
                                        ),
                                      )
                                );
                              }
                              return o.apply(this, arguments);
                            };
                          }
                        }
                      }
                      function P(e) {
                        e.RTCPeerConnection.prototype.getLocalStreams = function () {
                          var e = this;
                          return (
                            (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
                            Object.keys(this._shimmedLocalStreams).map(function (t) {
                              return e._shimmedLocalStreams[t][0];
                            })
                          );
                        };
                        var t = e.RTCPeerConnection.prototype.addTrack;
                        e.RTCPeerConnection.prototype.addTrack = function (e, n) {
                          if (!n) return t.apply(this, arguments);
                          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                          var r = t.apply(this, arguments);
                          return (
                            this._shimmedLocalStreams[n.id]
                              ? -1 === this._shimmedLocalStreams[n.id].indexOf(r) &&
                                this._shimmedLocalStreams[n.id].push(r)
                              : (this._shimmedLocalStreams[n.id] = [n, r]),
                            r
                          );
                        };
                        var n = e.RTCPeerConnection.prototype.addStream;
                        e.RTCPeerConnection.prototype.addStream = function (e) {
                          var t = this;
                          (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
                            e.getTracks().forEach(function (e) {
                              if (
                                t.getSenders().find(function (t) {
                                  return t.track === e;
                                })
                              )
                                throw new DOMException('Track already exists.', 'InvalidAccessError');
                            });
                          var r = this.getSenders();
                          n.apply(this, arguments);
                          var o = this.getSenders().filter(function (e) {
                            return -1 === r.indexOf(e);
                          });
                          this._shimmedLocalStreams[e.id] = [e].concat(o);
                        };
                        var r = e.RTCPeerConnection.prototype.removeStream;
                        e.RTCPeerConnection.prototype.removeStream = function (e) {
                          return (
                            (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
                            delete this._shimmedLocalStreams[e.id],
                            r.apply(this, arguments)
                          );
                        };
                        var o = e.RTCPeerConnection.prototype.removeTrack;
                        e.RTCPeerConnection.prototype.removeTrack = function (e) {
                          var t = this;
                          return (
                            (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
                            e &&
                              Object.keys(this._shimmedLocalStreams).forEach(function (n) {
                                var r = t._shimmedLocalStreams[n].indexOf(e);
                                -1 !== r && t._shimmedLocalStreams[n].splice(r, 1),
                                  1 === t._shimmedLocalStreams[n].length && delete t._shimmedLocalStreams[n];
                              }),
                            o.apply(this, arguments)
                          );
                        };
                      }
                      function D(e, t) {
                        if (e.RTCPeerConnection) {
                          if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65) return P(e);
                          var n = e.RTCPeerConnection.prototype.getLocalStreams;
                          e.RTCPeerConnection.prototype.getLocalStreams = function () {
                            var e = this,
                              t = n.apply(this);
                            return (
                              (this._reverseStreams = this._reverseStreams || {}),
                              t.map(function (t) {
                                return e._reverseStreams[t.id];
                              })
                            );
                          };
                          var r = e.RTCPeerConnection.prototype.addStream;
                          e.RTCPeerConnection.prototype.addStream = function (t) {
                            var n = this;
                            if (
                              ((this._streams = this._streams || {}),
                              (this._reverseStreams = this._reverseStreams || {}),
                              t.getTracks().forEach(function (e) {
                                if (
                                  n.getSenders().find(function (t) {
                                    return t.track === e;
                                  })
                                )
                                  throw new DOMException('Track already exists.', 'InvalidAccessError');
                              }),
                              !this._reverseStreams[t.id])
                            ) {
                              var o = new e.MediaStream(t.getTracks());
                              (this._streams[t.id] = o), (this._reverseStreams[o.id] = t), (t = o);
                            }
                            r.apply(this, [t]);
                          };
                          var o = e.RTCPeerConnection.prototype.removeStream;
                          (e.RTCPeerConnection.prototype.removeStream = function (e) {
                            (this._streams = this._streams || {}),
                              (this._reverseStreams = this._reverseStreams || {}),
                              o.apply(this, [this._streams[e.id] || e]),
                              delete this._reverseStreams[this._streams[e.id] ? this._streams[e.id].id : e.id],
                              delete this._streams[e.id];
                          }),
                            (e.RTCPeerConnection.prototype.addTrack = function (t, n) {
                              var r = this;
                              if ('closed' === this.signalingState)
                                throw new DOMException(
                                  "The RTCPeerConnection's signalingState is 'closed'.",
                                  'InvalidStateError',
                                );
                              var o = [].slice.call(arguments, 1);
                              if (
                                1 !== o.length ||
                                !o[0].getTracks().find(function (e) {
                                  return e === t;
                                })
                              )
                                throw new DOMException(
                                  'The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.',
                                  'NotSupportedError',
                                );
                              var i = this.getSenders().find(function (e) {
                                return e.track === t;
                              });
                              if (i) throw new DOMException('Track already exists.', 'InvalidAccessError');
                              (this._streams = this._streams || {}),
                                (this._reverseStreams = this._reverseStreams || {});
                              var a = this._streams[n.id];
                              if (a)
                                a.addTrack(t),
                                  Promise.resolve().then(function () {
                                    r.dispatchEvent(new Event('negotiationneeded'));
                                  });
                              else {
                                var s = new e.MediaStream([t]);
                                (this._streams[n.id] = s), (this._reverseStreams[s.id] = n), this.addStream(s);
                              }
                              return this.getSenders().find(function (e) {
                                return e.track === t;
                              });
                            }),
                            ['createOffer', 'createAnswer'].forEach(function (t) {
                              var n = e.RTCPeerConnection.prototype[t],
                                r = s({}, t, function () {
                                  var e = this,
                                    t = arguments;
                                  return arguments.length && 'function' == typeof arguments[0]
                                    ? n.apply(this, [
                                        function (n) {
                                          var r = c(e, n);
                                          t[0].apply(null, [r]);
                                        },
                                        function (e) {
                                          t[1] && t[1].apply(null, e);
                                        },
                                        arguments[2],
                                      ])
                                    : n.apply(this, arguments).then(function (t) {
                                        return c(e, t);
                                      });
                                });
                              e.RTCPeerConnection.prototype[t] = r[t];
                            });
                          var i = e.RTCPeerConnection.prototype.setLocalDescription;
                          e.RTCPeerConnection.prototype.setLocalDescription = function () {
                            return arguments.length && arguments[0].type
                              ? ((arguments[0] = u(this, arguments[0])), i.apply(this, arguments))
                              : i.apply(this, arguments);
                          };
                          var a = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, 'localDescription');
                          Object.defineProperty(e.RTCPeerConnection.prototype, 'localDescription', {
                            get: function () {
                              var e = a.get.apply(this);
                              return '' === e.type ? e : c(this, e);
                            },
                          }),
                            (e.RTCPeerConnection.prototype.removeTrack = function (e) {
                              var t,
                                n = this;
                              if ('closed' === this.signalingState)
                                throw new DOMException(
                                  "The RTCPeerConnection's signalingState is 'closed'.",
                                  'InvalidStateError',
                                );
                              if (!e._pc)
                                throw new DOMException(
                                  'Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.',
                                  'TypeError',
                                );
                              if (e._pc !== this)
                                throw new DOMException(
                                  'Sender was not created by this connection.',
                                  'InvalidAccessError',
                                );
                              (this._streams = this._streams || {}),
                                Object.keys(this._streams).forEach(function (r) {
                                  n._streams[r].getTracks().find(function (t) {
                                    return e.track === t;
                                  }) && (t = n._streams[r]);
                                }),
                                t &&
                                  (1 === t.getTracks().length
                                    ? this.removeStream(this._reverseStreams[t.id])
                                    : t.removeTrack(e.track),
                                  this.dispatchEvent(new Event('negotiationneeded')));
                            });
                        }
                        function c(e, t) {
                          var n = t.sdp;
                          return (
                            Object.keys(e._reverseStreams || []).forEach(function (t) {
                              var r = e._reverseStreams[t],
                                o = e._streams[r.id];
                              n = n.replace(new RegExp(o.id, 'g'), r.id);
                            }),
                            new RTCSessionDescription({ type: t.type, sdp: n })
                          );
                        }
                        function u(e, t) {
                          var n = t.sdp;
                          return (
                            Object.keys(e._reverseStreams || []).forEach(function (t) {
                              var r = e._reverseStreams[t],
                                o = e._streams[r.id];
                              n = n.replace(new RegExp(r.id, 'g'), o.id);
                            }),
                            new RTCSessionDescription({ type: t.type, sdp: n })
                          );
                        }
                      }
                      function M(e, t) {
                        !e.RTCPeerConnection &&
                          e.webkitRTCPeerConnection &&
                          (e.RTCPeerConnection = e.webkitRTCPeerConnection),
                          e.RTCPeerConnection &&
                            t.version < 53 &&
                            ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (t) {
                              var n = e.RTCPeerConnection.prototype[t],
                                r = s({}, t, function () {
                                  return (
                                    (arguments[0] = new (
                                      'addIceCandidate' === t ? e.RTCIceCandidate : e.RTCSessionDescription
                                    )(arguments[0])),
                                    n.apply(this, arguments)
                                  );
                                });
                              e.RTCPeerConnection.prototype[t] = r[t];
                            });
                      }
                      function A(e, t) {
                        f(e, 'negotiationneeded', function (e) {
                          var n = e.target;
                          if (
                            !(
                              t.version < 72 ||
                              (n.getConfiguration && 'plan-b' === n.getConfiguration().sdpSemantics)
                            ) ||
                            'stable' === n.signalingState
                          )
                            return e;
                        });
                      }
                      var I = n(2226),
                        j = n.n(I);
                      function L(e) {
                        var t = e && e.navigator,
                          n = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
                        t.mediaDevices.getUserMedia = function (e) {
                          return n(e).catch(function (e) {
                            return Promise.reject(
                              (function (e) {
                                return {
                                  name: { PermissionDeniedError: 'NotAllowedError' }[e.name] || e.name,
                                  message: e.message,
                                  constraint: e.constraint,
                                  toString: function () {
                                    return this.name;
                                  },
                                };
                              })(e),
                            );
                          });
                        };
                      }
                      function N(e) {
                        'getDisplayMedia' in e.navigator &&
                          e.navigator.mediaDevices &&
                          ((e.navigator.mediaDevices && 'getDisplayMedia' in e.navigator.mediaDevices) ||
                            (e.navigator.mediaDevices.getDisplayMedia = e.navigator.getDisplayMedia.bind(e.navigator)));
                      }
                      function F(e, t) {
                        if (
                          e.RTCIceGatherer &&
                          (e.RTCIceCandidate ||
                            (e.RTCIceCandidate = function (e) {
                              return e;
                            }),
                          e.RTCSessionDescription ||
                            (e.RTCSessionDescription = function (e) {
                              return e;
                            }),
                          t.version < 15025)
                        ) {
                          var n = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, 'enabled');
                          Object.defineProperty(e.MediaStreamTrack.prototype, 'enabled', {
                            set: function (e) {
                              n.set.call(this, e);
                              var t = new Event('enabled');
                              (t.enabled = e), this.dispatchEvent(t);
                            },
                          });
                        }
                        e.RTCRtpSender &&
                          !('dtmf' in e.RTCRtpSender.prototype) &&
                          Object.defineProperty(e.RTCRtpSender.prototype, 'dtmf', {
                            get: function () {
                              return (
                                void 0 === this._dtmf &&
                                  ('audio' === this.track.kind
                                    ? (this._dtmf = new e.RTCDtmfSender(this))
                                    : 'video' === this.track.kind && (this._dtmf = null)),
                                this._dtmf
                              );
                            },
                          }),
                          e.RTCDtmfSender && !e.RTCDTMFSender && (e.RTCDTMFSender = e.RTCDtmfSender);
                        var r = j()(e, t.version);
                        (e.RTCPeerConnection = function (e) {
                          return (
                            e &&
                              e.iceServers &&
                              ((e.iceServers = (function (e, t) {
                                var n = !1;
                                return (e = JSON.parse(JSON.stringify(e))).filter(function (e) {
                                  if (e && (e.urls || e.url)) {
                                    var t = e.urls || e.url;
                                    e.url && !e.urls && y('RTCIceServer.url', 'RTCIceServer.urls');
                                    var r = 'string' == typeof t;
                                    return (
                                      r && (t = [t]),
                                      (t = t.filter(function (e) {
                                        if (0 === e.indexOf('stun:')) return !1;
                                        var t =
                                          e.startsWith('turn') &&
                                          !e.startsWith('turn:[') &&
                                          e.includes('transport=udp');
                                        return t && !n ? ((n = !0), !0) : t && !n;
                                      })),
                                      delete e.url,
                                      (e.urls = r ? t[0] : t),
                                      !!t.length
                                    );
                                  }
                                });
                              })(e.iceServers, t.version)),
                              m('ICE servers after filtering:', e.iceServers)),
                            new r(e)
                          );
                        }),
                          (e.RTCPeerConnection.prototype = r.prototype);
                      }
                      function B(e) {
                        e.RTCRtpSender &&
                          !('replaceTrack' in e.RTCRtpSender.prototype) &&
                          (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack);
                      }
                      function U(e, t) {
                        var n = e && e.navigator,
                          r = e && e.MediaStreamTrack;
                        if (
                          ((n.getUserMedia = function (e, t, r) {
                            y('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia'),
                              n.mediaDevices.getUserMedia(e).then(t, r);
                          }),
                          !(t.version > 55 && 'autoGainControl' in n.mediaDevices.getSupportedConstraints()))
                        ) {
                          var o = function (e, t, n) {
                              t in e && !(n in e) && ((e[n] = e[t]), delete e[t]);
                            },
                            i = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
                          if (
                            ((n.mediaDevices.getUserMedia = function (e) {
                              return (
                                'object' == c(e) &&
                                  'object' == c(e.audio) &&
                                  ((e = JSON.parse(JSON.stringify(e))),
                                  o(e.audio, 'autoGainControl', 'mozAutoGainControl'),
                                  o(e.audio, 'noiseSuppression', 'mozNoiseSuppression')),
                                i(e)
                              );
                            }),
                            r && r.prototype.getSettings)
                          ) {
                            var a = r.prototype.getSettings;
                            r.prototype.getSettings = function () {
                              var e = a.apply(this, arguments);
                              return (
                                o(e, 'mozAutoGainControl', 'autoGainControl'),
                                o(e, 'mozNoiseSuppression', 'noiseSuppression'),
                                e
                              );
                            };
                          }
                          if (r && r.prototype.applyConstraints) {
                            var s = r.prototype.applyConstraints;
                            r.prototype.applyConstraints = function (e) {
                              return (
                                'audio' === this.kind &&
                                  'object' == c(e) &&
                                  ((e = JSON.parse(JSON.stringify(e))),
                                  o(e, 'autoGainControl', 'mozAutoGainControl'),
                                  o(e, 'noiseSuppression', 'mozNoiseSuppression')),
                                s.apply(this, [e])
                              );
                            };
                          }
                        }
                      }
                      function G(e, t) {
                        (e.navigator.mediaDevices && 'getDisplayMedia' in e.navigator.mediaDevices) ||
                          (e.navigator.mediaDevices &&
                            (e.navigator.mediaDevices.getDisplayMedia = function (n) {
                              if (!n || !n.video) {
                                var r = new DOMException('getDisplayMedia without video constraints is undefined');
                                return (r.name = 'NotFoundError'), (r.code = 8), Promise.reject(r);
                              }
                              return (
                                !0 === n.video ? (n.video = { mediaSource: t }) : (n.video.mediaSource = t),
                                e.navigator.mediaDevices.getUserMedia(n)
                              );
                            }));
                      }
                      function H(e) {
                        'object' == c(e) &&
                          e.RTCTrackEvent &&
                          'receiver' in e.RTCTrackEvent.prototype &&
                          !('transceiver' in e.RTCTrackEvent.prototype) &&
                          Object.defineProperty(e.RTCTrackEvent.prototype, 'transceiver', {
                            get: function () {
                              return { receiver: this.receiver };
                            },
                          });
                      }
                      function W(e, t) {
                        if ('object' == c(e) && (e.RTCPeerConnection || e.mozRTCPeerConnection)) {
                          !e.RTCPeerConnection &&
                            e.mozRTCPeerConnection &&
                            (e.RTCPeerConnection = e.mozRTCPeerConnection),
                            t.version < 53 &&
                              ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (t) {
                                var n = e.RTCPeerConnection.prototype[t],
                                  r = s({}, t, function () {
                                    return (
                                      (arguments[0] = new (
                                        'addIceCandidate' === t ? e.RTCIceCandidate : e.RTCSessionDescription
                                      )(arguments[0])),
                                      n.apply(this, arguments)
                                    );
                                  });
                                e.RTCPeerConnection.prototype[t] = r[t];
                              });
                          var n = {
                              inboundrtp: 'inbound-rtp',
                              outboundrtp: 'outbound-rtp',
                              candidatepair: 'candidate-pair',
                              localcandidate: 'local-candidate',
                              remotecandidate: 'remote-candidate',
                            },
                            r = e.RTCPeerConnection.prototype.getStats;
                          e.RTCPeerConnection.prototype.getStats = function () {
                            var e = Array.prototype.slice.call(arguments),
                              o = e[0],
                              i = e[1],
                              a = e[2];
                            return r
                              .apply(this, [o || null])
                              .then(function (e) {
                                if (t.version < 53 && !i)
                                  try {
                                    e.forEach(function (e) {
                                      e.type = n[e.type] || e.type;
                                    });
                                  } catch (t) {
                                    if ('TypeError' !== t.name) throw t;
                                    e.forEach(function (t, r) {
                                      e.set(r, Object.assign({}, t, { type: n[t.type] || t.type }));
                                    });
                                  }
                                return e;
                              })
                              .then(i, a);
                          };
                        }
                      }
                      function q(e) {
                        if (
                          'object' == c(e) &&
                          e.RTCPeerConnection &&
                          e.RTCRtpSender &&
                          (!e.RTCRtpSender || !('getStats' in e.RTCRtpSender.prototype))
                        ) {
                          var t = e.RTCPeerConnection.prototype.getSenders;
                          t &&
                            (e.RTCPeerConnection.prototype.getSenders = function () {
                              var e = this,
                                n = t.apply(this, []);
                              return (
                                n.forEach(function (t) {
                                  return (t._pc = e);
                                }),
                                n
                              );
                            });
                          var n = e.RTCPeerConnection.prototype.addTrack;
                          n &&
                            (e.RTCPeerConnection.prototype.addTrack = function () {
                              var e = n.apply(this, arguments);
                              return (e._pc = this), e;
                            }),
                            (e.RTCRtpSender.prototype.getStats = function () {
                              return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
                            });
                        }
                      }
                      function K(e) {
                        if (
                          'object' == c(e) &&
                          e.RTCPeerConnection &&
                          e.RTCRtpSender &&
                          (!e.RTCRtpSender || !('getStats' in e.RTCRtpReceiver.prototype))
                        ) {
                          var t = e.RTCPeerConnection.prototype.getReceivers;
                          t &&
                            (e.RTCPeerConnection.prototype.getReceivers = function () {
                              var e = this,
                                n = t.apply(this, []);
                              return (
                                n.forEach(function (t) {
                                  return (t._pc = e);
                                }),
                                n
                              );
                            }),
                            f(e, 'track', function (e) {
                              return (e.receiver._pc = e.srcElement), e;
                            }),
                            (e.RTCRtpReceiver.prototype.getStats = function () {
                              return this._pc.getStats(this.track);
                            });
                        }
                      }
                      function V(e) {
                        e.RTCPeerConnection &&
                          !('removeStream' in e.RTCPeerConnection.prototype) &&
                          (e.RTCPeerConnection.prototype.removeStream = function (e) {
                            var t = this;
                            y('removeStream', 'removeTrack'),
                              this.getSenders().forEach(function (n) {
                                n.track && e.getTracks().includes(n.track) && t.removeTrack(n);
                              });
                          });
                      }
                      function z(e) {
                        e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel);
                      }
                      function $(e) {
                        if ('object' == c(e) && e.RTCPeerConnection) {
                          var t = e.RTCPeerConnection.prototype.addTransceiver;
                          t &&
                            (e.RTCPeerConnection.prototype.addTransceiver = function () {
                              this.setParametersPromises = [];
                              var e = arguments[1],
                                n = e && 'sendEncodings' in e;
                              n &&
                                e.sendEncodings.forEach(function (e) {
                                  if ('rid' in e && !/^[a-z0-9]{0,16}$/i.test(e.rid))
                                    throw new TypeError('Invalid RID value provided.');
                                  if ('scaleResolutionDownBy' in e && !(parseFloat(e.scaleResolutionDownBy) >= 1))
                                    throw new RangeError('scale_resolution_down_by must be >= 1.0');
                                  if ('maxFramerate' in e && !(parseFloat(e.maxFramerate) >= 0))
                                    throw new RangeError('max_framerate must be >= 0.0');
                                });
                              var r = t.apply(this, arguments);
                              if (n) {
                                var o = r.sender,
                                  i = o.getParameters();
                                (!('encodings' in i) ||
                                  (1 === i.encodings.length && 0 === Object.keys(i.encodings[0]).length)) &&
                                  ((i.encodings = e.sendEncodings),
                                  (o.sendEncodings = e.sendEncodings),
                                  this.setParametersPromises.push(
                                    o
                                      .setParameters(i)
                                      .then(function () {
                                        delete o.sendEncodings;
                                      })
                                      .catch(function () {
                                        delete o.sendEncodings;
                                      }),
                                  ));
                              }
                              return r;
                            });
                        }
                      }
                      function Y(e) {
                        if ('object' == c(e) && e.RTCRtpSender) {
                          var t = e.RTCRtpSender.prototype.getParameters;
                          t &&
                            (e.RTCRtpSender.prototype.getParameters = function () {
                              var e = t.apply(this, arguments);
                              return 'encodings' in e || (e.encodings = [].concat(this.sendEncodings || [{}])), e;
                            });
                        }
                      }
                      function X(e) {
                        if ('object' == c(e) && e.RTCPeerConnection) {
                          var t = e.RTCPeerConnection.prototype.createOffer;
                          e.RTCPeerConnection.prototype.createOffer = function () {
                            var e = arguments,
                              n = this;
                            return this.setParametersPromises && this.setParametersPromises.length
                              ? Promise.all(this.setParametersPromises)
                                  .then(function () {
                                    return t.apply(n, e);
                                  })
                                  .finally(function () {
                                    n.setParametersPromises = [];
                                  })
                              : t.apply(this, arguments);
                          };
                        }
                      }
                      function J(e) {
                        if ('object' == c(e) && e.RTCPeerConnection) {
                          var t = e.RTCPeerConnection.prototype.createAnswer;
                          e.RTCPeerConnection.prototype.createAnswer = function () {
                            var e = arguments,
                              n = this;
                            return this.setParametersPromises && this.setParametersPromises.length
                              ? Promise.all(this.setParametersPromises)
                                  .then(function () {
                                    return t.apply(n, e);
                                  })
                                  .finally(function () {
                                    n.setParametersPromises = [];
                                  })
                              : t.apply(this, arguments);
                          };
                        }
                      }
                      function Q(e) {
                        if ('object' == c(e) && e.RTCPeerConnection) {
                          if (
                            ('getLocalStreams' in e.RTCPeerConnection.prototype ||
                              (e.RTCPeerConnection.prototype.getLocalStreams = function () {
                                return this._localStreams || (this._localStreams = []), this._localStreams;
                              }),
                            !('addStream' in e.RTCPeerConnection.prototype))
                          ) {
                            var t = e.RTCPeerConnection.prototype.addTrack;
                            (e.RTCPeerConnection.prototype.addStream = function (e) {
                              var n = this;
                              this._localStreams || (this._localStreams = []),
                                this._localStreams.includes(e) || this._localStreams.push(e),
                                e.getAudioTracks().forEach(function (r) {
                                  return t.call(n, r, e);
                                }),
                                e.getVideoTracks().forEach(function (r) {
                                  return t.call(n, r, e);
                                });
                            }),
                              (e.RTCPeerConnection.prototype.addTrack = function (e) {
                                for (
                                  var n = this, r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1;
                                  i < r;
                                  i++
                                )
                                  o[i - 1] = arguments[i];
                                return (
                                  o &&
                                    o.forEach(function (e) {
                                      n._localStreams
                                        ? n._localStreams.includes(e) || n._localStreams.push(e)
                                        : (n._localStreams = [e]);
                                    }),
                                  t.apply(this, arguments)
                                );
                              });
                          }
                          'removeStream' in e.RTCPeerConnection.prototype ||
                            (e.RTCPeerConnection.prototype.removeStream = function (e) {
                              var t = this;
                              this._localStreams || (this._localStreams = []);
                              var n = this._localStreams.indexOf(e);
                              if (-1 !== n) {
                                this._localStreams.splice(n, 1);
                                var r = e.getTracks();
                                this.getSenders().forEach(function (e) {
                                  r.includes(e.track) && t.removeTrack(e);
                                });
                              }
                            });
                        }
                      }
                      function Z(e) {
                        if (
                          'object' == c(e) &&
                          e.RTCPeerConnection &&
                          ('getRemoteStreams' in e.RTCPeerConnection.prototype ||
                            (e.RTCPeerConnection.prototype.getRemoteStreams = function () {
                              return this._remoteStreams ? this._remoteStreams : [];
                            }),
                          !('onaddstream' in e.RTCPeerConnection.prototype))
                        ) {
                          Object.defineProperty(e.RTCPeerConnection.prototype, 'onaddstream', {
                            get: function () {
                              return this._onaddstream;
                            },
                            set: function (e) {
                              var t = this;
                              this._onaddstream &&
                                (this.removeEventListener('addstream', this._onaddstream),
                                this.removeEventListener('track', this._onaddstreampoly)),
                                this.addEventListener('addstream', (this._onaddstream = e)),
                                this.addEventListener(
                                  'track',
                                  (this._onaddstreampoly = function (e) {
                                    e.streams.forEach(function (e) {
                                      if (
                                        (t._remoteStreams || (t._remoteStreams = []), !t._remoteStreams.includes(e))
                                      ) {
                                        t._remoteStreams.push(e);
                                        var n = new Event('addstream');
                                        (n.stream = e), t.dispatchEvent(n);
                                      }
                                    });
                                  }),
                                );
                            },
                          });
                          var t = e.RTCPeerConnection.prototype.setRemoteDescription;
                          e.RTCPeerConnection.prototype.setRemoteDescription = function () {
                            var e = this;
                            return (
                              this._onaddstreampoly ||
                                this.addEventListener(
                                  'track',
                                  (this._onaddstreampoly = function (t) {
                                    t.streams.forEach(function (t) {
                                      if (
                                        (e._remoteStreams || (e._remoteStreams = []),
                                        !(e._remoteStreams.indexOf(t) >= 0))
                                      ) {
                                        e._remoteStreams.push(t);
                                        var n = new Event('addstream');
                                        (n.stream = t), e.dispatchEvent(n);
                                      }
                                    });
                                  }),
                                ),
                              t.apply(e, arguments)
                            );
                          };
                        }
                      }
                      function ee(e) {
                        if ('object' == c(e) && e.RTCPeerConnection) {
                          var t = e.RTCPeerConnection.prototype,
                            n = t.createOffer,
                            r = t.createAnswer,
                            o = t.setLocalDescription,
                            i = t.setRemoteDescription,
                            a = t.addIceCandidate;
                          (t.createOffer = function (e, t) {
                            var r = arguments.length >= 2 ? arguments[2] : arguments[0],
                              o = n.apply(this, [r]);
                            return t ? (o.then(e, t), Promise.resolve()) : o;
                          }),
                            (t.createAnswer = function (e, t) {
                              var n = arguments.length >= 2 ? arguments[2] : arguments[0],
                                o = r.apply(this, [n]);
                              return t ? (o.then(e, t), Promise.resolve()) : o;
                            });
                          var s = function (e, t, n) {
                            var r = o.apply(this, [e]);
                            return n ? (r.then(t, n), Promise.resolve()) : r;
                          };
                          (t.setLocalDescription = s),
                            (s = function (e, t, n) {
                              var r = i.apply(this, [e]);
                              return n ? (r.then(t, n), Promise.resolve()) : r;
                            }),
                            (t.setRemoteDescription = s),
                            (s = function (e, t, n) {
                              var r = a.apply(this, [e]);
                              return n ? (r.then(t, n), Promise.resolve()) : r;
                            }),
                            (t.addIceCandidate = s);
                        }
                      }
                      function te(e) {
                        var t = e && e.navigator;
                        if (t.mediaDevices && t.mediaDevices.getUserMedia) {
                          var n = t.mediaDevices,
                            r = n.getUserMedia.bind(n);
                          t.mediaDevices.getUserMedia = function (e) {
                            return r(ne(e));
                          };
                        }
                        !t.getUserMedia &&
                          t.mediaDevices &&
                          t.mediaDevices.getUserMedia &&
                          (t.getUserMedia = function (e, n, r) {
                            t.mediaDevices.getUserMedia(e).then(n, r);
                          }.bind(t));
                      }
                      function ne(e) {
                        return e && void 0 !== e.video ? Object.assign({}, e, { video: b(e.video) }) : e;
                      }
                      function re(e) {
                        if (e.RTCPeerConnection) {
                          var t = e.RTCPeerConnection;
                          (e.RTCPeerConnection = function (e, n) {
                            if (e && e.iceServers) {
                              for (var r = [], o = 0; o < e.iceServers.length; o++) {
                                var i = e.iceServers[o];
                                !i.hasOwnProperty('urls') && i.hasOwnProperty('url')
                                  ? (y('RTCIceServer.url', 'RTCIceServer.urls'),
                                    ((i = JSON.parse(JSON.stringify(i))).urls = i.url),
                                    delete i.url,
                                    r.push(i))
                                  : r.push(e.iceServers[o]);
                              }
                              e.iceServers = r;
                            }
                            return new t(e, n);
                          }),
                            (e.RTCPeerConnection.prototype = t.prototype),
                            'generateCertificate' in t &&
                              Object.defineProperty(e.RTCPeerConnection, 'generateCertificate', {
                                get: function () {
                                  return t.generateCertificate;
                                },
                              });
                        }
                      }
                      function oe(e) {
                        'object' == c(e) &&
                          e.RTCTrackEvent &&
                          'receiver' in e.RTCTrackEvent.prototype &&
                          !('transceiver' in e.RTCTrackEvent.prototype) &&
                          Object.defineProperty(e.RTCTrackEvent.prototype, 'transceiver', {
                            get: function () {
                              return { receiver: this.receiver };
                            },
                          });
                      }
                      function ie(e) {
                        var t = e.RTCPeerConnection.prototype.createOffer;
                        e.RTCPeerConnection.prototype.createOffer = function (e) {
                          if (e) {
                            void 0 !== e.offerToReceiveAudio && (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
                            var n = this.getTransceivers().find(function (e) {
                              return 'audio' === e.receiver.track.kind;
                            });
                            !1 === e.offerToReceiveAudio && n
                              ? 'sendrecv' === n.direction
                                ? n.setDirection
                                  ? n.setDirection('sendonly')
                                  : (n.direction = 'sendonly')
                                : 'recvonly' === n.direction &&
                                  (n.setDirection ? n.setDirection('inactive') : (n.direction = 'inactive'))
                              : !0 !== e.offerToReceiveAudio || n || this.addTransceiver('audio'),
                              void 0 !== e.offerToReceiveVideo && (e.offerToReceiveVideo = !!e.offerToReceiveVideo);
                            var r = this.getTransceivers().find(function (e) {
                              return 'video' === e.receiver.track.kind;
                            });
                            !1 === e.offerToReceiveVideo && r
                              ? 'sendrecv' === r.direction
                                ? r.setDirection
                                  ? r.setDirection('sendonly')
                                  : (r.direction = 'sendonly')
                                : 'recvonly' === r.direction &&
                                  (r.setDirection ? r.setDirection('inactive') : (r.direction = 'inactive'))
                              : !0 !== e.offerToReceiveVideo || r || this.addTransceiver('video');
                          }
                          return t.apply(this, arguments);
                        };
                      }
                      function ae(e) {
                        'object' != c(e) || e.AudioContext || (e.AudioContext = e.webkitAudioContext);
                      }
                      var se = n(347),
                        ce = n.n(se);
                      function ue(e) {
                        if (
                          !(!e.RTCIceCandidate || (e.RTCIceCandidate && 'foundation' in e.RTCIceCandidate.prototype))
                        ) {
                          var t = e.RTCIceCandidate;
                          (e.RTCIceCandidate = function (e) {
                            if (
                              ('object' == c(e) &&
                                e.candidate &&
                                0 === e.candidate.indexOf('a=') &&
                                ((e = JSON.parse(JSON.stringify(e))).candidate = e.candidate.substr(2)),
                              e.candidate && e.candidate.length)
                            ) {
                              var n = new t(e),
                                r = ce().parseCandidate(e.candidate),
                                o = Object.assign(n, r);
                              return (
                                (o.toJSON = function () {
                                  return {
                                    candidate: o.candidate,
                                    sdpMid: o.sdpMid,
                                    sdpMLineIndex: o.sdpMLineIndex,
                                    usernameFragment: o.usernameFragment,
                                  };
                                }),
                                o
                              );
                            }
                            return new t(e);
                          }),
                            (e.RTCIceCandidate.prototype = t.prototype),
                            f(e, 'icecandidate', function (t) {
                              return (
                                t.candidate &&
                                  Object.defineProperty(t, 'candidate', {
                                    value: new e.RTCIceCandidate(t.candidate),
                                    writable: 'false',
                                  }),
                                t
                              );
                            });
                        }
                      }
                      function le(e, t) {
                        if (e.RTCPeerConnection) {
                          'sctp' in e.RTCPeerConnection.prototype ||
                            Object.defineProperty(e.RTCPeerConnection.prototype, 'sctp', {
                              get: function () {
                                return void 0 === this._sctp ? null : this._sctp;
                              },
                            });
                          var n = function (e) {
                              if (!e || !e.sdp) return !1;
                              var t = ce().splitSections(e.sdp);
                              return (
                                t.shift(),
                                t.some(function (e) {
                                  var t = ce().parseMLine(e);
                                  return t && 'application' === t.kind && -1 !== t.protocol.indexOf('SCTP');
                                })
                              );
                            },
                            r = function (e) {
                              var t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                              if (null === t || t.length < 2) return -1;
                              var n = parseInt(t[1], 10);
                              return n != n ? -1 : n;
                            },
                            o = function (e) {
                              var n = 65536;
                              return (
                                'firefox' === t.browser &&
                                  (n =
                                    t.version < 57
                                      ? -1 === e
                                        ? 16384
                                        : 2147483637
                                      : t.version < 60
                                      ? 57 === t.version
                                        ? 65535
                                        : 65536
                                      : 2147483637),
                                n
                              );
                            },
                            i = function (e, n) {
                              var r = 65536;
                              'firefox' === t.browser && 57 === t.version && (r = 65535);
                              var o = ce().matchPrefix(e.sdp, 'a=max-message-size:');
                              return (
                                o.length > 0
                                  ? (r = parseInt(o[0].substr(19), 10))
                                  : 'firefox' === t.browser && -1 !== n && (r = 2147483637),
                                r
                              );
                            },
                            a = e.RTCPeerConnection.prototype.setRemoteDescription;
                          e.RTCPeerConnection.prototype.setRemoteDescription = function () {
                            if (((this._sctp = null), 'chrome' === t.browser && t.version >= 76)) {
                              var e = this.getConfiguration(),
                                s = e.sdpSemantics;
                              'plan-b' === s &&
                                Object.defineProperty(this, 'sctp', {
                                  get: function () {
                                    return void 0 === this._sctp ? null : this._sctp;
                                  },
                                  enumerable: !0,
                                  configurable: !0,
                                });
                            }
                            if (n(arguments[0])) {
                              var c,
                                u = r(arguments[0]),
                                l = o(u),
                                d = i(arguments[0], u);
                              c =
                                0 === l && 0 === d
                                  ? Number.POSITIVE_INFINITY
                                  : 0 === l || 0 === d
                                  ? Math.max(l, d)
                                  : Math.min(l, d);
                              var p = {};
                              Object.defineProperty(p, 'maxMessageSize', {
                                get: function () {
                                  return c;
                                },
                              }),
                                (this._sctp = p);
                            }
                            return a.apply(this, arguments);
                          };
                        }
                      }
                      function de(e) {
                        if (e.RTCPeerConnection && 'createDataChannel' in e.RTCPeerConnection.prototype) {
                          var t = e.RTCPeerConnection.prototype.createDataChannel;
                          (e.RTCPeerConnection.prototype.createDataChannel = function () {
                            var e = t.apply(this, arguments);
                            return n(e, this), e;
                          }),
                            f(e, 'datachannel', function (e) {
                              return n(e.channel, e.target), e;
                            });
                        }
                        function n(e, t) {
                          var n = e.send;
                          e.send = function () {
                            var r = arguments[0],
                              o = r.length || r.size || r.byteLength;
                            if ('open' === e.readyState && t.sctp && o > t.sctp.maxMessageSize)
                              throw new TypeError(
                                'Message too large (can send a maximum of ' + t.sctp.maxMessageSize + ' bytes)',
                              );
                            return n.apply(e, arguments);
                          };
                        }
                      }
                      function pe(e) {
                        if (e.RTCPeerConnection && !('connectionState' in e.RTCPeerConnection.prototype)) {
                          var t = e.RTCPeerConnection.prototype;
                          Object.defineProperty(t, 'connectionState', {
                            get: function () {
                              return (
                                { completed: 'connected', checking: 'connecting' }[this.iceConnectionState] ||
                                this.iceConnectionState
                              );
                            },
                            enumerable: !0,
                            configurable: !0,
                          }),
                            Object.defineProperty(t, 'onconnectionstatechange', {
                              get: function () {
                                return this._onconnectionstatechange || null;
                              },
                              set: function (e) {
                                this._onconnectionstatechange &&
                                  (this.removeEventListener('connectionstatechange', this._onconnectionstatechange),
                                  delete this._onconnectionstatechange),
                                  e &&
                                    this.addEventListener('connectionstatechange', (this._onconnectionstatechange = e));
                              },
                              enumerable: !0,
                              configurable: !0,
                            }),
                            ['setLocalDescription', 'setRemoteDescription'].forEach(function (e) {
                              var n = t[e];
                              t[e] = function () {
                                return (
                                  this._connectionstatechangepoly ||
                                    ((this._connectionstatechangepoly = function (e) {
                                      var t = e.target;
                                      if (t._lastConnectionState !== t.connectionState) {
                                        t._lastConnectionState = t.connectionState;
                                        var n = new Event('connectionstatechange', e);
                                        t.dispatchEvent(n);
                                      }
                                      return e;
                                    }),
                                    this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly)),
                                  n.apply(this, arguments)
                                );
                              };
                            });
                        }
                      }
                      function fe(e, t) {
                        if (
                          e.RTCPeerConnection &&
                          !(('chrome' === t.browser && t.version >= 71) || ('safari' === t.browser && t.version >= 605))
                        ) {
                          var n = e.RTCPeerConnection.prototype.setRemoteDescription;
                          e.RTCPeerConnection.prototype.setRemoteDescription = function (t) {
                            if (t && t.sdp && -1 !== t.sdp.indexOf('\na=extmap-allow-mixed')) {
                              var r = t.sdp
                                .split('\n')
                                .filter(function (e) {
                                  return 'a=extmap-allow-mixed' !== e.trim();
                                })
                                .join('\n');
                              e.RTCSessionDescription && t instanceof e.RTCSessionDescription
                                ? (arguments[0] = new e.RTCSessionDescription({ type: t.type, sdp: r }))
                                : (t.sdp = r);
                            }
                            return n.apply(this, arguments);
                          };
                        }
                      }
                      function he(e, t) {
                        if (e.RTCPeerConnection && e.RTCPeerConnection.prototype) {
                          var n = e.RTCPeerConnection.prototype.addIceCandidate;
                          n &&
                            0 !== n.length &&
                            (e.RTCPeerConnection.prototype.addIceCandidate = function () {
                              return arguments[0]
                                ? (('chrome' === t.browser && t.version < 78) ||
                                    ('firefox' === t.browser && t.version < 68) ||
                                    'safari' === t.browser) &&
                                  arguments[0] &&
                                  '' === arguments[0].candidate
                                  ? Promise.resolve()
                                  : n.apply(this, arguments)
                                : (arguments[1] && arguments[1].apply(null), Promise.resolve());
                            });
                        }
                      }
                      var ve = (function () {
                          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            t = e.window,
                            n =
                              arguments.length > 1 && void 0 !== arguments[1]
                                ? arguments[1]
                                : { shimChrome: !0, shimFirefox: !0, shimEdge: !0, shimSafari: !0 },
                            s = m,
                            c = (function (e) {
                              var t = { browser: null, version: null };
                              if (void 0 === e || !e.navigator) return (t.browser = 'Not a browser.'), t;
                              var n = e.navigator;
                              if (n.mozGetUserMedia)
                                (t.browser = 'firefox'), (t.version = p(n.userAgent, /Firefox\/(\d+)\./, 1));
                              else if (
                                n.webkitGetUserMedia ||
                                (!1 === e.isSecureContext && e.webkitRTCPeerConnection && !e.RTCIceGatherer)
                              )
                                (t.browser = 'chrome'), (t.version = p(n.userAgent, /Chrom(e|ium)\/(\d+)\./, 2));
                              else if (n.mediaDevices && n.userAgent.match(/Edge\/(\d+).(\d+)$/))
                                (t.browser = 'edge'), (t.version = p(n.userAgent, /Edge\/(\d+).(\d+)$/, 2));
                              else {
                                if (!e.RTCPeerConnection || !n.userAgent.match(/AppleWebKit\/(\d+)\./))
                                  return (t.browser = 'Not a supported browser.'), t;
                                (t.browser = 'safari'),
                                  (t.version = p(n.userAgent, /AppleWebKit\/(\d+)\./, 1)),
                                  (t.supportsUnifiedPlan =
                                    e.RTCRtpTransceiver && 'currentDirection' in e.RTCRtpTransceiver.prototype);
                              }
                              return t;
                            })(t),
                            l = {
                              browserDetails: c,
                              commonShim: u,
                              extractVersion: p,
                              disableLog: h,
                              disableWarnings: v,
                            };
                          switch (c.browser) {
                            case 'chrome':
                              if (!r || !M || !n.shimChrome)
                                return s('Chrome shim is not included in this adapter release.'), l;
                              if (null === c.version)
                                return s('Chrome shim can not determine version, not shimming.'), l;
                              s('adapter.js shimming chrome.'),
                                (l.browserShim = r),
                                he(t, c),
                                E(t, c),
                                T(t),
                                M(t, c),
                                k(t),
                                D(t, c),
                                R(t),
                                x(t),
                                O(t),
                                A(t, c),
                                ue(t),
                                pe(t),
                                le(t, c),
                                de(t),
                                fe(t, c);
                              break;
                            case 'firefox':
                              if (!i || !W || !n.shimFirefox)
                                return s('Firefox shim is not included in this adapter release.'), l;
                              s('adapter.js shimming firefox.'),
                                (l.browserShim = i),
                                he(t, c),
                                U(t, c),
                                W(t, c),
                                H(t),
                                V(t),
                                q(t),
                                K(t),
                                z(t),
                                $(t),
                                Y(t),
                                X(t),
                                J(t),
                                ue(t),
                                pe(t),
                                le(t, c),
                                de(t);
                              break;
                            case 'edge':
                              if (!o || !F || !n.shimEdge)
                                return s('MS edge shim is not included in this adapter release.'), l;
                              s('adapter.js shimming edge.'),
                                (l.browserShim = o),
                                L(t),
                                N(t),
                                F(t, c),
                                B(t),
                                le(t, c),
                                de(t);
                              break;
                            case 'safari':
                              if (!a || !n.shimSafari)
                                return s('Safari shim is not included in this adapter release.'), l;
                              s('adapter.js shimming safari.'),
                                (l.browserShim = a),
                                he(t, c),
                                re(t),
                                ie(t),
                                ee(t),
                                Q(t),
                                Z(t),
                                oe(t),
                                te(t),
                                ae(t),
                                ue(t),
                                le(t, c),
                                de(t),
                                fe(t, c);
                              break;
                            default:
                              s('Unsupported browser!');
                          }
                          return l;
                        })({ window: 'undefined' == typeof window ? void 0 : window }),
                        me = ve;
                    },
                    429: function () {},
                  },
                  t = {};
                function n(r) {
                  var o = t[r];
                  if (void 0 !== o) return o.exports;
                  var i = (t[r] = { id: r, loaded: !1, exports: {} });
                  return e[r].call(i.exports, i, i.exports, n), (i.loaded = !0), i.exports;
                }
                return (
                  (n.n = function (e) {
                    var t =
                      e && e.__esModule
                        ? function () {
                            return e.default;
                          }
                        : function () {
                            return e;
                          };
                    return n.d(t, { a: t }), t;
                  }),
                  (n.d = function (e, t) {
                    for (var r in t)
                      n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
                  }),
                  (n.g = (function () {
                    if ('object' == ('undefined' == typeof globalThis ? 'undefined' : c(globalThis))) return globalThis;
                    try {
                      return this || new Function('return this')();
                    } catch (e) {
                      if ('object' == ('undefined' == typeof window ? 'undefined' : c(window))) return window;
                    }
                  })()),
                  (n.o = function (e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t);
                  }),
                  (n.r = function (e) {
                    'undefined' != typeof Symbol &&
                      Symbol.toStringTag &&
                      Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                      Object.defineProperty(e, '__esModule', { value: !0 });
                  }),
                  (n.nmd = function (e) {
                    return (e.paths = []), e.children || (e.children = []), e;
                  }),
                  n(4993)
                );
              })();
            }),
            'object' == c(t) && 'object' == c(e)
              ? (e.exports = a())
              : ((o = []), void 0 === (i = 'function' == typeof (r = a) ? r.apply(t, o) : r) || (e.exports = i));
        },
        1924: (e, t, n) => {
          'use strict';
          var r = n(210),
            o = n(5559),
            i = o(r('String.prototype.indexOf'));
          e.exports = function (e, t) {
            var n = r(e, !!t);
            return 'function' == typeof n && i(e, '.prototype.') > -1 ? o(n) : n;
          };
        },
        5559: (e, t, n) => {
          'use strict';
          var r = n(2514),
            o = n(210),
            i = o('%Function.prototype.apply%'),
            a = o('%Function.prototype.call%'),
            s = o('%Reflect.apply%', !0) || r.call(a, i),
            c = o('%Object.getOwnPropertyDescriptor%', !0),
            u = o('%Object.defineProperty%', !0),
            l = o('%Math.max%');
          if (u)
            try {
              u({}, 'a', { value: 1 });
            } catch (e) {
              u = null;
            }
          e.exports = function (e) {
            var t = s(r, a, arguments);
            if (c && u) {
              var n = c(t, 'length');
              n.configurable && u(t, 'length', { value: 1 + l(0, e.length - (arguments.length - 1)) });
            }
            return t;
          };
          var d = function () {
            return s(r, i, arguments);
          };
          u ? u(e.exports, 'apply', { value: d }) : (e.exports.apply = d);
        },
        7484: function (e) {
          e.exports = (function () {
            'use strict';
            var e = 6e4,
              t = 36e5,
              n = 'millisecond',
              r = 'second',
              o = 'minute',
              i = 'hour',
              a = 'day',
              s = 'week',
              c = 'month',
              u = 'quarter',
              l = 'year',
              d = 'date',
              p = 'Invalid Date',
              f = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
              h = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
              v = {
                name: 'en',
                weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
                months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                  '_',
                ),
              },
              m = function (e, t, n) {
                var r = String(e);
                return !r || r.length >= t ? e : '' + Array(t + 1 - r.length).join(n) + e;
              },
              y = {
                s: m,
                z: function (e) {
                  var t = -e.utcOffset(),
                    n = Math.abs(t),
                    r = Math.floor(n / 60),
                    o = n % 60;
                  return (t <= 0 ? '+' : '-') + m(r, 2, '0') + ':' + m(o, 2, '0');
                },
                m: function e(t, n) {
                  if (t.date() < n.date()) return -e(n, t);
                  var r = 12 * (n.year() - t.year()) + (n.month() - t.month()),
                    o = t.clone().add(r, c),
                    i = n - o < 0,
                    a = t.clone().add(r + (i ? -1 : 1), c);
                  return +(-(r + (n - o) / (i ? o - a : a - o)) || 0);
                },
                a: function (e) {
                  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
                },
                p: function (e) {
                  return (
                    { M: c, y: l, w: s, d: a, D: d, h: i, m: o, s: r, ms: n, Q: u }[e] ||
                    String(e || '')
                      .toLowerCase()
                      .replace(/s$/, '')
                  );
                },
                u: function (e) {
                  return void 0 === e;
                },
              },
              g = 'en',
              b = {};
            b[g] = v;
            var S = function (e) {
                return e instanceof _;
              },
              C = function e(t, n, r) {
                var o;
                if (!t) return g;
                if ('string' == typeof t) {
                  var i = t.toLowerCase();
                  b[i] && (o = i), n && ((b[i] = n), (o = i));
                  var a = t.split('-');
                  if (!o && a.length > 1) return e(a[0]);
                } else {
                  var s = t.name;
                  (b[s] = t), (o = s);
                }
                return !r && o && (g = o), o || (!r && g);
              },
              w = function (e, t) {
                if (S(e)) return e.clone();
                var n = 'object' == typeof t ? t : {};
                return (n.date = e), (n.args = arguments), new _(n);
              },
              E = y;
            (E.l = C),
              (E.i = S),
              (E.w = function (e, t) {
                return w(e, { locale: t.$L, utc: t.$u, x: t.$x, $offset: t.$offset });
              });
            var _ = (function () {
                function v(e) {
                  (this.$L = C(e.locale, null, !0)), this.parse(e);
                }
                var m = v.prototype;
                return (
                  (m.parse = function (e) {
                    (this.$d = (function (e) {
                      var t = e.date,
                        n = e.utc;
                      if (null === t) return new Date(NaN);
                      if (E.u(t)) return new Date();
                      if (t instanceof Date) return new Date(t);
                      if ('string' == typeof t && !/Z$/i.test(t)) {
                        var r = t.match(f);
                        if (r) {
                          var o = r[2] - 1 || 0,
                            i = (r[7] || '0').substring(0, 3);
                          return n
                            ? new Date(Date.UTC(r[1], o, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, i))
                            : new Date(r[1], o, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, i);
                        }
                      }
                      return new Date(t);
                    })(e)),
                      (this.$x = e.x || {}),
                      this.init();
                  }),
                  (m.init = function () {
                    var e = this.$d;
                    (this.$y = e.getFullYear()),
                      (this.$M = e.getMonth()),
                      (this.$D = e.getDate()),
                      (this.$W = e.getDay()),
                      (this.$H = e.getHours()),
                      (this.$m = e.getMinutes()),
                      (this.$s = e.getSeconds()),
                      (this.$ms = e.getMilliseconds());
                  }),
                  (m.$utils = function () {
                    return E;
                  }),
                  (m.isValid = function () {
                    return !(this.$d.toString() === p);
                  }),
                  (m.isSame = function (e, t) {
                    var n = w(e);
                    return this.startOf(t) <= n && n <= this.endOf(t);
                  }),
                  (m.isAfter = function (e, t) {
                    return w(e) < this.startOf(t);
                  }),
                  (m.isBefore = function (e, t) {
                    return this.endOf(t) < w(e);
                  }),
                  (m.$g = function (e, t, n) {
                    return E.u(e) ? this[t] : this.set(n, e);
                  }),
                  (m.unix = function () {
                    return Math.floor(this.valueOf() / 1e3);
                  }),
                  (m.valueOf = function () {
                    return this.$d.getTime();
                  }),
                  (m.startOf = function (e, t) {
                    var n = this,
                      u = !!E.u(t) || t,
                      p = E.p(e),
                      f = function (e, t) {
                        var r = E.w(n.$u ? Date.UTC(n.$y, t, e) : new Date(n.$y, t, e), n);
                        return u ? r : r.endOf(a);
                      },
                      h = function (e, t) {
                        return E.w(
                          n.toDate()[e].apply(n.toDate('s'), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(t)),
                          n,
                        );
                      },
                      v = this.$W,
                      m = this.$M,
                      y = this.$D,
                      g = 'set' + (this.$u ? 'UTC' : '');
                    switch (p) {
                      case l:
                        return u ? f(1, 0) : f(31, 11);
                      case c:
                        return u ? f(1, m) : f(0, m + 1);
                      case s:
                        var b = this.$locale().weekStart || 0,
                          S = (v < b ? v + 7 : v) - b;
                        return f(u ? y - S : y + (6 - S), m);
                      case a:
                      case d:
                        return h(g + 'Hours', 0);
                      case i:
                        return h(g + 'Minutes', 1);
                      case o:
                        return h(g + 'Seconds', 2);
                      case r:
                        return h(g + 'Milliseconds', 3);
                      default:
                        return this.clone();
                    }
                  }),
                  (m.endOf = function (e) {
                    return this.startOf(e, !1);
                  }),
                  (m.$set = function (e, t) {
                    var s,
                      u = E.p(e),
                      p = 'set' + (this.$u ? 'UTC' : ''),
                      f = ((s = {}),
                      (s[a] = p + 'Date'),
                      (s[d] = p + 'Date'),
                      (s[c] = p + 'Month'),
                      (s[l] = p + 'FullYear'),
                      (s[i] = p + 'Hours'),
                      (s[o] = p + 'Minutes'),
                      (s[r] = p + 'Seconds'),
                      (s[n] = p + 'Milliseconds'),
                      s)[u],
                      h = u === a ? this.$D + (t - this.$W) : t;
                    if (u === c || u === l) {
                      var v = this.clone().set(d, 1);
                      v.$d[f](h), v.init(), (this.$d = v.set(d, Math.min(this.$D, v.daysInMonth())).$d);
                    } else f && this.$d[f](h);
                    return this.init(), this;
                  }),
                  (m.set = function (e, t) {
                    return this.clone().$set(e, t);
                  }),
                  (m.get = function (e) {
                    return this[E.p(e)]();
                  }),
                  (m.add = function (n, u) {
                    var d,
                      p = this;
                    n = Number(n);
                    var f = E.p(u),
                      h = function (e) {
                        var t = w(p);
                        return E.w(t.date(t.date() + Math.round(e * n)), p);
                      };
                    if (f === c) return this.set(c, this.$M + n);
                    if (f === l) return this.set(l, this.$y + n);
                    if (f === a) return h(1);
                    if (f === s) return h(7);
                    var v = ((d = {}), (d[o] = e), (d[i] = t), (d[r] = 1e3), d)[f] || 1,
                      m = this.$d.getTime() + n * v;
                    return E.w(m, this);
                  }),
                  (m.subtract = function (e, t) {
                    return this.add(-1 * e, t);
                  }),
                  (m.format = function (e) {
                    var t = this,
                      n = this.$locale();
                    if (!this.isValid()) return n.invalidDate || p;
                    var r = e || 'YYYY-MM-DDTHH:mm:ssZ',
                      o = E.z(this),
                      i = this.$H,
                      a = this.$m,
                      s = this.$M,
                      c = n.weekdays,
                      u = n.months,
                      l = function (e, n, o, i) {
                        return (e && (e[n] || e(t, r))) || o[n].slice(0, i);
                      },
                      d = function (e) {
                        return E.s(i % 12 || 12, e, '0');
                      },
                      f =
                        n.meridiem ||
                        function (e, t, n) {
                          var r = e < 12 ? 'AM' : 'PM';
                          return n ? r.toLowerCase() : r;
                        },
                      v = {
                        YY: String(this.$y).slice(-2),
                        YYYY: this.$y,
                        M: s + 1,
                        MM: E.s(s + 1, 2, '0'),
                        MMM: l(n.monthsShort, s, u, 3),
                        MMMM: l(u, s),
                        D: this.$D,
                        DD: E.s(this.$D, 2, '0'),
                        d: String(this.$W),
                        dd: l(n.weekdaysMin, this.$W, c, 2),
                        ddd: l(n.weekdaysShort, this.$W, c, 3),
                        dddd: c[this.$W],
                        H: String(i),
                        HH: E.s(i, 2, '0'),
                        h: d(1),
                        hh: d(2),
                        a: f(i, a, !0),
                        A: f(i, a, !1),
                        m: String(a),
                        mm: E.s(a, 2, '0'),
                        s: String(this.$s),
                        ss: E.s(this.$s, 2, '0'),
                        SSS: E.s(this.$ms, 3, '0'),
                        Z: o,
                      };
                    return r.replace(h, function (e, t) {
                      return t || v[e] || o.replace(':', '');
                    });
                  }),
                  (m.utcOffset = function () {
                    return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
                  }),
                  (m.diff = function (n, d, p) {
                    var f,
                      h = E.p(d),
                      v = w(n),
                      m = (v.utcOffset() - this.utcOffset()) * e,
                      y = this - v,
                      g = E.m(this, v);
                    return (
                      (g =
                        ((f = {}),
                        (f[l] = g / 12),
                        (f[c] = g),
                        (f[u] = g / 3),
                        (f[s] = (y - m) / 6048e5),
                        (f[a] = (y - m) / 864e5),
                        (f[i] = y / t),
                        (f[o] = y / e),
                        (f[r] = y / 1e3),
                        f)[h] || y),
                      p ? g : E.a(g)
                    );
                  }),
                  (m.daysInMonth = function () {
                    return this.endOf(c).$D;
                  }),
                  (m.$locale = function () {
                    return b[this.$L];
                  }),
                  (m.locale = function (e, t) {
                    if (!e) return this.$L;
                    var n = this.clone(),
                      r = C(e, t, !0);
                    return r && (n.$L = r), n;
                  }),
                  (m.clone = function () {
                    return E.w(this.$d, this);
                  }),
                  (m.toDate = function () {
                    return new Date(this.valueOf());
                  }),
                  (m.toJSON = function () {
                    return this.isValid() ? this.toISOString() : null;
                  }),
                  (m.toISOString = function () {
                    return this.$d.toISOString();
                  }),
                  (m.toString = function () {
                    return this.$d.toUTCString();
                  }),
                  v
                );
              })(),
              T = _.prototype;
            return (
              (w.prototype = T),
              [
                ['$ms', n],
                ['$s', r],
                ['$m', o],
                ['$H', i],
                ['$W', a],
                ['$M', c],
                ['$y', l],
                ['$D', d],
              ].forEach(function (e) {
                T[e[1]] = function (t) {
                  return this.$g(t, e[0], e[1]);
                };
              }),
              (w.extend = function (e, t) {
                return e.$i || (e(t, _, w), (e.$i = !0)), w;
              }),
              (w.locale = C),
              (w.isDayjs = S),
              (w.unix = function (e) {
                return w(1e3 * e);
              }),
              (w.en = b[g]),
              (w.Ls = b),
              (w.p = {}),
              w
            );
          })();
        },
        7648: (e) => {
          'use strict';
          var t = 'Function.prototype.bind called on incompatible ',
            n = Array.prototype.slice,
            r = Object.prototype.toString,
            o = '[object Function]';
          e.exports = function (e) {
            var i = this;
            if ('function' != typeof i || r.call(i) !== o) throw new TypeError(t + i);
            for (
              var a,
                s = n.call(arguments, 1),
                c = function () {
                  if (this instanceof a) {
                    var t = i.apply(this, s.concat(n.call(arguments)));
                    return Object(t) === t ? t : this;
                  }
                  return i.apply(e, s.concat(n.call(arguments)));
                },
                u = Math.max(0, i.length - s.length),
                l = [],
                d = 0;
              d < u;
              d++
            )
              l.push('$' + d);
            if (
              ((a = Function(
                'binder',
                'return function (' + l.join(',') + '){ return binder.apply(this,arguments); }',
              )(c)),
              i.prototype)
            ) {
              var p = function () {};
              (p.prototype = i.prototype), (a.prototype = new p()), (p.prototype = null);
            }
            return a;
          };
        },
        2514: (e, t, n) => {
          'use strict';
          var r = n(7648);
          e.exports = Function.prototype.bind || r;
        },
        210: (e, t, n) => {
          'use strict';
          var r,
            o = SyntaxError,
            i = Function,
            a = TypeError,
            s = function (e) {
              try {
                return i('"use strict"; return (' + e + ').constructor;')();
              } catch (e) {}
            },
            c = Object.getOwnPropertyDescriptor;
          if (c)
            try {
              c({}, '');
            } catch (e) {
              c = null;
            }
          var u = function () {
              throw new a();
            },
            l = c
              ? (function () {
                  try {
                    return u;
                  } catch (e) {
                    try {
                      return c(arguments, 'callee').get;
                    } catch (e) {
                      return u;
                    }
                  }
                })()
              : u,
            d = n(1405)(),
            p =
              Object.getPrototypeOf ||
              function (e) {
                return e.__proto__;
              },
            f = {},
            h = 'undefined' == typeof Uint8Array ? r : p(Uint8Array),
            v = {
              '%AggregateError%': 'undefined' == typeof AggregateError ? r : AggregateError,
              '%Array%': Array,
              '%ArrayBuffer%': 'undefined' == typeof ArrayBuffer ? r : ArrayBuffer,
              '%ArrayIteratorPrototype%': d ? p([][Symbol.iterator]()) : r,
              '%AsyncFromSyncIteratorPrototype%': r,
              '%AsyncFunction%': f,
              '%AsyncGenerator%': f,
              '%AsyncGeneratorFunction%': f,
              '%AsyncIteratorPrototype%': f,
              '%Atomics%': 'undefined' == typeof Atomics ? r : Atomics,
              '%BigInt%': 'undefined' == typeof BigInt ? r : BigInt,
              '%Boolean%': Boolean,
              '%DataView%': 'undefined' == typeof DataView ? r : DataView,
              '%Date%': Date,
              '%decodeURI%': decodeURI,
              '%decodeURIComponent%': decodeURIComponent,
              '%encodeURI%': encodeURI,
              '%encodeURIComponent%': encodeURIComponent,
              '%Error%': Error,
              '%eval%': eval,
              '%EvalError%': EvalError,
              '%Float32Array%': 'undefined' == typeof Float32Array ? r : Float32Array,
              '%Float64Array%': 'undefined' == typeof Float64Array ? r : Float64Array,
              '%FinalizationRegistry%': 'undefined' == typeof FinalizationRegistry ? r : FinalizationRegistry,
              '%Function%': i,
              '%GeneratorFunction%': f,
              '%Int8Array%': 'undefined' == typeof Int8Array ? r : Int8Array,
              '%Int16Array%': 'undefined' == typeof Int16Array ? r : Int16Array,
              '%Int32Array%': 'undefined' == typeof Int32Array ? r : Int32Array,
              '%isFinite%': isFinite,
              '%isNaN%': isNaN,
              '%IteratorPrototype%': d ? p(p([][Symbol.iterator]())) : r,
              '%JSON%': 'object' == typeof JSON ? JSON : r,
              '%Map%': 'undefined' == typeof Map ? r : Map,
              '%MapIteratorPrototype%': 'undefined' != typeof Map && d ? p(new Map()[Symbol.iterator]()) : r,
              '%Math%': Math,
              '%Number%': Number,
              '%Object%': Object,
              '%parseFloat%': parseFloat,
              '%parseInt%': parseInt,
              '%Promise%': 'undefined' == typeof Promise ? r : Promise,
              '%Proxy%': 'undefined' == typeof Proxy ? r : Proxy,
              '%RangeError%': RangeError,
              '%ReferenceError%': ReferenceError,
              '%Reflect%': 'undefined' == typeof Reflect ? r : Reflect,
              '%RegExp%': RegExp,
              '%Set%': 'undefined' == typeof Set ? r : Set,
              '%SetIteratorPrototype%': 'undefined' != typeof Set && d ? p(new Set()[Symbol.iterator]()) : r,
              '%SharedArrayBuffer%': 'undefined' == typeof SharedArrayBuffer ? r : SharedArrayBuffer,
              '%String%': String,
              '%StringIteratorPrototype%': d ? p(''[Symbol.iterator]()) : r,
              '%Symbol%': d ? Symbol : r,
              '%SyntaxError%': o,
              '%ThrowTypeError%': l,
              '%TypedArray%': h,
              '%TypeError%': a,
              '%Uint8Array%': 'undefined' == typeof Uint8Array ? r : Uint8Array,
              '%Uint8ClampedArray%': 'undefined' == typeof Uint8ClampedArray ? r : Uint8ClampedArray,
              '%Uint16Array%': 'undefined' == typeof Uint16Array ? r : Uint16Array,
              '%Uint32Array%': 'undefined' == typeof Uint32Array ? r : Uint32Array,
              '%URIError%': URIError,
              '%WeakMap%': 'undefined' == typeof WeakMap ? r : WeakMap,
              '%WeakRef%': 'undefined' == typeof WeakRef ? r : WeakRef,
              '%WeakSet%': 'undefined' == typeof WeakSet ? r : WeakSet,
            },
            m = function e(t) {
              var n;
              if ('%AsyncFunction%' === t) n = s('async function () {}');
              else if ('%GeneratorFunction%' === t) n = s('function* () {}');
              else if ('%AsyncGeneratorFunction%' === t) n = s('async function* () {}');
              else if ('%AsyncGenerator%' === t) {
                var r = e('%AsyncGeneratorFunction%');
                r && (n = r.prototype);
              } else if ('%AsyncIteratorPrototype%' === t) {
                var o = e('%AsyncGenerator%');
                o && (n = p(o.prototype));
              }
              return (v[t] = n), n;
            },
            y = {
              '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
              '%ArrayPrototype%': ['Array', 'prototype'],
              '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
              '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
              '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
              '%ArrayProto_values%': ['Array', 'prototype', 'values'],
              '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
              '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
              '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
              '%BooleanPrototype%': ['Boolean', 'prototype'],
              '%DataViewPrototype%': ['DataView', 'prototype'],
              '%DatePrototype%': ['Date', 'prototype'],
              '%ErrorPrototype%': ['Error', 'prototype'],
              '%EvalErrorPrototype%': ['EvalError', 'prototype'],
              '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
              '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
              '%FunctionPrototype%': ['Function', 'prototype'],
              '%Generator%': ['GeneratorFunction', 'prototype'],
              '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
              '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
              '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
              '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
              '%JSONParse%': ['JSON', 'parse'],
              '%JSONStringify%': ['JSON', 'stringify'],
              '%MapPrototype%': ['Map', 'prototype'],
              '%NumberPrototype%': ['Number', 'prototype'],
              '%ObjectPrototype%': ['Object', 'prototype'],
              '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
              '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
              '%PromisePrototype%': ['Promise', 'prototype'],
              '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
              '%Promise_all%': ['Promise', 'all'],
              '%Promise_reject%': ['Promise', 'reject'],
              '%Promise_resolve%': ['Promise', 'resolve'],
              '%RangeErrorPrototype%': ['RangeError', 'prototype'],
              '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
              '%RegExpPrototype%': ['RegExp', 'prototype'],
              '%SetPrototype%': ['Set', 'prototype'],
              '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
              '%StringPrototype%': ['String', 'prototype'],
              '%SymbolPrototype%': ['Symbol', 'prototype'],
              '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
              '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
              '%TypeErrorPrototype%': ['TypeError', 'prototype'],
              '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
              '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
              '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
              '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
              '%URIErrorPrototype%': ['URIError', 'prototype'],
              '%WeakMapPrototype%': ['WeakMap', 'prototype'],
              '%WeakSetPrototype%': ['WeakSet', 'prototype'],
            },
            g = n(2514),
            b = n(7642),
            S = g.call(Function.call, Array.prototype.concat),
            C = g.call(Function.apply, Array.prototype.splice),
            w = g.call(Function.call, String.prototype.replace),
            E = g.call(Function.call, String.prototype.slice),
            _ = g.call(Function.call, RegExp.prototype.exec),
            T = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
            k = /\\(\\)?/g,
            R = function (e) {
              var t = E(e, 0, 1),
                n = E(e, -1);
              if ('%' === t && '%' !== n) throw new o('invalid intrinsic syntax, expected closing `%`');
              if ('%' === n && '%' !== t) throw new o('invalid intrinsic syntax, expected opening `%`');
              var r = [];
              return (
                w(e, T, function (e, t, n, o) {
                  r[r.length] = n ? w(o, k, '$1') : t || e;
                }),
                r
              );
            },
            x = function (e, t) {
              var n,
                r = e;
              if ((b(y, r) && (r = '%' + (n = y[r])[0] + '%'), b(v, r))) {
                var i = v[r];
                if ((i === f && (i = m(r)), void 0 === i && !t))
                  throw new a('intrinsic ' + e + ' exists, but is not available. Please file an issue!');
                return { alias: n, name: r, value: i };
              }
              throw new o('intrinsic ' + e + ' does not exist!');
            };
          e.exports = function (e, t) {
            if ('string' != typeof e || 0 === e.length) throw new a('intrinsic name must be a non-empty string');
            if (arguments.length > 1 && 'boolean' != typeof t) throw new a('"allowMissing" argument must be a boolean');
            if (null === _(/^%?[^%]*%?$/, e))
              throw new o('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
            var n = R(e),
              r = n.length > 0 ? n[0] : '',
              i = x('%' + r + '%', t),
              s = i.name,
              u = i.value,
              l = !1,
              d = i.alias;
            d && ((r = d[0]), C(n, S([0, 1], d)));
            for (var p = 1, f = !0; p < n.length; p += 1) {
              var h = n[p],
                m = E(h, 0, 1),
                y = E(h, -1);
              if (('"' === m || "'" === m || '`' === m || '"' === y || "'" === y || '`' === y) && m !== y)
                throw new o('property names with quotes must have matching quotes');
              if ((('constructor' !== h && f) || (l = !0), b(v, (s = '%' + (r += '.' + h) + '%')))) u = v[s];
              else if (null != u) {
                if (!(h in u)) {
                  if (!t) throw new a('base intrinsic for ' + e + ' exists, but the property is not available.');
                  return;
                }
                if (c && p + 1 >= n.length) {
                  var g = c(u, h);
                  u = (f = !!g) && 'get' in g && !('originalValue' in g.get) ? g.get : u[h];
                } else (f = b(u, h)), (u = u[h]);
                f && !l && (v[s] = u);
              }
            }
            return u;
          };
        },
        1405: (e, t, n) => {
          'use strict';
          var r = 'undefined' != typeof Symbol && Symbol,
            o = n(5419);
          e.exports = function () {
            return (
              'function' == typeof r &&
              'function' == typeof Symbol &&
              'symbol' == typeof r('foo') &&
              'symbol' == typeof Symbol('bar') &&
              o()
            );
          };
        },
        5419: (e) => {
          'use strict';
          e.exports = function () {
            if ('function' != typeof Symbol || 'function' != typeof Object.getOwnPropertySymbols) return !1;
            if ('symbol' == typeof Symbol.iterator) return !0;
            var e = {},
              t = Symbol('test'),
              n = Object(t);
            if ('string' == typeof t) return !1;
            if ('[object Symbol]' !== Object.prototype.toString.call(t)) return !1;
            if ('[object Symbol]' !== Object.prototype.toString.call(n)) return !1;
            for (t in ((e[t] = 42), e)) return !1;
            if ('function' == typeof Object.keys && 0 !== Object.keys(e).length) return !1;
            if ('function' == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length)
              return !1;
            var r = Object.getOwnPropertySymbols(e);
            if (1 !== r.length || r[0] !== t) return !1;
            if (!Object.prototype.propertyIsEnumerable.call(e, t)) return !1;
            if ('function' == typeof Object.getOwnPropertyDescriptor) {
              var o = Object.getOwnPropertyDescriptor(e, t);
              if (42 !== o.value || !0 !== o.enumerable) return !1;
            }
            return !0;
          };
        },
        7642: (e, t, n) => {
          'use strict';
          var r = n(2514);
          e.exports = r.call(Function.call, Object.prototype.hasOwnProperty);
        },
        8738: (e) => {
          e.exports = function (e) {
            return (
              null != e &&
              null != e.constructor &&
              'function' == typeof e.constructor.isBuffer &&
              e.constructor.isBuffer(e)
            );
          };
        },
        646: function (e) {
          e.exports = (function () {
            'use strict';
            function e(e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) e[r] = n[r];
              }
              return e;
            }
            return (function t(n, r) {
              function o(t, o, i) {
                if ('undefined' != typeof document) {
                  'number' == typeof (i = e({}, r, i)).expires &&
                    (i.expires = new Date(Date.now() + 864e5 * i.expires)),
                    i.expires && (i.expires = i.expires.toUTCString()),
                    (t = encodeURIComponent(t)
                      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                      .replace(/[()]/g, escape));
                  var a = '';
                  for (var s in i) i[s] && ((a += '; ' + s), !0 !== i[s] && (a += '=' + i[s].split(';')[0]));
                  return (document.cookie = t + '=' + n.write(o, t) + a);
                }
              }
              return Object.create(
                {
                  set: o,
                  get: function (e) {
                    if ('undefined' != typeof document && (!arguments.length || e)) {
                      for (
                        var t = document.cookie ? document.cookie.split('; ') : [], r = {}, o = 0;
                        o < t.length;
                        o++
                      ) {
                        var i = t[o].split('='),
                          a = i.slice(1).join('=');
                        try {
                          var s = decodeURIComponent(i[0]);
                          if (((r[s] = n.read(a, s)), e === s)) break;
                        } catch (e) {}
                      }
                      return e ? r[e] : r;
                    }
                  },
                  remove: function (t, n) {
                    o(t, '', e({}, n, { expires: -1 }));
                  },
                  withAttributes: function (n) {
                    return t(this.converter, e({}, this.attributes, n));
                  },
                  withConverter: function (n) {
                    return t(e({}, this.converter, n), this.attributes);
                  },
                },
                { attributes: { value: Object.freeze(r) }, converter: { value: Object.freeze(n) } },
              );
            })(
              {
                read: function (e) {
                  return '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
                },
                write: function (e) {
                  return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
                },
              },
              { path: '/' },
            );
          })();
        },
        1989: (e, t, n) => {
          var r = n(1789),
            o = n(401),
            i = n(7667),
            a = n(1327),
            s = n(1866);
          function c(e) {
            var t = -1,
              n = null == e ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
              var r = e[t];
              this.set(r[0], r[1]);
            }
          }
          (c.prototype.clear = r),
            (c.prototype.delete = o),
            (c.prototype.get = i),
            (c.prototype.has = a),
            (c.prototype.set = s),
            (e.exports = c);
        },
        8407: (e, t, n) => {
          var r = n(7040),
            o = n(4125),
            i = n(2117),
            a = n(7518),
            s = n(4705);
          function c(e) {
            var t = -1,
              n = null == e ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
              var r = e[t];
              this.set(r[0], r[1]);
            }
          }
          (c.prototype.clear = r),
            (c.prototype.delete = o),
            (c.prototype.get = i),
            (c.prototype.has = a),
            (c.prototype.set = s),
            (e.exports = c);
        },
        7071: (e, t, n) => {
          var r = n(852)(n(5639), 'Map');
          e.exports = r;
        },
        3369: (e, t, n) => {
          var r = n(4785),
            o = n(1285),
            i = n(6e3),
            a = n(9916),
            s = n(5265);
          function c(e) {
            var t = -1,
              n = null == e ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
              var r = e[t];
              this.set(r[0], r[1]);
            }
          }
          (c.prototype.clear = r),
            (c.prototype.delete = o),
            (c.prototype.get = i),
            (c.prototype.has = a),
            (c.prototype.set = s),
            (e.exports = c);
        },
        6384: (e, t, n) => {
          var r = n(8407),
            o = n(7465),
            i = n(3779),
            a = n(7599),
            s = n(4758),
            c = n(4309);
          function u(e) {
            var t = (this.__data__ = new r(e));
            this.size = t.size;
          }
          (u.prototype.clear = o),
            (u.prototype.delete = i),
            (u.prototype.get = a),
            (u.prototype.has = s),
            (u.prototype.set = c),
            (e.exports = u);
        },
        2705: (e, t, n) => {
          var r = n(5639).Symbol;
          e.exports = r;
        },
        1149: (e, t, n) => {
          var r = n(5639).Uint8Array;
          e.exports = r;
        },
        6874: (e) => {
          e.exports = function (e, t, n) {
            switch (n.length) {
              case 0:
                return e.call(t);
              case 1:
                return e.call(t, n[0]);
              case 2:
                return e.call(t, n[0], n[1]);
              case 3:
                return e.call(t, n[0], n[1], n[2]);
            }
            return e.apply(t, n);
          };
        },
        4636: (e, t, n) => {
          var r = n(2545),
            o = n(5694),
            i = n(1469),
            a = n(4144),
            s = n(5776),
            c = n(6719),
            u = Object.prototype.hasOwnProperty;
          e.exports = function (e, t) {
            var n = i(e),
              l = !n && o(e),
              d = !n && !l && a(e),
              p = !n && !l && !d && c(e),
              f = n || l || d || p,
              h = f ? r(e.length, String) : [],
              v = h.length;
            for (var m in e)
              (!t && !u.call(e, m)) ||
                (f &&
                  ('length' == m ||
                    (d && ('offset' == m || 'parent' == m)) ||
                    (p && ('buffer' == m || 'byteLength' == m || 'byteOffset' == m)) ||
                    s(m, v))) ||
                h.push(m);
            return h;
          };
        },
        6556: (e, t, n) => {
          var r = n(9465),
            o = n(7813);
          e.exports = function (e, t, n) {
            ((void 0 !== n && !o(e[t], n)) || (void 0 === n && !(t in e))) && r(e, t, n);
          };
        },
        4865: (e, t, n) => {
          var r = n(9465),
            o = n(7813),
            i = Object.prototype.hasOwnProperty;
          e.exports = function (e, t, n) {
            var a = e[t];
            (i.call(e, t) && o(a, n) && (void 0 !== n || t in e)) || r(e, t, n);
          };
        },
        8470: (e, t, n) => {
          var r = n(7813);
          e.exports = function (e, t) {
            for (var n = e.length; n--; ) if (r(e[n][0], t)) return n;
            return -1;
          };
        },
        9465: (e, t, n) => {
          var r = n(8777);
          e.exports = function (e, t, n) {
            '__proto__' == t && r ? r(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 }) : (e[t] = n);
          };
        },
        3118: (e, t, n) => {
          var r = n(3218),
            o = Object.create,
            i = (function () {
              function e() {}
              return function (t) {
                if (!r(t)) return {};
                if (o) return o(t);
                e.prototype = t;
                var n = new e();
                return (e.prototype = void 0), n;
              };
            })();
          e.exports = i;
        },
        8483: (e, t, n) => {
          var r = n(5063)();
          e.exports = r;
        },
        4239: (e, t, n) => {
          var r = n(2705),
            o = n(9607),
            i = n(2333),
            a = r ? r.toStringTag : void 0;
          e.exports = function (e) {
            return null == e
              ? void 0 === e
                ? '[object Undefined]'
                : '[object Null]'
              : a && a in Object(e)
              ? o(e)
              : i(e);
          };
        },
        9454: (e, t, n) => {
          var r = n(4239),
            o = n(7005);
          e.exports = function (e) {
            return o(e) && '[object Arguments]' == r(e);
          };
        },
        8458: (e, t, n) => {
          var r = n(3560),
            o = n(5346),
            i = n(3218),
            a = n(346),
            s = /^\[object .+?Constructor\]$/,
            c = Function.prototype,
            u = Object.prototype,
            l = c.toString,
            d = u.hasOwnProperty,
            p = RegExp(
              '^' +
                l
                  .call(d)
                  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
                  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
                '$',
            );
          e.exports = function (e) {
            return !(!i(e) || o(e)) && (r(e) ? p : s).test(a(e));
          };
        },
        8749: (e, t, n) => {
          var r = n(4239),
            o = n(1780),
            i = n(7005),
            a = {};
          (a['[object Float32Array]'] =
            a['[object Float64Array]'] =
            a['[object Int8Array]'] =
            a['[object Int16Array]'] =
            a['[object Int32Array]'] =
            a['[object Uint8Array]'] =
            a['[object Uint8ClampedArray]'] =
            a['[object Uint16Array]'] =
            a['[object Uint32Array]'] =
              !0),
            (a['[object Arguments]'] =
              a['[object Array]'] =
              a['[object ArrayBuffer]'] =
              a['[object Boolean]'] =
              a['[object DataView]'] =
              a['[object Date]'] =
              a['[object Error]'] =
              a['[object Function]'] =
              a['[object Map]'] =
              a['[object Number]'] =
              a['[object Object]'] =
              a['[object RegExp]'] =
              a['[object Set]'] =
              a['[object String]'] =
              a['[object WeakMap]'] =
                !1),
            (e.exports = function (e) {
              return i(e) && o(e.length) && !!a[r(e)];
            });
        },
        313: (e, t, n) => {
          var r = n(3218),
            o = n(5726),
            i = n(3498),
            a = Object.prototype.hasOwnProperty;
          e.exports = function (e) {
            if (!r(e)) return i(e);
            var t = o(e),
              n = [];
            for (var s in e) ('constructor' != s || (!t && a.call(e, s))) && n.push(s);
            return n;
          };
        },
        2980: (e, t, n) => {
          var r = n(6384),
            o = n(6556),
            i = n(8483),
            a = n(9783),
            s = n(3218),
            c = n(1704),
            u = n(6390);
          e.exports = function e(t, n, l, d, p) {
            t !== n &&
              i(
                n,
                function (i, c) {
                  if ((p || (p = new r()), s(i))) a(t, n, c, l, e, d, p);
                  else {
                    var f = d ? d(u(t, c), i, c + '', t, n, p) : void 0;
                    void 0 === f && (f = i), o(t, c, f);
                  }
                },
                c,
              );
          };
        },
        9783: (e, t, n) => {
          var r = n(6556),
            o = n(4626),
            i = n(7133),
            a = n(278),
            s = n(8517),
            c = n(5694),
            u = n(1469),
            l = n(9246),
            d = n(4144),
            p = n(3560),
            f = n(3218),
            h = n(8630),
            v = n(6719),
            m = n(6390),
            y = n(9881);
          e.exports = function (e, t, n, g, b, S, C) {
            var w = m(e, n),
              E = m(t, n),
              _ = C.get(E);
            if (_) r(e, n, _);
            else {
              var T = S ? S(w, E, n + '', e, t, C) : void 0,
                k = void 0 === T;
              if (k) {
                var R = u(E),
                  x = !R && d(E),
                  O = !R && !x && v(E);
                (T = E),
                  R || x || O
                    ? u(w)
                      ? (T = w)
                      : l(w)
                      ? (T = a(w))
                      : x
                      ? ((k = !1), (T = o(E, !0)))
                      : O
                      ? ((k = !1), (T = i(E, !0)))
                      : (T = [])
                    : h(E) || c(E)
                    ? ((T = w), c(w) ? (T = y(w)) : (f(w) && !p(w)) || (T = s(E)))
                    : (k = !1);
              }
              k && (C.set(E, T), b(T, E, g, S, C), C.delete(E)), r(e, n, T);
            }
          };
        },
        5976: (e, t, n) => {
          var r = n(6557),
            o = n(5357),
            i = n(61);
          e.exports = function (e, t) {
            return i(o(e, t, r), e + '');
          };
        },
        6560: (e, t, n) => {
          var r = n(5703),
            o = n(8777),
            i = n(6557),
            a = o
              ? function (e, t) {
                  return o(e, 'toString', { configurable: !0, enumerable: !1, value: r(t), writable: !0 });
                }
              : i;
          e.exports = a;
        },
        2545: (e) => {
          e.exports = function (e, t) {
            for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
            return r;
          };
        },
        1717: (e) => {
          e.exports = function (e) {
            return function (t) {
              return e(t);
            };
          };
        },
        4318: (e, t, n) => {
          var r = n(1149);
          e.exports = function (e) {
            var t = new e.constructor(e.byteLength);
            return new r(t).set(new r(e)), t;
          };
        },
        4626: (e, t, n) => {
          e = n.nmd(e);
          var r = n(5639),
            o = t && !t.nodeType && t,
            i = o && e && !e.nodeType && e,
            a = i && i.exports === o ? r.Buffer : void 0,
            s = a ? a.allocUnsafe : void 0;
          e.exports = function (e, t) {
            if (t) return e.slice();
            var n = e.length,
              r = s ? s(n) : new e.constructor(n);
            return e.copy(r), r;
          };
        },
        7133: (e, t, n) => {
          var r = n(4318);
          e.exports = function (e, t) {
            var n = t ? r(e.buffer) : e.buffer;
            return new e.constructor(n, e.byteOffset, e.length);
          };
        },
        278: (e) => {
          e.exports = function (e, t) {
            var n = -1,
              r = e.length;
            for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
            return t;
          };
        },
        8363: (e, t, n) => {
          var r = n(4865),
            o = n(9465);
          e.exports = function (e, t, n, i) {
            var a = !n;
            n || (n = {});
            for (var s = -1, c = t.length; ++s < c; ) {
              var u = t[s],
                l = i ? i(n[u], e[u], u, n, e) : void 0;
              void 0 === l && (l = e[u]), a ? o(n, u, l) : r(n, u, l);
            }
            return n;
          };
        },
        4429: (e, t, n) => {
          var r = n(5639)['__core-js_shared__'];
          e.exports = r;
        },
        1463: (e, t, n) => {
          var r = n(5976),
            o = n(6612);
          e.exports = function (e) {
            return r(function (t, n) {
              var r = -1,
                i = n.length,
                a = i > 1 ? n[i - 1] : void 0,
                s = i > 2 ? n[2] : void 0;
              for (
                a = e.length > 3 && 'function' == typeof a ? (i--, a) : void 0,
                  s && o(n[0], n[1], s) && ((a = i < 3 ? void 0 : a), (i = 1)),
                  t = Object(t);
                ++r < i;

              ) {
                var c = n[r];
                c && e(t, c, r, a);
              }
              return t;
            });
          };
        },
        5063: (e) => {
          e.exports = function (e) {
            return function (t, n, r) {
              for (var o = -1, i = Object(t), a = r(t), s = a.length; s--; ) {
                var c = a[e ? s : ++o];
                if (!1 === n(i[c], c, i)) break;
              }
              return t;
            };
          };
        },
        8777: (e, t, n) => {
          var r = n(852),
            o = (function () {
              try {
                var e = r(Object, 'defineProperty');
                return e({}, '', {}), e;
              } catch (e) {}
            })();
          e.exports = o;
        },
        1957: (e, t, n) => {
          var r = 'object' == typeof n.g && n.g && n.g.Object === Object && n.g;
          e.exports = r;
        },
        5050: (e, t, n) => {
          var r = n(7019);
          e.exports = function (e, t) {
            var n = e.__data__;
            return r(t) ? n['string' == typeof t ? 'string' : 'hash'] : n.map;
          };
        },
        852: (e, t, n) => {
          var r = n(8458),
            o = n(7801);
          e.exports = function (e, t) {
            var n = o(e, t);
            return r(n) ? n : void 0;
          };
        },
        5924: (e, t, n) => {
          var r = n(5569)(Object.getPrototypeOf, Object);
          e.exports = r;
        },
        9607: (e, t, n) => {
          var r = n(2705),
            o = Object.prototype,
            i = o.hasOwnProperty,
            a = o.toString,
            s = r ? r.toStringTag : void 0;
          e.exports = function (e) {
            var t = i.call(e, s),
              n = e[s];
            try {
              e[s] = void 0;
              var r = !0;
            } catch (e) {}
            var o = a.call(e);
            return r && (t ? (e[s] = n) : delete e[s]), o;
          };
        },
        7801: (e) => {
          e.exports = function (e, t) {
            return null == e ? void 0 : e[t];
          };
        },
        1789: (e, t, n) => {
          var r = n(4536);
          e.exports = function () {
            (this.__data__ = r ? r(null) : {}), (this.size = 0);
          };
        },
        401: (e) => {
          e.exports = function (e) {
            var t = this.has(e) && delete this.__data__[e];
            return (this.size -= t ? 1 : 0), t;
          };
        },
        7667: (e, t, n) => {
          var r = n(4536),
            o = Object.prototype.hasOwnProperty;
          e.exports = function (e) {
            var t = this.__data__;
            if (r) {
              var n = t[e];
              return '__lodash_hash_undefined__' === n ? void 0 : n;
            }
            return o.call(t, e) ? t[e] : void 0;
          };
        },
        1327: (e, t, n) => {
          var r = n(4536),
            o = Object.prototype.hasOwnProperty;
          e.exports = function (e) {
            var t = this.__data__;
            return r ? void 0 !== t[e] : o.call(t, e);
          };
        },
        1866: (e, t, n) => {
          var r = n(4536);
          e.exports = function (e, t) {
            var n = this.__data__;
            return (
              (this.size += this.has(e) ? 0 : 1), (n[e] = r && void 0 === t ? '__lodash_hash_undefined__' : t), this
            );
          };
        },
        8517: (e, t, n) => {
          var r = n(3118),
            o = n(5924),
            i = n(5726);
          e.exports = function (e) {
            return 'function' != typeof e.constructor || i(e) ? {} : r(o(e));
          };
        },
        5776: (e) => {
          var t = /^(?:0|[1-9]\d*)$/;
          e.exports = function (e, n) {
            var r = typeof e;
            return (
              !!(n = null == n ? 9007199254740991 : n) &&
              ('number' == r || ('symbol' != r && t.test(e))) &&
              e > -1 &&
              e % 1 == 0 &&
              e < n
            );
          };
        },
        6612: (e, t, n) => {
          var r = n(7813),
            o = n(8612),
            i = n(5776),
            a = n(3218);
          e.exports = function (e, t, n) {
            if (!a(n)) return !1;
            var s = typeof t;
            return !!('number' == s ? o(n) && i(t, n.length) : 'string' == s && t in n) && r(n[t], e);
          };
        },
        7019: (e) => {
          e.exports = function (e) {
            var t = typeof e;
            return 'string' == t || 'number' == t || 'symbol' == t || 'boolean' == t ? '__proto__' !== e : null === e;
          };
        },
        5346: (e, t, n) => {
          var r,
            o = n(4429),
            i = (r = /[^.]+$/.exec((o && o.keys && o.keys.IE_PROTO) || '')) ? 'Symbol(src)_1.' + r : '';
          e.exports = function (e) {
            return !!i && i in e;
          };
        },
        5726: (e) => {
          var t = Object.prototype;
          e.exports = function (e) {
            var n = e && e.constructor;
            return e === (('function' == typeof n && n.prototype) || t);
          };
        },
        7040: (e) => {
          e.exports = function () {
            (this.__data__ = []), (this.size = 0);
          };
        },
        4125: (e, t, n) => {
          var r = n(8470),
            o = Array.prototype.splice;
          e.exports = function (e) {
            var t = this.__data__,
              n = r(t, e);
            return !(n < 0 || (n == t.length - 1 ? t.pop() : o.call(t, n, 1), --this.size, 0));
          };
        },
        2117: (e, t, n) => {
          var r = n(8470);
          e.exports = function (e) {
            var t = this.__data__,
              n = r(t, e);
            return n < 0 ? void 0 : t[n][1];
          };
        },
        7518: (e, t, n) => {
          var r = n(8470);
          e.exports = function (e) {
            return r(this.__data__, e) > -1;
          };
        },
        4705: (e, t, n) => {
          var r = n(8470);
          e.exports = function (e, t) {
            var n = this.__data__,
              o = r(n, e);
            return o < 0 ? (++this.size, n.push([e, t])) : (n[o][1] = t), this;
          };
        },
        4785: (e, t, n) => {
          var r = n(1989),
            o = n(8407),
            i = n(7071);
          e.exports = function () {
            (this.size = 0), (this.__data__ = { hash: new r(), map: new (i || o)(), string: new r() });
          };
        },
        1285: (e, t, n) => {
          var r = n(5050);
          e.exports = function (e) {
            var t = r(this, e).delete(e);
            return (this.size -= t ? 1 : 0), t;
          };
        },
        6e3: (e, t, n) => {
          var r = n(5050);
          e.exports = function (e) {
            return r(this, e).get(e);
          };
        },
        9916: (e, t, n) => {
          var r = n(5050);
          e.exports = function (e) {
            return r(this, e).has(e);
          };
        },
        5265: (e, t, n) => {
          var r = n(5050);
          e.exports = function (e, t) {
            var n = r(this, e),
              o = n.size;
            return n.set(e, t), (this.size += n.size == o ? 0 : 1), this;
          };
        },
        4536: (e, t, n) => {
          var r = n(852)(Object, 'create');
          e.exports = r;
        },
        3498: (e) => {
          e.exports = function (e) {
            var t = [];
            if (null != e) for (var n in Object(e)) t.push(n);
            return t;
          };
        },
        1167: (e, t, n) => {
          e = n.nmd(e);
          var r = n(1957),
            o = t && !t.nodeType && t,
            i = o && e && !e.nodeType && e,
            a = i && i.exports === o && r.process,
            s = (function () {
              try {
                return (i && i.require && i.require('util').types) || (a && a.binding && a.binding('util'));
              } catch (e) {}
            })();
          e.exports = s;
        },
        2333: (e) => {
          var t = Object.prototype.toString;
          e.exports = function (e) {
            return t.call(e);
          };
        },
        5569: (e) => {
          e.exports = function (e, t) {
            return function (n) {
              return e(t(n));
            };
          };
        },
        5357: (e, t, n) => {
          var r = n(6874),
            o = Math.max;
          e.exports = function (e, t, n) {
            return (
              (t = o(void 0 === t ? e.length - 1 : t, 0)),
              function () {
                for (var i = arguments, a = -1, s = o(i.length - t, 0), c = Array(s); ++a < s; ) c[a] = i[t + a];
                a = -1;
                for (var u = Array(t + 1); ++a < t; ) u[a] = i[a];
                return (u[t] = n(c)), r(e, this, u);
              }
            );
          };
        },
        5639: (e, t, n) => {
          var r = n(1957),
            o = 'object' == typeof self && self && self.Object === Object && self,
            i = r || o || Function('return this')();
          e.exports = i;
        },
        6390: (e) => {
          e.exports = function (e, t) {
            if (('constructor' !== t || 'function' != typeof e[t]) && '__proto__' != t) return e[t];
          };
        },
        61: (e, t, n) => {
          var r = n(6560),
            o = n(1275)(r);
          e.exports = o;
        },
        1275: (e) => {
          var t = Date.now;
          e.exports = function (e) {
            var n = 0,
              r = 0;
            return function () {
              var o = t(),
                i = 16 - (o - r);
              if (((r = o), i > 0)) {
                if (++n >= 800) return arguments[0];
              } else n = 0;
              return e.apply(void 0, arguments);
            };
          };
        },
        7465: (e, t, n) => {
          var r = n(8407);
          e.exports = function () {
            (this.__data__ = new r()), (this.size = 0);
          };
        },
        3779: (e) => {
          e.exports = function (e) {
            var t = this.__data__,
              n = t.delete(e);
            return (this.size = t.size), n;
          };
        },
        7599: (e) => {
          e.exports = function (e) {
            return this.__data__.get(e);
          };
        },
        4758: (e) => {
          e.exports = function (e) {
            return this.__data__.has(e);
          };
        },
        4309: (e, t, n) => {
          var r = n(8407),
            o = n(7071),
            i = n(3369);
          e.exports = function (e, t) {
            var n = this.__data__;
            if (n instanceof r) {
              var a = n.__data__;
              if (!o || a.length < 199) return a.push([e, t]), (this.size = ++n.size), this;
              n = this.__data__ = new i(a);
            }
            return n.set(e, t), (this.size = n.size), this;
          };
        },
        346: (e) => {
          var t = Function.prototype.toString;
          e.exports = function (e) {
            if (null != e) {
              try {
                return t.call(e);
              } catch (e) {}
              try {
                return e + '';
              } catch (e) {}
            }
            return '';
          };
        },
        5703: (e) => {
          e.exports = function (e) {
            return function () {
              return e;
            };
          };
        },
        7813: (e) => {
          e.exports = function (e, t) {
            return e === t || (e != e && t != t);
          };
        },
        6557: (e) => {
          e.exports = function (e) {
            return e;
          };
        },
        5694: (e, t, n) => {
          var r = n(9454),
            o = n(7005),
            i = Object.prototype,
            a = i.hasOwnProperty,
            s = i.propertyIsEnumerable,
            c = r(
              (function () {
                return arguments;
              })(),
            )
              ? r
              : function (e) {
                  return o(e) && a.call(e, 'callee') && !s.call(e, 'callee');
                };
          e.exports = c;
        },
        1469: (e) => {
          var t = Array.isArray;
          e.exports = t;
        },
        8612: (e, t, n) => {
          var r = n(3560),
            o = n(1780);
          e.exports = function (e) {
            return null != e && o(e.length) && !r(e);
          };
        },
        9246: (e, t, n) => {
          var r = n(8612),
            o = n(7005);
          e.exports = function (e) {
            return o(e) && r(e);
          };
        },
        4144: (e, t, n) => {
          e = n.nmd(e);
          var r = n(5639),
            o = n(5062),
            i = t && !t.nodeType && t,
            a = i && e && !e.nodeType && e,
            s = a && a.exports === i ? r.Buffer : void 0,
            c = (s ? s.isBuffer : void 0) || o;
          e.exports = c;
        },
        3560: (e, t, n) => {
          var r = n(4239),
            o = n(3218);
          e.exports = function (e) {
            if (!o(e)) return !1;
            var t = r(e);
            return (
              '[object Function]' == t ||
              '[object GeneratorFunction]' == t ||
              '[object AsyncFunction]' == t ||
              '[object Proxy]' == t
            );
          };
        },
        1780: (e) => {
          e.exports = function (e) {
            return 'number' == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991;
          };
        },
        3218: (e) => {
          e.exports = function (e) {
            var t = typeof e;
            return null != e && ('object' == t || 'function' == t);
          };
        },
        7005: (e) => {
          e.exports = function (e) {
            return null != e && 'object' == typeof e;
          };
        },
        8630: (e, t, n) => {
          var r = n(4239),
            o = n(5924),
            i = n(7005),
            a = Function.prototype,
            s = Object.prototype,
            c = a.toString,
            u = s.hasOwnProperty,
            l = c.call(Object);
          e.exports = function (e) {
            if (!i(e) || '[object Object]' != r(e)) return !1;
            var t = o(e);
            if (null === t) return !0;
            var n = u.call(t, 'constructor') && t.constructor;
            return 'function' == typeof n && n instanceof n && c.call(n) == l;
          };
        },
        6719: (e, t, n) => {
          var r = n(8749),
            o = n(1717),
            i = n(1167),
            a = i && i.isTypedArray,
            s = a ? o(a) : r;
          e.exports = s;
        },
        1704: (e, t, n) => {
          var r = n(4636),
            o = n(313),
            i = n(8612);
          e.exports = function (e) {
            return i(e) ? r(e, !0) : o(e);
          };
        },
        2492: (e, t, n) => {
          var r = n(2980),
            o = n(1463)(function (e, t, n) {
              r(e, t, n);
            });
          e.exports = o;
        },
        5062: (e) => {
          e.exports = function () {
            return !1;
          };
        },
        9881: (e, t, n) => {
          var r = n(8363),
            o = n(1704);
          e.exports = function (e) {
            return r(e, o(e));
          };
        },
        631: (e, t, n) => {
          var r = 'function' == typeof Map && Map.prototype,
            o = Object.getOwnPropertyDescriptor && r ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null,
            i = r && o && 'function' == typeof o.get ? o.get : null,
            a = r && Map.prototype.forEach,
            s = 'function' == typeof Set && Set.prototype,
            c = Object.getOwnPropertyDescriptor && s ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null,
            u = s && c && 'function' == typeof c.get ? c.get : null,
            l = s && Set.prototype.forEach,
            d = 'function' == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null,
            p = 'function' == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null,
            f = 'function' == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null,
            h = Boolean.prototype.valueOf,
            v = Object.prototype.toString,
            m = Function.prototype.toString,
            y = String.prototype.match,
            g = String.prototype.slice,
            b = String.prototype.replace,
            S = String.prototype.toUpperCase,
            C = String.prototype.toLowerCase,
            w = RegExp.prototype.test,
            E = Array.prototype.concat,
            _ = Array.prototype.join,
            T = Array.prototype.slice,
            k = Math.floor,
            R = 'function' == typeof BigInt ? BigInt.prototype.valueOf : null,
            x = Object.getOwnPropertySymbols,
            O = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? Symbol.prototype.toString : null,
            P = 'function' == typeof Symbol && 'object' == typeof Symbol.iterator,
            D =
              'function' == typeof Symbol && Symbol.toStringTag && (Symbol.toStringTag, 1) ? Symbol.toStringTag : null,
            M = Object.prototype.propertyIsEnumerable,
            A =
              ('function' == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) ||
              ([].__proto__ === Array.prototype
                ? function (e) {
                    return e.__proto__;
                  }
                : null);
          function I(e, t) {
            if (e === 1 / 0 || e === -1 / 0 || e != e || (e && e > -1e3 && e < 1e3) || w.call(/e/, t)) return t;
            var n = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
            if ('number' == typeof e) {
              var r = e < 0 ? -k(-e) : k(e);
              if (r !== e) {
                var o = String(r),
                  i = g.call(t, o.length + 1);
                return b.call(o, n, '$&_') + '.' + b.call(b.call(i, /([0-9]{3})/g, '$&_'), /_$/, '');
              }
            }
            return b.call(t, n, '$&_');
          }
          var j = n(4654),
            L = j.custom,
            N = H(L) ? L : null;
          function F(e, t, n) {
            var r = 'double' === (n.quoteStyle || t) ? '"' : "'";
            return r + e + r;
          }
          function B(e) {
            return b.call(String(e), /"/g, '&quot;');
          }
          function U(e) {
            return !('[object Array]' !== K(e) || (D && 'object' == typeof e && D in e));
          }
          function G(e) {
            return !('[object RegExp]' !== K(e) || (D && 'object' == typeof e && D in e));
          }
          function H(e) {
            if (P) return e && 'object' == typeof e && e instanceof Symbol;
            if ('symbol' == typeof e) return !0;
            if (!e || 'object' != typeof e || !O) return !1;
            try {
              return O.call(e), !0;
            } catch (e) {}
            return !1;
          }
          e.exports = function e(t, n, r, o) {
            var s = n || {};
            if (q(s, 'quoteStyle') && 'single' !== s.quoteStyle && 'double' !== s.quoteStyle)
              throw new TypeError('option "quoteStyle" must be "single" or "double"');
            if (
              q(s, 'maxStringLength') &&
              ('number' == typeof s.maxStringLength
                ? s.maxStringLength < 0 && s.maxStringLength !== 1 / 0
                : null !== s.maxStringLength)
            )
              throw new TypeError(
                'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`',
              );
            var c = !q(s, 'customInspect') || s.customInspect;
            if ('boolean' != typeof c && 'symbol' !== c)
              throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
            if (
              q(s, 'indent') &&
              null !== s.indent &&
              '\t' !== s.indent &&
              !(parseInt(s.indent, 10) === s.indent && s.indent > 0)
            )
              throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
            if (q(s, 'numericSeparator') && 'boolean' != typeof s.numericSeparator)
              throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
            var v = s.numericSeparator;
            if (void 0 === t) return 'undefined';
            if (null === t) return 'null';
            if ('boolean' == typeof t) return t ? 'true' : 'false';
            if ('string' == typeof t) return z(t, s);
            if ('number' == typeof t) {
              if (0 === t) return 1 / 0 / t > 0 ? '0' : '-0';
              var S = String(t);
              return v ? I(t, S) : S;
            }
            if ('bigint' == typeof t) {
              var w = String(t) + 'n';
              return v ? I(t, w) : w;
            }
            var k = void 0 === s.depth ? 5 : s.depth;
            if ((void 0 === r && (r = 0), r >= k && k > 0 && 'object' == typeof t))
              return U(t) ? '[Array]' : '[Object]';
            var x,
              L = (function (e, t) {
                var n;
                if ('\t' === e.indent) n = '\t';
                else {
                  if (!('number' == typeof e.indent && e.indent > 0)) return null;
                  n = _.call(Array(e.indent + 1), ' ');
                }
                return { base: n, prev: _.call(Array(t + 1), n) };
              })(s, r);
            if (void 0 === o) o = [];
            else if (V(o, t) >= 0) return '[Circular]';
            function W(t, n, i) {
              if ((n && (o = T.call(o)).push(n), i)) {
                var a = { depth: s.depth };
                return q(s, 'quoteStyle') && (a.quoteStyle = s.quoteStyle), e(t, a, r + 1, o);
              }
              return e(t, s, r + 1, o);
            }
            if ('function' == typeof t && !G(t)) {
              var $ = (function (e) {
                  if (e.name) return e.name;
                  var t = y.call(m.call(e), /^function\s*([\w$]+)/);
                  return t ? t[1] : null;
                })(t),
                ee = Z(t, W);
              return (
                '[Function' +
                ($ ? ': ' + $ : ' (anonymous)') +
                ']' +
                (ee.length > 0 ? ' { ' + _.call(ee, ', ') + ' }' : '')
              );
            }
            if (H(t)) {
              var te = P ? b.call(String(t), /^(Symbol\(.*\))_[^)]*$/, '$1') : O.call(t);
              return 'object' != typeof t || P ? te : Y(te);
            }
            if (
              (x = t) &&
              'object' == typeof x &&
              (('undefined' != typeof HTMLElement && x instanceof HTMLElement) ||
                ('string' == typeof x.nodeName && 'function' == typeof x.getAttribute))
            ) {
              for (var ne = '<' + C.call(String(t.nodeName)), re = t.attributes || [], oe = 0; oe < re.length; oe++)
                ne += ' ' + re[oe].name + '=' + F(B(re[oe].value), 'double', s);
              return (
                (ne += '>'),
                t.childNodes && t.childNodes.length && (ne += '...'),
                ne + '</' + C.call(String(t.nodeName)) + '>'
              );
            }
            if (U(t)) {
              if (0 === t.length) return '[]';
              var ie = Z(t, W);
              return L &&
                !(function (e) {
                  for (var t = 0; t < e.length; t++) if (V(e[t], '\n') >= 0) return !1;
                  return !0;
                })(ie)
                ? '[' + Q(ie, L) + ']'
                : '[ ' + _.call(ie, ', ') + ' ]';
            }
            if (
              (function (e) {
                return !('[object Error]' !== K(e) || (D && 'object' == typeof e && D in e));
              })(t)
            ) {
              var ae = Z(t, W);
              return 'cause' in Error.prototype || !('cause' in t) || M.call(t, 'cause')
                ? 0 === ae.length
                  ? '[' + String(t) + ']'
                  : '{ [' + String(t) + '] ' + _.call(ae, ', ') + ' }'
                : '{ [' + String(t) + '] ' + _.call(E.call('[cause]: ' + W(t.cause), ae), ', ') + ' }';
            }
            if ('object' == typeof t && c) {
              if (N && 'function' == typeof t[N] && j) return j(t, { depth: k - r });
              if ('symbol' !== c && 'function' == typeof t.inspect) return t.inspect();
            }
            if (
              (function (e) {
                if (!i || !e || 'object' != typeof e) return !1;
                try {
                  i.call(e);
                  try {
                    u.call(e);
                  } catch (e) {
                    return !0;
                  }
                  return e instanceof Map;
                } catch (e) {}
                return !1;
              })(t)
            ) {
              var se = [];
              return (
                a.call(t, function (e, n) {
                  se.push(W(n, t, !0) + ' => ' + W(e, t));
                }),
                J('Map', i.call(t), se, L)
              );
            }
            if (
              (function (e) {
                if (!u || !e || 'object' != typeof e) return !1;
                try {
                  u.call(e);
                  try {
                    i.call(e);
                  } catch (e) {
                    return !0;
                  }
                  return e instanceof Set;
                } catch (e) {}
                return !1;
              })(t)
            ) {
              var ce = [];
              return (
                l.call(t, function (e) {
                  ce.push(W(e, t));
                }),
                J('Set', u.call(t), ce, L)
              );
            }
            if (
              (function (e) {
                if (!d || !e || 'object' != typeof e) return !1;
                try {
                  d.call(e, d);
                  try {
                    p.call(e, p);
                  } catch (e) {
                    return !0;
                  }
                  return e instanceof WeakMap;
                } catch (e) {}
                return !1;
              })(t)
            )
              return X('WeakMap');
            if (
              (function (e) {
                if (!p || !e || 'object' != typeof e) return !1;
                try {
                  p.call(e, p);
                  try {
                    d.call(e, d);
                  } catch (e) {
                    return !0;
                  }
                  return e instanceof WeakSet;
                } catch (e) {}
                return !1;
              })(t)
            )
              return X('WeakSet');
            if (
              (function (e) {
                if (!f || !e || 'object' != typeof e) return !1;
                try {
                  return f.call(e), !0;
                } catch (e) {}
                return !1;
              })(t)
            )
              return X('WeakRef');
            if (
              (function (e) {
                return !('[object Number]' !== K(e) || (D && 'object' == typeof e && D in e));
              })(t)
            )
              return Y(W(Number(t)));
            if (
              (function (e) {
                if (!e || 'object' != typeof e || !R) return !1;
                try {
                  return R.call(e), !0;
                } catch (e) {}
                return !1;
              })(t)
            )
              return Y(W(R.call(t)));
            if (
              (function (e) {
                return !('[object Boolean]' !== K(e) || (D && 'object' == typeof e && D in e));
              })(t)
            )
              return Y(h.call(t));
            if (
              (function (e) {
                return !('[object String]' !== K(e) || (D && 'object' == typeof e && D in e));
              })(t)
            )
              return Y(W(String(t)));
            if (
              !(function (e) {
                return !('[object Date]' !== K(e) || (D && 'object' == typeof e && D in e));
              })(t) &&
              !G(t)
            ) {
              var ue = Z(t, W),
                le = A ? A(t) === Object.prototype : t instanceof Object || t.constructor === Object,
                de = t instanceof Object ? '' : 'null prototype',
                pe = !le && D && Object(t) === t && D in t ? g.call(K(t), 8, -1) : de ? 'Object' : '',
                fe =
                  (le || 'function' != typeof t.constructor ? '' : t.constructor.name ? t.constructor.name + ' ' : '') +
                  (pe || de ? '[' + _.call(E.call([], pe || [], de || []), ': ') + '] ' : '');
              return 0 === ue.length ? fe + '{}' : L ? fe + '{' + Q(ue, L) + '}' : fe + '{ ' + _.call(ue, ', ') + ' }';
            }
            return String(t);
          };
          var W =
            Object.prototype.hasOwnProperty ||
            function (e) {
              return e in this;
            };
          function q(e, t) {
            return W.call(e, t);
          }
          function K(e) {
            return v.call(e);
          }
          function V(e, t) {
            if (e.indexOf) return e.indexOf(t);
            for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
            return -1;
          }
          function z(e, t) {
            if (e.length > t.maxStringLength) {
              var n = e.length - t.maxStringLength,
                r = '... ' + n + ' more character' + (n > 1 ? 's' : '');
              return z(g.call(e, 0, t.maxStringLength), t) + r;
            }
            return F(b.call(b.call(e, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, $), 'single', t);
          }
          function $(e) {
            var t = e.charCodeAt(0),
              n = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[t];
            return n ? '\\' + n : '\\x' + (t < 16 ? '0' : '') + S.call(t.toString(16));
          }
          function Y(e) {
            return 'Object(' + e + ')';
          }
          function X(e) {
            return e + ' { ? }';
          }
          function J(e, t, n, r) {
            return e + ' (' + t + ') {' + (r ? Q(n, r) : _.call(n, ', ')) + '}';
          }
          function Q(e, t) {
            if (0 === e.length) return '';
            var n = '\n' + t.prev + t.base;
            return n + _.call(e, ',' + n) + '\n' + t.prev;
          }
          function Z(e, t) {
            var n = U(e),
              r = [];
            if (n) {
              r.length = e.length;
              for (var o = 0; o < e.length; o++) r[o] = q(e, o) ? t(e[o], e) : '';
            }
            var i,
              a = 'function' == typeof x ? x(e) : [];
            if (P) {
              i = {};
              for (var s = 0; s < a.length; s++) i['$' + a[s]] = a[s];
            }
            for (var c in e)
              q(e, c) &&
                ((n && String(Number(c)) === c && c < e.length) ||
                  (P && i['$' + c] instanceof Symbol) ||
                  (w.call(/[^\w$]/, c) ? r.push(t(c, e) + ': ' + t(e[c], e)) : r.push(c + ': ' + t(e[c], e))));
            if ('function' == typeof x)
              for (var u = 0; u < a.length; u++) M.call(e, a[u]) && r.push('[' + t(a[u]) + ']: ' + t(e[a[u]], e));
            return r;
          }
        },
        5798: (e) => {
          'use strict';
          var t = String.prototype.replace,
            n = /%20/g,
            r = 'RFC3986';
          e.exports = {
            default: r,
            formatters: {
              RFC1738: function (e) {
                return t.call(e, n, '+');
              },
              RFC3986: function (e) {
                return String(e);
              },
            },
            RFC1738: 'RFC1738',
            RFC3986: r,
          };
        },
        129: (e, t, n) => {
          'use strict';
          var r = n(8261),
            o = n(5235),
            i = n(5798);
          e.exports = { formats: i, parse: o, stringify: r };
        },
        5235: (e, t, n) => {
          'use strict';
          var r = n(2769),
            o = Object.prototype.hasOwnProperty,
            i = Array.isArray,
            a = {
              allowDots: !1,
              allowPrototypes: !1,
              allowSparse: !1,
              arrayLimit: 20,
              charset: 'utf-8',
              charsetSentinel: !1,
              comma: !1,
              decoder: r.decode,
              delimiter: '&',
              depth: 5,
              ignoreQueryPrefix: !1,
              interpretNumericEntities: !1,
              parameterLimit: 1e3,
              parseArrays: !0,
              plainObjects: !1,
              strictNullHandling: !1,
            },
            s = function (e) {
              return e.replace(/&#(\d+);/g, function (e, t) {
                return String.fromCharCode(parseInt(t, 10));
              });
            },
            c = function (e, t) {
              return e && 'string' == typeof e && t.comma && e.indexOf(',') > -1 ? e.split(',') : e;
            },
            u = function (e, t, n, r) {
              if (e) {
                var i = n.allowDots ? e.replace(/\.([^.[]+)/g, '[$1]') : e,
                  a = /(\[[^[\]]*])/g,
                  s = n.depth > 0 && /(\[[^[\]]*])/.exec(i),
                  u = s ? i.slice(0, s.index) : i,
                  l = [];
                if (u) {
                  if (!n.plainObjects && o.call(Object.prototype, u) && !n.allowPrototypes) return;
                  l.push(u);
                }
                for (var d = 0; n.depth > 0 && null !== (s = a.exec(i)) && d < n.depth; ) {
                  if (((d += 1), !n.plainObjects && o.call(Object.prototype, s[1].slice(1, -1)) && !n.allowPrototypes))
                    return;
                  l.push(s[1]);
                }
                return (
                  s && l.push('[' + i.slice(s.index) + ']'),
                  (function (e, t, n, r) {
                    for (var o = r ? t : c(t, n), i = e.length - 1; i >= 0; --i) {
                      var a,
                        s = e[i];
                      if ('[]' === s && n.parseArrays) a = [].concat(o);
                      else {
                        a = n.plainObjects ? Object.create(null) : {};
                        var u = '[' === s.charAt(0) && ']' === s.charAt(s.length - 1) ? s.slice(1, -1) : s,
                          l = parseInt(u, 10);
                        n.parseArrays || '' !== u
                          ? !isNaN(l) && s !== u && String(l) === u && l >= 0 && n.parseArrays && l <= n.arrayLimit
                            ? ((a = [])[l] = o)
                            : '__proto__' !== u && (a[u] = o)
                          : (a = { 0: o });
                      }
                      o = a;
                    }
                    return o;
                  })(l, t, n, r)
                );
              }
            };
          e.exports = function (e, t) {
            var n = (function (e) {
              if (!e) return a;
              if (null !== e.decoder && void 0 !== e.decoder && 'function' != typeof e.decoder)
                throw new TypeError('Decoder has to be a function.');
              if (void 0 !== e.charset && 'utf-8' !== e.charset && 'iso-8859-1' !== e.charset)
                throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
              var t = void 0 === e.charset ? a.charset : e.charset;
              return {
                allowDots: void 0 === e.allowDots ? a.allowDots : !!e.allowDots,
                allowPrototypes: 'boolean' == typeof e.allowPrototypes ? e.allowPrototypes : a.allowPrototypes,
                allowSparse: 'boolean' == typeof e.allowSparse ? e.allowSparse : a.allowSparse,
                arrayLimit: 'number' == typeof e.arrayLimit ? e.arrayLimit : a.arrayLimit,
                charset: t,
                charsetSentinel: 'boolean' == typeof e.charsetSentinel ? e.charsetSentinel : a.charsetSentinel,
                comma: 'boolean' == typeof e.comma ? e.comma : a.comma,
                decoder: 'function' == typeof e.decoder ? e.decoder : a.decoder,
                delimiter: 'string' == typeof e.delimiter || r.isRegExp(e.delimiter) ? e.delimiter : a.delimiter,
                depth: 'number' == typeof e.depth || !1 === e.depth ? +e.depth : a.depth,
                ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
                interpretNumericEntities:
                  'boolean' == typeof e.interpretNumericEntities
                    ? e.interpretNumericEntities
                    : a.interpretNumericEntities,
                parameterLimit: 'number' == typeof e.parameterLimit ? e.parameterLimit : a.parameterLimit,
                parseArrays: !1 !== e.parseArrays,
                plainObjects: 'boolean' == typeof e.plainObjects ? e.plainObjects : a.plainObjects,
                strictNullHandling:
                  'boolean' == typeof e.strictNullHandling ? e.strictNullHandling : a.strictNullHandling,
              };
            })(t);
            if ('' === e || null == e) return n.plainObjects ? Object.create(null) : {};
            for (
              var l =
                  'string' == typeof e
                    ? (function (e, t) {
                        var n,
                          u = {},
                          l = t.ignoreQueryPrefix ? e.replace(/^\?/, '') : e,
                          d = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit,
                          p = l.split(t.delimiter, d),
                          f = -1,
                          h = t.charset;
                        if (t.charsetSentinel)
                          for (n = 0; n < p.length; ++n)
                            0 === p[n].indexOf('utf8=') &&
                              ('utf8=%E2%9C%93' === p[n]
                                ? (h = 'utf-8')
                                : 'utf8=%26%2310003%3B' === p[n] && (h = 'iso-8859-1'),
                              (f = n),
                              (n = p.length));
                        for (n = 0; n < p.length; ++n)
                          if (n !== f) {
                            var v,
                              m,
                              y = p[n],
                              g = y.indexOf(']='),
                              b = -1 === g ? y.indexOf('=') : g + 1;
                            -1 === b
                              ? ((v = t.decoder(y, a.decoder, h, 'key')), (m = t.strictNullHandling ? null : ''))
                              : ((v = t.decoder(y.slice(0, b), a.decoder, h, 'key')),
                                (m = r.maybeMap(c(y.slice(b + 1), t), function (e) {
                                  return t.decoder(e, a.decoder, h, 'value');
                                }))),
                              m && t.interpretNumericEntities && 'iso-8859-1' === h && (m = s(m)),
                              y.indexOf('[]=') > -1 && (m = i(m) ? [m] : m),
                              o.call(u, v) ? (u[v] = r.combine(u[v], m)) : (u[v] = m);
                          }
                        return u;
                      })(e, n)
                    : e,
                d = n.plainObjects ? Object.create(null) : {},
                p = Object.keys(l),
                f = 0;
              f < p.length;
              ++f
            ) {
              var h = p[f],
                v = u(h, l[h], n, 'string' == typeof e);
              d = r.merge(d, v, n);
            }
            return !0 === n.allowSparse ? d : r.compact(d);
          };
        },
        8261: (e, t, n) => {
          'use strict';
          var r = n(7478),
            o = n(2769),
            i = n(5798),
            a = Object.prototype.hasOwnProperty,
            s = {
              brackets: function (e) {
                return e + '[]';
              },
              comma: 'comma',
              indices: function (e, t) {
                return e + '[' + t + ']';
              },
              repeat: function (e) {
                return e;
              },
            },
            c = Array.isArray,
            u = String.prototype.split,
            l = Array.prototype.push,
            d = function (e, t) {
              l.apply(e, c(t) ? t : [t]);
            },
            p = Date.prototype.toISOString,
            f = i.default,
            h = {
              addQueryPrefix: !1,
              allowDots: !1,
              charset: 'utf-8',
              charsetSentinel: !1,
              delimiter: '&',
              encode: !0,
              encoder: o.encode,
              encodeValuesOnly: !1,
              format: f,
              formatter: i.formatters[f],
              indices: !1,
              serializeDate: function (e) {
                return p.call(e);
              },
              skipNulls: !1,
              strictNullHandling: !1,
            },
            v = {},
            m = function e(t, n, i, a, s, l, p, f, m, y, g, b, S, C, w) {
              for (var E, _ = t, T = w, k = 0, R = !1; void 0 !== (T = T.get(v)) && !R; ) {
                var x = T.get(t);
                if (((k += 1), void 0 !== x)) {
                  if (x === k) throw new RangeError('Cyclic object value');
                  R = !0;
                }
                void 0 === T.get(v) && (k = 0);
              }
              if (
                ('function' == typeof p
                  ? (_ = p(n, _))
                  : _ instanceof Date
                  ? (_ = y(_))
                  : 'comma' === i &&
                    c(_) &&
                    (_ = o.maybeMap(_, function (e) {
                      return e instanceof Date ? y(e) : e;
                    })),
                null === _)
              ) {
                if (a) return l && !S ? l(n, h.encoder, C, 'key', g) : n;
                _ = '';
              }
              if (
                'string' == typeof (E = _) ||
                'number' == typeof E ||
                'boolean' == typeof E ||
                'symbol' == typeof E ||
                'bigint' == typeof E ||
                o.isBuffer(_)
              ) {
                if (l) {
                  var O = S ? n : l(n, h.encoder, C, 'key', g);
                  if ('comma' === i && S) {
                    for (var P = u.call(String(_), ','), D = '', M = 0; M < P.length; ++M)
                      D += (0 === M ? '' : ',') + b(l(P[M], h.encoder, C, 'value', g));
                    return [b(O) + '=' + D];
                  }
                  return [b(O) + '=' + b(l(_, h.encoder, C, 'value', g))];
                }
                return [b(n) + '=' + b(String(_))];
              }
              var A,
                I = [];
              if (void 0 === _) return I;
              if ('comma' === i && c(_)) A = [{ value: _.length > 0 ? _.join(',') || null : void 0 }];
              else if (c(p)) A = p;
              else {
                var j = Object.keys(_);
                A = f ? j.sort(f) : j;
              }
              for (var L = 0; L < A.length; ++L) {
                var N = A[L],
                  F = 'object' == typeof N && void 0 !== N.value ? N.value : _[N];
                if (!s || null !== F) {
                  var B = c(_) ? ('function' == typeof i ? i(n, N) : n) : n + (m ? '.' + N : '[' + N + ']');
                  w.set(t, k);
                  var U = r();
                  U.set(v, w), d(I, e(F, B, i, a, s, l, p, f, m, y, g, b, S, C, U));
                }
              }
              return I;
            };
          e.exports = function (e, t) {
            var n,
              o = e,
              u = (function (e) {
                if (!e) return h;
                if (null !== e.encoder && void 0 !== e.encoder && 'function' != typeof e.encoder)
                  throw new TypeError('Encoder has to be a function.');
                var t = e.charset || h.charset;
                if (void 0 !== e.charset && 'utf-8' !== e.charset && 'iso-8859-1' !== e.charset)
                  throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
                var n = i.default;
                if (void 0 !== e.format) {
                  if (!a.call(i.formatters, e.format)) throw new TypeError('Unknown format option provided.');
                  n = e.format;
                }
                var r = i.formatters[n],
                  o = h.filter;
                return (
                  ('function' == typeof e.filter || c(e.filter)) && (o = e.filter),
                  {
                    addQueryPrefix: 'boolean' == typeof e.addQueryPrefix ? e.addQueryPrefix : h.addQueryPrefix,
                    allowDots: void 0 === e.allowDots ? h.allowDots : !!e.allowDots,
                    charset: t,
                    charsetSentinel: 'boolean' == typeof e.charsetSentinel ? e.charsetSentinel : h.charsetSentinel,
                    delimiter: void 0 === e.delimiter ? h.delimiter : e.delimiter,
                    encode: 'boolean' == typeof e.encode ? e.encode : h.encode,
                    encoder: 'function' == typeof e.encoder ? e.encoder : h.encoder,
                    encodeValuesOnly: 'boolean' == typeof e.encodeValuesOnly ? e.encodeValuesOnly : h.encodeValuesOnly,
                    filter: o,
                    format: n,
                    formatter: r,
                    serializeDate: 'function' == typeof e.serializeDate ? e.serializeDate : h.serializeDate,
                    skipNulls: 'boolean' == typeof e.skipNulls ? e.skipNulls : h.skipNulls,
                    sort: 'function' == typeof e.sort ? e.sort : null,
                    strictNullHandling:
                      'boolean' == typeof e.strictNullHandling ? e.strictNullHandling : h.strictNullHandling,
                  }
                );
              })(t);
            'function' == typeof u.filter ? (o = (0, u.filter)('', o)) : c(u.filter) && (n = u.filter);
            var l,
              p = [];
            if ('object' != typeof o || null === o) return '';
            l =
              t && t.arrayFormat in s
                ? t.arrayFormat
                : t && 'indices' in t
                ? t.indices
                  ? 'indices'
                  : 'repeat'
                : 'indices';
            var f = s[l];
            n || (n = Object.keys(o)), u.sort && n.sort(u.sort);
            for (var v = r(), y = 0; y < n.length; ++y) {
              var g = n[y];
              (u.skipNulls && null === o[g]) ||
                d(
                  p,
                  m(
                    o[g],
                    g,
                    f,
                    u.strictNullHandling,
                    u.skipNulls,
                    u.encode ? u.encoder : null,
                    u.filter,
                    u.sort,
                    u.allowDots,
                    u.serializeDate,
                    u.format,
                    u.formatter,
                    u.encodeValuesOnly,
                    u.charset,
                    v,
                  ),
                );
            }
            var b = p.join(u.delimiter),
              S = !0 === u.addQueryPrefix ? '?' : '';
            return (
              u.charsetSentinel &&
                ('iso-8859-1' === u.charset ? (S += 'utf8=%26%2310003%3B&') : (S += 'utf8=%E2%9C%93&')),
              b.length > 0 ? S + b : ''
            );
          };
        },
        2769: (e, t, n) => {
          'use strict';
          var r = n(5798),
            o = Object.prototype.hasOwnProperty,
            i = Array.isArray,
            a = (function () {
              for (var e = [], t = 0; t < 256; ++t) e.push('%' + ((t < 16 ? '0' : '') + t.toString(16)).toUpperCase());
              return e;
            })(),
            s = function (e, t) {
              for (var n = t && t.plainObjects ? Object.create(null) : {}, r = 0; r < e.length; ++r)
                void 0 !== e[r] && (n[r] = e[r]);
              return n;
            };
          e.exports = {
            arrayToObject: s,
            assign: function (e, t) {
              return Object.keys(t).reduce(function (e, n) {
                return (e[n] = t[n]), e;
              }, e);
            },
            combine: function (e, t) {
              return [].concat(e, t);
            },
            compact: function (e) {
              for (var t = [{ obj: { o: e }, prop: 'o' }], n = [], r = 0; r < t.length; ++r)
                for (var o = t[r], a = o.obj[o.prop], s = Object.keys(a), c = 0; c < s.length; ++c) {
                  var u = s[c],
                    l = a[u];
                  'object' == typeof l && null !== l && -1 === n.indexOf(l) && (t.push({ obj: a, prop: u }), n.push(l));
                }
              return (
                (function (e) {
                  for (; e.length > 1; ) {
                    var t = e.pop(),
                      n = t.obj[t.prop];
                    if (i(n)) {
                      for (var r = [], o = 0; o < n.length; ++o) void 0 !== n[o] && r.push(n[o]);
                      t.obj[t.prop] = r;
                    }
                  }
                })(t),
                e
              );
            },
            decode: function (e, t, n) {
              var r = e.replace(/\+/g, ' ');
              if ('iso-8859-1' === n) return r.replace(/%[0-9a-f]{2}/gi, unescape);
              try {
                return decodeURIComponent(r);
              } catch (e) {
                return r;
              }
            },
            encode: function (e, t, n, o, i) {
              if (0 === e.length) return e;
              var s = e;
              if (
                ('symbol' == typeof e
                  ? (s = Symbol.prototype.toString.call(e))
                  : 'string' != typeof e && (s = String(e)),
                'iso-8859-1' === n)
              )
                return escape(s).replace(/%u[0-9a-f]{4}/gi, function (e) {
                  return '%26%23' + parseInt(e.slice(2), 16) + '%3B';
                });
              for (var c = '', u = 0; u < s.length; ++u) {
                var l = s.charCodeAt(u);
                45 === l ||
                46 === l ||
                95 === l ||
                126 === l ||
                (l >= 48 && l <= 57) ||
                (l >= 65 && l <= 90) ||
                (l >= 97 && l <= 122) ||
                (i === r.RFC1738 && (40 === l || 41 === l))
                  ? (c += s.charAt(u))
                  : l < 128
                  ? (c += a[l])
                  : l < 2048
                  ? (c += a[192 | (l >> 6)] + a[128 | (63 & l)])
                  : l < 55296 || l >= 57344
                  ? (c += a[224 | (l >> 12)] + a[128 | ((l >> 6) & 63)] + a[128 | (63 & l)])
                  : ((u += 1),
                    (l = 65536 + (((1023 & l) << 10) | (1023 & s.charCodeAt(u)))),
                    (c +=
                      a[240 | (l >> 18)] + a[128 | ((l >> 12) & 63)] + a[128 | ((l >> 6) & 63)] + a[128 | (63 & l)]));
              }
              return c;
            },
            isBuffer: function (e) {
              return !(
                !e ||
                'object' != typeof e ||
                !(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e))
              );
            },
            isRegExp: function (e) {
              return '[object RegExp]' === Object.prototype.toString.call(e);
            },
            maybeMap: function (e, t) {
              if (i(e)) {
                for (var n = [], r = 0; r < e.length; r += 1) n.push(t(e[r]));
                return n;
              }
              return t(e);
            },
            merge: function e(t, n, r) {
              if (!n) return t;
              if ('object' != typeof n) {
                if (i(t)) t.push(n);
                else {
                  if (!t || 'object' != typeof t) return [t, n];
                  ((r && (r.plainObjects || r.allowPrototypes)) || !o.call(Object.prototype, n)) && (t[n] = !0);
                }
                return t;
              }
              if (!t || 'object' != typeof t) return [t].concat(n);
              var a = t;
              return (
                i(t) && !i(n) && (a = s(t, r)),
                i(t) && i(n)
                  ? (n.forEach(function (n, i) {
                      if (o.call(t, i)) {
                        var a = t[i];
                        a && 'object' == typeof a && n && 'object' == typeof n ? (t[i] = e(a, n, r)) : t.push(n);
                      } else t[i] = n;
                    }),
                    t)
                  : Object.keys(n).reduce(function (t, i) {
                      var a = n[i];
                      return o.call(t, i) ? (t[i] = e(t[i], a, r)) : (t[i] = a), t;
                    }, a)
              );
            },
          };
        },
        7478: (e, t, n) => {
          'use strict';
          var r = n(210),
            o = n(1924),
            i = n(631),
            a = r('%TypeError%'),
            s = r('%WeakMap%', !0),
            c = r('%Map%', !0),
            u = o('WeakMap.prototype.get', !0),
            l = o('WeakMap.prototype.set', !0),
            d = o('WeakMap.prototype.has', !0),
            p = o('Map.prototype.get', !0),
            f = o('Map.prototype.set', !0),
            h = o('Map.prototype.has', !0),
            v = function (e, t) {
              for (var n, r = e; null !== (n = r.next); r = n)
                if (n.key === t) return (r.next = n.next), (n.next = e.next), (e.next = n), n;
            };
          e.exports = function () {
            var e,
              t,
              n,
              r = {
                assert: function (e) {
                  if (!r.has(e)) throw new a('Side channel does not contain ' + i(e));
                },
                get: function (r) {
                  if (s && r && ('object' == typeof r || 'function' == typeof r)) {
                    if (e) return u(e, r);
                  } else if (c) {
                    if (t) return p(t, r);
                  } else if (n)
                    return (function (e, t) {
                      var n = v(e, t);
                      return n && n.value;
                    })(n, r);
                },
                has: function (r) {
                  if (s && r && ('object' == typeof r || 'function' == typeof r)) {
                    if (e) return d(e, r);
                  } else if (c) {
                    if (t) return h(t, r);
                  } else if (n)
                    return (function (e, t) {
                      return !!v(e, t);
                    })(n, r);
                  return !1;
                },
                set: function (r, o) {
                  s && r && ('object' == typeof r || 'function' == typeof r)
                    ? (e || (e = new s()), l(e, r, o))
                    : c
                    ? (t || (t = new c()), f(t, r, o))
                    : (n || (n = { key: {}, next: null }),
                      (function (e, t, n) {
                        var r = v(e, t);
                        r ? (r.value = n) : (e.next = { key: t, next: e.next, value: n });
                      })(n, r, o));
                },
              };
            return r;
          };
        },
        8203: (e, t, n) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 });
          var r = n(5809).IZ,
            o = (function () {
              function e(e) {
                this.initOptions = e;
              }
              return (
                (e.prototype.getRoleList = function () {
                  var e,
                    t,
                    n,
                    o = {
                      uuid: null === (e = this.initOptions) || void 0 === e ? void 0 : e.uuid,
                      ticket: null === (t = this.initOptions) || void 0 === t ? void 0 : t.token,
                      stationid: null === (n = this.initOptions) || void 0 === n ? void 0 : n.stationId,
                    };
                  r(o).then(function (e) {
                    console.log(e);
                  });
                }),
                e
              );
            })();
          t.default = o;
        },
        3607: function (e, t, n) {
          'use strict';
          var r =
              (this && this.__awaiter) ||
              function (e, t, n, r) {
                return new (n || (n = Promise))(function (o, i) {
                  function a(e) {
                    try {
                      c(r.next(e));
                    } catch (e) {
                      i(e);
                    }
                  }
                  function s(e) {
                    try {
                      c(r.throw(e));
                    } catch (e) {
                      i(e);
                    }
                  }
                  function c(e) {
                    var t;
                    e.done
                      ? o(e.value)
                      : ((t = e.value),
                        t instanceof n
                          ? t
                          : new n(function (e) {
                              e(t);
                            })).then(a, s);
                  }
                  c((r = r.apply(e, t || [])).next());
                });
              },
            o =
              (this && this.__generator) ||
              function (e, t) {
                var n,
                  r,
                  o,
                  i,
                  a = {
                    label: 0,
                    sent: function () {
                      if (1 & o[0]) throw o[1];
                      return o[1];
                    },
                    trys: [],
                    ops: [],
                  };
                return (
                  (i = { next: s(0), throw: s(1), return: s(2) }),
                  'function' == typeof Symbol &&
                    (i[Symbol.iterator] = function () {
                      return this;
                    }),
                  i
                );
                function s(i) {
                  return function (s) {
                    return (function (i) {
                      if (n) throw new TypeError('Generator is already executing.');
                      for (; a; )
                        try {
                          if (
                            ((n = 1),
                            r &&
                              (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                              !(o = o.call(r, i[1])).done)
                          )
                            return o;
                          switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                            case 0:
                            case 1:
                              o = i;
                              break;
                            case 4:
                              return a.label++, { value: i[1], done: !1 };
                            case 5:
                              a.label++, (r = i[1]), (i = [0]);
                              continue;
                            case 7:
                              (i = a.ops.pop()), a.trys.pop();
                              continue;
                            default:
                              if (!((o = (o = a.trys).length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))) {
                                a = 0;
                                continue;
                              }
                              if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                                a.label = i[1];
                                break;
                              }
                              if (6 === i[0] && a.label < o[1]) {
                                (a.label = o[1]), (o = i);
                                break;
                              }
                              if (o && a.label < o[2]) {
                                (a.label = o[2]), a.ops.push(i);
                                break;
                              }
                              o[2] && a.ops.pop(), a.trys.pop();
                              continue;
                          }
                          i = t.call(e, a);
                        } catch (e) {
                          (i = [6, e]), (r = 0);
                        } finally {
                          n = o = 0;
                        }
                      if (5 & i[0]) throw i[1];
                      return { value: i[0] ? i[1] : void 0, done: !0 };
                    })([i, s]);
                  };
                }
              };
          Object.defineProperty(t, '__esModule', { value: !0 });
          var i = n(2297),
            a = n(646),
            s = n(8203),
            c = n(1605),
            u = c.matching,
            l = c.join,
            d = (function () {
              function e() {}
              return (
                (e.prototype.init = function (e) {
                  a.set('cross_sdk_token', e.token),
                    a.set('cross_sdk_uuid', e.uuid),
                    a.set('cross_sdk_station_id', String(e.stationId)),
                    (this.initOptions = e),
                    (this.Api = new s.default(this.initOptions));
                }),
                (e.prototype.load = function (e) {
                  var t,
                    n,
                    r,
                    o = this;
                  console.log('init'),
                    u({
                      authorid: null === (t = this.initOptions) || void 0 === t ? void 0 : t.stationId,
                      uuid: null === (n = this.initOptions) || void 0 === n ? void 0 : n.uuid,
                      ticket: null === (r = this.initOptions) || void 0 === r ? void 0 : r.token,
                    }).then(function (e) {
                      if ((console.log(e), 200 === e.code && e.data)) {
                        var t = e.data,
                          n = t.dsRoomDTO,
                          r = n.dsIp,
                          i = n.dsPort,
                          a = (t.audioRoomDTO, { role: 1, ip: r, port: i });
                        o.initGame(a);
                      }
                    });
                }),
                (e.prototype.initGame = function (e) {
                  var t = this;
                  i.default.init({
                    mount: 'station',
                    appid: 1259104334,
                    showLoading: !1,
                    loadingText: '',
                    autoRotateMountPoint: !0,
                    mic: !1,
                    cursorMode: 0,
                    reconnect: !0,
                    debugSetting: { showLog: !1, showStats: !1, showSendHbData: !1, showOnHbMessage: !1 },
                    onConnectSuccess: function (e) {
                      return r(t, void 0, void 0, function () {
                        return o(this, function (t) {
                          return (
                            console.log('onConnectSuccess', e),
                            i.default.setStreamProfile({ fps: 60, max_bitrate: 12, min_bitrate: 8 }),
                            i.default.setMouseCanLock(!1),
                            i.default.setMoveSensitivity(2),
                            [2]
                          );
                        });
                      });
                    },
                    onNetworkChange: function (e) {
                      console.log('onNetworkChange', e);
                    },
                    onDisconnect: function (e) {
                      console.log('onDisconnect', e);
                    },
                    onWebrtcStatusChange: function (e) {
                      console.log('onWebrtcStatusChange', e);
                    },
                    onInitSuccess: function (n) {
                      return r(t, void 0, void 0, function () {
                        return o(this, function (t) {
                          switch (t.label) {
                            case 0:
                              return console.log('%c onInitSuccess', 'color: red', n), [4, this.startGame(e)];
                            case 1:
                              return t.sent(), [2];
                          }
                        });
                      });
                    },
                  });
                }),
                (e.prototype.startGame = function (e) {
                  var t, n, r, o, a, s;
                  console.log('startGame', e),
                    l(
                      {
                        uuid: null === (t = this.initOptions) || void 0 === t ? void 0 : t.uuid,
                        ticket: null === (n = this.initOptions) || void 0 === n ? void 0 : n.token,
                        authorid: null === (r = this.initOptions) || void 0 === r ? void 0 : r.stationId,
                        clientSession: i.default.getClientSession(),
                        screenWidth: 1920,
                        screenHeight: 1080,
                        gameParams: '-type='
                          .concat(null == e ? void 0 : e.role, ' -IP=')
                          .concat(null == e ? void 0 : e.ip, ' -port=')
                          .concat(null == e ? void 0 : e.port, ' -hasClient=true -ResX=')
                          .concat(1920, ' -ResY=')
                          .concat(1080),
                        gameContext: '',
                      },
                      {
                        uuid: null === (o = this.initOptions) || void 0 === o ? void 0 : o.uuid,
                        ticket: null === (a = this.initOptions) || void 0 === a ? void 0 : a.token,
                        authorid: null === (s = this.initOptions) || void 0 === s ? void 0 : s.stationId,
                      },
                    ).then(function (e) {
                      console.log(e);
                      var t = e.code,
                        n = e.data;
                      e.message,
                        console.log('%c StartGame res', 'color: blue; font-size: 14px', n),
                        200 === t && n ? i.default.start(n.serverSession) : i.default.destroy();
                    });
                }),
                e
              );
            })();
          t.default = d;
        },
        4654: () => {},
      },
      t = {};
    function n(r) {
      var o = t[r];
      if (void 0 !== o) return o.exports;
      var i = (t[r] = { id: r, loaded: !1, exports: {} });
      return e[r].call(i.exports, i, i.exports, n), (i.loaded = !0), i.exports;
    }
    (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
    }),
      (n.d = (e, t) => {
        for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
      }),
      (n.g = (function () {
        if ('object' == typeof globalThis) return globalThis;
        try {
          return this || new Function('return this')();
        } catch (e) {
          if ('object' == typeof window) return window;
        }
      })()),
      (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (n.r = (e) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (n.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e));
    var r = n(3607);
    return r.default;
  })(),
);
