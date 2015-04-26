var obs = (function () {

    var _ = {};

    _.Observable = function () {
        var self = this;

        self.data = [];
        self._original = self.data.slice(0);
        self.data.push = function () {
            for (var i = 0, l = arguments.length; i < l; i++) {
                this[this.length] = arguments[i];
                self.setChanged();
            }
            return this.length;
        };
        self.data.removeAt = function (iIndex) {
            var vItem = this[iIndex];
            if (vItem) {
                this.splice(iIndex, 1);
            }
            self.setChanged();
            return this.length;
        };
        self.setData = function (data) {
            self.data = data;
            self.setChanged();
        };
        self.revertOriginal = function () {
            self.data = self._original.slice(0);
            self.setChanged();
        };
        self._observers = [];
        self._changed = false;
    };

    _.Observable.prototype.addObserver = function (observer) {
        this._observers.push(observer);
    };

    _.Observable.prototype.clearChanged = function () {
        this._changed = false;
    };

    _.Observable.prototype.hasChanged = function () {
        return this._changed;
    };

    _.Observable.prototype.notifyObservers = function (arg) {
        if (this.hasChanged()) {
            var i, len = this._observers.length;

            for (i = 0; i < len; i++) {
                var observer = this._observers[i];
                observer.update(this, arg);
            }
            this.clearChanged();
        }
    };

    _.Observable.prototype.setChanged = function (obj) {
        this._changed = true;
        this.notifyObservers(obj);
    };

    return _;

})();