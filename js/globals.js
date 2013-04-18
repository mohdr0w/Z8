(function () {
    "use strict";

    var scrollState = {
        groupedItems: {
            indexOfFirstVisible: 0
        }
    };   

    WinJS.Namespace.define("Global", {
        titlesAreOn: true,
        titleToggle: titleToggle,
        scrollState: scrollState
    });   
})();

function titleToggle() {
    var titles = document.getElementsByClassName("item-overlay");
    for (var i = 0; i < titles.length; i++) {
        if (Global.titlesAreOn) {
            titles[i].style.display = "none";
        }
        else {
            titles[i].style.display = "";
        }
    }
    Global.titlesAreOn = !Global.titlesAreOn;

};




