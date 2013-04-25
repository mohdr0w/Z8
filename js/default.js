(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    //var titlesAreOn = true;  

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: Diese Anwendung wurde neu eingeführt. Die Anwendung
                // hier initialisieren.               
                document.getElementById("titleToggle").onclick = titleToggle;
                document.getElementById("fontSize").onclick = showFontMenu;                
                document.getElementById("refresh").onclick = refresh;               
            } else {
                Global.scrollState = app.sessionState.applicationState;
                // TODO: Diese Anwendung war angehalten und wurde reaktiviert.
                // Anwendungszustand hier wiederherstellen.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));

            document.getElementById("increase").addEventListener("click", increaseFontSize, false);
            document.getElementById("decrease").addEventListener("click", decreaseFontSize, false);
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: Diese Anwendung wird gleich angehalten. Jeden Zustand,
        // der über Anhaltevorgänge hinweg beibehalten muss, hier speichern. Wenn ein asynchroner 
        // Vorgang vor dem Anhalten der Anwendung abgeschlossen werden muss, 
        // args.setPromise() aufrufen.
        app.sessionState.history = nav.history;
        app.sessionState.applicationState = Global.scrollState;
    };
    app.start();
})();
