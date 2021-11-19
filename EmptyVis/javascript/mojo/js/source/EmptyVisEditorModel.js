(function () {
    // Define this code as a plugin in the mstrmojo object
    if (!mstrmojo.plugins.EmptyVis) {
        mstrmojo.plugins.EmptyVis = {};
    }
    // Import the necessary library
    mstrmojo.requiresCls(
        "mstrmojo.vi.models.editors.CustomVisEditorModel"
    );
    //variable that represent the enum of all the widget type
    var $WT = mstrmojo.vi.models.editors.CustomVisEditorModel.WIDGET_TYPE,
        APLC_PROPERTIES = mstrmojo.plugins.EmptyVis.APLC_PROPERTIES;

    mstrmojo.plugins.EmptyVis.EmptyVisEditorModel = mstrmojo.declare(
        mstrmojo.vi.models.editors.CustomVisEditorModel,
        null,
        {
            // Define the JavaScript class that renders your visualization properties
            scriptClass: 'mstrmojo.plugins.EmptyVis.EmptyVisEditorModel',
            getCustomProperty: function getCustomProperty() {
                var myViz = this.getHost();
                // Fill the property data here
                return [
                    // Tab amCharts Gantt Options
                    {
                        name: 'amCharts Gantt Options',
                        value: [
                            // Options Group
                            {
                                style: $WT.EDITORGROUP,
                                items: [{
                                    style: $WT.LABEL,
                                    labelText: "Options"
                                }, {
                                    style: $WT.CHECKBOXANDLABEL,
                                    propertyName: "displayXYChartScrollbar",
                                    labelText: "Show XYChartScrollbar"
                                }, {
                                    style: $WT.TWOCOLUMN,
                                    items: [{
                                        style: $WT.LABEL,
                                        disabled: this.getHost().getProperty('displayXYCursor') === "false",
                                        width: "40%",
                                        labelText: "Wheel Scroll"
                                    }, {
                                        style: $WT.PULLDOWN,
                                        disabled: this.getHost().getProperty('displayXYCursor') === "false",
                                        width: "60%",
                                        propertyName: "behaviorWheelScroll",
                                        items: [{
                                            name: "none",
                                            value: "none"
                                        }, {
                                            name: "zoom",
                                            value: "zoomX"
                                        }, {
                                            name: "pan",
                                            value: "panX"
                                        }]
                                    }]
                                }, {
                                    style: $WT.TWOCOLUMN,
                                    items: [{
                                        style: $WT.LABEL,
                                        width: "40%",
                                        labelText: "DateTime Format (Separator doesnt matter)"
                                    }, {
                                        style: $WT.PULLDOWN,
                                        width: "60%",
                                        propertyName: "dateTimeFormat",
                                        items: [{
                                            name: "dd-mm-yyyy",
                                            value: "dd-mm-yyyy"
                                        }, {
                                            name: "mm-dd-yyyy",
                                            value: "mm-dd-yyyy"
                                        }, {
                                            name: "yyyy-dd-mm",
                                            value: "yyyy-dd-mm"
                                        }, {
                                            name: "yyyy-mm-dd",
                                            value: "yyyy-mm-dd"
                                        }]
                                    }]
                                }]
                            },
                            {
                                style: $WT.EDITORGROUP,
                                items: [
                                    {
                                        style: $WT.CHECKBOXANDLABEL,
                                        propertyName: "showDebugMsgs",
                                        labelText: "Show Debugger"
                                    },
                                ]
                            },
                        ]
                    },
                    // Tab amCharts Timeline Format
                    {
                        name: 'amCharts Timeline Format',
                        value: [
                                //Thresholds
                                {
                                    style: $WT.EDITORGROUP,
                                    items: [{
                                            style: $WT.LABEL,
                                            labelText: "Color / Thresholds / Heatmap"
                                        },{
                                            style: $WT.CHECKBOXANDLABEL,
                                            propertyName: "colorByTask",
                                            labelText: "Color by Task"
                                        },{
                                            style: $WT.CHECKBOXANDLABEL,
                                            propertyName: "showThreshold",
                                            labelText: "Show Thresholds"
                                }]
                                }]
                    }
                ]
            }
        });
}());