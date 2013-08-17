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
                // Initialisierung - registrierung der click handler          
                document.getElementById("titleToggle").onclick = titleToggle;
                document.getElementById("fontSizeBt").onclick = showFontMenu; 
            } else {
                Global.scrollState = app.sessionState.applicationState;
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

            //eventlistener für die Schriftgroesse registrieren
            document.getElementById("increase").addEventListener("click", increaseFontSize, false);
            document.getElementById("decrease").addEventListener("click", decreaseFontSize, false);
            document.getElementById("reset").addEventListener("click", resetFontSize, false);
        }
    });

    app.oncheckpoint = function (args) {
        app.sessionState.history = nav.history;
        app.sessionState.applicationState = Global.scrollState;
    };
    app.start();
})();
