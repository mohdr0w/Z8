(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {
        // Diese Funktion wird immer aufgerufen, wenn ein Benutzer zu dieser Seite wechselt. Sie
        // füllt die Seitenelemente mit den Daten der App auf.
        ready: function (element, options) {
            var item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);
            element.querySelector(".titlearea .pagetitle").textContent = item.group.title;
            element.querySelector("article .item-title").textContent = item.title;
            element.querySelector("article .item-subtitle").textContent = item.teaserText;
            element.querySelector("article .item-image").src = item.backgroundImage;
            element.querySelector("article .image-bu").textContent = item.caption;
            element.querySelector("article .image-copyright").textContent = item.copyright;
            element.querySelector("article .item-image").alt = item.pubDate;
            element.querySelector("article .item-content").innerHTML = item.teaserText;

            getContent(item.articleLink).then(function (content) {
                element.querySelector("article .item-content").innerHTML = content[0];

                var author;
                if (content[1] != "") {
                    author = "von " + content[1] + " | ";
                } else {
                    author = "";
                }
                element.querySelector("article .meta-info").textContent = author + "Quelle: " + content[2] + " | " + item.pubDate;
            });

            element.querySelector(".content").focus();
        }
    });

    function getContent(link) {
        return WinJS.xhr({ url: link }).then(function (article) {           
            var articleData = [];
            var textContent = "";
            var paragraphs = article.responseXML.querySelectorAll("division[type='page'] p");

            for (var n = 0; n < paragraphs.length; n++) {
                //exlude info box paragraphs
                if (paragraphs[n].parentNode.parentNode.parentNode.parentNode.nodeName != "infobox") {   
                    var xmlText = new XMLSerializer().serializeToString(paragraphs[n]);
                    if (paragraphs[n].querySelector("a") != null) {
                        var numberOfLinks = paragraphs[n].querySelectorAll("a").length;
                        for (var i = 0; i < numberOfLinks; i++) {
                            var rx = new RegExp("<a[^<>]+>", "i");
                            xmlText = xmlText.replace(rx, "");
                            rx = new RegExp("</a>", "i");
                            xmlText = xmlText.replace(rx, "");
                        }                       
                    }                  
                    textContent = textContent + xmlText;
                }
            }
            articleData.push(textContent);

            var author;
            if (article.responseXML.querySelector("attribute[name='author']")) {
                author = article.responseXML.querySelector("attribute[name='author']").textContent;
            } else {
                author = "";
            }
            
            articleData.push(author);

            var quelle;
            if (article.responseXML.querySelector("attribute[name='product-name']")) {
                quelle = article.responseXML.querySelector("attribute[name='product-name']").textContent;
            } else if (article.responseXML.querySelector("attribute[name='copyrights']")) {
                quelle = article.responseXML.querySelector("attribute[name='copyrights']").textContent;
            } else {
                quelle = "ZEIT ONLINE";
            }
           
            articleData.push(quelle);


            return articleData;
        });
    }


})();
