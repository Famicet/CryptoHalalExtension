sap.ui.define(["com/famicet/CoinsJsonGenerator/controller/BaseController", "sap/m/Token",
	"sap/ui/model/json/JSONModel"], function (Controller, Token) {
    "use strict";
    var servicePointId = 0;
    var usagePointId = 0;
    var originalData = new sap.ui.model.json.JSONModel();
    var localData;

    var oView;
    
    var language;

    var uploaded = false;

    return Controller.extend("com.famicet.CoinsJsonGenerator.controller.MainView", {
        /**
         * @override
         */
        onInit: function () {
            oView = this.getView();
            language = "Arabic";
            var oModel = new sap.ui.model.json.JSONModel();
            oModel.loadData("data/Halal.json");
            oView.setModel(oModel);

            originalData.loadData("data/ArabicCoins.json", "", false)

            localData = originalData.getData();

            oView.byId("language").setText("عربي");
        },

        createNewServicePoint: function (oEvent) {
            servicePointId++;
            var input = new sap.m.Input("sPoint" + servicePointId);
            input.setWidth("500px");
            input.setRequired(true);
            oView.byId("servicesPoints").addContent(input);
        },

        removeServicePoint: function (oEvent) {

            oView.byId("servicesPoints").removeContent(oView.byId("servicesPoints").getContent().length - 1);
        },

        createNewUsagePoint: function (oEvent) {
            usagePointId++;
            var input = new sap.m.Input("uPoint" + usagePointId);
            input.setWidth("500px");
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

            newDataSet.name = removeNewLine(oView.byId("coinName").getValue());
            newDataSet.technicalName = removeNewLine(oView.byId("technicalName").getValue());
            newDataSet.image = removeNewLine("Images/" + oView.byId("technicalName").getValue() + ".png");
            newDataSet.projectType = removeNewLine(oView.byId("projectType").getValue());
            newDataSet.desc = removeNewLine(oView.byId("desc").getValue());
            newDataSet.isHalal = removeNewLine(oView.byId("isHalal").getValue());
            newDataSet.note = removeNewLine(oView.byId("Note").getValue());
            newDataSet.servicesNoteLabel = removeNewLine(oView.byId("servicesNoteLabel").getValue());
            newDataSet.servicesNote = removeNewLine(oView.byId("servicesNote").getValue());
            newDataSet.usagesNoteLabel = removeNewLine(oView.byId("usagesNoteLabel").getValue());
            newDataSet.usagesNote = removeNewLine(oView.byId("usagesNote").getValue());

            removeNewLine("dsadsa")

            //Adding Services
            var newServicePoint = { "point": "" };
            newServicePoint.point = removeNewLine(oView.byId("service").getValue());
            newDataSet.services.push(newServicePoint);
            var services = oView.byId("servicesPoints").getContent();
            services.forEach(element => {
                var newServicePoint2 = { "point": "" };
                newServicePoint2.point = removeNewLine(element.getValue());
                newDataSet.services.push(newServicePoint2);
            });

            //Adding Usages
            var newUsagePoint = { "point": "" };
            newUsagePoint.point = removeNewLine(oView.byId("usage").getValue());
            newDataSet.usages.push(newUsagePoint);
            var usages = oView.byId("usagesPoints").getContent();
            usages.forEach(element => {
                var newUsagePoint2 = { "point": "" };
                newUsagePoint2.point = removeNewLine(element.getValue());
                newDataSet.usages.push(newUsagePoint2);
            });
            
            localData.coins.push(newDataSet);
            
            oView.byId("technicalName").setValue("");
            oView.byId("coinName").setValue("");
            oView.byId("projectType").setValue("");
            oView.byId("desc").setValue("");
            oView.byId("isHalal").setValue("");
            oView.byId("Note").setValue("");
            oView.byId("service").setValue("");
            oView.byId("usage").setValue("");
            oView.byId("servicesNoteLabel").setValue("");
            oView.byId("servicesNote").setValue("");
            oView.byId("usagesNoteLabel").setValue("");
            oView.byId("usagesNote").setValue("");

            oView.byId("servicesPoints").destroyContent();
            oView.byId("usagesPoints").destroyContent();
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
            saveData(localData, language + "Coins.json");
		},

		handleUploadComplete: function(oEvent) {
			
		},

		handleUploadPress: function(oEvent) {
            
			var fileUploader = oView.byId("fileUploader");
            if(!fileUploader.getValue()){
                console.log("Empty");
                var status = oView.byId("status");
                status.setText("Status: Not Uploaded!");
                uploaded = false;
            } else {
                var file = fileUploader.getFocusDomRef().files[0];
                console.log(file.type);
                if(file && window.FileReader){
                    var reader = new FileReader();
                    console.log(reader.readAsDataURL(file));
                    reader.onload = function(e) {
                        var str = e.target.result;
                        var data = new sap.ui.model.json.JSONModel(str);
                        data.attachRequestCompleted(function(){
                            console.log(data.getData());
                            localData = data.getData();

                            var status = oView.byId("status");
                            status.setText("Status: Uploaded!");
                            uploaded = true;
                        })
                    }
                }
            }
            
		},

		changeLanguage: function(oEvent) {
			if(!uploaded){
                if(language == "Arabic"){
                    language = "English";
                    oView.byId("language").setText("English");
                } else {
                    language = "Arabic";
    
                    oView.byId("language").setText("عربي");
                }
            }
		}
    });
});

function removeNewLine(text) {
    return text.replace(/(\r\n|\n|\r)/gm," ");
}

