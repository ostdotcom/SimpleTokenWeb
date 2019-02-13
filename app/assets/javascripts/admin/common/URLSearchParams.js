(function (scope) {

    scope.URLSearchParams = scope.URLSearchParams  ||  function (searchString) {
        var self = this;
        self.searchString = searchString;
        self.get = function (name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(self.searchString);
            if (results == null) {
                return null;
            }
            else {
                return decodeURIComponent(results[1]) || 0;
            }
        };
    }

})(window);
