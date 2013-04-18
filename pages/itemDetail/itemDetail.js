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
            element.querySelector("article .image-bu").textContent = item.caption;
            element.querySelector("article .image-copyright").textContent = item.copyright;
            element.querySelector("article .item-image").alt = item.pubDate;
            element.querySelector("article .item-content").innerHTML = item.content;

            getContent(item.articleLink).then(function (content) {
                element.querySelector("article .item-content").innerHTML = content;
            });

            element.querySelector(".content").focus();
        }
    });

    function getContent(link) {
        return WinJS.xhr({ url: link }).then(function (article) {
            var isInterview = false;
            var articleContent = "";
            var paragraphs = article.responseXML.querySelectorAll("division[type='page'] p");

            for (var n = 0; n < paragraphs.length; n++) {
                //exlude paragraphs from info boxes
                if (paragraphs[n].parentNode.parentNode.parentNode.parentNode.nodeName != "infobox") {
                    var interviewPartText = "";
                    var setColon;
                    var strong = null;
                    //turn "interview mode" on/off
                    if (paragraphs[n].querySelector("strong") != null) {
                        strong = paragraphs[n].querySelector("strong");
                        if (strong.textContent == "ZEIT:" || strong.textContent == "DIE ZEIT:" || strong.textContent == "ZEIT ONLINE" || strong.textContent == "ZEIT ONLINE:" || strong.textContent == "ZEIT Campus:") {
                            isInterview = true;
                            if (strong.textContent == "ZEIT ONLINE") {
                                setColon = true;
                            } 
                        }
                    } else {
                        isInterview = false;
                        setColon = false;
                    }
                    
                    if (strong != null && isInterview == false) {
                        //Zwischenüberschrift
                        articleContent = articleContent + "<p class='innertitle'><strong>" + strong.textContent + "</strong><p>";
                    } else if (strong != null && isInterview == true) {
                        //interview mode: get all text after the first ":" 
                        var pSplit = paragraphs[n].textContent.split(":");
                        for (var i = 1; i < pSplit.length; i++) {
                            interviewPartText = interviewPartText + pSplit[i];
                        }
                        if (setColon) {
                            articleContent = articleContent + "<p><strong>" + strong.textContent + ":</strong>" + interviewPartText + "</p>";
                        } else {
                            articleContent = articleContent + "<p><strong>" + strong.textContent + "</strong>" + interviewPartText + "</p>";
                        }                        
                    }else {
                        //normaler artikel absatz
                        articleContent = articleContent + "<p>" + paragraphs[n].textContent + "</p>";
                    }
                }
            }
            return articleContent;
        });
    }


})();
