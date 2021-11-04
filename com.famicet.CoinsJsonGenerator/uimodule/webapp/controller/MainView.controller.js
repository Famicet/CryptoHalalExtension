sap.ui.define(["com/famicet/CoinsJsonGenerator/controller/BaseController", "sap/m/Token"], function (Controller, Token) {
    "use strict";
    var servicePointId = 0;
    var usagePointId = 0;

    return Controller.extend("com.famicet.CoinsJsonGenerator.controller.MainView", {
        /**
         * @override
         */
        onInit: function() {
            var oView = this.getView();

            var oServicesPoints = oView.byId("services");

            const fs = require("fs");


            
        },

		createNewServicePoint: function(oEvent) {
			var oView = this.getView();
            servicePointId++;
            var input = new sap.m.Input("sPoint" + servicePointId);
            input.setWidth("700px");
            input.setRequired(true);
            oView.byId("servicesPoints").addContent(input);
		},

		removeServicePoint: function(oEvent) {
			var oView = this.getView();

            oView.byId("servicesPoints").removeContent(oView.byId("servicesPoints").getContent().length - 1);
		},

		createNewUsagePoint: function(oEvent) {
			var oView = this.getView();
            usagePointId++;
            var input = new sap.m.Input("uPoint" + usagePointId);
            input.setWidth("700px");
            input.setRequired(true);
            oView.byId("usagesPoints").addContent(input);
		},

		removeUsagePoint: function(oEvent) {
			var oView = this.getView();

            oView.byId("usagesPoints").removeContent(oView.byId("usagesPoints").getContent().length - 1);
		}
    });
});


