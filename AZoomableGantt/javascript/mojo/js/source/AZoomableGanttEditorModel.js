(function () {
    // Define this code as a plugin in the mstrmojo object
    if (!mstrmojo.plugins.AZoomableGantt) {
        mstrmojo.plugins.AZoomableGantt = {};
    }
    // Import the necessary library
    mstrmojo.requiresCls(
        "mstrmojo.vi.models.editors.CustomVisEditorModel"
    );
    //variable that represent the enum of all the widget type
    var $WT = mstrmojo.vi.models.editors.CustomVisEditorModel.WIDGET_TYPE,
        APLC_PROPERTIES = mstrmojo.plugins.AZoomableGantt.APLC_PROPERTIES;
    /**

     */
    mstrmojo.plugins.AZoomableGantt.AZoomableGanttEditorModel = mstrmojo.declare(
        mstrmojo.vi.models.editors.CustomVisEditorModel,
        null,
        {
            // Define the JavaScript class that renders your visualization properties
            scriptClass: 'mstrmojo.plugins.AZoomableGantt.AZoomableGanttEditorModel',
            getCustomProperty: function getCustomProperty() {
                var myViz = this.getHost();

                var numOfMetrics = myViz.zonesModel.getDropZones().zones[4].items.length;
                var allowHtmlFlag;
                var totalsFlag, lineFlag;
                var typeOfThreshold;
                if (this.getHost().getProperty('threshold') == undefined) {
                    typeOfThreshold = "{'oM':'true','pI':'false','Ms':'false'}"
                } else {
                    typeOfThreshold = this.getHost().getProperty('threshold');
                }

                
                
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
                                    style: $WT.CHECKBOXANDLABEL,
                                    propertyName: "show1stDateLabel",
                                    labelText: "Force 1st Date-Label"
                                }, {
                                    style: $WT.CHECKBOXANDLABEL,
                                    propertyName: "showCurrent",
                                    labelText: "Show Today"
                                }, {
                                    style: $WT.CHECKBOXANDLABEL,
                                    propertyName: "forceTimeUnit",
                                    labelText: "force Timeunit (Date = 1d and Datetime = 1min)"
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
                                        labelText: "Date Format"
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
                                        propertyName: "showToolTip",
                                        labelText: "Show Tooltip"
                                    },
                                    // Infobox
                                    {
                                        style: $WT.CHECKBOXANDLABEL,
                                        propertyName: "showInfobox",
                                        labelText: "Show Infobox"
                                    },
                                    {
                                        style: $WT.TWOCOLUMN,
                                        items: [{
                                                style: $WT.LABEL,
                                                width: "30%",
                                                labelText: "Position"
                                            },
                                            {
                                                style: $WT.PULLDOWN,
                                                width: "70%",
                                                disabled: this.getHost().getProperty('showInfobox') === "false",
                                                propertyName: "positionInfobox",
                                                items: [{
                                                        name: "vertical",
                                                        value: "vertical"
                                                    },
                                                    {
                                                        name: "horizontal",
                                                        value: "horizontal"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        style: $WT.TWOCOLUMN,
                                        disabled: this.getHost().getProperty('showInfobox') === "false" || this.getHost().getProperty('positionInfobox') === "vertical",
                                        items: [{
                                                style: $WT.LABEL,
                                                width: "30%",
                                                labelText: "Fill Box"
                                            },
                                            {
                                                style: $WT.FILLGROUP,
                                                disabled: this.getHost().getProperty('showInfobox') === "false",
                                                width: "70%",
                                                propertyName: "InfoboxFillColor",
                                            }
                                        ]
                                    },
                                    {
                                        style: $WT.TWOCOLUMN,
                                        disabled: this.getHost().getProperty('showInfobox') === "false" || this.getHost().getProperty('positionInfobox') === "vertical",
                                        items: [{
                                                style: $WT.LABEL,
                                                width: "30%",
                                                labelText: "Stroke Box"
                                            },
                                            {
                                                style: $WT.FILLGROUP,
                                                width: "70%",
                                                propertyName: "InfoboxStrokeColor",
                                            }
                                        ]
                                    },
                                    {
                                        style: $WT.TWOCOLUMN,
                                        disabled: this.getHost().getProperty('showInfobox') === "false" || this.getHost().getProperty('positionInfobox') === "vertical",
                                        items: [{
                                                style: $WT.LABEL,
                                                width: "30%",
                                                labelText: "Fill Label"
                                            },
                                            {
                                                style: $WT.FILLGROUP,
                                                width: "70%",
                                                propertyName: "InfoboxLabelFillColor",
                                            }
                                        ]
                                    },
                                    {
                                        style: $WT.TWOCOLUMN,
                                        disabled: this.getHost().getProperty('showInfobox') === "false" || this.getHost().getProperty('positionInfobox') === "vertical",
                                        items: [{
                                                style: $WT.LABEL,
                                                width: "50%",
                                                labelText: "titlesize"
                                            },
                                            {
                                                style: $WT.STEPPER,
                                                propertyName: "infoboxTitleSize",
                                                min: 6,
                                                max: 100,
                                                width: "50%"
                                            }
                                        ]
                                    },
                                    {
                                        style: $WT.TWOCOLUMN,
                                        disabled: this.getHost().getProperty('showInfobox') === "false" || this.getHost().getProperty('positionInfobox') === "vertical",
                                        items: [{
                                                style: $WT.LABEL,
                                                width: "50%",
                                                labelText: "title height"
                                            },
                                            {
                                                style: $WT.STEPPER,
                                                propertyName: "infoboxTitleHeight",
                                                min: 6,
                                                max: 1000,
                                                width: "50%"
                                            }
                                        ]
                                    },
                                    {
                                        style: $WT.TWOCOLUMN,
                                        disabled: this.getHost().getProperty('showInfobox') === "false",
                                        items: [{
                                                style: $WT.LABEL,
                                                width: "50%",
                                                labelText: "fontsize"
                                            },
                                            {
                                                style: $WT.STEPPER,
                                                propertyName: "infoboxFontSize",
                                                min: 6,
                                                max: 100,
                                                width: "50%"
                                            }
                                        ]
                                    },
                                    {
                                        style: $WT.TWOCOLUMN,
                                        disabled: this.getHost().getProperty('showInfobox') === "false" || this.getHost().getProperty('positionInfobox') === "vertical",
                                        items: [{
                                                style: $WT.LABEL,
                                                width: "50%",
                                                labelText: "width"
                                            },
                                            {
                                                style: $WT.STEPPER,
                                                propertyName: "infoboxWidth",
                                                min: 6,
                                                max: 1000,
                                                width: "50%"
                                            }
                                        ]
                                    }
                                ]
                            },
                            
                            //Weekendhighlights
                            {
                                style: $WT.EDITORGROUP,
                                items: [{
                                        style: $WT.CHECKBOXANDLABEL,
                                            propertyName: "displayWeekendFill",
                                            labelText: "Show Weekend",
                                    },
                                    {
                                        style: $WT.TWOCOLUMN,
                                        items: [{
                                                style: $WT.LABEL,
                                                width: "30%",
                                                labelText: "Fill"
                                            },
                                            {
                                                style: $WT.FILLGROUP,
                                                width: "70%",
                                                propertyName: "weekendFillColor",
                                            }
                                        ]
                                    },
                                ]
                            },
                            // minGridDistance
                            {
                                style: $WT.EDITORGROUP,
                                items: [{
                                        style: $WT.LABEL,
                                        labelText: "minGridDistance (Y-Axis)"
                                    },
                                    {
                                        style: $WT.STEPPER,
                                        propertyName: "minGridDist",
                                        min: 0,
                                        max: 200,
                                        width: "50%"
                                    }]
                            },
                            // Image from 5th Attribute
                            
                            {
                                style: $WT.EDITORGROUP,
                                items: [{
                                        style: $WT.CHECKBOXANDLABEL,
                                        disabled: this.getHost().getProperty('showInfobox') === "false",
                                        propertyName: "displayImage",
                                        labelText: "Image from 5th Attribute"
                                    }, {
                                        style: $WT.TWOCOLUMN,
                                        items: [{
                                            style: $WT.LABEL,
                                            disabled: this.getHost().getProperty('showInfobox') === "false" || this.getHost().getProperty('displayImage') === "false" || this.getHost().getProperty('positionInfobox') === "vertical",
                                            labelText: "image height",
                                            width: "50%"
                                        },
                                        {
                                            style: $WT.STEPPER,
                                            disabled: this.getHost().getProperty('showInfobox') === "false" || this.getHost().getProperty('displayImage') === "false" || this.getHost().getProperty('positionInfobox') === "vertical",
                                            propertyName: "heightImg",
                                            min: 10,
                                            max: 500,
                                            width: "50%"
                                        }]
                                    },
                                    //imgPrefix
                                    {
                                        style: $WT.TWOCOLUMN,
                                        items: [{
                                                style: $WT.LABEL,
                                                disabled: this.getHost().getProperty('showInfobox') === "false" || this.getHost().getProperty('displayImage') === "false" || this.getHost().getProperty('positionInfobox') === "vertical",
                                                width: "30%",
                                                labelText: "imgPrefix"
                                            },
                                            {
                                                style: $WT.TEXTBOX,
                                                disabled: this.getHost().getProperty('showInfobox') === "false" || this.getHost().getProperty('displayImage') === "false" || this.getHost().getProperty('positionInfobox') === "vertical",
                                                width: "70%",
                                                propertyName: "imgPrefix",
                                            }
                                        ]
                                    },
                                    //imgSuffix
                                    {
                                        style: $WT.TWOCOLUMN,
                                        items: [{
                                                style: $WT.LABEL,
                                                disabled: this.getHost().getProperty('showInfobox') === "false" || this.getHost().getProperty('displayImage') === "false" || this.getHost().getProperty('positionInfobox') === "vertical",
                                                width: "30%",
                                                labelText: "imgSuffix"
                                            },
                                            {
                                                style: $WT.TEXTBOX,
                                                disabled: this.getHost().getProperty('showInfobox') === "false" || this.getHost().getProperty('displayImage') === "false" || this.getHost().getProperty('positionInfobox') === "vertical",
                                                width: "70%",
                                                propertyName: "imgSuffix",
                                            }
                                        ]
                                    },
                                ]
                            },


                            //baseInterval: Timeunit and count
                            /*{
                                style: $WT.EDITORGROUP,
                                items: [{   style: $WT.LABEL,
                                            labelText: "Baseinterval: timeUnit and count"
                                        }, {
                                            style: $WT.TWOCOLUMN,
                                            items: [{
                                                    style: $WT.LABEL,
                                                    width: "30%",
                                                    labelText: "timeUnit"
                                                },
                                                {
                                                    style: $WT.PULLDOWN,
                                                    width: "70%",
                                                    disabled: this.getHost().getProperty('showInfobox') === "false",
                                                    propertyName: "timeUnit",
                                                    items: [{name: "minute", value: "minute"
                                                        },  {name: "hour", value: "hour"
                                                        },  {name: "day", value: "day"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }, {
                                            style: $WT.TWOCOLUMN,
                                            items: [{
                                                    style: $WT.LABEL,
                                                    width: "30%",
                                                    labelText: "Count"
                                                },
                                                {
                                                    style: $WT.PULLDOWN,
                                                    width: "70%",
                                                    disabled: this.getHost().getProperty('showInfobox') === "false",
                                                    propertyName: "timeUnitCount",
                                                    items: [{name: "1", value: 1},
                                                            {name: "3", value: "3"},
                                                            {name: "5", value: "5"},
                                                            {name: "10", value: "10"},
                                                            {name: "15", value: "15"},
                                                            {name: "30", value: "30"}
                                                    ]
                                                }
                                            ]
                                        },

                                ]
                            },*/
                        ]
                    },
                    // Tab amCharts Timeline Format
                    {
                        name: 'Color, Thresholds & Heatmap',
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
                                        },
                                        //Select Metric for Heatmap
                                        {
                                            style: $WT.EDITORGROUP,
                                            items: (function () {
                                                var y = [];
                                                var x = [{
                                                    style: $WT.LABEL,
                                                    labelText: "Metric for Heatmap"
                                                }, {
                                                    style: $WT.PULLDOWN,
                                                    width: "100%",
                                                    propertyName: "heatmapMetric",
                                                    items: y
                                                }];
                                                for (var i = 0; i < numOfMetrics; i++) {
                                                    y.push({
                                                        name: myViz.zonesModel.getDropZones().zones[4].items[i].n,
                                                        value: i
                                                    });
                                                }
                                                return x;
                                            })()
                                        },{
                                        // Output Buttonbar = {"heatrule":"true","threshold":"false"}
                                            style: $WT.BUTTONBAR,
                                            propertyName: "threshold",
                                            items: [{
                                                labelText: "Heatrule",
                                                propertyName: "heatrule"
                                            }, {
                                                labelText: "Threshold",
                                                propertyName: "threshold"
                                            }],
                                            multiSelect: false
                                        },
                                    /*],    
                                    style: $WT.EDITORGROUP,
                                    items: [*/
                                        
                                    ]
                                },
                                {
                                    style: $WT.EDITORGROUP,
                                    items: [{
                                                style: $WT.LABEL,
                                                disabled: typeOfThreshold.threshold === "false",
                                                labelText: "Heatrule"
                                            },
                                            {
                                                style: $WT.TWOCOLUMN,
                                                items: [{
                                                    style: $WT.LABEL,
                                                    disabled: typeOfThreshold.heatrule === "false",
                                                    width: "30%",
                                                    labelText: "min"
                                                }, {
                                                    style: $WT.FILLGROUP,
                                                    disabled: typeOfThreshold.heatrule === "false",
                                                    width: "70%",
                                                    propertyName: "minThresholdColor",
                                                }]
                                            }, {
                                                style: $WT.TWOCOLUMN,
                                                items: [{
                                                    style: $WT.LABEL,
                                                    disabled: typeOfThreshold.heatrule === "false",
                                                    width: "30%",
                                                    labelText: "max"
                                                }, {
                                                    style: $WT.FILLGROUP,
                                                    disabled: typeOfThreshold.heatrule === "false",
                                                    width: "70%",
                                                    propertyName: "maxThresholdColor",
                                                }]
                                            }, {
                                                //minThresholdValue
                                                style: $WT.TWOCOLUMN,
                                                items: [{
                                                    style: $WT.LABEL,
                                                    disabled: typeOfThreshold.heatrule === "false",
                                                    width: "30%",
                                                    labelText: "min value"
                                                }, {
                                                    style: $WT.TEXTBOX,
                                                    disabled: typeOfThreshold.heatrule === "false",
                                                    width: "70%",
                                                    propertyName: "minThresholdValue",
                                                }]
                                            }, {
                                                //maxThresholdValue
                                                style: $WT.TWOCOLUMN,
                                                items: [{
                                                    style: $WT.LABEL,
                                                    disabled: typeOfThreshold.heatrule === "false",
                                                    width: "30%",
                                                    labelText: "max value"
                                                }, {
                                                    style: $WT.TEXTBOX,
                                                    disabled: typeOfThreshold.heatrule === "false",
                                                    width: "70%",
                                                    propertyName: "maxThresholdValue",
                                                }]
                                            },
                                    ]
                                },
                                {
                                    style: $WT.EDITORGROUP,
                                    items: [{
                                        style: $WT.LABEL,
                                        disabled: typeOfThreshold.threshold === "false",
                                        labelText: "Thresholds"
                                    },
                                    {
                                        // threshold0Color
                                        style: $WT.TWOCOLUMN,
                                        disabled: this.getHost().getProperty('showThreshold') === "false",
                                        items: [{
                                            style: $WT.LABEL,
                                            disabled: typeOfThreshold.threshold === "false",
                                            width: "40%",
                                            labelText: "< Threshold1"
                                        }, {
                                            style: $WT.FILLGROUP,
                                            disabled: typeOfThreshold.threshold === "false",
                                            width: "60%",
                                            propertyName: "threshold0Color",
                                        }]
                                    }, {
                                        style: $WT.EDITORGROUP,
                                        items: (function () {
                                            let y = [];
                                            let x = [{
                                                style: $WT.LABEL,
                                                labelText: "Threshold 1"
                                            }, {
                                                style: $WT.PULLDOWN,
                                                width: "100%",
                                                disabled: typeOfThreshold.threshold === "false",
                                                propertyName: "threshold1",
                                                items: y
                                            }];
                                            for (let i = 0; i < numOfMetrics; i++) {
                                                y.push({
                                                    name: myViz.zonesModel.getDropZones().zones[4].items[i].n,
                                                    value: i
                                                });
                                            }
                                            return x;
                                        })()
                                    }, {
                                        // threshold1Color
                                        style: $WT.TWOCOLUMN,
                                        disabled: this.getHost().getProperty('showThreshold') === "false",
                                        items: [{
                                            style: $WT.LABEL,
                                            disabled: typeOfThreshold.threshold === "false",
                                            width: "40%",
                                            labelText: "between 1 & 2"
                                        }, {
                                            style: $WT.FILLGROUP,
                                            disabled: typeOfThreshold.threshold === "false",
                                            width: "60%",
                                            propertyName: "threshold1Color",
                                        }]
                                    }, {
                                        style: $WT.EDITORGROUP,
                                        items: (function () {
                                            let y = [];
                                            let x = [{
                                                style: $WT.LABEL,
                                                labelText: "\n.:: Threshold 2"
                                            }, {
                                                style: $WT.PULLDOWN,
                                                width: "100%",
                                                disabled: typeOfThreshold.threshold === "false",
                                                propertyName: "threshold2",
                                                items: y
                                            }];
                                            for (let i = 0; i < numOfMetrics; i++) {
                                                y.push({
                                                    name: myViz.zonesModel.getDropZones().zones[4].items[i].n,
                                                    value: i
                                                });
                                            }
                                            return x;
                                        })()
                                    },
                                    {
                                        // threshold2Color
                                        style: $WT.TWOCOLUMN,
                                        items: [{
                                            style: $WT.LABEL,
                                            disabled: typeOfThreshold.threshold === "false",
                                            width: "40%",
                                            labelText: "> Threshold2"
                                        }, {
                                            style: $WT.FILLGROUP,
                                            disabled: typeOfThreshold.threshold === "false",
                                            width: "60%",
                                            propertyName: "threshold2Color",
                                        }]
                                    },
                                    ]
                                },


                                ]
                                },

                                // Tab amCharts Timeline Format
                                {
                                    name: 'Grid, Axis & Clicks',
                                    value: [
                                //Grid and Axis Lines
                                {
                                    style: $WT.EDITORGROUP,
                                    items: [{
                                            style: $WT.LABEL,
                                            labelText: "Grid Lines"
                                        }, {
                                            style: $WT.TWOCOLUMN,
                                            items: [{
                                                    style: $WT.LABEL,
                                                    width: "30%",
                                                    labelText: "Stroke-X"
                                                }, {
                                                    style: $WT.FILLGROUP,
                                                    width: "70%",
                                                    propertyName: "amountStrokeXColor",
                                                }
                                            ]
                                        }, {
                                            style: $WT.TWOCOLUMN,
                                            items: [{
                                                    style: $WT.LABEL,
                                                    width: "30%",
                                                    labelText: "Stroke-Y"
                                                }, {
                                                    style: $WT.FILLGROUP,
                                                    width: "70%",
                                                    propertyName: "amountStrokeYColor",
                                                }
                                            ]
                                        }, {
                                            style: $WT.TWOCOLUMN,
                                            items: [{
                                                    style: $WT.LABEL,
                                                    width: "30%",
                                                    labelText: "Axisline-X"
                                                }, {
                                                    style: $WT.FILLGROUP,
                                                    width: "70%",
                                                    propertyName: "axisXColor",
                                                }
                                            ]
                                        }, {
                                            style: $WT.TWOCOLUMN,
                                            items: [{
                                                    style: $WT.LABEL,
                                                    width: "30%",
                                                    labelText: "Axisline-Y"
                                                }, {
                                                    style: $WT.FILLGROUP,
                                                    width: "70%",
                                                    propertyName: "axisYColor",
                                                }
                                            ]
                                        },
                                    ]
                                },
                                //axis lables
                                {
                                    style: $WT.EDITORGROUP,
                                    items: [{
                                            style: $WT.LABEL,
                                            labelText: "Axis Format"
                                        }, {
                                            style: $WT.TWOCOLUMN,
                                            items: [{
                                                    style: $WT.LABEL,
                                                    width: "30%",
                                                    labelText: "font color"
                                                }, {
                                                    style: $WT.FILLGROUP,
                                                    width: "70%",
                                                    propertyName: "fontColor",
                                                }
                                            ]
                                        },
                                    ]
                                },
                                //Clickable Tasks
                                {
                                    style: $WT.EDITORGROUP,
                                    items: [{
                                            style: $WT.LABEL,
                                            labelText: "Clickable Tasks"
                                        }, {
                                            style: $WT.CHECKBOXANDLABEL,
                                            propertyName: "clickTask",
                                            labelText: "Clickable Tasks"
                                        }, {
                                        //clickcolor
                                                style: $WT.CHECKBOXANDLABEL,
                                                disabled: this.getHost().getProperty('clickTask') === "false",
                                                propertyName: "fillTask",
                                                labelText: "fill Tasks"
                                            },{
                                            style: $WT.TWOCOLUMN,
                                            disabled: this.getHost().getProperty('clickTask') === "false",
                                            items: [{
                                                    style: $WT.LABEL,
                                                    disabled: this.getHost().getProperty('clickTask') === "false",
                                                    width: "30%",
                                                    labelText: "fill color on click"
                                                },
                                                {
                                                    style: $WT.FILLGROUP,
                                                    disabled: this.getHost().getProperty('clickTask') === "false",
                                                    width: "70%",
                                                    propertyName: "clickColorFill",
                                                }
                                            ]
                                        },{
                                        //strokecolor
                                            style: $WT.TWOCOLUMN,
                                            disabled: this.getHost().getProperty('clickTask') === "false",
                                            items: [{
                                                    style: $WT.LABEL,
                                                    width: "30%",
                                                    labelText: "stroke color on click"
                                                }, {
                                                    style: $WT.FILLGROUP,
                                                    width: "70%",
                                                    propertyName: "clickColorStroke",
                                                }
                                            ]
                                        },{
                                        //strokeWidth
                                            style: $WT.TWOCOLUMN,
                                            disabled: this.getHost().getProperty('clickTask') === "false",
                                            items: [{
                                                    style: $WT.LABEL,
                                                    width: "30%",
                                                    labelText: "stroke width"
                                                }, {
                                                    style: $WT.STEPPER,
                                                    width: "70%",
                                                    propertyName: "strokeWidth",
                                                    min: 1,
                                                    max: 10,
                                                }]
                                        },
                                    ]
                                },
                        ]
                    },
                    // Tab amCharts Timeline Format
                    {
                        name: 'Help and Notes',
                        value: [{
                                style: $WT.LABEL,
                                labelText: "Version 1.59    (GitHub:RobjSky)"
                            }, {
                                style: $WT.CHECKBOXANDLABEL,
                                propertyName: "showDebugMsgs",
                                labelText: "Show Msg"
                            }, {
                                style: $WT.CHECKBOXANDLABEL,
                                propertyName: "showDebugTbl",
                                labelText: "Show Debug Table"
                            }, {
                                style: $WT.LABEL,
                                labelText: "Help:"
                            }, {
                                style: $WT.LABEL,
                                labelText: "Date Start and End Function! This function assumes first and second input to be of the date- or datetime-format! Date and DateTime need to be in one of the supported formats. Supported separators for date are: , - . / \ : and [Whitespace]"
                            }, {
                                style: $WT.LABEL,
                                labelText: "Sorting by Start DateTime Attribute is very important."
                            },
                        ]
                    }
                ];
            }
        }
    );
}());