(function () {
    "use strict";
       
    var dataPromises = [];
    var ressorts;
   
    var teaserElements = new WinJS.Binding.List();   

    var list = getTeaserElements();
    var groupedItems = list.createGrouped(
        function groupKeySelector(item) { return item.group.key; },
        function groupDataSelector(item) { return item.group; }
    );    
    
    WinJS.Namespace.define("Data", {
        items: groupedItems,        
        groups: groupedItems.groups,
        getItemReference: getItemReference,
        getItemsFromGroup: getItemsFromGroup,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference,
        getClippedList: getClippedList       
    });

    // Einen Verweis für ein Element abrufen, dabei den Gruppenschlüssel und Elementtitel als
    // eindeutigen Verweis auf das Element verwenden, der einfach serialisiert werden kann.
    function getItemReference(item) {
        return [item.group.key, item.title];
    }

    // Diese Funktion gibt eine WinJS.Binding.List zurück, die nur die Elemente enthält,
    // die zur bereitgestellten Gruppe gehören.
    function getItemsFromGroup(group) {
        return list.createFiltered(function (item) {            
            return item.group.key === group.key;            
        });
    }

    //function returns clipped bindinglist for the hub
    function getClippedList(numberOfElements) {        
        return list.createFiltered(function (item) {
            if (item.indexTest < numberOfElements) {                
                return item.group.key;
            }
        });
    }

    // Die eindeutige Gruppe abrufen, die dem bereitgestellten Gruppenschlüssel entspricht.
    function resolveGroupReference(key) {
        for (var i = 0; i < groupedItems.groups.length; i++) {
            if (groupedItems.groups.getAt(i).key === key) {
                return groupedItems.groups.getAt(i);
            }
        }
    }

    // Ein eindeutiges Element vom bereitgestellten Zeichenfolgenarray abrufen, in dem ein
    // Gruppenschlüssel und ein Elementtitel enthalten sein sollten.
    function resolveItemReference(reference) {
        for (var i = 0; i < groupedItems.length; i++) {
            var item = groupedItems.getAt(i);
            if (item.group.key === reference[0] && item.title === reference[1]) {
                return item;
            }
        }
    }
    
    function getRessorts() {
        // Create an object for each ressort.        
        ressorts = [
            {
                key: "ressort01", url: 'http://xml.zeit.de/index',
                title: 'Top Stories', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            },
            {
                key: "ressort02", url: 'http://xml.zeit.de/digital/index',
                title: 'Digital', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            },
            {
                key: "ressort03", url: 'http://xml.zeit.de/wissen/index',
                title: 'Wissen', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            },
            {
                key: "ressort04", url: 'http://xml.zeit.de/meinung/index',
                title: 'Meinung', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            },
            {
                key: "ressort05", url: 'http://xml.zeit.de/politik/index',
                title: 'Politik', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            },
            {
                key: "ressort06", url: 'http://xml.zeit.de/kultur/index',
                title: 'Kultur', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            }/*,
            {
                key: "ressort07", url: 'http://xml.zeit.de/wirtschaft/index',
                title: 'Wirtschaft', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            },
            {
                key: "ressort08", url: 'http://xml.zeit.de/gesellschaft/index',
                title: 'Gesellschaft', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            },
            {
                key: "ressort09", url: 'http://xml.zeit.de/studium/index',
                title: 'Studium', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            },
            {
                key: "ressort10", url: 'http://xml.zeit.de/karriere/index',
                title: 'Karriere', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            },
            {
                key: "ressort11", url: 'http://xml.zeit.de/lebensart/index',
                title: 'Lebensart', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            },
            {
                key: "ressort12", url: 'http://xml.zeit.de/reisen/index',
                title: 'Reisen', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            },
            {
                key: "ressort13", url: 'http://xml.zeit.de/auto/index',
                title: 'Auto', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            },
            {
                key: "ressort14", url: 'http://xml.zeit.de/sport/index',
                title: 'Sport', subtitle: 'subtitle', updated: 'tbd',
                backgroundImage: 'tbd', articleLink: "tdb",
                acquireSyndication: acquireSyndication, dataPromise: null
            }*/

        ]
        // Get the content for each ressort in the ressorts array.
        ressorts.forEach(function (ressort) {
            ressort.dataPromise = ressort.acquireSyndication(ressort.url);
            dataPromises.push(ressort.dataPromise);
        });

        // Return when all asynchronous operations are complete
        return WinJS.Promise.join(dataPromises).then(function () {
            return ressorts;
        });
    };

    function acquireSyndication(url) {
        return WinJS.xhr({ url: url });
    }

    function getTeaserElements() {        
        getRessorts().then(function () {
            // Process each ressort.
            ressorts.forEach(function (ressort) {
                ressort.dataPromise.then(function (xhrResponse) {
                    var ressortXML = xhrResponse.responseXML;                    
                    
                    var dateUnformatted = ressortXML.querySelector("attribute[name='date_last_published']").textContent;
                    var date = dateUnformatted.substring(8, 10) + "." + dateUnformatted.substring(5, 7) + "." + dateUnformatted.substring(0, 4);
                    ressort.updated = "Letztes Update: " + date + " | " + dateUnformatted.substring(11, 16) + " Uhr";

                    // Process the teaser elements.
                    getItemsFromXml(ressortXML, teaserElements, ressort);
                });
            });
        });        
        return teaserElements;       
    }

    function getItemsFromXml(ressortXML, teaserElements, ressort) {
        var teasers = ressortXML.querySelectorAll("region[area='lead'] container > block:first-child");
        var index = 0;
        // Process each ressort teaser.
        for (var teaserIndex = 0; teaserIndex < teasers.length; teaserIndex++) {
            var teaser = teasers[teaserIndex];

            //no video teaser and no teasers which link to blog articles (also the second teaser of "double-lead" is not displayed)
            if (teaser.getAttribute("type") != "video" && teaser.getAttribute("ns0:href") == null) {

                // Get the title, author, and date published.
                var teaserTitle = teaser.querySelector("title").textContent;            
                var teaserAuthor = "";
                var firstReleased = teaser.getAttribute("date-first-released");
                var teaserDate = firstReleased.substring(8, 10) + "." + firstReleased.substring(5, 7) + "." + firstReleased.substring(0, 4);
            
                // Process the content so that it displays nicely.
                var staticContent = toStaticHTML(teaser.querySelector("description").textContent);

                var teaserImageEl = teaser.querySelector("image");
                var imageBasePath = teaserImageEl.getAttribute("base-id");
                var splitImagePath = imageBasePath.split('/');
                var imageNameSmall = splitImagePath[splitImagePath.length - 2] + "-220x124.jpg";
                var imageNameBig = splitImagePath[splitImagePath.length - 2] + "-540x304.jpg";
                var imagePathSmall = imageBasePath + imageNameSmall;
                var imagePathBig = imageBasePath + imageNameBig;
                var articleLink = teaser.getAttribute("href");

                // Store the teaser element info we care about in the array.
                teaserElements.push({
                    group: ressort, key: ressort.title, title: teaserTitle,
                    author: teaserAuthor, pubDate: teaserDate, articleLink: articleLink,
                    backgroundImage: imagePathBig, content: staticContent, indexTest: index
                });

                index++;
            }
        }       
    }  

})();
