var obs = (function () {

    var _ = {};

    _.Observable = function () {
        var self = this;

        self.data = [];
        var temp = JSON.parse(localStorage.getItem('todos'));
        if (temp) {
            self.data = temp;
        }

        self.add = function (e) {
            self.data.push(e);
            self.notifyObservers();
            return self.data.length;
        };
        self.concat = function (arr) {
            self.data.concat(arr);
            self.notifyObservers();
            return self.data.length;
        };
        self.removeAt = function (iIndex) {
            var vItem = self.data[iIndex];
            if (vItem) {
                self.data.splice(iIndex, 1);
            }
            self.notifyObservers();
            return self.data.length;
        };
        self.filter = function (p, set) {
            var filtered = [];
            for (var i = 0, l = self.data.length; i < l; i++) {
                if (p(self.data[i])) {
                    filtered.push(self.data[i]);
                }
            }

            if (set) {
                self.data = filtered;
                self.notifyObservers();
            }
            else {
                self.notifyObservers(filtered);
            }
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

        localStorage.setItem('todos', JSON.stringify(this.data));

        for (i = 0; i < len; i++) {
            var observer = this._observers[i];
            observer.update(data || this.data);
        }
    };

    return _;
})();