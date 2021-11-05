sap.ui.define(["com/famicet/CoinsJsonGenerator/controller/BaseController", "sap/m/Token",
	"sap/ui/model/json/JSONModel"], function (Controller, Token) {
    "use strict";
    var servicePointId = 0;
    var usagePointId = 0;
    var originalData = new sap.ui.model.json.JSONModel();
    var localData;

    var oView;

    var temporarySetOfObjects = new sap.ui.model.json.JSONModel();
    var tempObject = new sap.ui.model.json.JSONModel();


    return Controller.extend("com.famicet.CoinsJsonGenerator.controller.MainView", {
        /**
         * @override
         */
        onInit: function () {
            oView = this.getView();

            var datajson = {
                "name": "hello",
                "type": "something"
            }

            originalData.loadData("data/Coins.json", "", false)

            localData = originalData.getData();

            



        },

        createNewServicePoint: function (oEvent) {
            servicePointId++;
            var input = new sap.m.Input("sPoint" + servicePointId);
            input.setWidth("700px");
            input.setRequired(true);
            oView.byId("servicesPoints").addContent(input);
        },

        removeServicePoint: function (oEvent) {

            oView.byId("servicesPoints").removeContent(oView.byId("servicesPoints").getContent().length - 1);
        },

        createNewUsagePoint: function (oEvent) {
            usagePointId++;
            var input = new sap.m.Input("uPoint" + usagePointId);
            input.setWidth("700px");
            input.setRequired(true);
            oView.byId("usagesPoints").addContent(input);
        },

        removeUsagePoint: function (oEvent) {
            oView.byId("usagesPoints").removeContent(oView.byId("usagesPoints").getContent().length - 1);
        },

        addCurrentDataSet: function (oEvent) {
            var newDataJson =  new sap.ui.model.json.JSONModel();
            newDataJson.loadData("data/Coin.json", "", false);
            var newDataSet = newDataJson.getData();

            newDataSet.name = oView.byId("coinName").getValue();
            newDataSet.technicalName = oView.byId("technicalName").getValue();
            newDataSet.image = "Images/" + oView.byId("technicalName").getValue() + ".png";
            newDataSet.projectType = oView.byId("projectType").getValue();
            newDataSet.desc = oView.byId("desc").getValue();
            newDataSet.isHalal = oView.byId("isHalal").getValue();

            //Adding Services
            var newServicePoint = { "point": "" };
            newServicePoint.point = oView.byId("service").getValue();
            newDataSet.services.push(newServicePoint);
            var services = oView.byId("servicesPoints").getContent();
            services.forEach(element => {
                var newServicePoint2 = { "point": "" };
                newServicePoint2.point = element.getValue();
                newDataSet.services.push(newServicePoint2);
            });

            //Adding Usages
            var newUsagePoint = { "point": "" };
            newUsagePoint.point = oView.byId("usage").getValue();
            newDataSet.usages.push(newUsagePoint);
            var usages = oView.byId("usagesPoints").getContent();
            usages.forEach(element => {
                var newUsagePoint2 = { "point": "" };
                newUsagePoint2.point = element.getValue();
                newDataSet.usages.push(newUsagePoint2);
            });
            
            localData.coins.push(newDataSet);
            
            oView.byId("technicalName").getValue("");
            oView.byId("coinName").setValue("");
            oView.byId("projectType").getValue("");
            oView.byId("desc").getValue("");
            oView.byId("isHalal").getValue("");
            oView.byId("service").getValue("");
            oView.byId("usage").getValue("");

            //oView.byId("usagesPoints").getContent()
        },

		exportResult: function(oEvent) {
			var saveData = (function () {
                var a = document.createElement("a");
                // document.body.appendChild(a);
                // a.style = "display: none";
                return function (data, fileName) {
                    var json = JSON.stringify(data),
                        blob = new Blob([json], {type: "octet/stream"}),
                        url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
                }());
            saveData(localData, "Coins.json");
		}
    });
});




