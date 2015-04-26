var obs = (function () {

    var _ = {};

    _.Observable = function () {
        var self = this;

        self.data = [];
        self.data.push = function () {
            for (var i = 0, l = arguments.length; i < l; i++) {
                this[this.length] = arguments[i];
                self.notifyObservers();
            }
            return this.length;
        };
        self.data.removeAt = function (iIndex) {
            var vItem = this[iIndex];
            if (vItem) {
                this.splice(iIndex, 1);
            }
            self.notifyObservers();
            return this.length;
        };
        self.filter = function (p) {
            var filtered = [];
            for (var i = 0, l = self.data.length; i < l; i++) {
                if (p(self.data[i])) {
                    filtered.push(self.data[i]);
                }
            }
            self.notifyObservers(filtered);
        };
        self.setData = function (data) {
            self.data = data;
            self.notifyObservers();
        };
        self.refresh = function () {
            self.notifyObservers();
        };
        self._observers = [];
        self._changed = false;
    };

    _.Observable.prototype.addObserver = function (observer) {
        this._observers.push(observer);
    };

    _.Observable.prototype.notifyObservers = function (data) {
        var i, len = this._observers.length;

        for (i = 0; i < len; i++) {
            var observer = this._observers[i];
            observer.update(data || this.data);
        }
    };

    return _;
})();