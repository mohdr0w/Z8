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
    showFlyout(fontFlyout, fontSizeBt, "bottom");
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
    var article = document.getElementById("fontSize");
    var caption = document.getElementById("caption");

    if (Global.fontSizeIndex == -2) {
        article.style.fontSize = "13px";
        caption.style.fontSize = "11px";
        Global.fontSizeIndex++;
    } else if (Global.fontSizeIndex == -1) {
        article.style.fontSize = "15px";
        caption.style.fontSize = "13px";
        Global.fontSizeIndex++;
    } else if (Global.fontSizeIndex == 0) {
        article.style.fontSize = "17px";
        caption.style.fontSize = "15px";
        Global.fontSizeIndex++;
    } else if (Global.fontSizeIndex == 1) {
        article.style.fontSize = "19px";
        caption.style.fontSize = "17px";
        Global.fontSizeIndex++;
    }
    hideFlyout(fontFlyout);

    if(Global.fontSizeIndex == 2){
        var incBt = document.getElementById("increase");
        incBt.style.display = "none";
    } else {        
        var decBt = document.getElementById("decrease");
        decBt.style.display = "";
    }
};

function decreaseFontSize() {
    var article = document.getElementById("fontSize");
    var caption = document.getElementById("caption");
    
    if (Global.fontSizeIndex == 2) {
        article.style.fontSize = "17px";
        caption.style.fontSize = "15px";
        Global.fontSizeIndex--;
    } else if (Global.fontSizeIndex == 1) {
        article.style.fontSize = "15px";
        caption.style.fontSize = "13px";
        Global.fontSizeIndex--;
    } else if (Global.fontSizeIndex == 0) {
        article.style.fontSize = "13px";
        caption.style.fontSize = "11px";
        Global.fontSizeIndex--;
    } else if (Global.fontSizeIndex == -1) {
        article.style.fontSize = "11px";
        caption.style.fontSize = "9px";
        Global.fontSizeIndex--;
    }
    hideFlyout(fontFlyout);

    if (Global.fontSizeIndex == -2) {
        var decBt = document.getElementById("decrease");
        decBt.style.display = "none";
    } else {        
        var incBt = document.getElementById("increase");
        incBt.style.display = "";
    }
};

function setFontSize(fontSizeIndex) {
    var article = document.getElementById("fontSize");
    var caption = document.getElementById("caption");

    if (fontSizeIndex == -2) {
        article.style.fontSize = "11px";
        caption.style.fontSize = "9px";
    } else if (fontSizeIndex == -1) {
        article.style.fontSize = "13px";
        caption.style.fontSize = "11px";
    } else if (fontSizeIndex == 0) {
        article.style.fontSize = "15px";
        caption.style.fontSize = "13px";
    } else if (fontSizeIndex == 1) {
        article.style.fontSize = "17px";
        caption.style.fontSize = "15px";
    } else if (fontSizeIndex == 2) {
        article.style.fontSize = "19px";
        caption.style.fontSize = "17px";
    }
};

function resetFontSize() {
    var article = document.getElementById("fontSize");
    var caption = document.getElementById("caption");

    article.style.fontSize = "15px";
    caption.style.fontSize = "13px";

    var incBt = document.getElementById("increase");
    incBt.style.display = "";

    var decBt = document.getElementById("decrease");
    decBt.style.display = "";

    Global.fontSizeIndex = 0;
};




