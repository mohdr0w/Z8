(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {
        // Diese Funktion wird immer aufgerufen, wenn ein Benutzer zu dieser Seite wechselt. Sie
        // füllt die Seitenelemente mit den Daten der App auf.
        ready: function (element, options) {
            var item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);
            element.querySelector(".titlearea .pagetitle").textContent = item.group.title;
            element.querySelector("article .item-title").textContent = item.title;
            element.querySelector("article .item-subtitle").textContent = item.pubDate;
            element.querySelector("article .item-image").src = item.backgroundImage;
            element.querySelector("article .item-image").alt = item.pubDate;
            element.querySelector("article .item-content").innerHTML = item.content;

            getContent(item.articleLink).then(function (content) {
                element.querySelector("article .item-content").innerHTML = content;
            });

            element.querySelector(".content").focus();
        }
    });

    function getContent(link) {
        return WinJS.xhr({ url: link }).then(function (rss) {
            var paragraphs = rss.responseXML.querySelectorAll("division[type='page'] p");
            var articleCo = "";
            for (var n = 0; n < paragraphs.length; n++) {

                articleCo = articleCo + "<p>";
                articleCo = articleCo + paragraphs[n].textContent;
                articleCo = articleCo + "</p>";
            }

            return articleCo;
        });
    }


})();
