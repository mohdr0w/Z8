(function () {
    "use strict";

    var state = {
        groupedItems: {
            indexOfFirstVisible: 0
        }
    };

    WinJS.Namespace.define("Application", {
        state: state
    });
})();