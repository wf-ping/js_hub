(function() {
    function k(a, b, c) {
        if (a.addEventListener) a.addEventListener(b, c, false);
        else if (a.attachEvent) a.attachEvent("on" + b, c);
    }

    function g(a) {
        if (typeof window.onload != "function") window.onload = a;
        else {
            var b = window.onload;
            window.onload = function() {
                b();
                a()
            }
        }
    }

    function h() {
        var a = {};
        for (type in {
            Top: "",
            Left: ""
        }) {
            var b = type == "Top" ? "Y" : "X";
            if (typeof window["page" + b + "Offset"] != "undefined")
                a[type.toLowerCase()] = window["page" + b + "Offset"];
            else {
                b = document.documentElement.clientHeight ? document.documentElement : document.body;
                a[type.toLowerCase()] = b["scroll" + type];
            }
        }
        return a;
    }

    function l() {
        var a = document.body,
            b;
        if (window.innerHeight) b = window.innerHeight;
        else if (a.parentElement.clientHeight) b = a.parentElement.clientHeight;
        else if (a && a.clientHeight) b = a.clientHeight;
        return b;
    }

    function i(a) {
        this.parent = document.body;
        this.createEl(this.parent, a);
        this.size = Math.random() * 10 + 15;
        this.el.style.width = Math.round(this.size) + "px";
        this.el.style.height = Math.round(this.size) + "px";
        this.maxLeft = document.body.offsetWidth - this.size;
        this.maxTop = document.body.offsetHeight - this.size;
        this.left = Math.random() * this.maxLeft;
        this.top = h().top + 1;
        this.angle = 1.4 + 0.2 * Math.random();
        this.minAngle = 1.4;
        this.maxAngle = 1.6;
        this.angleDelta = 0.01 * Math.random();
        this.speed = 2 + Math.random();
    }

    var j = false;
    g(function() {
        j = true;
    });

    var f = true;

    window.createSnow = function(a, b) {
        // 开
        f = true 
        j = true
        // 如果雪花数组不存在，重新创建雪花数组
        if (!window.snowFlakes) {
            window.snowFlakes = [];
        }
        if (j) {
            var c = [],
                m = setInterval(function() {
                    if (f && b > c.length && Math.random() < b * 0.0025) {
                        c.push(new i(a));
                    }
                    if (!f && !c.length) {
                        clearInterval(m);
                    }
                    for (var e = h().top, n = l(), d = c.length - 1; d >= 0; d--) {
                        if (c[d]) {
                            if (c[d].top < e || c[d].top + c[d].size + 1 > e + n) {
                                c[d].remove();
                                c.splice(d, 1);
                            } else {
                                c[d].move();
                                c[d].draw();
                            }
                        }
                    }
                }, 40);

            k(window, "scroll", function() {
                for (var e = c.length - 1; e >= 0; e--) {
                    c[e].draw();
                }
            });

            // 将雪花数组保存到window对象上，并保存定时器ID
            window.snowFlakes = c;
            window.snowInterval = m;
        } else {
            g(function() {
                createSnow(a, b);
            });
        }
    };

    window.removeSnow = function() {
        f = false; // 停止生成新的雪花

        var c = window.snowFlakes;
        if (c) {
            while (c.length) {
                c.pop().remove();
            }
        }

        // 清除定时器
        if (window.snowInterval) {
            clearInterval(window.snowInterval);
        }

        delete window.snowFlakes; // 删除雪花数组
        delete window.snowInterval; // 删除定时器ID
    };


    i.prototype = {
        createEl: function(a, b) {
            this.el = document.createElement("img");
            this.el.setAttribute("src", b + "https://api.dujin.org/js/xiaxue/" + Math.floor(Math.random() * 4) + ".gif");
            this.el.style.position = "absolute";
            this.el.style.display = "block";
            this.el.style.zIndex = "99999";
            a.appendChild(this.el);
        },
        move: function() {
            if (this.angle < this.minAngle || this.angle > this.maxAngle) {
                this.angleDelta = -this.angleDelta;
            }
            this.angle += this.angleDelta;
            this.left += this.speed * Math.cos(this.angle * Math.PI);
            this.top -= this.speed * Math.sin(this.angle * Math.PI);
            if (this.left < 0) this.left = this.maxLeft;
            else if (this.left > this.maxLeft) this.left = 0;
        },
        draw: function() {
            this.el.style.top = Math.round(this.top) + "px";
            this.el.style.left = Math.round(this.left) + "px";
        },
        remove: function() {
            this.parent.removeChild(this.el);
            this.parent = this.el = null;
        }
    };
})();
