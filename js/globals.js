(function () {
    "use strict";

    var scrollState = {
        groupedItems: {
            indexOfFirstVisible: 0
        }
    };   

    WinJS.Namespace.define("Global", {
        titlesAreOn: true,
        fontSizeIndex: 0,
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

function showFontMenu() {
    showFlyout(fontFlyout, fontSize, "top");
}

function showFlyout(flyout, anchor, placement) {
    flyout.winControl.show(anchor, placement);
}

function hideFlyout(flyout) {
    flyout.winControl.hide();
}

function refresh() {
    //refreshing done later xD
};

function increaseFontSize() {
    var article = document.getElementById("testFontSize");

    if (Global.fontSizeIndex == -2) {
        article.style.fontSize = "13px";
        Global.fontSizeIndex++;
    } else if (Global.fontSizeIndex == -1) {
        article.style.fontSize = "15px";
        Global.fontSizeIndex++;
    } else if (Global.fontSizeIndex == 0) {
        article.style.fontSize = "17px";
        Global.fontSizeIndex++;
    } else if (Global.fontSizeIndex == 1) {
        article.style.fontSize = "19px";
        Global.fontSizeIndex++;
    }

    hideFlyout(fontFlyout);
};

function decreaseFontSize() {
    var article = document.getElementById("testFontSize");
    //console.log(article.style.fontSize);
    if (Global.fontSizeIndex == 2) {
        article.style.fontSize = "17px";
        Global.fontSizeIndex--;
    } else if (Global.fontSizeIndex == 1) {
        article.style.fontSize = "15px";
        Global.fontSizeIndex--;
    } else if (Global.fontSizeIndex == 0) {
        article.style.fontSize = "13px";
        Global.fontSizeIndex--;
    } else if (Global.fontSizeIndex == -1) {
        article.style.fontSize = "11px";
        Global.fontSizeIndex--;
    }
    hideFlyout(fontFlyout);
};

function setFontSize(fontSizeIndex) {
    var article = document.getElementById("testFontSize");
    if (fontSizeIndex == -2) {
        article.style.fontSize = "11px";
    } else if (fontSizeIndex == -1) {
        article.style.fontSize = "13px";
    } else if (fontSizeIndex == 0) {
        article.style.fontSize = "15px";
    } else if (fontSizeIndex == 1) {
        article.style.fontSize = "17px";
    } else if (fontSizeIndex == 2) {
        article.style.fontSize = "19px";
    }
};




