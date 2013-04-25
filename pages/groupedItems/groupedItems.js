(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var groupedItemsHub;
    var listViewCompleteCounter = 0;

    ui.Pages.define("/pages/groupedItems/groupedItems.html", {
        // Navigiert zur groupHeaderPage. Aufgerufen von den groupHeaders,
        // der Tastenkombination und iteminvoked.
        navigateToGroup: function (key) {
            nav.navigate("/pages/groupDetail/groupDetail.html", { groupKey: key });
        },              

        //go direct to group detail page from semantic zoom (note: uncomment also line with function call)
        /*groupInvoked: function (args) {
            var group = Data.groups.getAt(args.detail.itemIndex);
            nav.navigate("/pages/groupDetail/groupDetail.html", { groupKey: group.key });
        },*/

        // Diese Funktion wird immer aufgerufen, wenn ein Benutzer zu dieser Seite wechselt. Sie
        // füllt die Seitenelemente mit den Daten der App auf.
        ready: function (element, options) {

            if (Global.titlesAreOn == false) {
                Global.titlesAreOn = true;
                Global.titleToggle();
            }

            var listView = element.querySelector(".groupeditemslist").winControl;             
            listView.groupHeaderTemplate = element.querySelector(".headertemplate");
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.oniteminvoked = this._itemInvoked.bind(this);

            var listViewZoomOut = element.querySelector(".groupeditemslistZoomOut").winControl;
            var semanticZoom = element.querySelector(".semanticZoom").winControl;
            listViewZoomOut.itemTemplate = element.querySelector(".semanticZoomOut");

            //go direct to group detail page from semantic zoom (note: uncomment also function)
            //listViewZoomOut.oniteminvoked = this.groupInvoked.bind(this);

            listView.onloadingstatechanged = function () {
                if (listView.loadingState == "itemsLoaded") {                    
                    if (listViewCompleteCounter == 1) {                        
                        var loadingRing = document.getElementById("loadingRing");                        
                        loadingRing.style.display = "none";
                    }
                    listViewCompleteCounter++;
                }
            };

            // Tastenkombination (STRG + ALT + G) festlegen, um zur aktuellen
            // Gruppe zu navigieren, wenn nicht im angedockten Modus.
            listView.addEventListener("keydown", function (e) {
                if (appView.value !== appViewState.snapped && e.ctrlKey && e.keyCode === WinJS.Utilities.Key.g && e.altKey) {
                    var data = listView.itemDataSource.list.getAt(listView.currentItem.index);
                    this.navigateToGroup(data.group.key);
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }.bind(this), true);

            this._initializeLayout(listView, listViewZoomOut, semanticZoom, appView.value);
            listView.element.focus();
        },

        // Diese Funktion aktualisiert das Seitenlayout als Reaktion auf viewState-Änderungen.
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            var listView = element.querySelector(".groupeditemslist").winControl;

            var listViewZoomOut = element.querySelector(".groupeditemslistZoomOut").winControl;
            var semanticZoom = element.querySelector(".semanticZoom").winControl;

            if (lastViewState !== viewState) {
                if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
                    var handler = function (e) {
                        listView.removeEventListener("contentanimating", handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener("contentanimating", handler, false);
                    this._initializeLayout(listView, listViewZoomOut, semanticZoom, viewState);
                }

                if (lastViewState === appViewState.snapped) {
                    semanticZoom.zoomedOut = true;
                    semanticZoom.forceLayout();
                }
            }
        },

        unload: function () {
            // Each time the user navigates away, we store the position of the listview
            var listView = document.querySelector(".groupeditemslist").winControl;
            Global.scrollState.groupedItems.indexOfFirstVisible = listView.indexOfFirstVisible;
        },

        // Diese Funktion aktualisiert die ListView mit den neuen Layouts.
        _initializeLayout: function (listView, listViewZoomOut, semanticZoom, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            if (viewState === appViewState.snapped) {
                listView.itemDataSource = Data.groups.dataSource;
                listView.groupDataSource = null;
                listView.layout = new ui.ListLayout();

                semanticZoom.zoomedOut = false;
                semanticZoom.forceLayout();
                semanticZoom.locked = true;
            } else {

                //get filtered filtered list for the "hub", the number specifies the number of elements displayed
                var filteredHubList = Data.getClippedList(6);
                groupedItemsHub = filteredHubList.createGrouped(
                    function groupKeySelector(item) { return item.group.key; },
                    function groupDataSelector(item) { return item.group; }
                );

                listView.itemDataSource = groupedItemsHub.dataSource;
                listView.groupDataSource = groupedItemsHub.groups.dataSource;
                listView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });

                listViewZoomOut.itemDataSource = groupedItemsHub.groups.dataSource;
                listViewZoomOut.layout = new ui.GridLayout({ maxRows: 1 });
                semanticZoom.forceLayout();
                semanticZoom.locked = false;
            }

            //set scroll state to previous scroll state
            msSetImmediate(function () {
                listView.indexOfFirstVisible = Global.scrollState.groupedItems.indexOfFirstVisible || 0;
            });
        },

        _itemInvoked: function (args) {
            if (appView.value === appViewState.snapped) {
                // Wenn die Seite angedockt ist, hat der Benutzer eine Gruppe aufgerufen.
                var group = Data.groups.getAt(args.detail.itemIndex);
                this.navigateToGroup(group.key);
            } else {
                // Wenn die Seite nicht angedockt ist, hat der Benutzer ein Element aufgerufen.
                var item = groupedItemsHub.getAt(args.detail.itemIndex);
                nav.navigate("/pages/itemDetail/itemDetail.html", { item: Data.getItemReference(item) });
            }
        }
    });

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
})();
