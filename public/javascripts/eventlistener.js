!function() {
    var e = function(e) {
        var t = {
            exports: {}
        };
        return e.call(t.exports, t, t.exports),
        t.exports
    }
      , t = (window,
    function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n),
            r && e(t, r),
            t
        }
    }())
      , n = function(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    };
    e(function(e, r) {
        "use strict";
        function o(e) {
            for (var t = e.split("&"), n = 0; n < t.length; n++) {
                var r = t[n].split("=");
                if ("quantity" === r[0])
                    return r[1]
            }
            return 1
        }
        function i(e, t) {
            window.ShopifyAnalytics.lib.track("Added Product", s({
                variantId: e.id,
                productId: e.product_id,
                currency: window.ShopifyAnalytics.meta.currency,
                quantity: t,
                price: e.price / 100,
                name: e.title,
                sku: e.sku,
                brand: e.vendor,
                variant: e.variant_title,
                category: e.product_type
            }, a()))
        }
        function a() {
            var e = {};
            return window.ShopifyAnalytics.meta.page && (e = {
                pageType: window.ShopifyAnalytics.meta.page.pageType,
                resourceType: window.ShopifyAnalytics.meta.page.resourceType,
                resourceId: window.ShopifyAnalytics.meta.page.resourceId
            }),
            e
        }
        function s(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n]);
            return e
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
        var u = function() {
            function e(t, r, o, i) {
                n(this, e),
                this.xhr = t,
                this.url = r,
                this.method = o,
                this.body = i
            }
            return t(e, null, [{
                key: "handleXhrOpen",
                value: function() {}
            }]),
            t(e, [{
                key: "onReadyStateChange",
                value: function() {
                    this.xhr.readyState === XMLHttpRequest.DONE && this.handleXhrDone({
                        method: this.method,
                        url: this.url,
                        body: this.body,
                        xhr: this.xhr
                    }),
                    this.oldOnReadyStateChange && this.oldOnReadyStateChange()
                }
            }, {
                key: "handleXhrDone",
                value: function(e) {
                    try {
                        switch (e.url) {
                        case "/cart/add.js":
                            e.xhr.responseText && i(JSON.parse(e.xhr.responseText), o(e.body));
                            break;
                        case "/cart/change.js":
                        case "/cart/clear.js":
                        case "/cart.js":
                            e.xhr.responseText && this.facebookMessengerPayment(JSON.parse(e.xhr.responseText))
                        }
                    } catch (t) {
                        console && console.warn && console.warn("[shop_events_listener] Error in handleXhrDone:  " + t.message)
                    }
                }
            }, {
                key: "facebookMessengerPayment",
                value: function(e) {
                    window.MessengerExtensions && window.MessengerExtensions.isInExtension() && window.MessengerExtensions.updateCart(function() {}, function() {}, e.item_count, "https://" + this._hostName() + "/cart", 300)
                }
            }, {
                key: "_hostName",
                value: function() {
                    return window.location.hostname
                }
            }]),
            e
        }();
        r["default"] = u,
        function() {
            function e(e, t, n) {
                window.jQuery && window.jQuery(e).bind ? window.jQuery(e).bind(t, n) : e.addEventListener ? e.addEventListener(t, n) : e.attachEvent && e.attachEvent("on" + t, n)
            }
            function t(e) {
                if (e = e || window.event,
                !(e.defaultPrevented || e.isDefaultPrevented && e.isDefaultPrevented())) {
                    var t = e.target || e.srcElement;
                    if (t && (t.getAttribute("action") || t.getAttribute("href")))
                        try {
                            var n = void 0;
                            n = t.id.options ? t.id.options[t.id.selectedIndex] : t.id;
                            var r = n.value
                              , o = i(r);
                            o.quantity = t.quantity ? t.quantity.value : 1,
                            window.ShopifyAnalytics.lib.track("Added Product", o)
                        } catch (a) {
                            console && console.warn && console.warn("[shop_events_listener] Error in handleSubmitCartAdd: " + a.message)
                        }
                }
            }
            function n(e) {
                e = e || window.event;
                var t = e.target || e.srcElement;
                if (t && t.getAttribute("action"))
                    try {
                        window.ShopifyAnalytics.lib.track("Added Payment", {
                            currency: window.ShopifyAnalytics.meta.currency
                        })
                    } catch (n) {
                        console && console.warn && console.warn("[shop_events_listener] Error in handleSubmitToPaymentAdd: " + n.message)
                    }
            }
            function r(e) {
                e = e || window.event,
                o(e.currentTarget)
            }
            function o(e) {
                try {
                    var t = void 0;
                    if (t = e.id.options && e.id.options[e.id.selectedIndex] ? e.id.options[e.id.selectedIndex] : e.id,
                    !t)
                        return;
                    var n = t.value;
                    if (window.ShopifyAnalytics.meta.selectedVariantId && window.ShopifyAnalytics.meta.selectedVariantId == n)
                        return;
                    window.ShopifyAnalytics.meta.selectedVariantId = n;
                    var r = i(n);
                    window.ShopifyAnalytics.lib.track("Viewed Product Variant", r)
                } catch (o) {
                    console && console.warn && console.warn("[shop_events_listener] Error in trackViewedProductVariant: " + o.message)
                }
            }
            function i(e) {
                var t = u(e)
                  , n = a()
                  , r = s(t, n);
                return r.currency = window.ShopifyAnalytics.meta.currency,
                r
            }
            function u(e) {
                var t = void 0
                  , n = window.ShopifyAnalytics.meta.product;
                if (n) {
                    t = {
                        productId: n.id,
                        brand: n.vendor,
                        category: n.type
                    };
                    for (var r = 0; r < n.variants.length; r++)
                        if (n.variants[r].id == e) {
                            var o = n.variants[r];
                            t = s(t, {
                                variantId: e,
                                price: o.price / 100,
                                name: o.name,
                                sku: o.sku,
                                variant: o.public_title
                            })
                        }
                } else
                    t = {
                        variantId: e
                    };
                return t
            }
            e(window, "load", function() {
                for (var i = 0; i < document.forms.length; i++) {
                    var a = document.forms[i].getAttribute("action");
                    a && a.indexOf("/cart/add") >= 0 && (e(document.forms[i], "submit", t),
                    e(document.forms[i], "change", r),
                    o(document.forms[i]));
                    var s = document.forms[i].elements.previous_step;
                    s && "payment_method" === s.value && e(document.forms[i], "submit", n)
                }
            })
        }(),
        function(e) {
            var t = e.prototype.open
              , n = e.prototype.send;
            e.prototype.open = function(e, n) {
                this._url = n,
                this._method = e,
                u.handleXhrOpen(),
                t.apply(this, arguments)
            }
            ,
            e.prototype.send = function(e) {
                var t = new u(this,this._url,this._method,e);
                this.addEventListener ? this.addEventListener("readystatechange", t.onReadyStateChange.bind(t), !1) : (t.oldOnReadyStateChange = this.onreadystatechange,
                this.onreadystatechange = t.onReadyStateChange),
                n.call(this, e)
            }
        }(XMLHttpRequest)
    })
}();
